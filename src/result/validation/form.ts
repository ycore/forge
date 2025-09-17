import type { BaseSchema, InferOutput } from 'valibot';
import { safeParse } from 'valibot';
import type { Result } from '../@types/result.types';
import { err } from '../core/result';

/**
 * Parse Valibot issues into an error with field-specific details
 */
function parseValibotIssues(issues: any[]): Result<never> {
  if (!issues?.length) {
    return err('Validation failed');
  }

  const fieldErrors: Record<string, string> = {};

  for (const issue of issues) {
    const field = issue.path?.length > 0 ? String(issue.path[0].key) : 'form';

    // Only keep the first error per field for simplicity
    if (!fieldErrors[field]) {
      fieldErrors[field] = issue.message;
    }
  }

  return err('Validation failed', fieldErrors, {
    code: 'VALIDATION_ERROR',
    status: 400
  });
}

/**
 * Validate data against a schema, returning Result
 */
async function validate<S extends BaseSchema<any, any, any>>(
  schema: S,
  input: any
): Promise<Result<InferOutput<S>>> {
  const result = safeParse(schema, input);

  if (result.success) {
    return result.output;
  }

  return parseValibotIssues(result.issues);
}

/**
 * Validate form data against a schema
 */
export async function validateFormData<S extends BaseSchema<any, any, any>>(
  schema: S,
  requestOrFormData: Request | FormData
): Promise<Result<InferOutput<S>>> {
  const formData = requestOrFormData instanceof FormData
    ? requestOrFormData
    : await requestOrFormData.formData();

  const object: Record<string, any> = {};

  formData.forEach((value, key) => {
    // Handle file uploads
    if (value instanceof File) {
      object[key] = value;
    }
    // Handle multiple values for the same key (checkboxes, etc)
    else if (object[key]) {
      if (Array.isArray(object[key])) {
        object[key].push(String(value));
      } else {
        object[key] = [object[key], String(value)];
      }
    }
    // Single value
    else {
      object[key] = String(value);
    }
  });

  return validate(schema, object);
}

/**
 * Validate JSON data against a schema
 */
export async function validateJsonData<S extends BaseSchema<any, any, any>>(
  schema: S,
  data: any
): Promise<Result<InferOutput<S>>> {
  return validate(schema, data);
}

/**
 * Validate query parameters against a schema
 */
export async function validateQueryParams<S extends BaseSchema<any, any, any>>(
  schema: S,
  requestOrUrl: Request | URL | URLSearchParams
): Promise<Result<InferOutput<S>>> {
  let searchParams: URLSearchParams;

  if (requestOrUrl instanceof Request) {
    const url = new URL(requestOrUrl.url);
    searchParams = url.searchParams;
  } else if (requestOrUrl instanceof URL) {
    searchParams = requestOrUrl.searchParams;
  } else {
    searchParams = requestOrUrl;
  }

  const object: Record<string, any> = {};

  searchParams.forEach((value, key) => {
    // Handle multiple values for the same key
    if (object[key]) {
      if (Array.isArray(object[key])) {
        object[key].push(value);
      } else {
        object[key] = [object[key], value];
      }
    } else {
      object[key] = value;
    }
  });

  return validate(schema, object);
}

/**
 * Create a validation middleware for routes
 */
export function createValidationMiddleware<S extends BaseSchema<any, any, any>>(
  schema: S,
  options?: {
    source?: 'form' | 'json' | 'query';
    onError?: (error: any) => any;
  }
) {
  return async (args: { request: Request; context: any }) => {
    let result: Result<InferOutput<S>>;

    switch (options?.source) {
      case 'json': {
        const json = await args.request.json();
        result = await validateJsonData(schema, json);
        break;
      }
      case 'query':
        result = await validateQueryParams(schema, args.request);
        break;
      // case 'form':
      default:
        result = await validateFormData(schema, args.request);
        break;
    }

    // Store validation result in context for route to use
    args.context.set('validationResult', result);

    // Call error handler if validation failed
    if (options?.onError && typeof result === 'object' && 'message' in result) {
      return options.onError(result);
    }
  };
}

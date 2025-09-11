/** biome-ignore-all lint/suspicious/noExplicitAny: acceptable */
import type { BaseSchema, InferOutput } from 'valibot';
import { safeParse } from 'valibot';
import type { AppError, AppResult } from '../@types/result.types';
import { createAppError, returnFailure, returnSuccess } from '../core/index';

/**
 * Parse Valibot issues into AppError with field-specific errors
 */
function parseValibotIssues(issues: any[]): AppError {
  if (!issues?.length) {
    return createAppError('Validation failed');
  }

  const fieldErrors: Record<string, string> = {};

  for (const issue of issues) {
    const field = issue.path?.length > 0 ? String(issue.path[0].key) : 'general';

    // Only keep the first error per field for simplicity
    if (!fieldErrors[field]) {
      fieldErrors[field] = issue.message;
    }
  }

  return createAppError('Validation failed', fieldErrors);
}

async function validate<S extends BaseSchema<any, any, any>>(schema: S, input: any): Promise<AppResult<InferOutput<S>, AppError>> {
  const result = safeParse(schema, input);

  if (result.success) {
    return returnSuccess(result.output);
  }

  return returnFailure(parseValibotIssues(result.issues));
}

export async function validateFormData<S extends BaseSchema<any, any, any>>(schema: S, requestOrFormData: Request | FormData): Promise<AppResult<InferOutput<S>, AppError>> {
  const formData = requestOrFormData instanceof FormData ? requestOrFormData : await requestOrFormData.formData();

  const object: Record<string, any> = {};

  formData.forEach((value, key) => {
    object[key] = value instanceof File ? value : String(value);
  });

  return await validate(schema, object);
}
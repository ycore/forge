import { enum_, object, safeParse } from 'valibot';
import { parseIssues } from '../error/error-transformer';
import type { GetIntentOptions, IntentResult } from './@types/intent.types';

/**
 * Extract and validate intent from form data or request
 *
 * @param requestOrFormData - Request or FormData containing the intent
 * @param values - Array of allowed intent values
 * @param options - Configuration options for intent extraction
 * @returns Promise resolving to object with intent value or validation errors
 *
 * @example
 * ```typescript
 * const { intent, errors: intentErrors } = await getIntent(formData, ['toast', 'email']);
 *
 * if (intentErrors) {
 *   return actionFailure(intentErrors);
 * }
 *
 * // intent is type: 'toast' | 'email'
 * ```
 */
export async function getIntent<T extends readonly string[]>(requestOrFormData: Request | FormData, values: T, options: GetIntentOptions = {}): Promise<IntentResult<T>> {
  const { name = 'intent' } = options;

  // Extract FormData
  const formData = requestOrFormData instanceof FormData ? requestOrFormData : await requestOrFormData.formData();

  // Create enum schema from provided values
  const enumValues = values.reduce(
    (acc, value) => {
      acc[value] = value;
      return acc;
    },
    {} as Record<string, string>
  );

  const intentSchema = object({
    [name]: enum_(enumValues, `Invalid ${name}. Must be one of: ${values.join(', ')}`),
  });

  // Convert FormData to object for validation
  const formObject: Record<string, any> = {};
  formData.forEach((value, key) => {
    formObject[key] = value instanceof File ? value : String(value);
  });

  // Validate using valibot
  const result = safeParse(intentSchema, formObject);

  if (result.success) {
    return {
      intent: result.output[name] as T[number],
      errors: null,
    };
  }

  // Convert validation issues to FieldError format
  const fieldErrors = parseIssues(result.issues);
  return {
    intent: null,
    errors: fieldErrors,
  };
}

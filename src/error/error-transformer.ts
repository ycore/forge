import { ValiError } from 'valibot';
import type { BaseError, ErrorCollection, FieldError } from './@types/error.types';

/**
 * Transform any error into a BaseError
 */
export function transformError(error: unknown): BaseError {
  if (error instanceof ValiError) {
    return { messages: [error.issues?.[0]?.message || 'Validation failed'] };
  }

  if (error instanceof Error) {
    return { messages: [error.message] };
  }

  if (typeof error === 'string') {
    return { messages: [error] };
  }

  if (typeof error === 'object' && error !== null && 'message' in error) {
    const message = (error as { message: unknown }).message;
    return { messages: [typeof message === 'string' ? message : String(message)] };
  }

  return { messages: ['Unknown error occurred'] };
}

/**
 * Parse valibot validation issues into FieldError format
 */
export function parseIssues(issues: unknown[]): FieldError {
  if (!issues?.length) {
    return {
      _global: [{ messages: ['Validation failed'] }],
    };
  }

  const fieldErrors: FieldError = {};

  for (const issue of issues) {
    const field = String(issue.path?.[0]?.key ?? '_global');

    if (!fieldErrors[field]) {
      fieldErrors[field] = [];
    }

    fieldErrors[field].push({
      messages: [issue.message],
    });
  }

  return fieldErrors;
}

/**
 * Get summary string from ErrorCollection or FieldError for logging
 */
export function flattenErrors(errors: ErrorCollection | FieldError): string {
  if (Array.isArray(errors)) {
    return errors.flatMap(error => error.messages).join('; ');
  }

  return Object.values(errors)
    .flatMap(fieldErrors => fieldErrors.flatMap(error => error.messages))
    .join('; ');
}

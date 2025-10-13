import { ValiError } from 'valibot';
import type { AppError, FieldErrors } from '../@types/result.types';
import { err } from './result';

/**
 * Transform unknown error to AppError
 */
export function toAppError(error: unknown): AppError {
  // Already an AppError
  if (error && typeof error === 'object' && 'message' in error && typeof (error as any).message === 'string') {
    const e = error as any;
    return {
      message: e.message,
      details: e.details,
      cause: e.cause,
      code: e.code,
      status: e.status,
    };
  }

  // Standard Error
  if (error instanceof Error) {
    return err(error.message, undefined, { cause: error });
  }

  // String error
  if (typeof error === 'string') {
    return err(error);
  }

  // Unknown
  return err('Unknown error occurred', { error });
}

/**
 * Transform any error into an AppError (including validation errors)
 */
export function transformError(error: unknown): AppError {
  // Handle Valibot validation errors
  if (error instanceof ValiError) {
    const fieldErrors: Record<string, string> = {};

    for (const issue of error.issues || []) {
      const field = issue.path?.length > 0 ? String(issue.path[0].key) : 'form';

      // Only keep the first error per field for simplicity
      if (!fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }

    return err('Validation failed', fieldErrors, { cause: error });
  }

  return toAppError(error);
}

/**
 * Extract field errors from AppError for form display
 */
export function extractFieldErrors(error: AppError | undefined | null): FieldErrors {
  if (!error) {
    return {};
  }

  const result: FieldErrors = {};

  // Add the main message as a form-level error if no field-specific errors exist
  if (error.message && (!error.details || Object.keys(error.details).length === 0)) {
    result.form = error.message;
  }

  // Extract field-specific errors from details
  if (error.details && typeof error.details === 'object') {
    for (const [field, value] of Object.entries(error.details)) {
      // Convert the value to a string for display
      result[field] = typeof value === 'string' ? value : String(value);
    }
  }

  return result;
}

/**
 * Get a flattened string summary of an error for logging
 */
export function flattenError(error: AppError | unknown): string {
  if (!error) {
    return 'Unknown error';
  }

  // Handle AppError
  if (typeof error === 'object' && 'message' in error) {
    const appError = error as AppError;

    // If there are field-specific errors in details, include them
    if (appError.details && typeof appError.details === 'object') {
      const fieldErrors = Object.entries(appError.details)
        .filter(([_, value]) => typeof value === 'string' || typeof value === 'number')
        .map(([field, message]) => `${field}: ${message}`)
        .join('; ');

      if (fieldErrors) {
        return `${appError.message} - ${fieldErrors}`;
      }
    }

    return appError.message;
  }

  // Fallback for non-AppError types
  return String(error);
}

/**
 * Create a validation error with field-specific messages
 */
export function validationError(fieldErrors: Record<string, string>, message = 'Validation failed'): AppError {
  return err(message, fieldErrors, { code: 'VALIDATION_ERROR', status: 400 });
}

/**
 * Create a not found error
 */
export function notFoundError(resource: string, identifier?: string | number): AppError {
  const message = identifier ? `${resource} not found: ${identifier}` : `${resource} not found`;

  return err(message, { resource, identifier }, { code: 'NOT_FOUND', status: 404 });
}

/**
 * Create an unauthorized error
 */
export function unauthorizedError(message = 'Unauthorized'): AppError {
  return err(message, undefined, { code: 'UNAUTHORIZED', status: 401 });
}

/**
 * Create a forbidden error
 */
export function forbiddenError(message = 'Forbidden'): AppError {
  return err(message, undefined, { code: 'FORBIDDEN', status: 403 });
}

/**
 * Create a bad request error
 */
export function badRequestError(message: string, details?: Record<string, unknown>): AppError {
  return err(message, details, { code: 'BAD_REQUEST', status: 400 });
}

/**
 * Create an internal server error
 */
export function serverError(message = 'Internal server error', cause?: Error): AppError {
  return err(message, undefined, { cause, code: 'INTERNAL_ERROR', status: 500 });
}

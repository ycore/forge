import { ValiError } from 'valibot';
import type { AppError } from '../@types/result.types';

/**
 * Create an AppError from various error types
 */
export function createAppError(
  message: string,
  details?: Record<string, unknown>,
  cause?: Error
): AppError {
  return { message, details, cause };
}

/**
 * Transform unknown error to AppError
 */
export function toAppError(error: unknown): AppError {
  if (error instanceof Error) {
    return createAppError(error.message, undefined, error);
  }

  if (typeof error === 'string') {
    return createAppError(error);
  }

  if (error && typeof error === 'object' && 'message' in error) {
    const err = error as any;
    return createAppError(
      String(err.message),
      err.details,
      err.cause
    );
  }

  return createAppError('Unknown error occurred');
}

/**
 * Transform any error into an AppError (including validation errors)
 */
export function transformError(error: unknown): AppError {
  if (error instanceof ValiError) {
    const fieldErrors: Record<string, string> = {};

    for (const issue of error.issues || []) {
      const field = issue.path?.length > 0 ? String(issue.path[0].key) : 'general';

      if (!fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }

    return { message: 'Validation failed', details: fieldErrors };
  }

  return toAppError(error);
}

/**
 * Get summary string from AppError for logging
 */
export function flattenErrors(error: AppError | unknown): string {
  if (!error) {
    return 'Unknown error';
  }

  // Handle AppError
  if (typeof error === 'object' && 'message' in error) {
    const appError = error as AppError;

    // If there are field-specific errors in details, include them
    if (appError.details && typeof appError.details === 'object') {
      const fieldErrors = Object.entries(appError.details)
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
 * Transform AppError into form field errors object
 * Extracts field-specific errors from AppError.details for easy form field consumption
 */
export function formErrors(error: AppError | undefined | null): Record<string, string> & { form?: string } {
  if (!error) {
    return {};
  }

  const result: Record<string, string> & { form?: string } = {};

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
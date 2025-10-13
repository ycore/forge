import type { AppError, Result } from '../@types/result.types';
import { isAppError } from '../@types/result.types';

/**
 * Return a successful value directly
 * This is essentially a no-op but provides semantic clarity
 */
export function ok<T>(value: T): T {
  return value;
}

/**
 * Create an AppError
 */
export function err(
  message: string,
  details?: Record<string, unknown>,
  options?: {
    cause?: Error | unknown;
    code?: string;
    status?: number;
  }
): AppError {
  return {
    message,
    details,
    cause: options?.cause,
    code: options?.code,
    status: options?.status,
  };
}

/**
 * Check if a result is an error
 */
export function isError<T>(result: Result<T>): result is AppError {
  return isAppError(result);
}

/**
 * Check if a result is successful (not an error)
 */
export function isOk<T>(result: Result<T>): result is T {
  return !isAppError(result);
}

/**
 * Get the data from a result, or undefined if it's an error
 */
export function getData<T>(result: Result<T>): T | undefined {
  return isError(result) ? undefined : result;
}

/**
 * Get the error from a result, or undefined if it's successful
 */
export function getError<T>(result: Result<T>): AppError | undefined {
  return isError(result) ? result : undefined;
}

/**
 * Unwrap a result, throwing if it's an error
 */
export function unwrap<T>(result: Result<T>): T {
  if (isError(result)) {
    throw new Error(result.message);
  }
  return result;
}

/**
 * Unwrap a result or return a default value if it's an error
 */
export function unwrapOr<T>(result: Result<T>, defaultValue: T): T {
  return isError(result) ? defaultValue : result;
}

/**
 * Map a successful result to a new value
 */
export function map<T, U>(result: Result<T>, fn: (value: T) => U): Result<U> {
  return isError(result) ? result : fn(result);
}

/**
 * Map an error result to a new error
 */
export function mapError<T>(result: Result<T>, fn: (error: AppError) => AppError): Result<T> {
  return isError(result) ? fn(result) : result;
}

/**
 * Chain operations on successful results
 */
export function andThen<T, U>(result: Result<T>, fn: (value: T) => Result<U>): Result<U> {
  return isError(result) ? result : fn(result);
}

/**
 * Provide an alternative result if the first is an error
 */
export function orElse<T>(result: Result<T>, fn: () => Result<T>): Result<T> {
  return isError(result) ? fn() : result;
}

/**
 * Convert a promise that might throw into a Result
 */
export async function tryCatch<T>(fn: () => Promise<T>, errorMessage?: string): Promise<Result<T>> {
  try {
    return await fn();
  } catch (error) {
    return err(errorMessage || 'Operation failed', undefined, { cause: error });
  }
}

/**
 * Combine multiple results - returns first error or all values
 */
export function combine<T extends readonly Result<any>[]>(results: T): Result<{ [K in keyof T]: T[K] extends Result<infer U> ? U : never }> {
  const values: any[] = [];

  for (const result of results) {
    if (isError(result)) {
      return result;
    }
    values.push(result);
  }

  return values as any;
}

/**
 * Combine results into an object
 */
export function combineObject<T extends Record<string, Result<any>>>(results: T): Result<{ [K in keyof T]: T[K] extends Result<infer U> ? U : never }> {
  const values: any = {};

  for (const [key, result] of Object.entries(results)) {
    if (isError(result)) {
      return result;
    }
    values[key] = result;
  }

  return values;
}

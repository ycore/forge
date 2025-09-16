import type { AppError, Failure, Success } from '../@types/result.types';

/**
 * Create a successful AppResult
 */
export function returnSuccess<T>(data: T): Success<T> {
  return { success: true, data };
}

/**
 * Create a failed AppResult
 */
export function returnFailure<E = AppError>(error: E): Failure<E> {
  return { success: false, error };
}

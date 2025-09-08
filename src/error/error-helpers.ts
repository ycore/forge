import type { TypedResult } from '../http/@types/http.types';
import { returnFailure, returnSuccess } from '../http/return-helpers';
import type { BaseError, ErrorCollection, FieldError } from './@types/error.types';

/**
 * Internal helper to create BaseError objects from messages
 */
function createBaseErrors(messages: string[]): BaseError[] {
  return messages.map(message => ({ messages: [message] }));
}

/**
 * Create an ErrorCollection from a single message or array of messages
 */
export function makeError(messages: string | string[]): ErrorCollection {
  const messageArray = Array.isArray(messages) ? messages : [messages];
  return createBaseErrors(messageArray);
}

/**
 * Create a FieldError with errors for a specific field
 */
export function makeFieldError(field: string, messages: string | string[]): FieldError {
  return {
    [field]: makeError(messages),
  };
}

/**
 * Create a FieldError for form validation with optional global messages
 */
export function makeFormError(field: string, messages: string | string[], globalMessages?: string | string[]): FieldError {
  const fieldError: FieldError = { [field]: makeError(messages) };
  if (globalMessages) {
    fieldError._global = makeError(globalMessages);
  }
  return fieldError;
}

/**
 * Create a service-level error (non-field specific)
 */
export function makeServiceError(messages: string | string[]): FieldError {
  return { _global: makeError(messages) };
}

/**
 * Handle try-catch errors and create proper ErrorCollection
 */
export function makeTryCatchError(error: unknown, context?: string): ErrorCollection {
  const message = error instanceof Error ? error.message : String(error);
  const fullMessage = context ? `${context}: ${message}` : message;
  return makeError(fullMessage);
}

/**
 * Create a general error for unexpected failures
 */
export function makeGeneralError(message = 'An unexpected error occurred'): FieldError {
  return { general: makeError(message) };
}

/**
 * Wraps any function (sync or async) in a Result Object pattern
 * Provides full type safety for both success and error cases
 * 
 * @template T The expected return type on success
 * @template E The error type (defaults to ErrorCollection)
 * @param fn The function to wrap (can be sync or async)
 * @param errorTransform Optional function to transform caught errors to type E
 * @returns Promise<TypedResult<T, E>> Always returns a Result Object
 * 
 * @example
 * // Wrap a third-party API call
 * const result = await wrapResult(
 *   () => fetch(url).then(r => r.json()),
 *   (error) => makeTryCatchError(error, 'API call failed')
 * );
 * 
 * @example
 * // Wrap a sync function that might throw
 * const result = await wrapResult(
 *   () => JSON.parse(jsonString),
 *   (error) => makeError('Invalid JSON')
 * );
 */
export async function wrapResult<T, E = ErrorCollection>(
  fn: () => T | Promise<T>,
  errorTransform?: (error: unknown) => E
): Promise<TypedResult<T, E>> {
  try {
    const result = await fn();
    return returnSuccess<T, E>(result);
  } catch (error) {
    const errors = errorTransform 
      ? errorTransform(error)
      : makeTryCatchError(error) as E;
    return returnFailure<T, E>(errors);
  }
}

/**
 * Wraps a value that might be null/undefined into a Result Object
 * Useful for converting nullable returns into explicit Result Objects
 * 
 * @template T The expected value type
 * @template E The error type (defaults to ErrorCollection)
 * @param value The value to wrap
 * @param errorMessage Error message if value is null/undefined
 * @returns TypedResult<T, E>
 * 
 * @example
 * const user = await db.findUser(id);
 * return wrapNullable(user, 'User not found');
 */
export function wrapNullable<T, E = ErrorCollection>(
  value: T | null | undefined,
  errorMessage: string
): TypedResult<NonNullable<T>, E> {
  if (value === null || value === undefined) {
    return returnFailure<NonNullable<T>, E>(makeError(errorMessage) as E);
  }
  return returnSuccess<NonNullable<T>, E>(value as NonNullable<T>);
}

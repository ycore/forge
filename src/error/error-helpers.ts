import { data, href, redirect } from 'react-router';

import type { BaseError, ErrorCollection, FieldError, TypedResult } from './@types/error.types';

/**
 * Create a BaseError from a message
 */
export function makeError(message: string): BaseError {
  return { messages: [message] };
}

/**
 * Create an ErrorCollection from multiple messages
 */
export function makeErrors(messages: string[]): ErrorCollection {
  return messages.map(message => ({ messages: [message] }));
}

/**
 * Create a FieldError with errors for a specific field
 */
export function makeFieldError(field: string, messages: string[]): FieldError {
  return {
    [field]: messages.map(message => ({ messages: [message] }))
  };
}

/**
 * Create a TypedResult with data
 */
export function returnSuccess<T, E = ErrorCollection>(data: T): TypedResult<T, E> {
  return { data, errors: null };
}

/**
 * Create a TypedResult with errors
 */
export function returnFailure<T, E = ErrorCollection>(errors: E): TypedResult<T, E> {
  return { data: null, errors };
}

/**
 * Create a successful data response for loaders with optional status and headers
 */
export function dataSuccess<T>(successData: T, options?: { status?: number; headers?: HeadersInit }) {
  return data(successData, { status: options?.status ?? 200, headers: options?.headers });
}

/**
 * Create a failure data response for loaders with optional redirect capability
 * If href is provided, throws a redirect instead of returning error data
 */
export function dataFailure<E>(errors: E, options?: { status?: number; headers?: HeadersInit; href?: string; }) {
  if (options?.href) {
    throw redirect(href(options.href), { status: options.status ?? 302, headers: options.headers });
  }

  return data({ success: false as const, errors, data: null }, { status: options?.status ?? 400, headers: options?.headers });
}

/**
 * Create a successful action response with standardized success format
 */
export function actionSuccess<T>(successData: T, options?: { status?: number; headers?: HeadersInit }) {
  return data({ success: true as const, data: successData, errors: null }, { status: options?.status ?? 200, headers: options?.headers });
}

/**
 * Create a failure action response, delegates to dataFailure for consistent error handling
 */
export function actionFailure<E>(errors: E, options?: { status?: number; headers?: HeadersInit; href?: string }) {
  return dataFailure(errors, options);
}

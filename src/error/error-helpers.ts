import { dataWithToast } from '@ycore/componentry/impetus/toast';
import { data, href, redirect } from 'react-router';

import type { BaseError, ErrorCollection, FieldError, TypedResult } from './@types/error.types';

interface ToastOptions {
  toast: string;
}

/**
 * Internal helper to create BaseError objects from messages
 */
function createBaseErrors(messages: string[]): BaseError[] {
  return messages.map(message => ({ messages: [message] }));
}

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
  return createBaseErrors(messages);
}

/**
 * Create a FieldError with errors for a specific field
 */
export function makeFieldError(field: string, messages: string[]): FieldError {
  return {
    [field]: createBaseErrors(messages),
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
  return data(buildResponseData(true, successData, null), { status: options?.status ?? 200, headers: options?.headers });
}

/**
 * Internal helper to build standardized response data structure
 */
function buildResponseData<T, E>(success: boolean, data: T | null, errors: E | null) {
  return { success, data, errors };
}

/**
 * Create a failure data response for loaders with optional redirect capability
 * If href is provided, throws a redirect instead of returning error data
 */
export function dataFailure<E>(errors: E, options?: { status?: number; headers?: HeadersInit; href?: string }) {
  if (options?.href) {
    throw redirect(href(options.href), { status: options.status ?? 302, headers: options.headers });
  }

  return data(buildResponseData(false, null, errors), { status: options?.status ?? 400, headers: options?.headers });
}

/**
 * Create a successful action response with standardized success format
 */
export function actionSuccess<T>(successData: T, options?: { status?: number; headers?: HeadersInit } & Partial<ToastOptions>) {
  const responseData = buildResponseData(true, successData, null);

  if (options?.toast) {
    return dataWithToast(responseData, { message: options.toast, type: 'success' });
  }

  return data(responseData, { status: options?.status ?? 200, headers: options?.headers });
}

/**
 * Create a failure action response, delegates to dataFailure for consistent error handling
 */
export function actionFailure<E>(errors: E, options?: { status?: number; headers?: HeadersInit; href?: string } & Partial<ToastOptions>) {
  if (options?.href) {
    throw redirect(href(options.href), { status: options.status ?? 302, headers: options.headers });
  }

  const responseData = buildResponseData(false, null, errors);

  if (options?.toast) {
    return dataWithToast(responseData, { message: options.toast, type: 'error' });
  }

  return data(responseData, { status: options?.status ?? 400, headers: options?.headers });
}

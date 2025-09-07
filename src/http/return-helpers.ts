import { dataWithToast } from '@ycore/componentry/impetus/toast';
import { data, href, redirect } from 'react-router';

import type { ErrorCollection } from '../error/@types/error.types';
import type { TypedResult } from './@types/http.types';

interface ToastOptions {
  toast: string;
}

/**
 * Internal helper to build standardized response data structure
 */
function buildResponseData<T, E>(success: boolean, data: T | null, errors: E | null) {
  return { success, data, errors };
}

/**
 * Core success response function - works for both loaders and actions
 */
function dataSuccess<T>(successData: T, options?: { status?: number; headers?: HeadersInit; href?: string } & Partial<ToastOptions>) {
  if (options?.href) {
    throw redirect(href(options.href), { status: options.status ?? 302, headers: options.headers });
  }

  const responseData = buildResponseData(true, successData, null);

  if (options?.toast) {
    return dataWithToast(responseData, { message: options.toast, type: 'success' });
  }

  return data(responseData, { status: options?.status ?? 200, headers: options?.headers });
}

/**
 * Core failure response function - works for both loaders and actions
 */
function dataFailure<E>(errors: E, options?: { status?: number; headers?: HeadersInit; href?: string } & Partial<ToastOptions>) {
  if (options?.href) {
    throw redirect(href(options.href), { status: options.status ?? 302, headers: options.headers });
  }

  const responseData = buildResponseData(false, null, errors);

  if (options?.toast) {
    return dataWithToast(responseData, { message: options.toast, type: 'error' });
  }

  return data(responseData, { status: options?.status ?? 400, headers: options?.headers });
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
 * Middleware response function for early termination with error
 * Returns a formatted Response object that follows the standard error shape
 */
export function middlewareFailure<E = ErrorCollection>(errors: E, options?: { status?: number; headers?: HeadersInit; message?: string }): Response {
  const responseData = buildResponseData(false, null, errors);
  const status = options?.status ?? 403;
  const headers = new Headers(options?.headers);

  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  return new Response(JSON.stringify(responseData), { status, headers });
}

/**
 * Middleware helper to pass through a response with modified headers
 * Preserves the original response body and status while allowing header modifications
 * Commonly used for adding cookies, cors headers, or other response metadata
 */
export function middlewarePassthrough(response: Response, headerModifications?: { append?: Record<string, string>; set?: Record<string, string> }): Response {
  if (!headerModifications) {
    return response;
  }

  // Create new headers from original response
  const headers = new Headers(response.headers);
  if (headerModifications.set) {
    Object.entries(headerModifications.set).forEach(([key, value]) => {
      headers.set(key, value);
    });
  }

  if (headerModifications.append) {
    Object.entries(headerModifications.append).forEach(([key, value]) => {
      headers.append(key, value);
    });
  }

  // Return new response with modified headers
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}


/**
 * Semantic aliases for clarity - all delegate to core functions
 */
export const actionSuccess = dataSuccess;
export const actionFailure = dataFailure;
export const loaderSuccess = dataSuccess;
export const loaderFailure = dataFailure;

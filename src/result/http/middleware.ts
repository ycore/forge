import type { AppError } from '../@types/result.types';
import { err } from '../core/result';

/**
 * Middleware response function for early termination with error
 * Returns a formatted Response object that follows the standard error shape
 */
export function middlewareFailure<E = AppError>(error: E, options?: { status?: number; headers?: HeadersInit }): Response {
  const responseData = typeof error === 'object' && error && 'message' in error ? (error as AppError) : err(String(error));
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

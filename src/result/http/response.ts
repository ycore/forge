import { data } from 'react-router';
import type { AppError, RespondCallbacks, ResponseMeta, Result } from '../@types/result.types';
import { isError } from '../core/result';

/**
 * Send an HTTP response with optional metadata and callbacks
 * Automatically determines status based on whether result is an error
 * Executes callbacks after creating the response for side effects (toasts, logging, etc.)
 */
function respond<T>(result: Result<T>, meta?: ResponseMeta, ...callbacks: RespondCallbacks) {
  const defaultStatus = isError(result) ? 400 : 200;
  const status = meta?.status ?? defaultStatus;

  // Execute callbacks for side effects (toasts, logging, etc.)
  callbacks.forEach(callback => {
    if (callback) callback();
  });

  // Return standard response
  return data(result, { status, headers: meta?.headers });
}

/**
 * Send a successful response
 */
export function respondOk<T>(value: T, meta?: ResponseMeta, ...callbacks: RespondCallbacks) {
  return respond(value, { ...meta, status: meta?.status ?? 200 }, ...callbacks);
}

/**
 * Send an error response
 */
export function respondError(error: AppError, meta?: ResponseMeta, ...callbacks: RespondCallbacks) {
  const status = meta?.status ?? error.status ?? 400;

  return respond(error, { ...meta, status }, ...callbacks);
}

import { dataWithToast } from '@ycore/componentry/impetus/toast';
import { data, redirect } from 'react-router';
import type { AppError, ResponseMeta, Result } from '../@types/result.types';
import { isError } from '../core/result';

/**
 * Send an HTTP response with optional metadata
 * Automatically determines status based on whether result is an error
 */
export function respond<T>(result: Result<T>, meta?: ResponseMeta) {
  // Handle redirects
  if (meta?.redirect) {
    throw redirect(meta.redirect, { 
      status: meta.status ?? 302,
      headers: meta.headers 
    });
  }
  
  // Determine default status based on result type
  const defaultStatus = isError(result) ? 400 : 200;
  const status = meta?.status ?? defaultStatus;
  
  // Add toast if configured
  if (meta?.toast) {
    return dataWithToast(result, {
      message: meta.toast.message,
      type: meta.toast.type,
    });
  }
  
  // Return standard response
  return data(result, {
    status,
    headers: meta?.headers
  });
}

/**
 * Send a successful response
 */
export function respondOk<T>(value: T, meta?: ResponseMeta) {
  return respond(value, {
    ...meta,
    status: meta?.status ?? 200
  });
}

/**
 * Send an error response
 */
export function respondError(error: AppError, meta?: ResponseMeta) {
  // Use error's status if available and not overridden
  const status = meta?.status ?? error.status ?? 400;
  
  return respond(error, {
    ...meta,
    status
  });
}

/**
 * Send a redirect response
 */
export function respondRedirect(url: string, meta?: Omit<ResponseMeta, 'redirect'>) {
  return respond(null as any, {
    ...meta,
    redirect: url
  });
}

/**
 * Send a response with toast notification
 */
export function respondWithToast<T>(
  result: Result<T>, 
  message: string,
  type?: 'success' | 'error' | 'warning' | 'info'
) {
  const toastType = type ?? (isError(result) ? 'error' : 'success');
  
  return respond(result, {
    toast: { message, type: toastType }
  });
}

/**
 * Helper to create responses for common HTTP status codes
 */
export const HttpResponses = {
  ok: <T>(value: T, meta?: ResponseMeta) => 
    respondOk(value, { ...meta, status: 200 }),
    
  created: <T>(value: T, meta?: ResponseMeta) => 
    respondOk(value, { ...meta, status: 201 }),
    
  accepted: <T>(value: T, meta?: ResponseMeta) => 
    respondOk(value, { ...meta, status: 202 }),
    
  noContent: (meta?: ResponseMeta) => 
    respondOk(null, { ...meta, status: 204 }),
    
  badRequest: (error: AppError, meta?: ResponseMeta) => 
    respondError(error, { ...meta, status: 400 }),
    
  unauthorized: (error: AppError, meta?: ResponseMeta) => 
    respondError(error, { ...meta, status: 401 }),
    
  forbidden: (error: AppError, meta?: ResponseMeta) => 
    respondError(error, { ...meta, status: 403 }),
    
  notFound: (error: AppError, meta?: ResponseMeta) => 
    respondError(error, { ...meta, status: 404 }),
    
  conflict: (error: AppError, meta?: ResponseMeta) => 
    respondError(error, { ...meta, status: 409 }),
    
  unprocessable: (error: AppError, meta?: ResponseMeta) => 
    respondError(error, { ...meta, status: 422 }),
    
  serverError: (error: AppError, meta?: ResponseMeta) => 
    respondError(error, { ...meta, status: 500 }),
    
  redirect: (url: string, meta?: Omit<ResponseMeta, 'redirect'>) => 
    respondRedirect(url, { ...meta, status: 302 }),
    
  permanentRedirect: (url: string, meta?: Omit<ResponseMeta, 'redirect'>) => 
    respondRedirect(url, { ...meta, status: 301 }),
    
  temporaryRedirect: (url: string, meta?: Omit<ResponseMeta, 'redirect'>) => 
    respondRedirect(url, { ...meta, status: 307 }),
};
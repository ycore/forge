import { dataWithToast } from '@ycore/componentry/impetus/toast';
import { data, href, redirect } from 'react-router';

import type { AppError } from '../@types/result.types';
import type { ResponseOptions, ToastOptions } from '../@types/response.types';
import { returnFailure, returnSuccess } from '../core/result';

/**
 * Core success response function - works for both loaders and actions
 */
export function handleSuccess<T>(successData: T, options?: ResponseOptions & Partial<ToastOptions>) {
  if (options?.href) {
    throw redirect(href(options.href), { status: options.status ?? 302, headers: options.headers });
  }

  const responseData = returnSuccess(successData);

  if (options?.toast) {
    return dataWithToast(responseData, { message: options.toast, type: 'success' });
  }

  return data(responseData, { status: options?.status ?? 200, headers: options?.headers });
}

/**
 * Core failure response function - works for both loaders and actions
 */
export function handleFailure<E = AppError>(error: E, options?: ResponseOptions & Partial<ToastOptions>) {
  if (options?.href) {
    throw redirect(href(options.href), { status: options.status ?? 302, headers: options.headers });
  }

  const responseData = returnFailure(error);

  if (options?.toast) {
    return dataWithToast(responseData, { message: options.toast, type: 'error' });
  }

  return data(responseData, { status: options?.status ?? 400, headers: options?.headers });
}
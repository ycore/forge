/**
 * Result System - Simplified direct value or error pattern
 */

// Core types
export type {
  AppError,
  FieldErrors,
  ResponseMeta,
  Result,
  ToastConfig,
} from './@types/result.types';
// Error utilities
export {
  badRequestError,
  extractFieldErrors,
  flattenError,
  forbiddenError,
  notFoundError,
  serverError,
  toAppError,
  transformError,
  unauthorizedError,
  validationError,
} from './core/error';
// Core functions
export {
  andThen,
  combine,
  combineObject,
  err,
  getData,
  getError,
  isError,
  isOk,
  map,
  mapError,
  ok,
  orElse,
  tryCatch,
  unwrap,
  unwrapOr,
} from './core/result';
// HTTP middleware helpers
export {
  middlewareFailure,
  middlewarePassthrough,
} from './http/middleware';
// HTTP response helpers
export {
  HttpResponses,
  respond,
  respondError,
  respondOk,
  respondRedirect,
  respondWithToast,
} from './http/response';

// Validation helpers
export {
  createValidationMiddleware,
  validateFormData,
  validateJsonData,
  validateQueryParams,
} from './validation/form';

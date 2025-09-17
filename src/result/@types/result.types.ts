/**
 * Result System - Direct value or error pattern
 *
 * This simplified approach returns either the actual value T or an AppError,
 * eliminating the need for success flags and data wrapping.
 */

/**
 * A Result is either a successful value T or an AppError
 * The discriminator is the presence of the 'message' property and absence of any T properties
 */
export type Result<T, E = AppError> = T | E;

/**
 * Application error structure
 * Must have 'message' property to distinguish from success values
 */
export interface AppError {
  readonly message: string;
  readonly details?: Record<string, unknown>;
  readonly cause?: Error | unknown;
  readonly code?: string;
  readonly status?: number;
}

/**
 * Response metadata for HTTP layer
 */
export interface ResponseMeta {
  status?: number;
  headers?: HeadersInit;
  redirect?: string;
  toast?: ToastConfig;
}

/**
 * Toast configuration
 */
export interface ToastConfig {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

/**
 * Field errors extracted from AppError details
 */
export type FieldErrors = Record<string, string> & {
  form?: string; // General form-level error
};

/**
 * Type guard to check if a value is an AppError
 * An AppError must have a 'message' string property and should not have
 * typical success object properties
 */
export function isAppError(value: unknown): value is AppError {
  if (
    value == null ||
    typeof value !== 'object' ||
    !('message' in value) ||
    typeof (value as any).message !== 'string'
  ) {
    return false;
  }

  // Check if it has the structure of an AppError
  const obj = value as any;

  // Must have message
  if (!obj.message) return false;

  // Optional properties should be the right types if present
  if (obj.details !== undefined && (typeof obj.details !== 'object' || obj.details === null)) {
    return false;
  }

  if (obj.code !== undefined && typeof obj.code !== 'string') {
    return false;
  }

  if (obj.status !== undefined && typeof obj.status !== 'number') {
    return false;
  }

  // If it has other properties that look like success data, it's probably not an error
  // This is a heuristic - we assume AppErrors won't have arbitrary data properties
  const allowedErrorProperties = new Set(['message', 'details', 'cause', 'code', 'status']);
  const hasNonErrorProperties = Object.keys(obj).some(key => !allowedErrorProperties.has(key));

  if (hasNonErrorProperties) {
    return false;
  }

  return true;
}

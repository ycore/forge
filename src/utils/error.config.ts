import type { ErrorCode } from "./@types/error.types";

/**
 * Error codes for different error types
 */
export const ERROR_CODES = {
  // General errors
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  BAD_REQUEST: 'BAD_REQUEST',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  METHOD_NOT_ALLOWED: 'METHOD_NOT_ALLOWED',
  CONFLICT: 'CONFLICT',
  TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',

  // Validation errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_INPUT: 'INVALID_INPUT',
  MISSING_REQUIRED_FIELD: 'MISSING_REQUIRED_FIELD',
  INVALID_FORMAT: 'INVALID_FORMAT',

  // Authentication errors
  AUTH_FAILED: 'AUTH_FAILED',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  TOKEN_INVALID: 'TOKEN_INVALID',
  SESSION_EXPIRED: 'SESSION_EXPIRED',
  SESSION_INVALID: 'SESSION_INVALID',
  ACCOUNT_DISABLED: 'ACCOUNT_DISABLED',
  ACCOUNT_NOT_FOUND: 'ACCOUNT_NOT_FOUND',

  // TOTP specific errors
  TOTP_EXPIRED: 'TOTP_EXPIRED',
  TOTP_INVALID: 'TOTP_INVALID',
  TOTP_SEND_FAILED: 'TOTP_SEND_FAILED',

  // OAuth errors
  OAUTH_ERROR: 'OAUTH_ERROR',
  OAUTH_STATE_MISMATCH: 'OAUTH_STATE_MISMATCH',
  OAUTH_CODE_INVALID: 'OAUTH_CODE_INVALID',

  // Rate limiting errors
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  RATE_LIMIT_WINDOW_EXCEEDED: 'RATE_LIMIT_WINDOW_EXCEEDED',

  // Database errors
  DATABASE_ERROR: 'DATABASE_ERROR',
  DATABASE_CONNECTION_ERROR: 'DATABASE_CONNECTION_ERROR',
  DATABASE_QUERY_ERROR: 'DATABASE_QUERY_ERROR',
  DATABASE_CONSTRAINT_ERROR: 'DATABASE_CONSTRAINT_ERROR',

  // External service errors
  EXTERNAL_SERVICE_ERROR: 'EXTERNAL_SERVICE_ERROR',
  EMAIL_SEND_ERROR: 'EMAIL_SEND_ERROR',
  KV_STORE_ERROR: 'KV_STORE_ERROR',

  // Security errors
  CSRF_TOKEN_INVALID: 'CSRF_TOKEN_INVALID',
  ORIGIN_NOT_ALLOWED: 'ORIGIN_NOT_ALLOWED',
  SUSPICIOUS_ACTIVITY: 'SUSPICIOUS_ACTIVITY',
} as const;

/**
 * HTTP status codes mapping for error types
 */
export const ERROR_STATUS_CODES = {
  [ERROR_CODES.INTERNAL_SERVER_ERROR]: 500,
  [ERROR_CODES.BAD_REQUEST]: 400,
  [ERROR_CODES.UNAUTHORIZED]: 401,
  [ERROR_CODES.FORBIDDEN]: 403,
  [ERROR_CODES.NOT_FOUND]: 404,
  [ERROR_CODES.METHOD_NOT_ALLOWED]: 405,
  [ERROR_CODES.CONFLICT]: 409,
  [ERROR_CODES.TOO_MANY_REQUESTS]: 429,

  [ERROR_CODES.VALIDATION_ERROR]: 400,
  [ERROR_CODES.INVALID_INPUT]: 400,
  [ERROR_CODES.MISSING_REQUIRED_FIELD]: 400,
  [ERROR_CODES.INVALID_FORMAT]: 400,

  [ERROR_CODES.AUTH_FAILED]: 401,
  [ERROR_CODES.INVALID_CREDENTIALS]: 401,
  [ERROR_CODES.TOKEN_EXPIRED]: 401,
  [ERROR_CODES.TOKEN_INVALID]: 401,
  [ERROR_CODES.SESSION_EXPIRED]: 401,
  [ERROR_CODES.SESSION_INVALID]: 401,
  [ERROR_CODES.ACCOUNT_DISABLED]: 403,
  [ERROR_CODES.ACCOUNT_NOT_FOUND]: 404,

  [ERROR_CODES.TOTP_EXPIRED]: 400,
  [ERROR_CODES.TOTP_INVALID]: 400,
  [ERROR_CODES.TOTP_SEND_FAILED]: 500,

  [ERROR_CODES.OAUTH_ERROR]: 400,
  [ERROR_CODES.OAUTH_STATE_MISMATCH]: 400,
  [ERROR_CODES.OAUTH_CODE_INVALID]: 400,

  [ERROR_CODES.RATE_LIMIT_EXCEEDED]: 429,
  [ERROR_CODES.RATE_LIMIT_WINDOW_EXCEEDED]: 429,

  [ERROR_CODES.DATABASE_ERROR]: 500,
  [ERROR_CODES.DATABASE_CONNECTION_ERROR]: 500,
  [ERROR_CODES.DATABASE_QUERY_ERROR]: 500,
  [ERROR_CODES.DATABASE_CONSTRAINT_ERROR]: 409,

  [ERROR_CODES.EXTERNAL_SERVICE_ERROR]: 502,
  [ERROR_CODES.EMAIL_SEND_ERROR]: 502,
  [ERROR_CODES.KV_STORE_ERROR]: 500,

  [ERROR_CODES.CSRF_TOKEN_INVALID]: 403,
  [ERROR_CODES.ORIGIN_NOT_ALLOWED]: 403,
  [ERROR_CODES.SUSPICIOUS_ACTIVITY]: 403,
} as const;

/**
 * User-friendly error messages
 */
export const ERROR_MESSAGES: Record<ErrorCode, string> = {
  [ERROR_CODES.INTERNAL_SERVER_ERROR]: 'An internal server error occurred. Please try again later.',
  [ERROR_CODES.BAD_REQUEST]: 'The request was invalid. Please check your input.',
  [ERROR_CODES.UNAUTHORIZED]: 'Authentication is required to access this resource.',
  [ERROR_CODES.FORBIDDEN]: "You don't have permission to access this resource.",
  [ERROR_CODES.NOT_FOUND]: 'The requested resource was not found.',
  [ERROR_CODES.METHOD_NOT_ALLOWED]: 'This HTTP method is not allowed for this endpoint.',
  [ERROR_CODES.CONFLICT]: 'The request conflicts with the current state of the resource.',
  [ERROR_CODES.TOO_MANY_REQUESTS]: 'Too many requests. Please try again later.',

  [ERROR_CODES.VALIDATION_ERROR]: 'Validation failed. Please check your input.',
  [ERROR_CODES.INVALID_INPUT]: 'The provided input is invalid.',
  [ERROR_CODES.MISSING_REQUIRED_FIELD]: 'A required field is missing.',
  [ERROR_CODES.INVALID_FORMAT]: 'The input format is invalid.',

  [ERROR_CODES.AUTH_FAILED]: 'Authentication failed. Please try again.',
  [ERROR_CODES.INVALID_CREDENTIALS]: 'Invalid credentials. Please check your email and password.',
  [ERROR_CODES.TOKEN_EXPIRED]: 'Your session has expired. Please login again.',
  [ERROR_CODES.TOKEN_INVALID]: 'Invalid authentication token.',
  [ERROR_CODES.SESSION_EXPIRED]: 'Your session has expired. Please login again.',
  [ERROR_CODES.SESSION_INVALID]: 'Invalid session. Please login again.',
  [ERROR_CODES.ACCOUNT_DISABLED]: 'Your account has been disabled. Please contact support.',
  [ERROR_CODES.ACCOUNT_NOT_FOUND]: 'Account not found.',

  [ERROR_CODES.TOTP_EXPIRED]: 'The verification code has expired. Please request a new one.',
  [ERROR_CODES.TOTP_INVALID]: 'Invalid verification code. Please try again.',
  [ERROR_CODES.TOTP_SEND_FAILED]: 'Failed to send verification code. Please try again.',

  [ERROR_CODES.OAUTH_ERROR]: 'OAuth authentication failed. Please try again.',
  [ERROR_CODES.OAUTH_STATE_MISMATCH]: 'OAuth state mismatch. Please try again.',
  [ERROR_CODES.OAUTH_CODE_INVALID]: 'Invalid OAuth authorization code.',

  [ERROR_CODES.RATE_LIMIT_EXCEEDED]: 'Rate limit exceeded. Please try again later.',
  [ERROR_CODES.RATE_LIMIT_WINDOW_EXCEEDED]: 'Too many requests in a short time. Please wait.',

  [ERROR_CODES.DATABASE_ERROR]: 'A database error occurred. Please try again.',
  [ERROR_CODES.DATABASE_CONNECTION_ERROR]: 'Database connection failed. Please try again.',
  [ERROR_CODES.DATABASE_QUERY_ERROR]: 'Database query failed. Please try again.',
  [ERROR_CODES.DATABASE_CONSTRAINT_ERROR]: 'Data constraint violation occurred.',

  [ERROR_CODES.EXTERNAL_SERVICE_ERROR]: 'External service error. Please try again later.',
  [ERROR_CODES.EMAIL_SEND_ERROR]: 'Failed to send email. Please try again.',
  [ERROR_CODES.KV_STORE_ERROR]: 'Storage service error. Please try again.',

  [ERROR_CODES.CSRF_TOKEN_INVALID]: 'Invalid CSRF token. Please refresh and try again.',
  [ERROR_CODES.ORIGIN_NOT_ALLOWED]: 'Request origin is not allowed.',
  [ERROR_CODES.SUSPICIOUS_ACTIVITY]: 'Suspicious activity detected. Access denied.',
} as const;

import type { ERROR_CODES, ERROR_STATUS_CODES } from "../error.config";

export interface BaseError {
  code: string;
  message: string;
  statusCode: number;
  timestamp: string;
  details?: Record<string, unknown>;
}
export interface ValidationError extends BaseError {
  field?: string;
  value?: unknown;
}
export interface AuthError extends BaseError {
  provider?: string;
  userId?: string;
}
export interface RateLimitError extends BaseError {
  identifier: string;
  limit: number;
  remaining: number;
  resetTime: number;
}
export interface DatabaseError extends BaseError {
  query?: string;
  table?: string;
}
export interface ExternalServiceError extends BaseError {
  service: string;
  endpoint?: string;
  responseStatus?: number;
}
export type ErrorCode = keyof typeof ERROR_CODES;
export type ErrorStatusCode = typeof ERROR_STATUS_CODES[ErrorCode];

import type { AppLoadContext } from 'react-router';

/**
 * Options for requiring context values
 */
export interface RequireContextOptions {
  /** Custom error message when context is missing */
  errorMessage?: string;
  /** HTTP status code for error response (default: 500) */
  errorStatus?: number;
}

/**
 * React Router context manager interface
 */
export interface ContextManager {
  /** Get context value, throws if missing */
  require<T>(context: AppLoadContext, contextKey: React.Context<T>, options?: RequireContextOptions): T;
  /** Get context value, returns null if missing */
  get<T>(context: AppLoadContext, contextKey: React.Context<T>): T | null;
  /** Get context value with default fallback */
  getOrDefault<T>(context: AppLoadContext, contextKey: React.Context<T>, defaultValue: T): T;
}

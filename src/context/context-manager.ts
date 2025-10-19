import type { AppLoadContext } from 'react-router';
import type { RequireContextOptions } from './@types/context.types';

/**
 * Get a context value with optional default fallback
 *
 * @example
 * const theme = getContext(context, themeContext, 'light');
 */
export function getContext<T>(context: AppLoadContext, contextKey: React.Context<T>): T | null;
export function getContext<T>(context: AppLoadContext, contextKey: React.Context<T>, defaultValue: T): T;
export function getContext<T>(context: AppLoadContext, contextKey: React.Context<T>, defaultValue?: T): T | null {
  // @ts-expect-error - AppLoadContext.get returns unknown which is correct, but we know the type from the context key
  const value = context.get(contextKey);

  if (value === null || value === undefined) {
    return defaultValue !== undefined ? defaultValue : null;
  }

  return value;
}

/**
 * Require a context value, throwing an error if not found
 * Use when the context MUST be present (e.g., from middleware)
 *
 * @example
 * const user = requireContext(context, userContext, {
 *   errorMessage: 'Authentication middleware not configured',
 *   errorStatus: 500
 * });
 */
export function requireContext<T>(
  context: AppLoadContext,
  contextKey: React.Context<T>,
  options?: RequireContextOptions
): NonNullable<T> {
  // @ts-expect-error - AppLoadContext.get returns unknown which is correct, but we know the type from the context key
  const value = context.get(contextKey);

  if (value === null || value === undefined) {
    const contextName = (contextKey as { displayName?: string }).displayName || 'Unknown';
    const message = options?.errorMessage || `Required context '${contextName}' not found - middleware may not have run`;
    const status = options?.errorStatus || 500;

    throw new Response(message, { status, statusText: 'Internal Server Error' });
  }

  return value as NonNullable<T>;
}

import { type AppLoadContext, createContext, type RouterContext, type RouterContextProvider } from 'react-router';
import type { RequireContextOptions } from './@types/context.types';

const CONTEXT_REGISTRY = new Map<string, RouterContext<any>>();

/**
 * Create a singleton React Router context that persists across bundled packages
 */
export function createContextSingleton<T>(name: string, defaultValue: T): RouterContext<T> {
  if (CONTEXT_REGISTRY.has(name)) {
    return CONTEXT_REGISTRY.get(name)!;
  }

  const context = createContext<T>(defaultValue);
  (context as any).displayName = name;
  CONTEXT_REGISTRY.set(name, context);

  return context;
}

/**
 * Get a context value with optional default fallback
 */
export function getContext<T>(context: Readonly<AppLoadContext | RouterContextProvider>, contextKey: RouterContext<T>): T | null;
export function getContext<T>(context: Readonly<AppLoadContext | RouterContextProvider>, contextKey: RouterContext<T>, defaultValue: T): T;
export function getContext<T>(context: Readonly<AppLoadContext | RouterContextProvider>, contextKey: RouterContext<T>, defaultValue?: T): T | null {
  // @ts-expect-error - AppLoadContext.get returns unknown which is correct, but we know the type from the context key
  const value = context.get(contextKey);

  if (value === null || value === undefined) {
    return defaultValue !== undefined ? defaultValue : null;
  }

  return value;
}

/**
 * Require a context value, throwing an error if not found - context MUST be present (e.g., from middleware)
 */
export function requireContext<T>(context: Readonly<AppLoadContext | RouterContextProvider>, contextKey: RouterContext<T>, options?: RequireContextOptions): NonNullable<T> {
  // @ts-expect-error - AppLoadContext.get returns unknown which is correct, but we know the type from the context key
  const value = context.get(contextKey);

  if (value === null || value === undefined) {
    const contextName = (contextKey as { displayName?: string }).displayName || 'Unknown';
    const message = options?.errorMessage || `Required context '${contextName}' not found - middleware may have failed`;
    const status = options?.errorStatus || 500;

    throw new Response(message, { status, statusText: 'Internal Server Error' });
  }

  return value as NonNullable<T>;
}

/**
 * Set a context value in React Router context
 */
export function setContext<T>(context: Readonly<RouterContextProvider> | RouterContextProvider, contextKey: RouterContext<T>, value: T): void {
  (context as RouterContextProvider).set(contextKey, value);
}

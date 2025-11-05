import type { RouterContextProvider } from 'react-router';

import { createContextSingleton } from '../context/context-manager';

/**
 * Cloudflare context - singleton pattern to prevent context duplication
 */
export const CloudflareContext = createContextSingleton<{ env: Cloudflare.Env; ctx: ExecutionContext; cf?: RequestInitCfProperties }>(
  'CloudflareContext',
  {} as { env: Cloudflare.Env; ctx: ExecutionContext; cf?: RequestInitCfProperties }
);

export function getBindings(context: Readonly<RouterContextProvider>) {
  return context.get(CloudflareContext).env;
}

export function getExecutionContext(context: Readonly<RouterContextProvider>): ExecutionContext {
  return context.get(CloudflareContext).ctx;
}

export function getRequestProperties(context: Readonly<RouterContextProvider>): RequestInitCfProperties | undefined {
  return context.get(CloudflareContext).cf;
}

export function waitUntil<T>(context: Readonly<RouterContextProvider>, promise: Promise<T>) {
  return getExecutionContext(context).waitUntil(promise);
}

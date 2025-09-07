import { unstable_createContext, type unstable_RouterContextProvider } from 'react-router';

export const CloudflareContext = unstable_createContext<{ env: Cloudflare.Env; ctx: ExecutionContext; cf?: RequestInitCfProperties }>({} as any);

export function getBindings(context: Readonly<unstable_RouterContextProvider>) {
  return context.get(CloudflareContext).env;
}

export function getExecutionContext(context: Readonly<unstable_RouterContextProvider>): ExecutionContext {
  return context.get(CloudflareContext).ctx;
}

export function getRequestProperties(context: Readonly<unstable_RouterContextProvider>): RequestInitCfProperties | undefined {
  return context.get(CloudflareContext).cf;
}

export function waitUntil<T>(context: Readonly<unstable_RouterContextProvider>, promise: Promise<T>) {
  return getExecutionContext(context).waitUntil(promise);
}

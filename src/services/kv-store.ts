/// <reference path="../@types/worker-runtime.d.ts" />

import type { RouterContextProvider } from 'react-router';
import type { KVBindings } from './@types/cloudflare.types';
import { getBindings } from './cloudflare';

/**
 * Get KV namespace from context using a pre-configured binding name
 */
export function getKVStore(context: Readonly<RouterContextProvider>, bindingName: KVBindings): KVNamespace | undefined {
  const bindings = getBindings(context);

  return bindings[bindingName as keyof typeof bindings] as KVNamespace | undefined;
}

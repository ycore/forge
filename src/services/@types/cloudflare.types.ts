// Placeholder value for unconfigured bindings/secrets
export const UNCONFIGURED = 'UNCONFIGURED' as const;
export type Unconfigured = typeof UNCONFIGURED;

// Actual binding names from Cloudflare.Env
export type ActualKVBindingNames = {
  [K in keyof Cloudflare.Env]: Cloudflare.Env[K] extends KVNamespace ? K : never
}[keyof Cloudflare.Env];

export type ActualD1BindingNames = {
  [K in keyof Cloudflare.Env]: Cloudflare.Env[K] extends D1Database ? K : never
}[keyof Cloudflare.Env];

export type ActualSecretNames = {
  [K in keyof Cloudflare.Env]: K extends `${string}_SECRET_KEY` | `${string}_API_KEY` ? K : never
}[keyof Cloudflare.Env];

export type ActualEnvironmentVarNames = {
  [K in keyof Cloudflare.Env]: Cloudflare.Env[K] extends string
  ? K extends ActualSecretNames
  ? never
  : K
  : never
}[keyof Cloudflare.Env];

// Types that allow unconfigured defaults
export type KVBindings = ActualKVBindingNames | Unconfigured;
export type D1Bindings = ActualD1BindingNames | Unconfigured;
export type SecretBindings = ActualSecretNames | Unconfigured;
export type VarBindings = ActualEnvironmentVarNames | Unconfigured;
// Legacy alias for backward compatibility
export type EnvironmentVarNames = ActualEnvironmentVarNames;

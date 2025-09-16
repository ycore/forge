export type KVBindingNames = {
  [K in keyof Cloudflare.Env]: Cloudflare.Env[K] extends KVNamespace ? K : never
}[keyof Cloudflare.Env];

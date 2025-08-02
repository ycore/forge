// src/adapters/cloudflare/context.server.ts
import { unstable_createContext } from "react-router";
var CloudflareContext = unstable_createContext();
function getBindings(context) {
  return context.get(CloudflareContext).env;
}
function getExecutionContext(context) {
  return context.get(CloudflareContext).ctx;
}
function waitUntil(context, promise) {
  return getExecutionContext(context).waitUntil(promise);
}
export {
  waitUntil,
  getBindings,
  CloudflareContext
};

//# debugId=041FD8F6A696783764756E2164756E21

// src/adapters/cloudflare/context.server.ts
import { unstable_createContext } from "react-router";
var CloudflareContext = unstable_createContext();
function getBindings(context) {
  return context.get(CloudflareContext).env;
}
function getExecutionContext(context) {
  return context.get(CloudflareContext).ctx;
}
function getRequestProperties(context) {
  return context.get(CloudflareContext).cf;
}
function waitUntil(context, promise) {
  return getExecutionContext(context).waitUntil(promise);
}
export {
  waitUntil,
  getRequestProperties,
  getExecutionContext,
  getBindings,
  CloudflareContext
};

//# debugId=ACAF4975FD92340D64756E2164756E21

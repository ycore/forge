import { unstable_createContext as o } from "react-router";
const n = o();
function u(t) {
  return t.get(n).env;
}
function i(t) {
  return t.get(n).ctx;
}
function c(t, e) {
  return i(t).waitUntil(e);
}
export {
  n as CloudflareContext,
  u as getBindings,
  c as waitUntil
};
//# sourceMappingURL=cloudflare.js.map

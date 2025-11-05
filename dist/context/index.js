import { createContext } from "react-router";
const CONTEXT_REGISTRY = /* @__PURE__ */ new Map();
function createContextSingleton(name, defaultValue) {
  if (CONTEXT_REGISTRY.has(name)) {
    return CONTEXT_REGISTRY.get(name);
  }
  const context = createContext(defaultValue);
  context.displayName = name;
  CONTEXT_REGISTRY.set(name, context);
  return context;
}
function getContext(context, contextKey, defaultValue) {
  const value = context.get(contextKey);
  if (value === null || value === void 0) {
    return defaultValue !== void 0 ? defaultValue : null;
  }
  return value;
}
function requireContext(context, contextKey, options) {
  const value = context.get(contextKey);
  if (value === null || value === void 0) {
    const contextName = contextKey.displayName || "Unknown";
    const message = options?.errorMessage || `Required context '${contextName}' not found - middleware may have failed`;
    const status = options?.errorStatus || 500;
    throw new Response(message, { status, statusText: "Internal Server Error" });
  }
  return value;
}
function setContext(context, contextKey, value) {
  context.set(contextKey, value);
}
export {
  createContextSingleton,
  getContext,
  requireContext,
  setContext
};
//# sourceMappingURL=index.js.map

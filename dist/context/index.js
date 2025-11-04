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
  getContext,
  requireContext,
  setContext
};
//# sourceMappingURL=index.js.map

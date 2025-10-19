// src/context/context-manager.ts
function getContext(context, contextKey, defaultValue) {
  const value = context.get(contextKey);
  if (value === null || value === undefined) {
    return defaultValue !== undefined ? defaultValue : null;
  }
  return value;
}
function requireContext(context, contextKey, options) {
  const value = context.get(contextKey);
  if (value === null || value === undefined) {
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
  setContext,
  requireContext,
  getContext
};

//# debugId=11A4559278895F7064756E2164756E21

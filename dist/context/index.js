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
    const message = options?.errorMessage || `Required context '${contextName}' not found - middleware may not have run`;
    const status = options?.errorStatus || 500;
    throw new Response(message, { status, statusText: "Internal Server Error" });
  }
  return value;
}
export {
  requireContext,
  getContext
};

//# debugId=05FA7E380AD5B74464756E2164756E21

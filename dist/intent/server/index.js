function err(message, details, options) {
  return {
    message,
    details,
    cause: options?.cause,
    code: options?.code,
    status: options?.status
  };
}
function cloneFormData(formData) {
  const cloned = new FormData();
  formData.forEach((value, key) => {
    cloned.append(key, value);
  });
  return cloned;
}
async function handleIntent(formData, handlers, config) {
  const fieldName = config?.fieldName ?? "intent";
  const intentValue = formData.get(fieldName);
  const intentName = typeof intentValue === "string" ? intentValue : null;
  const handlerFormData = config?.cloneFormData ? cloneFormData(formData) : formData;
  if (intentName === null) {
    if (config?.defaultHandler) {
      return config.defaultHandler(handlerFormData);
    }
    return err("Intent field is required", { field: fieldName, code: "INTENT_MISSING" });
  }
  const handler = handlers[intentName];
  if (!handler) {
    return err(`Unknown intent: ${intentName}`, {
      field: fieldName,
      intent: intentName,
      availableIntents: Object.keys(handlers),
      code: "INTENT_NOT_FOUND"
    });
  }
  return handler(handlerFormData);
}
function getIntent(formData, fieldName = "intent") {
  const value = formData.get(fieldName);
  return typeof value === "string" ? value : null;
}
function hasIntent(formData, intent, fieldName = "intent") {
  return getIntent(formData, fieldName) === intent;
}
export {
  getIntent,
  handleIntent,
  hasIntent
};
//# sourceMappingURL=index.js.map

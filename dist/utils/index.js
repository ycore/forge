// src/utils/config-merge.ts
function isObject(item) {
  return Boolean(item && typeof item === "object" && !Array.isArray(item) && !(item instanceof Date));
}
function mergeArrays(target, source) {
  const hasNamedObjects = target.every((item) => isObject(item) && typeof item.name === "string") && source.every((item) => isObject(item) && typeof item.name === "string");
  if (hasNamedObjects) {
    const result = [...target];
    const resultMap = new Map;
    result.forEach((item, index) => {
      resultMap.set(item.name, index);
    });
    for (const sourceItem of source) {
      const name = sourceItem.name;
      const existingIndex = resultMap.get(name);
      if (existingIndex !== undefined) {
        result[existingIndex] = deepMerge(result[existingIndex], sourceItem);
      } else {
        result.push(sourceItem);
        resultMap.set(name, result.length - 1);
      }
    }
    return result;
  }
  return source;
}
function deepMerge(target, ...sources) {
  if (!sources.length)
    return target;
  const result = structuredClone(target);
  for (const source of sources) {
    if (!source)
      continue;
    for (const key in source) {
      const sourceValue = source[key];
      const targetValue = result[key];
      if (sourceValue === undefined)
        continue;
      if (Array.isArray(sourceValue) && Array.isArray(targetValue)) {
        result[key] = mergeArrays(targetValue, sourceValue);
      } else if (isObject(sourceValue) && isObject(targetValue)) {
        result[key] = deepMerge(targetValue, sourceValue);
      } else {
        result[key] = sourceValue;
      }
    }
  }
  return result;
}
// src/utils/date-timestamp.ts
function getCurrentTimestamp() {
  return Date.now();
}
function addTimeToNow(timeInSeconds) {
  return getCurrentTimestamp() + timeInSeconds * 1000;
}
function isExpired(expirationTimestamp) {
  return getCurrentTimestamp() > expirationTimestamp;
}
var AUTH_SESSION_TTL = 60 * 60 * 24 * 15;
var AUTH_TOTP_PERIOD = 60 * 10;
export {
  isExpired,
  getCurrentTimestamp,
  deepMerge,
  addTimeToNow,
  AUTH_TOTP_PERIOD,
  AUTH_SESSION_TTL
};

//# debugId=95C09E12FC93F7AF64756E2164756E21

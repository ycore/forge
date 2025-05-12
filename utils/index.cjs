"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/index.ts
var utils_exports = {};
__export(utils_exports, {
  base64Decode: () => base64Decode,
  base64Encode: () => base64Encode,
  basePath: () => basePath,
  deepMerge: () => deepMerge,
  go: () => go,
  mergeJSON: () => mergeJSON,
  random32: () => random32,
  random64: () => random64,
  randomSalt: () => randomSalt,
  shuffle: () => shuffle,
  timingSafeCompare: () => timingSafeCompare,
  toBase: () => toBase,
  toHex: () => toHex,
  toJweKey: () => toJweKey
});
module.exports = __toCommonJS(utils_exports);

// src/utils/crypto.ts
var import_jose = require("jose");
var BASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
var random32 = async () => {
  return new Uint32Array(crypto.getRandomValues(new Uint8Array(4)).buffer)[0];
};
var random64 = () => {
  return import_jose.base64url.encode(crypto.getRandomValues(new Uint8Array(20)));
};
var toJweKey = async (secret) => {
  const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(secret));
  return new Uint8Array(hash);
};
var shuffle = (arr) => {
  return arr.map((a) => [Math.random(), a]).sort((a, b) => a[0] - b[0]).map((a) => a[1]);
};
function randomSalt(length = 16) {
  const randomBytes = crypto.getRandomValues(new Uint8Array(length));
  return toHex(Array.from(randomBytes));
}
function timingSafeCompare(a, b) {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}
var toHex = (valueBuffer) => valueBuffer.map((byte) => byte.toString(16).padStart(2, "0")).join("");
var base64Encode = (data) => import_jose.base64url.encode(data);
var base64Decode = (data) => {
  const decoder = new TextDecoder();
  return decoder.decode(import_jose.base64url.decode(data));
};
var toBase = (num) => {
  const baseLength = BASE_CHARS.length;
  if (num < 0) throw new Error("Input must be a non-negative number");
  if (num < baseLength) return BASE_CHARS[num];
  let result = "";
  let remainder = num;
  while (remainder > 0) {
    const index = (remainder - 1) % baseLength;
    result = BASE_CHARS[index] + result;
    remainder = Math.floor((remainder - 1) / baseLength);
  }
  return result;
};

// src/utils/file.ts
var basePath = (fileurl) => {
  const url = new URL(fileurl);
  const pathParts = url.pathname.split("/");
  pathParts.pop();
  return pathParts.join("/");
};

// src/utils/go-safe.ts
var NATIVE_EXCEPTIONS = [EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError];
function go(promiseOrFunc, throwNative = false) {
  return promiseOrFunc instanceof Promise ? goAsync(promiseOrFunc, throwNative) : goSync(promiseOrFunc, throwNative);
}
async function goAsync(promise, throwNative) {
  try {
    return [await promise, null];
  } catch (e) {
    return returnException(e, throwNative);
  }
}
function goSync(func, throwNative) {
  try {
    const result = func();
    return [result, null];
  } catch (e) {
    return returnException(e, throwNative);
  }
}
function returnException(e, throwNative) {
  if (throwNative && NATIVE_EXCEPTIONS.some((Exception) => e instanceof Exception)) {
    throw e;
  }
  return [void 0, e];
}

// src/utils/json.ts
var mergeJSON = (targetJson, ...mergesJson) => {
  mergesJson.map((mergeJson) => {
    for (const mergeKey in mergeJson) {
      if (Object.prototype.hasOwnProperty.call(mergeJson, mergeKey)) {
        const mergeValue = mergeJson[mergeKey];
        if (typeof mergeValue === "object" && !Array.isArray(mergeValue) && mergeValue !== null) {
          if (!targetJson[mergeKey]) {
            targetJson[mergeKey] = {};
          }
          mergeJSON(targetJson[mergeKey], mergeValue);
        } else {
          targetJson[mergeKey] = mergeValue;
        }
      }
    }
  });
  return targetJson;
};

// src/utils/object.ts
function deepMerge(defaults, overrides) {
  if (!overrides) return { ...defaults };
  const result = { ...defaults };
  for (const key of Object.keys(overrides)) {
    const k = key;
    const value = overrides[k];
    if (value !== null && typeof value === "object" && !Array.isArray(value) && result[k] !== null && typeof result[k] === "object" && !Array.isArray(result[k])) {
      result[k] = deepMerge(result[k], value);
    } else if (value !== void 0) {
      result[k] = value;
    }
  }
  return result;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  base64Decode,
  base64Encode,
  basePath,
  deepMerge,
  go,
  mergeJSON,
  random32,
  random64,
  randomSalt,
  shuffle,
  timingSafeCompare,
  toBase,
  toHex,
  toJweKey
});
//# sourceMappingURL=index.cjs.map
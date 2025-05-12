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

// src/http/index.ts
var http_exports = {};
__export(http_exports, {
  getDomainUrl: () => getDomainUrl,
  json: () => json
});
module.exports = __toCommonJS(http_exports);

// src/http/request.ts
function getDomainUrl(request) {
  const host = request.headers.get("X-Forwarded-Host") ?? request.headers.get("host") ?? new URL(request.url).host;
  const protocol = request.headers.get("X-Forwarded-Proto") ?? "http";
  return `${protocol}://${host}`;
}

// src/http/response.ts
function json(body, options) {
  return new Response(JSON.stringify(body), {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getDomainUrl,
  json
});
//# sourceMappingURL=index.cjs.map
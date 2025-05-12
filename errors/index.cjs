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

// src/errors/index.ts
var errors_exports = {};
__export(errors_exports, {
  BaseError: () => BaseError
});
module.exports = __toCommonJS(errors_exports);

// src/errors/error-base.ts
var BaseError = class _BaseError extends Error {
  constructor(arg1, arg2, arg3) {
    if (typeof arg1 === "object") {
      const { kind, message, cause } = arg1;
      super(message);
      this.kind = kind;
      this.cause = cause;
    } else {
      super(arg2);
      this.kind = arg1;
      this.cause = arg3;
    }
    Object.setPrototypeOf(this, _BaseError.prototype);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BaseError
});
//# sourceMappingURL=index.cjs.map
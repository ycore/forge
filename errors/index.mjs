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
export {
  BaseError
};
//# sourceMappingURL=index.mjs.map
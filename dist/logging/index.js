// src/logging/logger.ts
var logger = {
  log(params) {
    console.log({
      ...params,
      level: params.level || "info",
      timestamp: new Date().toISOString()
    });
  },
  debug(params) {
    this.log({ ...params, level: "debug" });
  },
  info(params) {
    this.log({ ...params, level: "info" });
  },
  warn(params) {
    this.log({ ...params, level: "warn" });
  },
  error(params) {
    this.log({ ...params, level: "error" });
  }
};
export {
  logger
};

//# debugId=A18FE2DFB6291FEA64756E2164756E21

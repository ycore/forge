// src/logger/plugin/logger.plugin.ts
var DEFAULT_STRIP_LEVELS = ["debug", "info", "notice"];
var DEFAULT_KEEP_LEVELS = ["warning", "error", "critical", "alert", "emergency"];
var DEFAULT_LOGGER_PATTERNS = ["@ycore/forge/logger", "./logger", "../logger"];
function loggerOptimization(options = {}) {
  const { production = true, stripLevels = DEFAULT_STRIP_LEVELS, keepLevels = DEFAULT_KEEP_LEVELS, replacementStrategy = "remove", loggerPatterns = DEFAULT_LOGGER_PATTERNS } = options;
  const isProd = production;
  const _shouldOptimize = isProd;
  return {
    name: "logger-optimization",
    enforce: "pre",
    config(config) {
      if (isProd) {
        config.esbuild = {
          ...config.esbuild,
          drop: ["debugger"],
          pure: [
            "logger.debug",
            "logger.info",
            "logger.notice",
            ...stripLevels.map((level) => `${level}`)
          ],
          treeShaking: true
        };
      }
    }
  };
}
export {
  loggerOptimization
};

//# debugId=D3EE1B213C3EA4B464756E2164756E21

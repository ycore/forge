const DEFAULT_STRIP_LEVELS = ["debug", "info", "notice"];
const DEFAULT_KEEP_LEVELS = ["warning", "error", "critical", "alert", "emergency"];
const DEFAULT_LOGGER_PATTERNS = ["@ycore/forge/logger", "./logger", "../logger"];
function loggerOptimization(options = {}) {
  const { production = true, stripLevels = DEFAULT_STRIP_LEVELS, keepLevels = DEFAULT_KEEP_LEVELS, replacementStrategy = "remove", loggerPatterns = DEFAULT_LOGGER_PATTERNS } = options;
  const isProd = production;
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
            // Also handle destructured imports
            ...stripLevels.map((level) => `${level}`)
          ],
          treeShaking: true
        };
      }
    }
    // Temporarily disable transform to focus on esbuild optimization
    // transform(code, id) {
    //   return null;
    // },
  };
}
export {
  loggerOptimization
};
//# sourceMappingURL=index.js.map

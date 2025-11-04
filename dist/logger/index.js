const urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let nanoid = (size = 21) => {
  let id = "";
  let bytes = crypto.getRandomValues(new Uint8Array(size |= 0));
  while (size--) {
    id += urlAlphabet[bytes[size] & 63];
  }
  return id;
};
const isLogMetadata = (metadata) => {
  return typeof metadata === "object" && metadata !== null && "timestamp" in metadata && "level" in metadata && typeof metadata.timestamp === "string" && typeof metadata.level === "string";
};
const isLogEntry = (data) => {
  return typeof data === "object" && data !== null && "event" in data && "level" in data && "timestamp" in data && typeof data.event === "string" && typeof data.level === "string" && typeof data.timestamp === "string";
};
const logEntryKvTemplate = (prefix, timestamp, workerId, uniqueId, attemptSuffix) => `${prefix}${timestamp}-${workerId}-${uniqueId}${attemptSuffix}`;
function createKVLogChannel(config, minLevel = "info") {
  const { kv, logsLimit = 500, logsTrigger = 1e3, keyPrefix = "log:" } = config;
  const workerId = nanoid(6);
  return {
    name: "kv-storage",
    minLevel,
    enabled: true,
    output: async (entry) => {
      const storeLogWithRetry = async (maxAttempts = 3) => {
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
          try {
            const timestamp = Date.now() * 1e3 + Math.floor(performance.now() % 1 * 1e3);
            const uniqueId = nanoid(8);
            const attemptSuffix = attempt > 0 ? `-r${attempt}` : "";
            const logKey = logEntryKvTemplate(keyPrefix, timestamp, workerId, uniqueId, attemptSuffix);
            await kv.put(logKey, JSON.stringify(entry), {
              metadata: {
                timestamp: entry.timestamp,
                level: entry.level
              }
            });
            return true;
          } catch (_error) {
            if (attempt < maxAttempts - 1) {
              const backoff = 2 ** attempt * 5 + Math.random() * 5;
              await new Promise((resolve) => setTimeout(resolve, backoff));
            }
          }
        }
        return false;
      };
      try {
        await storeLogWithRetry();
        if (Math.random() < 0.02) cleanupOldLogsIfNeeded(kv, logsLimit, logsTrigger, keyPrefix).catch(() => {
        });
      } catch (_error) {
      }
    }
  };
}
async function batchDeleteKeys(kv, keys, batchSize = 100) {
  for (let i = 0; i < keys.length; i += batchSize) {
    const batch = keys.slice(i, i + batchSize);
    const deletePromises = batch.map((key) => kv.delete(key));
    await Promise.all(deletePromises);
  }
}
async function cleanupOldLogsIfNeeded(kv, logsLimit, logsTrigger, keyPrefix) {
  try {
    const listResult = await kv.list({ prefix: keyPrefix, limit: logsTrigger + 1 });
    if (listResult.keys.length <= logsTrigger) return;
    await cleanupOldLogs(kv, logsLimit, keyPrefix);
  } catch (_error) {
  }
}
async function cleanupOldLogs(kv, logsLimit, keyPrefix) {
  try {
    const listResult = await kv.list({ prefix: keyPrefix });
    if (listResult.keys.length <= logsLimit) {
      return;
    }
    const validKeys = listResult.keys.filter((key) => isLogMetadata(key.metadata)).map((key) => ({
      name: key.name,
      timestamp: new Date(key.metadata.timestamp).getTime()
    })).sort((a, b) => a.timestamp - b.timestamp);
    const keysToDelete = validKeys.slice(0, Math.max(0, validKeys.length - logsLimit)).map((key) => key.name);
    if (keysToDelete.length > 0) {
      await batchDeleteKeys(kv, keysToDelete);
    }
  } catch (_error) {
  }
}
async function getLogsFromKV(kv, options = {}) {
  const { limit = 100, keyPrefix = "log:" } = options;
  try {
    const listResult = await kv.list({ prefix: keyPrefix });
    if (listResult.keys.length === 0) {
      return [];
    }
    const sortedKeys = listResult.keys.filter((key) => isLogMetadata(key.metadata)).sort((a, b) => {
      const timestampA = new Date(a.metadata.timestamp).getTime();
      const timestampB = new Date(b.metadata.timestamp).getTime();
      return timestampB - timestampA;
    }).slice(0, limit);
    const logPromises = sortedKeys.map(async (key) => {
      const logData = await kv.get(key.name);
      if (!logData) return null;
      try {
        const parsed = JSON.parse(logData);
        return isLogEntry(parsed) ? parsed : null;
      } catch {
        return null;
      }
    });
    const logs = await Promise.all(logPromises);
    return logs.filter((log) => log !== null);
  } catch (error) {
    console.error("Failed to retrieve logs from KV:", error);
    return [];
  }
}
async function clearLogsFromKV(kv, options = {}) {
  const { keyPrefix = "log:" } = options;
  try {
    const listResult = await kv.list({ prefix: keyPrefix });
    const keysToDelete = listResult.keys.map((key) => key.name);
    await batchDeleteKeys(kv, keysToDelete);
  } catch (error) {
    console.error("Failed to clear logs from KV:", error);
    throw error;
  }
}
const LOG_LEVELS = {
  emergency: 7,
  alert: 6,
  critical: 5,
  error: 4,
  warning: 3,
  notice: 2,
  info: 1,
  debug: 0
};
function shouldLog(level, minLevel) {
  return LOG_LEVELS[level] >= LOG_LEVELS[minLevel];
}
function getChannelOptions(registry, production, baseOptions = {}, kv) {
  if (registry === "console") {
    const envDefaults = {
      format: production ? "raw" : "json",
      useLogLevelMethods: !production
    };
    return { ...envDefaults, ...baseOptions };
  }
  let options = { ...baseOptions };
  if (registry === "kv" && kv) {
    options = { ...options, kv };
  }
  return options;
}
function getLoggerDefaults(config, production) {
  const defaults = production ? config.defaults?.production : config.defaults?.development;
  return {
    defaultLevel: defaults?.defaultLevel || (production ? "warning" : "info"),
    enableSanitization: defaults?.enableSanitization ?? true
  };
}
const defaultLoggerConfig = {
  init: [
    {
      production: false,
      channel: "console",
      level: "debug"
    },
    {
      production: false,
      channel: "console",
      level: "warning"
    },
    {
      production: false,
      channel: "kv",
      level: "info"
    },
    {
      production: true,
      channel: "kv",
      level: "warning"
    }
  ],
  channels: {
    console: {
      registry: "console",
      options: {}
      // Will be populated with environment defaults
    },
    kv: {
      registry: "kv",
      options: {
        logsLimit: 500,
        logsTrigger: 750
      }
    }
  },
  defaults: {
    development: {
      defaultLevel: "debug",
      enableSanitization: true
    },
    production: {
      defaultLevel: "warning",
      enableSanitization: true
    }
  }
};
const formatters = {
  json: (entry) => JSON.stringify(entry, null, 2),
  compact: (entry) => {
    const parts = [entry.level.toUpperCase(), entry.event || "LOG", entry.timestamp];
    if (entry.args && Array.isArray(entry.args) && entry.args.length > 0) {
      parts.push(...entry.args.map((arg) => typeof arg === "string" ? arg : JSON.stringify(arg)));
    }
    const { level, event, timestamp, args, ...rest } = entry;
    if (Object.keys(rest).length > 0) {
      parts.push(...Object.values(rest).map((val) => typeof val === "string" ? val : JSON.stringify(val)));
    }
    return `[ ${parts.join(" || ")} ]`;
  },
  raw: (entry) => JSON.stringify(entry)
};
function formatLogEntry(entry, format) {
  return formatters[format](entry);
}
const consoleMethods = {
  emergency: console.error,
  alert: console.error,
  critical: console.error,
  error: console.error,
  warning: console.warn,
  notice: console.info,
  info: console.info,
  debug: console.debug
};
function createConsoleChannel(minLevel, config = {}) {
  const { format = "raw", useLogLevelMethods = false } = config;
  return {
    name: "console",
    minLevel,
    enabled: true,
    output: (entry) => {
      const output = formatLogEntry(entry, format);
      if (useLogLevelMethods) {
        consoleMethods[entry.level](output);
      } else {
        console.info(output);
      }
    }
  };
}
const ChannelRegistry = {
  console: (minLevel, config) => createConsoleChannel(minLevel, config),
  kv: (minLevel, config) => createKVLogChannel(config, minLevel)
};
function createInternalLoggerConfig(config, production, kv) {
  const relevantInits = config.init.filter((init) => init.production === production && init.level !== "null");
  const channels = relevantInits.map((init) => {
    const channelDef = config.channels[init.channel];
    if (!channelDef) {
      throw new Error(`Channel definition not found for: ${init.channel}`);
    }
    const options = getChannelOptions(channelDef.registry, production, channelDef.options, kv);
    const channelFactories = {
      console: () => ChannelRegistry.console(init.level, options),
      kv: () => {
        if (!options.kv) {
          throw new Error("KV namespace is required for KV channel");
        }
        return ChannelRegistry.kv(init.level, options);
      }
    };
    const createChannel = channelFactories[channelDef.registry];
    if (!createChannel) {
      throw new Error(`Unsupported registry type: ${channelDef.registry}`);
    }
    return createChannel();
  });
  const { defaultLevel, enableSanitization } = getLoggerDefaults(config, production);
  return { defaultLevel, channels, enableSanitization };
}
let loggerConfig = {
  defaultLevel: "info",
  channels: [],
  enableSanitization: true
};
function sanitizeLogParams(params) {
  if (!loggerConfig.enableSanitization) {
    return params;
  }
  const { password, token, secret, apiKey, sessionToken, bearerToken, refreshToken, ...sanitized } = params;
  return sanitized;
}
function formatLogArgs(args) {
  const [message, ...rest] = args;
  if (typeof message === "object" && message !== null) {
    return { ...message, ...rest.length > 0 ? { args: rest } : {} };
  }
  return { event: String(message), ...rest.length > 0 ? { args: rest } : {} };
}
function createLogEntry(params) {
  const sanitizedParams = sanitizeLogParams(params);
  return {
    ...sanitizedParams,
    level: sanitizedParams.level || loggerConfig.defaultLevel,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  };
}
async function writeToChannels(entry) {
  const writePromises = loggerConfig.channels.filter((channel) => channel.enabled && shouldLog(entry.level, channel.minLevel)).map((channel) => {
    try {
      const result = channel.output(entry);
      return result instanceof Promise ? result : Promise.resolve();
    } catch (_error) {
      return Promise.resolve();
    }
  });
  await Promise.allSettled(writePromises);
}
const logger = {
  /**
   * Configure the logger with custom settings
   */
  configure(config) {
    loggerConfig = { ...loggerConfig, ...config };
  },
  /**
   * Get current logger configuration
   */
  getConfig() {
    return { ...loggerConfig };
  },
  /**
   * Core logging method that writes to all enabled channels
   */
  async log(params) {
    const entry = createLogEntry(params);
    await writeToChannels(entry);
  },
  /**
   * Genarates a support number
   */
  async support() {
    return crypto.randomUUID();
  },
  // RFC 5424 log levels in descending order of severity
  /**
   * System is unusable - emergency level
   */
  emergency(...args) {
    const params = formatLogArgs(args);
    return this.log({ ...params, level: "emergency" });
  },
  /**
   * Action must be taken immediately - alert level
   */
  alert(...args) {
    const params = formatLogArgs(args);
    return this.log({ ...params, level: "alert" });
  },
  /**
   * Critical conditions - critical level
   */
  critical(...args) {
    const params = formatLogArgs(args);
    return this.log({ ...params, level: "critical" });
  },
  /**
   * Error conditions - error level
   */
  error(...args) {
    const params = formatLogArgs(args);
    return this.log({ ...params, level: "error" });
  },
  /**
   * Warning conditions - warning level
   */
  warning(...args) {
    const params = formatLogArgs(args);
    return this.log({ ...params, level: "warning" });
  },
  /**
   * Normal but significant conditions - notice level
   */
  notice(...args) {
    const params = formatLogArgs(args);
    return this.log({ ...params, level: "notice" });
  },
  /**
   * Informational messages - info level
   */
  info(...args) {
    const params = formatLogArgs(args);
    return this.log({ ...params, level: "info" });
  },
  /**
   * Debug-level messages - debug level
   */
  debug(...args) {
    const params = formatLogArgs(args);
    return this.log({ ...params, level: "debug" });
  }
};
let isLoggerInitialized = false;
async function initLogger(options) {
  if (isLoggerInitialized) {
    return false;
  }
  const { config, store, production = true, startupCallback } = options;
  const finalConfig = createInternalLoggerConfig(config, production, store);
  logger.configure(finalConfig);
  isLoggerInitialized = true;
  if (startupCallback) {
    await startupCallback();
  }
  return true;
}
function isInitialized() {
  return isLoggerInitialized;
}
function requireInitialized() {
  if (!isLoggerInitialized) {
    throw new Error("Logger must be initialized before use. Call initLogger() in entry.worker.ts first.");
  }
}
export {
  clearLogsFromKV,
  defaultLoggerConfig,
  getLogsFromKV,
  initLogger,
  isInitialized,
  logger,
  requireInitialized
};
//# sourceMappingURL=index.js.map

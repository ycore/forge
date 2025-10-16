// src/logger/channels/kv-channel.ts
var logEntryKvTemplate = (prefix, timestamp, count) => `${prefix}${timestamp}-${count}`;
function createKVLogChannel(config, minLevel = "info") {
  const { kv, logsLimit = 500, logsTrigger = 1000, keyPrefix = "log:", countKey = "log_count" } = config;
  return {
    name: "kv-storage",
    minLevel,
    enabled: true,
    output: async (entry) => {
      try {
        const currentCountStr = await kv.get(countKey);
        const currentCount = currentCountStr ? Number.parseInt(currentCountStr, 10) : 0;
        const nextCount = currentCount + 1;
        const timestamp = new Date(entry.timestamp).getTime();
        const logKey = logEntryKvTemplate(keyPrefix, timestamp, nextCount);
        await kv.put(logKey, JSON.stringify(entry), {
          metadata: {
            timestamp: entry.timestamp,
            level: entry.level,
            count: nextCount
          }
        });
        await kv.put(countKey, nextCount.toString());
        if (nextCount >= logsTrigger) {
          cleanupOldLogs(kv, logsLimit, keyPrefix, countKey).catch((error) => {
            console.error("Failed to cleanup old logs:", error);
          });
        }
      } catch (error) {
        console.error("Failed to store log in KV:", error);
      }
    }
  };
}
async function batchDeleteKeys(kv, keys, batchSize = 100) {
  for (let i = 0;i < keys.length; i += batchSize) {
    const batch = keys.slice(i, i + batchSize);
    const deletePromises = batch.map((key) => kv.delete(key));
    await Promise.all(deletePromises);
  }
}
async function cleanupOldLogs(kv, logsLimit, keyPrefix, countKey) {
  try {
    const listResult = await kv.list({ prefix: keyPrefix });
    if (listResult.keys.length <= logsLimit) {
      return;
    }
    const sortedKeys = listResult.keys.filter((key) => key.metadata && key.metadata.timestamp).sort((a, b) => {
      const timestampA = new Date(a.metadata.timestamp).getTime();
      const timestampB = new Date(b.metadata.timestamp).getTime();
      return timestampA - timestampB;
    });
    const logsToDelete = sortedKeys.slice(0, sortedKeys.length - logsLimit);
    const keysToDelete = logsToDelete.map((key) => key.name);
    await batchDeleteKeys(kv, keysToDelete);
    const remainingCount = sortedKeys.length - logsToDelete.length;
    await kv.put(countKey, remainingCount.toString());
    console.log(`Cleaned up ${logsToDelete.length} old logs, keeping ${logsLimit} most recent logs`);
  } catch (error) {
    console.error("Failed to cleanup old logs:", error);
    throw error;
  }
}
async function getLogsFromKV(kv, options = {}) {
  const { limit = 100, keyPrefix = "log:" } = options;
  try {
    const listResult = await kv.list({ prefix: keyPrefix });
    if (!listResult.keys.length) {
      return [];
    }
    const sortedKeys = listResult.keys.filter((key) => key.metadata && key.metadata.timestamp).sort((a, b) => {
      const timestampA = new Date(a.metadata.timestamp).getTime();
      const timestampB = new Date(b.metadata.timestamp).getTime();
      return timestampB - timestampA;
    }).slice(0, limit);
    const logPromises = sortedKeys.map(async (key) => {
      const logData = await kv.get(key.name);
      return logData ? JSON.parse(logData) : null;
    });
    const logs = await Promise.all(logPromises);
    return logs.filter((log) => log !== null);
  } catch (error) {
    console.error("Failed to retrieve logs from KV:", error);
    return [];
  }
}
async function clearLogsFromKV(kv, options = {}) {
  const { keyPrefix = "log:", countKey = "log_count" } = options;
  try {
    const listResult = await kv.list({ prefix: keyPrefix });
    const keysToDelete = listResult.keys.map((key) => key.name);
    await batchDeleteKeys(kv, keysToDelete);
    await kv.delete(countKey);
  } catch (error) {
    console.error("Failed to clear logs from KV:", error);
    throw error;
  }
}
// src/logger/logger.config.ts
var LOG_LEVELS = {
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
var defaultLoggerConfig = {
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

// src/logger/channels/console-channel.ts
var formatters = {
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
var consoleMethods = {
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
        console.log(output);
      }
    }
  };
}

// src/logger/channels/registry.ts
var ChannelRegistry = {
  console: (minLevel, config) => createConsoleChannel(minLevel, config),
  kv: (minLevel, config) => createKVLogChannel(config, minLevel)
};

// src/logger/logger.helpers.ts
function createInternalLoggerConfig(config, production, kv) {
  const relevantInits = config.init.filter((init) => init.production === production && init.level !== "null");
  const channels = relevantInits.map((init) => {
    const channelDef = config.channels[init.channel];
    if (!channelDef) {
      throw new Error(`Channel definition not found for: ${init.channel}`);
    }
    const factory = ChannelRegistry[channelDef.registry];
    if (!factory) {
      throw new Error(`Unknown registry type: ${channelDef.registry}`);
    }
    const options = getChannelOptions(channelDef.registry, production, channelDef.options, kv);
    if (channelDef.registry === "console") {
      return ChannelRegistry.console(init.level, options);
    } else if (channelDef.registry === "kv") {
      if (!options.kv) {
        throw new Error("KV namespace is required for KV channel");
      }
      return ChannelRegistry.kv(init.level, options);
    }
    throw new Error(`Unsupported registry type: ${channelDef.registry}`);
  });
  const { defaultLevel, enableSanitization } = getLoggerDefaults(config, production);
  return { defaultLevel, channels, enableSanitization };
}

// src/logger/logger.ts
var loggerConfig = {
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
    timestamp: new Date().toISOString()
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
var logger = {
  configure(config) {
    loggerConfig = { ...loggerConfig, ...config };
  },
  getConfig() {
    return { ...loggerConfig };
  },
  async log(params) {
    const entry = createLogEntry(params);
    await writeToChannels(entry);
  },
  async support() {
    return crypto.randomUUID();
  },
  emergency(...args) {
    const params = formatLogArgs(args);
    return this.log({ ...params, level: "emergency" });
  },
  alert(...args) {
    const params = formatLogArgs(args);
    return this.log({ ...params, level: "alert" });
  },
  critical(...args) {
    const params = formatLogArgs(args);
    return this.log({ ...params, level: "critical" });
  },
  error(...args) {
    const params = formatLogArgs(args);
    return this.log({ ...params, level: "error" });
  },
  warning(...args) {
    const params = formatLogArgs(args);
    return this.log({ ...params, level: "warning" });
  },
  notice(...args) {
    const params = formatLogArgs(args);
    return this.log({ ...params, level: "notice" });
  },
  info(...args) {
    const params = formatLogArgs(args);
    return this.log({ ...params, level: "info" });
  },
  debug(...args) {
    const params = formatLogArgs(args);
    return this.log({ ...params, level: "debug" });
  }
};
var isLoggerInitialized = false;
async function initLogger(options) {
  if (isLoggerInitialized) {
    return false;
  }
  const {
    config,
    store,
    production = true,
    startupCallback
  } = options;
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
  requireInitialized,
  logger,
  isInitialized,
  initLogger,
  getLogsFromKV,
  defaultLoggerConfig,
  clearLogsFromKV
};

//# debugId=0EF1F9F56934228564756E2164756E21

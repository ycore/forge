// src/logger/channels/console-channel.ts
function createConsoleChannel(minLevel, config = {}) {
  const { prettyPrint = false, useLogLevelMethods = false } = config;
  return {
    name: "console",
    minLevel,
    enabled: true,
    output: (entry) => {
      const output = prettyPrint ? JSON.stringify(entry, null, 2) : JSON.stringify(entry);
      if (useLogLevelMethods) {
        switch (entry.level) {
          case "emergency":
          case "alert":
          case "critical":
          case "error":
            console.error(output);
            break;
          case "warning":
            console.warn(output);
            break;
          case "debug":
            console.debug(output);
            break;
          case "info":
          case "notice":
          default:
            console.info(output);
            break;
        }
      } else {
        console.log(output);
      }
    }
  };
}
// src/logger/channels/kv-channel.ts
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
        const logKey = `${keyPrefix}${timestamp}-${nextCount}`;
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
  const { limit = 100, keyPrefix = "log:", countKey = "log_count" } = options;
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
// src/logger/channels/webhook-channel.ts
function createWebhookChannel(config, minLevel = "error") {
  const {
    webhookUrl,
    headers = {},
    timeout = 5000,
    retry,
    formatter
  } = config;
  const defaultHeaders = {
    "Content-Type": "application/json",
    "User-Agent": "forge-logger/1.0",
    ...headers
  };
  const defaultFormatter = (entry) => ({
    level: entry.level,
    timestamp: entry.timestamp,
    event: entry.event,
    message: `${entry.event}: ${entry.timestamp}`,
    data: entry,
    source: "forge-logger"
  });
  const sendWebhook = async (entry, attempt = 1) => {
    try {
      const controller = new AbortController;
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      const payload = formatter ? formatter(entry) : defaultFormatter(entry);
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: defaultHeaders,
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (!response.ok) {
        throw new Error(`Webhook request failed: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (retry && attempt < retry.attempts) {
        setTimeout(() => {
          sendWebhook(entry, attempt + 1).catch((retryError) => {
            console.error(`Webhook retry ${attempt + 1} failed:`, retryError);
          });
        }, retry.delay * attempt);
        return;
      }
      console.error(`Failed to send log to webhook after ${attempt} attempts:`, errorMessage);
    }
  };
  return {
    name: "webhook",
    minLevel,
    enabled: true,
    output: async (entry) => {
      sendWebhook(entry).catch((error) => {
        console.error("Webhook channel error:", error);
      });
    }
  };
}

// src/logger/channels/registry.ts
var ChannelRegistry = {
  console: (minLevel, config) => createConsoleChannel(minLevel, config),
  webhook: (minLevel, config) => createWebhookChannel(config, minLevel),
  kv: (minLevel, config) => createKVLogChannel(config, minLevel)
};
function createChannelsFromConfig(configs) {
  return configs.map((channelConfig) => {
    const factory = ChannelRegistry[channelConfig.type];
    if (!factory) {
      throw new Error(`Unknown channel type: ${channelConfig.type}`);
    }
    return factory(channelConfig.minLevel, channelConfig.config);
  });
}
function getChannelConfigForSituation(situationConfig, environment = "default", situation) {
  if (situation && situationConfig.situations?.[situation]) {
    return situationConfig.situations[situation];
  }
  if (environment !== "default" && situationConfig[environment]) {
    return situationConfig[environment];
  }
  return situationConfig.default;
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
function getEnvVar(name) {
  if (typeof globalThis !== "undefined" && globalThis.ENVIRONMENT) {
    return globalThis.ENVIRONMENT[name];
  }
  if (typeof import.meta !== "undefined" && import.meta.env) {
    return import.meta.env[name];
  }
  if (typeof process !== "undefined" && process.env) {
    return process.env[name];
  }
  return;
}
function isCloudflareWorker() {
  return typeof caches !== "undefined" && typeof navigator === "undefined";
}
function isDevelopment() {
  const nodeEnv = getEnvVar("NODE_ENV");
  return nodeEnv === "development" || !nodeEnv && !isCloudflareWorker();
}
function isProduction() {
  return getEnvVar("NODE_ENV") === "production";
}
var DEFAULT_CHANNEL_CONFIG = {
  default: [
    {
      type: "console",
      minLevel: "info",
      config: { prettyPrint: false }
    }
  ],
  development: [
    {
      type: "console",
      minLevel: "debug",
      config: { prettyPrint: true, useLogLevelMethods: true }
    }
  ],
  production: [
    {
      type: "console",
      minLevel: "warning",
      config: { prettyPrint: false }
    }
  ],
  situations: {
    "cloudflare-worker": [
      {
        type: "console",
        minLevel: "info",
        config: { prettyPrint: false }
      }
    ],
    "with-webhook": [
      {
        type: "console",
        minLevel: "info",
        config: { prettyPrint: false }
      },
      {
        type: "webhook",
        minLevel: "error",
        config: {
          webhookUrl: "",
          timeout: 5000,
          retry: { attempts: 3, delay: 1000 }
        }
      }
    ]
  }
};
function createLoggerConfig() {
  const environment = isDevelopment() ? "development" : isProduction() ? "production" : "default";
  const debugEnabled = getEnvVar("DEBUG") === "true";
  const webhookUrl = getEnvVar("LOG_WEBHOOK_URL");
  let situation;
  if (isCloudflareWorker()) {
    situation = webhookUrl ? "with-webhook" : "cloudflare-worker";
  } else if (webhookUrl) {
    situation = "with-webhook";
  }
  let channelConfigs = getChannelConfigForSituation(DEFAULT_CHANNEL_CONFIG, environment, situation);
  if (isDevelopment() && debugEnabled) {
    channelConfigs = channelConfigs.map((config) => {
      if (config.type === "console") {
        return {
          ...config,
          minLevel: "debug"
        };
      }
      return config;
    });
  }
  if (webhookUrl) {
    channelConfigs = channelConfigs.map((config) => {
      if (config.type === "webhook" && config.config) {
        return {
          ...config,
          config: {
            ...config.config,
            webhookUrl
          }
        };
      }
      return config;
    });
  }
  const channels = createChannelsFromConfig(channelConfigs);
  return {
    defaultLevel: isDevelopment() && debugEnabled ? "debug" : isProduction() ? "warning" : "info",
    channels,
    enableSanitization: true
  };
}
function createLoggerConfigWithKV(kv) {
  const baseConfig = createLoggerConfig();
  const kvConfig = {
    production: { logsLimit: 500, logsTrigger: 750 },
    development: { logsLimit: 100, logsTrigger: 150 }
  };
  const environment = isDevelopment() ? "development" : "production";
  const kvSettings = kvConfig[environment];
  const kvChannelConfig = {
    type: "kv",
    minLevel: isDevelopment() ? baseConfig.defaultLevel : "debug",
    config: {
      kv,
      ...kvSettings
    }
  };
  const kvChannels = createChannelsFromConfig([kvChannelConfig]);
  return {
    ...baseConfig,
    channels: [...baseConfig.channels, ...kvChannels]
  };
}
function createCustomLoggerConfig(situationConfig, environment = "default", situation) {
  const channelConfigs = getChannelConfigForSituation(situationConfig, environment, situation);
  const channels = createChannelsFromConfig(channelConfigs);
  return {
    defaultLevel: environment === "production" ? "warning" : "info",
    channels,
    enableSanitization: true
  };
}

// src/logger/logger.ts
var loggerConfig = createLoggerConfig();
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
    } catch (error) {
      console.error(`Failed to write to channel ${channel.name}:`, error);
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
  },
  warn(...args) {
    return this.warning(...args);
  }
};
export {
  shouldLog,
  logger,
  isProduction,
  isDevelopment,
  isCloudflareWorker,
  getLogsFromKV,
  getChannelConfigForSituation,
  createWebhookChannel,
  createLoggerConfigWithKV,
  createLoggerConfig,
  createKVLogChannel,
  createCustomLoggerConfig,
  createConsoleChannel,
  createChannelsFromConfig,
  clearLogsFromKV,
  LOG_LEVELS,
  DEFAULT_CHANNEL_CONFIG,
  ChannelRegistry
};

//# debugId=77EC84DBCF896EB064756E2164756E21

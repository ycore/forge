import type { LoggerConfig, LogLevel } from './@types/logger.types';

// RFC 5424 log level hierarchy (higher number = higher severity)
export const LOG_LEVELS: Record<LogLevel, number> = {
  emergency: 7,
  alert: 6,
  critical: 5,
  error: 4,
  warning: 3,
  notice: 2,
  info: 1,
  debug: 0,
} as const;

/**
 * Check if a log level should be logged based on minimum level threshold
 */
export function shouldLog(level: LogLevel, minLevel: LogLevel): boolean {
  return LOG_LEVELS[level] >= LOG_LEVELS[minLevel];
}

/**
 * Get environment-specific channel options
 */
export function getChannelOptions(registry: 'console' | 'kv', production: boolean, baseOptions: Record<string, unknown> = {}, kv?: KVNamespace): Record<string, unknown> {
  // Console channel environment-specific defaults
  if (registry === 'console') {
    const envDefaults = {
      format: production ? 'raw' : 'json',
      useLogLevelMethods: !production,
    };
    // Explicit options override environment defaults
    return { ...envDefaults, ...baseOptions };
  }

  let options = { ...baseOptions };

  // KV channel - inject KV namespace
  if (registry === 'kv' && kv) {
    options = { ...options, kv };
  }

  return options;
}

/**
 * Get environment-specific logger defaults
 */
export function getLoggerDefaults(config: LoggerConfig, production: boolean): { defaultLevel: LogLevel; enableSanitization: boolean } {
  const defaults = production ? config.defaults?.production : config.defaults?.development;

  return {
    defaultLevel: defaults?.defaultLevel || (production ? 'warning' : 'info'),
    enableSanitization: defaults?.enableSanitization ?? true,
  };
}

/**
 * Default logger configuration
 */
export const defaultLoggerConfig: LoggerConfig = {
  init: [
    {
      production: false,
      channel: 'console',
      level: 'debug',
    },
    {
      production: false,
      channel: 'console',
      level: 'warning',
    },
    {
      production: false,
      channel: 'kv',
      level: 'info',
    },
    {
      production: true,
      channel: 'kv',
      level: 'warning',
    },
  ],
  channels: {
    console: {
      registry: 'console',
      options: {}, // Will be populated with environment defaults
    },
    kv: {
      registry: 'kv',
      options: {
        logsLimit: 500,
        logsTrigger: 750,
      },
    },
  },
  defaults: {
    development: {
      defaultLevel: 'debug',
      enableSanitization: true,
    },
    production: {
      defaultLevel: 'warning',
      enableSanitization: true,
    },
  },
};

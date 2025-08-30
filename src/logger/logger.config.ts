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
export function getChannelOptions(registry: 'console' | 'kv', environment: 'development' | 'production', baseOptions: Record<string, any> = {}, kv?: KVNamespace): Record<string, any> {
  let options = { ...baseOptions };

  // Console channel environment-specific defaults
  if (registry === 'console') {
    options = {
      prettyPrint: environment === 'development',
      useLogLevelMethods: environment === 'development',
      ...options,
    };
  }

  // KV channel - inject KV namespace
  if (registry === 'kv' && kv) {
    options = { ...options, kv };
  }

  return options;
}

/**
 * Get environment-specific logger defaults
 */
export function getLoggerDefaults(config: LoggerConfig, environment: 'development' | 'production'): { defaultLevel: LogLevel; enableSanitization: boolean } {
  const defaults = config.defaults?.[environment];

  return {
    defaultLevel: defaults?.defaultLevel || (environment === 'production' ? 'warning' : 'info'),
    enableSanitization: defaults?.enableSanitization ?? true,
  };
}

/**
 * Default logger configuration
 */
export const defaultLoggerConfig: LoggerConfig = {
  init: [
    {
      environment: 'development',
      channel: 'console',
      level: 'debug',
    },
    {
      environment: 'production',
      channel: 'console',
      level: 'warning',
    },
    {
      environment: 'development',
      channel: 'kv',
      level: 'info',
    },
    {
      environment: 'production',
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

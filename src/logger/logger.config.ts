import type { LoggerConfig, LogLevel } from './@types/logger.types';
import { createChannelsFromConfig, getChannelConfigForSituation, type SituationConfig } from './channels/registry';

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
 * Safe environment variable access for different runtimes
 */
function getEnvVar(name: string): string | undefined {
  // Cloudflare Workers environment
  // biome-ignore lint/suspicious/noExplicitAny: acceptable
  if (typeof globalThis !== 'undefined' && (globalThis as any).ENVIRONMENT) {
    // biome-ignore lint/suspicious/noExplicitAny: acceptable
    return (globalThis as any).ENVIRONMENT[name];
  }

  // Vite environment (browser/SSR)
  // biome-ignore lint/suspicious/noExplicitAny: acceptable
  if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
    // biome-ignore lint/suspicious/noExplicitAny: acceptable
    return (import.meta as any).env[name];
  }

  // Node.js environment
  if (typeof process !== 'undefined' && process.env) {
    return process.env[name];
  }

  return undefined;
}

/**
 * Runtime environment detection
 */
export function isCloudflareWorker(): boolean {
  return typeof caches !== 'undefined' && typeof navigator === 'undefined';
}

export function isDevelopment(): boolean {
  const nodeEnv = getEnvVar('NODE_ENV');
  return nodeEnv === 'development' || (!nodeEnv && !isCloudflareWorker());
}

export function isProduction(): boolean {
  return getEnvVar('NODE_ENV') === 'production';
}

/**
 * Default channel configurations for different environments
 */
export const DEFAULT_CHANNEL_CONFIG: SituationConfig = {
  default: [
    {
      type: 'console',
      minLevel: 'info',
      config: { prettyPrint: false },
    },
  ],
  development: [
    {
      type: 'console',
      minLevel: 'debug',
      config: { prettyPrint: true, useLogLevelMethods: true },
    },
  ],
  production: [
    {
      type: 'console',
      minLevel: 'warning',
      config: { prettyPrint: false },
    },
  ],
  situations: {
    'cloudflare-worker': [
      {
        type: 'console',
        minLevel: 'info',
        config: { prettyPrint: false },
      },
    ],
    'with-webhook': [
      {
        type: 'console',
        minLevel: 'info',
        config: { prettyPrint: false },
      },
      {
        type: 'webhook',
        minLevel: 'error',
        config: {
          webhookUrl: '', // Will be populated from environment
          timeout: 5000,
          retry: { attempts: 3, delay: 1000 },
        },
      },
    ],
  },
};

/**
 * Create environment-specific logger configuration
 */
export function createLoggerConfig(): LoggerConfig {
  const environment = isDevelopment() ? 'development' : isProduction() ? 'production' : 'default';
  const debugEnabled = getEnvVar('DEBUG') === 'true';
  const webhookUrl = getEnvVar('LOG_WEBHOOK_URL');

  // Determine situation
  let situation: string | undefined;
  if (isCloudflareWorker()) {
    situation = webhookUrl ? 'with-webhook' : 'cloudflare-worker';
  } else if (webhookUrl) {
    situation = 'with-webhook';
  }

  // Get base channel configuration
  let channelConfigs = getChannelConfigForSituation(
    DEFAULT_CHANNEL_CONFIG,
    environment,
    situation
  );

  // Adjust console level for debug mode in development
  if (isDevelopment() && debugEnabled) {
    channelConfigs = channelConfigs.map(config => {
      if (config.type === 'console') {
        return {
          ...config,
          minLevel: 'debug' as LogLevel,
        };
      }
      return config;
    });
  }

  // Populate webhook URL if needed
  if (webhookUrl) {
    channelConfigs = channelConfigs.map(config => {
      if (config.type === 'webhook' && config.config) {
        return {
          ...config,
          config: {
            ...config.config,
            webhookUrl,
          },
        };
      }
      return config;
    });
  }

  const channels = createChannelsFromConfig(channelConfigs);

  return {
    defaultLevel: isDevelopment() && debugEnabled ? 'debug' :
      isProduction() ? 'warning' : 'info',
    channels,
    enableSanitization: true,
  };
}

/**
 * Create logger configuration with KV storage support
 */
export function createLoggerConfigWithKV(kv: KVNamespace): LoggerConfig {
  const baseConfig = createLoggerConfig();

  // KV storage configuration by environment
  const kvConfig = {
    production: { logsLimit: 500, logsTrigger: 750 },
    development: { logsLimit: 100, logsTrigger: 150 },
  } as const;

  const environment = isDevelopment() ? 'development' : 'production';
  const kvSettings = kvConfig[environment];

  // Add KV channel
  const kvChannelConfig = {
    type: 'kv' as const,
    minLevel: isDevelopment() ? baseConfig.defaultLevel : 'debug' as LogLevel,
    config: {
      kv,
      ...kvSettings,
    },
  };

  const kvChannels = createChannelsFromConfig([kvChannelConfig]);

  return {
    ...baseConfig,
    channels: [...baseConfig.channels, ...kvChannels],
  };
}

/**
 * Create custom logger configuration with specific channel setup
 */
export function createCustomLoggerConfig(
  situationConfig: SituationConfig,
  environment: 'development' | 'production' | 'default' = 'default',
  situation?: string
): LoggerConfig {
  const channelConfigs = getChannelConfigForSituation(situationConfig, environment, situation);
  const channels = createChannelsFromConfig(channelConfigs);

  return {
    defaultLevel: environment === 'production' ? 'warning' : 'info',
    channels,
    enableSanitization: true,
  };
}

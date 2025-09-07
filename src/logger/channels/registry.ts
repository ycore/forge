import type { ConsoleChannelConfig, LogChannel, LogLevel } from '../@types/logger.types';
import { createConsoleChannel } from './console-channel';
import { createKVLogChannel, type KVLogChannelConfig } from './kv-channel';

/**
 * Configuration for different channel types
 */
export type ChannelConfig = {
  console: {
    type: 'console';
    minLevel: LogLevel;
    config?: ConsoleChannelConfig;
  };
  kv: {
    type: 'kv';
    minLevel: LogLevel;
    config: KVLogChannelConfig;
  };
};

/**
 * Factory function for creating channels
 */
export type ChannelFactory<T extends keyof ChannelConfig> = (minLevel: LogLevel, config: ChannelConfig[T]['config']) => LogChannel;

/**
 * Registry of available channel factories
 */
export const ChannelRegistry: Record<keyof ChannelConfig, ChannelFactory<any>> = {
  console: (minLevel: LogLevel, config?: ConsoleChannelConfig) => createConsoleChannel(minLevel, config),
  kv: (minLevel: LogLevel, config: KVLogChannelConfig) => createKVLogChannel(config, minLevel),
};

/**
 * Situation-based channel configuration
 */
export interface SituationConfig {
  /** Default channels for general logging */
  default: Array<ChannelConfig[keyof ChannelConfig]>;
  /** Channels for development environment */
  development?: Array<ChannelConfig[keyof ChannelConfig]>;
  /** Channels for production environment */
  production?: Array<ChannelConfig[keyof ChannelConfig]>;
  /** Channels for specific situations or contexts */
  situations?: {
    [situationName: string]: Array<ChannelConfig[keyof ChannelConfig]>;
  };
}

/**
 * Creates channels based on configuration
 */
export function createChannelsFromConfig(configs: Array<ChannelConfig[keyof ChannelConfig]>): LogChannel[] {
  return configs.map(channelConfig => {
    const factory = ChannelRegistry[channelConfig.type];
    if (!factory) {
      throw new Error(`Unknown channel type: ${channelConfig.type}`);
    }
    return factory(channelConfig.minLevel, channelConfig.config);
  });
}

/**
 * Gets appropriate channel configuration based on environment and situation
 */
export function getChannelConfigForSituation(situationConfig: SituationConfig, production: boolean, situation?: string): Array<ChannelConfig[keyof ChannelConfig]> {
  // Check for specific situation first
  if (situation && situationConfig.situations?.[situation]) {
    return situationConfig.situations[situation];
  }

  // Check for environment-specific config
  const environment = production ? 'production' : 'development';
  if (situationConfig[environment]) {
    return situationConfig[environment];
  }

  // Fall back to default
  return situationConfig.default;
}

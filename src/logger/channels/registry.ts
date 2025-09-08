import type { ConsoleChannelConfig, LogChannel, LogLevel } from '../@types/logger.types';
import type { ChannelConfig, ConsoleChannelFactory, KVChannelFactory, SituationConfig } from '../@types/registry.types';
import { createConsoleChannel } from './console-channel';
import { createKVLogChannel, type KVLogChannelConfig } from './kv-channel';

/**
 * Registry of available channel factories
 */
export const ChannelRegistry: { console: ConsoleChannelFactory; kv: KVChannelFactory; } = {
  console: (minLevel: LogLevel, config?: ConsoleChannelConfig) => createConsoleChannel(minLevel, config),
  kv: (minLevel: LogLevel, config: KVLogChannelConfig) => createKVLogChannel(config, minLevel),
};


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

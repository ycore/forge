import type { ChannelInitConfig, InternalLoggerConfig, LoggerConfig, LogLevel } from './@types/logger.types';
import { ChannelRegistry } from './channels/registry';
import { getChannelOptions, getLoggerDefaults } from './logger.config';

/**
 * Create internal logger configuration from declarative config
 */
export function createInternalLoggerConfig(config: LoggerConfig, production: boolean, kv?: KVNamespace): InternalLoggerConfig {
  // Filter init configs for current environment
  const relevantInits = config.init.filter((init: ChannelInitConfig) => init.production === production && init.level !== 'null');

  // Create channels based on filtered init configs
  const channels = relevantInits.map(init => {
    const channelDef = config.channels[init.channel];
    if (!channelDef) {
      throw new Error(`Channel definition not found for: ${init.channel}`);
    }

    const factory = ChannelRegistry[channelDef.registry];
    if (!factory) {
      throw new Error(`Unknown registry type: ${channelDef.registry}`);
    }

    // Get environment-appropriate options using config logic
    const options = getChannelOptions(channelDef.registry, production, channelDef.options, kv);

    return factory(init.level as LogLevel, options);
  });

  // Get environment defaults from config
  const { defaultLevel, enableSanitization } = getLoggerDefaults(config, production);

  return { defaultLevel, channels, enableSanitization };
}

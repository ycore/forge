import type { ChannelInitConfig, ConsoleChannelConfig, InternalLoggerConfig, KVLogChannelConfig, LoggerConfig, LogLevel } from './@types/logger.types';
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

    // Get environment-appropriate options using config logic
    const options = getChannelOptions(channelDef.registry, production, channelDef.options as Record<string, unknown>, kv);

    // Map-based channel factory lookup
    const channelFactories = {
      console: () => ChannelRegistry.console(init.level as LogLevel, options as ConsoleChannelConfig),
      kv: () => {
        if (!options.kv) {
          throw new Error('KV namespace is required for KV channel');
        }
        return ChannelRegistry.kv(init.level as LogLevel, options as unknown as KVLogChannelConfig);
      },
    } as const;

    const createChannel = channelFactories[channelDef.registry as keyof typeof channelFactories];
    if (!createChannel) {
      throw new Error(`Unsupported registry type: ${channelDef.registry}`);
    }

    return createChannel();
  });

  // Get environment defaults from config
  const { defaultLevel, enableSanitization } = getLoggerDefaults(config, production);

  return { defaultLevel, channels, enableSanitization };
}

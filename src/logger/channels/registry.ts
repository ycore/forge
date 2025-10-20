import type { ConsoleChannelConfig, KVLogChannelConfig, LogLevel } from '../@types/logger.types';
import type { ConsoleChannelFactory, KVChannelFactory } from '../@types/registry.types';
import { createConsoleChannel } from './console-channel';
import { createKVLogChannel } from './kv-channel';

/**
 * Registry of available channel factories
 */
export const ChannelRegistry: { console: ConsoleChannelFactory; kv: KVChannelFactory } = {
  console: (minLevel: LogLevel, config?: ConsoleChannelConfig) => createConsoleChannel(minLevel, config),
  kv: (minLevel: LogLevel, config: KVLogChannelConfig) => createKVLogChannel(config, minLevel),
};

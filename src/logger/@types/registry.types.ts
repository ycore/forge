import type { KVLogChannelConfig } from '../channels/kv-channel';
import type { ConsoleChannelConfig, LogChannel, LogLevel } from './logger.types';

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
export type ConsoleChannelFactory = (minLevel: LogLevel, config?: ConsoleChannelConfig) => LogChannel;
export type KVChannelFactory = (minLevel: LogLevel, config: KVLogChannelConfig) => LogChannel;

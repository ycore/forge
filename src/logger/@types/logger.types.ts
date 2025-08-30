import type { ConsoleChannelConfig } from '../channels/console-channel';
import type { KVLogChannelConfig } from '../channels/kv-channel';

// RFC 5424 log levels in descending order of severity
export type LogLevel = "emergency" | "alert" | "critical" | "error" | "warning" | "notice" | "info" | "debug";

export interface LogParams {
  event: string;
  level?: LogLevel;
  [key: string]: unknown;
}

export type BaseLogParams = Omit<LogParams, "level"> & { event: string };

// Log channel configuration
export interface LogChannel {
  name: string;
  minLevel: LogLevel;
  enabled: boolean;
  output: (entry: LogEntry) => void | Promise<void>;
}

// Structured log entry
export interface LogEntry {
  event: string;
  level: LogLevel;
  timestamp: string;
  [key: string]: unknown;
}

// Internal logger configuration (after processing)
export interface InternalLoggerConfig {
  defaultLevel: LogLevel;
  channels: LogChannel[];
  enableSanitization: boolean;
}

// Channel initialization configuration
export interface ChannelInitConfig {
  environment: 'development' | 'production';
  channel: string;
  level: LogLevel | 'null'; // 'null' means disabled
}

// Channel definition with registry type and options
export interface ChannelDefinition {
  registry: 'console' | 'kv';
  options: ConsoleChannelConfig | KVLogChannelConfig | Record<string, any>;
}

// Main logger configuration structure
export interface LoggerConfig {
  init: ChannelInitConfig[];
  channels: {
    [channelName: string]: ChannelDefinition;
  };
  defaults?: {
    development?: {
      defaultLevel?: LogLevel;
      enableSanitization?: boolean;
    };
    production?: {
      defaultLevel?: LogLevel;
      enableSanitization?: boolean;
    };
  };
}

/// <reference path="../../@types/worker-runtime.d.ts" />

// RFC 5424 log levels in descending order of severity
export type LogLevel = 'emergency' | 'alert' | 'critical' | 'error' | 'warning' | 'notice' | 'info' | 'debug';

// Console output format types
export type ConsoleOutputFormat = 'raw' | 'json' | 'compact';

// Console channel configuration
export interface ConsoleChannelConfig {
  /** Output format (default: 'raw') */
  format?: ConsoleOutputFormat;
  /** Custom console method for different log levels */
  useLogLevelMethods?: boolean;
}

// Logger method arguments
export type LogMessage = string | BaseLogParams;
export type LogArgs = [LogMessage, ...unknown[]];

// Logger interface
export interface Logger {
  configure(config: Partial<InternalLoggerConfig>): void;
  getConfig(): InternalLoggerConfig;
  log(params: LogParams): Promise<void>;
  support(): Promise<string>;
  emergency(...args: LogArgs): Promise<void>;
  alert(...args: LogArgs): Promise<void>;
  critical(...args: LogArgs): Promise<void>;
  error(...args: LogArgs): Promise<void>;
  warning(...args: LogArgs): Promise<void>;
  notice(...args: LogArgs): Promise<void>;
  info(...args: LogArgs): Promise<void>;
  debug(...args: LogArgs): Promise<void>;
}

export interface LogParams {
  event: string;
  level?: LogLevel;
  [key: string]: unknown;
}

export type BaseLogParams = Omit<LogParams, 'level'> & { event: string };

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

// KV log metadata stored with each log entry
export interface LogMetadata {
  timestamp: string;
  level: string;
}

// Internal logger configuration (after processing)
export interface InternalLoggerConfig {
  defaultLevel: LogLevel;
  channels: LogChannel[];
  enableSanitization: boolean;
}

// Channel initialization configuration
export interface ChannelInitConfig {
  production: boolean;
  channel: string;
  level: LogLevel | 'null'; // 'null' means disabled
}

// Channel definition with registry type and options
export interface ChannelDefinition {
  registry: 'console' | 'kv';
  options: ConsoleChannelConfig | KVLogChannelConfig | Record<string, unknown>;
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

export interface KVLogChannelConfig {
  /** KV namespace to store logs */
  kv: KVNamespace;
  /** Maximum number of logs to keep in storage (default: 500) */
  logsLimit?: number;
  /** Trigger cleanup when logs exceed this number (default: 1000) */
  logsTrigger?: number;
  /** Log key prefix (default: 'log:') */
  keyPrefix?: string;
}

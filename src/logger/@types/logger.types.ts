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

// Logger configuration
export interface LoggerConfig {
  defaultLevel: LogLevel;
  channels: LogChannel[];
  enableSanitization: boolean;
}

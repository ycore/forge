/** biome-ignore-all lint/suspicious/noExplicitAny: acceptable */
import type { BaseLogParams, LogEntry, LoggerConfig, LogLevel, LogParams } from './@types/logger.types';
import { createLoggerConfig, shouldLog } from './logger.config';

type LogMessage = string | BaseLogParams;
type LogArgs = [LogMessage, ...any[]];

// Global logger configuration
let loggerConfig: LoggerConfig = createLoggerConfig();

/**
 * Sanitizes log parameters by removing sensitive fields
 */
function sanitizeLogParams(params: LogParams): LogParams {
  if (!loggerConfig.enableSanitization) {
    return params;
  }

  // biome-ignore lint/correctness/noUnusedVariables: intentional
  const { password, token, secret, apiKey, sessionToken, bearerToken, refreshToken, ...sanitized } = params as LogParams & {
    password?: unknown;
    token?: unknown;
    secret?: unknown;
    apiKey?: unknown;
    sessionToken?: unknown;
    bearerToken?: unknown;
    refreshToken?: unknown;
  };
  return sanitized;
}

/**
 * Formats log arguments similar to diary's approach
 */
function formatLogArgs(args: LogArgs): BaseLogParams {
  const [message, ...rest] = args;

  if (typeof message === 'object' && message !== null) {
    return { ...message, ...(rest.length > 0 ? { args: rest } : {}) } as BaseLogParams;
  }

  return { event: String(message), ...(rest.length > 0 ? { args: rest } : {}) } as BaseLogParams;
}

/**
 * Creates a structured log entry
 */
function createLogEntry(params: LogParams): LogEntry {
  const sanitizedParams = sanitizeLogParams(params);
  return {
    ...sanitizedParams,
    level: (sanitizedParams.level || loggerConfig.defaultLevel) as LogLevel,
    timestamp: new Date().toISOString(),
  } as LogEntry;
}

/**
 * Writes log entry to all enabled channels that meet the level threshold
 */
async function writeToChannels(entry: LogEntry): Promise<void> {
  const writePromises = loggerConfig.channels
    .filter(channel => channel.enabled && shouldLog(entry.level, channel.minLevel))
    .map(channel => {
      try {
        const result = channel.output(entry);
        return result instanceof Promise ? result : Promise.resolve();
      } catch (error) {
        // Prevent logging failures from breaking the application
        console.error(`Failed to write to channel ${channel.name}:`, error);
        return Promise.resolve();
      }
    });

  await Promise.allSettled(writePromises);
}

/**
 * Enhanced Structured Logging Utility with Multi-Channel Support
 *
 * Features:
 * - RFC 5424 log levels with proper hierarchy
 * - Multi-channel output (console, webhooks, Slack, etc.)
 * - Environment-specific configuration
 * - Flexible API supporting both structured objects and diary-style strings
 * - Security sanitization for sensitive data
 * - Optimized for Cloudflare Workers deployment
 *
 * @see {@link https://developers.cloudflare.com/workers/observability/logs/workers-logs/}
 * @see {@link https://tools.ietf.org/html/rfc5424}
 */
export const logger = {
  /**
   * Configure the logger with custom settings
   */
  configure(config: Partial<LoggerConfig>) {
    loggerConfig = { ...loggerConfig, ...config };
  },

  /**
   * Get current logger configuration
   */
  getConfig(): LoggerConfig {
    return { ...loggerConfig };
  },

  /**
   * Core logging method that writes to all enabled channels
   */
  async log(params: LogParams): Promise<void> {
    const entry = createLogEntry(params);
    await writeToChannels(entry);
  },

  // RFC 5424 log levels in descending order of severity

  /**
   * System is unusable - emergency level
   */
  emergency(...args: LogArgs): Promise<void> {
    const params = formatLogArgs(args);
    return this.log({ ...params, level: 'emergency' });
  },

  /**
   * Action must be taken immediately - alert level
   */
  alert(...args: LogArgs): Promise<void> {
    const params = formatLogArgs(args);
    return this.log({ ...params, level: 'alert' });
  },

  /**
   * Critical conditions - critical level
   */
  critical(...args: LogArgs): Promise<void> {
    const params = formatLogArgs(args);
    return this.log({ ...params, level: 'critical' });
  },

  /**
   * Error conditions - error level
   */
  error(...args: LogArgs): Promise<void> {
    const params = formatLogArgs(args);
    return this.log({ ...params, level: 'error' });
  },

  /**
   * Warning conditions - warning level
   */
  warning(...args: LogArgs): Promise<void> {
    const params = formatLogArgs(args);
    return this.log({ ...params, level: 'warning' });
  },

  /**
   * Normal but significant conditions - notice level
   */
  notice(...args: LogArgs): Promise<void> {
    const params = formatLogArgs(args);
    return this.log({ ...params, level: 'notice' });
  },

  /**
   * Informational messages - info level
   */
  info(...args: LogArgs): Promise<void> {
    const params = formatLogArgs(args);
    return this.log({ ...params, level: 'info' });
  },

  /**
   * Debug-level messages - debug level
   */
  debug(...args: LogArgs): Promise<void> {
    const params = formatLogArgs(args);
    return this.log({ ...params, level: 'debug' });
  },

  // Legacy aliases for backward compatibility
  warn(...args: LogArgs): Promise<void> {
    return this.warning(...args);
  },
};

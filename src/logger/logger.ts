/** biome-ignore-all lint/suspicious/noExplicitAny: acceptable */
import type { BaseLogParams, InternalLoggerConfig, LogArgs, LogEntry, Logger, LoggerConfig, LogLevel, LogParams } from './@types/logger.types';
import { shouldLog } from './logger.config';
import { createInternalLoggerConfig } from './logger.helpers';

export interface LoggerState {
  initialized: boolean;
  wasInitializedHere?: boolean;
}

// Global logger configuration
let loggerConfig: InternalLoggerConfig = {
  defaultLevel: 'info',
  channels: [],
  enableSanitization: true,
};

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
 * Logging failures are silently ignored to prevent disrupting application flow
 */
async function writeToChannels(entry: LogEntry): Promise<void> {
  const writePromises = loggerConfig.channels
    .filter(channel => channel.enabled && shouldLog(entry.level, channel.minLevel))
    .map(channel => {
      try {
        const result = channel.output(entry);
        return result instanceof Promise ? result : Promise.resolve();
      } catch (_error) {
        // Silently ignore logging failures to prevent disrupting application flow
        return Promise.resolve();
      }
    });

  await Promise.allSettled(writePromises);
}

// Production optimizations are handled by the Vite logger plugin
// These runtime checks will be replaced with static values during build

/**
 * Enhanced Structured Logging Utility with Multi-Channel Support
 *
 * Features:
 * - RFC 5424 log levels with proper hierarchy
 * - Multi-channel output (console, webhooks, Slack, etc.)
 * - Environment-specific configuration
 * - Flexible API supporting both structured objects and diary-style strings
 * - Security sanitization for sensitive data
 * - Production build optimization with dead code elimination
 * - Optimized for Cloudflare Workers deployment
 * - **Error-safe**: Never throws or contributes to error flow - logging failures are silently ignored
 *
 * Usage patterns:
 * - Critical logging: `await logger.error(...)` - ensures completion
 * - Non-critical logging: `logger.debug(...)` - fire-and-forget
 * - All methods return Promise<void> but never throw or reject
 *
 * @see {@link https://developers.cloudflare.com/workers/observability/logs/workers-logs/}
 * @see {@link https://tools.ietf.org/html/rfc5424}
 */
export const logger: Logger = {
  /**
   * Configure the logger with custom settings
   */
  configure(config: Partial<InternalLoggerConfig>) {
    loggerConfig = { ...loggerConfig, ...config };
  },

  /**
   * Get current logger configuration
   */
  getConfig(): InternalLoggerConfig {
    return { ...loggerConfig };
  },

  /**
   * Core logging method that writes to all enabled channels
   */
  async log(params: LogParams): Promise<void> {
    const entry = createLogEntry(params);
    await writeToChannels(entry);
  },

  /**
   * Genarates a support number
   */
  async support(): Promise<string> {
    return crypto.randomUUID();
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
};

// Track initialization state
let isLoggerInitialized = false;

/**
 * Logger initialization options
 */
export interface InitLoggerOptions {
  config: LoggerConfig;
  store: KVNamespace;
  production: boolean;
  startupCallback?: () => Promise<void>;
}

/**
 * Initialize logger with named options
 * Returns a boolean indicating whether initialization actually occurred (true) or was already done (false)
 * Handles race conditions internally - safe to call multiple times
 */
export async function initLogger(options: InitLoggerOptions): Promise<boolean> {
  if (isLoggerInitialized) {
    return false;
  }

  const {
    config,
    store,
    production = true, // Default to production for safety
    startupCallback,
  } = options;

  // Create internal logger config from declarative config
  const finalConfig = createInternalLoggerConfig(config, production, store);

  logger.configure(finalConfig);
  isLoggerInitialized = true;

  // Execute optional startup logging callback
  if (startupCallback) {
    await startupCallback();
  }

  return true; // Initialization completed
}

/**
 * Check if logger has been initialized
 */
export function isInitialized(): boolean {
  return isLoggerInitialized;
}

/**
 * Require logger to be initialized, throws if not
 */
export function requireInitialized(): void {
  if (!isLoggerInitialized) {
    throw new Error('Logger must be initialized before use. Call initLogger() in entry.worker.ts first.');
  }
}

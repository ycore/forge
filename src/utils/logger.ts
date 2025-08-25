/** biome-ignore-all lint/suspicious/noExplicitAny: acceptable */
import type { BaseLogParams, LogLevel, LogParams } from './@types/logger.types';

/**
 * Structured Logging Utility
 * Format and output JSON logs according to Cloudflare Workers Logs best practices
 *
 * @see {@link https://developers.cloudflare.com/workers/observability/logs/workers-logs/}
 * @param {LogParams} params - Log parameters object
 * @param {string} params.event - Event name, used to identify the type of log event
 * @param {LogLevel} [params.level] - Log level, defaults to 'info'
 *
 * @example
 * logger.info({
 *   event: 'auth_success',
 *   user_id: '123',
 *   provider: 'google'
 * });
 *
 * // Output:
 * // {
 * //   event: 'auth_success',
 * //   level: 'info',
 * //   user_id: '123',
 * //   provider: 'google',
 * //   timestamp: '2024-03-21T08:00:00.000Z'
 * // }
 */
export const logger = {
  log(params: LogParams) {
    console.log({
      ...params,
      level: params.level || 'info',
      timestamp: new Date().toISOString(),
    });
  },

  debug(params: BaseLogParams) {
    if (DEBUG_ENABLED) {
      this.log({ ...params, level: 'debug' });
    }
  },

  info(params: BaseLogParams) {
    if (IS_DEVELOPMENT) {
      this.log({ ...params, level: 'info' });
    }
  },

  warn(params: BaseLogParams) {
    if (IS_DEVELOPMENT) {
      this.log({ ...params, level: 'warn' });
    }
  },

  error(params: BaseLogParams) {
    this.log({ ...params, level: 'error' });
  },
};

// Safe environment variable access that works in both Node.js and browser environments
export const getEnvVar = (name: string): string | undefined => {
  // In a Vite environment (browser/SSR)
  if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
    return (import.meta as any).env[name];
  }
  // Fallback for Node environments
  if (typeof process !== 'undefined' && process.env) {
    return process.env[name];
  }
  return undefined;
};

// The double-gated approach (IS_DEVELOPMENT && DEBUG_ENABLED) ensures debug logs never accidentally appear in production.
const IS_DEVELOPMENT = getEnvVar('NODE_ENV') === 'development';
const DEBUG_ENABLED = IS_DEVELOPMENT && getEnvVar('DEBUG') === 'true';

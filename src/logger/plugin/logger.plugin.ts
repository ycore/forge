/** biome-ignore-all lint/correctness/noUnusedVariables: WIP */
import type { Plugin } from 'vite';

export interface LoggerPluginOptions {
  /**
   * Production mode - determines what gets stripped
   * @default process.env.NODE_ENV === 'production'
   */
  production?: boolean;

  /**
   * Log levels to strip in production
   * @default ['debug', 'info', 'notice']
   */
  stripLevels?: string[];

  /**
   * Log levels to keep in production
   * @default ['warning', 'error', 'critical', 'alert', 'emergency']
   */
  keepLevels?: string[];

  /**
   * Whether to replace calls with void 0 or remove entirely
   * @default 'remove'
   */
  replacementStrategy?: 'remove' | 'noop';

  /**
   * Logger import patterns to optimize
   * @default ['@ycore/forge/logger', './logger', '../logger']
   */
  loggerPatterns?: string[];
}

const DEFAULT_STRIP_LEVELS = ['debug', 'info', 'notice'];
const DEFAULT_KEEP_LEVELS = ['warning', 'error', 'critical', 'alert', 'emergency'];
const DEFAULT_LOGGER_PATTERNS = ['@ycore/forge/logger', './logger', '../logger'];

/**
 * Vite plugin for optimizing logger calls in production builds
 *
 * Features:
 * - Strips debug/info/notice calls in production
 * - Preserves error/warning/critical calls for monitoring
 * - Uses esbuild's dead code elimination (no terser needed)
 * - Supports inline conditions that get optimized away
 * - Works with both direct imports and destructured imports
 */
export function loggerOptimization(options: LoggerPluginOptions = {}): Plugin {
  const { production = process.env.NODE_ENV === 'production', stripLevels = DEFAULT_STRIP_LEVELS, keepLevels = DEFAULT_KEEP_LEVELS, replacementStrategy = 'remove', loggerPatterns = DEFAULT_LOGGER_PATTERNS } = options;

  const isProd = production;
  const _shouldOptimize = isProd;

  return {
    name: 'logger-optimization',
    enforce: 'pre',

    config(config) {
      // Optimize esbuild for better dead code elimination
      if (isProd) {
        config.esbuild = {
          ...config.esbuild,
          drop: ['debugger'],
          pure: [
            'logger.debug',
            'logger.info',
            'logger.notice',
            // Also handle destructured imports
            ...stripLevels.map(level => `${level}`),
          ],
          treeShaking: true,
        };
      }
    },

    // Temporarily disable transform to focus on esbuild optimization
    // transform(code, id) {
    //   return null;
    // },
  };
}

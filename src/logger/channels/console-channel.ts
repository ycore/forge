import type { LogChannel, LogEntry, LogLevel } from '../@types/logger.types';

export interface ConsoleChannelConfig {
  /** Pretty print JSON output (default: false) */
  prettyPrint?: boolean;
  /** Custom console method for different log levels */
  useLogLevelMethods?: boolean;
}

/**
 * Console channel with environment-appropriate formatting
 * Outputs structured logs to the browser/Node.js console
 */
export function createConsoleChannel(
  minLevel: LogLevel,
  config: ConsoleChannelConfig = {}
): LogChannel {
  const { prettyPrint = false, useLogLevelMethods = false } = config;

  return {
    name: 'console',
    minLevel,
    enabled: true,
    output: (entry: LogEntry) => {
      const output = prettyPrint ? JSON.stringify(entry, null, 2) : JSON.stringify(entry);
      
      if (useLogLevelMethods) {
        // Use appropriate console method based on log level
        switch (entry.level) {
          case 'emergency':
          case 'alert':
          case 'critical':
          case 'error':
            console.error(output);
            break;
          case 'warning':
            console.warn(output);
            break;
          case 'debug':
            console.debug(output);
            break;
          case 'info':
          case 'notice':
          default:
            console.info(output);
            break;
        }
      } else {
        console.log(output);
      }
    },
  };
}
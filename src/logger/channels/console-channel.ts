import type { ConsoleChannelConfig, ConsoleOutputFormat, LogChannel, LogEntry, LogLevel } from '../@types/logger.types';

/**
 * Console channel with environment-appropriate formatting
 * Outputs structured logs to the browser/Node.js console
 */
const formatters: Record<ConsoleOutputFormat, (entry: LogEntry) => string> = {
  json: (entry: LogEntry) => JSON.stringify(entry, null, 2),
  compact: (entry: LogEntry) => {
    const parts = [
      entry.level.toUpperCase(),
      entry.event || 'LOG',
      entry.timestamp,
    ];

    if (entry.args && Array.isArray(entry.args) && entry.args.length > 0) {
      parts.push(...entry.args.map(arg => typeof arg === 'string' ? arg : JSON.stringify(arg)));
    }

    // Add any additional properties (excluding the ones already handled)
    // biome-ignore lint/correctness/noUnusedVariables: extracting unused props
    const { level, event, timestamp, args, ...rest } = entry;
    if (Object.keys(rest).length > 0) {
      parts.push(...Object.values(rest).map(val => typeof val === 'string' ? val : JSON.stringify(val)));
    }

    return `[ ${parts.join(' || ')} ]`;
  },
  raw: (entry: LogEntry) => JSON.stringify(entry),
};

function formatLogEntry(entry: LogEntry, format: ConsoleOutputFormat): string {
  return formatters[format](entry);
}

const consoleMethods: Record<LogLevel, (message: string) => void> = {
  emergency: console.error,
  alert: console.error,
  critical: console.error,
  error: console.error,
  warning: console.warn,
  notice: console.info,
  info: console.info,
  debug: console.debug,
};

export function createConsoleChannel(minLevel: LogLevel, config: ConsoleChannelConfig = {}): LogChannel {
  const { format = 'raw', useLogLevelMethods = false } = config;

  return {
    name: 'console',
    minLevel,
    enabled: true,
    output: (entry: LogEntry) => {
      const output = formatLogEntry(entry, format);

      if (useLogLevelMethods) {
        consoleMethods[entry.level](output);
      } else {
        console.log(output);
      }
    },
  };
}

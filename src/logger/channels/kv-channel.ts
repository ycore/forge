import type { LogChannel, LogEntry } from '../@types/logger.types';

interface LogMetadata {
  timestamp: string;
  level: string;
  count: number;
}

const logEntryKvTemplate = (prefix: string, timestamp: number, count: number): string => `${prefix}${timestamp}-${count}`;

export interface KVLogChannelConfig {
  /** KV namespace to store logs */
  kv: KVNamespace;
  /** Maximum number of logs to keep in storage (default: 500) */
  logsLimit?: number;
  /** Trigger cleanup when logs exceed this number (default: 1000) */
  logsTrigger?: number;
  /** Log key prefix (default: 'log:') */
  keyPrefix?: string;
  /** Metadata key for log count (default: 'log_count') */
  countKey?: string;
}

/**
 * Creates a KV-based log channel for Cloudflare Workers
 * Maintains logs with batched cleanup when trigger threshold is reached
 */
export function createKVLogChannel(config: KVLogChannelConfig, minLevel: LogEntry['level'] = 'info'): LogChannel {
  const { kv, logsLimit = 500, logsTrigger = 1000, keyPrefix = 'log:', countKey = 'log_count' } = config;

  return {
    name: 'kv-storage',
    minLevel,
    enabled: true,
    output: async (entry: LogEntry) => {
      try {
        // Get current log count
        const currentCountStr = await kv.get(countKey);
        const currentCount = currentCountStr ? Number.parseInt(currentCountStr, 10) : 0;
        const nextCount = currentCount + 1;

        // Create unique key with timestamp for natural ordering (most recent first when listed)
        const timestamp = new Date(entry.timestamp).getTime();
        const logKey = logEntryKvTemplate(keyPrefix, timestamp, nextCount);

        // Store log entry with metadata
        await kv.put(logKey, JSON.stringify(entry), {
          metadata: {
            timestamp: entry.timestamp,
            level: entry.level,
            count: nextCount,
          },
        });

        // Update the log count
        await kv.put(countKey, nextCount.toString());

        // Trigger cleanup if we've exceeded the trigger threshold
        if (nextCount >= logsTrigger) {
          // Don't await cleanup to avoid blocking log writing
          cleanupOldLogs(kv, logsLimit, keyPrefix, countKey).catch(error => {
            console.error('Failed to cleanup old logs:', error);
          });
        }
      } catch (error) {
        console.error('Failed to store log in KV:', error);
      }
    },
  };
}

/**
 * Batch delete operations with size limits to avoid KV rate limits
 */
async function batchDeleteKeys(kv: KVNamespace, keys: string[], batchSize = 100): Promise<void> {
  for (let i = 0; i < keys.length; i += batchSize) {
    const batch = keys.slice(i, i + batchSize);
    const deletePromises = batch.map(key => kv.delete(key));
    await Promise.all(deletePromises);
  }
}

/**
 * Cleanup old logs when trigger threshold is reached
 */
async function cleanupOldLogs(kv: KVNamespace, logsLimit: number, keyPrefix: string, countKey: string): Promise<void> {
  try {
    // List all log keys
    const listResult = await kv.list({ prefix: keyPrefix });

    if (listResult.keys.length <= logsLimit) {
      return; // No cleanup needed
    }

    // Sort keys by timestamp (oldest first for deletion)
    const sortedKeys = listResult.keys
      .filter(key => key.metadata && (key.metadata as LogMetadata).timestamp)
      .sort((a, b) => {
        const timestampA = new Date((a.metadata as LogMetadata).timestamp).getTime();
        const timestampB = new Date((b.metadata as LogMetadata).timestamp).getTime();
        return timestampA - timestampB; // Oldest first
      });

    // Delete excess logs (keep only logsLimit number of logs)
    const logsToDelete = sortedKeys.slice(0, sortedKeys.length - logsLimit);
    const keysToDelete = logsToDelete.map(key => key.name);

    // Batch delete operations to respect KV rate limits
    await batchDeleteKeys(kv, keysToDelete);

    // Update count after cleanup to maintain consistency
    const remainingCount = sortedKeys.length - logsToDelete.length;
    await kv.put(countKey, remainingCount.toString());

    console.log(`Cleaned up ${logsToDelete.length} old logs, keeping ${logsLimit} most recent logs`);
  } catch (error) {
    console.error('Failed to cleanup old logs:', error);
    throw error;
  }
}

/**
 * Retrieves logs from KV storage
 */
export async function getLogsFromKV(
  kv: KVNamespace,
  options: {
    limit?: number;
    keyPrefix?: string;
    countKey?: string;
  } = {}
): Promise<LogEntry[]> {
  const { limit = 100, keyPrefix = 'log:' } = options;

  try {
    // List all log keys
    const listResult = await kv.list({ prefix: keyPrefix });

    if (!listResult.keys.length) {
      return [];
    }

    // Sort keys by their metadata timestamp (newest first)
    const sortedKeys = listResult.keys
      .filter(key => key.metadata && (key.metadata as LogMetadata).timestamp)
      .sort((a, b) => {
        const timestampA = new Date((a.metadata as LogMetadata).timestamp).getTime();
        const timestampB = new Date((b.metadata as LogMetadata).timestamp).getTime();
        return timestampB - timestampA; // Newest first
      })
      .slice(0, limit);

    // Fetch log entries
    const logPromises = sortedKeys.map(async key => {
      const logData = await kv.get(key.name);
      return logData ? (JSON.parse(logData) as LogEntry) : null;
    });

    const logs = await Promise.all(logPromises);
    return logs.filter((log): log is LogEntry => log !== null);
  } catch (error) {
    console.error('Failed to retrieve logs from KV:', error);
    return [];
  }
}

/**
 * Clears all logs from KV storage
 */
export async function clearLogsFromKV(
  kv: KVNamespace,
  options: {
    keyPrefix?: string;
    countKey?: string;
  } = {}
): Promise<void> {
  const { keyPrefix = 'log:', countKey = 'log_count' } = options;

  try {
    // List all log keys
    const listResult = await kv.list({ prefix: keyPrefix });

    // Delete all log entries using batching
    const keysToDelete = listResult.keys.map(key => key.name);
    await batchDeleteKeys(kv, keysToDelete);

    // Reset the count
    await kv.delete(countKey);
  } catch (error) {
    console.error('Failed to clear logs from KV:', error);
    throw error;
  }
}

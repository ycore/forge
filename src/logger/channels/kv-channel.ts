import { nanoid } from 'nanoid';
import type { KVLogChannelConfig, LogChannel, LogEntry, LogMetadata } from '../@types/logger.types';

/** Type guard to check if metadata is valid LogMetadata */
const isLogMetadata = (metadata: unknown): metadata is LogMetadata => {
  return (
    typeof metadata === 'object' &&
    metadata !== null &&
    'timestamp' in metadata &&
    'level' in metadata &&
    typeof metadata.timestamp === 'string' &&
    typeof metadata.level === 'string'
  );
};

/** Type guard to validate parsed log entry */
const isLogEntry = (data: unknown): data is LogEntry => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'event' in data &&
    'level' in data &&
    'timestamp' in data &&
    typeof data.event === 'string' &&
    typeof data.level === 'string' &&
    typeof data.timestamp === 'string'
  );
};

const logEntryKvTemplate = (prefix: string, timestamp: number, id: string): string => `${prefix}${timestamp}-${id}`;

/**
 * Creates a KV-based log channel for Cloudflare Workers
 * Maintains logs with batched cleanup when trigger threshold is reached
 */
export function createKVLogChannel(config: KVLogChannelConfig, minLevel: LogEntry['level'] = 'info'): LogChannel {
  const { kv, logsLimit = 500, logsTrigger = 1000, keyPrefix = 'log:' } = config;

  return {
    name: 'kv-storage',
    minLevel,
    enabled: true,
    output: async (entry: LogEntry) => {
      const storeLog = async (): Promise<boolean> => {
        try {
          // Create unique key with timestamp for ordering + nanoid for uniqueness
          const timestamp = new Date(entry.timestamp).getTime();
          const uniqueId = nanoid(8); // 8 characters for compact yet collision-resistant IDs
          const logKey = logEntryKvTemplate(keyPrefix, timestamp, uniqueId);

          // Store log entry with metadata
          await kv.put(logKey, JSON.stringify(entry), {
            metadata: {
              timestamp: entry.timestamp,
              level: entry.level,
            },
          });

          return true;
        } catch (_error) {
          return false;
        }
      };

      try {
        // Attempt to store log with a single immediate retry on failure
        const stored = await storeLog();
        if (!stored) await storeLog();

        // Check cleanup every ~50 logs using random sampling - ~1 in 50 logs
        // Silently ignore cleanup failures to prevent cascading errors
        if (Math.random() < 0.02) cleanupOldLogsIfNeeded(kv, logsLimit, logsTrigger, keyPrefix).catch(() => { });

      } catch (_error) {
        // Graceful degradation - Avoid logging the error details to prevent potential infinite loops
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
 * Check if cleanup is needed and trigger if threshold exceeded
 */
async function cleanupOldLogsIfNeeded(kv: KVNamespace, logsLimit: number, logsTrigger: number, keyPrefix: string): Promise<void> {
  try {
    // List with limit to see if trigger has been exceeded
    const listResult = await kv.list({ prefix: keyPrefix, limit: logsTrigger + 1 });

    if (listResult.keys.length <= logsTrigger) return;

    // Crossed the trigger threshold, perform cleanup
    await cleanupOldLogs(kv, logsLimit, keyPrefix);
  } catch (_error) {
    // Silently fail - cleanup is not critical
  }
}

/**
 * Cleanup old logs keeping only the most recent logsLimit entries
 */
async function cleanupOldLogs(kv: KVNamespace, logsLimit: number, keyPrefix: string): Promise<void> {
  try {
    // List all log keys
    const listResult = await kv.list({ prefix: keyPrefix });

    if (listResult.keys.length <= logsLimit) {
      return; // No cleanup needed
    }

    // Filter and transform keys with valid metadata into a typed structure
    const validKeys = listResult.keys
      .filter((key): key is typeof key & { metadata: LogMetadata } =>
        isLogMetadata(key.metadata)
      )
      .map(key => ({
        name: key.name,
        timestamp: new Date(key.metadata.timestamp).getTime(),
      }))
      .sort((a, b) => a.timestamp - b.timestamp); // Oldest first

    // Delete excess logs (keep only logsLimit number of logs)
    const keysToDelete = validKeys
      .slice(0, Math.max(0, validKeys.length - logsLimit))
      .map(key => key.name);

    // Batch delete operations to respect KV rate limits
    if (keysToDelete.length > 0) {
      await batchDeleteKeys(kv, keysToDelete);
    }
  } catch (error) {
    // Silently fail - cleanup failures shouldn't impact logging
  }
}

/**
 * Retrieves logs from KV storage
 */
export async function getLogsFromKV(kv: KVNamespace, options: { limit?: number; keyPrefix?: string } = {}): Promise<LogEntry[]> {
  const { limit = 100, keyPrefix = 'log:' } = options;

  try {
    // List all log keys
    const listResult = await kv.list({ prefix: keyPrefix });

    if (listResult.keys.length === 0) {
      return [];
    }

    // Filter, sort, and limit keys with valid metadata
    const sortedKeys = listResult.keys
      .filter((key): key is typeof key & { metadata: LogMetadata } =>
        isLogMetadata(key.metadata)
      )
      .sort((a, b) => {
        const timestampA = new Date(a.metadata.timestamp).getTime();
        const timestampB = new Date(b.metadata.timestamp).getTime();
        return timestampB - timestampA; // Newest first
      })
      .slice(0, limit);

    // Fetch and parse log entries
    const logPromises = sortedKeys.map(async key => {
      const logData = await kv.get(key.name);
      if (!logData) return null;

      try {
        const parsed = JSON.parse(logData);
        return isLogEntry(parsed) ? parsed : null;
      } catch {
        return null;
      }
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
export async function clearLogsFromKV(kv: KVNamespace, options: { keyPrefix?: string; } = {}): Promise<void> {
  const { keyPrefix = 'log:' } = options;

  try {
    // List all log keys
    const listResult = await kv.list({ prefix: keyPrefix });

    // Delete all log entries using batching
    const keysToDelete = listResult.keys.map(key => key.name);
    await batchDeleteKeys(kv, keysToDelete);
  } catch (error) {
    console.error('Failed to clear logs from KV:', error);
    throw error;
  }
}

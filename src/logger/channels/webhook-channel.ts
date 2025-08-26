import type { LogChannel, LogEntry, LogLevel } from '../@types/logger.types';

export interface WebhookChannelConfig {
  /** Webhook URL to send logs to */
  webhookUrl: string;
  /** Custom headers to include in webhook requests */
  headers?: Record<string, string>;
  /** Timeout for webhook requests in milliseconds (default: 5000) */
  timeout?: number;
  /** Retry configuration */
  retry?: {
    attempts: number;
    delay: number;
  };
  /** Custom payload formatter */
  formatter?: (entry: LogEntry) => Record<string, unknown>;
}

/**
 * External webhook channel for critical alerts and monitoring integrations
 * Sends structured log data to external services via HTTP webhooks
 */
export function createWebhookChannel(
  config: WebhookChannelConfig,
  minLevel: LogLevel = 'error'
): LogChannel {
  const {
    webhookUrl,
    headers = {},
    timeout = 5000,
    retry,
    formatter,
  } = config;

  const defaultHeaders = {
    'Content-Type': 'application/json',
    'User-Agent': 'forge-logger/1.0',
    ...headers,
  };

  const defaultFormatter = (entry: LogEntry) => ({
    level: entry.level,
    timestamp: entry.timestamp,
    event: entry.event,
    message: `${entry.event}: ${entry.timestamp}`,
    data: entry,
    source: 'forge-logger',
  });

  const sendWebhook = async (entry: LogEntry, attempt = 1): Promise<void> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const payload = formatter ? formatter(entry) : defaultFormatter(entry);

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Webhook request failed: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);

      // Retry logic
      if (retry && attempt < retry.attempts) {
        setTimeout(() => {
          sendWebhook(entry, attempt + 1).catch(retryError => {
            console.error(`Webhook retry ${attempt + 1} failed:`, retryError);
          });
        }, retry.delay * attempt);
        return;
      }

      // Fallback to console if webhook fails (avoid infinite loops)
      console.error(`Failed to send log to webhook after ${attempt} attempts:`, errorMessage);
    }
  };

  return {
    name: 'webhook',
    minLevel,
    enabled: true,
    output: async (entry: LogEntry) => {
      // Don't await to avoid blocking log writing
      sendWebhook(entry).catch(error => {
        console.error('Webhook channel error:', error);
      });
    },
  };
}

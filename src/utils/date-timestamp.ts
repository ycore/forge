/**
 * Get current timestamp in milliseconds
 */
export function getCurrentTimestamp(): number {
  return Date.now();
}

/**
 * Add time to current timestamp
 */
export function addTimeToNow(timeInSeconds: number): number {
  return getCurrentTimestamp() + timeInSeconds * 1000;
}

/**
 * Check if timestamp is expired
 */
export function isExpired(expirationTimestamp: number): boolean {
  return getCurrentTimestamp() > expirationTimestamp;
}

/**
 * Time constants for session management
 */
export const AUTH_SESSION_TTL = 60 * 60 * 24 * 15; // 15 days
export const AUTH_TOTP_PERIOD = 60 * 10; // 10 minutes

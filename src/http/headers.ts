import type { RequestMetadata } from "./@types/headers.types";

/**
 * Extract request metadata from Cloudflare-specific headers
 * Used for session management and logging
 */
export function getRequestMetadata(request: Request): RequestMetadata {
  const headers = request.headers;

  return {
    userAgent: headers.get("user-agent") || "Unknown",
    country: headers.get("cf-ipcountry") || "Unknown",
    ipAddress: headers.get("cf-connecting-ip") || headers.get("x-forwarded-for") || "127.0.0.1",
  };
}

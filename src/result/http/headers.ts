const HEADER_NAMES = Object.freeze([
  'CF-Connecting-IP',
  'X-Azure-ClientIP' /** Azure Front Door */,
  'X-Client-IP',
  'X-Forwarded-For',
  'HTTP-X-Forwarded-For',
  'Fly-Client-IP',
  'Fastly-Client-Ip',
  'True-Client-Ip',
  'X-Real-IP',
  'X-Cluster-Client-IP',
  'X-Forwarded',
  'Forwarded-For',
  'Forwarded',
  'DO-Connecting-IP' /** Digital ocean app platform */,
  'oxygen-buyer-ip' /** Shopify oxygen platform */,
] as const);

/**
 * Merge multiple headers objects into one (uses set so headers are overridden)
 */
export function mergeHeaders(...headers: Array<ResponseInit['headers'] | null | undefined>) {
  const merged = new Headers();
  for (const header of headers) {
    if (!header) continue;
    const h = new Headers(header);
    h.forEach((value, key) => {
      merged.set(key, value);
    });
  }
  return merged;
}

/**
 * Combine multiple header objects into one (uses append so headers are not overridden)
 */
export function combineHeaders(...headers: Array<ResponseInit['headers'] | null | undefined>) {
  const combined = new Headers();
  for (const header of headers) {
    if (!header) continue;
    const h = new Headers(header);
    h.forEach((value, key) => {
      combined.append(key, value);
    });
  }
  return combined;
}

/**
 * Extracts the client IP address from request headers
 *
 * Checks multiple headers in priority order (Cloudflare, Azure, etc.)
 * and validates IP addresses to ensure they're legitimate
 *
 * @param requestOrHeaders - Request object or Headers instance
 * @returns Valid client IP address or null if none found
 *
 * @example
 * ```ts
 * const clientIP = getClientIP(request);
 * if (clientIP) {
 *   logger.info('client_request', { ip: clientIP });
 * }
 * ```
 */
export function getClientIP(requestOrHeaders: Request | Headers): string | null {
  const headers = requestOrHeaders instanceof Request ? requestOrHeaders.headers : requestOrHeaders;

  const ipAddress = HEADER_NAMES.flatMap(headerName => {
    const value = headers.get(headerName);
    if (headerName === 'Forwarded') {
      return parseForwardedHeader(value);
    }
    if (!value?.includes(',')) return value;
    return value.split(',').map(ip => ip.trim());
  }).find(ip => {
    if (ip === null) return false;
    return isValidIP(ip);
  });

  return ipAddress ?? null;
}

/**
 * Validates if a string is a valid IPv4 or IPv6 address
 * Works natively on Cloudflare Workers without external dependencies
 */
function isValidIP(ip: string): boolean {
  if (!ip) return false;

  // IPv4 validation (supports 0-255 for each octet)
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if (ipv4Regex.test(ip)) return true;

  // IPv6 validation (supports full, compressed, and IPv4-mapped formats)
  const ipv6Regex =
    /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
  if (ipv6Regex.test(ip)) return true;

  return false;
}

/**
 * Parses the RFC 7239 Forwarded header to extract client IP
 * Format: Forwarded: for=192.0.2.60;proto=http;by=203.0.113.43
 */
function parseForwardedHeader(value: string | null): string | null {
  if (!value) return null;
  for (const part of value.split(';')) {
    const trimmed = part.trim();
    if (trimmed.startsWith('for=')) {
      // Remove "for=" prefix and clean up quotes/brackets
      let ip = trimmed.slice(4);
      // Remove quotes if present
      ip = ip.replace(/^["']|["']$/g, '');
      // Remove IPv6 brackets if present
      ip = ip.replace(/^\[|\]$/g, '');
      return ip;
    }
  }
  return null;
}

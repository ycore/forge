import type { RouterContextProvider } from 'react-router';
import { getBindings } from './cloudflare';
import { isDevelopment } from './environment';

/**
 * Runtime origin information extracted from current request
 */
export type OriginInfo = {
  domain: string;        // Domain only (e.g., 'example.com')
  origin: string;        // Full origin (e.g., 'https://example.com')
  isLocalhost: boolean;  // True if localhost/127.0.0.1
  isDevelopment: boolean; // True if development environment
};

/**
 * Extract hostname from a URL string or Request
 */
function extractHostname(urlOrRequest: string | Request): string {
  const url = typeof urlOrRequest === 'string' ? urlOrRequest : urlOrRequest.url;

  return new URL(url).hostname;
}

/**
 * Extract origin (protocol + hostname + port) from a URL string or Request
 */
function extractOrigin(urlOrRequest: string | Request): string {
  const url = typeof urlOrRequest === 'string' ? urlOrRequest : urlOrRequest.url;

  return new URL(url).origin;
}

/**
 * Check if a hostname is localhost
 */
function isLocalhost(hostname: string): boolean {
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]';
}

/**
 * Get origin domain (hostname without protocol/port)
 *
 * Resolution order:
 * 1. SITE_URL environment variable (extract domain)
 * 2. Request hostname (auto-detect)
 */
export function getOriginDomain(context: Readonly<RouterContextProvider>, request: Request): string {
  const bindings = getBindings(context);

  // Check for SITE_URL environment variable
  const siteUrl = bindings.SITE_URL as string | undefined;
  if (siteUrl) {
    return extractHostname(siteUrl);
  }

  // Fall back to request hostname
  return extractHostname(request);
}

/**
 * Get full origin (protocol + hostname + port)
 *
 * Resolution order:
 * 1. SITE_URL environment variable
 * 2. Request origin (auto-detect)
 */
export function getOrigin(context: Readonly<RouterContextProvider>, request: Request): string {
  const bindings = getBindings(context);

  // Check for SITE_URL environment variable
  const siteUrl = bindings.SITE_URL as string | undefined;
  if (siteUrl) {
    return extractOrigin(siteUrl);
  }

  // Fall back to request origin
  return extractOrigin(request);
}

/**
 * Check if the current request origin is localhost
 */
export function isLocalhostOrigin(context: Readonly<RouterContextProvider>, request: Request): boolean {
  const domain = getOriginDomain(context, request);

  return isLocalhost(domain);
}

/**
 * Get complete origin information for the current request
 *
 * Provides environment-aware origin detection:
 * - Development: localhost-friendly settings
 * - Production: strict production settings
 */
export function getOriginInfo(context: Readonly<RouterContextProvider>, request: Request): OriginInfo {
  const domain = getOriginDomain(context, request);
  const origin = getOrigin(context, request);
  const localhost = isLocalhost(domain);
  const development = isDevelopment(context);

  return { domain, origin, isLocalhost: localhost, isDevelopment: development };
}

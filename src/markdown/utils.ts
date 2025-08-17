import { ASSET_PREFIX, MARKDOWN_CONFIG } from './markdown-config';

/**
 * Determine if a file should use gzip compression based on filename and config
 */
function shouldUseCompression(filename: string): boolean {
  if (!MARKDOWN_CONFIG.COMPRESS) return false;

  // Only compress content files, not manifest files
  const isContentFile = filename.includes('content') && !filename.includes('manifest');
  return isContentFile;
}

/**
 * Get the asset URL for fetching at runtime
 * @param filename - The filename to get the URL for
 * @param request - Optional request object for absolute URL generation
 * @returns Base URL where the file can be fetched at runtime (fetchContent will handle compression)
 */
export function getAssetUrl(filename: string, request?: Request): string {
  const fetchPrefix = ASSET_PREFIX.fetch.endsWith('/') ? ASSET_PREFIX.fetch.slice(0, -1) : ASSET_PREFIX.fetch;

  // Always return the base .json URL - fetchContent will handle .gz fallback internally
  const url = `${fetchPrefix}/${filename}`;
  return request ? new URL(url, request.url).href : url;
}

/**
 * Get the compressed file path based on compression format
 * @param basePath - The base file path
 * @param compression - The compression format ('brotli' | 'gzip' | null)
 * @returns File path with appropriate compression extension
 */
export function getCompressedFilePath(basePath: string, compression: 'brotli' | 'gzip' | null): string {
  if (!compression) return basePath;
  const ext = compression === 'brotli' ? '.br' : '.gz';
  return `${basePath}${ext}`;
}

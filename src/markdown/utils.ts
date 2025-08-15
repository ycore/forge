import path from 'node:path';
import { ASSET_PREFIX, MARKDOWN_CONFIG } from './markdown-config';

/**
 * Get the full asset path for files during build time
 * @param filename - The filename to get the path for
 * @returns Full path where the file should be written during build
 */
export function getAssetPath(filename: string): string {
  // Normalize the build prefix to handle leading slashes
  const buildPrefix = ASSET_PREFIX.build.startsWith('/') ? ASSET_PREFIX.build.slice(1) : ASSET_PREFIX.build;
  return path.join(process.cwd(), 'public', buildPrefix, filename);
}

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
 * @param forceCompressed - Force compression regardless of config (for backward compatibility)
 * @returns URL where the file can be fetched at runtime
 */
export function getAssetUrl(filename: string, request?: Request, forceCompressed?: boolean): string {
  const fetchPrefix = ASSET_PREFIX.fetch.endsWith('/') ? ASSET_PREFIX.fetch.slice(0, -1) : ASSET_PREFIX.fetch;
  
  // Add .gz extension for content files when compression is enabled
  const shouldCompress = forceCompressed || shouldUseCompression(filename);
  const finalFilename = shouldCompress ? `${filename}.gz` : filename;
  
  const url = `${fetchPrefix}/${finalFilename}`;
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

import path from 'node:path';
import { ASSET_PREFIX } from '../markdown-config';

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

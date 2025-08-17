import type { GlobalManifest, MarkdownContent, MarkdownMeta } from '../@types/markdown.types';
import { getAssetUrl } from './utils';

// Cache for loaded data to avoid multiple file reads
let manifestCache: MarkdownMeta[] | null = null;
let globalManifestCache: GlobalManifest | null = null;
let contentCache: Record<string, MarkdownContent> | null = null;
const folderContentCache: Map<string, Record<string, MarkdownContent>> = new Map();

/**
 * Fetch JSON content with smart compression fallback
 * @param url - The URL to fetch from (should be the base .json URL)
 * @param assets - Cloudflare ASSETS binding for static asset serving
 * @returns Parsed JSON content
 */
async function fetchContent<T>(url: string, assets: Fetcher): Promise<T> {
  console.log('fetchContent: Starting fetch for URL:', url);

  // Use ASSETS binding for internal asset fetching
  const fetchFn = (input: RequestInfo | URL, init?: RequestInit) => assets.fetch(input, init);

  // Determine URLs for both compressed and uncompressed versions
  const baseUrl = url.endsWith('.gz') ? url.replace('.gz', '') : url;
  const gzUrl = baseUrl + '.gz';

  // Try compressed version first
  try {
    console.log('fetchContent: Attempting compressed fetch:', gzUrl);
    const gzResponse = await fetchFn(gzUrl);

    if (gzResponse.ok) {
      console.log('fetchContent: Compressed file found, attempting decompression');

      // Decompress using Web Streams API
      const compressedData = await gzResponse.arrayBuffer();
      const decompressedStream = new DecompressionStream('gzip');
      const decompressedResponse = new Response(
        new ReadableStream({
          start(controller) {
            controller.enqueue(new Uint8Array(compressedData));
            controller.close();
          }
        }).pipeThrough(decompressedStream)
      );

      const decompressedText = await decompressedResponse.text();
      const parsed = JSON.parse(decompressedText) as T;
      console.log('fetchContent: Successfully decompressed and parsed JSON');
      return parsed;
    }

    console.log(`fetchContent: Compressed file not found (${gzResponse.status}), trying uncompressed`);

  } catch (compressionError) {
    console.warn('fetchContent: Compression attempt failed:', compressionError);
  }

  // Fallback to uncompressed version
  try {
    console.log('fetchContent: Attempting uncompressed fetch:', baseUrl);
    const response = await fetchFn(baseUrl);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const parsed = (await response.json()) as T;
    console.log('fetchContent: Successfully fetched and parsed uncompressed file');
    return parsed;
  } catch (uncompressedError) {
    const errorMsg = `Failed to fetch both compressed (${gzUrl}) and uncompressed (${baseUrl}) versions: ${uncompressedError instanceof Error ? uncompressedError.message : 'Unknown error'}`;
    console.error('fetchContent: Final error:', errorMsg);
    throw new Error(errorMsg);
  }
}

/**
 * Get global manifest data which includes documents and chunking info
 */
async function getGlobalManifest(assets: Fetcher, request?: Request): Promise<GlobalManifest> {
  if (globalManifestCache) {
    return globalManifestCache;
  }

  try {
    const manifestUrl = getAssetUrl('markdown-manifest.json', request);
    console.log('Fetching global manifest from URL:', manifestUrl);
    const globalManifest = await fetchContent<GlobalManifest>(manifestUrl, assets);
    console.log('Successfully loaded global manifest with', globalManifest.documents.length, 'documents');
    globalManifestCache = globalManifest;
    return globalManifest;
  } catch (error) {
    console.error('Failed to load global manifest:', error);
    return { documents: [], _buildMode: 'single' };
  }
}

/**
 * Get markdown manifest data from generated JSON file
 * This reads from the consumer app's generated manifest file
 */
export async function getMarkdownManifest(assets: Fetcher, request?: Request): Promise<MarkdownMeta[]> {
  if (manifestCache) {
    return manifestCache;
  }

  const globalManifest = await getGlobalManifest(assets, request);

  // Filter out build metadata for runtime use
  const cleanManifest = globalManifest.documents.map(({ _mtime, _size, ...item }) => item);

  manifestCache = cleanManifest;
  return cleanManifest;
}

/**
 * Get markdown content data from generated JSON file
 * This reads from the consumer app's generated content file or folder chunks
 */
export async function getMarkdownContent(assets: Fetcher, request?: Request): Promise<Record<string, MarkdownContent>> {
  const globalManifest = await getGlobalManifest(assets, request);

  // In folder chunk mode, we don't preload all content
  if (globalManifest._buildMode === 'chunked') {
    // console.warn('getMarkdownContent() called in folder chunk mode. Use getMarkdownDocument() or loadFolderContent() instead.');
    return {};
  }

  if (contentCache) {
    return contentCache;
  }

  try {
    const contentUrl = getAssetUrl('markdown-content.json', request);
    const content = await fetchContent<Record<string, MarkdownContent>>(contentUrl, assets);
    contentCache = content;
    return content;
  } catch (_error) {
    // console.warn('Failed to load markdown content:', error);
    return {};
  }
}

/**
 * Load content for a specific folder (lazy loading)
 */
export async function loadFolderContent(folder: string, assets: Fetcher, request?: Request): Promise<Record<string, MarkdownContent>> {
  console.log('loadFolderContent: Loading content for folder:', folder);

  // Check cache first
  if (folderContentCache.has(folder)) {
    const cachedContent = folderContentCache.get(folder);
    if (cachedContent) {
      console.log('loadFolderContent: Found cached content for folder:', folder);
      return cachedContent;
    }
  }

  try {
    const folderKey = folder.replace(/[/\\]/g, '-');
    const contentUrl = getAssetUrl(`markdown-content-${folderKey}.json`, request);
    console.log('loadFolderContent: Generated content URL:', contentUrl, 'for folder:', folder);

    const content = await fetchContent<Record<string, MarkdownContent>>(contentUrl, assets);
    console.log('loadFolderContent: Successfully loaded content with', Object.keys(content).length, 'documents for folder:', folder);
    folderContentCache.set(folder, content);
    return content;
  } catch (error) {
    console.error(`loadFolderContent: Failed to load folder content for ${folder}:`, error);
    return {};
  }
}

/**
 * Get all documents for a specific folder
 */
export async function getFolderDocuments(folder: string, assets: Fetcher, request?: Request): Promise<MarkdownContent[]> {
  const content = await loadFolderContent(folder, assets, request);
  return Object.values(content);
}

/**
 * Get a specific markdown document by slug
 */
export async function getMarkdownDocument(slug: string, assets: Fetcher, request?: Request): Promise<MarkdownContent | null> {
  const globalManifest = await getGlobalManifest(assets, request);

  // In folder chunk mode, we need to determine which folder the document is in
  if (globalManifest._buildMode === 'chunked') {
    const manifest = await getMarkdownManifest(assets, request);
    const docMeta = manifest.find(doc => doc.slug === slug);

    if (!docMeta || !docMeta.folder) {
      return null;
    }

    const folderContent = await loadFolderContent(docMeta.folder, assets, request);
    return folderContent[slug] || null;
  }

  // Fallback to traditional mode
  const content = await getMarkdownContent(assets, request);
  return content[slug] || null;
}

/**
 * Clear the cache (useful for testing or hot reload)
 */
export function clearMarkdownCache(): void {
  manifestCache = null;
  globalManifestCache = null;
  contentCache = null;
  folderContentCache.clear();
}

/**
 * Clear cache for a specific folder
 */
export function clearFolderCache(folder: string): void {
  folderContentCache.delete(folder);
}

/**
 * Preload content for multiple folders
 */
export async function preloadFolders(folders: string[], assets: Fetcher, request?: Request): Promise<void> {
  await Promise.all(folders.map(folder => loadFolderContent(folder, assets, request)));
}

/**
 * Check if a document exists by slug
 */
export async function hasMarkdownDocument(slug: string, assets: Fetcher, request?: Request): Promise<boolean> {
  const globalManifest = await getGlobalManifest(assets, request);

  if (globalManifest._buildMode === 'chunked') {
    const manifest = await getMarkdownManifest(assets, request);
    return manifest.some(doc => doc.slug === slug);
  }

  const content = await getMarkdownContent(assets, request);
  return slug in content;
}

/**
 * Get documents by folder with pagination support
 */
export async function getFolderDocumentsPaginated(folder: string, offset = 0, limit = 10, assets: Fetcher, request?: Request): Promise<{ documents: MarkdownMeta[]; total: number; hasMore: boolean }> {
  const manifest = await getMarkdownManifest(assets, request);
  const folderDocs = manifest.filter(doc => doc.folder === folder);
  const total = folderDocs.length;
  const paginatedDocs = folderDocs.slice(offset, offset + limit);

  return {
    documents: paginatedDocs,
    total,
    hasMore: offset + limit < total,
  };
}

/**
 * Get all unique folders from manifest
 */
export async function getAllFolders(assets: Fetcher, request?: Request): Promise<string[]> {
  const manifest = await getMarkdownManifest(assets, request);
  const folders = new Set<string>();

  manifest.forEach(doc => {
    if (doc.folder) {
      folders.add(doc.folder);
    }
  });

  return Array.from(folders).sort();
}

/**
 * Get the current build mode from the manifest
 */
export async function getBuildMode(assets: Fetcher, request?: Request): Promise<'single' | 'chunked'> {
  const globalManifest = await getGlobalManifest(assets, request);
  return globalManifest._buildMode;
}

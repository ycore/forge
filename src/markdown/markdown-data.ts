import type { GlobalManifest, MarkdownContent, MarkdownMeta } from '../@types/markdown.types';
import { fetchDecompressed } from './markdown-compression';
import { getAssetUrl } from './utils';

// Cache for loaded data to avoid multiple file reads
let manifestCache: MarkdownMeta[] | null = null;
let globalManifestCache: GlobalManifest | null = null;
let contentCache: Record<string, MarkdownContent> | null = null;
const folderContentCache: Map<string, Record<string, MarkdownContent>> = new Map();

/**
 * Fetch JSON content with optional decompression support and fallback
 * @param url - The URL to fetch from
 * @param assets - Optional Cloudflare ASSETS binding for static asset serving
 * @returns Parsed JSON content
 */
async function fetchContent<T>(url: string, assets?: Fetcher): Promise<T> {
  console.log('fetchContent: Starting fetch for URL:', url);
  
  // Use ASSETS binding if available (Cloudflare Worker environment)
  let fetchFn: typeof fetch;
  if (assets) {
    fetchFn = (input: RequestInfo | URL, init?: RequestInit) => assets.fetch(input, init);
    console.log('fetchContent: Using ASSETS binding');
  } else {
    // In Cloudflare Workers, convert absolute URLs to relative to avoid self-fetch issues
    const isAbsoluteUrl = typeof url === 'string' && url.startsWith('http');
    if (isAbsoluteUrl) {
      try {
        const urlObj = new URL(url);
        const relativePath = urlObj.pathname + urlObj.search;
        console.log('fetchContent: Converting absolute URL to relative path:', relativePath);
        fetchFn = (input: RequestInfo | URL, init?: RequestInit) => {
          const finalInput = input === url ? relativePath : input;
          return fetch(finalInput, init);
        };
      } catch {
        fetchFn = fetch;
      }
    } else {
      fetchFn = fetch;
    }
  }
  
  try {
    if (url.endsWith('.gz')) {
      console.log('fetchContent: Detected compressed file, attempting decompression');
      // Try compressed version first
      try {
        const decompressedText = await fetchDecompressed(url, assets);
        console.log('fetchContent: Successfully decompressed, text length:', decompressedText.length);
        const parsed = JSON.parse(decompressedText) as T;
        console.log('fetchContent: Successfully parsed JSON from compressed file');
        return parsed;
      } catch (compressionError) {
        console.warn(`fetchContent: Failed to fetch compressed version ${url}:`, compressionError);

        // Fallback to uncompressed version if compressed fails
        const fallbackUrl = url.replace('.gz', '');
        console.warn(`fetchContent: Trying fallback ${fallbackUrl}`);

        try {
          const response = await fetchFn(fallbackUrl);
          if (!response.ok) {
            throw new Error(`Fallback HTTP ${response.status}: ${response.statusText}`);
          }
          const parsed = (await response.json()) as T;
          console.log('fetchContent: Successfully fetched and parsed fallback uncompressed file');
          return parsed;
        } catch (fallbackError) {
          console.error('fetchContent: Fallback also failed:', fallbackError);
          // If both compressed and uncompressed fail, throw the original compression error
          throw compressionError;
        }
      }
    } else {
      console.log('fetchContent: Fetching uncompressed file');
      // Standard fetch for uncompressed files
      const response = await fetchFn(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const parsed = (await response.json()) as T;
      console.log('fetchContent: Successfully fetched and parsed uncompressed file');
      return parsed;
    }
  } catch (error) {
    const errorMsg = `Failed to fetch and parse JSON from ${url}: ${error instanceof Error ? error.message : 'Unknown error'}`;
    console.error('fetchContent: Final error:', errorMsg);
    throw new Error(errorMsg);
  }
}

/**
 * Get global manifest data which includes documents and chunking info
 */
async function getGlobalManifest(request?: Request, assets?: Fetcher): Promise<GlobalManifest> {
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
export async function getMarkdownManifest(request?: Request, assets?: Fetcher): Promise<MarkdownMeta[]> {
  if (manifestCache) {
    return manifestCache;
  }

  const globalManifest = await getGlobalManifest(request, assets);

  // Filter out build metadata for runtime use
  const cleanManifest = globalManifest.documents.map(({ _mtime, _size, ...item }) => item);

  manifestCache = cleanManifest;
  return cleanManifest;
}

/**
 * Get markdown content data from generated JSON file
 * This reads from the consumer app's generated content file or folder chunks
 */
export async function getMarkdownContent(request?: Request, assets?: Fetcher): Promise<Record<string, MarkdownContent>> {
  const globalManifest = await getGlobalManifest(request, assets);

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
export async function loadFolderContent(folder: string, request?: Request, assets?: Fetcher): Promise<Record<string, MarkdownContent>> {
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
export async function getFolderDocuments(folder: string, request?: Request, assets?: Fetcher): Promise<MarkdownContent[]> {
  const content = await loadFolderContent(folder, request, assets);
  return Object.values(content);
}

/**
 * Get a specific markdown document by slug
 */
export async function getMarkdownDocument(slug: string, request?: Request, assets?: Fetcher): Promise<MarkdownContent | null> {
  const globalManifest = await getGlobalManifest(request, assets);

  // In folder chunk mode, we need to determine which folder the document is in
  if (globalManifest._buildMode === 'chunked') {
    const manifest = await getMarkdownManifest(request, assets);
    const docMeta = manifest.find(doc => doc.slug === slug);

    if (!docMeta || !docMeta.folder) {
      return null;
    }

    const folderContent = await loadFolderContent(docMeta.folder, request, assets);
    return folderContent[slug] || null;
  }

  // Fallback to traditional mode
  const content = await getMarkdownContent(request, assets);
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
export async function preloadFolders(folders: string[], request?: Request, assets?: Fetcher): Promise<void> {
  await Promise.all(folders.map(folder => loadFolderContent(folder, request, assets)));
}

/**
 * Check if a document exists by slug
 */
export async function hasMarkdownDocument(slug: string, request?: Request, assets?: Fetcher): Promise<boolean> {
  const globalManifest = await getGlobalManifest(request, assets);

  if (globalManifest._buildMode === 'chunked') {
    const manifest = await getMarkdownManifest(request, assets);
    return manifest.some(doc => doc.slug === slug);
  }

  const content = await getMarkdownContent(request, assets);
  return slug in content;
}

/**
 * Get documents by folder with pagination support
 */
export async function getFolderDocumentsPaginated(folder: string, offset = 0, limit = 10, request?: Request, assets?: Fetcher): Promise<{ documents: MarkdownMeta[]; total: number; hasMore: boolean }> {
  const manifest = await getMarkdownManifest(request, assets);
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
export async function getAllFolders(request?: Request, assets?: Fetcher): Promise<string[]> {
  const manifest = await getMarkdownManifest(request, assets);
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
export async function getBuildMode(request?: Request, assets?: Fetcher): Promise<'single' | 'chunked'> {
  const globalManifest = await getGlobalManifest(request, assets);
  return globalManifest._buildMode;
}

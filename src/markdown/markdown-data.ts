import type { GlobalManifest } from '../vite/plugins/@types/markdown-builder.types';
import { ASSET_PREFIX } from '../vite/plugins/@types/markdown-builder.types';
import type { MarkdownContent, MarkdownMeta } from './markdown-loader';

// Cache for loaded data to avoid multiple file reads
let manifestCache: MarkdownMeta[] | null = null;
let globalManifestCache: GlobalManifest | null = null;
let contentCache: Record<string, MarkdownContent> | null = null;
const folderContentCache: Map<string, Record<string, MarkdownContent>> = new Map();

// Helper function to get asset URL for fetching at runtime
function getAssetUrl(filename: string, request?: Request): string {
  const fetchPrefix = ASSET_PREFIX.fetch.endsWith('/') ? ASSET_PREFIX.fetch.slice(0, -1) : ASSET_PREFIX.fetch;
  const url = `${fetchPrefix}/${filename}`;
  return request ? new URL(url, request.url).href : url;
}

/**
 * Get global manifest data which includes documents and chunking info
 */
async function getGlobalManifest(request?: Request): Promise<GlobalManifest> {
  if (globalManifestCache) {
    return globalManifestCache;
  }

  try {
    const manifestUrl = getAssetUrl('markdown-manifest.json', request);
    const response = await fetch(manifestUrl);

    if (!response.ok) {
      console.warn(`Failed to fetch manifest: ${response.status} ${response.statusText}`);
      return { documents: [], _buildMode: 'single' };
    }

    const globalManifest = (await response.json()) as GlobalManifest;
    globalManifestCache = globalManifest;
    return globalManifest;
  } catch (error) {
    console.warn('Failed to load global manifest:', error);
    return { documents: [], _buildMode: 'single' };
  }
}

/**
 * Get markdown manifest data from generated JSON file
 * This reads from the consumer app's generated manifest file
 */
export async function getMarkdownManifest(request?: Request): Promise<MarkdownMeta[]> {
  if (manifestCache) {
    return manifestCache;
  }

  const globalManifest = await getGlobalManifest(request);

  // Filter out build metadata for runtime use
  const cleanManifest = globalManifest.documents.map(({ _mtime, _size, ...item }) => item);

  manifestCache = cleanManifest;
  return cleanManifest;
}

/**
 * Get markdown content data from generated JSON file
 * This reads from the consumer app's generated content file or folder chunks
 */
export async function getMarkdownContent(request?: Request): Promise<Record<string, MarkdownContent>> {
  const globalManifest = await getGlobalManifest(request);

  // In folder chunk mode, we don't preload all content
  if (globalManifest._buildMode === 'chunked') {
    console.warn('getMarkdownContent() called in folder chunk mode. Use getMarkdownDocument() or loadFolderContent() instead.');
    return {};
  }

  if (contentCache) {
    return contentCache;
  }

  try {
    const contentUrl = getAssetUrl('markdown-content.json', request);
    const response = await fetch(contentUrl);

    if (!response.ok) {
      console.warn(`Failed to fetch content: ${response.status} ${response.statusText}`);
      return {};
    }

    const content = (await response.json()) as Record<string, MarkdownContent>;
    contentCache = content;
    return content;
  } catch (error) {
    console.warn('Failed to load markdown content:', error);
    return {};
  }
}

/**
 * Load content for a specific folder (lazy loading)
 */
export async function loadFolderContent(folder: string, request?: Request): Promise<Record<string, MarkdownContent>> {
  // Check cache first
  if (folderContentCache.has(folder)) {
    return folderContentCache.get(folder)!;
  }

  try {
    const folderKey = folder.replace(/[/\\]/g, '-');
    const contentUrl = getAssetUrl(`markdown-content-${folderKey}.json`, request);

    const response = await fetch(contentUrl);
    if (!response.ok) {
      console.warn(`Failed to fetch folder content for ${folder}: ${response.status} ${response.statusText}`);
      return {};
    }

    const content = (await response.json()) as Record<string, MarkdownContent>;
    folderContentCache.set(folder, content);
    return content;
  } catch (error) {
    console.warn(`Failed to load folder content for ${folder}:`, error);
    return {};
  }
}

/**
 * Get all documents for a specific folder
 */
export async function getFolderDocuments(folder: string, request?: Request): Promise<MarkdownContent[]> {
  const content = await loadFolderContent(folder, request);
  return Object.values(content);
}

/**
 * Get a specific markdown document by slug
 */
export async function getMarkdownDocument(slug: string, request?: Request): Promise<MarkdownContent | null> {
  const globalManifest = await getGlobalManifest(request);

  // In folder chunk mode, we need to determine which folder the document is in
  if (globalManifest._buildMode === 'chunked') {
    const manifest = await getMarkdownManifest(request);
    const docMeta = manifest.find(doc => doc.slug === slug);

    if (!docMeta || !docMeta.folder) {
      return null;
    }

    const folderContent = await loadFolderContent(docMeta.folder, request);
    return folderContent[slug] || null;
  }

  // Fallback to traditional mode
  const content = await getMarkdownContent(request);
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
export async function preloadFolders(folders: string[], request?: Request): Promise<void> {
  await Promise.all(folders.map(folder => loadFolderContent(folder, request)));
}

/**
 * Check if a document exists by slug
 */
export async function hasMarkdownDocument(slug: string, request?: Request): Promise<boolean> {
  const globalManifest = await getGlobalManifest(request);

  if (globalManifest._buildMode === 'chunked') {
    const manifest = await getMarkdownManifest(request);
    return manifest.some(doc => doc.slug === slug);
  }

  const content = await getMarkdownContent(request);
  return slug in content;
}

/**
 * Get documents by folder with pagination support
 */
export async function getFolderDocumentsPaginated(folder: string, offset = 0, limit = 10, request?: Request): Promise<{ documents: MarkdownMeta[]; total: number; hasMore: boolean }> {
  const manifest = await getMarkdownManifest(request);
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
export async function getAllFolders(request?: Request): Promise<string[]> {
  const manifest = await getMarkdownManifest(request);
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
export async function getBuildMode(request?: Request): Promise<'single' | 'chunked'> {
  const globalManifest = await getGlobalManifest(request);
  return globalManifest._buildMode;
}

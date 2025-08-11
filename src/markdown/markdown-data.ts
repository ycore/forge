import type { MarkdownContent, MarkdownMeta } from './markdown-loader';

// Cache for loaded data to avoid multiple file reads
let manifestCache: MarkdownMeta[] | null = null;
let contentCache: Record<string, MarkdownContent> | null = null;

/**
 * Get markdown manifest data from generated JSON file
 * This reads from the consumer app's generated manifest file
 */
export async function getMarkdownManifest(request?: Request): Promise<MarkdownMeta[]> {
  if (manifestCache) {
    return manifestCache;
  }

  try {
    // In Cloudflare Workers with Vite, static assets from public/ are available at root
    // Use absolute URL if request is provided for proper resolution in Workers context
    const manifestUrl = request ? new URL('/markdown-manifest.json', request.url).href : '/markdown-manifest.json';

    const response = await fetch(manifestUrl);
    if (!response.ok) {
      console.warn(`Failed to fetch manifest: ${response.status} ${response.statusText}`);
      return [];
    }

    const manifest = (await response.json()) as MarkdownMeta[];
    
    // Filter out build metadata for runtime use
    const cleanManifest = manifest.map(({ _mtime, _size, ...item }) => item);
    
    manifestCache = cleanManifest;
    return cleanManifest;
  } catch (error) {
    console.warn('Failed to load markdown manifest:', error);
    return [];
  }
}

/**
 * Get markdown content data from generated JSON file
 * This reads from the consumer app's generated content file
 */
export async function getMarkdownContent(request?: Request): Promise<Record<string, MarkdownContent>> {
  if (contentCache) {
    return contentCache;
  }

  try {
    // In Cloudflare Workers with Vite, static assets from public/ are available at root
    // Use absolute URL if request is provided for proper resolution in Workers context
    const contentUrl = request ? new URL('/markdown-content.json', request.url).href : '/markdown-content.json';

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
 * Get a specific markdown document by slug
 */
export async function getMarkdownDocument(slug: string, request?: Request): Promise<MarkdownContent | null> {
  const content = await getMarkdownContent(request);
  return content[slug] || null;
}

/**
 * Clear the cache (useful for testing or hot reload)
 */
export function clearMarkdownCache(): void {
  manifestCache = null;
  contentCache = null;
}

/**
 * Check if a document exists by slug
 */
export async function hasMarkdownDocument(slug: string, request?: Request): Promise<boolean> {
  const content = await getMarkdownContent(request);
  return slug in content;
}

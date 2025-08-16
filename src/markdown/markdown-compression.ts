/**
 * Smart serving helpers for compressed markdown content
 */
import type { CompressionHeaders, ServeOptions } from '../@types/markdown.types';
import { MARKDOWN_CONFIG } from './markdown-config';
import { getCompressedFilePath } from './utils';

/**
 * Decompress gzip content using native DecompressionStream API
 */
export async function decompressGzip(compressedData: ArrayBuffer): Promise<string> {
  try {
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(new Uint8Array(compressedData));
        controller.close();
      }
    });

    const decompressedStream = stream.pipeThrough(new DecompressionStream('gzip'));
    const response = new Response(decompressedStream);
    return await response.text();
  } catch (error) {
    throw new Error(`Gzip decompression failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Fetch and decompress gzip content from a URL
 */
export async function fetchDecompressed(url: string, assets?: Fetcher): Promise<string> {
  const fetchFn = assets ? (input: RequestInfo | URL, init?: RequestInit) => assets.fetch(input, init) : fetch;
  const response = await fetchFn(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return await decompressGzip(arrayBuffer);
}

/**
 * Creates headers for compressed content serving
 */
export function getCompressionHeaders(isCompressed: boolean, options: ServeOptions = {}): CompressionHeaders {
  const { maxAge = MARKDOWN_CONFIG.CACHE.MAX_AGE } = options;
  const headers: CompressionHeaders = {
    'Content-Type': 'application/json',
    'Vary': 'Accept-Encoding',
  };

  if (isCompressed) {
    headers['Content-Encoding'] = 'gzip';
  }

  if (maxAge > 0) {
    headers['Cache-Control'] = `public, max-age=${maxAge}`;
  }

  return headers;
}

/**
 * Smart content serving function for React Router loaders
 */
export async function serveCompressedContent(
  filename: string,
  options: ServeOptions = {}
): Promise<Response> {
  const { acceptEncoding, prefix = MARKDOWN_CONFIG.PREFIX } = options;
  const supportsGzip = acceptEncoding?.includes('gzip') ?? false;
  const filePath = getCompressedFilePath(`/public/${prefix}-${filename}`, supportsGzip ? 'gzip' : null);
  const headers = getCompressionHeaders(supportsGzip, options);

  try {
    const response = await fetch(filePath);

    if (!response.ok) {
      // Fallback to uncompressed if gzip version doesn't exist
      const fallbackPath = `/public/${prefix}-${filename}`;
      const fallbackResponse = await fetch(fallbackPath);

      if (fallbackResponse.ok) {
        const content = await fallbackResponse.text();
        return new Response(content, { headers: getCompressionHeaders(false, options) });
      }

      throw new Error(`File not found: ${filename}`);
    }

    const content = await response.arrayBuffer();
    return new Response(content, { headers });

  } catch (_error) {
    return new Response('Not Found', { status: 404 });
  }
}

/**
 * Helper for React Router data loading with gzip support
 */
export function createMarkdownLoader(options: ServeOptions = {}) {
  return async ({ request }: { request: Request }) => {
    const acceptEncoding = request.headers.get('accept-encoding') || undefined;

    return {
      manifest: await serveCompressedContent('manifest.json', { ...options, acceptEncoding }),
      content: await serveCompressedContent('content.json', { ...options, acceptEncoding }),
    };
  };
}

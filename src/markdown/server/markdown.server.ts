import type { EnhancedMarkdownMeta, MarkdownLoaderArgs } from '../../@types/markdown.types';
import { CloudflareContext } from '../../adapters/cloudflare/context.server';
import { getMarkdownManifest } from '../markdown-data';

// Enhanced loader for Cloudflare Worker environments
export function createMarkdownLoader() {
  return async function markdownLoader({ request, context }: MarkdownLoaderArgs): Promise<EnhancedMarkdownMeta[]> {
    try {
      console.log('markdownLoader: Starting manifest fetch for request URL:', request.url);

      // Get ASSETS binding from Cloudflare context
      if (!context) {
        throw new Error('Context is required for ASSETS binding');
      }

      const contextValue = context.get(CloudflareContext);
      console.log('markdownLoader: Context check - contextValue:', !!contextValue, 'env:', !!contextValue?.env, 'ASSETS:', !!contextValue?.env?.ASSETS);
      
      if (!contextValue || !contextValue.env) {
        throw new Error('CloudflareContext not properly initialized');
      }
      
      const { env } = contextValue;
      if (!env.ASSETS) {
        throw new Error('ASSETS binding not available');
      }

      console.log('markdownLoader: Using ASSETS binding for asset fetching');
      const manifest = await getMarkdownManifest(env.ASSETS, request);
      console.log('markdownLoader: Successfully loaded manifest with', manifest.length, 'documents');
      return manifest as EnhancedMarkdownMeta[];
    } catch (error) {
      console.error('markdownLoader: Failed to load manifest:', error);
      console.error('markdownLoader: Request URL was:', request.url);
      // Return empty array so the UI can show "No documentation found" instead of crashing
      return [];
    }
  };
}
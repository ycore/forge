import { redirect } from 'react-router';
import type { MarkdownLoaderArgs } from '../../@types/markdown.types';
import { CloudflareContext } from '../../adapters/cloudflare/context.server';
import { getMarkdownDocument } from '../markdown-data';
import { ROUTES_TEMPLATE } from '../routes/markdown';

// Enhanced loader for Cloudflare Worker environments
export function createMarkdownSlugLoader() {
  return async function markdownSlugLoader({ params, request, context }: MarkdownLoaderArgs & { params: Record<string, string | undefined> }) {
    const slug = params['*'];

    // Validate slug
    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
      throw new Response('Invalid document slug', { status: 400 });
    }

    // Sanitize slug to prevent directory traversal (allow forward slashes for folder paths)
    const sanitizedSlug = slug.replace(/[^a-zA-Z0-9-_/]/g, '');
    if (sanitizedSlug !== slug) {
      throw new Response('Invalid document slug format', { status: 400 });
    }

    // Prevent directory traversal attempts
    if (sanitizedSlug.includes('..') || sanitizedSlug.startsWith('/') || sanitizedSlug.endsWith('/')) {
      throw new Response('Invalid document slug format', { status: 400 });
    }

    // Get ASSETS binding from Cloudflare context
    if (!context) {
      throw new Response('Context is required for ASSETS binding', { status: 500 });
    }

    const contextValue = context.get(CloudflareContext);
    console.log('markdownSlugLoader: Context check - contextValue:', !!contextValue, 'env:', !!contextValue?.env, 'ASSETS:', !!contextValue?.env?.ASSETS);

    if (!contextValue || !contextValue.env) {
      throw new Response('CloudflareContext not properly initialized', { status: 500 });
    }

    const { env } = contextValue;
    if (!env.ASSETS) {
      throw new Response('ASSETS binding not available', { status: 500 });
    }

    const url = new URL(request.url);
    const isApiCall = url.searchParams.has('api') || request.headers.get('Accept')?.includes('application/json');

    // Check if the document exists
    const doc = await getMarkdownDocument(sanitizedSlug, env.ASSETS, request);
    if (!doc) {
      throw new Response('Document not found', { status: 404 });
    }

    // If it's an API call, return the document data
    if (isApiCall) {
      const enhancedFrontmatter = {
        ...doc.frontmatter,
        formattedDate: doc.frontmatter.date ? new Date(doc.frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : undefined,
      };

      return Response.json({ content: doc.content, frontmatter: enhancedFrontmatter, slug: sanitizedSlug });
    }

    // Otherwise, redirect to main docs page with fragment
    return redirect(ROUTES_TEMPLATE.docs(sanitizedSlug));
  };
}

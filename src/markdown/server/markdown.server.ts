import { redirect } from 'react-router';
import { ASSET_ROUTES } from '../markdown-config';
import { getMarkdownDocument, getMarkdownManifest } from '../markdown-data';

export async function markdownLoader({ request, ASSETS }: { request: Request; ASSETS: Fetcher }) {
  try {
    const manifest = await getMarkdownManifest(ASSETS, request);
    return manifest;
  } catch (_error) {
    return [];
  }
}

export async function markdownSlugLoader({ validatedSlug, request, ASSETS }: { validatedSlug: string; request: Request; ASSETS: Fetcher }) {
  const url = new URL(request.url);
  const isApiCall = url.searchParams.has('api') || request.headers.get('Accept')?.includes('application/json');

  // Check if the document exists
  const doc = await getMarkdownDocument(validatedSlug, ASSETS, request);
  if (!doc) {
    throw new Response('Document not found', { status: 404 });
  }

  // If it's an API call, return the document data
  if (isApiCall) {
    const enhancedFrontmatter = {
      ...doc.frontmatter,
      formattedDate: doc.frontmatter.date ? new Date(doc.frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : undefined,
    };

    return Response.json({ content: doc.content, frontmatter: enhancedFrontmatter, slug: validatedSlug });
  }

  // Otherwise, redirect to main docs page with fragment
  return redirect(ASSET_ROUTES.docs(validatedSlug));
}

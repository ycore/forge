import MARKDOWN_CONTENT from 'virtual:md-content';
import { redirect } from 'react-router';

import { routesTemplate } from './markdown';

interface LoaderArgs {
  params: { '*': string };
  request: Request;
}

export async function loader({ params, request }: LoaderArgs) {
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

  const url = new URL(request.url);
  const isApiCall = url.searchParams.has('api') || request.headers.get('Accept')?.includes('application/json');

  // Check if the document exists
  const doc = MARKDOWN_CONTENT[sanitizedSlug];
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
  return redirect(routesTemplate.docs(sanitizedSlug));
}

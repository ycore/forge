import type { SEOHandle, SiteMap, SitemapEntry, SiteXml } from '../@types/sitemap.types';

export async function generateSitemap({ request, routes, options, exclude }: SiteMap) {
  const { headers } = options;
  const sitemap = await getSitemapXml({ request, routes, options, exclude });
  const bytes = new TextEncoder().encode(sitemap).byteLength;

  return new Response(sitemap, { headers: { ...headers, 'Content-Type': 'application/xml', 'Content-Length': String(bytes) } });
}

async function getSitemapXml({ request, routes, options, exclude }: SiteXml) {
  const { siteUrl } = options;

  function getEntry({ route, lastmod, changefreq, priority = 0.7 }: SitemapEntry) {
    if (excludeRoute(route.replace(/^\/+/, ''), exclude)) return;

    // Ensure proper URL construction without double slashes
    const normalizedRoute = route.startsWith('/') ? route : `/${route}`;
    const normalizedSiteUrl = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;
    const fullUrl = `${normalizedSiteUrl}${normalizedRoute}`;

    return `
  <url>
    <loc>${fullUrl}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
    ${changefreq ? `<changefreq>${changefreq}</changefreq>` : ''}
    ${typeof priority === 'number' ? `<priority>${priority}</priority>` : ''}
  </url>
    `.trim();
  }

  const sitemapText = (sitemapEntries: SitemapEntry[]) =>
    `
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
  >
    ${sitemapEntries.map(entry => getEntry(entry)).join('')}
  </urlset>
    `.trim();

  const rawSitemapEntries = (
    await Promise.all(
      Object.entries(routes).map(async ([id, route]) => {
        if (id === 'root') return;
        if (!route) return;
        if (!('module' in route)) return;
        const mod = route.module;

        const handle = mod.handle as SEOHandle | undefined;
        if (handle?.getSitemapEntries) {
          return handle.getSitemapEntries(request);
        }

        if (!('default' in mod)) return;

        const manifestEntry = routes[id];
        if (!manifestEntry) {
          console.warn(`Could not find a manifest entry for ${id}`);
          return;
        }
        let parentId = manifestEntry.parentId;
        let parent = parentId ? routes[parentId] : null;

        let path: string | string[];
        if (manifestEntry.path) {
          path = removeTrailingSlash(manifestEntry.path);
        } else if (manifestEntry.index) {
          path = '';
        } else {
          return;
        }

        while (parent) {
          // the root path is '/', so it messes things up if we add another '/'
          const parentPath = parent.path ? removeTrailingSlash(parent.path) : '';
          path = `${parentPath}/${path}`;
          parentId = parent.parentId;
          parent = parentId ? routes[parentId] : null;
        }

        // can't handle dynamic routes or wildcards, so return if the handle doesn't have a getSitemapEntries function
        if (path.includes(':') || path.includes('*')) return;
        if (id === 'root') return;

        const entry: SitemapEntry = { route: removeTrailingSlash(path) };
        return entry;
      })
    )
  )
    .flat()
    .filter(typedBoolean);

  const sitemapEntries: Array<SitemapEntry> = [];
  for (const entry of rawSitemapEntries) {
    const existingEntryForRoute = sitemapEntries.find(e => e.route === entry.route);
    if (!existingEntryForRoute) {
      sitemapEntries.push(entry);
    }
  }

  return sitemapText(sitemapEntries);
}

function excludeRoute(route: string, exclude: string[]): boolean {
  for (const pattern of exclude) {
    if (pattern === route) return true;

    if (pattern.includes('*')) {
      const regexPattern = pattern
        .replace(/[.+?^${}()|[\]\\]/g, '\\$&') // escape special regex chars
        .replace(/\*/g, '.*'); // convert * to .*

      const regex = new RegExp(`^${regexPattern}$`);
      if (regex.test(route)) return true;
    }
  }
  return false;
}

function typedBoolean<T>(value: T): value is Exclude<T, '' | 0 | false | null | undefined> {
  return Boolean(value);
}

function removeTrailingSlash(s: string) {
  return s.endsWith('/') ? s.slice(0, -1) : s;
}

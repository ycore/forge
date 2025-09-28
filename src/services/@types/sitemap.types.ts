import type { ServerBuild } from 'react-router';

type Options = {
  siteUrl: string;
};

export type SitemapEntry = {
  route: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: 0.0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1.0;
};

export type SEOHandle = {
  getSitemapEntries?: (request: Request) => Promise<Array<SitemapEntry | null> | null> | Array<SitemapEntry | null> | null;
};

export type SEOOptions = {
  siteUrl: string;
  headers?: HeadersInit;
};

export type SiteMap = {
  request: Request;
  routes: ServerBuild['routes'];
  options: SEOOptions;
  exclude: string[];
};

export type SiteXml = {
  request: Request;
  routes: ServerBuild['routes'];
  options: Options;
  exclude: string[];
};

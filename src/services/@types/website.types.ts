import type { RobotsOptions } from "./robots.types";

/**
 * Routes for website features (sitemap, robots.txt)
 */
export type WebsiteRoutes = Record<'sitemap' | 'robots', string>;

/**
 * Static website configuration for SEO, metadata, and publishing features
 * Used by sitemap generation, robots.txt, and other website metadata needs
 */
export interface WebsiteConfig {
  // Core site configuration - single source of truth
  site: {
    url: string;                    // Base URL for everything (https://example.com)
    name: string;                   // Site name used everywhere
    description: string;            // Main site description

    // Path configuration
    paths: {
      sitemap: string;              // sitemap.xml
      robots: string;               // robots.txt
    };

    // Universal exclusions (apply to both sitemap and robots)
    exclude: {
      paths: string[];              // Custom paths to exclude ['auth/*', 'api/*']
    };
  };

  // Robots with simplified patterns
  robots: RobotsOptions;
}

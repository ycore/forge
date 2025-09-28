export interface RobotsRule {
  userAgent: string;
  allows?: string[];
  disallows?: string[];
  crawlDelay?: number;
}

export interface RobotsOptions {
  sitemapUrl?: string;
  rules: RobotsRule[];
}

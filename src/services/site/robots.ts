import type { RobotsOptions } from "../@types/robots.types";

export function generateRobotsTxt({ sitemapUrl, rules }: RobotsOptions): string {
  let txt = "";

  for (const rule of rules) {
    txt += `User-agent: ${rule.userAgent}\n`;

    if (rule.allows?.length) {
      txt += `${rule.allows.map((a) => `Allow: ${a}`).join("\n")}\n`;
    }

    if (rule.disallows?.length) {
      txt += `${rule.disallows.map((d) => `Disallow: ${d}`).join("\n")}\n`;
    }

    if (rule.crawlDelay !== undefined) {
      txt += `Crawl-delay: ${rule.crawlDelay}\n`;
    }

    txt += "\n";
  }

  if (sitemapUrl) {
    txt += `Sitemap: ${sitemapUrl}\n`;
  }

  return txt.trim();
}

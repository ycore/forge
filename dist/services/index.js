import { createContext } from "react-router";
import { drizzle } from "drizzle-orm/d1";
const UNCONFIGURED = "UNCONFIGURED";
const CloudflareContext = createContext({});
function getBindings(context) {
  return context.get(CloudflareContext).env;
}
function getExecutionContext(context) {
  return context.get(CloudflareContext).ctx;
}
function getRequestProperties(context) {
  return context.get(CloudflareContext).cf;
}
function waitUntil(context, promise) {
  return getExecutionContext(context).waitUntil(promise);
}
const LOG_LEVELS = {
  emergency: 7,
  alert: 6,
  critical: 5,
  error: 4,
  warning: 3,
  notice: 2,
  info: 1,
  debug: 0
};
function shouldLog(level, minLevel) {
  return LOG_LEVELS[level] >= LOG_LEVELS[minLevel];
}
let loggerConfig = {
  defaultLevel: "info",
  channels: [],
  enableSanitization: true
};
function sanitizeLogParams(params) {
  if (!loggerConfig.enableSanitization) {
    return params;
  }
  const { password, token, secret, apiKey, sessionToken, bearerToken, refreshToken, ...sanitized } = params;
  return sanitized;
}
function formatLogArgs(args) {
  const [message, ...rest] = args;
  if (typeof message === "object" && message !== null) {
    return { ...message, ...rest.length > 0 ? { args: rest } : {} };
  }
  return { event: String(message), ...rest.length > 0 ? { args: rest } : {} };
}
function createLogEntry(params) {
  const sanitizedParams = sanitizeLogParams(params);
  return {
    ...sanitizedParams,
    level: sanitizedParams.level || loggerConfig.defaultLevel,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  };
}
async function writeToChannels(entry) {
  const writePromises = loggerConfig.channels.filter((channel) => channel.enabled && shouldLog(entry.level, channel.minLevel)).map((channel) => {
    try {
      const result = channel.output(entry);
      return result instanceof Promise ? result : Promise.resolve();
    } catch (_error) {
      return Promise.resolve();
    }
  });
  await Promise.allSettled(writePromises);
}
const logger = {
  /**
   * Configure the logger with custom settings
   */
  configure(config) {
    loggerConfig = { ...loggerConfig, ...config };
  },
  /**
   * Get current logger configuration
   */
  getConfig() {
    return { ...loggerConfig };
  },
  /**
   * Core logging method that writes to all enabled channels
   */
  async log(params) {
    const entry = createLogEntry(params);
    await writeToChannels(entry);
  },
  /**
   * Genarates a support number
   */
  async support() {
    return crypto.randomUUID();
  },
  // RFC 5424 log levels in descending order of severity
  /**
   * System is unusable - emergency level
   */
  emergency(...args) {
    const params = formatLogArgs(args);
    return this.log({ ...params, level: "emergency" });
  },
  /**
   * Action must be taken immediately - alert level
   */
  alert(...args) {
    const params = formatLogArgs(args);
    return this.log({ ...params, level: "alert" });
  },
  /**
   * Critical conditions - critical level
   */
  critical(...args) {
    const params = formatLogArgs(args);
    return this.log({ ...params, level: "critical" });
  },
  /**
   * Error conditions - error level
   */
  error(...args) {
    const params = formatLogArgs(args);
    return this.log({ ...params, level: "error" });
  },
  /**
   * Warning conditions - warning level
   */
  warning(...args) {
    const params = formatLogArgs(args);
    return this.log({ ...params, level: "warning" });
  },
  /**
   * Normal but significant conditions - notice level
   */
  notice(...args) {
    const params = formatLogArgs(args);
    return this.log({ ...params, level: "notice" });
  },
  /**
   * Informational messages - info level
   */
  info(...args) {
    const params = formatLogArgs(args);
    return this.log({ ...params, level: "info" });
  },
  /**
   * Debug-level messages - debug level
   */
  debug(...args) {
    const params = formatLogArgs(args);
    return this.log({ ...params, level: "debug" });
  }
};
const DatabaseContext = createContext(null);
function bindDatabase(env, binding, schema, enableLogging = false) {
  const d1Database = env[binding];
  const drizzleConfig = { schema };
  if (enableLogging) {
    drizzleConfig.logger = new Logger();
  }
  return drizzle(d1Database, drizzleConfig);
}
function initDatabase(context, env, config) {
  const db = bindDatabase(env, config.binding, config.schema, config.enableLogging);
  context.set(DatabaseContext, db);
  return db;
}
function getDatabase(context) {
  const db = context.get(DatabaseContext);
  if (!db) {
    throw new Error("Database context not found. Make sure to bind database in your worker entry point.");
  }
  return db;
}
class Logger {
  logQuery(query, params) {
    const cleanQuery = query.replace(/\s*\n\s*/g, " ").replace(/"/g, "`").replace(/\s+/g, " ").trim();
    logger.debug("SQL", { query: cleanQuery, params: params.length > 0 ? params : void 0 });
  }
}
const EnvironmentContext = createContext("development");
function getEnvironment(context) {
  return context.get(EnvironmentContext);
}
function isDevelopment(context) {
  return getEnvironment(context) === "development";
}
function isProduction(context) {
  return getEnvironment(context) === "production";
}
function isTesting(context) {
  return getEnvironment(context) === "test";
}
function getKVStore(context, bindingName) {
  const bindings = getBindings(context);
  return bindings[bindingName];
}
function extractHostname(urlOrRequest) {
  const url = typeof urlOrRequest === "string" ? urlOrRequest : urlOrRequest.url;
  return new URL(url).hostname;
}
function extractOrigin(urlOrRequest) {
  const url = typeof urlOrRequest === "string" ? urlOrRequest : urlOrRequest.url;
  return new URL(url).origin;
}
function isLocalhost(hostname) {
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]";
}
function getOriginDomain(context, request) {
  const bindings = getBindings(context);
  const siteUrl = bindings["SITE_URL"];
  if (siteUrl) {
    return extractHostname(siteUrl);
  }
  return extractHostname(request);
}
function getOrigin(context, request) {
  const bindings = getBindings(context);
  const siteUrl = bindings["SITE_URL"];
  if (siteUrl) {
    return extractOrigin(siteUrl);
  }
  return extractOrigin(request);
}
function isLocalhostOrigin(context, request) {
  const domain = getOriginDomain(context, request);
  return isLocalhost(domain);
}
function getOriginInfo(context, request) {
  const domain = getOriginDomain(context, request);
  const origin = getOrigin(context, request);
  const localhost = isLocalhost(domain);
  const development = isDevelopment(context);
  return { domain, origin, isLocalhost: localhost, isDevelopment: development };
}
function generateRobotsTxt({ sitemapUrl, rules }) {
  let txt = "";
  for (const rule of rules) {
    txt += `User-agent: ${rule.userAgent}
`;
    if (rule.allows?.length) {
      txt += `${rule.allows.map((a) => `Allow: ${a}`).join("\n")}
`;
    }
    if (rule.disallows?.length) {
      txt += `${rule.disallows.map((d) => `Disallow: ${d}`).join("\n")}
`;
    }
    if (rule.crawlDelay !== void 0) {
      txt += `Crawl-delay: ${rule.crawlDelay}
`;
    }
    txt += "\n";
  }
  if (sitemapUrl) {
    txt += `Sitemap: ${sitemapUrl}
`;
  }
  return txt.trim();
}
async function generateSitemap({ request, routes, options, exclude }) {
  const { headers } = options;
  const sitemap = await getSitemapXml({ request, routes, options, exclude });
  const bytes = new TextEncoder().encode(sitemap).byteLength;
  return new Response(sitemap, { headers: { ...headers, "Content-Type": "application/xml", "Content-Length": String(bytes) } });
}
async function getSitemapXml({ request, routes, options, exclude }) {
  const { siteUrl } = options;
  function getEntry({ route, lastmod, changefreq, priority = 0.7 }) {
    if (excludeRoute(route.replace(/^\/+/, ""), exclude)) return;
    const normalizedRoute = route.startsWith("/") ? route : `/${route}`;
    const normalizedSiteUrl = siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl;
    const fullUrl = `${normalizedSiteUrl}${normalizedRoute}`;
    return `
  <url>
    <loc>${fullUrl}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}
    ${changefreq ? `<changefreq>${changefreq}</changefreq>` : ""}
    ${typeof priority === "number" ? `<priority>${priority}</priority>` : ""}
  </url>
    `.trim();
  }
  const sitemapText = (sitemapEntries2) => `
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
  >
    ${sitemapEntries2.map((entry) => getEntry(entry)).join("")}
  </urlset>
    `.trim();
  const rawSitemapEntries = (await Promise.all(
    Object.entries(routes).map(async ([id, route]) => {
      if (id === "root") return;
      if (!route) return;
      if (!("module" in route)) return;
      const mod = route.module;
      const handle = mod.handle;
      if (handle?.getSitemapEntries) {
        return handle.getSitemapEntries(request);
      }
      if (!("default" in mod)) return;
      const manifestEntry = routes[id];
      if (!manifestEntry) {
        console.warn(`Could not find a manifest entry for ${id}`);
        return;
      }
      let parentId = manifestEntry.parentId;
      let parent = parentId ? routes[parentId] : null;
      let path;
      if (manifestEntry.path) {
        path = removeTrailingSlash(manifestEntry.path);
      } else if (manifestEntry.index) {
        path = "";
      } else {
        return;
      }
      while (parent) {
        const parentPath = parent.path ? removeTrailingSlash(parent.path) : "";
        path = `${parentPath}/${path}`;
        parentId = parent.parentId;
        parent = parentId ? routes[parentId] : null;
      }
      if (path.includes(":") || path.includes("*")) return;
      if (id === "root") return;
      const entry = { route: removeTrailingSlash(path) };
      return entry;
    })
  )).flat().filter(typedBoolean);
  const sitemapEntries = [];
  for (const entry of rawSitemapEntries) {
    const existingEntryForRoute = sitemapEntries.find((e) => e.route === entry.route);
    if (!existingEntryForRoute) {
      sitemapEntries.push(entry);
    }
  }
  return sitemapText(sitemapEntries);
}
function excludeRoute(route, exclude) {
  for (const pattern of exclude) {
    if (pattern === route) return true;
    if (pattern.includes("*")) {
      const regexPattern = pattern.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
      const regex = new RegExp(`^${regexPattern}$`);
      if (regex.test(route)) return true;
    }
  }
  return false;
}
function typedBoolean(value) {
  return Boolean(value);
}
function removeTrailingSlash(s) {
  return s.endsWith("/") ? s.slice(0, -1) : s;
}
export {
  CloudflareContext,
  DatabaseContext,
  EnvironmentContext,
  UNCONFIGURED,
  bindDatabase,
  generateRobotsTxt,
  generateSitemap,
  getBindings,
  getDatabase,
  getEnvironment,
  getExecutionContext,
  getKVStore,
  getOrigin,
  getOriginDomain,
  getOriginInfo,
  getRequestProperties,
  initDatabase,
  isDevelopment,
  isLocalhostOrigin,
  isProduction,
  isTesting,
  waitUntil
};
//# sourceMappingURL=index.js.map

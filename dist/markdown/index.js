// src/markdown/markdown-config.ts
var MARKDOWN_CONFIG = {
  EXTENSION: ".md",
  CHUNK_BY_FOLDER: true,
  INCREMENTAL_BY_FOLDER: false,
  PREFIX: "markdown",
  PURIFY_HTML: true,
  UPDATE_DATE: true,
  COMPRESS: true,
  CONCURRENCY: {
    FOLDERS: 5,
    FILES: 10
  },
  CACHE: {
    MAX_AGE: 3600
  }
};
var ASSET_PREFIX = {
  build: "/assets/docs",
  fetch: "/assets/docs"
};
var DOMPURIFY_CONFIG = {
  ALLOWED_TAGS: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "br", "strong", "em", "u", "s", "del", "a", "img", "ul", "ol", "li", "blockquote", "pre", "code", "table", "thead", "tbody", "tr", "th", "td", "hr", "div", "span"],
  ALLOWED_ATTR: ["href", "title", "alt", "src", "class", "id", "start", "type", "colspan", "rowspan", "datetime", "scope", "data-*"],
  FORBID_TAGS: ["script", "object", "embed", "form", "input", "button", "iframe", "frame", "frameset", "noframes"],
  FORBID_ATTR: ["style", "on*"],
  KEEP_CONTENT: true,
  ALLOW_DATA_ATTR: false
};
var HIGHLIGHTER_CONFIG = {
  LANGS: ["javascript", "typescript", "css", "html", "bash", "yaml", "json", "markdown"],
  THEMES: ["night-owl"]
};

// node:path
function assertPath(path) {
  if (typeof path !== "string")
    throw new TypeError("Path must be a string. Received " + JSON.stringify(path));
}
function normalizeStringPosix(path, allowAboveRoot) {
  var res = "", lastSegmentLength = 0, lastSlash = -1, dots = 0, code;
  for (var i = 0;i <= path.length; ++i) {
    if (i < path.length)
      code = path.charCodeAt(i);
    else if (code === 47)
      break;
    else
      code = 47;
    if (code === 47) {
      if (lastSlash === i - 1 || dots === 1)
        ;
      else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1)
                res = "", lastSegmentLength = 0;
              else
                res = res.slice(0, lastSlashIndex), lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
              lastSlash = i, dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = "", lastSegmentLength = 0, lastSlash = i, dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0)
            res += "/..";
          else
            res = "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0)
          res += "/" + path.slice(lastSlash + 1, i);
        else
          res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i, dots = 0;
    } else if (code === 46 && dots !== -1)
      ++dots;
    else
      dots = -1;
  }
  return res;
}
function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root, base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
  if (!dir)
    return base;
  if (dir === pathObject.root)
    return dir + base;
  return dir + sep + base;
}
function resolve() {
  var resolvedPath = "", resolvedAbsolute = false, cwd;
  for (var i = arguments.length - 1;i >= -1 && !resolvedAbsolute; i--) {
    var path;
    if (i >= 0)
      path = arguments[i];
    else {
      if (cwd === undefined)
        cwd = process.cwd();
      path = cwd;
    }
    if (assertPath(path), path.length === 0)
      continue;
    resolvedPath = path + "/" + resolvedPath, resolvedAbsolute = path.charCodeAt(0) === 47;
  }
  if (resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute), resolvedAbsolute)
    if (resolvedPath.length > 0)
      return "/" + resolvedPath;
    else
      return "/";
  else if (resolvedPath.length > 0)
    return resolvedPath;
  else
    return ".";
}
function normalize(path) {
  if (assertPath(path), path.length === 0)
    return ".";
  var isAbsolute = path.charCodeAt(0) === 47, trailingSeparator = path.charCodeAt(path.length - 1) === 47;
  if (path = normalizeStringPosix(path, !isAbsolute), path.length === 0 && !isAbsolute)
    path = ".";
  if (path.length > 0 && trailingSeparator)
    path += "/";
  if (isAbsolute)
    return "/" + path;
  return path;
}
function isAbsolute(path) {
  return assertPath(path), path.length > 0 && path.charCodeAt(0) === 47;
}
function join() {
  if (arguments.length === 0)
    return ".";
  var joined;
  for (var i = 0;i < arguments.length; ++i) {
    var arg = arguments[i];
    if (assertPath(arg), arg.length > 0)
      if (joined === undefined)
        joined = arg;
      else
        joined += "/" + arg;
  }
  if (joined === undefined)
    return ".";
  return normalize(joined);
}
function relative(from, to) {
  if (assertPath(from), assertPath(to), from === to)
    return "";
  if (from = resolve(from), to = resolve(to), from === to)
    return "";
  var fromStart = 1;
  for (;fromStart < from.length; ++fromStart)
    if (from.charCodeAt(fromStart) !== 47)
      break;
  var fromEnd = from.length, fromLen = fromEnd - fromStart, toStart = 1;
  for (;toStart < to.length; ++toStart)
    if (to.charCodeAt(toStart) !== 47)
      break;
  var toEnd = to.length, toLen = toEnd - toStart, length = fromLen < toLen ? fromLen : toLen, lastCommonSep = -1, i = 0;
  for (;i <= length; ++i) {
    if (i === length) {
      if (toLen > length) {
        if (to.charCodeAt(toStart + i) === 47)
          return to.slice(toStart + i + 1);
        else if (i === 0)
          return to.slice(toStart + i);
      } else if (fromLen > length) {
        if (from.charCodeAt(fromStart + i) === 47)
          lastCommonSep = i;
        else if (i === 0)
          lastCommonSep = 0;
      }
      break;
    }
    var fromCode = from.charCodeAt(fromStart + i), toCode = to.charCodeAt(toStart + i);
    if (fromCode !== toCode)
      break;
    else if (fromCode === 47)
      lastCommonSep = i;
  }
  var out = "";
  for (i = fromStart + lastCommonSep + 1;i <= fromEnd; ++i)
    if (i === fromEnd || from.charCodeAt(i) === 47)
      if (out.length === 0)
        out += "..";
      else
        out += "/..";
  if (out.length > 0)
    return out + to.slice(toStart + lastCommonSep);
  else {
    if (toStart += lastCommonSep, to.charCodeAt(toStart) === 47)
      ++toStart;
    return to.slice(toStart);
  }
}
function _makeLong(path) {
  return path;
}
function dirname(path) {
  if (assertPath(path), path.length === 0)
    return ".";
  var code = path.charCodeAt(0), hasRoot = code === 47, end = -1, matchedSlash = true;
  for (var i = path.length - 1;i >= 1; --i)
    if (code = path.charCodeAt(i), code === 47) {
      if (!matchedSlash) {
        end = i;
        break;
      }
    } else
      matchedSlash = false;
  if (end === -1)
    return hasRoot ? "/" : ".";
  if (hasRoot && end === 1)
    return "//";
  return path.slice(0, end);
}
function basename(path, ext) {
  if (ext !== undefined && typeof ext !== "string")
    throw new TypeError('"ext" argument must be a string');
  assertPath(path);
  var start = 0, end = -1, matchedSlash = true, i;
  if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
    if (ext.length === path.length && ext === path)
      return "";
    var extIdx = ext.length - 1, firstNonSlashEnd = -1;
    for (i = path.length - 1;i >= 0; --i) {
      var code = path.charCodeAt(i);
      if (code === 47) {
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else {
        if (firstNonSlashEnd === -1)
          matchedSlash = false, firstNonSlashEnd = i + 1;
        if (extIdx >= 0)
          if (code === ext.charCodeAt(extIdx)) {
            if (--extIdx === -1)
              end = i;
          } else
            extIdx = -1, end = firstNonSlashEnd;
      }
    }
    if (start === end)
      end = firstNonSlashEnd;
    else if (end === -1)
      end = path.length;
    return path.slice(start, end);
  } else {
    for (i = path.length - 1;i >= 0; --i)
      if (path.charCodeAt(i) === 47) {
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1)
        matchedSlash = false, end = i + 1;
    if (end === -1)
      return "";
    return path.slice(start, end);
  }
}
function extname(path) {
  assertPath(path);
  var startDot = -1, startPart = 0, end = -1, matchedSlash = true, preDotState = 0;
  for (var i = path.length - 1;i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47) {
      if (!matchedSlash) {
        startPart = i + 1;
        break;
      }
      continue;
    }
    if (end === -1)
      matchedSlash = false, end = i + 1;
    if (code === 46) {
      if (startDot === -1)
        startDot = i;
      else if (preDotState !== 1)
        preDotState = 1;
    } else if (startDot !== -1)
      preDotState = -1;
  }
  if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1)
    return "";
  return path.slice(startDot, end);
}
function format(pathObject) {
  if (pathObject === null || typeof pathObject !== "object")
    throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
  return _format("/", pathObject);
}
function parse(path) {
  assertPath(path);
  var ret = { root: "", dir: "", base: "", ext: "", name: "" };
  if (path.length === 0)
    return ret;
  var code = path.charCodeAt(0), isAbsolute2 = code === 47, start;
  if (isAbsolute2)
    ret.root = "/", start = 1;
  else
    start = 0;
  var startDot = -1, startPart = 0, end = -1, matchedSlash = true, i = path.length - 1, preDotState = 0;
  for (;i >= start; --i) {
    if (code = path.charCodeAt(i), code === 47) {
      if (!matchedSlash) {
        startPart = i + 1;
        break;
      }
      continue;
    }
    if (end === -1)
      matchedSlash = false, end = i + 1;
    if (code === 46) {
      if (startDot === -1)
        startDot = i;
      else if (preDotState !== 1)
        preDotState = 1;
    } else if (startDot !== -1)
      preDotState = -1;
  }
  if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    if (end !== -1)
      if (startPart === 0 && isAbsolute2)
        ret.base = ret.name = path.slice(1, end);
      else
        ret.base = ret.name = path.slice(startPart, end);
  } else {
    if (startPart === 0 && isAbsolute2)
      ret.name = path.slice(1, startDot), ret.base = path.slice(1, end);
    else
      ret.name = path.slice(startPart, startDot), ret.base = path.slice(startPart, end);
    ret.ext = path.slice(startDot, end);
  }
  if (startPart > 0)
    ret.dir = path.slice(0, startPart - 1);
  else if (isAbsolute2)
    ret.dir = "/";
  return ret;
}
var sep = "/";
var delimiter = ":";
var posix = ((p) => (p.posix = p, p))({ resolve, normalize, isAbsolute, join, relative, _makeLong, dirname, basename, extname, format, parse, sep, delimiter, win32: null, posix: null });
var path_default = posix;

// src/markdown/utils.ts
function getAssetPath(filename) {
  const buildPrefix = ASSET_PREFIX.build.startsWith("/") ? ASSET_PREFIX.build.slice(1) : ASSET_PREFIX.build;
  return path_default.join(process.cwd(), "public", buildPrefix, filename);
}
function shouldUseCompression(filename) {
  if (!MARKDOWN_CONFIG.COMPRESS)
    return false;
  const isContentFile = filename.includes("content") && !filename.includes("manifest");
  return isContentFile;
}
function getAssetUrl(filename, request, forceCompressed) {
  const fetchPrefix = ASSET_PREFIX.fetch.endsWith("/") ? ASSET_PREFIX.fetch.slice(0, -1) : ASSET_PREFIX.fetch;
  const shouldCompress = forceCompressed || shouldUseCompression(filename);
  const finalFilename = shouldCompress ? `${filename}.gz` : filename;
  const url = `${fetchPrefix}/${finalFilename}`;
  return request ? new URL(url, request.url).href : url;
}
function getCompressedFilePath(basePath, compression) {
  if (!compression)
    return basePath;
  const ext = compression === "brotli" ? ".br" : ".gz";
  return `${basePath}${ext}`;
}

// src/markdown/markdown-compression.ts
async function decompressGzip(compressedData) {
  try {
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(new Uint8Array(compressedData));
        controller.close();
      }
    });
    const decompressedStream = stream.pipeThrough(new DecompressionStream("gzip"));
    const response = new Response(decompressedStream);
    return await response.text();
  } catch (error) {
    throw new Error(`Gzip decompression failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
async function fetchDecompressed(url, assets) {
  const fetchFn = assets ? (input, init) => assets.fetch(input, init) : fetch;
  const response = await fetchFn(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  return await decompressGzip(arrayBuffer);
}
function getCompressionHeaders(isCompressed, options = {}) {
  const { maxAge = MARKDOWN_CONFIG.CACHE.MAX_AGE } = options;
  const headers = {
    "Content-Type": "application/json",
    Vary: "Accept-Encoding"
  };
  if (isCompressed) {
    headers["Content-Encoding"] = "gzip";
  }
  if (maxAge > 0) {
    headers["Cache-Control"] = `public, max-age=${maxAge}`;
  }
  return headers;
}
async function serveCompressedContent(filename, options = {}) {
  const { acceptEncoding, prefix = MARKDOWN_CONFIG.PREFIX } = options;
  const supportsGzip = acceptEncoding?.includes("gzip") ?? false;
  const filePath = getCompressedFilePath(`/public/${prefix}-${filename}`, supportsGzip ? "gzip" : null);
  const headers = getCompressionHeaders(supportsGzip, options);
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      const fallbackPath = `/public/${prefix}-${filename}`;
      const fallbackResponse = await fetch(fallbackPath);
      if (fallbackResponse.ok) {
        const content2 = await fallbackResponse.text();
        return new Response(content2, { headers: getCompressionHeaders(false, options) });
      }
      throw new Error(`File not found: ${filename}`);
    }
    const content = await response.arrayBuffer();
    return new Response(content, { headers });
  } catch (_error) {
    return new Response("Not Found", { status: 404 });
  }
}
// src/markdown/markdown-data.ts
var manifestCache = null;
var globalManifestCache = null;
var contentCache = null;
var folderContentCache = new Map;
async function fetchContent(url, assets) {
  console.log("fetchContent: Starting fetch for URL:", url);
  const fetchFn = assets ? (input, init) => assets.fetch(input, init) : fetch;
  try {
    if (url.endsWith(".gz")) {
      console.log("fetchContent: Detected compressed file, attempting decompression");
      try {
        const decompressedText = await fetchDecompressed(url, assets);
        console.log("fetchContent: Successfully decompressed, text length:", decompressedText.length);
        const parsed = JSON.parse(decompressedText);
        console.log("fetchContent: Successfully parsed JSON from compressed file");
        return parsed;
      } catch (compressionError) {
        console.warn(`fetchContent: Failed to fetch compressed version ${url}:`, compressionError);
        const fallbackUrl = url.replace(".gz", "");
        console.warn(`fetchContent: Trying fallback ${fallbackUrl}`);
        try {
          const response = await fetchFn(fallbackUrl);
          if (!response.ok) {
            throw new Error(`Fallback HTTP ${response.status}: ${response.statusText}`);
          }
          const parsed = await response.json();
          console.log("fetchContent: Successfully fetched and parsed fallback uncompressed file");
          return parsed;
        } catch (fallbackError) {
          console.error("fetchContent: Fallback also failed:", fallbackError);
          throw compressionError;
        }
      }
    } else {
      console.log("fetchContent: Fetching uncompressed file");
      const response = await fetchFn(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const parsed = await response.json();
      console.log("fetchContent: Successfully fetched and parsed uncompressed file");
      return parsed;
    }
  } catch (error) {
    const errorMsg = `Failed to fetch and parse JSON from ${url}: ${error instanceof Error ? error.message : "Unknown error"}`;
    console.error("fetchContent: Final error:", errorMsg);
    throw new Error(errorMsg);
  }
}
async function getGlobalManifest(request, assets) {
  if (globalManifestCache) {
    return globalManifestCache;
  }
  try {
    const manifestUrl = getAssetUrl("markdown-manifest.json", request);
    console.log("Fetching global manifest from URL:", manifestUrl);
    const globalManifest = await fetchContent(manifestUrl, assets);
    console.log("Successfully loaded global manifest with", globalManifest.documents.length, "documents");
    globalManifestCache = globalManifest;
    return globalManifest;
  } catch (error) {
    console.error("Failed to load global manifest:", error);
    return { documents: [], _buildMode: "single" };
  }
}
async function getMarkdownManifest(request, assets) {
  if (manifestCache) {
    return manifestCache;
  }
  const globalManifest = await getGlobalManifest(request, assets);
  const cleanManifest = globalManifest.documents.map(({ _mtime, _size, ...item }) => item);
  manifestCache = cleanManifest;
  return cleanManifest;
}
async function getMarkdownContent(request, assets) {
  const globalManifest = await getGlobalManifest(request, assets);
  if (globalManifest._buildMode === "chunked") {
    return {};
  }
  if (contentCache) {
    return contentCache;
  }
  try {
    const contentUrl = getAssetUrl("markdown-content.json", request);
    const content = await fetchContent(contentUrl, assets);
    contentCache = content;
    return content;
  } catch (_error) {
    return {};
  }
}
async function loadFolderContent(folder, request, assets) {
  console.log("loadFolderContent: Loading content for folder:", folder);
  if (folderContentCache.has(folder)) {
    const cachedContent = folderContentCache.get(folder);
    if (cachedContent) {
      console.log("loadFolderContent: Found cached content for folder:", folder);
      return cachedContent;
    }
  }
  try {
    const folderKey = folder.replace(/[/\\]/g, "-");
    const contentUrl = getAssetUrl(`markdown-content-${folderKey}.json`, request);
    console.log("loadFolderContent: Generated content URL:", contentUrl, "for folder:", folder);
    const content = await fetchContent(contentUrl, assets);
    console.log("loadFolderContent: Successfully loaded content with", Object.keys(content).length, "documents for folder:", folder);
    folderContentCache.set(folder, content);
    return content;
  } catch (error) {
    console.error(`loadFolderContent: Failed to load folder content for ${folder}:`, error);
    return {};
  }
}
async function getMarkdownDocument(slug, request, assets) {
  const globalManifest = await getGlobalManifest(request, assets);
  if (globalManifest._buildMode === "chunked") {
    const manifest = await getMarkdownManifest(request, assets);
    const docMeta = manifest.find((doc) => doc.slug === slug);
    if (!docMeta || !docMeta.folder) {
      return null;
    }
    const folderContent = await loadFolderContent(docMeta.folder, request, assets);
    return folderContent[slug] || null;
  }
  const content = await getMarkdownContent(request, assets);
  return content[slug] || null;
}
function clearMarkdownCache() {
  manifestCache = null;
  globalManifestCache = null;
  contentCache = null;
  folderContentCache.clear();
}
async function hasMarkdownDocument(slug, request, assets) {
  const globalManifest = await getGlobalManifest(request, assets);
  if (globalManifest._buildMode === "chunked") {
    const manifest = await getMarkdownManifest(request, assets);
    return manifest.some((doc) => doc.slug === slug);
  }
  const content = await getMarkdownContent(request, assets);
  return slug in content;
}
// src/markdown/markdown-loader.tsx
import { jsx } from "react/jsx-runtime";
function Markdown({ children, className = "" }) {
  if (!children || typeof children !== "string") {
    return /* @__PURE__ */ jsx("div", {
      className
    });
  }
  return /* @__PURE__ */ jsx("div", {
    className,
    dangerouslySetInnerHTML: { __html: children }
  });
}
// src/markdown/routes/markdown.tsx
import { SpriteIcon } from "@ycore/componentry/images";
import { LoadingBar, ThemeSwitch } from "@ycore/componentry/impetus";
import { Link } from "@ycore/componentry/shadcn-ui";
import clsx from "clsx";
import { memo, useCallback, useEffect, useState } from "react";
import { useFetcher, useLocation } from "react-router";

// src/adapters/cloudflare/context.server.ts
import { unstable_createContext } from "react-router";
var CloudflareContext = unstable_createContext();

// src/markdown/routes/markdown.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var isDocContent = (data) => {
  return typeof data === "object" && data !== null && "content" in data && "frontmatter" in data && "slug" in data;
};
var routesTemplate = {
  docs: (slug) => `/docs#${slug}`,
  docsApi: (slug) => `/docs/${slug}?api`
};
function createMarkdownLoader() {
  return async function markdownLoader({ request, context }) {
    try {
      console.log("markdownLoader: Starting manifest fetch for request URL:", request.url);
      let assets;
      if (context) {
        try {
          const { env } = context.get(CloudflareContext);
          if (env.ASSETS) {
            assets = env.ASSETS;
            console.log("markdownLoader: Using ASSETS binding for internal fetch");
          } else {
            console.log("markdownLoader: ASSETS binding is undefined, using fetch");
          }
        } catch (error) {
          console.log("markdownLoader: Failed to get context:", error);
        }
      } else {
        console.log("markdownLoader: No context provided, using fetch");
      }
      const manifest = await getMarkdownManifest(request, assets);
      console.log("markdownLoader: Successfully loaded manifest with", manifest.length, "documents");
      return manifest;
    } catch (error) {
      console.error("markdownLoader: Failed to load manifest:", error);
      console.error("markdownLoader: Request URL was:", request.url);
      return [];
    }
  };
}
function MarkdownPage({ loaderData, spriteUrl, themeContext }) {
  const docs = loaderData;
  const location = useLocation();
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [error, setError] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const fetcher = useFetcher();
  useEffect(() => setMounted(true), []);
  const handleDocSelect = useCallback((slug) => {
    if (selectedDoc === slug)
      return;
    setSelectedDoc(slug);
    setError(null);
    fetcher.load(routesTemplate.docsApi(slug));
    window.history.replaceState(null, "", routesTemplate.docs(slug));
  }, [fetcher.load, selectedDoc]);
  useEffect(() => {
    const hash = location.hash.slice(1);
    if (hash && docs.find((doc) => doc.slug === hash) && !selectedDoc) {
      setSelectedDoc(hash);
      fetcher.load(routesTemplate.docsApi(hash));
    }
  }, [docs, fetcher.load, selectedDoc, location.hash.slice]);
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.slice(1);
      if (hash && docs.find((doc) => doc.slug === hash)) {
        setSelectedDoc(hash);
        setError(null);
        fetcher.load(routesTemplate.docsApi(hash));
      } else {
        setSelectedDoc(null);
        setError(null);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [docs, fetcher.load]);
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data && !isDocContent(fetcher.data)) {
      setError("Failed to load document");
    }
  }, [fetcher.state, fetcher.data]);
  const currentDoc = isDocContent(fetcher.data) ? fetcher.data : undefined;
  return /* @__PURE__ */ jsx2("div", {
    className: "min-h-screen bg-white transition-colors dark:bg-gray-900",
    children: /* @__PURE__ */ jsxs("div", {
      className: "flex",
      children: [
        /* @__PURE__ */ jsx2("aside", {
          className: `fixed inset-y-0 top-0 left-0 z-20 overflow-y-auto border-gray-200 border-r bg-white transition-transform duration-300 dark:border-gray-800 dark:bg-gray-900 ${sidebarCollapsed ? "-translate-x-full" : "translate-x-0"} w-80`,
          children: /* @__PURE__ */ jsxs("div", {
            className: "p-6",
            children: [
              /* @__PURE__ */ jsxs("div", {
                className: "mb-6 flex items-center justify-between",
                children: [
                  /* @__PURE__ */ jsx2("h2", {
                    className: "font-semibold text-gray-900 text-lg dark:text-white",
                    children: "Documentation"
                  }),
                  /* @__PURE__ */ jsx2("div", {
                    children: /* @__PURE__ */ jsx2("button", {
                      type: "button",
                      onClick: () => setSidebarCollapsed(!sidebarCollapsed),
                      className: "rounded-md p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
                      children: /* @__PURE__ */ jsx2(SpriteIcon, {
                        url: spriteUrl,
                        id: "ChevronLeft",
                        className: "h-5 w-5"
                      })
                    })
                  })
                ]
              }),
              /* @__PURE__ */ jsx2("nav", {
                className: "space-y-1",
                "aria-label": "Documentation navigation",
                children: docs.length === 0 ? /* @__PURE__ */ jsx2(DocListEmpty, {}) : /* @__PURE__ */ jsx2(DocList, {
                  docs,
                  selectedDoc,
                  onDocSelect: handleDocSelect,
                  spriteUrl
                })
              }),
              /* @__PURE__ */ jsxs("div", {
                className: "fixed right-4 bottom-4 z-10 flex items-center justify-between gap-x-4",
                children: [
                  /* @__PURE__ */ jsx2(Link, {
                    href: "/",
                    children: /* @__PURE__ */ jsx2(SpriteIcon, {
                      url: spriteUrl,
                      id: "House",
                      className: "size-5 text-accent-foreground",
                      viewBox: "0 0 24 24"
                    })
                  }),
                  !mounted ? /* @__PURE__ */ jsx2("div", {
                    className: "size-5"
                  }) : /* @__PURE__ */ jsx2(ThemeSwitch, {
                    spriteUrl,
                    children: themeContext ? ({ theme }) => /* @__PURE__ */ jsx2("button", {
                      type: "button",
                      className: "size-5 hover:animate-rotate",
                      "aria-label": "theme switch",
                      onClick: () => {
                        themeContext.setTheme(themeContext.resolvedTheme === theme.theme.dark ? theme.theme.light : theme.theme.dark);
                      },
                      children: themeContext.resolvedTheme === theme.theme.dark ? /* @__PURE__ */ jsx2(SpriteIcon, {
                        url: spriteUrl,
                        id: "Moon",
                        className: "size-5"
                      }) : /* @__PURE__ */ jsx2(SpriteIcon, {
                        url: spriteUrl,
                        id: "Sun",
                        className: "size-5"
                      })
                    }) : undefined
                  })
                ]
              })
            ]
          })
        }),
        /* @__PURE__ */ jsx2("button", {
          type: "button",
          onClick: () => setSidebarCollapsed(false),
          className: `fixed top-4 left-4 z-30 rounded-md border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-opacity duration-300 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:text-gray-200 ${sidebarCollapsed ? "opacity-100" : "pointer-events-none opacity-0"}`,
          children: /* @__PURE__ */ jsx2(SpriteIcon, {
            url: spriteUrl,
            id: "EllipsisVertical",
            className: "h-5 w-5"
          })
        }),
        /* @__PURE__ */ jsx2("main", {
          className: `flex-1 transition-all duration-300 ${sidebarCollapsed ? "pl-0" : "pl-64"} min-w-0`,
          children: /* @__PURE__ */ jsx2("div", {
            className: "mx-auto min-w-0 max-w-4xl px-4 md:px-8",
            children: !selectedDoc ? /* @__PURE__ */ jsx2("div", {
              className: "flex h-96 items-center justify-center",
              children: /* @__PURE__ */ jsxs("div", {
                className: "text-center",
                children: [
                  /* @__PURE__ */ jsx2("div", {
                    className: "mb-4 text-gray-400 dark:text-gray-500",
                    children: /* @__PURE__ */ jsx2(SpriteIcon, {
                      url: spriteUrl,
                      id: "CircleAlert",
                      className: "h-8 w-8"
                    })
                  }),
                  /* @__PURE__ */ jsx2("h3", {
                    className: "mb-2 font-medium text-gray-900 text-lg dark:text-white",
                    children: "Select a document"
                  }),
                  /* @__PURE__ */ jsx2("p", {
                    className: "text-gray-500 dark:text-gray-400",
                    children: "Choose a document from the sidebar to view its content."
                  })
                ]
              })
            }) : fetcher.state === "loading" ? /* @__PURE__ */ jsx2(LoadingBar, {}) : error ? /* @__PURE__ */ jsx2(DocumentNotFound, {
              spriteUrl
            }) : currentDoc ? /* @__PURE__ */ jsxs("article", {
              className: "markdown-content min-w-0 py-8 md:py-12",
              children: [
                /* @__PURE__ */ jsx2(DocumentHeader, {
                  frontmatter: currentDoc.frontmatter
                }),
                /* @__PURE__ */ jsx2(Markdown, {
                  className: "min-w-0 max-w-none",
                  children: currentDoc.content
                })
              ]
            }) : /* @__PURE__ */ jsx2(DocumentNotFound, {
              spriteUrl
            })
          })
        })
      ]
    })
  });
}
var DocListEmpty = () => {
  return /* @__PURE__ */ jsx2("p", {
    className: "text-gray-500 text-sm dark:text-gray-400",
    children: "No documentation found."
  });
};
var DocumentNotFound = memo(({ spriteUrl }) => /* @__PURE__ */ jsx2("div", {
  className: "flex h-96 items-center justify-center",
  children: /* @__PURE__ */ jsxs("div", {
    className: "text-center",
    children: [
      /* @__PURE__ */ jsx2("div", {
        className: "mb-4 text-red-400 dark:text-red-500",
        children: /* @__PURE__ */ jsx2(SpriteIcon, {
          url: spriteUrl,
          id: "CircleAlert",
          className: "mx-auto h-8 w-8"
        })
      }),
      /* @__PURE__ */ jsx2("h3", {
        className: "mb-2 font-medium text-gray-900 text-lg dark:text-white",
        children: "Document not found"
      }),
      /* @__PURE__ */ jsx2("p", {
        className: "text-gray-500 dark:text-gray-400",
        children: "The selected document could not be loaded."
      })
    ]
  })
}));
var DocumentHeader = memo(({ frontmatter }) => /* @__PURE__ */ jsxs("header", {
  className: "mb-8",
  children: [
    frontmatter.title && /* @__PURE__ */ jsx2("h1", {
      className: "mb-4 font-bold font-serif text-3xl text-gray-900 dark:text-white",
      children: frontmatter.title
    }),
    frontmatter.description && /* @__PURE__ */ jsx2("p", {
      className: "mb-4 font-serif text-gray-600 text-lg dark:text-gray-300",
      children: frontmatter.description
    }),
    (frontmatter.formattedDate || frontmatter.version) && /* @__PURE__ */ jsxs("div", {
      className: "flex items-center justify-between text-gray-500 text-sm dark:text-gray-400",
      children: [
        frontmatter.formattedDate && /* @__PURE__ */ jsx2("time", {
          className: "font-sans",
          dateTime: frontmatter.date,
          children: frontmatter.formattedDate
        }),
        frontmatter.version && /* @__PURE__ */ jsx2("span", {
          className: "px-2 py-1 font-mono text-gray-300 text-xs italic dark:text-gray-600",
          children: frontmatter.version
        })
      ]
    })
  ]
}));
var DocList = memo(({ docs, selectedDoc, onDocSelect, spriteUrl }) => {
  const groupedDocs = useCallback(() => {
    const groups2 = {};
    for (const doc of docs) {
      const folder = doc.folder || "";
      if (!groups2[folder]) {
        groups2[folder] = [];
      }
      groups2[folder].push(doc);
    }
    return groups2;
  }, [docs]);
  const groups = groupedDocs();
  return /* @__PURE__ */ jsx2("div", {
    className: "space-y-1",
    children: Object.entries(groups).map(([folder, folderDocs]) => {
      const isRootLevel = folder === "";
      const folderId = `folder-${folder.replace(/[^a-zA-Z0-9]/g, "-")}`;
      return /* @__PURE__ */ jsxs("div", {
        children: [
          !isRootLevel && /* @__PURE__ */ jsxs("div", {
            className: "relative",
            children: [
              /* @__PURE__ */ jsx2("input", {
                type: "checkbox",
                id: folderId,
                className: "peer hidden",
                defaultChecked: true
              }),
              /* @__PURE__ */ jsxs("label", {
                htmlFor: folderId,
                className: "flex w-full cursor-pointer items-center px-3 py-2 text-left text-gray-600 text-sm transition-colors hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/50",
                children: [
                  /* @__PURE__ */ jsx2(SpriteIcon, {
                    url: spriteUrl,
                    id: "ChevronRight",
                    className: "mr-2 h-3 w-3 transition-transform duration-200 peer-checked:rotate-90"
                  }),
                  /* @__PURE__ */ jsx2("span", {
                    className: "font-medium capitalize",
                    children: folder
                  })
                ]
              }),
              /* @__PURE__ */ jsx2("div", {
                className: "ml-6 max-h-0 space-y-0.5 overflow-hidden transition-all duration-300 peer-checked:max-h-96",
                children: folderDocs.map((doc) => /* @__PURE__ */ jsx2("button", {
                  type: "button",
                  onClick: () => onDocSelect(doc.slug),
                  className: clsx("w-full px-3 py-2 text-left text-sm transition-colors focus:outline-none", selectedDoc === doc.slug ? "border-blue-500 border-r-2 bg-blue-50 text-blue-900 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-100" : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/50"),
                  children: /* @__PURE__ */ jsx2("div", {
                    className: "flex items-center",
                    children: /* @__PURE__ */ jsx2("div", {
                      className: "flex-1",
                      children: /* @__PURE__ */ jsx2("div", {
                        className: "font-medium",
                        children: doc.title || doc.slug
                      })
                    })
                  })
                }, doc.slug))
              })
            ]
          }),
          isRootLevel && /* @__PURE__ */ jsx2("div", {
            className: "space-y-0.5",
            children: folderDocs.map((doc) => /* @__PURE__ */ jsx2("button", {
              type: "button",
              onClick: () => onDocSelect(doc.slug),
              className: clsx("w-full px-3 py-2 text-left text-sm transition-colors focus:outline-none", selectedDoc === doc.slug ? "border-blue-500 border-r-2 bg-blue-50 text-blue-900 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-100" : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/50"),
              children: /* @__PURE__ */ jsx2("div", {
                className: "font-medium",
                children: doc.title || doc.slug
              })
            }, doc.slug))
          })
        ]
      }, folder || "root");
    })
  });
});
// src/markdown/routes/markdown.$slug.tsx
import { redirect } from "react-router";
function createMarkdownSlugLoader() {
  return async function markdownSlugLoader({ params, request, context }) {
    const slug = params["*"];
    if (!slug || typeof slug !== "string" || slug.trim() === "") {
      throw new Response("Invalid document slug", { status: 400 });
    }
    const sanitizedSlug = slug.replace(/[^a-zA-Z0-9-_/]/g, "");
    if (sanitizedSlug !== slug) {
      throw new Response("Invalid document slug format", { status: 400 });
    }
    if (sanitizedSlug.includes("..") || sanitizedSlug.startsWith("/") || sanitizedSlug.endsWith("/")) {
      throw new Response("Invalid document slug format", { status: 400 });
    }
    let assets;
    if (context) {
      try {
        const { env } = context.get(CloudflareContext);
        if (env.ASSETS) {
          assets = env.ASSETS;
        }
      } catch {}
    }
    const url = new URL(request.url);
    const isApiCall = url.searchParams.has("api") || request.headers.get("Accept")?.includes("application/json");
    const doc = await getMarkdownDocument(sanitizedSlug, request, assets);
    if (!doc) {
      throw new Response("Document not found", { status: 404 });
    }
    if (isApiCall) {
      const enhancedFrontmatter = {
        ...doc.frontmatter,
        formattedDate: doc.frontmatter.date ? new Date(doc.frontmatter.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : undefined
      };
      return Response.json({ content: doc.content, frontmatter: enhancedFrontmatter, slug: sanitizedSlug });
    }
    return redirect(routesTemplate.docs(sanitizedSlug));
  };
}
export {
  serveCompressedContent,
  routesTemplate,
  hasMarkdownDocument,
  getMarkdownManifest,
  getMarkdownDocument,
  getMarkdownContent,
  getCompressionHeaders,
  getCompressedFilePath,
  getAssetUrl,
  getAssetPath,
  createMarkdownSlugLoader,
  createMarkdownLoader,
  clearMarkdownCache,
  MarkdownPage,
  Markdown,
  MARKDOWN_CONFIG,
  HIGHLIGHTER_CONFIG,
  DOMPURIFY_CONFIG,
  ASSET_PREFIX
};

//# debugId=F530811C7CEB018064756E2164756E21

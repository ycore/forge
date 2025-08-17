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

// src/markdown/utils.ts
function getAssetUrl(filename, request) {
  const fetchPrefix = ASSET_PREFIX.fetch.endsWith("/") ? ASSET_PREFIX.fetch.slice(0, -1) : ASSET_PREFIX.fetch;
  const url = `${fetchPrefix}/${filename}`;
  return request ? new URL(url, request.url).href : url;
}
function getCompressedFilePath(basePath, compression) {
  if (!compression)
    return basePath;
  const ext = compression === "brotli" ? ".br" : ".gz";
  return `${basePath}${ext}`;
}

// src/markdown/markdown-compression.ts
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
  const fetchFn = (input, init) => assets.fetch(input, init);
  const baseUrl = url.endsWith(".gz") ? url.replace(".gz", "") : url;
  const gzUrl = baseUrl + ".gz";
  try {
    console.log("fetchContent: Attempting compressed fetch:", gzUrl);
    const gzResponse = await fetchFn(gzUrl);
    if (gzResponse.ok) {
      console.log("fetchContent: Compressed file found, attempting decompression");
      const compressedData = await gzResponse.arrayBuffer();
      const decompressedStream = new DecompressionStream("gzip");
      const decompressedResponse = new Response(new ReadableStream({
        start(controller) {
          controller.enqueue(new Uint8Array(compressedData));
          controller.close();
        }
      }).pipeThrough(decompressedStream));
      const decompressedText = await decompressedResponse.text();
      const parsed = JSON.parse(decompressedText);
      console.log("fetchContent: Successfully decompressed and parsed JSON");
      return parsed;
    }
    console.log(`fetchContent: Compressed file not found (${gzResponse.status}), trying uncompressed`);
  } catch (compressionError) {
    console.warn("fetchContent: Compression attempt failed:", compressionError);
  }
  try {
    console.log("fetchContent: Attempting uncompressed fetch:", baseUrl);
    const response = await fetchFn(baseUrl);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const parsed = await response.json();
    console.log("fetchContent: Successfully fetched and parsed uncompressed file");
    return parsed;
  } catch (uncompressedError) {
    const errorMsg = `Failed to fetch both compressed (${gzUrl}) and uncompressed (${baseUrl}) versions: ${uncompressedError instanceof Error ? uncompressedError.message : "Unknown error"}`;
    console.error("fetchContent: Final error:", errorMsg);
    throw new Error(errorMsg);
  }
}
async function getGlobalManifest(assets, request) {
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
async function getMarkdownManifest(assets, request) {
  if (manifestCache) {
    return manifestCache;
  }
  const globalManifest = await getGlobalManifest(assets, request);
  const cleanManifest = globalManifest.documents.map(({ _mtime, _size, ...item }) => item);
  manifestCache = cleanManifest;
  return cleanManifest;
}
async function getMarkdownContent(assets, request) {
  const globalManifest = await getGlobalManifest(assets, request);
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
async function loadFolderContent(folder, assets, request) {
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
async function getMarkdownDocument(slug, assets, request) {
  const globalManifest = await getGlobalManifest(assets, request);
  if (globalManifest._buildMode === "chunked") {
    const manifest = await getMarkdownManifest(assets, request);
    const docMeta = manifest.find((doc) => doc.slug === slug);
    if (!docMeta || !docMeta.folder) {
      return null;
    }
    const folderContent = await loadFolderContent(docMeta.folder, assets, request);
    return folderContent[slug] || null;
  }
  const content = await getMarkdownContent(assets, request);
  return content[slug] || null;
}
function clearMarkdownCache() {
  manifestCache = null;
  globalManifestCache = null;
  contentCache = null;
  folderContentCache.clear();
}
async function hasMarkdownDocument(slug, assets, request) {
  const globalManifest = await getGlobalManifest(assets, request);
  if (globalManifest._buildMode === "chunked") {
    const manifest = await getMarkdownManifest(assets, request);
    return manifest.some((doc) => doc.slug === slug);
  }
  const content = await getMarkdownContent(assets, request);
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
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var isDocContent = (data) => {
  return typeof data === "object" && data !== null && "content" in data && "frontmatter" in data && "slug" in data;
};
var ROUTES_TEMPLATE = {
  docs: (slug) => `/docs#${slug}`,
  docsApi: (slug) => `/docs/${slug}?api`
};
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
    fetcher.load(ROUTES_TEMPLATE.docsApi(slug));
    window.history.replaceState(null, "", ROUTES_TEMPLATE.docs(slug));
  }, [fetcher.load, selectedDoc]);
  useEffect(() => {
    const hash = location.hash.slice(1);
    if (hash && docs.find((doc) => doc.slug === hash) && !selectedDoc) {
      setSelectedDoc(hash);
      fetcher.load(ROUTES_TEMPLATE.docsApi(hash));
    }
  }, [docs, fetcher.load, selectedDoc, location.hash.slice]);
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.slice(1);
      if (hash && docs.find((doc) => doc.slug === hash)) {
        setSelectedDoc(hash);
        setError(null);
        fetcher.load(ROUTES_TEMPLATE.docsApi(hash));
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
export {
  serveCompressedContent,
  hasMarkdownDocument,
  getMarkdownManifest,
  getMarkdownDocument,
  getMarkdownContent,
  getCompressionHeaders,
  getCompressedFilePath,
  getAssetUrl,
  clearMarkdownCache,
  ROUTES_TEMPLATE,
  MarkdownPage,
  Markdown,
  MARKDOWN_CONFIG,
  HIGHLIGHTER_CONFIG,
  DOMPURIFY_CONFIG,
  ASSET_PREFIX
};

//# debugId=154A7D96C3D3573E64756E2164756E21

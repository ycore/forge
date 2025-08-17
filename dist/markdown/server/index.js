// src/markdown/server/markdown.$slug.server.tsx
import { redirect } from "react-router";

// src/adapters/cloudflare/context.server.ts
import { unstable_createContext } from "react-router";
var CloudflareContext = unstable_createContext({});

// src/markdown/markdown-config.ts
var ASSET_PREFIX = {
  build: "/assets/docs",
  fetch: "/assets/docs"
};

// src/markdown/utils.ts
function getAssetUrl(filename, request) {
  const fetchPrefix = ASSET_PREFIX.fetch.endsWith("/") ? ASSET_PREFIX.fetch.slice(0, -1) : ASSET_PREFIX.fetch;
  const url = `${fetchPrefix}/${filename}`;
  return request ? new URL(url, request.url).href : url;
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

// src/markdown/routes/markdown.tsx
import { SpriteIcon } from "@ycore/componentry/images";
import { LoadingBar, ThemeSwitch } from "@ycore/componentry/impetus";
import { Link } from "@ycore/componentry/shadcn-ui";
import clsx from "clsx";
import { memo, useCallback, useEffect, useState } from "react";
import { useFetcher, useLocation } from "react-router";

// src/markdown/markdown-loader.tsx
import { jsx } from "react/jsx-runtime";

// src/markdown/routes/markdown.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var ROUTES_TEMPLATE = {
  docs: (slug) => `/docs#${slug}`,
  docsApi: (slug) => `/docs/${slug}?api`
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

// src/markdown/server/markdown.$slug.server.tsx
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
    if (!context) {
      throw new Response("Context is required for ASSETS binding", { status: 500 });
    }
    const contextValue = context.get(CloudflareContext);
    console.log("markdownSlugLoader: Context check - contextValue:", !!contextValue, "env:", !!contextValue?.env, "ASSETS:", !!contextValue?.env?.ASSETS);
    if (!contextValue || !contextValue.env) {
      throw new Response("CloudflareContext not properly initialized", { status: 500 });
    }
    const { env } = contextValue;
    if (!env.ASSETS) {
      throw new Response("ASSETS binding not available", { status: 500 });
    }
    const url = new URL(request.url);
    const isApiCall = url.searchParams.has("api") || request.headers.get("Accept")?.includes("application/json");
    const doc = await getMarkdownDocument(sanitizedSlug, env.ASSETS, request);
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
    return redirect(ROUTES_TEMPLATE.docs(sanitizedSlug));
  };
}
// src/markdown/server/markdown.server.ts
function createMarkdownLoader() {
  return async function markdownLoader({ request, context }) {
    try {
      console.log("markdownLoader: Starting manifest fetch for request URL:", request.url);
      if (!context) {
        throw new Error("Context is required for ASSETS binding");
      }
      const contextValue = context.get(CloudflareContext);
      console.log("markdownLoader: Context check - contextValue:", !!contextValue, "env:", !!contextValue?.env, "ASSETS:", !!contextValue?.env?.ASSETS);
      if (!contextValue || !contextValue.env) {
        throw new Error("CloudflareContext not properly initialized");
      }
      const { env } = contextValue;
      if (!env.ASSETS) {
        throw new Error("ASSETS binding not available");
      }
      console.log("markdownLoader: Using ASSETS binding for asset fetching");
      const manifest = await getMarkdownManifest(env.ASSETS, request);
      console.log("markdownLoader: Successfully loaded manifest with", manifest.length, "documents");
      return manifest;
    } catch (error) {
      console.error("markdownLoader: Failed to load manifest:", error);
      console.error("markdownLoader: Request URL was:", request.url);
      return [];
    }
  };
}
export {
  createMarkdownSlugLoader,
  createMarkdownLoader
};

//# debugId=E9E487A70AEF51E964756E2164756E21

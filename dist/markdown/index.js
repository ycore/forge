// src/markdown/components.tsx
import { SpriteIcon } from "@ycore/componentry/images";
import { LoadingBar, ThemeSwitch } from "@ycore/componentry/impetus";
import { Link } from "@ycore/componentry/shadcn-ui";
import clsx from "clsx";
import { memo, useCallback, useEffect, useState } from "react";
import { useFetcher, useLocation } from "react-router";

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
var ASSET_ROUTES = {
  docs: (slug) => `/docs#${slug}`,
  docsApi: (slug) => `/docs/${slug}?api`
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

// src/markdown/components.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function MarkdownRenderer({ children, className = "" }) {
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
var isDocContent = (data) => {
  return typeof data === "object" && data !== null && "content" in data && "frontmatter" in data && "slug" in data;
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
    fetcher.load(ASSET_ROUTES.docsApi(slug));
    window.history.replaceState(null, "", ASSET_ROUTES.docs(slug));
  }, [fetcher.load, selectedDoc]);
  useEffect(() => {
    const hash = location.hash.slice(1);
    if (hash && docs.find((doc) => doc.slug === hash) && !selectedDoc) {
      setSelectedDoc(hash);
      fetcher.load(ASSET_ROUTES.docsApi(hash));
    }
  }, [docs, fetcher.load, selectedDoc, location.hash.slice]);
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.slice(1);
      if (hash && docs.find((doc) => doc.slug === hash)) {
        setSelectedDoc(hash);
        setError(null);
        fetcher.load(ASSET_ROUTES.docsApi(hash));
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
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen bg-white transition-colors dark:bg-gray-900",
    children: /* @__PURE__ */ jsxs("div", {
      className: "flex",
      children: [
        /* @__PURE__ */ jsx("aside", {
          className: `fixed inset-y-0 top-0 left-0 z-20 overflow-y-auto border-gray-200 border-r bg-white transition-transform duration-300 dark:border-gray-800 dark:bg-gray-900 ${sidebarCollapsed ? "-translate-x-full" : "translate-x-0"} w-80`,
          children: /* @__PURE__ */ jsxs("div", {
            className: "p-6",
            children: [
              /* @__PURE__ */ jsxs("div", {
                className: "mb-6 flex items-center justify-between",
                children: [
                  /* @__PURE__ */ jsx("h2", {
                    className: "font-semibold text-gray-900 text-lg dark:text-white",
                    children: "Documentation"
                  }),
                  /* @__PURE__ */ jsx("div", {
                    children: /* @__PURE__ */ jsx("button", {
                      type: "button",
                      onClick: () => setSidebarCollapsed(!sidebarCollapsed),
                      className: "rounded-md p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
                      children: /* @__PURE__ */ jsx(SpriteIcon, {
                        url: spriteUrl,
                        id: "ChevronLeft",
                        className: "h-5 w-5"
                      })
                    })
                  })
                ]
              }),
              /* @__PURE__ */ jsx("nav", {
                className: "space-y-1",
                "aria-label": "Documentation navigation",
                children: docs.length === 0 ? /* @__PURE__ */ jsx(DocListEmpty, {}) : /* @__PURE__ */ jsx(DocList, {
                  docs,
                  selectedDoc,
                  onDocSelect: handleDocSelect,
                  spriteUrl
                })
              }),
              /* @__PURE__ */ jsxs("div", {
                className: "fixed right-4 bottom-4 z-10 flex items-center justify-between gap-x-4",
                children: [
                  /* @__PURE__ */ jsx(Link, {
                    href: "/",
                    children: /* @__PURE__ */ jsx(SpriteIcon, {
                      url: spriteUrl,
                      id: "House",
                      className: "size-5 text-accent-foreground",
                      viewBox: "0 0 24 24"
                    })
                  }),
                  !mounted ? /* @__PURE__ */ jsx("div", {
                    className: "size-5"
                  }) : /* @__PURE__ */ jsx(ThemeSwitch, {
                    spriteUrl,
                    children: themeContext ? ({ theme }) => /* @__PURE__ */ jsx("button", {
                      type: "button",
                      className: "size-5 hover:animate-rotate",
                      "aria-label": "theme switch",
                      onClick: () => {
                        themeContext.setTheme(themeContext.resolvedTheme === theme.theme.dark ? theme.theme.light : theme.theme.dark);
                      },
                      children: themeContext.resolvedTheme === theme.theme.dark ? /* @__PURE__ */ jsx(SpriteIcon, {
                        url: spriteUrl,
                        id: "Moon",
                        className: "size-5"
                      }) : /* @__PURE__ */ jsx(SpriteIcon, {
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
        /* @__PURE__ */ jsx("button", {
          type: "button",
          onClick: () => setSidebarCollapsed(false),
          className: `fixed top-4 left-4 z-30 rounded-md border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-opacity duration-300 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:text-gray-200 ${sidebarCollapsed ? "opacity-100" : "pointer-events-none opacity-0"}`,
          children: /* @__PURE__ */ jsx(SpriteIcon, {
            url: spriteUrl,
            id: "EllipsisVertical",
            className: "h-5 w-5"
          })
        }),
        /* @__PURE__ */ jsx("main", {
          className: `flex-1 transition-all duration-300 ${sidebarCollapsed ? "pl-0" : "pl-64"} min-w-0`,
          children: /* @__PURE__ */ jsx("div", {
            className: "mx-auto min-w-0 max-w-4xl px-4 md:px-8",
            children: !selectedDoc ? /* @__PURE__ */ jsx("div", {
              className: "flex h-96 items-center justify-center",
              children: /* @__PURE__ */ jsxs("div", {
                className: "text-center",
                children: [
                  /* @__PURE__ */ jsx("div", {
                    className: "mb-4 text-gray-400 dark:text-gray-500",
                    children: /* @__PURE__ */ jsx(SpriteIcon, {
                      url: spriteUrl,
                      id: "CircleAlert",
                      className: "h-8 w-8"
                    })
                  }),
                  /* @__PURE__ */ jsx("h3", {
                    className: "mb-2 font-medium text-gray-900 text-lg dark:text-white",
                    children: "Select a document"
                  }),
                  /* @__PURE__ */ jsx("p", {
                    className: "text-gray-500 dark:text-gray-400",
                    children: "Choose a document from the sidebar to view its content."
                  })
                ]
              })
            }) : fetcher.state === "loading" ? /* @__PURE__ */ jsx(LoadingBar, {}) : error ? /* @__PURE__ */ jsx(DocumentNotFound, {
              spriteUrl
            }) : currentDoc ? /* @__PURE__ */ jsxs("article", {
              className: "markdown-content min-w-0 py-8 md:py-12",
              children: [
                /* @__PURE__ */ jsx(DocumentHeader, {
                  frontmatter: currentDoc.frontmatter
                }),
                /* @__PURE__ */ jsx(MarkdownRenderer, {
                  className: "min-w-0 max-w-none",
                  children: currentDoc.content
                })
              ]
            }) : /* @__PURE__ */ jsx(DocumentNotFound, {
              spriteUrl
            })
          })
        })
      ]
    })
  });
}
var DocListEmpty = () => {
  return /* @__PURE__ */ jsx("p", {
    className: "text-gray-500 text-sm dark:text-gray-400",
    children: "No documentation found."
  });
};
var DocumentNotFound = memo(({ spriteUrl }) => /* @__PURE__ */ jsx("div", {
  className: "flex h-96 items-center justify-center",
  children: /* @__PURE__ */ jsxs("div", {
    className: "text-center",
    children: [
      /* @__PURE__ */ jsx("div", {
        className: "mb-4 text-red-400 dark:text-red-500",
        children: /* @__PURE__ */ jsx(SpriteIcon, {
          url: spriteUrl,
          id: "CircleAlert",
          className: "mx-auto h-8 w-8"
        })
      }),
      /* @__PURE__ */ jsx("h3", {
        className: "mb-2 font-medium text-gray-900 text-lg dark:text-white",
        children: "Document not found"
      }),
      /* @__PURE__ */ jsx("p", {
        className: "text-gray-500 dark:text-gray-400",
        children: "The selected document could not be loaded."
      })
    ]
  })
}));
var DocumentHeader = memo(({ frontmatter }) => /* @__PURE__ */ jsxs("header", {
  className: "mb-8",
  children: [
    frontmatter.title && /* @__PURE__ */ jsx("h1", {
      className: "mb-4 font-bold font-serif text-3xl text-gray-900 dark:text-white",
      children: frontmatter.title
    }),
    frontmatter.description && /* @__PURE__ */ jsx("p", {
      className: "mb-4 font-serif text-gray-600 text-lg dark:text-gray-300",
      children: frontmatter.description
    }),
    (frontmatter.formattedDate || frontmatter.version) && /* @__PURE__ */ jsxs("div", {
      className: "flex items-center justify-between text-gray-500 text-sm dark:text-gray-400",
      children: [
        frontmatter.formattedDate && /* @__PURE__ */ jsx("time", {
          className: "font-sans",
          dateTime: frontmatter.date,
          children: frontmatter.formattedDate
        }),
        frontmatter.version && /* @__PURE__ */ jsx("span", {
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
  return /* @__PURE__ */ jsx("div", {
    className: "space-y-1",
    children: Object.entries(groups).map(([folder, folderDocs]) => {
      const isRootLevel = folder === "";
      const folderId = `folder-${folder.replace(/[^a-zA-Z0-9]/g, "-")}`;
      return /* @__PURE__ */ jsxs("div", {
        children: [
          !isRootLevel && /* @__PURE__ */ jsxs("div", {
            className: "relative",
            children: [
              /* @__PURE__ */ jsx("input", {
                type: "checkbox",
                id: folderId,
                className: "peer hidden",
                defaultChecked: true
              }),
              /* @__PURE__ */ jsxs("label", {
                htmlFor: folderId,
                className: "flex w-full cursor-pointer items-center px-3 py-2 text-left text-gray-600 text-sm transition-colors hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/50",
                children: [
                  /* @__PURE__ */ jsx(SpriteIcon, {
                    url: spriteUrl,
                    id: "ChevronRight",
                    className: "mr-2 h-3 w-3 transition-transform duration-200 peer-checked:rotate-90"
                  }),
                  /* @__PURE__ */ jsx("span", {
                    className: "font-medium capitalize",
                    children: folder
                  })
                ]
              }),
              /* @__PURE__ */ jsx("div", {
                className: "ml-6 max-h-0 space-y-0.5 overflow-hidden transition-all duration-300 peer-checked:max-h-96",
                children: folderDocs.map((doc) => /* @__PURE__ */ jsx("button", {
                  type: "button",
                  onClick: () => onDocSelect(doc.slug),
                  className: clsx("w-full px-3 py-2 text-left text-sm transition-colors focus:outline-none", selectedDoc === doc.slug ? "border-blue-500 border-r-2 bg-blue-50 text-blue-900 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-100" : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/50"),
                  children: /* @__PURE__ */ jsx("div", {
                    className: "flex items-center",
                    children: /* @__PURE__ */ jsx("div", {
                      className: "flex-1",
                      children: /* @__PURE__ */ jsx("div", {
                        className: "font-medium",
                        children: doc.title || doc.slug
                      })
                    })
                  })
                }, doc.slug))
              })
            ]
          }),
          isRootLevel && /* @__PURE__ */ jsx("div", {
            className: "space-y-0.5",
            children: folderDocs.map((doc) => /* @__PURE__ */ jsx("button", {
              type: "button",
              onClick: () => onDocSelect(doc.slug),
              className: clsx("w-full px-3 py-2 text-left text-sm transition-colors focus:outline-none", selectedDoc === doc.slug ? "border-blue-500 border-r-2 bg-blue-50 text-blue-900 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-100" : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/50"),
              children: /* @__PURE__ */ jsx("div", {
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
// ../../node_modules/valibot/dist/index.js
var store;
function getGlobalConfig(config2) {
  return {
    lang: config2?.lang ?? store?.lang,
    message: config2?.message,
    abortEarly: config2?.abortEarly ?? store?.abortEarly,
    abortPipeEarly: config2?.abortPipeEarly ?? store?.abortPipeEarly
  };
}
var store2;
function getGlobalMessage(lang) {
  return store2?.get(lang);
}
var store3;
function getSchemaMessage(lang) {
  return store3?.get(lang);
}
var store4;
function getSpecificMessage(reference, lang) {
  return store4?.get(reference)?.get(lang);
}
function _stringify(input) {
  const type = typeof input;
  if (type === "string") {
    return `"${input}"`;
  }
  if (type === "number" || type === "bigint" || type === "boolean") {
    return `${input}`;
  }
  if (type === "object" || type === "function") {
    return (input && Object.getPrototypeOf(input)?.constructor?.name) ?? "null";
  }
  return type;
}
function _addIssue(context, label, dataset, config2, other) {
  const input = other && "input" in other ? other.input : dataset.value;
  const expected = other?.expected ?? context.expects ?? null;
  const received = other?.received ?? _stringify(input);
  const issue = {
    kind: context.kind,
    type: context.type,
    input,
    expected,
    received,
    message: `Invalid ${label}: ${expected ? `Expected ${expected} but r` : "R"}eceived ${received}`,
    requirement: context.requirement,
    path: other?.path,
    issues: other?.issues,
    lang: config2.lang,
    abortEarly: config2.abortEarly,
    abortPipeEarly: config2.abortPipeEarly
  };
  const isSchema = context.kind === "schema";
  const message2 = other?.message ?? context.message ?? getSpecificMessage(context.reference, issue.lang) ?? (isSchema ? getSchemaMessage(issue.lang) : null) ?? config2.message ?? getGlobalMessage(issue.lang);
  if (message2 !== undefined) {
    issue.message = typeof message2 === "function" ? message2(issue) : message2;
  }
  if (isSchema) {
    dataset.typed = false;
  }
  if (dataset.issues) {
    dataset.issues.push(issue);
  } else {
    dataset.issues = [issue];
  }
}
function _getStandardProps(context) {
  return {
    version: 1,
    vendor: "valibot",
    validate(value2) {
      return context["~run"]({ value: value2 }, getGlobalConfig());
    }
  };
}
var ValiError = class extends Error {
  constructor(issues) {
    super(issues[0].message);
    this.name = "ValiError";
    this.issues = issues;
  }
};
function check(requirement, message2) {
  return {
    kind: "validation",
    type: "check",
    reference: check,
    async: false,
    expects: null,
    requirement,
    message: message2,
    "~run"(dataset, config2) {
      if (dataset.typed && !this.requirement(dataset.value)) {
        _addIssue(this, "input", dataset, config2);
      }
      return dataset;
    }
  };
}
function minLength(requirement, message2) {
  return {
    kind: "validation",
    type: "min_length",
    reference: minLength,
    async: false,
    expects: `>=${requirement}`,
    requirement,
    message: message2,
    "~run"(dataset, config2) {
      if (dataset.typed && dataset.value.length < this.requirement) {
        _addIssue(this, "length", dataset, config2, {
          received: `${dataset.value.length}`
        });
      }
      return dataset;
    }
  };
}
function regex(requirement, message2) {
  return {
    kind: "validation",
    type: "regex",
    reference: regex,
    async: false,
    expects: `${requirement}`,
    requirement,
    message: message2,
    "~run"(dataset, config2) {
      if (dataset.typed && !this.requirement.test(dataset.value)) {
        _addIssue(this, "format", dataset, config2);
      }
      return dataset;
    }
  };
}
function trim() {
  return {
    kind: "transformation",
    type: "trim",
    reference: trim,
    async: false,
    "~run"(dataset) {
      dataset.value = dataset.value.trim();
      return dataset;
    }
  };
}
function string(message2) {
  return {
    kind: "schema",
    type: "string",
    reference: string,
    expects: "string",
    async: false,
    message: message2,
    get "~standard"() {
      return _getStandardProps(this);
    },
    "~run"(dataset, config2) {
      if (typeof dataset.value === "string") {
        dataset.typed = true;
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}
function parse(schema, input, config2) {
  const dataset = schema["~run"]({ value: input }, getGlobalConfig(config2));
  if (dataset.issues) {
    throw new ValiError(dataset.issues);
  }
  return dataset.value;
}
function pipe(...pipe2) {
  return {
    ...pipe2[0],
    pipe: pipe2,
    get "~standard"() {
      return _getStandardProps(this);
    },
    "~run"(dataset, config2) {
      for (const item of pipe2) {
        if (item.kind !== "metadata") {
          if (dataset.issues && (item.kind === "schema" || item.kind === "transformation")) {
            dataset.typed = false;
            break;
          }
          if (!dataset.issues || !config2.abortEarly && !config2.abortPipeEarly) {
            dataset = item["~run"](dataset, config2);
          }
        }
      }
      return dataset;
    }
  };
}

// src/markdown/markdown-utils.ts
var documentSlugSchema = pipe(string(), trim(), minLength(1, "Slug cannot be empty"), regex(/^[a-zA-Z0-9-_/]+$/, "Slug can only contain letters, numbers, hyphens, underscores, and forward slashes"), check((slug) => !slug.includes(".."), "Directory traversal not allowed"), check((slug) => !slug.startsWith("/"), "Slug cannot start with forward slash"), check((slug) => !slug.endsWith("/"), "Slug cannot end with forward slash"));
function validateDocumentSlug(slug) {
  try {
    return parse(documentSlugSchema, slug);
  } catch (error) {
    if (error instanceof ValiError) {
      const message = error.issues[0]?.message || "Invalid document url";
      throw new Response(message, { status: 400 });
    }
    throw new Response("Invalid document slug", { status: 400 });
  }
}
function formatAssetUrl(filename, request, prefix) {
  const fetchPrefix = prefix || ASSET_PREFIX.fetch;
  const normalizedPrefix = fetchPrefix.endsWith("/") ? fetchPrefix.slice(0, -1) : fetchPrefix;
  const url = `${normalizedPrefix}/${filename}`;
  return request ? new URL(url, request.url).href : url;
}

// src/markdown/markdown-data.ts
var manifestCache = null;
var globalManifestCache = null;
var contentCache = null;
var folderContentCache = new Map;
async function fetchContent(url, assets) {
  const fetchFn = (input, init) => assets.fetch(input, init);
  const baseUrl = url.endsWith(".gz") ? url.replace(".gz", "") : url;
  const gzUrl = `${baseUrl}.gz`;
  try {
    const gzResponse = await fetchFn(gzUrl);
    if (gzResponse.ok) {
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
      return parsed;
    }
  } catch (_compressionError) {}
  try {
    const response = await fetchFn(baseUrl);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const parsed = await response.json();
    return parsed;
  } catch (uncompressedError) {
    const errorMsg = `Failed to fetch both compressed (${gzUrl}) and uncompressed (${baseUrl}) versions: ${uncompressedError instanceof Error ? uncompressedError.message : "Unknown error"}`;
    throw new Error(errorMsg);
  }
}
async function getGlobalManifest(assets, request, prefix) {
  if (globalManifestCache) {
    return globalManifestCache;
  }
  try {
    const manifestUrl = formatAssetUrl(`${prefix || MARKDOWN_CONFIG.PREFIX}-manifest.json`, request);
    const globalManifest = await fetchContent(manifestUrl, assets);
    globalManifestCache = globalManifest;
    return globalManifest;
  } catch (error) {
    return { documents: [], _buildMode: "single" };
  }
}
async function getMarkdownManifest(assets, request, prefix) {
  if (manifestCache) {
    return manifestCache;
  }
  const globalManifest = await getGlobalManifest(assets, request, prefix);
  const cleanManifest = globalManifest.documents.map(({ _mtime, _size, ...item }) => item);
  manifestCache = cleanManifest;
  return cleanManifest;
}
async function getMarkdownContent(assets, request, prefix) {
  const globalManifest = await getGlobalManifest(assets, request, prefix);
  if (globalManifest._buildMode === "chunked") {
    return {};
  }
  if (contentCache) {
    return contentCache;
  }
  try {
    const contentUrl = formatAssetUrl(`${prefix || MARKDOWN_CONFIG.PREFIX}-content.json`, request);
    const content = await fetchContent(contentUrl, assets);
    contentCache = content;
    return content;
  } catch (_error) {
    return {};
  }
}
async function loadFolderContent(folder, assets, request, prefix) {
  if (folderContentCache.has(folder)) {
    const cachedContent = folderContentCache.get(folder);
    if (cachedContent) {
      return cachedContent;
    }
  }
  try {
    const folderKey = folder.replace(/[/\\]/g, "-");
    const contentUrl = formatAssetUrl(`${prefix || MARKDOWN_CONFIG.PREFIX}-content-${folderKey}.json`, request);
    const content = await fetchContent(contentUrl, assets);
    folderContentCache.set(folder, content);
    return content;
  } catch (error) {
    return {};
  }
}
async function getMarkdownDocument(slug, assets, request, prefix) {
  const globalManifest = await getGlobalManifest(assets, request, prefix);
  if (globalManifest._buildMode === "chunked") {
    const manifest = await getMarkdownManifest(assets, request, prefix);
    const docMeta = manifest.find((doc) => doc.slug === slug);
    if (!docMeta || !docMeta.folder) {
      return null;
    }
    const folderContent = await loadFolderContent(docMeta.folder, assets, request, prefix);
    return folderContent[slug] || null;
  }
  const content = await getMarkdownContent(assets, request, prefix);
  return content[slug] || null;
}
function clearMarkdownCache() {
  manifestCache = null;
  globalManifestCache = null;
  contentCache = null;
  folderContentCache.clear();
}
async function hasMarkdownDocument(slug, assets, request, prefix) {
  const globalManifest = await getGlobalManifest(assets, request, prefix);
  if (globalManifest._buildMode === "chunked") {
    const manifest = await getMarkdownManifest(assets, request, prefix);
    return manifest.some((doc) => doc.slug === slug);
  }
  const content = await getMarkdownContent(assets, request, prefix);
  return slug in content;
}
export {
  validateDocumentSlug,
  hasMarkdownDocument,
  getMarkdownManifest,
  getMarkdownDocument,
  getMarkdownContent,
  formatAssetUrl,
  clearMarkdownCache,
  MarkdownRenderer,
  MarkdownPage,
  MARKDOWN_CONFIG,
  HIGHLIGHTER_CONFIG,
  DOMPURIFY_CONFIG,
  ASSET_ROUTES,
  ASSET_PREFIX
};

//# debugId=A7B29A2FEDA1D27564756E2164756E21

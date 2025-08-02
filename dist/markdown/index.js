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
import { createSpriteIcon } from "@ycore/componentry/images";
import { LoadingBar, THEME_OPTIONS, ThemeSwitch } from "@ycore/componentry/impetus";

// url-asset:@ycore/componentry/shadcn-ui/assets/lucide-sprites.svg
var lucide_sprites_default = "./@ycore/componentry/shadcn-ui/assets/lucide-sprites.svg";

// src/markdown/routes/markdown.tsx
import clsx from "clsx";
import { memo, useCallback, useEffect, useState } from "react";
import { useFetcher, useLocation } from "react-router";

// src/markdown/markdown-data.ts
var manifestCache = null;
var contentCache = null;
async function getMarkdownManifest(request) {
  if (manifestCache) {
    return manifestCache;
  }
  try {
    const manifestUrl = request ? new URL("/markdown-manifest.json", request.url).href : "/markdown-manifest.json";
    const response = await fetch(manifestUrl);
    if (!response.ok) {
      console.warn(`Failed to fetch manifest: ${response.status} ${response.statusText}`);
      return [];
    }
    const manifest = await response.json();
    const cleanManifest = manifest.map(({ _mtime, _size, ...item }) => item);
    manifestCache = cleanManifest;
    return cleanManifest;
  } catch (error) {
    console.warn("Failed to load markdown manifest:", error);
    return [];
  }
}
async function getMarkdownContent(request) {
  if (contentCache) {
    return contentCache;
  }
  try {
    const contentUrl = request ? new URL("/markdown-content.json", request.url).href : "/markdown-content.json";
    const response = await fetch(contentUrl);
    if (!response.ok) {
      console.warn(`Failed to fetch content: ${response.status} ${response.statusText}`);
      return {};
    }
    const content = await response.json();
    contentCache = content;
    return content;
  } catch (error) {
    console.warn("Failed to load markdown content:", error);
    return {};
  }
}
async function getMarkdownDocument(slug, request) {
  const content = await getMarkdownContent(request);
  return content[slug] || null;
}
function clearMarkdownCache() {
  manifestCache = null;
  contentCache = null;
}
async function hasMarkdownDocument(slug, request) {
  const content = await getMarkdownContent(request);
  return slug in content;
}

// src/markdown/routes/markdown.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var SpriteIcon = createSpriteIcon(lucide_sprites_default);
var isDocContent = (data) => {
  return typeof data === "object" && data !== null && "content" in data && "frontmatter" in data && "slug" in data;
};
var routesTemplate = {
  docs: (slug) => `/docs#${slug}`,
  docsApi: (slug) => `/docs/${slug}?api`
};
async function loader({ request }) {
  const manifest = await getMarkdownManifest(request);
  return manifest;
}
function MarkdownPage({ loaderData }) {
  const docs = loaderData;
  const location = useLocation();
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [error, setError] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const fetcher = useFetcher();
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
                  onDocSelect: handleDocSelect
                })
              }),
              /* @__PURE__ */ jsx2("div", {
                className: "fixed right-4 bottom-4 z-10",
                children: /* @__PURE__ */ jsx2(ThemeSwitch, {
                  theme: THEME_OPTIONS,
                  className: "size-3",
                  classTheme: "size-3"
                })
              })
            ]
          })
        }),
        /* @__PURE__ */ jsx2("button", {
          type: "button",
          onClick: () => setSidebarCollapsed(false),
          className: `fixed top-4 left-4 z-30 rounded-md border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-opacity duration-300 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:text-gray-200 ${sidebarCollapsed ? "opacity-100" : "pointer-events-none opacity-0"}`,
          children: /* @__PURE__ */ jsx2(SpriteIcon, {
            id: "EllipsisVertical",
            className: "h-5 w-5"
          })
        }),
        /* @__PURE__ */ jsx2("main", {
          className: `flex-1 transition-all duration-300 ${sidebarCollapsed ? "pl-0" : "pl-64"}`,
          children: /* @__PURE__ */ jsx2("div", {
            className: "mx-auto max-w-4xl",
            children: !selectedDoc ? /* @__PURE__ */ jsx2("div", {
              className: "flex h-96 items-center justify-center",
              children: /* @__PURE__ */ jsxs("div", {
                className: "text-center",
                children: [
                  /* @__PURE__ */ jsx2("div", {
                    className: "mb-4 text-gray-400 dark:text-gray-500",
                    children: /* @__PURE__ */ jsx2(SpriteIcon, {
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
            }) : fetcher.state === "loading" ? /* @__PURE__ */ jsx2(LoadingBar, {}) : error ? /* @__PURE__ */ jsx2(DocumentNotFound, {}) : currentDoc ? /* @__PURE__ */ jsxs("article", {
              className: "markdown-content px-8 py-12",
              children: [
                /* @__PURE__ */ jsx2(DocumentHeader, {
                  frontmatter: currentDoc.frontmatter
                }),
                /* @__PURE__ */ jsx2(Markdown, {
                  className: "max-w-none",
                  children: currentDoc.content
                })
              ]
            }) : /* @__PURE__ */ jsx2(DocumentNotFound, {})
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
var DocumentNotFound = memo(() => /* @__PURE__ */ jsx2("div", {
  className: "flex h-96 items-center justify-center",
  children: /* @__PURE__ */ jsxs("div", {
    className: "text-center",
    children: [
      /* @__PURE__ */ jsx2("div", {
        className: "mb-4 text-red-400 dark:text-red-500",
        children: /* @__PURE__ */ jsx2(SpriteIcon, {
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
var DocList = memo(({ docs, selectedDoc, onDocSelect }) => {
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
async function loader2({ params, request }) {
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
  const url = new URL(request.url);
  const isApiCall = url.searchParams.has("api") || request.headers.get("Accept")?.includes("application/json");
  const doc = await getMarkdownDocument(sanitizedSlug, request);
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
}
export {
  routesTemplate,
  loader2 as markdownSlugLoader,
  loader as markdownLoader,
  hasMarkdownDocument,
  getMarkdownManifest,
  getMarkdownDocument,
  getMarkdownContent,
  clearMarkdownCache,
  MarkdownPage,
  Markdown
};

//# debugId=9E37CE23228A64A364756E2164756E21

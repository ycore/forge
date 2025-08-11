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
// ../componentry/dist/images/index.js
import clsx2 from "clsx";
import React from "react";
import { Await } from "react-router";
import clsx from "clsx";
import { jsx as jsx2 } from "react/jsx-runtime";
import { jsx as jsx22 } from "react/jsx-runtime";
import { jsx as jsx3 } from "react/jsx-runtime";
function SpriteIcon({ url, id, ...props }) {
  return /* @__PURE__ */ jsx2("svg", {
    ...props,
    children: id ? /* @__PURE__ */ jsx2("use", {
      href: `${url}#${id}`
    }) : /* @__PURE__ */ jsx2("use", {
      href: `${url}`
    })
  });
}

// ../../node_modules/next-themes/dist/index.mjs
import * as t from "react";
"use client";
var M = (e, i, s, u, m, a, l, h) => {
  let d = document.documentElement, w = ["light", "dark"];
  function p(n) {
    (Array.isArray(e) ? e : [e]).forEach((y) => {
      let k = y === "class", S = k && a ? m.map((f) => a[f] || f) : m;
      k ? (d.classList.remove(...S), d.classList.add(a && a[n] ? a[n] : n)) : d.setAttribute(y, n);
    }), R(n);
  }
  function R(n) {
    h && w.includes(n) && (d.style.colorScheme = n);
  }
  function c() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  if (u)
    p(u);
  else
    try {
      let n = localStorage.getItem(i) || s, y = l && n === "system" ? c() : n;
      p(y);
    } catch (n) {}
};
var x = t.createContext(undefined);
var U = { setTheme: (e) => {}, themes: [] };
var z = () => {
  var e;
  return (e = t.useContext(x)) != null ? e : U;
};
var _ = t.memo(({ forcedTheme: e, storageKey: i, attribute: s, enableSystem: u, enableColorScheme: m, defaultTheme: a, value: l, themes: h, nonce: d, scriptProps: w }) => {
  let p = JSON.stringify([s, i, a, e, h, l, u, m]).slice(1, -1);
  return t.createElement("script", { ...w, suppressHydrationWarning: true, nonce: typeof window == "undefined" ? d : "", dangerouslySetInnerHTML: { __html: `(${M.toString()})(${p})` } });
});

// ../componentry/dist/impetus/index.js
import clsx5 from "clsx";
import { memo as memo2 } from "react";
import { jsx as jsx4 } from "react/jsx-runtime";
import clsx52 from "clsx";
import { createContext as createContext2, useState as useState2 } from "react";
import { useLocation } from "react-router";
import { jsx as jsx23 } from "react/jsx-runtime";

// ../../node_modules/class-variance-authority/dist/index.mjs
import { clsx as clsx3 } from "clsx";
var falsyToString = (value) => typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
var cx = clsx3;
var cva = (base, config) => (props) => {
  var _config_compoundVariants;
  if ((config === null || config === undefined ? undefined : config.variants) == null)
    return cx(base, props === null || props === undefined ? undefined : props.class, props === null || props === undefined ? undefined : props.className);
  const { variants, defaultVariants } = config;
  const getVariantClassNames = Object.keys(variants).map((variant) => {
    const variantProp = props === null || props === undefined ? undefined : props[variant];
    const defaultVariantProp = defaultVariants === null || defaultVariants === undefined ? undefined : defaultVariants[variant];
    if (variantProp === null)
      return null;
    const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
    return variants[variant][variantKey];
  });
  const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param) => {
    let [key, value] = param;
    if (value === undefined) {
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});
  const getCompoundVariantClassNames = config === null || config === undefined ? undefined : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === undefined ? undefined : _config_compoundVariants.reduce((acc, param) => {
    let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
    return Object.entries(compoundVariantOptions).every((param2) => {
      let [key, value] = param2;
      return Array.isArray(value) ? value.includes({
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key]) : {
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key] === value;
    }) ? [
      ...acc,
      cvClass,
      cvClassName
    ] : acc;
  }, []);
  return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === undefined ? undefined : props.class, props === null || props === undefined ? undefined : props.className);
};

// ../componentry/dist/impetus/index.js
import clsx22 from "clsx";
import { jsx as jsx32 } from "react/jsx-runtime";
import clsx32 from "clsx";
import { jsx as jsx42, jsxs } from "react/jsx-runtime";
import clsx4 from "clsx";
import { jsx as jsx5, jsxs as jsxs2 } from "react/jsx-runtime";
import React2 from "react";
import { Link as RouterLink } from "react-router";
import { jsx as jsx6 } from "react/jsx-runtime";
import { jsx as jsx7, jsxs as jsxs3, Fragment as Fragment2 } from "react/jsx-runtime";
import clsx6 from "clsx";
import { jsx as jsx8 } from "react/jsx-runtime";
import clsx7 from "clsx";
import { useEffect as useEffect2, useState as useState22 } from "react";
import { jsx as jsx9 } from "react/jsx-runtime";
var LoadingBar = memo2(({ className }) => /* @__PURE__ */ jsx4("div", {
  className: clsx5("loading-bar", className)
}));
function SpriteIcon2({ url, id, ...props }) {
  return /* @__PURE__ */ jsx23("svg", {
    ...props,
    children: id ? /* @__PURE__ */ jsx23("use", {
      href: `${url}#${id}`
    }) : /* @__PURE__ */ jsx23("use", {
      href: `${url}`
    })
  });
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
      destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
      outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
      secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
      link: "text-primary underline-offset-4 hover:underline"
    },
    size: {
      default: "h-9 px-4 py-2 has-[>svg]:px-3",
      sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
      lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
      icon: "size-9"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});
var Link = React2.forwardRef(function Link2(props, ref) {
  return /* @__PURE__ */ jsx6(RouterLink, {
    ...props,
    to: props.href,
    ref
  });
});
var MenubarContext = createContext2(null);
var THEME_OPTIONS = { theme: { light: "light", dark: "dark" } };
var ThemeSwitch = ({ theme = THEME_OPTIONS, spriteUrl, className, classTheme }) => {
  const [mounted, setMounted] = useState22(false);
  const { resolvedTheme, setTheme } = z();
  useEffect2(() => setMounted(true), []);
  if (!mounted)
    return null;
  return /* @__PURE__ */ jsx9("button", {
    type: "button",
    className: clsx7("size-5 hover:animate-rotate", classTheme),
    onClick: (e) => {
      setTheme(resolvedTheme === theme.theme.dark ? theme.theme.light : theme.theme.dark);
      e.preventDefault();
      e.stopPropagation();
    },
    "aria-label": "theme switch",
    children: resolvedTheme === theme.theme.dark ? /* @__PURE__ */ jsx9(SpriteIcon2, {
      url: spriteUrl,
      id: "Moon",
      className: clsx7("size-5", className)
    }) : /* @__PURE__ */ jsx9(SpriteIcon2, {
      url: spriteUrl,
      id: "Sun",
      className: clsx7("size-5", className)
    })
  });
};

// src/markdown/routes/markdown.tsx
import clsx8 from "clsx";
import { memo as memo3, useCallback as useCallback2, useEffect as useEffect3, useState as useState3 } from "react";
import { useFetcher, useLocation as useLocation2 } from "react-router";
import { jsx as jsx10, jsxs as jsxs4 } from "react/jsx-runtime";
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
function MarkdownPage({ loaderData, spriteUrl }) {
  const docs = loaderData;
  const location = useLocation2();
  const [selectedDoc, setSelectedDoc] = useState3(null);
  const [error, setError] = useState3(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState3(false);
  const fetcher = useFetcher();
  const handleDocSelect = useCallback2((slug) => {
    if (selectedDoc === slug)
      return;
    setSelectedDoc(slug);
    setError(null);
    fetcher.load(routesTemplate.docsApi(slug));
    window.history.replaceState(null, "", routesTemplate.docs(slug));
  }, [fetcher.load, selectedDoc]);
  useEffect3(() => {
    const hash = location.hash.slice(1);
    if (hash && docs.find((doc) => doc.slug === hash) && !selectedDoc) {
      setSelectedDoc(hash);
      fetcher.load(routesTemplate.docsApi(hash));
    }
  }, [docs, fetcher.load, selectedDoc, location.hash.slice]);
  useEffect3(() => {
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
  useEffect3(() => {
    if (fetcher.state === "idle" && fetcher.data && !isDocContent(fetcher.data)) {
      setError("Failed to load document");
    }
  }, [fetcher.state, fetcher.data]);
  const currentDoc = isDocContent(fetcher.data) ? fetcher.data : undefined;
  return /* @__PURE__ */ jsx10("div", {
    className: "min-h-screen bg-white transition-colors dark:bg-gray-900",
    children: /* @__PURE__ */ jsxs4("div", {
      className: "flex",
      children: [
        /* @__PURE__ */ jsx10("aside", {
          className: `fixed inset-y-0 top-0 left-0 z-20 overflow-y-auto border-gray-200 border-r bg-white transition-transform duration-300 dark:border-gray-800 dark:bg-gray-900 ${sidebarCollapsed ? "-translate-x-full" : "translate-x-0"} w-80`,
          children: /* @__PURE__ */ jsxs4("div", {
            className: "p-6",
            children: [
              /* @__PURE__ */ jsxs4("div", {
                className: "mb-6 flex items-center justify-between",
                children: [
                  /* @__PURE__ */ jsx10("h2", {
                    className: "font-semibold text-gray-900 text-lg dark:text-white",
                    children: "Documentation"
                  }),
                  /* @__PURE__ */ jsx10("div", {
                    children: /* @__PURE__ */ jsx10("button", {
                      type: "button",
                      onClick: () => setSidebarCollapsed(!sidebarCollapsed),
                      className: "rounded-md p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
                      children: /* @__PURE__ */ jsx10(SpriteIcon, {
                        url: spriteUrl,
                        id: "ChevronLeft",
                        className: "h-5 w-5"
                      })
                    })
                  })
                ]
              }),
              /* @__PURE__ */ jsx10("nav", {
                className: "space-y-1",
                "aria-label": "Documentation navigation",
                children: docs.length === 0 ? /* @__PURE__ */ jsx10(DocListEmpty, {}) : /* @__PURE__ */ jsx10(DocList, {
                  docs,
                  selectedDoc,
                  onDocSelect: handleDocSelect,
                  spriteUrl
                })
              }),
              /* @__PURE__ */ jsx10("div", {
                className: "fixed right-4 bottom-4 z-10",
                children: /* @__PURE__ */ jsx10(ThemeSwitch, {
                  theme: THEME_OPTIONS,
                  spriteUrl,
                  className: "size-3",
                  classTheme: "size-3"
                })
              })
            ]
          })
        }),
        /* @__PURE__ */ jsx10("button", {
          type: "button",
          onClick: () => setSidebarCollapsed(false),
          className: `fixed top-4 left-4 z-30 rounded-md border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-opacity duration-300 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:text-gray-200 ${sidebarCollapsed ? "opacity-100" : "pointer-events-none opacity-0"}`,
          children: /* @__PURE__ */ jsx10(SpriteIcon, {
            url: spriteUrl,
            id: "EllipsisVertical",
            className: "h-5 w-5"
          })
        }),
        /* @__PURE__ */ jsx10("main", {
          className: `flex-1 transition-all duration-300 ${sidebarCollapsed ? "pl-0" : "pl-64"}`,
          children: /* @__PURE__ */ jsx10("div", {
            className: "mx-auto max-w-4xl",
            children: !selectedDoc ? /* @__PURE__ */ jsx10("div", {
              className: "flex h-96 items-center justify-center",
              children: /* @__PURE__ */ jsxs4("div", {
                className: "text-center",
                children: [
                  /* @__PURE__ */ jsx10("div", {
                    className: "mb-4 text-gray-400 dark:text-gray-500",
                    children: /* @__PURE__ */ jsx10(SpriteIcon, {
                      url: spriteUrl,
                      id: "CircleAlert",
                      className: "h-8 w-8"
                    })
                  }),
                  /* @__PURE__ */ jsx10("h3", {
                    className: "mb-2 font-medium text-gray-900 text-lg dark:text-white",
                    children: "Select a document"
                  }),
                  /* @__PURE__ */ jsx10("p", {
                    className: "text-gray-500 dark:text-gray-400",
                    children: "Choose a document from the sidebar to view its content."
                  })
                ]
              })
            }) : fetcher.state === "loading" ? /* @__PURE__ */ jsx10(LoadingBar, {}) : error ? /* @__PURE__ */ jsx10(DocumentNotFound, {
              spriteUrl
            }) : currentDoc ? /* @__PURE__ */ jsxs4("article", {
              className: "markdown-content px-8 py-12",
              children: [
                /* @__PURE__ */ jsx10(DocumentHeader, {
                  frontmatter: currentDoc.frontmatter
                }),
                /* @__PURE__ */ jsx10(Markdown, {
                  className: "max-w-none",
                  children: currentDoc.content
                })
              ]
            }) : /* @__PURE__ */ jsx10(DocumentNotFound, {
              spriteUrl
            })
          })
        })
      ]
    })
  });
}
var DocListEmpty = () => {
  return /* @__PURE__ */ jsx10("p", {
    className: "text-gray-500 text-sm dark:text-gray-400",
    children: "No documentation found."
  });
};
var DocumentNotFound = memo3(({ spriteUrl }) => /* @__PURE__ */ jsx10("div", {
  className: "flex h-96 items-center justify-center",
  children: /* @__PURE__ */ jsxs4("div", {
    className: "text-center",
    children: [
      /* @__PURE__ */ jsx10("div", {
        className: "mb-4 text-red-400 dark:text-red-500",
        children: /* @__PURE__ */ jsx10(SpriteIcon, {
          url: spriteUrl,
          id: "CircleAlert",
          className: "mx-auto h-8 w-8"
        })
      }),
      /* @__PURE__ */ jsx10("h3", {
        className: "mb-2 font-medium text-gray-900 text-lg dark:text-white",
        children: "Document not found"
      }),
      /* @__PURE__ */ jsx10("p", {
        className: "text-gray-500 dark:text-gray-400",
        children: "The selected document could not be loaded."
      })
    ]
  })
}));
var DocumentHeader = memo3(({ frontmatter }) => /* @__PURE__ */ jsxs4("header", {
  className: "mb-8",
  children: [
    frontmatter.title && /* @__PURE__ */ jsx10("h1", {
      className: "mb-4 font-bold font-serif text-3xl text-gray-900 dark:text-white",
      children: frontmatter.title
    }),
    frontmatter.description && /* @__PURE__ */ jsx10("p", {
      className: "mb-4 font-serif text-gray-600 text-lg dark:text-gray-300",
      children: frontmatter.description
    }),
    (frontmatter.formattedDate || frontmatter.version) && /* @__PURE__ */ jsxs4("div", {
      className: "flex items-center justify-between text-gray-500 text-sm dark:text-gray-400",
      children: [
        frontmatter.formattedDate && /* @__PURE__ */ jsx10("time", {
          className: "font-sans",
          dateTime: frontmatter.date,
          children: frontmatter.formattedDate
        }),
        frontmatter.version && /* @__PURE__ */ jsx10("span", {
          className: "px-2 py-1 font-mono text-gray-300 text-xs italic dark:text-gray-600",
          children: frontmatter.version
        })
      ]
    })
  ]
}));
var DocList = memo3(({ docs, selectedDoc, onDocSelect, spriteUrl }) => {
  const groupedDocs = useCallback2(() => {
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
  return /* @__PURE__ */ jsx10("div", {
    className: "space-y-1",
    children: Object.entries(groups).map(([folder, folderDocs]) => {
      const isRootLevel = folder === "";
      const folderId = `folder-${folder.replace(/[^a-zA-Z0-9]/g, "-")}`;
      return /* @__PURE__ */ jsxs4("div", {
        children: [
          !isRootLevel && /* @__PURE__ */ jsxs4("div", {
            className: "relative",
            children: [
              /* @__PURE__ */ jsx10("input", {
                type: "checkbox",
                id: folderId,
                className: "peer hidden",
                defaultChecked: true
              }),
              /* @__PURE__ */ jsxs4("label", {
                htmlFor: folderId,
                className: "flex w-full cursor-pointer items-center px-3 py-2 text-left text-gray-600 text-sm transition-colors hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/50",
                children: [
                  /* @__PURE__ */ jsx10(SpriteIcon, {
                    url: spriteUrl,
                    id: "ChevronRight",
                    className: "mr-2 h-3 w-3 transition-transform duration-200 peer-checked:rotate-90"
                  }),
                  /* @__PURE__ */ jsx10("span", {
                    className: "font-medium capitalize",
                    children: folder
                  })
                ]
              }),
              /* @__PURE__ */ jsx10("div", {
                className: "ml-6 max-h-0 space-y-0.5 overflow-hidden transition-all duration-300 peer-checked:max-h-96",
                children: folderDocs.map((doc) => /* @__PURE__ */ jsx10("button", {
                  type: "button",
                  onClick: () => onDocSelect(doc.slug),
                  className: clsx8("w-full px-3 py-2 text-left text-sm transition-colors focus:outline-none", selectedDoc === doc.slug ? "border-blue-500 border-r-2 bg-blue-50 text-blue-900 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-100" : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/50"),
                  children: /* @__PURE__ */ jsx10("div", {
                    className: "flex items-center",
                    children: /* @__PURE__ */ jsx10("div", {
                      className: "flex-1",
                      children: /* @__PURE__ */ jsx10("div", {
                        className: "font-medium",
                        children: doc.title || doc.slug
                      })
                    })
                  })
                }, doc.slug))
              })
            ]
          }),
          isRootLevel && /* @__PURE__ */ jsx10("div", {
            className: "space-y-0.5",
            children: folderDocs.map((doc) => /* @__PURE__ */ jsx10("button", {
              type: "button",
              onClick: () => onDocSelect(doc.slug),
              className: clsx8("w-full px-3 py-2 text-left text-sm transition-colors focus:outline-none", selectedDoc === doc.slug ? "border-blue-500 border-r-2 bg-blue-50 text-blue-900 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-100" : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/50"),
              children: /* @__PURE__ */ jsx10("div", {
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

//# debugId=9F18F2C43DBD7E2964756E2164756E21

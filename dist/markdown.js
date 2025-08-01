import de, { memo as $, useCallback as B, useState as I, useEffect as L } from "react";
import { createSpriteIcon as ue } from "@ycore/componentry/images";
import { ThemeSwitch as me, THEME_OPTIONS as fe, LoadingBar as xe } from "@ycore/componentry/impetus";
import he from "@ycore/componentry/shadcn-ui/assets/lucide-sprites.svg?url";
import V from "clsx";
import { useLocation as pe, useFetcher as be, redirect as ge } from "react-router";
var T = { exports: {} }, k = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var q;
function ve() {
  if (q) return k;
  q = 1;
  var r = Symbol.for("react.transitional.element"), i = Symbol.for("react.fragment");
  function m(c, d, s) {
    var l = null;
    if (s !== void 0 && (l = "" + s), d.key !== void 0 && (l = "" + d.key), "key" in d) {
      s = {};
      for (var u in d)
        u !== "key" && (s[u] = d[u]);
    } else s = d;
    return d = s.ref, {
      $$typeof: r,
      type: c,
      key: l,
      ref: d !== void 0 ? d : null,
      props: s
    };
  }
  return k.Fragment = i, k.jsx = m, k.jsxs = m, k;
}
var w = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var G;
function ye() {
  return G || (G = 1, process.env.NODE_ENV !== "production" && function() {
    function r(e) {
      if (e == null) return null;
      if (typeof e == "function")
        return e.$$typeof === le ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case S:
          return "Fragment";
        case K:
          return "Profiler";
        case Q:
          return "StrictMode";
        case ae:
          return "Suspense";
        case ne:
          return "SuspenseList";
        case oe:
          return "Activity";
      }
      if (typeof e == "object")
        switch (typeof e.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), e.$$typeof) {
          case _:
            return "Portal";
          case te:
            return (e.displayName || "Context") + ".Provider";
          case ee:
            return (e._context.displayName || "Context") + ".Consumer";
          case re:
            var a = e.render;
            return e = e.displayName, e || (e = a.displayName || a.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
          case se:
            return a = e.displayName || null, a !== null ? a : r(e.type) || "Memo";
          case F:
            a = e._payload, e = e._init;
            try {
              return r(e(a));
            } catch {
            }
        }
      return null;
    }
    function i(e) {
      return "" + e;
    }
    function m(e) {
      try {
        i(e);
        var a = !1;
      } catch {
        a = !0;
      }
      if (a) {
        a = console;
        var o = a.error, x = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return o.call(
          a,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          x
        ), i(e);
      }
    }
    function c(e) {
      if (e === S) return "<>";
      if (typeof e == "object" && e !== null && e.$$typeof === F)
        return "<...>";
      try {
        var a = r(e);
        return a ? "<" + a + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function d() {
      var e = A.A;
      return e === null ? null : e.getOwner();
    }
    function s() {
      return Error("react-stack-top-frame");
    }
    function l(e) {
      if (Y.call(e, "key")) {
        var a = Object.getOwnPropertyDescriptor(e, "key").get;
        if (a && a.isReactWarning) return !1;
      }
      return e.key !== void 0;
    }
    function u(e, a) {
      function o() {
        M || (M = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          a
        ));
      }
      o.isReactWarning = !0, Object.defineProperty(e, "key", {
        get: o,
        configurable: !0
      });
    }
    function v() {
      var e = r(this.type);
      return z[e] || (z[e] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), e = this.props.ref, e !== void 0 ? e : null;
    }
    function n(e, a, o, x, g, p, P, C) {
      return o = p.ref, e = {
        $$typeof: b,
        type: e,
        key: a,
        props: p,
        _owner: g
      }, (o !== void 0 ? o : null) !== null ? Object.defineProperty(e, "ref", {
        enumerable: !1,
        get: v
      }) : Object.defineProperty(e, "ref", { enumerable: !1, value: null }), e._store = {}, Object.defineProperty(e._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(e, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(e, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: P
      }), Object.defineProperty(e, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: C
      }), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
    }
    function R(e, a, o, x, g, p, P, C) {
      var h = a.children;
      if (h !== void 0)
        if (x)
          if (ce(h)) {
            for (x = 0; x < h.length; x++)
              y(h[x]);
            Object.freeze && Object.freeze(h);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else y(h);
      if (Y.call(a, "key")) {
        h = r(e);
        var j = Object.keys(a).filter(function(ie) {
          return ie !== "key";
        });
        x = 0 < j.length ? "{key: someKey, " + j.join(": ..., ") + ": ...}" : "{key: someKey}", J[h + x] || (j = 0 < j.length ? "{" + j.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          x,
          h,
          j,
          h
        ), J[h + x] = !0);
      }
      if (h = null, o !== void 0 && (m(o), h = "" + o), l(a) && (m(a.key), h = "" + a.key), "key" in a) {
        o = {};
        for (var D in a)
          D !== "key" && (o[D] = a[D]);
      } else o = a;
      return h && u(
        o,
        typeof e == "function" ? e.displayName || e.name || "Unknown" : e
      ), n(
        e,
        h,
        p,
        g,
        d(),
        o,
        P,
        C
      );
    }
    function y(e) {
      typeof e == "object" && e !== null && e.$$typeof === b && e._store && (e._store.validated = 1);
    }
    var f = de, b = Symbol.for("react.transitional.element"), _ = Symbol.for("react.portal"), S = Symbol.for("react.fragment"), Q = Symbol.for("react.strict_mode"), K = Symbol.for("react.profiler"), ee = Symbol.for("react.consumer"), te = Symbol.for("react.context"), re = Symbol.for("react.forward_ref"), ae = Symbol.for("react.suspense"), ne = Symbol.for("react.suspense_list"), se = Symbol.for("react.memo"), F = Symbol.for("react.lazy"), oe = Symbol.for("react.activity"), le = Symbol.for("react.client.reference"), A = f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Y = Object.prototype.hasOwnProperty, ce = Array.isArray, O = console.createTask ? console.createTask : function() {
      return null;
    };
    f = {
      "react-stack-bottom-frame": function(e) {
        return e();
      }
    };
    var M, z = {}, U = f["react-stack-bottom-frame"].bind(
      f,
      s
    )(), W = O(c(s)), J = {};
    w.Fragment = S, w.jsx = function(e, a, o, x, g) {
      var p = 1e4 > A.recentlyCreatedOwnerStacks++;
      return R(
        e,
        a,
        o,
        !1,
        x,
        g,
        p ? Error("react-stack-top-frame") : U,
        p ? O(c(e)) : W
      );
    }, w.jsxs = function(e, a, o, x, g) {
      var p = 1e4 > A.recentlyCreatedOwnerStacks++;
      return R(
        e,
        a,
        o,
        !0,
        x,
        g,
        p ? Error("react-stack-top-frame") : U,
        p ? O(c(e)) : W
      );
    };
  }()), w;
}
var H;
function je() {
  return H || (H = 1, process.env.NODE_ENV === "production" ? T.exports = ve() : T.exports = ye()), T.exports;
}
var t = je();
function ke({ children: r, className: i = "" }) {
  return !r || typeof r != "string" ? /* @__PURE__ */ t.jsx("div", { className: i }) : /* @__PURE__ */ t.jsx("div", { className: i, dangerouslySetInnerHTML: { __html: r } });
}
const we = [], N = ue(he), X = (r) => typeof r == "object" && r !== null && "content" in r && "frontmatter" in r && "slug" in r, E = {
  docs: (r) => `/docs#${r}`,
  docsApi: (r) => `/docs/${r}?api`
};
async function De() {
  return we;
}
function Ie({ loaderData: r }) {
  const i = r, m = pe(), [c, d] = I(null), [s, l] = I(null), [u, v] = I(!1), n = be(), R = B(
    (f) => {
      c !== f && (d(f), l(null), n.load(E.docsApi(f)), window.history.replaceState(null, "", E.docs(f)));
    },
    [n.load, c]
  );
  L(() => {
    const f = m.hash.slice(1);
    f && i.find((b) => b.slug === f) && !c && (d(f), n.load(E.docsApi(f)));
  }, [i, n.load, c, m.hash.slice]), L(() => {
    const f = () => {
      const b = window.location.hash.slice(1);
      b && i.find((_) => _.slug === b) ? (d(b), l(null), n.load(E.docsApi(b))) : (d(null), l(null));
    };
    return window.addEventListener("popstate", f), () => window.removeEventListener("popstate", f);
  }, [i, n.load]), L(() => {
    n.state === "idle" && n.data && !X(n.data) && l("Failed to load document");
  }, [n.state, n.data]);
  const y = X(n.data) ? n.data : void 0;
  return /* @__PURE__ */ t.jsx("div", { className: "min-h-screen bg-white transition-colors dark:bg-gray-900", children: /* @__PURE__ */ t.jsxs("div", { className: "flex", children: [
    /* @__PURE__ */ t.jsx(
      "aside",
      {
        className: `fixed inset-y-0 top-0 left-0 z-20 overflow-y-auto border-gray-200 border-r bg-white transition-transform duration-300 dark:border-gray-800 dark:bg-gray-900 ${u ? "-translate-x-full" : "translate-x-0"} w-80`,
        children: /* @__PURE__ */ t.jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ t.jsxs("div", { className: "mb-6 flex items-center justify-between", children: [
            /* @__PURE__ */ t.jsx("h2", { className: "font-semibold text-gray-900 text-lg dark:text-white", children: "Documentation" }),
            /* @__PURE__ */ t.jsxs("div", { children: [
              /* @__PURE__ */ t.jsx(me, { theme: fe, className: "size-3", classTheme: "size-3" }),
              /* @__PURE__ */ t.jsx("button", { type: "button", onClick: () => v(!u), className: "rounded-md p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200", children: /* @__PURE__ */ t.jsx(N, { id: "ChevronLeft", className: "h-5 w-5" }) })
            ] })
          ] }),
          /* @__PURE__ */ t.jsx("nav", { className: "space-y-1", "aria-label": "Documentation navigation", children: i.length === 0 ? /* @__PURE__ */ t.jsx(Ee, {}) : /* @__PURE__ */ t.jsx(Re, { docs: i, selectedDoc: c, onDocSelect: R }) })
        ] })
      }
    ),
    /* @__PURE__ */ t.jsx(
      "button",
      {
        type: "button",
        onClick: () => v(!1),
        className: `fixed top-4 left-4 z-30 rounded-md border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-opacity duration-300 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:text-gray-200 ${u ? "opacity-100" : "pointer-events-none opacity-0"}`,
        children: /* @__PURE__ */ t.jsx(N, { id: "EllipsisVertical", className: "h-5 w-5" })
      }
    ),
    /* @__PURE__ */ t.jsx("main", { className: `flex-1 transition-all duration-300 ${u ? "pl-0" : "pl-64"}`, children: /* @__PURE__ */ t.jsx("div", { className: "mx-auto max-w-4xl", children: c ? n.state === "loading" ? /* @__PURE__ */ t.jsx(xe, {}) : s ? /* @__PURE__ */ t.jsx(Z, {}) : y ? /* @__PURE__ */ t.jsxs("article", { className: "markdown-content px-8 py-12", children: [
      /* @__PURE__ */ t.jsx(Ne, { frontmatter: y.frontmatter }),
      /* @__PURE__ */ t.jsx(ke, { className: "max-w-none", children: y.content })
    ] }) : /* @__PURE__ */ t.jsx(Z, {}) : /* @__PURE__ */ t.jsx("div", { className: "flex h-96 items-center justify-center", children: /* @__PURE__ */ t.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ t.jsx("div", { className: "mb-4 text-gray-400 dark:text-gray-500", children: /* @__PURE__ */ t.jsx(N, { id: "CircleAlert", className: "h-8 w-8" }) }),
      /* @__PURE__ */ t.jsx("h3", { className: "mb-2 font-medium text-gray-900 text-lg dark:text-white", children: "Select a document" }),
      /* @__PURE__ */ t.jsx("p", { className: "text-gray-500 dark:text-gray-400", children: "Choose a document from the sidebar to view its content." })
    ] }) }) }) })
  ] }) });
}
const Ee = () => /* @__PURE__ */ t.jsx("p", { className: "text-gray-500 text-sm dark:text-gray-400", children: "No documentation found." }), Z = $(() => /* @__PURE__ */ t.jsx("div", { className: "flex h-96 items-center justify-center", children: /* @__PURE__ */ t.jsxs("div", { className: "text-center", children: [
  /* @__PURE__ */ t.jsx("div", { className: "mb-4 text-red-400 dark:text-red-500", children: /* @__PURE__ */ t.jsx(N, { id: "CircleAlert", className: "mx-auto h-8 w-8" }) }),
  /* @__PURE__ */ t.jsx("h3", { className: "mb-2 font-medium text-gray-900 text-lg dark:text-white", children: "Document not found" }),
  /* @__PURE__ */ t.jsx("p", { className: "text-gray-500 dark:text-gray-400", children: "The selected document could not be loaded." })
] }) })), Ne = $(({ frontmatter: r }) => /* @__PURE__ */ t.jsxs("header", { className: "mb-8", children: [
  r.title && /* @__PURE__ */ t.jsx("h1", { className: "mb-4 font-bold font-serif text-3xl text-gray-900 dark:text-white", children: r.title }),
  r.description && /* @__PURE__ */ t.jsx("p", { className: "mb-4 font-serif text-gray-600 text-lg dark:text-gray-300", children: r.description }),
  (r.formattedDate || r.version) && /* @__PURE__ */ t.jsxs("div", { className: "flex items-center justify-between text-gray-500 text-sm dark:text-gray-400", children: [
    r.formattedDate && /* @__PURE__ */ t.jsx("time", { className: "font-sans", dateTime: r.date, children: r.formattedDate }),
    r.version && /* @__PURE__ */ t.jsx("span", { className: "px-2 py-1 font-mono text-gray-300 text-xs italic dark:text-gray-600", children: r.version })
  ] })
] })), Re = $(({ docs: r, selectedDoc: i, onDocSelect: m }) => {
  const d = B(() => {
    const s = {};
    for (const l of r) {
      const u = l.folder || "";
      s[u] || (s[u] = []), s[u].push(l);
    }
    return s;
  }, [r])();
  return /* @__PURE__ */ t.jsx("div", { className: "space-y-1", children: Object.entries(d).map(([s, l]) => {
    const u = s === "", v = `folder-${s.replace(/[^a-zA-Z0-9]/g, "-")}`;
    return /* @__PURE__ */ t.jsxs("div", { children: [
      !u && /* @__PURE__ */ t.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ t.jsx("input", { type: "checkbox", id: v, className: "peer hidden", defaultChecked: !0 }),
        /* @__PURE__ */ t.jsxs("label", { htmlFor: v, className: "flex w-full cursor-pointer items-center px-3 py-2 text-left text-gray-600 text-sm transition-colors hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/50", children: [
          /* @__PURE__ */ t.jsx(N, { id: "ChevronRight", className: "mr-2 h-3 w-3 transition-transform duration-200 peer-checked:rotate-90" }),
          /* @__PURE__ */ t.jsx("span", { className: "font-medium capitalize", children: s })
        ] }),
        /* @__PURE__ */ t.jsx("div", { className: "ml-6 max-h-0 space-y-0.5 overflow-hidden transition-all duration-300 peer-checked:max-h-96", children: l.map((n) => /* @__PURE__ */ t.jsx(
          "button",
          {
            type: "button",
            onClick: () => m(n.slug),
            className: V(
              "w-full px-3 py-2 text-left text-sm transition-colors focus:outline-none",
              i === n.slug ? "border-blue-500 border-r-2 bg-blue-50 text-blue-900 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-100" : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/50"
            ),
            children: /* @__PURE__ */ t.jsx("div", { className: "flex items-center", children: /* @__PURE__ */ t.jsx("div", { className: "flex-1", children: /* @__PURE__ */ t.jsx("div", { className: "font-medium", children: n.title || n.slug }) }) })
          },
          n.slug
        )) })
      ] }),
      u && /* @__PURE__ */ t.jsx("div", { className: "space-y-0.5", children: l.map((n) => /* @__PURE__ */ t.jsx(
        "button",
        {
          type: "button",
          onClick: () => m(n.slug),
          className: V(
            "w-full px-3 py-2 text-left text-sm transition-colors focus:outline-none",
            i === n.slug ? "border-blue-500 border-r-2 bg-blue-50 text-blue-900 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-100" : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/50"
          ),
          children: /* @__PURE__ */ t.jsx("div", { className: "font-medium", children: n.title || n.slug })
        },
        n.slug
      )) })
    ] }, s || "root");
  }) });
}), Te = {};
async function Le({ params: r, request: i }) {
  const m = r["*"];
  if (!m || typeof m != "string" || m.trim() === "")
    throw new Response("Invalid document slug", { status: 400 });
  const c = m.replace(/[^a-zA-Z0-9-_/]/g, "");
  if (c !== m)
    throw new Response("Invalid document slug format", { status: 400 });
  if (c.includes("..") || c.startsWith("/") || c.endsWith("/"))
    throw new Response("Invalid document slug format", { status: 400 });
  const s = new URL(i.url).searchParams.has("api") || i.headers.get("Accept")?.includes("application/json"), l = Te[c];
  if (!l)
    throw new Response("Document not found", { status: 404 });
  if (s) {
    const u = {
      ...l.frontmatter,
      formattedDate: l.frontmatter.date ? new Date(l.frontmatter.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : void 0
    };
    return Response.json({ content: l.content, frontmatter: u, slug: c });
  }
  return ge(E.docs(c));
}
export {
  ke as Markdown,
  Ie as MarkdownPage,
  De as markdownLoader,
  Le as markdownSlugLoader,
  E as routesTemplate
};
//# sourceMappingURL=markdown.js.map

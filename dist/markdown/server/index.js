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

// ../../node_modules/.bun/valibot@1.1.0+1fb4c65d43e298b9/node_modules/valibot/dist/index.js
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
  } catch (_error) {
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
  } catch (_error) {
    return {};
  }
}
async function getMarkdownDocument(slug, assets, request, prefix) {
  const globalManifest = await getGlobalManifest(assets, request, prefix);
  if (globalManifest._buildMode === "chunked") {
    const manifest = await getMarkdownManifest(assets, request, prefix);
    const docMeta = manifest.find((doc) => doc.slug === slug);
    if (!docMeta) {
      return null;
    }
    const folder = docMeta.folder || "root";
    const folderContent = await loadFolderContent(folder, assets, request, prefix);
    return folderContent[slug] || null;
  }
  const content = await getMarkdownContent(assets, request, prefix);
  return content[slug] || null;
}

// src/markdown/server/markdown.server.ts
async function markdownLoader({ request, ASSETS }) {
  try {
    const manifest = await getMarkdownManifest(ASSETS, request);
    return manifest;
  } catch (_error) {
    return [];
  }
}
async function markdownSlugLoader({ validatedSlug, request, ASSETS }) {
  const url = new URL(request.url);
  const isApiCall = url.searchParams.has("api") || request.headers.get("Accept")?.includes("application/json");
  try {
    const manifest = await getMarkdownManifest(ASSETS, request).catch(() => []);
    const docExists = manifest.some((doc2) => doc2.slug === validatedSlug);
    if (!docExists) {
      throw new Response("Document not found", { status: 404 });
    }
    const doc = await getMarkdownDocument(validatedSlug, ASSETS, request);
    if (!doc) {
      if (isApiCall) {
        throw new Response("Document not found", { status: 404 });
      }
      return { manifest, selectedDoc: validatedSlug, document: null, loading: true };
    }
    const enhancedFrontmatter = {
      ...doc.frontmatter,
      formattedDate: doc.frontmatter.date ? new Date(doc.frontmatter.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : undefined
    };
    if (isApiCall) {
      return Response.json({ content: doc.content, frontmatter: enhancedFrontmatter, slug: validatedSlug });
    }
    const enhancedDoc = { ...doc, frontmatter: enhancedFrontmatter };
    return { manifest, selectedDoc: validatedSlug, document: enhancedDoc };
  } catch (error) {
    if (error instanceof Response && error.status === 404) {
      throw error;
    }
    if (!isApiCall) {
      const manifest = await getMarkdownManifest(ASSETS, request).catch(() => []);
      return { manifest, selectedDoc: validatedSlug, document: null, loading: true };
    }
    throw error;
  }
}
export {
  markdownSlugLoader,
  markdownLoader
};

//# debugId=F0324E190D11308564756E2164756E21

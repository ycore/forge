// src/vite/plugins/markdown-builder.ts
import fs from "node:fs";
import path from "node:path";
import { promisify } from "node:util";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import { createHighlighter } from "shiki";
var readFile = promisify(fs.readFile);
var readdir = promisify(fs.readdir);
var writeFile = promisify(fs.writeFile);
var mkdir = promisify(fs.mkdir);
var stat = promisify(fs.stat);
var utimes = promisify(fs.utimes);
var DOMPURIFY_CONFIG = {
  ALLOWED_TAGS: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "br", "strong", "em", "u", "s", "del", "a", "img", "ul", "ol", "li", "blockquote", "pre", "code", "table", "thead", "tbody", "tr", "th", "td", "hr", "div", "span"],
  ALLOWED_ATTR: ["href", "title", "alt", "src", "class", "id", "start", "type", "colspan", "rowspan", "datetime", "scope", "data-*"],
  FORBID_TAGS: ["script", "object", "embed", "form", "input", "button", "iframe", "frame", "frameset", "noframes"],
  FORBID_ATTR: ["style", "on*"],
  KEEP_CONTENT: true,
  ALLOW_DATA_ATTR: false
};
var HIGHLIGHTER = {
  LANGS: ["javascript", "typescript", "css", "html", "bash", "yaml", "json", "markdown"],
  THEMES: ["night-owl"]
};
var CONCURRENCY_LIMIT = 10;
function markdownBuilder(options) {
  const { source, extension = ".md", target = "public", prefix = "markdown", updateDate = true, purifyHtml = true, syntaxHighlighter, shikiConfig } = options;
  let highlighter = null;
  let isInitialized = false;
  async function updateFrontmatterDate(filePath, content, fileMtime) {
    if (!updateDate)
      return content;
    const { data: frontmatter, content: markdown } = parseFrontmatter(content);
    const fileDate = new Date(fileMtime).toISOString().split("T")[0];
    if (!frontmatter || typeof frontmatter !== "object" || Array.isArray(frontmatter))
      return content;
    if (frontmatter.date === fileDate)
      return content;
    const updatedFrontmatter = { ...frontmatter, date: fileDate };
    const frontmatterStr = Object.entries(updatedFrontmatter).map(([key, value]) => `${key}: ${typeof value === "string" ? `"${value}"` : value}`).join(`
`);
    const updatedContent = `---
${frontmatterStr}
---
${markdown}`;
    try {
      await writeFile(filePath, updatedContent);
      const originalDate = new Date(fileMtime);
      await utimes(filePath, originalDate, originalDate);
      console.info(`\uD83D\uDCC5 Updated frontmatter date in ${filePath} to match file`);
      return updatedContent;
    } catch (error) {
      console.warn(`⚠️ Failed to update date in ${filePath}:`, error);
      return content;
    }
  }
  async function initializeHighlighter() {
    if (isInitialized)
      return;
    if (syntaxHighlighter === null) {
      highlighter = null;
    } else if (syntaxHighlighter) {
      highlighter = syntaxHighlighter;
    } else {
      try {
        highlighter = await createShikiHighlighter(shikiConfig);
      } catch (error) {
        console.warn("⚠️ Failed to initialize Shiki highlighter:", error);
        highlighter = null;
      }
    }
    isInitialized = true;
  }
  async function collectMarkdownFilesWithMetadata(dir) {
    const result = new Map;
    async function walk(current) {
      const entries = await readdir(current, { withFileTypes: true });
      await Promise.all(entries.map(async (entry) => {
        const full = path.join(current, entry.name);
        if (entry.isDirectory())
          return walk(full);
        if (!entry.name.endsWith(extension))
          return;
        const stats = await stat(full);
        const rel = path.relative(dir, full);
        result.set(rel, { path: full, metadata: { mtime: stats.mtime.getTime(), size: stats.size } });
      }));
    }
    await walk(dir);
    return result;
  }
  function isFileChanged(prev, current) {
    return !prev || prev._mtime !== current.mtime || prev._size !== current.size;
  }
  async function checkForChanges(dir, previous) {
    const previousMap = new Map(previous.map((entry) => [entry.path, entry]));
    const currentFiles = await collectMarkdownFilesWithMetadata(dir);
    for (const [relPath, { metadata }] of currentFiles) {
      if (isFileChanged(previousMap.get(relPath), metadata)) {
        return { changed: true, updatedFiles: currentFiles };
      }
    }
    if (previous.length !== currentFiles.size) {
      return { changed: true, updatedFiles: currentFiles };
    }
    return { changed: false, updatedFiles: currentFiles };
  }
  async function processChangedFiles(files) {
    await initializeHighlighter();
    const manifest = [];
    const content = {};
    let errorCount = 0;
    const entries = [...files.entries()];
    await execConcurrently(entries, CONCURRENCY_LIMIT, async ([relPath, { path: filePath, metadata }]) => {
      try {
        const raw = await readFile(filePath, "utf8");
        const updated = await updateFrontmatterDate(filePath, raw, metadata.mtime);
        const { data: frontmatter } = parseFrontmatter(updated);
        const { content: html, error } = await processMarkdownFile(filePath, purifyHtml, highlighter);
        if (error)
          throw new Error(error);
        const slug = relPath.replace(new RegExp(`${extension}$`), "");
        const folder = path.dirname(relPath) === "." ? undefined : path.dirname(relPath);
        manifest.push({ slug, path: relPath, folder, _mtime: metadata.mtime, _size: metadata.size, ...frontmatter });
        content[slug] = { frontmatter, content: html };
      } catch (e) {
        errorCount++;
        console.error(`❌ Error processing ${filePath}:`, e);
      }
    });
    return { manifest: sortManifest(manifest), content, processedCount: manifest.length, errorCount };
  }
  async function loadPreviousManifest() {
    try {
      const file = path.join(process.cwd(), target, `${prefix}-manifest.json`);
      if (!fs.existsSync(file))
        return [];
      return JSON.parse(await readFile(file, "utf8"));
    } catch {
      return [];
    }
  }
  async function writeMarkdownFiles(manifest, content) {
    try {
      const dir = path.join(process.cwd(), target);
      await mkdir(dir, { recursive: true });
      await writeFile(path.join(dir, `${prefix}-manifest.json`), JSON.stringify(manifest, null, 2));
      await writeFile(path.join(dir, `${prefix}-content.json`), JSON.stringify(content, null, 2));
    } catch (e) {
      console.error("❌ Failed to write markdown JSON files:", e);
    }
  }
  return {
    name: "markdown-builder",
    async buildStart() {
      const docsDir = path.join(process.cwd(), source);
      const prev = await loadPreviousManifest();
      const { changed, updatedFiles } = await checkForChanges(docsDir, prev);
      if (!changed)
        return;
      const result = await processChangedFiles(updatedFiles);
      await writeMarkdownFiles(result.manifest, result.content);
      console.info(`\uD83D\uDCC4 Processing ${updatedFiles.size} updated markdown files from: ${source}`);
    },
    async handleHotUpdate({ file, server }) {
      if (file.includes(source) && file.endsWith(extension)) {
        const docsDir = path.join(process.cwd(), source);
        const files = await collectMarkdownFilesWithMetadata(docsDir);
        const result = await processChangedFiles(files);
        await writeMarkdownFiles(result.manifest, result.content);
        server.ws.send({ type: "full-reload" });
      }
    }
  };
}
function parseFrontmatter(content) {
  const match = content.match(/^---\s*\n(.*?)\n---\s*\n(.*)$/s);
  if (!match) {
    return { data: {}, content };
  }
  const [, frontmatterText, markdown] = match;
  const frontmatter = {};
  if (!frontmatterText)
    return frontmatter;
  const lines = frontmatterText.split(`
`).filter((line) => line.trim());
  for (const line of lines) {
    const colonIndex = line.indexOf(":");
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim();
      const cleanValue = value.replace(/^['"]|['"]$/g, "");
      if (key === "date" && cleanValue.match(/^\d{4}-\d{2}-\d{2}$/)) {
        frontmatter[key] = new Date(cleanValue).toISOString().split("T")[0];
      } else {
        frontmatter[key] = cleanValue;
      }
    }
  }
  return { data: frontmatter, content: markdown };
}
async function processMarkdownFile(filePath, purifyHtml = true, highlighter) {
  try {
    const source = await readFile(filePath, "utf8");
    const { content: markdown } = parseFrontmatter(source);
    const markdownString = typeof markdown === "string" ? markdown : String(markdown || "");
    const htmlContent = marked.parse(markdownString, { breaks: true, gfm: true });
    if (typeof htmlContent !== "string") {
      return { content: markdownString, error: `Unexpected marked result type: ${typeof htmlContent}` };
    }
    const sanitizedContent = purifyHtml ? DOMPurify.sanitize(htmlContent, DOMPURIFY_CONFIG) : htmlContent;
    const highlightedContent = highlighter ? await highlightCodeBlocks(htmlContent, highlighter) : sanitizedContent;
    return { content: highlightedContent };
  } catch (error) {
    return {
      content: "",
      error: error instanceof Error ? error.message : String(error)
    };
  }
}
function sortManifest(manifest) {
  return manifest.sort((a, b) => {
    const folderA = a.folder || "";
    const folderB = b.folder || "";
    if (folderA !== folderB) {
      return folderA.localeCompare(folderB);
    }
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return a.title?.localeCompare(b.title || "") || 0;
  });
}
async function createShikiHighlighter(config = {}) {
  const { langs = HIGHLIGHTER.LANGS, themes = HIGHLIGHTER.THEMES } = config;
  const highlighter = await createHighlighter({ langs, themes });
  return {
    highlight: (code, language) => {
      try {
        return highlighter.codeToHtml(code, {
          lang: language,
          theme: "night-owl",
          colorReplacements: {
            "#011627": "#1f2937"
          }
        });
      } catch (error) {
        console.warn(`Failed to highlight code block with language "${language}":`, error);
        return `<pre><code class="language-${language}">${code}</code></pre>`;
      }
    }
  };
}
async function highlightCodeBlocks(htmlContent, highlighter) {
  const codeBlockRegex = /<pre><code(?:\s+class="language-([^"]*)")?>([\s\S]*?)<\/code><\/pre>/g;
  let processedContent = htmlContent;
  const matches = [...htmlContent.matchAll(codeBlockRegex)];
  for (const match of matches) {
    const [fullMatch, language, codeContent] = match;
    if (!codeContent)
      continue;
    const decodedContent = codeContent.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
    try {
      const highlightedContent = await highlighter.highlight(decodedContent, language || "text");
      processedContent = processedContent.replace(fullMatch, highlightedContent);
    } catch (error) {
      console.warn(`Failed to highlight code block with language "${language}":`, error);
    }
  }
  return processedContent;
}
async function execConcurrently(items, limit, handler) {
  const executing = [];
  for (const item of items) {
    const p = handler(item);
    executing.push(p);
    if (executing.length >= limit) {
      await Promise.race(executing).catch(() => {});
      for (let i = executing.length - 1;i >= 0; i--) {
        try {
          await executing[i];
          executing.splice(i, 1);
        } catch {
          executing.splice(i, 1);
        }
      }
    }
  }
  await Promise.allSettled(executing);
}
// src/vite/plugins/workspace-resolver.ts
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
function workspaceResolver(options = {}) {
  const findWorkspaceRoot = () => {
    let cwd = process.cwd();
    while (cwd !== "/") {
      const workspacesPath = join(cwd, "workspaces");
      try {
        if (statSync(workspacesPath).isDirectory()) {
          return workspacesPath;
        }
      } catch {}
      cwd = resolve(cwd, "..");
    }
    return join(process.cwd(), "workspaces");
  };
  const defaultWorkspaceRoot = findWorkspaceRoot();
  const defaultWorkspacePath = join(defaultWorkspaceRoot, ":PKG:/src/:SUBPATH:");
  const { workspacePath = defaultWorkspacePath, exclude = true, workspaceDirs } = options;
  const workspaceRoot = workspacePath.replace("/:PKG:/src/:SUBPATH:", "");
  let prefix = options.prefix;
  if (!prefix) {
    prefix = derivePrefix();
  }
  const packageCache = new Map;
  const discoveredWorkspacePackages = new Set;
  function getPackageExports(pkgName) {
    if (packageCache.has(pkgName)) {
      return packageCache.get(pkgName);
    }
    try {
      const packageJsonPath = join(workspaceRoot, pkgName, "package.json");
      const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
      const exports = packageJson.exports || {};
      packageCache.set(pkgName, exports);
      return exports;
    } catch (e) {
      packageCache.set(pkgName, {});
      return {};
    }
  }
  function derivePrefix() {
    try {
      const discoveredDirs = getWorkspaceDirs();
      for (const dir of discoveredDirs) {
        try {
          const packageJsonPath = join(workspaceRoot, dir, "package.json");
          const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
          if (packageJson.name?.includes("/")) {
            const scope = packageJson.name.split("/")[0];
            return `${scope}/`;
          }
        } catch {}
      }
    } catch {}
    return "@workspace/";
  }
  function getWorkspaceDirs() {
    if (workspaceDirs) {
      return workspaceDirs;
    }
    try {
      const entries = readdirSync(workspaceRoot);
      return entries.filter((entry) => {
        try {
          const fullPath = join(workspaceRoot, entry);
          const stat2 = statSync(fullPath);
          if (!stat2.isDirectory())
            return false;
          const packageJsonPath = join(fullPath, "package.json");
          return statSync(packageJsonPath).isFile();
        } catch {
          return false;
        }
      });
    } catch {
      return [];
    }
  }
  function discoverWorkspacePackages() {
    const workspacePackages = [];
    try {
      const discoveredWorkspaceDirs = getWorkspaceDirs();
      for (const dir of discoveredWorkspaceDirs) {
        try {
          const packageJsonPath = join(workspaceRoot, dir, "package.json");
          const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
          if (packageJson.name?.startsWith(prefix?.replace(/\/$/, ""))) {
            const exports = packageJson.exports || {};
            workspacePackages.push(packageJson.name);
            for (const exportKey of Object.keys(exports)) {
              if (exportKey !== "./package.json" && exportKey !== ".") {
                const fullExportName = `${packageJson.name}${exportKey.replace(".", "")}`;
                workspacePackages.push(fullExportName);
              }
            }
          }
        } catch (e) {}
      }
    } catch (e) {}
    return workspacePackages;
  }
  return {
    name: "workspace-resolver",
    configResolved(config) {
      if (exclude) {
        const workspacePackages = discoverWorkspacePackages();
        if (!config.optimizeDeps) {
          config.optimizeDeps = {};
        }
        if (!config.optimizeDeps.exclude) {
          config.optimizeDeps.exclude = [];
        }
        for (const pkg of workspacePackages) {
          if (!config.optimizeDeps.exclude.includes(pkg)) {
            config.optimizeDeps.exclude.push(pkg);
          }
        }
        console.log(`[workspace-resolver] Auto-excluded ${workspacePackages.length} workspace packages from optimization`);
      }
    },
    resolveId(id) {
      if (id.startsWith(prefix)) {
        try {
          const [_scope, pkg = "", ...subpath] = id.split("/");
          discoveredWorkspacePackages.add(`${prefix.replace(/\/$/, "")}/${pkg}`);
          const packageExports = getPackageExports(pkg);
          const exportKey = subpath.length > 0 ? `./${subpath.join("/")}` : ".";
          if (packageExports[exportKey]) {
            const exportValue = packageExports[exportKey];
            let sourcePath;
            if (typeof exportValue === "string") {
              sourcePath = exportValue;
            } else if (typeof exportValue === "object" && exportValue && "default" in exportValue) {
              sourcePath = exportValue.default;
            }
            if (sourcePath?.startsWith("./src/")) {
              const resolvedPath = resolve(workspaceRoot, pkg, sourcePath.replace("./", ""));
              try {
                statSync(resolvedPath);
                return resolvedPath;
              } catch {}
            }
          }
          const fallbackPath = join(workspaceRoot, pkg, "src", subpath.join("/"));
          if (subpath.length === 0) {
            return `${fallbackPath}/index.ts`;
          }
          return fallbackPath;
        } catch (error) {
          console.warn(`[workspace-resolver] Failed to resolve ${id}:`, error);
          return null;
        }
      }
    }
  };
}
export {
  workspaceResolver,
  markdownBuilder
};

//# debugId=849C0875BFBBA30064756E2164756E21

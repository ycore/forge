/** biome-ignore-all lint/suspicious/noExplicitAny: acceptable */
import fs from 'node:fs';
import path from 'node:path';
import { promisify } from 'node:util';
import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';
import { createHighlighter } from 'shiki';
import type { Plugin } from 'vite';
import type { Frontmatter, MarkdownMeta, ProcessingResult, ShikiConfig, SyntaxHighlighter } from './@types/markdown-builder.types';

interface MarkdownBuilderOptions {
  source: string;
  extension?: string;
  target?: string;
  prefix?: string;
  updateDate?: boolean;
  purifyHtml?: boolean;
  syntaxHighlighter?: SyntaxHighlighter | null;
  shikiConfig?: ShikiConfig;
}

interface FileMetadata {
  mtime: number;
  size: number;
}

const readFile = promisify(fs.readFile);
const readdir = promisify(fs.readdir);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);
const stat = promisify(fs.stat);
const utimes = promisify(fs.utimes);

// DOMPurify configuration for markdown content
const DOMPURIFY_CONFIG = {
  ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'strong', 'em', 'u', 's', 'del', 'a', 'img', 'ul', 'ol', 'li', 'blockquote', 'pre', 'code', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'hr', 'div', 'span'],
  ALLOWED_ATTR: ['href', 'title', 'alt', 'src', 'class', 'id', 'start', 'type', 'colspan', 'rowspan', 'datetime', 'scope', 'data-*'],
  FORBID_TAGS: ['script', 'object', 'embed', 'form', 'input', 'button', 'iframe', 'frame', 'frameset', 'noframes'],
  FORBID_ATTR: ['style', 'on*'],
  KEEP_CONTENT: true,
  ALLOW_DATA_ATTR: false,
};

const HIGHLIGHTER = {
  LANGS: ['javascript', 'typescript', 'css', 'html', 'bash', 'yaml', 'json', 'markdown'],
  THEMES: ['night-owl'],
};

const CONCURRENCY_LIMIT = 10;

export function markdownBuilder(options: MarkdownBuilderOptions): Plugin {
  const { source, extension = '.md', target = 'public', prefix = 'markdown', updateDate = true, purifyHtml = true, syntaxHighlighter, shikiConfig } = options;

  let highlighter: SyntaxHighlighter | null = null;
  let isInitialized = false;

  async function updateFrontmatterDate(filePath: string, content: string, fileMtime: number): Promise<string> {
    if (!updateDate) return content;

    const { data: frontmatter, content: markdown } = parseFrontmatter(content);
    const fileDate = new Date(fileMtime).toISOString().split('T')[0];

    if (!frontmatter || typeof frontmatter !== 'object' || Array.isArray(frontmatter)) return content;
    if (frontmatter.date === fileDate) return content;

    const updatedFrontmatter = { ...frontmatter, date: fileDate };
    const frontmatterStr = Object.entries(updatedFrontmatter)
      .map(([key, value]) => `${key}: ${typeof value === 'string' ? `"${value}"` : value}`)
      .join('\n');

    const updatedContent = `---\n${frontmatterStr}\n---\n${markdown}`;

    try {
      await writeFile(filePath, updatedContent);

      // Restore original timestamp to preserve manual edit time
      const originalDate = new Date(fileMtime);
      await utimes(filePath, originalDate, originalDate);

      console.info(`📅 Updated frontmatter date in ${filePath} to match file`);
      return updatedContent;
    } catch (error) {
      console.warn(`⚠️ Failed to update date in ${filePath}:`, error);
      return content;
    }
  }

  // Initialize highlighter and marked configuration
  async function initializeHighlighter(): Promise<void> {
    if (isInitialized) return;

    if (syntaxHighlighter === null) {
      highlighter = null;
    } else if (syntaxHighlighter) {
      highlighter = syntaxHighlighter;
    } else {
      try {
        highlighter = await createShikiHighlighter(shikiConfig);
      } catch (error) {
        console.warn('⚠️ Failed to initialize Shiki highlighter:', error);
        highlighter = null;
      }
    }

    isInitialized = true;
  }

  async function collectMarkdownFilesWithMetadata(dir: string): Promise<Map<string, { path: string; metadata: FileMetadata }>> {
    const result = new Map();

    async function walk(current: string) {
      const entries = await readdir(current, { withFileTypes: true });
      await Promise.all(
        entries.map(async entry => {
          const full = path.join(current, entry.name);
          if (entry.isDirectory()) return walk(full);
          if (!entry.name.endsWith(extension)) return;
          const stats = await stat(full);
          const rel = path.relative(dir, full);
          result.set(rel, { path: full, metadata: { mtime: stats.mtime.getTime(), size: stats.size } });
        })
      );
    }

    await walk(dir);
    return result;
  }

  function isFileChanged(prev: MarkdownMeta | undefined, current: FileMetadata): boolean {
    // console.log('isFileChanged', prev._mtime, current.mtime, prev._size, current.size);
    return !prev || prev._mtime !== current.mtime || prev._size !== current.size;
  }

  async function checkForChanges(dir: string, previous: MarkdownMeta[]) {
    const previousMap = new Map(previous.map(entry => [entry.path, entry]));
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

  async function processChangedFiles(files: Map<string, { path: string; metadata: FileMetadata }>): Promise<ProcessingResult> {
    await initializeHighlighter();

    const manifest: MarkdownMeta[] = [];
    const content: Record<string, any> = {};
    let errorCount = 0;

    const entries = [...files.entries()];

    await execConcurrently(entries, CONCURRENCY_LIMIT, async ([relPath, { path: filePath, metadata }]) => {
      try {
        const raw = await readFile(filePath, 'utf8');
        const updated = await updateFrontmatterDate(filePath, raw, metadata.mtime);
        const { data: frontmatter } = parseFrontmatter(updated);
        const { content: html, error } = await processMarkdownFile(filePath, purifyHtml, highlighter);

        if (error) throw new Error(error);

        const slug = relPath.replace(new RegExp(`${extension}$`), '');
        const folder = path.dirname(relPath) === '.' ? undefined : path.dirname(relPath);

        manifest.push({ slug, path: relPath, folder, _mtime: metadata.mtime, _size: metadata.size, ...(frontmatter as Frontmatter) });
        content[slug] = { frontmatter, content: html };
      } catch (e) {
        errorCount++;
        console.error(`❌ Error processing ${filePath}:`, e);
      }
    });

    return { manifest: sortManifest(manifest), content, processedCount: manifest.length, errorCount };
  }

  async function loadPreviousManifest(): Promise<MarkdownMeta[]> {
    try {
      const file = path.join(process.cwd(), target, `${prefix}-manifest.json`);
      if (!fs.existsSync(file)) return [];
      return JSON.parse(await readFile(file, 'utf8'));
    } catch {
      return [];
    }
  }

  // Function to write JSON files
  async function writeMarkdownFiles(manifest: MarkdownMeta[], content: Record<string, any>) {
    try {
      const dir = path.join(process.cwd(), target);
      await mkdir(dir, { recursive: true });
      await writeFile(path.join(dir, `${prefix}-manifest.json`), JSON.stringify(manifest, null, 2));
      await writeFile(path.join(dir, `${prefix}-content.json`), JSON.stringify(content, null, 2));
    } catch (e) {
      console.error('❌ Failed to write markdown JSON files:', e);
    }
  }

  return {
    name: 'markdown-builder',
    async buildStart() {
      const docsDir = path.join(process.cwd(), source);
      const prev = await loadPreviousManifest();
      const { changed, updatedFiles } = await checkForChanges(docsDir, prev);
      console.log({ changed }, { updatedFiles });
      if (!changed) return;
      const result = await processChangedFiles(updatedFiles);
      await writeMarkdownFiles(result.manifest, result.content);
      console.info(`📄 Processing ${updatedFiles.size} updated markdown files from: ${source}`);
    },
    async handleHotUpdate({ file, server }) {
      if (file.includes(source) && file.endsWith(extension)) {
        const docsDir = path.join(process.cwd(), source);
        const files = await collectMarkdownFilesWithMetadata(docsDir);
        const result = await processChangedFiles(files);
        await writeMarkdownFiles(result.manifest, result.content);
        server.ws.send({ type: 'full-reload' });
      }
    },
  };
}

// Simple frontmatter parser (no dependencies)
function parseFrontmatter(content: string) {
  const match = content.match(/^---\s*\n(.*?)\n---\s*\n(.*)$/s);
  if (!match) {
    return { data: {}, content };
  }

  const [, frontmatterText, markdown] = match;
  const frontmatter: Frontmatter = {};

  if (!frontmatterText) return frontmatter;

  // Simple YAML parser for basic key-value pairs
  const lines = frontmatterText.split('\n').filter(line => line.trim());
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim();

      // Remove quotes if present
      const cleanValue = value.replace(/^['"]|['"]$/g, '');

      // Try to parse as date
      if (key === 'date' && cleanValue.match(/^\d{4}-\d{2}-\d{2}$/)) {
        frontmatter[key] = new Date(cleanValue).toISOString().split('T')[0];
      } else {
        frontmatter[key] = cleanValue;
      }
    }
  }

  return { data: frontmatter, content: markdown };
}

async function processMarkdownFile(filePath: string, purifyHtml = true, highlighter?: SyntaxHighlighter | null): Promise<{ content: string; error?: string }> {
  try {
    const source = await readFile(filePath, 'utf8');
    const { content: markdown } = parseFrontmatter(source);
    const markdownString = typeof markdown === 'string' ? markdown : String(markdown || '');
    const htmlContent = marked.parse(markdownString, { breaks: true, gfm: true });

    if (typeof htmlContent !== 'string') {
      return { content: markdownString, error: `Unexpected marked result type: ${typeof htmlContent}` };
    }

    const sanitizedContent = purifyHtml ? DOMPurify.sanitize(htmlContent, DOMPURIFY_CONFIG) : htmlContent;
    const highlightedContent = highlighter ? await highlightCodeBlocks(htmlContent, highlighter) : sanitizedContent;

    return { content: highlightedContent };
  } catch (error) {
    return {
      content: '',
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

function sortManifest(manifest: MarkdownMeta[]): MarkdownMeta[] {
  return manifest.sort((a, b) => {
    // Sort by folder first
    const folderA = a.folder || '';
    const folderB = b.folder || '';

    if (folderA !== folderB) {
      return folderA.localeCompare(folderB);
    }

    // Within same folder, sort by date (newest first)
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }

    // Finally by title
    return a.title?.localeCompare(b.title || '') || 0;
  });
}

// Create default Shiki highlighter
async function createShikiHighlighter(config: ShikiConfig = {}): Promise<SyntaxHighlighter> {
  const { langs = HIGHLIGHTER.LANGS, themes = HIGHLIGHTER.THEMES } = config;
  const highlighter = await createHighlighter({ langs, themes });

  return {
    highlight: (code: string, language: string) => {
      try {
        return highlighter.codeToHtml(code, {
          lang: language,
          theme: 'night-owl',
          colorReplacements: {
            '#011627': '#1f2937',
          },
        });
      } catch (error) {
        console.warn(`Failed to highlight code block with language "${language}":`, error);
        return `<pre><code class="language-${language}">${code}</code></pre>`;
      }
    },
  };
}

async function highlightCodeBlocks(htmlContent: string, highlighter: SyntaxHighlighter): Promise<string> {
  // Regular expression to find code blocks: <pre><code class="language-xxx">content</code></pre>
  const codeBlockRegex = /<pre><code(?:\s+class="language-([^"]*)")?>([\s\S]*?)<\/code><\/pre>/g;

  let processedContent = htmlContent;
  const matches = [...htmlContent.matchAll(codeBlockRegex)];

  for (const match of matches) {
    const [fullMatch, language, codeContent] = match;

    if (!codeContent) continue;

    // Decode HTML entities in the code content
    const decodedContent = codeContent
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");

    try {
      const highlightedContent = await highlighter.highlight(decodedContent, language || 'text');

      processedContent = processedContent.replace(fullMatch, highlightedContent);
    } catch (error) {
      console.warn(`Failed to highlight code block with language "${language}":`, error);
    }
  }

  return processedContent;
}

async function execConcurrently<T>(items: T[], limit: number, handler: (item: T) => Promise<void>): Promise<void> {
  const executing: Promise<void>[] = [];

  for (const item of items) {
    const p = handler(item);
    executing.push(p);

    if (executing.length >= limit) {
      await Promise.race(executing).catch(() => {});
      for (let i = executing.length - 1; i >= 0; i--) {
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

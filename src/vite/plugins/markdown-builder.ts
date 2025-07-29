/** biome-ignore-all lint/suspicious/noExplicitAny: acceptable */
import fs from 'node:fs';
import path from 'node:path';
import { promisify } from 'node:util';
import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';
import { createHighlighter } from 'shiki';
import type { Plugin } from 'vite';
import type { Frontmatter, MarkdownBuilderOptions, MarkdownMeta, ProcessingResult, ShikiConfig, SyntaxHighlighter } from './@types/markdown-builder.types';

const readFile = promisify(fs.readFile);
const readdir = promisify(fs.readdir);

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

export function markdownBuilder(options: MarkdownBuilderOptions): Plugin {
  const { contentPath, fileExtension, manifestId = 'virtual:md-manifest', contentId = 'virtual:md-content', purifyHtml = true, syntaxHighlighter, shikiConfig } = options;

  const virtualManifestId = manifestId;
  const resolvedManifestId = `\0${virtualManifestId}`;
  const virtualDocsId = contentId;
  const resolvedDocsId = `\0${virtualDocsId}`;

  let docsData: { manifest: MarkdownMeta[]; content: Record<string, any> } = {
    manifest: [],
    content: {},
  };

  let highlighter: SyntaxHighlighter | null = null;
  let isInitialized = false;

  // Initialize highlighter and marked configuration
  const initializeHighlighter = async (): Promise<void> => {
    if (isInitialized) return;

    if (syntaxHighlighter === null) {
      // Explicitly disabled
      highlighter = null;
    } else if (syntaxHighlighter) {
      // Custom highlighter provided
      highlighter = syntaxHighlighter;
    } else {
      // Default to Shiki highlighter
      try {
        highlighter = await createShikiHighlighter(shikiConfig);
        console.info('✓ Shiki syntax highlighter initialized');
      } catch (error) {
        console.warn('⚠️ Failed to initialize Shiki highlighter:', error);
        highlighter = null;
      }
    }

    isInitialized = true;
  };

  async function generateData(): Promise<ProcessingResult> {
    await initializeHighlighter();

    const docsDir = path.join(process.cwd(), contentPath);

    if (!fs.existsSync(docsDir)) {
      console.warn(`⚠️ Markdown directory not found: ${docsDir}, creating empty manifest`);
      return { manifest: [], content: {}, processedCount: 0, errorCount: 0 };
    }

    console.info(`➡️  Preparing markdown processing for ${contentPath}`);

    const manifest: MarkdownMeta[] = [];
    const content: Record<string, any> = {};
    let processedCount = 0;
    let errorCount = 0;

    async function scanDirectory(dir: string, relativePath = ''): Promise<void> {
      const entries = await readdir(dir, { withFileTypes: true });
      const fileProcessingPromises: Promise<void>[] = [];

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        const relativeEntryPath = relativePath ? path.join(relativePath, entry.name) : entry.name;

        if (entry.isDirectory()) {
          await scanDirectory(fullPath, relativeEntryPath);
        } else if (entry.isFile() && entry.name.endsWith(fileExtension)) {
          const fileName = entry.name.replace(fileExtension, '');
          const slug = relativePath ? `${relativePath}/${fileName}` : fileName;

          const processingPromise = (async () => {
            try {
              const source = await readFile(fullPath, 'utf8');
              const { data: frontmatter } = parseFrontmatter(source);
              const { content: processedContent, error } = await processMarkdownFile(fullPath, purifyHtml, highlighter);

              if (error) {
                console.error(`❌ Error processing ${slug}: ${error}`);
                errorCount++;
              } else {
                processedCount++;
              }

              const frontmatterObj = frontmatter && typeof frontmatter === 'object' ? frontmatter : {};
              manifest.push({ slug, path: relativeEntryPath, folder: relativePath || undefined, ...frontmatterObj });

              content[slug] = { frontmatter, content: processedContent };
            } catch (error) {
              console.error(`❌ Error processing ${slug}:`, error instanceof Error ? error.message : String(error));
              errorCount++;
            }
          })();

          fileProcessingPromises.push(processingPromise);
        }
      }

      // Wait for all file processing in this directory to complete
      await Promise.all(fileProcessingPromises);
    }

    await scanDirectory(docsDir);
    const sortedManifest = sortManifest(manifest);

    if (processedCount > 0) {
      console.info(`✅ Processed ${processedCount} markdown files.`);
    }
    if (errorCount > 0) {
      console.error(`❌ ${errorCount} files had processing errors.`);
    }

    return { manifest: sortedManifest, content, processedCount, errorCount };
  }

  return {
    name: 'markdown-builder',
    async buildStart() {
      const result = await generateData();
      docsData = { manifest: result.manifest, content: result.content };
    },
    resolveId(id) {
      if (id === virtualManifestId) {
        return resolvedManifestId;
      }
      if (id === virtualDocsId) {
        return resolvedDocsId;
      }
    },
    load(id) {
      if (id === resolvedManifestId) {
        return `export const DOCS_MANIFEST = ${JSON.stringify(docsData.manifest)};\nexport default DOCS_MANIFEST;`;
      }
      if (id === resolvedDocsId) {
        return `export const DOCS_CONTENT = ${JSON.stringify(docsData.content)};\nexport default DOCS_CONTENT;`;
      }
    },
    async handleHotUpdate({ file, server }) {
      if (file.includes(contentPath) && file.endsWith(fileExtension)) {
        const result = await generateData();
        docsData = { manifest: result.manifest, content: result.content };

        // Invalidate modules
        const manifestModule = server.moduleGraph.getModuleById(resolvedManifestId);
        if (manifestModule) {
          server.reloadModule(manifestModule);
        }

        const docsModule = server.moduleGraph.getModuleById(resolvedDocsId);
        if (docsModule) {
          server.reloadModule(docsModule);
        }
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
        frontmatter[key] = new Date(cleanValue).toISOString();
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

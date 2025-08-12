// Central configuration for asset prefixes - change these to modify where markdown assets are stored/fetched
export const ASSET_PREFIX = {
  build: '/assets/docs',  // Where assets are written during build (relative to /public)
  fetch: '/assets/docs'   // URL prefix for fetching assets at runtime
};

export interface Frontmatter {
  title?: string;
  description?: string;
  date?: string;
  tags?: string[];
  [key: string]: string | number | boolean | string[] | undefined;
}

export interface MarkdownMeta {
  slug: string;
  path: string;
  title?: string;
  description?: string;
  date?: string;
  folder?: string;
  // Build metadata for caching
  _mtime?: number;
  _size?: number;
  [key: string]: any;
}

export interface SyntaxHighlighter {
  highlight(code: string, language: string): Promise<string> | string;
}

export interface ShikiConfig {
  langs?: string[];
  themes?: string[];
  defaultTheme?: string;
}


export interface MarkdownContent {
  frontmatter: Frontmatter;
  content: string;
}

export interface FolderManifest {
  folder: string;
  files: MarkdownMeta[];
  _lastModified: number;
}

export interface GlobalManifest {
  documents: MarkdownMeta[];
  chunkedFolders?: string[];  // List of folders that have separate content chunks
  _buildMode: 'single' | 'chunked';
}

export interface FolderContentChunk {
  [slug: string]: MarkdownContent;
}

export interface ProcessingResult {
  manifest: MarkdownMeta[];
  content: Record<string, any>;
  processedCount: number;
  errorCount: number;
}

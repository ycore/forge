// Consolidated type definitions for markdown system
import type { ThemeContext } from '@ycore/componentry/impetus';
import type { unstable_RouterContextProvider } from 'react-router';

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

export interface MarkdownContent {
  frontmatter: Frontmatter;
  content: string;
}

export interface MarkdownPageProps {
  loaderData: EnhancedMarkdownMeta[];
  spriteUrl: string;
  themeContext?: ThemeContext;
  context?: any;
}

export interface MarkdownProps {
  children: string;
  className?: string;
}

export interface EnhancedMarkdownMeta extends MarkdownMeta {
  formattedDate?: string;
}

export interface DocContent {
  content: string;
  frontmatter: Record<string, any>;
  slug: string;
}

export interface SyntaxHighlighter {
  highlight(code: string, language: string): Promise<string> | string;
}

export interface ShikiConfig {
  langs?: string[];
  themes?: string[];
  defaultTheme?: string;
}

export interface FolderContentChunk {
  [slug: string]: MarkdownContent;
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

export interface ProcessingResult {
  manifest: MarkdownMeta[];
  content: Record<string, any>;
  processedCount: number;
  errorCount: number;
}

export interface FileMetadata {
  mtime: number;
  size: number;
}

export interface MarkdownBuilderOptions {
  source: string;
  extension?: string;
  prefix?: string;
  updateDate?: boolean;
  purifyHtml?: boolean;
  syntaxHighlighter?: SyntaxHighlighter | null;
  shikiConfig?: ShikiConfig;
  chunkByFolder?: boolean;
  incrementalByFolder?: boolean;
  compress?: boolean; // Enable gzip compression for content files
}

export type CompressionHeaders = Record<string, string>;

export interface ServeOptions {
  maxAge?: number; // Cache max-age in seconds
  prefix?: string; // File prefix (default: 'markdown')
  acceptEncoding?: string; // From request headers
}

export interface MarkdownLoaderArgs {
  request: Request;
  context?: unstable_RouterContextProvider;
}

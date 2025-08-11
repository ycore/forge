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


export interface ProcessingResult {
  manifest: MarkdownMeta[];
  content: Record<string, any>;
  processedCount: number;
  errorCount: number;
}

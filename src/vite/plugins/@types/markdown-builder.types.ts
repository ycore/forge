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

export interface MarkdownBuilderOptions {
  /** Path to the markdown files directory (relative to cwd) */
  contentPath: string;
  /** File extension to look for (e.g., '.md', '.mdx') */
  fileExtension: string;
  /** Virtual module ID for the manifest */
  manifestId?: string;
  /** Virtual module ID for the content */
  contentId?: string;
  /** Whether to purify HTML content (default: true) */
  purifyHtml?: boolean;
  /** Syntax highlighter to use (default: Shiki, null = no highlighting) */
  syntaxHighlighter?: SyntaxHighlighter | null;
  /** Configuration for the default Shiki highlighter */
  shikiConfig?: ShikiConfig;
}

export interface ProcessingResult {
  manifest: MarkdownMeta[];
  content: Record<string, any>;
  processedCount: number;
  errorCount: number;
}

import type { ThemeContext } from '@ycore/componentry/impetus';
import type { MarkdownMeta } from '../markdown/markdown-loader';

export interface DocContent {
  content: string;
  frontmatter: Record<string, any>;
  slug: string;
}

export interface EnhancedMarkdownMeta extends MarkdownMeta {
  formattedDate?: string;
}

export interface ComponentProps {
  loaderData: EnhancedMarkdownMeta[];
  spriteUrl: string;
  themeContext?: ThemeContext;
}

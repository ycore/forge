interface MarkdownProps {
  children: string;
  className?: string;
}

export interface MarkdownContent {
  frontmatter: Record<string, any>;
  content: string;
}

export interface MarkdownMeta {
  slug: string;
  title?: string;
  description?: string;
  date?: string;
  [key: string]: any;
}

export function Markdown({ children, className = '' }: MarkdownProps) {
  if (!children || typeof children !== 'string') {
    return <div className={className} />;
  }

  // biome-ignore lint/security/noDangerouslySetInnerHtml: Content is pre-sanitized at build time
  return <div className={className} dangerouslySetInnerHTML={{ __html: children }} />;
}

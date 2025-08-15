import type { MarkdownProps } from "../@types/markdown.types";

export function Markdown({ children, className = '' }: MarkdownProps) {
  if (!children || typeof children !== 'string') {
    return <div className={className} />;
  }

  // biome-ignore lint/security/noDangerouslySetInnerHtml: Content is pre-sanitized at build time
  return <div className={className} dangerouslySetInnerHTML={{ __html: children }} />;
}

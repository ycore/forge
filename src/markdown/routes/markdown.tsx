/** biome-ignore-all lint/a11y/noSvgWithoutTitle: acceptable */
import { createSpriteIcon } from '@ycore/componentry/images';
import { LoadingBar, THEME_OPTIONS, ThemeSwitch } from '@ycore/componentry/impetus';
import type { IconName } from '@ycore/componentry/shadcn-ui';
import svgSpriteUrl from '@ycore/componentry/shadcn-ui/assets/lucide-sprites.svg?url';
import clsx from 'clsx';
import { memo, useCallback, useEffect, useState } from 'react';
import { useFetcher, useLocation } from 'react-router';
import { getMarkdownManifest } from '../markdown-data';
import type { MarkdownMeta } from '../markdown-loader';
import { Markdown } from '../markdown-loader';

const SpriteIcon = createSpriteIcon<IconName>(svgSpriteUrl);

// Type definitions
interface DocContent {
  content: string;
  frontmatter: Record<string, any>;
  slug: string;
}

interface EnhancedMarkdownMeta extends MarkdownMeta {
  formattedDate?: string;
}

// Type guard
const isDocContent = (data: unknown): data is DocContent => {
  return typeof data === 'object' && data !== null && 'content' in data && 'frontmatter' in data && 'slug' in data;
};

export const routesTemplate = {
  docs: (slug: string) => `/docs#${slug}`,
  docsApi: (slug: string) => `/docs/${slug}?api`,
};

// Loader that returns the manifest data as-is
export async function loader({ request }: { request: Request }): Promise<EnhancedMarkdownMeta[]> {
  const manifest = await getMarkdownManifest(request);
  return manifest as EnhancedMarkdownMeta[];
}

interface ComponentProps {
  loaderData: EnhancedMarkdownMeta[];
}

export default function MarkdownPage({ loaderData }: ComponentProps) {
  const docs = loaderData;
  const location = useLocation();
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const fetcher = useFetcher();

  const handleDocSelect = useCallback(
    (slug: string) => {
      if (selectedDoc === slug) return;
      setSelectedDoc(slug);
      setError(null);
      fetcher.load(routesTemplate.docsApi(slug));
      window.history.replaceState(null, '', routesTemplate.docs(slug));
    },
    [fetcher.load, selectedDoc]
  );

  // Initialize from URL hash on mount only
  useEffect(() => {
    const hash = location.hash.slice(1);
    if (hash && docs.find((doc: EnhancedMarkdownMeta) => doc.slug === hash) && !selectedDoc) {
      setSelectedDoc(hash);
      fetcher.load(routesTemplate.docsApi(hash));
    }
  }, [docs, fetcher.load, selectedDoc, location.hash.slice]);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.slice(1);
      if (hash && docs.find((doc: EnhancedMarkdownMeta) => doc.slug === hash)) {
        setSelectedDoc(hash);
        setError(null);
        fetcher.load(routesTemplate.docsApi(hash));
      } else {
        setSelectedDoc(null);
        setError(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [docs, fetcher.load]);

  // Handle fetch errors
  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data && !isDocContent(fetcher.data)) {
      setError('Failed to load document');
    }
  }, [fetcher.state, fetcher.data]);

  const currentDoc = isDocContent(fetcher.data) ? fetcher.data : undefined;

  return (
    <div className="min-h-screen bg-white transition-colors dark:bg-gray-900">
      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 top-0 left-0 z-20 overflow-y-auto border-gray-200 border-r bg-white transition-transform duration-300 dark:border-gray-800 dark:bg-gray-900 ${sidebarCollapsed ? '-translate-x-full' : 'translate-x-0'} w-80`}
        >
          <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900 text-lg dark:text-white">Documentation</h2>
              <div>
                <button type="button" onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="rounded-md p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                  <SpriteIcon id="ChevronLeft" className="h-5 w-5" />
                </button>
              </div>
            </div>
            <nav className="space-y-1" aria-label="Documentation navigation">
              {docs.length === 0 ? <DocListEmpty /> : <DocList docs={docs} selectedDoc={selectedDoc} onDocSelect={handleDocSelect} />}
            </nav>
            <div className="fixed right-4 bottom-4 z-10">
              <ThemeSwitch theme={THEME_OPTIONS} className="size-3" classTheme="size-3" />
            </div>
          </div>
        </aside>

        {/* Sidebar toggle button - visible when sidebar is collapsed */}
        <button
          type="button"
          onClick={() => setSidebarCollapsed(false)}
          className={`fixed top-4 left-4 z-30 rounded-md border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-opacity duration-300 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:text-gray-200 ${sidebarCollapsed ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        >
          <SpriteIcon id="EllipsisVertical" className="h-5 w-5" />
        </button>

        {/* Main content */}
        <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'pl-0' : 'pl-64'}`}>
          <div className="mx-auto max-w-4xl">
            {!selectedDoc ? (
              <div className="flex h-96 items-center justify-center">
                <div className="text-center">
                  <div className="mb-4 text-gray-400 dark:text-gray-500">
                    <SpriteIcon id="CircleAlert" className="h-8 w-8" />
                  </div>
                  <h3 className="mb-2 font-medium text-gray-900 text-lg dark:text-white">Select a document</h3>
                  <p className="text-gray-500 dark:text-gray-400">Choose a document from the sidebar to view its content.</p>
                </div>
              </div>
            ) : fetcher.state === 'loading' ? (
              <LoadingBar />
            ) : error ? (
              <DocumentNotFound />
            ) : currentDoc ? (
              <article className="markdown-content px-8 py-12">
                <DocumentHeader frontmatter={currentDoc.frontmatter} />
                <Markdown className="max-w-none">{currentDoc.content}</Markdown>
              </article>
            ) : (
              <DocumentNotFound />
            )}
          </div>
        </main>
      </div >
    </div >
  )
}

const DocListEmpty = () => {
  return <p className="text-gray-500 text-sm dark:text-gray-400">No documentation found.</p>;
};

// Memoized components
// const LoadingBar = memo(() => <div className="loading-bar" />);

const DocumentNotFound = memo(() => (
  <div className="flex h-96 items-center justify-center">
    <div className="text-center">
      <div className="mb-4 text-red-400 dark:text-red-500">
        <SpriteIcon id="CircleAlert" className="mx-auto h-8 w-8" />
      </div>
      <h3 className="mb-2 font-medium text-gray-900 text-lg dark:text-white">Document not found</h3>
      <p className="text-gray-500 dark:text-gray-400">The selected document could not be loaded.</p>
    </div>
  </div>
));

const DocumentHeader = memo(({ frontmatter }: { frontmatter: Record<string, any> }) => (
  <header className="mb-8">
    {frontmatter.title && <h1 className="mb-4 font-bold font-serif text-3xl text-gray-900 dark:text-white">{frontmatter.title}</h1>}
    {frontmatter.description && <p className="mb-4 font-serif text-gray-600 text-lg dark:text-gray-300">{frontmatter.description}</p>}
    {(frontmatter.formattedDate || frontmatter.version) && (
      <div className="flex items-center justify-between text-gray-500 text-sm dark:text-gray-400">
        {frontmatter.formattedDate && (
          <time className="font-sans" dateTime={frontmatter.date}>
            {frontmatter.formattedDate}
          </time>
        )}
        {frontmatter.version && <span className="px-2 py-1 font-mono text-gray-300 text-xs italic dark:text-gray-600">{frontmatter.version}</span>}
      </div>
    )}
  </header>
));

const DocList = memo(({ docs, selectedDoc, onDocSelect }: { docs: EnhancedMarkdownMeta[]; selectedDoc: string | null; onDocSelect: (slug: string) => void }) => {
  // Group documents by folder and track which is first in each folder
  const groupedDocs = useCallback(() => {
    const groups: { [folder: string]: EnhancedMarkdownMeta[] } = {};

    for (const doc of docs) {
      const folder = doc.folder || '';
      if (!groups[folder]) {
        groups[folder] = [];
      }
      groups[folder].push(doc);
    }

    return groups;
  }, [docs]);

  const groups = groupedDocs();

  return (
    <div className="space-y-1">
      {Object.entries(groups).map(([folder, folderDocs]) => {
        const isRootLevel = folder === '';
        const folderId = `folder-${folder.replace(/[^a-zA-Z0-9]/g, '-')}`;

        return (
          <div key={folder || 'root'}>
            {!isRootLevel && (
              <div className="relative">
                <input type="checkbox" id={folderId} className="peer hidden" defaultChecked={true} />
                <label htmlFor={folderId} className="flex w-full cursor-pointer items-center px-3 py-2 text-left text-gray-600 text-sm transition-colors hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/50">
                  <SpriteIcon id="ChevronRight" className="mr-2 h-3 w-3 transition-transform duration-200 peer-checked:rotate-90" />
                  <span className="font-medium capitalize">{folder}</span>
                </label>

                <div className="ml-6 max-h-0 space-y-0.5 overflow-hidden transition-all duration-300 peer-checked:max-h-96">
                  {folderDocs.map(doc => (
                    <button
                      key={doc.slug}
                      type="button"
                      onClick={() => onDocSelect(doc.slug)}
                      className={clsx(
                        'w-full px-3 py-2 text-left text-sm transition-colors focus:outline-none',
                        selectedDoc === doc.slug
                          ? 'border-blue-500 border-r-2 bg-blue-50 text-blue-900 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-100'
                          : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/50'
                      )}
                    >
                      <div className="flex items-center">
                        <div className="flex-1">
                          <div className="font-medium">{doc.title || doc.slug}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isRootLevel && (
              <div className="space-y-0.5">
                {folderDocs.map(doc => (
                  <button
                    key={doc.slug}
                    type="button"
                    onClick={() => onDocSelect(doc.slug)}
                    className={clsx(
                      'w-full px-3 py-2 text-left text-sm transition-colors focus:outline-none',
                      selectedDoc === doc.slug
                        ? 'border-blue-500 border-r-2 bg-blue-50 text-blue-900 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-100'
                        : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/50'
                    )}
                  >
                    <div className="font-medium">{doc.title || doc.slug}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
});

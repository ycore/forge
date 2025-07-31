import type { Plugin } from 'vite';

import type { WorkspaceResolverOptions } from '../@types/workspace-resolver.types';

export function workspaceResolver(options: WorkspaceResolverOptions): Plugin {
  const { prefix, workspacePath } = options;

  return {
    name: 'workspace-resolver',
    resolveId(id) {
      if (id.startsWith(prefix)) {
        const [_scope, pkg, ...subpath] = id.split('/');
        const resolvedPath = workspacePath.replace(':PKG:', pkg || '').replace(':SUBPATH:', subpath.join('/') || '');
        return resolvedPath;
      }
    },
  };
}

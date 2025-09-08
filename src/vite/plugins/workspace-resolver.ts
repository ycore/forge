import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import type { Plugin } from 'vite';

import type { WorkspaceResolverOptions } from '../@types/workspace-resolver.types';

export function workspaceResolver(options: WorkspaceResolverOptions = {}): Plugin {
  // Auto-derive workspace root - look for workspaces directory in current or parent directories
  const findWorkspaceRoot = (): string => {
    let cwd = process.cwd();

    // Check current directory and parents for workspaces folder
    while (cwd !== '/') {
      const workspacesPath = join(cwd, 'workspaces');
      try {
        if (statSync(workspacesPath).isDirectory()) {
          return workspacesPath;
        }
      } catch {}
      cwd = resolve(cwd, '..');
    }

    // Fallback to conventional path from cwd
    return join(process.cwd(), 'workspaces');
  };

  const defaultWorkspaceRoot = findWorkspaceRoot();
  const defaultWorkspacePath = join(defaultWorkspaceRoot, ':PKG:/src/:SUBPATH:');

  const { workspacePath = defaultWorkspacePath, exclude = true, workspaceDirs } = options;

  const workspaceRoot = workspacePath.replace('/:PKG:/src/:SUBPATH:', '');

  // Auto-derive prefix by scanning workspace packages
  let prefix = options.prefix;
  if (!prefix) {
    prefix = derivePrefix();
  }
  const packageCache = new Map<string, { exports?: Record<string, unknown>; [key: string]: unknown }>();
  const discoveredWorkspacePackages = new Set<string>();

  function getPackageExports(pkgName: string) {
    if (packageCache.has(pkgName)) {
      return packageCache.get(pkgName);
    }

    try {
      const packageJsonPath = join(workspaceRoot, pkgName, 'package.json');
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
      const exports = packageJson.exports || {};
      packageCache.set(pkgName, exports);
      return exports;
    } catch (_e) {
      packageCache.set(pkgName, {});
      return {};
    }
  }

  function derivePrefix(): string {
    try {
      const discoveredDirs = getWorkspaceDirs();
      for (const dir of discoveredDirs) {
        try {
          const packageJsonPath = join(workspaceRoot, dir, 'package.json');
          const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
          if (packageJson.name?.includes('/')) {
            const scope = packageJson.name.split('/')[0];
            return `${scope}/`;
          }
        } catch {}
      }
    } catch {
      // Fallback to common default
    }
    return '@workspace/';
  }

  function getWorkspaceDirs(): string[] {
    if (workspaceDirs) {
      return workspaceDirs;
    }

    try {
      // Auto-discover workspace directories
      const entries = readdirSync(workspaceRoot);
      return entries.filter(entry => {
        try {
          const fullPath = join(workspaceRoot, entry);
          const stat = statSync(fullPath);
          if (!stat.isDirectory()) return false;

          // Check if directory contains package.json
          const packageJsonPath = join(fullPath, 'package.json');
          return statSync(packageJsonPath).isFile();
        } catch {
          return false;
        }
      });
    } catch {
      return [];
    }
  }

  function discoverWorkspacePackages() {
    const workspacePackages: string[] = [];

    try {
      const discoveredWorkspaceDirs = getWorkspaceDirs();

      for (const dir of discoveredWorkspaceDirs) {
        try {
          const packageJsonPath = join(workspaceRoot, dir, 'package.json');
          const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
          if (packageJson.name?.startsWith(prefix?.replace(/\/$/, ''))) {
            const exports = packageJson.exports || {};

            // Add main package
            workspacePackages.push(packageJson.name);

            // Add all sub-exports
            for (const exportKey of Object.keys(exports)) {
              if (exportKey !== './package.json' && exportKey !== '.') {
                const fullExportName = `${packageJson.name}${exportKey.replace('.', '')}`;
                workspacePackages.push(fullExportName);
              }
            }
          }
        } catch (_e) {
          // Skip if package.json doesn't exist or is invalid
        }
      }
    } catch (_e) {
      // Fallback to empty array if discovery fails
    }

    return workspacePackages;
  }

  return {
    name: 'workspace-resolver',

    configResolved(config) {
      if (exclude) {
        const workspacePackages = discoverWorkspacePackages();

        // Ensure optimizeDeps.exclude exists
        if (!config.optimizeDeps) {
          // biome-ignore lint/suspicious/noExplicitAny: acceptable
          (config as any).optimizeDeps = {};
        }
        if (!config.optimizeDeps.exclude) {
          config.optimizeDeps.exclude = [];
        }

        // Add workspace packages to exclude list
        for (const pkg of workspacePackages) {
          if (!config.optimizeDeps.exclude.includes(pkg)) {
            config.optimizeDeps.exclude.push(pkg);
          }
        }

        console.log(`[workspace-resolver] Auto-excluded ${workspacePackages.length} workspace packages from optimization`);
      }
    },

    resolveId(id) {
      if (id.startsWith(prefix)) {
        try {
          const [_scope, pkg = '', ...subpath] = id.split('/');
          discoveredWorkspacePackages.add(`${prefix.replace(/\/$/, '')}/${pkg}`);

          const packageExports = getPackageExports(pkg);

          // Reconstruct the export key
          const exportKey = subpath.length > 0 ? `./${subpath.join('/')}` : '.';

          // Check if this exact export exists
          if (packageExports[exportKey]) {
            const exportValue = packageExports[exportKey];
            let sourcePath: string | undefined;

            if (typeof exportValue === 'string') {
              sourcePath = exportValue;
            } else if (typeof exportValue === 'object' && exportValue && 'default' in exportValue) {
              sourcePath = exportValue.default;
            }

            if (sourcePath?.startsWith('./src/')) {
              const resolvedPath = resolve(workspaceRoot, pkg, sourcePath.replace('./', ''));
              // Verify the resolved path exists before returning
              try {
                statSync(resolvedPath);
                return resolvedPath;
              } catch {
                // Fall through to fallback resolution
              }
            }
          }

          // Fallback to basic path resolution for files not in exports
          const fallbackPath = join(workspaceRoot, pkg, 'src', subpath.join('/'));

          // If no subpath, try to find index file
          if (subpath.length === 0) {
            return `${fallbackPath}/index.ts`;
          }

          return fallbackPath;
        } catch (error) {
          // Log error but don't throw - let Vite handle the resolution failure
          console.warn(`[workspace-resolver] Failed to resolve ${id}:`, error);
          return null;
        }
      }
    },
  };
}

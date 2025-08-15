// src/vite/plugins/workspace-resolver.ts
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
function workspaceResolver(options = {}) {
  const findWorkspaceRoot = () => {
    let cwd = process.cwd();
    while (cwd !== "/") {
      const workspacesPath = join(cwd, "workspaces");
      try {
        if (statSync(workspacesPath).isDirectory()) {
          return workspacesPath;
        }
      } catch {}
      cwd = resolve(cwd, "..");
    }
    return join(process.cwd(), "workspaces");
  };
  const defaultWorkspaceRoot = findWorkspaceRoot();
  const defaultWorkspacePath = join(defaultWorkspaceRoot, ":PKG:/src/:SUBPATH:");
  const { workspacePath = defaultWorkspacePath, exclude = true, workspaceDirs } = options;
  const workspaceRoot = workspacePath.replace("/:PKG:/src/:SUBPATH:", "");
  let prefix = options.prefix;
  if (!prefix) {
    prefix = derivePrefix();
  }
  const packageCache = new Map;
  const discoveredWorkspacePackages = new Set;
  function getPackageExports(pkgName) {
    if (packageCache.has(pkgName)) {
      return packageCache.get(pkgName);
    }
    try {
      const packageJsonPath = join(workspaceRoot, pkgName, "package.json");
      const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
      const exports = packageJson.exports || {};
      packageCache.set(pkgName, exports);
      return exports;
    } catch (e) {
      packageCache.set(pkgName, {});
      return {};
    }
  }
  function derivePrefix() {
    try {
      const discoveredDirs = getWorkspaceDirs();
      for (const dir of discoveredDirs) {
        try {
          const packageJsonPath = join(workspaceRoot, dir, "package.json");
          const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
          if (packageJson.name?.includes("/")) {
            const scope = packageJson.name.split("/")[0];
            return `${scope}/`;
          }
        } catch {}
      }
    } catch {}
    return "@workspace/";
  }
  function getWorkspaceDirs() {
    if (workspaceDirs) {
      return workspaceDirs;
    }
    try {
      const entries = readdirSync(workspaceRoot);
      return entries.filter((entry) => {
        try {
          const fullPath = join(workspaceRoot, entry);
          const stat = statSync(fullPath);
          if (!stat.isDirectory())
            return false;
          const packageJsonPath = join(fullPath, "package.json");
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
    const workspacePackages = [];
    try {
      const discoveredWorkspaceDirs = getWorkspaceDirs();
      for (const dir of discoveredWorkspaceDirs) {
        try {
          const packageJsonPath = join(workspaceRoot, dir, "package.json");
          const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
          if (packageJson.name?.startsWith(prefix?.replace(/\/$/, ""))) {
            const exports = packageJson.exports || {};
            workspacePackages.push(packageJson.name);
            for (const exportKey of Object.keys(exports)) {
              if (exportKey !== "./package.json" && exportKey !== ".") {
                const fullExportName = `${packageJson.name}${exportKey.replace(".", "")}`;
                workspacePackages.push(fullExportName);
              }
            }
          }
        } catch (e) {}
      }
    } catch (e) {}
    return workspacePackages;
  }
  return {
    name: "workspace-resolver",
    configResolved(config) {
      if (exclude) {
        const workspacePackages = discoverWorkspacePackages();
        if (!config.optimizeDeps) {
          config.optimizeDeps = {};
        }
        if (!config.optimizeDeps.exclude) {
          config.optimizeDeps.exclude = [];
        }
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
          const [_scope, pkg = "", ...subpath] = id.split("/");
          discoveredWorkspacePackages.add(`${prefix.replace(/\/$/, "")}/${pkg}`);
          const packageExports = getPackageExports(pkg);
          const exportKey = subpath.length > 0 ? `./${subpath.join("/")}` : ".";
          if (packageExports[exportKey]) {
            const exportValue = packageExports[exportKey];
            let sourcePath;
            if (typeof exportValue === "string") {
              sourcePath = exportValue;
            } else if (typeof exportValue === "object" && exportValue && "default" in exportValue) {
              sourcePath = exportValue.default;
            }
            if (sourcePath?.startsWith("./src/")) {
              const resolvedPath = resolve(workspaceRoot, pkg, sourcePath.replace("./", ""));
              try {
                statSync(resolvedPath);
                return resolvedPath;
              } catch {}
            }
          }
          const fallbackPath = join(workspaceRoot, pkg, "src", subpath.join("/"));
          if (subpath.length === 0) {
            return `${fallbackPath}/index.ts`;
          }
          return fallbackPath;
        } catch (error) {
          console.warn(`[workspace-resolver] Failed to resolve ${id}:`, error);
          return null;
        }
      }
    }
  };
}
export {
  workspaceResolver
};

//# debugId=1E3EC77CABD90ACE64756E2164756E21

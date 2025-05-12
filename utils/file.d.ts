/**
 * Converts a file URL to its base directory path.
 *
 * @remarks
 * This function takes a file URL (either from `import.meta.url` in development or a worker URL in production)
 * and returns the directory path without the filename. It handles both file system paths and web URLs.
 *
 * @param fileurl - The file URL to convert. This could be:
 *   - A local file URL (e.g., 'file:///path/to/node_modules/@ycore/foundry/auth/routes.ts')
 *   - A production worker URL (e.g., 'https://your-worker.your-account.workers.dev/node_modules/@ycore/foundry/auth/routes.ts')
 *
 * @returns The base directory path from the URL with the filename removed.
 *   For the above examples, it would return:
 *   - '/path/to/node_modules/@ycore/foundry/auth'
 *   - '/node_modules/@ycore/foundry/auth'
 *
 * @example
 * ```typescript
 * // Development environment
 * const devPath = basePath('file:///project/node_modules/module/file.ts');
 * // Returns: '/project/node_modules/module'
 *
 * // Production environment
 * const prodPath = basePath('https://worker.dev/node_modules/module/file.ts');
 * // Returns: '/node_modules/module'
 * ```
 */
export declare const basePath: (fileurl: string) => string;
//# sourceMappingURL=file.d.ts.map
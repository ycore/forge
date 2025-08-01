import { defineConfig } from 'vite'
import { resolve } from 'path'

// Specific configuration for Node.js-only code (Vite plugins)
export default defineConfig({
  build: {
    lib: {
      entry: {
        'vite/plugins/index': resolve(__dirname, 'src/vite/plugins/index.ts'),
      },
      formats: ['es'],
      fileName: (format, entryName) => `${entryName}.js`
    },
    rollupOptions: {
      external: [
        // Node.js built-ins
        'node:fs',
        'node:path',
        'node:util',
        'node:process',
        'node:url',
        'fs',
        'path',
        'util',
        'process',
        'url',
        // Node.js packages
        'vite',
        'marked',
        'shiki',
        'node-html-parser',
        'isomorphic-dompurify'
      ]
    },
    target: 'node18',
    assetsDir: 'assets',
    sourcemap: true,
    outDir: 'dist'
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
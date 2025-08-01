import { defineConfig } from 'vite'
import { resolve } from 'path'
import { markdownBuilder } from './src/vite/plugins'

export default defineConfig({
  plugins: [
    markdownBuilder({
      'contentPath': 'src/markdown/content',
      'fileExtension': '.md'
})
  ],
  build: {
    lib: {
      entry: {
        'adapters/cloudflare': resolve(__dirname, 'src/adapters/cloudflare/index.ts'),
        'markdown': resolve(__dirname, 'src/markdown/index.ts')
      },
      formats: ['es'],
      fileName: (format, entryName) => `${entryName}.js`
    },
    rollupOptions: {
      external: [
        'clsx',
        'react',
        'react-dom',
        'react-router',
        '@ycore/componentry/images',
        '@ycore/componentry/impetus',
        '@ycore/componentry/shadcn-ui',
        '@ycore/componentry/shadcn-ui/assets/lucide-sprites.svg?url',
        'node:child_process',
        'node:fs',
        'node:path',
        'node:process',
        'node:url'
      ],
      output: {
        assetFileNames: "[name].[ext]"
      }
    },
    assetsDir: 'assets',
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    sourcemap: true,
    outDir: 'dist'
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
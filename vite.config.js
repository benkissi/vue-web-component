import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // treat all tags with a dash as custom elements
          isCustomElement: (tag) => tag.includes('-')
        }
      }
    }),
    VueDevTools()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    lib: {
      entry: './src/main.js',
      formats: ['es', 'cjs'],
      name: 'web-component',
      fileName: (format) => (format === 'es' ? 'test.js' : 'test.cjs')
    },
    sourcemap: true,
    target: 'esnext',
    minify: false
  },
  define: {
    'process.env': process.env
  }
})

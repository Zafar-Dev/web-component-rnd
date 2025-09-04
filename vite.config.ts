import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ['src/**/*'],
      exclude: ['src/App.tsx', 'src/App.css', 'src/main.tsx', 'src/**/*.test.*', 'src/**/*.d.ts'],
      outDir: 'dist'
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ReactWebComponentWidget',
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'umd.cjs'}`
    },
    rollupOptions: {
      // Remove external dependencies to bundle React with the component
      // This ensures the component works regardless of the host app's React version
      external: [],
      output: {
        // No need for globals since we're bundling React
        globals: {}
      }
    },
    // Increase chunk size warning limit since we're bundling React
    chunkSizeWarningLimit: 1000
  }
})

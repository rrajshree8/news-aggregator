import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'process.env.VITE_NEWSAPI_KEY': JSON.stringify(process.env.VITE_NEWSAPI_KEY),
    'import.meta.env.VITE_NEWSAPI_KEY': JSON.stringify(process.env.VITE_NEWSAPI_KEY),
  },
  envPrefix: 'VITE_',
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})
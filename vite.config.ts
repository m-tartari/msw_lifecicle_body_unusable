import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteTsconfigPaths(),
    svgr({
      include: '**/*.svg?react',
    }),
  ],
  build: {
    outDir: 'build',
  },
  server: {
    open: true,
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/linfa': {
        target: 'http://0.0.0.0:5003',
        changeOrigin: true,
        secure: false,
        // ws: true,
      },
    },
  },
})

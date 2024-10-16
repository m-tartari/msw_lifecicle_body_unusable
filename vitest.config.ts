import { defineConfig } from 'vitest/config'
import config from './vite.config.js'

export default defineConfig({
  ...config,
  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      provider: 'istanbul',
      include: ['src'],
      exclude: [
        './**/*.d.ts',
        './src/*.ts',
        './**/mocks/*.*',
        './**/{m,M}ock*.*',
        './**/*.test.tsx',
        './**/*.stories.*',
      ],
    },
  },
})

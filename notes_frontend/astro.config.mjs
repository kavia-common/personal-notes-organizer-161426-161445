 /* @ts-check */
import { defineConfig } from 'astro/config';

/**
 * Astro configuration for the Notes frontend.
 * - Server binding for containerized environments
 * - CORS headers for local development
 * - Static output to avoid server adapter requirement in CI
 */
export default defineConfig({
  server: {
    host: '0.0.0.0',
    allowedHosts: ['.kavia.ai'],
    port: 3000,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  output: 'static',
  vite: {
    optimizeDeps: {
      // Do not prebundle certain optional deps; shims or code paths handle absence
      exclude: ['zustand', 'dayjs'],
    },
    build: {
      rollupOptions: {
        // In case rollup tries to resolve it during SSR phase
        external: ['zustand', 'dayjs'],
      },
    },
  },
});

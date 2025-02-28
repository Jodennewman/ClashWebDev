import { defineConfig } from "vite";

import { assetpackPlugin } from "./scripts/assetpack-vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [assetpackPlugin()],
  server: {
    port: 8080,
    open: true,
    hmr: true,
    cors: true
  },
  optimizeDeps: {
    exclude: ['@assetpack/core']
  },
  build: {
    sourcemap: true,
    minify: 'terser',
    cssMinify: true,
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'src/main.ts',
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
        format: 'es'
      }
    }
  },
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
  base: './',
  // Prevent Vite from rewriting asset URLs
  experimental: {
    renderBuiltUrl: (filename, { hostType }) => {
      // Keep original URLs for assets in the public directory
      if (filename.includes('public/')) {
        return filename;
      }
      return { relative: true };
    }
  },
});

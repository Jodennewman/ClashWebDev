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
  build: {
    sourcemap: true,
    minify: 'terser',
    cssMinify: true,
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html',
        vs: './src/vertical-shortcut/index.html'
      },
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]'
      },
      external: ['@node-rs/crc32-wasm32-wasi', 'fsevents']
    }
  },
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
  base: './',
  optimizeDeps: {
    include: [
      'matter-js',
      'hsl-to-hex',
      '@assetpack/core',
      'gsap',
      'gsap/ScrollTrigger',
      'gsap/DrawSVGPlugin',
      'gsap/SplitText',
      'gsap/MotionPathPlugin',
      'gsap/Physics2DPlugin',
      'gsap/ScrollSmoother',
      'gsap/Flip',
      'gsap/CustomEase',
      'gsap/EasePack',
      'gsap/PixiPlugin',
      'gsap/all'
    ],
    exclude: [
      '@node-rs/crc32-wasm32-wasi',
      'fsevents'
    ]
  },
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

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
  plugins: [
    vue(),
    svgLoader(),
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {},
        javascriptEnabled: true,
      },
      scss: {
        additionalData: `
          @import "@/styles/_variables.scss";
        `,
      },
    }
  },
  server: {
    port: 9999,
    host: true,
  },
  build: {
    minify: true,
    rollupOptions: {
      output: {
        chunkFileNames: 'en/app/js/[name].js',
        entryFileNames: 'en/app/js/[name].js',
        assetFileNames: 'en/app/[ext]/[name].[ext]',
      },
    },
  },
  esbuild: {
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : undefined,
    keepNames: true,
  },
})

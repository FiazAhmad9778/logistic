import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  build: {
    rollupOptions: {
      output: {
        // Enable hashing for generated files
        entryFileNames: '[name]-[hash].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash][extname]',
      },
    },
  },
  optimizeDeps: {
    include: ['esm-dep > cjs-dep'],
  },
});

import { copyFileSync } from 'node:fs';
import { join } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/react-hooks/',
  plugins: [
    react(),
    {
      name: 'copy-nojekyll',
      closeBundle() {
        // Copy .nojekyll to dist after build
        copyFileSync(join(__dirname, '.nojekyll'), join(__dirname, 'dist', '.nojekyll'));
      },
    },
  ],
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});

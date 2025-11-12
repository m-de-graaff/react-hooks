import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { copyFileSync } from 'fs';
import { join } from 'path';

export default defineConfig({
  base: '/react-hooks/',
  plugins: [
    react(),
    {
      name: 'copy-nojekyll',
      closeBundle() {
        // Copy .nojekyll to dist after build
        copyFileSync(
          join(__dirname, '.nojekyll'),
          join(__dirname, 'dist', '.nojekyll')
        );
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

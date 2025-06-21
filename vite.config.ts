import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Pi9oo/',
  server: {
    port: 5173, // change if needed
  },
  build: {
    outDir: 'dist', // this is where GitHub Pages will look
  }
});

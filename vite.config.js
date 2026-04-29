import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for the GameHub project.
// This sets the base path dynamically based on the build environment.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  preview: {
    port: 4173,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
});
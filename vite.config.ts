import { svelte } from '@sveltejs/vite-plugin-svelte';
import postcss from 'frame-app/postcss.config.mjs';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  css: {
    postcss,
  },
});

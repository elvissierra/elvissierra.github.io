// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
// Fully static build, deployed to GitHub Pages by .github/workflows/deploy.yml.
export default defineConfig({
  site: 'https://elvissierra.github.io',

  vite: {
    plugins: [tailwindcss()]
  }
});

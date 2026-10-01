// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
// Fully static build, served as Cloudflare Workers static assets (see wrangler.jsonc).
// TODO: switch `site` to the portfolio's custom domain once it is attached to the Worker.
export default defineConfig({
  site: 'https://elvissierra.github.io',

  vite: {
    plugins: [tailwindcss()]
  }
});

// @ts-check
import { WEBSITE_SERVER_PORT, WEBSITE_URL } from "./src/scripts/constants.js";

import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  server: { port: WEBSITE_SERVER_PORT },
  site: WEBSITE_URL,
  vite: {
    plugins: [tailwindcss()]
  }
});
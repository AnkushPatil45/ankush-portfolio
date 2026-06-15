// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static portfolio, deployed to GitHub Pages.
export default defineConfig({
  site: 'https://ankushpatil45.github.io',
  base: '/ankush-portfolio',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    // Astro uses sharp by default; allow modern formats.
    responsiveStyles: true,
  },
});

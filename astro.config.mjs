// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static portfolio, deployed to GitHub Pages.
export default defineConfig({
  site: 'https://ankushpatil45.github.io',
  base: '/ankush-portfolio',
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      serialize(item) {
        item.lastmod = new Date().toISOString();
        item.changefreq = 'monthly';
        item.priority = 1.0;
        return item;
      },
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    // Astro uses sharp by default; allow modern formats.
    responsiveStyles: true,
  },
});

// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static portfolio, deployed to GitHub Pages.
export default defineConfig({
  site: 'https://ankushpatil.com',
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
    // inline all CSS into the HTML head → no render-blocking stylesheet request
    inlineStylesheets: 'always',
  },
  image: {
    // Astro uses sharp by default; allow modern formats.
    responsiveStyles: true,
  },
});

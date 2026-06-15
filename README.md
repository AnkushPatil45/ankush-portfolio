# PatilOS

A personal portfolio for Ankush Patil, Cloud Engineer (Toronto), built as a small
"desktop operating system" — it boots up, opens draggable app windows, and has a working terminal.

**Live:** https://ankushpatil45.github.io/ankush-portfolio/

## Stack

- Astro + TypeScript (static site)
- Vanilla TypeScript for the window manager, terminal, cursor, and sound
- `astro:assets` image optimization (WebP, responsive, lazy)
- SEO: Open Graph + Twitter cards, JSON-LD, sitemap, robots

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/
npm run preview
```

## Content

Everything (profile, experience, education, projects, certifications, contact) lives in
`src/data/site.ts`. Edit it there and every window updates.

## Deploy

Pushes to `main` are built and published to GitHub Pages by `.github/workflows/deploy.yml`.
If you host it under a different path, adjust `base` in `astro.config.mjs`.

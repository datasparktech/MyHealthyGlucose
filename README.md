# MyHealthyGlucose.com

The public website for **MyHealthyGlucose** — a diabetes care companion app
([Google Play, Open Testing](https://play.google.com/store/apps/details?id=com.glucosecompass.app))
built by DataSpark Tech LLC.

This is the futuristic, tool-and-content-driven companion site: free calculators,
diabetes guides, a blog, and the app's own marketing pages — all in one place.

## Stack

- **Vite + React + TypeScript**
- **Tailwind CSS v4** (CSS-first theme, tokens in `src/index.css`)
- **Framer Motion** for animation
- **React Router** for client-side routing
- Fonts self-hosted via `@fontsource` (Space Grotesk + Inter) — no external font CDN

## Local development

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build to /dist
npm run preview   # preview the production build locally
```

## Deployment

Pushing to `main` automatically builds and deploys to **GitHub Pages** via
`.github/workflows/deploy.yml`. The custom domain is configured through
`public/CNAME` (`myhealthyglucose.com`).

**One-time setup needed in the GitHub repo settings** (Settings → Pages):
1. Set Source to "GitHub Actions".
2. Under your domain registrar, point `myhealthyglucose.com` to GitHub Pages
   (A records to GitHub's IPs, or a CNAME if using a `www` subdomain — see
   [GitHub's custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)).
3. Once DNS resolves, enable "Enforce HTTPS" in the same settings page.

## Project structure

```
src/
  components/   Nav, Hero, Footer, GlucoseCard (signature animated element), etc.
  pages/        Home, AboutApp, AboutUs, Tools/InfoHub/Blog (placeholders — Phase 2+)
  assets/       Brand logo & marketing images
  index.css     Design tokens (colors, fonts) via Tailwind v4 @theme
```

## Roadmap

See [`docs/MyHealthyGlucose_Website_Roadmap.docx`](docs/MyHealthyGlucose_Website_Roadmap.docx)
for the full phased build plan (Phase 0–7) and progress log.

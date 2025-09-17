# Fench's Navigator

A neon-styled website navigator for projects by `FenchsApps`.

- Links:
  - Portfolio — `https://fenchsapps.github.io`
  - Purple Browser (Search Engine) — `https://fenchsapps.github.io/purple-browser`
  - Gentoo USE-Flags GURU — `https://fenchsapps.github.io/useflags-guru`

Built with React, Vite and Tailwind CSS v4. The UI embraces a Hotline Miami neon vibe (purple tint, dark backdrop, subtle animations) and provides a settings panel to toggle animations and glow effects. The app supports English and Russian languages.

## Features

- Neon UI with gradient glow and animated highlights
- Three project link cards with accent colors
- Settings panel:
  - Toggle Animations On/Off
  - Toggle Glow On/Off
  - Language switcher EN/RU
- Footer with the site name and license: “Fench's Navigator · GPL-3.0”

## Tech Stack

- React + TypeScript (Vite)
- Tailwind CSS v4 (`@tailwindcss/postcss`)

## Getting Started

Prerequisites:
- Node.js 18+ (recommended LTS)

Install dependencies:
```bash
npm install
```

Run in development:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Project Structure

- `src/App.tsx` — main UI (cards, settings, footer, i18n)
- `src/index.css` — Tailwind v4 setup and neon theme tokens
- `index.html` — document head and mount point

## Internationalization

The app ships with a simple in-file dictionary and a language toggle in the header.

- Default language: EN
- Switch to RU via the “Language → RU” button

You can extend the dictionary in `src/App.tsx` by adding new keys and wiring them to the UI.

## Customization

- Colors and glow intensities are defined via CSS variables in `src/index.css`.
- You can disable animations and glow from the header settings without reloading the page.

## License

Released under the GNU General Public License v3.0 (GPL-3.0). See `LICENSE` for details.

## Deploy to GitHub Pages

You can deploy either as a Project Page (`https://<user>.github.io/<repo>`) or as a User/Org Page (`https://<user>.github.io`).

1) Vite base path (for Project Pages only)
- If deploying to `https://<user>.github.io/<repo>`, set the `base` in `vite.config.ts`:
```ts
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  base: '/<repo>/', // e.g. '/app-navigator/'
})
```

2) Build
```bash
npm run build
```

3) Publish options
- Option A — GitHub Actions (recommended):
  - Create `.github/workflows/gh-pages.yml` with:
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```
  - In repo Settings → Pages: set Source to “GitHub Actions”.

- Option B — `gh-pages` npm:
  - Install: `npm i -D gh-pages`
  - Add scripts to `package.json`:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```
  - Deploy: `npm run deploy`

Notes
- For User/Org Pages (root domain), you usually publish from the `main` branch or `docs/` folder. The Actions workflow above works for both; skip the `base` option in Vite.

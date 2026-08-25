# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

`yanping-portfolio` is a static single-page developer portfolio built with **Vite 5**, **React 18**, **TypeScript**, and **Tailwind CSS v4**. It is a dark-themed, three-screen site (Hero, Works, Contact) deployed to GitHub Pages.

## Common commands

- Install dependencies: `npm install`
- Start the dev server: `npm run dev`  
  Serves at `http://localhost:5173/yanping-portfolio/` by default. The base path matches the GitHub Pages repository path configured in `vite.config.ts`.
- Production build: `npm run build`  
  Runs `tsc -b` first for type checking, then Vite bundles into `dist/`.
- Preview the production build: `npm run preview`
- Run ESLint: `npm run lint`
- Run type checking only: `npx tsc -b`

There are no tests in this repository.

## Architecture

### Build and routing

- Vite is configured in `vite.config.ts` with `base: '/yanping-portfolio/'`. This base path must stay in sync with the GitHub repository name; otherwise asset URLs will 404 in production.
- The site is a single HTML page (`index.html`) mounting a React app at `#root` via `src/main.tsx`.
- TypeScript path aliases (`@/*` → `src/*`) are configured in `tsconfig.json` but the current codebase uses relative imports.

### Styling approach

All styling lives in `src/index.css`. It is organised as:

1. Tailwind import: `@import "tailwindcss";`
2. Design tokens in `:root` (colours, gradients, typography, spacing, shadows, easing, durations).
3. Component-specific BEM-style classes (e.g. `.hero__title`, `.project-card`, `.tech-radar`).

When adding or modifying UI, update the relevant CSS in `src/index.css` rather than creating new CSS files or relying heavily on Tailwind utility classes.

### Page structure

`src/App.tsx` composes the page as three high-level sections:

- `Hero` — full-screen intro with top/right navigation, animated background, and primary CTA.
- Works screen (`#works`) — a single `<section>` wrapping `TechStack`, `Projects`, and `Articles` against a unified dark background with ambient orbs.
- `Contact` — full-screen contact rows and footer.

### Custom hooks

- `useScrollReveal` — attaches an `IntersectionObserver` to add the `.is-visible` class to `.reveal` elements. CSS handles the fade-in-up transition. Respects `prefers-reduced-motion`.
- `useSmoothScroll` — intercepts clicks on `a[href^="#"]` and smoothly scrolls to the target, offsetting by the nav height. Registered once in `Hero`.

### Data and icons

- Project data, inline SVG icons, and tag types are co-located in `src/data/projects.tsx` and `src/data/projects-types.ts`.
- Tech-stack radar data is in `src/data/tech-stack.ts`.
- `TechStack.tsx` renders an SVG radar chart from this data, including rings, axes, polygon, and pulsing vertex dots.

### Accessibility

- A skip link is present in both `index.html` and `App.tsx`.
- Semantic elements (`<main>`, `<nav>`, `<section>`, `<footer>`) and `aria-label` are used throughout.
- Focus outlines use purple `#a855f7`.
- `prefers-reduced-motion: reduce` disables animations and makes reveal content visible immediately.

## Deployment

GitHub Actions deploys to GitHub Pages on every push to `main` via `.github/workflows/deploy.yml`:

1. `build` job — checks out code, sets up Node 20, runs `npm ci` and `npm run build`, uploads `dist/`.
2. `deploy` job — deploys the uploaded artifact to GitHub Pages.

The workflow uses `working-directory: ./yanping-portfolio` and `cache-dependency-path: ./yanping-portfolio/package-lock.json`, which implies the repository may be nested inside a parent repo or the workflow expects a subdirectory. If the repository root is not named `yanping-portfolio`, update these paths.

## Important files

- `vite.config.ts` — Vite config, `base` path, plugins (`@vitejs/plugin-react`, `@tailwindcss/vite`).
- `src/index.css` — all design tokens and component styles.
- `src/App.tsx` — root layout and section composition.
- `index.html` — SEO meta tags, Open Graph, structured data, Google Fonts preload.
- `ARCHITECTURE.md` and `DEPLOYMENT.md` — more detailed Chinese-language documentation.

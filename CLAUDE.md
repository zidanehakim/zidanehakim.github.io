# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Vite dev server with HMR
npm run build      # tsc + Vite production build (outputs to dist/)
npm run lint       # ESLint on .ts/.tsx files — fails on warnings
npm run preview    # Preview production build locally
npm run deploy     # Build then push dist/ to GitHub Pages via gh-pages
```

## Architecture

**React 18 SPA** built with Vite + TypeScript, deployed to GitHub Pages at https://zidanehakim.github.io.

### Routing & Transitions

`main.tsx` mounts the app with `BrowserRouter`. `App.tsx` defines 4 routes (`/`, `/about`, `/portfolio`, `/contact`) and renders the bottom `<Navbar>`. Each route component is wrapped in `WithTransition` — a HOC that plays a slide-down overlay animation (via Framer Motion) showing the page title before revealing content.

### Animation

All animations use **Framer Motion**. Key patterns:
- `useScroll` + `useTransform` for scroll-linked motion values
- Spring physics for smooth transitions
- Stagger effects for revealing lists of elements
- `WithTransition` orchestrates full-page entry animations

### Styling

**Tailwind CSS** (mobile-first, `md:`/`lg:`/`xl:` breakpoints) handles layout. Custom CSS in `App.css` covers scrollbar hiding, font imports (DM Sans), and logo hover effects. Dynamic animation styles come from Framer Motion inline styles.

### Navigation

`Navbar.tsx` is a fixed bottom bar with 4 icon buttons. It uses `useLocation()` to highlight the active route and disables links during active transitions.

### Data

No backend or global state library. Page content (timeline events, skill arrays, portfolio projects) is defined as local arrays/objects within each page component (`About.tsx`, `Portfolio.tsx`). Images live in `src/images/` and `public/`.

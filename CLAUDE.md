# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Next.js dev server (HMR)
npm run build      # next build — static export to out/
npm run start      # Preview production build locally
npm run lint       # ESLint via next lint
npm run deploy     # next build then push out/ to GitHub Pages via gh-pages
```

## Architecture

**Next.js 15 App Router** with TypeScript, deployed to GitHub Pages at https://zidanehakim.github.io via static export (`output: 'export'` in `next.config.ts`).

### Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15, App Router, React 18 |
| State / Data | TanStack Query v5 (mutations for terminal commands) |
| UI Components | shadcn/ui (Button, Badge) + custom components |
| Styling | Tailwind CSS v3 + CSS variables (charcoal/amber theme) |
| Animations | Framer Motion 11 |
| Icons | Lucide React |
| Fonts | DM Sans (body), JetBrains Mono (terminal) |
| Deployment | `gh-pages -d out` |

### Routing

App Router with 4 routes: `/`, `/about`, `/portfolio`, `/contact`. All are Server Components at the page level that pass JSON content as props to Client Components for animation.

### Component Pattern

```
app/page.tsx               # Server Component — reads JSON, passes to client
components/home-client.tsx  # Client Component — animations, interactions
```

Pages are server-rendered shell + client-animated content. No waterfalls.

### Animation

All animations use **Framer Motion**. Patterns:
- `useInView` (framer) for scroll-reveal on cards and list items
- `motion.div` with `fadeUp` variants on page entry
- CSS keyframes: `animate-glow-pulse`, `animate-float`, `animate-cursor-blink`

### Styling

- Design system: charcoal (`#0f0f0f`) + amber (`#f59e0b`) + dot-grid texture
- CSS variables defined in `app/globals.css` as HSL values
- Tailwind content: `app/**`, `components/**`, `content/**`
- Glass morphism: `.glass` and `.glass-navbar` utility classes

### Data

Content lives in `content/` as typed JSON files:
- `content/profile.json` — personal info, socials, resume path
- `content/projects.json` — portfolio projects
- `content/timeline.json` — education + awards
- `content/skills.json` — frontend/backend skill lists

Types are in `lib/types.ts`. No backend — fully static.

### PretextTerminal

`components/pretext-terminal.tsx` — interactive terminal showcasing portfolio architecture. Uses `useMutation` from TanStack Query for command execution with 180ms simulated latency. Boot sequence uses `useEffect` typewriter. Lazy-loaded via `next/dynamic` on the home page.

Available commands: `help`, `pretext show skills/projects/timeline`, `pretext analyze`, `pretext context`, `pretext whoami`, `clear`.

### Navigation

`components/navbar.tsx` — fixed bottom pill bar with 4 Lucide icon buttons. Active state via `usePathname()`. Glass morphism background.

### Page Transitions

`components/page-transition.tsx` — full-screen dark overlay slides in/out on route change via Framer `AnimatePresence`, showing the page name.

### Images

All images live in `public/images/`. Referenced as `/images/filename`. Uses `next/image` with `unoptimized: true` for GitHub Pages compatibility.

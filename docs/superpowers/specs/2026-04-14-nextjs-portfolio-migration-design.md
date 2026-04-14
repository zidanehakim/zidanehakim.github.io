# Next.js Portfolio Migration — Design Spec
**Date:** 2026-04-14  
**Branch:** refactor2 → new feature branch  
**Status:** Approved

---

## 1. Goal

Migrate the current Vite + React 18 portfolio to Next.js 15 (App Router). Fix the severe performance lag caused by `WithTransition`'s 2000ms scroll lock. Preserve the exact white + dark gray visual identity. Add a standout identity showcase section powered invisibly by PRETEXT SDK. Ship to GitHub Pages via `output: 'export'`.

---

## 2. Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 15 (App Router) | SSG via `output: 'export'`, file-based routing, layout-level transitions |
| Language | TypeScript | unchanged |
| Styling | Tailwind CSS v4 + shadcn/ui | component primitives, consistent tokens |
| Animation | Framer Motion | page transitions, scroll reveals, showcase canvas |
| State | Zustand | navbar active state, transition lock flag |
| Icons | Lucide React | replaces react-ionicons |
| Fonts | next/font/google (DM Sans) | zero FOUT, no runtime Google Fonts request |
| Lottie | lottie-react via dynamic() | lazy-loaded, no impact on initial bundle |
| Layout SDK | PRETEXT (by Cheng Lou) | drives showcase animation timing invisibly |
| Deploy | gh-pages, output: 'export' | unchanged deployment target |

**Not used:** TanStack Query (no backend), TanStack Router (no benefit over App Router for static portfolio).

---

## 3. Folder Structure

```
app/
  layout.tsx              ← root: DM Sans font, AnimatePresence, Navbar
  page.tsx                ← Home
  about/page.tsx
  portfolio/page.tsx
  contact/page.tsx

components/
  layout/
    Navbar.tsx            ← floating pill, active state from Zustand
    Logo.tsx              ← absolute center-top
    PageTransition.tsx    ← replaces WithTransition, 300ms overlay
  sections/
    Hero.tsx              ← typewriter, dot-grid bg, hero image
    IdentityShowcase.tsx  ← scanner + constellation (PRETEXT-powered)
    Timeline.tsx          ← scroll-driven, dark bg
    Skills.tsx            ← icon grid with Radix tooltips
    ProjectCarousel.tsx   ← keyboard + swipe, frosted glass cards
    ContactInfo.tsx       ← two-column, icon rows
  ui/                     ← shadcn components (Button, Tooltip, etc.)

store/
  useNavStore.ts          ← { isTransitioning, setTransitioning }

lib/
  data.ts                 ← all static content (timeline, projects, skills)
  motion.ts               ← shared Framer Motion variants

public/                   ← existing assets, unchanged
```

---

## 4. Page Structure

Four routes, same as current. Single `layout.tsx` wraps all pages with `AnimatePresence` keyed on pathname.

| Route | Page | Sections |
|---|---|---|
| `/` | Home | Hero (typewriter + dot-grid + ghost name text) |
| `/about` | About | Bio intro → IdentityShowcase → Timeline → Skills |
| `/portfolio` | Portfolio | Project carousel (3 projects) |
| `/contact` | Contact | Two-column contact info |

---

## 5. Page Transition (root cause fix)

**Current problem:** `WithTransition` calls `document.body.style.overflowY = 'hidden'` for 2000ms on every navigation. This is the primary source of perceived lag.

**Fix:** `PageTransition.tsx` wraps each page's content. `AnimatePresence` lives in a `'use client'` `LayoutWrapper` component imported by the root `layout.tsx` (App Router requires client boundary for Framer Motion). A dark overlay (`#111`) slides down over 300ms on exit, content fades in over 200ms on enter. Total: **500ms**. No body scroll lock at any point.

```
exit:  overlay slides DOWN  (300ms, ease-in)
enter: overlay slides UP    (300ms, ease-out) → content fades in (200ms)
```

Zustand `isTransitioning` flag disables navbar clicks during the 300ms window (same UX as current `click` lock, but scoped correctly).

---

## 6. Performance Fixes

| Issue | Root Cause | Fix |
|---|---|---|
| 2000ms lag on nav | `overflowY` body lock in `WithTransition` | Remove entirely — 300ms CSS overlay only |
| Layout shift on Portfolio | `window.innerWidth` read in component state | CSS container queries + `useWindowSize` with SSR guard |
| Multiple leaking intervals | 3 `setInterval` calls in Home typewriter | Single `useEffect`, one interval, proper cleanup |
| Render-blocking font | `@import url(fonts.googleapis.com)` in CSS | `next/font/google` — inlined, preloaded at build time |
| Unoptimised images | Raw `<img>` tags, no sizing hints | Next.js `<Image>` with explicit `width`/`height` + `priority` on hero |
| Heavy sections blocking paint | Lottie loaded eagerly | `dynamic(() => import('lottie-react'), { ssr: false })` + Suspense skeleton |

---

## 7. Color Palette (unchanged)

| Token | Value | Usage |
|---|---|---|
| Background | `#ffffff` | All pages |
| Text primary | `#030712` (gray-950) | Headings, body |
| Text secondary | `#6b7280` (gray-500) | Subtitles |
| Accent | `#7c3aed` (violet-600) | CTAs, active nav, cursor, accents |
| Dark section bg | `#111827` (gray-900) | Timeline, Skills dark strip |
| Showcase bg | `#06060f` (near-black) | IdentityShowcase only — deeper to make glow pop |
| Navbar | `rgba(255,255,255,0.85)` + `backdrop-blur` | Floating pill |

---

## 8. UI Modernisation

- **Dot-grid hero:** CSS `radial-gradient` dot pattern on Home, no JS
- **Ghost name text:** large `opacity-[0.04]` "Yazidane / Hakim" behind hero content, animated left/right with Framer Motion (unchanged from current)
- **Glow CTAs:** Resume + About buttons get `box-shadow: 0 0 20px #7c3aed66` on hover
- **Gradient border on project cards:** `conic-gradient` border on hover via CSS custom properties
- **Skill icon tooltips:** Radix Tooltip (via shadcn) on each tech icon
- **Scroll progress bar:** 2px violet line at top tracks scroll within About page
- **Smooth section reveals:** `useInView` + `motion.div` fade+translateY on each section
- **Active nav highlight:** active route's pill icon turns violet with subtle glow

---

## 9. IdentityShowcase Section

**Placement:** Second section on the About page, between bio intro and Timeline. Full-width, `~60vh`, dark background (`#06060f`) to create a visual break.

**What the employer sees:**
A purple scanner beam sweeps left-to-right across "Yazidane Hakim", revealing the name. Three constellation nodes pulse outward — asymmetric angles, different radii — each labelled with a brand identity tag. ASCII bracket corners frame the section. A Lottie sparkle floats in the top-right corner.

**Node content (3 nodes only):**
- `Full-stack Dev` — angle −105°, radius 130px
- `Software Engineer` — angle 28°, radius 150px  
- `Student` — angle 145°, radius 105px

**Text + node pulse:** both share the same `brightness` value (`dimMin: 0.25 → dimMax: 1.0`) so text and dot dim and glow in perfect sync.

**PRETEXT usage (invisible):** `pretext.measure()` is called on the rendered name after mount. The result's `width` drives the beam animation duration and the constellation node positions are anchored to character midpoints in the measured string. On resize, PRETEXT re-measures and positions recalculate — zero layout shift, no media query hacks.

**No PRETEXT branding shown in UI.** The section is purely about Yazidane Hakim.

**Lottie asset:** lightweight sparkle/glow from lottiefiles.com (~30kb), loaded via `dynamic()`. Renders in top-right corner, loops continuously.

---

## 10. Component Details

### `Navbar.tsx`
- Same floating pill, bottom-center, fixed position
- Icons: Lucide (`Home`, `User`, `Briefcase`, `Phone`)
- Active route: icon background `#7c3aed`, `box-shadow: 0 0 8px #7c3aed66`
- Label appears below icon on hover (Framer Motion `AnimatePresence`)
- Zustand `isTransitioning` disables pointer events during nav

### `Hero.tsx` (Home page)
- Dot-grid background: CSS only (`radial-gradient(circle, #ddd 1px, transparent 1px)`)
- Ghost name text: two `motion.h1` elements, `opacity-[0.04]`, animate `x: [50, -50]` and `x: [-50, 50]`
- Typewriter: single `useEffect` cycling through `["Full-stack Dev", "Engineer", "College Student"]`
- Hero image: `<Image priority width={400} height={500} />`
- Social links: LinkedIn, GitHub, Instagram, Facebook

### `Timeline.tsx`
- Unchanged logic, rebuilt with `<motion.div>` and `useInView` instead of `useMotionValueEvent`
- Dark background section (`#111827`), scroll-driven dot + card reveals
- Timeline data lives in `lib/data.ts`

### `ProjectCarousel.tsx`
- Replaces raw `motion.div drag` with proper carousel state
- Keyboard arrows + touch swipe support
- Frosted glass cards: `backdrop-blur`, `bg-white/80`, border
- Spring-animated progress bar (same as current `useSpring`)
- Project data in `lib/data.ts`

---

## 11. Deployment

No change to deployment pipeline:
```json
"scripts": {
  "build": "next build",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d out"
}
```
`next.config.ts` sets `output: 'export'` and `basePath: ''`. Static export goes to `/out`, deployed to `gh-pages` branch.

---

## 12. Out of Scope

- No backend, no API routes, no database
- No TanStack Query
- No TanStack Router
- No contact form (display only)
- No dark mode toggle
- No CMS integration

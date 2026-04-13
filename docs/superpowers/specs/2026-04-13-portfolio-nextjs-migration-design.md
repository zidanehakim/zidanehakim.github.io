# Portfolio — Next.js Migration Design Spec
**Date:** 2026-04-13  
**Author:** Yazidane Hakim  
**Status:** Approved for implementation

---

## 1. Goal

Migrate the current Vite + React 18 SPA portfolio to Next.js 15 with a focus on:
- **Blazing performance** — zero CLS, optimized images, Core Web Vitals green
- **Modern aesthetic** — same white/light base, elevated with web3-inspired design touches
- **Content decoupling** — JSON-driven content so adding a project/skill requires no code change
- **Individual project pages** — each project gets a dedicated URL

---

## 2. Tech Stack

| Concern | Choice | Reason |
|---|---|---|
| Framework | Next.js 15, App Router, `output: 'export'` | Static export for GitHub Pages, RSC at build time |
| State | Zustand | Transition lock, lightweight global UI state |
| Components | shadcn/ui + Tailwind CSS | Accessible primitives, consistent design tokens |
| Animation | Framer Motion | GPU-accelerated, `transform`/`opacity` only |
| Content | JSON files + Zod validation | Edit a file to update content, no CMS overhead |
| Font | `next/font/google` (DM Sans) | Self-hosted at build time, eliminates CLS from font swap |
| Images | `next/image` with `unoptimized: true` + WebP pre-conversion | Static export compatible, explicit dimensions = zero CLS |
| Scroll triggers | Intersection Observer API | Single observer per section replaces 12+ Framer `useScroll` listeners |
| TypeScript | Strict mode | Same as current |
| Deployment | GitHub Pages via `gh-pages` | Same workflow as today |

**Not included:** TanStack Query (no server, pure static), TanStack Router (incompatible with Next.js).

---

## 3. Aesthetic Direction

**Base:** White/cool-tinted background (`#f8f8fc`), DM Sans variable font.

**Accent system:**
- Primary: `#7c3aed` (violet-700) — Education timeline, primary interactive
- Secondary: `#ec4899` (pink-500) — Award timeline, highlights
- Gradient: `linear-gradient(135deg, #7c3aed, #ec4899)` — Hero name, section headings

**Web3-inspired touches (tasteful, not themed):**
- Ambient gradient mesh orbs — 2–3 soft blurred radial gradient blobs behind hero and key sections. Barely visible, adds depth without busy-ness.
- Glass morphism — Navbar and project cards: `background: rgba(255,255,255,0.8)`, `backdrop-filter: blur(16px)`, `border: 1px solid rgba(255,255,255,0.6)`
- Gradient text — Hero name, major section headings rendered with `background-clip: text`
- Gradient borders — On hover of interactive cards: `border: 1px solid transparent; background-origin: border-box` technique
- Subtle noise texture overlay — 3% opacity SVG noise on the background, adds tactility

**Typography:**
- DM Sans, weights 400 / 600 / 700 / 900
- Ghosted watermark text per section (e.g., `"about."` at 5% opacity, oversized, absolutely positioned)
- Section counters: `01 —`, `02 —`, `03 —`, `04 —` in small uppercase, `color: #ddd`

---

## 4. Folder Structure

```
app/
  layout.tsx                 # Root: font, Zustand provider, Navbar, gradient orbs
  page.tsx                   # Home (/)
  about/page.tsx             # About (/about)
  portfolio/page.tsx         # Portfolio (/portfolio)
  projects/[slug]/page.tsx   # Project detail (/projects/noteify etc.)
  contact/page.tsx           # Contact (/contact)
  globals.css                # Tailwind base, CSS variables, noise texture

components/
  ui/                        # shadcn auto-generated (Button, Card, Badge, etc.)
  navbar.tsx                 # Fixed bottom pill, glass morphism, Zustand transition lock
  page-transition.tsx        # Framer Motion slide overlay, reads/sets Zustand lock
  gradient-orbs.tsx          # Ambient background mesh orbs (position: fixed, pointer-events: none)
  section-header.tsx         # Reusable: counter + gradient heading + subtitle
  timeline-item.tsx          # Single timeline entry (dot + card)
  skill-chip.tsx             # Individual skill badge
  project-card.tsx           # Portfolio list row (hover-reveal)
  typewriter.tsx             # Single-effect typewriter, proper cleanup

content/
  projects.json              # Portfolio projects
  timeline.json              # Career timeline
  skills.json                # Skills by category
  profile.json               # Bio, socials, contact info

lib/
  schemas.ts                 # Zod schemas for all content types
  content.ts                 # Read + parse + validate content (used in Server Components)
  store.ts                   # Zustand: { isTransitioning, setTransitioning }

public/
  images/                    # All assets pre-converted to WebP
    hero.webp
    photos/1.webp … 11.webp
    projects/noteify.webp, instrument-store.webp, animalist.webp
    decorative/coffee.webp, rocket.webp, dab.webp, business.webp, call.webp
    skills/html5.svg … (SVGs stay as SVG)
  YAZIDANE_HAKIM_RESUME.pdf

next.config.ts               # output: 'export', images: { unoptimized: true }
```

---

## 5. Pages

### 5.1 Home (`/`)

**Layout:** Two-column grid (md+), single column mobile. Ambient gradient orbs behind everything.

**Content:**
- Section counter: `01 —`
- Heading: `Hi there, I'm` (small, muted)
- Name: `Yazidane Hakim.` — large, bold, gradient text (violet → pink)
- Ghosted watermark: `"YAZIDANE"` absolute-positioned behind
- Typewriter: cycles `["Full-stack Dev", "Engineer", "College Student"]` — **rewritten** as single `useEffect` with `useRef` for interval handles, proper cleanup on unmount
- Buttons: Resume (dark fill, shadcn `Button`), About (outline)
- Social links: LinkedIn, GitHub, Instagram, Facebook — icon buttons, subtle hover scale
- Hero image: `hero.webp` with `priority` prop (above fold)

**Animations:**
- Name fades + slides up on mount (Framer, `opacity` + `translateY`, once)
- Background watermark: slow horizontal drift (Framer infinite, `translateX` only, GPU)
- Buttons stagger in after name (Framer `staggerChildren`)

### 5.2 About (`/about`)

**Three sections:**

**Section A — Bio (light background)**
- Section counter: `02 —`
- Heading: `about.` (gradient text)
- Bento grid: bio card (wide), location card, highlight stat (Olympiad gold medal), photo gallery trigger card, skills teaser card with chip preview
- Photo gallery: horizontal scroll strip below bento, images lazy-loaded, `loading="lazy"` explicit
- Decorative coffee image right-aligned, md+ only

**Section B — Timeline (dark `#111` background)**
- Heading: `timeline.` (white, ghost watermark)
- Vertical left-anchored dot timeline
- Purple dot (`#7c3aed`) for Education entries, pink dot (`#ec4899`) for Award entries
- Each entry: year label, badge (Education/Award), title, subtitle, description
- Reveal: `IntersectionObserver` on each entry — adds `data-visible` attribute, CSS transition handles opacity + translateY. No Framer on this section.
- Animated vertical line grows from top as user scrolls (single CSS `scaleY` transform on a pseudo-element)

**Section C — Skills (light background)**
- Heading: `skills.` (gradient text)
- Two rows: Frontend, Backend
- Each skill: SVG icon + label, shadcn `Badge` variant
- Reveal: Single `IntersectionObserver` on the skills section container — triggers stagger animation via CSS custom property `--delay`

### 5.3 Portfolio (`/portfolio`)

**Layout:** Single column, full width list.

**Content:**
- Section counter: `03 —`
- Heading: `projects.` (gradient text)
- Numbered list of projects read from `content/projects.json`
- Each row: index number, project name + tag line, arrow `→`
- Hover: screenshot thumbnail slides in from left (Framer `x` motion, `opacity`), row shifts right via `paddingLeft` CSS transition

**Each project row links to `/projects/[slug]`.**

### 5.4 Project Detail (`/projects/[slug]`)

**Generated from `content/projects.json` via `generateStaticParams`.**

**Layout:** Single column, constrained width (max-w-3xl centered).

**Content:**
- Back link: `← portfolio`
- Project title (large, gradient text)
- Tech stack: shadcn `Badge` chips for each tag
- Full screenshot (next/image, priority)
- Full description (expanded from the short card version)
- Two buttons: Live Demo (primary), GitHub (outline) — if `github` field present in JSON
- Ambient gradient orb behind screenshot for web3 depth

### 5.5 Contact (`/contact`)

**Layout:** Two-column grid (md+).

**Content:**
- Section counter: `04 —`
- Heading: `contacts.` (gradient text)
- shadcn `Card` with name, address, phone
- Contact method cards: email, LinkedIn, WhatsApp, Line — each as a glass morphism card with icon + label
- Decorative call image right-aligned, md+ only

---

## 6. Shared Components

### `gradient-orbs.tsx`
```
Fixed position, full screen, pointer-events: none, z-index: -1
3 orbs:
  - Top-right: violet, 600px diameter, 20% opacity, slow float animation
  - Bottom-left: pink, 400px diameter, 15% opacity, counter-float
  - Center: indigo, 300px, 8% opacity, subtle pulse
All: filter: blur(80px), will-change: transform
Animation: Framer infinite, translateX/Y only, 8-15s duration
```

### `page-transition.tsx`
```
Zustand: isTransitioning, setTransitioning
On route enter:
  1. setTransitioning(true) — Navbar disables clicks
  2. Dark overlay slides down (600ms)
  3. Page title text fades in (delay 600ms)
  4. White overlay slides up and off (delay 1200ms)
  5. setTransitioning(false) at 1800ms
Body overflow hidden during transition
Same visual as current WithTransition
```

### `navbar.tsx`
```
Fixed bottom, centered pill
Glass morphism: rgba(255,255,255,0.85), backdrop-blur(16px), border rgba(255,255,255,0.6)
4 icon buttons using react-icons (replaces react-ionicons)
Active state: violet background
Disabled when isTransitioning (Zustand)
Shadow: 0 8px 32px rgba(0,0,0,0.08)
```

### `typewriter.tsx`
```
Single useEffect, single interval ref (useRef<NodeJS.Timeout>)
States: displayText (string), phase ('typing'|'pausing'|'deleting')
useRef for currentIndex, wordIndex — avoids stale closure issues
Cleanup: clearInterval on unmount
Blinking cursor: CSS animation only (no JS interval)
```

---

## 7. Content Schemas (Zod)

```typescript
// lib/schemas.ts

const ProjectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  shortDescription: z.string(),
  fullDescription: z.string(),
  tags: z.array(z.string()),
  url: z.string().url(),
  github: z.string().url().optional(),
  image: z.string(),
})

const TimelineItemSchema = z.object({
  type: z.enum(['Education', 'Award']),
  time: z.string(),
  title: z.string(),
  sub: z.string(),
  description: z.string(),
})

const SkillSchema = z.object({
  category: z.enum(['frontend', 'backend']),
  name: z.string(),
  icon: z.string(), // path to public/images/skills/
})

const ProfileSchema = z.object({
  name: z.string(),
  bio: z.string(),
  socials: z.object({
    linkedin: z.string().url(),
    github: z.string().url(),
    instagram: z.string().url(),
    facebook: z.string().url(),
  }),
  contact: z.object({
    email: z.string().email(),
    linkedin: z.string(),
    whatsapp: z.string(),
    line: z.string(),
    address: z.string(),
    phone: z.string(),
  }),
  resumeUrl: z.string(),
})
```

---

## 8. Performance Targets

| Metric | Target | How |
|---|---|---|
| LCP | < 1.5s | `priority` on hero image, self-hosted font, no render-blocking requests |
| CLS | 0.00 | Explicit `width`/`height` on every image, `next/font` eliminates font swap |
| FID/INP | < 50ms | No heavy JS on main thread, animations on GPU layer only |
| TBT | < 100ms | Code splitting per route, no large synchronous imports |
| Bundle size | Minimize | Dynamic import for Framer Motion heavy modules, SVG skills icons inline |

---

## 9. Migration Steps (high-level, for plan)

1. Scaffold Next.js 15 project in same repo, configure `output: 'export'`, set up Tailwind + shadcn
2. Convert all images to WebP, place in `public/images/`
3. Populate `content/` JSON files from current hardcoded data, write Zod schemas
4. Build shared infrastructure: `gradient-orbs`, `page-transition`, `navbar`, `section-header`, `typewriter`, Zustand store
5. Build Home page
6. Build About page (bento + timeline + skills)
7. Build Portfolio page (hover-reveal list)
8. Build Project detail pages
9. Build Contact page
10. Performance audit: check Core Web Vitals, fix any issues
11. Update `package.json` deploy script, test GitHub Pages deploy

---

## 10. Out of Scope

- Dark mode toggle (white base only)
- CMS integration (JSON files are the CMS)
- TanStack Query (no server-side data)
- Blog / writing section
- Contact form / backend (contact info display only, same as current)

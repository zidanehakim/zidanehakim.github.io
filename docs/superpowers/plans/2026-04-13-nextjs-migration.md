# Portfolio Next.js Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the Vite + React 18 SPA portfolio to Next.js 15 (static export → GitHub Pages) with shadcn/ui, Zustand, Framer Motion, and JSON-driven content, with a white/light aesthetic elevated with web3-inspired glass morphism, gradient text, and ambient gradient orbs.

**Architecture:** Next.js 15 App Router with `output: 'export'` + `trailingSlash: true` produces per-route `index.html` files compatible with GitHub Pages. All page data is read from `content/*.json` files, validated with Zod in Server Components at build time, and passed as props to Client Components. Zustand holds a global `isTransitioning` flag used by both the navbar (disable clicks) and page wrapper (lock body scroll). Animations are Framer Motion (`transform`/`opacity` only) for the hero and page transitions; IntersectionObserver + CSS transitions for scroll-triggered reveals (timeline, skills), which avoids registering multiple concurrent scroll listeners.

**Tech Stack:** Next.js 15 · React 19 · Zustand 5 · shadcn/ui · Tailwind CSS v3 · Framer Motion 11 · Zod · TypeScript strict · `next/font/google` · `next/image` (unoptimized) · react-icons · sharp (dev, image conversion)

---

## File Map

```
app/
  layout.tsx              Server: root HTML shell, DM Sans font, GradientOrbs, Navbar
  globals.css             Tailwind base/components/utilities, shadcn CSS vars, gradient-text, glass, blink, noise
  page.tsx                Server: reads profile → passes to HomeClient
  about/
    page.tsx              Server: reads profile + timeline + skills → passes to AboutClient
  portfolio/
    page.tsx              Server: reads projects → passes to PortfolioClient
  projects/
    [slug]/
      page.tsx            Server: generateStaticParams + reads single project → ProjectDetailClient
  contact/
    page.tsx              Server: reads profile → passes to ContactClient

components/
  ui/                     shadcn auto-generated (Button, Card, Badge)
  gradient-orbs.tsx       Client: fixed ambient background blobs (Framer infinite loops)
  section-header.tsx      Server: counter label + gradient heading + subtitle
  page-wrapper.tsx        Client: slide-down overlay transition on mount, sets Zustand isTransitioning
  navbar.tsx              Client: fixed bottom pill, glass, 4 icon links, disabled when isTransitioning
  typewriter.tsx          Client: single-effect typewriter, useRef for interval, CSS blink cursor
  timeline-item.tsx       Client: IntersectionObserver reveal, dot + content card
  skill-grid.tsx          Client: IntersectionObserver reveal, stagger via CSS delay
  project-card.tsx        Client: hover-reveal row with thumbnail
  home-client.tsx         Client: full Home page interactive layer
  about-client.tsx        Client: full About page interactive layer
  portfolio-client.tsx    Client: full Portfolio page interactive layer

content/
  profile.json            Bio, socials, contact info, resumeUrl
  projects.json           Portfolio projects array
  timeline.json           Career timeline array
  skills.json             Skills array

lib/
  schemas.ts              Zod schemas for all content types
  content.ts              Read + validate content (called in Server Components)
  store.ts                Zustand: { isTransitioning, setTransitioning }

public/
  images/
    hero.webp
    decorative/coffee.webp, rocket.webp, dab.webp, business.webp, call.webp
    photos/1.webp … 11.webp
    projects/noteify.webp, instrument-store.webp, animalist.webp
    contact/email.webp, linkedin.webp, whatsapp.webp, line.webp
    skills/html5.svg, css.svg, javascript.svg, typescript.svg, react.svg,
            tailwind.svg, bootstrap.svg, framer.svg, unity.svg,
            nodejs.svg, expressjs.svg, mongodb.svg, supabase.svg,
            git.svg, github.svg, json.svg
  cover.png               Favicon (keep as PNG)
  YAZIDANE_HAKIM_RESUME.pdf

scripts/
  convert-images.mjs      Node script: convert src/images/*.{jpg,png} + public/*.png to WebP

next.config.ts
tailwind.config.ts        (replaces tailwind.config.js)
components.json           shadcn config
```

---

## Task 1: Initialize Next.js 15 in the existing repo

**Files:**
- Create: `next.config.ts`
- Create: `tailwind.config.ts`
- Create: `postcss.config.mjs`
- Modify: `package.json`
- Modify: `tsconfig.json`

- [ ] **Step 1: Install Next.js 15 and React 19, replacing Vite dependencies**

```bash
cd C:/zidanehakim.github.io
npm uninstall vite @vitejs/plugin-react
npm install next@latest react@latest react-dom@latest
npm install -D @types/react @types/react-dom @types/node
npm install zustand zod framer-motion react-icons
npm install -D sharp
```

Expected: `node_modules/next` exists, `node_modules/vite` removed.

- [ ] **Step 2: Create `next.config.ts`**

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
```

- [ ] **Step 3: Replace `tailwind.config.js` with `tailwind.config.ts`**

Delete `tailwind.config.js`, then create:

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.json',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'DM Sans', 'sans-serif'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      animation: {
        blink: 'blink 1s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
```

- [ ] **Step 4: Create `postcss.config.mjs`**

Delete `postcss.config.js` if it exists, then:

```javascript
// postcss.config.mjs
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
export default config
```

- [ ] **Step 5: Update `package.json` scripts**

Replace the scripts section:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "lint": "next lint",
  "preview": "npx serve out",
  "deploy": "next build && echo. > out/.nojekyll && gh-pages -d out --dotfiles"
}
```

*On Windows PowerShell use `echo $null > out/.nojekyll`. On bash: `touch out/.nojekyll`.*

- [ ] **Step 6: Replace `tsconfig.json` with Next.js-compatible config**

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 7: Install shadcn/ui**

```bash
npx shadcn@latest init --defaults
```

When prompted: style = Default, base color = Violet, CSS variables = Yes.

- [ ] **Step 8: Install shadcn components**

```bash
npx shadcn@latest add button card badge
npm install tailwindcss-animate
```

- [ ] **Step 9: Add `app/` and `content/` to `.gitignore` exclusions, add `.superpowers/` and `out/`**

Append to `.gitignore`:
```
out/
.superpowers/
```

- [ ] **Step 10: Verify Next.js can find its entry point**

```bash
mkdir -p app && echo "export default function Page(){return <h1>ok</h1>}" > app/page.tsx
npx next build 2>&1 | tail -5
```

Expected: build succeeds (or fails only on missing `globals.css` — that's fine at this stage). Delete the temp page.tsx after.

- [ ] **Step 11: Commit**

```bash
git add next.config.ts tailwind.config.ts postcss.config.mjs tsconfig.json package.json package-lock.json components.json .gitignore
git commit -m "chore: initialize Next.js 15 with shadcn/ui, Tailwind, static export config"
```

---

## Task 2: Zustand store + Zod schemas + content library

**Files:**
- Create: `lib/store.ts`
- Create: `lib/schemas.ts`
- Create: `lib/content.ts`

- [ ] **Step 1: Create `lib/store.ts`**

```typescript
// lib/store.ts
import { create } from 'zustand'

interface TransitionStore {
  isTransitioning: boolean
  setTransitioning: (v: boolean) => void
}

export const useTransitionStore = create<TransitionStore>((set) => ({
  isTransitioning: false,
  setTransitioning: (v) => set({ isTransitioning: v }),
}))
```

- [ ] **Step 2: Create `lib/schemas.ts`**

```typescript
// lib/schemas.ts
import { z } from 'zod'

export const ProjectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  shortDescription: z.string(),
  fullDescription: z.string(),
  tags: z.array(z.string()),
  url: z.string().url(),
  github: z.string().url().optional(),
  image: z.string(),
})

export const TimelineItemSchema = z.object({
  type: z.enum(['Education', 'Award']),
  time: z.string(),
  title: z.string(),
  sub: z.string(),
  description: z.string(),
})

export const SkillSchema = z.object({
  category: z.enum(['frontend', 'backend']),
  name: z.string(),
  icon: z.string(),
})

export const ProfileSchema = z.object({
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

export type Project = z.infer<typeof ProjectSchema>
export type TimelineItem = z.infer<typeof TimelineItemSchema>
export type Skill = z.infer<typeof SkillSchema>
export type Profile = z.infer<typeof ProfileSchema>
```

- [ ] **Step 3: Create `lib/content.ts`**

```typescript
// lib/content.ts
import { z } from 'zod'
import { ProjectSchema, TimelineItemSchema, SkillSchema, ProfileSchema } from './schemas'

// These imports run only at build time in Server Components
import projectsData from '@/content/projects.json'
import timelineData from '@/content/timeline.json'
import skillsData from '@/content/skills.json'
import profileData from '@/content/profile.json'

export function getProjects() {
  return z.array(ProjectSchema).parse(projectsData)
}

export function getProject(slug: string) {
  return z.array(ProjectSchema).parse(projectsData).find((p) => p.slug === slug) ?? null
}

export function getTimeline() {
  return z.array(TimelineItemSchema).parse(timelineData)
}

export function getSkills() {
  return z.array(SkillSchema).parse(skillsData)
}

export function getProfile() {
  return ProfileSchema.parse(profileData)
}
```

- [ ] **Step 4: Verify TypeScript compiles cleanly**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: errors only about missing JSON files (content/*.json) — that's fine. No schema or import errors.

- [ ] **Step 5: Commit**

```bash
git add lib/
git commit -m "feat: add Zustand store, Zod schemas, and content library"
```

---

## Task 3: Populate content JSON files

**Files:**
- Create: `content/profile.json`
- Create: `content/projects.json`
- Create: `content/timeline.json`
- Create: `content/skills.json`

- [ ] **Step 1: Create `content/profile.json`**

```json
{
  "name": "Yazidane Hakim",
  "bio": "As a sophomore studying civil engineering at National Taiwan University, I'm adept at balancing academic commitments with my longstanding passion for coding. Particularly drawn to website development since high school, I'm enthusiastic about taking this interest to a professional level.",
  "socials": {
    "linkedin": "https://www.linkedin.com/in/yazidane-hakim-25754128a/",
    "github": "https://github.com/zidanehakim",
    "instagram": "https://www.instagram.com/yazidanehakim/",
    "facebook": "https://www.facebook.com/ZidanyuChan/"
  },
  "contact": {
    "email": "zidanehakimgt@gmail.com",
    "linkedin": "Yazidane Hakim",
    "whatsapp": "0908735498",
    "line": "yazidanehakim",
    "address": "50 Changxing St, Daan Dist, Taipei City, Taiwan",
    "phone": "+886 908735498"
  },
  "resumeUrl": "/YAZIDANE_HAKIM_RESUME.pdf"
}
```

- [ ] **Step 2: Create `content/projects.json`**

```json
[
  {
    "slug": "noteify",
    "title": "Noteify",
    "shortDescription": "Drag-and-drop sticky notes planner with weather forecasts, real-time clocks, and location tracking.",
    "fullDescription": "Design your planner with drag-and-drop sticky notes, featuring weather forecasts, real-time clocks, and location tracking. Easily create, stick, and track tasks with an intuitive visual workspace.",
    "tags": ["React", "Drag & Drop", "Weather API", "Location API"],
    "url": "https://noteify-io.netlify.app/",
    "image": "/images/projects/noteify.webp"
  },
  {
    "slug": "instrument-store",
    "title": "Instrument Store",
    "shortDescription": "Online instrument store with cozy ambiance, jazzy design, and full search functionality.",
    "fullDescription": "Welcome to our online instrument store, where cozy ambiance meets jazzy design. Search for your desired instruments now and begin your musical journey! Built with React and a carefully crafted UI.",
    "tags": ["React", "E-commerce", "Tailwind CSS"],
    "url": "https://zidanehakim.github.io/react-instrument-store",
    "image": "/images/projects/instrument-store.webp"
  },
  {
    "slug": "animalist",
    "title": "Animalist",
    "shortDescription": "Anime search engine with parallax landing page powered by the Jikan API.",
    "fullDescription": "Anime related search engine covering characters, anime series, and movies, with a cool parallax landing page. Fetches data from the Jikan API. Supports searching across multiple anime categories.",
    "tags": ["React", "Jikan API", "Parallax", "Search Engine"],
    "url": "https://zidanehakim.github.io/animalist",
    "image": "/images/projects/animalist.webp"
  }
]
```

- [ ] **Step 3: Create `content/timeline.json`**

```json
[
  {
    "type": "Education",
    "time": "2022 — Present",
    "title": "National Taiwan University",
    "sub": "Civil Engineering Department · 2nd year",
    "description": "As I'm into engineering and would like to try something new, Civil Engineering does attract my interest a lot. Being able to analyze structures and make durable buildings, combined with mechanical theory and all of its complexity, makes the learning process more fun."
  },
  {
    "type": "Award",
    "time": "2022 — Present",
    "title": "Beasiswa Indonesia Maju (BIM) Awardee",
    "sub": "Ministry of Education, Culture, Research, and Technology",
    "description": "Participating in the National Indonesian Informatics Olympiad 2021 brought me the opportunity to become an awardee of the Maju Scholarship and to choose National Taiwan University for my further studies."
  },
  {
    "type": "Award",
    "time": "2023",
    "title": "Best Automation Award",
    "sub": "Physical Model Design Laboratory, NTU Civil Engineering",
    "description": "Rail track projects — I've always strived to create the best and most creative projects combined with programming. The Raspberry Pi sends an HTML file to localhost:5000 when certain conditions of the rail are met."
  },
  {
    "type": "Award",
    "time": "2021",
    "title": "National Informatics Olympiad",
    "sub": "Finalist",
    "description": "Having obtained a gold medal in the Bengkulu Informatics Olympiad 2021, I was chosen to represent the Bengkulu province in the National Informatics field. Consequently, I had the opportunity to participate as a finalist in the competition."
  },
  {
    "type": "Award",
    "time": "2021",
    "title": "Bengkulu Informatics Olympiad",
    "sub": "Gold Medal",
    "description": "I've always been passionate about programming, starting from school-level qualifications, advancing to district competitions, and eventually participating at the provincial level. Hard work paid off when I was awarded a Gold Medal in the competition."
  },
  {
    "type": "Education",
    "time": "2019 — 2022",
    "title": "SMA Negeri 4 Rejang Lebong",
    "sub": "Senior High School",
    "description": "Three years of senior high school — I was just a normal student, self-studying programming on my own and building the foundation for everything that came after."
  }
]
```

- [ ] **Step 4: Create `content/skills.json`**

```json
[
  { "category": "frontend", "name": "HTML5", "icon": "/images/skills/html5.svg" },
  { "category": "frontend", "name": "CSS", "icon": "/images/skills/css.svg" },
  { "category": "frontend", "name": "JavaScript", "icon": "/images/skills/javascript.svg" },
  { "category": "frontend", "name": "TypeScript", "icon": "/images/skills/typescript.svg" },
  { "category": "frontend", "name": "React", "icon": "/images/skills/react.svg" },
  { "category": "frontend", "name": "Tailwind", "icon": "/images/skills/tailwind.svg" },
  { "category": "frontend", "name": "Bootstrap", "icon": "/images/skills/bootstrap.svg" },
  { "category": "frontend", "name": "Framer", "icon": "/images/skills/framer.svg" },
  { "category": "frontend", "name": "Unity", "icon": "/images/skills/unity.svg" },
  { "category": "backend", "name": "Node.js", "icon": "/images/skills/nodejs.svg" },
  { "category": "backend", "name": "Express.js", "icon": "/images/skills/expressjs.svg" },
  { "category": "backend", "name": "MongoDB", "icon": "/images/skills/mongodb.svg" },
  { "category": "backend", "name": "Supabase", "icon": "/images/skills/supabase.svg" },
  { "category": "backend", "name": "Git", "icon": "/images/skills/git.svg" },
  { "category": "backend", "name": "GitHub", "icon": "/images/skills/github.svg" },
  { "category": "backend", "name": "JSON", "icon": "/images/skills/json.svg" }
]
```

- [ ] **Step 5: Verify Zod parses all four files without error**

```bash
node -e "
const { z } = require('zod');
const p = require('./content/profile.json');
const pr = require('./content/projects.json');
const t = require('./content/timeline.json');
const s = require('./content/skills.json');
console.log('profile ok:', !!p.name);
console.log('projects ok:', Array.isArray(pr) && pr.length);
console.log('timeline ok:', Array.isArray(t) && t.length);
console.log('skills ok:', Array.isArray(s) && s.length);
"
```

Expected: all four lines print truthy values.

- [ ] **Step 6: Commit**

```bash
git add content/
git commit -m "feat: add content JSON files (profile, projects, timeline, skills)"
```

---

## Task 4: Image migration — convert to WebP and organize

**Files:**
- Create: `scripts/convert-images.mjs`
- Create: `public/images/**` (generated)

- [ ] **Step 1: Create `scripts/convert-images.mjs`**

```javascript
// scripts/convert-images.mjs
import sharp from 'sharp'
import { existsSync, mkdirSync, copyFileSync } from 'fs'

const dirs = [
  'public/images',
  'public/images/decorative',
  'public/images/photos',
  'public/images/projects',
  'public/images/contact',
  'public/images/skills',
]
dirs.forEach((d) => { if (!existsSync(d)) mkdirSync(d, { recursive: true }) })

const toWebP = async (input, output, quality = 85) => {
  try {
    await sharp(input).webp({ quality }).toFile(output)
    console.log(`✓  ${input} → ${output}`)
  } catch (e) {
    console.error(`✗  ${input}: ${e.message}`)
  }
}

// Hero
await toWebP('src/images/hero.png', 'public/images/hero.webp', 90)

// Decorative
await toWebP('src/images/coffee.png', 'public/images/decorative/coffee.webp')
await toWebP('src/images/rocket.png', 'public/images/decorative/rocket.webp')
await toWebP('src/images/dab.png', 'public/images/decorative/dab.webp')
await toWebP('src/images/business.png', 'public/images/decorative/business.webp')
await toWebP('src/images/call.png', 'public/images/decorative/call.webp')

// Personal photos
for (let i = 1; i <= 11; i++) {
  await toWebP(`src/images/${i}.jpg`, `public/images/photos/${i}.webp`, 80)
}

// Portfolio screenshots
await toWebP('public/web_noteify.png', 'public/images/projects/noteify.webp')
await toWebP('public/web_instrument store.png', 'public/images/projects/instrument-store.webp')
await toWebP('public/web_animalist.png', 'public/images/projects/animalist.webp')

// Contact icons
await toWebP('src/images/email.png', 'public/images/contact/email.webp')
await toWebP('src/images/linkedin.png', 'public/images/contact/linkedin.webp')
await toWebP('src/images/whatsapp.png', 'public/images/contact/whatsapp.webp')
await toWebP('src/images/line.png', 'public/images/contact/line.webp')

// SVG skill icons (copy, no conversion needed)
const svgs = ['html5','css','javascript','typescript','react','tailwind','bootstrap','framer','unity','nodejs','expressjs','mongodb','supabase','git','github','json']
svgs.forEach((name) => {
  try {
    copyFileSync(`public/${name}.svg`, `public/images/skills/${name}.svg`)
    console.log(`✓  ${name}.svg copied`)
  } catch (e) {
    console.error(`✗  ${name}.svg: ${e.message}`)
  }
})

console.log('\nDone.')
```

- [ ] **Step 2: Run the conversion script**

```bash
node scripts/convert-images.mjs
```

Expected: every line prints `✓`. No `✗` lines.

- [ ] **Step 3: Verify key files exist**

```bash
ls public/images/hero.webp public/images/photos/1.webp public/images/projects/noteify.webp public/images/skills/react.svg
```

Expected: all four paths printed without error.

- [ ] **Step 4: Commit**

```bash
git add public/images/ scripts/
git commit -m "feat: convert and organize all images to WebP"
```

---

## Task 5: Global CSS

**Files:**
- Create: `app/globals.css`

- [ ] **Step 1: Create `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 240 50% 98%;
    --foreground: 0 0% 7%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 7%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 7%;
    --primary: 262 83% 58%;
    --primary-foreground: 0 0% 100%;
    --secondary: 330 81% 60%;
    --secondary-foreground: 0 0% 100%;
    --muted: 240 5% 96%;
    --muted-foreground: 240 4% 46%;
    --accent: 240 5% 96%;
    --accent-foreground: 240 6% 10%;
    --destructive: 0 72% 51%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 6% 90%;
    --input: 240 6% 90%;
    --ring: 262 83% 58%;
    --radius: 0.75rem;
  }
}

@layer base {
  * {
    @apply border-border;
    font-family: var(--font-dm-sans, 'DM Sans'), sans-serif;
  }
  body {
    @apply bg-background text-foreground;
    overflow-x: hidden;
  }
}

/* ── Noise texture ──────────────────────────────────────────── */
body::after {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
  opacity: 0.022;
  pointer-events: none;
  z-index: 9999;
}

/* ── Utilities ──────────────────────────────────────────────── */
@layer utilities {
  .gradient-text {
    @apply bg-gradient-to-r from-violet-700 to-pink-500 bg-clip-text text-transparent;
  }

  .glass {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.6);
  }

  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add app/globals.css
git commit -m "feat: add global CSS with shadcn variables, gradient-text, glass, noise texture"
```

---

## Task 6: Shared presentational components

**Files:**
- Create: `components/gradient-orbs.tsx`
- Create: `components/section-header.tsx`
- Create: `components/skill-chip.tsx`

- [ ] **Step 1: Create `components/gradient-orbs.tsx`**

```tsx
// components/gradient-orbs.tsx
'use client'
import { motion } from 'framer-motion'

export function GradientOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-violet-400/[0.18] blur-[90px]"
        animate={{ x: [0, 28, 0], y: [0, -18, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-pink-400/[0.14] blur-[90px]"
        animate={{ x: [0, -22, 0], y: [0, 26, 0] }}
        transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-400/[0.08] blur-[80px]"
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
```

- [ ] **Step 2: Create `components/section-header.tsx`**

```tsx
// components/section-header.tsx
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  counter: string   // e.g. "01 —"
  heading: string   // e.g. "about."
  subtitle?: string
  light?: boolean   // true = light text (for dark section backgrounds)
  className?: string
}

export function SectionHeader({ counter, heading, subtitle, light, className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-12', className)}>
      <p className={cn('mb-2 text-[10px] font-bold uppercase tracking-[3px]', light ? 'text-white/20' : 'text-gray-300')}>
        {counter}
      </p>
      <h2 className={cn('text-5xl font-black tracking-tight md:text-7xl', light ? 'text-white/90' : 'gradient-text')}>
        {heading}
      </h2>
      {subtitle && (
        <p className={cn('mt-3 text-sm font-medium', light ? 'text-white/40' : 'text-gray-400')}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Create `components/skill-chip.tsx`**

```tsx
// components/skill-chip.tsx
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface SkillChipProps {
  name: string
  icon: string
  className?: string
}

export function SkillChip({ name, icon, className }: SkillChipProps) {
  return (
    <div className={cn('group flex flex-col items-center gap-2 rounded-xl p-3 transition-colors hover:bg-violet-50', className)}>
      <Image
        src={icon}
        alt={name}
        width={48}
        height={48}
        className="h-12 w-12 object-contain"
        loading="lazy"
      />
      <span className="select-none text-[10px] font-semibold uppercase tracking-widest text-gray-300 transition-colors group-hover:text-violet-400">
        {name}
      </span>
    </div>
  )
}
```

- [ ] **Step 4: Verify TypeScript**

```bash
npx tsc --noEmit 2>&1 | grep -v "Cannot find module.*content"
```

Expected: no errors (content module errors are expected until build time).

- [ ] **Step 5: Commit**

```bash
git add components/gradient-orbs.tsx components/section-header.tsx components/skill-chip.tsx
git commit -m "feat: add GradientOrbs, SectionHeader, SkillChip components"
```

---

## Task 7: Page wrapper (transition overlay)

**Files:**
- Create: `components/page-wrapper.tsx`

- [ ] **Step 1: Create `components/page-wrapper.tsx`**

```tsx
// components/page-wrapper.tsx
'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTransitionStore } from '@/lib/store'

interface PageWrapperProps {
  title: string
  children: React.ReactNode
}

// Keyframe: slide down (0 → 600ms), hold (600 → 1200ms), slide up (1200 → 1800ms)
const overlayVariants = {
  animate: {
    y: ['-100%', '0%', '0%', '-100%'],
    transition: {
      duration: 1.8,
      times: [0, 0.333, 0.666, 1],
      ease: 'linear' as const,
    },
  },
}

const titleVariants = {
  animate: {
    opacity: [0, 0, 1, 1, 0],
    x: [-12, -12, 0, 0, 0],
    transition: {
      duration: 1.8,
      times: [0, 0.3, 0.46, 0.7, 1],
      ease: 'easeOut' as const,
    },
  },
}

export function PageWrapper({ title, children }: PageWrapperProps) {
  const { setTransitioning } = useTransitionStore()
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setTransitioning(true)
    document.body.style.overflowY = 'hidden'

    timerRef.current = setTimeout(() => {
      setTransitioning(false)
      document.body.style.overflowY = ''
    }, 1800)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      document.body.style.overflowY = ''
    }
  }, [setTransitioning])

  return (
    <>
      {/* Slide overlay */}
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950"
        variants={overlayVariants}
        initial={{ y: '-100%' }}
        animate="animate"
      >
        <motion.p
          className="text-5xl font-black uppercase tracking-widest text-white md:text-7xl"
          variants={titleVariants}
          initial={{ opacity: 0, x: -12 }}
          animate="animate"
        >
          {title}
        </motion.p>
      </motion.div>
      {children}
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/page-wrapper.tsx
git commit -m "feat: add PageWrapper slide-down transition overlay"
```

---

## Task 8: Navbar

**Files:**
- Create: `components/navbar.tsx`

- [ ] **Step 1: Create `components/navbar.tsx`**

```tsx
// components/navbar.tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTransitionStore } from '@/lib/store'
import { IoHomeSharp, IoPersonCircle, IoBookSharp, IoCallSharp } from 'react-icons/io5'
import { cn } from '@/lib/utils'

const links = [
  { href: '/', icon: IoHomeSharp, label: 'Home' },
  { href: '/about', icon: IoPersonCircle, label: 'About' },
  { href: '/portfolio', icon: IoBookSharp, label: 'Portfolio' },
  { href: '/contact', icon: IoCallSharp, label: 'Contact' },
]

export function Navbar() {
  const pathname = usePathname()
  const { isTransitioning } = useTransitionStore()

  return (
    <nav
      className="fixed bottom-[4%] left-1/2 z-40 -translate-x-1/2"
      aria-label="Main navigation"
    >
      <div className="glass flex items-center gap-2 rounded-full px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.08)] sm:gap-3">
        {links.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
              tabIndex={isTransitioning || isActive ? -1 : 0}
              onClick={(e) => { if (isTransitioning || isActive) e.preventDefault() }}
              className={cn(
                'flex items-center justify-center rounded-full p-2.5 transition-all duration-200',
                isActive
                  ? 'bg-violet-700 shadow-lg shadow-violet-700/25 pointer-events-none'
                  : 'bg-gray-950 hover:scale-110 hover:shadow-md',
                isTransitioning && 'pointer-events-none opacity-60',
              )}
            >
              <Icon size={18} color="white" aria-hidden />
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/navbar.tsx
git commit -m "feat: add glass morphism Navbar with Zustand transition lock"
```

---

## Task 9: Typewriter component

**Files:**
- Create: `components/typewriter.tsx`

- [ ] **Step 1: Create `components/typewriter.tsx`**

```tsx
// components/typewriter.tsx
'use client'
import { useEffect, useRef, useState } from 'react'

const WORDS = ['Full-stack Dev', 'Engineer', 'College Student']
const TYPE_MS = 100
const DELETE_MS = 50
const PAUSE_MS = 2200

type Phase = 'typing' | 'pausing' | 'deleting'

export function Typewriter() {
  const [display, setDisplay] = useState('')
  const phaseRef = useRef<Phase>('typing')
  const wordRef = useRef(0)
  const charRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    function tick() {
      const word = WORDS[wordRef.current]

      if (phaseRef.current === 'typing') {
        if (charRef.current < word.length) {
          charRef.current++
          setDisplay(word.slice(0, charRef.current))
          timerRef.current = setTimeout(tick, TYPE_MS)
        } else {
          phaseRef.current = 'pausing'
          timerRef.current = setTimeout(tick, PAUSE_MS)
        }
      } else if (phaseRef.current === 'pausing') {
        phaseRef.current = 'deleting'
        timerRef.current = setTimeout(tick, DELETE_MS)
      } else {
        if (charRef.current > 0) {
          charRef.current--
          setDisplay(word.slice(0, charRef.current))
          timerRef.current = setTimeout(tick, DELETE_MS)
        } else {
          wordRef.current = (wordRef.current + 1) % WORDS.length
          phaseRef.current = 'typing'
          timerRef.current = setTimeout(tick, TYPE_MS)
        }
      }
    }

    timerRef.current = setTimeout(tick, 600) // Initial delay
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <span className="text-violet-600 font-semibold">
      {display}
      <span
        className="ml-0.5 inline-block h-[1em] w-0.5 bg-violet-600 animate-blink align-middle"
        aria-hidden
      />
    </span>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/typewriter.tsx
git commit -m "feat: add single-effect Typewriter with ref-based state and proper cleanup"
```

---

## Task 10: Root layout

**Files:**
- Create: `app/layout.tsx`

- [ ] **Step 1: Create `app/layout.tsx`**

```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { GradientOrbs } from '@/components/gradient-orbs'

const dmSans = DM_Sans({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Yazidane Hakim',
  description: 'Full-stack developer, civil engineering student at National Taiwan University.',
  icons: { icon: '/cover.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body>
        <GradientOrbs />
        {children}
        <Navbar />
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Run dev server and verify the layout renders**

```bash
npm run dev
```

Open `http://localhost:3000` — should see a mostly-empty page with the navbar pill at the bottom and a gradient orb in the top-right corner. No console errors.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: add root layout with DM Sans font, GradientOrbs, Navbar"
```

---

## Task 11: Home page

**Files:**
- Create: `components/home-client.tsx`
- Create: `app/page.tsx`

- [ ] **Step 1: Create `components/home-client.tsx`**

```tsx
// components/home-client.tsx
'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Typewriter } from '@/components/typewriter'
import { PageWrapper } from '@/components/page-wrapper'
import {
  IoCloudDownloadSharp,
  IoPersonCircleSharp,
} from 'react-icons/io5'
import {
  FaLinkedinIn,
  FaGithub,
  FaInstagram,
  FaFacebook,
} from 'react-icons/fa'
import type { Profile } from '@/lib/schemas'

interface HomeClientProps {
  profile: Profile
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export function HomeClient({ profile }: HomeClientProps) {
  return (
    <PageWrapper title="home">
      <main className="relative min-h-screen w-full px-6 pb-32 pt-24 md:px-16">
        {/* Ghost watermark */}
        <motion.p
          aria-hidden
          className="pointer-events-none absolute left-0 top-1/3 select-none text-[12vw] font-black uppercase text-violet-900/[0.04] leading-none tracking-tighter"
          animate={{ x: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        >
          YAZIDANE
        </motion.p>

        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          {/* Left — text */}
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.p variants={item} className="mb-2 text-sm font-medium text-gray-400">
              Hi there, I&apos;m
            </motion.p>

            <motion.h1
              variants={item}
              className="gradient-text text-6xl font-black leading-tight tracking-tight md:text-7xl xl:text-8xl"
            >
              {profile.name}.
            </motion.h1>

            <motion.p variants={item} className="mt-3 text-lg font-medium text-gray-600">
              <Typewriter />
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-xl bg-gray-950 text-white hover:bg-gray-800">
                <a href={profile.resumeUrl} download>
                  <IoCloudDownloadSharp className="mr-2" size={18} />
                  Resume
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-xl border-gray-200 hover:border-violet-300 hover:text-violet-700">
                <Link href="/about">
                  <IoPersonCircleSharp className="mr-2" size={18} />
                  About me
                </Link>
              </Button>
            </motion.div>

            {/* Social links */}
            <motion.div variants={item} className="mt-8 flex gap-4">
              {[
                { href: profile.socials.linkedin, icon: FaLinkedinIn, label: 'LinkedIn' },
                { href: profile.socials.github, icon: FaGithub, label: 'GitHub' },
                { href: profile.socials.instagram, icon: FaInstagram, label: 'Instagram' },
                { href: profile.socials.facebook, icon: FaFacebook, label: 'Facebook' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-all hover:scale-110 hover:border-violet-300 hover:text-violet-600"
                >
                  <Icon size={16} />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="relative hidden justify-center md:flex"
          >
            <Image
              src="/images/hero.webp"
              alt="Yazidane Hakim"
              width={400}
              height={500}
              priority
              className="relative z-10 drop-shadow-xl"
            />
          </motion.div>
        </div>
      </main>
    </PageWrapper>
  )
}
```

- [ ] **Step 2: Create `app/page.tsx`**

```tsx
// app/page.tsx
import { getProfile } from '@/lib/content'
import { HomeClient } from '@/components/home-client'

export default function HomePage() {
  const profile = getProfile()
  return <HomeClient profile={profile} />
}
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Open `http://localhost:3000`. Verify:
- Transition overlay slides in/out on load
- Name renders with gradient text
- Typewriter cycles through words
- Navbar shows at bottom
- Gradient orbs visible in background
- Resume and About buttons present

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx components/home-client.tsx
git commit -m "feat: build Home page with gradient hero, typewriter, social links"
```

---

## Task 12: About page — bento bio + photo gallery

**Files:**
- Create: `components/about-client.tsx` (partial — bento section only, timeline and skills added in Tasks 13/14)

Note: We build `about-client.tsx` incrementally across Tasks 12–14. In Task 12 create the file with the bento bio section. In Tasks 13 and 14, add the timeline and skills sections to the same file.

- [ ] **Step 1: Create `components/about-client.tsx` with bento bio + photo gallery**

```tsx
// components/about-client.tsx
'use client'
import Image from 'next/image'
import { PageWrapper } from '@/components/page-wrapper'
import { SectionHeader } from '@/components/section-header'
import { Card } from '@/components/ui/card'
import { TimelineItem } from '@/components/timeline-item'
import { SkillGrid } from '@/components/skill-grid'
import type { Profile, TimelineItem as TL, Skill } from '@/lib/schemas'

interface AboutClientProps {
  profile: Profile
  timeline: TL[]
  skills: Skill[]
}

const PHOTOS = Array.from({ length: 11 }, (_, i) => `/images/photos/${i + 1}.webp`)

export function AboutClient({ profile, timeline, skills }: AboutClientProps) {
  return (
    <PageWrapper title="about">
      <main className="w-full pb-32 pt-24">

        {/* ── Section 1: Bio ─────────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-6 md:px-16">
          <SectionHeader counter="02 —" heading="about." subtitle="Full-stack developer learner" />

          {/* Bento grid */}
          <div className="grid grid-cols-3 gap-4">
            {/* Bio — wide */}
            <Card className="col-span-2 p-6 glass border-0 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[3px] text-gray-300 mb-2">Bio</p>
              <p className="text-gray-600 text-sm leading-relaxed">{profile.bio}</p>
            </Card>

            {/* Status — accent, tall */}
            <Card className="row-span-2 bg-violet-700 border-0 p-6 text-white flex flex-col justify-between shadow-lg">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[3px] text-violet-300 mb-2">Status</p>
                <p className="font-bold text-lg leading-tight">2nd year · NTU</p>
                <p className="text-violet-300 text-sm mt-1">Civil Engineering</p>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {['React', 'TypeScript', 'Node.js'].map((s) => (
                  <span key={s} className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold">
                    {s}
                  </span>
                ))}
              </div>
            </Card>

            {/* Location */}
            <Card className="p-4 glass border-0 shadow-sm">
              <p className="text-lg mb-0.5">📍</p>
              <p className="font-bold text-sm text-gray-800">Taipei, Taiwan</p>
              <p className="text-xs text-gray-400">NTU Campus</p>
            </Card>

            {/* Achievement */}
            <Card className="p-4 glass border-0 shadow-sm bg-violet-50/60">
              <p className="text-lg mb-0.5">🏆</p>
              <p className="font-bold text-sm text-gray-800">Gold Medal</p>
              <p className="text-xs text-gray-400">Informatics Olympiad</p>
            </Card>
          </div>

          {/* Photo gallery */}
          <div className="mt-8 flex gap-3 overflow-x-auto pb-3 hide-scrollbar">
            {PHOTOS.map((src, i) => (
              <div key={i} className="relative h-32 w-auto flex-shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={src}
                  alt={`Photo ${i + 1}`}
                  width={120}
                  height={128}
                  loading="lazy"
                  className="h-32 w-auto object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Timeline and Skills sections rendered below — added in Tasks 13 & 14 */}

      </main>
    </PageWrapper>
  )
}
```

- [ ] **Step 2: Create placeholder `components/timeline-item.tsx` and `components/skill-grid.tsx`** (full implementations in Tasks 13/14, stubs needed now for the import not to break)

```tsx
// components/timeline-item.tsx
'use client'
import type { TimelineItem as TL } from '@/lib/schemas'
export function TimelineItem({ item, index }: { item: TL; index: number }) {
  return <div key={index}>{item.title}</div>
}
```

```tsx
// components/skill-grid.tsx
'use client'
import type { Skill } from '@/lib/schemas'
export function SkillGrid({ skills }: { skills: Skill[] }) {
  return <div>{skills.map((s) => s.name).join(', ')}</div>
}
```

- [ ] **Step 3: Create `app/about/page.tsx`**

```tsx
// app/about/page.tsx
import { getProfile, getTimeline, getSkills } from '@/lib/content'
import { AboutClient } from '@/components/about-client'

export default function AboutPage() {
  const profile = getProfile()
  const timeline = getTimeline()
  const skills = getSkills()
  return <AboutClient profile={profile} timeline={timeline} skills={skills} />
}
```

- [ ] **Step 4: Verify in browser**

```bash
npm run dev
```

Navigate to `http://localhost:3000/about`. Verify bento grid renders, photo gallery scrolls horizontally, navbar pill changes active state to About icon.

- [ ] **Step 5: Commit**

```bash
git add app/about/ components/about-client.tsx components/timeline-item.tsx components/skill-grid.tsx
git commit -m "feat: About page bento bio grid and photo gallery"
```

---

## Task 13: About page — timeline section

**Files:**
- Modify: `components/timeline-item.tsx` (replace stub with full implementation)
- Modify: `components/about-client.tsx` (add timeline section)

- [ ] **Step 1: Replace `components/timeline-item.tsx` with full implementation**

```tsx
// components/timeline-item.tsx
'use client'
import { useEffect, useRef } from 'react'
import { Badge } from '@/components/ui/badge'
import { IoSchoolSharp, IoTrophySharp } from 'react-icons/io5'
import { cn } from '@/lib/utils'
import type { TimelineItem as TL } from '@/lib/schemas'

interface TimelineItemProps {
  item: TL
  index: number
  isLast: boolean
}

export function TimelineItem({ item, index, isLast }: TimelineItemProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute('data-visible', 'true')
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const isEducation = item.type === 'Education'

  return (
    <div
      ref={ref}
      data-visible="false"
      className="flex gap-5 opacity-0 translate-y-5 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Dot + line */}
      <div className="flex flex-col items-center pt-1 flex-shrink-0">
        <div
          className={cn(
            'h-3 w-3 rounded-full ring-4',
            isEducation
              ? 'bg-violet-500 ring-violet-500/20'
              : 'bg-pink-500 ring-pink-500/20',
          )}
        />
        {!isLast && <div className="mt-2 w-px flex-1 bg-white/10" />}
      </div>

      {/* Content */}
      <div className="pb-10">
        <Badge
          className={cn(
            'mb-2 border-0 text-[10px] font-bold',
            isEducation
              ? 'bg-violet-500/20 text-violet-300 hover:bg-violet-500/30'
              : 'bg-pink-500/20 text-pink-300 hover:bg-pink-500/30',
          )}
        >
          {isEducation ? <IoSchoolSharp className="mr-1" /> : <IoTrophySharp className="mr-1" />}
          {item.type}
        </Badge>
        <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-violet-400">
          {item.time}
        </p>
        <h3 className="text-lg font-bold text-white">{item.title}</h3>
        <p className="mt-0.5 text-sm text-white/40">{item.sub}</p>
        <p className="mt-2 text-sm leading-relaxed text-white/60">{item.description}</p>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Add timeline section to `components/about-client.tsx`**

Find the comment `{/* Timeline and Skills sections rendered below */}` and replace it with:

```tsx
        {/* ── Section 2: Timeline ─────────────────────────────── */}
        <section className="mt-24 bg-[#111] py-24">
          <div className="mx-auto max-w-6xl px-6 md:px-16">
            <SectionHeader
              counter="02B —"
              heading="timeline."
              subtitle="My life journey"
              light
              className="mb-16"
            />
            <div className="max-w-2xl">
              {timeline.map((item, i) => (
                <TimelineItem
                  key={`${item.time}-${item.title}`}
                  item={item}
                  index={i}
                  isLast={i === timeline.length - 1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Skills section placeholder — added in Task 14 */}
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Navigate to `/about`, scroll down. Timeline entries should fade in one-by-one as they enter the viewport. Purple dots for Education, pink for Award.

- [ ] **Step 4: Commit**

```bash
git add components/timeline-item.tsx components/about-client.tsx
git commit -m "feat: About timeline with IntersectionObserver scroll reveal"
```

---

## Task 14: About page — skills grid

**Files:**
- Modify: `components/skill-grid.tsx` (replace stub)
- Modify: `components/about-client.tsx` (add skills section)

- [ ] **Step 1: Replace `components/skill-grid.tsx` with full implementation**

```tsx
// components/skill-grid.tsx
'use client'
import { useEffect, useRef, useState } from 'react'
import { SkillChip } from '@/components/skill-chip'
import type { Skill } from '@/lib/schemas'

interface SkillGridProps {
  skills: Skill[]
  category: 'frontend' | 'backend'
  label: string
}

export function SkillGrid({ skills, category, label }: SkillGridProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const filtered = skills.filter((s) => s.category === category)

  return (
    <div ref={ref}>
      <p className="mb-4 text-[10px] font-bold uppercase tracking-[3px] text-gray-300">{label}</p>
      <div className="flex flex-wrap gap-2">
        {filtered.map((skill, i) => (
          <div
            key={skill.name}
            className="transition-all duration-500 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-20px)',
              transitionDelay: visible ? `${i * 70}ms` : '0ms',
            }}
          >
            <SkillChip name={skill.name} icon={skill.icon} />
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Add skills section to `components/about-client.tsx`**

Find `{/* Skills section placeholder — added in Task 14 */}` and replace with:

```tsx
        {/* ── Section 3: Skills ───────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-6 py-24 md:px-16">
          <SectionHeader counter="02C —" heading="skills." subtitle="Web Development Skills" />
          <div className="space-y-12">
            <SkillGrid skills={skills} category="frontend" label="Frontend" />
            <SkillGrid skills={skills} category="backend" label="Backend & Tools" />
          </div>
        </section>
```

- [ ] **Step 3: Verify in browser**

Scroll to the bottom of `/about`. Skills should stagger in from the left as the section enters the viewport.

- [ ] **Step 4: Commit**

```bash
git add components/skill-grid.tsx components/about-client.tsx
git commit -m "feat: About skills grid with stagger reveal via IntersectionObserver"
```

---

## Task 15: Portfolio page + project card

**Files:**
- Create: `components/project-card.tsx`
- Create: `components/portfolio-client.tsx`
- Create: `app/portfolio/page.tsx`

- [ ] **Step 1: Create `components/project-card.tsx`**

```tsx
// components/project-card.tsx
'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import type { Project } from '@/lib/schemas'

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const router = useRouter()

  function handleNav() {
    router.push(`/projects/${project.slug}`)
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleNav}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleNav() }}
      className={cn(
        'group relative flex cursor-pointer items-center gap-5',
        'border-b border-gray-100 py-6',
        'pl-0 transition-all duration-200 hover:pl-4',
        'outline-none focus-visible:rounded-lg focus-visible:ring-2 focus-visible:ring-violet-500',
      )}
    >
      {/* Hover thumbnail — desktop only */}
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute top-1/2 -translate-y-1/2',
          'right-full mr-4',
          'opacity-0 translate-x-3 transition-all duration-300',
          'group-hover:opacity-100 group-hover:translate-x-0',
          'hidden md:block',
        )}
      >
        <div className="relative h-24 w-40 overflow-hidden rounded-xl shadow-xl ring-1 ring-black/5">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="160px"
          />
        </div>
      </div>

      {/* Index */}
      <span className="w-8 flex-shrink-0 text-sm font-bold text-gray-200 transition-colors group-hover:text-violet-600">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <h3 className="text-xl font-black text-gray-900 leading-tight">{project.title}</h3>
        <p className="mt-0.5 truncate text-xs font-semibold uppercase tracking-wide text-gray-400">
          {project.tags.join(' · ')}
        </p>
      </div>

      {/* Arrow */}
      <span className="flex-shrink-0 text-lg text-violet-600 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100">
        →
      </span>
    </div>
  )
}
```

- [ ] **Step 2: Create `components/portfolio-client.tsx`**

```tsx
// components/portfolio-client.tsx
'use client'
import { PageWrapper } from '@/components/page-wrapper'
import { SectionHeader } from '@/components/section-header'
import { ProjectCard } from '@/components/project-card'
import type { Project } from '@/lib/schemas'

interface PortfolioClientProps {
  projects: Project[]
}

export function PortfolioClient({ projects }: PortfolioClientProps) {
  return (
    <PageWrapper title="portfolio">
      <main className="mx-auto max-w-4xl px-6 pb-32 pt-24 md:px-16">
        <SectionHeader
          counter="03 —"
          heading="projects."
          subtitle="Finished and on-going projects"
        />
        <div className="mt-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </main>
    </PageWrapper>
  )
}
```

- [ ] **Step 3: Create `app/portfolio/page.tsx`**

```tsx
// app/portfolio/page.tsx
import { getProjects } from '@/lib/content'
import { PortfolioClient } from '@/components/portfolio-client'

export default function PortfolioPage() {
  const projects = getProjects()
  return <PortfolioClient projects={projects} />
}
```

- [ ] **Step 4: Verify in browser**

Navigate to `/portfolio`. Projects list with numbered rows. On desktop, hover each row to see thumbnail appear on the left. Clicking navigates to `/projects/[slug]` (404 until Task 16).

- [ ] **Step 5: Commit**

```bash
git add app/portfolio/ components/portfolio-client.tsx components/project-card.tsx
git commit -m "feat: Portfolio page with hover-reveal numbered project list"
```

---

## Task 16: Project detail pages

**Files:**
- Create: `app/projects/[slug]/page.tsx`

- [ ] **Step 1: Create `app/projects/[slug]/page.tsx`**

```tsx
// app/projects/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getProjects, getProject } from '@/lib/content'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { GradientOrbs } from '@/components/gradient-orbs'
import { IoArrowBackSharp } from 'react-icons/io5'
import { FiExternalLink, FiGithub } from 'react-icons/fi'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const project = getProject(slug)
  return { title: project ? `${project.title} — Yazidane Hakim` : 'Not Found' }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  return (
    <main className="relative min-h-screen pb-32 pt-16">
      <GradientOrbs />

      <div className="mx-auto max-w-3xl px-6 md:px-16">
        {/* Back link */}
        <Link
          href="/portfolio"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-400 transition-colors hover:text-violet-600"
        >
          <IoArrowBackSharp size={16} />
          portfolio
        </Link>

        {/* Heading */}
        <h1 className="gradient-text mb-4 text-5xl font-black tracking-tight md:text-6xl">
          {project.title}
        </h1>

        {/* Tags */}
        <div className="mb-8 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-violet-50 text-violet-700 hover:bg-violet-100">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Screenshot */}
        <div className="relative mb-8 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5">
          <Image
            src={project.image}
            alt={project.title}
            width={900}
            height={540}
            priority
            className="w-full object-cover"
          />
        </div>

        {/* Description */}
        <p className="mb-10 text-base leading-relaxed text-gray-600">
          {project.fullDescription}
        </p>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg" className="rounded-xl bg-violet-700 text-white hover:bg-violet-800">
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              <FiExternalLink className="mr-2" size={16} />
              Live Demo
            </a>
          </Button>
          {project.github && (
            <Button asChild variant="outline" size="lg" className="rounded-xl border-gray-200 hover:border-violet-300 hover:text-violet-700">
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <FiGithub className="mr-2" size={16} />
                GitHub
              </a>
            </Button>
          )}
        </div>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Verify all three project pages build**

```bash
npm run build 2>&1 | grep -E "(projects|Error|warn)"
```

Expected: lines showing `/projects/noteify`, `/projects/instrument-store`, `/projects/animalist` generated. No errors.

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Navigate to `http://localhost:3000/projects/noteify`. Verify: back link, gradient title, tags, screenshot, description, demo button. Check `/projects/instrument-store` and `/projects/animalist` too.

- [ ] **Step 4: Commit**

```bash
git add app/projects/
git commit -m "feat: project detail pages with generateStaticParams from content/projects.json"
```

---

## Task 17: Contact page

**Files:**
- Create: `app/contact/page.tsx`

- [ ] **Step 1: Create `app/contact/page.tsx`**

```tsx
// app/contact/page.tsx
import Image from 'next/image'
import { getProfile } from '@/lib/content'
import { PageWrapper } from '@/components/page-wrapper'
import { SectionHeader } from '@/components/section-header'
import { Card } from '@/components/ui/card'

const CONTACT_METHODS = [
  { key: 'email' as const, label: 'Email', icon: '/images/contact/email.webp' },
  { key: 'linkedin' as const, label: 'LinkedIn', icon: '/images/contact/linkedin.webp' },
  { key: 'whatsapp' as const, label: 'WhatsApp', icon: '/images/contact/whatsapp.webp' },
  { key: 'line' as const, label: 'Line', icon: '/images/contact/line.webp' },
]

export default function ContactPage() {
  const { contact } = getProfile()

  return (
    <PageWrapper title="contact">
      <main className="mx-auto max-w-6xl px-6 pb-32 pt-24 md:px-16">
        <SectionHeader
          counter="04 —"
          heading="contacts."
          subtitle="Get in touch with me"
        />

        <div className="grid gap-10 md:grid-cols-2">
          {/* Direct info */}
          <Card className="glass border-0 p-8 shadow-sm space-y-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[3px] text-gray-300 mb-1">Name</p>
              <p className="font-bold text-gray-800">Yazidane Hakim</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[3px] text-gray-300 mb-1">Address</p>
              <p className="text-sm text-gray-600">{contact.address}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[3px] text-gray-300 mb-1">Phone</p>
              <p className="text-sm text-gray-600">{contact.phone}</p>
            </div>
          </Card>

          {/* Contact methods */}
          <div className="grid grid-cols-2 gap-3">
            {CONTACT_METHODS.map(({ key, label, icon }) => (
              <Card
                key={key}
                className="glass border-0 p-4 shadow-sm flex items-center gap-3 hover:shadow-md hover:border-violet-100 transition-all duration-200"
              >
                <Image src={icon} alt={label} width={30} height={30} className="flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[2px] text-gray-300">{label}</p>
                  <p className="text-xs font-semibold text-gray-700 truncate">{contact[key]}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </PageWrapper>
  )
}
```

- [ ] **Step 2: Verify in browser**

Navigate to `/contact`. Check: transition overlay, section header, info card, four contact method cards with icons. Navbar contact button is active.

- [ ] **Step 3: Commit**

```bash
git add app/contact/
git commit -m "feat: Contact page with glass morphism cards"
```

---

## Task 18: Cleanup old Vite files + full build + deploy

**Files:**
- Delete: `src/` (entire directory)
- Delete: `index.html`
- Delete: `vite.config.ts`
- Delete: `.eslintrc.cjs`
- Modify: `package.json`
- Modify: `CLAUDE.md`
- Modify: `.gitignore`

- [ ] **Step 1: Run a full production build and fix any errors**

```bash
npm run build 2>&1
```

Fix any TypeScript or build errors before continuing. Expected output ends with:
```
Route (app)
┌ ○ /
├ ○ /about
├ ○ /contact
├ ○ /portfolio
├ ● /projects/[slug]
└ ...
```

- [ ] **Step 2: Delete old Vite source files**

```bash
rm -rf src/ index.html vite.config.ts .eslintrc.cjs
```

- [ ] **Step 3: Update `package.json` — remove Vite dev dependencies**

Remove from `devDependencies`:
```
@vitejs/plugin-react (already removed in Task 1)
vite (already removed in Task 1)
gh-pages (keep this — needed for deploy)
```

Ensure scripts section is:
```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "lint": "next lint",
  "preview": "npx serve out",
  "deploy": "next build && touch out/.nojekyll && gh-pages -d out --dotfiles"
}
```

- [ ] **Step 4: Update `CLAUDE.md`**

Replace the Commands section:

```markdown
## Commands

```bash
npm run dev        # Start Next.js dev server with HMR at localhost:3000
npm run build      # Next.js production build (outputs to out/)
npm run lint       # ESLint via Next.js
npm run preview    # Preview static export locally (requires: npm i -g serve)
npm run deploy     # Build + push out/ to GitHub Pages via gh-pages
```

## Content updates (no code changes needed)
- Add a project: edit `content/projects.json`
- Add a timeline event: edit `content/timeline.json`
- Add a skill: edit `content/skills.json`
- Update bio / contact / socials: edit `content/profile.json`
```

- [ ] **Step 5: Add `out/` and `.superpowers/` to `.gitignore`** (already done in Task 1, verify):

```bash
grep -q "^out/" .gitignore && echo "ok" || echo "out/ missing from .gitignore"
grep -q "^.superpowers/" .gitignore && echo "ok" || echo ".superpowers/ missing from .gitignore"
```

Both should print `ok`.

- [ ] **Step 6: Run final build**

```bash
npm run build
```

Expected: zero errors, all 8+ routes generated.

- [ ] **Step 7: Preview locally**

```bash
npx serve out -p 3001
```

Open `http://localhost:3001`. Navigate all pages. Verify:
- Home: typewriter, gradient name, social links, hero image
- About: bento bio, horizontal photo gallery, timeline reveals on scroll, skills stagger in
- Portfolio: numbered list, hover reveals thumbnail on desktop, clicking navigates to detail page
- Project detail: back link, tags, screenshot, demo button
- Contact: info card + 4 contact method cards
- Navbar: correct active state per page
- Page transitions: overlay slides on every page change

- [ ] **Step 8: Commit cleanup**

```bash
git add -A
git commit -m "chore: remove Vite artifacts, update CLAUDE.md for Next.js"
```

- [ ] **Step 9: Deploy to GitHub Pages**

```bash
npm run deploy
```

Expected: builds, creates `out/.nojekyll`, pushes `out/` to `gh-pages` branch. After ~1 minute, verify at `https://zidanehakim.github.io`.

- [ ] **Step 10: Final commit**

```bash
git add package.json CLAUDE.md
git commit -m "chore: finalize Next.js migration deploy scripts and docs"
```

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Covered in |
|---|---|
| Next.js 15 App Router, static export | Task 1 |
| Zustand transition lock | Task 2, 7, 8 |
| shadcn/ui Button, Card, Badge | Task 1 (init), used in 11–17 |
| Framer Motion (transform/opacity only) | Task 6 (orbs), 7 (transition), 11 (home) |
| JSON content + Zod | Tasks 2, 3 |
| next/font DM Sans | Task 10 |
| next/image unoptimized + explicit dimensions | All image tasks |
| Images pre-converted to WebP | Task 4 |
| Gradient orbs (web3) | Task 6 |
| Glass morphism (web3) | Task 5 (.glass utility), used in 8, 12, 17 |
| Gradient text (web3) | Task 5 (.gradient-text utility), used in 11–15 |
| Noise texture | Task 5 |
| Ghost watermark per section | Task 11 (Home), section-header ghosting via section |
| Section counters | Task 6 (section-header), used in 11–17 |
| Page transition overlay | Task 7 |
| Navbar glass morphism | Task 8 |
| Typewriter single-effect, no concurrent intervals | Task 9 |
| Home page | Task 11 |
| About bento grid | Task 12 |
| About timeline IntersectionObserver | Task 13 |
| About skills stagger reveal | Task 14 |
| Portfolio hover-reveal numbered list | Task 15 |
| Project detail pages /projects/[slug] | Task 16 |
| Contact page | Task 17 |
| Cleanup old Vite files | Task 18 |
| GitHub Pages deploy | Task 18 |

**All spec requirements covered. No gaps.**

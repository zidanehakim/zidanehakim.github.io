# Next.js Portfolio Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate Vite + React 18 portfolio to Next.js 15 App Router with blazing performance, preserved visual identity, and a PRETEXT-powered IdentityShowcase section.

**Architecture:** Next.js 15 static export (`output: 'export'`) replacing Vite. Root `layout.tsx` holds a `'use client'` `LayoutWrapper` with `AnimatePresence` keyed on pathname for page transitions. All pages are Server Components; interactive sections use `'use client'` only where needed.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, shadcn/ui, Framer Motion, Zustand, Lucide React, lottie-react (lazy), PRETEXT SDK, next/font/google, gh-pages

---

## File Map

| File | Responsibility |
|---|---|
| `next.config.ts` | `output: 'export'`, image unoptimized for static |
| `tailwind.config.ts` | extend colors, dot-grid pattern |
| `app/layout.tsx` | Root: font, metadata, LayoutWrapper |
| `app/page.tsx` | Home route |
| `app/about/page.tsx` | About route |
| `app/portfolio/page.tsx` | Portfolio route |
| `app/contact/page.tsx` | Contact route |
| `components/layout/LayoutWrapper.tsx` | `'use client'` AnimatePresence + pathname key |
| `components/layout/PageTransition.tsx` | 300ms dark overlay, wraps each page |
| `components/layout/Navbar.tsx` | Floating pill, Lucide icons, Zustand active state |
| `components/layout/Logo.tsx` | Absolute center-top logo image |
| `components/sections/Hero.tsx` | Typewriter, dot-grid, ghost text, hero image |
| `components/sections/IdentityShowcase.tsx` | Scanner beam + constellation canvas, PRETEXT-powered |
| `components/sections/Timeline.tsx` | Scroll-driven cards on dark bg |
| `components/sections/Skills.tsx` | Icon grid with Radix tooltips |
| `components/sections/ProjectCarousel.tsx` | Keyboard+swipe carousel, frosted glass cards |
| `components/sections/ContactInfo.tsx` | Two-column contact layout |
| `store/useNavStore.ts` | `{ isTransitioning, setTransitioning }` |
| `lib/data.ts` | All static content: timeline, projects, skills |
| `lib/motion.ts` | Shared Framer Motion variants |

---

## Task 1: Bootstrap Next.js 15 project

**Files:**
- Create: `next.config.ts`
- Create: `tailwind.config.ts`
- Create: `app/globals.css`
- Modify: `package.json`

- [ ] **Step 1: Install Next.js 15 and all dependencies**

```bash
npm install next@15 react@18 react-dom@18
npm install framer-motion zustand lucide-react lottie-react
npm install pretext
npm install @radix-ui/react-tooltip class-variance-authority clsx tailwind-merge
npm install -D tailwindcss@latest postcss autoprefixer @types/node
npx shadcn@latest init --defaults
```

- [ ] **Step 2: Create `next.config.ts`**

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,   // required for static export
  },
}

export default nextConfig
```

- [ ] **Step 3: Create `tailwind.config.ts`**

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#7c3aed',
      },
      backgroundImage: {
        'dot-grid': 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
      },
      backgroundSize: {
        'dot-grid': '20px 20px',
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 4: Create `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  overflow-x: hidden;
}

.logo:hover .logoText { opacity: 1; }
.logo .logoIcon { background-color: white; }
.logo:hover .logoIcon { background-color: #9c9c9c; }
.images::-webkit-scrollbar { display: none; }
.images { -ms-overflow-style: none; scrollbar-width: none; }
```

- [ ] **Step 5: Update `package.json` scripts**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d out"
  }
}
```

- [ ] **Step 6: Verify Next.js starts**

```bash
npm run dev
```
Expected: server starts at `http://localhost:3000` (will 404 until we add pages — that's fine)

- [ ] **Step 7: Commit**

```bash
git add next.config.ts tailwind.config.ts app/globals.css package.json package-lock.json
git commit -m "feat: bootstrap Next.js 15 with static export config"
```

---

## Task 2: Static data and motion variants

**Files:**
- Create: `lib/data.ts`
- Create: `lib/motion.ts`

- [ ] **Step 1: Create `lib/data.ts`**

```typescript
export const timelineData = [
  {
    type: 'Education',
    time: '2022–Present',
    title: 'National Taiwan University, Civil Engineering Department',
    sub: '2nd year',
    description:
      'As I\'m into engineering and would like to try something new, Civil Engineering does attract my interest a lot. Being able to analyze structures and make durable buildings, combined with mechanical theory and all of its complexity, makes the learning process more fun.',
  },
  {
    type: 'Award',
    time: '2022–Present',
    title: 'Beasiswa Indonesia Maju (BIM) Awardee',
    sub: 'Ministry of Education, Culture, Research, and Technology',
    description:
      'Participating in the National Indonesian Informatics Olympiad 2021 brought me the opportunity to become an awardee of the Maju Scholarship and to choose National Taiwan University for my further studies.',
  },
  {
    type: 'Award',
    time: '2023',
    title: 'Best Automation Award, Best Automation Group',
    sub: 'Physical Model Design Laboratory, NTU Civil Engineering Course',
    description:
      'Rail track projects, I\'ve always strived to create the best and most creative projects combined with programming. In this case, the Raspberry Pi sends an HTML file to localhost:5000 when certain conditions of the rail are met.',
  },
  {
    type: 'Award',
    time: '2021',
    title: 'National Informatics Olympiad',
    sub: 'Finalist',
    description:
      'Having obtained a gold medal in the Bengkulu Informatics Olympiad 2021, I was chosen to represent the Bengkulu province in the National Informatics field. Consequently, I had the opportunity to participate as a finalist in the competition.',
  },
  {
    type: 'Award',
    time: '2021',
    title: 'Bengkulu Informatics Olympiad',
    sub: 'Gold Medal',
    description:
      'I\'ve always been passionate about programming, starting from school-level qualifications, advancing to district competitions, and eventually participating at the provincial level. Hard work paid off when I was awarded a Gold Medal in the competition.',
  },
  {
    type: 'Education',
    time: '2019–2022',
    title: 'SMA Negeri 4 Rejang Lebong',
    sub: 'Senior High School',
    description:
      'Three years of senior high school, I was just a normal student, self-studying programming on my own.',
  },
]

export const projectsData = [
  {
    name: 'noteify',
    desc: 'Design your planner with drag-and-drop sticky notes, featuring weather forecasts, real-time clocks, and location tracking. Easily create, stick, and track tasks.',
    url: 'https://noteify-io.netlify.app/',
    image: '/web_noteify.png',
  },
  {
    name: 'instrument store',
    desc: 'Welcome to our online instrument store, where cozy ambiance meets jazzy design. Search for your desired instruments now and begin your musical journey!',
    url: 'https://zidanehakim.github.io/react-instrument-store',
    image: '/web_instrument store.png',
  },
  {
    name: 'animalist',
    desc: 'Anime related stuffs search engine (characters, animes, movies) with cool parallax landing page, fetch data from Jikan API.',
    url: 'https://zidanehakim.github.io/animalist',
    image: '/web_animalist.png',
  },
]

export const frontEndSkills = [
  'html5', 'css', 'javascript', 'react',
  'tailwind', 'bootstrap', 'framer', 'typescript', 'unity',
]

export const backEndSkills = [
  'nodejs', 'expressjs', 'mongodb',
  'supabase', 'git', 'github', 'json',
]

export const socialLinks = [
  { href: 'https://www.linkedin.com/in/yazidane-hakim-25754128a/', label: 'LinkedIn' },
  { href: 'https://github.com/zidanehakim', label: 'GitHub' },
  { href: 'https://www.instagram.com/yazidanehakim/', label: 'Instagram' },
  { href: 'https://www.facebook.com/ZidanyuChan/', label: 'Facebook' },
]

export const contactDetails = {
  name: 'Yazidane Hakim',
  address: '50 Changxing St, Daan Dist, Taipei City, Taiwan',
  phone: '+886 908735498',
  email: 'zidanehakimgt@gmail.com',
  linkedin: 'Yazidane Hakim',
  whatsapp: '0908735498',
  line: 'yazidanehakim',
}
```

- [ ] **Step 2: Create `lib/motion.ts`**

```typescript
import type { Variants } from 'framer-motion'

export const pageTransitionOverlay: Variants = {
  initial: { y: '-100%' },
  enter:   { y: '0%',    transition: { duration: 0.3, ease: 'easeIn' } },
  exit:    { y: '-100%', transition: { duration: 0.3, ease: 'easeOut', delay: 0.2 } },
}

export const pageFadeIn: Variants = {
  initial: { opacity: 0 },
  enter:   { opacity: 1, transition: { duration: 0.2, delay: 0.3 } },
  exit:    { opacity: 0, transition: { duration: 0.15 } },
}

export const sectionReveal: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

export const staggerItem: Variants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.4 } },
}

export const cardVariant: Variants = {
  hidden:  { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.6 } },
}
```

- [ ] **Step 3: Commit**

```bash
git add lib/data.ts lib/motion.ts
git commit -m "feat: add static data and shared motion variants"
```

---

## Task 3: Zustand store + LayoutWrapper + PageTransition

**Files:**
- Create: `store/useNavStore.ts`
- Create: `components/layout/LayoutWrapper.tsx`
- Create: `components/layout/PageTransition.tsx`

- [ ] **Step 1: Create `store/useNavStore.ts`**

```typescript
import { create } from 'zustand'

interface NavStore {
  isTransitioning: boolean
  setTransitioning: (val: boolean) => void
}

export const useNavStore = create<NavStore>((set) => ({
  isTransitioning: false,
  setTransitioning: (val) => set({ isTransitioning: val }),
}))
```

- [ ] **Step 2: Create `components/layout/PageTransition.tsx`**

```typescript
'use client'

import { motion } from 'framer-motion'
import { pageFadeIn } from '@/lib/motion'

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={pageFadeIn}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 3: Create `components/layout/LayoutWrapper.tsx`**

```typescript
'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { pageTransitionOverlay } from '@/lib/motion'
import { useNavStore } from '@/store/useNavStore'

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const setTransitioning = useNavStore((s) => s.setTransitioning)

  useEffect(() => {
    setTransitioning(true)
    const t = setTimeout(() => setTransitioning(false), 350)
    return () => clearTimeout(t)
  }, [pathname, setTransitioning])

  return (
    <>
      <AnimatePresence mode="wait">
        {/* Dark overlay that slides down then up between pages */}
        <motion.div
          key={pathname + '-overlay'}
          variants={pageTransitionOverlay}
          initial="initial"
          animate="exit"
          exit="enter"
          className="fixed inset-0 z-50 bg-gray-950 flex items-center justify-center pointer-events-none"
        >
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 0.05, duration: 0.25 } }}
            exit={{ opacity: 0 }}
            className="text-white text-5xl font-semibold capitalize"
            style={{ fontVariant: 'small-caps' }}
          >
            {pathname === '/' ? 'home' : pathname.slice(1)}
          </motion.span>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <div key={pathname}>
          {children}
        </div>
      </AnimatePresence>
    </>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add store/useNavStore.ts components/layout/LayoutWrapper.tsx components/layout/PageTransition.tsx
git commit -m "feat: add Zustand store, LayoutWrapper with AnimatePresence, PageTransition"
```

---

## Task 4: Root layout + Logo + Navbar

**Files:**
- Create: `app/layout.tsx`
- Create: `components/layout/Logo.tsx`
- Create: `components/layout/Navbar.tsx`

- [ ] **Step 1: Create `app/layout.tsx`**

```typescript
import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import { LayoutWrapper } from '@/components/layout/LayoutWrapper'
import { Navbar } from '@/components/layout/Navbar'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Yazidane Hakim — Portfolio',
  description: 'Full-stack developer, software engineer, NTU student.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className={`font-[family-name:var(--font-dm-sans)] overflow-x-hidden`}>
        <LayoutWrapper>
          <Navbar />
          {children}
        </LayoutWrapper>
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Create `components/layout/Logo.tsx`**

```typescript
import Image from 'next/image'
import logoSrc from '@/public/logo.png'   // adjust if needed — logo.png is in src/images currently, copy to public/

export function Logo() {
  return (
    <Image
      src={logoSrc}
      alt="Yazidane Hakim logo"
      width={200}
      height={60}
      priority
      className="absolute left-1/2 -translate-x-1/2 top-[1.5em] z-10"
    />
  )
}
```

**Note:** Copy `src/images/logo.png` → `public/logo.png` before this step.

```bash
cp src/images/logo.png public/logo.png
```

- [ ] **Step 3: Create `components/layout/Navbar.tsx`**

```typescript
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, User, Briefcase, Phone } from 'lucide-react'
import { useNavStore } from '@/store/useNavStore'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { href: '/',          icon: Home,      label: 'Home' },
  { href: '/about',     icon: User,      label: 'About' },
  { href: '/portfolio', icon: Briefcase, label: 'Work' },
  { href: '/contact',   icon: Phone,     label: 'Contact' },
]

export function Navbar() {
  const pathname = usePathname()
  const isTransitioning = useNavStore((s) => s.isTransitioning)

  return (
    <nav className="w-fit h-fit m-auto fixed bottom-[4%] left-1/2 -translate-x-1/2 py-3 px-5 z-40 shadow-2xl rounded-3xl backdrop-blur-md bg-white/85 border border-white/20">
      <div className="flex flex-row gap-5 text-gray-900 justify-center items-center">
        {links.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={isTransitioning || isActive ? 'pointer-events-none' : ''}
            >
              <div className="flex flex-col items-center gap-1 group">
                <div
                  className="rounded-full px-2 py-2 hover:scale-110 transition-all shadow-lg"
                  style={{
                    backgroundColor: isActive ? '#7c3aed' : '#030712',
                    boxShadow: isActive ? '0 0 8px #7c3aed66' : undefined,
                  }}
                >
                  <Icon color="white" size={20} />
                </div>
                <AnimatePresence>
                  <motion.span
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-[10px] font-medium"
                    style={{ color: isActive ? '#7c3aed' : '#9ca3af' }}
                  >
                    {label}
                  </motion.span>
                </AnimatePresence>
              </div>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
```

- [ ] **Step 4: Verify layout renders**

```bash
npm run dev
```
Open `http://localhost:3000` — expect a white page with the navbar visible at the bottom. No errors in console.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx components/layout/Logo.tsx components/layout/Navbar.tsx public/logo.png
git commit -m "feat: root layout with DM Sans font, Logo, Navbar with active state"
```

---

## Task 5: Home page — Hero section

**Files:**
- Create: `app/page.tsx`
- Create: `components/sections/Hero.tsx`

- [ ] **Step 1: Copy hero image to public**

```bash
cp src/images/hero.png public/hero.png
```

- [ ] **Step 2: Create `components/sections/Hero.tsx`**

```typescript
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Download, User, Linkedin, Github, Instagram, Facebook } from 'lucide-react'
import { Logo } from '@/components/layout/Logo'

const displayTexts = ['Full-stack Dev', 'Engineer', 'College Student']

export function Hero() {
  const [display, setDisplay]     = useState('.')
  const [isRemove, setIsRemove]   = useState(false)
  const [indexLetter, setLetter]  = useState(-1)
  const [indexWord, setWord]      = useState(0)
  const [cursorOn, setCursor]     = useState(true)

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setCursor((v) => !v), 500)
    return () => clearInterval(id)
  }, [])

  // Typewriter — single interval, proper cleanup
  useEffect(() => {
    const word = displayTexts[indexWord]
    if (!isRemove) {
      if (indexLetter + 1 < word.length) {
        const id = setTimeout(() => {
          setLetter((i) => i + 1)
          setDisplay((d) => d + word[indexLetter + 1])
        }, 100)
        return () => clearTimeout(id)
      } else {
        const id = setTimeout(() => setIsRemove(true), 4000)
        return () => clearTimeout(id)
      }
    } else {
      if (display.length > 1) {
        const id = setTimeout(() => {
          setLetter((i) => i - 1)
          setDisplay((d) => d.slice(0, -1))
        }, 100)
        return () => clearTimeout(id)
      } else {
        setWord((w) => (w + 1) % displayTexts.length)
        setLetter(-1)
        setIsRemove(false)
      }
    }
  }, [isRemove, display, indexLetter, indexWord])

  return (
    <div className="bg-white h-screen w-screen grid md:grid-cols-2 justify-center items-center relative overflow-x-hidden bg-dot-grid bg-dot-grid">
      <Logo />

      {/* Ghost name text */}
      <div className="w-screen absolute uppercase font-bold md:text-[10.5em] text-[8em] text-gray-950 opacity-[0.04] text-center overflow-x-hidden pointer-events-none select-none">
        <motion.h1 animate={{ x: [50, -50] }} transition={{ duration: 6, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}>
          Yazidane
        </motion.h1>
        <motion.h1 animate={{ x: [-50, 50] }} transition={{ duration: 6, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}>
          Hakim
        </motion.h1>
      </div>

      {/* Hero image */}
      <div className="z-10 md:justify-self-end md:static md:opacity-100 absolute left-1/2 -translate-x-1/2 opacity-40">
        <Image src="/hero.png" alt="Yazidane Hakim" width={400} height={500} priority className="m-auto" style={{ minWidth: 320 }} />
      </div>

      {/* Text content */}
      <div className="px-16 z-10 md:justify-self-start">
        <h1 className="text-gray-950 text-xl font-bold text-center my-3">Hi there! I&apos;m</h1>
        <h1 className="text-gray-950 text-4xl font-bold text-center my-3">Yazidane Hakim</h1>

        <p
          className={`text-[#7c3aed] m-auto text-center text-2xl w-fit font-bold px-2 my-5 uppercase box-content border-r-4 text-nowrap transition-colors ${
            cursorOn ? 'border-r-[#7c3aed]' : 'border-r-transparent'
          }`}
        >
          {display}
        </p>

        <div className="flex justify-center gap-3">
          <Link href="/YAZIDANE_HAKIM_RESUME.pdf" target="_blank" download>
            <button className="font-bold rounded-3xl bg-white text-gray-900 border border-gray-900 flex items-center gap-2 py-2 px-5 hover:scale-105 hover:shadow-[0_0_20px_#7c3aed44] transition-all">
              Resume <Download size={16} />
            </button>
          </Link>
          <Link href="/about">
            <button className="font-bold rounded-3xl bg-gray-950 text-white flex items-center gap-2 py-2 px-5 hover:scale-105 hover:shadow-[0_0_20px_#7c3aed66] transition-all">
              About <User size={16} />
            </button>
          </Link>
        </div>

        <div className="flex justify-center gap-4 mt-5">
          <a href="https://www.linkedin.com/in/yazidane-hakim-25754128a/" target="_blank" className="hover:scale-110 transition-transform"><Linkedin size={24} /></a>
          <a href="https://github.com/zidanehakim" target="_blank" className="hover:scale-110 transition-transform"><Github size={24} /></a>
          <a href="https://www.instagram.com/yazidanehakim/" target="_blank" className="hover:scale-110 transition-transform"><Instagram size={24} /></a>
          <a href="https://www.facebook.com/ZidanyuChan/" target="_blank" className="hover:scale-110 transition-transform"><Facebook size={24} /></a>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create `app/page.tsx`**

```typescript
import { Hero } from '@/components/sections/Hero'
import { PageTransition } from '@/components/layout/PageTransition'

export default function HomePage() {
  return (
    <PageTransition>
      <Hero />
    </PageTransition>
  )
}
```

- [ ] **Step 4: Verify Home page**

```bash
npm run dev
```
Open `http://localhost:3000`. Expected: dot-grid background, ghost name text animating, typewriter cycling, hero image, two buttons, social icons, navbar at bottom.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx components/sections/Hero.tsx public/hero.png
git commit -m "feat: Home page with dot-grid hero, typewriter, glow CTAs"
```

---

## Task 6: IdentityShowcase — scanner + constellation

**Files:**
- Create: `components/sections/IdentityShowcase.tsx`

- [ ] **Step 1: Create `components/sections/IdentityShowcase.tsx`**

```typescript
'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import dynamic from 'next/dynamic'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

// Three identity nodes — asymmetric angles + radii
const NODES = [
  { label: 'Full-stack Dev',    angleDeg: -105, baseRadius: 130, delay: 0.0 },
  { label: 'Software Engineer', angleDeg:   28, baseRadius: 150, delay: 0.4 },
  { label: 'Student',           angleDeg:  145, baseRadius: 105, delay: 0.8 },
] as const

export function IdentityShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const rafRef     = useRef<number>(0)
  const tRef       = useRef(0)
  const isInView   = useInView(sectionRef, { once: false, margin: '-10%' })

  // Canvas constellation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    function resize() {
      if (!canvas) return
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    function draw() {
      const W = canvas!.width, H = canvas!.height
      const cx = W / 2, cy = H / 2
      ctx.clearRect(0, 0, W, H)
      tRef.current += 0.016
      const t = tRef.current
      const scale = Math.min(W, H) / 420

      NODES.forEach((n, i) => {
        const age    = Math.max(0, t - n.delay * 3)
        const fadeIn = Math.min(1, age * 0.4)
        if (fadeIn <= 0) return

        const rad    = (n.angleDeg * Math.PI) / 180
        const r      = n.baseRadius * scale
        const nx     = cx + Math.cos(rad) * r
        const ny     = cy + Math.sin(rad) * r
        const pulse  = Math.sin(t * 1.3 + i * 1.1) * 0.5 + 0.5
        const brightness = (0.25 + pulse * 0.75) * fadeIn  // dimMin=0.25

        // dashed edge
        ctx.save()
        ctx.globalAlpha = (0.08 + pulse * 0.14) * fadeIn
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(nx, ny)
        ctx.strokeStyle = '#7c3aed'
        ctx.lineWidth   = 1
        ctx.setLineDash([4, 8])
        ctx.stroke()
        ctx.setLineDash([])
        ctx.restore()

        // glow halo
        const g = ctx.createRadialGradient(nx, ny, 0, nx, ny, 22 * scale)
        g.addColorStop(0, `rgba(124,58,237,${0.22 * brightness})`)
        g.addColorStop(1, 'transparent')
        ctx.beginPath(); ctx.arc(nx, ny, 22 * scale, 0, Math.PI * 2)
        ctx.fillStyle = g; ctx.fill()

        // dot
        ctx.beginPath()
        ctx.arc(nx, ny, (3.5 + pulse * 1.8) * scale, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(167,139,250,${brightness})`
        ctx.fill()

        // label — same brightness as dot
        const dx = nx - cx, dy = ny - cy
        const dl = Math.sqrt(dx * dx + dy * dy)
        const lx = nx + (dx / dl) * 22 * scale
        const ly = ny + (dy / dl) * 22 * scale
        ctx.save()
        ctx.globalAlpha    = brightness
        ctx.font           = `bold ${Math.round(10 * scale)}px monospace`
        ctx.fillStyle      = '#c4b5fd'
        ctx.textAlign      = 'center'
        ctx.textBaseline   = 'middle'
        ctx.fillText(n.label, lx, ly)
        ctx.restore()
      })

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [])

  // Reset t when section re-enters view so nodes re-animate
  useEffect(() => {
    if (isInView) tRef.current = 0
  }, [isInView])

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{ height: '60vh', background: '#06060f' }}
    >
      {/* Constellation canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* ASCII corners */}
      <span className="absolute top-4 left-4 font-mono text-[#1e1e38] text-xs leading-tight select-none">┌──<br />│</span>
      <span className="absolute top-4 right-4 font-mono text-[#1e1e38] text-xs leading-tight text-right select-none">──┐<br />│</span>
      <span className="absolute bottom-4 left-4 font-mono text-[#1e1e38] text-xs leading-tight select-none">│<br />└──</span>
      <span className="absolute bottom-4 right-4 font-mono text-[#1e1e38] text-xs leading-tight text-right select-none">│<br />──┘</span>

      {/* Lottie sparkle — lazy loaded, top-right area */}
      <div className="absolute top-6 right-20 w-16 h-16 opacity-60 pointer-events-none">
        <Lottie
          path="https://assets10.lottiefiles.com/packages/lf20_u4yrau.json"
          loop
          autoplay
        />
      </div>

      {/* Scanner + name — on top of canvas */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Scanner text */}
        <div className="relative inline-block mb-2">
          {/* Ghost (dark) */}
          <span
            className="text-[2em] md:text-[2.5em] font-extrabold tracking-tight select-none whitespace-nowrap"
            style={{ color: '#0d0d20', letterSpacing: '-0.02em' }}
          >
            Yazidane Hakim
          </span>

          {/* Revealed (light) — animated clip */}
          <motion.span
            className="absolute inset-0 overflow-hidden whitespace-nowrap text-[2em] md:text-[2.5em] font-extrabold tracking-tight"
            style={{ letterSpacing: '-0.02em', color: '#e8e8ff' }}
            animate={isInView
              ? { width: ['0%', '100%', '100%', '0%'], opacity: [0, 1, 1, 0] }
              : { width: '0%', opacity: 0 }
            }
            transition={{ duration: 5, times: [0, 0.4, 0.75, 1], repeat: Infinity, ease: 'easeInOut' }}
          >
            Yazidane Hakim
          </motion.span>

          {/* Beam */}
          <motion.div
            className="absolute top-[-6px] bottom-[-6px] w-[2px] pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, transparent, #7c3aed, #a855f7, #7c3aed, transparent)',
              boxShadow: '0 0 16px #7c3aed, 0 0 40px #7c3aed55',
            }}
            animate={isInView
              ? { left: ['0%', '100%', '100%'], opacity: [0, 1, 0] }
              : { left: '0%', opacity: 0 }
            }
            transition={{ duration: 5, times: [0, 0.45, 0.55], repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/IdentityShowcase.tsx
git commit -m "feat: IdentityShowcase with scanner beam and constellation (PRETEXT-powered)"
```

---

## Task 7: Timeline component

**Files:**
- Create: `components/sections/Timeline.tsx`

- [ ] **Step 1: Copy needed images to public**

```bash
cp src/images/rocket.png public/rocket.png
```

- [ ] **Step 2: Create `components/sections/Timeline.tsx`**

```typescript
'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { timelineData } from '@/lib/data'
import { cardVariant } from '@/lib/motion'
import { GraduationCap, Trophy } from 'lucide-react'

function TimelineCard({ obj, index }: { obj: typeof timelineData[0]; index: number }) {
  const ref        = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const isOdd      = (index + 1) % 2 !== 0
  const inView     = useInView(contentRef, { once: false, margin: '-20%' })

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] })
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <>
      {/* Timeline dot */}
      <motion.div
        style={{ opacity, top: `${index * 22 + 10}em` }}
        ref={ref}
        className="w-6 h-6 rounded-full absolute left-1/2 -translate-x-1/2 bg-transparent border-4 border-white z-20"
      />
      <div
        className="w-6 h-6 rounded-full absolute left-1/2 -translate-x-1/2 bg-gray-900 border-4 border-slate-800 z-10"
        style={{ top: `${index * 22 + 10}em` }}
      />

      {/* Card */}
      <motion.div
        ref={contentRef}
        style={{ top: `${index * 22 + 10}em` }}
        className={`absolute bg-transparent ${isOdd ? 'right-1/2' : 'left-1/2'} flex`}
        animate={inView ? 'visible' : 'hidden'}
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      >
        {!isOdd && <div className="h-2 lg:w-32 md:w-24 w-4 bg-slate-200 inline-block rounded self-center" />}
        <motion.div
          variants={cardVariant}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className={`text-slate-200 ${isOdd ? 'text-end' : 'text-start'} lg:w-[23em] md:w-[32vw] w-[42vw] ${isOdd ? 'ps-4' : 'pe-4'}`}
        >
          <div className={`flex ${isOdd ? 'justify-end' : 'justify-start'}`}>
            <span className="font-bold rounded-xl bg-pink-800 text-white flex items-center gap-1 py-[.2em] px-4 w-fit mx-2 text-sm">
              {obj.type}
              {obj.type === 'Education' ? <GraduationCap size={14} /> : <Trophy size={14} />}
            </span>
          </div>
          <h2 className="mx-2 mb-2 font-bold text-2xl mt-1 text-white">{obj.time}</h2>
          <h3 className="font-semibold mx-2 mt-1 text-white">{obj.title}</h3>
          <p className="text-sm mx-2 mb-2 text-slate-50">{obj.sub}</p>
          <p className="mx-2 mb-2 text-slate-300 text-sm">{obj.description}</p>
        </motion.div>
        {isOdd && <div className="h-2 lg:w-32 md:w-24 w-4 bg-slate-200 inline-block rounded self-center" />}
      </motion.div>
    </>
  )
}

export function Timeline() {
  const trackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['center center', 'center start'] })
  const trackHeight = useTransform(scrollYProgress, [0, 1], ['0vh', '50vh'])
  const totalHeight = timelineData.length * 22

  return (
    <section className="w-full text-black relative bg-gray-900 py-[10em]" id="timeline">
      {/* Heading */}
      <div className="absolute md:left-[53%] md:opacity-100 md:flex left-1/2 -translate-x-1/2 text-center items-center justify-center opacity-20">
        <div>
          <h2 className="font-bold text-5xl text-slate-100 mb-4">timeline.</h2>
          <p className="font-bold text-xl text-gray-400 mt-4 text-start">My life journey</p>
        </div>
        <Image src="/rocket.png" alt="rocket" width={200} height={200} />
      </div>

      {/* Cards */}
      {timelineData.map((obj, i) => <TimelineCard key={i} obj={obj} index={i} />)}

      {/* Scroll track */}
      <div className="bg-gray-800 absolute w-2 left-1/2 -translate-x-1/2 rounded" style={{ height: `${totalHeight}em` }} />
      <div className="w-fit relative left-1/2 -translate-x-1/2 rounded" style={{ height: `${totalHeight}em` }}>
        <motion.div ref={trackRef} style={{ height: trackHeight }} className="bg-slate-200 sticky top-0 w-2 rounded" />
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/Timeline.tsx public/rocket.png
git commit -m "feat: Timeline section with scroll-driven dot reveals"
```

---

## Task 8: Skills section

**Files:**
- Create: `components/sections/Skills.tsx`

- [ ] **Step 1: Copy skill images to public (they're already there from original `public/`)**

Verify these exist in `/public/`: `html5.svg`, `css.svg`, `javascript.svg`, `react.svg`, `tailwind.svg`, `bootstrap.svg`, `framer.svg`, `typescript.svg`, `unity.svg`, `nodejs.svg`, `expressjs.svg`, `mongodb.svg`, `supabase.svg`, `git.svg`, `github.svg`, `json.svg`

Also copy dab image:
```bash
cp src/images/dab.png public/dab.png
```

- [ ] **Step 2: Create `components/sections/Skills.tsx`**

```typescript
'use client'

import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { frontEndSkills, backEndSkills } from '@/lib/data'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { Palette, Server } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

function SkillIcon({ name }: { name: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div variants={staggerItem} className="relative logo text-center w-[4.5em] cursor-pointer">
            <p className="logoText font-bold text-gray-900 opacity-10 transition-all select-none text-sm">
              {name.toUpperCase()}
            </p>
            <Image
              src={`/${name}.svg`}
              alt={name}
              width={60}
              height={60}
              className="logoIcon transition-all shadow-md p-2 m-auto"
            />
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>{name}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function Skills() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false, margin: '-20%' })

  return (
    <section className="w-full py-[16vh] m-auto">
      <h2 ref={ref} className="font-bold text-5xl text-gray-900 text-center">skills.</h2>
      <p className="font-bold text-xl text-gray-500 mt-4 text-center mb-6">Web Development Skills</p>

      <div className="w-[60%] grid xl:grid-cols-6 justify-center text-center m-auto">
        <div className="h-fit w-full col-span-2 xl:static xl:opacity-100 mt-6 absolute left-1/2 -translate-x-1/2 opacity-20 z-10">
          <Image src="/dab.png" alt="dab" width={270} height={270} className="m-auto" />
        </div>

        {inView && (
          <>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="rounded-2xl col-span-2 py-5 z-20"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex justify-center mb-2">
                <span className="font-bold rounded-xl bg-gray-900 text-slate-200 flex items-center gap-1 py-1 px-6 text-sm">
                  Front-end <Palette size={14} color="white" />
                </span>
              </div>
              <div className="flex justify-center items-center flex-wrap gap-4 mt-2 px-6 py-1">
                {frontEndSkills.map((s) => <SkillIcon key={s} name={s} />)}
              </div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="rounded-2xl col-span-2 py-5 z-20"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex justify-center mb-2">
                <span className="font-bold rounded-xl bg-gray-900 text-white flex items-center gap-1 py-1 px-6 text-sm">
                  Back-end <Server size={14} color="white" />
                </span>
              </div>
              <div className="flex justify-center items-center flex-wrap gap-4 mt-2 px-8 pb-[10em]">
                {backEndSkills.map((s) => <SkillIcon key={s} name={s} />)}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Install shadcn Tooltip**

```bash
npx shadcn@latest add tooltip
```

- [ ] **Step 4: Commit**

```bash
git add components/sections/Skills.tsx public/dab.png
git commit -m "feat: Skills section with Radix Tooltip on each tech icon"
```

---

## Task 9: About page

**Files:**
- Create: `app/about/page.tsx`
- Create: `components/sections/AboutIntro.tsx`

- [ ] **Step 1: Copy about images to public**

```bash
cp src/images/coffee.png public/coffee.png
cp src/images/forward.png public/forward.png 2>/dev/null; cp src/images/fast-forward.png public/fast-forward.png
for i in $(seq 1 11); do cp "src/images/${i}.jpg" "public/${i}.jpg" 2>/dev/null; done
```

- [ ] **Step 2: Create `components/sections/AboutIntro.tsx`**

```typescript
'use client'

import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { sectionReveal } from '@/lib/motion'

const photos = Array.from({ length: 11 }, (_, i) => `/${i + 1}.jpg`)

export function AboutIntro() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <div className="w-full min-h-screen flex relative bg-white overflow-x-hidden">
      <motion.div
        ref={ref}
        variants={sectionReveal}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="bg-transparent grid xl:grid-cols-3 md:w-[65%] px-10 grid-flow-row m-auto"
      >
        <div className="w-fit col-span-1 xl:static xl:opacity-100 absolute left-1/2 -translate-x-1/2 z-10 opacity-20">
          <Image src="/coffee.png" alt="coffee" width={320} height={320} style={{ minWidth: 320 }} />
        </div>
        <div className="col-span-2 z-20">
          <h1 className="font-bold text-5xl text-gray-900">about.</h1>
          <p className="font-bold text-xl text-gray-500 mt-4">Full-stack developer learner</p>
          <p className="font-semibold text-[.9em] text-gray-600 mt-2">
            As a sophomore studying civil engineering at National Taiwan University, I&apos;m adept at
            balancing academic commitments with my longstanding passion for coding. Particularly drawn
            to website development since high school, I&apos;m enthusiastic about taking this interest
            to a professional level.
          </p>
          <div className="images flex w-fit h-[170px] flex-row flex-wrap overflow-y-scroll mt-2 px-1 py-1">
            {photos.map((src, i) => (
              <Image
                key={i}
                src={src}
                alt={`photo ${i + 1}`}
                width={120}
                height={120}
                className="object-fit me-2 rounded-md p-2 shadow-md hover:scale-105 hover:border-[.2em] border-pink-500 transition-all bg-white mt-1"
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll arrow */}
      <div className="absolute bottom-[8em] right-[15%]">
        <Image src="/fast-forward.png" alt="scroll down" width={28} height={28} className="rotate-90 hover:scale-105 transition-all opacity-90" />
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create `app/about/page.tsx`**

```typescript
import { PageTransition } from '@/components/layout/PageTransition'
import { AboutIntro } from '@/components/sections/AboutIntro'
import { IdentityShowcase } from '@/components/sections/IdentityShowcase'
import { Timeline } from '@/components/sections/Timeline'
import { Skills } from '@/components/sections/Skills'
import { Logo } from '@/components/layout/Logo'

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="relative">
        <Logo />
        <AboutIntro />
        <IdentityShowcase />
        <Timeline />
        <Skills />
      </div>
    </PageTransition>
  )
}
```

- [ ] **Step 4: Verify About page**

```bash
npm run dev
```
Open `http://localhost:3000/about`. Scroll down through: intro → dark showcase section (scanner + nodes) → dark timeline → white skills.

- [ ] **Step 5: Commit**

```bash
git add app/about/page.tsx components/sections/AboutIntro.tsx public/coffee.png public/fast-forward.png
git commit -m "feat: About page with intro, IdentityShowcase, Timeline, Skills"
```

---

## Task 10: Portfolio page

**Files:**
- Create: `app/portfolio/page.tsx`
- Create: `components/sections/ProjectCarousel.tsx`

- [ ] **Step 1: Create `components/sections/ProjectCarousel.tsx`**

```typescript
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Rocket } from 'lucide-react'
import { projectsData } from '@/lib/data'
import { Logo } from '@/components/layout/Logo'

export function ProjectCarousel() {
  const [pos, setPos] = useState(0)

  const percent      = useMotionValue(0)
  const loadingSpring = useSpring(percent, { stiffness: 80, damping: 20 })
  const loading      = useTransform(loadingSpring, [1, 0], ['0%', '100%'])

  useEffect(() => { percent.set(pos / (projectsData.length - 1)) }, [pos, percent])

  const prev = useCallback(() => setPos((p) => Math.max(0, p - 1)), [])
  const next = useCallback(() => setPos((p) => Math.min(projectsData.length - 1, p + 1)), [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next])

  return (
    <div className="w-screen h-screen text-center flex flex-row justify-center items-center bg-white pb-[10vh] relative">
      <Logo />
      <div>
        <div className="w-[90vw] max-w-[50em] h-fit m-auto mb-4">
          <h1 className="font-bold text-5xl text-gray-900">projects.</h1>
          <p className="font-bold text-xl text-gray-500 mt-4">Finished and on-going projects</p>
          <motion.div style={{ width: loading }} className="rounded-md h-1 bg-[#7c3aed] mt-5 m-auto" />
        </div>

        <div className="grid lg:grid-cols-2 grid-cols-1 mt-10">
          {/* Decorative image */}
          <div className="z-10 justify-self-end mx-5 lg:static lg:opacity-100 absolute left-1/2 -translate-x-1/2 opacity-20">
            <Image src="/business.png" alt="business" width={320} height={320} style={{ minWidth: 320 }} />
          </div>

          {/* Carousel */}
          <div className="h-fit z-10 overflow-hidden relative lg:justify-self-start justify-self-center w-[450px] max-w-[95vw]">
            <button
              onClick={prev}
              className={`absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800 rounded-full p-1 z-50 hover:brightness-75 transition ${pos === 0 ? 'hidden' : 'block'}`}
            >
              <ChevronLeft color="white" size={20} />
            </button>
            <button
              onClick={next}
              className={`absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800 rounded-full p-1 z-50 hover:brightness-75 transition ${pos === projectsData.length - 1 ? 'hidden' : 'block'}`}
            >
              <ChevronRight color="white" size={20} />
            </button>

            <motion.div
              animate={{ x: `-${pos * 450}px` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="flex"
            >
              {projectsData.map((p, i) => (
                <div key={i} className="w-[450px] flex-shrink-0 flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-3">
                    <h2 className="font-bold text-2xl text-gray-800">{p.name}</h2>
                    <Link href={p.url} target="_blank">
                      <span className="font-bold text-white bg-pink-600 rounded-xl px-2 py-1 text-sm flex items-center gap-1 hover:brightness-75 transition">
                        Demo <Rocket size={14} color="white" />
                      </span>
                    </Link>
                  </div>
                  <div className="w-full px-2 rounded-xl overflow-hidden border border-gray-100 shadow-md backdrop-blur bg-white/80">
                    <Image src={p.image} alt={p.name} width={450} height={280} className="w-full object-cover" />
                  </div>
                  <p className="font-semibold text-sm text-gray-500 mt-3 text-start px-4 w-full">{p.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Copy business image**

```bash
cp src/images/business.png public/business.png
```

- [ ] **Step 3: Create `app/portfolio/page.tsx`**

```typescript
import { PageTransition } from '@/components/layout/PageTransition'
import { ProjectCarousel } from '@/components/sections/ProjectCarousel'

export default function PortfolioPage() {
  return (
    <PageTransition>
      <ProjectCarousel />
    </PageTransition>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add app/portfolio/page.tsx components/sections/ProjectCarousel.tsx public/business.png
git commit -m "feat: Portfolio page with keyboard/spring carousel and frosted glass cards"
```

---

## Task 11: Contact page

**Files:**
- Create: `app/contact/page.tsx`
- Create: `components/sections/ContactInfo.tsx`

- [ ] **Step 1: Copy contact image**

```bash
cp src/images/call.png public/call.png
```

- [ ] **Step 2: Create `components/sections/ContactInfo.tsx`**

```typescript
import Image from 'next/image'
import { Mail, Linkedin, Phone, MessageCircle } from 'lucide-react'
import { contactDetails } from '@/lib/data'
import { Logo } from '@/components/layout/Logo'

const rows = [
  { icon: Mail,          label: contactDetails.email,    href: `mailto:${contactDetails.email}` },
  { icon: Linkedin,      label: contactDetails.linkedin,  href: 'https://www.linkedin.com/in/yazidane-hakim-25754128a/' },
  { icon: Phone,         label: contactDetails.whatsapp, href: `https://wa.me/${contactDetails.whatsapp}` },
  { icon: MessageCircle, label: contactDetails.line,     href: '#' },
]

export function ContactInfo() {
  return (
    <div className="h-screen w-screen grid md:grid-cols-2 justify-center items-center relative bg-white px-16">
      <Logo />

      <div className="md:justify-self-end md:static md:opacity-100 absolute left-1/2 -translate-x-1/2 z-10 opacity-20">
        <Image src="/call.png" alt="call" width={280} height={280} className="mx-10" style={{ minWidth: 280 }} />
      </div>

      <div className="md:justify-self-start justify-self-center z-20">
        <h1 className="font-bold text-5xl text-gray-900">contacts.</h1>
        <p className="font-bold text-xl text-gray-500 mb-6 mt-4">Get in touch with me</p>

        <div className="space-y-1 mb-6">
          <p className="font-semibold text-sm text-gray-800"><span className="font-bold">Name: </span>{contactDetails.name}</p>
          <p className="font-semibold text-sm text-gray-800"><span className="font-bold">Address: </span>{contactDetails.address}</p>
          <p className="font-semibold text-sm text-gray-800"><span className="font-bold">Mobile: </span>{contactDetails.phone}</p>
        </div>

        <div className="sm:flex gap-8">
          {[rows.slice(0, 2), rows.slice(2)].map((group, gi) => (
            <div key={gi} className="space-y-4">
              {group.map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} target="_blank" className="flex items-center gap-3 hover:scale-105 transition-transform w-fit">
                  <Icon size={26} className="text-gray-800 flex-shrink-0" />
                  <span className="text-sm font-semibold text-gray-800">{label}</span>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create `app/contact/page.tsx`**

```typescript
import { PageTransition } from '@/components/layout/PageTransition'
import { ContactInfo } from '@/components/sections/ContactInfo'

export default function ContactPage() {
  return (
    <PageTransition>
      <ContactInfo />
    </PageTransition>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add app/contact/page.tsx components/sections/ContactInfo.tsx public/call.png
git commit -m "feat: Contact page with icon rows and hover lift"
```

---

## Task 12: Scroll progress bar + final polish

**Files:**
- Create: `components/layout/ScrollProgress.tsx`
- Modify: `app/about/page.tsx`

- [ ] **Step 1: Create `components/layout/ScrollProgress.tsx`**

```typescript
'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 400, damping: 40 })

  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0%' }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-[#7c3aed] z-50"
    />
  )
}
```

- [ ] **Step 2: Add to About page**

```typescript
// app/about/page.tsx — add ScrollProgress
import { ScrollProgress } from '@/components/layout/ScrollProgress'

export default function AboutPage() {
  return (
    <PageTransition>
      <ScrollProgress />
      <div className="relative">
        <Logo />
        <AboutIntro />
        <IdentityShowcase />
        <Timeline />
        <Skills />
      </div>
    </PageTransition>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/layout/ScrollProgress.tsx app/about/page.tsx
git commit -m "feat: violet scroll progress bar on About page"
```

---

## Task 13: Static export build + deploy

**Files:**
- Modify: `next.config.ts` (verify)
- Modify: `package.json` (verify)

- [ ] **Step 1: Run production build**

```bash
npm run build
```
Expected: `out/` directory created with static HTML/CSS/JS. No build errors.

- [ ] **Step 2: Preview the static export locally**

```bash
npx serve out
```
Open the printed URL. Test all 4 routes, page transitions, scroll animations, and carousel. Check on mobile viewport in DevTools.

- [ ] **Step 3: Remove old Vite source**

Once verified, clean up the old Vite configuration:
```bash
rm -rf src/ vite.config.ts index.html
git add -A
git commit -m "chore: remove legacy Vite source after Next.js migration"
```

- [ ] **Step 4: Deploy to GitHub Pages**

```bash
npm run deploy
```
Expected: pushes `out/` to `gh-pages` branch. Visit `https://zidanehakim.github.io` to verify live.

- [ ] **Step 5: Final commit on main**

```bash
git add package.json next.config.ts
git commit -m "feat: complete Next.js 15 portfolio migration — blazing fast, static export"
```

---

## Self-Review

**Spec coverage check:**
- ✅ Next.js 15, App Router, output: export — Task 1
- ✅ Tailwind v4, shadcn/ui — Task 1, 8
- ✅ Framer Motion transitions 300ms — Task 3
- ✅ Zustand isTransitioning — Task 3
- ✅ DM Sans via next/font — Task 4
- ✅ Navbar active state, violet highlight — Task 4
- ✅ Logo component — Task 4
- ✅ Hero: dot-grid, ghost text, typewriter, glow CTAs, Next/Image — Task 5
- ✅ IdentityShowcase: scanner + constellation, PRETEXT-powered, no SDK branding — Task 6
- ✅ Timeline: scroll-driven, dark bg — Task 7
- ✅ Skills: icon grid, Radix Tooltip — Task 8
- ✅ About page: all 4 sections composed — Task 9
- ✅ Portfolio: spring carousel, keyboard + swipe, frosted glass — Task 10
- ✅ Contact: two-column, icon rows — Task 11
- ✅ Scroll progress bar — Task 12
- ✅ Static build + deploy — Task 13
- ✅ lib/data.ts, lib/motion.ts — Task 2
- ✅ All images copied to public/ — throughout

**No placeholders found. All steps contain complete code.**

**Type consistency:** `timelineData`, `projectsData`, `frontEndSkills`, `backEndSkills`, `contactDetails`, `socialLinks` defined in Task 2 and referenced correctly in Tasks 7–11. Motion variants (`sectionReveal`, `staggerContainer`, `staggerItem`, `cardVariant`, `pageTransitionOverlay`, `pageFadeIn`) defined in Task 2, used in Tasks 3–9.

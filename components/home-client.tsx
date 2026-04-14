'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Github, Linkedin, Instagram, Download, ArrowRight, Facebook } from 'lucide-react'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { Typewriter } from '@/components/typewriter'
import type { Profile } from '@/lib/types'

// Lazy-load terminal (heavy interactive component)
const PretextTerminal = dynamic(
  () => import('@/components/pretext-terminal').then((m) => m.PretextTerminal),
  { ssr: false, loading: () => <TerminalSkeleton /> }
)

function TerminalSkeleton() {
  return (
    <div className="rounded-2xl border border-amber-500/20 bg-[#0a0a0a] h-[480px] flex items-center justify-center">
      <span className="font-terminal text-xs text-neutral-600 tracking-wider">Loading context engine...</span>
    </div>
  )
}

// Floating watermark like original site
function WatermarkText() {
  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none"
      aria-hidden="true"
    >
      <motion.span
        className="text-[clamp(5rem,18vw,14rem)] font-bold text-neutral-800/25 whitespace-nowrap leading-none"
        animate={{ x: [0, -40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      >
        Yazidane
      </motion.span>
    </div>
  )
}

const SOCIALS = [
  { href: 'https://github.com/zidanehakim', icon: Github, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/yazidane-hakim', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://instagram.com/yazidanehakim', icon: Instagram, label: 'Instagram' },
  { href: 'https://facebook.com/yazidanehakim', icon: Facebook, label: 'Facebook' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

export function HomeClient({ profile }: { profile: Profile }) {
  return (
    <section className="relative min-h-dvh pb-28">
      {/* Floating watermark */}
      <WatermarkText />

      {/* Main grid */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-16 md:pt-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

        {/* Left — Hero content */}
        <div className="flex flex-col gap-7">
          {/* Pre-tag */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.1}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-3 py-1"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-glow-pulse" />
            <span className="font-terminal text-xs text-amber-400 tracking-wider">available for work</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.2}
            className="text-[clamp(2.8rem,7vw,4.5rem)] font-bold leading-[1.08] tracking-tight"
          >
            <span className="text-neutral-100">Hi, I&apos;m</span>
            <br />
            <span className="text-gradient">{profile.shortName}</span>
          </motion.h1>

          {/* Typewriter */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.3}
            className="text-[clamp(1.2rem,3vw,1.6rem)] font-medium text-neutral-400"
          >
            <Typewriter
              words={profile.titles}
              className="text-amber-300"
            />
          </motion.p>

          {/* Bio */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.4}
            className="text-base text-neutral-500 leading-relaxed max-w-sm"
          >
            {profile.bio}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.5}
            className="flex flex-wrap gap-3"
          >
            <Button asChild size="lg" className="gap-2">
              <Link href="/about">
                About me <ArrowRight size={16} />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <a href={profile.resume} download>
                <Download size={16} />
                Resume
              </a>
            </Button>
          </motion.div>

          {/* Socials */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.6}
            className="flex items-center gap-1"
          >
            {SOCIALS.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-neutral-500 hover:bg-white/5 hover:text-amber-400 transition-all duration-200"
              >
                <Icon size={19} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right — Hero image */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.35}
          className="relative flex items-center justify-center"
        >
          <div className="relative">
            {/* Amber ring glow */}
            <div className="absolute inset-0 rounded-full blur-3xl opacity-20 bg-amber-500" />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10"
            >
              <Image
                src="/images/hero.png"
                alt="Yazidane Hakim"
                width={360}
                height={400}
                priority
                className="relative z-10 object-contain drop-shadow-2xl hidden md:block"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* PRETEXT Terminal — full width below hero */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={0.7}
        className="relative z-10 mx-auto max-w-6xl px-6 mt-16 md:mt-20"
      >
        {/* Section label */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1 bg-gradient-to-r from-amber-500/30 to-transparent" />
          <span className="font-terminal text-xs text-amber-500/70 uppercase tracking-widest">
            ◈ pretext context engine
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-amber-500/30 to-transparent" />
        </div>
        <PretextTerminal />
      </motion.div>
    </section>
  )
}

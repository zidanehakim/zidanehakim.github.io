'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { displayTexts, socials } from "@/lib/data"

// Simple SVG brand icons (Lucide doesn't ship brand icons)
function LinkedInIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
    </svg>
  )
}

function GitHubIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
    </svg>
  )
}

function InstagramIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3Z" />
    </svg>
  )
}

function FacebookIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
    </svg>
  )
}

const socialIcons = [
  { Icon: LinkedInIcon, label: "LinkedIn" },
  { Icon: GitHubIcon, label: "GitHub" },
  { Icon: InstagramIcon, label: "Instagram" },
  { Icon: FacebookIcon, label: "Facebook" },
]

export function Hero() {
  const [text, setText] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)

  // Typewriter effect — single interval, no memory leaks
  useEffect(() => {
    let wordIdx = 0
    let charIdx = 0
    let removing = false
    let pauseTimeout: ReturnType<typeof setTimeout> | null = null

    const tick = () => {
      const word = displayTexts[wordIdx]
      if (!removing) {
        if (charIdx < word.length) {
          charIdx++
          setText(word.slice(0, charIdx))
        } else {
          if (pauseTimeout) clearTimeout(pauseTimeout)
          pauseTimeout = setTimeout(() => {
            removing = true
          }, 2000)
          return
        }
      } else {
        if (charIdx > 0) {
          charIdx--
          setText(word.slice(0, charIdx))
        } else {
          removing = false
          wordIdx = (wordIdx + 1) % displayTexts.length
        }
      }
    }

    const interval = setInterval(tick, 100)
    return () => {
      clearInterval(interval)
      if (pauseTimeout) clearTimeout(pauseTimeout)
    }
  }, [])

  // Blinking cursor
  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 500)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="dot-grid relative w-screen h-screen bg-white overflow-hidden flex items-center justify-center">

      {/* ── Asymmetric edge decorations ── */}

      {/* Left sidebar — vertical label */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-3 z-10">
        <div className="w-px h-16 bg-gray-200" />
        <p
          className="text-[9px] font-mono text-gray-400 tracking-[0.28em] uppercase select-none"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          PORTFOLIO · 2025
        </p>
        <div className="w-px h-16 bg-gray-200" />
      </div>

      {/* Top-right section counter */}
      <div className="absolute top-6 right-6 hidden md:flex items-center gap-2 z-10">
        <span className="text-[9px] font-mono text-gray-300 tracking-widest select-none">[ 01 / 04 ]</span>
      </div>

      {/* Bottom-left — live location */}
      <div className="absolute bottom-6 left-6 hidden md:flex items-center gap-2 z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
        <span className="text-[9px] font-mono text-gray-400 tracking-widest select-none">TAIPEI · TW</span>
      </div>

      {/* Bottom-center — scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 z-10"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[9px] font-mono text-gray-400 tracking-widest select-none">scroll</span>
        <div className="w-px h-5 bg-gradient-to-b from-gray-300 to-transparent" />
      </motion.div>

      {/* Ghost name — animated background text */}
      <motion.h1
        aria-hidden
        className="pointer-events-none absolute select-none text-[10vw] font-black text-gray-900 opacity-[0.04] whitespace-nowrap top-1/4"
        animate={{ x: [50, -50] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      >
        Yazidane
      </motion.h1>
      <motion.h1
        aria-hidden
        className="pointer-events-none absolute select-none text-[10vw] font-black text-gray-900 opacity-[0.04] whitespace-nowrap bottom-1/4"
        animate={{ x: [-50, 50] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      >
        Hakim
      </motion.h1>

      {/* Main content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 px-6 md:px-16 max-w-6xl w-full">

        {/* Hero image — absolute + faded on mobile, column on desktop */}
        <div className="absolute inset-0 flex items-center justify-center md:hidden pointer-events-none">
          <Image
            src="/images/hero.png"
            width={400}
            height={500}
            priority
            alt="Yazidane Hakim"
            className="opacity-40 object-contain max-h-full"
          />
        </div>

        <motion.div
          className="hidden md:flex md:flex-1 items-center justify-center"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Image
            src="/images/hero.png"
            width={400}
            height={500}
            priority
            alt="Yazidane Hakim"
            className="object-contain drop-shadow-xl"
          />
        </motion.div>

        {/* Text content */}
        <motion.div
          className="relative z-10 flex flex-col gap-4 md:flex-1 text-center md:text-left"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        >
          <p className="text-gray-500 text-sm font-medium tracking-widest uppercase">
            Hi there! I&apos;m
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
            Yazidane Hakim
          </h1>

          {/* Typewriter */}
          <div className="text-lg md:text-xl font-semibold text-violet-600 h-8 flex items-center justify-center md:justify-start gap-0.5">
            <span>{text}</span>
            <span
              className="inline-block w-0.5 h-5 bg-violet-600 ml-0.5"
              style={{ opacity: cursorVisible ? 1 : 0 }}
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-row gap-3 mt-2 justify-center md:justify-start flex-wrap">
            <a
              href="/YAZIDANE_HAKIM_RESUME.pdf"
              download
              className="px-6 py-2.5 rounded-full border-2 border-gray-900 text-gray-900 font-semibold text-sm hover:shadow-[0_0_20px_#7c3aed66] hover:border-violet-600 hover:text-violet-600 transition-all"
            >
              Resume
            </a>
            <Link
              href="/about"
              className="px-6 py-2.5 rounded-full bg-gray-900 text-white font-semibold text-sm hover:shadow-[0_0_20px_#7c3aed66] hover:bg-violet-700 transition-all"
            >
              About
            </Link>
          </div>

          {/* Social icons */}
          <div className="flex flex-row gap-4 mt-2 justify-center md:justify-start">
            {socialIcons.map(({ Icon, label }) => {
              const social = socials.find((s) => s.label === label)
              return (
                <a
                  key={label}
                  href={social?.href ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                  <Icon size={22} />
                </a>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { Logo } from "@/components/layout/Logo"

const photos = Array.from({ length: 11 }, (_, i) => `/images/${i + 1}.jpg`)

export function AboutIntro() {
  return (
    <section className="dot-grid relative w-screen min-h-screen bg-white overflow-hidden flex flex-col items-center justify-center px-6 md:px-16 pt-24 pb-16">
      <Logo />

      {/* Ghost background text */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute select-none text-[18vw] font-black text-gray-900 opacity-[0.04] whitespace-nowrap top-1/4 left-1/2 -translate-x-1/2"
        animate={{ x: [40, -40] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      >
        about.
      </motion.span>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* Left — text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col gap-5"
        >
          <p className="text-gray-500 text-sm font-medium tracking-widest uppercase">
            who am i
          </p>

          <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
            Yazidane<br />
            <span className="text-violet-600">Hakim</span>
          </h1>

          <p className="text-gray-500 font-semibold text-sm tracking-wide">
            Civil Engineering · National Taiwan University
          </p>

          <p className="text-gray-600 leading-relaxed text-sm max-w-md">
            A sophomore at NTU balancing civil engineering studies with a deep passion for software.
            I&apos;ve been building for the web since high school — and now I&apos;m taking that seriously.
            I love crafting experiences that feel both precise and alive.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-4 mt-2">
            {[
              { value: "NTU", label: "Civil Eng" },
              { value: "4+", label: "Years Coding" },
              { value: "10+", label: "Projects" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center w-20 h-20 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-[0_0_16px_#7c3aed33] hover:border-violet-200 transition-all"
              >
                <span className="font-black text-xl text-gray-900">{value}</span>
                <span className="text-xs text-gray-500 font-medium mt-0.5">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — decorative image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="relative flex items-center justify-center"
        >
          {/* Glow blob behind image */}
          <div className="absolute w-64 h-64 rounded-full bg-violet-100 blur-3xl opacity-60" />
          <Image
            src="/images/coffee.png"
            alt="coffee"
            width={300}
            height={380}
            className="relative drop-shadow-xl object-contain"
          />
        </motion.div>
      </div>

      {/* Photo strip — infinite marquee */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative z-10 w-full max-w-5xl mt-12 overflow-hidden"
      >
        <p className="text-xs text-gray-400 font-medium tracking-widest uppercase mb-3">moments</p>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {[...photos, ...photos].map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-28 h-28 rounded-xl overflow-hidden ring-1 ring-gray-100 hover:ring-violet-400 hover:scale-105 transition-all"
            >
              <Image
                src={src}
                alt={`photo ${(i % photos.length) + 1}`}
                width={112}
                height={112}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-gray-300" />
      </motion.div>
    </section>
  )
}

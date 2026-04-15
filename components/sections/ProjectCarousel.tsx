"use client"
import { useState, useCallback } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { projects } from "@/lib/data"
import { Logo } from "@/components/layout/Logo"

export function ProjectCarousel() {
  const [pos, setPos] = useState(0)

  const percent = useMotionValue(0)
  const loadingSpring = useSpring(percent, { stiffness: 80, damping: 20 })
  const loading = useTransform(loadingSpring, [0, 1], ["0%", "100%"])

  const goTo = useCallback((idx: number) => {
    if (idx < 0 || idx >= projects.length) return
    setPos(idx)
    percent.set(idx / (projects.length - 1))
  }, [percent])

  const project = projects[pos]

  return (
    <section className="dot-grid relative w-screen min-h-screen bg-white overflow-hidden flex flex-col items-center justify-center px-6 md:px-16 pb-[10vh] pt-24">
      <Logo />

      {/* Ghost background text */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute select-none text-[16vw] font-black text-gray-900 opacity-[0.04] whitespace-nowrap top-1/3 left-1/2 -translate-x-1/2"
        animate={{ x: [-40, 40] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      >
        projects.
      </motion.span>

      {/* Huge faded project index — changes per slide */}
      <motion.span
        key={pos}
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.04 }}
        transition={{ duration: 0.5 }}
        className="pointer-events-none absolute select-none font-black text-gray-900 leading-none bottom-0 right-0"
        style={{ fontSize: "clamp(6rem, 22vw, 18rem)" }}
      >
        {String(pos + 1).padStart(2, "0")}
      </motion.span>

      {/* Left edge — vertical label */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 z-10">
        <div className="w-px h-12 bg-gray-200" />
        <p
          className="text-[9px] font-mono text-gray-400 tracking-[0.28em] uppercase select-none"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          SELECTED WORKS
        </p>
        <div className="w-px h-12 bg-gray-200" />
      </div>

      {/* Top-right section counter */}
      <div className="absolute top-6 right-6 hidden md:flex items-center gap-2 z-10">
        <span className="text-[9px] font-mono text-gray-300 tracking-widest select-none">[ 03 / 04 ]</span>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center mb-10 w-full max-w-2xl"
      >
        <p className="text-gray-500 text-sm font-medium tracking-widest uppercase mb-3">what i built</p>
        <h1 className="font-black text-5xl text-gray-900">Projects</h1>

        {/* Spring progress bar */}
        <div className="rounded-full h-1 bg-gray-100 mt-5 max-w-xs mx-auto overflow-hidden">
          <motion.div
            style={{ width: loading }}
            className="h-full bg-violet-600 rounded-full"
          />
        </div>

        {/* Slide counter */}
        <p className="text-gray-400 text-xs font-semibold mt-2 tracking-widest">
          {String(pos + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </p>
      </motion.div>

      {/* Main card area */}
      <div className="relative z-10 w-full max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-8 items-center">

          {/* Project info panel */}
          <motion.div
            key={project.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-4"
          >
            <span className="text-xs font-semibold text-violet-600 tracking-widest uppercase">
              featured work
            </span>
            <h2 className="font-black text-3xl md:text-4xl text-gray-900 capitalize leading-tight">
              {project.name}
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
              {project.desc}
            </p>

            {/* Action buttons */}
            <div className="flex gap-3 mt-2 flex-wrap">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-900 text-white font-semibold text-sm hover:bg-violet-700 hover:shadow-[0_0_20px_#7c3aed66] transition-all"
              >
                Live Demo <ExternalLink size={14} />
              </a>
            </div>

            {/* Nav controls */}
            <div className="flex gap-3 mt-4 items-center">
              <button
                onClick={() => goTo(pos - 1)}
                disabled={pos === 0}
                className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-violet-500 hover:text-violet-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => goTo(pos + 1)}
                disabled={pos === projects.length - 1}
                className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-violet-500 hover:text-violet-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight size={18} />
              </button>

              {/* Dot indicators */}
              <div className="flex gap-1.5 ml-2">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === pos ? "w-6 bg-violet-600" : "w-1.5 bg-gray-200 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Carousel viewport */}
          <div className="relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-gray-100">
            {/* Rotated featured tag */}
            <div className="absolute top-3 left-3 z-20 rotate-[-6deg] select-none pointer-events-none">
              <span className="bg-violet-600/80 backdrop-blur-sm text-white font-mono font-bold text-[9px] tracking-[0.2em] px-2 py-0.5 rounded uppercase">
                FEATURED
              </span>
            </div>
            <motion.div
              animate={{ x: `-${pos * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex"
              style={{ width: `${projects.length * 100}%` }}
            >
              {projects.map((p, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 relative aspect-video group"
                  style={{ width: `${100 / projects.length}%` }}
                >
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="600px"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent" />
                  {/* Hover ring */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 ring-2 ring-violet-500 ring-inset rounded-2xl transition-opacity" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

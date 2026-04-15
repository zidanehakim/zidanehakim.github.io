"use client"
import { useState, useCallback, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react"
import { projects } from "@/lib/data"

// Slide variants — direction-aware enter/exit
const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-60%" : "60%",
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.35, ease: [0.55, 0, 1, 0.45] },
  }),
}

const infoVariants = {
  enter: (dir: number) => ({ opacity: 0, y: dir > 0 ? 18 : -18 }),
  center: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  exit:   (dir: number) => ({ opacity: 0, y: dir > 0 ? -18 : 18, transition: { duration: 0.25 } }),
}

export function ProjectCarousel() {
  const [pos, setPos] = useState(0)
  const [dir, setDir] = useState(1)
  const dragged = useRef(false)
  const dragStartX = useRef(0)

  const goTo = useCallback((idx: number) => {
    if (idx < 0 || idx >= projects.length) return
    setDir(idx > pos ? 1 : -1)
    setPos(idx)
  }, [pos])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo(pos + 1)
      if (e.key === "ArrowLeft")  goTo(pos - 1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [pos, goTo])

  // Touch / mouse drag handlers
  const onPointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX
    dragged.current = false
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (Math.abs(e.clientX - dragStartX.current) > 8) dragged.current = true
  }
  const onPointerUp = (e: React.PointerEvent) => {
    const delta = e.clientX - dragStartX.current
    if (Math.abs(delta) > 50) {
      delta < 0 ? goTo(pos + 1) : goTo(pos - 1)
    }
  }

  const project = projects[pos]

  return (
    <section className="dot-grid relative w-screen min-h-screen bg-white overflow-hidden flex flex-col items-center justify-center px-4 sm:px-6 md:px-16 pb-[10vh] pt-24">
      {/* Ghost text — CSS animation, no JS thread */}
      <span
        aria-hidden
        className="ghost-drift-lr pointer-events-none absolute select-none text-[16vw] font-black text-gray-900 opacity-[0.04] whitespace-nowrap top-1/3"
        style={{ left: "50%" }}
      >
        projects.
      </span>

      {/* Huge faded project index */}
      <AnimatePresence mode="wait">
        <motion.span
          key={`num-${pos}`}
          aria-hidden
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.04, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="pointer-events-none absolute select-none font-black text-gray-900 leading-none bottom-0 right-0"
          style={{ fontSize: "clamp(6rem, 22vw, 18rem)" }}
        >
          {String(pos + 1).padStart(2, "0")}
        </motion.span>
      </AnimatePresence>

      {/* Left edge label */}
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

      {/* Section counter */}
      <div className="absolute top-6 right-6 hidden md:flex items-center gap-2 z-10">
        <span className="text-[9px] font-mono text-gray-300 tracking-widest select-none">[ 03 / 04 ]</span>
      </div>

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center mb-8 md:mb-10 w-full max-w-2xl"
      >
        <p className="text-gray-500 text-sm font-medium tracking-widest uppercase mb-3">what i built</p>
        <h1 className="font-black text-4xl md:text-5xl text-gray-900">Projects</h1>

        {/* Segmented progress bar */}
        <div className="flex gap-1.5 justify-center mt-5 max-w-[12rem] mx-auto">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="flex-1 h-1 rounded-full overflow-hidden bg-gray-100 relative"
              aria-label={`Go to project ${i + 1}`}
            >
              {i === pos && (
                <motion.div
                  layoutId="progress-fill"
                  className="absolute inset-0 bg-violet-600 rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                />
              )}
              {i < pos && (
                <div className="absolute inset-0 bg-violet-300 rounded-full" />
              )}
            </button>
          ))}
        </div>

        <p className="text-gray-400 text-xs font-mono mt-2 tracking-widest">
          {String(pos + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </p>
      </motion.div>

      {/* ── Main content ── */}
      <div className="relative z-10 w-full max-w-5xl">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">

          {/* ── Image (top on mobile, right on desktop) ── */}
          <div
            className="relative w-full rounded-2xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing lg:order-2 select-none"
            style={{ touchAction: "pan-y" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
          >
            {/* Rotated FEATURED badge */}
            <div className="absolute top-3 left-3 z-20 rotate-[-6deg] pointer-events-none select-none">
              <span className="bg-violet-600/80 backdrop-blur-sm text-white font-mono font-bold text-[9px] tracking-[0.2em] px-2 py-0.5 rounded uppercase">
                FEATURED
              </span>
            </div>

            {/* Slide */}
            <div className="relative aspect-video overflow-hidden">
              <AnimatePresence custom={dir} mode="popLayout" initial={false}>
                <motion.div
                  key={pos}
                  custom={dir}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0"
                >
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    draggable={false}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-gray-950/10 to-transparent" />

                  {/* Project title inside image (visible on mobile) */}
                  <div className="absolute bottom-4 left-4 right-4 lg:hidden">
                    <p className="text-white/60 text-[10px] font-mono tracking-widest uppercase mb-0.5">project</p>
                    <h3 className="text-white font-black text-xl capitalize">{project.name}</h3>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Swipe hint — visible on touch devices */}
            <div className="absolute inset-0 flex items-center justify-between px-3 pointer-events-none opacity-0 group-hover:opacity-100">
              <div className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
                <ChevronLeft size={16} className="text-white" />
              </div>
              <div className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
                <ChevronRight size={16} className="text-white" />
              </div>
            </div>
          </div>

          {/* ── Info panel (bottom on mobile, left on desktop) ── */}
          <div className="lg:order-1 w-full">
            <AnimatePresence custom={dir} mode="wait" initial={false}>
              <motion.div
                key={`info-${pos}`}
                custom={dir}
                variants={infoVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col gap-4"
              >
                <span className="text-xs font-semibold text-violet-600 tracking-widest uppercase font-mono">
                  featured work
                </span>

                <h2 className="font-black text-3xl sm:text-4xl text-gray-900 capitalize leading-tight">
                  {project.name}
                </h2>

                <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                  {project.desc}
                </p>

                {/* Live Demo button */}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-900 text-white font-semibold text-sm hover:bg-violet-700 hover:shadow-[0_0_20px_#7c3aed66] transition-all w-fit mt-1"
                >
                  Live Demo <ArrowUpRight size={15} />
                </a>

                {/* Nav controls */}
                <div className="flex gap-3 mt-3 items-center">
                  <button
                    onClick={() => goTo(pos - 1)}
                    disabled={pos === 0}
                    className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-violet-500 hover:text-violet-600 disabled:opacity-25 disabled:cursor-not-allowed transition-all"
                    aria-label="Previous project"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => goTo(pos + 1)}
                    disabled={pos === projects.length - 1}
                    className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-violet-500 hover:text-violet-600 disabled:opacity-25 disabled:cursor-not-allowed transition-all"
                    aria-label="Next project"
                  >
                    <ChevronRight size={18} />
                  </button>

                  {/* Dot indicators */}
                  <div className="flex gap-1.5 ml-2">
                    {projects.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goTo(i)}
                        aria-label={`Project ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === pos
                            ? "w-6 bg-violet-600"
                            : "w-1.5 bg-gray-200 hover:bg-gray-400"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Keyboard hint */}
                  <span className="hidden md:flex items-center gap-1 ml-auto text-[9px] font-mono text-gray-300 tracking-wider select-none">
                    ← →
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

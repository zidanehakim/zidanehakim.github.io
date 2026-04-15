"use client"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { frontEnd, backEnd } from "@/lib/data"
import { containerVariants, itemVariants } from "@/lib/motion"

function SkillGrid({ skills, title }: { skills: string[]; title: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <div>
      {/* Category label */}
      <div className="flex items-center gap-3 mb-5">
        <span className="text-xs font-bold text-violet-600 tracking-widest uppercase font-mono">
          {title}
        </span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex flex-wrap gap-3"
      >
        {skills.map((slug) => (
          <motion.div
            key={slug}
            variants={itemVariants}
            className="group flex flex-col items-center gap-1.5 cursor-pointer"
            title={slug}
          >
            <div className="w-14 h-14 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center group-hover:border-violet-300 group-hover:shadow-[0_0_16px_#7c3aed33] transition-all relative overflow-hidden">
              {/* Holographic shimmer — Web3 foil effect on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                style={{
                  background: "linear-gradient(135deg, rgba(124,58,237,0.18) 0%, rgba(59,130,246,0.14) 40%, rgba(167,139,250,0.18) 80%, rgba(236,72,153,0.10) 100%)",
                }}
              />
              <Image
                src={`/${slug}.svg`}
                alt={slug}
                width={36}
                height={36}
                className="p-1 transition-transform group-hover:scale-110 duration-200 relative z-10"
              />
            </div>
            <span className="text-[10px] text-gray-400 font-semibold tracking-wide uppercase group-hover:text-violet-500 transition-colors">
              {slug}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export function Skills() {
  const headerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headerRef, { once: true })

  return (
    <section className="dot-grid relative w-full bg-white overflow-hidden px-6 sm:px-8 md:px-16 py-24">

      {/* Ghost background text — CSS animation, no JS thread */}
      <span
        aria-hidden
        className="ghost-drift-rl pointer-events-none absolute select-none text-[16vw] font-black text-gray-900 opacity-[0.03] whitespace-nowrap top-1/2 -translate-y-1/2"
        style={{ left: "50%" }}
      >
        skills.
      </span>

      {/* Giant section number — bottom right, offset behind content */}
      <span
        aria-hidden
        className="pointer-events-none absolute select-none font-black text-gray-900 opacity-[0.025] leading-none bottom-0 right-0"
        style={{ fontSize: "clamp(7rem, 24vw, 20rem)" }}
      >
        02
      </span>

      {/* Left sidebar */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-3 z-10">
        <div className="w-px h-12 bg-gray-200" />
        <p
          className="text-[9px] font-mono text-gray-400 tracking-[0.28em] uppercase select-none"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          TECH STACK
        </p>
        <div className="w-px h-12 bg-gray-200" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: -16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-gray-500 text-sm font-medium tracking-widest uppercase mb-3">
            what i work with
          </p>
          <h1 className="font-black text-5xl text-gray-900">Skills</h1>
        </motion.div>

        {/* Skill grids */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col gap-12"
        >
          <SkillGrid skills={frontEnd} title="Front-end" />
          <SkillGrid skills={backEnd} title="Back-end" />
        </motion.div>
      </div>
    </section>
  )
}

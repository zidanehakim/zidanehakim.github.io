'use client'

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { timeline } from "@/lib/data"

function TimelineEntry({ obj, index }: { obj: typeof timeline[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" })
  const isOdd = (index + 1) % 2 !== 0

  const badgeClass =
    obj.type === "Education"
      ? "bg-violet-900/60 text-violet-300 border border-violet-700/40"
      : "bg-amber-900/50 text-amber-300 border border-amber-700/40"

  return (
    <div
      ref={ref}
      className="absolute w-full"
      style={{ top: `${index * 22 + 10}em` }}
    >
      {/* Center dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
        className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-violet-500 border-[3px] border-gray-900 z-20 shadow-[0_0_12px_#7c3aed88]"
      />
      {/* Dot base */}
      <div className="w-4 h-4 rounded-full absolute left-1/2 -translate-x-1/2 bg-gray-800 z-10" />

      {/* Card + connector */}
      <motion.div
        initial={{ opacity: 0, x: isOdd ? -16 : 16 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isOdd ? -16 : 16 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`absolute flex items-start ${isOdd ? "right-1/2" : "left-1/2"}`}
      >
        {/* Connector line (right side) */}
        {!isOdd && (
          <div className="h-[2px] lg:w-[5em] md:w-[4em] w-[2em] bg-violet-800/50 self-center" />
        )}

        {/* Card */}
        <div
          className={`rounded-xl border border-gray-700/60 bg-gray-800/60 backdrop-blur-sm
            ${isOdd ? "text-end pe-4 ps-4" : "text-start ps-4 pe-4"}
            lg:w-[22em] md:w-[30vw] w-[40vw] p-4`}
        >
          <div className={`flex mb-2 ${isOdd ? "justify-end" : "justify-start"}`}>
            <span className={`text-xs font-bold rounded-lg py-0.5 px-3 ${badgeClass}`}>
              {obj.type}
            </span>
          </div>
          <h2 className="font-black text-xl text-white leading-tight mb-1">{obj.time}</h2>
          <h3 className="font-semibold text-sm text-gray-200 mb-1">{obj.title}</h3>
          <p className="text-xs text-violet-300/70 font-medium mb-2">{obj.sub}</p>
          <p className="text-xs text-gray-400 leading-relaxed">{obj.description}</p>
        </div>

        {/* Connector line (left side) */}
        {isOdd && (
          <div className="h-[2px] lg:w-[5em] md:w-[4em] w-[2em] bg-violet-800/50 self-center" />
        )}
      </motion.div>
    </div>
  )
}

export function Timeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  })
  const trackHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const totalHeight = timeline.length * 22 + 6

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        paddingTop: "10em",
        paddingBottom: "10em",
        background: "linear-gradient(180deg, #0a0a14 0%, #111120 50%, #0a0a14 100%)",
      }}
    >
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #7c3aed 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Ghost text */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute select-none text-[14vw] font-black text-white/[0.025] whitespace-nowrap top-8 left-1/2 -translate-x-1/2"
        animate={{ x: [-30, 30] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      >
        timeline.
      </motion.span>

      {/* Header */}
      <div className="absolute md:left-[53%] left-1/2 -translate-x-1/2 md:translate-x-0 top-10 flex flex-col gap-1">
        <p className="text-xs text-violet-400/60 font-mono tracking-widest uppercase">journey</p>
        <h1 className="font-black text-5xl text-white">timeline.</h1>
        <p className="text-gray-500 font-semibold text-sm mt-1">My life so far</p>
      </div>

      {/* Center track — background */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-[2px] bg-gray-800 rounded top-[6em]"
        style={{ height: `${totalHeight}em` }}
      />

      {/* Animated scroll-progress line */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-[2px] top-[6em] overflow-hidden rounded"
        style={{ height: `${totalHeight}em` }}
      >
        <motion.div
          style={{ height: trackHeight }}
          className="w-full bg-gradient-to-b from-violet-500 to-violet-700 rounded shadow-[0_0_8px_#7c3aed]"
        />
      </div>

      {/* Left sidebar */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-3 z-10">
        <div className="w-px h-12 bg-violet-900/40" />
        <p
          className="text-[9px] font-mono text-violet-900/60 tracking-[0.28em] uppercase select-none"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          LIFE LOG
        </p>
        <div className="w-px h-12 bg-violet-900/40" />
      </div>

      {/* Entries */}
      <div className="relative" style={{ height: `${totalHeight}em` }}>
        {timeline.map((obj, i) => (
          <TimelineEntry key={i} obj={obj} index={i} />
        ))}
      </div>

      {/* End of record */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
        <div className="w-px h-6 bg-violet-900/40" />
        <p className="font-mono text-[9px] text-gray-700 tracking-[0.2em] uppercase select-none">
          [ END OF RECORD ]
        </p>
      </div>
    </section>
  )
}

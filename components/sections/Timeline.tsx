'use client'

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { timeline } from "@/lib/data"

function TimelineEntry({ obj, index }: { obj: typeof timeline[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-20% 0px" })
  const isOdd = (index + 1) % 2 !== 0

  return (
    <div
      ref={ref}
      className="absolute w-full"
      style={{ top: `${index * 22 + 10}em` }}
    >
      {/* Center dot — animated */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-4 border-white bg-transparent z-20"
      />
      {/* Center dot — background layer */}
      <div className="w-6 h-6 rounded-full absolute left-1/2 -translate-x-1/2 bg-gray-900 border-4 border-slate-800 z-10" />

      {/* Card + connector */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`absolute flex ${isOdd ? "right-1/2" : "left-1/2"}`}
      >
        {!isOdd && (
          <div className="h-2 lg:w-[8em] md:w-[6em] w-[2em] bg-slate-200 rounded self-start mt-2" />
        )}
        <div className={`text-slate-200 ${isOdd ? "text-end pe-4" : "text-start ps-4"} lg:w-[23em] md:w-[32vw] w-[42vw]`}>
          <div className={`flex ${isOdd ? "justify-end" : "justify-start"} mb-1`}>
            <span
              className={`font-bold rounded-xl text-white text-sm py-[.2em] px-4 ${
                obj.type === "Education" ? "bg-blue-800" : "bg-pink-800"
              }`}
            >
              {obj.type}
            </span>
          </div>
          <h2 className="font-bold text-2xl text-white mx-2 mt-1 mb-2">{obj.time}</h2>
          <h3 className="font-semibold text-md text-white mx-2 mt-1">{obj.title}</h3>
          <p className="text-sm text-slate-50 mx-2 mb-2">{obj.sub}</p>
          <p className="text-sm text-slate-300 mx-2 mb-2">{obj.description}</p>
        </div>
        {isOdd && (
          <div className="h-2 lg:w-[8em] md:w-[6em] w-[2em] bg-slate-200 rounded self-start mt-2" />
        )}
      </motion.div>
    </div>
  )
}

export function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  })
  const trackHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const totalHeight = timeline.length * 22 + 6 // in em units

  return (
    <section
      className="bg-gray-900 w-full relative overflow-hidden"
      style={{ paddingTop: "10em", paddingBottom: "10em" }}
    >
      {/* Header block */}
      <div className="absolute md:left-[53%] left-1/2 -translate-x-1/2 md:translate-x-0 flex items-center gap-4 top-10">
        <div>
          <h1 className="font-bold text-5xl text-slate-100 mb-4">timeline.</h1>
          <h1 className="font-bold text-xl text-gray-400">My life journey</h1>
        </div>
        <Image src="/images/rocket.png" alt="rocket" width={200} height={200} />
      </div>

      {/* Center line background */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-2 bg-gray-800 rounded top-[6em]"
        style={{ height: `${totalHeight}em` }}
      />

      {/* Animated scroll-progress line */}
      <div
        ref={sectionRef}
        className="absolute left-1/2 -translate-x-1/2 w-2 top-[6em] overflow-hidden"
        style={{ height: `${totalHeight}em` }}
      >
        <motion.div
          style={{ height: trackHeight }}
          className="w-full bg-slate-200 rounded"
        />
      </div>

      {/* Entries container */}
      <div className="relative" style={{ height: `${totalHeight}em` }}>
        {timeline.map((obj, i) => (
          <TimelineEntry key={i} obj={obj} index={i} />
        ))}
      </div>
    </section>
  )
}

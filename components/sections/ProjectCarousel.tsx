"use client"
import { useState, useCallback } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { projects } from "@/lib/data"

export function ProjectCarousel() {
  const [pos, setPos] = useState(0)

  const percent = useMotionValue(0)
  const loadingSpring = useSpring(percent, { stiffness: 80, damping: 20 })
  const loading = useTransform(loadingSpring, [0, 1], ["100%", "0%"])

  const goTo = useCallback((idx: number) => {
    if (idx < 0 || idx >= projects.length) return
    setPos(idx)
    percent.set(idx / (projects.length - 1))
  }, [percent])

  return (
    <section className="w-screen min-h-screen flex flex-col items-center justify-center bg-white relative pb-[10vh]">
      {/* Header */}
      <div className="w-[90vw] max-w-[50em] m-auto mb-4 text-center">
        <h1 className="font-bold text-5xl text-gray-900">projects.</h1>
        <h2 className="font-bold text-xl text-gray-500 mt-4">Finished and on-going projects</h2>
        {/* Spring progress bar */}
        <div className="rounded-md h-1 bg-gray-100 mt-5 m-auto overflow-hidden">
          <motion.div
            style={{ width: loading }}
            className="h-full bg-violet-700 rounded-md"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 mt-6 gap-8 items-center w-[90vw] max-w-5xl">
        {/* Decorative business image */}
        <div className="lg:flex hidden justify-end">
          <Image
            src="/images/business.png"
            alt="business"
            width={320}
            height={320}
            className="opacity-80"
          />
        </div>

        {/* Carousel */}
        <div className="relative w-full max-w-[450px] mx-auto">
          {/* Prev button */}
          {pos > 0 && (
            <button
              onClick={() => goTo(pos - 1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800 rounded-full p-1 hover:brightness-75 transition"
            >
              <ChevronLeft color="white" size={20} />
            </button>
          )}

          {/* Next button */}
          {pos < projects.length - 1 && (
            <button
              onClick={() => goTo(pos + 1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800 rounded-full p-1 hover:brightness-75 transition"
            >
              <ChevronRight color="white" size={20} />
            </button>
          )}

          {/* Slide viewport */}
          <div className="overflow-hidden rounded-xl">
            <motion.div
              animate={{ x: `-${pos * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex"
              style={{ width: `${projects.length * 100}%` }}
            >
              {projects.map((project, i) => (
                <div
                  key={i}
                  className="group flex-shrink-0 flex flex-col px-4"
                  style={{ width: `${100 / projects.length}%` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-2xl text-gray-800 capitalize">{project.name}</h3>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-white bg-pink-600 rounded-xl px-3 py-1 text-sm flex items-center gap-1 hover:brightness-75 transition"
                    >
                      Demo <ExternalLink size={14} />
                    </a>
                  </div>
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-gray-100 shadow-sm group-hover:ring-2 group-hover:ring-violet-500 group-hover:ring-offset-2 transition-all">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover"
                      sizes="450px"
                    />
                  </div>
                  <p className="font-semibold text-sm text-gray-500 mt-3">{project.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === pos ? "bg-violet-600 w-4" : "bg-gray-300"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { Logo } from "@/components/layout/Logo"

const photos = Array.from({ length: 11 }, (_, i) => `/images/${i + 1}.jpg`)

// Deterministic slight rotations — alternating for a natural scattered feel
const rotations = [1.6, -2.2, 0.9, -1.4, 2.1, -0.7, 1.8, -2.5, 0.5, -1.3, 1.9]

export function AboutIntro() {
  return (
    <section className="dot-grid relative w-screen bg-white overflow-hidden px-6 md:px-16 pt-24 pb-20">
      <Logo />

      {/* Ghost background text */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute select-none text-[18vw] font-black text-gray-900 opacity-[0.04] whitespace-nowrap top-[10%] left-1/2 -translate-x-1/2"
        animate={{ x: [40, -40] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      >
        about.
      </motion.span>

      <div className="relative z-10 w-full max-w-5xl mx-auto">

        {/* ── Top: intro ── */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col gap-5"
          >
            <p className="text-gray-500 text-sm font-medium tracking-widest uppercase">who am i</p>

            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              Yazidane<br />
              <span className="text-violet-600">Hakim</span>
            </h1>

            <p className="text-gray-500 font-semibold text-sm tracking-wide">
              Civil Engineering · National Taiwan University
            </p>

            <p className="text-gray-600 leading-relaxed text-sm max-w-md">
              A sophomore at NTU balancing civil engineering studies with a deep
              passion for software. I&apos;ve been building for the web since high
              school — and now I&apos;m taking that seriously. I love crafting
              experiences that feel both precise and alive.
            </p>

            {/* Stats */}
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

          {/* Decorative image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="relative flex items-center justify-center"
          >
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

        {/* ── Moments: polaroid wall ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <p className="text-xs text-gray-400 font-medium tracking-widest uppercase">moments</p>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Polaroid grid using CSS columns */}
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-3">
            {photos.map((src, i) => (
              <motion.div
                key={i}
                className="break-inside-avoid mb-3 cursor-pointer inline-block w-full"
                style={{ rotate: rotations[i] }}
                whileHover={{ rotate: 0, scale: 1.06, zIndex: 20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {/* Polaroid frame */}
                <div className="bg-white p-2 pb-7 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div className="overflow-hidden bg-gray-100 aspect-square">
                    <Image
                      src={src}
                      alt={`moment ${i + 1}`}
                      width={200}
                      height={200}
                      className="object-cover w-full h-full hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <p className="text-center text-[9px] text-gray-300 font-mono mt-2 tracking-widest">
                    #{String(i + 1).padStart(2, "0")}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

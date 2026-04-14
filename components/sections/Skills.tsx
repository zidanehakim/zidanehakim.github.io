"use client"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { frontEnd, backEnd } from "@/lib/data"
import { containerVariants, itemVariants } from "@/lib/motion"

function SkillGrid({ skills, title }: { skills: string[]; title: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-15%" })

  return (
    <div className="rounded-2xl col-span-2 py-5 z-20">
      <div className="flex justify-center mb-2">
        <span className="font-bold rounded-xl bg-gray-900 text-white text-sm py-1 px-6">
          {title}
        </span>
      </div>
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex justify-center items-center flex-wrap gap-4 mt-2 px-6"
      >
        {skills.map((slug) => (
          <motion.div
            key={slug}
            variants={itemVariants}
            className="logo relative text-center w-[4.5em] cursor-pointer"
          >
            <p className="logoText font-bold text-gray-900 opacity-0 transition-all select-none text-xs">
              {slug.toUpperCase()}
            </p>
            <Image
              className="logoIcon transition-all shadow-md p-2 m-auto"
              src={`/${slug}.svg`}
              alt={slug}
              width={60}
              height={60}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export function Skills() {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <section className="w-full py-[10vh] bg-white">
      <h1 ref={ref} className="font-bold text-5xl text-gray-900 text-center">skills.</h1>
      <h2 className="font-bold text-xl text-gray-500 mt-4 text-center mb-6">Web Development Skills</h2>

      <div className="w-[80%] max-w-4xl m-auto grid xl:grid-cols-6 justify-center text-center gap-4">
        {/* Decorative image */}
        <div className="col-span-2 xl:static xl:opacity-100 absolute left-1/2 -translate-x-1/2 opacity-20 z-10">
          <Image src="/images/dab.png" alt="dab" width={270} height={270} className="m-auto" />
        </div>
        <SkillGrid skills={frontEnd} title="Front-end Development" />
        <SkillGrid skills={backEnd} title="Back-end Development" />
      </div>
    </section>
  )
}

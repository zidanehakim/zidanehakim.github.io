'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'
import type { Skill } from '@/lib/types'

interface SkillGridProps {
  skills: Skill[]
  delay?: number
}

export function SkillGrid({ skills, delay = 0 }: SkillGridProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px 0px' })

  return (
    <div ref={ref} className="flex flex-wrap gap-2">
      {skills.map((skill, i) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{
            duration: 0.35,
            delay: delay + i * 0.05,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex items-center gap-2 rounded-lg border border-neutral-700/60 bg-neutral-800/50 px-3 py-2 text-sm text-neutral-300 hover:border-amber-500/30 hover:bg-amber-500/5 hover:text-amber-300 transition-all duration-200 cursor-default"
        >
          <Image
            src={skill.icon}
            alt={skill.name}
            width={18}
            height={18}
            className="shrink-0 object-contain"
            unoptimized
          />
          <span className="text-xs font-medium">{skill.name}</span>
        </motion.div>
      ))}
    </div>
  )
}

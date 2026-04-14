'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, Trophy } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { TimelineEntry } from '@/lib/types'

interface TimelineItemProps {
  entry: TimelineEntry
  index: number
}

export function TimelineItem({ entry, index }: TimelineItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' })
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'relative flex items-start gap-4',
        isEven ? 'flex-row' : 'flex-row-reverse md:flex-row'
      )}
    >
      {/* Icon dot */}
      <div className="relative z-10 shrink-0">
        <div
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-full border',
            entry.type === 'education'
              ? 'border-blue-500/30 bg-blue-500/10 text-blue-400'
              : 'border-amber-500/30 bg-amber-500/10 text-amber-400'
          )}
        >
          {entry.type === 'education' ? (
            <GraduationCap size={16} />
          ) : (
            <Trophy size={16} />
          )}
        </div>
      </div>

      {/* Card */}
      <div className="glass card-lift flex-1 rounded-xl p-4 min-w-0">
        <div className="flex flex-wrap items-start gap-2 mb-2">
          <Badge variant={entry.type === 'education' ? 'education' : 'award'}>
            {entry.type}
          </Badge>
          <span className="font-terminal text-xs text-neutral-500">{entry.period}</span>
        </div>
        <h3 className="font-semibold text-neutral-100 text-sm mb-0.5 leading-tight">
          {entry.title}
        </h3>
        <p className="text-xs font-medium text-amber-400/80 mb-2">{entry.subtitle}</p>
        <p className="text-xs text-neutral-500 leading-relaxed">{entry.description}</p>
      </div>
    </motion.div>
  )
}

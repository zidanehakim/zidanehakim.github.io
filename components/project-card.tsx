'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import type { Project } from '@/lib/types'

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="glass card-lift group relative flex flex-col rounded-2xl overflow-hidden border border-neutral-800/60"
    >
      {/* Screenshot */}
      <div className="relative h-48 overflow-hidden bg-neutral-900">
        <Image
          src={project.screenshot}
          alt={project.name}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-transparent" />
        {/* Accent color top strip */}
        <div
          className="absolute inset-x-0 top-0 h-0.5 opacity-60"
          style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        <div>
          <h3 className="text-lg font-semibold text-neutral-100 mb-1">{project.name}</h3>
          <p className="text-sm font-medium" style={{ color: project.color }}>
            {project.tagline}
          </p>
        </div>

        <p className="text-sm text-neutral-500 leading-relaxed flex-1">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <Button
            asChild
            size="sm"
            className="flex-1 gap-1.5"
          >
            <a href={project.demo} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={14} />
              Live Demo
            </a>
          </Button>
        </div>
      </div>
    </motion.article>
  )
}

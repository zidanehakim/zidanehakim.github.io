'use client'

import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/section-header'
import { ProjectCard } from '@/components/project-card'
import type { Project } from '@/lib/types'

interface PortfolioClientProps {
  projects: Project[]
}

export function PortfolioClient({ projects }: PortfolioClientProps) {
  return (
    <div className="min-h-dvh pb-28">
      <div className="mx-auto max-w-6xl px-6 pt-16 md:pt-24">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <SectionHeader
            heading="projects."
            sub="A selection of things I've built."
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-20 flex flex-col items-center gap-3 text-center"
        >
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
          <p className="font-terminal text-xs text-neutral-600 tracking-wider">
            more coming soon ◈
          </p>
        </motion.div>
      </div>
    </div>
  )
}

'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/section-header'
import { TimelineItem } from '@/components/timeline-item'
import { SkillGrid } from '@/components/skill-chip'
import type { Profile, TimelineEntry, SkillSet } from '@/lib/types'

// Photo grid — 11 photos in a bento-style mosaic
const PHOTOS = Array.from({ length: 11 }, (_, i) => `/images/${i + 1}.jpg`)

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
}

interface AboutClientProps {
  profile: Profile
  timeline: TimelineEntry[]
  skills: SkillSet
}

export function AboutClient({ profile, timeline, skills }: AboutClientProps) {
  return (
    <div className="min-h-dvh pb-28">

      {/* ── Bio + Photos ─────────────────────────────────────── */}
      <section className="relative mx-auto max-w-6xl px-6 pt-16 md:pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* Left — Bio */}
          <div className="space-y-6">
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.1}>
              <SectionHeader heading="about." />
            </motion.div>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.2}
              className="text-neutral-400 leading-relaxed text-base"
            >
              {profile.bio}
            </motion.p>

            {/* Bio detail chips */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.3}
              className="flex flex-wrap gap-2"
            >
              {[
                '🎓 NTU Civil Engineering',
                '📍 Taipei, Taiwan',
                '💻 Full-stack Dev',
                '🏆 BIM Scholar',
              ].map((item) => (
                <span key={item} className="tag">{item}</span>
              ))}
            </motion.div>

            {/* Decorative coffee */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.4}
              className="flex items-center gap-3 pt-2"
            >
              <Image
                src="/images/coffee.png"
                alt="coffee"
                width={36}
                height={36}
                className="opacity-40 animate-float"
                unoptimized
              />
              <span className="text-sm text-neutral-600 italic">fuelled by coffee and curiosity</span>
            </motion.div>
          </div>

          {/* Right — Photo mosaic */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.25}
            className="grid grid-cols-3 gap-2 auto-rows-[90px]"
          >
            {PHOTOS.map((src, i) => (
              <motion.div
                key={src}
                className={`relative overflow-hidden rounded-xl border border-neutral-800 group ${
                  i === 0 ? 'row-span-2' : ''
                } ${i === 4 ? 'col-span-2' : ''}`}
                whileHover={{ scale: 1.03, zIndex: 10 }}
                transition={{ duration: 0.25 }}
              >
                <Image
                  src={src}
                  alt={`Photo ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-6xl px-6 pt-20 md:pt-28">
        {/* Dark backdrop */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-neutral-900/0 via-neutral-900/40 to-neutral-900/0 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="relative mb-10"
        >
          <SectionHeader
            heading="timeline."
            sub="Education & awards that shaped my journey."
          />
        </motion.div>

        {/* Vertical line */}
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-500/20 to-transparent" />

          <div className="pl-8 space-y-6">
            {timeline.map((entry, index) => (
              <TimelineItem key={entry.id} entry={entry} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ───────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-6xl px-6 pt-20 md:pt-28 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <SectionHeader
            heading="skills."
            sub="Technologies I work with regularly."
          />
        </motion.div>

        <div className="space-y-8">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-600 mb-4">
              Frontend
            </h3>
            <SkillGrid skills={skills.frontend} delay={0} />
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-600 mb-4">
              Backend
            </h3>
            <SkillGrid skills={skills.backend} delay={0.15} />
          </div>
        </div>
      </section>
    </div>
  )
}

'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Mail, MapPin, Phone, Linkedin, MessageCircle } from 'lucide-react'
import { SectionHeader } from '@/components/section-header'
import { Button } from '@/components/ui/button'
import type { Profile } from '@/lib/types'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
}

interface ContactClientProps {
  profile: Profile
}

export function ContactClient({ profile }: ContactClientProps) {
  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: profile.email,
      href: `mailto:${profile.email}`,
      color: '#f59e0b',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Yazidane Hakim',
      href: profile.socials.linkedin,
      color: '#0a66c2',
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: profile.phone,
      href: `https://wa.me/${profile.phone.replace(/\D/g, '')}`,
      color: '#25d366',
    },
    {
      icon: MessageCircle,
      label: 'LINE',
      value: 'yazidanehakim',
      href: 'https://line.me/ti/p/yazidanehakim',
      color: '#06c755',
    },
  ]

  return (
    <div className="min-h-dvh pb-28">
      <div className="mx-auto max-w-5xl px-6 pt-16 md:pt-24">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          {/* Left — Info */}
          <div className="space-y-8">
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.1}>
              <SectionHeader
                heading="contacts."
                sub="Feel free to reach out through any of these channels."
              />
            </motion.div>

            {/* Profile info */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.2}
              className="glass rounded-2xl p-5 space-y-4"
            >
              <h3 className="font-semibold text-neutral-200 text-lg">{profile.name}</h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-sm text-neutral-400">
                  <MapPin size={15} className="shrink-0 text-amber-500/70 mt-0.5" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-400">
                  <Phone size={15} className="shrink-0 text-amber-500/70" />
                  <a
                    href={`tel:${profile.phone}`}
                    className="hover:text-amber-400 transition-colors"
                  >
                    {profile.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-400">
                  <Mail size={15} className="shrink-0 text-amber-500/70" />
                  <a
                    href={`mailto:${profile.email}`}
                    className="hover:text-amber-400 transition-colors"
                  >
                    {profile.email}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Decorative call icon */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.3}
              className="flex justify-center"
            >
              <Image
                src="/images/call.png"
                alt=""
                width={100}
                height={100}
                className="opacity-15 animate-float"
                aria-hidden="true"
                unoptimized
              />
            </motion.div>
          </div>

          {/* Right — Contact method cards */}
          <div className="space-y-3">
            {contactMethods.map(({ icon: Icon, label, value, href, color }, index) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={0.2 + index * 0.1}
                className="glass card-lift group flex items-center gap-4 rounded-xl p-4 border border-neutral-800/60 hover:amber-border transition-all duration-200 block"
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: `${color}18`, border: `1px solid ${color}30` }}
                >
                  <Icon size={18} style={{ color }} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-neutral-600 font-medium uppercase tracking-wider mb-0.5">
                    {label}
                  </p>
                  <p className="text-sm text-neutral-300 group-hover:text-amber-300 transition-colors truncate">
                    {value}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                  tabIndex={-1}
                >
                  <Mail size={15} />
                </Button>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

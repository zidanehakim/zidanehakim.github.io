"use client"
import { motion } from "framer-motion"
import { Mail, Globe, MessageCircle, Phone, MapPin, User } from "lucide-react"
import { contactInfo } from "@/lib/data"

const contactCards = [
  {
    icon: Mail,
    label: "Email",
    value: contactInfo.email,
    href: `mailto:${contactInfo.email}`,
  },
  {
    icon: Globe,
    label: "LinkedIn",
    value: contactInfo.linkedin,
    href: "https://www.linkedin.com/in/yazidane-hakim-25754128a/",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: contactInfo.whatsapp,
    href: `https://wa.me/${contactInfo.whatsapp.replace(/\D/g, "")}`,
  },
  {
    icon: Phone,
    label: "Line",
    value: contactInfo.line,
    href: `https://line.me/ti/p/${contactInfo.line}`,
  },
]

const infoRows = [
  { icon: User,    label: "Name",    value: contactInfo.name },
  { icon: MapPin,  label: "Address", value: contactInfo.address },
  { icon: Phone,   label: "Mobile",  value: contactInfo.phone },
]

export function ContactInfo() {
  return (
    <section className="dot-grid relative w-screen min-h-screen bg-white overflow-hidden flex flex-col items-center justify-center px-6 md:px-16 pt-24 pb-16">

      {/* Rotated availability badge — hidden on small screens to avoid overlap */}
      <div className="absolute top-24 right-6 md:right-14 rotate-[8deg] z-10 pointer-events-none select-none hidden sm:block">
        <div className="flex items-center gap-2 border-2 border-green-500/60 text-green-600 font-bold font-mono text-[10px] px-3 py-1.5 rounded tracking-[0.18em] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
          OPEN · TO · WORK
        </div>
      </div>

      {/* Bottom-right — timezone */}
      <div className="absolute bottom-6 right-6 hidden md:flex items-center gap-2 z-10">
        <span className="text-[9px] font-mono text-gray-400 tracking-widest select-none">UTC+8 · TAIPEI</span>
      </div>

      {/* Section counter */}
      <div className="absolute top-6 left-6 hidden md:flex items-center gap-2 z-10">
        <span className="text-[9px] font-mono text-gray-300 tracking-widest select-none">[ 04 / 04 ]</span>
      </div>

      {/* Ghost background text — CSS animation, no JS thread */}
      <span
        aria-hidden
        className="ghost-drift-rl pointer-events-none absolute select-none text-[14vw] font-black text-gray-900 opacity-[0.04] whitespace-nowrap top-1/3"
        style={{ left: "50%" }}
      >
        contacts.
      </span>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-gray-500 text-sm font-medium tracking-widest uppercase mb-3">get in touch</p>
          <h1 className="font-black text-5xl text-gray-900">
            Say{" "}
            <span className="text-violet-600">Hello</span>
          </h1>
          <p className="text-gray-500 text-sm mt-3 max-w-md leading-relaxed">
            I&apos;m open to collaborations, internships, and interesting projects.
            Don&apos;t hesitate to reach out!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">

          {/* Left — info rows */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-3"
          >
            {infoRows.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm"
              >
                <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon size={16} className="text-violet-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold tracking-widest uppercase">{label}</p>
                  <p className="text-sm text-gray-800 font-semibold mt-0.5">{value}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Right — contact cards grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-3"
          >
            {contactCards.map(({ icon: Icon, label, value, href }, i) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.08 }}
                className="group flex flex-col gap-3 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-violet-300 hover:shadow-[0_0_20px_#7c3aed22] transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-gray-50 group-hover:bg-violet-50 flex items-center justify-center transition-colors">
                  <Icon size={18} className="text-gray-400 group-hover:text-violet-600 transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold tracking-widest uppercase">{label}</p>
                  <p className="text-sm text-gray-700 font-semibold mt-0.5 truncate group-hover:text-violet-600 transition-colors">
                    {value}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

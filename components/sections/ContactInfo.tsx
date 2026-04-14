import Image from "next/image"
import { Logo } from "@/components/layout/Logo"
import { contactInfo } from "@/lib/data"

const contactRows = [
  { icon: "/images/email.png", label: contactInfo.email, alt: "email" },
  { icon: "/images/linkedin.png", label: contactInfo.linkedin, alt: "linkedin" },
  { icon: "/images/whatsapp.png", label: contactInfo.whatsapp, alt: "whatsapp" },
  { icon: "/images/line.png", label: contactInfo.line, alt: "line" },
]

export function ContactInfo() {
  return (
    <section className="min-h-screen w-screen grid md:grid-cols-2 justify-center items-center relative bg-white px-16">
      <Logo />

      {/* Decorative call image */}
      <div className="md:justify-self-end md:static md:opacity-100 absolute left-1/2 -translate-x-1/2 z-10 opacity-20">
        <Image
          src="/images/call.png"
          alt="contact"
          width={280}
          height={280}
          style={{ minWidth: 280 }}
          className="mx-10"
        />
      </div>

      {/* Content */}
      <div className="md:justify-self-start justify-self-center z-20">
        <h1 className="font-bold text-5xl text-gray-900">contacts.</h1>
        <h2 className="font-bold text-xl text-gray-500 mb-6 mt-4">Get in touch with me</h2>

        <div className="space-y-1 mb-6">
          <p className="font-semibold text-sm text-gray-800">
            <span className="font-bold">Name: </span>{contactInfo.name}
          </p>
          <p className="font-semibold text-sm text-gray-800">
            <span className="font-bold">Address: </span>{contactInfo.address}
          </p>
          <p className="font-semibold text-sm text-gray-800">
            <span className="font-bold">Mobile: </span>{contactInfo.phone}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
          {contactRows.map((row) => (
            <div key={row.alt} className="flex items-center gap-3 group">
              <Image src={row.icon} alt={row.alt} width={30} height={30} className="flex-shrink-0" />
              <span className="text-sm font-semibold text-gray-800 group-hover:text-violet-600 transition-colors">
                {row.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

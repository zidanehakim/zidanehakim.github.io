"use client"
import Image from "next/image"
import { Logo } from "@/components/layout/Logo"

// Personal photos (1.jpg through 11.jpg)
const photos = Array.from({ length: 11 }, (_, i) => `/images/${i + 1}.jpg`)

export function AboutIntro() {
  return (
    <section className="w-screen min-h-screen flex relative bg-white overflow-x-hidden">
      <Logo />
      <div className="bg-transparent grid xl:grid-cols-3 md:w-[65%] px-10 grid-flow-row m-auto gap-4">
        {/* Decorative coffee image */}
        <div className="col-span-1 xl:static xl:opacity-100 absolute left-1/2 -translate-x-1/2 z-10 opacity-20">
          <Image src="/images/coffee.png" alt="coffee" width={320} height={400} style={{ minWidth: 320 }} />
        </div>

        {/* Text content */}
        <div className="col-span-2 z-20 pt-20 xl:pt-0">
          <h1 className="font-bold text-5xl text-gray-900">about.</h1>
          <h2 className="font-bold text-xl text-gray-500 mt-4">Full-stack developer learner</h2>
          <p className="font-semibold text-[.9em] text-gray-600 mt-2">
            As a sophomore studying civil engineering at National Taiwan University, I'm adept at balancing academic commitments with my longstanding passion for coding. Particularly drawn to website development since high school, I'm enthusiastic about taking this interest to a professional level.
          </p>

          {/* Horizontal photo scroll strip */}
          <div className="images flex w-fit h-[170px] flex-row flex-wrap overflow-y-scroll mt-2 px-1 py-1 gap-2">
            {photos.map((src, i) => (
              <Image
                key={i}
                src={src}
                alt={`photo ${i + 1}`}
                width={120}
                height={120}
                className="object-cover rounded-md p-2 shadow-md hover:scale-105 hover:border-[.2em] border-pink-500 transition-all bg-white mt-1"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll down arrow */}
      <div className="absolute bottom-[8em] right-[15%]">
        <Image
          src="/images/fast-forward.png"
          alt="scroll down"
          width={28}
          height={28}
          className="rotate-90 opacity-90"
        />
      </div>
    </section>
  )
}

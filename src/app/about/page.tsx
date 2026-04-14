import { AboutIntro } from "@/components/sections/AboutIntro"
import { IdentityShowcase } from "@/components/sections/IdentityShowcase"
import { Timeline } from "@/components/sections/Timeline"
import { Skills } from "@/components/sections/Skills"

export default function About() {
  return (
    <>
      <AboutIntro />
      <IdentityShowcase />
      <Timeline />
      <Skills />
    </>
  )
}

import { AboutIntro } from "@/components/sections/AboutIntro"
import { IdentityShowcase } from "@/components/sections/IdentityShowcase"
import { Timeline } from "@/components/sections/Timeline"
import { Skills } from "@/components/sections/Skills"
import { ScrollProgress } from "@/components/layout/ScrollProgress"

export default function About() {
  return (
    <>
      <ScrollProgress />
      <AboutIntro />
      <IdentityShowcase />
      <Timeline />
      <Skills />
    </>
  )
}

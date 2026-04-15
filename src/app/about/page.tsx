import { IdentityShowcase } from "@/components/sections/IdentityShowcase"
import { AboutIntro } from "@/components/sections/AboutIntro"
import { Timeline } from "@/components/sections/Timeline"
import { Skills } from "@/components/sections/Skills"
import { ScrollProgress } from "@/components/layout/ScrollProgress"

export default function About() {
  return (
    <>
      <ScrollProgress />
      <IdentityShowcase />
      <AboutIntro />
      <Timeline />
      <Skills />
    </>
  )
}

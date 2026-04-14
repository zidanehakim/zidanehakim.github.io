import { AboutClient } from '@/components/about-client'
import profileData from '@/content/profile.json'
import timelineData from '@/content/timeline.json'
import skillsData from '@/content/skills.json'
import type { TimelineEntry, SkillSet } from '@/lib/types'

export default function AboutPage() {
  return (
    <AboutClient
      profile={profileData}
      timeline={timelineData as TimelineEntry[]}
      skills={skillsData as SkillSet}
    />
  )
}

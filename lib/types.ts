export interface Project {
  slug: string
  name: string
  tagline: string
  description: string
  demo: string
  repo: string | null
  screenshot: string
  tags: string[]
  color: string
}

export interface TimelineEntry {
  id: string
  type: 'education' | 'award'
  period: string
  title: string
  subtitle: string
  description: string
}

export interface Skill {
  name: string
  icon: string
}

export interface SkillSet {
  frontend: Skill[]
  backend: Skill[]
}

export interface Profile {
  name: string
  shortName: string
  title: string
  titles: string[]
  bio: string
  location: string
  phone: string
  email: string
  socials: {
    linkedin: string
    github: string
    instagram: string
    whatsapp: string
    line: string
  }
  resume: string
}

export interface TerminalLine {
  type: 'system' | 'command' | 'output' | 'error' | 'blank'
  content: string
}

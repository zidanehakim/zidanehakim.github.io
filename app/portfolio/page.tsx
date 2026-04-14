import { PortfolioClient } from '@/components/portfolio-client'
import projectsData from '@/content/projects.json'

export default function PortfolioPage() {
  return <PortfolioClient projects={projectsData} />
}

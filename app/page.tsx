import { HomeClient } from '@/components/home-client'
import profileData from '@/content/profile.json'

export default function HomePage() {
  return <HomeClient profile={profileData} />
}

import { ContactClient } from '@/components/contact-client'
import profileData from '@/content/profile.json'

export default function ContactPage() {
  return <ContactClient profile={profileData} />
}

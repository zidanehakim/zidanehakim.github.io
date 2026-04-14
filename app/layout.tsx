import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { AmbientGlow } from '@/components/ambient-glow'
import { PageTransition } from '@/components/page-transition'
import { Providers } from '@/lib/providers'

export const metadata: Metadata = {
  metadataBase: new URL('https://zidanehakim.github.io'),
  title: 'Yazidane Hakim — Portfolio',
  description:
    'Full-stack developer and engineer. Sophomore at National Taiwan University. Building blazing-fast web experiences.',
  keywords: ['portfolio', 'full-stack', 'react', 'next.js', 'typescript'],
  authors: [{ name: 'Yazidane Hakim' }],
  openGraph: {
    title: 'Yazidane Hakim — Portfolio',
    description: 'Full-stack developer and engineer.',
    type: 'website',
    url: 'https://zidanehakim.github.io',
    images: [{ url: '/cover.png' }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/cover.png" />
        <meta name="theme-color" content="#0f0f0f" />
      </head>
      <body className="relative min-h-dvh bg-background antialiased">
        {/* Dot grid background */}
        <div className="dot-grid pointer-events-none fixed inset-0 z-0" aria-hidden="true" />
        {/* Ambient orbs */}
        <AmbientGlow />
        {/* Main content */}
        <Providers>
          <PageTransition>
            <main className="relative z-10">{children}</main>
          </PageTransition>
        </Providers>
        {/* Bottom navbar */}
        <Navbar />
      </body>
    </html>
  )
}

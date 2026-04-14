'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, User, Briefcase, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/about', icon: User, label: 'About' },
  { href: '/portfolio', icon: Briefcase, label: 'Portfolio' },
  { href: '/contact', icon: Mail, label: 'Contact' },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav
      className="glass-navbar fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-2xl px-2 py-2 shadow-2xl shadow-black/40"
      aria-label="Main navigation"
    >
      <ul className="flex items-center gap-1">
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const active = pathname === href
          return (
            <li key={href}>
              <Link
                href={href}
                aria-label={label}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200',
                  active
                    ? 'bg-amber-500/15 text-amber-400'
                    : 'text-neutral-500 hover:bg-white/5 hover:text-neutral-300'
                )}
              >
                <Icon size={20} strokeWidth={active ? 2.2 : 1.8} />
                {active && (
                  <span
                    className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-amber-500"
                    aria-hidden="true"
                  />
                )}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

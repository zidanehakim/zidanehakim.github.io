'use client'

import { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const PAGE_NAMES: Record<string, string> = {
  '/': 'home',
  '/about': 'about',
  '/portfolio': 'portfolio',
  '/contact': 'contact',
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const prevPathname = useRef(pathname)

  useEffect(() => {
    if (prevPathname.current === pathname) return
    prevPathname.current = pathname

    const name = PAGE_NAMES[pathname] ?? pathname.replace('/', '')
    setDisplayName(name)
    setIsTransitioning(true)

    const t = setTimeout(() => setIsTransitioning(false), 1400)
    return () => clearTimeout(t)
  }, [pathname])

  return (
    <>
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key="page-overlay"
            className="page-overlay"
            initial={{ y: '-100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.span
              className="font-terminal text-4xl font-semibold tracking-widest text-gradient uppercase select-none"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.3 }}
            >
              {displayName}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  )
}

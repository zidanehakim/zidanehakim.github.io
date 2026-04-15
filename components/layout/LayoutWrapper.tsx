"use client"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useNavStore } from "@/store/useNavStore"

function getLabel(pathname: string) {
  if (pathname === "/") return "home"
  return pathname.replace(/^\//, "").replace(/\/$/, "")
}

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/"
  const { isTransitioning, setTransitioning } = useNavStore()
  const [hasMounted, setHasMounted] = useState(false)
  const [label, setLabel] = useState(getLabel(pathname))
  const prevPathname = useRef<string | null>(null)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    // Skip first run — only animate on navigation, not initial load
    if (prevPathname.current === null) {
      prevPathname.current = pathname
      return
    }
    prevPathname.current = pathname
    setLabel(getLabel(pathname))
    setTransitioning(true)
    // Hold overlay for 600ms then slide back up
    const t = setTimeout(() => setTransitioning(false), 650)
    return () => clearTimeout(t)
  }, [pathname, setTransitioning])

  return (
    <>
      {/* Overlay slides DOWN to cover content, then slides back UP — skipped on first load */}
      {hasMounted && (
        <motion.div
          animate={{ y: isTransitioning ? "0%" : "-100%" }}
          transition={{ duration: 0.35, ease: isTransitioning ? "easeIn" : "easeOut" }}
          initial={{ y: "-100%" }}
          className="fixed inset-0 bg-gray-950 z-50 flex items-center justify-center pointer-events-none"
        >
          <motion.span
            animate={{ opacity: isTransitioning ? 1 : 0 }}
            transition={{ duration: 0.2, delay: isTransitioning ? 0.15 : 0 }}
            className="text-white text-6xl md:text-8xl font-black tracking-tight capitalize select-none"
          >
            {label}
          </motion.span>
        </motion.div>
      )}

      {children}
    </>
  )
}

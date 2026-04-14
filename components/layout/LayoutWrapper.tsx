"use client"
import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { useNavStore } from "@/store/useNavStore"

const overlayVariants = {
  hidden:  { y: "-100%" },
  visible: { y: "0%",    transition: { duration: 0.3, ease: "easeIn"  as const } },
  exit:    { y: "-100%", transition: { duration: 0.3, ease: "easeOut" as const } },
}

const labelVariants = {
  hidden:  { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { delay: 0.1, duration: 0.25 } },
}

function getLabel(pathname: string) {
  if (pathname === "/") return "home"
  return pathname.replace(/^\//, "").replace(/\/$/, "")
}

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/"
  const setTransitioning = useNavStore((s) => s.setTransitioning)

  useEffect(() => {
    setTransitioning(true)
    const t = setTimeout(() => setTransitioning(false), 350)
    return () => clearTimeout(t)
  }, [pathname, setTransitioning])

  return (
    <>
      {/* Dark overlay that slides down then up on each navigation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`overlay-${pathname}`}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-gray-950 z-50 flex items-center justify-center pointer-events-none"
        >
          <motion.p
            variants={labelVariants}
            initial="hidden"
            animate="visible"
            className="text-white text-5xl md:text-7xl font-semibold capitalize"
            style={{ fontVariant: "small-caps" }}
          >
            {getLabel(pathname)}
          </motion.p>
        </motion.div>
      </AnimatePresence>

      {/* Page content */}
      <AnimatePresence mode="sync">
        <motion.div key={pathname}>
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  )
}

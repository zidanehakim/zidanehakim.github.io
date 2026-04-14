import type { Variants } from "framer-motion"

// Page transition overlay variants (used in PageTransition component)
export const overlayVariants: Variants = {
  initial: { y: "-100%" },
  enter: { y: "0%", transition: { duration: 0.3, ease: "easeIn" } },
  exit: { y: "-100%", transition: { duration: 0.3, ease: "easeOut" } },
}

// Page content fade-in after overlay exits
export const pageVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2, delay: 0.1 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
}

// Stagger container for skill icons / timeline cards
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

// Individual item in a stagger container
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

// Section reveal (fade + slide up on scroll into view)
export const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

// Timeline card reveal
export const cardVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

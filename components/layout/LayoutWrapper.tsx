"use client"
import { motion } from "framer-motion"
import { useNavStore } from "@/store/useNavStore"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { isTransitioning, targetLabel } = useNavStore()

  return (
    <>
      {/**
       * Overlay starts off-screen top (y: "-100%") via `initial`.
       * TransitionLink.startTransition() moves it to y:"0%" (covers screen).
       * TransitionLink.endTransition() moves it back to y:"-100%".
       * No pathname-watching needed — timing is controlled by TransitionLink.
       */}
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: isTransitioning ? "0%" : "-100%" }}
        transition={{
          duration: 0.28,
          ease: isTransitioning ? [0.76, 0, 0.24, 1] : [0.76, 0, 0.24, 1],
        }}
        className="fixed inset-0 bg-gray-950 z-[60] flex flex-col items-center justify-center pointer-events-none gap-3"
      >
        {/* Page label */}
        <motion.span
          animate={{ opacity: isTransitioning ? 1 : 0, y: isTransitioning ? 0 : 6 }}
          transition={{ duration: 0.18, delay: isTransitioning ? 0.1 : 0 }}
          className="text-white font-black capitalize select-none"
          style={{ fontSize: "clamp(2.5rem, 10vw, 6rem)", letterSpacing: "-0.02em" }}
        >
          {targetLabel || "…"}
        </motion.span>

        {/* Thin violet progress line at the bottom of the overlay */}
        <motion.div
          animate={{ scaleX: isTransitioning ? 1 : 0, opacity: isTransitioning ? 1 : 0 }}
          transition={{ duration: 0.28, delay: isTransitioning ? 0.05 : 0 }}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-violet-500 origin-left"
        />

        {/* Subtle corner accents */}
        <span className="absolute top-4 left-4 font-mono text-[#1a1a2e] text-xs select-none">┌──</span>
        <span className="absolute top-4 right-4 font-mono text-[#1a1a2e] text-xs select-none text-right">──┐</span>
        <span className="absolute bottom-4 left-4 font-mono text-[#1a1a2e] text-xs select-none">└──</span>
        <span className="absolute bottom-4 right-4 font-mono text-[#1a1a2e] text-xs select-none text-right">──┘</span>
      </motion.div>

      {children}
    </>
  )
}

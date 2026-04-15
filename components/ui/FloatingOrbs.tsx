"use client"
import { motion } from "framer-motion"

/**
 * Web3-style floating gradient blobs for white background sections.
 * All orbs are blurred, very low opacity, pointer-events-none.
 * Position as `absolute inset-0 overflow-hidden` parent required.
 */
export function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Top-left — violet */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "clamp(240px, 45vw, 600px)",
          height: "clamp(240px, 45vw, 600px)",
          background: "radial-gradient(circle, rgba(124,58,237,0.13) 0%, transparent 70%)",
          filter: "blur(48px)",
          top: "-15%",
          left: "-12%",
        }}
        animate={{ x: [0, 50, 0], y: [0, 35, 0] }}
        transition={{ duration: 16, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />

      {/* Bottom-right — blue */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "clamp(180px, 32vw, 450px)",
          height: "clamp(180px, 32vw, 450px)",
          background: "radial-gradient(circle, rgba(59,130,246,0.09) 0%, transparent 70%)",
          filter: "blur(40px)",
          bottom: "-10%",
          right: "-8%",
        }}
        animate={{ x: [0, -35, 0], y: [0, -25, 0] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 3 }}
      />

      {/* Mid — indigo accent */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "clamp(120px, 22vw, 320px)",
          height: "clamp(120px, 22vw, 320px)",
          background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
          filter: "blur(32px)",
          top: "45%",
          right: "15%",
        }}
        animate={{ x: [0, 25, 0], y: [0, -35, 0] }}
        transition={{ duration: 13, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 6 }}
      />
    </div>
  )
}

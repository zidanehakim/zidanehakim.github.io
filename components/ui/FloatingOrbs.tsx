"use client"

/**
 * Soft ambient blobs for white-background sections.
 * ⚠ No CSS filter: blur() — animated blur forces per-frame GPU repaint.
 *   Softness is achieved via multi-stop radial gradients instead.
 *   will-change: transform promotes each orb to its own compositor layer.
 */
export function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Top-left — violet */}
      <div
        className="absolute rounded-full orb-float-1"
        style={{
          width: "clamp(320px, 55vw, 700px)",
          height: "clamp(320px, 55vw, 700px)",
          background:
            "radial-gradient(circle, rgba(124,58,237,0.16) 0%, rgba(124,58,237,0.07) 35%, rgba(124,58,237,0.02) 60%, transparent 75%)",
          top: "-20%",
          left: "-15%",
          willChange: "transform",
        }}
      />

      {/* Bottom-right — blue */}
      <div
        className="absolute rounded-full orb-float-2"
        style={{
          width: "clamp(220px, 38vw, 520px)",
          height: "clamp(220px, 38vw, 520px)",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.12) 0%, rgba(59,130,246,0.05) 40%, rgba(59,130,246,0.01) 65%, transparent 80%)",
          bottom: "-12%",
          right: "-10%",
          willChange: "transform",
        }}
      />

      {/* Mid — indigo accent */}
      <div
        className="absolute rounded-full orb-float-3"
        style={{
          width: "clamp(150px, 26vw, 380px)",
          height: "clamp(150px, 26vw, 380px)",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.10) 0%, rgba(99,102,241,0.04) 45%, transparent 75%)",
          top: "40%",
          right: "12%",
          willChange: "transform",
        }}
      />
    </div>
  )
}

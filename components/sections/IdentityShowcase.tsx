"use client"
import { useRef, useEffect, useState } from "react"
import { useInView } from "framer-motion"
import { identityNodes } from "@/lib/data"

function measureTextWidth(text: string): number {
  if (typeof window === "undefined") return 300
  const span = document.createElement("span")
  span.style.cssText =
    "position:absolute;visibility:hidden;white-space:nowrap;font-size:clamp(1.5rem,5vw,2.5rem);font-weight:800;"
  span.textContent = text
  document.body.appendChild(span)
  const w = span.getBoundingClientRect().width
  document.body.removeChild(span)
  return w
}

function drawConstellation(
  canvas: HTMLCanvasElement,
  t: number,
  startTime: number
) {
  const W = canvas.width
  const H = canvas.height
  const cx = W / 2
  const cy = H / 2
  const ctx = canvas.getContext("2d")!
  ctx.clearRect(0, 0, W, H)

  const elapsed = (t - startTime) / 1000 // seconds since scan started
  const scanDuration = 3 // seconds
  const nodesAppearAt = scanDuration * 0.6 // nodes appear when scan reaches 60%

  identityNodes.forEach((n, i) => {
    const nodeDelay = nodesAppearAt + i * 0.3
    const age = elapsed - nodeDelay
    const fadeIn = Math.min(1, Math.max(0, age * 0.5))
    if (fadeIn <= 0) return

    const rad = (n.angle * Math.PI) / 180
    const r = Math.min(W, H) * n.radiusFactor
    const nx = cx + Math.cos(rad) * r
    const ny = cy + Math.sin(rad) * r

    // pulse: dim/bright cycle, same value used for dot AND text
    const pulse = Math.sin(elapsed * 1.3 + i * 1.1) * 0.5 + 0.5
    const dimMin = 0.25,
      dimMax = 1.0
    const brightness = (dimMin + pulse * (dimMax - dimMin)) * fadeIn

    // dashed edge from center
    ctx.save()
    ctx.globalAlpha = (0.08 + pulse * 0.14) * fadeIn
    ctx.beginPath()
    ctx.moveTo(cx, cy)
    ctx.lineTo(nx, ny)
    ctx.strokeStyle = "#7c3aed"
    ctx.lineWidth = 1
    ctx.setLineDash([4, 8])
    ctx.stroke()
    ctx.setLineDash([])
    ctx.restore()

    // glow halo
    const g = ctx.createRadialGradient(nx, ny, 0, nx, ny, 22)
    g.addColorStop(0, `rgba(124,58,237,${0.22 * brightness})`)
    g.addColorStop(1, "transparent")
    ctx.beginPath()
    ctx.arc(nx, ny, 22, 0, Math.PI * 2)
    ctx.fillStyle = g
    ctx.fill()

    // dot
    ctx.beginPath()
    ctx.arc(nx, ny, 3.5 + pulse * 1.8, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(167,139,250,${brightness})`
    ctx.fill()

    // label — pushed outward from center
    const dx = nx - cx,
      dy = ny - cy
    const dl = Math.sqrt(dx * dx + dy * dy)
    const lx = nx + (dx / dl) * 24
    const ly = ny + (dy / dl) * 24

    ctx.save()
    ctx.globalAlpha = brightness
    ctx.font = "bold 11px monospace"
    ctx.fillStyle = "#c4b5fd"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(n.label, lx, ly)
    ctx.restore()
  })
}

export function IdentityShowcase() {
  const ref = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isInView = useInView(ref, { once: false, margin: "-10%" })
  const [scanning, setScanning] = useState(false)
  const animFrameRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)

  // Measure name width (used to drive beam duration via CSS custom property)
  const [nameWidth, setNameWidth] = useState(300)
  useEffect(() => {
    setNameWidth(measureTextWidth("Yazidane Hakim"))
  }, [])

  useEffect(() => {
    if (isInView && !scanning) {
      setScanning(true)
    }
    if (!isInView) {
      setScanning(false)
    }
  }, [isInView, scanning])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !scanning) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener("resize", resize)

    startTimeRef.current = performance.now()

    const loop = (t: number) => {
      drawConstellation(canvas, t, startTimeRef.current)
      animFrameRef.current = requestAnimationFrame(loop)
    }
    animFrameRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [scanning])

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{ minHeight: "60vh", background: "#06060f" }}
    >
      {/* Canvas for constellation */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* ASCII corners */}
      <span className="absolute top-4 left-4 font-mono text-[#1e1e38] text-sm leading-tight pointer-events-none z-10 whitespace-pre">
        {"┌──\n│"}
      </span>
      <span className="absolute top-4 right-4 font-mono text-[#1e1e38] text-sm leading-tight text-right pointer-events-none z-10 whitespace-pre">
        {"──┐\n│"}
      </span>
      <span className="absolute bottom-4 left-4 font-mono text-[#1e1e38] text-sm leading-tight pointer-events-none z-10 whitespace-pre">
        {"│\n└──"}
      </span>
      <span className="absolute bottom-4 right-4 font-mono text-[#1e1e38] text-sm leading-tight text-right pointer-events-none z-10 whitespace-pre">
        {"│\n──┘"}
      </span>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-4 pointer-events-none">
        {/* Scanner name */}
        <div className="relative" style={{ "--name-width": `${nameWidth}px` } as React.CSSProperties}>
          {/* Ghost (dim) version always present for layout */}
          <span
            className="text-[clamp(1.5rem,5vw,2.5rem)] font-extrabold tracking-tight select-none"
            style={{ color: "#0d0d20" }}
          >
            Yazidane Hakim
          </span>

          {/* Revealed version + beam */}
          {scanning && (
            <>
              <span
                key={`reveal-${scanning}`}
                className="absolute inset-0 text-[clamp(1.5rem,5vw,2.5rem)] font-extrabold tracking-tight text-[#e8e8ff] scan-reveal overflow-hidden whitespace-nowrap"
              >
                Yazidane Hakim
              </span>
              {/* Beam */}
              <span
                key={`beam-${scanning}`}
                className="absolute top-[-8px] bottom-[-8px] w-[2px] scan-beam"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, #7c3aed, #a855f7, #7c3aed, transparent)",
                  boxShadow: "0 0 16px #7c3aed, 0 0 40px #7c3aed55",
                }}
              />
            </>
          )}
        </div>

        {/* Tagline */}
        {scanning && (
          <p
            key={`tagline-${scanning}`}
            className="font-mono text-xs tracking-widest uppercase text-[#30305a] animate-fade-in"
            style={{ animationDelay: "1.5s", animationFillMode: "both" }}
          >
            full-stack engineer · ntu · taiwan
          </p>
        )}
      </div>
    </section>
  )
}

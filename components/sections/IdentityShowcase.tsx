"use client";
import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { identityNodes } from "@/lib/data";

function measureTextWidth(text: string): number {
  if (typeof window === "undefined") return 300;
  const span = document.createElement("span");
  span.style.cssText =
    "position:absolute;visibility:hidden;white-space:nowrap;font-size:clamp(1.5rem,5vw,2.5rem);font-weight:800;";
  span.textContent = text;
  document.body.appendChild(span);
  const w = span.getBoundingClientRect().width;
  document.body.removeChild(span);
  return w;
}

function drawConstellation(
  canvas: HTMLCanvasElement,
  t: number,
  startTime: number,
) {
  const W = canvas.width;
  const H = canvas.height;
  const cx = W / 2;
  const cy = H / 2;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, W, H);

  const elapsed = (t - startTime) / 1000; // seconds since scan started
  const scanDuration = 3; // seconds
  const nodesAppearAt = scanDuration * 0.6; // nodes appear when scan reaches 60%

  identityNodes.forEach((n, i) => {
    const nodeDelay = nodesAppearAt + i * 0.3;
    const age = elapsed - nodeDelay;
    const fadeIn = Math.min(1, Math.max(0, age * 0.5));
    if (fadeIn <= 0) return;

    const rad = (n.angle * Math.PI) / 180;
    const r = Math.min(W, H) * n.radiusFactor;
    const nx = cx + Math.cos(rad) * r;
    const ny = cy + Math.sin(rad) * r;

    // pulse: never goes fully dark (dimMin raised to 0.5)
    const pulse = Math.sin(elapsed * 1.3 + i * 1.1) * 0.5 + 0.5;
    const dimMin = 0.5,
      dimMax = 1.0;
    const brightness = (dimMin + pulse * (dimMax - dimMin)) * fadeIn;

    // dashed edge from center — brighter stroke
    ctx.save();
    ctx.globalAlpha = (0.25 + pulse * 0.35) * fadeIn;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(nx, ny);
    ctx.strokeStyle = "#7c3aed";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 8]);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    // glow halo — larger + more opaque
    const g = ctx.createRadialGradient(nx, ny, 0, nx, ny, 36);
    g.addColorStop(0, `rgba(167,139,250,${0.55 * brightness})`);
    g.addColorStop(0.4, `rgba(124,58,237,${0.3 * brightness})`);
    g.addColorStop(1, "transparent");
    ctx.beginPath();
    ctx.arc(nx, ny, 36, 0, Math.PI * 2);
    ctx.fillStyle = g;
    ctx.fill();

    // dot — brighter, slightly larger
    ctx.beginPath();
    ctx.arc(nx, ny, 4.5 + pulse * 2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(221,214,254,${brightness})`; // violet-200
    ctx.fill();

    // dot inner core highlight
    ctx.beginPath();
    ctx.arc(nx, ny, 2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${brightness * 0.8})`;
    ctx.fill();

    // label — pushed outward from center, brighter
    const dx = nx - cx,
      dy = ny - cy;
    const dl = Math.sqrt(dx * dx + dy * dy);
    const lx = nx + (dx / dl) * 28;
    const ly = ny + (dy / dl) * 28;

    ctx.save();
    ctx.globalAlpha = brightness;
    ctx.font = "bold 12px monospace";
    ctx.fillStyle = "#ede9fe"; // violet-100
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(n.label, lx, ly);
    ctx.restore();
  });
}

export function IdentityShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-10%" });
  const [scanning, setScanning] = useState(false);
  const animFrameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  // Measure name width (used to drive beam duration via CSS custom property)
  const [nameWidth, setNameWidth] = useState(300);
  useEffect(() => {
    setNameWidth(measureTextWidth("Yazidane Hakim"));
  }, []);

  useEffect(() => {
    if (isInView && !scanning) {
      setScanning(true);
    }
    if (!isInView) {
      setScanning(false);
    }
  }, [isInView, scanning]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !scanning) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    startTimeRef.current = performance.now();
    let lastDraw = 0;
    const TARGET_FPS = 30;
    const FRAME_MS = 1000 / TARGET_FPS;

    const loop = (t: number) => {
      // Skip draw when tab is hidden or not enough time has passed (30fps cap)
      if (!document.hidden && t - lastDraw >= FRAME_MS) {
        drawConstellation(canvas, t, startTimeRef.current);
        lastDraw = t;
      }
      animFrameRef.current = requestAnimationFrame(loop);
    };
    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [scanning]);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{ minHeight: "60vh", background: "#06060f" }}
    >
      {/* Canvas for constellation */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* ASCII corners */}
      <span className="absolute top-4 left-4 font-mono text-violet-800/70 text-sm leading-tight pointer-events-none z-10 whitespace-pre">
        {"┌──\n│"}
      </span>
      <span className="absolute top-4 right-4 font-mono text-violet-800/70 text-sm leading-tight text-right pointer-events-none z-10 whitespace-pre">
        {"──┐\n│"}
      </span>
      <span className="absolute bottom-4 left-4 font-mono text-violet-800/70 text-sm leading-tight pointer-events-none z-10 whitespace-pre">
        {"│\n└──"}
      </span>
      <span className="absolute bottom-4 right-4 font-mono text-violet-800/70 text-sm leading-tight text-right pointer-events-none z-10 whitespace-pre">
        {"│\n──┘"}
      </span>

      {/* Coordinates — bottom left */}
      <div className="absolute bottom-4 left-10 pointer-events-none z-10">
        <span className="font-mono text-[9px] text-violet-400/50 tracking-wider">
          12.34°N / 43.21°E
        </span>
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-4 pointer-events-none">
        {/* Scanner name */}
        <div
          className="relative"
          style={{ "--name-width": `${nameWidth}px` } as React.CSSProperties}
        >
          {/* Ghost (dim) version always present for layout */}
          <span
            className="text-[clamp(1.5rem,5vw,2.5rem)] font-extrabold tracking-tight select-none"
            style={{ color: "#2d2060" }}
          >
            Yazidane Hakim
          </span>

          {/* Revealed version + beam */}
          {scanning && (
            <>
              <span
                key={`reveal-${scanning}`}
                className="absolute inset-0 text-[clamp(1.5rem,5vw,2.5rem)] font-extrabold tracking-tight text-white scan-reveal overflow-hidden whitespace-nowrap"
                style={{
                  textShadow:
                    "0 0 30px rgba(167,139,250,0.6), 0 0 60px rgba(124,58,237,0.3)",
                }}
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
      </div>
    </section>
  );
}

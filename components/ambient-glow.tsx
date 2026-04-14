'use client'

export function AmbientGlow() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Primary amber orb — top right */}
      <div
        className="animate-glow-pulse absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(245,158,11,0.12) 0%, rgba(245,158,11,0.04) 50%, transparent 70%)',
          animationDelay: '0s',
        }}
      />
      {/* Secondary amber orb — bottom left */}
      <div
        className="animate-glow-pulse absolute -bottom-60 -left-40 h-[700px] w-[700px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(217,119,6,0.1) 0%, rgba(217,119,6,0.03) 50%, transparent 70%)',
          animationDelay: '1.5s',
        }}
      />
      {/* Subtle center glow */}
      <div
        className="animate-glow-pulse absolute left-1/2 top-1/3 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(ellipse, rgba(245,158,11,0.04) 0%, transparent 70%)',
          animationDelay: '0.75s',
        }}
      />
    </div>
  )
}

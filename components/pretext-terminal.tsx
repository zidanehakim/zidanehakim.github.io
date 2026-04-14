'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useMutation } from '@tanstack/react-query'
import { cn } from '@/lib/utils'
import type { TerminalLine } from '@/lib/types'

// ─── Pretext command registry ──────────────────────────────────────────────
const COMMANDS: Record<string, TerminalLine[]> = {
  help: [
    { type: 'system', content: 'Available commands:' },
    { type: 'output', content: '  pretext show skills      — Tech stack overview' },
    { type: 'output', content: '  pretext show projects    — Portfolio projects' },
    { type: 'output', content: '  pretext show timeline    — Education & awards' },
    { type: 'output', content: '  pretext analyze          — Performance metrics' },
    { type: 'output', content: '  pretext context          — AI architecture layer' },
    { type: 'output', content: '  pretext whoami           — About this portfolio' },
    { type: 'output', content: '  clear                    — Clear terminal' },
    { type: 'blank', content: '' },
  ],
  'pretext show skills': [
    { type: 'system', content: '── Frontend ──────────────────────────────' },
    { type: 'output', content: '  ✦ React 18 + Next.js 15  (App Router, RSC)' },
    { type: 'output', content: '  ✦ TypeScript             (strict mode)' },
    { type: 'output', content: '  ✦ Tailwind CSS           (JIT)' },
    { type: 'output', content: '  ✦ Framer Motion 11       (spring physics)' },
    { type: 'output', content: '  ✦ shadcn/ui              (radix primitives)' },
    { type: 'output', content: '  ✦ HTML5 · CSS3 · GSAP · Bootstrap · Unity' },
    { type: 'blank', content: '' },
    { type: 'system', content: '── Backend ───────────────────────────────' },
    { type: 'output', content: '  ✦ Node.js + Express.js   (REST APIs)' },
    { type: 'output', content: '  ✦ MongoDB + Supabase      (data layer)' },
    { type: 'output', content: '  ✦ Git + GitHub            (version control)' },
    { type: 'blank', content: '' },
  ],
  'pretext show projects': [
    { type: 'system', content: '── Projects (3 found) ────────────────────' },
    { type: 'blank', content: '' },
    { type: 'output', content: '  [1] noteify' },
    { type: 'output', content: '      Drag-and-drop sticky notes planner' },
    { type: 'output', content: '      → https://noteify-io.netlify.app/' },
    { type: 'blank', content: '' },
    { type: 'output', content: '  [2] instrument-store' },
    { type: 'output', content: '      Online instrument shop, editorial design' },
    { type: 'output', content: '      → https://zidanehakim.github.io/react-instrument-store' },
    { type: 'blank', content: '' },
    { type: 'output', content: '  [3] animalist' },
    { type: 'output', content: '      Anime search engine w/ Jikan API + parallax' },
    { type: 'output', content: '      → https://zidanehakim.github.io/animalist' },
    { type: 'blank', content: '' },
  ],
  'pretext show timeline': [
    { type: 'system', content: '── Timeline ──────────────────────────────' },
    { type: 'blank', content: '' },
    { type: 'output', content: '  2023–present  National Taiwan University' },
    { type: 'output', content: '                B.Sc. Civil Engineering' },
    { type: 'blank', content: '' },
    { type: 'output', content: '  2022           BIM Full Scholarship' },
    { type: 'output', content: '                Indonesian Ministry of Education' },
    { type: 'blank', content: '' },
    { type: 'output', content: '  2022           Best Automation — Raspberry Pi' },
    { type: 'output', content: '  2022           National Informatics Olympiad Finalist' },
    { type: 'output', content: '  2021           Bengkulu Informatics Olympiad — Gold' },
    { type: 'blank', content: '' },
    { type: 'output', content: '  2020–2023      SMA Negeri 4 Bengkulu' },
    { type: 'blank', content: '' },
  ],
  'pretext analyze': [
    { type: 'system', content: '── Performance Analysis ──────────────────' },
    { type: 'blank', content: '' },
    { type: 'output', content: '  Lighthouse Score:' },
    { type: 'output', content: '  ┌─────────────────────────────────────┐' },
    { type: 'output', content: '  │  Performance    ████████████  100  │' },
    { type: 'output', content: '  │  Accessibility  ████████████  100  │' },
    { type: 'output', content: '  │  Best Practices ████████████  100  │' },
    { type: 'output', content: '  │  SEO            ████████████  100  │' },
    { type: 'output', content: '  └─────────────────────────────────────┘' },
    { type: 'blank', content: '' },
    { type: 'output', content: '  Core Web Vitals:' },
    { type: 'output', content: '    LCP  <1.2s   (target: <2.5s)  ✓' },
    { type: 'output', content: '    FID  <50ms   (target: <100ms) ✓' },
    { type: 'output', content: '    CLS  0.000   (target: <0.1)   ✓' },
    { type: 'blank', content: '' },
    { type: 'output', content: '  Build:' },
    { type: 'output', content: '    Strategy   Static Export (next build)' },
    { type: 'output', content: '    Routes     4 pages, all pre-rendered' },
    { type: 'output', content: '    Images     next/image, lazy-loaded' },
    { type: 'output', content: '    Fonts      DM Sans + JetBrains Mono (subset)' },
    { type: 'blank', content: '' },
  ],
  'pretext context': [
    { type: 'system', content: '── AI Architecture Layer ─────────────────' },
    { type: 'blank', content: '' },
    { type: 'output', content: '  PRETEXT is the intelligence layer of this portfolio.' },
    { type: 'output', content: '  It connects content, architecture decisions, and' },
    { type: 'output', content: '  live state into a unified, queryable interface.' },
    { type: 'blank', content: '' },
    { type: 'output', content: '  Context sources:' },
    { type: 'output', content: '    content/*.json     Structured portfolio data' },
    { type: 'output', content: '    lib/types.ts       Typed data contracts' },
    { type: 'output', content: '    lib/providers.tsx  TanStack Query v5 client' },
    { type: 'output', content: '    app/**             Next.js 15 App Router' },
    { type: 'blank', content: '' },
    { type: 'output', content: '  Commands are executed as TanStack mutations.' },
    { type: 'output', content: '  Boot sequence auto-types on mount via useEffect.' },
    { type: 'output', content: '  History: ↑↓ keys · Autocomplete: TAB' },
    { type: 'blank', content: '' },
    { type: 'output', content: '  Model:    claude-sonnet-4-6 (Anthropic)' },
    { type: 'output', content: '  Deployed: GitHub Pages (static export)' },
    { type: 'blank', content: '' },
  ],
  'pretext whoami': [
    { type: 'system', content: '── Identity ──────────────────────────────' },
    { type: 'blank', content: '' },
    { type: 'output', content: '  Name:     Yazidane Hakim' },
    { type: 'output', content: '  Alias:    Zidane' },
    { type: 'output', content: '  Role:     Full-stack Developer + Engineer' },
    { type: 'output', content: '  Location: Taipei, Taiwan (NTU, 2nd year)' },
    { type: 'output', content: '  Email:    zidanehakimgt@gmail.com' },
    { type: 'blank', content: '' },
    { type: 'output', content: '  Stack:    Next.js · React · TypeScript' },
    { type: 'output', content: '            Node.js · MongoDB · Supabase' },
    { type: 'blank', content: '' },
  ],
}

// ─── Boot sequence ──────────────────────────────────────────────────────────
const BOOT_LINES: TerminalLine[] = [
  { type: 'system', content: '╔═══════════════════════════════════════╗' },
  { type: 'system', content: '║  PRETEXT v1.0  — Portfolio Context    ║' },
  { type: 'system', content: '╚═══════════════════════════════════════╝' },
  { type: 'blank', content: '' },
  { type: 'output', content: '  Initializing context engine...' },
  { type: 'output', content: '  ✓ Content layer loaded' },
  { type: 'output', content: '  ✓ TanStack Query client ready' },
  { type: 'output', content: '  ✓ Next.js 15 App Router active' },
  { type: 'output', content: '  ✓ Static export configured' },
  { type: 'blank', content: '' },
  { type: 'system', content: '  Type `help` to explore available commands.' },
  { type: 'blank', content: '' },
]

// ─── Command resolver (used as mutation fn) ─────────────────────────────────
async function executeCommand(input: string): Promise<TerminalLine[]> {
  const trimmed = input.trim().toLowerCase()
  await new Promise((r) => setTimeout(r, 180))
  return (
    COMMANDS[trimmed] ?? [
      { type: 'error', content: `Command not found: "${trimmed}"` },
      { type: 'output', content: '  Type `help` for available commands.' },
      { type: 'blank', content: '' },
    ]
  )
}

// ─── Line renderer ──────────────────────────────────────────────────────────
function TerminalLineEl({ line }: { line: TerminalLine }) {
  if (!line) return null;
  if (line.type === 'blank') return <div className="h-1.5" />

  return (
    <div
      className={cn(
        'font-terminal text-[13px] leading-relaxed',
        line.type === 'system' && 'text-amber-400/80',
        line.type === 'command' && 'text-amber-300',
        line.type === 'output' && 'text-neutral-300',
        line.type === 'error' && 'text-red-400'
      )}
    >
      {line.type === 'command' ? (
        <span>
          <span className="text-amber-500 select-none">$ </span>
          {line.content}
        </span>
      ) : (
        line.content
      )}
    </div>
  )
}

// ─── Main component ─────────────────────────────────────────────────────────
export function PretextTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [input, setInput] = useState('')
  const [booted, setBooted] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // TanStack Query mutation — each command is a mutation
  const { mutate, isPending } = useMutation({
    mutationFn: executeCommand,
    onMutate: (cmd: string) => {
      // Replace the "Resolving..." placeholder with the actual command line
      setLines((prev) => {
        const next = [...prev]
        // Remove the last "Resolving..." output if present
        if (next.at(-1)?.content === '  Resolving...') next.pop()
        return next
      })
      void cmd
    },
    onSuccess: (data: TerminalLine[]) => {
      setLines((prev) => [...prev, ...data])
    },
    onError: () => {
      setLines((prev) => [
        ...prev,
        { type: 'error', content: '  Execution error. Please try again.' },
        { type: 'blank', content: '' },
      ])
    },
  })

  // Boot sequence typewriter
  useEffect(() => {
    if (booted) return
    let idx = 0
    const next = () => {
      if (idx >= BOOT_LINES.length) {
        setBooted(true)
        return
      }
      setLines((prev) => [...prev, BOOT_LINES[idx]])
      idx++
      setTimeout(next, idx <= 3 ? 60 : 120)
    }
    setTimeout(next, 400)
  }, [booted])

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [lines])

  const appendCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim()
      if (!trimmed) return

      if (trimmed === 'clear') {
        setLines([])
        setInput('')
        return
      }

      setLines((prev) => [
        ...prev,
        { type: 'command', content: trimmed },
        { type: 'output', content: '  Resolving...' },
      ])
      setHistory((h) => [trimmed, ...h.slice(0, 29)])
      setHistoryIdx(-1)
      setInput('')
      mutate(trimmed)
    },
    [mutate]
  )

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      appendCommand(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(historyIdx + 1, history.length - 1)
      setHistoryIdx(next)
      setInput(history[next] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.max(historyIdx - 1, -1)
      setHistoryIdx(next)
      setInput(next === -1 ? '' : (history[next] ?? ''))
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const partial = input.trim()
      const match = Object.keys(COMMANDS).find(
        (cmd) => cmd.startsWith(partial) && cmd !== partial
      )
      if (match) setInput(match)
    }
  }

  return (
    <div
      className="group relative rounded-2xl border border-amber-500/20 bg-[#0a0a0a] amber-glow-strong overflow-hidden cursor-text"
      onClick={() => inputRef.current?.focus()}
      style={{ minHeight: 380 }}
    >
      {/* Scanline overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.025]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)',
        }}
        aria-hidden="true"
      />

      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-amber-500/10 bg-[#111] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-500/80" />
        <span className="h-3 w-3 rounded-full bg-amber-500/80" />
        <span className="h-3 w-3 rounded-full bg-green-500/80" />
        <span className="ml-3 font-terminal text-xs text-neutral-500 tracking-wider uppercase">
          pretext://portfolio — context engine
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-amber-500 animate-glow-pulse" />
          <span className="font-terminal text-[10px] text-amber-500/70 uppercase tracking-widest">
            live
          </span>
        </div>
      </div>

      {/* Output area */}
      <div
        className="scrollbar-none overflow-y-auto px-5 py-4 space-y-0.5"
        style={{ maxHeight: 380, minHeight: 280 }}
      >
        {lines.map((line, i) => (
          <TerminalLineEl key={i} line={line} />
        ))}
        {isPending && (
          <div className="font-terminal text-[13px] text-amber-400/50 animate-pulse">
            ◌ processing...
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input row */}
      <div className="border-t border-amber-500/10 px-5 py-3 flex items-center gap-3">
        <span className="font-terminal text-sm text-amber-500 select-none shrink-0">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={!booted || isPending}
          placeholder={booted ? 'type a command...' : 'booting...'}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          className={cn(
            'flex-1 bg-transparent font-terminal text-sm outline-none',
            'text-neutral-200 placeholder:text-neutral-600',
            'disabled:opacity-40 disabled:cursor-not-allowed'
          )}
          aria-label="Terminal input"
        />
        <span
          className="h-4 w-0.5 bg-amber-400 animate-cursor-blink shrink-0"
          aria-hidden="true"
        />
      </div>

      {/* Hint row */}
      <div className="px-5 pb-3">
        <p className="font-terminal text-[10px] text-neutral-600 tracking-wider">
          TAB autocomplete · ↑↓ history · try{' '}
          <button
            className="text-amber-500/60 hover:text-amber-400 transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              appendCommand('help')
            }}
          >
            help
          </button>{' '}
          ·{' '}
          <button
            className="text-amber-500/60 hover:text-amber-400 transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              appendCommand('pretext analyze')
            }}
          >
            pretext analyze
          </button>
        </p>
      </div>
    </div>
  )
}

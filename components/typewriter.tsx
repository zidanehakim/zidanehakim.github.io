'use client'

import { useState, useEffect, useRef } from 'react'

interface TypewriterProps {
  words: string[]
  className?: string
}

type Phase = 'typing' | 'hold' | 'deleting'

export function Typewriter({ words, className }: TypewriterProps) {
  const [display, setDisplay] = useState('')
  const [phase, setPhase] = useState<Phase>('typing')
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  // Cursor blink independent of typewriter
  useEffect(() => {
    const id = setInterval(() => setShowCursor((v) => !v), 530)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const word = words[wordIdx]

    if (phase === 'typing') {
      if (charIdx < word.length) {
        const t = setTimeout(() => {
          setDisplay(word.slice(0, charIdx + 1))
          setCharIdx((i) => i + 1)
        }, 95)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setPhase('hold'), 2200)
        return () => clearTimeout(t)
      }
    }

    if (phase === 'hold') {
      const t = setTimeout(() => setPhase('deleting'), 500)
      return () => clearTimeout(t)
    }

    if (phase === 'deleting') {
      if (charIdx > 0) {
        const t = setTimeout(() => {
          setDisplay(word.slice(0, charIdx - 1))
          setCharIdx((i) => i - 1)
        }, 55)
        return () => clearTimeout(t)
      } else {
        setWordIdx((i) => (i + 1) % words.length)
        setPhase('typing')
      }
    }
  }, [phase, charIdx, wordIdx, words])

  return (
    <span className={className} aria-live="polite" aria-atomic="true">
      {display}
      <span
        className="inline-block w-0.5 h-[0.85em] bg-amber-400 ml-0.5 align-middle"
        style={{ opacity: showCursor ? 1 : 0, transition: 'opacity 0.1s' }}
        aria-hidden="true"
      />
    </span>
  )
}

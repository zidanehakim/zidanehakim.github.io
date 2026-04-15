"use client"
import { useCallback, useEffect, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useNavStore } from "@/store/useNavStore"

interface TransitionLinkProps {
  href: string
  label: string                       // page name shown on overlay
  children: React.ReactNode
  className?: string
  [key: string]: unknown
}

/**
 * Drop-in replacement for next/link that triggers the overlay transition
 * BEFORE navigation, so the overlay covers the screen before content swaps.
 *
 * Timeline:
 *   t=0ms   → startTransition: overlay slides DOWN (250ms animation)
 *   t=290ms → router.push: content swaps under the overlay (invisible to user)
 *   t=600ms → endTransition: overlay slides back UP
 */
export function TransitionLink({ href, label, children, className, ...rest }: TransitionLinkProps) {
  const router = useRouter()
  const pathname = usePathname() ?? "/"
  const { isTransitioning, startTransition, endTransition } = useNavStore()
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  // Cleanup on unmount
  useEffect(() => {
    return () => timers.current.forEach(clearTimeout)
  }, [])

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      // No-op if already on this page or mid-transition
      if (href === pathname || isTransitioning) return

      // Clear any stale timers from a rapid click
      timers.current.forEach(clearTimeout)
      timers.current = []

      startTransition(label.toLowerCase())

      const t1 = setTimeout(() => {
        router.push(href)
      }, 290) // wait for overlay to fully cover before navigating

      const t2 = setTimeout(() => {
        endTransition()
      }, 620) // wait for new page to render, then reveal it

      timers.current = [t1, t2]
    },
    [href, label, pathname, isTransitioning, router, startTransition, endTransition],
  )

  return (
    <a href={href} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>
  )
}

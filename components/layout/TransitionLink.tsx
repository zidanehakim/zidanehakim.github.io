"use client";
import { useCallback, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useNavStore } from "@/store/useNavStore";

interface TransitionLinkProps {
  href: string;
  label: string; // page name shown on overlay
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

/**
 * Drop-in replacement for next/link that triggers the overlay transition
 * BEFORE navigation, so the overlay covers the screen before content swaps.
 *
 * Timeline:
 *   t=0ms    → startTransition: overlay slides IN (380ms animation)
 *   t=420ms  → router.push: content swaps under the overlay (invisible to user)
 *   t=1050ms → endTransition: overlay slides back OUT (420ms animation)
 */
export function TransitionLink({
  href,
  label,
  children,
  className,
  ...rest
}: TransitionLinkProps) {
  const router = useRouter();
  const pathname = usePathname() ?? "/";
  const { isTransitioning, startTransition, endTransition } = useNavStore();
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      // No-op if already on this page or mid-transition
      if (href === pathname || isTransitioning) return;

      // Clear any stale timers from a rapid click
      timers.current.forEach(clearTimeout);
      timers.current = [];

      startTransition(label.toLowerCase());

      const t1 = setTimeout(() => {
        router.push(href);
      }, 420); // 40ms buffer after 380ms enter animation fully covers screen

      const t2 = setTimeout(() => {
        endTransition();
      }, 1050); // 630ms after navigate — new page has time to fully render

      timers.current = [t1, t2];
    },
    [
      href,
      label,
      pathname,
      isTransitioning,
      router,
      startTransition,
      endTransition,
    ],
  );

  return (
    <a href={href} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>
  );
}

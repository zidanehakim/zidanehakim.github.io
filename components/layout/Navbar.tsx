"use client"
import { usePathname } from "next/navigation"
import { Home, User, Briefcase, Phone } from "lucide-react"
import { useNavStore } from "@/store/useNavStore"
import { TransitionLink } from "@/components/layout/TransitionLink"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/",          icon: Home,      label: "Home"    },
  { href: "/about",     icon: User,      label: "About"   },
  { href: "/portfolio", icon: Briefcase, label: "Work"    },
  { href: "/contact",   icon: Phone,     label: "Contact" },
]

export function Navbar() {
  const pathname = usePathname() ?? "/"
  const isTransitioning = useNavStore((s) => s.isTransitioning)

  return (
    <nav
      className={cn(
        "fixed bottom-[4%] left-1/2 -translate-x-1/2 z-40",
        "bg-white/85 backdrop-blur-md shadow-2xl rounded-3xl py-3 px-5",
        isTransitioning && "pointer-events-none"
      )}
    >
      <div className="flex gap-5">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href))
          return (
            <TransitionLink key={href} href={href} label={label} aria-label={label}>
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110",
                  active
                    ? "bg-violet-600 shadow-[0_0_8px_#7c3aed99]"
                    : "bg-gray-950"
                )}
              >
                <Icon size={18} color="white" />
              </div>
            </TransitionLink>
          )
        })}
      </div>
    </nav>
  )
}

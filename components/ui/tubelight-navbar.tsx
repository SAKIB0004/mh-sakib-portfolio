'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useActiveSection } from '@/lib/use-active-section'

export interface TubelightItem {
  /** Visible label (and accessible name). */
  name: string
  /** Real destination: a section anchor like "/#about" or a route. */
  url: string
  icon: React.ComponentType<{ className?: string }>
  /** id of the on-page section this item points to (enables scroll-spy). */
  sectionId?: string
  /** Mark this item active on non-home routes (e.g. /projects/[id] -> Projects). */
  matchRoute?: (pathname: string) => boolean
}

interface TubelightNavbarProps {
  items: TubelightItem[]
  className?: string
}

const spring = { type: 'spring', stiffness: 300, damping: 30 } as const

/**
 * Floating "tubelight" navigation pill (top-centre by default; the consumer sets
 * exact offsets through `className`).
 *
 * Active item resolution:
 *   - on "/"            -> scroll-spy over each item's `sectionId` (items must be in page order)
 *   - on other routes   -> first item whose `matchRoute(pathname)` is true
 * Clicking an item moves the lamp immediately (see useActiveSection.lock).
 *
 * Adapted from the 21st.dev "Tubelight Navbar" with: real routes, derived
 * active state, aria-current + labelled landmark, icon-only layout until 1320px
 * (labels from there), site design tokens, and a lamp centred with
 * inset/margin instead of a Tailwind translate (Framer overwrites the inline
 * transform of animated elements, which would knock a translated lamp off-centre).
 */
export function TubelightNavbar({ items, className }: TubelightNavbarProps) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const sectionIds = React.useMemo(
    () => items.flatMap((i) => (i.sectionId ? [i.sectionId] : [])),
    [items]
  )
  const { active: sectionActive, lock } = useActiveSection(sectionIds, isHome)

  const activeName = isHome
    ? items.find((i) => i.sectionId === sectionActive)?.name
    : items.find((i) => i.matchRoute?.(pathname))?.name

  return (
    <div
      className={cn(
        'pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-2',
        className
      )}
    >
      <nav
        aria-label="Primary"
        className="pointer-events-auto w-full max-w-md rounded-full border border-line bg-ink/90 p-1.5 backdrop-blur-xl md:w-auto md:max-w-none"
      >
        <ul className="flex items-center gap-1">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = activeName === item.name
            return (
              <li key={item.name} className="min-w-0 flex-1 md:flex-none">
                <Link
                  href={item.url}
                  onClick={() => item.sectionId && lock(item.sectionId)}
                  aria-current={isActive ? (isHome ? 'location' : 'page') : undefined}
                  className={cn(
                    'relative flex min-h-[44px] items-center justify-center gap-2 rounded-full px-2 font-display text-sm font-medium transition-colors md:px-3 lg:px-3.5 min-[1320px]:px-3',
                    isActive ? 'text-signal' : 'text-dim hover:text-bone'
                  )}
                >
                  {isActive && (
                    <>
                      <motion.span
                        aria-hidden
                        layoutId="tubelight-bg"
                        className="absolute inset-0 rounded-full bg-signal/10"
                        transition={spring}
                      />
                      {/* The lamp: a bright bar on the item's top edge with a soft halo */}
                      <motion.span
                        aria-hidden
                        layoutId="tubelight-lamp"
                        className="absolute inset-x-0 -top-2 mx-auto h-1 w-8 rounded-full bg-signal"
                        transition={spring}
                      >
                        <span className="absolute -inset-2 rounded-full bg-signal/25 blur-md" />
                        <span className="absolute -inset-1 rounded-full bg-signal/25 blur-sm" />
                      </motion.span>
                    </>
                  )}
                  <Icon className="relative z-10 h-[18px] w-[18px] shrink-0" />
                  <span className="z-10 sr-only min-[1320px]:not-sr-only">{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Award,
  BriefcaseBusiness,
  Cpu,
  FlaskConical,
  FolderKanban,
  GraduationCap,
  Github,
  Linkedin,
  Mail,
  Menu,
  User,
  X,
  type LucideIcon,
} from 'lucide-react'
import { navLinks, siteConfig } from '@/data'
import { duration, ease, stagger } from '@/lib/motion'
import { TubelightNavbar, type TubelightItem } from '@/components/ui/tubelight-navbar'
import TerminalToggle from '@/components/terminal/TerminalToggle'

/** One icon per section id. A link without an entry falls back to a plain dot. */
const sectionIcons: Record<string, LucideIcon> = {
  about: User,
  skills: Cpu,
  projects: FolderKanban,
  research: FlaskConical,
  experience: BriefcaseBusiness,
  education: GraduationCap,
  certifications: Award,
  contact: Mail,
}

/** Non-home routes that belong to a nav item (so the lamp stays lit there). */
const routeOwners: Record<string, (pathname: string) => boolean> = {
  projects: (p) => p.startsWith('/projects'),
  certifications: (p) => p.startsWith('/certifications'),
}

/** Fallback icon for a nav link that has no entry in `sectionIcons`. */
const Dot = ({ className }: { className?: string }) => (
  <span aria-hidden className={className}>
    •
  </span>
)

const DESKTOP_QUERY = '(min-width: 768px)'

/**
 * Site chrome:
 *  - header: brand + utilities (terminal, GitHub, LinkedIn on md+).
 *  - md+ (>=768px): <TubelightNavbar/> centred in the header row is the section navigation.
 *  - phones (<768px): NO tubelight; a hamburger opens a full-screen dropdown menu instead.
 * Section links come from `navLinks` in data/ (single source of truth for both).
 */
export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Mobile menu: lock scroll, close on Escape, move focus in
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    firstLinkRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  // Close the menu when the route changes, and if the viewport grows to md+ (tubelight takes over)
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY)
    const onChange = () => mq.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const items = useMemo<TubelightItem[]>(
    () =>
      navLinks.map(({ label, href }) => {
        const id = href.replace('/#', '')
        return {
          name: label,
          url: href,
          icon: sectionIcons[id] ?? Dot,
          sectionId: id,
          matchRoute: routeOwners[id],
        }
      }),
    []
  )

  return (
    <>
      <a
        href="#main"
        className="sr-only-focusable fixed left-4 top-4 z-[70] rounded-[4px] bg-signal px-4 py-2 font-display text-sm font-semibold text-ink"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
          scrolled || open ? 'border-b border-line bg-ink/85 backdrop-blur-md' : 'border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-page items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="font-display text-xl font-bold tracking-tight stretch-condensed uppercase"
            aria-label="Mahmudul Haque Sakib — home"
          >
            MH Sakib
          </Link>

          <div className="flex items-center gap-1">
            <TerminalToggle />
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub (opens in a new tab)"
              className="hidden h-11 w-11 items-center justify-center text-dim transition-colors hover:text-bone md:flex"
            >
              <Github size={19} aria-hidden />
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn (opens in a new tab)"
              className="hidden h-11 w-11 items-center justify-center text-dim transition-colors hover:text-bone md:flex"
            >
              <Linkedin size={19} aria-hidden />
            </a>
            <button
              ref={toggleRef}
              type="button"
              className="flex h-11 w-11 items-center justify-center text-bone md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
            </button>
          </div>
        </div>
      </header>

      {/* md+: centred in the header row. Hidden (display:none => not focusable, not announced) on phones. */}
      <TubelightNavbar
        items={items}
        className="hidden md:top-0 md:flex md:h-[4.5rem] md:items-center"
      />

      {/* Phones: full-screen dropdown menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: duration.base, ease: ease.inOut }}
            className="fixed inset-0 z-40 overflow-y-auto bg-ink px-5 pb-10 pt-28 sm:px-8 md:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map(({ label, href }, i) => (
                <motion.li
                  key={href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * stagger * 0.6, duration: duration.base, ease: ease.out }}
                  className="border-b border-line"
                >
                  <Link
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-[56px] items-center font-display text-heading font-semibold stretch-condensed text-bone"
                  >
                    {label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-8 flex gap-6 text-dim">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[44px] items-center gap-2 hover:text-bone"
              >
                <Github size={18} aria-hidden /> GitHub
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[44px] items-center gap-2 hover:text-bone"
              >
                <Linkedin size={18} aria-hidden /> LinkedIn
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

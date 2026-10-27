'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Github, Linkedin, Menu, X } from 'lucide-react'
import { navLinks, siteConfig } from '@/data'
import { duration, ease, stagger } from '@/lib/motion'
import TerminalToggle from '@/components/terminal/TerminalToggle'

export default function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const toggleRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight the section in view (home page only)
  useEffect(() => {
    if (!isHome) {
      setActive('')
      return
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' }
    )
    navLinks.forEach(({ href }) => {
      const el = document.getElementById(href.replace('/#', ''))
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [isHome])

  // Mobile menu: lock scroll, close on Escape, move focus in/out
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

  // Close the menu when the route changes
  useEffect(() => setOpen(false), [pathname])

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
          scrolled || open
            ? 'border-b border-line bg-ink/85 backdrop-blur-md'
            : 'border-b border-transparent'
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-[4.5rem] max-w-page items-center justify-between px-5 sm:px-8 lg:px-12"
        >
          <Link
            href="/"
            className="font-display text-xl font-bold tracking-tight stretch-condensed uppercase"
            aria-label="Mahmudul Haque Sakib — home"
          >
            MH Sakib
          </Link>

          <ul className="hidden items-center gap-7 xl:gap-8 lg:flex">
            {navLinks.map(({ label, href }) => {
              const id = href.replace('/#', '')
              const isActive = isHome ? active === id : pathname === '/certifications' && id === 'certifications'
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative block py-2 font-display text-[0.9rem] font-medium transition-colors ${
                      isActive ? 'text-bone' : 'text-dim hover:text-bone'
                    }`}
                  >
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        aria-hidden
                        className="absolute inset-x-0 -bottom-px h-[2px] bg-gradient-to-r from-heat-3 to-heat-4"
                        transition={{ duration: duration.base, ease: ease.out }}
                      />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-1">
            <TerminalToggle />
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub (opens in a new tab)"
              className="hidden h-11 w-11 items-center justify-center text-dim transition-colors hover:text-bone lg:flex"
            >
              <Github size={19} aria-hidden />
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn (opens in a new tab)"
              className="hidden h-11 w-11 items-center justify-center text-dim transition-colors hover:text-bone lg:flex"
            >
              <Linkedin size={19} aria-hidden />
            </a>
            <button
              ref={toggleRef}
              type="button"
              className="flex h-11 w-11 items-center justify-center text-bone lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: duration.base, ease: ease.inOut }}
            className="fixed inset-0 z-40 overflow-y-auto bg-ink px-5 pb-10 pt-28 sm:px-8"
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
              <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="flex min-h-[44px] items-center gap-2 hover:text-bone">
                <Github size={18} aria-hidden /> GitHub
              </a>
              <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="flex min-h-[44px] items-center gap-2 hover:text-bone">
                <Linkedin size={18} aria-hidden /> LinkedIn
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

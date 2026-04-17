'use client'

import { Github, Linkedin, Mail, FileText, ArrowUp } from 'lucide-react'
import { siteConfig } from '@/data'

const navLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'Research', href: '#research' },
  { label: 'Experience', href: '#experience' },
  { label: 'Credentials', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

const socialLinks = [
  { label: 'GitHub', href: siteConfig.github, icon: Github },
  { label: 'LinkedIn', href: siteConfig.linkedin, icon: Linkedin },
  { label: 'Gmail', href: `mailto:${siteConfig.email}`, icon: Mail },
  { label: 'Resume', href: siteConfig.resumeUrl, icon: FileText },
]

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative overflow-hidden bg-[#060d18]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(167,139,250,0.10),transparent_24%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-8 md:py-10 lg:px-12">
        <div className="p-5 md:p-6">
          <div className="grid gap-6 md:grid-cols-[0.95fr_1.05fr] md:items-end">
            <div className="space-y-5">
              <div className="space-y-2">
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-500">
                  Closing note
                </p>

                <div className="text-2xl md:text-3xl font-semibold tracking-tight">
                  still building.<br />
                  still learning.<br />
                  still curious.
                </div>

                <p className="max-w-xl text-sm leading-7 text-slate-400 md:text-base">
                  AI/ML engineering with research depth, product thinking, and
                  a focus on systems that hold up beyond the demo.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-1">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-slate-500">
                  Navigation
                </p>

                <div className="mt-3 space-y-2">
                  {navLinks.map((item) => {
                    const external =
                      item.href.startsWith('http') || item.href.startsWith('mailto:')

                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noopener noreferrer' : undefined}
                        className="block text-sm text-slate-300 transition-colors duration-200 hover:text-accent-cyan"
                      >
                        {item.label}
                      </a>
                    )
                  })}
                </div>
              </div>

              <div className="p-1">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-slate-500">
                  Elsewhere
                </p>

                <div className="mt-3 space-y-2">
                  {socialLinks.map((item) => {
                    const Icon = item.icon

                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                        rel={
                          item.href.startsWith('mailto:')
                            ? undefined
                            : 'noopener noreferrer'
                        }
                        className="flex items-center gap-2 text-sm text-slate-300 transition-colors duration-200 hover:text-accent-cyan"
                      >
                        <Icon size={14} />
                        {item.label}
                      </a>
                    )
                  })}
                  <button
                    onClick={scrollToTop}
                    className="inline-flex items-center gap-2 rounded-xl bg-white/[0.04] px-4 py-2.5 font-mono text-xs text-slate-300 transition-all duration-200 hover:border-accent-cyan/30 hover:text-accent-cyan"
                  >
                    Back to top
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 border-t border-white/6 pt-4 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
            <p>
              © {new Date().getFullYear()} Mahmudul Haque Sakib · Dhaka,
              Bangladesh
            </p>
            <p>Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.</p>

          </div>
        </div>
      </div>
    </footer>
  )
}
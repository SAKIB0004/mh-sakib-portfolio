import Link from 'next/link'
import { ArrowUp } from 'lucide-react'
import { navLinks, siteConfig } from '@/data'
import TextLink from '@/components/ui/TextLink'

const elsewhere = [
  { label: 'GitHub', href: siteConfig.github },
  { label: 'LinkedIn', href: siteConfig.linkedin },
  { label: 'Kaggle', href: siteConfig.kaggle },
  { label: 'Codeforces', href: siteConfig.codeforces },
  { label: 'CodeChef', href: siteConfig.codechef },
  { label: 'Email', href: `mailto:${siteConfig.email}` },
  { label: 'Resume (PDF)', href: siteConfig.resumeUrl },
]

export default function Footer() {
  return (
    <footer className="mt-section border-t border-line px-5 pb-10 pt-14 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-page">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="font-display text-title font-semibold stretch-condensed text-bone">
              Still building.
              <br />
              Still learning.
              <br />
              Still curious.
            </p>
            <p className="mt-6 max-w-[44ch] text-dim">
              AI/ML engineering with research depth, product thinking, and a focus on systems
              that hold up beyond the demo.
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <h2 className="font-display text-small font-semibold text-bone">Navigate</h2>
            <ul className="mt-4 space-y-1">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-block py-1.5 text-dim transition-colors hover:text-signal"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="font-display text-small font-semibold text-bone">Elsewhere</h2>
            <ul className="mt-4 space-y-1">
              {elsewhere.map((l) => (
                <li key={l.label}>
                  <TextLink
                    href={l.href}
                    external={l.href.startsWith('http')}
                    className="inline-block py-1.5 text-dim no-underline decoration-transparent"
                  >
                    {l.label}
                  </TextLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 text-small text-dim sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. {siteConfig.location}.
          </p>
          <a
            href="#top"
            className="inline-flex min-h-[44px] items-center gap-2 transition-colors hover:text-signal"
          >
            Back to top <ArrowUp size={16} aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  )
}

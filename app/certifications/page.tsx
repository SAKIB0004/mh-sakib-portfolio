import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import CertificateCard from '@/components/ui/CertificateCard'
import { certifications } from '@/data'
import { buttonClasses } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'All certifications',
  description: `All ${certifications.length} verified certifications covering RAG, agentic AI, vector databases, and machine learning.`,
  alternates: { canonical: '/certifications' },
}

export default function CertificationsPage() {
  return (
    <main id="main" className="px-5 pb-8 pt-32 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-page">
        <Link
          href="/#certifications"
          className="inline-flex min-h-[44px] items-center gap-2 text-small text-dim transition-colors hover:text-signal"
        >
          <ArrowLeft size={16} aria-hidden /> Back to portfolio
        </Link>

        <header className="mt-6 max-w-3xl">
          <h1 className="font-display text-display font-bold stretch-condensed uppercase text-bone">
            Certifications
          </h1>
          <p className="mt-6 text-dim">
            Verified certifications and learning milestones that support my practical AI/ML,
            agentic systems, and production-oriented engineering skill set.{' '}
            <span className="tabular text-bone">{certifications.length}</span> credentials in total.
          </p>
        </header>

        <div className="mt-16 grid gap-x-8 gap-y-14 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <CertificateCard key={cert.id} cert={cert} />
          ))}
        </div>

        <div className="mt-20 flex flex-col items-start gap-5 border-t border-line pt-10">
          <h2 className="font-display text-title font-semibold stretch-condensed text-bone">
            Want to build something together?
          </h2>
          <Link href="/#contact" className={buttonClasses('primary')}>
            Get in touch
          </Link>
        </div>
      </div>
    </main>
  )
}

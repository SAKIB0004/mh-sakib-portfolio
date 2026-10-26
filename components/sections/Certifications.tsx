import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Section from '@/components/ui/Section'
import CertificateCard from '@/components/ui/CertificateCard'
import { certifications, featuredCertificationIds } from '@/data'
import type { Certification } from '@/types'

export default function Certifications() {
  // Featured certifications, in the priority order defined in data
  const featured = featuredCertificationIds
    .map((id) => certifications.find((c) => c.id === id))
    .filter((c): c is Certification => Boolean(c))
  const hasMore = certifications.length > featured.length

  return (
    <Section
      id="certifications"
      title="Certifications"
      intro="Verified certifications and learning milestones that support my practical AI/ML, agentic systems, and production-oriented engineering skill set."
    >
      <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
        {featured.map((cert) => (
          <CertificateCard key={cert.id} cert={cert} />
        ))}
      </div>

      {hasMore && (
        <Link
          href="/certifications"
          className="group mt-14 inline-flex min-h-[48px] items-center gap-3 font-display text-heading font-semibold stretch-condensed text-bone transition-colors hover:text-signal"
        >
          View all {certifications.length} certifications
          <ArrowRight
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1.5"
          />
        </Link>
      )}
    </Section>
  )
}

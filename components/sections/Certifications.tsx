'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  BadgeCheck,
  ExternalLink,
  ArrowRight,
} from 'lucide-react'
import Section from '@/components/ui/Section'
import { certifications, featuredCertificationIds } from '@/data'
import type { Certification } from '@/types'

const certificationItems = certifications as Certification[]

function formatIssueDate(issueDate: string) {
  const date = new Date(issueDate)
  if (Number.isNaN(date.getTime())) return issueDate

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

function CertificateCard({
  cert,
  index,
  inView,
}: {
  cert: Certification
  index: number
  inView: boolean
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.04 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[22px] bg-[linear-gradient(180deg,rgba(8,14,24,0.94)_0%,rgba(6,10,18,0.96)_100%)] p-4 shadow-[0_14px_38px_rgba(0,0,0,0.2)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.08),transparent_24%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative overflow-hidden rounded-[18px] bg-white/[0.03] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
        <div className="relative aspect-[4/3]">
          <Image
            src={cert.image}
            alt={cert.title}
            fill
            className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#07101d] via-[#07101d]/55 to-transparent" />
      </div>

      <div className="relative flex flex-1 flex-col pt-4">
        <div className="mb-3 flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-emerald-300 shadow-[inset_0_0_0_1px_rgba(52,211,153,0.16)]">
            <BadgeCheck size={12} />
            Certified
          </span>

          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-muted">
            {formatIssueDate(cert.issueDate)}
          </span>
        </div>

        <h3 className="font-display text-[1.05rem] font-semibold leading-snug text-text-primary">
          {cert.title}
        </h3>

        {(cert.issuer || cert.organization) && (
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-text-muted">
            {cert.issuer || cert.organization}
          </p>
        )}

        <p className="mt-3 text-sm leading-7 text-text-secondary">
          {cert.description}
        </p>

        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {cert.skills.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] text-text-secondary shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]"
              >
                {skill}
              </span>
            ))}
            {cert.skills.length > 4 && (
              <span className="rounded-full bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] text-text-muted shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]">
                +{cert.skills.length - 4}
              </span>
            )}
          </div>
        </div>

        {(cert.verifyUrl || cert.credentialId) && (
          <div className="mt-auto pt-4">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-black/10 px-3.5 py-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
              {cert.credentialId ? (
                <span className="font-mono text-[11px] text-text-muted">
                  ID: {cert.credentialId}
                </span>
              ) : (
                <span />
              )}

              {cert.verifyUrl && (
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-text-secondary transition-colors hover:text-accent-cyan"
                >
                  <ExternalLink size={13} />
                  Verify
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.article>
  )
}

export default function Certifications() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  // Get featured certifications in the exact order specified
  const featuredCerts = featuredCertificationIds
    .map((id) => certificationItems.find((cert) => cert.id === id))
    .filter(Boolean) as Certification[]

  // Get all remaining certifications (those not in featured list)
  const remainingCerts = certificationItems.filter(
    (cert) => !featuredCertificationIds.includes(cert.id)
  )

  const totalCerts = certificationItems.length
  const showViewMore = remainingCerts.length > 0

  return (
    <Section
      id="certifications"
      label="#8 — Learning & Credentials"
      title="Certifications"
      subtitle="Verified certifications and learning milestones that support my practical AI/ML, agentic systems, and production-oriented engineering skill set."
    >
      <div ref={ref}>
        {/* Featured Certifications - 6 items in 2 rows of 3 */}
        <div className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCerts.map((cert, i) => (
            <CertificateCard
              key={cert.id}
              cert={cert}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        {/* View More Button - if there are remaining certifications */}
        {showViewMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="mt-10 flex justify-center"
          >
            <Link
              href="/certifications"
              className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-accent-cyan/[0.12] to-accent-cyan/[0.06] px-6 py-3.5 font-mono text-sm font-semibold text-accent-cyan transition-all duration-200 hover:from-accent-cyan/[0.18] hover:to-accent-cyan/[0.10] shadow-[inset_0_0_0_1px_rgba(34,211,238,0.2)]"
            >
              View All {totalCerts} Certifications
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowRight size={16} />
              </motion.span>
            </Link>
          </motion.div>
        )}
      </div>
    </Section>
  )
}
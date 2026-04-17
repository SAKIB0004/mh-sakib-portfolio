'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
  BadgeCheck,
  ExternalLink,
  ArrowLeft,
} from 'lucide-react'
import { useRef } from 'react'
import { certifications } from '@/data'
import type { Certification } from '@/types'

function formatIssueDate(issueDate: string) {
  const date = new Date(issueDate)
  if (Number.isNaN(date.getTime())) return issueDate

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

function CertificationCard({
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

export default function CertificationsPage() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  const certificationItems = certifications as Certification[]

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#05070d_0%,#0a0f1a_25%,#050708_75%,#0a0f1a_100%)]">
      {/* Background gradients */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-accent-cyan/[0.08] via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 h-80 w-96 bg-gradient-to-tr from-purple-500/[0.08] via-transparent to-transparent" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="border-b border-white/[0.05] bg-white/[0.02] backdrop-blur-sm sticky top-0 z-20"
        >
          <div className="px-6 py-4 sm:px-8">
            <Link
              href="/#certifications"
              className="inline-flex items-center gap-2 rounded-lg bg-white/[0.04] px-4 py-2 font-mono text-sm text-text-secondary transition-colors hover:bg-white/[0.08] hover:text-accent-cyan"
            >
              <ArrowLeft size={16} />
              Back
            </Link>
          </div>
        </motion.header>

        {/* Content */}
        <div className="px-6 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-6xl">
            {/* Page Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="mb-16 text-center"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent-cyan">
                Complete Gallery
              </p>
              <h1 className="mt-4 font-display text-4xl font-bold text-text-primary sm:text-[3rem]">
                All Certifications
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-[15px] leading-8 text-text-secondary">
                A comprehensive collection of verified certifications, learning milestones, and professional credentials spanning AI engineering, generative AI, machine learning, and agentic systems.
              </p>
              <p className="mt-3 font-mono text-sm text-text-muted">
                Total: {certificationItems.length} credentials
              </p>
            </motion.div>

            {/* Certifications Grid */}
            <div ref={ref}>
              <div className="grid items-start gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {certificationItems.map((cert, i) => (
                  <CertificationCard
                    key={cert.id}
                    cert={cert}
                    index={i}
                    inView={inView}
                  />
                ))}
              </div>
            </div>

            {/* Footer Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="mt-20 rounded-2xl border border-white/[0.05] bg-white/[0.02] p-8 text-center backdrop-blur-sm"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-text-muted">
                Learning Journey
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold text-text-primary">
                Continuous Growth
              </h2>
              <p className="mt-3 text-[15px] leading-8 text-text-secondary">
                These certifications represent my commitment to mastering cutting-edge AI, machine learning, and agentic systems technologies. I'm continuously learning and building practical expertise in production-grade AI engineering.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/"
                  className="rounded-xl bg-accent-cyan/[0.10] px-5 py-2.5 font-mono text-sm font-semibold text-accent-cyan transition-all hover:bg-accent-cyan/[0.16] shadow-[inset_0_0_0_1px_rgba(34,211,238,0.18)]"
                >
                  Back to Home
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}

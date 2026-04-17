'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ChevronDown, ChevronUp, FileText, ExternalLink } from 'lucide-react'
import Section from '@/components/ui/Section'
import { publications } from '@/data'

const statusColors: Record<string, string> = {
  'Accepted': 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  'In Preparation': 'text-amber-400 bg-amber-400/10 border-amber-400/20',
}

function PubCard({ pub, index, inView }: { pub: typeof publications[0]; index: number; inView: boolean }) {
  const [expanded, setExpanded] = useState(index === 0)
  const statusKey = pub.status.split('—')[0].trim()

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className="rounded-2xl border-glow bg-bg-card overflow-hidden group hover:border-accent-cyan/20 transition-all duration-300"
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent-teal/10 flex items-center justify-center mt-0.5">
            <FileText size={18} className="text-accent-teal" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Status + venue */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`px-2.5 py-1 rounded-full border font-mono text-xs ${statusColors[statusKey] || 'text-blue-400 bg-blue-400/10 border-blue-400/20'}`}>
                {pub.status}
              </span>
              {pub.venue && (
                <span className="font-mono text-xs text-text-muted truncate">{pub.venue}</span>
              )}
            </div>

            {/* Title */}
            <h3 className="font-display font-semibold text-text-primary text-lg leading-snug mb-3">
              {pub.title}
            </h3>

            {/* Authors */}
            <p className="font-mono text-xs text-text-muted mb-4">
              {pub.authors.join(' · ')}
            </p>

            {/* Expandable abstract */}
            {expanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4"
              >
                <span className="font-mono text-xs text-accent-teal uppercase tracking-wider">Abstract</span>
                <p className="font-body text-sm text-text-secondary leading-relaxed mt-2">
                  {pub.abstract}
                </p>
              </motion.div>
            )}

            {/* Tech */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {pub.tech.map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-md bg-bg-elevated border border-border-subtle font-mono text-xs text-text-muted">
                  {t}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {pub.doi && (
                <a href={pub.doi} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 font-mono text-xs text-accent-teal hover:text-accent-cyan transition-colors">
                  <ExternalLink size={12} /> DOI
                </a>
              )}
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-1 font-mono text-xs text-text-muted hover:text-accent-cyan transition-colors ml-auto"
              >
                {expanded ? <><ChevronUp size={13} /> Hide Abstract</> : <><ChevronDown size={13} /> Read Abstract</>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Research() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <Section
      id="research"
      label="#4 — Research"
      title="Publications & Ongoing Research"
      subtitle="Papers and ongoing work that turn technical questions into structured investigation and measurable contribution."
    >
      <div ref={ref} className="space-y-5">
        {publications.map((pub, i) => (
          <PubCard key={pub.id} pub={pub} index={i} inView={inView} />
        ))}
      </div>
    </Section>
  )
}

'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Trophy, BookOpen, Award, Code2, ExternalLink } from 'lucide-react'
import Section from '@/components/ui/Section'
import { achievements } from '@/data'
import type { Achievement } from '@/types'

const achievementItems = achievements as Achievement[]

const typeConfig: Record<
  Achievement['type'],
  { icon: typeof Trophy; color: string; bg: string; border: string }
> = {
  scholarship: {
    icon: BookOpen,
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
    border: 'border-amber-400/20',
  },
  award: {
    icon: Trophy,
    color: 'text-violet-400',
    bg: 'bg-violet-400/10',
    border: 'border-violet-400/20',
  },
  competition: {
    icon: Code2,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/20',
  },
  academic: {
    icon: Award,
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
    border: 'border-cyan-400/20',
  },
}

const typeLabels: Record<Achievement['type'], string> = {
  scholarship: 'Scholarship',
  award: 'Award',
  competition: 'Competition',
  academic: 'Academic',
}

export default function Achievements() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <Section
      id="achievements"
      label="#7 — Achievements"
      title="Milestones That Matter"
      subtitle="A record of competitive, academic, and research recognition earned through consistency and performance."
    >
      <div ref={ref} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {achievementItems.map((ach, i) => {
          const config = typeConfig[ach.type] ?? typeConfig.academic
          const Icon = config.icon

          return (
            <motion.article
              key={ach.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border-glow bg-bg-card p-5 transition-all duration-300 hover:border-accent-cyan/25"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.08),transparent_30%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative">
                <div className="mb-3 font-mono text-xs text-text-muted">{ach.year}</div>

                <div className="mb-4 flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border ${config.bg} ${config.border}`}
                  >
                    <Icon size={18} className={config.color} />
                  </div>

                  <span
                    className={`rounded-full border px-2.5 py-1 font-mono text-xs ${config.bg} ${config.color} ${config.border}`}
                  >
                    {typeLabels[ach.type] ?? 'Academic'}
                  </span>
                </div>

                <h3 className="mb-2 font-display font-bold leading-snug text-text-primary">
                  {ach.title}
                </h3>

                {ach.organization && (
                  <p className="mb-3 font-mono text-xs text-text-muted">{ach.organization}</p>
                )}

                <p className="flex-1 font-body text-sm leading-relaxed text-text-secondary">
                  {ach.description}
                </p>

                {ach.link && (
                  <a
                    href={ach.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-text-muted transition-colors hover:text-accent-cyan"
                  >
                    <ExternalLink size={11} />
                    View Profile
                  </a>
                )}
              </div>
            </motion.article>
          )
        })}
      </div>
    </Section>
  )
}
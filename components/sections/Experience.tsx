'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, MapPin, Calendar } from 'lucide-react'
import Section from '@/components/ui/Section'
import { experience } from '@/data'

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <Section
      id="experience"
      label="#5 — Work History"
      title="Experience"
      subtitle="Roles and responsibilities that shaped how I teach, collaborate, and build with technical clarity."
    >
      <div ref={ref} className="relative">
        {/* Timeline line */}
        <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-accent-cyan/40 via-accent-blue/20 to-transparent hidden sm:block" />

        <div className="space-y-6">
          {experience.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="sm:pl-16 relative"
            >
              {/* Timeline dot */}
              <div className="absolute left-3.5 top-6 w-3 h-3 rounded-full bg-accent-cyan border-2 border-bg-primary shadow-glow-sm hidden sm:block" />

              <div className="rounded-2xl border-glow bg-bg-card p-6 group hover:border-accent-cyan/25 transition-all duration-300">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-display font-bold text-xl text-text-primary mb-1">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-accent-cyan">
                      <Briefcase size={14} />
                      <span className="font-mono text-sm font-medium">{exp.organization}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-start sm:items-end gap-1.5 shrink-0">
                    <span className="flex items-center gap-1.5 font-mono text-xs text-text-muted">
                      <Calendar size={12} />
                      {exp.duration}
                    </span>
                    <span className="flex items-center gap-1.5 font-mono text-xs text-text-muted">
                      <MapPin size={12} />
                      {exp.location}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full border border-border-subtle font-mono text-xs text-text-muted">
                      {exp.type}
                    </span>
                  </div>
                </div>

                {/* Responsibilities */}
                <ul className="space-y-2.5">
                  {exp.responsibilities.map((r, ri) => (
                    <li key={ri} className="flex items-start gap-3">
                      <span className="text-accent-cyan mt-1 text-xs shrink-0">▸</span>
                      <span className="font-body text-sm text-text-secondary leading-relaxed">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* "More coming" note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="sm:pl-16 mt-6"
        >
          <div className="rounded-xl border border-dashed border-border-subtle p-5 text-center">
            <p className="font-mono text-xs text-text-muted">
              Actively seeking AI/ML Engineer, Data Scientist, or Research roles — open to internships and full-time positions.
            </p>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}

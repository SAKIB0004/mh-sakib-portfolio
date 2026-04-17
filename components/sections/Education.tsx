'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Section from '@/components/ui/Section'
import { education } from '@/data'

type EducationEntry = {
  id: string | number
  degree: string
  major?: string
  institution: string
  duration: string
  location?: string
  gpa?: string
  tags?: string[]
  meta?: string[]
  mode?: string
  stream?: string
  board?: string
  status?: string
}

const educationEntries = education as EducationEntry[]

const academicFocusChips = [
  'Artificial Intelligence',
  'Machine Learning',
  'Deep Learning',
  'Data Science',
  'Python',
  'Research',
  'Innovation',
] as const

function uniqueStrings(items: Array<string | undefined> = []) {
  const seen = new Set<string>()

  return items
    .filter((item): item is string => Boolean(item?.trim()))
    .filter((item) => {
      const key = item.trim().toLowerCase()
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
}

function isGpaLike(value: string, gpa?: string) {
  const normalized = value.toLowerCase().replace(/\s+/g, '')
  const normalizedGpa = gpa?.toLowerCase().replace(/\s+/g, '')

  return normalized.includes('gpa') || (normalizedGpa ? normalized === normalizedGpa : false)
}

function extractMajorFromDegree(degree: string) {
  const match = degree.match(/\(\s*major\s*:\s*([^)]+)\)/i)

  if (!match) {
    return {
      title: degree.trim(),
      major: '',
    }
  }

  return {
    title: degree.replace(/\s*\(\s*major\s*:\s*([^)]+)\)/i, '').trim(),
    major: match[1].trim(),
  }
}

function isSecondaryLevel(value: string) {
  return /\b(hsc|ssc|higher secondary|secondary school)\b/i.test(value)
}

const educationSummaries: Record<string, string[]> = {
  'ewu-cse': [
    'Specialized in Machine Learning, NLP, Computer Vision, and AI system design.',
    'Merit Scholarship recipient (Spring 2025) and Undergraduate Teaching Assistant (Spring 2025), with relevant coursework in Deep Learning, Natural Language Processing, Computer Vision, Data Mining, and Software Engineering.',
  ],
  'nmc-hsc': [
    'Completed higher secondary studies in the Science stream with strong academic performance.',
  ],
  'bhuim-ssc': [
    'Developed early analytical skills through core science subjects.',
  ],
}

function getSummaryLines(id: string | number) {
  return educationSummaries[String(id)] ?? [
    'Structured academic progress with consistent performance and strong foundational learning.',
  ]
}

export default function Education() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <Section
      id="education"
      label="#6 — Academic Background"
      title="Where I Built My Foundation"
      subtitle="Educational milestones that laid the groundwork for my technical expertise, research capabilities, and passion for AI."
    >
      <div ref={ref} className="mt-3">
        <div className="space-y-6 sm:space-y-7">
          {educationEntries.map((edu, i) => {
            const parsed = extractMajorFromDegree(edu.degree)
            const title = parsed.title
            const major = edu.major?.trim() || parsed.major
            const isFeatured = i === 0
            const isSchoolLevel = isSecondaryLevel(edu.degree)

            const summaryLines = getSummaryLines(edu.id)

            const metaItems = uniqueStrings([
              edu.mode,
              edu.stream,
              edu.board,
              edu.status,
              ...(edu.meta ?? []),
            ]).filter((item) => item !== edu.location)

            const providedTags = uniqueStrings(edu.tags ?? []).filter(
              (tag) => !isGpaLike(tag, edu.gpa)
            )

            const fallbackTags = uniqueStrings([edu.stream, edu.status]).filter(
              (tag) => !isGpaLike(tag, edu.gpa)
            )

            const secondarySubjectTags = isSchoolLevel
              ? ['Math', 'Physics', 'Chemistry']
              : []

            const focusTags = uniqueStrings([
              ...(providedTags.length > 0 ? providedTags : fallbackTags),
              ...(isFeatured ? [...academicFocusChips] : []),
              ...secondarySubjectTags,
            ])

            return (
              <motion.article
                key={edu.id}
                initial={{ opacity: 0, y: 22 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                whileHover={{ y: -2 }}
                className={`relative overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,rgba(255,255,255,0.035)_0%,rgba(255,255,255,0.02)_100%)] shadow-[0_18px_50px_rgba(0,0,0,0.24)] transition-all duration-300 ${
                  isFeatured
                    ? 'hover:shadow-[0_24px_60px_rgba(0,0,0,0.28)]'
                    : 'hover:shadow-[0_22px_56px_rgba(0,0,0,0.26)]'
                }`}
              >
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.10),transparent_32%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.06),transparent_24%)]" />
                </div>

                <div className="relative grid items-stretch gap-4 p-4 sm:p-5 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-5">
                  <div className="flex min-h-full flex-col items-center justify-center rounded-2xl bg-black/20 p-5 text-center backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-2.5">
                      <span className="rounded-full bg-accent-cyan/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-accent-cyan">
                        {edu.duration}
                      </span>

                      {edu.location && (
                        <span className="rounded-full bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-text-secondary/75">
                          {edu.location}
                        </span>
                      )}

                      <div className="pt-3">
                        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-secondary/50">
                          Institution
                        </p>
                        <h3 className="mt-2 text-base font-semibold leading-snug text-text-primary sm:text-[1.02rem]">
                          {edu.institution}
                        </h3>
                      </div>

                      {metaItems.length > 0 && (
                        <div className="mt-4 flex flex-wrap justify-center gap-2">
                          {metaItems.map((item) => (
                            <span
                              key={item}
                              className="rounded-full bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-text-secondary/75"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/[0.025] p-5 backdrop-blur-sm sm:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="max-w-3xl">
                        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-secondary/50">
                          Qualification
                        </p>

                        <h4 className="mt-2 text-xl font-semibold leading-snug text-text-primary sm:text-[1.42rem]">
                          {title}
                        </h4>

                        {(major || edu.stream) && (
                          <p className="mt-2 text-sm text-accent-cyan sm:text-[0.95rem]">
                            {major ? `Major: ${major}` : edu.stream}
                          </p>
                        )}
                      </div>

                      {edu.gpa && (
                        <div className="w-fit rounded-2xl bg-accent-cyan/10 px-4 py-3">
                          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-cyan/70">
                            {isSchoolLevel ? 'GPA' : 'CGPA'}
                          </p>
                          <p className="mt-1 text-base font-semibold text-accent-cyan sm:text-[1.02rem]">
                            {edu.gpa}
                          </p>
                        </div>
                      )}
                    </div>

                    {summaryLines.length > 0 && (
                      <div className="mt-6">
                        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-secondary/50">
                          Academic Summary
                        </p>

                        <div className="mt-3 space-y-2.5">
                          {summaryLines.map((line, index) => (
                            <motion.p
                              key={index}
                              initial={{ opacity: 0, y: 8 }}
                              animate={inView ? { opacity: 1, y: 0 } : {}}
                              transition={{
                                duration: 0.35,
                                delay: i * 0.08 + index * 0.05 + 0.12,
                              }}
                              className="text-sm leading-7 text-text-secondary sm:text-[0.96rem]"
                            >
                              {line}
                            </motion.p>
                          ))}
                        </div>
                      </div>
                    )}

                    {focusTags.length > 0 && (
                      <div className="mt-6">
                        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-secondary/50">
                          {isFeatured
                            ? 'Specialization & Research Interest'
                            : 'Focus Areas'}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2.5">
                          {focusTags.map((tag, tagIndex) => (
                            <motion.span
                              key={tag}
                              initial={{ opacity: 0, scale: 0.96 }}
                              animate={inView ? { opacity: 1, scale: 1 } : {}}
                              transition={{
                                duration: 0.28,
                                delay: i * 0.08 + tagIndex * 0.03 + 0.16,
                              }}
                              whileHover={{ y: -1 }}
                              className="rounded-full bg-[linear-gradient(180deg,rgba(34,211,238,0.09)_0%,rgba(34,211,238,0.05)_100%)] px-3.5 py-1.5 font-mono text-[12px] text-cyan-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-300 hover:bg-[linear-gradient(180deg,rgba(34,211,238,0.12)_0%,rgba(34,211,238,0.08)_100%)] hover:shadow-[0_0_24px_rgba(34,211,238,0.08)]"
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
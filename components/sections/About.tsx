'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code2, Brain, Zap, BookOpen } from 'lucide-react'
import Section from '@/components/ui/Section'

const traits = [
  {
    icon: Brain,
    label: 'AI/ML Research',
    desc: 'Working on medical AI, multilingual NLP, and explainable deep learning for practical, research-driven systems.',
    iconClass:
      'bg-accent-cyan/12 text-accent-cyan ring-1 ring-accent-cyan/20 group-hover:bg-accent-cyan/18',
  },
  {
    icon: Code2,
    label: 'Systems Builder',
    desc: 'Designing end-to-end ML applications, from experimentation and APIs to deployment-ready products.',
    iconClass:
      'bg-sky-400/10 text-sky-300 ring-1 ring-sky-400/20 group-hover:bg-sky-400/16',
  },
  {
    icon: Zap,
    label: 'Problem Solver',
    desc: 'Built strong analytical thinking through 700+ problem-solving challenges across competitive platforms.',
    iconClass:
      'bg-violet-400/10 text-violet-300 ring-1 ring-violet-400/20 group-hover:bg-violet-400/16',
  },
  {
    icon: BookOpen,
    label: 'Teaching Assistant',
    desc: 'Supported programming labs and helped students build stronger foundations in problem solving and coding.',
    iconClass:
      'bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/20 group-hover:bg-emerald-400/16',
  },
]

const tags = [
  'Computer Vision',
  'NLP',
  'RAG Systems',
  'ML Pipelines',
  'Docker',
  'CI/CD',
  'AWS Deployment',
  'Explainable AI',
]

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <Section
      id="about"
      label="#0 — Who I Am"
      title="Engineering Profile"
      subtitle="My work spans research-driven AI, end-to-end ML pipelines, and systems designed to move beyond prototypes."
    >
      <div ref={ref} className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <div className="space-y-4">
            <p className="font-body text-[1.05rem] leading-8 text-text-secondary md:text-lg">
              I&apos;m{' '}
              <span className="font-semibold text-text-primary">Mahmudul Haque Sakib</span>, a
              Data Science-focused CSE graduate who builds AI systems that are technically solid,
              practical to use, and designed with real-world constraints in mind.
            </p>

            <p className="font-body text-[1rem] leading-7 text-text-secondary/90 md:text-[1.02rem]">
              My work spans{' '}
              <span className="font-medium text-text-primary">Computer Vision</span>,{' '}
              <span className="font-medium text-text-primary">Natural Language Processing</span>,
              and <span className="font-medium text-text-primary">RAG-based systems</span>. I have
              worked on projects involving medical image analysis, medicinal plant classification,
              sentiment analysis, and document-aware question answering.
            </p>

            <p className="font-body text-[1rem] leading-7 text-text-secondary/90 md:text-[1.02rem]">
              I enjoy building complete ML pipelines, from data preparation and model training to
              evaluation, Docker-based packaging, CI/CD workflows, and AWS deployment. I care about
              reliability, explainability, and systems that are ready to move beyond prototypes.
            </p>
          </div>

          {/* Refined tags */}
          <div className="mt-6 flex flex-wrap gap-2.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-[11px] tracking-wide text-text-secondary backdrop-blur-sm transition-all duration-300 hover:border-accent-cyan/30 hover:bg-accent-cyan/[0.06] hover:text-text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right cards */}
        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Subtle premium detail */}
          <div className="pointer-events-none absolute inset-x-8 top-10 -z-10 h-40 rounded-full bg-accent-cyan/10 blur-3xl" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {traits.map(({ icon: Icon, label, desc, iconClass }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 22 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.025)_100%)] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-cyan/25 hover:shadow-[0_18px_45px_rgba(0,0,0,0.26)]"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.08),transparent_45%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div
                  className={`relative mb-4 flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 ${iconClass}`}
                >
                  <Icon size={20} strokeWidth={2.1} />
                </div>

                <h3 className="relative mb-2 font-display text-[1rem] font-semibold text-text-primary">
                  {label}
                </h3>
                <p className="relative font-body text-sm leading-6 text-text-secondary/90">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
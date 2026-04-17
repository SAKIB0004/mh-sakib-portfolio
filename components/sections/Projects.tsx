'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Github,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
} from 'lucide-react'
import Section from '@/components/ui/Section'
import { projects } from '@/data'

type ProjectItem = (typeof projects)[number]

const categoryStyles: Record<string, string> = {
  cv: 'bg-violet-400/10 text-violet-300 shadow-[inset_0_0_0_1px_rgba(167,139,250,0.18)]',
  nlp: 'bg-cyan-400/10 text-cyan-300 shadow-[inset_0_0_0_1px_rgba(34,211,238,0.18)]',
  ml: 'bg-emerald-400/10 text-emerald-300 shadow-[inset_0_0_0_1px_rgba(52,211,153,0.18)]',
  research:
    'bg-amber-400/10 text-amber-300 shadow-[inset_0_0_0_1px_rgba(251,191,36,0.18)]',
  fullstack:
    'bg-rose-400/10 text-rose-300 shadow-[inset_0_0_0_1px_rgba(251,113,133,0.18)]',
}

const categoryLabels: Record<string, string> = {
  cv: 'Computer Vision',
  nlp: 'NLP / LLMs',
  ml: 'Machine Learning',
  research: 'Research',
  fullstack: 'Full Stack',
}

function CategoryBadge({ category }: { category: string }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] ${categoryStyles[category]}`}
    >
      {categoryLabels[category]}
    </span>
  )
}

function ProjectIndex({ value }: { value: string }) {
  return (
    <span className="inline-flex min-w-[28px] shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted/75">
      {value}
    </span>
  )
}

function TechRow({
  tech,
  limit,
  compact = false,
}: {
  tech: string[]
  limit?: number
  compact?: boolean
}) {
  const visibleTech = typeof limit === 'number' ? tech.slice(0, limit) : tech
  const remaining = typeof limit === 'number' ? tech.length - visibleTech.length : 0

  return (
    <div>
      <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent-cyan">
        Tech Stack
      </p>

      <div className="flex flex-wrap gap-2">
        {visibleTech.map((item) => (
          <span
            key={item}
            className={`rounded-full bg-accent-cyan/[0.10] font-mono text-text-primary shadow-[inset_0_0_0_1px_rgba(34,211,238,0.18)] ${
              compact ? 'px-3 py-1.5 text-[11px]' : 'px-3.5 py-1.5 text-[11px]'
            }`}
          >
            {item}
          </span>
        ))}

        {remaining > 0 && (
          <span
            className={`rounded-full bg-white/[0.04] font-mono text-text-muted shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)] ${
              compact ? 'px-3 py-1.5 text-[11px]' : 'px-3.5 py-1.5 text-[11px]'
            }`}
          >
            +{remaining}
          </span>
        )}
      </div>
    </div>
  )
}

function ProjectLinks({
  project,
  compact = false,
}: {
  project: ProjectItem
  compact?: boolean
}) {
  const baseClass = compact
    ? 'inline-flex items-center gap-2 rounded-xl bg-white/[0.04] px-3.5 py-2 font-mono text-[11px] text-text-secondary transition-all duration-200 hover:text-accent-cyan shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]'
    : 'inline-flex items-center gap-2 rounded-xl bg-white/[0.04] px-4 py-2.5 font-mono text-xs text-text-secondary transition-all duration-200 hover:text-accent-cyan shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]'

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClass}
      >
        <Github size={14} />
        GitHub
      </a>

      {(project.demo || project.hfSpace) && (
        <a
          href={project.demo || project.hfSpace}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseClass} bg-accent-cyan/[0.10] text-accent-cyan shadow-[inset_0_0_0_1px_rgba(34,211,238,0.18)] hover:bg-accent-cyan/[0.14]`}
        >
          <ExternalLink size={14} />
          Live Demo
        </a>
      )}
    </div>
  )
}

function FeatureList({
  items,
  compact = false,
}: {
  items: string[]
  compact?: boolean
}) {
  return (
    <ul className={compact ? 'space-y-2.5' : 'space-y-3'}>
      {items.map((item) => (
        <li
          key={item}
          className={`flex items-start gap-3 rounded-2xl bg-white/[0.03] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] ${
            compact ? 'px-3 py-2.5' : 'px-3.5 py-3'
          }`}
        >
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-cyan" />
          <span
            className={`text-text-secondary ${
              compact ? 'text-sm leading-6' : 'text-sm leading-7'
            }`}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  )
}

function ExpandableDetails({
  project,
  compact = false,
}: {
  project: ProjectItem
  compact?: boolean
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="mt-3">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-black/10 px-3.5 py-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
        <ProjectLinks project={project} compact={compact} />

        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-text-muted transition-colors hover:text-accent-cyan"
        >
          {expanded ? (
            <>
              <ChevronUp size={14} />
              Less Details
            </>
          ) : (
            <>
              <ChevronDown size={14} />
              View Details
            </>
          )}
        </button>
      </div>

      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-3 overflow-hidden"
        >
          <div
            className={`space-y-4 rounded-[22px] bg-black/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] ${
              compact ? 'p-3.5' : 'p-4'
            }`}
          >
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent-cyan">
                Problem
              </p>
              <p className="mt-1.5 text-sm leading-7 text-text-secondary">
                {project.problem}
              </p>
            </div>

            <div>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent-cyan">
                Highlights
              </p>
              <FeatureList
                items={project.features.slice(0, compact ? 3 : 4)}
                compact={compact}
              />
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent-cyan">
                Contribution
              </p>
              <p className="mt-1.5 text-sm leading-7 text-text-secondary">
                {project.contribution}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

function FlagshipProjectCard({
  project,
  inView,
}: {
  project: ProjectItem
  inView: boolean
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-[30px] bg-[linear-gradient(180deg,rgba(8,15,30,0.98)_0%,rgba(4,9,20,0.98)_100%)] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.34)] sm:p-6"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.10),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.07),transparent_28%)]" />

      <div className="relative grid gap-4 xl:grid-cols-[1.12fr_0.88fr]">
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-text-muted">
              01 / Flagship Project
            </span>
            <CategoryBadge category={project.category} />
            {project.status && (
              <span className="rounded-full bg-emerald-400/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-emerald-300 shadow-[inset_0_0_0_1px_rgba(52,211,153,0.16)]">
                {project.status}
              </span>
            )}
          </div>

          <h3 className="max-w-3xl font-display text-3xl font-bold leading-tight text-text-primary sm:text-[2.35rem]">
            {project.title}
          </h3>

          <p className="mt-3.5 max-w-3xl text-[15px] leading-8 text-text-secondary">
            {project.description}
          </p>

          <div className="mt-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-cyan">
              Why it matters
            </p>
            <p className="mt-1.5 max-w-3xl text-sm leading-7 text-text-secondary">
              {project.problem}
            </p>
          </div>

          <div className="mt-5">
            <TechRow tech={project.tech} />
          </div>

          <div className="mt-5">
            <ProjectLinks project={project} />
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-[24px] bg-white/[0.025] p-3.5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
          <div className="rounded-[20px] bg-[linear-gradient(180deg,rgba(8,18,34,0.9)_0%,rgba(10,22,38,0.76)_100%)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
            <p className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-text-muted">
              Project Highlights
            </p>
            <FeatureList items={project.features.slice(0, 4)} />
          </div>

          <div className="rounded-[20px] bg-[linear-gradient(180deg,rgba(8,14,28,0.9)_0%,rgba(6,10,20,0.86)_100%)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-cyan">
              My Contribution
            </p>
            <p className="mt-1.5 text-[15px] leading-8 text-text-secondary">
              {project.contribution}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function HighlightProjectCard({
  project,
  index,
  inView,
}: {
  project: ProjectItem
  index: number
  inView: boolean
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[24px] bg-[linear-gradient(180deg,rgba(9,16,30,0.96)_0%,rgba(7,12,22,0.96)_100%)] p-4.5 shadow-[0_16px_44px_rgba(0,0,0,0.22)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.08),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.06),transparent_32%)]" />

      <div className="relative flex h-full flex-col">
        <div className="mb-3 flex flex-wrap items-center gap-2.5">
          <ProjectIndex value={`0${index + 2}`} />
          <CategoryBadge category={project.category} />
          {project.status && (
            <span className="rounded-full bg-white/[0.05] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
              {project.status}
            </span>
          )}
        </div>

        <h3 className="font-display text-[1.45rem] font-bold leading-snug text-text-primary">
          {project.title}
        </h3>

        <p className="mt-2.5 text-sm leading-7 text-text-secondary">
          {project.description}
        </p>

        <div className="mt-4">
          <TechRow tech={project.tech} compact />
        </div>

        <div className="mt-auto pt-4">
          <ExpandableDetails project={project} />
        </div>
      </div>
    </motion.article>
  )
}

function CompactFeaturedCard({
  project,
  index,
  inView,
}: {
  project: ProjectItem
  index: number
  inView: boolean
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[20px] bg-[linear-gradient(180deg,rgba(8,14,26,0.96)_0%,rgba(6,10,20,0.96)_100%)] p-4 shadow-[0_14px_38px_rgba(0,0,0,0.2)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.07),transparent_24%)]" />

      <div className="relative flex h-full flex-col">
        <div className="mb-3 flex flex-wrap items-center gap-2.5">
          <ProjectIndex value={`0${index + 4}`} />
          <CategoryBadge category={project.category} />
        </div>

        <h3 className="font-display text-[1.35rem] font-semibold leading-snug text-text-primary">
          {project.title}
        </h3>

        <p className="mt-2.5 text-sm leading-7 text-text-secondary">
          {project.description}
        </p>

        <div className="mt-4">
          <TechRow tech={project.tech} compact />
        </div>

        <div className="mt-auto pt-4">
          <ExpandableDetails project={project} compact />
        </div>
      </div>
    </motion.article>
  )
}

function OtherProjectCard({
  project,
  index,
  inView,
}: {
  project: ProjectItem
  index: number
  inView: boolean
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.42, delay: index * 0.06 }}
      className="group flex h-full flex-col rounded-[18px] bg-[linear-gradient(180deg,rgba(8,14,24,0.92)_0%,rgba(6,10,18,0.94)_100%)] p-4 shadow-[0_12px_30px_rgba(0,0,0,0.18)]"
    >
      <div className="mb-3 flex flex-wrap items-center gap-2.5">
        <ProjectIndex value={`${index + 7}`.padStart(2, '0')} />
        <CategoryBadge category={project.category} />
        {project.status && (
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">
            {project.status}
          </span>
        )}
      </div>

      <h3 className="font-display text-[1.02rem] font-semibold leading-snug text-text-primary">
        {project.title}
      </h3>

      <p className="mt-2.5 text-sm leading-7 text-text-secondary">
        {project.description}
      </p>

      <div className="mt-4">
        <TechRow tech={project.tech} compact />
      </div>

      <div className="mt-auto pt-4">
        <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-black/10 px-3.5 py-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs text-text-secondary transition-colors hover:text-accent-cyan"
          >
            <Github size={14} />
            GitHub
          </a>

          {(project.demo || project.hfSpace) && (
            <a
              href={project.demo || project.hfSpace}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs text-text-secondary transition-colors hover:text-accent-cyan"
            >
              <ArrowUpRight size={14} />
              Demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-5% 0px' })

  const featured = projects.filter((project) => project.featured)
  const others = projects.filter((project) => !project.featured)

  const flagship = featured[0]
  const highlightProjects = featured.slice(1, 3)
  const compactFeatured = featured.slice(3, 6)

  return (
    <Section
      id="projects"
      label="#3 — Projects"
      title="Built Systems"
      subtitle="Projects that reflect how I design, build, and deploy AI systems with practical use cases and technical depth."
    >
      <div ref={ref}>
        <div className="space-y-5">
          {flagship && <FlagshipProjectCard project={flagship} inView={inView} />}

          {highlightProjects.length > 0 && (
            <div className="grid items-start gap-5 lg:grid-cols-2">
              {highlightProjects.map((project, index) => (
                <HighlightProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  inView={inView}
                />
              ))}
            </div>
          )}

          {compactFeatured.length > 0 && (
            <div className="grid items-start gap-4 lg:grid-cols-3">
              {compactFeatured.map((project, index) => (
                <CompactFeaturedCard
                  key={project.id}
                  project={project}
                  index={index}
                  inView={inView}
                />
              ))}
            </div>
          )}
        </div>

        {others.length > 0 && (
          <div className="mt-10">
            <div className="mb-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-text-muted">
                More Projects
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-text-primary">
                Other Work
              </h3>
            </div>

            <div className="grid items-start gap-4 md:grid-cols-2 xl:grid-cols-3">
              {others.map((project, index) => (
                <OtherProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  inView={inView}
                />
              ))}
            </div>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <a
            href="https://github.com/SAKIB0004"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-white/[0.03] px-6 py-3 font-mono text-sm text-text-secondary transition-all duration-200 hover:text-accent-cyan shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]"
          >
            <Github size={16} />
            View more on GitHub
          </a>
        </motion.div>
      </div>
    </Section>
  )
}
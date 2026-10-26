import Link from 'next/link'
import { ArrowUpRight, Plus } from 'lucide-react'
import Section from '@/components/ui/Section'
import HeatField from '@/components/ui/HeatField'
import ProjectLinks from '@/components/projects/ProjectLinks'
import { categoryLabels } from '@/data'
import { additionalProjects, featuredProjects, splitTitle } from '@/lib/projects'
import type { Project } from '@/types'

function FeaturedRow({ project }: { project: Project }) {
  const { name, subtitle } = splitTitle(project.title)
  return (
    <article className="group relative grid gap-6 border-t border-line py-9 transition-colors duration-300 focus-within:bg-ink-raised/60 hover:bg-ink-raised/60 sm:-mx-4 sm:px-4 md:grid-cols-[minmax(0,1fr)_14rem] md:gap-10 lg:grid-cols-[minmax(0,1fr)_16rem]">
      <div className="min-w-0">
        <h3 className="font-display text-title font-semibold stretch-condensed text-bone">
          {/* Stretched link: the whole row opens the case study */}
          <Link
            href={`/projects/${project.id}`}
            className="after:absolute after:inset-0 after:content-[''] group-hover:heat-text group-focus-within:heat-text"
          >
            {name}
          </Link>
        </h3>
        {subtitle && <p className="mt-2 font-display text-lead text-dim">{subtitle}</p>}

        <p className="mt-5 max-w-[56ch] text-bone/90">{project.description}</p>
        <p className="mt-4 max-w-[56ch] text-small text-dim">
          <span className="text-bone">{categoryLabels[project.category]}.</span>{' '}
          {project.tech.join(', ')}
        </p>

        <div className="relative z-10 mt-4 flex flex-wrap items-center gap-x-6">
          <ProjectLinks project={project} />
          <span
            aria-hidden
            className="inline-flex items-center gap-1 text-small text-signal transition-transform duration-300 group-hover:translate-x-1"
          >
            Read the case study <ArrowUpRight size={16} />
          </span>
        </div>
      </div>

      <div className="relative order-first aspect-[16/6] overflow-hidden rounded-[4px] md:order-none md:aspect-[4/5]">
        <HeatField
          seed={project.id}
          className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.08]"
        />
      </div>
    </article>
  )
}

function CompactRow({ project }: { project: Project }) {
  const { name, subtitle } = splitTitle(project.title)
  return (
    <article className="group relative border-t border-line py-7">
      <h3 className="font-display text-heading font-semibold text-bone">
        <Link
          href={`/projects/${project.id}`}
          className="transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-signal"
        >
          {name}
        </Link>
      </h3>
      {subtitle && <p className="text-dim">{subtitle}</p>}
      <p className="mt-3 max-w-[60ch] text-dim">{project.description}</p>
      <p className="mt-3 text-small text-dim">{project.tech.join(', ')}</p>
      <div className="relative z-10 mt-2">
        <ProjectLinks project={project} />
      </div>
    </article>
  )
}

export default function Projects() {
  return (
    <Section
      id="projects"
      title="Selected work"
      intro="Agentic and retrieval systems, computer vision with explainability, and applied NLP — each built end to end."
      stickyTitle
    >
      <div>
        {featuredProjects.map((p) => (
          <FeaturedRow key={p.id} project={p} />
        ))}
      </div>

      {additionalProjects.length > 0 && (
        <details className="group mt-6 border-t border-line">
          <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-heading font-semibold stretch-condensed text-bone transition-colors hover:text-signal [&::-webkit-details-marker]:hidden">
            <span>
              Additional projects <span className="text-dim">({additionalProjects.length})</span>
            </span>
            <Plus
              aria-hidden
              className="shrink-0 transition-transform duration-300 group-open:rotate-45"
            />
          </summary>
          <div>
            {additionalProjects.map((p) => (
              <CompactRow key={p.id} project={p} />
            ))}
          </div>
        </details>
      )}
    </Section>
  )
}

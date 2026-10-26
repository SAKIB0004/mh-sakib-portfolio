import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { projects, categoryLabels } from '@/data'
import { getAdjacent, getProject, splitTitle } from '@/lib/projects'
import HeatField from '@/components/ui/HeatField'
import ProjectLinks from '@/components/projects/ProjectLinks'

type Params = { id: string }

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ id: p.id }))
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const project = getProject(params.id)
  if (!project) return {}
  return {
    title: splitTitle(project.title).name,
    description: project.description,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: { title: project.title, description: project.description, type: 'article' },
  }
}

export default function ProjectPage({ params }: { params: Params }) {
  const project = getProject(params.id)
  if (!project) notFound()
  const { name, subtitle } = splitTitle(project.title)
  const { prev, next } = getAdjacent(project.id)

  return (
    <main id="main" className="px-5 pb-8 pt-32 sm:px-8 lg:px-12">
      <article className="mx-auto max-w-page">
        <Link
          href="/#projects"
          className="inline-flex min-h-[44px] items-center gap-2 text-small text-dim transition-colors hover:text-signal"
        >
          <ArrowLeft size={16} aria-hidden /> All projects
        </Link>

        <header className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="text-small text-dim">{categoryLabels[project.category]}</p>
            <h1 className="mt-3 font-display text-display font-bold stretch-condensed uppercase text-bone">
              {name}
            </h1>
            {subtitle && <p className="mt-4 font-display text-lead text-dim">{subtitle}</p>}
          </div>
          <div className="relative aspect-[16/7] overflow-hidden rounded-[4px] lg:col-span-4 lg:aspect-[4/3]">
            <HeatField seed={project.id} className="h-full w-full" />
          </div>
        </header>

        <p className="mt-12 max-w-[48ch] font-body text-lead text-bone">{project.description}</p>
        <ProjectLinks project={project} className="mt-4" />

        <div className="mt-16 grid gap-x-12 gap-y-14 border-t border-line pt-12 lg:grid-cols-12">
          <section aria-labelledby="problem" className="lg:col-span-6">
            <h2 id="problem" className="font-display text-heading font-semibold stretch-condensed text-bone">
              The problem
            </h2>
            <p className="mt-4 max-w-[56ch] text-dim">{project.problem}</p>
          </section>

          <section aria-labelledby="contribution" className="lg:col-span-6">
            <h2 id="contribution" className="font-display text-heading font-semibold stretch-condensed text-bone">
              My contribution
            </h2>
            <p className="mt-4 max-w-[56ch] text-dim">{project.contribution}</p>
          </section>

          <section aria-labelledby="features" className="lg:col-span-6">
            <h2 id="features" className="font-display text-heading font-semibold stretch-condensed text-bone">
              What it does
            </h2>
            <ul className="mt-4 max-w-[56ch] list-disc space-y-3 pl-5 text-dim marker:text-line">
              {project.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="stack" className="lg:col-span-6">
            <h2 id="stack" className="font-display text-heading font-semibold stretch-condensed text-bone">
              Stack
            </h2>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
              {project.tech.map((t) => (
                <li key={t} className="font-display text-lead font-medium text-bone">
                  {t}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <nav
          aria-label="More projects"
          className="mt-20 grid border-t border-line sm:grid-cols-2"
        >
          {prev ? (
            <Link
              href={`/projects/${prev.id}`}
              className="group flex min-h-[7rem] flex-col justify-center gap-1 border-b border-line py-6 transition-colors hover:text-signal sm:border-b-0 sm:border-r sm:pr-8"
            >
              <span className="inline-flex items-center gap-2 text-small text-dim">
                <ArrowLeft size={16} aria-hidden /> Previous
              </span>
              <span className="font-display text-heading font-semibold stretch-condensed">
                {splitTitle(prev.title).name}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={`/projects/${next.id}`}
              className="group flex min-h-[7rem] flex-col items-start justify-center gap-1 py-6 transition-colors hover:text-signal sm:items-end sm:pl-8 sm:text-right"
            >
              <span className="inline-flex items-center gap-2 text-small text-dim">
                Next <ArrowRight size={16} aria-hidden />
              </span>
              <span className="font-display text-heading font-semibold stretch-condensed">
                {splitTitle(next.title).name}
              </span>
            </Link>
          )}
        </nav>
      </article>
    </main>
  )
}

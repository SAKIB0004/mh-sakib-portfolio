import { ExternalLink, Github } from 'lucide-react'
import type { Project } from '@/types'
import { demoUrl } from '@/lib/projects'

const link =
  'inline-flex min-h-[44px] items-center gap-2 text-small text-dim transition-colors hover:text-signal'

/** GitHub + live demo links (real URLs from data only). */
export default function ProjectLinks({ project, className = '' }: { project: Project; className?: string }) {
  const demo = demoUrl(project)
  return (
    <div className={`flex flex-wrap items-center gap-x-6 ${className}`}>
      <a href={project.github} target="_blank" rel="noopener noreferrer" className={link}>
        <Github size={16} aria-hidden />
        GitHub
        <span className="sr-only"> repository for {project.title} (opens in a new tab)</span>
      </a>
      {demo && (
        <a href={demo} target="_blank" rel="noopener noreferrer" className={link}>
          <ExternalLink size={16} aria-hidden />
          Live demo
          <span className="sr-only"> for {project.title} (opens in a new tab)</span>
        </a>
      )}
    </div>
  )
}

import { projects } from '@/data'
import type { Project } from '@/types'

/** "MediBot — Source-Grounded Medical QA" → { name: "MediBot", subtitle: "Source-Grounded Medical QA" } */
export function splitTitle(title: string) {
  const [name, ...rest] = title.split(' — ')
  return { name, subtitle: rest.join(' — ') || undefined }
}

export const featuredProjects = projects.filter((p) => p.featured)
export const additionalProjects = projects.filter((p) => !p.featured)

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}

export function getAdjacent(id: string) {
  const i = projects.findIndex((p) => p.id === id)
  return {
    prev: i > 0 ? projects[i - 1] : undefined,
    next: i >= 0 && i < projects.length - 1 ? projects[i + 1] : undefined,
  }
}

export function demoUrl(p: Project) {
  return p.demo || p.hfSpace
}

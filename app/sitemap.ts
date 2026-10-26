import type { MetadataRoute } from 'next'
import { projects, siteConfig } from '@/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: siteConfig.url, lastModified: now, priority: 1 },
    { url: `${siteConfig.url}/certifications`, lastModified: now, priority: 0.6 },
    ...projects.map((p) => ({
      url: `${siteConfig.url}/projects/${p.id}`,
      lastModified: now,
      priority: 0.7,
    })),
  ]
}

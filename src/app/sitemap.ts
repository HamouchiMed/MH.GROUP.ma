import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site'
import { projectsData } from '@/lib/projectsData'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteUrl}/work`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...Object.values(projectsData).map((project) => ({
      url: `${siteUrl}/work/${project.slug}`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    })),
  ]
}

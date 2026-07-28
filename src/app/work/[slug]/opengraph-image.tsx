import { ImageResponse } from 'next/og'
import { OgCard } from '@/lib/ogCard'
import { projectsData } from '@/lib/projectsData'

export const alt = 'Case study — Mohamed Hamouchi'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return Object.keys(projectsData).map((slug) => ({ slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projectsData[slug]

  if (!project) {
    return new ImageResponse(
      (
        <OgCard
          eyebrow="Mohamed Hamouchi"
          meta="Case study"
          title="Selected work"
          subtitle="Full-stack and mobile products shipped for startups, agencies and enterprises in Morocco."
          footer="mohamed hamouchi"
        />
      ),
      size
    )
  }

  return new ImageResponse(
    (
      <OgCard
        eyebrow="Mohamed Hamouchi"
        meta={`${project.category.EN} · ${project.year}`}
        title={project.title}
        subtitle={project.summary.EN}
        footer={project.role.EN}
      />
    ),
    size
  )
}

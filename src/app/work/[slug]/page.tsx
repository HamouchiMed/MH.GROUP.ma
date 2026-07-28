import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import WorkPageClient from '../WorkPageClient'
import { projectsData } from '@/lib/projectsData'

type Params = { params: Promise<{ slug: string }> }

/** Prerender all seven case studies at build time. */
export function generateStaticParams() {
  return Object.keys(projectsData).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const project = projectsData[slug]

  if (!project) {
    return { title: 'Project not found | Mohamed Hamouchi' }
  }

  const title = `${project.title} — ${project.category.EN}`

  return {
    title,
    description: project.summary.EN,
    keywords: [project.title, ...project.tags, 'Mohamed Hamouchi', 'case study'],
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: 'article',
      title,
      description: project.summary.EN,
      url: `/work/${project.slug}`,
    },
    twitter: { card: 'summary_large_image', title, description: project.summary.EN },
  }
}

export default async function WorkPage({ params }: Params) {
  const { slug } = await params

  // An unknown slug used to silently render OneBotAds, which meant
  // /work/anything returned 200 with the wrong project attached to it.
  if (!projectsData[slug]) notFound()

  return <WorkPageClient slug={slug} />
}

import WorkPageClient from '../WorkPageClient'

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  // In Next.js 15+, params is a Promise that must be awaited
  const { slug } = await params

  return <WorkPageClient slug={slug} />
}

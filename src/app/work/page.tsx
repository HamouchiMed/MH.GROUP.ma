import type { Metadata } from 'next'
import WorkIndexClient from './WorkIndexClient'

export const metadata: Metadata = {
  title: 'Selected Work',
  description:
    'Seven shipped full-stack and mobile products — SaaS ad management, marketplaces, HR systems and mobile authentication, built with React, React Native, Node.js and PostgreSQL.',
  alternates: { canonical: '/work' },
  openGraph: {
    type: 'website',
    title: 'Selected Work — Mohamed Hamouchi',
    description: 'Seven shipped full-stack and mobile products, with the case study behind each one.',
    url: '/work',
  },
}

export default function WorkIndexPage() {
  return <WorkIndexClient />
}

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/layout/SmoothScroll'
import CanvasContainer from '@/components/layout/CanvasContainer'
import BackgroundScene from '@/components/canvas/BackgroundScene'
import CustomCursor from '@/components/dom/CustomCursor'
import Preloader from '@/components/dom/Preloader'
import Header from '@/components/dom/Header'
import ScrollIndicator from '@/components/dom/ScrollIndicator'
import CustomScrollbar from '@/components/dom/CustomScrollbar'
import Onboarding from '@/components/dom/Onboarding'
import { Analytics } from "@vercel/analytics/next"
import { siteUrl, siteName, siteDescription } from '@/lib/site'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'MOHAMED HAMOUCHI | Portfolio',
    template: '%s | Mohamed Hamouchi',
  },
  description: siteDescription,
  applicationName: 'MH Portfolio',
  authors: [{ name: siteName }],
  creator: siteName,
  keywords: ['Mohamed Hamouchi', 'Full-Stack Developer', 'Portfolio', 'Next.js', 'React Three Fiber', 'Morocco'],
  icons: { icon: '/icon.svg', apple: '/icon.svg' },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Mohamed Hamouchi — Portfolio',
    title: 'MOHAMED HAMOUCHI | Full-Stack Developer',
    description: siteDescription,
    url: siteUrl,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MOHAMED HAMOUCHI | Full-Stack Developer',
    description: siteDescription,
  },
  robots: { index: true, follow: true },
}

/** Structured data so a search for the name resolves to a person, not a URL. */
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteName,
  url: siteUrl,
  jobTitle: 'Full-Stack Developer',
  email: 'mailto:mohamedhamouchi2006@gmail.com',
  address: { '@type': 'PostalAddress', addressLocality: 'Berrechid', addressCountry: 'MA' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'EST Dakhla' },
  knowsLanguage: ['fr', 'en', 'ar'],
  sameAs: [
    'https://github.com/HamouchiMed',
    'https://linkedin.com/in/mohamed-hamouchi-5093743a8',
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="selection:bg-white selection:text-black" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <div className="noise-overlay" />
        <Preloader />
        <CustomCursor />
        <ScrollIndicator />
        <CustomScrollbar />
        <Onboarding />
        <Analytics />
        <SmoothScroll>
          <Header />
          <main className="relative z-10">{children}</main>
          <CanvasContainer><BackgroundScene /></CanvasContainer>
        </SmoothScroll>
      </body>
    </html>
  )
}

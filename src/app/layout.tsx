import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'
import SmoothScroll from '@/components/layout/SmoothScroll'
import CanvasContainer from '@/components/layout/CanvasContainer'
import BackgroundScene from '@/components/canvas/BackgroundScene'
import CustomCursor from '@/components/dom/CustomCursor'
import Preloader from '@/components/dom/Preloader'
import Header from '@/components/dom/Header'
import ScrollIndicator from '@/components/dom/ScrollIndicator'
import CustomScrollbar from '@/components/dom/CustomScrollbar'
import Onboarding from '@/components/dom/Onboarding'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mohamed-hamouchi.dev'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'MOHAMED HAMOUCHI | Portfolio',
  description: 'Full-Stack Developer & Creative Technologist — building digital architectures that merge technical precision with immersive aesthetics.',
  applicationName: 'MH Portfolio',
  authors: [{ name: 'Mohamed Hamouchi' }],
  creator: 'Mohamed Hamouchi',
  keywords: ['Mohamed Hamouchi', 'Full-Stack Developer', 'Portfolio', 'Next.js', 'React Three Fiber', 'Morocco'],
  icons: { icon: '/favicon.ico', apple: '/images/profile.jpg' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="selection:bg-white selection:text-black" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}>
        <div className="noise-overlay" />
        <Preloader />
        <CustomCursor />
        <ScrollIndicator />
        <CustomScrollbar />
        <Onboarding />
        <SmoothScroll>
          <Header />
          <main className="relative z-10">{children}</main>
          <CanvasContainer><BackgroundScene /></CanvasContainer>
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  )
}

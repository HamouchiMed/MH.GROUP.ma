import { ImageResponse } from 'next/og'
import { OgCard } from '@/lib/ogCard'

export const alt = 'Mohamed Hamouchi — Full-Stack Developer & Creative Technologist'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="Mohamed Hamouchi"
        meta="Berrechid, MA"
        title="Full-Stack Developer"
        subtitle="Digital architectures that merge technical precision with immersive aesthetics. React, React Native, Node.js, PostgreSQL, WebGL."
        footer="Open for freelance"
      />
    ),
    size
  )
}

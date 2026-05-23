'use client'

import { ReactNode, useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      infinite: false,
    })

    lenis.on('scroll', ({ scroll, velocity }: { scroll: number, velocity: number }) => {
      const clampedVelocity = Math.max(-20, Math.min(20, velocity))
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const progress = Math.min(1, Math.max(0, scroll / maxScroll))

      document.documentElement.style.setProperty('--scroll-velocity', clampedVelocity.toString())
      document.documentElement.style.setProperty('--scroll-y', scroll.toFixed(2))
      document.documentElement.style.setProperty('--scroll-progress', progress.toFixed(5))
    })

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }

    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}

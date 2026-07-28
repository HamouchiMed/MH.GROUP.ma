'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/utils'

export default function Marquee({ text, speed = 1 }: { text: string, speed?: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const textEl = textRef.current
    if (!container || !textEl) return

    // Create a continuous loop
    const tl = gsap.to(textEl, {
      xPercent: -50,
      duration: 20 / speed,
      ease: 'none',
      repeat: -1
    })

    if (prefersReducedMotion()) {
      tl.pause()
      return () => {
        tl.kill()
      }
    }

    // Scroll direction and force drive the marquee: it speeds up, skews, and
    // reverses with the page. Lenis publishes velocity as an inline custom
    // property in SmoothScroll, so reading it costs nothing.
    const root = document.documentElement
    const skewTo = gsap.quickTo(textEl, 'skewX', { duration: 0.6, ease: 'power3' })
    let timeScale = 1

    const tick = () => {
      const velocity = Number.parseFloat(root.style.getPropertyValue('--scroll-velocity') || '0')
      const direction = velocity === 0 ? Math.sign(timeScale) || 1 : Math.sign(velocity)
      const target = direction * (1 + Math.min(5, Math.abs(velocity) * 0.4))

      timeScale = gsap.utils.interpolate(timeScale, target, 0.07)
      tl.timeScale(timeScale)
      skewTo(gsap.utils.clamp(-10, 10, velocity * 0.5))
    }

    gsap.ticker.add(tick)

    return () => {
      gsap.ticker.remove(tick)
      tl.kill()
    }
  }, [speed])

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden border-y border-white/5 py-4 bg-white/[0.02] whitespace-nowrap"
    >
      <div ref={textRef} className="inline-block will-change-transform">
        <span className="text-[10vw] font-black uppercase tracking-tighter opacity-10 inline-block mr-10 italic">
          {text} &nbsp; • &nbsp; {text} &nbsp; • &nbsp; {text} &nbsp; • &nbsp; {text} &nbsp; • &nbsp;
        </span>
        <span className="text-[10vw] font-black uppercase tracking-tighter opacity-10 inline-block mr-10 italic">
          {text} &nbsp; • &nbsp; {text} &nbsp; • &nbsp; {text} &nbsp; • &nbsp; {text} &nbsp; • &nbsp;
        </span>
      </div>
    </div>
  )
}

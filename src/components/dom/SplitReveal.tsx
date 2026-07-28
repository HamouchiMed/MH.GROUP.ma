'use client'

import { useEffect, useRef, type ReactNode, type RefObject } from 'react'
import { gsap, SplitText } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/utils'

type SplitRevealProps = {
  children: ReactNode
  /** Element to render. Use the real heading level — SplitText keeps it accessible. */
  as?: 'div' | 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4'
  className?: string
  delay?: number
  stagger?: number
  duration?: number
  /** ScrollTrigger start position. */
  start?: string
}

/**
 * Reveals text line by line out of an overflow mask, instead of fading the
 * whole block at once like <Reveal>. SplitText re-splits on resize and after
 * webfonts load, so lines never break mid-animation.
 */
export default function SplitReveal({
  children,
  as = 'div',
  className = '',
  delay = 0,
  stagger = 0.08,
  duration = 1.1,
  start = 'top 88%',
}: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Reduced motion: leave the text exactly as the server rendered it.
    if (prefersReducedMotion()) {
      gsap.set(element, { opacity: 1 })
      return
    }

    let split: SplitText | undefined

    const context = gsap.context(() => {
      gsap.set(element, { opacity: 1 })

      split = SplitText.create(element, {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        linesClass: 'split-line',
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 115,
            opacity: 0,
            duration,
            delay,
            stagger,
            ease: 'expo.out',
            scrollTrigger: { trigger: element, start, once: true },
          }),
      })
    }, element)

    return () => {
      split?.revert()
      context.revert()
    }
  }, [delay, stagger, duration, start])

  // All the supported tags share the same DOM prop shape; narrowing to one of
  // them keeps TypeScript from widening the intrinsic element's props to never.
  const Tag = as as 'div'

  return (
    <Tag ref={ref as RefObject<HTMLDivElement>} className={className} style={{ opacity: 0 }}>
      {children}
    </Tag>
  )
}

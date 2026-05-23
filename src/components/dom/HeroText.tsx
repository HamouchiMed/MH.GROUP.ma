'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/utils'

export default function HeroText() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const shadowRef1 = useRef<HTMLHeadingElement>(null)
  const shadowRef2 = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const onMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !textRef.current || !shadowRef1.current || !shadowRef2.current) return

      const { clientX, clientY } = e
      const { left, top, width, height } = containerRef.current.getBoundingClientRect()

      const x = (clientX - (left + width / 2)) / (width / 2)
      const y = (clientY - (top + height / 2)) / (height / 2)

      const intensity = Math.sqrt(x * x + y * y) * 3

      gsap.to(textRef.current, {
        filter: `blur(${intensity * 0.2}px)`,
        duration: 0.5,
        ease: 'power2.out',
      })

      gsap.to(shadowRef1.current, {
        x: x * intensity,
        y: y * intensity,
        opacity: intensity * 0.04,
        filter: `blur(${intensity * 0.5}px)`,
        duration: 0.6,
        ease: 'power2.out',
      })

      gsap.to(shadowRef2.current, {
        x: -x * intensity,
        y: -y * intensity,
        opacity: intensity * 0.04,
        filter: `blur(${intensity * 0.5}px)`,
        duration: 0.7,
        ease: 'power2.out',
      })
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  const textStyle = "text-[12vw] md:text-[8vw] font-black leading-[0.85] tracking-[-0.04em] uppercase select-none whitespace-nowrap"

  return (
    <div ref={containerRef} className="relative inline-block mb-12">
      <h1
        ref={textRef}
        className={`${textStyle} text-white mix-blend-difference relative z-10`}
      >
        MOHAMED <br /> HAMOUCHI
      </h1>

      <h1
        ref={shadowRef1}
        className={`${textStyle} text-red-500 absolute top-0 left-0 z-0 pointer-events-none opacity-0`}
      >
        MOHAMED <br /> HAMOUCHI
      </h1>

      <h1
        ref={shadowRef2}
        className={`${textStyle} text-blue-400 absolute top-0 left-0 z-0 pointer-events-none opacity-0`}
      >
        MOHAMED <br /> HAMOUCHI
      </h1>
    </div>
  )
}

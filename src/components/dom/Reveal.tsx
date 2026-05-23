'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'
import { prefersReducedMotion } from '@/lib/utils'

interface RevealProps {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  duration?: number
  className?: string
}

export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 1,
  className = '',
}: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(() => prefersReducedMotion())

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    let timeoutId: number | undefined

    if (prefersReducedMotion()) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timeoutId = window.setTimeout(() => setIsVisible(true), delay * 1000)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    )

    observer.observe(element)

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId)
      observer.disconnect()
    }
  }, [delay, direction, duration])

  const offsets = {
    up: 'translateY(32px)',
    down: 'translateY(-32px)',
    left: 'translateX(32px)',
    right: 'translateX(-32px)',
  }[direction]

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0,0,0)' : offsets,
        transitionProperty: 'opacity, transform',
        transitionDuration: `${duration}s`,
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}

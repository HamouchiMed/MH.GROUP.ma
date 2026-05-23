'use client'

import { useRef, ReactNode, useEffect } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '@/lib/utils'

interface MagneticProps {
  children: ReactNode
  strength?: number
  className?: string
}

export default function Magnetic({ children, strength = 0.5, className = '' }: MagneticProps) {
  const magneticRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = magneticRef.current
    if (!element) return
    if (prefersReducedMotion()) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const moveElement = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { left, top, width, height } = element.getBoundingClientRect()

      const x = clientX - (left + width / 2)
      const y = clientY - (top + height / 2)

      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration: 1,
        ease: 'power3.out',
      })
    }

    const resetElement = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.3)',
      })
    }

    element.addEventListener('mousemove', moveElement)
    element.addEventListener('mouseleave', resetElement)

    return () => {
      element.removeEventListener('mousemove', moveElement)
      element.removeEventListener('mouseleave', resetElement)
    }
  }, [strength])

  return (
    <div ref={magneticRef} className={`inline-block ${className}`}>
      {children}
    </div>
  )
}

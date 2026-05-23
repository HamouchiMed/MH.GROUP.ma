'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { gsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/utils'

interface SkewContainerProps {
  children: ReactNode
  className?: string
  strength?: number
}

export default function SkewContainer({ children, className = '', strength = 0.05 }: SkewContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = containerRef.current
    if (!element) return
    if (prefersReducedMotion()) return

    let currentSkew = 0
    
    const updateSkew = () => {
      // Get the velocity from the root CSS variable we set in SmoothScroll
      const velocity = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scroll-velocity') || '0')
      
      // Target skew based on velocity
      const targetSkew = velocity * strength
      
      // Smoothly interpolate (lerp) to the target skew
      currentSkew += (targetSkew - currentSkew) * 0.1
      
      gsap.set(element, { 
        skewY: currentSkew,
        force3D: true 
      })
    }
    
    gsap.ticker.add(updateSkew)
    
    return () => {
      gsap.ticker.remove(updateSkew)
    }
  }, [strength])

  return (
    <div ref={containerRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  )
}

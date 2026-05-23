'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'

export default function MagneticHeading({ text, className = "" }: { text: string, className?: string }) {
  const containerRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const chars = container.querySelectorAll('.char')
    
    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      
      chars.forEach((char: any) => {
        const rect = char.getBoundingClientRect()
        const charCenterX = rect.left + rect.width / 2
        const charCenterY = rect.top + rect.height / 2
        
        const distX = clientX - charCenterX
        const distY = clientY - charCenterY
        const distance = Math.sqrt(distX * distX + distY * distY)
        
        const maxDist = 150
        if (distance < maxDist) {
          const force = (maxDist - distance) / maxDist
          const moveX = distX * force * 0.5
          const moveY = distY * force * 0.5
          
          gsap.to(char, {
            x: moveX,
            y: moveY,
            rotation: moveX * 0.1,
            duration: 0.4,
            ease: 'power2.out'
          })
        } else {
          gsap.to(char, {
            x: 0,
            y: 0,
            rotation: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.3)'
          })
        }
      })
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <h3 ref={containerRef} className={`${className} flex flex-wrap`}>
      {text.split('').map((char, i) => (
        <span 
          key={i} 
          className="char inline-block whitespace-pre select-none"
        >
          {char}
        </span>
      ))}
    </h3>
  )
}

'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'

export default function ElasticText({ text, className = "" }: { text: string, className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const letters = lettersRef.current.filter(Boolean) as HTMLSpanElement[]

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      
      letters.forEach((letter) => {
        const rect = letter.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        
        const dist = Math.sqrt((clientX - centerX) ** 2 + (clientY - centerY) ** 2)
        const maxDist = 150
        
        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist
          const x = (centerX - clientX) * force * 0.5
          const y = (centerY - clientY) * force * 0.5
          
          gsap.to(letter, {
            x,
            y,
            scale: 1 + force * 0.3,
            duration: 0.6,
            ease: 'power2.out'
          })
        } else {
          gsap.to(letter, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'elastic.out(1, 0.3)'
          })
        }
      })
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <div ref={containerRef} className={`flex flex-wrap justify-center ${className}`}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          ref={(el) => { lettersRef.current[i] = el }}
          className="inline-block whitespace-pre"
        >
          {char}
        </span>
      ))}
    </div>
  )
}

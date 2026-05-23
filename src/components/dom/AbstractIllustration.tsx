'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export default function AbstractIllustration({ className = "" }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const paths = svg.querySelectorAll('path')
    const circles = svg.querySelectorAll('circle')

    gsap.to(paths, {
      strokeDashoffset: 0,
      duration: 3,
      stagger: 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })

    gsap.to(circles, {
      scale: 1.5,
      opacity: 0.5,
      duration: 2,
      stagger: 0.3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })
  }, [])

  return (
    <div className={`pointer-events-none opacity-20 ${className}`}>
      <svg 
        ref={svgRef}
        viewBox="0 0 200 200" 
        className="w-full h-full"
        fill="none" 
        stroke="white" 
        strokeWidth="0.5"
      >
        {/* Animated geometric nodes */}
        <path d="M40,100 L160,100" strokeDasharray="120" strokeDashoffset="120" />
        <path d="M100,40 L100,160" strokeDasharray="120" strokeDashoffset="120" />
        <path d="M60,60 L140,140" strokeDasharray="113" strokeDashoffset="113" />
        <path d="M140,60 L60,140" strokeDasharray="113" strokeDashoffset="113" />
        
        <circle cx="100" cy="100" r="40" strokeDasharray="251" strokeDashoffset="251" />
        <circle cx="40" cy="100" r="4" fill="white" />
        <circle cx="160" cy="100" r="4" fill="white" />
        <circle cx="100" cy="40" r="4" fill="white" />
        <circle cx="100" cy="160" r="4" fill="white" />
      </svg>
    </div>
  )
}

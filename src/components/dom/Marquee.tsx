'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'

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

    return () => {
      tl.kill()
    }
  }, [speed])

  return (
    <div 
      ref={containerRef} 
      className="w-full overflow-hidden border-y border-white/5 py-4 bg-white/[0.02] whitespace-nowrap"
    >
      <div ref={textRef} className="inline-block">
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

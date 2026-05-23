'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Reveal from './Reveal'

gsap.registerPlugin(ScrollTrigger)

type Event = {
  date: string
  title: string
  company: string
  desc: string
}

export default function ExperienceTimeline({ events, title }: { events: Event[], title: string }) {
  const lineRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!lineRef.current) return

    gsap.fromTo(lineRef.current, 
      { scaleY: 0 }, 
      { 
        scaleY: 1, 
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true
        }
      }
    )
  }, [])

  return (
    <div ref={containerRef} className="relative pl-12 py-10">
      {/* Vertical Track Line */}
      <div className="absolute left-0 top-0 w-[1px] h-full bg-white/5" />
      <div 
        ref={lineRef} 
        className="absolute left-0 top-0 w-[1px] h-full bg-white origin-top shadow-[0_0_15px_white]" 
      />

      <h4 className="text-[10px] uppercase tracking-widest text-white/30 mb-16 font-bold">
        {title}
      </h4>

      <div className="space-y-20">
        {events.map((event, i) => (
          <div key={i} className="relative group">
            {/* Connection Node */}
            <div className="absolute -left-[51px] top-1.5 w-2 h-2 bg-black border border-white/40 rounded-full group-hover:scale-150 group-hover:border-white transition-all duration-500 z-10" />
            
            <Reveal direction="left" delay={i * 0.1}>
              <div className="space-y-4">
                <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.3em] font-bold block">
                  {event.date}
                </span>
                <div>
                  <h5 className="text-lg text-white font-bold tracking-tight uppercase group-hover:text-blue-400 transition-colors">
                    {event.title}
                  </h5>
                  <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest mt-1">
                    {event.company}
                  </p>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed max-w-sm">
                  {event.desc}
                </p>
              </div>
            </Reveal>
          </div>
        ))}
      </div>
    </div>
  )
}

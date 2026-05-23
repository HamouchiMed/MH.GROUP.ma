'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import Reveal from './Reveal'
import Magnetic from './Magnetic'
import { ArrowUpRight } from 'lucide-react'
import TransitionLink from './TransitionLink'

const projects = [
  {
    title: 'JobiStart SaaS',
    category: 'Full-Stack Development',
    year: '2026',
    description: 'Maintenance and evolution of a advertising SaaS platform. Integrated TikTok, LinkedIn, and Snapchat APIs with secured OAuth/JWT authentication.',
    tags: ['React', 'Express.js', 'PostgreSQL', 'OAuth 2.0'],
  },
  {
    title: 'Obbo Mobile',
    category: 'Mobile & Branding',
    year: '2024',
    description: 'Anti-waste food mobile application (similar to Too Good To Go). Developed mobile app, admin dashboard, and full visual identity.',
    tags: ['React Native', 'Node.js', 'Branding', 'Startup'],
  },
  {
    title: 'SIENDO Auth',
    category: 'Mobile Development',
    year: '2025',
    description: 'Implementation of a robust mobile authentication system via React Native for SIENDO Group Maroc.',
    tags: ['React Native', 'Security', 'UI/UX'],
  },
]

export default function HorizontalProjects() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const trigger = triggerRef.current
    if (!section || !trigger) return

    const pin = gsap.fromTo(
      section,
      { x: 0 },
      {
        x: '-200vw',
        ease: 'none',
        scrollTrigger: {
          trigger: trigger,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${section.offsetWidth}`,
        },
      }
    )

    return () => {
      pin.kill()
    }
  }, [])

  return (
    <div ref={triggerRef} className="overflow-hidden bg-black/50 backdrop-blur-3xl border-t border-white/5">
      <div className="px-10 md:px-20 py-20">
        <Reveal>
          <h2 className="text-[9px] uppercase tracking-[0.5em] text-white/20 mb-4">Selected Works</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight uppercase">CRAFTING DIGITAL <br /> <span className="italic text-white/30">EXPERIENCES</span></h3>
        </Reveal>
      </div>

      <div ref={sectionRef} className="flex w-[300vw] h-[60vh] relative">
        {projects.map((project, index) => (
          <div key={project.title} className="w-screen h-full flex flex-col justify-center px-10 md:px-20 relative overflow-hidden group">
            {/* Background Number */}
            <span className="absolute -bottom-10 -right-10 text-[25vw] font-black text-white/[0.02] select-none pointer-events-none group-hover:text-white/[0.05] transition-colors duration-1000">
              0{index + 1}
            </span>

            <div className="max-w-2xl relative z-10">
              <div className="flex items-center gap-4 mb-4 text-[10px] uppercase tracking-widest text-white/30">
                <span>{project.year}</span>
                <span className="w-1 h-1 bg-white/20 rounded-full" />
                <span>{project.category}</span>
              </div>
              
              <TransitionLink href={`/work/${project.title.toLowerCase().replace(/\s+/g, '-')}`} className="block w-fit">
                <h3 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter uppercase group-hover:italic transition-all duration-500">
                  {project.title}
                </h3>
              </TransitionLink>

              <p className="text-sm md:text-base text-gray-500 max-w-md leading-relaxed mb-8">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-10">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-[9px] uppercase tracking-tighter px-3 py-1 border border-white/10 rounded-full text-white/40">
                    {tag}
                  </span>
                ))}
              </div>

              <Magnetic strength={0.2}>
                <TransitionLink 
                  href={`/work/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors"
                >
                  VIEW CASE STUDY <ArrowUpRight className="w-4 h-4" />
                </TransitionLink>
              </Magnetic>
            </div>
          </div>
        ))}
      </div>
      
      {/* Visual spacer at bottom */}
      <div className="h-32" />
    </div>
  )
}

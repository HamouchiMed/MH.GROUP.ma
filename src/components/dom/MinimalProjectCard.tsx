'use client'

import { useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { useStore } from '@/store/useStore'
import { playHoverSound } from '@/lib/audio'
import TransitionLink from './TransitionLink'
import { ArrowUpRight } from 'lucide-react'

interface ProjectCardProps {
  title: string
  category: { EN: string; FR: string }
  year: string
  description: { EN: string; FR: string }
  tags: string[]
  index: number
}

export default function MinimalProjectCard({ title, category, year, description, tags, index }: ProjectCardProps) {
  const { setHoveredProject, language } = useStore()
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const slug = title.toLowerCase().replace(/\s+/g, '-')

  const onEnter = () => {
    setIsHovered(true)
    setHoveredProject(index)
    playHoverSound()
  }

  const onLeave = () => {
    setIsHovered(false)
    setHoveredProject(null)
  }

  return (
    <div 
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group relative w-full border-b border-white/5 last:border-none"
    >
      <TransitionLink href={`/work/${slug}`} className="block w-full py-10 md:py-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 px-4">
          
          {/* Subtle Year & Index */}
          <div className="flex items-center gap-6 md:w-32">
            <span className="text-[10px] font-mono text-white/20 tracking-tighter">0{index + 1}</span>
            <span className={`text-[10px] font-mono transition-colors duration-500 ${isHovered ? 'text-white/60' : 'text-white/10'}`}>
              {year}
            </span>
          </div>

          {/* Title - The main focus */}
          <div className="flex-1 relative">
            <h3 className={`text-4xl md:text-7xl font-bold tracking-tighter uppercase transition-all duration-700 ease-out flex items-center gap-4 ${
              isHovered ? 'translate-x-4 italic' : 'opacity-40 grayscale'
            }`}>
              {title}
              <ArrowUpRight className={`w-6 h-6 md:w-10 md:h-10 transition-all duration-500 ${
                isHovered ? 'opacity-100 translate-x-0 rotate-0' : 'opacity-0 -translate-x-4 rotate-45'
              }`} />
            </h3>
            
            {/* Contextual Reveal Info (Visible on Hover) */}
            <div className={`mt-6 transition-all duration-700 flex flex-col gap-4 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
            }`}>
              <p className="max-w-md text-sm text-gray-400 leading-relaxed font-medium">
                {language === 'EN' ? description.EN : description.FR}
              </p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="text-[9px] uppercase tracking-widest px-3 py-1 bg-white/5 rounded-full text-white/40 border border-white/5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Category - Subtle on right */}
          <div className={`hidden lg:block text-right transition-all duration-500 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-10 translate-x-4'}`}>
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40">
              {language === 'EN' ? category.EN : category.FR}
            </p>
          </div>

        </div>
      </TransitionLink>

      {/* Background Interactive Layer */}
      <div className={`absolute inset-0 bg-white/[0.02] -z-10 transition-opacity duration-1000 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
    </div>
  )
}

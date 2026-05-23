'use client'

import { useRef } from 'react'
import Reveal from './Reveal'
import { ArrowUpRight } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { playHoverSound } from '@/lib/audio'

interface ProjectCardProps {
  title: string
  category: string
  year: string
  description: string
  tags: string[]
  index: number
}

export default function ProjectCard({ title, category, year, description, tags, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { setHoveredProject } = useStore()

  return (
    <Reveal delay={index * 0.1} className="group w-full block">
      <div
        ref={cardRef}
        onMouseEnter={() => {
          setHoveredProject(index)
          playHoverSound()
        }}
        onMouseLeave={() => setHoveredProject(null)}
        className="relative py-8 border-b border-white/10 hover:border-white/40 transition-colors duration-500"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex-1 z-10">
            <div className="flex items-center gap-4 mb-3 text-[10px] uppercase tracking-widest text-white/30">
              <span>{year}</span>
              <span className="w-1 h-1 bg-white/20 rounded-full" />
              <span>{category}</span>
            </div>
            <h3 className="text-2xl md:text-4xl font-bold mb-4 group-hover:italic group-hover:translate-x-4 transition-all duration-500 ease-out text-white mix-blend-difference uppercase">
              {title}
            </h3>
            <p className="max-w-xl text-gray-500 text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-500 mix-blend-difference">
              {description}
            </p>
            <div className="flex flex-wrap gap-2 mt-5">
              {tags.map((tag) => (
                <span key={tag} className="text-[9px] uppercase tracking-tighter px-3 py-1 border border-white/5 rounded-full text-white/30 group-hover:border-white/20 group-hover:text-white/60 transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-end z-10">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 -rotate-45 group-hover:rotate-0">
              <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8" />
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

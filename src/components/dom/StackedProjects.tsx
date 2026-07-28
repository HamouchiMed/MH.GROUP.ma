'use client'

import { useState } from 'react'
import { useStore } from '@/store/useStore'
import { playHoverSound } from '@/lib/audio'
import TransitionLink from './TransitionLink'
import { ArrowUpRight } from 'lucide-react'
import Reveal from './Reveal'
import Magnetic from './Magnetic'
import DeviceFrame from './DeviceFrame'
import { orderedProjects } from '@/lib/projectsData'

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.38 6.84 9.74.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.38-3.37-1.38-.45-1.18-1.1-1.49-1.1-1.49-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.33 1.11 2.9.85.09-.66.35-1.11.64-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.3.1-2.72 0 0 .84-.27 2.75 1.05A9.17 9.17 0 0 1 12 6.9c.85 0 1.71.12 2.51.35 1.9-1.32 2.74-1.05 2.74-1.05.55 1.42.2 2.46.1 2.72.64.72 1.02 1.64 1.02 2.76 0 3.94-2.35 4.81-4.58 5.06.36.32.68.95.68 1.92 0 1.38-.01 2.49-.01 2.83 0 .27.18.59.69.48A10.03 10.03 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" />
  </svg>
)

export default function StackedProjects() {
  const { setHoveredProject, language, hoveredSkill, setCursorText } = useStore()
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  const projects = orderedProjects

  return (
    <section id="work" className="relative border-t border-white/5">
      <div className="px-10 md:px-20 py-24">
        <Reveal>
          <h2 className="text-[9px] uppercase tracking-[0.5em] text-white/20 mb-4">
            {language === 'EN' ? 'Selected Works' : 'Travaux Sélectionnés'}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight uppercase text-white">
            {language === 'EN' ? 'REAL PROJECTS' : 'PROJETS RÉELS'} <br /> 
            <span className="italic text-white/30">{language === 'EN' ? 'DELIVERED WITH PURPOSE' : 'RÉALISÉS AVEC PASSION'}</span>
          </h3>
        </Reveal>
      </div>

      <div className="flex flex-col">
        {projects.map((project, index) => {
          const hasHoveredSkill = hoveredSkill ? project.tags.includes(hoveredSkill) : false

          return (
            <div key={project.title} className="sticky top-0 h-screen w-full flex items-center justify-center">
              <div 
                onMouseEnter={() => {
                  setHoveredProject(index)
                  setHoveredIdx(index)
                  setCursorText("PROJECT")
                  playHoverSound()
                }}
                onMouseLeave={() => {
                  setHoveredProject(null)
                  setHoveredIdx(null)
                  setCursorText(null)
                }}
                className={`w-[88%] max-w-6xl h-[85vh] bg-[#0a0a0a]/80 backdrop-blur-3xl rounded-[3rem] border transition-all duration-700 flex flex-col md:flex-row relative group ${
                  hasHoveredSkill ? 'border-white/40 shadow-[0_0_50px_rgba(255,255,255,0.1)] scale-[1.01]' : 'border-white/5 shadow-2xl'
                }`}
              >
                <div className="flex-1 p-10 md:p-16 flex flex-col justify-between relative z-10 overflow-y-auto custom-scrollbar">
                  <div>
                    <div className="flex items-center gap-6 mb-8 text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">
                      <span>0{index + 1}</span>
                      <span className="w-1 h-1 bg-white/10 rounded-full" />
                      <span>{project.year}</span>
                    </div>
                    <h3 className={`text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6 leading-none group-hover:italic transition-all duration-700 ${hasHoveredSkill ? 'text-white' : ''}`}>
                      {project.title}
                    </h3>
                    <p className="max-w-md text-sm md:text-base text-white/50 leading-relaxed mb-8">
                      {language === 'EN' ? project.summary.EN : project.summary.FR}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className={`px-3 py-1 text-[9px] uppercase tracking-widest border rounded-full transition-all duration-500 ${
                          hoveredSkill === tag ? 'bg-white text-black border-white' : 'border-white/5 text-white/40'
                        }`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-10 md:mt-0">
                    <div className="hidden lg:block">
                      <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/20">{language === 'EN' ? project.category.EN : project.category.FR}</p>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      {project.githubUrl && (
                        <Magnetic strength={0.2}>
                          <a 
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={() => setCursorText("CODE")}
                            onMouseLeave={() => setCursorText("PROJECT")}
                            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-white transition-colors"
                          >
                            <GithubIcon className="w-4 h-4" /> GITHUB
                          </a>
                        </Magnetic>
                      )}
                      
                      <Magnetic strength={0.2}>
                        <TransitionLink href={`/work/${project.slug}`} className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors group/btn">
                          <div onMouseEnter={() => setCursorText("GO")} onMouseLeave={() => setCursorText("PROJECT")} className="flex items-center gap-4">
                             {language === 'EN' ? 'EXPLORE CASE' : 'DÉCOUVRIR LE PROJET'} 
                             <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-black transition-all duration-500">
                               <ArrowUpRight className="w-4 h-4" />
                             </div>
                          </div>
                        </TransitionLink>
                      </Magnetic>
                    </div>
                  </div>
                </div>

                {/* Right Side Visual Area - device preview */}
                <div className="flex-1 relative border-l border-white/5 bg-white/[0.01] overflow-hidden flex items-center justify-center p-10 md:p-16">
                  {/* Shared Massive Background Number */}
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                     <span className={`font-black select-none transition-all duration-[1500ms] ${
                       hasHoveredSkill ? 'text-white/[0.08] text-[22vw] blur-sm' : 'text-white/[0.02] text-[18vw] blur-none'
                     }`}>
                       0{index + 1}
                     </span>
                  </div>

                  <DeviceFrame
                    project={project}
                    active={hoveredIdx === index || hasHoveredSkill}
                    className="relative z-10"
                  />

                  <span className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.4em] font-bold text-white/15 whitespace-nowrap">
                    {project.type === 'phone' ? 'iOS / Android' : 'Web Application'}
                  </span>
                </div>

              </div>
            </div>
          )
        })}
      </div>
      <div className="flex justify-center py-32">
        <Magnetic strength={0.2}>
          <TransitionLink
            href="/work"
            className="group flex items-center gap-5 rounded-full border border-white/15 px-10 py-5 text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 transition-colors duration-500 hover:border-white/40 hover:text-white"
            onMouseEnter={() => setCursorText('ARCHIVE')}
            onMouseLeave={() => setCursorText(null)}
          >
            {language === 'EN' ? 'View full archive' : 'Voir toute l’archive'}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </TransitionLink>
        </Magnetic>
      </div>
    </section>
  )
}

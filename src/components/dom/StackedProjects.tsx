'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store/useStore'
import { playHoverSound } from '@/lib/audio'
import TransitionLink from './TransitionLink'
import ProjectChooser from './ProjectChooser'
import { ArrowUpRight } from 'lucide-react'
import Reveal from './Reveal'
import Magnetic from './Magnetic'
import DeviceFrame from './DeviceFrame'
import { orderedProjects, type ProjectData } from '@/lib/projectsData'

export default function StackedProjects() {
  const { setHoveredProject, language, hoveredSkill, setCursorText, setTransitioning } = useStore()
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [chooser, setChooser] = useState<ProjectData | null>(null)
  const router = useRouter()

  const projects = orderedProjects

  // Navigate to the full archive with the site's WebGL "melt" transition.
  const openArchive = () => {
    setCursorText(null)
    setTransitioning(true)
    setTimeout(() => {
      router.push('/work')
      setTimeout(() => setTransitioning(false), 500)
    }, 800)
  }

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
            // Each card pins a little lower than the one before, so they pile up
            // as a stacked deck with the earlier cards' top edges still visible.
            // Pure CSS sticky — no scroll-driven transforms, nothing to stutter.
            <div
              key={project.title}
              style={{ top: `${5 + index * 2.4}vh` }}
              className="sticky w-full flex justify-center pb-8"
            >
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
                className={`w-[88%] max-w-6xl h-[80vh] bg-[#0a0a0a]/80 backdrop-blur-3xl rounded-[3rem] border transition-all duration-700 flex flex-col md:flex-row relative group ${
                  hasHoveredSkill ? 'border-white/40 shadow-[0_0_50px_rgba(255,255,255,0.1)] scale-[1.01]' : 'border-white/5 shadow-2xl'
                }`}
              >
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={language === 'EN' ? 'View full archive' : 'Voir toute l’archive'}
                  onClick={openArchive}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      openArchive()
                    }
                  }}
                  className="flex-1 p-10 md:p-16 flex flex-col justify-between relative z-10 overflow-y-auto custom-scrollbar cursor-pointer">
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
                      <Magnetic strength={0.2}>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setChooser(project)
                          }}
                          onMouseEnter={() => setCursorText("OPEN")}
                          onMouseLeave={() => setCursorText("PROJECT")}
                          className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors group/btn"
                        >
                          {language === 'EN' ? 'EXPLORE CASE' : 'DÉCOUVRIR LE PROJET'}
                          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-black transition-all duration-500">
                            <ArrowUpRight className="w-4 h-4" />
                          </div>
                        </button>
                      </Magnetic>
                    </div>
                  </div>
                </div>

                {/* Right Side Visual Area - device preview (click to open the chooser) */}
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={language === 'EN' ? `Open ${project.title}` : `Ouvrir ${project.title}`}
                  onClick={() => setChooser(project)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setChooser(project)
                    }
                  }}
                  onMouseEnter={() => setCursorText('OPEN')}
                  onMouseLeave={() => setCursorText('PROJECT')}
                  className="flex-1 relative border-l border-white/5 bg-white/[0.01] overflow-hidden flex items-center justify-center p-10 md:p-16 cursor-pointer">
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

      {chooser && <ProjectChooser project={chooser} onClose={() => setChooser(null)} />}
    </section>
  )
}

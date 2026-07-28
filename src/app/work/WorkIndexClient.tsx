'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import Reveal from '@/components/dom/Reveal'
import Magnetic from '@/components/dom/Magnetic'
import DeviceFrame from '@/components/dom/DeviceFrame'
import TransitionLink from '@/components/dom/TransitionLink'
import { useStore } from '@/store/useStore'
import { orderedProjects } from '@/lib/projectsData'

export default function WorkIndexClient() {
  const { language, setCursorText } = useStore()
  const [hovered, setHovered] = useState<string | null>(null)

  const t = language === 'EN'
    ? {
        back: 'Back home',
        eyebrow: 'Archive',
        title: 'Selected Work',
        lede: 'Seven products, shipped. Each one has the constraint it was built under, the decision that resolved it, and what changed after.',
        explore: 'Explore case',
      }
    : {
        back: 'Retour à l’accueil',
        eyebrow: 'Archive',
        title: 'Travaux Sélectionnés',
        lede: 'Sept produits livrés. Pour chacun : la contrainte de départ, la décision qui l’a résolue, et ce qui a changé ensuite.',
        explore: 'Découvrir le projet',
      }

  return (
    <div className="min-h-screen px-10 md:px-20 pt-40 pb-32">
      <Reveal delay={0.1}>
        <TransitionLink
          href="/"
          className="group mb-20 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> {t.back}
        </TransitionLink>
      </Reveal>

      <div className="mb-28 max-w-4xl">
        <Reveal delay={0.2}>
          <h2 className="mb-6 text-[9px] uppercase tracking-[0.5em] text-white/20">{t.eyebrow}</h2>
        </Reveal>
        <Reveal delay={0.3}>
          <h1 className="mb-10 text-5xl font-black uppercase leading-none tracking-tighter text-white md:text-[7rem]">
            {t.title}
          </h1>
        </Reveal>
        <Reveal delay={0.4}>
          <p className="max-w-2xl text-lg leading-relaxed text-white/50">{t.lede}</p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {orderedProjects.map((project, index) => (
          <Reveal key={project.slug} delay={0.05 * index}>
            <TransitionLink
              href={`/work/${project.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-[3rem] border border-white/5 bg-white/[0.02] transition-colors duration-700 hover:border-white/20"
              onMouseEnter={() => {
                setHovered(project.slug)
                setCursorText('CASE')
              }}
              onMouseLeave={() => {
                setHovered(null)
                setCursorText(null)
              }}
            >
              <div className="flex min-h-[320px] items-center justify-center overflow-hidden border-b border-white/5 bg-black/40 p-12">
                <DeviceFrame project={project} active={hovered === project.slug} />
              </div>

              <div className="flex flex-1 flex-col justify-between gap-8 p-10">
                <div>
                  <div className="mb-5 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                    <span>0{index + 1}</span>
                    <span className="h-1 w-1 rounded-full bg-white/10" />
                    <span>{project.year}</span>
                    <span className="h-1 w-1 rounded-full bg-white/10" />
                    <span>{language === 'EN' ? project.category.EN : project.category.FR}</span>
                  </div>
                  <h3 className="mb-4 text-3xl font-black uppercase leading-none tracking-tighter transition-all duration-500 group-hover:italic">
                    {project.title}
                  </h3>
                  <p className="max-w-md text-sm leading-relaxed text-white/50">
                    {language === 'EN' ? project.summary.EN : project.summary.FR}
                  </p>
                </div>

                <div className="flex items-end justify-between gap-6">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/5 px-3 py-1 text-[9px] uppercase tracking-widest text-white/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Magnetic strength={0.2}>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 transition-all duration-500 group-hover:bg-white group-hover:text-black">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </Magnetic>
                </div>
              </div>
            </TransitionLink>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

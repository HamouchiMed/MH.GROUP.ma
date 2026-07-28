'use client'

import Reveal from '@/components/dom/Reveal'
import TransitionLink from '@/components/dom/TransitionLink'
import DeviceFrame from '@/components/dom/DeviceFrame'
import { ArrowLeft, CheckCircle2, Zap, Target, ExternalLink } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { projectsData } from '@/lib/projectsData'

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.38 6.84 9.74.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.38-3.37-1.38-.45-1.18-1.1-1.49-1.1-1.49-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.33 1.11 2.9.85.09-.66.35-1.11.64-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.3.1-2.72 0 0 .84-.27 2.75 1.05A9.17 9.17 0 0 1 12 6.9c.85 0 1.71.12 2.51.35 1.9-1.32 2.74-1.05 2.74-1.05.55 1.42.2 2.46.1 2.72.64.72 1.02 1.64 1.02 2.76 0 3.94-2.35 4.81-4.58 5.06.36.32.68.95.68 1.92 0 1.38-.01 2.49-.01 2.83 0 .27.18.59.69.48A10.03 10.03 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" />
  </svg>
)

export default function WorkPageClient({ slug }: { slug: string }) {
  const { language } = useStore()

  // The route guards unknown slugs with notFound(), so this is only ever
  // hit during an in-flight transition.
  const project = projectsData[slug]

  const ui = {
    EN: {
      back: 'Back to Showcase',
      challenge: 'The Challenge',
      solution: 'The Solution',
      impact: 'The Impact',
      tech: 'Technical Stack',
      role: 'Role & Responsibility',
      visuals: 'Project Interface',
      summary: 'Project Summary',
      links: 'External Links',
    },
    FR: {
      back: 'Retour au Showcase',
      challenge: 'Le Défi',
      solution: 'La Solution',
      impact: 'L’Impact',
      tech: 'Stack Technique',
      role: 'Rôle & Responsabilité',
      visuals: 'Interface du Projet',
      summary: 'Résumé du Projet',
      links: 'Liens externes',
    }
  }

  const t = language === 'EN' ? ui.EN : ui.FR

  if (!project) return null

  return (
    <div className="min-h-screen pt-40 px-10 md:px-20 pb-32">
      {/* Header Navigation */}
      <Reveal delay={0.2}>
        <TransitionLink href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-20 text-[10px] uppercase tracking-[0.2em] font-bold group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> {t.back}
        </TransitionLink>
      </Reveal>

      {/* Project Hero Header */}
      <div className="mb-32">
        <Reveal delay={0.3}>
          <div className="flex items-center gap-6 mb-8 text-[11px] font-mono text-white/30 uppercase tracking-[0.3em]">
             <span>{project.year}</span>
             <span className="w-1 h-1 bg-white/10 rounded-full" />
             <span>{language === 'EN' ? project.category.EN : project.category.FR}</span>
          </div>
        </Reveal>
        <Reveal delay={0.4}>
          <h1 className="text-5xl md:text-[8rem] font-black leading-none tracking-tighter mix-blend-difference text-white uppercase mb-10">
            {project.title}
          </h1>
        </Reveal>
        <Reveal delay={0.5}>
          <p className="max-w-4xl text-lg md:text-2xl text-white/60 leading-relaxed">
            {language === 'EN' ? project.summary.EN : project.summary.FR}
          </p>
        </Reveal>
        {(project.githubUrl || project.liveUrl) ? (
          <Reveal delay={0.6}>
            <div className="mt-8 flex flex-wrap gap-4">
              <span className="text-[10px] uppercase tracking-[0.35em] text-white/25 font-bold mr-2">
                {t.links}
              </span>
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-white/70 hover:text-white transition-colors"
                >
                  <GithubIcon className="w-4 h-4" /> GitHub
                </a>
              ) : null}
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-white/70 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4" /> {language === 'EN' ? 'Live demo' : 'Démo en ligne'}
                </a>
              ) : null}
            </div>
          </Reveal>
        ) : null}
      </div>

      {/* Project Interface */}
      <Reveal delay={0.4}>
        <div className="mb-32 flex flex-col items-center gap-10 rounded-[3rem] border border-white/5 bg-white/[0.01] px-6 py-20 md:px-16">
          <h4 className="text-[10px] uppercase tracking-[0.35em] font-bold text-white/25">{t.visuals}</h4>
          <DeviceFrame project={project} size="feature" active />
        </div>
      </Reveal>

      {/* Case Study Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20 mb-40 border-t border-white/10 pt-20">
        
        {/* Challenge */}
        <Reveal delay={0.5} direction="up">
          <div className="space-y-8">
            <div className="flex items-center gap-4 text-white/40">
              <Target className="w-5 h-5" />
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold">{t.challenge}</h4>
            </div>
            <p className="text-xl text-white leading-relaxed font-medium">
              {language === 'EN' ? project.challenge.EN : project.challenge.FR}
            </p>
          </div>
        </Reveal>

        {/* Solution */}
        <Reveal delay={0.6} direction="up">
          <div className="space-y-8">
            <div className="flex items-center gap-4 text-white/40">
              <Zap className="w-5 h-5" />
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold">{t.solution}</h4>
            </div>
            <p className="text-xl text-white/60 leading-relaxed">
              {language === 'EN' ? project.solution.EN : project.solution.FR}
            </p>
          </div>
        </Reveal>

        {/* Impact */}
        <Reveal delay={0.7} direction="up">
          <div className="space-y-8">
            <div className="flex items-center gap-4 text-white/40">
              <CheckCircle2 className="w-5 h-5" />
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold">{t.impact}</h4>
            </div>
            <p className="text-xl text-white/60 leading-relaxed">
              {language === 'EN' ? project.impact.EN : project.impact.FR}
            </p>
          </div>
        </Reveal>

      </div>

      {/* Technical Details & Role */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 py-20 border-y border-white/5 bg-white/[0.01] px-10 rounded-[3rem]">
        
        <Reveal delay={0.8}>
          <div>
            <h4 className="text-[10px] uppercase tracking-widest text-white/30 mb-8 font-bold">{t.tech}</h4>
            <div className="flex flex-wrap gap-3">
              {project.techStack.map((tech) => (
                <span key={tech} className="px-5 py-2 border border-white/10 rounded-full text-sm text-gray-400">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.9}>
          <div>
            <h4 className="text-[10px] uppercase tracking-widest text-white/30 mb-8 font-bold">{t.role}</h4>
            <p className="text-3xl font-bold text-white tracking-tight italic">
               {language === 'EN' ? project.role.EN : project.role.FR}
            </p>
          </div>
        </Reveal>

      </div>

    </div>
  )
}

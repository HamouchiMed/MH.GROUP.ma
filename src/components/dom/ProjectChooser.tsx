'use client'

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, ExternalLink, X } from 'lucide-react'
import TransitionLink from './TransitionLink'
import { useStore } from '@/store/useStore'
import { playHoverSound } from '@/lib/audio'
import type { ProjectData } from '@/lib/projectsData'

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.38 6.84 9.74.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.38-3.37-1.38-.45-1.18-1.1-1.49-1.1-1.49-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.33 1.11 2.9.85.09-.66.35-1.11.64-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.3.1-2.72 0 0 .84-.27 2.75 1.05A9.17 9.17 0 0 1 12 6.9c.85 0 1.71.12 2.51.35 1.9-1.32 2.74-1.05 2.74-1.05.55 1.42.2 2.46.1 2.72.64.72 1.02 1.64 1.02 2.76 0 3.94-2.35 4.81-4.58 5.06.36.32.68.95.68 1.92 0 1.38-.01 2.49-.01 2.83 0 .27.18.59.69.48A10.03 10.03 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" />
  </svg>
)

/**
 * A per-project chooser. Clicking a project on the homepage opens this instead
 * of jumping straight to the case page, so the visitor decides what they want:
 * the full case study, the source, or the live site. Only actions the project
 * actually has are shown.
 */
export default function ProjectChooser({
  project,
  onClose,
}: {
  project: ProjectData
  onClose: () => void
}) {
  const { language, setCursorText } = useStore()
  const t = language === 'EN'

  // Keep the latest onClose reachable without making it an effect dependency —
  // it's an inline arrow in the parent, so depending on it would re-run this
  // effect every render and its setCursorText cleanup would loop.
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  // Lock body scroll and wire Esc while open. Runs once; the enter animation is
  // pure CSS (resting state is visible) so the modal never depends on rAF/JS.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onCloseRef.current()
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      setCursorText(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const actions = [
    {
      key: 'case',
      internal: true,
      href: `/work/${project.slug}`,
      label: t ? 'Read the case study' : 'Lire l’étude de cas',
      hint: t ? 'Constraint, decision, outcome' : 'Contrainte, décision, résultat',
      Icon: ArrowUpRight,
    },
    project.liveUrl && {
      key: 'live',
      internal: false,
      href: project.liveUrl,
      label: t ? 'Visit live site' : 'Voir le site en ligne',
      hint: t ? 'Opens in a new tab' : 'Ouvre un nouvel onglet',
      Icon: ExternalLink,
    },
    project.githubUrl && {
      key: 'code',
      internal: false,
      href: project.githubUrl,
      label: t ? 'View source code' : 'Voir le code source',
      hint: t ? 'Opens in a new tab' : 'Ouvre un nouvel onglet',
      Icon: GithubIcon,
    },
  ].filter(Boolean) as {
    key: string
    internal: boolean
    href: string
    label: string
    hint: string
    Icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement
  }[]

  const rowClass =
    'group/row flex items-center gap-5 rounded-2xl border border-white/8 bg-white/[0.02] px-6 py-5 text-left transition-all duration-500 hover:border-white/25 hover:bg-white/[0.05]'

  // Portal to <body> so the fixed overlay is measured against the viewport, not
  // trapped by an ancestor with transform / will-change (which would size its
  // inset-0 to the whole page and shove the panel thousands of px off-screen).
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
    >
      <div className="chooser-backdrop-in absolute inset-0 bg-black/70 backdrop-blur-xl" />

      <div
        onClick={(e) => e.stopPropagation()}
        className="chooser-panel-in relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a]/90 p-8 shadow-2xl md:p-10"
      >
        <button
          onClick={onClose}
          aria-label={t ? 'Close' : 'Fermer'}
          onMouseEnter={() => setCursorText('CLOSE')}
          onMouseLeave={() => setCursorText(null)}
          className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all duration-500 hover:border-white/40 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <p className="mb-3 text-[9px] uppercase tracking-[0.4em] text-white/25">
          {t ? project.category.EN : project.category.FR}
        </p>
        <h3 className="mb-8 text-3xl font-black uppercase leading-none tracking-tighter text-white md:text-4xl">
          {project.title}
        </h3>

        <div className="flex flex-col gap-3">
          {actions.map(({ key, internal, href, label, hint, Icon }) => {
            const inner = (
              <>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all duration-500 group-hover/row:bg-white group-hover/row:text-black">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">{label}</span>
                  <span className="text-[10px] tracking-wide text-white/30">{hint}</span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-white/20 transition-all duration-500 group-hover/row:translate-x-1 group-hover/row:-translate-y-1 group-hover/row:text-white" />
              </>
            )

            if (internal) {
              return (
                <TransitionLink
                  key={key}
                  href={href}
                  onClick={onClose}
                  onMouseEnter={() => {
                    setCursorText('GO')
                    playHoverSound()
                  }}
                  onMouseLeave={() => setCursorText(null)}
                  className={rowClass}
                >
                  {inner}
                </TransitionLink>
              )
            }

            return (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => {
                  setCursorText('OPEN')
                  playHoverSound()
                }}
                onMouseLeave={() => setCursorText(null)}
                className={rowClass}
              >
                {inner}
              </a>
            )
          })}
        </div>
      </div>
    </div>,
    document.body
  )
}

'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useStore } from '@/store/useStore'
import { playHoverSound } from '@/lib/audio'
import { prefersReducedMotion } from '@/lib/utils'
import { Volume2, MousePointer2, Languages, X } from 'lucide-react'

const ONBOARDED_KEY = 'mh:onboarded'

const hints = [
  {
    icon: <Languages className="w-4 h-4" />,
    text: {
      EN: 'Read it in English or French — switch in the header.',
      FR: 'Lisible en français ou en anglais — bascule dans l’en-tête.',
    },
  },
  {
    icon: <Volume2 className="w-4 h-4" />,
    text: {
      EN: 'Sound is off by default. Turn it on for the full mix.',
      FR: 'Le son est coupé par défaut. Activez-le pour l’expérience complète.',
    },
  },
  {
    icon: <MousePointer2 className="w-4 h-4" />,
    text: {
      EN: 'The cursor reacts — it labels whatever it is hovering.',
      FR: 'Le curseur réagit — il annonce ce qu’il survole.',
    },
  },
]

/**
 * A dismissible corner hint, shown once per browser.
 *
 * This used to be three full-screen cards you had to click through before the
 * site appeared. Nobody arrives at a portfolio wanting a tutorial, so it now
 * sits out of the way and disappears the moment you start scrolling.
 */
export default function Onboarding() {
  const { language, isOnboarding, setOnboarding, setCursorText } = useStore()
  const containerRef = useRef<HTMLDivElement>(null)
  const dismissing = useRef(false)

  const dismiss = (withSound = false) => {
    if (dismissing.current) return
    dismissing.current = true
    if (withSound) playHoverSound()

    try {
      localStorage.setItem(ONBOARDED_KEY, '1')
    } catch {
      /* private mode — it will just show again next visit */
    }

    setCursorText(null)

    if (containerRef.current && !prefersReducedMotion()) {
      gsap.to(containerRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: 'power3.in',
        onComplete: () => setOnboarding(false),
      })
    } else {
      setOnboarding(false)
    }
  }

  useEffect(() => {
    if (!isOnboarding) return
    dismissing.current = false

    if (!prefersReducedMotion()) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, delay: 0.4, ease: 'power3.out' }
      )
    }

    // Get out of the way as soon as the visitor engages with the page.
    const startY = window.scrollY
    const onScroll = () => {
      if (Math.abs(window.scrollY - startY) > 240) dismiss()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    const timer = window.setTimeout(() => dismiss(), 14000)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnboarding])

  if (!isOnboarding) return null

  return (
    <div
      ref={containerRef}
      role="note"
      className="fixed bottom-6 left-6 z-[900] w-[min(20rem,calc(100vw-3rem))] rounded-[2rem] border border-white/10 bg-[#0a0a0a]/90 p-6 shadow-2xl backdrop-blur-2xl"
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30">
          {language === 'EN' ? 'Three quick things' : 'Trois détails'}
        </p>
        <button
          onClick={() => dismiss(true)}
          onMouseEnter={() => setCursorText('CLOSE')}
          onMouseLeave={() => setCursorText(null)}
          aria-label={language === 'EN' ? 'Dismiss' : 'Fermer'}
          className="-mr-1 -mt-1 rounded-full p-1 text-white/30 transition-colors hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <ul className="flex flex-col gap-4">
        {hints.map((hint, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-[1px] shrink-0 rounded-xl border border-white/5 bg-white/5 p-2 text-white/40">
              {hint.icon}
            </span>
            <span className="text-[13px] leading-relaxed text-white/50">
              {language === 'EN' ? hint.text.EN : hint.text.FR}
            </span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => dismiss(true)}
        onMouseEnter={() => setCursorText('GOT IT')}
        onMouseLeave={() => setCursorText(null)}
        className="mt-6 w-full rounded-full bg-white px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-black transition-transform duration-300 hover:scale-[1.02] active:scale-95"
      >
        {language === 'EN' ? 'Got it' : 'Compris'}
      </button>
    </div>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'
import { useProgress } from '@react-three/drei'
import { gsap } from '@/lib/gsap'
import { useStore } from '@/store/useStore'
import { prefersReducedMotion } from '@/lib/utils'

const VISITED_KEY = 'mh:visited'
const ONBOARDED_KEY = 'mh:onboarded'

/** Never hold the door shut longer than this, whatever the loader reports. */
const MAX_WAIT_SECONDS = 5
/** Long enough to read the number, short enough not to cost a visitor. */
const MIN_WAIT_SECONDS = 0.7

export default function Preloader() {
  const { progress, total } = useProgress()
  const { isLoading, setLoading, setOnboarding } = useStore()
  const containerRef = useRef<HTMLDivElement>(null)
  const [displayProgress, setDisplayProgress] = useState(0)
  const revealed = useRef(false)

  // Keep the live loader numbers in refs so the rAF loop below can read them
  // without restarting on every drei update.
  const progressRef = useRef(0)
  const totalRef = useRef(0)

  useEffect(() => {
    progressRef.current = progress
    totalRef.current = total
  }, [progress, total])

  useEffect(() => {
    const finish = () => {
      if (revealed.current) return
      revealed.current = true

      const done = () => {
        setLoading(false)
        try {
          sessionStorage.setItem(VISITED_KEY, '1')
          if (localStorage.getItem(ONBOARDED_KEY) !== '1') setOnboarding(true)
        } catch {
          /* private mode — just skip the hint */
        }
      }

      if (containerRef.current && !prefersReducedMotion()) {
        gsap.to(containerRef.current, { yPercent: -100, duration: 1.1, ease: 'power4.inOut', onComplete: done })
      } else {
        done()
      }
    }

    // Returning within the same session: no one wants to watch this twice.
    try {
      if (sessionStorage.getItem(VISITED_KEY) === '1') {
        setLoading(false)
        return
      }
    } catch {
      /* storage blocked — fall through and show the loader */
    }

    const start = performance.now()
    let eased = 0
    let frame = 0

    const loop = (now: number) => {
      const elapsed = (now - start) / 1000

      // drei reports total 0 until something registers with the loading
      // manager, so give it a beat before trusting an empty queue.
      const real = elapsed < 0.5 ? progressRef.current : totalRef.current === 0 ? 100 : progressRef.current

      // A slowly climbing floor keeps the counter alive if an asset stalls,
      // without ever letting it claim to be finished.
      const floor = Math.min(96, (elapsed / 4) * 100)
      const target = Math.min(100, Math.max(real, floor))

      eased += (target - eased) * 0.12
      setDisplayProgress(Math.min(100, Math.round(eased)))

      if ((eased > 99.3 && elapsed > MIN_WAIT_SECONDS) || elapsed > MAX_WAIT_SECONDS) {
        setDisplayProgress(100)
        finish()
        return
      }

      frame = requestAnimationFrame(loop)
    }

    frame = requestAnimationFrame(loop)

    // requestAnimationFrame never fires in a background tab, and links from
    // LinkedIn or WhatsApp routinely open in one. Without this the counter is
    // still sitting at 00% when the visitor finally switches over.
    const failsafe = window.setTimeout(() => {
      setDisplayProgress(100)
      finish()
    }, (MAX_WAIT_SECONDS + 0.5) * 1000)

    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(failsafe)
    }
  }, [setLoading, setOnboarding])

  if (!isLoading) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black text-white"
    >
      <div className="flex flex-col items-center">
        <div className="text-[10px] uppercase tracking-[0.5em] text-white/30 mb-8 animate-pulse font-bold">
          Loading Experience
        </div>
        <div className="relative">
          <div className="text-[15vw] font-black tracking-tighter tabular-nums leading-none opacity-10 select-none">{displayProgress.toString().padStart(2, '0')}</div>
          <div className="absolute inset-0 flex items-center justify-center text-8xl font-bold tracking-tighter tabular-nums">{displayProgress}%</div>
        </div>
        <div className="mt-12 w-48 h-[1px] bg-white/10 relative overflow-hidden">
           <div className="absolute top-0 left-0 h-full bg-white transition-all duration-100" style={{ width: `${displayProgress}%` }} />
        </div>
      </div>
    </div>
  )
}

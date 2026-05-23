'use client'

import { useEffect, useRef, useState } from 'react'
import { useProgress } from '@react-three/drei'
import { gsap } from '@/lib/gsap'
import { useStore } from '@/store/useStore'

export default function Preloader() {
  const { progress } = useProgress()
  const { isLoading, setLoading, setOnboarding } = useStore()
  const containerRef = useRef<HTMLDivElement>(null)
  const [displayProgress, setDisplayProgress] = useState(0)
  const revealed = useRef(false)

  useEffect(() => {
    const counterObj = { value: 0 }
    
    const tl = gsap.timeline({
      onComplete: () => {
        revealSite()
      }
    })

    tl.to(counterObj, {
      value: 100,
      duration: 2.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        setDisplayProgress(Math.floor(counterObj.value))
      }
    })

    const revealSite = () => {
      if (revealed.current) return
      revealed.current = true

      if (containerRef.current) {
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1.5,
          ease: 'power4.inOut',
          onComplete: () => {
            setLoading(false)
            setOnboarding(true)
          }
        })
      } else {
        setLoading(false)
        setOnboarding(true)
      }
    }

    if (progress === 100 && displayProgress === 100) {
      revealSite()
    }

    return () => {
      tl.kill()
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

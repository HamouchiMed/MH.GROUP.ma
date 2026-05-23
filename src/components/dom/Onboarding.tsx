'use client'

import { useState, useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { useStore } from '@/store/useStore'
import { playHoverSound } from '@/lib/audio'
import Magnetic from './Magnetic'
import { ArrowRight, Volume2, MousePointer2, Globe } from 'lucide-react'

const steps = [
  {
    id: 1,
    title: { EN: 'SYSTEM INITIALIZATION', FR: 'INITIALISATION DU SYSTÈME' },
    desc: { 
      EN: 'Establishing connection to Casablanca node. Experience calibrated for high-performance displays.', 
      FR: 'Établissement de la connexion au nœud de Casablanca. Expérience calibrée pour écrans haute performance.' 
    },
    icon: <Globe className="w-6 h-6" />
  },
  {
    id: 2,
    title: { EN: 'AUDIO-VISUAL SYNC', FR: 'SYNC AUDIO-VISUELLE' },
    desc: { 
      EN: 'This experience uses generative audio. Toggle the sound icon in the header for full immersion.', 
      FR: 'Cette expérience utilise de l’audio génératif. Activez l’icône sonore pour une immersion totale.' 
    },
    icon: <Volume2 className="w-6 h-6" />
  },
  {
    id: 3,
    title: { EN: 'HAPTIC MAPPING', FR: 'CARTOGRAPHIE HAPTIQUE' },
    desc: { 
      EN: 'Interactive elements respond to your intent. Watch the custom cursor for contextual intelligence.', 
      FR: 'Les éléments interactifs répondent à votre intention. Observez le curseur pour des indices contextuels.' 
    },
    icon: <MousePointer2 className="w-6 h-6" />
  }
]

export default function Onboarding() {
  const { language, isOnboarding, setOnboarding, setCursorText } = useStore()
  const [currentStep, setCurrentStep] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOnboarding) return
    gsap.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 1, ease: 'power4.out' })
  }, [isOnboarding])

  const handleNext = () => {
    playHoverSound()
    if (currentStep < steps.length - 1) {
      gsap.to(`#step-${currentStep}`, {
        y: -100,
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: 'power4.inOut',
        onComplete: () => setCurrentStep(prev => prev + 1)
      })
    } else {
      gsap.to(containerRef.current, {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: 'power4.inOut',
        onComplete: () => setOnboarding(false)
      })
    }
  }

  if (!isOnboarding) return null

  return (
    <div ref={containerRef} className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-3xl">
      <div className="relative w-[90%] max-w-lg h-[400px]">
        {steps.map((step, index) => {
          if (index < currentStep) return null
          const isCurrent = index === currentStep
          return (
            <div 
              key={step.id}
              id={`step-${index}`}
              className="absolute inset-0 bg-[#0a0a0a] border border-white/10 rounded-[3rem] p-10 flex flex-col justify-between shadow-2xl transition-all duration-700 ease-out"
              style={{ 
                zIndex: steps.length - index,
                transform: `scale(${1 - (index - currentStep) * 0.05}) translateY(${(index - currentStep) * 20}px)`,
                opacity: isCurrent ? 1 : 0.4,
                filter: isCurrent ? 'none' : 'blur(2px)'
              }}
            >
              <div>
                <div className="flex items-center gap-4 mb-8 text-white/20">
                  <div className="p-3 bg-white/5 rounded-2xl border border-white/5">{step.icon}</div>
                  <span className="text-[10px] font-mono tracking-widest uppercase">0{step.id} / 03</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-6 leading-tight">
                   {language === 'EN' ? step.title.EN : step.title.FR}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                  {language === 'EN' ? step.desc.EN : step.desc.FR}
                </p>
              </div>
              <div className="flex justify-end">
                <Magnetic strength={0.2}>
                  <button 
                    onMouseEnter={() => setCursorText(index === steps.length - 1 ? "ENTER" : "NEXT")}
                    onMouseLeave={() => setCursorText(null)}
                    onClick={handleNext}
                    className="flex items-center gap-4 bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all duration-300"
                  >
                    {index === steps.length - 1 ? (language === 'EN' ? 'ENTER EXPERIENCE' : 'ENTRER') : (language === 'EN' ? 'CONTINUE' : 'CONTINUER')}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Magnetic>
              </div>
            </div>
          )
        })}
      </div>
      <div className="absolute bottom-10 text-[9px] uppercase tracking-[0.4em] text-white/10 font-bold">System Identity Check: Mohamed Hamouchi // {language}</div>
    </div>
  )
}

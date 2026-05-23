'use client'

import Reveal from '@/components/dom/Reveal'
import TransitionLink from '@/components/dom/TransitionLink'
import { ArrowLeft } from 'lucide-react'
import { useStore } from '@/store/useStore'

export default function NotFound() {
  const { language } = useStore()

  const t = {
    EN: {
      title: 'Lost in Space',
      desc: 'The page you are looking for has drifted beyond the horizon.',
      back: 'Return Home'
    },
    FR: {
      title: 'Perdu dans l’Espace',
      desc: 'La page que vous recherchez a dérivé au-delà de l’horizon.',
      back: 'Retour à l’Accueil'
    }
  }

  const content = language === 'EN' ? t.EN : t.FR

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center text-center px-10">
      <Reveal>
        <h1 className="text-[20vw] font-black tracking-tighter opacity-10 select-none leading-none">404</h1>
      </Reveal>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <Reveal delay={0.2}>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">{content.title}</h2>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="text-white/40 text-lg mb-12 max-w-md">{content.desc}</p>
        </Reveal>
        <Reveal delay={0.4}>
          <TransitionLink href="/" className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-3 hover:scale-105 transition-transform">
            <ArrowLeft className="w-4 h-4" /> {content.back}
          </TransitionLink>
        </Reveal>
      </div>
    </div>
  )
}

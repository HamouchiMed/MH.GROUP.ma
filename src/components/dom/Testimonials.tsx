'use client'

import Reveal from './Reveal'
import { useStore } from '@/store/useStore'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    company: 'JobiStart.Fr',
    role: { EN: 'Tech Lead', FR: 'Lead Tech' },
    quote: {
      EN: "Mohamed showed exceptional autonomy during his internship. His ability to integrate complex marketing APIs while maintaining backend security was impressive.",
      FR: "Mohamed a fait preuve d'une autonomie exceptionnelle pendant son stage. Sa capacité à intégrer des APIs marketing complexes tout en maintenant la sécurité backend était impressionnante."
    },
    name: 'Collaborator at JobiStart'
  },
  {
    company: 'SIENDO Group',
    role: { EN: 'Senior Mobile Developer', FR: 'Développeur Mobile Senior' },
    quote: {
      EN: "A fast learner who immediately understood our mobile authentication requirements. The module he built is now a standard part of our React Native workflow.",
      FR: "Un apprentissage rapide qui a immédiatement compris nos exigences d'authentification mobile. Le module qu'il a construit fait désormais partie de notre workflow React Native."
    },
    name: 'Internship Supervisor'
  },
  {
    company: 'Obbo Mobile',
    role: { EN: 'Client / Founder', FR: 'Client / Fondateur' },
    quote: {
      EN: "Beyond his technical full-stack skills, Mohamed's eye for branding and visual identity helped turn our vision into a professional market-ready MVP.",
      FR: "Au-delà de ses compétences full-stack, l'œil de Mohamed pour le branding et l'identité visuelle a aidé à transformer notre vision en un MVP professionnel prêt pour le marché."
    },
    name: 'Obbo Founder'
  }
]

export default function Testimonials() {
  const { language } = useStore()

  return (
    <section className="py-32 px-10 md:px-20 border-t border-white/5">
      <div className="mb-20 text-center">
        <Reveal>
          <h2 className="text-[10px] uppercase tracking-[0.5em] text-white/20 mb-4">
            {language === 'EN' ? 'Social Proof' : 'Preuves Sociales'}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic text-white/40">
             {language === 'EN' ? 'RELIABLE COLLABORATIONS' : 'COLLABORATIONS FIABLES'}
          </h3>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {testimonials.map((item, i) => (
          <Reveal key={item.company} delay={i * 0.1}>
            <div className="h-full p-10 bg-white/[0.02] border border-white/5 rounded-[2.5rem] flex flex-col justify-between group hover:border-white/20 transition-all duration-700">
              <div>
                <Quote className="w-8 h-8 text-white/10 mb-8 group-hover:text-white/30 transition-colors" />
                <p className="text-lg text-white font-medium leading-relaxed italic mb-10">
                  "{language === 'EN' ? item.quote.EN : item.quote.FR}"
                </p>
              </div>
              
              <div className="pt-8 border-t border-white/5">
                <p className="text-white font-bold uppercase tracking-widest text-xs mb-1">{item.name}</p>
                <p className="text-white/30 text-[10px] uppercase tracking-widest font-bold">
                  {item.company} &nbsp; • &nbsp; {language === 'EN' ? item.role.EN : item.role.FR}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

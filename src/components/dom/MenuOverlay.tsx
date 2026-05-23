'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useStore } from '@/store/useStore'
import TransitionLink from './TransitionLink'
import Magnetic from './Magnetic'
import ScrambleText from './ScrambleText'
import MagneticHeading from './MagneticHeading'

const menuLinks = [
  { name: 'Home', href: '/' },
  { name: 'Work', href: '/#work' },
  { name: 'About', href: '/#about' },
  { name: 'Contact', href: '/#contact' },
]

export default function MenuOverlay() {
  const { isMenuOpen, setMenuOpen, language, setCursorText } = useStore()
  const overlayRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!overlayRef.current || !linksRef.current) return

    if (isMenuOpen) {
      gsap.to(overlayRef.current, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.2,
        ease: 'power4.inOut',
      })
      
      gsap.fromTo(
        '.menu-item',
        { yPercent: 100, opacity: 0, rotateX: -30 },
        { 
          yPercent: 0, 
          opacity: 1, 
          rotateX: 0,
          duration: 1, 
          stagger: 0.1, 
          ease: 'power4.out',
          delay: 0.4
        }
      )
    } else {
      gsap.to(overlayRef.current, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 1,
        ease: 'power4.inOut',
      })
    }
  }, [isMenuOpen])

  return (
    <div 
      ref={overlayRef} 
      className="fixed inset-0 bg-black z-[100] text-white px-10 md:px-20 py-32 flex flex-col justify-between"
      style={{ clipPath: 'inset(0% 0% 100% 0%)' }}
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black opacity-[0.02] select-none pointer-events-none uppercase">
         {language === 'EN' ? 'Menu' : 'Menu'}
      </div>

      <div className="flex flex-col md:flex-row justify-between h-full w-full relative z-10">
        
        {/* Navigation Links */}
        <div ref={linksRef} className="flex flex-col gap-4 mt-20 md:mt-0 perspective-1000">
          {menuLinks.map((link) => (
            <div key={link.name} className="overflow-hidden">
              <TransitionLink 
                href={link.href} 
                className="menu-item block group"
              >
                <div 
                  onClick={() => setMenuOpen(false)}
                  onMouseEnter={() => setCursorText("GO")}
                  onMouseLeave={() => setCursorText(null)}
                >
                  <MagneticHeading 
                    text={language === 'EN' ? link.name : (link.name === 'Home' ? 'Accueil' : link.name)} 
                    className="text-4xl md:text-[4vw] font-black uppercase tracking-tighter group-hover:italic group-hover:text-white transition-all duration-500 leading-none"
                  />
                </div>
              </TransitionLink>
            </div>
          ))}
        </div>

        {/* Info & Socials */}
        <div className="flex flex-col justify-end gap-16 pb-10">
          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-bold border-b border-white/5 pb-4">Socials</h4>
            <div className="flex flex-col gap-3">
              {[
                { name: 'Github', href: 'https://github.com/HamouchiMed' },
                { name: 'LinkedIn', href: 'https://linkedin.com/in/mohamed-hamouchi-5093743a8' },
                { name: 'WhatsApp', href: 'https://wa.me/212687709337' },
                { name: 'Instagram', href: 'https://www.instagram.com/_.fmmed._/' }
              ].map((social) => (
                <Magnetic key={social.name} strength={0.2}>
                  <a 
                    href={social.href} 
                    target="_blank" 
                    onMouseEnter={() => setCursorText(social.name === 'WhatsApp' ? 'WHATSAPP' : 'LINK')}
                    onMouseLeave={() => setCursorText(null)}
                    className={`text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors block w-fit ${social.name === 'WhatsApp' ? 'hover:text-green-400' : ''}`}
                  >
                    <ScrambleText text={social.name} />
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-bold border-b border-white/5 pb-4">Get in touch</h4>
            <Magnetic strength={0.1}>
              <a 
                href="mailto:mohamedhamouchi2006@gmail.com" 
                onMouseEnter={() => setCursorText("SAY HI")}
                onMouseLeave={() => setCursorText(null)}
                className="text-xs md:text-sm font-bold text-white/50 hover:text-white transition-all duration-300 block w-fit tracking-tight"
              >
                mohamedhamouchi2006@gmail.com
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* Close indicator hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.5em] text-white/10 font-bold animate-pulse pointer-events-none">
         Click toggle to close
      </div>
    </div>
  )
}

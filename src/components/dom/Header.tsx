'use client'

import { useState, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { useStore } from '@/store/useStore'
import Magnetic from './Magnetic'
import TransitionLink from './TransitionLink'
import LocalTime from './LocalTime'
import AudioToggle from './AudioToggle'
import MenuOverlay from './MenuOverlay'

export default function Header() {
  const { isMenuOpen, setMenuOpen, language, setLanguage, setCursorText } = useStore()

  // Animate header in after load
  useEffect(() => {
    gsap.fromTo(
      '#main-header',
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, delay: 2.2, ease: 'power4.out' }
    )
  }, [])

  return (
    <>
      <div className="fixed top-0 left-0 w-full flex justify-center z-50 pointer-events-none p-4">
        <header 
          id="main-header"
          className="w-full max-w-3xl pointer-events-auto relative overflow-hidden"
        >
          {/* Glass Background */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl rounded-full border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]" />
          
          <div className="relative px-6 py-2 flex justify-between items-center w-full text-white">
            
            {/* Left: Logo & Local Time */}
            <div className="flex items-center gap-6 w-1/3">
              <Magnetic strength={0.1}>
                <div 
                  onMouseEnter={() => setCursorText("REBOOT")}
                  onMouseLeave={() => setCursorText(null)}
                >
                  <TransitionLink href="/" className="group flex flex-col uppercase font-bold tracking-widest text-[10px] relative overflow-hidden">
                    <span className="group-hover:-translate-y-full transition-transform duration-500">MH.GROUP</span>
                    <span className="absolute top-full left-0 group-hover:-translate-y-full transition-transform duration-500">MH.GROUP</span>
                  </TransitionLink>
                </div>
              </Magnetic>
              <div className="hidden lg:block opacity-40">
                <LocalTime />
              </div>
            </div>

            {/* Center: Language Switcher */}
            <div className="hidden md:flex justify-center w-1/3 text-[9px] uppercase tracking-widest font-bold">
              <Magnetic strength={0.2}>
                <button 
                  onMouseEnter={() => setCursorText("LANGUAGE")}
                  onMouseLeave={() => setCursorText(null)}
                  onClick={() => setLanguage(language === 'EN' ? 'FR' : 'EN')}
                  className="hover:opacity-50 transition-opacity px-4 py-2"
                >
                  {language === 'EN' ? 'EN / FR' : 'FR / EN'}
                </button>
              </Magnetic>
            </div>

            {/* Right: Sound & Menu Toggle */}
            <div className="flex items-center justify-end gap-6 w-1/3">
              <div 
                className="hidden md:block scale-90 origin-right"
                onMouseEnter={() => setCursorText("AMBIENCE")}
                onMouseLeave={() => setCursorText(null)}
              >
                <AudioToggle />
              </div>

              <Magnetic strength={0.3}>
                <button 
                  onMouseEnter={() => setCursorText(isMenuOpen ? "CLOSE" : "NAVIGATE")}
                  onMouseLeave={() => setCursorText(null)}
                  onClick={() => setMenuOpen(!isMenuOpen)}
                  className="flex flex-col gap-1 w-6 h-6 justify-center items-end group z-50 relative"
                >
                  <span className={`h-[1px] bg-white transition-all duration-300 ${isMenuOpen ? 'w-full rotate-45 translate-y-[3px]' : 'w-full group-hover:w-3/4'}`} />
                  <span className={`h-[1px] bg-white transition-all duration-300 ${isMenuOpen ? 'w-full -rotate-45 -translate-y-[3px]' : 'w-2/3 group-hover:w-full'}`} />
                </button>
              </Magnetic>
            </div>

          </div>
        </header>
      </div>

      {/* Full-Screen Menu Overlay */}
      <MenuOverlay />
    </>
  )
}

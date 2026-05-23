'use client'

import { useEffect, useState } from 'react'

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' }
]

export default function ScrollIndicator() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    // Determine active section based on scroll position
    const sectionElements = sections.map(s => ({
      id: s.id,
      el: document.getElementById(s.id)
    }))

    let rafId = 0

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3
      
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const { id, el } = sectionElements[i]
        if (el && scrollPos >= el.offsetTop) {
          setActiveSection(id)
          break
        }
      }
    }

    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(handleScroll)
    }

    handleScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className="fixed right-10 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-8 items-center">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className="group relative flex items-center justify-end"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          <span className={`absolute right-8 text-[9px] uppercase tracking-widest font-bold transition-all duration-500 opacity-0 group-hover:opacity-100 ${
            activeSection === section.id ? 'opacity-100 mr-2 text-white' : 'text-white/30'
          }`}>
            {section.label}
          </span>
          <div className={`w-[2px] transition-all duration-500 rounded-full ${
            activeSection === section.id 
              ? 'h-10 bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]' 
              : 'h-2 bg-white/20 hover:bg-white/50'
          }`} />
        </a>
      ))}
    </div>
  )
}

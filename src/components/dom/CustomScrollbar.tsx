'use client'

import { useEffect, useState } from 'react'

const sections = [
  { id: 'hero', num: '01' },
  { id: 'work', num: '02' },
  { id: 'about', num: '03' },
  { id: 'contact', num: '04' }
]

export default function CustomScrollbar() {
  const [activeSection, setActiveSection] = useState('01')
  const [scrollPercent, setScrollPercent] = useState(0)

  useEffect(() => {
    let rafId = 0

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2
      const sectionElements = sections.map(s => document.getElementById(s.id))
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight
      const nextPercent = scrollTotal > 0 ? (window.scrollY / scrollTotal) * 100 : 0
      
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i]
        if (el && scrollPos >= el.offsetTop) {
          setActiveSection(sections[i].num)
          break
        }
      }

      setScrollPercent(nextPercent)
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
    <div className="fixed right-4 top-0 h-full w-[1px] z-50 pointer-events-none hidden lg:block">
      {/* Background Line */}
      <div className="absolute inset-0 bg-white/5" />
      
      {/* Moving Indicator */}
      <div 
        className="absolute right-0 flex items-center justify-center transition-all duration-700 ease-out"
        style={{ top: `${scrollPercent}%` }}
      >
        <div className="relative">
          {/* Glowing dot */}
          <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]" />
          
          {/* Section Number */}
          <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[9px] font-mono font-bold text-white/40 tracking-tighter">
            {activeSection}
          </span>
        </div>
      </div>
    </div>
  )
}

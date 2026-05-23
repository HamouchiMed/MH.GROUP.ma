'use client'

import { useEffect } from 'react'
import { useStore } from '@/store/useStore'
import { toggleBackgroundDrone } from '@/lib/audio'
import Magnetic from './Magnetic'

export default function AudioToggle() {
  const { isMuted, setMuted } = useStore()

  useEffect(() => {
    toggleBackgroundDrone(!isMuted)
    
    return () => {
      // Ensure we clean up the audio if the component unmounts
      toggleBackgroundDrone(false)
    }
  }, [isMuted])

  return (
    <Magnetic strength={0.2}>
      <button 
        onClick={() => setMuted(!isMuted)}
        className="flex items-center gap-2 group hover:opacity-70 transition-opacity"
      >
        <span className="text-[11px] uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
          Sound
        </span>
        <div className="flex items-end gap-[2px] h-3">
          {[1, 2, 3, 4].map((i) => (
            <span 
              key={i} 
              className={`w-[2px] bg-white transition-all duration-300 ${
                isMuted 
                  ? 'h-[2px]' 
                  : `animate-sound-bar-${i} h-full`
              }`}
              style={!isMuted ? { animationDelay: `${i * 0.1}s` } : {}}
            />
          ))}
        </div>
      </button>
    </Magnetic>
  )
}

'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useStore } from '@/store/useStore'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const { cursorText } = useStore()

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    
    if (!cursor || !follower) return

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      
      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.1,
      })
      
      gsap.to(follower, {
        x: clientX,
        y: clientY,
        duration: 0.6,
        ease: 'power3.out',
      })
    }

    const onMouseDown = () => {
      gsap.to([cursor, follower], { scale: 0.8, duration: 0.3 })
    }

    const onMouseUp = () => {
      gsap.to([cursor, follower], { scale: 1, duration: 0.3 })
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  // Handle Dynamic Cursor Labels
  useEffect(() => {
    const follower = followerRef.current
    const cursor = cursorRef.current
    const label = labelRef.current
    if (!follower || !cursor || !label) return

    if (cursorText) {
      // Expand follower to fit text
      gsap.to(follower, {
        width: 100,
        height: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        duration: 0.5,
        ease: 'power3.out'
      })
      // Hide inner dot
      gsap.to(cursor, { scale: 0, duration: 0.3 })
      // Fade in label
      gsap.to(label, { opacity: 1, duration: 0.3, delay: 0.1 })
    } else {
      // Shrink back to normal
      gsap.to(follower, {
        width: 40,
        height: 40,
        backgroundColor: 'transparent',
        duration: 0.5,
        ease: 'power3.out'
      })
      // Show inner dot
      gsap.to(cursor, { scale: 1, duration: 0.3 })
      // Fade out label
      gsap.to(label, { opacity: 0, duration: 0.2 })
    }
  }, [cursorText])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 border border-white/30 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center overflow-hidden"
      >
        <span 
          ref={labelRef} 
          className="text-[10px] font-black uppercase tracking-widest text-white opacity-0 text-center px-2 pointer-events-none leading-none select-none"
        >
          {cursorText}
        </span>
      </div>
    </>
  )
}

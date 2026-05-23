'use client'

import { useState, useEffect, useRef } from 'react'

const pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890#@$*&%+-_"

export default function ScrambleText({ text, className = "" }: { text: string, className?: string }) {
  const [displayText, setDisplayText] = useState(text)
  const isHovering = useRef(false)
  const intervalRef = useRef<any>(null)

  const scramble = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    let iteration = 0
    
    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index]
            }
            return pool[Math.floor(Math.random() * pool.length)]
          })
          .join("")
      )
      
      if (iteration >= text.length) {
        clearInterval(intervalRef.current)
      }
      
      iteration += 1 / 3
    }, 30)
  }

  const handleMouseEnter = () => {
    isHovering.current = true
    scramble()
  }

  const handleMouseLeave = () => {
    isHovering.current = false
    // Text returns naturally as scramble finishes
  }

  return (
    <span 
      className={`font-mono ${className}`} 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
      {displayText}
    </span>
  )
}

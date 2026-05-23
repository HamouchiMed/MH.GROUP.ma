'use client'

import { useState, useEffect } from 'react'

export default function LocalTime() {
  const [time, setTime] = useState<string>('')
  const [location, setLocation] = useState<string>('BERRECHID, MA')

  useEffect(() => {
    // 1. Fetch user location based on IP
    const fetchLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/')
        const data = await response.json()
        if (data.city && data.country_code) {
          setLocation(`${data.city.toUpperCase()}, ${data.country_code}`)
        }
      } catch (error) {
        console.warn('Could not fetch user location, falling back to default.')
      }
    }

    fetchLocation()

    // 2. Update time based on user's system locale
    const updateTime = () => {
      const now = new Date()
      const formatter = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      })
      setTime(formatter.format(now))
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!time) return <div className="w-24" /> // Placeholder

  return (
    <div className="flex flex-col text-[11px] uppercase tracking-widest text-white/50 text-center items-center">
      <span>{location}</span>
      <span className="text-white">{time}</span>
    </div>
  )
}

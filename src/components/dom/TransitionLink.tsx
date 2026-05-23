'use client'

import { useRouter, usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { playHoverSound } from '@/lib/audio'
import { useStore } from '@/store/useStore'

interface TransitionLinkProps {
  href: string
  children: ReactNode
  className?: string
}

const isExternal = (href: string) =>
  href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')

export default function TransitionLink({ href, children, className }: TransitionLinkProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { setTransitioning } = useStore()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isExternal(href)) return

    if (href.startsWith('#') || (href.includes('#') && href.split('#')[0] === pathname)) {
      e.preventDefault()
      const id = href.split('#')[1]
      const target = id ? document.getElementById(id) : null
      target?.scrollIntoView({ behavior: 'smooth' })
      return
    }

    e.preventDefault()
    
    // Trigger WebGL Liquid Transition
    setTransitioning(true)

    // Delay navigation to let the "melt" effect peak
    setTimeout(() => {
      router.push(href)
      // Fade out the transition after a delay on the new page
      setTimeout(() => {
        setTransitioning(false)
      }, 500)
    }, 800)
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      onMouseEnter={() => playHoverSound()}
      className={className}
      target={isExternal(href) && href.startsWith('http') ? '_blank' : undefined}
      rel={isExternal(href) && href.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  )
}

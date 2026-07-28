'use client'

import { useEffect, useRef, useState } from 'react'

type Options = {
  threshold?: number
  rootMargin?: string
  /** Stop observing after the first intersection. */
  once?: boolean
}

/**
 * Tracks whether an element is on screen. Used to keep project videos paused
 * until they are actually visible — seven autoplaying clips would otherwise
 * decode in parallel on a phone.
 */
export function useInView<T extends HTMLElement>({
  threshold = 0.25,
  rootMargin = '0px',
  once = false,
}: Options = {}) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
        if (entry.isIntersecting && once) observer.disconnect()
      },
      { threshold, rootMargin }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return { ref, inView }
}

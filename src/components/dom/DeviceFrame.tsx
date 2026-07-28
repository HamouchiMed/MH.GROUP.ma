'use client'

import { useEffect, useRef } from 'react'
import { useInView } from '@/lib/useInView'
import { prefersReducedMotion } from '@/lib/utils'
import DeviceScreen from './DeviceScreens'
import type { ProjectData } from '@/lib/projectsData'

type DeviceFrameProps = {
  project: Pick<ProjectData, 'type' | 'screen' | 'media' | 'title'>
  /** Lifts and tilts the device — driven by the parent card's hover state. */
  active?: boolean
  /** Larger, less cropped presentation for the case-study page. */
  size?: 'card' | 'feature'
  className?: string
}

export default function DeviceFrame({ project, active = false, size = 'card', className = '' }: DeviceFrameProps) {
  const { type, screen, media, title } = project
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 })
  const videoRef = useRef<HTMLVideoElement>(null)

  // Only decode video while the device is actually on screen. With seven
  // stacked projects, playing them all at once stalls mid-range phones.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (inView && !prefersReducedMotion()) {
      video.play().catch(() => {
        /* autoplay refused (low power mode) — the poster still shows */
      })
    } else {
      video.pause()
    }
  }, [inView])

  const isPhone = type === 'phone'
  const maxWidth = isPhone
    ? size === 'feature' ? 300 : 236
    : size === 'feature' ? 860 : 560

  const content = media?.video ? (
    <video
      ref={videoRef}
      className="h-full w-full object-cover"
      src={media.video}
      poster={media.poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={media.alt ?? `${title} interface recording`}
    />
  ) : media?.poster ? (
    <img
      src={media.poster}
      alt={media.alt ?? `${title} interface`}
      className="h-full w-full object-cover"
      loading="lazy"
      decoding="async"
    />
  ) : (
    <DeviceScreen variant={screen} />
  )

  return (
    <div
      ref={ref}
      className={`w-full ${className}`}
      style={{ maxWidth, perspective: 1400 }}
    >
      <div
        className="transition-transform duration-1000 ease-out will-change-transform"
        style={{
          transform: active
            ? 'translateY(-10px) rotateX(2deg) rotateY(-4deg) scale(1.02)'
            : 'translateY(0) rotateX(6deg) rotateY(0deg) scale(1)',
        }}
      >
        {isPhone ? (
          <div className="relative mx-auto">
            {/* Side buttons */}
            <span className="absolute -left-[2px] top-[22%] h-8 w-[2px] rounded-l-full bg-white/15" />
            <span className="absolute -left-[2px] top-[34%] h-12 w-[2px] rounded-l-full bg-white/15" />
            <span className="absolute -right-[2px] top-[28%] h-14 w-[2px] rounded-r-full bg-white/15" />

            <div className="rounded-[34px] border border-white/15 bg-gradient-to-b from-[#1a1a1a] to-[#050505] p-[5px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)]">
              <div className="relative aspect-[9/19] overflow-hidden rounded-[29px] bg-black">
                {content}
                {/* Dynamic island */}
                <span className="absolute left-1/2 top-[7px] z-20 h-[14px] w-[62px] -translate-x-1/2 rounded-full bg-black" />
                <Glare active={active} />
              </div>
            </div>
          </div>
        ) : (
          <div className="relative mx-auto">
            <div className="rounded-[12px] border border-white/15 bg-gradient-to-b from-[#1a1a1a] to-[#050505] p-[6px] pb-[10px] shadow-[0_40px_80px_-25px_rgba(0,0,0,0.9)]">
              <span className="absolute left-1/2 top-[3px] h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-white/20" />
              <div className="relative aspect-[16/10] overflow-hidden rounded-[6px] bg-black">
                {content}
                <Glare active={active} />
              </div>
            </div>
            {/* Hinge and base — wider than the lid, like a real laptop deck */}
            <div className="relative left-1/2 h-[9px] w-[112%] -translate-x-1/2 rounded-b-[10px] border-x border-b border-white/10 bg-gradient-to-b from-[#252525] to-[#0a0a0a]">
              <span className="absolute left-1/2 top-[2px] h-[3px] w-[14%] -translate-x-1/2 rounded-full bg-black/70" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/** Moving sheen across the glass — the thing that sells it as a screen. */
function Glare({ active }: { active: boolean }) {
  return (
    <span
      className="pointer-events-none absolute inset-0 z-10 block bg-gradient-to-tr from-transparent via-white/8 to-transparent transition-opacity duration-1000"
      style={{
        opacity: active ? 0.9 : 0.35,
        transform: active ? 'translateX(12%)' : 'translateX(-12%)',
        transitionProperty: 'opacity, transform',
      }}
    />
  )
}

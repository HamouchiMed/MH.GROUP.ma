'use client'

import { useStore } from '@/store/useStore'
import { playHoverSound } from '@/lib/audio'

type SkillVisual = {
  label: string
  caption: string
  accent: string
}

const visuals: Record<string, SkillVisual> = {
  React: {
    label: 'React',
    caption: 'UI architecture and interactions',
    accent: '#61DAFB',
  },
  'Next.js': {
    label: 'Next.js',
    caption: 'Server rendering and routing',
    accent: '#ffffff',
  },
  'Node.js': {
    label: 'Node.js',
    caption: 'Backend runtime and APIs',
    accent: '#339933',
  },
  PostgreSQL: {
    label: 'PostgreSQL',
    caption: 'Reliable data storage',
    accent: '#336791',
  },
  Java: {
    label: 'Java',
    caption: 'Enterprise-grade ecosystem',
    accent: '#ED8B00',
  },
}

export default function TechIcon({ name, size = 220 }: { name: string, size?: number }) {
  const { setCursorText } = useStore()
  const data = visuals[name] ?? {
    label: name,
    caption: 'Technical skill',
    accent: '#ffffff',
  }

  return (
    <div
      onMouseEnter={() => {
        setCursorText(name)
        playHoverSound()
      }}
      onMouseLeave={() => setCursorText(null)}
      className="group relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.02] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-white/25 hover:bg-white/[0.05]"
      style={{ width: size, height: Math.round(size * 0.82) }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent" />
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at center, ${data.accent}20 0%, transparent 60%)`,
        }}
      />

      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        <div className="flex items-center justify-end">
          <div
            className="h-2.5 w-2.5 rounded-full shadow-[0_0_18px_currentColor]"
            style={{ color: data.accent, backgroundColor: data.accent }}
          />
        </div>

        <div className="space-y-4">
          <div className="h-px w-full bg-gradient-to-r from-white/20 via-white/5 to-transparent" />
          <div>
            <p className="text-2xl font-black uppercase tracking-tighter text-white">
              {data.label}
            </p>
            <p className="mt-2 text-[11px] leading-relaxed text-white/55 max-w-[12rem]">
              {data.caption}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

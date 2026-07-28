'use client'

import type { ScreenVariant } from '@/lib/projectsData'

/**
 * Abstract interface schematics rendered inside the device frames.
 *
 * These are deliberately wireframes — no text, no logos, no numbers — so they
 * read as diagrams of a product, never as screenshots of one. They exist so a
 * project card has something structural to show before a real screen capture
 * is dropped into `public/media/<slug>/`; the moment one is, `DeviceFrame`
 * renders that instead.
 */

/**
 * One signature accent per screen variant. The wireframe structure stays
 * neutral grey — only a few focal elements pick up the colour — so the /work
 * grid reads as a spectrum without the schematics turning garish.
 */
const accents = {
  dashboard: { rgb: '34, 211, 238', from: '#0e7490', to: '#22d3ee' }, // cyan — SaaS
  auth: { rgb: '52, 211, 153', from: '#059669', to: '#34d399' }, // emerald — security
  marketplace: { rgb: '245, 158, 11', from: '#b45309', to: '#f59e0b' }, // amber — commerce
  tracking: { rgb: '251, 113, 133', from: '#be123c', to: '#fb7185' }, // rose — live tracking
  editorial: { rgb: '167, 139, 250', from: '#7c3aed', to: '#a78bfa' }, // violet — portfolio
} as const

const Dot = ({ className = '' }: { className?: string }) => (
  <span className={`block h-[3px] w-[3px] shrink-0 rounded-full bg-white/25 ${className}`} />
)

const Bar = ({ w, className = '', style }: { w: string; className?: string; style?: React.CSSProperties }) => (
  <span className={`block h-[3px] rounded-full bg-white/12 ${className}`} style={{ width: w, ...style }} />
)

function ChromeBar() {
  return (
    <div className="flex shrink-0 items-center gap-[5px] border-b border-white/8 px-3 py-2">
      <Dot />
      <Dot className="bg-white/15" />
      <Dot className="bg-white/10" />
      <span className="ml-2 block h-[7px] w-[45%] rounded-full bg-white/[0.06]" />
    </div>
  )
}

/** Admin / SaaS console: sidebar, metric tiles, a chart that grows into place. */
function DashboardScreen() {
  const bars = [42, 68, 35, 88, 54, 74, 46, 92]
  const c = accents.dashboard

  return (
    <div className="flex h-full w-full flex-col bg-[#070707]">
      <ChromeBar />
      <div className="flex min-h-0 flex-1">
        <div className="flex w-[24%] shrink-0 flex-col gap-[7px] border-r border-white/8 p-3">
          <Bar
            w="70%"
            className="h-[4px]"
            style={{ backgroundColor: `rgb(${c.rgb})`, boxShadow: `0 0 6px rgba(${c.rgb}, 0.5)` }}
          />
          {['55%', '45%', '62%', '38%', '50%'].map((w, i) => (
            <Bar key={i} w={w} />
          ))}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-[9px] p-3">
          <div className="flex gap-[6px]">
            <div
              className="flex h-[26px] flex-1 flex-col justify-center gap-[4px] rounded-[3px] px-2"
              style={{ border: `1px solid rgba(${c.rgb}, 0.3)`, backgroundColor: `rgba(${c.rgb}, 0.08)` }}
            >
              <Bar w="55%" style={{ backgroundColor: `rgba(${c.rgb}, 0.85)` }} />
              <Bar w="32%" />
            </div>
            {['bg-white/[0.05]', 'bg-white/[0.04]'].map((bg, i) => (
              <div key={i} className={`flex h-[26px] flex-1 flex-col justify-center gap-[4px] rounded-[3px] border border-white/8 px-2 ${bg}`}>
                <Bar w="55%" className="bg-white/20" />
                <Bar w="32%" />
              </div>
            ))}
          </div>
          <div className="flex min-h-0 flex-1 items-end gap-[5px] rounded-[3px] border border-white/8 bg-white/[0.02] p-2">
            {bars.map((h, i) => (
              <span
                key={i}
                className="device-rise block flex-1 rounded-[1px]"
                style={{
                  height: `${h}%`,
                  animationDelay: `${i * 90}ms`,
                  background: `linear-gradient(to top, ${c.from}, ${c.to})`,
                  boxShadow: h > 85 ? `0 0 8px rgba(${c.rgb}, 0.45)` : undefined,
                }}
              />
            ))}
          </div>
          <div className="flex shrink-0 flex-col gap-[5px]">
            {['82%', '64%', '73%'].map((w, i) => (
              <div key={i} className="flex items-center gap-[6px]">
                <Dot className="bg-white/20" />
                <Bar w={w} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/** Mobile authentication: two fields, a submit action, a biometric pulse. */
function AuthScreen() {
  const c = accents.auth

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-[14px] bg-[#070707] px-5">
      <div
        className="relative mb-2 flex h-9 w-9 items-center justify-center rounded-[10px]"
        style={{ border: `1px solid rgba(${c.rgb}, 0.5)`, backgroundColor: `rgba(${c.rgb}, 0.1)` }}
      >
        <span className="block h-[10px] w-[10px] rounded-[3px]" style={{ border: `1px solid rgba(${c.rgb}, 0.8)` }} />
        <span
          className="device-halo absolute inset-0 rounded-[10px]"
          style={{ border: `1px solid rgba(${c.rgb}, 0.35)` }}
        />
      </div>
      <Bar w="52%" className="h-[5px] bg-white/25" />
      <Bar w="34%" />
      <div className="mt-2 flex w-full flex-col gap-[7px]">
        {[0, 1].map((i) => (
          <div key={i} className="flex h-[22px] items-center rounded-[5px] border border-white/10 bg-white/[0.03] px-2">
            <Bar w={i === 0 ? '48%' : '30%'} />
            {i === 1 && <span className="device-caret ml-[3px] block h-[9px] w-[1px] bg-white/50" />}
          </div>
        ))}
      </div>
      <div
        className="mt-1 flex h-[22px] w-full items-center justify-center rounded-full"
        style={{ background: `linear-gradient(90deg, ${c.from}, ${c.to})`, boxShadow: `0 0 10px rgba(${c.rgb}, 0.45)` }}
      >
        <span className="block h-[3px] w-[30%] rounded-full bg-black/40" />
      </div>
      <Bar w="42%" className="mt-1" />
    </div>
  )
}

/** Marketplace: search, a scrolling result list, a bottom tab bar. */
function MarketplaceScreen() {
  const c = accents.marketplace

  return (
    <div className="flex h-full w-full flex-col bg-[#070707]">
      <div className="flex shrink-0 flex-col gap-[7px] p-3 pt-5">
        <Bar w="45%" className="h-[5px] bg-white/25" />
        <div className="flex h-[18px] items-center gap-[5px] rounded-full border border-white/10 bg-white/[0.03] px-2">
          <span className="block h-[6px] w-[6px] rounded-full" style={{ border: `1px solid rgba(${c.rgb}, 0.7)` }} />
          <Bar w="45%" />
        </div>
        <div className="flex gap-[4px]">
          {['22%', '30%', '26%'].map((w, i) => (
            <span
              key={i}
              className={`block h-[12px] rounded-full ${i === 0 ? '' : 'bg-white/[0.06]'}`}
              style={
                i === 0
                  ? { width: w, backgroundColor: `rgb(${c.rgb})`, boxShadow: `0 0 6px rgba(${c.rgb}, 0.4)` }
                  : { width: w }
              }
            />
          ))}
        </div>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-[6px] overflow-hidden px-3">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="device-enter flex shrink-0 items-center gap-[7px] rounded-[6px] border border-white/8 bg-white/[0.02] p-[6px]"
            style={{ animationDelay: `${i * 120}ms` }}
          >
            <span
              className="block h-[26px] w-[26px] shrink-0 rounded-[4px]"
              style={{ backgroundColor: `rgba(${c.rgb}, 0.18)`, border: `1px solid rgba(${c.rgb}, 0.3)` }}
            />
            <span className="flex min-w-0 flex-1 flex-col gap-[4px]">
              <Bar w="70%" className="bg-white/20" />
              <Bar w="45%" />
            </span>
            <span className="block h-[10px] w-[10px] shrink-0 rounded-full border border-white/15" />
          </div>
        ))}
      </div>
      <div className="flex shrink-0 items-center justify-around border-t border-white/8 px-4 py-[9px]">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`block h-[8px] w-[8px] rounded-[2px] ${i === 0 ? '' : 'bg-white/10'}`}
            style={i === 0 ? { backgroundColor: `rgb(${c.rgb})`, boxShadow: `0 0 6px rgba(${c.rgb}, 0.5)` } : undefined}
          />
        ))}
      </div>
    </div>
  )
}

/** Live tracking: a map with a route, provider pins, and a booking sheet. */
function TrackingScreen() {
  const c = accents.tracking

  return (
    <div className="flex h-full w-full flex-col bg-[#070707]">
      {/* Map surface — faint street grid, a route, and located providers. */}
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '18px 18px',
          }}
        />
        {/* Route line connecting user to the chosen provider. */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d="M22 78 C 40 70, 45 45, 68 34"
            fill="none"
            stroke={`rgb(${c.rgb})`}
            strokeWidth="1.5"
            strokeDasharray="3 3"
            strokeLinecap="round"
            opacity="0.9"
          />
        </svg>
        {/* Destination pin (accent, pulsing) + origin + a nearby provider dot. */}
        <span
          className="device-halo absolute h-[14px] w-[14px] rounded-full"
          style={{ left: '64%', top: '28%', backgroundColor: `rgb(${c.rgb})`, boxShadow: `0 0 10px rgba(${c.rgb}, 0.6)` }}
        />
        <span
          className="absolute h-[7px] w-[7px] rounded-full border-2 border-white/70 bg-[#070707]"
          style={{ left: '20%', top: '76%' }}
        />
        <span
          className="absolute h-[6px] w-[6px] rounded-full"
          style={{ left: '46%', top: '40%', backgroundColor: `rgba(${c.rgb}, 0.45)` }}
        />
      </div>
      {/* Booking sheet: provider row with ETA and a confirm action. */}
      <div className="shrink-0 rounded-t-[12px] border-t border-white/10 bg-white/[0.04] p-3">
        <span className="mx-auto mb-3 block h-[3px] w-[26px] rounded-full bg-white/20" />
        <div className="flex items-center gap-[8px]">
          <span
            className="block h-[26px] w-[26px] shrink-0 rounded-full"
            style={{ backgroundColor: `rgba(${c.rgb}, 0.2)`, border: `1px solid rgba(${c.rgb}, 0.35)` }}
          />
          <span className="flex min-w-0 flex-1 flex-col gap-[4px]">
            <Bar w="60%" className="bg-white/25" />
            <Bar w="38%" />
          </span>
          <span
            className="block h-[12px] rounded-full px-1"
            style={{ width: '22%', backgroundColor: `rgba(${c.rgb}, 0.85)`, boxShadow: `0 0 6px rgba(${c.rgb}, 0.4)` }}
          />
        </div>
        <div
          className="mt-3 flex h-[22px] w-full items-center justify-center rounded-full"
          style={{ background: `linear-gradient(90deg, ${c.from}, ${c.to})`, boxShadow: `0 0 10px rgba(${c.rgb}, 0.4)` }}
        >
          <span className="block h-[3px] w-[34%] rounded-full bg-black/40" />
        </div>
      </div>
    </div>
  )
}

/** Editorial / portfolio: oversized type block and a media grid. */
function EditorialScreen() {
  const c = accents.editorial

  return (
    <div className="flex h-full w-full flex-col bg-[#070707]">
      <ChromeBar />
      <div className="flex min-h-0 flex-1 flex-col justify-center gap-[7px] p-4">
        <span className="block h-[11px] w-[78%] rounded-[2px] bg-white/25" />
        <span
          className="block h-[11px] w-[54%] rounded-[2px]"
          style={{ backgroundColor: `rgba(${c.rgb}, 0.55)` }}
        />
        <div className="mt-3 grid grid-cols-3 gap-[5px]">
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const accented = i % 2 === 0
            return (
              <span
                key={i}
                className="device-enter block h-[22px] rounded-[3px]"
                style={{
                  animationDelay: `${i * 80}ms`,
                  border: accented ? `1px solid rgba(${c.rgb}, 0.3)` : '1px solid rgba(255,255,255,0.08)',
                  backgroundColor: accented ? `rgba(${c.rgb}, 0.16)` : 'rgba(255,255,255,0.035)',
                }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

const screens: Record<ScreenVariant, () => React.ReactElement> = {
  dashboard: DashboardScreen,
  auth: AuthScreen,
  marketplace: MarketplaceScreen,
  tracking: TrackingScreen,
  editorial: EditorialScreen,
}

export default function DeviceScreen({ variant }: { variant: ScreenVariant }) {
  const Screen = screens[variant] ?? DashboardScreen
  return <Screen />
}

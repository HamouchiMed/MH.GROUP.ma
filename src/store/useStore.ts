import { create } from 'zustand'

interface AppState {
  isLoading: boolean
  setLoading: (loading: boolean) => void
  isOnboarding: boolean
  setOnboarding: (val: boolean) => void
  hoveredProject: number | null
  setHoveredProject: (id: number | null) => void
  isMuted: boolean
  setMuted: (muted: boolean) => void
  isMenuOpen: boolean
  setMenuOpen: (open: boolean) => void
  language: 'EN' | 'FR'
  setLanguage: (lang: 'EN' | 'FR') => void
  scroll: number
  setScroll: (scroll: number) => void
  pulseTime: number
  triggerPulse: () => void
  isTransitioning: boolean
  setTransitioning: (val: boolean) => void
  hoveredSkill: string | null
  setHoveredSkill: (skill: string | null) => void
  shockwaveTime: number
  triggerShockwave: () => void
  cursorText: string | null
  setCursorText: (text: string | null) => void
}

export const useStore = create<AppState>((set) => ({
  isLoading: true,
  setLoading: (loading) => set({ isLoading: loading }),
  isOnboarding: false,
  setOnboarding: (val) => set({ isOnboarding: val }),
  hoveredProject: null,
  setHoveredProject: (id) => set({ hoveredProject: id }),
  isMuted: true,
  setMuted: (muted) => set({ isMuted: muted }),
  isMenuOpen: false,
  setMenuOpen: (open) => set({ isMenuOpen: open }),
  language: 'EN',
  setLanguage: (lang) => set({ language: lang }),
  scroll: 0,
  setScroll: (scroll) => set({ scroll }),
  pulseTime: 0,
  triggerPulse: () => set({ pulseTime: Date.now() }),
  isTransitioning: false,
  setTransitioning: (val) => set({ isTransitioning: val }),
  hoveredSkill: null,
  setHoveredSkill: (skill) => set({ hoveredSkill: skill }),
  shockwaveTime: 0,
  triggerShockwave: () => set({ shockwaveTime: Date.now() }),
  cursorText: null,
  setCursorText: (text) => set({ cursorText: text }),
}))

'use client'

import { useStore } from '@/store/useStore'

let audioCtx: AudioContext | null = null
let droneGainNode: GainNode | null = null
let droneOscillators: OscillatorNode[] = []

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

export const playHoverSound = () => {
  const { isMuted } = useStore.getState()
  if (isMuted) return

  try {
    const ctx = initAudio()
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(600, ctx.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05)

    gainNode.gain.setValueAtTime(0, ctx.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.05)
  } catch (error) {
    console.warn('Audio playback restricted.')
  }
}

export const toggleBackgroundDrone = (play: boolean) => {
  try {
    const ctx = initAudio()

    if (play) {
      if (droneGainNode) return // Already playing

      // Main output
      droneGainNode = ctx.createGain()
      droneGainNode.gain.value = 0.35 // Gentle ambient level — audible but never jarring
      droneGainNode.connect(ctx.destination)

      // A bright, uplifting Major Pentatonic scale (C Major: C4, D4, E4, G4, A4, C5)
      const pentatonicScale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 659.25, 783.99]

      // We will trigger soft, generative "chimes" or "pads" randomly
      const playRandomNote = () => {
        const { isMuted, triggerPulse } = useStore.getState()
        if (isMuted || !droneGainNode) return // Stop if toggled off

        // Trigger visual pulse in sync with audio
        triggerPulse()

        const osc = ctx.createOscillator()
        const noteGain = ctx.createGain()

        // Random note from the uplifting scale
        const randomFreq = pentatonicScale[Math.floor(Math.random() * pentatonicScale.length)]
        osc.frequency.value = randomFreq
        osc.type = 'sine' // Pure, soft, glass-like tone

        // Envelope: Very slow fade in, long fade out (calm, breathing feel)
        const now = ctx.currentTime
        noteGain.gain.setValueAtTime(0, now)
        noteGain.gain.linearRampToValueAtTime(0.5, now + 2) // Soft individual note volume
        noteGain.gain.linearRampToValueAtTime(0, now + 6)   // Fade out over 4s

        // Add a slight panning effect for width
        const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null
        if (panner) {
          panner.pan.value = (Math.random() - 0.5) * 0.8 // Random pan left/right
          osc.connect(noteGain)
          noteGain.connect(panner)
          panner.connect(droneGainNode)
        } else {
          osc.connect(noteGain)
          noteGain.connect(droneGainNode)
        }

        osc.start(now)
        osc.stop(now + 6.5) // Stop after the fade out is fully done

        // Schedule the next note randomly between 1.5 and 4 seconds
        const nextNoteDelay = Math.random() * 2500 + 1500
        setTimeout(playRandomNote, nextNoteDelay)
      }

      // Start the generative music loop
      playRandomNote()
      // Start a second layer for a slightly fuller sound
      setTimeout(playRandomNote, 2000)

    } else {
      // Fade out and stop safely
      if (!droneGainNode) return

      const now = ctx.currentTime
      droneGainNode.gain.cancelScheduledValues(now)
      droneGainNode.gain.setValueAtTime(droneGainNode.gain.value, now)
      droneGainNode.gain.linearRampToValueAtTime(0, now + 2) // 2s fade out

      setTimeout(() => {
        droneGainNode?.disconnect()
        droneGainNode = null
      }, 2100)
    }
  } catch (error) {
    console.warn('Audio playback restricted.')
  }
}

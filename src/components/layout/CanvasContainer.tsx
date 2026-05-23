'use client'

import { Canvas } from '@react-three/fiber'
import { Preload, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import { Suspense } from 'react'
import LiquidTransition from '@/components/canvas/LiquidTransition'

export default function CanvasContainer({ children }: { children?: React.ReactNode }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 30 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {children}
          <LiquidTransition />
          <Preload all />
        </Suspense>
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
    </div>
  )
}

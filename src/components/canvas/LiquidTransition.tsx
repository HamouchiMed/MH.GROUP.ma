'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { extend } from '@react-three/fiber'
import { useStore } from '@/store/useStore'
import { gsap } from '@/lib/gsap'

const TransitionMaterial = shaderMaterial(
  {
    uTime: 0,
    uProgress: 0,
    uResolution: new THREE.Vector2()
  },
  // Vertex
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
  // Fragment
  `
    uniform float uTime;
    uniform float uProgress;
    uniform vec2 uResolution;
    varying vec2 vUv;

    void main() {
      vec2 p = vUv;
      
      // Liquid distortion math
      float d = length(p - 0.5);
      float ripple = sin(d * 10.0 - uTime * 2.0) * 0.1 * uProgress;
      p += normalize(p - 0.5) * ripple;
      
      // Vignette effect that closes in
      float vignette = smoothstep(1.0, 0.0, d * (2.0 - uProgress * 2.0));
      
      gl_FragColor = vec4(0.0, 0.0, 0.0, uProgress * (1.0 - vignette * 0.5));
    }
  `
)

extend({ TransitionMaterial })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      transitionMaterial: any
    }
  }
}

export default function LiquidTransition() {
  const materialRef = useRef<any>(null!)
  const { isTransitioning } = useStore()
  const { viewport } = useThree()

  useEffect(() => {
    if (isTransitioning) {
      gsap.to(materialRef.current, {
        uProgress: 1,
        duration: 1,
        ease: 'power3.inOut'
      })
    } else {
      gsap.to(materialRef.current, {
        uProgress: 0,
        duration: 1,
        ease: 'power3.inOut'
      })
    }
  }, [isTransitioning])

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime
    }
  })

  return (
    <mesh position={[0, 0, 4]}> {/* Far front */}
      <planeGeometry args={[2, 2]} />
      <primitive 
        object={new TransitionMaterial()}
        ref={materialRef} 
        transparent 
        uResolution={new THREE.Vector2(viewport.width, viewport.height)}
      />
    </mesh>
  )
}

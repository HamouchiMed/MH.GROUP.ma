'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere, Float, Points, PointMaterial } from '@react-three/drei'
import { usePathname } from 'next/navigation'
import * as THREE from 'three'
import { useStore } from '@/store/useStore'

type DistortMaterial = THREE.ShaderMaterial & {
  emissiveIntensity?: number
  distort?: number
}

function Shockwave() {
  const { shockwaveTime } = useStore()
  const ringRef = useRef<THREE.Mesh>(null!)
  const startTime = useRef(0)
  const activeRef = useRef(false)

  useEffect(() => {
    if (shockwaveTime > 0) {
      startTime.current = Date.now()
      activeRef.current = true
    }
  }, [shockwaveTime])

  useFrame(() => {
    if (!activeRef.current || !ringRef.current) return
    const elapsed = (Date.now() - startTime.current) / 1000
    const duration = 2.0
    
    if (elapsed > duration) {
      activeRef.current = false
      return
    }

    const progress = elapsed / duration
    const scale = progress * 20
    const opacity = 1 - Math.pow(progress, 2)
    
    ringRef.current.scale.set(scale, scale, scale)
    if (ringRef.current.material instanceof THREE.MeshBasicMaterial) {
      ringRef.current.material.opacity = opacity * 0.5
    }
  })

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.9, 1, 64]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0} side={THREE.DoubleSide} />
    </mesh>
  )
}

export default function BackgroundScene() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const materialRef = useRef<any>(null!)
  const pointsRef = useRef<THREE.Points>(null!)
  const starsGroupRef = useRef<THREE.Group>(null!)
  const { mouse } = useThree()
  const { pulseTime } = useStore()
  const pathname = usePathname()
  
  const isWorkPage = pathname.startsWith('/work')
  const is404 = pathname === '/404' || (!['/', '/#work', '/#about', '/#contact'].includes(pathname) && !pathname.startsWith('/work'))

  // Smoothed scroll velocity, so the scene reacts to how hard you flick the
  // page rather than just how far down it is.
  const flow = useRef(0)

  // Generate star field — a mid-range phone should not be pushing 2000 points.
  const count = useMemo(
    () => (typeof window !== 'undefined' && window.innerWidth < 768 ? 700 : 2000),
    []
  )
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000
    return x - Math.floor(x)
  }

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (seededRandom(i + 1) - 0.5) * 15
      pos[i * 3 + 1] = (seededRandom(i + 2) - 0.5) * 15
      pos[i * 3 + 2] = (seededRandom(i + 3) - 0.5) * 15
    }
    return pos
  }, [count])

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime
    
    // Pulse animation logic
    let pulseFactor = 0
    const msSincePulse = Date.now() - pulseTime
    if (msSincePulse < 1000) {
      pulseFactor = Math.pow(1 - msSincePulse / 1000, 3) 
    }

    const root = typeof document !== 'undefined' ? document.documentElement : null
    const scrollProgress = root
      ? Number.parseFloat(root.style.getPropertyValue('--scroll-progress') || '0')
      : 0
    const velocity = root
      ? Number.parseFloat(root.style.getPropertyValue('--scroll-velocity') || '0')
      : 0

    // 0 → still, 1 → flicked hard. Lerped so the scene eases back to rest
    // instead of snapping the moment the wheel stops.
    flow.current = THREE.MathUtils.lerp(flow.current, Math.min(1, Math.abs(velocity) / 12), 0.08)

    // Cinematic Camera Journey
    const targetCamX = Math.sin(scrollProgress * Math.PI) * 1.5
    const targetCamY = scrollProgress * -1.5
    const targetCamZ = 5 - (scrollProgress * 2) + flow.current * 0.6
    
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetCamX, 0.1)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetCamY, 0.1)
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetCamZ, 0.1)
    
    state.camera.lookAt(0, 0, -2)

    // Animate the Globe (Blob)
    if (meshRef.current && !isWorkPage) {
      meshRef.current.rotation.x = Math.cos(time / 4) * 0.15
      meshRef.current.rotation.y = Math.sin(time / 4) * 0.15
      
      const targetX = mouse.x * 0.4
      const targetY = mouse.y * 0.4
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05)
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05)

      if (materialRef.current) {
        const glitch = is404 ? Math.sin(time * 20) * 0.2 : 0
        materialRef.current.emissiveIntensity = 0.2 + (pulseFactor * 1.5) + (is404 ? 0.5 : 0) + flow.current * 0.4
        materialRef.current.distort = 0.4 + (pulseFactor * 0.3) + glitch + flow.current * 0.35
      }
    }

    // Animate the Stars
    if (starsGroupRef.current) {
      starsGroupRef.current.rotation.x -= delta / 40
      starsGroupRef.current.rotation.y -= delta / 50
      // Fast scrolling drags the field sideways — cheap sense of momentum.
      starsGroupRef.current.rotation.z -= velocity * delta * 0.015
    }

    if (pointsRef.current) {
      const targetRotationX = mouse.y * 0.15
      const targetRotationY = mouse.x * 0.15
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, targetRotationX, 0.05)
      pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, targetRotationY, 0.05)
    }
  })

  return (
    <group>
      <Shockwave />

      {/* The Distorting Globe - Hidden on Work pages */}
      {!isWorkPage && (
        <Float speed={is404 ? 10 : 1.5} rotationIntensity={is404 ? 2 : 0.3} floatIntensity={is404 ? 2 : 0.3}>
          <Sphere
            ref={meshRef}
            args={[1, 100, 100]}
            scale={1.3}
            position={[0, 0, -2]}
          >
            <MeshDistortMaterial
              ref={materialRef}
              color={is404 ? "#ff3333" : "#666666"}
              emissive={is404 ? "#220000" : "#222222"}
              speed={is404 ? 10 : 3}
              distort={0.4}
              radius={1}
              metalness={0.9}
              roughness={0.1}
            />
          </Sphere>
        </Float>
      )}

      {/* The Star Field */}
      <group ref={starsGroupRef} rotation={[0, 0, Math.PI / 4]} position={[0, 0, -3]}>
        <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
          <PointMaterial
            transparent
            color="#ffffff"
            size={0.03}
            sizeAttenuation={true}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            opacity={0.9}
          />
        </Points>
      </group>
      
      {/* Lighting */}
      <ambientLight intensity={2} />
      <directionalLight position={[10, 10, 5]} intensity={4} />
      <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={8} />
    </group>
  )
}

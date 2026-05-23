'use client'

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text3D, Center, MeshTransmissionMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

export default function GlassText() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const { viewport, mouse } = useThree()

  useFrame((state) => {
    if (!meshRef.current) return
    
    // Subtle mouse tracking
    const targetX = mouse.x * 0.2
    const targetY = mouse.y * 0.2
    meshRef.current.rotation.x += (targetY - meshRef.current.rotation.x) * 0.05
    meshRef.current.rotation.y += (targetX - meshRef.current.rotation.y) * 0.05
  })

  // Scale based on viewport width
  const scale = viewport.width < 10 ? viewport.width / 15 : 1

  return (
    <group position={[0, 0, 1]} scale={scale}>
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
        <Center>
          <Text3D
            ref={meshRef}
            font="/fonts/helvetiker_bold.typeface.json"
            size={1.5}
            height={0.1} // Very thin for a sleek 2D look
            curveSegments={12}
            bevelEnabled={false} // No bevels for a clean "pro" look
          >
            {'MOHAMED\nHAMOUCHI'}
            <MeshTransmissionMaterial
              backside={false}
              samples={8}
              thickness={1}
              chromaticAberration={0.05}
              anisotropy={0.1}
              distortion={0.1}
              distortionScale={0.1}
              temporalDistortion={0}
              clearcoat={1}
              attenuationDistance={1}
              attenuationColor="#ffffff"
              color="#ffffff"
              roughness={0.1}
              transmission={1}
              ior={1.2}
            />
          </Text3D>
        </Center>
      </Float>
    </group>
  )
}

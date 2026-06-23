import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Snow({ count = 200 }) {
  const mesh = useRef()
  const isMobile = window.innerWidth < 1224

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 80  // x — spread wide
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60  // y — spread tall
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30  // z — some depth
      speeds[i] = 0.02 + Math.random() * 0.05             // random fall speed
    }

    return { positions, speeds }
  }, [count])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(particles.positions, 3))
    return geo
  }, [particles])

  useFrame(() => {
    const positions = mesh.current.geometry.attributes.position.array

    for (let i = 0; i < count; i++) {
      positions[i * 3 + 1] -= particles.speeds[i]  // fall down

        if (!isMobile) {
      positions[i * 3] += Math.sin(Date.now() * 0.001 + i) * 0.01
    }

      // drift slightly side to side
      positions[i * 3] += Math.sin(Date.now() * 0.001 + i) * 0.01

      // reset to top when it falls below
      if (positions[i * 3 + 1] < -30) {
        positions[i * 3 + 1] = 30
        positions[i * 3]     = (Math.random() - 0.5) * 80
      }
    }

    mesh.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={mesh} geometry={geometry}>
      <pointsMaterial
        size={0.8}
        color="#ffffff"
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}
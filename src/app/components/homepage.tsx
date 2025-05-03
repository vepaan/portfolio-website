'use client'

import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const HomePage: React.FC = () => {

  const mountRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf0f0f0)

    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.set(0.2, 0.6, 2.8)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(renderer.domElement)

    const ambient = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambient)
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8)
    dirLight.position.set(5, 10, 7.5)
    scene.add(dirLight)

    const loader = new GLTFLoader()
    loader.load(
      '/models/programmer.glb',
      (gltf: any) => {
        const model = gltf.scene
        model.scale.setScalar(0.17)
        model.position.set(0, 0, 0)
        scene.add(model)
      },
      (event: ProgressEvent<EventTarget>) => {
        const loaded = event.loaded
        const total = event.total ?? loaded
        console.log(`Model ${((loaded / total) * 100).toFixed(1)}% loaded`)
      },
      (error: ErrorEvent) => {
        console.error('GLTF load error:', error.message)
      }
    )

    const clock = new THREE.Clock()
    const animate = () => {
      requestAnimationFrame(animate)
      const delta = clock.getDelta()
      scene.rotation.y += delta * 0.1
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      renderer.dispose()

      // dispose geometries & materials
      scene.traverse((obj: Object) => {
        if ((obj as THREE.Mesh).geometry) {
          ;(obj as THREE.Mesh).geometry.dispose()
        }
        if ((obj as THREE.Mesh).material) {
          const mat = (obj as THREE.Mesh).material
          Array.isArray(mat)
            ? mat.forEach((m) => m.dispose())
            : mat.dispose()
        }
      })

      container.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{
        width: '500px',
        height: '400px',
        borderRadius: '8px',
        borderStyle: 'dashed',
        borderColor: 'white',
        borderWidth: '2px',
        overflow: 'hidden',
        right: '10%',
        position: 'absolute'
      }}
    >
    </div>
  )
}

export default HomePage

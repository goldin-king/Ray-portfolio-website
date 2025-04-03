"use client"

import { useEffect, useRef, useState } from "react"

interface Dot {
  x: number
  y: number
  baseX: number
  baseY: number
  size: number
  speed: number
}

export default function DotBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const dotsRef = useRef<Dot[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Initialize canvas and dots
    const initializeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // Create dots
      const spacing = 20
      const dotSize = 1
      const dots: Dot[] = []

      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          dots.push({
            x,
            y,
            baseX: x,
            baseY: y,
            size: dotSize,
            speed: 0.08 + Math.random() * 0.04, // Slightly randomized speed
          })
        }
      }

      dotsRef.current = dots
    }

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Set dot color based on theme
      const isDarkMode = document.documentElement.classList.contains("dark")
      ctx.fillStyle = isDarkMode ? "#333333" : "#e5e5e5"

      // Update and draw dots
      dotsRef.current.forEach((dot) => {
        // Calculate distance from mouse
        const dx = mousePosition.x - dot.baseX
        const dy = mousePosition.y - dot.baseY
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 100

        // Move dots away from mouse with a smooth falloff
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance

          // Calculate new position with easing
          dot.x = dot.baseX - dx * force * 0.5
          dot.y = dot.baseY - dy * force * 0.5
        } else {
          // Return to original position with easing
          dot.x += (dot.baseX - dot.x) * dot.speed
          dot.y += (dot.baseY - dot.y) * dot.speed
        }

        // Draw the dot
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2)
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    // Set up event listeners and start animation
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", initializeCanvas)

    initializeCanvas()
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", initializeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 bg-white dark:bg-black" />
}


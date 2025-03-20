"use client"

import { useEffect, useRef } from "react"

const Confetti = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: {
      x: number
      y: number
      size: number
      color: string
      speed: number
      angle: number
      rotation: number
      rotationSpeed: number
    }[] = []

    const colors = [
      "#7c3aed", // Purple
      "#8b5cf6", // Purple lighter
      "#6d28d9", // Purple darker
      "#f59e0b", // Amber
      "#fbbf24", // Amber lighter
      "#d97706", // Amber darker
      "#ffffff", // White
    ]

    // Create particles
    for (let i = 0; i < 200; i++) {
      const size = Math.random() * 10 + 5
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 3 + 1,
        angle: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
      })
    }

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Update position
        p.y += p.speed
        p.x += Math.sin(p.angle) * 2
        p.rotation += p.rotationSpeed

        // Draw particle
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)
        ctx.fillStyle = p.color

        // Draw a rectangle
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)

        ctx.restore()

        // Reset if off screen
        if (p.y > canvas.height) {
          particles[i].y = -p.size
          particles[i].x = Math.random() * canvas.width
        }
      }

      requestAnimationFrame(update)
    }

    update()

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ width: "100%", height: "100%" }}
    />
  )
}

export default Confetti


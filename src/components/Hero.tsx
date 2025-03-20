"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, ChevronDown, Zap, Rocket } from "lucide-react"

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    // Stock chart line points
    const linesCount = 5
    const linesData: { points: { x: number; y: number }[]; color: string; speed: number }[] = []

    // Generate initial points for multiple chart lines
    for (let l = 0; l < linesCount; l++) {
      const linePoints = []
      const pointsCount = Math.floor(width / 50)
      const heightRange = height / 6
      const baseY = height / 2 + (l - Math.floor(linesCount / 2)) * (heightRange / 2)

      for (let i = 0; i < pointsCount; i++) {
        linePoints.push({
          x: i * (width / (pointsCount - 1)),
          y: baseY + (Math.random() - 0.5) * heightRange,
        })
      }

      const colors = [
        "rgba(124, 58, 237, 0.5)", // Purple
        "rgba(139, 92, 246, 0.5)", // Purple lighter
        "rgba(109, 40, 217, 0.5)", // Purple darker
        "rgba(234, 179, 8, 0.5)", // Amber
        "rgba(245, 158, 11, 0.5)", // Amber darker
      ]

      linesData.push({
        points: linePoints,
        color: colors[l % colors.length],
        speed: 0.5 + Math.random() * 1.5,
      })
    }

    // Handle window resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw and update each line
      linesData.forEach((line) => {
        // Update points
        line.points.forEach((point) => {
          point.y += (Math.random() - 0.5) * line.speed
          // Keep within bounds
          const range = height / 6
          const baseY = height / 2
          if (point.y < baseY - range) point.y = baseY - range
          if (point.y > baseY + range) point.y = baseY + range
        })

        // Draw line
        ctx.strokeStyle = line.color
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(line.points[0].x, line.points[0].y)

        for (let i = 1; i < line.points.length; i++) {
          ctx.lineTo(line.points[i].x, line.points[i].y)
        }

        ctx.stroke()

        // Draw area under the line
        ctx.fillStyle = line.color.replace("0.5", "0.1")
        ctx.beginPath()
        ctx.moveTo(line.points[0].x, line.points[0].y)

        for (let i = 1; i < line.points.length; i++) {
          ctx.lineTo(line.points[i].x, line.points[i].y)
        }

        ctx.lineTo(line.points[line.points.length - 1].x, height)
        ctx.lineTo(line.points[0].x, height)
        ctx.closePath()
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Handle scroll event to change ticker position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Stock ticker data
  const tickerSymbols = [
    { symbol: "AAPL", price: "178.72", change: "+1.32%" },
    { symbol: "MSFT", price: "412.41", change: "+0.87%" },
    { symbol: "GOOGL", price: "156.37", change: "-0.43%" },
    { symbol: "AMZN", price: "178.12", change: "+1.21%" },
    { symbol: "META", price: "487.95", change: "+2.15%" },
    { symbol: "TSLA", price: "177.58", change: "-1.03%" },
    { symbol: "NVDA", price: "926.69", change: "+2.78%" },
    { symbol: "JPM", price: "196.62", change: "+0.42%" },
  ]

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Canvas for animated charts */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40" />

      {/* Live ticker tape - Made sticky with transition */}
      <div
        className={`fixed w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-2 ticker-tape z-50 transition-all duration-500 ${
          isScrolled ? "top-0" : "bottom-[5%]"
        }`}
      >
        <div className="ticker-tape-content">
          {tickerSymbols.map((stock, index) => (
            <span key={index} className="inline-flex items-center mx-6">
              <strong>{stock.symbol}</strong>
              <span className="ml-2">{stock.price}</span>
              <span className={`ml-2 ${stock.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                {stock.change}
              </span>
            </span>
          ))}
          {/* Duplicate to ensure smooth transition */}
          {tickerSymbols.map((stock, index) => (
            <span key={`repeat-${index}`} className="inline-flex items-center mx-6">
              <strong>{stock.symbol}</strong>
              <span className="ml-2">{stock.price}</span>
              <span className={`ml-2 ${stock.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                {stock.change}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 section-container flex flex-col items-center justify-center text-center pt-20">
        <div className="inline-flex items-center rounded-full border border-purple-300/20 bg-white/90 backdrop-blur-sm px-4 py-1.5 text-sm text-purple-600 mb-8 animate-fade-in hover-lift">
          <Zap className="w-4 h-4 mr-2 text-accent animate-pulse" />
          <span className="flex items-center">
            Live Trading Since 2010
            <span className="ml-2 w-2 h-2 rounded-full bg-green-500 pulse-dot"></span>
          </span>
        </div>

        <h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-purple-950 mb-6 tracking-tight animate-fade-in neon-glow"
          style={{ animationDelay: "200ms" }}
        >
          Trade <span className="animate-pulse text-purple-600">Smarter</span>,<br />
          Invest <span className="animate-pulse text-purple-600">Better</span>
        </h1>

        <p
          className="text-lg md:text-xl text-purple-800 max-w-2xl mb-10 leading-relaxed text-balance animate-fade-in"
          style={{ animationDelay: "400ms" }}
        >
          Unicrore provides strategic investment solutions with a personalized approach to help you achieve your
          financial goals.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in mb-32" style={{ animationDelay: "600ms" }}>
          <a
            href="#services"
            className="button-hover-effect bg-gradient-to-r from-purple-600 to-purple-800 text-white px-8 py-3 rounded-md shadow-sm font-medium flex items-center justify-center hover-lift animate-shake"
          >
            {/* <Rocket className="mr-2 w-4 h-4" /> */}
            Explore Services
            <ArrowRight className="ml-2 w-4 h-4" />
          </a>
          <a
            href="#about"
            className="button-hover-effect bg-white border border-purple-300/20 text-purple-600 px-8 py-3 rounded-md shadow-sm font-medium hover-lift animate-glitch"
          >
            About Us
          </a>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#services" className="text-purple-500 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full border-2 border-purple-400/50 flex items-center justify-center neon-box">
              <ChevronDown className="w-5 h-5 text-purple-400" />
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero


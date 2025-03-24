"use client"

import { useEffect, useRef , useState} from "react"
import { ArrowRight, ChevronDown, Zap } from "lucide-react"

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDesktop, setIsDesktop] = useState(false)
  const [tickerData, setTickerData] = useState([
    { symbol: "RELIANCE", price: 2942.75, prevPrice: 2942.75, change: "+1.32%" },
    { symbol: "TCS", price: 3812.40, prevPrice: 3812.40, change: "+0.87%" },
    { symbol: "INFY", price: 1456.30, prevPrice: 1456.30, change: "-0.43%" },
    { symbol: "HDFCBANK", price: 1678.25, prevPrice: 1678.25, change: "+1.21%" },
    { symbol: "ICICIBANK", price: 1087.95, prevPrice: 1087.95, change: "+2.15%" },
    { symbol: "TATAMOTORS", price: 977.60, prevPrice: 977.60, change: "-1.03%" },
    { symbol: "WIPRO", price: 526.70, prevPrice: 526.70, change: "+2.78%" },
    { symbol: "SBIN", price: 796.65, prevPrice: 796.65, change: "+0.42%" },
  ])

  useEffect(() => {
    // Update isDesktop based on window size
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768) // Set to true for desktop screens
    }

    // Listen for window resize
    window.addEventListener("resize", handleResize)

    // Initial check for screen size
    handleResize()

    // Cleanup the event listener
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    // Update ticker prices every 2 seconds
    const interval = setInterval(() => {
      setTickerData(prevData => 
        prevData.map(stock => {
          const change = (Math.random() - 0.5) * 5 // Random change between -2.5 and +2.5
          const newPrice = Number((stock.price + change).toFixed(2))
          const percentChange = ((newPrice - stock.prevPrice) / stock.prevPrice * 100).toFixed(2)
          return {
            ...stock,
            price: newPrice,
            change: `${percentChange > 0 ? '+' : ''}${percentChange}%`
          }
        })
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

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

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Canvas for animated charts */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40" />

      {/* Content */}
      <div className="relative z-10 section-container flex flex-col items-center justify-center text-center pt-20">
        <div className="inline-flex items-center rounded-full border border-purple-300/20 bg-white/90 backdrop-blur-sm px-4 py-1.5 text-sm text-purple-600 mb-8 animate-fade-in hover-lift">
          <Zap className="w-4 h-4 mr-2 text-accent animate-pulse" />
          <span className="flex items-center">
            Live Trading Since 2015
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

        <div
          className="flex flex-col sm:flex-row gap-4 animate-fade-in mb-16 sm:mb-20 md:mb-24 lg:mb-32"
          style={{ animationDelay: "600ms" }}
        >
          <a
            href="https://signup.firstock.in/?p=usllp"
            target="_blank"
            className="button-hover-effect bg-gradient-to-r from-purple-600 to-purple-800 text-white px-8 py-3 rounded-md shadow-sm font-medium flex items-center justify-center hover-lift animate-shake"
          >
            Open Demat Account
            <ArrowRight className="ml-2 w-4 h-4" />
          </a>
          <a
            href="https://tradingapp.thefirstock.tech/login"
            target="_blank"
            className="button-hover-effect bg-white border border-purple-300/20 text-purple-600 px-8 py-3 rounded-md shadow-sm font-medium hover-lift animate-glitch"
          >
            Login
          </a>
        </div>
      </div>

      {/* Bouncing arrow */}
      {isDesktop && (
      <div className="absolute bottom-16 sm:bottom-20 md:bottom-24 lg:bottom-28 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#services" className="text-purple-500 flex flex-col items-center">
          <div className="w-10 h-10 rounded-full border-2 border-purple-400/50 flex items-center justify-center neon-box">
            <ChevronDown className="w-5 h-5 text-purple-400" />
          </div>
        </a>
      </div>
      )}

      {/* Full-width ticker tape - positioned absolutely at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 w-screen bg-gradient-to-r from-purple-600 to-purple-800 text-white py-2 ticker-tape z-40">
        <div className="ticker-tape-content">
          {tickerData.map((stock, index) => (
            <span key={index} className="inline-flex items-center mx-6">
              <strong>{stock.symbol}</strong>
              <span className={`ml-2 transition-colors duration-300 ${
                stock.price > stock.prevPrice ? 'text-green-400' : 
                stock.price < stock.prevPrice ? 'text-red-400' : 'text-white'
              }`}>
                {stock.price.toFixed(2)}
              </span>
              <span className={`ml-2 ${stock.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                {stock.change}
              </span>
            </span>
          ))}
          {/* Duplicate to ensure smooth transition */}
          {tickerData.map((stock, index) => (
            <span key={`repeat-${index}`} className="inline-flex items-center mx-6">
              <strong>{stock.symbol}</strong>
              <span className={`ml-2 transition-colors duration-300 ${
                stock.price > stock.prevPrice ? 'text-green-400' : 
                stock.price < stock.prevPrice ? 'text-red-400' : 'text-white'
              }`}>
                {stock.price.toFixed(2)}
              </span>
              <span className={`ml-2 ${stock.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                {stock.change}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero

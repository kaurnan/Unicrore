"use client"

import { useEffect, useState, useRef } from "react"
import AnimatedSection, { AnimatedCounter } from "./AnimatedSection"
import { Check, Clock, LineChart, Shield, TrendingUp, Users } from "lucide-react"
import "./counter-animation.css" // Import the counter animation styles

const About = () => {
  const [counter, setCounter] = useState({
    performance: 0,
    years: 0,
    clients: 0,
    assets: 0,
    retention: 0,
  })

  const [animationComplete, setAnimationComplete] = useState(false)
  const statsRef = useRef(null)

  const stats = [
    { figure: "6", label: "Years in Business", icon: Clock, counterKey: "years" },
    { figure: "500+", label: "Satisfied Clients", icon: Users, counterKey: "clients" },
    { figure: "₹800Cr+", label: "Assets Managed", icon: LineChart, counterKey: "assets" },
    { figure: "100%", label: "Client Retention", icon: Shield, counterKey: "retention" },
  ]

  // Function to format numbers with commas (e.g., 5000 -> 5,000)
  const formatNumber = (num) => {
    return num.toLocaleString()
  }

  // Add this function after the formatNumber function
  const getCounterDisplayValue = (key, value) => {
    if (key === "years") return formatNumber(value)
    if (key === "clients") return `${formatNumber(value)}+`
    if (key === "assets") return `₹${formatNumber(value)}Cr+`
    if (key === "retention") return `${formatNumber(value)}%`
    if (key === "performance") return `${value}%`
    return formatNumber(value)
  }

  // Counter increment function with smooth animation
  const animateCounter = (key, endValue) => {
    const startValue = 0
    const duration = 2500 // Slightly longer duration for more impact

    // Improved easing function for more professional animation
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

    let startTimestamp = null

    const animate = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      const easedProgress = easeOutCubic(progress)

      // Calculate current value based on eased progress
      let currentValue = easedProgress * endValue

      // For assets, use a larger number with decimal places during animation
      if (key === "assets") {
        currentValue = key === "assets" ? Math.floor(currentValue) : currentValue
      } else if (key === "performance") {
        currentValue = Number.parseFloat(currentValue.toFixed(1))
      } else {
        currentValue = Math.floor(currentValue)
      }

      setCounter((prev) => ({
        ...prev,
        [key]: currentValue,
      }))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        // Ensure final value is exactly the target
        setCounter((prev) => ({
          ...prev,
          [key]: endValue,
        }))

        // Check if this is the last counter to complete
        if (key === "retention") {
          setAnimationComplete(true)
        }
      }
    }

    requestAnimationFrame(animate)
  }

  // Function to increase only certain counters periodically
  const increaseCounterPeriodically = () => {
    const increaseEveryMinute = setInterval(() => {
      setCounter((prev) => ({
        ...prev,
        performance: prev.performance + 0.5,
        assets: prev.assets + 10,
        clients: prev.clients + 5,
        // Not increasing years or retention as these shouldn't change frequently
        // Not increasing clients too rapidly to maintain realism
      }))
    }, 60000) // Every minute (60000ms)

    return increaseEveryMinute
  }

  // Observer for scroll-triggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animationComplete) {
          // Target values
          const counters = {
            performance: 27.4,
            years: 6,
            clients: 500,
            assets: 800,
            retention: 100,
          }

          // Start the animation for each counter with slight delays
          Object.keys(counters).forEach((key, index) => {
            setTimeout(() => {
              animateCounter(key, counters[key])
            }, index * 200) // Stagger the animations
          })
        }
      },
      { threshold: 0.3 },
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current)
      }
    }
  }, [animationComplete])

  // Start periodic counter increases after initial animation
  useEffect(() => {
    if (animationComplete) {
      const interval = increaseCounterPeriodically()
      return () => clearInterval(interval)
    }
  }, [animationComplete])

  // Add this useEffect after the other useEffect hooks
  useEffect(() => {
    if (animationComplete) {
      const statElements = document.querySelectorAll(".counter-value")
      statElements.forEach((el) => {
        el.classList.add("counter-complete")
        setTimeout(() => {
          el.classList.remove("counter-complete")
        }, 500)
      })
    }
  }, [animationComplete])

  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="section-container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Section (Image) */}
          <AnimatedSection className="order-2 lg:order-1 animate-fade-in-left">
            <div className="relative">
              <div className="aspect-square bg-purple-100 rounded-2xl overflow-hidden shadow-lg flex justify-center items-center p-4">
                <img src="/logo (purple).png" alt="Unicrore logo" className="w-3/4 h-3/4 object-contain max-w-full" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-4 sm:p-6 rounded-xl shadow-lg max-w-xs">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full p-2">
                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <p className="text-purple-700 font-medium text-sm sm:text-base">Performance</p>
                    <p className="text-xl sm:text-2xl font-bold text-purple-950">
                      <AnimatedCounter value={`${counter.performance}%`} animationComplete={animationComplete} />
                    </p>
                  </div>
                </div>
                <div className="w-full bg-purple-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-400 to-amber-600 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${counter.performance}%` }}
                  ></div>
                </div>
                <p className="text-purple-600 text-xs sm:text-sm mt-2">Annual returns (3yr avg.)</p>
              </div>
              <div className="absolute -top-6 -left-6 w-16 h-16 sm:w-24 sm:h-24 bg-amber-200/30 rounded-full animate-pulse"></div>
              <div className="absolute -top-12 left-20 w-8 h-8 sm:w-12 sm:h-12 bg-purple-200/30 rounded-full floating"></div>
            </div>
          </AnimatedSection>

          {/* Right Section (Text and Stats) */}
          <AnimatedSection className="order-1 lg:order-2 animate-fade-in-right">
            <div className="text-center lg:text-left">
              <h2 className="section-title font-bold text-purple-700 mb-6">About Unicrore</h2>
              <p className="text-purple-700 text-lg mb-8 max-w-2xl mx-auto lg:mx-0">
                At Unicrore, we believe that intelligent investing starts with trust, expertise, and a personalized
                approach. Since 2024, we have been helping individuals and businesses grow their wealth with strategic,
                research-driven investment solutions.
                <br />
                <br />
                Our team of seasoned financial advisors is dedicated to crafting customized investment strategies that
                align with your financial goals. With a strong focus on transparency, performance, and client success,
                we ensure that your money is working efficiently for you.
                <br />
                <br />
                At Unicrore, we don't just manage investments—we build a path to lasting financial success.
              </p>

              <div className="space-y-4 mb-8 max-w-2xl mx-auto lg:mx-0">
                {[
                  "Expert financial team with 15+ years experience",
                  "Investment strategies tailored to your unique goals",
                  "Transparent fee structure with no hidden costs",
                  "Regular portfolio reviews and strategic adjustments",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start justify-center lg:justify-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-green-600 to-green-800 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-purple-700">{item}</p>
                  </div>
                ))}
              </div>

              <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className={`text-center transform hover:scale-105 transition-all duration-300 hover-lift ${
                      !animationComplete ? "counter-animating" : ""
                    }`}
                  >
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <stat.icon className="w-6 h-6 text-purple-700" />
                    </div>
                    <div className="relative">
                      {/* Changed from text-transparent to direct text-purple-700 */}
                      <div className="text-3xl font-bold text-purple-700">
                        <AnimatedCounter
                          value={getCounterDisplayValue(stat.counterKey, counter[stat.counterKey])}
                          animationComplete={animationComplete}
                          className="counter-value"
                        />
                      </div>
                      {!animationComplete && (
                        <div className="absolute -right-2 -top-2 w-2 h-2 bg-purple-500 rounded-full animate-ping opacity-75"></div>
                      )}
                    </div>
                    <div className="text-purple-600 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

export default About

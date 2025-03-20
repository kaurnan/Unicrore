"use client"

import { useState, useEffect, useRef } from "react"
import AnimatedSection from "./AnimatedSection"
import { ChevronLeft, ChevronRight, Star, MessageSquare, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Rajiv Mehta",
    position: "CEO, Tech Innovators",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    quote:
      "Unicrore has transformed my investment strategy. Their insights and personalized approach have consistently delivered returns above market average.",
    stars: 5,
  },
  {
    name: "Priya Sharma",
    position: "Director, Global Solutions",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    quote:
      "Working with Unicrore has been incredibly rewarding. Their team's attention to detail and market knowledge is unparalleled in the industry.",
    stars: 5,
  },
  {
    name: "Amit Patel",
    position: "Founder, Startup Ventures",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    quote:
      "The strategic guidance from Unicrore helped me navigate volatile markets with confidence. I've recommended them to all my colleagues.",
    stars: 5,
  },
  {
    name: "Sneha Gupta",
    position: "CFO, Horizon Enterprises",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1761&q=80",
    quote:
      "I've been with Unicrore for over 5 years, and their consistent performance and transparent communication have been exceptional.",
    stars: 5,
  },
]

const Testimonials = () => {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const goToNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))

    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  const goToPrev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))

    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext()
    }, 8000)

    return () => {
      clearInterval(interval)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [current, isAnimating])

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-purple-900 to-purple-800 text-white">
      <div className="section-container">
        <AnimatedSection className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center justify-center p-2 bg-purple-800 rounded-full mb-4">
            <MessageSquare className="w-6 h-6 text-accent" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white neon-glow">Client Testimonials</h2>
          <p className="text-lg text-purple-200 max-w-2xl mx-auto">
            Hear from our clients about their experiences working with Unicrore.
          </p>
        </AnimatedSection>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-gradient-to-br from-purple-800/50 to-purple-900/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-purple-700/50 hover-lift">
                    <div className="absolute -top-5 -left-5 text-accent opacity-30">
                      <Quote size={60} />
                    </div>
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.stars)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                      ))}
                    </div>
                    <blockquote className="text-xl italic mb-8 text-purple-100 relative z-10">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-accent">
                        <img
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-bold">{testimonial.name}</div>
                        <div className="text-purple-300 text-sm">{testimonial.position}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  current === index ? "bg-accent w-6" : "bg-purple-600"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-purple-800/80 backdrop-blur-sm rounded-full p-3 text-white hover:bg-purple-700 transition-colors shadow-lg hover-lift"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-purple-800/80 backdrop-blur-sm rounded-full p-3 text-white hover:bg-purple-700 transition-colors shadow-lg hover-lift"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Testimonials


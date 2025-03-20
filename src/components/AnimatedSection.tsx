"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  animation?: "fade-in" | "fade-in-up" | "fade-in-left" | "fade-in-right" | "scale-in"
  delay?: number
  threshold?: number
  id?: string
}

const AnimatedSection = ({
  children,
  className = "",
  animation = "fade-in-up",
  delay = 0,
  threshold = 0.2,
  id,
}: AnimatedSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add(animation)
            }, delay)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold },
    )

    const currentRef = sectionRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [animation, delay, threshold])

  return (
    <div
      ref={sectionRef}
      className={cn(
        "opacity-0", // Start as invisible
        className,
      )}
      style={{ animationDelay: `${delay}ms` }}
      id={id}
    >
      {children}
    </div>
  )
}

export default AnimatedSection


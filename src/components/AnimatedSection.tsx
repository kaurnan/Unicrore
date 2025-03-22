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

// New component specifically for counter animations
interface AnimatedCounterProps {
  value: number | string
  className?: string
  animationComplete?: boolean
}

export const AnimatedCounter = ({ value, className = "", animationComplete = false }: AnimatedCounterProps) => {
  // Convert the value to a string to handle it character by character
  const stringValue = String(value)

  return (
    <span className={cn("inline-flex", className)}>
      {stringValue.split("").map((char, index) => (
        <span
          key={index}
          className={cn("inline-block counter-digit", animationComplete ? "counter-complete" : "")}
          style={{
            animationDelay: `${index * 0.1}s`,
          }}
        >
          {char}
        </span>
      ))}
    </span>
  )
}

export default AnimatedSection

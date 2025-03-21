"use client"

import { useState, useEffect } from "react"
import AnimatedSection from "./AnimatedSection"
import { ArrowRight, Sparkles } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

interface FinancialHookProps {
  onStart: () => void
}

const FinancialCalculatorHook = ({ onStart }: FinancialHookProps) => {
  const [currentQuote, setCurrentQuote] = useState(0)

  const quotes = [
    {
      text: "The best time to start investing was 20 years ago. The second best time is now.",
      author: "Chinese Proverb",
    },
    {
      text: "Financial freedom is available to those who learn about it and work for it.",
      author: "Robert Kiyosaki",
    },
    {
      text: "It's not how much money you make, but how much money you keep.",
      author: "Robert Kiyosaki",
    },
    {
      text: "The goal isn't more money. The goal is living life on your terms.",
      author: "Chris Brogan",
    },
  ]

  // Rotate through quotes every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [quotes.length])

  return (
    <section className="py-16 bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <AnimatedSection className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800 mb-6">
            Begin Your Financial Freedom Journey
          </h2>

          <div className="relative h-24 mb-8 overflow-hidden">
            {quotes.map((quote, index) => (
              <div
                key={index}
                className={`absolute w-full transition-all duration-1000 transform ${
                  index === currentQuote ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                <p className="text-xl text-purple-700 italic mb-2">"{quote.text}"</p>
                <p className="text-sm text-purple-500">— {quote.author}</p>
              </div>
            ))}
          </div>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Take control of your financial future with our personalized calculator. Answer a few questions and get a
            tailored investment strategy to achieve your goals.
          </p>
        </AnimatedSection>

        <AnimatedSection className="max-w-4xl mx-auto animate-fade-in-up" delay={200}>
          <Card className="border-purple-200 shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-6">
              <h3 className="text-2xl font-bold text-white mb-2">Your Financial Roadmap Awaits</h3>
              <p className="text-purple-100">Our calculator will help you plan for:</p>
            </div>

            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex flex-col items-center text-center p-4 bg-purple-50 rounded-xl">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                    <Sparkles className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-purple-900 mb-2">Financial Goals</h4>
                  <p className="text-sm text-purple-700">Map out your short and long-term financial objectives</p>
                </div>

                <div className="flex flex-col items-center text-center p-4 bg-purple-50 rounded-xl">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                    <Sparkles className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-purple-900 mb-2">Investment Strategy</h4>
                  <p className="text-sm text-purple-700">Get a personalized investment plan that fits your needs</p>
                </div>

                <div className="flex flex-col items-center text-center p-4 bg-purple-50 rounded-xl">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                    <Sparkles className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-purple-900 mb-2">Future Projections</h4>
                  <p className="text-sm text-purple-700">See how your investments can grow over time</p>
                </div>
              </div>

              <button
                onClick={onStart}
                className="w-full flex items-center justify-center px-6 py-4 border border-transparent rounded-xl shadow-md text-base font-medium text-white bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform hover:scale-[1.02]"
              >
                Start Your Financial Plan
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </section>
  )
}

export default FinancialCalculatorHook

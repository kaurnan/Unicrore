"use client"

import { useState, useEffect } from "react"
import AnimatedSection from "./AnimatedSection"
import { ArrowRight, Sparkles, CheckCircle, Users, Share2, Award, Gift } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface FinancialHookProps {
  onStart: () => void
}

const FinancialCalculatorHook = ({ onStart }: FinancialHookProps) => {
  const [currentQuote, setCurrentQuote] = useState(0)
  const [userCount, setUserCount] = useState(15783)

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

  // Simulate increasing user count for social proof
  useEffect(() => {
    const timer = setTimeout(() => {
      setUserCount(prev => prev + Math.floor(Math.random() * 3) + 1)
    }, 30000)
    
    return () => clearTimeout(timer)
  }, [userCount])

  return (
    <section className="py-16 bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* <div className="absolute top-4 right-4 md:top-8 md:right-8">
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1 px-3 py-1.5 text-sm font-medium">
            <Gift className="h-4 w-4 mr-1" />
            100% Free
          </Badge>
        </div> */}
        
        <AnimatedSection className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800 mb-6">
            Begin Your Financial Freedom Journey
          </h2>

          <div className="flex justify-center mb-4">
            <Badge className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1 px-4 py-2 text-base font-medium">
              <Gift className="h-5 w-5 mr-1" />
              Completely Free Financial Planning Tool
            </Badge>
          </div>

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
            tailored investment strategy to achieve your goals - <span className="font-semibold text-green-600">absolutely free, no credit card required.</span>
          </p>
          
          <div className="flex items-center justify-center text-sm text-purple-600 mb-8">
            <Users className="h-4 w-4 mr-2" />
            <span>Joined by <span className="font-bold">{userCount.toLocaleString()}</span> smart investors</span>
          </div>
        </AnimatedSection>

        <AnimatedSection className="max-w-4xl mx-auto animate-fade-in-up" delay={200}>
          <Card className="border-purple-200 shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-6 relative">
              <div className="absolute top-4 right-4">
                <Badge className="bg-green-500 text-white border-0">
                  Free
                </Badge>
              </div>
              <h3 className="text-2xl font-bold text-white text-center">Take control of your financial future in just 2 minutes.</h3>
              {/* <p className="text-purple-100">Our calculator will help you plan for:</p> */}
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

              <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-green-800 mb-1">100% Free Financial Planning</h4>
                    <p className="text-sm text-green-700">
                      We believe everyone deserves access to quality financial planning. That's why our calculator is completely free to use, with no hidden fees or subscriptions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <div className="flex items-center mb-2">
                    <Award className="h-5 w-5 text-amber-500 mr-2" />
                    <span className="font-medium text-gray-800">Expert Recommendations</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    Get professional-grade investment advice based on your unique situation
                  </p>
                </div>
                <div className="flex-1 bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span className="font-medium text-gray-800">No Sign-up Required</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    Use our calculator instantly without creating an account
                  </p>
                </div>
              </div>

              <button
                onClick={onStart}
                className="w-full flex items-center justify-center px-6 py-4 border border-transparent rounded-xl shadow-md text-base font-medium text-white bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform hover:scale-[1.02]"
              >
                Start Your Free Financial Plan
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              
              <div className="mt-4 text-center text-xs text-gray-500">
                No credit card • No sign-up • 100% free
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center">
              <div className="flex -space-x-2 mr-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center border-2 border-white">
                  <span className="text-xs font-medium text-purple-600">JD</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center border-2 border-white">
                  <span className="text-xs font-medium text-blue-600">SK</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center border-2 border-white">
                  <span className="text-xs font-medium text-green-600">RP</span>
                </div>
              </div>
              <div className="text-sm">
                <p className="font-medium text-gray-900">Join 15,000+ users planning their financial future</p>
                <p className="text-gray-500">Share with friends and family</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                <Share2 className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </AnimatedSection>
        
        {/* FAQ Section */}
        <AnimatedSection className="max-w-4xl mx-auto mt-16 animate-fade-in-up" delay={300}>
          <h3 className="text-2xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
            Frequently Asked Questions
          </h3>
          
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-medium text-gray-900 mb-2">Is this calculator really free?</h4>
              <p className="text-gray-600 text-sm">
                Yes! Our financial calculator is 100% free to use. There are no hidden fees, subscriptions, or credit card requirements.
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-medium text-gray-900 mb-2">How accurate are the projections?</h4>
              <p className="text-gray-600 text-sm">
                Our calculator uses standard financial formulas and assumptions based on historical market performance. While no projection can guarantee future results, our calculator provides a solid foundation for financial planning.
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-medium text-gray-900 mb-2">Do I need to create an account?</h4>
              <p className="text-gray-600 text-sm">
                No account creation is necessary. You can use our calculator immediately and get your personalized financial plan without signing up.
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-medium text-gray-900 mb-2">How is this free? What's the catch?</h4>
              <p className="text-gray-600 text-sm">
                There's no catch! We believe financial planning should be accessible to everyone. We offer this tool for free to help people make better financial decisions. If you find it valuable, we simply ask you to share it with others who might benefit.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

export default FinancialCalculatorHook

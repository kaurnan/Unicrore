"use client"

import { useState } from "react"
import AnimatedSection from "./AnimatedSection"
import { PieChart, Shield, BarChart3, Clock, Zap, Rocket, Flame } from "lucide-react"

const ServiceCard = ({ icon: Icon, title, description, delay }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <AnimatedSection
      className="relative bg-white/95 p-8 rounded-lg border border-purple-200 group hover:border-purple-400 transition-all duration-300 animate-fade-in-up shadow-sm hover-lift"
      delay={delay}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      <div
        className={`bg-purple-100 text-purple-600 rounded-lg p-3 w-14 h-14 flex items-center justify-center mb-5 transition-all duration-300 ${isHovered ? "bg-accent/20 text-accent rotate-12" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-bold mb-3 text-purple-900">{title}</h3>
      <p className="text-purple-700/80">{description}</p>

      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Flame className="w-5 h-5 text-accent animate-pulse" />
      </div>
    </AnimatedSection>
  )
}

const Services = () => {
  const services = [
    {
      icon: Rocket,
      title: "Stock Trading",
      description:
        "Expert guidance for your stock portfolio with real-time market insights and strategic recommendations.",
      delay: 0,
    },
    {
      icon: BarChart3,
      title: "Financial Analysis",
      description: "Comprehensive analysis of market trends, company fundamentals, and economic indicators.",
      delay: 100,
    },
    {
      icon: PieChart,
      title: "Portfolio Management",
      description: "Diversified portfolio management tailored to your risk tolerance and financial objectives.",
      delay: 200,
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Strategic risk assessment and mitigation for long-term investment security and growth.",
      delay: 300,
    },
    {
      icon: Zap,
      title: "Unlisted Shares",
      description:
        "Unlock exclusive investment opportunities in high-potential companies before they go public. Gain early access with expert insights and secure transactions.",
      delay: 400,
    },
    {
      icon: Clock,
      title: "Market Timing",
      description: "Strategic entry and exit point recommendations based on technical and fundamental analysis.",
      delay: 500,
    },
  ]

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-purple-50 to-white">
      <div className="section-container">
        <AnimatedSection className="text-center mb-16 animate-fade-in-up">
          {/* <div className="inline-flex items-center justify-center p-2 bg-purple-100 rounded-full mb-4">
            <Zap className="w-6 h-6 text-purple-600" />
          </div> */}
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle text-purple-700/70">
            We provide specialized services to help you navigate the financial markets with confidence and precision.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={service.delay}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 text-white font-medium hover-lift animate-shake"
          >
            <Rocket className="mr-2 h-5 w-5" />
            Get Started Today
          </a>
        </div>
      </div>
    </section>
  )
}

export default Services


"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Menu, X, ChevronRight } from "lucide-react"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
    { name: "Calculator", href: "#financial-calculator" },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-4 md:py-6",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center">
          <img 
            src={isScrolled ? "/logo (purple).png" : "/logo (white).png"} 
            alt="Unicrore Logo" 
            className="h-8 sm:h-10 md:h-12 w-auto" 
          />
          <img
            src={isScrolled ? "/wordmark (purple).png" : "/unicrore.png"}
            alt="Unicrore Written"
            className="hidden lg:block h-8 sm:h-10 md:h-12 w-auto ml-2"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-14">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                "relative font-medium transition-colors after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-bottom-right hover:after:origin-bottom-left",
                isScrolled 
                  ? "text-purple-800 hover:text-purple-900 after:bg-purple-800" 
                  : "text-white hover:text-white/80 after:bg-accent",
                item.name === "Calculator" && `after:scale-x-100 ${isScrolled ? "after:bg-purple-800" : "after:bg-white"}`
              )}
            >
              {item.name}
            </a>
          ))}

          {/* Contact Button - Desktop */}
          <a
            href="https://tradingapp.thefirstock.tech/login"
            target="_blank"
            className={cn(
              "inline-flex items-center px-5 py-2.5 rounded-md shadow-sm ml-2 transition-all duration-300 ease-in-out transform hover:scale-105",
              isScrolled 
                ? "bg-purple-800 text-white hover:bg-purple-900 hover:shadow-lg hover:shadow-purple-500/30" 
                : "bg-white text-purple-800 hover:bg-opacity-90 hover:shadow-lg hover:shadow-white/30",
              "relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700"
            )}
          >
            <span className="relative z-10 font-medium tracking-wide">Login</span>
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden flex items-center justify-center w-10 h-10"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className={`w-6 h-6 ${isScrolled ? "text-purple-800" : "text-white"}`} />
          ) : (
            <Menu className={`w-6 h-6 ${isScrolled ? "text-purple-800" : "text-white"}`} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden absolute top-full left-0 right-0 backdrop-blur-sm shadow-md transition-all duration-300 ease-in-out overflow-hidden",
          mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
          isScrolled ? "bg-white/90" : "bg-purple-900/90"
        )}
      >
        <div className="px-4 sm:px-6 py-4 flex flex-col space-y-3">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                "block py-2 font-medium hover:opacity-80",
                isScrolled ? "text-purple-800" : "text-white"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <a
            href="https://tradingapp.thefirstock.tech/login"
            target="_blank"
            className={cn(
              "flex items-center justify-center button-hover-effect px-5 py-2.5 rounded-md text-center shadow-sm mt-4",
              isScrolled 
                ? "bg-purple-800 text-white hover:bg-purple-900" 
                : "bg-white text-purple-800 hover:text-purple-950"
            )}
            onClick={() => setMobileMenuOpen(false)}
          >
            Login <ChevronRight className="ml-1 w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header

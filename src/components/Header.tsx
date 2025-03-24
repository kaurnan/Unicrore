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
          <img src="/logo (purple).png" alt="Unicrore Logo" className="h-8 sm:h-10 md:h-12 w-auto" />
          <img
            src="/wordmark (purple).png"
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
              className="relative font-medium text-purple-800 hover:text-purple-950 transition-colors after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-accent after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-bottom-right hover:after:origin-bottom-left"
            >
              {item.name}
            </a>
          ))}

          {/* Contact Button - Desktop */}
          <a
            href="#contact"
            className="inline-flex items-center button-hover-effect bg-primary text-white px-5 py-2.5 rounded-md shadow-sm ml-2"
          >
            Get Started
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden flex items-center justify-center w-10 h-10"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-purple-950" /> : <Menu className="w-6 h-6 text-purple-950" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden absolute top-full left-0 right-0 bg-white shadow-md transition-all duration-300 ease-in-out overflow-hidden",
          mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="px-4 sm:px-6 py-4 flex flex-col space-y-3">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block py-2 font-medium text-purple-800 hover:text-purple-950"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <a
            href="#contact"
            className="flex items-center justify-center button-hover-effect bg-primary text-white px-5 py-2.5 rounded-md text-center shadow-sm mt-4"
            onClick={() => setMobileMenuOpen(false)}
          >
            Get Started <ChevronRight className="ml-1 w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header


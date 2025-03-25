"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, MessageSquare, Quote } from "lucide-react";
import { Card, CardHeader, CardContent } from "./ui/card";

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
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const goToSlide = (index: number) => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const goToNext = () => {
    if (!isAnimating) {
      const nextIndex = (currentIndex + 1) % testimonials.length;
      goToSlide(nextIndex);
    }
  };

  const goToPrev = () => {
    if (!isAnimating) {
      const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
      goToSlide(prevIndex);
    }
  };

  useEffect(() => {
    autoPlayRef.current = setInterval(goToNext, 5000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [currentIndex]);

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-purple-900 to-purple-800 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600 rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-purple-700/30 rounded-xl mb-4">
            <MessageSquare className="w-6 h-6 text-purple-300" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Client Testimonials</h2>
          <p className="text-lg text-purple-200 max-w-2xl mx-auto">
            Hear from our clients about their experiences with Unicrore.
          </p>
        </div>

        <div className="relative px-12"> {/* Added padding to prevent overlap */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <Card className="bg-purple-800/50 backdrop-blur-lg border-purple-600/20 h-full transform transition-all duration-300 hover:scale-105">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-16 h-16 rounded-full object-cover border-2 border-purple-400"
                          />
                          <div className="absolute -bottom-1 -right-1 bg-purple-500 p-1 rounded-full">
                            <Quote size={12} className="text-white" />
                          </div>
                        </div>
                        <div className="text-left">
                          <h4 className="font-semibold text-white">{testimonial.name}</h4>
                          <p className="text-purple-300 text-sm">{testimonial.position}</p>
                        </div>
                      </div>
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.stars)].map((_, i) => (
                          <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-purple-100 leading-relaxed">"{testimonial.quote}"</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={goToPrev}
            className="absolute -left-2 top-1/2 -translate-y-1/2 bg-purple-700/30 p-3 rounded-full text-white backdrop-blur-sm transition-all hover:bg-purple-600/50"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={goToNext}
            className="absolute -right-2 top-1/2 -translate-y-1/2 bg-purple-700/30 p-3 rounded-full text-white backdrop-blur-sm transition-all hover:bg-purple-600/50"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentIndex === index ? 'bg-purple-400 w-6' : 'bg-purple-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

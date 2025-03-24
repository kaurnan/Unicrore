"use client";

import { useState, useEffect, useRef } from "react";
import AnimatedSection from "./AnimatedSection";
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
  const timeoutRef = useRef(null);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    timeoutRef.current = setInterval(goToNext, 8000);
    return () => clearInterval(timeoutRef.current);
  }, []);

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-purple-900 to-purple-800 text-white">
      <div className="section-container text-center mb-16">
        <MessageSquare className="w-6 h-6 text-accent mx-auto mb-4" />
        <h2 className="text-4xl font-bold text-white">Client Testimonials</h2>
        <p className="text-lg text-purple-200 max-w-2xl mx-auto">
          Hear from our clients about their experiences with Unicrore.
        </p>
      </div>
      <div className="relative max-w-6xl mx-auto px-4">
        <button onClick={goToPrev} className="absolute left-0 top-1/2 -translate-y-1/2 bg-purple-800 p-3 rounded-full text-white">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={goToNext} className="absolute right-0 top-1/2 -translate-y-1/2 bg-purple-800 p-3 rounded-full text-white">
          <ChevronRight className="w-6 h-6" />
        </button>
        <div className="overflow-hidden">
          <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="w-full flex-shrink-0 p-2">
                <Card className="bg-purple-800 p-6">
                  <CardHeader>
                    <Quote size={40} className="text-accent opacity-50" />
                    <blockquote className="text-lg italic">"{testimonial.quote}"</blockquote>
                  </CardHeader>
                  <CardContent className="flex items-center">
                    <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                    <div>
                      <div className="font-bold">{testimonial.name}</div>
                      <div className="text-purple-300 text-sm">{testimonial.position}</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

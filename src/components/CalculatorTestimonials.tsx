import React from 'react';
import { Star, Quote } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const CalculatorTestimonials = () => {
  const testimonials = [
    {
      name: "Rajesh Mehta",
      role: "Small Business Owner",
      image: "/lovable-uploads/d806f4df-71a2-49e0-b6b2-19b5ba704a8c.png", // This will use the uploaded image
      quote: "The financial calculator helped me create a solid investment strategy for my retirement. I've already seen a 15% growth in my portfolio within 6 months!",
      stars: 5
    },
    {
      name: "Anita Sharma",
      role: "IT Professional",
      quote: "I was overwhelmed by investment options until I used this calculator. It simplified everything and gave me a clear roadmap to achieve my financial goals.",
      stars: 5
    }
  ];

  return (
    <section className="pb-16 pt-6 bg-white">
      <div className="container mx-auto">
        <AnimatedSection className="text-center mb-10">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
            Success Stories
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            See how our financial calculator has helped people achieve their investment goals
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection 
              key={index}
              className="animate-on-scroll" 
              delay={index * 200}
            >
              <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-100 h-full flex flex-col">
                <div className="flex items-start mb-4">
                  <div className="bg-purple-100 p-2 rounded-full mr-4">
                    <Quote className="h-6 w-6 text-purple-600" />
                  </div>
                  <p className="text-gray-700 italic flex-1">{testimonial.quote}</p>
                </div>
                
                <div className="flex justify-between items-center mt-auto">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center text-purple-700 font-bold text-lg mr-3">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(testimonial.stars)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CalculatorTestimonials;

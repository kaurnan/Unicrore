"use client"

import type React from "react"
import { useState } from "react"
import AnimatedSection from "./AnimatedSection"
import { Mail, MapPin, Phone } from "lucide-react"

const Contact = () => {
  const ContactInfo = ({ icon: Icon, title, content, link = null }) => (
    <div className="flex items-start">
      <div className="bg-purple-100 text-purple-800 rounded-lg p-3 mr-4">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h4 className="font-medium mb-1">{title}</h4>
        {link ? (
          <a href={link} className="text-purple-600 hover:text-purple-900 transition-colors">
            {content}
          </a>
        ) : (
          <p className="text-purple-600">{content}</p>
        )}
      </div>
    </div>
  )

  return (
    <section id="contact" className="py-24 bg-purple-50">
      <div className="section-container">
        <AnimatedSection className="text-center mb-16 animate-fade-in-up">
          <h2 className="section-title">Contact Us</h2>
          <p className="section-subtitle text-purple-700/70">
            Ready to transform your financial future? Get in touch with our expert team today.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <AnimatedSection className="animate-fade-in-left h-full">
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-purple-100 h-full flex flex-col">
              <h3 className="text-2xl font-bold mb-6 text-purple-900">Get in Touch</h3>

              <div className="space-y-6 mb-8 flex-grow">
                <ContactInfo icon={Phone} title="Phone" content="+91 98765 43210" link="tel:+91 958-5585-127" />
                <ContactInfo icon={Mail} title="Email" content="info@unicrore.com" link="mailto:info@unicrore.com" />
                <ContactInfo icon={MapPin} title="Office" content="Vazhakkala, Ernakulam, Kakkanad, Kerala 682021" />
              </div>

              <div className="bg-purple-50 rounded-xl p-6">
                <h4 className="font-medium mb-3 text-purple-900">Our Hours</h4>
                <div className="space-y-1 text-purple-600">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 2:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection className="animate-fade-in-right h-full">
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-purple-100 h-full flex flex-col">
              <h3 className="text-2xl font-bold mb-6 text-purple-900">Send Us a Message</h3>
              <div className="w-full flex-grow bg-white rounded-lg overflow-hidden">
                <iframe
                  src="https://tally.so/r/nGb7pQ"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                  title="Contact Form"
                  style={{
                    background: '#ffffff',
                    border: 'none',
                    width: '100%',
                    minHeight: '600px'
                  }}
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

export default Contact
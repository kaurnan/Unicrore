"use client"

import type React from "react"
import { useState } from "react"
import AnimatedSection from "./AnimatedSection"
import { Mail, MapPin, Phone, Send } from "lucide-react"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "contact",
          ...formData,
        }).toString(),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: "", email: "", phone: "", message: "" })

        // Reset after showing success message
        setTimeout(() => {
          setSubmitted(false)
        }, 5000)
      } else {
        throw new Error("Form submission failed")
      }
    } catch (err) {
      setError("There was a problem submitting your form. Please try again.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

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
          <AnimatedSection className="animate-fade-in-left">
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-purple-100">
              <h3 className="text-2xl font-bold mb-6 text-purple-900">Get in Touch</h3>

              <div className="space-y-6 mb-8">
                <ContactInfo icon={Phone} title="Phone" content="+91 98765 43210" link="tel:+919876543210" />
                <ContactInfo icon={Mail} title="Email" content="info@unicrore.com" link="mailto:info@unicrore.com" />
                <ContactInfo icon={MapPin} title="Office" content="Vazhakkala, Ernakulam, Kakkanad, Kerala, India" />
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

          <AnimatedSection className="animate-fade-in-right">
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-purple-100">
              <h3 className="text-2xl font-bold mb-6 text-purple-900">Send Us a Message</h3>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <svg
                    className="w-12 h-12 text-green-500 mx-auto mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h4 className="text-lg font-medium text-green-800 mb-2">Thank You!</h4>
                  <p className="text-green-700">Your message has been received. We'll contact you shortly.</p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  data-netlify="true"
                  name="contact"
                  method="POST"
                  netlify-honeypot="bot-field"
                >
                  {/* Hidden input for Render/Netlify */}
                  <input type="hidden" name="form-name" value="contact" />
                  <p className="hidden">
                    <label>
                      Don't fill this out if you're human: <input name="bot-field" />
                    </label>
                  </p>

                  {error && <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">{error}</div>}

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-purple-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-purple-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                        placeholder="Your email"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-purple-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-purple-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="button-hover-effect bg-primary text-white px-6 py-3 rounded-lg font-medium w-full flex items-center justify-center transition-all duration-300 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      <Send className="mr-2 w-5 h-5" />
                    )}
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

export default Contact


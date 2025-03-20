import AnimatedSection from "./AnimatedSection"
import { Check, Clock, LineChart, Shield, TrendingUp, Users } from "lucide-react"

const About = () => {
  const stats = [
    { figure: "12+", label: "Years in Business", icon: Clock },
    { figure: "500+", label: "Satisfied Clients", icon: Users },
    { figure: "₹800Cr+", label: "Assets Managed", icon: LineChart },
    { figure: "92%", label: "Client Retention", icon: Shield },
  ]

  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection className="order-2 lg:order-1 animate-fade-in-left">
            <div className="relative">
              <div className="aspect-square bg-purple-100 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Modern trading office with digital displays"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg max-w-xs">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full p-2">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-purple-700 font-medium">Performance</p>
                    <p className="text-2xl font-bold text-purple-950">+27.4%</p>
                  </div>
                </div>
                <div className="w-full bg-purple-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-accent-400 to-accent-600 h-full rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
                <p className="text-purple-600 text-sm mt-2">Annual returns (3yr avg.)</p>
              </div>

              <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent/20 rounded-full animate-pulse"></div>
              <div className="absolute -top-12 left-20 w-12 h-12 bg-purple-200/30 rounded-full animate-floating"></div>
            </div>
          </AnimatedSection>

          <AnimatedSection className="order-1 lg:order-2 animate-fade-in-right">
            <h2 className="section-title text-left mb-6">About Unicrore</h2>
            <p className="text-purple-700 text-lg mb-8">
              At Unicrore, we believe in a thoughtful, personalized approach to investing. Founded in 2010, we've built
              our reputation on integrity, expertise, and client success.
            </p>

            <div className="space-y-4 mb-8">
              {[
                "Expert financial advisors with 15+ years experience",
                "Customized investment strategies for your goals",
                "Transparent fee structure with no hidden costs",
                "Regular portfolio reviews and adjustments",
              ].map((item, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-100 to-purple-200 flex items-center justify-center mr-3 mt-0.5">
                    <Check className="w-4 h-4 text-purple-700" />
                  </div>
                  <p className="text-purple-700">{item}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
              {stats.map((stat, index) => (
                <div key={index} className="text-center transform hover:scale-105 transition-transform duration-300">
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-purple-700" />
                  </div>
                  <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-purple-900">
                    {stat.figure}
                  </div>
                  <div className="text-purple-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

export default About


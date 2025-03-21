import React, { useEffect, useState } from "react";
import AnimatedSection from "./AnimatedSection"; // Ensure this is correctly imported
import { Check, Clock, LineChart, Shield, TrendingUp, Users } from "lucide-react";

const About = () => {
  const [counter, setCounter] = useState({
    performance: 0,
    years: 0,
    clients: 0,
    assets: 0,
    retention: 0,
  });

  const stats = [
    { figure: "12+", label: "Years in Business", icon: Clock, counterKey: "years" },
    { figure: "500+", label: "Satisfied Clients", icon: Users, counterKey: "clients" },
    { figure: "₹800Cr+", label: "Assets Managed", icon: LineChart, counterKey: "assets" },
    { figure: "92%", label: "Client Retention", icon: Shield, counterKey: "retention" },
  ];

  // Function to format numbers with commas (e.g., 5000 -> 5,000)
  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  // Counter increment function with smooth animation
  const animateCounter = (key, endValue) => {
    let startValue = 0;
    const duration = 2000; // Duration for the animation in milliseconds
    const incrementPerFrame = (endValue - startValue) / (duration / 100); // Small steps for smoother animation
    const easing = (t) => t * (2 - t); // Ease-in-out function for smooth start and finish

    const animate = (timestamp) => {
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      startValue = easing(progress) * endValue;

      setCounter((prev) => ({
        ...prev,
        [key]: Math.floor(startValue),
      }));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCounter((prev) => ({
          ...prev,
          [key]: endValue,
        }));
      }
    };

    const startTimestamp = performance.now();
    requestAnimationFrame(animate);
  };

  // Function to increase counter every minute
  const increaseCounterPeriodically = () => {
    const increaseEveryMinute = setInterval(() => {
      setCounter((prev) => ({
        performance: prev.performance + 0.5,
        years: prev.years + 0.2,
        clients: prev.clients + 5,
        assets: prev.assets + 10,
        retention: prev.retention + 0.1,
      }));
    }, 60000); // Every minute (60000ms)

    return increaseEveryMinute;
  };

  useEffect(() => {
    // Target values
    const counters = {
      performance: 27.4,
      years: 12,
      clients: 500,
      assets: 800,
      retention: 92,
    };

    // Start the animation for each counter
    Object.keys(counters).forEach((key) => {
      animateCounter(key, counters[key]);
    });

    // Start increasing the counters every minute
    const interval = increaseCounterPeriodically();

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="section-container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Section (Image) */}
          <AnimatedSection className="order-2 lg:order-1 animate-fade-in-left">
            <div className="relative">
              <div className="aspect-square bg-purple-100 rounded-2xl overflow-hidden shadow-lg flex justify-center items-center">
                <img
                  src="/logo (purple).png"
                  alt="Modern trading office with digital displays"
                  className="w-80 h-90 "
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg max-w-xs">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full p-2">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-purple-700 font-medium">Performance</p>
                    <p className="text-2xl font-bold text-purple-950">{counter.performance}%</p>
                  </div>
                </div>
                <div className="w-full bg-purple-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-accent-400 to-accent-600 h-full rounded-full"
                    style={{ width: `${counter.performance}%` }}
                  ></div>
                </div>
                <p className="text-purple-600 text-sm mt-2">Annual returns (3yr avg.)</p>
              </div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent/20 rounded-full animate-pulse"></div>
              <div className="absolute -top-12 left-20 w-12 h-12 bg-purple-200/30 rounded-full animate-floating"></div>
            </div>
          </AnimatedSection>

          {/* Right Section (Text and Stats) */}
          <AnimatedSection className="order-1 lg:order-2 animate-fade-in-right">
            <div className="text-center ">
              <h2 className="section-title font-bold text-purple-700 mb-6">
                About Unicrore
              </h2>
              <p className="text-purple-700 text-lg mb-8 max-w-2xl mx-auto lg:text-left">
                At Unicrore, we believe that intelligent investing starts with trust, expertise, and a personalized approach. Since 2024, we have been helping individuals and businesses grow their wealth with strategic, research-driven investment solutions.
                <br />
                <br />
                Our team of seasoned financial advisors is dedicated to crafting customized investment strategies that align with your financial goals. With a strong focus on transparency, performance, and client success, we ensure that your money is working efficiently for you.
                <br />
                <br />
                At Unicrore, we don’t just manage investments—we build a path to lasting financial success.
              </p>

              <div className="space-y-4 mb-8 max-w-2xl mx-auto lg:mx-5">
                {[
                  "Expert financial team with 15+ years experience",
                  "Investment strategies tailored to your unique goals",
                  "Transparent fee structure with no hidden costs",
                  "Regular portfolio reviews and strategic adjustments",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start justify-center lg:justify-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-green-600 to-green-800 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="w-4 h-4 text-white" />
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
                      {formatNumber(counter[stat.counterKey])}
                    </div>
                    <div className="text-purple-600 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default About;

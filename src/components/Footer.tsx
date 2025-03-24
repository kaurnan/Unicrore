import { ExternalLink, MessageCircle, Linkedin, Instagram } from "lucide-react"
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-purple-950 text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-purple-800/30">
          <div>
            <h3 className="text-2xl font-display font-bold mb-6 flex items-center">
              <img src="/logo (white).png" alt="Unicrore Logo" className="h-10 w-auto mr-2 brightness-200" />
              <img src="/wordmark (white).png" alt="Unicrore Written" className="h-12 w-auto ml-2" />
            </h3>
            <p className="text-purple-200/90 mb-6">
              Expert stock broking services with a personalized approach to help you navigate the financial markets with
              confidence.
            </p>
            <div className="flex space-x-4">
              {[
                {
                  icon: ExternalLink,
                  href: "https://www.indiafilings.com/search/unicrore-software-solutions-llp-ACI-9441",
                  label: "ExternalLink",
                },
                {
                  icon: Instagram,
                  href: "https://www.instagram.com/unicrore/",
                  label: "Instagram",
                },
                {
                  icon: Linkedin,
                  href: "https://in.linkedin.com/company/unicrore",
                  label: "LinkedIn",
                },
                {
                  icon: MessageCircle,
                  href: "https://wa.me/919585585127",
                  label: "WhatsApp",
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-purple-800 flex items-center justify-center transition-colors hover:bg-purple-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "#home" },
                { name: "Services", href: "#services" },
                { name: "About Us", href: "#about" },
                { name: "Testimonials", href: "#testimonials" },
                { name: "Contact", href: "#contact" },
              ].map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-purple-200/90 hover:text-white transition-colors inline-block">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Services</h4>
            <ul className="space-y-3">
              {[
                { name: "Stock Trading" },
                { name: "Financial Analysis", href: "#financial-calculator" },
                { name: "Portfolio Management" },
                { name: "Risk Management" },
                { name: "Wealth Advisory" },
              ].map((service, index) => (
                <li key={index}>
                  <a href={service.href} className="text-purple-200/90 hover:text-white transition-colors inline-block">
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Legal</h4>
            <ul className="space-y-3">
              {[
                { name: "Privacy Policy", href: "/privacy-policy" },
                { name: "Terms of Service", href: "/terms-of-service" },
                { name: "Cookie Policy" },  // No href, not a link
                { name: "Disclaimer", href: "/disclaimer" },
                { name: "License" },  // No href, not a link
              ].map((legal, index) => (
                <li key={index}>
                  {/* <Link to={legal.href} className="text-purple-200/90 hover:text-white transition-colors inline-block">
                    {legal.name}
                  </Link> */}
                  {legal.href ? (
                    <Link
                      to={legal.href}
                      className="text-purple-200/90 hover:text-white transition-colors inline-block"
                    >
                      {legal.name}
                    </Link>
                  ) : (
                    <span className="text-purple-200/90">{legal.name}</span>  // Display plain text if no href
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 text-center text-purple-200/70 text-sm">
          <p>&copy; {new Date().getFullYear()} Unicrore. All rights reserved.</p>
          <p className="mt-2">
            NCO Securities and Share Broking Pvt Ltd NSE​ &​ BSE – SEBI Registration No: INZ000260334
          </p>
          <p className="mt-2">
            CDSL: Depository services – SEBI Registration No: IN-DP-67-2015 Mutual Fund ARN: 132812
          </p>
          <p className="mt-1 text-xs">
            Investments in securities market are subject to market risks; read all the related documents carefully
            before investing.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer


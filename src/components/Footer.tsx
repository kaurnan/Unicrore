import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-purple-950 text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-purple-800/30">
          <div>
            <h3 className="text-2xl font-display font-bold mb-6 flex items-center">
              <img src="/logo (white).png" alt="Unicrore Logo" className="h-10 w-auto mr-2 brightness-200" />
              <img 
                src="/wordmark (white).png" 
                alt="Unicrore Written" 
                className="h-12 w-auto ml-2" 
              />
            </h3>
            <p className="text-purple-200/90 mb-6">
              Expert stock broking services with a personalized approach to help you navigate the financial markets with
              confidence.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Linkedin, href: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-purple-800 flex items-center justify-center transition-colors hover:bg-purple-700"
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
                { name: "Stock Trading", href: "#" },
                { name: "Financial Analysis", href: "#" },
                { name: "Portfolio Management", href: "#" },
                { name: "Risk Management", href: "#" },
                { name: "Wealth Advisory", href: "#" },
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
                { name: "Privacy Policy", href: "#" },
                { name: "Terms of Service", href: "#" },
                { name: "Cookie Policy", href: "#" },
                { name: "Disclaimer", href: "#" },
                { name: "License", href: "#" },
              ].map((legal, index) => (
                <li key={index}>
                  <a href={legal.href} className="text-purple-200/90 hover:text-white transition-colors inline-block">
                    {legal.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 text-center text-purple-200/70 text-sm">
          <p>&copy; {new Date().getFullYear()} Unicrore. All rights reserved.</p>
          <p className="mt-2">SEBI Registration No: INZ000123456 | NSE/BSE Member: 12345</p>
          <p className="mt-1 text-xs">
            Investments in securities market are subject to market risks; read all the related documents carefully
            before investing.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

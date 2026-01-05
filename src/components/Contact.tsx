import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Mail, Phone, MapPin, Send, Github, Linkedin } from "lucide-react";

const Contact = () => {
  const brandRef = useScrollReveal<HTMLDivElement>("bottom");
  const linksRef = useScrollReveal<HTMLDivElement>("bottom", 0.2);

  return (
    <footer id="contact" className="footer-bg text-white bg-cover bg-no-repeat bg-top-right">
      <div className="container mx-auto">
        {/* Top Section */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-10 pb-16">
          {/* Brand / Contact Info */}
          <div
            ref={brandRef}
            className="reveal reveal-bottom xl:col-span-4 footer-brand-bg rounded-md p-8 grid xl:grid-cols-[0.3fr_1fr] gap-8 items-center"
          >
            <a href="#home" className="block">
              <span className="font-oswald text-[2.4rem] font-bold">
                Ankit<span className="text-verdigris">Verma</span>
              </span>
            </a>

            <div className="flex flex-wrap gap-6 xl:justify-between relative">
              <div className="flex items-start gap-3">
                <Mail className="flex-shrink-0" size={40} />
                <div>
                  <a
                    href="mailto:hpvankitverma@gmail.com"
                    className="block contact-link-hover transition-colors"
                  >
                    Email : hpvankitverma@gmail.com
                  </a>
                </div>
              </div>

              <div className="xl:before:absolute xl:before:left-1/2 xl:before:top-0 xl:before:w-[2px] xl:before:h-full xl:before:bg-white/20 flex items-start gap-3">
                <Phone className="flex-shrink-0" size={40} />
                <div>
                  <p>Mobile : +91-9646042004</p>
                </div>
              </div>
            </div>
          </div>

          {/* About Column */}
          <div ref={linksRef} className="reveal reveal-bottom">
            <h4 className="font-bold text-white mb-5">About Us</h4>
            <p className="opacity-70 mb-5">Founder</p>
            <div className="flex items-center gap-3">
              <MapPin size={40} className="flex-shrink-0" />
              <span>
                Ankit Verma
                <br />
                144402, Phagwara, Punjab
              </span>
            </div>
          </div>

          {/* Services Links */}
          <div className="reveal reveal-bottom" style={{ transitionDelay: "0.1s" }}>
            <h4 className="font-bold text-white mb-5">Services</h4>
            <ul className="space-y-2">
              {["Conditions", "Listing", "How It Works", "What We Offer", "Latest News", "Contact Us"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="opacity-70 hover:text-verdigris transition-colors block"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Useful Links */}
          <div className="reveal reveal-bottom" style={{ transitionDelay: "0.2s" }}>
            <h4 className="font-bold text-white mb-5">Useful Links</h4>
            <ul className="space-y-2">
              {[
                "Conditions",
                "Terms of Use",
                "Our Services",
                "Join as a Developer",
                "New Guests List",
                "The Team List",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="opacity-70 hover:text-verdigris transition-colors block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="reveal reveal-bottom" style={{ transitionDelay: "0.3s" }}>
            <h4 className="font-bold text-white mb-5">Subscribe</h4>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-transparent border border-white/20 rounded px-5 py-2 text-white placeholder:text-white/70 focus:outline-none focus:border-verdigris"
              />
              <button type="submit" className="btn-primary w-full justify-center">
                <Send size={18} />
                Subscribe
              </button>
            </form>
            <p className="opacity-70 mt-7 text-[1.3rem]">
              Get the latest updates via email. Any time you may unsubscribe
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[1.4rem]">
            © Portfolio 2024 | All Rights Reserved by Ankit Verma.
          </p>

          <div className="flex gap-2">
            <a href="https://github.com/ankitverma969" target="_blank" rel="noopener noreferrer" className="social-link-footer flex items-center justify-center">
              <Github size={18} />
            </a>
            <a href="https://www.linkedin.com/in/ankitverma969" target="_blank" rel="noopener noreferrer" className="social-link-footer flex items-center justify-center">
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;

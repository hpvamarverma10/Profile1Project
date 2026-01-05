import { useState, useEffect } from "react";
import { Menu, X, Github, Linkedin, Twitter, Facebook, Youtube } from "lucide-react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    document.body.classList.toggle("nav-active", !isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
    document.body.classList.remove("nav-active");
  };

  return (
    <>
      <header
        className={`${isScrolled ? "fixed" : "absolute"} top-0 left-0 w-full z-40 transition-all duration-500 ${
          isScrolled ? "bg-rich-black" : ""
        }`}
        style={{ 
          padding: "16px 0",
          animation: isScrolled ? "headerActive 0.5s ease forwards" : "none"
        }}
      >
        <div className="container mx-auto flex justify-between items-center gap-10">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <span className="font-oswald text-[2.4rem] font-bold text-white">
              Ankit<span className="text-verdigris">Verma</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-2 ml-auto">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-white font-medium text-[1.8rem] px-4 py-2 capitalize hover:text-verdigris transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <a href="#contact" className="hidden md:flex btn-primary">
            Hire Me
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleNav}
            className="xl:hidden text-white ml-auto"
          >
            <Menu size={40} />
          </button>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav
        className={`fixed top-0 right-0 max-w-[300px] w-full h-screen bg-rich-black z-50 transition-all duration-500 ${
          isNavOpen
            ? "translate-x-0 visible"
            : "translate-x-full invisible"
        }`}
        style={{ transition: isNavOpen ? "0.5s cubic-bezier(0.05, 0.83, 0.52, 0.97)" : "0.25s cubic-bezier(0.51, 0.03, 0.64, 0.28)" }}
      >
        <div className="relative pt-14 pb-24 px-6">
          <button
            onClick={closeNav}
            className="absolute top-4 right-5 text-white"
          >
            <X size={28} />
          </button>
        </div>

        <ul className="border-b border-white/10 mb-8">
          {navItems.map((item) => (
            <li key={item.href} className="border-t border-white/10">
              <a
                href={item.href}
                onClick={closeNav}
                className="block text-white uppercase py-3 px-6"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex justify-center gap-5 text-white text-[1.8rem]">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <Github size={24} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Facebook size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <Linkedin size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Twitter size={24} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <Youtube size={24} />
          </a>
        </div>
      </nav>

      {/* Overlay */}
      <div
        onClick={closeNav}
        className={`fixed inset-0 bg-black/30 z-45 transition-all duration-500 ${
          isNavOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        style={{ 
          right: isNavOpen ? "0" : "-100%",
          transform: isNavOpen ? "translateX(0)" : "translateX(-100%)"
        }}
      />
    </>
  );
};

export default Header;

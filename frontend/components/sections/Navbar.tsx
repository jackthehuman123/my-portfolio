"use client";
import { useEffect, useRef, useState } from "react";
import anime from "animejs";

const NAV_LINKS = [
  { label: "Projects", href: "projects" },
  { label: "Skills", href: "skills" },
  { label: "Contact", href: "contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Entrance animation
  useEffect(() => {
    anime({
      targets: ".nav-item",
      opacity: [0, 1],
      translateY: [-10, 0],
      delay: anime.stagger(80),
      duration: 600,
      easing: "easeOutExpo",
    });
  }, []);

  // Track scroll for background blur + active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section
      const sections = ["projects", "skills", "contact"];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/80 backdrop-blur-md border-b border-gray-800/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          className="nav-item opacity-0 text-white font-black text-lg tracking-tight hover:text-violet-400 transition-colors"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Portfolio
        </button>

        {/* Nav links */}
        <div className="flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`nav-item opacity-0 text-sm tracking-widest uppercase transition-colors ${
                activeSection === link.href
                  ? "text-violet-400"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              {link.label}
              {/* Active indicator */}
              {activeSection === link.href && (
                <span className="block h-px w-full bg-violet-400 mt-0.5" />
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

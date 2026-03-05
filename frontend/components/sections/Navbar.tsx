"use client";
import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import ThemeToggle from "@/components/ThemeToggle";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const NAV_LINKS = [
  { label: "Projects", href: "projects" },
  { label: "Skills", href: "skills" },
  { label: "Contact", href: "contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const shouldReduce = useReducedMotion();

  // Entrance animation
  useEffect(() => {
    if (shouldReduce) {
      document
        .querySelectorAll(".nav-item")
        .forEach((el) => ((el as HTMLElement).style.opacity = "1"));
      return;
    }
    anime({
      targets: ".nav-item",
      opacity: [0, 1],
      translateY: [-10, 0],
      delay: anime.stagger(80),
      duration: 600,
      easing: "easeOutExpo",
    });
  }, [shouldReduce]);

  // Dropdown animation
  useEffect(() => {
    if (!menuOpen) return;
    if (shouldReduce) {
      document
        .querySelectorAll(".mobile-nav-item")
        .forEach((el) => ((el as HTMLElement).style.opacity = "1"));
      return;
    }
    anime({
      targets: ".mobile-nav-item",
      opacity: [0, 1],
      translateY: [-8, 0],
      delay: anime.stagger(60),
      duration: 400,
      easing: "easeOutExpo",
    });
  }, [menuOpen, shouldReduce]);

  // Active section tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ["projects", "skills", "contact"];
      for (const id of [...sections].reverse()) {
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

  // Close menu on scroll
  useEffect(() => {
    const handleScroll = () => setMenuOpen(false);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          className="nav-item opacity-0 text-gray-900 dark:text-white font-black text-base md:text-lg tracking-tight hover:text-violet-500 transition-colors"
          onClick={() => {
            setMenuOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          Portfolio
        </button>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`nav-item opacity-0 text-xs md:text-sm tracking-widest uppercase transition-colors ${
                  activeSection === link.href
                    ? "text-violet-500"
                    : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {link.label}
                {activeSection === link.href && (
                  <span className="block h-px w-full bg-violet-500 mt-0.5" />
                )}
              </button>
            ))}
          </div>

          {/* Theme toggle — always visible */}
          <ThemeToggle />

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] rounded-full border border-gray-300 dark:border-gray-700 hover:border-violet-500 transition-colors"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-4 h-[1.5px] bg-gray-600 dark:bg-gray-400 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`}
            />
            <span
              className={`block w-4 h-[1.5px] bg-gray-600 dark:bg-gray-400 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-4 h-[1.5px] bg-gray-600 dark:bg-gray-400 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800/50 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`mobile-nav-item opacity-0 text-left py-3 text-sm tracking-widest uppercase transition-colors border-b border-gray-100 dark:border-gray-800/50 last:border-0 ${
                  activeSection === link.href
                    ? "text-violet-500"
                    : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

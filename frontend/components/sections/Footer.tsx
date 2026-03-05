"use client";
import { useEffect } from "react";
import anime from "animejs";

export default function Footer() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: ".footer-item",
              opacity: [0, 1],
              translateY: [10, 0],
              delay: anime.stagger(80),
              duration: 600,
              easing: "easeOutExpo",
            });
          }
        });
      },
      { threshold: 0.5 },
    );

    const footer = document.querySelector("footer");
    if (footer) observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <footer className="bg-white dark:bg-[#0a0a0a] border-t border-gray-200 dark:border-gray-800/50 py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left */}
        <p className="footer-item opacity-0 text-gray-400 dark:text-gray-600 text-sm">
          Built with Next.js, Django & Anime.js
        </p>

        {/* Center */}
        <p className="footer-item opacity-0 text-gray-400 dark:text-gray-700 text-xs tracking-widest uppercase">
          © {new Date().getFullYear()} — All rights reserved
        </p>

        {/* Right — back to top */}
        <button
          className="footer-item opacity-0 text-gray-500 hover:text-violet-400 transition-colors text-sm tracking-widest uppercase"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}

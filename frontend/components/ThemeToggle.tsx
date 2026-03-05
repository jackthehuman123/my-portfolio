"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none ${
        isDark ? "bg-violet-600" : "bg-gray-300"
      }`}
    >
      {/* Track shine */}
      <span
        className={`absolute inset-0 rounded-full transition-opacity duration-200 ${
          isDark ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
        }}
      />

      {/* Thumb */}
      <span
        className={`absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
          isDark ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

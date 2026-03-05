"use client";
import { useEffect, useRef } from "react";
import anime from "animejs";
import { Profile } from "@/types";
import { Button } from "@/components/ui/button";

export default function Hero({ profile }: { profile: Profile }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Main entrance timeline
    anime
      .timeline({ easing: "easeOutExpo" })
      .add({
        targets: ".hero-letter",
        opacity: [0, 1],
        translateY: [80, 0],
        delay: anime.stagger(50),
        duration: 900,
      })
      .add(
        {
          targets: ".hero-title",
          opacity: [0, 1],
          translateX: [-20, 0],
          duration: 700,
        },
        "-=400",
      )
      .add(
        {
          targets: ".hero-bio",
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 600,
        },
        "-=300",
      )
      .add(
        {
          targets: ".hero-buttons",
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 500,
        },
        "-=200",
      )
      .add(
        {
          targets: ".hero-socials",
          opacity: [0, 1],
          translateX: [-20, 0],
          delay: anime.stagger(100),
          duration: 400,
        },
        "-=200",
      );

    // Floating orbs — loop forever
    anime({
      targets: ".orb-1",
      translateY: [-20, 20],
      translateX: [-10, 10],
      direction: "alternate",
      loop: true,
      duration: 4000,
      easing: "easeInOutSine",
    });

    anime({
      targets: ".orb-2",
      translateY: [20, -20],
      translateX: [10, -10],
      direction: "alternate",
      loop: true,
      duration: 5000,
      easing: "easeInOutSine",
    });
  }, []);

  // Split name into individual letters for stagger animation
  const letters = profile.name.split("").map((char, i) => (
    <span
      key={i}
      className="hero-letter inline-block opacity-0"
      style={{ whiteSpace: char === " " ? "pre" : "normal" }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Background orbs */}
      <div className="orb-1 absolute w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] top-10 -left-20 pointer-events-none" />
      <div className="orb-2 absolute w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] bottom-10 -right-20 pointer-events-none" />

      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div
        ref={containerRef}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
      >
        {/* Animated name */}
        <h1 className="text-6xl md:text-8xl font-black tracking-tight text-white mb-4">
          {letters}
        </h1>

        {/* Title */}
        <p className="hero-title opacity-0 text-xl md:text-2xl text-violet-400 font-light mb-6 tracking-widest uppercase">
          {profile.title}
        </p>

        {/* Bio */}
        <p className="hero-bio opacity-0 text-gray-400 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
          {profile.bio}
        </p>

        {/* CTA Buttons */}
        <div className="hero-buttons opacity-0 flex gap-4 justify-center mb-12">
          <Button
            size="lg"
            className="bg-violet-600 hover:bg-violet-500 text-white rounded-full px-8"
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            View My Work
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-8 border-gray-700 text-gray-300 hover:bg-gray-800"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Contact Me
          </Button>
        </div>

        {/* Social links */}
        <div className="flex gap-6 justify-center">
          {profile.github && (
            <a
              href={profile.github}
              target="_blank"
              className="hero-socials opacity-0 text-gray-500 hover:text-white transition-colors text-sm tracking-widest uppercase"
            >
              GitHub
            </a>
          )}
          {profile.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              className="hero-socials opacity-0 text-gray-500 hover:text-white transition-colors text-sm tracking-widest uppercase"
            >
              LinkedIn
            </a>
          )}
          {profile.email && (
            <a
              href={`mailto:${profile.email}`}
              className="hero-socials opacity-0 text-gray-500 hover:text-white transition-colors text-sm tracking-widest uppercase"
            >
              Email
            </a>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent to-violet-500 mx-auto animate-pulse" />
      </div>
    </section>
  );
}

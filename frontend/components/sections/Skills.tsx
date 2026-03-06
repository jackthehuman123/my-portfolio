"use client";
import { useEffect, useRef } from "react";
import anime from "animejs";
import { Skill } from "@/types";
import { useReducedMotion } from "@/hooks/useReducedMotion";
const CATEGORIES = [
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "tools", label: "Tools & DevOps" },
];

export default function Skills({ skills }: { skills: Skill[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            if (shouldReduce) {
              // Make everything visible instantly
              document
                .querySelectorAll(".skills-title, .skill-category, .skill-row")
                .forEach((el) => ((el as HTMLElement).style.opacity = "1"));
              // Still animate bars but faster
              document.querySelectorAll(".skill-bar").forEach((bar) => {
                const width = bar.getAttribute("data-width");
                anime({
                  targets: bar,
                  width: `${width}%`,
                  duration: 600,
                  easing: "easeOutCubic",
                });
              });
              return;
            }

            anime({
              targets: ".skills-title",
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 700,
              easing: "easeOutExpo",
            });

            anime({
              targets: ".skill-category",
              opacity: [0, 1],
              translateX: [-20, 0],
              delay: anime.stagger(100),
              duration: 600,
              easing: "easeOutExpo",
            });

            anime({
              targets: ".skill-row",
              opacity: [0, 1],
              translateX: [-20, 0],
              delay: anime.stagger(80),
              duration: 500,
              easing: "easeOutExpo",
            });

            setTimeout(() => {
              document.querySelectorAll(".skill-bar").forEach((bar) => {
                const width = bar.getAttribute("data-width");
                anime({
                  targets: bar,
                  width: `${width}%`,
                  duration: 1200,
                  easing: "easeOutCubic",
                });
              });
            }, 400);
          }
        });
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [skills, shouldReduce]);

  const groupedSkills = CATEGORIES.reduce(
    (acc, cat) => {
      acc[cat.key] = skills.filter((s) => s.category === cat.key);
      return acc;
    },
    {} as Record<string, Skill[]>,
  );

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-32 bg-gray-50 dark:bg-[#0d0d0d] relative"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-16">
          <p className="skills-title opacity-0 text-cyan-400 text-sm tracking-widest uppercase mb-3">
            What I Know
          </p>
          <h2 className="skills-title opacity-0 text-4xl md:text-5xl font-black text-gray-900 dark:text-white">
            Skills
          </h2>
        </div>

        {/* Skills by category */}
        <div className="space-y-16">
          {CATEGORIES.map((cat) => {
            const catSkills = groupedSkills[cat.key] || [];
            if (catSkills.length === 0) return null;

            return (
              <div key={cat.key}>
                {/* Category label */}
                <h3 className="skill-category opacity-0 text-gray-500 text-xs tracking-widest uppercase mb-6 flex items-center gap-3">
                  <span className="inline-block w-8 h-px bg-gray-300 dark:bg-gray-700" />
                  {cat.label}
                </h3>

                {/* Skills list */}
                <div className="space-y-5">
                  {catSkills.map((skill) => (
                    <div key={skill.id} className="skill-row opacity-0">
                      {/* Skill name + percentage */}
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-800 dark:text-white text-sm font-medium">
                          {skill.name}
                        </span>
                        <span className="text-gray-500 text-xs">
                          {skill.proficiency}%
                        </span>
                      </div>

                      {/* Progress bar track */}
                      <div className="h-[3px] bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="skill-bar h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500"
                          style={{ width: "0%" }}
                          data-width={skill.proficiency}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {skills.length === 0 && (
          <div className="text-center text-gray-600 py-20">
            No skills yet — add some via the Django admin.
          </div>
        )}
      </div>
    </section>
  );
}

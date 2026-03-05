"use client";

import React, { useEffect, useRef } from "react";
import anime from "animejs";
import { Project } from "@/types";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

export default function Projects({ projects }: { projects: Project[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            // Section title
            anime({
              targets: ".projects-title",
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 700,
              easing: "easeOutExpo",
            });

            // Cards staggered entrance
            anime({
              targets: ".project-card",
              opacity: [0, 1],
              translateY: [60, 0],
              delay: anime.stagger(150),
              duration: 800,
              easing: "easeOutExpo",
            });
          }
        });
      },
      { threshold: 0.05 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleCardHover = (e: React.MouseEvent, entering: boolean) => {
    anime({
      targets: e.currentTarget,
      scale: entering ? 1.03 : 1,
      duration: 300,
      easing: "easeOutCubic",
    });
  };
  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-32 bg-white dark:bg-[#0a0a0a] relative"
    >
      {/* Subtle top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-violet-500/50" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-16">
          <p className="projects-title opacity-0 text-violet-400 text-sm tracking-widest uppercase mb-3">
            My Work
          </p>
          <h2 className="projects-title opacity-0 text-4xl md:text-5xl font-black text-gray-900 dark:text-white">
            Projects
          </h2>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="project-card opacity-0 bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 overflow-hidden cursor-pointer group min-h-[200px]"
              onMouseEnter={(e) => handleCardHover(e, true)}
              onMouseLeave={(e) => handleCardHover(e, false)}
            >
              {/* Project image */}
              {project.image_url ? (
                <div className="w-full h-48 overflow-hidden">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 flex items-center justify-center">
                  <span className="text-gray-600 text-sm">No preview</span>
                </div>
              )}

              {/* Card content */}
              <div className="p-6">
                <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech stack badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech_stack.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="bg-violet-500/10 text-violet-300 border border-violet-500/20 text-xs"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  {project.live_url && (
                    <Button
                      size="sm"
                      className="bg-violet-600 hover:bg-violet-500 text-white rounded-full text-xs px-4"
                      onClick={() => window.open(project.live_url, "_blank")}
                    >
                      Live Site
                    </Button>
                  )}
                  {project.github_url && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full text-xs px-4 border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={() => window.open(project.github_url, "_blank")}
                    >
                      GitHub
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty state */}
        {projects.length === 0 && (
          <div className="text-center text-gray-600 py-20">
            No projects yet — add some via the Django admin.
          </div>
        )}
      </div>
    </section>
  );
}

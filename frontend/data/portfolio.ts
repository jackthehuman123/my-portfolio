export const profile = {
  name: "Hung Nguyen",
  id: 1,
  title: "Full Stack Developer",
  bio: "I like to build things.",
  avatar_url: "https://github.com/jackthehuman123.png",
  github: "https://github.com/jacthehuman123",
  linkedin: "https://www.linkedin.com/in/hung-nguyen-724267338/",
  email: "giahung25@vt.edu",
};

export const projects = [
  {
    id: 1,
    title: "Personal Blog",
    description: "My own personal blog, where I share my thoughts.",
    tech_stack: ["Next.js", "Django", "PostgreSQL"],
    live_url: "https://personal-blog-2-next-js.onrender.com/blogs/",
    github_url: "https://github.com/jackthehuman123/personal-blog",
    image_url: "/images/personal-blog-png.png",
    order: 0,
    created_at: "2026-3-2",
  },
];

export const skills = [
  // Frontend
  { id: 1, name: "React", category: "frontend" as const, proficiency: 85 },
  { id: 2, name: "TypeScript", category: "frontend" as const, proficiency: 80 },
  { id: 3, name: "Next.js", category: "frontend" as const, proficiency: 80 },

  // Backend
  { id: 4, name: "Python", category: "backend" as const, proficiency: 90 },
  { id: 5, name: "Django", category: "backend" as const, proficiency: 85 },
  { id: 6, name: "PostgreSQL", category: "backend" as const, proficiency: 75 },

  // Tools
  { id: 7, name: "Git", category: "tools" as const, proficiency: 85 },
];

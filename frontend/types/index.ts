export interface Profile {
  id: number;
  name: string;
  title: string;
  bio: string;
  avatar_url: string;
  github: string;
  linkedin: string;
  email: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tech_stack: string[];
  live_url: string;
  github_url: string;
  image_url: string;
  order: number;
  created_at: string;
}

export interface Skill {
  id: number;
  name: string;
  category: "frontend" | "backend" | "tools";
  proficiency: number;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

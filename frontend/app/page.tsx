import { profile, projects, skills } from "@/data/portfolio";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero profile={profile} />
      <Projects projects={projects} />
      <Skills skills={skills} />
      <Contact />
    </main>
  );
}

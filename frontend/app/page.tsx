import { getProfile, getProjects, getSkills } from "@/lib/api";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

export default async function Home() {
  const [profile, projects, skills] = await Promise.all([
    getProfile(),
    getProjects(),
    getSkills(),
  ]);

  return (
    <main>
      <Hero profile={profile} />
      <Projects projects={projects} />
      <Skills skills={skills} />
      <Contact />
    </main>
  );
}

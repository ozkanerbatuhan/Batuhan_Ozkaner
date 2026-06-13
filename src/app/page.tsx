import { getPublicProjects } from "@/lib/projects";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";

export default async function HomePage() {
  const projects = await getPublicProjects();

  return (
    <>
      <span id="top" />
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Experience />
        <Projects projects={projects} />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

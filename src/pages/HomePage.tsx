import { About } from "../components/sections/About";
import { Certifications } from "../components/sections/Certifications";
import { Contact } from "../components/sections/Contact";
import { Education } from "../components/sections/Education";
import { Experience } from "../components/sections/Experience";
import { Hero } from "../components/sections/Hero";
import { Skills } from "../components/sections/Skills";
import { Timeline } from "../components/sections/Timeline";
import { Work } from "../components/sections/Work";

export function HomePage() {
  return (
    <main id="content">
      <Hero />
      <Work />
      <Experience />
      <Skills />
      <Education />
      <Timeline />
      <Certifications />
      <About />
      <Contact />
    </main>
  );
}

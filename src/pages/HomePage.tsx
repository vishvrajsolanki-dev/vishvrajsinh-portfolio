import { useScrollAnimations, useScrollProgress } from "../hooks/useScrollAnimations";
import { usePointerSpotlight } from "../hooks/usePointerSpotlight";
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
  useScrollAnimations(true);
  usePointerSpotlight(true);
  useScrollProgress();

  return (
    <main id="content">
      <div className="scroll-progress" data-scroll-progress aria-hidden />
      <Hero />
      <About />
      <Work />
      <Experience />
      <Skills />
      <Education />
      <Timeline />
      <Certifications />
      <Contact />
    </main>
  );
}

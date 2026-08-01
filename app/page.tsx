import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import DigitalTwin from "@/components/DigitalTwin";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Stats from "@/components/Stats";
import Projects from "@/components/Projects";
import Research from "@/components/Research";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SurveyCursor from "@/components/SurveyCursor";
import ResearchHook from "@/components/ResearchHook";
import ResearchPeek from "@/components/ResearchPeek";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F6F4EC]">
      <SurveyCursor />
      <Navbar />
      <Hero />
      <About />
      <DigitalTwin />
      <ResearchHook
        slug="agentic-site-selection-due-diligence-ireland-uk"
        kicker="Field research · Real estate"
        variant="verdant"
      />
      <Stats />
      <Skills />
      <Experience />
      <ResearchHook
        slug="predictive-design-multi-dimensional-forecasting-embodied-carbon"
        kicker="Field research · Architecture"
        variant="clay"
      />
      <Projects />
      <Research />
      <Contact />
      <Footer />
      <ResearchPeek />
    </main>
  );
}


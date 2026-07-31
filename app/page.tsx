import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import DigitalTwin from "@/components/DigitalTwin";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Stats from "@/components/Stats";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SurveyCursor from "@/components/SurveyCursor";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F6F4EC]">
      <SurveyCursor />
      <Navbar />
      <Hero />
      <About />
      <DigitalTwin />
      <Stats />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}


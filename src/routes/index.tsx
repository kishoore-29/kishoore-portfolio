import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import BootSequence from "@/components/effects/BootSequence";
import MatrixRain from "@/components/effects/MatrixRain";
import ScanlineOverlay from "@/components/effects/ScanlineOverlay";
import NavHUD from "@/components/hud/NavHUD";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Interests from "@/components/sections/Interests";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Achievements from "@/components/sections/Achievements";
import CertificationsExplorer from "@/components/sections/CertificationsExplorer";
import ResumeViewer from "@/components/sections/ResumeViewer";
import Terminal from "@/components/sections/Terminal";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kishoore — Engineering systems beyond abstraction" },
      { name: "description", content: "Cyberpunk portfolio of Kishoore — CS engineer focused on systems, networks, Linux, and ethical hacking." },
      { property: "og:title", content: "Kishoore — Engineering systems beyond abstraction" },
      { property: "og:description", content: "Web developer · problem solver · Linux user · network enthusiast · exploring ethical hacking." },
    ],
  }),
  component: Index,
});

function Index() {
  const [booted, setBooted] = useState(false);
  return (
    <main className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <MatrixRain density={0.7} opacity={0.10} />
      <ScanlineOverlay />
      <NavHUD />
      {!booted && <BootSequence onDone={() => setBooted(true)} />}
      <Hero />
      <About />
      <Interests />
      <Skills />
      <Experience />
      <Projects />
      <Achievements />
      <CertificationsExplorer />
      <ResumeViewer />
      <Terminal />
      <Contact />
      <Footer />
    </main>
  );
}

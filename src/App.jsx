import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { BackToTop } from "@/components/layout/BackToTop";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { PersistentNetworkBackground } from "@/components/layout/PersistentNetwork";
import { TerminalWidget } from "@/components/sections/TerminalWidget";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Skills } from "@/components/sections/Skills";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { Achievements } from "@/components/sections/Achievements";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";

export default function App() {
  return (
    <ThemeProvider>
      <LoadingScreen />
      <ScrollProgress />
      <CustomCursor />
      <PersistentNetworkBackground />
      <div className="scanline" />
      <div className="relative z-10 overflow-x-clip">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
          {/* <Education /> */}
          <Skills />
          <Services />
          <Projects />
          {/* <Achievements /> */}
          {/* <Certifications /> */}
          <Contact />
        </main>
        <Footer />
      </div>
      <BackToTop />
      <TerminalWidget />
    </ThemeProvider>
  );
}

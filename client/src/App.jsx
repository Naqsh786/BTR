import { useEffect, lazy, Suspense } from "react";
import { ScrollTrigger } from "./lib/gsap";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Hero from "./sections/Hero";
import Marquee from "./sections/Marquee";
import Ethos from "./sections/Ethos";
import About from "./sections/About";
import Services from "./sections/Services";
import Work from "./sections/Work";

const Values = lazy(() => import("./sections/Values"));
const Process = lazy(() => import("./sections/Process"));
const Testimonials = lazy(() => import("./sections/Testimonials"));
const Faq = lazy(() => import("./sections/Faq"));
const Contact = lazy(() => import("./sections/Contact"));

export default function App() {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-cream text-ink">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Ethos />
        <About />
        <Services />
        <Work />
        <Suspense fallback={null}>
          <Values />
          <Process />
          <Testimonials />
          <Faq />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

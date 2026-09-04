import { useEffect, lazy, Suspense, useState, useCallback } from "react";
import { ScrollTrigger } from "./lib/gsap";
import { useLenis } from "./hooks/useLenis.jsx";
import { LenisProvider } from "./hooks/LenisProvider.jsx";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Preloader from "./components/ui/Preloader";

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
  const lenisRef = useLenis();
  const [ready, setReady] = useState(false);

  const onPreloadComplete = useCallback(() => setReady(true), []);

  useEffect(() => {
    if (!ready) return;
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, [ready]);

  return (
    <LenisProvider value={lenisRef}>
      <Preloader onComplete={onPreloadComplete} />
      <div className={`relative min-h-screen overflow-x-hidden bg-cream text-ink ${ready ? "" : "invisible"}`}>
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
    </LenisProvider>
  );
}

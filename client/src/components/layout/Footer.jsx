import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { gsap, useGSAP } from "../../lib/gsap";
import { useLenisInstance } from "../../hooks/useLenis.jsx";

const footerCols = [
  {
    title: "Navigate",
    links: [
      { label: "Home", href: "#home" },
      { label: "Services", href: "#services" },
      { label: "Our Work", href: "#work" },
      { label: "About", href: "#about" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Bathroom Renovations", href: "#services" },
      { label: "Custom Showers & Waterproofing", href: "#services" },
      { label: "Kitchen & Backsplashes", href: "#services" },
      { label: "Flooring", href: "#services" },
      { label: "In-Floor Heating", href: "#services" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "(705) 706-2329", href: "tel:7057062329" },
      { label: "kevinsr@beyondtheridge.ca", href: "mailto:kevinsr@beyondtheridge.ca" },
      { label: "Muskoka, Ontario, Canada", href: null },
      { label: "Monday – Sunday · 7 AM – 7 PM", href: null },
    ],
  },
];

export default function Footer() {
  const footerRef = useRef(null);
  const lenis = useLenisInstance();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    if (lenis?.current) {
      lenis.current.scrollTo(0, { duration: 1.4 });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useGSAP(
    () => {
      const q = gsap.utils.selector(footerRef);

      gsap.set(q("[data-f-reveal]"), { opacity: 0, y: 16 });
      gsap.to(q("[data-f-reveal]"), {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          once: true,
        },
      });
    },
    { scope: footerRef }
  );

  return (
    <>
      <footer
        ref={footerRef}
        className="relative overflow-hidden bg-ink text-cream"
      >
        <div className="px-6 pt-16 pb-0 md:px-10 md:pt-20">
        {/* Top row: Brand + Link columns */}
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          {/* Brand */}
          <div className="max-w-sm lg:flex-1" data-f-reveal>
            <a href="#home" className="inline-block">
              <span className="font-serif text-2xl font-bold uppercase tracking-[-0.02em] text-cream">
                Beyond The Ridge
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-cream/60">
              We are a specialist tiling company for you. Specializing in custom tile, bathroom
              renovations, and flooring solutions across Muskoka, Ontario.
            </p>
          </div>

          {/* Link columns */}
          <div
            className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3 md:gap-12"
            data-f-reveal
          >
            {footerCols.map((col) => (
              <div key={col.title}>
                <p className="text-sm font-medium text-cream">{col.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.href ? (
                        <a
                          href={link.href}
                          className="text-sm text-cream/50 transition-colors hover:text-clay"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <span className="text-sm text-cream/50">
                          {link.label}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-14 flex flex-col gap-3 border-t border-cream/10 pt-6 pb-4 text-xs text-cream/45 sm:flex-row sm:items-center sm:justify-between"
          data-f-reveal
        >
          <p>
            &copy; 2026 Beyond The Ridge. All rights reserved.
          </p>
          <a
            href="#home"
            className="text-cream/50 transition-colors hover:text-cream"
          >
            Back to top
          </a>
        </div>
      </div>

      {/* Bottom branding */}
      <div className="border-t border-cream/10 px-6 pt-10 md:px-10 md:pt-14">
        <a
          href="#home"
          className="block overflow-hidden text-center font-bold text-[clamp(3rem,10vw,10rem)] uppercase leading-[0.82] tracking-[-0.06em] text-clay/20 transition-colors hover:text-clay/35"
        >
          Beyond The Ridge
        </a>
        </div>
      </footer>

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        title="Back to top"
        className={`fixed bottom-5 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-cream/20 bg-clay text-cream shadow-[0_10px_28px_rgba(37,37,37,0.18)] transition-all duration-500 hover:-translate-y-1 hover:bg-clay-deep hover:shadow-[0_14px_32px_rgba(37,37,37,0.24)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay md:bottom-8 md:right-8 ${
          showBackToTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <ArrowUp size={18} strokeWidth={1.75} />
      </button>
    </>
  );
}

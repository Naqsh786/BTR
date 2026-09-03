import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { business, nav, services, footer } from "../../data/site";

const footerCols = [
  {
    title: "Navigate",
    links: nav.map((n) => ({ label: n.label, href: n.href })),
  },
  {
    title: "Services",
    links: services.slice(0, 5).map((s) => ({ label: s.title, href: "#services" })),
  },
  {
    title: "Contact",
    links: [
      { label: business.phone, href: business.phoneHref },
      { label: business.email, href: `mailto:${business.email}` },
      { label: business.location, href: null },
      { label: business.hours, href: null },
    ],
  },
];

export default function Footer() {
  const footerRef = useRef(null);

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
                {business.name}
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-cream/60">
              {footer.tagline} Specializing in custom tile, bathroom
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
            &copy; {footer.year} {business.name}. All rights reserved.
          </p>
          <a
            href="#home"
            className="text-cream/50 transition-colors hover:text-cream"
          >
            Back to top
          </a>
        </div>
      </div>

      {/* ===== Oversized Wordmark ===== */}
      <div className="relative w-full overflow-hidden" style={{ height: "clamp(120px, 22vw, 300px)" }}>
        <a
          href="#home"
          className="absolute inset-x-0 bottom-0 block w-full text-center font-bold uppercase text-clay/20 transition-colors hover:text-clay/35"
          style={{
            fontSize: "clamp(80px, 18vw, 340px)",
            lineHeight: "0.85",
            letterSpacing: "-0.075em",
            mask: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgb(0,0,0) 100%)",
            WebkitMask: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgb(0,0,0) 100%)",
          }}
        >
          {business.name}
        </a>
      </div>
    </footer>
  );
}

import { useRef } from "react";
import { ArrowUpRight, Phone, Mail } from "lucide-react";
import { gsap, useGSAP } from "../lib/gsap";
import { business, kitchenWhite } from "../data/site";

export default function Contact() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(rootRef);

      gsap.set(q("[data-cta-reveal]"), { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 70%",
          once: true,
        },
      });

      tl.to(q("[data-cta-reveal]"), {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Subtle image parallax
      gsap.to(q("[data-cta-img]"), {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: rootRef }
  );

  return (
    <section id="contact" ref={rootRef} className="relative min-h-[85vh] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          data-cta-img
          src={kitchenWhite}
          alt=""
          aria-hidden="true"
          loading="lazy"
          width="2048"
          height="1365"
          className="absolute inset-x-0 top-[-10%] h-[120%] w-full object-cover will-change-transform"
        />
      </div>

      {/* Scrims */}
      <div className="pointer-events-none absolute inset-0 bg-ink/60" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-ink/30" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[85vh] flex-col items-center justify-center px-6 text-center">
        <div data-cta-reveal className="flex items-center gap-4 text-cream">
          <span className="h-px w-10 bg-clay" />
          <span className="kicker text-cream/70">Get in touch</span>
          <span className="h-px w-10 bg-clay" />
        </div>

        <h2
          data-cta-reveal
          className="mt-8 font-serif text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-[-0.02em] text-cream"
        >
          Ready to go
          <br />
          <span className="text-clay">beyond?</span>
        </h2>

        <p
          data-cta-reveal
          className="mt-6 max-w-lg text-lg leading-relaxed text-cream/70"
        >
          Tell us about your space and your vision. We&rsquo;ll get back to you
          with a clear, honest estimate — no surprises.
        </p>

        {/* CTAs */}
        <div data-cta-reveal className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={business.phoneHref}
            className="group inline-flex items-center gap-2 rounded-full bg-clay px-8 py-4 text-[0.8rem] font-medium uppercase tracking-[0.14em] text-cream transition-colors duration-300 hover:bg-clay-deep"
          >
            Get your free estimate
            <ArrowUpRight
              size={17}
              strokeWidth={1.75}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
          <a
            href={`mailto:${business.email}`}
            className="group inline-flex items-center gap-2 rounded-full border border-cream/30 px-8 py-4 text-[0.8rem] font-medium uppercase tracking-[0.14em] text-cream transition-colors duration-300 hover:border-cream hover:bg-cream hover:text-ink"
          >
            Send an email
          </a>
        </div>

        {/* Contact details */}
        <div
          data-cta-reveal
          className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-cream/15 pt-8"
        >
          <a
            href={business.phoneHref}
            className="flex items-center gap-3 text-cream/70 transition-colors hover:text-cream"
          >
            <Phone size={16} strokeWidth={1.75} className="text-clay" />
            <span className="text-sm">{business.phone}</span>
          </a>
          <a
            href={`mailto:${business.email}`}
            className="flex items-center gap-3 text-cream/70 transition-colors hover:text-cream"
          >
            <Mail size={16} strokeWidth={1.75} className="text-clay" />
            <span className="text-sm">{business.email}</span>
          </a>
          <span className="flex items-center gap-3 text-cream/50">
            <span className="text-sm">{business.location}</span>
          </span>
        </div>
      </div>
    </section>
  );
}

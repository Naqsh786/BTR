import { useRef } from "react";
import { Sparkles, Hammer, Leaf, PencilRuler } from "lucide-react";
import { gsap, useGSAP } from "../lib/gsap";
import { values } from "../data/site";

const iconMap = { Sparkles, Hammer, Leaf, PencilRuler };

const prefersReduced =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const keyPoints = [
  {
    number: "01",
    title: "Experience",
    body: "Over 20 years of hands-on craftsmanship in tile, flooring, and renovations across Muskoka.",
  },
  {
    number: "02",
    title: "Quality Craftsmanship",
    body: "Every detail is executed with precision — from waterproofing to the final grout line.",
  },
  {
    number: "03",
    title: "Personalized Approach",
    body: "Tailored solutions that reflect your style, space, and budget — never a one-size-fits-all.",
  },
  {
    number: "04",
    title: "Attention to Detail",
    body: "Clear communication, clean execution, and results built to last a lifetime.",
  },
];

export default function Values() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(sectionRef);

      if (prefersReduced) {
        gsap.set(q("[data-v-el]"), { opacity: 1, y: 0 });
        return;
      }

      gsap.set(q("[data-v-el]"), { opacity: 0, y: 32 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          once: true,
        },
      });

      tl.to(q("[data-v-el]"), {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-sand">
      <div className="px-6 py-20 md:px-10 md:py-32">
        {/* Kicker */}
        <div data-v-el className="flex items-center gap-4 text-clay">
          <span className="h-px w-10 bg-clay" />
          <span className="kicker">Why beyond the ridge</span>
        </div>

        {/* Editorial statement */}
        <div data-v-el className="mt-8 max-w-4xl">
          <h2 className="font-serif text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-[-0.02em] text-ink">
            20+ years.
            <br />
            One standard.
            <br />
            <span className="text-clay">Exceptional craftsmanship.</span>
          </h2>
        </div>

        {/* Description */}
        <p
          data-v-el
          className="mt-8 max-w-xl text-lg leading-relaxed text-ink/60"
        >
          Trusted by homeowners and builders across Muskoka, we bring over two
          decades of experience to every project — with clear communication and
          results that speak for themselves.
        </p>

        {/* 4 Key points */}
        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {keyPoints.map((point, i) => (
            <div
              key={point.number}
              data-v-el
              className="bg-sand p-8 transition-colors duration-500 hover:bg-cream"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="font-serif text-3xl text-clay/60">
                {point.number}
              </span>
              <h3 className="mt-4 font-serif text-xl text-ink">{point.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/55">
                {point.body}
              </p>
            </div>
          ))}
        </div>

        {/* Values strip — icon row */}
        <div className="mt-16 grid grid-cols-2 gap-6 border-t border-ink/10 pt-12 sm:grid-cols-4">
          {values.map((v, i) => {
            const Icon = iconMap[v.icon] ?? Sparkles;
            return (
              <div
                key={v.title}
                data-v-el
                className="flex items-start gap-4"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-clay/25 text-clay">
                  <Icon size={18} strokeWidth={1.5} />
                </span>
                <div>
                  <h4 className="font-serif text-sm text-ink">{v.title}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-ink/50">
                    {v.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

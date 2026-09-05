import { useRef } from "react";
import { Sparkles, Hammer, Leaf, PencilRuler } from "lucide-react";
import { gsap, useGSAP } from "../lib/gsap";

const iconMap = { Sparkles, Hammer, Leaf, PencilRuler };

const values = [
  { icon: "Sparkles", title: "Elevate spaces", body: "Every project is designed to enhance your home's comfort, beauty, and functionality." },
  { icon: "Hammer", title: "Quality craftsmanship", body: "With 20+ years of experience, we deliver work built to last a lifetime." },
  { icon: "Leaf", title: "Environmental responsibility", body: "We source durable, eco-friendly materials wherever possible." },
  { icon: "PencilRuler", title: "Personalized design", body: "Tailored solutions that reflect your unique style and needs." },
];

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

      const floatTimeline = gsap.timeline({ repeat: -1, yoyo: true });
      floatTimeline
        .to(q("[data-v-shape]"), {
          x: 7,
          y: -18,
          duration: 4.8,
          ease: "sine.inOut",
        })
        .to(
          q("[data-v-blob]"),
          {
            scaleX: 1.035,
            scaleY: 0.975,
            rotation: 3,
            duration: 4.8,
            ease: "sine.inOut",
          },
          0
        )
        .to(
          q("[data-v-shape]"),
          {
            x: -5,
            y: -31,
            duration: 5.6,
            ease: "sine.inOut",
          }
        )
        .to(
          q("[data-v-blob]"),
          {
            scaleX: 0.975,
            scaleY: 1.035,
            rotation: -2,
            duration: 5.6,
            ease: "sine.inOut",
          },
          "<"
        );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-sand">
      <div
        data-v-shape
        aria-hidden="true"
        className="pointer-events-none absolute right-[5vw] top-[16%] hidden h-[clamp(260px,28vw,430px)] w-[clamp(260px,28vw,430px)] items-center justify-center opacity-90 lg:flex"
      >
        <div data-v-blob className="absolute inset-0 origin-center">
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full drop-shadow-[0_30px_28px_rgba(37,37,37,0.16)]"
          >
            <path
              fill="none"
              stroke="#6f382d"
              strokeOpacity="0.38"
              strokeWidth="1.2"
              d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,88.5,-0.9C87,14.5,81.4,29,72.6,41.1C63.8,53.2,51.8,62.9,38.4,70.1C25,77.3,10.2,82,-4.3,87.7C-18.8,93.4,-33.1,100.1,-45.3,95.5C-57.5,90.9,-67.6,75,-74.5,58.5C-81.4,42,-85.1,24.9,-86.2,7.7C-87.3,-9.5,-85.8,-26.8,-78.1,-40.3C-70.4,-53.8,-56.5,-63.5,-42.2,-70.4C-27.9,-77.3,-13.9,-81.4,1,-83.5C15.9,-85.6,30.6,-83.6,44.7,-76.4Z"
              transform="translate(100 100)"
            />
            <path
              fill="#874837"
              fillOpacity="0.96"
              d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,88.5,-0.9C87,14.5,81.4,29,72.6,41.1C63.8,53.2,51.8,62.9,38.4,70.1C25,77.3,10.2,82,-4.3,87.7C-18.8,93.4,-33.1,100.1,-45.3,95.5C-57.5,90.9,-67.6,75,-74.5,58.5C-81.4,42,-85.1,24.9,-86.2,7.7C-87.3,-9.5,-85.8,-26.8,-78.1,-40.3C-70.4,-53.8,-56.5,-63.5,-42.2,-70.4C-27.9,-77.3,-13.9,-81.4,1,-83.5C15.9,-85.6,30.6,-83.6,44.7,-76.4Z"
              transform="translate(100 100)"
            />
          </svg>
          <span className="absolute left-[27%] top-[22%] h-8 w-16 rotate-[-28deg] rounded-full bg-cream/20 blur-md" />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-cream">
          <span className="font-serif text-5xl leading-none">20</span>
          <span className="mt-2 text-[0.55rem] font-medium uppercase tracking-[0.28em]">
            years of craft
          </span>
        </div>
      </div>
      
      <div className="px-6 py-20 md:px-10 md:py-32">
        {/* Kicker */}
        <div data-v-el className="flex items-center gap-4 text-clay">
          <span className="h-px w-10 bg-clay" />
          <span className="kicker">Why beyond the ridge</span>
        </div>

        {/* Editorial statement */}
        <div data-v-el className="mt-8 max-w-4xl">
          <h2 className="font-serif md:max-w-3xl text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-[-0.02em] text-ink">
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

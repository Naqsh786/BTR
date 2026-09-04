import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { ethos } from "../data/site";

const prefersReduced =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const pillars = [
  { num: "01", title: "Craftsmanship", desc: "Precision in every tile, every line." },
  { num: "02", title: "Communication", desc: "Clear, honest, always on time." },
  { num: "03", title: "Dedication", desc: "Your vision, our standard." },
];

export default function Ethos() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(rootRef);

      if (prefersReduced) {
        gsap.set(q("[data-e-el]"), { opacity: 1, y: 0 });
        gsap.set(q("[data-e-quote]"), { opacity: 1 });
        gsap.set(q("[data-e-line]"), { scaleX: 1 });
        return;
      }

      gsap.set(q("[data-e-el]"), { opacity: 0, y: 32 });
      gsap.set(q("[data-e-quote]"), { opacity: 0, scale: 0.8 });
      gsap.set(q("[data-e-line]"), { scaleX: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 60%",
          once: true,
        },
      });

      tl.to(q("[data-e-quote]"), {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)",
      })
        .to(
          q("[data-e-line]"),
          { scaleX: 1, duration: 1.2, stagger: 0.08, ease: "power3.inOut" },
          0.3
        )
        .to(
          q("[data-e-el]"),
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
          "-=0.6"
        );
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-ink text-cream grain">
      {/* Large decorative quote mark */}
      <div className="absolute left-6 top-12 font-serif text-[18rem] leading-none text-cream/[0.03] md:left-16 md:top-8 md:text-[28rem]">
        <span data-e-quote>&ldquo;</span>
      </div>

      <div className="shell relative z-10 py-28 md:py-40">
        {/* Kicker */}
        <div data-e-el className="flex items-center gap-4 text-clay">
          <span className="h-px w-10 bg-clay" />
          <span className="kicker">{ethos.kicker}</span>
        </div>

        {/* Statement */}
        <blockquote className="mt-12 max-w-5xl">
          <h2 className="font-serif text-[clamp(2rem,5.5vw,4.5rem)] leading-[1.1] tracking-[-0.02em] text-cream">
            <span className="block overflow-hidden">
              <span data-e-el className="block">Beyond The Ridge is more</span>
            </span>
            <span className="block overflow-hidden">
              <span data-e-el className="block">than a tile contractor —</span>
            </span>
            <span className="block overflow-hidden">
              <span data-e-el className="block">
                <span className="text-clay">we are your renovation partner.</span>
              </span>
            </span>
          </h2>
        </blockquote>

        {/* Divider lines */}
        <div className="mt-14 flex gap-2">
          {[1, 2, 3].map((i) => (
            <span
              key={i}
              data-e-line
              className="h-px flex-1 origin-left bg-cream/10"
            />
          ))}
        </div>

        {/* Body + Pillars */}
        <div className="mt-12 grid gap-12 md:grid-cols-12 md:gap-16">
          {/* Body text */}
          <div data-e-el className="md:col-span-5">
            <p className="text-lg leading-relaxed text-cream/65">
              {ethos.body}
            </p>
            <div className="mt-6 flex items-center gap-3 text-cream/35">
              <span className="h-px w-8 bg-clay/50" />
              <span className="kicker text-[0.6rem]">Muskoka, Ontario</span>
            </div>
          </div>

          {/* 3 Pillars */}
          <div className="md:col-span-7">
            <div className="grid grid-cols-3 gap-px overflow-hidden rounded-sm border border-cream/10 bg-cream/10">
              {pillars.map((p) => (
                <div
                  key={p.num}
                  data-e-el
                  className="bg-ink p-6 transition-colors duration-500 hover:bg-cream/[0.04] md:p-8"
                >
                  <span className="font-serif text-2xl text-clay/50 md:text-3xl">
                    {p.num}
                  </span>
                  <h3 className="mt-3 font-serif text-lg text-cream md:text-xl">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/45">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

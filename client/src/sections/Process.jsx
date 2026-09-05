import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, ScrollTrigger } from "../lib/gsap";

const process = [
  { step: "01", title: "Consultation", body: "We listen to your vision, assess the space, and provide a clear, honest estimate — no surprises." },
  { step: "02", title: "Design & selection", body: "We guide you through materials and layouts tailored to your style, purpose, and budget." },
  { step: "03", title: "Expert craft", body: "Efficient, meticulous installation — waterproofing, tile, heating and finishes done right." },
  { step: "04", title: "The reveal", body: "A polished, lasting result, delivered on a timeline you always know in advance." },
];

export default function Process() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const barRef = useRef(null);
  const [mobileActive, setMobileActive] = useState(0);

  // Desktop: horizontal scroll + progress bar
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const el = trackRef.current;
        const getDist = () =>
          Math.max(0, el.scrollWidth - window.innerWidth);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => "+=" + getDist(),
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Slide track left
        tl.to(el, { x: () => -getDist(), ease: "none" }, 0);

        // Progress bar fills over full scroll
        tl.to(barRef.current, { width: "100%", ease: "none" }, 0);

        // Steps 1-3 animate in (step 0 is always visible via inline styles)
        const steps = el.querySelectorAll("[data-step]");
        const count = steps.length;

        for (let i = 1; i < count; i++) {
          const stepEl = steps[i];
          const start = (i - 1) / (count - 1);
          const dur = 1 / (count - 1);

          tl.fromTo(
            stepEl.querySelector("[data-num]"),
            { opacity: 0, scale: 0.7 },
            { opacity: 1, scale: 1, duration: dur * 0.5, ease: "power2.out" },
            start
          );
          tl.fromTo(
            stepEl.querySelector("[data-title]"),
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: dur * 0.6, ease: "power3.out" },
            start + dur * 0.15
          );
          tl.fromTo(
            stepEl.querySelector("[data-body]"),
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: dur * 0.6, ease: "power3.out" },
            start + dur * 0.3
          );
        }

        ScrollTrigger.refresh();
      });
      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  // Mobile: intersection observer
  useEffect(() => {
    const mm = gsap.matchMedia();
    let observer;

    mm.add("(max-width: 767px)", () => {
      const steps = sectionRef.current?.querySelectorAll("[data-mobile-step]");
      if (!steps?.length) return;

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setMobileActive(Number(entry.target.dataset.mobileStep));
            }
          });
        },
        { threshold: 0.5 }
      );

      steps.forEach((el) => observer.observe(el));
    });

    return () => {
      observer?.disconnect();
      mm.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-cream">
      {/* Header */}
      <div className="px-6 pt-20 md:px-10 md:pt-28">
        <div className="flex items-center gap-4 text-clay">
          <span className="h-px w-10 bg-clay" />
          <span className="kicker">How we work</span>
        </div>
        <h2 className="mt-6 font-serif text-5xl leading-[1.05] tracking-[-0.015em] text-ink md:text-6xl lg:text-[4.5rem]">
          Our process
        </h2>
      </div>

      {/* ===== DESKTOP ===== */}
      <div className="hidden md:block">
        <div className="px-10 pt-8 pb-28 xl:px-16">
          {/* Progress bar */}
          <div className="mb-10 h-px w-full bg-ink/10">
            <div
              ref={barRef}
              className="h-full bg-clay"
              style={{ width: "0%" }}
            />
          </div>

          {/* Track */}
          <div
            ref={trackRef}
            className="flex w-max gap-12 pl-[8vw] pr-[5vw] xl:gap-16"
          >
            {process.map((step, i) => (
              <div
                key={step.step}
                data-step={i}
                className="flex w-[70vw] shrink-0 flex-col justify-center xl:w-[60vw]"
              >
                {/* Step 0 is always visible; steps 1-3 start hidden */}
                <span
                  data-num
                  className="font-serif text-[clamp(4rem,10vw,9rem)] leading-none text-ink/10"
                  style={i === 0 ? { opacity: 1 } : { opacity: 0 }}
                >
                  {step.step}
                </span>
                <h3
                  data-title
                  className="mt-4 font-serif text-4xl text-ink lg:text-5xl"
                  style={i === 0 ? { opacity: 1 } : { opacity: 0, y: 30 }}
                >
                  {step.title}
                </h3>
                <p
                  data-body
                  className="mt-4 max-w-md text-base leading-relaxed text-ink/55"
                  style={i === 0 ? { opacity: 1 } : { opacity: 0, y: 20 }}
                >
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== MOBILE ===== */}
      <div className="px-6 pb-20 pt-10 md:hidden">
        <div className="mb-10 h-px w-full bg-ink/10">
          <div
            className="h-full bg-clay transition-all duration-500"
            style={{
              width: `${(mobileActive / (process.length - 1)) * 100}%`,
            }}
          />
        </div>

        <div className="relative">
          <div className="absolute left-[1.1rem] top-0 bottom-0 w-px bg-ink/10" />
          <div
            className="absolute left-[1.1rem] top-0 w-px bg-clay transition-all duration-500"
            style={{
              height: `${(mobileActive / (process.length - 1)) * 100}%`,
            }}
          />

          {process.map((step, i) => (
            <div
              key={step.step}
              data-mobile-step={i}
              className="relative flex gap-6 py-8"
            >
              <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center">
                <span
                  className={`block h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
                    i <= mobileActive ? "bg-clay" : "bg-ink/15"
                  }`}
                />
              </div>
              <div>
                <span className="font-serif text-sm text-clay">
                  {step.step}
                </span>
                <h3 className="mt-1 font-serif text-2xl text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/55">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

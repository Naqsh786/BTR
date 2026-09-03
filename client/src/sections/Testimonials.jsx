import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { gsap, useGSAP } from "../lib/gsap";
import { testimonials } from "../data/site";
import Stars from "../components/ui/Stars";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const paused = useRef(false);
  const content = useRef(null);
  const t = testimonials[active];
  const len = testimonials.length;

  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) setActive((a) => (a + 1) % len);
    }, 7000);
    return () => clearInterval(id);
  }, [len]);

  useGSAP(
    () => {
      gsap.fromTo(
        content.current.querySelectorAll("[data-t-anim]"),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" }
      );
    },
    { dependencies: [active], scope: content }
  );

  const go = (dir) => setActive((a) => (a + dir + len) % len);

  return (
    <section
      id="testimonials"
      className="relative bg-ink text-cream grain"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <div className="px-6 py-24 md:px-10 md:py-32">
        {/* Header */}
        <div className="flex items-center gap-4 text-clay">
          <span className="h-px w-10 bg-clay" />
          <span className="kicker">Testimonials</span>
        </div>
        <h2 className="mt-7 font-serif text-5xl leading-[1.05] tracking-[-0.015em] text-cream md:text-6xl lg:text-[4.5rem]">
          Trusted by homeowners{" "}
          <span className="text-clay">&amp; builders.</span>
        </h2>

        <div ref={content} className="mt-16 grid gap-12 md:grid-cols-12 md:gap-10">
          {/* Quote */}
          <div className="md:col-span-8">
            {/* Large quotation mark */}
            <span
              data-t-anim
              className="block font-serif text-[clamp(4rem,8vw,8rem)] leading-none text-clay/30"
              aria-hidden="true"
            >
              &ldquo;
            </span>

            <blockquote
              data-t-anim
              className="mt-2 font-serif text-[clamp(1.5rem,3.5vw,3rem)] leading-[1.2] text-cream"
            >
              {t.quote}
            </blockquote>

            <div
              data-t-anim
              className="mt-10 flex items-center gap-5 border-t border-cream/10 pt-8"
            >
              <img
                src={t.image}
                alt={t.name}
                className="h-16 w-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="font-serif text-xl text-cream">{t.name}</p>
                <p className="kicker mt-1 text-[0.6rem] text-cream/50">
                  {t.role}
                </p>
              </div>
              <div className="text-right">
                <Stars value={t.rating} className="justify-end" />
                <p className="mt-1.5 kicker text-[0.6rem] text-cream/50">
                  {t.rating.toFixed(1)} / 5.0
                </p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="md:col-span-4 md:border-l md:border-cream/10 md:pl-10">
            <div className="flex flex-col gap-3">
              {testimonials.map((item, i) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-4 rounded-sm p-3 text-left transition-all duration-300 ${
                    active === i
                      ? "bg-cream/8"
                      : "opacity-40 hover:opacity-80"
                  }`}
                  aria-pressed={active === i}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className={`h-12 w-12 rounded-full object-cover ring-2 transition-all ${
                      active === i ? "ring-clay" : "ring-transparent"
                    }`}
                  />
                  <span>
                    <span className="block font-medium text-cream">
                      {item.name}
                    </span>
                    <span className="kicker text-[0.55rem] text-cream/45">
                      {item.role}
                    </span>
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-4">
              <button
                type="button"
                onClick={() => go(-1)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:border-clay hover:text-clay"
                aria-label="Previous testimonial"
              >
                <ArrowLeft size={18} strokeWidth={1.75} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:border-clay hover:text-clay"
                aria-label="Next testimonial"
              >
                <ArrowRight size={18} strokeWidth={1.75} />
              </button>
              <span className="ml-auto kicker text-[0.6rem] text-cream/50">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(len).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

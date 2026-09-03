import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP } from "../lib/gsap";
import { services } from "../data/site";

export default function Services() {
  const rootRef = useRef(null);
  const imgRef = useRef(null);
  const [active, setActive] = useState(null);

  // Intro stagger on rows + heading
  useGSAP(
    () => {
      const q = gsap.utils.selector(rootRef);

      gsap.set(q("[data-row]"), { opacity: 0, x: -32 });
      gsap.set(q("[data-heading]"), { opacity: 0, y: 28 });

      gsap.to(q("[data-heading]"), {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.to(q("[data-row]"), {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.09,
        delay: 0.15,
        ease: "power3.out",
      });
    },
    { scope: rootRef }
  );

  // Image transition on active change
  useGSAP(
    () => {
      if (!imgRef.current) return;
      gsap.to(imgRef.current, {
        autoAlpha: active !== null ? 1 : 0,
        scale: active !== null ? 1 : 0.92,
        duration: 0.45,
        ease: "power3.out",
      });
    },
    { dependencies: [active] }
  );

  return (
    <section
      id="services"
      ref={rootRef}
      className="relative overflow-hidden bg-cream"
    >
      <div className="px-6 pt-20 pb-24 md:px-10 md:pt-28 md:pb-32">
        {/* Header */}
        <div data-heading className="mb-16 md:mb-20">
          <div className="flex items-center gap-4 text-clay">
            <span className="h-px w-10 bg-clay" />
            <span className="kicker">What we create</span>
          </div>
          <h2 className="mt-6 font-serif text-5xl leading-[1.05] tracking-[-0.015em] text-ink md:text-6xl lg:text-[4.5rem]">
            What we create
          </h2>
        </div>

        {/* Main layout: rows left, floating image right */}
        <div className="relative">
          {/* Service rows */}
          <ul className="relative z-10 max-w-4xl border-t border-ink/10">
            {services.map((s, i) => {
              const isActive = active === i;
              const isDimmed = active !== null && active !== i;

              return (
                <li key={s.id} data-row>
                  <a
                    href="#contact"
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                    className="group flex items-center gap-4 border-b border-ink/10 py-7 transition-all duration-300 md:gap-8 md:py-10"
                    style={{
                      opacity: isDimmed ? 0.35 : 1,
                      paddingLeft: isActive ? "1rem" : "0",
                    }}
                  >
                    {/* Number */}
                    <span
                      className="shrink-0 font-serif text-lg transition-colors duration-300 md:text-2xl"
                      style={{ color: isActive ? "#B86F52" : "rgba(37,37,37,0.3)" }}
                    >
                      {s.index}
                    </span>

                    {/* Vertical accent bar */}
                    <span
                      className="hidden h-8 w-px shrink-0 transition-all duration-400 md:block"
                      style={{
                        backgroundColor: isActive ? "#B86F52" : "rgba(37,37,37,0.08)",
                        transform: `scaleY(${isActive ? 1 : 0.5})`,
                      }}
                    />

                    {/* Title + description */}
                    <div className="min-w-0 flex-1">
                      <h3
                        className="font-serif text-2xl leading-tight text-ink transition-colors duration-300 md:text-4xl lg:text-[2.6rem]"
                        style={{ color: isActive ? "#B86F52" : undefined }}
                      >
                        {s.title}
                      </h3>
                      <p className="mt-1 text-sm text-ink/50 transition-opacity duration-300 md:text-base"
                         style={{ opacity: isActive ? 1 : 0.6 }}
                      >
                        {s.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <span
                      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 md:h-11 md:w-11"
                      style={{
                        borderColor: isActive ? "#B86F52" : "rgba(37,37,37,0.12)",
                        backgroundColor: isActive ? "#B86F52" : "transparent",
                        color: isActive ? "#F7F4EE" : "rgba(37,37,37,0.5)",
                      }}
                    >
                      <ArrowUpRight size={17} strokeWidth={1.75} />
                    </span>

                    {/* Mobile thumbnail */}
                    <img
                      src={s.image}
                      alt=""
                      aria-hidden="true"
                      className="h-16 w-24 shrink-0 rounded-sm object-cover lg:hidden"
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Floating image — desktop only */}
          <div
            ref={imgRef}
            onMouseEnter={() => setActive(active)}
            onMouseLeave={() => setActive(null)}
            className="pointer-events-auto absolute right-0 top-1/2 z-20 hidden -translate-y-1/2 overflow-hidden rounded-sm shadow-2xl lg:block lg:h-[36rem] lg:w-[480px]"
            style={{ opacity: 0 }}
          >
            {services.map((s, i) => (
              <img
                key={s.id}
                src={s.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
                style={{ opacity: active === i ? 1 : 0 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

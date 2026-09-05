import { useRef, useState, useCallback } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP } from "../lib/gsap";
import heroBathroom from "../assets/images/hero-bathroom.jpg";
import bathroomTravertine from "../assets/images/bathroom-travertine.jpg";
import kitchenWhite from "../assets/images/kitchen-white.jpg";
import diningRoom from "../assets/images/dining-room.jpg";
import heating from "../assets/images/heating.jpg";
import kitchenModern from "../assets/images/kitchen-modern.jpg";

const services = [
  { id: "bathroom", index: "01", title: "Bathroom Renovations", description: "Functional, modern and elegant bathrooms reimagined as everyday retreats.", image: heroBathroom },
  { id: "waterproofing", index: "02", title: "Custom Showers & Waterproofing", description: "Seamless custom showers designed for beauty and long-term protection.", image: bathroomTravertine },
  { id: "kitchen", index: "03", title: "Kitchen & Backsplashes", description: "Stylish, protective backsplashes and renovations for the heart of your home.", image: kitchenWhite },
  { id: "flooring", index: "04", title: "Flooring", description: "Quality tile and flooring, expertly sourced and precisely installed.", image: diningRoom },
  { id: "heating", index: "05", title: "In-Floor Heating", description: "Radiant warmth and comfort layered quietly beneath your floors.", image: heating },
  { id: "painting", index: "06", title: "Painting & Trim", description: "The finishing details that complete a renovation, done right.", image: kitchenModern },
];

const prefersReduced =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Services() {
  const rootRef = useRef(null);
  const imgRef = useRef(null);
  const [active, setActive] = useState(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  // Cursor follow
  const onMouseMove = useCallback((e) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        if (imgRef.current) {
          gsap.set(imgRef.current, {
            x: mousePos.current.x + 24,
            y: mousePos.current.y - 180,
          });
        }
        rafRef.current = null;
      });
    }
  }, []);

  // Intro stagger on rows + heading — with ScrollTrigger
  useGSAP(
    () => {
      const q = gsap.utils.selector(rootRef);

      if (prefersReduced) {
        gsap.set(q("[data-s-row]"), { opacity: 1, y: 0 });
        gsap.set(q("[data-s-head]"), { opacity: 1, y: 0 });
        return;
      }

      gsap.set(q("[data-s-row]"), { opacity: 0, y: 30 });
      gsap.set(q("[data-s-head]"), { opacity: 0, y: 28 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 65%",
          once: true,
        },
      });

      tl.to(q("[data-s-head]"), {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      }).to(
        q("[data-s-row]"),
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
        },
        "-=0.5"
      );
    },
    { scope: rootRef }
  );

  // Image transition on active change
  useGSAP(
    () => {
      if (!imgRef.current) return;
      gsap.to(imgRef.current, {
        autoAlpha: active !== null ? 1 : 0,
        scale: active !== null ? 1.05 : 0.9,
        duration: 0.5,
        ease: "power3.out",
      });
    },
    { dependencies: [active] }
  );

  return (
    <section
      id="services"
      ref={rootRef}
      onMouseMove={onMouseMove}
      className="relative overflow-hidden bg-cream"
    >
      <div className="px-6 pt-20 pb-24 md:px-10 md:pt-28 md:pb-32">
        {/* Centered Header */}
        <div className="mb-16 text-center md:mb-20">
          <div data-s-head className="flex items-center justify-center gap-4 text-clay">
            <span className="h-px w-10 bg-clay" />
            <span className="kicker">What we create</span>
            <span className="h-px w-10 bg-clay" />
          </div>
          <h2 data-s-head className="mt-6 font-serif text-5xl leading-[1.05] tracking-[-0.015em] text-ink md:text-6xl lg:text-[4.5rem]">
            What we create
          </h2>
        </div>

        {/* Centered service rows */}
        <div className="mx-auto max-w-4xl">
          <ul className="border-t border-ink/10">
            {services.map((s, i) => {
              const isActive = active === i;
              const isDimmed = active !== null && active !== i;

              return (
                <li key={s.id} data-s-row>
                  <a
                    href="#contact"
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                    className="group flex items-center gap-4 border-b border-ink/10 py-7 transition-all duration-300 md:gap-8 md:py-10"
                    style={{
                      opacity: isDimmed ? 0.3 : 1,
                      paddingLeft: isActive ? "1.5rem" : "0",
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
                      className="hidden h-8 w-px shrink-0 transition-all duration-300 md:block"
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
                      <p
                        className="mt-1 text-sm text-ink/50 transition-opacity duration-300 md:text-base"
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
        </div>

        {/* Cursor-following floating image — desktop */}
        <div
          ref={imgRef}
          className="pointer-events-none fixed left-0 top-0 z-50 hidden overflow-hidden rounded-sm shadow-2xl lg:block"
          style={{ opacity: 0, width: "420px", height: "340px" }}
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
          {/* Label overlay */}
          {active !== null && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/70 to-transparent p-5">
              <span className="text-xs font-medium uppercase tracking-[0.12em] text-cream">
                {services[active]?.title}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

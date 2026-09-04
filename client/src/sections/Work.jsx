import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, useGSAP, ScrollTrigger } from "../lib/gsap";
import { work } from "../data/site";

const prefersReduced =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Work() {
  const pin = useRef(null);
  const track = useRef(null);

  // Recalculate scroll distance after images load
  useEffect(() => {
    const imgs = track.current?.querySelectorAll("img");
    if (!imgs?.length) return;

    let loaded = 0;
    const onDone = () => {
      loaded += 1;
      if (loaded >= imgs.length) ScrollTrigger.refresh();
    };

    imgs.forEach((img) => {
      if (img.complete) onDone();
      else {
        img.addEventListener("load", onDone, { once: true });
        img.addEventListener("error", onDone, { once: true });
      }
    });

    // Fallback refresh
    const t = setTimeout(() => ScrollTrigger.refresh(), 800);
    return () => clearTimeout(t);
  }, []);

  useGSAP(
    () => {
      // Header entrance
      if (!prefersReduced) {
        gsap.set("[data-w-head]", { opacity: 0, y: 24 });
        gsap.to("[data-w-head]", {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: pin.current,
            start: "top 70%",
            once: true,
          },
        });
      }

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const el = track.current;
        const getDist = () => Math.max(0, el.scrollWidth - window.innerWidth);

        gsap.to(el, {
          x: () => -getDist(),
          ease: "none",
          scrollTrigger: {
            trigger: pin.current,
            start: "top top",
            end: () => "+=" + getDist(),
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Refresh once fonts settle
        ScrollTrigger.refresh();
      });
      return () => mm.revert();
    },
    { scope: pin }
  );

  return (
    <section id="work" className="relative bg-ink text-cream grain overflow-hidden">
      <div
        ref={pin}
        className="flex flex-col justify-center py-24 md:h-screen md:py-0"
      >
        {/* Header */}
        <div className="shell shrink-0">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div data-w-head className="flex items-center gap-4 text-clay">
                <span className="h-px w-10 bg-clay" />
                <span className="kicker">Selected work</span>
              </div>
              <h2 data-w-head className="mt-7 font-serif text-5xl leading-[1.05] tracking-[-0.015em] text-cream md:text-6xl lg:text-[4.5rem]">
                Spaces we&rsquo;ve
                <br />
                transformed
              </h2>
            </div>
            <div data-w-head className="hidden items-center gap-3 kicker text-[0.6rem] text-cream/50 md:flex">
              <span>Drag / scroll</span>
              <ArrowRight size={16} strokeWidth={1.75} className="text-clay" />
            </div>
          </div>
        </div>

        {/* Track */}
        <div className="mt-12 overflow-hidden md:mt-16 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div
            ref={track}
            className="flex w-max gap-5 px-6 md:gap-8 md:px-10 xl:px-16"
          >
            {work.map((item, i) => (
              <article
                key={item.title}
                className="group w-[80vw] shrink-0 sm:w-[58vw] md:w-[44vw] lg:w-[34vw] xl:w-[30vw]"
              >
                <div className="relative overflow-hidden rounded-sm bg-charcoal">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-[52vh] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105 md:h-[58vh]"
                  />
                  <span className="absolute right-4 top-4 rounded-full bg-cream/90 px-3 py-1.5 kicker text-[0.55rem] text-ink/70 backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h3 className="font-serif text-xl text-cream md:text-2xl">
                    {item.title}
                  </h3>
                  <span className="kicker text-[0.6rem] text-clay">
                    {String(i + 1).padStart(2, "0")} / {item.category}
                  </span>
                </div>
                <p className="mt-1 text-sm text-cream/45">{item.subtitle}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

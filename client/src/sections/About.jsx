import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import bathroomTravertine from "../assets/images/bathroom-travertine.jpg";
import Reveal from "../components/ui/Reveal";
import Counter from "../components/ui/Counter";
import Button from "../components/ui/Button";

export default function About() {
  const sectionRef = useRef(null);
  const imgFrameRef = useRef(null);
  const imgRef = useRef(null);

  useGSAP(
    () => {
      // Image clip-path reveal
      gsap.fromTo(
        imgRef.current,
        { clipPath: "inset(0% 0% 100% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: imgFrameRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      // Image parallax
      gsap.from(
        imgRef.current,
        {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: imgFrameRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section id="about" ref={sectionRef} className="bg-cream">
      <div className="shell py-20 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 lg:items-start">
          {/* Text column */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <Reveal className="flex items-center gap-4 text-clay" y={12}>
              <span className="h-px w-10 bg-clay" />
              <span className="kicker">Beyond The Ridge</span>
            </Reveal>

            <h2 className="mt-6 font-serif text-5xl leading-[1.05] tracking-[-0.015em] text-ink md:text-6xl lg:text-[4rem]">
              <Reveal y={28} delay={0.05}>
                We transform spaces
              </Reveal>
              <Reveal y={28} delay={0.1}>
                <span className="text-clay">into places you love.</span>
              </Reveal>
            </h2>

            <div className="my-8 h-px w-12 bg-ink/12" />

            <div className="space-y-5 max-w-lg">
              <Reveal as="p" className="text-ink/70 leading-relaxed">
                At Beyond The Ridge, we combine more than 20 years of craftsmanship with a commitment to clear communication and quality. Our reputation is built on trust, integrity, and results that last.
              </Reveal>
              <Reveal as="p" delay={0.05} className="text-ink/70 leading-relaxed">
                From concept to completion, we handle custom tile, bathrooms, and flooring for both homeowners and builders — guiding you through every material and decision along the way.
              </Reveal>
            </div>

            <Reveal className="mt-10 flex flex-wrap items-center gap-6" y={14} delay={0.2}>
              <Button href="#services" variant="dark">
                Explore our services
              </Button>
              <span className="kicker text-[0.62rem] text-ink/50">
                Fully insured
              </span>
            </Reveal>
          </div>

          {/* Image column */}
          <div className="lg:col-span-7">
            <div
              ref={imgFrameRef}
              className="relative overflow-hidden rounded-sm bg-sand md:ml-auto md:max-w-[85%]"
            >
              <img
                ref={imgRef}
                src={bathroomTravertine}
                alt="Bathroom finished with wood and travertine tile detailing"
                loading="lazy"
                width="800"
                height="1000"
                className="block h-[120%] w-full object-cover will-change-transform"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-24 grid grid-cols-1 gap-10 border-t border-ink/10 pt-14 sm:grid-cols-3">
          {[
            { value: 20, suffix: "+", label: "Years of craftsmanship" },
            { value: 500, suffix: "+", label: "Projects completed" },
            { value: 100, suffix: "%", label: "Client satisfaction" },
          ].map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.08}
              className={`flex flex-col ${
                i > 0 ? "sm:border-l sm:border-ink/10 sm:pl-10" : ""
              }`}
            >
              <Counter
                value={s.value}
                suffix={s.suffix}
                className="font-serif text-6xl text-ink md:text-7xl"
              />
              <span className="mt-3 kicker text-[0.62rem] text-ink/55">
                {s.label}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

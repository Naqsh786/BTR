import { useRef, useState, useCallback } from "react";
import { ArrowUpRight, ArrowRight, Play, Pause } from "lucide-react";
import { gsap, useGSAP } from "../lib/gsap";
import { hero, work as workItems } from "../data/site";

const prefersReduced =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Hero() {
  const root = useRef(null);
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggleVideo = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }, []);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);

      if (prefersReduced) {
        gsap.set(q("[data-hero-frame]"), { clipPath: "inset(0% 0% 0% 0%)" });
        gsap.set(q("[data-hero-img]"), { scale: 1 });
        gsap.set(q("[data-h-line]"), { yPercent: 0 });
        gsap.set(q("[data-h-fade]"), { opacity: 1, y: 0 });
        gsap.set(q("[data-h-badge]"), { opacity: 1, scale: 1 });
        gsap.set(q("[data-h-stat]"), { opacity: 1, y: 0 });
        gsap.set(q("[data-h-strip]"), { opacity: 1, y: 0 });
        return;
      }

      gsap.set(q("[data-hero-frame]"), { clipPath: "inset(0% 0% 100% 0%)" });
      gsap.set(q("[data-hero-img]"), { scale: 1.25 });
      gsap.set(q("[data-h-line]"), { yPercent: 120 });
      gsap.set(q("[data-h-fade]"), { opacity: 0, y: 28 });
      gsap.set(q("[data-h-badge]"), { opacity: 0, scale: 0.8, rotation: -8 });
      gsap.set(q("[data-h-stat]"), { opacity: 0, y: 20 });
      gsap.set(q("[data-h-strip]"), { opacity: 0, y: 30 });
      gsap.set(q("[data-h-cta]"), { opacity: 0, y: 24 });
      gsap.set(q("[data-h-scroll]"), { opacity: 0 });
      gsap.set(q("[data-h-play]"), { opacity: 0, scale: 0.8 });
      gsap.set(q("[data-h-accent]"), { scaleX: 0 });

      const tl = gsap.timeline({
        delay: 0.15,
        defaults: { ease: "power4.out" },
      });

      tl.to(q("[data-hero-frame]"), {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.6,
        ease: "power4.inOut",
      })
        .to(
          q("[data-hero-img]"),
          { scale: 1, duration: 2.4, ease: "power3.out" },
          0
        )
        .to(
          q("[data-h-accent]"),
          { scaleX: 1, duration: 1.2, ease: "power3.inOut" },
          0.3
        )
        .to(
          q("[data-h-badge]"),
          { opacity: 1, scale: 1, rotation: 0, duration: 0.9, ease: "back.out(1.7)" },
          0.6
        )
        .to(
          q("[data-h-line]"),
          { yPercent: 0, duration: 1.3, stagger: 0.1 },
          0.5
        )
        .to(
          q("[data-h-fade]"),
          { opacity: 1, y: 0, duration: 1, stagger: 0.1 },
          "-=0.8"
        )
        .to(
          q("[data-h-cta]"),
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
          "-=0.7"
        )
        .to(
          q("[data-h-play]"),
          { opacity: 1, scale: 1, duration: 0.7, ease: "back.out(2)" },
          "-=0.6"
        )
        .to(
          q("[data-h-stat]"),
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
          "-=0.5"
        )
        .to(
          q("[data-h-strip]"),
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.4"
        )
        .to(
          q("[data-h-scroll]"),
          { opacity: 1, duration: 0.8 },
          "-=0.5"
        );

      // Play button ring pulse
      gsap.to(q("[data-h-ring]"), {
        scale: 1.5,
        opacity: 0,
        duration: 1.8,
        ease: "power1.out",
        repeat: -1,
        repeatDelay: 1.2,
      });

      // Parallax
      gsap.to(q("[data-hero-img]"), {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Scroll indicator loop
      gsap.fromTo(
        q("[data-h-scroll-bar]"),
        { yPercent: -100 },
        { yPercent: 200, duration: 1.7, ease: "power1.inOut", repeat: -1 }
      );

      // Badge float
      gsap.to(q("[data-h-badge]"), {
        y: -6,
        duration: 2.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    },
    { scope: root }
  );

  const lastLine = hero.titleLines.length - 1;

  return (
    <section
      id="home"
      ref={root}
      className="relative min-h-[100svh] w-full overflow-hidden bg-ink grain"
    >
      {/* Image layer — fades out when video plays */}
      <div
        data-hero-frame
        className={`absolute inset-0 transition-opacity duration-1000 ${
          playing ? "opacity-0" : "opacity-100"
        }`}
      >
        <img
          data-hero-img
          src="/heroimg.jpeg"
          alt="Modern bathroom with a custom glass shower and warm wood tiling by Beyond The Ridge"
          className="absolute inset-x-0 top-[-15%] h-[130%] w-full object-cover will-change-transform"
        />
      </div>

      {/* Video layer — plays behind text on click */}
      <video
        ref={videoRef}
        src="/heroideo.mp4"
        loop
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          playing ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Cinematic scrims */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/10 to-ink/70" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/45 via-transparent to-transparent" />

      {/* Diagonal accent line */}
      <div
        data-h-accent
        className="pointer-events-none absolute left-0 top-[38%] h-px w-[40vw] origin-left bg-gradient-to-r from-clay/70 via-clay/30 to-transparent md:top-[35%]"
        style={{ transform: "rotate(-3deg) scaleX(0)" }}
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-[100svh] flex-col">
        <div className="shell flex flex-1 flex-col justify-end pb-12 pt-32 md:pb-16">

          {/* Top row: Badge + Location */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Award badge */}
            <div
              data-h-badge
              className="inline-flex items-center gap-2.5 self-start rounded-full border border-clay/30 bg-ink/40 px-4 py-2 backdrop-blur-sm will-change-transform"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-clay text-[0.6rem] font-bold text-cream">
                {hero.badge.year}
              </span>
              <span className="text-[0.7rem] font-medium uppercase tracking-[0.12em] text-cream">
                {hero.badge.label}
              </span>
            </div>

            {/* Location */}
            <div data-h-fade className="flex items-center gap-3 text-cream/70">
              <span className="h-px w-8 bg-cream/30" />
              <span className="kicker text-[0.6rem]">{hero.location}</span>
            </div>
          </div>

          {/* Experience kicker */}
          <div data-h-fade className="flex items-center gap-4 text-cream">
            <span className="h-px w-12 bg-clay" />
            <span className="kicker text-cream/85">{hero.experience}</span>
          </div>

          {/* Headline */}
          <h1 className="mt-5 font-serif uppercase leading-[0.88] tracking-[-0.025em] text-cream text-[clamp(3rem,11vw,9.5rem)]">
            {hero.titleLines.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <span data-h-line className="block">
                  {i === lastLine ? (
                    <>
                      {line.replace(/\.$/, "")}
                      <span className="text-clay">.</span>
                    </>
                  ) : (
                    line
                  )}
                </span>
              </span>
            ))}
          </h1>

          {/* Supporting text + CTAs + Play */}
          <div className="mt-8 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div className="flex flex-col gap-6">
              <p
                data-h-fade
                className="max-w-md text-base leading-relaxed text-cream/78 md:text-lg"
              >
                {hero.lead}
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  data-h-cta
                  href={hero.primaryCta.href}
                  className="group inline-flex items-center gap-2 rounded-full bg-clay px-8 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.14em] text-cream transition-colors duration-300 hover:bg-clay-deep"
                >
                  {hero.primaryCta.label}
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.75}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
                <a
                  data-h-cta
                  href={hero.secondaryCta.href}
                  className="group inline-flex items-center gap-2 rounded-full border border-cream/35 px-8 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.14em] text-cream transition-colors duration-300 hover:border-cream hover:bg-cream hover:text-ink"
                >
                  {hero.secondaryCta.label}
                  <ArrowRight
                    size={16}
                    strokeWidth={1.75}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </a>
              </div>
            </div>

            {/* Play / Pause button */}
            <div data-h-play className="hidden md:block">
              <button
                type="button"
                onClick={toggleVideo}
                className="group relative flex items-center gap-3.5 text-cream/70 transition-colors hover:text-cream"
              >
                <span className="relative flex h-14 w-14 items-center justify-center">
                  <span
                    data-h-ring
                    className="absolute inset-0 rounded-full border border-cream/30"
                  />
                  <span className="absolute inset-0 rounded-full border border-cream/15" />
                  {playing ? (
                    <Pause size={18} strokeWidth={1.75} className="fill-cream" />
                  ) : (
                    <Play size={18} strokeWidth={1.75} className="ml-0.5 fill-cream" />
                  )}
                </span>
                <span className="text-[0.7rem] font-medium uppercase tracking-[0.12em]">
                  {playing ? "Pause" : hero.playLabel}
                </span>
              </button>
            </div>
          </div>

          {/* Stats row */}
          <div
            data-h-fade
            className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-cream/15 pt-6"
          >
            {hero.stats.map((stat, i) => (
              <div key={i} data-h-stat className="flex items-baseline gap-2">
                <span className="font-serif text-4xl font-bold text-clay md:text-5xl">
                  {stat.value}
                </span>
                <span className="text-[0.75rem] uppercase tracking-[0.1em] text-cream/55">
                  {stat.label}
                </span>
              </div>
            ))}
            {/* Trust */}
            <div className="ml-auto hidden items-center gap-3 text-cream/50 md:flex">
              <span className="h-px w-6 bg-cream/25" />
              <span className="text-[0.6rem] uppercase tracking-[0.1em]">
                {hero.trust}
              </span>
            </div>
          </div>

          {/* Mini project strip */}
          <div data-h-strip className="mt-8 flex gap-3 overflow-hidden">
            {workItems.slice(0, 4).map((item, i) => (
              <a
                key={i}
                href="#work"
                className="group relative h-16 flex-1 overflow-hidden rounded-sm border border-cream/10 transition-colors hover:border-clay/40 sm:h-20 md:h-24 md:flex-none md:basis-[140px]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-50 transition-opacity duration-300 group-hover:opacity-75"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                <span className="absolute bottom-1.5 left-2 text-[0.5rem] uppercase tracking-[0.1em] text-cream/70 sm:text-[0.55rem]">
                  {item.title}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <a
          data-h-scroll
          href="#services"
          aria-label="Scroll down"
          className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
        >
          <span className="kicker text-[0.5rem] text-cream/55">Scroll</span>
          <span className="relative h-12 w-px overflow-hidden bg-cream/20">
            <span
              data-h-scroll-bar
              className="absolute inset-x-0 top-0 block h-1/2 w-px bg-clay"
            />
          </span>
        </a>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from "react";
import { gsap } from "../../lib/gsap";

export default function Preloader({ onComplete }) {
  const rootRef = useRef(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        setDone(true);
        document.body.style.overflow = "";
        onComplete?.();
      },
    });

    tl
      // 1. Title slides in from left
      .fromTo(
        root.querySelector("[data-p-title]"),
        { x: -280, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "power4.out" },
        0
      )
      // 2. Subtitle slides in from right
      .fromTo(
        root.querySelector("[data-p-sub]"),
        { x: 280, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "power4.out" },
        0.15
      )
      // 3. Hold for a beat, then fade text out
      .to(root.querySelector("[data-p-title]"), {
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
      }, 1.6)
      .to(root.querySelector("[data-p-sub]"), {
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
      }, 1.6)
      // 4. Blob SVG appears and scales up
      .fromTo(
        root.querySelector("[data-p-blob]"),
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.4)" },
        2.0
      )
      // 5. Blob scales to fill entire screen
      .to(root.querySelector("[data-p-blob]"), {
        scale: 30,
        duration: 1.2,
        ease: "power3.inOut",
      }, 2.7)
      // 6. Background fades to transparent
      .to(root.querySelector("[data-p-bg]"), {
        backgroundColor: "rgba(0,0,0,0)",
        duration: 0.6,
        ease: "power2.inOut",
      }, 3.5)
      // 7. Blob fades out
      .to(root.querySelector("[data-p-blob]"), {
        opacity: 0,
        duration: 0.4,
      }, 3.7);

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      data-p-bg
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-ink"
    >
      {/* Grain */}
      <div className="grain absolute inset-0 opacity-30" />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        {/* Main title */}
        <div className="overflow-hidden">
          <div
            data-p-title
            className="font-serif text-[clamp(2.5rem,10vw,8rem)] font-bold uppercase leading-[0.82] tracking-[-0.04em] text-cream"
          >
            Beyond The Ridge
          </div>
        </div>

        {/* Subtitle */}
        <div className="overflow-hidden">
          <div
            data-p-sub
            className="text-[0.7rem] uppercase tracking-[0.4em] text-clay"
          >
            Custom Tile & Design
          </div>
        </div>
      </div>

      {/* Organic blob SVG */}
      <div
        data-p-blob
        className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
        style={{ transform: "translate(-50%, -50%) scale(0)" }}
      >
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="h-[120px] w-[120px] md:h-[160px] md:w-[160px]"
        >
          <path
            fill="#B86F52"
            d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,88.5,-0.9C87,14.5,81.4,29,72.6,41.1C63.8,53.2,51.8,62.9,38.4,70.1C25,77.3,10.2,82,-4.3,87.7C-18.8,93.4,-33.1,100.1,-45.3,95.5C-57.5,90.9,-67.6,75,-74.5,58.5C-81.4,42,-85.1,24.9,-86.2,7.7C-87.3,-9.5,-85.8,-26.8,-78.1,-40.3C-70.4,-53.8,-56.5,-63.5,-42.2,-70.4C-27.9,-77.3,-13.9,-81.4,1,-83.5C15.9,-85.6,30.6,-83.6,44.7,-76.4Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>
    </div>
  );
}

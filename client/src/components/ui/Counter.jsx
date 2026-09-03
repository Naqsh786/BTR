import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";

const prefersReduced =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Animated count-up that fires once when scrolled into view. */
export default function Counter({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  className = "",
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (prefersReduced) {
        el.textContent = `${prefix}${value}${suffix}`;
        return;
      }
      const obj = { v: 0 };
      gsap.to(obj, {
        v: value,
        duration,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(obj.v)}${suffix}`;
        },
      });
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className={className} aria-live="polite">
      {prefix}0{suffix}
    </span>
  );
}

import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";

const prefersReduced =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Generic scroll-in reveal. Fades + lifts either the wrapper itself, or its
 * direct children when `stagger` is provided.
 */
export default function Reveal({
  as: Comp = "div",
  children,
  className = "",
  y = 30,
  delay = 0,
  stagger = 0,
  duration = 1.1,
  start = "top 85%",
  ...props
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (prefersReduced) return;
      const el = ref.current;
      const targets = stagger && el.children.length ? el.children : el;
      gsap.from(targets, {
        opacity: 0,
        y,
        duration,
        delay,
        stagger,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start, once: true },
      });
    },
    { scope: ref }
  );

  return (
    <Comp ref={ref} className={className} {...props}>
      {children}
    </Comp>
  );
}

/**
 * Editorial line-mask reveal — each line rises from behind an overflow mask.
 * Pass an array of strings/nodes via `lines`.
 */
export function Lines({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
  stagger = 0.1,
  start = "top 88%",
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (prefersReduced) return;
      const inners = ref.current.querySelectorAll("[data-line-inner]");
      gsap.from(inners, {
        yPercent: 115,
        duration: 1.2,
        delay,
        stagger,
        ease: "power4.out",
        scrollTrigger: { trigger: ref.current, start, once: true },
      });
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className={`block overflow-hidden ${lineClassName}`}>
          <span data-line-inner className="block">
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}

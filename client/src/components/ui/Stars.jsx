import { Star } from "lucide-react";

/** Compact 5-star rating. `value` is 0–5 (supports halves visually via fill). */
export default function Stars({ value = 5, className = "" }) {
  const full = Math.floor(value);
  const hasHalf = value - full >= 0.3;
  const empty = 5 - full - (hasHalf ? 1 : 0);

  return (
    <div
      className={`flex items-center gap-0.5 ${className}`}
      aria-label={`Rated ${value} out of 5`}
    >
      {Array.from({ length: full }, (_, i) => (
        <Star key={`f-${i}`} className="fill-clay text-clay" strokeWidth={1.5} size={15} aria-hidden="true" />
      ))}
      {hasHalf && (
        <span className="relative inline-block" aria-hidden="true">
          <Star className="text-clay/35" strokeWidth={1.5} size={15} />
          <span className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>
            <Star className="fill-clay text-clay" strokeWidth={1.5} size={15} />
          </span>
        </span>
      )}
      {Array.from({ length: empty }, (_, i) => (
        <Star key={`e-${i}`} className="text-clay/35" strokeWidth={1.5} size={15} aria-hidden="true" />
      ))}
    </div>
  );
}

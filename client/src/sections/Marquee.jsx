const marqueeItems = [
  "Custom Tile",
  "Bathrooms",
  "Kitchens",
  "Flooring",
  "Craftsmanship",
  "Design",
  "Muskoka",
];

function MarqueeRow({ items, reverse = false }) {
  const separated = items.flatMap((item, i) => {
    const parts = [
      <span
        key={`t-${i}`}
        className="transition-colors duration-300 hover:text-clay cursor-default"
      >
        {item}
      </span>,
    ];
    if (i < items.length - 1) {
      parts.push(
        <span key={`s-${i}`} aria-hidden className="mx-2 text-clay/50 md:mx-4">
          •
        </span>
      );
    }
    return parts;
  });

  return (
    <div className="overflow-hidden py-3 md:py-4">
      <div
        className={`flex w-max items-center gap-8 md:gap-14 marquee-text ${
          reverse ? "animate-marquee-slow" : "animate-marquee"
        }`}
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        <span className="flex shrink-0 items-center gap-8 md:gap-14">
          {separated}
        </span>
        <span className="flex shrink-0 items-center gap-8 md:gap-14" aria-hidden>
          {separated}
        </span>
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="border-b border-ink/8 bg-cream">
      {/* Row 1 — forward, serif */}
      <MarqueeRow items={marqueeItems} />

      {/* Bottom accent line */}
      <div className="mx-6 h-px bg-gradient-to-r from-transparent via-clay/20 to-transparent md:mx-10" />
    </section>
  );
}

import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import { gsap, useGSAP } from "../lib/gsap";
import { faqs } from "../data/site";
import Reveal, { Lines } from "../components/ui/Reveal";
import Button from "../components/ui/Button";

function FaqItem({ q, a, index, isOpen, onToggle }) {
  const body = useRef(null);

  useGSAP(
    () => {
      gsap.to(body.current, {
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
        duration: 0.5,
        ease: "power3.inOut",
      });
    },
    { dependencies: [isOpen], scope: body }
  );

  return (
    <div className="border-t border-ink/10 last:border-b">
      <button
        type="button"
        onClick={onToggle}
        className="group flex w-full items-center justify-between gap-6 py-6 text-left"
        aria-expanded={isOpen}
      >
        <span className="flex items-baseline gap-4">
          <span className="kicker text-[0.58rem] text-clay">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={`font-serif text-xl leading-snug transition-colors md:text-2xl ${
              isOpen ? "text-clay" : "text-ink group-hover:text-clay"
            }`}
          >
            {q}
          </span>
        </span>
        <span
          className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
            isOpen
              ? "rotate-45 border-clay bg-clay text-cream"
              : "border-ink/20 text-ink group-hover:border-clay"
          }`}
        >
          <Plus size={16} strokeWidth={1.75} />
        </span>
      </button>
      <div ref={body} style={{ height: 0, opacity: 0, overflow: "hidden" }}>
        <p className="max-w-2xl pb-6 pr-6 text-ink/65 leading-relaxed md:pr-12">
          {a}
        </p>
      </div>
    </div>
  );
}

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative bg-cream">
      <div className="shell py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Sticky heading */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal className="flex items-center gap-4 text-clay" y={16}>
                <span className="h-px w-10 bg-clay" />
                <span className="kicker">FAQ</span>
              </Reveal>
              <Lines
                className="heading mt-8 font-serif text-ink"
                lines={["Questions,", "answered."]}
              />
              <Reveal className="mt-8" y={18} delay={0.1}>
                <p className="max-w-xs text-ink/60 leading-relaxed">
                  Still have something on your mind? We're always happy to talk
                  it through.
                </p>
                <Button href="#contact" variant="dark" className="mt-6">
                  Get in touch
                </Button>
              </Reveal>
            </div>
          </div>

          {/* Accordion */}
          <div className="lg:col-span-8">
            {faqs.map((f, i) => (
              <FaqItem
                key={f.q}
                index={i}
                q={f.q}
                a={f.a}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

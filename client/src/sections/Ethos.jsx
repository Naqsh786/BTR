import { ethos } from "../data/site";
import Reveal, { Lines } from "../components/ui/Reveal";

export default function Ethos() {
  return (
    <section className="relative bg-ink text-cream grain">
      <div className="shell py-24 md:py-36">
        <Reveal
          as="div"
          className="flex items-center gap-4 text-clay"
          y={20}
        >
          <span className="h-px w-10 bg-clay" />
          <span className="kicker">{ethos.kicker}</span>
        </Reveal>

        <blockquote className="mt-10 max-w-5xl">
          <Lines
            className="heading font-serif text-cream"
            stagger={0.09}
            lines={[
              "Beyond The Ridge is more",
              "than a tile contractor —",
              <em key="accent" className="text-clay">
                we are your renovation partner.
              </em>,
            ]}
          />
        </blockquote>

        <div className="mt-14 grid gap-8 border-t border-cream/10 pt-10 md:grid-cols-12">
          <Reveal className="md:col-span-4" y={24}>
            <span className="kicker text-[0.6rem] text-cream/40">
              Muskoka, Ontario
            </span>
          </Reveal>
          <Reveal className="md:col-span-8" y={24} delay={0.1}>
            <p className="max-w-2xl text-lg leading-relaxed text-cream/70">
              {ethos.body}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from "react";
import { Menu, X, Phone, ArrowUpRight } from "lucide-react";
import { gsap, useGSAP } from "../../lib/gsap";
import logo from "../../assets/images/logo.png";
import { useLenisInstance } from "../../hooks/useLenis.jsx";

const nav = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#work" },
  { label: "About", href: "#about" },
];
const phone = "(705) 706-2329";
const phoneHref = "tel:7057062329";

function smoothScroll(e, lenis, target) {
  if (!lenis?.current || !target?.startsWith("#")) return;
  e.preventDefault();
  const el = document.querySelector(target);
  if (el) {
    lenis.current.scrollTo(el, { offset: 0, duration: 1.6 });
  }
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const lenis = useLenisInstance();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useGSAP(
    () => {
      const el = menuRef.current;
      if (!el) return;
      if (open) {
        gsap.set(el, { display: "flex", pointerEvents: "auto" });
        gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.4 });
        gsap.fromTo(
          el.querySelectorAll("[data-menu-item]"),
          { yPercent: 120 },
          { yPercent: 0, duration: 0.8, stagger: 0.07, delay: 0.05, ease: "power4.out" }
        );
      } else {
        gsap.to(el, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => gsap.set(el, { display: "none", pointerEvents: "none" }),
        });
      }
    },
    { dependencies: [open] }
  );

  const linkColor = scrolled
    ? "text-ink/70 hover:text-ink"
    : "text-cream/85 hover:text-cream";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-ink/10 bg-cream/90 py-3 backdrop-blur-md"
            : "border-b border-transparent bg-transparent py-6"
        }`}
      >
        <div className="shell flex items-center justify-between gap-6">
          {/* Brand */}
          <a
            href="#home"
            onClick={(e) => smoothScroll(e, lenis, "#home")}
            className="flex items-center"
            aria-label="Beyond The Ridge"
          >
            <span
              className={`overflow-hidden transition-all duration-500 ${
                scrolled ? "mr-3 w-10 opacity-100" : "mr-0 w-0 opacity-0"
              }`}
            >
              <img src={logo} alt="" className="h-10 w-10 object-contain" />
            </span>
            <span className="flex flex-col leading-none">
              <span
                className={`font-serif text-lg leading-none transition-colors duration-500 ${
                  scrolled ? "text-ink" : "text-cream"
                }`}
              >
                Beyond The Ridge
              </span>
              <span
                className={`kicker mt-1 text-[0.55rem] transition-colors duration-500 ${
                  scrolled ? "text-clay" : "text-cream/70"
                }`}
              >
                Custom Tile &amp; Design
              </span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-9 lg:flex" aria-label="Main navigation">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => smoothScroll(e, lenis, item.href)}
                className={`link-underline text-[0.82rem] font-medium tracking-wide transition-colors ${linkColor}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <a
              href={phoneHref}
              className={`hidden items-center gap-2 text-[0.82rem] font-medium transition-colors xl:inline-flex ${
                scrolled ? "text-ink/70 hover:text-clay" : "text-cream/80 hover:text-cream"
              }`}
            >
              <Phone size={15} strokeWidth={1.75} />
              {phone}
            </a>

            <a
              href="#contact"
              onClick={(e) => smoothScroll(e, lenis, "#contact")}
              className="group hidden items-center gap-2 rounded-full bg-clay px-5 py-2.5 text-[0.8rem] font-medium text-cream transition-colors duration-300 hover:bg-clay-deep sm:inline-flex"
            >
              Get a Free Estimate
              <ArrowUpRight
                size={15}
                strokeWidth={1.75}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors lg:hidden ${
                scrolled ? "border-ink/20 text-ink" : "border-cream/40 text-cream"
              }`}
              aria-label="Open menu"
            >
              <Menu size={20} strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen mobile menu */}
      <div
        ref={menuRef}
        style={{ display: "none" }}
        className="fixed inset-0 z-[60] hidden flex-col bg-cream grain"
      >
        <div className="shell flex items-center justify-between py-6">
          <span className="flex items-center gap-3">
            <img src={logo} alt="" className="h-10 w-10 object-contain" />
            <span className="font-serif text-lg text-ink">Beyond The Ridge</span>
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 text-ink"
            aria-label="Close menu"
          >
            <X size={20} strokeWidth={1.75} />
          </button>
        </div>

        <nav className="shell flex flex-1 flex-col justify-center gap-2" aria-label="Mobile navigation">
          {nav.map((item, i) => (
            <div key={item.href} className="overflow-hidden py-1">
              <a
                data-menu-item
                href={item.href}
                onClick={(e) => {
                  smoothScroll(e, lenis, item.href);
                  setOpen(false);
                }}
                className="group flex items-baseline gap-4 font-serif text-5xl text-ink sm:text-6xl"
              >
                <span className="kicker text-xs text-clay">0{i + 1}</span>
                <span className="transition-colors group-hover:text-clay">
                  {item.label}
                </span>
              </a>
            </div>
          ))}
        </nav>

        <div className="shell flex flex-col gap-5 border-t border-ink/10 py-7">
          <a
            href="#contact"
            onClick={(e) => {
              smoothScroll(e, lenis, "#contact");
              setOpen(false);
            }}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-clay px-6 py-4 text-sm font-medium text-cream"
          >
            Get a Free Estimate
            <ArrowUpRight size={16} strokeWidth={1.75} />
          </a>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <a href={phoneHref} className="text-lg font-medium text-ink">
              {phone}
            </a>
            <a href="mailto:kevinsr@beyondtheridge.ca" className="text-ink/70">
              kevinsr@beyondtheridge.ca
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

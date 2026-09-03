import { ArrowUpRight } from "lucide-react";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-sans text-[0.82rem] font-medium tracking-wide transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay select-none";

const sizes = {
  md: "px-6 py-3",
  lg: "px-8 py-4 text-[0.9rem]",
};

const variants = {
  primary: "bg-clay text-cream hover:bg-clay-deep",
  dark: "bg-ink text-cream hover:bg-charcoal",
  light: "bg-cream text-ink hover:bg-sand",
  outline:
    "border border-ink/25 text-ink hover:bg-ink hover:text-cream hover:border-ink",
  outlineLight:
    "border border-cream/30 text-cream hover:bg-cream hover:text-ink hover:border-cream",
};

export default function Button({
  as = "a",
  href = "#",
  children,
  variant = "primary",
  size = "md",
  icon = true,
  className = "",
  ...props
}) {
  const Comp = as;
  return (
    <Comp
      href={as === "a" ? href : undefined}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {icon && (
        <ArrowUpRight
          className="h-[1.05em] w-[1.05em] transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={1.75}
        />
      )}
    </Comp>
  );
}

// Central GSAP setup — register plugins once and re-export.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Sensible global defaults for an editorial feel.
gsap.defaults({ ease: "power3.out", duration: 1 });

export { gsap, ScrollTrigger, useGSAP };

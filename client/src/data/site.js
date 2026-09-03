/**
 * Single source of truth for Beyond The Ridge homepage content.
 * All facts (name, services, contact, testimonials) are taken from the
 * live site at beyondtheridge.ca. Imagery uses the real photography from
 * that site, curated + stored locally in ./assets/images.
 */

import heroBathroom from "../assets/images/hero-bathroom.jpg";
import kitchenWhite from "../assets/images/kitchen-white.jpg";
export { kitchenWhite };
import bathroomTravertine from "../assets/images/bathroom-travertine.jpg";
import heating from "../assets/images/heating.jpg";
import diningRoom from "../assets/images/dining-room.jpg";
import kitchenModern from "../assets/images/kitchen-modern.jpg";
import projectRev from "../assets/images/project-rev.jpg";
import personEvie from "../assets/images/person-evie.jpg";
import personWaylon from "../assets/images/person-waylon.jpg";
import personDaniel from "../assets/images/person-daniel.jpg";
import logo from "../assets/images/logo.png";

export const images = {
  heroBathroom,
  kitchenWhite,
  bathroomTravertine,
  heating,
  diningRoom,
  kitchenModern,
  projectRev,
  logo,
};

export const business = {
  name: "Beyond The Ridge",
  short: "BTR",
  descriptor: "Custom Tile & Design",
  logo,
  email: "kevinsr@beyondtheridge.ca",
  phone: "(705) 706-2329",
  phoneHref: "tel:7057062329",
  location: "Muskoka, Ontario, Canada",
  region: "Muskoka, Ontario",
  hours: "Monday – Sunday · 7 AM – 7 PM",
  yearsExperience: 20,
  established: 2005,
};

export const nav = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#work" },
  { label: "About", href: "#about" },
];

// Primary navigation call-to-action.
export const navCta = { label: "Get a Free Estimate", href: "#contact" };

export const socials = [
  { label: "Facebook", href: "#testimonials" },
  { label: "Twitter", href: "#testimonials" },
  { label: "YouTube", href: "#testimonials" },
  { label: "LinkedIn", href: "#testimonials" },
];

export const hero = {
  experience: "20+ Years of Craftsmanship",
  location: "Muskoka, Ontario",
  titleLines: ["Beyond the", "ordinary."],
  lead: "Bathrooms, kitchens & flooring crafted with care. Beyond The Ridge is more than a tile contractor — we're your renovation partner across Muskoka.",
  primaryCta: { label: "Start Your Project", href: "#contact" },
  secondaryCta: { label: "Explore Our Work", href: "#work" },
  trust: "Trusted by homeowners & builders across Muskoka",
  image: heroBathroom,
  badge: { label: "Best of Muskoka", year: "2024" },
  stats: [
    { value: "20+", label: "Years" },
    { value: "500+", label: "Projects" },
    { value: "100%", label: "Satisfaction" },
  ],
  playLabel: "Watch Our Story",
};

export const stats = [
  { value: 20, suffix: "+", label: "Years of craftsmanship" },
  { value: 500, suffix: "+", label: "Projects completed" },
  { value: 100, suffix: "%", label: "Client satisfaction" },
];

export const ethos = {
  kicker: "Our philosophy",
  statement:
    "Beyond The Ridge is more than a tile contractor — we are your renovation partner.",
  body: "Based in Muskoka, we specialize in custom tile and design, bathroom renovations, and flooring solutions. Our mission is simple: to bring your vision to life through craftsmanship, communication, and dedication.",
};

export const marquee = {
  kicker: "What we do",
  items: [
    "Custom Tile",
    "Bathrooms",
    "Kitchens",
    "Flooring",
    "Craftsmanship",
    "Design",
    "Muskoka",
  ],
};

export const about = {
  kicker: "Beyond The Ridge",
  title: "We transform spaces into places you love.",
  paragraphs: [
    "At Beyond The Ridge, we combine more than 20 years of craftsmanship with a commitment to clear communication and quality. Our reputation is built on trust, integrity, and results that last.",
    "From concept to completion, we handle custom tile, bathrooms, and flooring for both homeowners and builders — guiding you through every material and decision along the way.",
  ],
  capabilities: [
    "Personalized aesthetics",
    "Enhanced home value",
    "Tailored to purpose",
    "Expert craftsmanship",
    "Efficient installation",
    "Unique design elements",
  ],
  image: bathroomTravertine,
  badge: "Fully insured",
};

// Values — icon names map to lucide-react components in the Values section.
export const values = [
  {
    icon: "Sparkles",
    title: "Elevate spaces",
    body: "Every project is designed to enhance your home's comfort, beauty, and functionality.",
  },
  {
    icon: "Hammer",
    title: "Quality craftsmanship",
    body: "With 20+ years of experience, we deliver work built to last a lifetime.",
  },
  {
    icon: "Leaf",
    title: "Environmental responsibility",
    body: "We source durable, eco-friendly materials wherever possible.",
  },
  {
    icon: "PencilRuler",
    title: "Personalized design",
    body: "Tailored solutions that reflect your unique style and needs.",
  },
];

export const services = [
  {
    id: "bathroom",
    index: "01",
    title: "Bathroom Renovations",
    group: "Tiling",
    description:
      "Functional, modern and elegant bathrooms reimagined as everyday retreats.",
    image: heroBathroom,
  },
  {
    id: "waterproofing",
    index: "02",
    title: "Custom Showers & Waterproofing",
    group: "Tiling",
    description:
      "Seamless custom showers designed for beauty and long-term protection.",
    image: bathroomTravertine,
  },
  {
    id: "kitchen",
    index: "03",
    title: "Kitchen & Backsplashes",
    group: "Tiling",
    description:
      "Stylish, protective backsplashes and renovations for the heart of your home.",
    image: kitchenWhite,
  },
  {
    id: "flooring",
    index: "04",
    title: "Flooring",
    group: "Flooring",
    description: "Quality tile and flooring, expertly sourced and precisely installed.",
    image: diningRoom,
  },
  {
    id: "heating",
    index: "05",
    title: "In-Floor Heating",
    group: "Flooring",
    description: "Radiant warmth and comfort layered quietly beneath your floors.",
    image: heating,
  },
  {
    id: "painting",
    index: "06",
    title: "Painting & Trim",
    group: "Finishes",
    description: "The finishing details that complete a renovation, done right.",
    image: kitchenModern,
  },
];

export const work = [
  {
    title: "Glass Shower Retreat",
    category: "Bathroom",
    subtitle: "Custom Tile & Design",
    image: heroBathroom,
  },
  {
    title: "Bright Modern Kitchen",
    category: "Kitchen",
    subtitle: "Tile & Backsplash",
    image: kitchenWhite,
  },
  {
    title: "Wood & Travertine Bath",
    category: "Custom Tile",
    subtitle: "Shower & Waterproofing",
    image: bathroomTravertine,
  },
  {
    title: "Radiant Floor System",
    category: "Flooring",
    subtitle: "In-Floor Heating",
    image: heating,
  },
  {
    title: "Open Dining Floor",
    category: "Flooring",
    subtitle: "Tile Installation",
    image: diningRoom,
  },
  {
    title: "Designer Kitchen",
    category: "Kitchen",
    subtitle: "Backsplash & Tile",
    image: kitchenModern,
  },
  {
    title: "Exterior Deck Build",
    category: "Exterior",
    subtitle: "Wood Deck & Tile",
    image: projectRev,
  },
];

export const process = [
  {
    step: "01",
    title: "Consultation",
    body: "We listen to your vision, assess the space, and provide a clear, honest estimate — no surprises.",
  },
  {
    step: "02",
    title: "Design & selection",
    body: "We guide you through materials and layouts tailored to your style, purpose, and budget.",
  },
  {
    step: "03",
    title: "Expert craft",
    body: "Efficient, meticulous installation — waterproofing, tile, heating and finishes done right.",
  },
  {
    step: "04",
    title: "The reveal",
    body: "A polished, lasting result, delivered on a timeline you always know in advance.",
  },
];

export const testimonials = [
  {
    quote:
      "Beyond The Ridge turned my house into a dream home. Their attention to detail and the precision in their work is unparalleled. I'm constantly getting compliments on my new floors.",
    name: "Evie Morgan",
    role: "Homeowner",
    rating: 4.9,
    image: personEvie,
  },
  {
    quote:
      "We've worked with various flooring and tiling services, but Beyond The Ridge is exceptional. Their professionalism and commitment to excellence made our renovation a success.",
    name: "Waylon Nelson",
    role: "Project Coordinator",
    rating: 4.8,
    image: personWaylon,
  },
  {
    quote:
      "Beyond The Ridge is more than a tiling service; they are artists. Their ability to take our ideas and turn them into stunning tile designs added a real touch of elegance to our restaurant.",
    name: "Daniel Watkins",
    role: "Restaurant Manager",
    rating: 5.0,
    image: personDaniel,
  },
];

export const faqs = [
  {
    q: "Do you provide both renovations and new build installations?",
    a: "Yes, we work with both homeowners and builders on projects of all sizes, from full bathroom renovations to custom tile in new homes.",
  },
  {
    q: "How long does a typical project take?",
    a: "Every project is unique, but we provide clear timelines upfront so you always know what to expect. Communication is our priority from start to finish.",
  },
  {
    q: "How do I know which tile or material is right for my project?",
    a: "We guide you through every step, explaining options and helping you select the best material for your style, purpose, and budget.",
  },
  {
    q: "What makes Beyond The Ridge different from other contractors?",
    a: "We combine over 20 years of hands-on experience with a focus on integrity and communication. Our clients never face surprises — just quality results.",
  },
  {
    q: "Do you offer waterproofing and in-floor heating?",
    a: "Absolutely. We provide professional waterproofing for showers and bathrooms, along with in-floor heating systems for comfort and efficiency.",
  },
  {
    q: "Do you also handle painting and trim work?",
    a: "Yes, in addition to tile and flooring, we provide painting and trim services to give your renovation a polished, finished look.",
  },
];

export const footer = {
  tagline: "We are a specialist tiling company for you.",
  credit: "Developed by Designs Aligned",
  year: 2026,
};

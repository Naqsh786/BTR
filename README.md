<div align="center">

# Beyond The Ridge

### Custom Tile & Design — Muskoka, Ontario

![Hero](cliet/public/heroimg.jpeg)

**Premium website redesign concept** for Beyond The Ridge — a custom tile, bathroom renovation, and flooring company serving Muskoka, Ontario.

[![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![GSAP](https://img.shields.io/badge/GSAP_3-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://gsap.com)

</div>

---

## Overview

A complete homepage redesign built as a **client presentation concept**. Uses real business content, testimonials, and photography from [beyondtheridge.ca](https://beyondtheridge.ca) — no stock or AI-generated imagery.

> **Design Philosophy:** Premium architectural editorial — large fluid typography, generous whitespace, subtle paper grain, and cinematic scroll-driven animations.

---

## Sections

| Section | Description |
|---------|-------------|
| **Hero** | Full-bleed background with video playback, floating award badge, animated stats, mini project strip |
| **Marquee** | Dual-row infinite scroll with Fraunces serif typography |
| **Ethos** | Dark ink blockquote with line-mask reveal |
| **About** | Asymmetric split layout with parallax |
| **Services** | Editorial numbered rows with floating image hover |
| **Work** | Horizontal scroll-triggered gallery |
| **Values** | "Why Beyond The Ridge" editorial statement |
| **Process** | GSAP-pinned horizontal scroll with progress bar |
| **Testimonials** | Auto-rotating editorial carousel |
| **Contact** | Cinematic CTA with background image |
| **Footer** | Oversized wordmark with gradient mask fade |

---

## Tech Stack

- **React 19** — Latest concurrent features
- **Vite 8** — Lightning-fast HMR and builds
- **Tailwind CSS v4** — Utility-first styling with `@tailwindcss/vite`
- **GSAP 3 + ScrollTrigger** — Cinematic scroll animations
- **Lucide React** — Consistent iconography

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/your-username/beyond-the-ridge.git
cd beyond-the-ridge

# Install dependencies
cd cliet
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## Project Structure

```
├── public/                    # Static assets (hero image, video)
├── cliet/                     # Main application
│   ├── src/
│   │   ├── assets/images/     # Curated project photography
│   │   ├── components/
│   │   │   ├── layout/        # Navbar, Footer
│   │   │   └── ui/            # Button, Reveal, Stars, Counter, VideoModal
│   │   ├── sections/          # All page sections
│   │   ├── data/site.js       # Single source of truth for content
│   │   ├── lib/gsap.js        # GSAP plugin registration
│   │   ├── App.jsx            # Root component
│   │   └── index.css          # Design system tokens
│   └── package.json
└── README.md
```

---

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| `cream` | `#F7F4EE` | Backgrounds (70%) |
| `ink` | `#252525` | Text, dark sections (25%) |
| `clay` | `#B86F52` | Accents, CTAs (5%) |

**Typography:** Fraunces (editorial serif) + Inter (modern sans)

---

## Features

- Cinematic scroll-driven animations with GSAP ScrollTrigger
- Responsive across all breakpoints
- `prefers-reduced-motion` support
- Keyboard accessible (Escape closes menus)
- ARIA labels on interactive elements
- Lazy-loaded images below the fold
- Video playback with play/pause toggle

---

## Performance

| Metric | Value |
|--------|-------|
| JS Bundle | ~365 KB (~120 KB gzipped) |
| CSS | ~48 KB (~9 KB gzipped) |
| Lighthouse | 95+ (Performance) |

---

## Credits

- **Design & Development:** Naqsh
- **Photography:** Beyond The Ridge (beyondtheridge.ca)
- **Fonts:** [Fraunces](https://fonts.google.com/specimen/Fraunces) + [Inter](https://fonts.google.com/specimen/Inter)

---

<div align="center">

**Built with precision. Designed to impress.**

</div>

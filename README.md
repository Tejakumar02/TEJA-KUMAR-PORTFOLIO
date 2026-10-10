<div align="center">

# Teja Kumar G S — AI Engineer Portfolio

**Personal portfolio for computer vision, GenAI and real-time ML systems.**

[![Live Site](https://img.shields.io/badge/Live_Site-teja--kumar.netlify.app-228B22?style=for-the-badge&logo=netlify&logoColor=white&labelColor=0a0a0a)](https://teja-kumar.netlify.app/)

![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_6-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white)

</div>

---

## ✨ Features

- **Interactive inspection demo**: a hero widget that simulates a real-time vision inspector (tracking point, work zone, FPS and inference readouts) with play/pause, reset and mouse-follow modes
- **Production-focused project cards**: metrics, design decisions and known failure modes for each project, not just screenshots
- **Terminal and chat widgets**: scripted terminal and chat panels that walk through my background, driven entirely by data (no API keys or backend)
- **Dark / light theme**: follows the system preference and remembers the visitor's choice
- **Data-driven content**: every section is rendered from a single JSON file, so updating the site never means touching components
- **Responsive and animated**: scroll-reveal animations, mobile navigation and layouts tuned from phone to desktop

## 🧩 Sections

Hero · Stats · About · Terminal · Experience · Projects · Skills · Process · Contact

## 🛠️ Tech Stack

| Layer | Tools |
|-------|-------|
| UI | React 19, TypeScript |
| Styling | Tailwind CSS 4 (via `@tailwindcss/vite`), custom CSS tokens for both themes |
| Icons | lucide-react |
| Build | Vite 6 |
| Hosting | Netlify |

## 🚀 Getting Started

**Prerequisites:** Node.js 20+ and npm.

```bash
git clone https://github.com/Tejakumar02/TEJA-KUMAR-PORTFOLIO.git
cd TEJA-KUMAR-PORTFOLIO
npm install
npm run dev        # http://localhost:3000
```

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start the dev server on port 3000 |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Type-check with `tsc --noEmit` |

## 📁 Project Structure

```text
├── favicon/                  # Favicons and web app manifest
├── public/assets/            # Project screenshots used in project cards
├── src/
│   ├── components/
│   │   ├── ChatWidget.tsx          # Scripted chat panel
│   │   ├── Footer.tsx
│   │   ├── ImageWithFallback.tsx   # Project image with emoji fallback
│   │   ├── InspectorSimulator.tsx  # Interactive vision-inspection demo
│   │   ├── Navbar.tsx              # Logo, links, theme toggle, résumé link
│   │   ├── ScrollReveal.tsx        # Reveal-on-scroll wrapper
│   │   └── Terminal.tsx            # Typed terminal panel
│   ├── data/portfolio.json   # All site content
│   ├── App.tsx               # Section layout
│   ├── index.css             # Theme tokens and custom styles
│   ├── main.tsx
│   └── types.ts              # Types for portfolio.json
├── index.html
└── vite.config.ts
```

## ✏️ Updating Content

All text, links, metrics and projects live in **`src/data/portfolio.json`**, typed by `src/types.ts`.

- **Add a project:** add an entry to `projects` and put its screenshot in `public/assets/` (reference it as `"assets/your-image.png"`)
- **Featured layout:** set `"featured": true` for the large two-column card
- **No image yet?** Leave `image` out and the card shows `fallbackIcon` instead

## 🌐 Deployment

The site deploys on **Netlify** with:

- **Build command:** `npm run build`
- **Publish directory:** `dist`

---

<div align="center">

**[Portfolio](https://teja-kumar.netlify.app/)** · **[GitHub](https://github.com/Tejakumar02)** · **[LinkedIn](https://www.linkedin.com/in/teja-kumar-g-s-373b6733a/)** · **[Email](mailto:jayaramteja3@gmail.com)**

</div>

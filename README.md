# Keerthana R. — Developer Portfolio

<div align="center">

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Custom%20Properties-1572B6?style=for-the-badge&logo=css3)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**[🌐 Live Portfolio](https://keerthana7654.github.io/portfolio)** &nbsp;·&nbsp;
**[💼 LinkedIn](https://www.linkedin.com/in/keerthana-r-8a19a3340)** &nbsp;·&nbsp;
**[🐙 GitHub](https://github.com/Keerthana7654)** &nbsp;·&nbsp;
**[📧 Email](mailto:keerthi9643@gmail.com)**

</div>

---

## 👋 About

Personal portfolio of **Keerthana R.**, a Full Stack Developer and MCA student at Bangalore University with strong expertise in Java, Spring Boot, and React JS. This portfolio is fully custom — no templates — designed to maximize recruiter impact and communicate engineering depth.

> "I build software that solves real problems with clean, maintainable code."

---

## ✨ Features

- **🎨 Custom Design System** — CSS custom properties (design tokens) for consistent theming across every component
- **⚡ Typewriter Hero** — Animated role cycling with a precise typewriter engine (no library)
- **🧭 Glassmorphic Navigation** — Sticky, blur-backdrop navbar with scroll-aware shadow and active state tracking
- **📱 Fully Responsive** — Mobile-first layout tested across 320px–2560px viewports
- **♿ WCAG AA Compliant** — Semantic HTML, ARIA labels, keyboard navigation, focus-visible styles, skip-to-content
- **🎭 Scroll-Reveal Animations** — IntersectionObserver-powered fade-in with staggered delays
- **💼 Case Study Project Cards** — Problem → Solution → Outcome format for each project
- **📬 Accessible Contact Form** — Client-side validation with live error feedback, Gmail compose integration
- **🚀 Performance Optimised** — Zero dependencies beyond React, lazy-loaded images, minimal bundle

---

## 🏗️ Tech Stack

| Layer         | Technology                          |
|---------------|-------------------------------------|
| Framework     | React 18                            |
| Build Tool    | Vite 5                              |
| Styling       | Pure CSS with Custom Properties     |
| Fonts         | Syne (display) + DM Sans (body)     |
| Animations    | CSS keyframes + IntersectionObserver|
| Deployment    | GitHub Pages / Vercel               |
| Version Control | Git + GitHub                      |

---

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── Resume.pdf          # Downloadable resume
│   └── favicon.ico
├── src/
│   ├── CSS/
│   │   ├── index.css       # Design tokens, reset, utilities
│   │   ├── App.css         # Shell layout
│   │   ├── Nav.css         # Navigation styles
│   │   ├── Home.css        # Hero section
│   │   ├── About.css       # Skills & bio section
│   │   ├── Projects.css    # Case study cards
│   │   └── Contact.css     # Contact form & footer
│   ├── Pics/               # Images (photo, icons)
│   ├── App.jsx             # Root component, scroll refs
│   ├── main.jsx            # React entry point
│   ├── Nav.jsx             # Navigation with mobile drawer
│   ├── Home.jsx            # Hero / landing section
│   ├── About.jsx           # Skills, bio, education
│   ├── Projects.jsx        # Project case studies
│   └── Contact.jsx         # Contact form + footer
├── index.html              # Root HTML (SEO meta tags here)
├── vite.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm 9+

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Keerthana7654/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# → http://localhost:5173
```

### Build for Production

```bash
npm run build
# Output: dist/ folder — ready to deploy
```

### Preview Production Build

```bash
npm run preview
```

---

## 🌐 Deployment

### GitHub Pages (Recommended — Free)

```bash
# 1. Install gh-pages
npm install --save-dev gh-pages

# 2. Add to package.json scripts:
# "predeploy": "npm run build",
# "deploy": "gh-pages -d dist"

# 3. Add to vite.config.js:
# base: '/portfolio/'  (replace with your repo name)

# 4. Deploy
npm run deploy
```

**Your portfolio will be live at:** `https://keerthana7654.github.io/portfolio`

---

### Vercel (Zero Config — Recommended for Custom Domain)

```bash
# Option A: Via Vercel CLI
npm install -g vercel
vercel

# Option B: Connect GitHub repo at vercel.com
# → Import → Select repo → Deploy (auto-detected as Vite)
```

### Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

---

## 📸 Screenshots

> *Add your own screenshots to the `/screenshots` folder and update these paths.*

| Desktop Hero | Skills Section | Projects |
|:---:|:---:|:---:|
| ![Hero](./screenshots/hero.png) | ![Skills](./screenshots/skills.png) | ![Projects](./screenshots/projects.png) |

---

## 🗺️ Roadmap / Future Enhancements

- [ ] **Blog Section** — Technical writing increases recruiter trust and SEO
- [ ] **Dark/Light Mode Toggle** — CSS variable swap, preference saved to localStorage
- [ ] **EmailJS / Formspree** — Replace Gmail compose with a direct form submission API
- [ ] **Project Screenshots** — Real screenshots or screen recordings for each project
- [ ] **GitHub Activity Graph** — Embed contribution graph for social proof
- [ ] **Animated Skill Progress Bars** — Visual proficiency indicators
- [ ] **i18n** — Multilingual support (English / Kannada)
- [ ] **PWA** — Service worker for offline support

---

## ♿ Accessibility

This portfolio is built to WCAG 2.1 AA standards:

- ✅ Semantic HTML5 landmarks (`<header>`, `<main>`, `<section>`, `<footer>`)
- ✅ All interactive elements keyboard-accessible
- ✅ `aria-label`, `aria-current`, `aria-hidden`, `aria-live` used correctly
- ✅ Focus-visible outlines on all focusable elements
- ✅ Skip-to-content link
- ✅ Color contrast ratio ≥ 4.5:1 throughout
- ✅ Images have meaningful `alt` attributes
- ✅ Form inputs have associated `<label>` elements
- ✅ Error messages use `role="alert"` for screen readers

---

## ⚡ Performance

| Metric | Score |
|--------|-------|
| LCP    | < 1.5s |
| FID    | < 100ms |
| CLS    | < 0.1 |
| Bundle size | < 150KB gzipped |

> Measured on Lighthouse (desktop). Run `npm run build && npm run preview` then audit with Chrome DevTools.

---

## 📄 License

MIT License — feel free to use this as a template. If you do, a ⭐ star is appreciated!

---

## 🤝 Contributing

While this is a personal portfolio, feedback is welcome:

1. Fork the project
2. Create your feature branch (`git checkout -b improvement/better-animations`)
3. Commit your changes (`git commit -m 'Add: scroll-triggered counter animation'`)
4. Push to the branch (`git push origin improvement/better-animations`)
5. Open a Pull Request

---

## 📬 Contact

**Keerthana R.**

- 📧 Email: [keerthi9643@gmail.com](mailto:keerthi9643@gmail.com)
- 💼 LinkedIn: [linkedin.com/in/keerthana-r-8a19a3340](https://www.linkedin.com/in/keerthana-r-8a19a3340)
- 🐙 GitHub: [github.com/Keerthana7654](https://github.com/Keerthana7654)
- 📍 Bangalore, Karnataka, India

---

<div align="center">
  <sub>Built with ❤️ by Keerthana R. &nbsp;·&nbsp; 2025</sub>
</div>

/**
 * KEERTHANA R. — 2026 PORTFOLIO
 * Cosmic/solar theme · Red-dark palette · Modern SaaS design
 *
 * PRESERVED: #370001 bg · rgb(162,0,0) glow · red accent · solar identity
 * REBUILT:   Everything else — layout, type, animations, components, UX
 *
 * Drop-in single file. Pair with your existing Pics/ imports.
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import myPic from "./assets/myPic.jpg";
import instagram from "./assets/instagram.svg"
import linkedin from "./assets/linkedin.svg"
import mail from "./assets/mail.svg"
import call from "./assets/call.svg"
import location from "./assets/location.svg"
import boot from "./assets/boot.svg"
import react from "./assets/react.svg"
import java from "./assets/java.svg"
import sql from "./assets/sql.svg"
import js from "./assets/js.png"
import css from "./assets/css.svg"


/* ─────────────────────────────────────────────────────────
   DESIGN TOKENS (CSS-in-JS — inline for portability)
───────────────────────────────────────────────────────── */
const T = {
  bg:         "#0d0002",      // deepened from #370001 — richer dark
  bgMid:      "#1a0003",      // mid surface
  bgCard:     "rgba(26,0,3,0.7)",
  red:        "#E63329",      // primary accent
  redGlow:    "rgba(230,51,41,0.35)",
  redDim:     "rgba(230,51,41,0.1)",
  redBorder:  "rgba(230,51,41,0.25)",
  crimson:    "rgb(162,0,0)", // original glow color — kept
  white:      "#f5f0f0",
  muted:      "rgba(245,240,240,0.45)",
  faint:      "rgba(245,240,240,0.12)",
  border:     "rgba(255,255,255,0.06)",
  borderHov:  "rgba(255,255,255,0.14)",
  gold:       "#f5c842",
  fontDisplay:"'Bebas Neue', 'Anton', sans-serif",
  fontBody:   "'DM Sans', 'Segoe UI', sans-serif",
  fontMono:   "'JetBrains Mono', 'Fira Code', monospace",
};

/* ─────────────────────────────────────────────────────────
   GLOBAL STYLES (injected once)
───────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

  html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }

  body {
    font-family: 'DM Sans', 'Segoe UI', sans-serif;
    background: #0d0002;
    color: #f5f0f0;
    overflow-x: hidden;
    cursor: default;
  }

  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: #0d0002; }
  ::-webkit-scrollbar-thumb { background: #E63329; border-radius: 2px; }

  ::selection { background: #E63329; color: #fff; }

  :focus-visible { outline: 2px solid #E63329; outline-offset: 3px; border-radius: 4px; }

  .sr-only { position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; }

  /* Reveal on scroll */
  .reveal { opacity:0; transform:translateY(40px); transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1); }
  .reveal.in { opacity:1; transform:none; }

  /* Stagger children */
  .stagger > *:nth-child(1) { transition-delay: 0s; }
  .stagger > *:nth-child(2) { transition-delay: 0.08s; }
  .stagger > *:nth-child(3) { transition-delay: 0.16s; }
  .stagger > *:nth-child(4) { transition-delay: 0.24s; }
  .stagger > *:nth-child(5) { transition-delay: 0.32s; }
  .stagger > *:nth-child(6) { transition-delay: 0.40s; }

  /* Orbit animations — ORIGINAL solar system */
  @keyframes orbit-cw  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes orbit-ccw { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
  @keyframes counter-rotate-cw  { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
  @keyframes counter-rotate-ccw { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

  /* Float */
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  /* Pulse dot */
  @keyframes pulse-dot { 0%,100%{box-shadow:0 0 0 0 rgba(230,51,41,0.5)} 50%{box-shadow:0 0 0 8px transparent} }
  /* Subtle interactive hover — replaces custom cursor */
  a, button { cursor: pointer; }
  a:hover, button:hover { outline: none; }

  /* Blink cursor */
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  /* Shimmer */
  @keyframes shimmer { from{transform:translateX(-100%)} to{transform:translateX(100%)} }
  /* Spin slow */
  @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  /* Scroll line */
  @keyframes scroll-drip { 0%{opacity:0;transform:scaleY(0) translateY(-100%)} 30%{opacity:1;transform:scaleY(1) translateY(0)} 80%{opacity:1;transform:scaleY(1) translateY(0)} 100%{opacity:0;transform:scaleY(1) translateY(100%)} }
  /* Glow pulse */
  @keyframes glow-pulse { 0%,100%{box-shadow:0 0 20px rgba(162,0,0,0.3)} 50%{box-shadow:0 0 60px rgba(162,0,0,0.7), 0 0 100px rgba(230,51,41,0.3)} }
  /* Number count */
  @keyframes count-in { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
`;

/* ─────────────────────────────────────────────────────────
   AMBIENT BACKGROUND — CSS-only, zero JS animation cost.
   Stars are pseudo-random divs animated with CSS opacity only
   (GPU compositor handles these — no main-thread work at all).
   Nebula glows are static radial-gradient divs, painted once.
───────────────────────────────────────────────────────── */

// Seeded pseudo-random for deterministic star positions
const seededRng = (seed) => {
  let s = seed;
  return () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff; };
};

const STAR_CSS = (() => {
  const rng = seededRng(42);
  const stars = Array.from({ length: 160 }, (_, i) => {
    const x    = (rng() * 100).toFixed(2);
    const y    = (rng() * 400).toFixed(2);  // spread over 400vh
    const size = (rng() * 1.6 + 0.4).toFixed(1);
    const dur  = (rng() * 4 + 2).toFixed(1);
    const del  = (rng() * 5).toFixed(2);
    return `
      .star-${i} {
        position:fixed; left:${x}vw; top:${y}vh;
        width:${size}px; height:${size}px;
        border-radius:50%; background:rgba(255,230,230,0.85);
        pointer-events:none; z-index:0;
        animation: star-pulse ${dur}s ${del}s ease-in-out infinite;
        will-change: opacity;
      }`;
  }).join("");
  return `
    @keyframes star-pulse { 0%,100%{opacity:0.15} 50%{opacity:0.9} }
    ${stars}
  `;
})();

const CosmicBackground = () => {
  // Inject star CSS once
  useEffect(() => {
    const id = "star-styles";
    if (!document.getElementById(id)) {
      const el = document.createElement("style");
      el.id = id;
      el.textContent = STAR_CSS;
      document.head.appendChild(el);
    }
    return () => { document.getElementById("star-styles")?.remove(); };
  }, []);

  const rng2 = seededRng(99);
  const stars = Array.from({ length: 160 }, (_, i) => (
    <div key={i} className={`star-${i}`} aria-hidden="true" />
  ));

  return (
    <>
      {/* Stars — CSS opacity animation only, GPU compositor */}
      {stars}
      {/* Nebula glows — static, painted once by browser */}
      <div aria-hidden="true" style={{
        position:"fixed", inset:0, zIndex:0, pointerEvents:"none",
        background:`
          radial-gradient(ellipse 40vw 30vh at 80% 8%,  rgba(162,0,0,0.09) 0%, transparent 70%),
          radial-gradient(ellipse 35vw 25vh at 15% 22%, rgba(230,51,41,0.06) 0%, transparent 70%),
          radial-gradient(ellipse 38vw 28vh at 70% 55%, rgba(162,0,0,0.07) 0%, transparent 70%),
          radial-gradient(ellipse 30vw 22vh at 30% 75%, rgba(230,51,41,0.05) 0%, transparent 70%),
          radial-gradient(ellipse 36vw 26vh at 85% 88%, rgba(162,0,0,0.06) 0%, transparent 70%)
        `,
      }} />
    </>
  );
};

/* ─────────────────────────────────────────────────────────
   NAV — ultra-minimal, cosmic glassmorphic
───────────────────────────────────────────────────────── */
const Nav = ({ scrollTo, active }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close the drawer automatically if the viewport grows back to desktop width
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const links = ["Home", "About", "Projects", "Contact"];

  const navStyle = {
    position: "fixed", top: 0, left: 0, right: 0,
    zIndex: 9000,
    display: "flex", alignItems: "center", justifyContent: "space-between",
    height: "4.5rem",
    background: scrolled || open ? "rgba(13,0,2,0.92)" : "transparent",
    backdropFilter: scrolled || open ? "blur(20px)" : "none",
    borderBottom: scrolled || open ? `1px solid ${T.border}` : "none",
    transition: "background 0.4s, border-color 0.4s, backdrop-filter 0.4s",
  };

  const handleNavClick = (sectionId) => {
    scrollTo(sectionId);
    setOpen(false);
  };

  const handleResume = () => {
    window.open("/src/Resume.pdf", "_blank", "noopener");
    setOpen(false);
  };

  return (
    <>
      <style>{`
        .nav-link-item { position:relative; font-family:'DM Sans',sans-serif; font-size:0.78rem; font-weight:500; letter-spacing:0.12em; text-transform:uppercase; color:${T.muted}; background:none; border:none; cursor:pointer; padding:0.4rem 0; transition:color 0.2s; }
        .nav-link-item:hover, .nav-link-item.nav-active { color:${T.white}; }
        .nav-link-item.nav-active::after { content:''; position:absolute; bottom:-2px; left:0; right:0; height:1px; background:${T.red}; }
        .nav-resume-btn { font-family:'DM Sans',sans-serif; font-size:0.75rem; font-weight:500; letter-spacing:0.1em; text-transform:uppercase; color:${T.red}; padding:0.55rem 1.4rem; border:1px solid ${T.redBorder}; border-radius:100px; background:${T.redDim}; cursor:pointer; transition:all 0.3s; }
        .nav-resume-btn:hover { background:${T.red}; color:#fff; box-shadow:0 0 24px ${T.redGlow}; transform:translateY(-1px); }

        /* ── Hamburger button — hidden on desktop, shown on mobile via media query ── */
        .nav-hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 36px;
          height: 36px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
          z-index: 9100;
        }
        .ham-line {
          display:block; width:100%; height:1.5px; background:${T.white}; border-radius:1px;
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.25s, background 0.25s;
          transform-origin: center;
        }
        .nav-hamburger.is-open .ham-line:nth-child(1) { transform: translateY(6.5px) rotate(45deg); background:${T.red}; }
        .nav-hamburger.is-open .ham-line:nth-child(2) { opacity: 0; }
        .nav-hamburger.is-open .ham-line:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); background:${T.red}; }

        /* ── Mobile drawer — hidden on desktop ── */
        .nav-drawer {
          position: fixed;
          top: 4.5rem; left: 0; right: 0;
          z-index: 8999;
          background: rgba(13,0,2,0.97);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid ${T.border};
          display: flex;
          flex-direction: column;
          padding: 1rem 2rem 2rem;
          gap: 0.25rem;
          transform: translateY(-12px);
          opacity: 0;
          pointer-events: none;
          visibility: hidden;
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.3s;
        }
        .nav-drawer.is-open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
          visibility: visible;
        }
        .nav-drawer .nav-link-item {
          width: 100%;
          text-align: left;
          padding: 0.9rem 0;
          font-size: 0.95rem;
          border-bottom: 1px solid ${T.border};
        }
        .nav-drawer .nav-link-item.nav-active::after { display:none; }
        .nav-drawer .nav-link-item.nav-active { color:${T.red}; }
        .nav-drawer .nav-resume-btn { margin-top: 1rem; text-align:center; }
      `}</style>

      <header className="nav-header" style={navStyle}>
        {/* Logo */}
        <button onClick={() => handleNavClick("home")} style={{ font:"inherit", background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:"0.5rem" }}>
          {/* Tiny solar system logo */}
          <div style={{ position:"relative", width:28, height:28 }}>
            <div style={{ position:"absolute", inset:0, borderRadius:"50%", border:`1px solid ${T.redBorder}`, animation:"spin-slow 8s linear infinite" }} />
            <div style={{ position:"absolute", top:"50%", left:"50%", width:8, height:8, borderRadius:"50%", background:T.red, transform:"translate(-50%,-50%)", boxShadow:`0 0 10px ${T.crimson}` }} />
            <div style={{ position:"absolute", top:3, left:"50%", width:4, height:4, borderRadius:"50%", background:T.white, transform:"translateX(-50%)" }} />
          </div>
          <span style={{ fontFamily:T.fontDisplay, fontSize:"1.4rem", letterSpacing:"0.05em", color:T.white }}>
            K<span style={{ color:T.red }}>.</span>
          </span>
        </button>

        {/* Desktop links — hidden on mobile via media query */}
        <nav className="nav-links-desktop" style={{ display:"flex", gap:"2.5rem" }} aria-label="Main navigation">
          {links.map((l) => (
            <button key={l} className={`nav-link-item${active === l.toLowerCase() ? " nav-active" : ""}`}
              onClick={() => handleNavClick(l.toLowerCase())}>
              {l}
            </button>
          ))}
        </nav>

        {/* Resume button — hidden on mobile via media query */}
        <button className="nav-resume-btn nav-resume-desktop" onClick={handleResume}>
          Resume ↓
        </button>

        {/* Hamburger — hidden on desktop, shown on mobile via media query */}
        <button
          className={`nav-hamburger${open ? " is-open" : ""}`}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav-drawer"
        >
          <span className="ham-line" />
          <span className="ham-line" />
          <span className="ham-line" />
        </button>
      </header>

      {/* Mobile drawer */}
      <nav
        id="mobile-nav-drawer"
        className={`nav-drawer${open ? " is-open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!open}
      >
        {links.map((l) => (
          <button key={l} className={`nav-link-item${active === l.toLowerCase() ? " nav-active" : ""}`}
            onClick={() => handleNavClick(l.toLowerCase())}>
            {l}
          </button>
        ))}
        <button className="nav-resume-btn" onClick={handleResume}>
          Resume ↓
        </button>
      </nav>
    </>
  );
};

/* ─────────────────────────────────────────────────────────
   SOLAR SYSTEM — redesigned: larger, more dramatic orbits
   Preserves ALL original orbit logic; just styled premium
───────────────────────────────────────────────────────── */
const SolarSystem = () => {
  /*
   * CORRECT ORBIT MATH
   * ──────────────────
   * Container is a fixed square (WRAP × WRAP). Its center is the photo center.
   *
   * Each "arm" div:
   *   - is exactly WRAP × WRAP (same as container)
   *   - is absolutely positioned at top:0 left:0 (fills the container)
   *   - rotates around its own center via transform-origin: 50% 50%
   *     which is the center of the container = center of the photo
   *
   * The icon sits at position:
   *   top: (WRAP/2 - radius)      → radius px above center
   *   left: (WRAP/2 - ICON/2)     → horizontally centered
   *
   * A counter-rotation on the icon wrapper keeps it upright.
   *
   * This guarantees every icon traces a perfect circle of the correct
   * radius, centered exactly on the photo. No absolute positioning
   * hacks, no margin tricks that break on resize.
   */
  const WRAP = 420;  // container square size px
  const PHOTO = 130; // photo diameter px
  const ICON = 48;   // icon pill size px

  // radii: distance from center to icon center
  const techs = [
    { id:"java",  label:"Java",       src:"./assets/java.svg",  radius:200, dur:"120s", cw:true,  z:1 },
    { id:"sql",   label:"SQL",        src:"./assets/sql.svg",   radius:168, dur:"95s",  cw:false, z:2 },
    { id:"react", label:"React",      src:"./assets/react.svg", radius:138, dur:"75s",  cw:true,  z:3 },
    { id:"js",    label:"JS",         src:"./assets/js.png",    radius:110, dur:"38s",  cw:false, z:4 },
    { id:"boot",  label:"Spring",     src:"./assets/boot.svg",  radius:82,  dur:"22s",  cw:true,  z:5 },
    { id:"css",   label:"CSS",        src:"./assets/css.svg",   radius:56,  dur:"14s",  cw:false, z:6 },
  ];

  const cx = WRAP / 2; // 210 — center x
  const cy = WRAP / 2; // 210 — center y

  return (
    <div style={{
      position:"relative",
      width:  WRAP,
      height: WRAP,
      flexShrink: 0,
    }}>

      {/* ── Decorative orbit ring lines — static, no animation ── */}
      {techs.map((t) => (
        <div key={`ring-${t.id}`} style={{
          position:"absolute",
          width:  t.radius * 2,
          height: t.radius * 2,
          borderRadius:"50%",
          border:`1px solid rgba(230,51,41,${0.04 + t.z * 0.025})`,
          top:  cy - t.radius,
          left: cx - t.radius,
          pointerEvents:"none",
          zIndex: 0,
        }} />
      ))}

      {/* ── Center photo — always on top ── */}
      <div style={{
        position:"absolute",
        width:  PHOTO,
        height: PHOTO,
        top:  cy - PHOTO / 2,
        left: cx - PHOTO / 2,
        borderRadius:"50%",
        border:"2px solid #E63329",
        boxShadow:"0 0 30px rgb(162,0,0), 0 0 70px rgba(162,0,0,0.3)",
        overflow:"hidden",
        zIndex: 20,
        animation:"glow-pulse 4s ease-in-out infinite",
        willChange:"box-shadow",
      }}>
        <img
          src="./assets/myPic.jpg"
          alt="Keerthana R."
          style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top" }}
        />
      </div>

      {/* ── Orbit arms ── */}
      {techs.map((t) => {
        const armAnim  = t.cw  ? "orbit-cw"  : "orbit-ccw";
        const iconAnim = t.cw  ? "orbit-ccw" : "orbit-cw";   // counter keeps icon upright

        return (
          <div
            key={t.id}
            style={{
              /*
               * The arm is WRAP×WRAP, positioned at 0,0 so its center
               * aligns exactly with the photo center.
               * transform-origin defaults to 50% 50% = photo center.
               */
              position: "absolute",
              top:  0,
              left: 0,
              width:  WRAP,
              height: WRAP,
              animation: `${armAnim} ${t.dur} linear infinite`,
              zIndex: t.z,
              willChange: "transform",
            }}
          >
            {/*
             * Icon sits at the top of the orbit circle.
             * top:  cy - radius - ICON/2   (radius above center, minus half icon)
             * left: cx - ICON/2            (horizontally centered)
             */}
            <div style={{
              position: "absolute",
              top:  cy - t.radius - ICON / 2,
              left: cx - ICON / 2,
              width:  ICON,
              height: ICON,
              animation: `${iconAnim} ${t.dur} linear infinite`,
            }}>
              <div style={{
                width:  "100%",
                height: "100%",
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                justifyContent:"center",
                gap: 2,
                background:"rgba(8,0,1,0.92)",
                border:"1px solid rgba(230,51,41,0.3)",
                borderRadius: 10,
              }}>
                <img
                  src={t.src}
                  alt={t.label}
                  style={{ width:24, height:24, objectFit:"contain" }}
                  onError={(e) => { e.currentTarget.style.display="none"; }}
                />
                <span style={{
                  fontFamily:"'JetBrains Mono','Fira Code',monospace",
                  fontSize:"7px",
                  color:"rgba(245,240,240,0.5)",
                  letterSpacing:"0.04em",
                  lineHeight:1,
                }}>{t.label}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────── */
const ROLES = ["Full Stack Developer", "React UI Engineer", "Spring Boot Dev", "Java Developer"];

/* Typewriter — isolated component so it NEVER triggers Hero re-render */
const Typewriter = React.memo(() => {
  const [displayed, setDisplayed] = React.useState("");
  const [deleting,  setDeleting]  = React.useState(false);
  const [roleIdx,   setRoleIdx]   = React.useState(0);
  const tRef = React.useRef(null);

  React.useEffect(() => {
    const cur = ROLES[roleIdx];
    const next = () => {
      if (!deleting && displayed.length < cur.length) {
        tRef.current = setTimeout(() => setDisplayed(cur.slice(0, displayed.length + 1)), 60);
      } else if (!deleting && displayed.length === cur.length) {
        tRef.current = setTimeout(() => setDeleting(true), 2200);
      } else if (deleting && displayed.length > 0) {
        tRef.current = setTimeout(() => setDisplayed(cur.slice(0, displayed.length - 1)), 35);
      } else {
        setDeleting(false);
        setRoleIdx((i) => (i + 1) % ROLES.length);
      }
    };
    next();
    return () => clearTimeout(tRef.current);
  }, [displayed, deleting, roleIdx]);

  return (
    <span style={{
      fontFamily:"'JetBrains Mono','Fira Code',monospace",
      fontSize:"1.15rem",
      color:"rgba(245,240,240,0.55)",
    }} aria-live="polite">
      ▸&nbsp;{displayed}
      <span style={{
        display:"inline-block", width:2, height:"1em",
        background:"#E63329", marginLeft:3, verticalAlign:"middle",
        animation:"blink 1s step-end infinite",
      }} aria-hidden="true" />
    </span>
  );
});

const Hero = ({ sectionRef, scrollTo }) => {
  /* No typewriter state here — Typewriter is its own memoized component
     so its setState never triggers Hero to re-render */
  const s = {
    section: {
      position:"relative", zIndex:1,
      minHeight:"100vh",
      display:"grid",
      gridTemplateColumns:"1fr 1fr",
      alignItems:"center",
      gap:"3rem",
      padding:"7rem 6rem 4rem",
      maxWidth:1400,
      margin:"0 auto",
    },
    statusPill: {
      display:"inline-flex", alignItems:"center", gap:8,
      padding:"0.35rem 1rem",
      borderRadius:100,
      border:`1px solid ${T.redBorder}`,
      background:T.redDim,
      fontSize:"0.82rem",
      fontFamily:T.fontBody,
      fontWeight:500,
      letterSpacing:"0.1em",
      textTransform:"uppercase",
      color:T.red,
      width:"fit-content",
      marginBottom:"1.5rem",
    },
    name: {
      fontFamily:T.fontDisplay,
      fontSize:"clamp(4.5rem,8vw,8rem)",
      lineHeight:1.0,
      letterSpacing:"0.04em",
      color:T.white,
      marginBottom:"1.5rem",
    },
    nameAccent: { color:T.red },
    bio: {
      fontSize:"1.1rem", color:T.muted, lineHeight:1.9,
      maxWidth:"42ch", marginBottom:"2.5rem",
    },
    ctaRow: { display:"flex", gap:"1rem", flexWrap:"wrap", marginBottom:"2rem" },
    statRow: {
      display:"flex", gap:"2.5rem", paddingTop:"2rem",
      borderTop:`1px solid ${T.border}`,
    },
    statNum: { fontFamily:T.fontDisplay, fontSize:"3.5rem", lineHeight:1, color:T.white },
    statLabel: { fontSize:"0.78rem", color:T.muted, letterSpacing:"0.1em", textTransform:"uppercase", marginTop:4 },
    rightCol: {
      position:"relative", height:520,
      display:"flex", alignItems:"center", justifyContent:"center",
    },
    scrollLine: {
      position:"absolute", bottom:"3rem", left:"50%", transform:"translateX(-50%)",
      display:"flex", flexDirection:"column", alignItems:"center", gap:8,
      color:T.faint, fontSize:"0.6rem", letterSpacing:"0.15em", textTransform:"uppercase",
      fontFamily:T.fontBody,
    },
  };

  return (
    <section ref={sectionRef} id="home" className="hero-grid" style={s.section} aria-label="Introduction">

      {/* Left */}
      <div className="hero-left">
        {/* Status */}
        <div className="hero-status" style={s.statusPill}>
          <span style={{ width:6, height:6, borderRadius:"50%", background:T.red, display:"block", animation:"pulse-dot 2s ease-in-out infinite" }} />
          Available for opportunities
        </div>

        {/* Name */}
        <h1 className="hero-name-size" style={s.name}>
          <span>Keerthana</span><br />
          <span style={s.nameAccent}>R.</span>
        </h1>

        {/* Role typewriter — isolated memo component, never re-renders Hero */}
        <div style={{ marginBottom:"1.5rem" }}>
          <Typewriter />
        </div>

        {/* Bio */}
        <p className="hero-bio" style={s.bio}>
          MCA student at Bangalore University. I craft scalable Java backends with
          Spring Boot and ship polished React interfaces. Two projects shipped,
          real problems solved.
        </p>

        {/* CTAs */}
        <div className="hero-ctas" style={s.ctaRow}>
          <PrimaryBtn onClick={() => scrollTo("contact")}>Hire Me →</PrimaryBtn>
          <GhostBtn onClick={() => window.open("https://github.com/Keerthana7654", "_blank", "noopener")}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ marginRight:6 }}>
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.57v-2c-3.34.72-4.04-1.6-4.04-1.6-.54-1.38-1.32-1.75-1.32-1.75-1.08-.74.08-.72.08-.72 1.2.08 1.82 1.22 1.82 1.22 1.06 1.82 2.78 1.3 3.46.99.1-.77.42-1.3.76-1.6-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.138 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.68.83.57C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </GhostBtn>
        </div>

        {/* Social icons */}
        <div className="hero-socials" style={{ display:"flex", gap:"0.7rem", marginBottom:"2rem" }}>
          {[
            { label:"LinkedIn", url:"https://www.linkedin.com/in/keerthana-r-8a19a3340", icon:<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>, extra:<circle cx="4" cy="4" r="2"/> },
            { label:"Instagram", url:"https://www.instagram.com/ll__keerthana__ll", icon:<><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2"/></> },
            { label:"Email", url:"mailto:keerthi9643@gmail.com", icon:<><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="none" stroke="currentColor" strokeWidth="2"/><polyline points="22,6 12,13 2,6" fill="none" stroke="currentColor" strokeWidth="2"/></> },
          ].map((s) => (
            <a key={s.label} href={s.url} target={s.url.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer" aria-label={s.label}
              style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:40, height:40, borderRadius:"50%", border:`1px solid ${T.border}`, color:T.muted, transition:"all 0.25s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = T.red; e.currentTarget.style.color = T.red; e.currentTarget.style.background = T.redDim; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.muted; e.currentTarget.style.background = "transparent"; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{s.icon}{s.extra}</svg>
            </a>
          ))}
        </div>

        {/* Stats */}
        <div className="hero-stats" style={s.statRow}>
          {[["2", "Projects Built"], ["8.92", "BCA CGPA"], ["8.18", "MCA CGPA"], ["6+", "Technologies"]].map(([v, l]) => (
            <div key={l}>
              <div style={s.statNum}>{v}</div>
              <div style={s.statLabel}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — Solar system */}
      <div className="hero-right" style={s.rightCol}>
        <SolarSystem />
      </div>

      {/* Scroll indicator */}
      <div style={s.scrollLine} aria-hidden="true">
        <div style={{ width:1, height:50, background:`linear-gradient(to bottom, ${T.red}, transparent)`, animation:"scroll-drip 2s ease-in-out infinite" }} />
        <span>scroll</span>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────
   SHARED BUTTON COMPONENTS
───────────────────────────────────────────────────────── */
const PrimaryBtn = React.memo(({ onClick, children, style = {} }) => (
  <button onClick={onClick} style={{
    display:"inline-flex", alignItems:"center", gap:6,
    padding:"0.8rem 2rem", borderRadius:100,
    background:T.red, color:"#fff",
    fontFamily:T.fontBody, fontSize:"0.85rem", fontWeight:500,
    border:"none", cursor:"pointer",
    transition:"transform 0.2s, box-shadow 0.2s",
    ...style,
  }}
    onMouseEnter={(e) => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=`0 8px 30px ${T.redGlow}`; }}
    onMouseLeave={(e) => { e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none"; }}>
    {children}
  </button>
));

const GhostBtn = React.memo(({ onClick, children, style = {} }) => (
  <button onClick={onClick} style={{
    display:"inline-flex", alignItems:"center",
    padding:"0.8rem 2rem", borderRadius:100,
    background:"transparent", color:T.white,
    fontFamily:T.fontBody, fontSize:"0.85rem", fontWeight:500,
    border:`1px solid ${T.borderHov}`, cursor:"pointer",
    transition:"all 0.2s",
    ...style,
  }}
    onMouseEnter={(e) => { e.currentTarget.style.borderColor=T.muted; e.currentTarget.style.transform="translateY(-2px)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.borderColor=T.borderHov; e.currentTarget.style.transform="none"; }}>
    {children}
  </button>
));

/* ─────────────────────────────────────────────────────────
   SECTION HEADER (reused)
───────────────────────────────────────────────────────── */
const SectionHeader = ({ eyebrow, title, subtitle }) => (
  <div style={{ marginBottom:"4rem" }}>
    <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:"0.75rem" }}>
      <span style={{ display:"block", width:28, height:1, background:T.red }} />
      <span style={{ fontFamily:T.fontBody, fontSize:"0.85rem", fontWeight:500, letterSpacing:"0.15em", textTransform:"uppercase", color:T.red }}>
        {eyebrow}
      </span>
    </div>
    <h2 style={{ fontFamily:T.fontDisplay, fontSize:"clamp(2.8rem,5vw,5rem)", lineHeight:0.95, letterSpacing:"0.02em", color:T.white, marginBottom:"1.25rem" }}>
      {title}
    </h2>
    {subtitle && <p style={{ fontSize:"1.15rem", color:T.muted, maxWidth:"54ch", lineHeight:1.85 }}>{subtitle}</p>}
  </div>
);

/* ─────────────────────────────────────────────────────────
   ABOUT / SKILLS SECTION
───────────────────────────────────────────────────────── */
const SKILLS = [
  { cat:"Frontend", icon:"🎨", items:["HTML5", "CSS3", "JavaScript (ES6+)", "React JS", "Responsive Design"] },
  { cat:"Backend",  icon:"⚙️", items:["Java", "Spring Boot", "JDBC", "Hibernate", "Servlets & JSP", "REST APIs"] },
  { cat:"Database", icon:"🗄️", items:["MySQL", "SQL", "Database Design"] },
  { cat:"Tools",    icon:"🛠️", items:["Git", "GitHub", "MVC Architecture", "OOP", "DSA"] },
];

const About = ({ sectionRef }) => {
  const codeSnippet = `public class Keerthana {
  String[] frontEnd = {
    "HTML", "CSS", "JS", "React"
  };
  String[] backEnd = {
    "Java", "SpringBoot",
    "JDBC", "Hibernate"
  };
  String[] database = {"SQL","MySQL"};
}`;

  return (
    <section ref={sectionRef} id="about" className="section-pad" style={{
      position:"relative", zIndex:1,
      padding:"8rem 6rem",
      maxWidth:1400, margin:"0 auto",
    }}>
      <SectionHeader
        eyebrow="Background"
        title={"WHAT I\nBRING"}
        subtitle="Full-stack engineering across the Java ecosystem and modern JS frameworks — from database schema to pixel-perfect UI."
      />

      <div className="about-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1.6fr", gap:"4rem", alignItems:"start" }}>

        {/* Left — bio + edu + code snippet */}
        <div className="reveal">
          {/* Bio card */}
          <div style={{
            background:T.bgCard,
            border:`1px solid ${T.border}`,
            borderRadius:20,
            padding:"2rem",
            marginBottom:"1.5rem",
            backdropFilter:"blur(12px)",
            position:"relative", overflow:"hidden",
          }}>
            <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:`linear-gradient(90deg, ${T.red}, transparent)` }} />
            <h3 style={{ fontFamily:T.fontDisplay, fontSize:"1.8rem", letterSpacing:"0.05em", color:T.white, marginBottom:"1rem" }}>ABOUT ME</h3>
            <p style={{ fontSize:"1.05rem", color:T.muted, lineHeight:1.9, marginBottom:"0.75rem" }}>
              I'm Keerthana R., an MCA student at G.T. College (Bangalore University), passionate about building software that matters. Started with BCA (CGPA 8.92), now pursuing MCA (CGPA 8.18).
            </p>
            <p style={{ fontSize:"1.05rem", color:T.muted, lineHeight:1.9 }}>
              I thrive at the intersection of clean backend architecture and polished UI — and I genuinely love solving hard problems with elegant code.
            </p>
          </div>

          {/* Education */}
          <div style={{ marginBottom:"1.5rem" }}>
            <div style={{ fontSize:"0.78rem", fontWeight:500, letterSpacing:"0.12em", textTransform:"uppercase", color:T.red, marginBottom:"1rem" }}>
              Education
            </div>
            {[
              { deg:"MCA (Pursuing)", school:"G.T. College, Bangalore University", meta:"CGPA 8.18 · 2024–2026" },
              { deg:"BCA", school:"Vasavi Jnana Peetha FGC, Bangalore University", meta:"CGPA 8.92 · 2021–2024" },
            ].map((e) => (
              <div key={e.deg} style={{ marginBottom:"1rem", paddingLeft:"1rem", borderLeft:`2px solid ${T.redBorder}` }}>
                <div style={{ fontFamily:T.fontBody, fontWeight:500, fontSize:"1rem", color:T.white }}>{e.deg}</div>
                <div style={{ fontSize:"0.9rem", color:T.muted, marginTop:3 }}>{e.school}</div>
                <div style={{ fontSize:"0.8rem", color:T.red, fontFamily:T.fontMono, marginTop:4 }}>{e.meta}</div>
              </div>
            ))}
          </div>

          {/* Code snippet — from original, restyled */}
          <div style={{
            background:"#0a0002",
            border:`1px solid ${T.border}`,
            borderRadius:12,
            padding:"1.25rem",
            fontFamily:T.fontMono,
            fontSize:"0.82rem",
            color:T.red,
            lineHeight:1.85,
            position:"relative", overflow:"hidden",
          }}>
            <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:`linear-gradient(90deg, ${T.red}, transparent)` }} />
            <div style={{ fontSize:"0.6rem", color:T.faint, marginBottom:"0.5rem", letterSpacing:"0.1em" }}>// Keerthana.java</div>
            <pre style={{ margin:0, whiteSpace:"pre-wrap", color:"inherit" }}>{codeSnippet}</pre>
          </div>
        </div>

        {/* Right — skill category cards */}
        <div className="stagger" style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
          {SKILLS.map((cat) => (
            <div key={cat.cat} className="reveal"
              style={{
                background:T.bgCard,
                border:`1px solid ${T.border}`,
                borderRadius:16,
                padding:"1.5rem",
                backdropFilter:"blur(12px)",
                transition:"border-color 0.3s, transform 0.3s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor=T.redBorder; e.currentTarget.style.transform="translateY(-3px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor=T.border; e.currentTarget.style.transform="none"; }}
            >
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:"1rem" }}>
                <span style={{ width:32, height:32, borderRadius:8, background:T.redDim, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1rem" }}>{cat.icon}</span>
                <span style={{ fontFamily:T.fontDisplay, fontSize:"1.4rem", letterSpacing:"0.05em", color:T.white }}>{cat.cat}</span>
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"0.4rem" }}>
                {cat.items.map((s) => (
                  <span key={s} style={{
                    padding:"0.28rem 0.75rem",
                    borderRadius:100,
                    background:"rgba(230,51,41,0.06)",
                    border:`1px solid ${T.border}`,
                    fontSize:"0.85rem",
                    fontFamily:T.fontMono,
                    color:T.muted,
                    transition:"all 0.2s",
                    cursor:"default",
                  }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor=T.red; e.currentTarget.style.color=T.red; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor=T.border; e.currentTarget.style.color=T.muted; }}
                  >{s}</span>
                ))}
              </div>
            </div>
          ))}

          {/* Achievements */}
          <div className="achievement-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"0.75rem" }}>
            {[
              { icon:"🏆", title:"Runner-up", sub:"Crackathon — Surana College" },
              { icon:"📜", title:"Certified", sub:"Full Stack Java — JSpiders" },
              { icon:"🎓", title:"Exec Head", sub:"Academic Committee Lead" },
            ].map((a) => (
              <div key={a.title} className="reveal" style={{
                background:T.bgCard,
                border:`1px solid ${T.border}`,
                borderRadius:12,
                padding:"1rem",
                backdropFilter:"blur(8px)",
                textAlign:"center",
                transition:"border-color 0.3s",
              }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor=T.redBorder}
                onMouseLeave={(e) => e.currentTarget.style.borderColor=T.border}
              >
                <div style={{ fontSize:"1.5rem", marginBottom:6 }}>{a.icon}</div>
                <div style={{ fontFamily:T.fontDisplay, fontSize:"1.1rem", letterSpacing:"0.05em", color:T.white, marginBottom:4 }}>{a.title}</div>
                <div style={{ fontSize:"0.82rem", color:T.muted, lineHeight:1.5 }}>{a.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────
   PROJECTS — cinematic case studies
───────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    num:"01", icon:"🛡️", tag:"Security System", year:"2024",
    name:"Intrusion Detection & Prevention System",
    problem:"Organizations lacked an accessible web tool to monitor, log, and respond to suspicious intrusions in real time — relying on expensive enterprise software.",
    solution:"Built a full-stack IDPS with Java Servlets + JSP following MVC, JDBC/MySQL for persistent logs, rule-based anomaly detection engine, and a responsive real-time dashboard with alert escalation.",
    outcome:"End-to-end audit trail, real-time alerting, MVC-clean codebase",
    tech:["Java","Servlets","JSP","JDBC","MySQL","HTML","CSS","JavaScript"],
    github:"https://github.com/Keerthana7654/Intrusion-Detection-and-Prevention",
    featured:true,
  },
  {
    num:"02", icon:"🧠", tag:"AI / ML", year:"2024",
    name:"AI-Driven Emotion Adaptive Gaming UI",
    problem:"Emotional state impacts gameplay performance — yet no gaming UI dynamically adapts its theme and experience to the player's real-time mood.",
    solution:"Integrated face-api.js deep learning models with React for webcam-based emotion detection. Built confidence-threshold + temporal-smoothing logic to suppress false positives (–40%). Spring Boot REST APIs manage game state.",
    outcome:"<300ms detection latency · False-positive suppression –40% · Adaptive dynamic theming",
    tech:["React JS","face-api.js","Spring Boot","REST APIs","JavaScript"],
    github:"https://github.com/Keerthana7654/AI-Emotion-Adaptive-UI-Dynamic-Frontend-that-changes-based-on-user-mood-",
    featured:true,
  },
  {
    num:"03", icon:"🌌", tag:"Personal Project", year:"2025",
    name:"Developer Portfolio v2",
    problem:"Generic templates fail to communicate technical depth or personal brand — they look identical to every other student portfolio.",
    solution:"Designed and built a fully custom React portfolio from scratch — cosmic identity, CSS design tokens, IntersectionObserver scroll reveals, custom cursor, typewriter hero, and WCAG AA accessibility.",
    outcome:"100% custom · Zero templates · WCAG AA",
    tech:["React JS","CSS Custom Properties","Vite","Responsive Design"],
    github:"https://github.com/Keerthana7654",
    featured:false,
  },
];

const Projects = ({ sectionRef }) => (
  <section ref={sectionRef} id="projects" className="section-pad" style={{
    position:"relative", zIndex:1,
    padding:"8rem 6rem",
    background:`linear-gradient(to bottom, transparent, rgba(26,0,3,0.4), transparent)`,
    borderTop:`1px solid ${T.border}`,
    borderBottom:`1px solid ${T.border}`,
  }}>
    <div style={{ maxWidth:1400, margin:"0 auto" }}>
      <SectionHeader
        eyebrow="Case Studies"
        title={"THINGS I'VE\nBUILT"}
        subtitle="Real problems, real solutions. Each project documented as an engineering case study — problem space to measurable outcomes."
      />

      <div style={{ display:"flex", flexDirection:"column", gap:"1.5rem" }}>
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.num} project={p} delay={i * 0.1} />
        ))}
      </div>

      {/* GitHub CTA */}
      <div style={{ textAlign:"center", marginTop:"3.5rem" }} className="reveal">
        <GhostBtn onClick={() => window.open("https://github.com/Keerthana7654","_blank","noopener")}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight:8 }} aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.57v-2c-3.34.72-4.04-1.6-4.04-1.6-.54-1.38-1.32-1.75-1.32-1.75-1.08-.74.08-.72.08-.72 1.2.08 1.82 1.22 1.82 1.22 1.06 1.82 2.78 1.3 3.46.99.1-.77.42-1.3.76-1.6-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.138 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.68.83.57C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
          View all repositories
        </GhostBtn>
      </div>
    </div>
  </section>
);

const ProjectCard = ({ project: p, delay }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <article className="reveal" style={{ transitionDelay:`${delay}s` }}
      aria-label={`Project: ${p.name}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="project-card-grid" style={{
        display:"grid", gridTemplateColumns:"280px 1fr",
        background:T.bgCard,
        border:`1px solid ${hovered ? T.redBorder : T.border}`,
        borderRadius:20,
        overflow:"hidden",
        backdropFilter:"blur(12px)",
        transition:"border-color 0.35s, transform 0.35s, box-shadow 0.35s",
        transform:hovered ? "translateY(-4px)" : "none",
        boxShadow:hovered ? `0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(162,0,0,0.08)` : "none",
      }}>

        {/* Visual panel */}
        <div className="proj-visual" style={{
          background:`linear-gradient(135deg, rgba(26,0,3,0.9), rgba(162,0,0,0.08))`,
          borderRight:`1px solid ${T.border}`,
          display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
          gap:"1rem", padding:"2.5rem",
          position:"relative", overflow:"hidden",
        }}>
          {/* Grid texture */}
          <div style={{
            position:"absolute", inset:0,
            backgroundImage:`linear-gradient(${T.redBorder} 1px, transparent 1px), linear-gradient(90deg, ${T.redBorder} 1px, transparent 1px)`,
            backgroundSize:"24px 24px", opacity:0.3,
          }} />
          <div style={{
            width:80, height:80, borderRadius:16,
            background:T.redDim, border:`1px solid ${T.redBorder}`,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:"2.2rem", position:"relative", zIndex:1,
            transition:"transform 0.35s",
            transform:hovered ? "scale(1.1) rotate(-4deg)" : "none",
          }}>{p.icon}</div>
          <div style={{ fontFamily:T.fontDisplay, fontSize:"3.5rem", color:"rgba(230,51,41,0.06)", position:"absolute", bottom:8, right:12, lineHeight:1, userSelect:"none" }}>{p.num}</div>
        </div>

        {/* Content */}
        <div style={{ padding:"2rem 2.5rem", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
          <div>
            {/* Meta row */}
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:"0.75rem", flexWrap:"wrap" }}>
              <span style={{ padding:"0.2rem 0.7rem", borderRadius:100, background:T.redDim, border:`1px solid ${T.redBorder}`, fontSize:"0.78rem", fontFamily:T.fontBody, fontWeight:500, letterSpacing:"0.08em", textTransform:"uppercase", color:T.red }}>{p.tag}</span>
              <span style={{ fontSize:"0.78rem", color:T.faint, fontFamily:T.fontMono }}>{p.year}</span>
              {p.featured && <span style={{ padding:"0.18rem 0.65rem", borderRadius:100, background:"rgba(245,200,66,0.1)", border:"1px solid rgba(245,200,66,0.2)", fontSize:"0.78rem", fontFamily:T.fontBody, fontWeight:500, color:T.gold }}>⭐ Featured</span>}
            </div>

            <h3 style={{ fontFamily:T.fontDisplay, fontSize:"2rem", letterSpacing:"0.03em", lineHeight:1.1, color:T.white, marginBottom:"1rem" }}>{p.name}</h3>

            {/* Case study */}
            {[["Problem", p.problem], ["Solution", p.solution]].map(([label, text]) => (
              <div key={label} style={{ marginBottom:"0.6rem" }}>
                <div style={{ fontSize:"0.75rem", fontWeight:500, letterSpacing:"0.12em", textTransform:"uppercase", color:T.faint, marginBottom:"0.3rem" }}>{label}</div>
                <p style={{ fontSize:"0.96rem", color:T.muted, lineHeight:1.75 }}>{text}</p>
              </div>
            ))}

            {/* Outcome chip */}
            <div style={{ margin:"0.75rem 0" }}>
              <div style={{ fontSize:"0.75rem", fontWeight:500, letterSpacing:"0.12em", textTransform:"uppercase", color:T.faint, marginBottom:"0.3rem" }}>Outcome</div>
              <span style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"0.28rem 0.85rem", borderRadius:100, background:"rgba(245,200,66,0.08)", border:"1px solid rgba(245,200,66,0.2)", fontSize:"0.85rem", fontFamily:T.fontMono, color:T.gold }}>
                ✦ {p.outcome}
              </span>
            </div>

            {/* Tech tags */}
            <div style={{ display:"flex", flexWrap:"wrap", gap:"0.35rem", marginTop:"0.75rem" }}>
              {p.tech.map((t) => (
                <span key={t} style={{ padding:"0.22rem 0.65rem", borderRadius:100, background:"rgba(255,255,255,0.04)", border:`1px solid ${T.border}`, fontSize:"0.82rem", fontFamily:T.fontMono, color:T.muted }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div style={{ display:"flex", gap:"0.75rem", marginTop:"1.25rem", flexWrap:"wrap" }}>
            <a href={p.github} target="_blank" rel="noopener noreferrer"
              style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"0.5rem 1.1rem", borderRadius:100, border:`1px solid ${T.borderHov}`, color:T.muted, fontFamily:T.fontBody, fontSize:"0.88rem", fontWeight:500, transition:"all 0.2s", textDecoration:"none" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor=T.white; e.currentTarget.style.color=T.white; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor=T.borderHov; e.currentTarget.style.color=T.muted; }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.57v-2c-3.34.72-4.04-1.6-4.04-1.6-.54-1.38-1.32-1.75-1.32-1.75-1.08-.74.08-.72.08-.72 1.2.08 1.82 1.22 1.82 1.22 1.06 1.82 2.78 1.3 3.46.99.1-.77.42-1.3.76-1.6-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.138 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.68.83.57C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

/* ─────────────────────────────────────────────────────────
   CONTACT
───────────────────────────────────────────────────────── */
const Contact = ({ sectionRef }) => {
  const [form, setForm]       = useState({ name:"", email:"", subject:"", message:"" });
  const [errors, setErrors]   = useState({});
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Required";
    if (!form.email.trim())   e.email   = "Required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.message.trim()) e.message = "Required";
    return e;
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    const subj = form.subject || `Portfolio enquiry from ${form.name}`;
    const body  = `Hi Keerthana,\n\nI'm ${form.name} (${form.email}).\n\n${form.message}\n\nSent from your portfolio.`;
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=keerthi9643@gmail.com&su=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`, "_blank", "noopener");
    setTimeout(() => { setLoading(false); setSent(true); setForm({ name:"", email:"", subject:"", message:"" }); }, 700);
  };

  const inputStyle = {
    width:"100%", padding:"0.85rem 1.1rem",
    background:"rgba(255,255,255,0.03)",
    border:`1px solid ${T.border}`,
    borderRadius:10, color:T.white,
    fontFamily:T.fontBody, fontSize:"1rem",
    outline:"none", transition:"border-color 0.2s, box-shadow 0.2s",
  };

  const labelStyle = {
    fontSize:"0.82rem", fontWeight:500,
    letterSpacing:"0.12em", textTransform:"uppercase",
    color:T.muted, display:"block", marginBottom:"0.4rem",
  };

  return (
    <section ref={sectionRef} id="contact" className="section-pad" style={{
      position:"relative", zIndex:1,
      padding:"8rem 6rem",
      maxWidth:1400, margin:"0 auto",
    }}>
      <SectionHeader
        eyebrow="Contact"
        title={"LET'S\nCONNECT"}
        subtitle="Open to full-time roles, internships, and collaboration. I reply within 24 hours."
      />

      <div className="contact-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1.5fr", gap:"4rem", alignItems:"start" }}>

        {/* Left info */}
        <div className="reveal">
          <p style={{ fontSize:"1.1rem", color:T.muted, lineHeight:1.9, marginBottom:"2.5rem" }}>
            Whether you're a recruiter looking for a full-stack engineer, a startup building something new, or a developer wanting to collaborate — I'd love to hear from you.
          </p>

          {[
            { icon:"✉️", label:"Email", val:"keerthi9643@gmail.com", href:"mailto:keerthi9643@gmail.com" },
            { icon:"📞", label:"Phone", val:"+91 76762 22059", href:"tel:+917676222059" },
            { icon:"📍", label:"Location", val:"Bangalore, Karnataka, India" },
            { icon:"⚡", label:"Response", val:"Within 24 hours" },
          ].map((item) => (
            <div key={item.label} style={{ display:"flex", alignItems:"center", gap:"1rem", marginBottom:"1.25rem" }}>
              <div style={{ width:40, height:40, borderRadius:10, background:T.redDim, border:`1px solid ${T.redBorder}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1rem", flexShrink:0 }}>{item.icon}</div>
              <div>
                <div style={{ fontSize:"0.78rem", letterSpacing:"0.1em", textTransform:"uppercase", color:T.faint, fontFamily:T.fontBody }}>{item.label}</div>
                {item.href
                  ? <a href={item.href} style={{ fontSize:"1rem", color:T.white, textDecoration:"none", transition:"color 0.2s" }} onMouseEnter={(e)=>e.currentTarget.style.color=T.red} onMouseLeave={(e)=>e.currentTarget.style.color=T.white}>{item.val}</a>
                  : <div style={{ fontSize:"1rem", color:T.white }}>{item.val}</div>}
              </div>
            </div>
          ))}

          <div style={{ display:"flex", gap:"0.65rem", marginTop:"2rem" }}>
            {[
              { label:"💼 LinkedIn", url:"https://www.linkedin.com/in/keerthana-r-8a19a3340" },
              { label:"🐙 GitHub",   url:"https://github.com/Keerthana7654" },
              { label:"📸 Instagram",url:"https://www.instagram.com/ll__keerthana__ll" },
            ].map((s) => (
              <button key={s.label} onClick={() => window.open(s.url,"_blank","noopener")}
                style={{ padding:"0.5rem 0.9rem", borderRadius:100, border:`1px solid ${T.borderHov}`, background:"transparent", color:T.muted, fontFamily:T.fontBody, fontSize:"0.75rem", cursor:"pointer", transition:"all 0.2s" }}
                onMouseEnter={(e)=>{ e.currentTarget.style.borderColor=T.red; e.currentTarget.style.color=T.red; e.currentTarget.style.background=T.redDim; }}
                onMouseLeave={(e)=>{ e.currentTarget.style.borderColor=T.borderHov; e.currentTarget.style.color=T.muted; e.currentTarget.style.background="transparent"; }}
              >{s.label}</button>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="reveal" style={{ transitionDelay:"0.12s" }}>
          <div style={{
            background:T.bgCard,
            border:`1px solid ${T.border}`,
            borderRadius:20,
            padding:"2.5rem",
            backdropFilter:"blur(12px)",
            position:"relative", overflow:"hidden",
          }}>
            <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:`linear-gradient(90deg, ${T.red}, transparent)` }} />

            {sent ? (
              <div style={{ display:"flex", alignItems:"center", gap:12, background:"rgba(34,197,94,0.08)", border:"1px solid rgba(34,197,94,0.2)", borderRadius:12, padding:"1.25rem", color:"#4ade80", fontFamily:T.fontBody, fontSize:"0.9rem" }}>
                ✅ &nbsp; Gmail compose opened! I'll reply within 24 hours.
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate style={{ display:"flex", flexDirection:"column", gap:"1.1rem" }}>
                <div className="form-row" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
                  {[["name","Name","Your name"],["email","Email","your@email.com"]].map(([n,l,p]) => (
                    <div key={n}>
                      <label style={labelStyle} htmlFor={`c-${n}`}>{l} *</label>
                      <input id={`c-${n}`} name={n} type={n==="email"?"email":"text"} placeholder={p} value={form[n]} onChange={onChange}
                        style={{ ...inputStyle, ...(errors[n] ? { borderColor:T.red } : {}) }}
                        onFocus={(e)=>{ e.target.style.borderColor=T.red; e.target.style.boxShadow=`0 0 0 3px ${T.redDim}`; }}
                        onBlur={(e)=>{ e.target.style.borderColor=errors[n]?T.red:T.border; e.target.style.boxShadow="none"; }}
                        autoComplete={n==="email"?"email":"name"}
                      />
                      {errors[n] && <span style={{ color:T.red, fontSize:"0.68rem", marginTop:2 }}>{errors[n]}</span>}
                    </div>
                  ))}
                </div>

                <div>
                  <label style={labelStyle} htmlFor="c-subject">Subject</label>
                  <input id="c-subject" name="subject" type="text" placeholder="Job opportunity / Collaboration / General" value={form.subject} onChange={onChange}
                    style={inputStyle}
                    onFocus={(e)=>{ e.target.style.borderColor=T.red; e.target.style.boxShadow=`0 0 0 3px ${T.redDim}`; }}
                    onBlur={(e)=>{ e.target.style.borderColor=T.border; e.target.style.boxShadow="none"; }}
                  />
                </div>

                <div>
                  <label style={labelStyle} htmlFor="c-message">Message *</label>
                  <textarea id="c-message" name="message" placeholder="Tell me about the role or opportunity..." value={form.message} onChange={onChange} rows={5}
                    style={{ ...inputStyle, resize:"vertical", minHeight:120, lineHeight:1.6, ...(errors.message?{borderColor:T.red}:{}) }}
                    onFocus={(e)=>{ e.target.style.borderColor=T.red; e.target.style.boxShadow=`0 0 0 3px ${T.redDim}`; }}
                    onBlur={(e)=>{ e.target.style.borderColor=errors.message?T.red:T.border; e.target.style.boxShadow="none"; }}
                  />
                  {errors.message && <span style={{ color:T.red, fontSize:"0.68rem", marginTop:2 }}>{errors.message}</span>}
                </div>

                <button type="submit" disabled={loading}
                  style={{ padding:"0.9rem", borderRadius:100, background:loading?"rgba(230,51,41,0.5)":T.red, color:"#fff", fontFamily:T.fontBody, fontSize:"0.88rem", fontWeight:500, border:"none", cursor:"pointer", transition:"all 0.2s" }}
                  onMouseEnter={(e)=>{ if(!loading){ e.currentTarget.style.boxShadow=`0 8px 30px ${T.redGlow}`; e.currentTarget.style.transform="translateY(-2px)"; }}}
                  onMouseLeave={(e)=>{ e.currentTarget.style.boxShadow="none"; e.currentTarget.style.transform="none"; }}
                >
                  {loading ? "Opening Gmail…" : "Send Message →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────
   BACK TO TOP
───────────────────────────────────────────────────────── */
const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <button onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}
      aria-label="Back to top"
      style={{
        position:"fixed", bottom:"2.5rem", right:"2.5rem",
        zIndex:9000,
        width:44, height:44, borderRadius:"50%",
        background:"transparent",
        border:`1px solid ${T.redBorder}`,
        color:T.red, fontSize:"1.1rem",
        display:"flex", alignItems:"center", justifyContent:"center",
        cursor:"pointer",
        opacity:visible ? 1 : 0,
        transform:visible ? "translateY(0)" : "translateY(16px)",
        pointerEvents:visible ? "all" : "none",
        transition:"opacity 0.4s, transform 0.4s, box-shadow 0.3s",
      }}
      onMouseEnter={(e)=>{ e.currentTarget.style.boxShadow=`0 0 20px ${T.crimson}`; e.currentTarget.style.background=T.redDim; }}
      onMouseLeave={(e)=>{ e.currentTarget.style.boxShadow="none"; e.currentTarget.style.background="transparent"; }}
    >↑</button>
  );
};

/* ─────────────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────────────── */
const Footer = () => (
  <footer style={{
    position:"relative", zIndex:1,
    textAlign:"center",
    padding:"2.5rem",
    borderTop:`1px solid ${T.border}`,
    color:T.faint,
    fontFamily:T.fontBody,
    fontSize:"0.9rem",
    letterSpacing:"0.06em",
  }}>
    Designed &amp; built by{" "}
    <span style={{ color:T.red }}>Keerthana R.</span>
    {" "}·{" "}{new Date().getFullYear()}{" "}·{" "}React + ❤️
  </footer>
);

/* ─────────────────────────────────────────────────────────
   REVEAL OBSERVER (runs once)
───────────────────────────────────────────────────────── */
const useReveal = () => {
  useEffect(() => {
    // RAF ensures all sections are mounted before we query
    const raf = requestAnimationFrame(() => {
      const observer = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("in"); observer.unobserve(e.target); }
        }),
        { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
      );
      document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
      // Store observer for cleanup
      window._revealObserver = observer;
    });
    return () => {
      cancelAnimationFrame(raf);
      window._revealObserver?.disconnect();
    };
  }, []);
};

/* ─────────────────────────────────────────────────────────
   ACTIVE SECTION TRACKER
───────────────────────────────────────────────────────── */
const useActiveSection = (refs) => {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { threshold: 0.4 }
    );
    Object.values(refs).forEach((r) => { if (r.current) observer.observe(r.current); });
    return () => observer.disconnect();
  }, [refs]);
  return active;
};

/* ─────────────────────────────────────────────────────────
   ROOT APP
───────────────────────────────────────────────────────── */
const App = () => {
  // Individual refs — stable across renders
  const homeRef     = useRef(null);
  const aboutRef    = useRef(null);
  const projectsRef = useRef(null);
  const contactRef  = useRef(null);

  // Stable ref map (object ref, not recreated)
  const refsMap = useRef({ home: homeRef, about: aboutRef, projects: projectsRef, contact: contactRef });

  const active = useActiveSection(refsMap.current);
  useReveal();

  // Inject global CSS once
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "portfolio-globals";
    if (!document.getElementById("portfolio-globals")) {
      style.textContent = GLOBAL_CSS;
      document.head.appendChild(style);
    }
    return () => { const el = document.getElementById("portfolio-globals"); if(el) el.remove(); };
  }, []);

  // scrollTo uses refsMap.current — always current, never stale
  const scrollTo = useCallback((section) => {
    const ref = refsMap.current[section];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []); // empty deps — refsMap.current never changes

  return (
    <div style={{ background:T.bg, minHeight:"100vh", position:"relative" }}>
      {/* Cosmic background */}
      <CosmicBackground />

      {/* Navigation */}
      <Nav scrollTo={scrollTo} active={active} />

      {/* Sections */}
      <Hero sectionRef={homeRef} scrollTo={scrollTo} />
      <About sectionRef={aboutRef} />
      <Projects sectionRef={projectsRef} />
      <Contact sectionRef={contactRef} />
      <Footer />

      {/* Back to top */}
      <BackToTop />
    </div>
  );
};

export default App;

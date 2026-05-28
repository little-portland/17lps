'use client';
import { useState, useEffect, type MouseEvent } from 'react';
import Head from 'next/head';
import SceneNav from '@components/SceneNav';

const C = { cream: '#E8E2D4', ink: '#1C1C1A', pink: '#D4507A', muted: '#7A7870' } as const;
const MONO = '"Space Mono", "Courier New", monospace';
const SANS = '"Space Grotesk", "Helvetica Neue", Arial, sans-serif';

type AreaId = 'tent' | 'chefs-studio' | 'studio';
type Area   = { id: AreaId; title: string; href: string; highlight: string };

const CI = {
  funnel:  '/images/concept/grid_funel.png',
  floor:   '/images/concept/noise_floor.png',
  obelisk: '/images/concept/obelisk-dark-grey.png',
};

const AREAS: Area[] = [
  { id: 'tent',         title: 'The Tent',      href: '/thetent',    highlight: '/images/the-space/tent-highlight.png' },
  { id: 'chefs-studio', title: "Chef's Studio", href: '/chefstudio', highlight: '/images/the-space/chefs-studio-highlight.png' },
  { id: 'studio',       title: 'The Studio',    href: '/studio',     highlight: '/images/the-space/studio-highlight.png' },
];

const EXP_BTNS = [
  { label: 'After Dark', href: '/after-dark', dark: true  },
  { label: 'Dining',     href: '/dining',     dark: false },
];

function Grain() {
  return (
    <svg aria-hidden style={{ position:'fixed', inset:0, width:'100%', height:'100%', pointerEvents:'none', zIndex:60, opacity:0.23 }}>
      <filter id="gn" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.70" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#gn)" />
    </svg>
  );
}

export default function ConceptPage() {
  const [active, setActive] = useState<AreaId | null>(null);
  const [touch,  setTouch]  = useState(false);

  useEffect(() => {
    const mq  = window.matchMedia('(hover: none), (pointer: coarse), (max-width: 900px)');
    const upd = () => setTouch(mq.matches || window.innerWidth <= 900);
    upd();
    mq.addEventListener('change', upd);
    window.addEventListener('resize', upd);
    return () => { mq.removeEventListener('change', upd); window.removeEventListener('resize', upd); };
  }, []);

  const onEnter = (id: AreaId) => { if (!touch) setActive(id); };
  const onLeave = ()           => { if (!touch) setActive(null); };
  const onClick = (id: AreaId) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (touch && active !== id) { e.preventDefault(); setActive(id); }
  };

  return (
    <>
      <Head>
        <title>Concept — 17 Little Portland Street</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Space+Grotesk:wght@700;900&display=swap" rel="stylesheet" />
      </Head>

      <SceneNav theme="space" />
      <Grain />

      <main className="pg">

        {/* ── Ambient background images ───────────────────────────── */}
        <img className="ci ci-funnel ci-top"  src={CI.funnel}  alt="" draggable={false} aria-hidden="true" />
        <img className="ci ci-funnel ci-echo" src={CI.funnel}  alt="" draggable={false} aria-hidden="true" />
        <img className="ci ci-floor"          src={CI.floor}   alt="" draggable={false} aria-hidden="true" />
        <img className="ci ci-obelisk"        src={CI.obelisk} alt="" draggable={false} aria-hidden="true" />

        <div className="shell">
          <div className="axis-v" aria-hidden="true" />

          {/* ── HERO ─────────────────────────────────────────────── */}
          <section className="rail hero-rail" aria-labelledby="cpt-h1">
            <div className="rail-title">
              <p className="eyebrow">LPX // Underground</p>
              <h1 id="cpt-h1">Concept<span className="dot">.</span></h1>
            </div>
            <div className="rail-content">
              <div className="info-card">
                <span className="kicker">Location</span>
                <p>17 Little Portland Street, London</p>
              </div>
            </div>
          </section>

          {/* ── THE SPACE ────────────────────────────────────────── */}
          <section className="rail sec-rail" aria-labelledby="spc-h2">
            <div className="rail-title">
              <h2 id="spc-h2">The<br />Space</h2>
            </div>
            <div className="rail-content">

              {/* Floating venue map */}
              <div className="venue-stage">
                <div className="venue-wrap">
                  <div className="venue-shadow" />
                  <img
                    src="/images/the-space/the-space-page-venue.png"
                    alt="Venue — The Tent, Chef's Studio, The Studio"
                    className="venue-img v-base"
                    draggable={false}
                  />
                  {AREAS.map(a => {
                    const on = active === a.id;
                    return (
                      <div key={a.id}>
                        <img src={a.highlight} alt="" draggable={false} className={`venue-img v-glow${on ? ' is-on' : ''}`} />
                        <img src={a.highlight} alt="" draggable={false} className={`venue-img v-hl${on   ? ' is-on' : ''}`} />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Zone cards */}
              <nav className="zone-nav" onMouseLeave={onLeave} aria-label="Venue areas">
                {AREAS.map(a => {
                  const on  = active === a.id;
                  const sub = touch ? (on ? 'Tap to explore →' : 'Tap to preview') : 'Explore →';
                  return (
                    <a
                      key={a.id}
                      href={a.href}
                      className={`zone-card${on ? ' is-on' : ''}`}
                      onMouseEnter={() => onEnter(a.id)}
                      onFocus={() => setActive(a.id)}
                      onClick={onClick(a.id)}
                      aria-label={`${a.title} — ${sub}`}
                    >
                      <span className="z-title">{a.title}</span>
                      <span className="z-meta">{sub}</span>
                    </a>
                  );
                })}
              </nav>

            </div>
          </section>

          {/* ── THE EXPERIENCE ───────────────────────────────────── */}
          <section className="rail sec-rail" aria-labelledby="exp-h2">
            <div className="rail-title">
              <h2 id="exp-h2">The<br />Experience</h2>
            </div>
            <div className="rail-content exp-content">
              <div className="info-card">
                <span className="kicker">Programme</span>
                <p>Move from dinner into late-night Little Portland energy.</p>
              </div>
              <nav className="exp-nav" aria-label="Experience options">
                {EXP_BTNS.map(b => (
                  <a key={b.href} href={b.href} className={`cta-btn${b.dark ? ' is-dark' : ''}`}>
                    {b.label}
                  </a>
                ))}
              </nav>
            </div>
          </section>

          {/* ── FOOTER ───────────────────────────────────────────── */}
          <footer className="foot">
            <span>17 Little Portland Street</span>
            <span>LPX // Underground</span>
          </footer>
        </div>
      </main>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #E8E2D4; color: #1C1C1A; overflow-x: hidden; -webkit-font-smoothing: antialiased; }

        /* ── SceneNav — cream theme ─────────────────── */
        .scene-nav { z-index: 10020 !important; }
        .scene-nav-burger, .scene-nav-logo { z-index: 10030 !important; }
        .scene-nav-mobile { z-index: 10010 !important; }
        .scene-nav--space { background: transparent !important; backdrop-filter: none !important; -webkit-backdrop-filter: none !important; }
        .scene-nav--space, .scene-nav--space a,
        .scene-nav-mobile--space, .scene-nav-mobile--space a {
          color: #1C1C1A !important;
          font-family: "Space Mono","Courier New",monospace !important;
          letter-spacing: 0.14em !important;
        }
        .scene-nav--space a.active, .scene-nav-mobile--space a.active { color: #D4507A !important; }
        .scene-nav--space a.disabled, .scene-nav-mobile--space a.disabled { opacity: 0.4; }
        .scene-nav--space .scene-nav-burger span { background: #1C1C1A !important; }
        .scene-nav--space .scene-nav-logo img {
          filter: brightness(0) saturate(100%) invert(8%) sepia(5%) saturate(851%) hue-rotate(21deg) brightness(99%) contrast(91%);
        }
        .scene-nav-mobile.scene-nav--space, .scene-nav-mobile--space {
          background: rgba(232,226,212,0.92) !important;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }
        @media (max-width: 900px) {
          .scene-nav-mobile.scene-nav--space .scene-nav-mobile-inner,
          .scene-nav-mobile--space .scene-nav-mobile-inner { padding-top: 96px; }
        }

        /* ── Page ───────────────────────────────────── */
        .pg {
          position: relative;
          min-height: 100svh;
          overflow: hidden;
          background:
            radial-gradient(circle at 70% 14%, rgba(212,80,122,0.07), transparent 22rem),
            radial-gradient(circle at 26% 72%, rgba(28,28,26,0.05), transparent 26rem),
            #E8E2D4;
        }

        /* ── Ambient images ─────────────────────────── */
        .ci {
          position: fixed;
          pointer-events: none;
          user-select: none;
          z-index: 1;
          mix-blend-mode: multiply;
        }
        .ci-funnel { width: clamp(100px, 11vw, 162px); filter: saturate(0.9) contrast(0.95); }
        .ci-top    { top: 100px; right: 5%; opacity: 0.68; animation: floatA 7s ease-in-out infinite; }
        .ci-echo   {
          top: 52%; left: 2%;
          width: clamp(70px, 8vw, 115px);
          opacity: 0.20;
          transform: rotate(-22deg) scaleY(0.62);
          animation: echoFloat 9.5s ease-in-out infinite;
        }
        .ci-floor  {
          bottom: 12%; left: 10%;
          width: clamp(170px, 28vw, 370px);
          opacity: 0.28;
          filter: contrast(0.84) saturate(0.58);
          animation: floorDrift 11s ease-in-out infinite;
        }
        .ci-obelisk {
          bottom: 9%; right: 6%;
          width: clamp(46px, 5vw, 72px);
          opacity: 0.52;
          filter: contrast(0.93) drop-shadow(10px 18px 18px rgba(28,28,26,0.12));
          animation: obeliskHover 8.5s ease-in-out infinite;
        }

        /* ── Shell ──────────────────────────────────── */
        .shell {
          position: relative;
          z-index: 2;
          width: 75%;
          max-width: 1120px;
          margin: 0 auto;
          min-height: 100svh;
          padding: clamp(100px, 10vw, 130px) 0 48px;
        }

        /* ── Axis ───────────────────────────────────── */
        .axis-v {
          position: absolute;
          top: 30px;
          bottom: 30px;
          left: 25%;
          width: 1px;
          z-index: 1;
          pointer-events: none;
          background: linear-gradient(
            180deg,
            rgba(28,28,26,0)    0%,
            rgba(28,28,26,0.44) 5%,
            rgba(28,28,26,0.28) 95%,
            rgba(28,28,26,0)    100%
          );
        }

        /* ── Rail layout ────────────────────────────── */
        .rail {
          position: relative;
          z-index: 3;
          display: grid;
          grid-template-columns: 25% minmax(0, 1fr);
          align-items: start;
        }
        .hero-rail {
          min-height: clamp(460px, 76svh, 760px);
          align-items: center;
        }
        .sec-rail { padding: clamp(80px, 10vw, 130px) 0; }
        .rail-title   { padding-right: clamp(14px, 2.5vw, 36px); }
        .rail-content { padding-left:  clamp(30px, 4.5vw, 60px); }

        /* ── Typography ─────────────────────────────── */
        .eyebrow {
          display: block;
          margin-bottom: 20px;
          font-family: "Space Mono","Courier New",monospace;
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #7A7870;
        }
        h1 {
          font-family: "Space Grotesk","Helvetica Neue",sans-serif;
          font-size: clamp(40px, 4.8vw, 72px);
          font-weight: 900;
          line-height: 0.88;
          letter-spacing: -0.042em;
          text-transform: uppercase;
          color: #1C1C1A;
        }
        h2 {
          font-family: "Space Grotesk","Helvetica Neue",sans-serif;
          font-size: clamp(28px, 3.4vw, 50px);
          font-weight: 900;
          line-height: 0.9;
          letter-spacing: -0.038em;
          text-transform: uppercase;
          color: #1C1C1A;
          overflow-wrap: break-word;
        }
        .dot { color: #D4507A; }

        /* ── Info card ──────────────────────────────── */
        .info-card {
          border-top: 1px solid rgba(28,28,26,0.18);
          border-bottom: 1px solid rgba(28,28,26,0.10);
          padding: 20px 0 22px;
          max-width: 540px;
        }
        .kicker {
          display: block;
          margin-bottom: 10px;
          font-family: "Space Mono","Courier New",monospace;
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #7A7870;
        }
        .info-card p {
          font-family: "Space Mono","Courier New",monospace;
          font-size: clamp(11px, 1.05vw, 14px);
          line-height: 1.6;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: rgba(28,28,26,0.66);
        }

        /* ── Venue stage ────────────────────────────── */
        .venue-stage {
          position: relative;
          width: 100%;
          min-height: clamp(240px, 33vw, 460px);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: -10px;
        }
        .venue-wrap {
          position: relative;
          width: min(100%, 680px);
          aspect-ratio: 2048 / 1140;
          animation: venueFloat 4.8s ease-in-out infinite;
        }
        .venue-shadow {
          position: absolute;
          bottom: -6%; left: 8%; right: 8%;
          height: 10%;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(28,28,26,0.15), transparent 70%);
          filter: blur(12px);
          z-index: 0;
        }
        .venue-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          pointer-events: none;
          user-select: none;
        }
        .v-base {
          z-index: 2;
          filter: saturate(0.76) contrast(1.02)
            drop-shadow(0 12px 22px rgba(28,28,26,0.10))
            drop-shadow(0 28px 52px rgba(28,28,26,0.07));
        }
        .v-glow, .v-hl { opacity: 0; transition: opacity 0.28s ease; }
        .v-glow { z-index: 3; filter: blur(14px) saturate(1.1); mix-blend-mode: multiply; }
        .v-hl   { z-index: 4; mix-blend-mode: multiply; filter: saturate(1.08) contrast(1.06); }
        .v-glow.is-on { opacity: 0.40; animation: hlPulse 2.8s ease-in-out infinite; }
        .v-hl.is-on   { opacity: 0.72; animation: hlPulse 2.8s ease-in-out infinite; }

        /* ── Zone cards ─────────────────────────────── */
        .zone-nav {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          margin-top: 16px;
        }
        .zone-card {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 68px;
          padding: 13px 14px 11px;
          border: 1px solid rgba(28,28,26,0.32);
          background: rgba(232,226,212,0.36);
          color: #1C1C1A;
          text-decoration: none;
          box-shadow: 4px 4px 0 rgba(28,28,26,0.06);
          transition: border-color .22s, background .22s, transform .22s, box-shadow .22s;
        }
        .zone-card::after {
          content: '';
          position: absolute;
          bottom: 10px; left: 12px; right: 12px;
          height: 1px;
          background: #D4507A;
          opacity: 0;
          transform: scaleX(0.28);
          transform-origin: left;
          transition: opacity .22s, transform .22s;
        }
        .z-title {
          font-family: "Space Grotesk","Helvetica Neue",sans-serif;
          font-size: clamp(11px, 1vw, 14px);
          font-weight: 900;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          line-height: 1.1;
        }
        .z-meta {
          display: block;
          margin-top: 5px;
          font-family: "Space Mono","Courier New",monospace;
          font-size: 9px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(28,28,26,0.52);
          transition: color .22s;
        }
        .zone-card:hover, .zone-card:focus-visible, .zone-card.is-on {
          border-color: rgba(212,80,122,0.68);
          background: rgba(212,80,122,0.06);
          box-shadow: 6px 6px 0 rgba(212,80,122,0.09);
          transform: translate(-2px,-2px);
          outline: none;
        }
        .zone-card:hover::after, .zone-card:focus-visible::after, .zone-card.is-on::after {
          opacity: 1; transform: scaleX(1);
        }
        .zone-card.is-on .z-meta { color: rgba(212,80,122,0.80); }

        /* ── Experience ─────────────────────────────── */
        .exp-content { display: grid; gap: 24px; }
        .exp-nav { display: flex; flex-wrap: wrap; gap: 10px; }
        .cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 44px;
          min-width: 148px;
          padding: 12px 26px 11px;
          border: 1px solid #1C1C1A;
          background: transparent;
          color: #1C1C1A;
          font-family: "Space Mono","Courier New",monospace;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          text-decoration: none;
          box-shadow: 4px 4px 0 rgba(28,28,26,0.07);
          transition: transform .22s, background .22s, color .22s, border-color .22s, box-shadow .22s;
        }
        .cta-btn.is-dark { background: #1C1C1A; color: #E8E2D4; }
        .cta-btn:hover, .cta-btn:focus-visible {
          border-color: #D4507A;
          background: rgba(212,80,122,0.08);
          color: #1C1C1A;
          box-shadow: 6px 6px 0 rgba(212,80,122,0.10);
          transform: translate(-2px,-2px);
          outline: none;
        }
        .cta-btn.is-dark:hover, .cta-btn.is-dark:focus-visible {
          background: #D4507A; color: #E8E2D4; border-color: #D4507A;
        }

        /* ── Footer ─────────────────────────────────── */
        .foot {
          position: relative; z-index: 4;
          display: flex;
          justify-content: space-between;
          gap: 20px;
          padding: 30px 0 22px;
          border-top: 1px solid rgba(28,28,26,0.13);
          font-family: "Space Mono","Courier New",monospace;
          font-size: 9px;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: #7A7870;
        }

        /* ── Keyframes ──────────────────────────────── */
        @keyframes floatA {
          0%,100% { transform: translate3d(0,0,0) rotate(0deg); }
          50%      { transform: translate3d(-5px,9px,0) rotate(1deg); }
        }
        @keyframes echoFloat {
          0%,100% { transform: translate3d(0,0,0) rotate(-22deg) scaleY(0.62); }
          50%      { transform: translate3d(7px,-5px,0) rotate(-19.5deg) scaleY(0.62); }
        }
        @keyframes floorDrift {
          0%,100% { transform: translate3d(0,0,0); }
          50%      { transform: translate3d(9px,-4px,0); }
        }
        @keyframes obeliskHover {
          0%,100% { transform: translate3d(0,0,0); }
          50%      { transform: translate3d(0,-8px,0); }
        }
        @keyframes venueFloat {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        @keyframes hlPulse {
          0%,100% { transform: scale(1); }
          50%      { transform: scale(1.012); }
        }

        /* ── Responsive ─────────────────────────────── */
        @media (max-width: 1100px) {
          .shell    { width: 84%; }
          .zone-nav { grid-template-columns: 1fr; }
        }
        @media (max-width: 820px) {
          .shell        { width: calc(100% - 40px); max-width: none; padding-top: 96px; }
          .axis-v       { left: 22px; }
          .rail         { grid-template-columns: 1fr; padding-left: 50px; }
          .hero-rail    { min-height: 68svh; align-items: start; padding-top: 28px; }
          .sec-rail     { padding: 72px 0; }
          .rail-title   { padding-right: 0; margin-bottom: 22px; }
          .rail-content { padding-left: 0; }
          h1 { font-size: clamp(42px, 13vw, 66px); }
          h2 { font-size: clamp(30px, 10vw, 50px); }
          .venue-stage  { min-height: clamp(190px, 54vw, 340px); margin-top: -4px; }
          .venue-wrap   { width: min(120%, 560px); margin-left: -10%; }
          .ci-top       { top: 110px; right: -8px; width: 90px; opacity: 0.34; }
          .ci-echo      { display: none; }
          .ci-floor     { width: 190px; opacity: 0.14; }
          .ci-obelisk   { width: 44px; opacity: 0.20; right: -4px; }
          .foot         { flex-direction: column; gap: 8px; }
        }
        @media (max-width: 520px) {
          .shell      { width: calc(100% - 28px); padding-top: 86px; }
          .axis-v     { left: 15px; top: 24px; bottom: 24px; }
          .rail       { padding-left: 36px; }
          .hero-rail  { min-height: 60svh; }
          .venue-stage{ min-height: 190px; }
          .venue-wrap { width: 130%; margin-left: -15%; }
          .zone-card  { min-height: 62px; padding: 11px 13px; }
          .z-title    { font-size: 12px; }
          .exp-nav, .cta-btn { width: 100%; }
          .cta-btn    { min-width: 0; }
          .foot       { padding-bottom: 28px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ci-top, .ci-echo, .ci-floor, .ci-obelisk,
          .venue-wrap, .v-glow.is-on, .v-hl.is-on { animation: none; }
        }
      `}</style>
    </>
  );
}

import React from "react";
import Head from "next/head";

const DiningPage = () => {
  return (
    <>
      <Head>
        <title>Dining at 17 Little Portland Street</title>
        <meta
          name="description"
          content="Dining at 17 Little Portland Street — The Tent and Chef's Studio."
        />
        <style>{`
          :root {
            --bg: #d6d6d4;
            --paper: #d0d0ce;
            --ink: #050505;
            --magenta: #f00093;
            --muted: rgba(5,5,5,0.62);
            --line: #101010;
          }

          html, body {
            margin: 0;
            padding: 0;
            background: var(--bg);
            color: var(--ink);
            font-family: "Lucida Console", "Courier New", monospace;
            overflow-x: hidden;
          }

          * { box-sizing: border-box; }
          a { color: inherit; text-decoration: none; }

          /* ── GRAIN ── */
          @keyframes grainMove {
            0%   { transform: translate(0,0); }
            25%  { transform: translate(-0.6%,0.4%); }
            50%  { transform: translate(0.4%,-0.5%); }
            75%  { transform: translate(0.5%,0.4%); }
            100% { transform: translate(0,0); }
          }

          .page {
            min-height: 100vh;
            padding: 20px;
            position: relative;
          }

          .page::before {
            content: "";
            position: fixed;
            inset: -10%;
            pointer-events: none;
            z-index: 0;
            opacity: 0.10;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.25' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)'/%3E%3C/svg%3E");
            mix-blend-mode: multiply;
            animation: grainMove 0.4s steps(2,end) infinite;
          }

          .shell {
            width: min(1100px, 100%);
            margin: 0 auto;
            position: relative;
            z-index: 1;
          }

          /* ── POSTER FRAME ── */
          .poster {
            background: var(--paper);
            border: 1px solid rgba(16,16,16,0.18);
            box-shadow: 0 0 0 1px rgba(255,255,255,0.22) inset;
            position: relative;
            overflow: hidden;
          }

          /* ── CHROME BAR ── */
          .chrome {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding: 18px 18px 0;
          }

          .tag {
            background: var(--magenta);
            color: var(--ink);
            padding: 8px 14px 9px;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-size: clamp(12px, 1.4vw, 18px);
            line-height: 1;
            font-weight: 700;
          }

          /* ── HERO ── */
          .hero {
            padding: 36px 24px 0;
            text-align: center;
          }

          .hero-title {
            margin: 0;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            font-size: clamp(42px, 9vw, 110px);
            line-height: 0.88;
            font-weight: 700;
          }

          .hero-sub {
            margin-top: 10px;
            text-transform: uppercase;
            letter-spacing: 0.14em;
            font-size: clamp(13px, 1.8vw, 22px);
            line-height: 1;
            opacity: 0.88;
          }

          /* ── CIRCLE MOTIF ── */
          .motif-wrap {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0;
            padding: 32px 24px 0;
            position: relative;
          }

          .motif-side {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 6px;
            padding: 0 18px;
          }

          .motif-side.left { text-align: right; }
          .motif-side.right { text-align: left; }

          .motif-label {
            text-transform: uppercase;
            letter-spacing: 0.12em;
            font-size: clamp(11px, 1.2vw, 16px);
            line-height: 1.2;
            opacity: 0.72;
          }

          .motif-value {
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-size: clamp(18px, 2.4vw, 32px);
            line-height: 1;
            font-weight: 700;
          }

          /* SVG circle */
          .circle-svg {
            flex-shrink: 0;
            width: clamp(160px, 22vw, 280px);
            height: clamp(160px, 22vw, 280px);
          }

          /* ── TAGLINE ── */
          .tagline {
            padding: 28px 24px 0;
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 0.07em;
            font-size: clamp(16px, 2.6vw, 34px);
            line-height: 1.05;
            font-weight: 700;
          }

          /* ── SCHEDULE BOX ── */
          .schedule-section {
            padding: 28px 24px 0;
          }

          .schedule-box {
            border: 4px solid var(--line);
          }

          .schedule-head {
            padding: 18px 16px;
            border-bottom: 4px solid var(--line);
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-size: clamp(16px, 2.4vw, 30px);
            line-height: 1;
            font-weight: 700;
          }

          .schedule-subhead {
            padding: 14px 16px 4px;
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-size: clamp(13px, 1.8vw, 22px);
            opacity: 0.72;
          }

          .schedule-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            padding: 8px 10px 18px;
          }

          .schedule-item {
            text-align: center;
            padding: 12px 10px;
          }

          .schedule-title {
            font-size: clamp(15px, 1.8vw, 24px);
            line-height: 1.1;
            font-weight: 700;
            min-height: 2.4em;
          }

          .schedule-time {
            margin-top: 14px;
            font-size: clamp(26px, 3.4vw, 50px);
            line-height: 1;
            font-weight: 700;
            letter-spacing: 0.06em;
          }

          /* ── EXPLORE LINK ── */
          .explore-wrap {
            padding: 22px 24px 0;
          }

          .explore-link {
            display: block;
            border: 4px solid var(--line);
            padding: 16px 24px;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-size: clamp(16px, 2.2vw, 28px);
            line-height: 1;
            font-weight: 700;
            transition: background 0.15s;
          }

          .explore-link:hover { background: rgba(240,0,147,0.10); }

          /* ── MAP PLACEHOLDER ── */
          .map-zone {
            padding: 22px 24px 0;
          }

          .placeholder-panel {
            border: 4px solid var(--line);
            min-height: 460px;
            display: grid;
            place-items: center;
            text-align: center;
            padding: 24px;
            position: relative;
            overflow: hidden;
          }

          .placeholder-panel::before {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            background: repeating-linear-gradient(
              to bottom,
              rgba(0,0,0,0.018) 0px,
              rgba(0,0,0,0.018) 1px,
              transparent 1px,
              transparent 4px
            );
          }

          /* grid overlay inside placeholder */
          .placeholder-panel::after {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            background-image:
              linear-gradient(rgba(16,16,16,0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16,16,16,0.07) 1px, transparent 1px);
            background-size: 40px 40px;
          }

          .placeholder-inner { position: relative; z-index: 1; }

          .placeholder-title {
            text-transform: uppercase;
            letter-spacing: 0.06em;
            font-size: clamp(20px, 2.6vw, 36px);
            font-weight: 700;
          }

          .placeholder-copy {
            margin-top: 10px;
            opacity: 0.62;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            font-size: clamp(13px, 1.4vw, 18px);
          }

          .placeholder-path {
            display: block;
            margin-top: 8px;
            opacity: 0.5;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-size: 11px;
          }

          /* ── CARDS ── */
          .cards-section {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 22px;
            padding: 22px 24px 0;
          }

          .info-card {
            border: 4px solid var(--line);
            padding: 22px;
            position: relative;
            overflow: hidden;
          }

          .info-card::before {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            background: repeating-linear-gradient(
              to bottom,
              rgba(0,0,0,0.018) 0px,
              rgba(0,0,0,0.018) 1px,
              transparent 1px,
              transparent 4px
            );
            opacity: 0.3;
          }

          .card-image-placeholder {
            min-height: 200px;
            border: 3px dashed rgba(16,16,16,0.30);
            display: grid;
            place-items: center;
            text-align: center;
            padding: 18px;
            margin-bottom: 22px;
            position: relative;
            z-index: 1;
          }

          /* circle accent inside card placeholder */
          .card-image-placeholder::after {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            background-image:
              radial-gradient(circle at 50% 50%, rgba(240,0,147,0.06) 30%, transparent 70%);
          }

          .card-img-title {
            position: relative;
            z-index: 1;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            font-size: clamp(16px, 1.8vw, 22px);
            font-weight: 700;
          }

          .card-img-path {
            display: block;
            margin-top: 8px;
            opacity: 0.5;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-size: 11px;
            position: relative;
            z-index: 1;
          }

          .card-title {
            position: relative;
            z-index: 1;
            margin: 0;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            font-size: clamp(26px, 2.8vw, 42px);
            line-height: 0.95;
            font-weight: 700;
          }

          .card-subtitle {
            position: relative;
            z-index: 1;
            margin-top: 8px;
            opacity: 0.62;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-size: clamp(13px, 1.4vw, 18px);
          }

          .card-copy {
            position: relative;
            z-index: 1;
            margin: 18px 0;
            font-size: clamp(15px, 1.4vw, 19px);
            line-height: 1.4;
            max-width: 36ch;
          }

          .bullet-list {
            position: relative;
            z-index: 1;
            list-style: none;
            margin: 0 0 20px;
            padding: 0;
          }

          .bullet-list li {
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            font-size: clamp(18px, 1.8vw, 26px);
            line-height: 1;
            font-weight: 700;
          }

          .bullet-list li::before { content: "○ "; }

          .card-links {
            position: relative;
            z-index: 1;
            display: flex;
            flex-wrap: wrap;
            gap: 14px;
          }

          .card-links a {
            text-transform: uppercase;
            letter-spacing: 0.05em;
            font-size: clamp(15px, 1.6vw, 20px);
            font-weight: 700;
            transition: color 0.15s;
          }

          .card-links a:hover { color: var(--magenta); }

          /* ── FOOTER DOTS + TAG ── */
          .footer-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 24px 18px 20px;
            margin-top: 22px;
          }

          .footer-dots {
            display: flex;
            gap: 18px;
          }

          .footer-dots span {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: var(--ink);
            display: block;
          }

          .footer-tags {
            display: flex;
            gap: 10px;
            align-items: center;
          }

          .footer-note {
            padding: 0 24px 26px;
            opacity: 0.52;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-size: 11px;
          }

          /* ── RESPONSIVE ── */
          @media (max-width: 900px) {
            .cards-section { grid-template-columns: 1fr; }
          }

          @media (max-width: 720px) {
            .page { padding: 10px; }

            .motif-wrap { flex-direction: column; gap: 18px; }
            .motif-side { text-align: center !important; }

            .schedule-grid { grid-template-columns: 1fr; }

            .placeholder-panel { min-height: 260px; }
            .card-image-placeholder { min-height: 140px; }
          }

          @media (prefers-reduced-motion: reduce) {
            .page::before { animation: none !important; }
          }
        `}</style>
      </Head>

      <main className="page">
        <div className="shell">
          <section className="poster">

            {/* ── CHROME ── */}
            <div className="chrome">
              <div className="tag">17 Little Portland Street</div>
              <div className="tag">Issue 71</div>
            </div>

            {/* ── HERO ── */}
            <div className="hero">
              <h1 className="hero-title">Dining At</h1>
              <div className="hero-sub">17 Little Portland Street</div>
            </div>

            {/* ── CIRCLE MOTIF ── */}
            <div className="motif-wrap">
              <div className="motif-side left">
                <div className="motif-label">Open</div>
                <div className="motif-value">Thursday<br/>Friday<br/>Saturday</div>
              </div>

              {/* Concentric rings — magenta + black, matching flyer */}
              <svg
                className="circle-svg"
                viewBox="0 0 280 280"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {/* grid overlay */}
                <defs>
                  <pattern id="grid" width="14" height="14" patternUnits="userSpaceOnUse">
                    <path d="M 14 0 L 0 0 0 14" fill="none" stroke="rgba(16,16,16,0.12)" strokeWidth="0.5"/>
                  </pattern>
                  <clipPath id="circleClip">
                    <circle cx="140" cy="140" r="130"/>
                  </clipPath>
                </defs>
                {/* rings alternating magenta / ink */}
                <circle cx="140" cy="140" r="130" fill="#f00093"/>
                <circle cx="140" cy="140" r="112" fill="#050505"/>
                <circle cx="140" cy="140" r="94"  fill="#f00093"/>
                <circle cx="140" cy="140" r="76"  fill="#050505"/>
                <circle cx="140" cy="140" r="58"  fill="#f00093"/>
                <circle cx="140" cy="140" r="40"  fill="#050505"/>
                <circle cx="140" cy="140" r="22"  fill="#f00093"/>
                {/* grid on top */}
                <rect x="10" y="10" width="260" height="260" fill="url(#grid)" clipPath="url(#circleClip)"/>
                {/* outer ring stroke */}
                <circle cx="140" cy="140" r="130" fill="none" stroke="#050505" strokeWidth="2"/>
              </svg>

              <div className="motif-side right">
                <div className="motif-label">Step Into</div>
                <div className="motif-value">The<br/>Void</div>
              </div>
            </div>

            {/* ── TAGLINE ── */}
            <div className="tagline">More than a meal — step into the void</div>

            {/* ── SCHEDULE ── */}
            <div className="schedule-section">
              <div className="schedule-box">
                <div className="schedule-head">Open Thursdays to Saturdays</div>
                <div className="schedule-subhead">Nightly Schedule</div>
                <div className="schedule-grid">
                  <div className="schedule-item">
                    <div className="schedule-title">Chef&apos;s<br/>Studio</div>
                    <div className="schedule-time">20:00</div>
                  </div>
                  <div className="schedule-item">
                    <div className="schedule-title">Dinner in<br/>The Tent</div>
                    <div className="schedule-time">20:30</div>
                  </div>
                  <div className="schedule-item">
                    <div className="schedule-title">Club<br/>Opens</div>
                    <div className="schedule-time">22:00</div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── EXPLORE ── */}
            <div className="explore-wrap">
              <a className="explore-link" href="#concepts">
                &gt; Explore our futurist dining concept
              </a>
            </div>

            {/* ── MAP PLACEHOLDER ── */}
            <div className="map-zone">
              <div className="placeholder-panel" aria-label="Venue map placeholder">
                <div className="placeholder-inner">
                  <div className="placeholder-title">Venue Map Placeholder</div>
                  <div className="placeholder-copy">Add your PNG later and swap this block for an image</div>
                  <span className="placeholder-path">Suggested path: /images/dinning-map.png</span>
                </div>
              </div>
            </div>

            {/* ── CARDS ── */}
            <div className="cards-section" id="concepts">

              <article className="info-card">
                <div className="card-image-placeholder">
                  <div>
                    <div className="card-img-title">The Tent Image Placeholder</div>
                    <span className="card-img-path">Suggested path: /images/the-tent.png</span>
                  </div>
                </div>
                <h2 className="card-title">The Tent</h2>
                <div className="card-subtitle">at the End of the Universe</div>
                <p className="card-copy">
                  In a floating tent, lost in space, futurist menus set the stage for a sensorial
                  experience as dinner seamlessly transitions into our hypnotic after-dark mode — a
                  cosmic journey.
                </p>
                <ul className="bullet-list">
                  <li>£65pp Set Dinner</li>
                  <li>Futurist Menu</li>
                  <li>8:30pm Start</li>
                  <li>Club Access Included</li>
                </ul>
                <div className="card-links">
                  <a href="#">[Book]</a>
                  <a href="#">[Menu]</a>
                  <a href="#">[Explore The Tent]</a>
                </div>
              </article>

              <article className="info-card">
                <div className="card-image-placeholder">
                  <div>
                    <div className="card-img-title">Chef&apos;s Studio Image Placeholder</div>
                    <span className="card-img-path">Suggested path: /images/chefs-studio.png</span>
                  </div>
                </div>
                <h2 className="card-title">Chef&apos;s Studio</h2>
                <div className="card-subtitle">Where the Heads Dine</div>
                <p className="card-copy">
                  Chef&apos;s Studio is an intimate and futuristic space beneath The Tent — the table of
                  choice for those in the know.
                </p>
                <ul className="bullet-list">
                  <li>£65pp Set Dinner</li>
                  <li>Futurist Menu</li>
                  <li>6–12 PAX</li>
                  <li>8pm Start</li>
                </ul>
                <div className="card-links">
                  <a href="#">[Book]</a>
                  <a href="#">[Menu]</a>
                  <a href="#">[Explore Chef&apos;s Studio]</a>
                </div>
              </article>

            </div>

            {/* ── FOOTER BAR ── */}
            <div className="footer-bar">
              <div className="footer-dots" aria-hidden="true">
                <span/><span/><span/>
              </div>
              <div className="footer-tags">
                <div className="tag">yo@little-portland.com</div>
                <div className="tag">LPX//UNDERGROUND</div>
              </div>
            </div>

            <div className="footer-note">
              Poster-inspired styling — placeholders kept for venue map, The Tent, and Chef&apos;s Studio images.
            </div>

          </section>
        </div>
      </main>
    </>
  );
};

export default DiningPage;

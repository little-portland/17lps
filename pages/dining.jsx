import React from "react";
import Head from "next/head";

const DinningPage = () => {
  return (
    <>
      <Head>
        <title>Dining at 17 Little Portland Street</title>
        <meta
          name="description"
          content="Dining at 17 Little Portland Street — The Tent and Chef’s Studio."
        />
        <style>{`
          :root {
            --bg: #d1d3d3;
            --paper: #c9cbcb;
            --ink: #070707;
            --magenta: #f10098;
            --cyan: #52d3db;
            --purple: #71399d;
            --muted: rgba(7, 7, 7, 0.64);
          }

          html {
            background: var(--bg) !important;
            overflow-x: hidden !important;
          }

          body {
            margin: 0;
            background: var(--bg) !important;
            color: var(--ink);
            overflow-x: hidden !important;
            font-family: "Lucida Console", "Courier New", monospace;
          }

          * {
            box-sizing: border-box;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          @keyframes grainMove {
            0% { transform: translate(0, 0); }
            25% { transform: translate(-0.6%, 0.4%); }
            50% { transform: translate(0.4%, -0.5%); }
            75% { transform: translate(0.5%, 0.4%); }
            100% { transform: translate(0, 0); }
          }

          .dining-page {
            min-height: 100vh;
            padding: 18px;
            background: var(--bg);
            position: relative;
          }

          .dining-page::before,
          .dining-page::after {
            content: "";
            position: fixed;
            inset: -10%;
            pointer-events: none;
            z-index: 0;
          }

          .dining-page::before {
            opacity: 0.1;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220' viewBox='0 0 220 220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.25' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
            mix-blend-mode: multiply;
            animation: grainMove 0.45s steps(2, end) infinite;
          }

          .dining-page::after {
            background: repeating-linear-gradient(
              to bottom,
              rgba(255,255,255,0.02) 0px,
              rgba(255,255,255,0.02) 1px,
              transparent 1px,
              transparent 4px
            );
            opacity: 0.08;
          }

          .shell {
            width: min(1120px, 100%);
            margin: 0 auto;
            position: relative;
            z-index: 1;
          }

          .poster {
            background: var(--paper);
            position: relative;
            overflow: hidden;
            padding: 22px 22px 28px;
          }

          .poster::before {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            background:
              radial-gradient(circle at 18% 16%, rgba(255,255,255,0.18), transparent 18%),
              radial-gradient(circle at 72% 28%, rgba(255,255,255,0.1), transparent 22%),
              radial-gradient(circle at 44% 74%, rgba(0,0,0,0.045), transparent 18%);
            opacity: 0.65;
          }

          .hero,
          .schedule-section,
          .explore-wrap,
          .map-zone,
          .concept-card,
          .footer-dots {
            position: relative;
            z-index: 1;
          }

          .header-meta {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 14px;
          }

          .issue-tag {
            background: var(--magenta);
            color: var(--ink);
            padding: 10px 16px 11px;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-size: clamp(16px, 1.4vw, 24px);
            line-height: 1;
            font-weight: 700;
          }

          .dots,
          .footer-dots {
            display: flex;
            gap: 52px;
          }

          .dots {
            margin: 0 0 26px;
          }

          .footer-dots {
            margin-top: 24px;
          }

          .dots span,
          .footer-dots span {
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: var(--ink);
            display: block;
          }

          .hero {
            text-align: center;
            padding: 8px 0 18px;
          }

          .hero-title {
            margin: 0;
            color: var(--ink);
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-size: clamp(40px, 8vw, 92px);
            line-height: 0.9;
            font-weight: 700;
          }

          .hero-address {
            margin-top: 14px;
            color: rgba(7,7,7,0.84);
            text-transform: uppercase;
            letter-spacing: 0.12em;
            font-size: clamp(16px, 2vw, 30px);
            line-height: 1;
            font-weight: 700;
          }

          .hero-tagline {
            margin: 30px auto 0;
            max-width: 920px;
            color: var(--ink);
            text-transform: uppercase;
            letter-spacing: 0.07em;
            font-size: clamp(20px, 3vw, 44px);
            line-height: 1.02;
            font-weight: 700;
          }

          .grid-frame {
            position: relative;
            border: 4px solid var(--ink);
            background: rgba(255,255,255,0.03);
          }

          .grid-frame::before,
          .grid-frame::after {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
          }

          .grid-frame::before {
            background:
              linear-gradient(to right,
                transparent 0,
                transparent 11.5%,
                var(--ink) 11.5%,
                var(--ink) calc(11.5% + 2px),
                transparent calc(11.5% + 2px),
                transparent 88.5%,
                var(--ink) 88.5%,
                var(--ink) calc(88.5% + 2px),
                transparent calc(88.5% + 2px)
              ),
              linear-gradient(to bottom,
                transparent 0,
                transparent 22%,
                var(--ink) 22%,
                var(--ink) calc(22% + 2px),
                transparent calc(22% + 2px),
                transparent 78%,
                var(--ink) 78%,
                var(--ink) calc(78% + 2px),
                transparent calc(78% + 2px)
              );
            opacity: 0.9;
          }

          .grid-frame::after {
            background: repeating-linear-gradient(
              to bottom,
              rgba(0,0,0,0.018) 0px,
              rgba(0,0,0,0.018) 1px,
              transparent 1px,
              transparent 4px
            );
            opacity: 0.25;
          }

          .schedule-section {
            margin-top: 8px;
          }

          .schedule-box {
            background: var(--cyan);
            padding: 18px 18px 20px;
          }

          .schedule-head {
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-size: clamp(22px, 2.8vw, 38px);
            line-height: 1;
            font-weight: 700;
            padding-bottom: 16px;
            border-bottom: 4px solid var(--ink);
          }

          .schedule-subhead {
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-size: clamp(20px, 2.2vw, 30px);
            line-height: 1;
            font-weight: 700;
            padding: 18px 0 8px;
          }

          .schedule-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0;
            padding-top: 8px;
          }

          .schedule-item {
            text-align: center;
            padding: 14px 10px 6px;
          }

          .schedule-title {
            min-height: 2.2em;
            font-size: clamp(18px, 2vw, 34px);
            line-height: 1.02;
            font-weight: 700;
          }

          .schedule-time {
            margin-top: 18px;
            letter-spacing: 0.08em;
            font-size: clamp(30px, 3.5vw, 54px);
            line-height: 1;
            font-weight: 700;
          }

          .explore-wrap {
            padding: 18px 0 18px;
          }

          .explore-link {
            display: block;
            background: var(--magenta);
            color: var(--ink);
            padding: 20px 26px;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-size: clamp(20px, 2.4vw, 34px);
            line-height: 1;
            font-weight: 700;
          }

          .explore-link:hover {
            filter: brightness(0.96);
          }

          .map-zone {
            padding: 8px 0 28px;
          }

          .placeholder-panel,
          .concept-card {
            background: rgba(255,255,255,0.05);
            position: relative;
            overflow: hidden;
          }

          .placeholder-panel::after,
          .concept-card::after {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            background: repeating-linear-gradient(
              to bottom,
              rgba(0,0,0,0.02) 0px,
              rgba(0,0,0,0.02) 1px,
              transparent 1px,
              transparent 4px
            );
            opacity: 0.18;
          }

          .placeholder-panel {
            min-height: 520px;
            display: grid;
            place-items: center;
            text-align: center;
            padding: 24px;
          }

          .placeholder-title,
          .card-image-placeholder-title {
            color: var(--ink);
            text-transform: uppercase;
            letter-spacing: 0.06em;
            font-size: clamp(26px, 3.1vw, 48px);
            line-height: 1;
            font-weight: 700;
          }

          .placeholder-copy {
            margin-top: 12px;
            color: var(--muted);
            text-transform: uppercase;
            letter-spacing: 0.06em;
            font-size: clamp(16px, 1.7vw, 24px);
            line-height: 1.2;
            font-weight: 700;
          }

          .placeholder-path,
          .card-image-placeholder-path {
            display: block;
            margin-top: 12px;
            color: var(--muted);
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-size: 12px;
            line-height: 1.2;
            font-weight: 700;
          }

          .concept-stack {
            display: grid;
            gap: 24px;
          }

          .concept-card {
            padding: 22px;
          }

          .card-image-placeholder {
            min-height: 240px;
            display: grid;
            place-items: center;
            text-align: center;
            padding: 18px;
            margin-bottom: 24px;
            position: relative;
            z-index: 1;
            background: rgba(255,255,255,0.04);
          }

          .card-title {
            position: relative;
            z-index: 1;
            margin: 0;
            color: var(--ink);
            text-transform: uppercase;
            letter-spacing: 0.06em;
            font-size: clamp(30px, 3.3vw, 48px);
            line-height: 0.95;
            font-weight: 700;
          }

          .card-subtitle {
            position: relative;
            z-index: 1;
            margin-top: 10px;
            color: var(--muted);
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-size: clamp(17px, 1.7vw, 24px);
            line-height: 1.05;
            font-weight: 700;
          }

          .card-copy {
            position: relative;
            z-index: 1;
            margin: 22px 0 22px;
            color: var(--ink);
            font-size: clamp(18px, 1.65vw, 24px);
            line-height: 1.42;
            max-width: 40ch;
            font-weight: 700;
          }

          .bullet-list {
            position: relative;
            z-index: 1;
            list-style: none;
            margin: 0 0 22px;
            padding: 0;
          }

          .bullet-list li {
            margin-bottom: 12px;
            color: var(--ink);
            text-transform: uppercase;
            letter-spacing: 0.05em;
            font-size: clamp(22px, 2.1vw, 34px);
            line-height: 1;
            font-weight: 700;
          }

          .bullet-list li::before {
            content: "○ ";
          }

          .card-links {
            position: relative;
            z-index: 1;
            display: flex;
            flex-wrap: wrap;
            gap: 14px;
          }

          .card-links a {
            background: var(--magenta);
            color: var(--ink);
            padding: 10px 14px 11px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            font-size: clamp(18px, 1.8vw, 24px);
            line-height: 1;
            font-weight: 700;
          }

          .card-links a:hover {
            filter: brightness(0.96);
          }

          @media (max-width: 720px) {
            .dining-page {
              padding: 10px;
            }

            .poster {
              padding: 14px 14px 22px;
            }

            .dots,
            .footer-dots {
              gap: 34px;
            }

            .dots span,
            .footer-dots span {
              width: 14px;
              height: 14px;
            }

            .schedule-grid {
              grid-template-columns: 1fr;
            }

            .placeholder-panel {
              min-height: 320px;
            }

            .card-image-placeholder {
              min-height: 160px;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .dining-page::before {
              animation: none !important;
            }
          }
        `}</style>
      </Head>

      <main className="dining-page">
        <div className="shell">
          <section className="poster">
            <div className="header-meta">
              <div className="issue-tag">Issue 71</div>
            </div>

            <div className="dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>

            <div className="hero">
              <h1 className="hero-title">Dining At</h1>
              <div className="hero-address">17 Little Portland Street</div>
              <div className="hero-tagline">More than a meal. Step into the void</div>
            </div>

            <div className="schedule-section">
              <div className="schedule-box grid-frame">
                <div className="schedule-head">Open Thursdays to Saturdays</div>
                <div className="schedule-subhead">Nightly Schedule</div>

                <div className="schedule-grid">
                  <div className="schedule-item">
                    <div className="schedule-title">
                      Chef&apos;s<br />Studio
                    </div>
                    <div className="schedule-time">20:00</div>
                  </div>

                  <div className="schedule-item">
                    <div className="schedule-title">
                      Dinner in<br />The Tent
                    </div>
                    <div className="schedule-time">20:30</div>
                  </div>

                  <div className="schedule-item">
                    <div className="schedule-title">
                      Club<br />Opens
                    </div>
                    <div className="schedule-time">22:00</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="explore-wrap">
              <a className="explore-link" href="#concepts">&gt; Explore our futurist dining concept</a>
            </div>

            <div className="map-zone">
              <div className="placeholder-panel grid-frame" aria-label="Venue map placeholder">
                <div>
                  <div className="placeholder-title">Venue Map Placeholder</div>
                  <div className="placeholder-copy">Add your PNG later and swap this block for an image</div>
                  <div className="placeholder-path">Suggested path: /images/dinning-map.png</div>
                </div>
              </div>
            </div>

            <div className="concept-stack" id="concepts">
              <article className="concept-card grid-frame">
                <div className="card-image-placeholder grid-frame">
                  <div>
                    <div className="card-image-placeholder-title">The Tent Image Placeholder</div>
                    <span className="card-image-placeholder-path">Suggested path: /images/the-tent.png</span>
                  </div>
                </div>

                <h2 className="card-title">The Tent</h2>
                <div className="card-subtitle">at the End of the Universe</div>

                <p className="card-copy">
                  In a floating tent, lost in space, futurist menus set the stage for a sensorial
                  experience as dinner seamlessly transitions into our hypnotic after-dark mode - a
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

              <article className="concept-card grid-frame">
                <div className="card-image-placeholder grid-frame">
                  <div>
                    <div className="card-image-placeholder-title">Chef&apos;s Studio Image Placeholder</div>
                    <span className="card-image-placeholder-path">Suggested path: /images/chefs-studio.png</span>
                  </div>
                </div>

                <h2 className="card-title">Chef&apos;s Studio</h2>
                <div className="card-subtitle">Where the Heads Dine</div>

                <p className="card-copy">
                  Chef&apos;s Studio is an intimate and futuristic space beneath The Tent - the table of
                  choice for those in the know.
                </p>

                <ul className="bullet-list">
                  <li>£65pp Set Dinner</li>
                  <li>Futurist Menu</li>
                  <li>6-12 PAX</li>
                  <li>8pm Start</li>
                </ul>

                <div className="card-links">
                  <a href="#">[Book]</a>
                  <a href="#">[Menu]</a>
                  <a href="#">[Explore Chef&apos;s Studio]</a>
                </div>
              </article>
            </div>

            <div className="footer-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default DinningPage;

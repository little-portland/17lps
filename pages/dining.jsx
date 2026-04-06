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
            --bg: #cfd2d2;
            --paper: #c8cbcb;
            --ink: #050505;
            --magenta: #f00093;
            --soft-black: #121212;
            --line: #101010;
            --muted: rgba(5, 5, 5, 0.72);
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
            padding: 20px;
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
            opacity: 0.11;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220' viewBox='0 0 220 220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.25' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
            mix-blend-mode: multiply;
            animation: grainMove 0.4s steps(2, end) infinite;
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
            width: min(1100px, 100%);
            margin: 0 auto;
            position: relative;
            z-index: 1;
          }

          .poster {
            background: var(--paper);
            border: 1px solid rgba(16,16,16,0.18);
            box-shadow: 0 0 0 1px rgba(255,255,255,0.25) inset;
            position: relative;
            overflow: hidden;
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

          .chrome {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 12px;
            padding: 18px 18px 6px;
          }

          .tag {
            background: var(--magenta);
            color: var(--ink);
            padding: 8px 14px 9px;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-size: clamp(14px, 1.5vw, 22px);
            line-height: 1;
          }

          .dots {
            display: flex;
            gap: 56px;
            padding: 0 18px 18px;
          }

          .dots span {
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: var(--ink);
            display: block;
          }

          .hero {
            padding: 28px 24px 18px;
            text-align: center;
          }

          .hero-title {
            margin: 0;
            color: var(--ink);
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-size: clamp(34px, 7vw, 86px);
            line-height: 0.9;
            font-weight: 700;
          }

          .hero-address {
            margin-top: 14px;
            color: var(--ink);
            opacity: 0.88;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            font-size: clamp(15px, 2vw, 28px);
            line-height: 1;
          }

          .hero-tagline {
            margin: 30px auto 0;
            max-width: 920px;
            color: var(--ink);
            text-transform: uppercase;
            letter-spacing: 0.07em;
            font-size: clamp(18px, 3vw, 40px);
            line-height: 1.02;
          }

          .schedule-section {
            margin-top: 10px;
            padding: 0 24px 18px;
          }

          .schedule-box {
            border: 4px solid var(--line);
            background: rgba(255,255,255,0.08);
          }

          .schedule-head {
            padding: 20px 16px;
            border-bottom: 4px solid var(--line);
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-size: clamp(20px, 2.8vw, 34px);
            line-height: 1;
          }

          .schedule-subhead {
            padding: 16px 16px 6px;
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-size: clamp(18px, 2.2vw, 28px);
            line-height: 1;
          }

          .schedule-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0;
            padding: 8px 10px 18px;
          }

          .schedule-item {
            text-align: center;
            padding: 12px 10px;
          }

          .schedule-title {
            min-height: 2.2em;
            text-transform: none;
            letter-spacing: 0.03em;
            font-size: clamp(18px, 2vw, 30px);
            line-height: 1.05;
            font-weight: 700;
          }

          .schedule-time {
            margin-top: 18px;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-size: clamp(28px, 3.4vw, 50px);
            line-height: 1;
            font-weight: 700;
          }

          .explore-wrap,
          .map-zone,
          .cards-section,
          .footer-note {
            padding-left: 24px;
            padding-right: 24px;
          }

          .explore-wrap {
            padding-top: 14px;
            padding-bottom: 16px;
          }

          .explore-link {
            display: block;
            border: 4px solid var(--line);
            padding: 18px 26px;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-size: clamp(20px, 2.6vw, 34px);
            line-height: 1;
            background: rgba(255,255,255,0.06);
          }

          .explore-link:hover {
            background: rgba(240, 0, 147, 0.08);
          }

          .map-zone {
            padding-top: 12px;
            padding-bottom: 22px;
          }

          .placeholder-panel,
          .info-card {
            background: rgba(255,255,255,0.06);
            border: 4px solid var(--line);
            position: relative;
            overflow: hidden;
          }

          .placeholder-panel::before,
          .info-card::before {
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
            opacity: 0.28;
          }

          .placeholder-panel {
            min-height: 480px;
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
            font-size: clamp(24px, 3vw, 42px);
            line-height: 1;
            font-weight: 700;
          }

          .placeholder-copy {
            margin-top: 12px;
            color: var(--muted);
            text-transform: uppercase;
            letter-spacing: 0.06em;
            font-size: clamp(16px, 1.7vw, 22px);
            line-height: 1.2;
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
          }

          .cards-section {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 22px;
            padding-top: 4px;
            padding-bottom: 22px;
          }

          .info-card {
            padding: 22px;
            min-width: 0;
          }

          .card-image-placeholder {
            min-height: 220px;
            border: 3px dashed rgba(16,16,16,0.34);
            display: grid;
            place-items: center;
            text-align: center;
            padding: 18px;
            margin-bottom: 22px;
            position: relative;
            z-index: 1;
            background: rgba(255,255,255,0.05);
          }

          .card-title {
            position: relative;
            z-index: 1;
            margin: 0;
            color: var(--ink);
            text-transform: uppercase;
            letter-spacing: 0.06em;
            font-size: clamp(28px, 3vw, 44px);
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
            font-size: clamp(16px, 1.6vw, 22px);
            line-height: 1.05;
          }

          .card-copy {
            position: relative;
            z-index: 1;
            margin: 22px 0 22px;
            color: var(--ink);
            font-size: clamp(17px, 1.6vw, 22px);
            line-height: 1.35;
            max-width: 34ch;
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
            font-size: clamp(21px, 2vw, 30px);
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
            text-transform: uppercase;
            letter-spacing: 0.05em;
            font-size: clamp(18px, 1.8vw, 24px);
            line-height: 1;
            font-weight: 700;
          }

          .card-links a:hover {
            color: var(--magenta);
          }

          .footer-note {
            padding-bottom: 24px;
            color: var(--muted);
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-size: 12px;
          }

          @media (max-width: 900px) {
            .cards-section {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 720px) {
            .dining-page {
              padding: 10px;
            }

            .chrome,
            .dots,
            .hero,
            .schedule-section,
            .explore-wrap,
            .map-zone,
            .cards-section,
            .footer-note {
              padding-left: 14px;
              padding-right: 14px;
            }

            .schedule-grid {
              grid-template-columns: 1fr;
            }

            .placeholder-panel {
              min-height: 300px;
            }

            .card-image-placeholder {
              min-height: 150px;
            }

            .dots {
              gap: 38px;
            }

            .dots span {
              width: 14px;
              height: 14px;
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
            <div className="chrome">
              <div className="tag">17 Little Portland Street</div>
              <div className="tag">Issue 71</div>
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
              <div className="schedule-box">
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
              <div className="placeholder-panel" aria-label="Venue map placeholder">
                <div>
                  <div className="placeholder-title">Venue Map Placeholder</div>
                  <div className="placeholder-copy">Add your PNG later and swap this block for an image</div>
                  <div className="placeholder-path">Suggested path: /images/dinning-map.png</div>
                </div>
              </div>
            </div>

            <div className="cards-section" id="concepts">
              <article className="info-card">
                <div className="card-image-placeholder">
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

              <article className="info-card">
                <div className="card-image-placeholder">
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

            <div className="footer-note">Poster-inspired styling with placeholders kept for the venue, The Tent, and Chef&apos;s Studio images.</div>
          </section>
        </div>
      </main>
    </>
  );
};

export default DinningPage;

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
            --bg: #070707;
            --panel: #0a0a0a;
            --ink: #ffe9ef;
            --pink: #ff2c86;
            --hot: #ff3e63;
            --deep: #cc173f;
            --soft: rgba(255, 96, 150, 0.2);
            --line: rgba(255, 90, 140, 0.24);
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
            25% { transform: translate(-0.7%, 0.5%); }
            50% { transform: translate(0.5%, -0.6%); }
            75% { transform: translate(0.6%, 0.4%); }
            100% { transform: translate(0, 0); }
          }

          @keyframes pulseGlow {
            0%, 100% { opacity: 0.72; }
            50% { opacity: 1; }
          }

          .dining-page {
            min-height: 100vh;
            padding: 18px;
            background:
              radial-gradient(circle at 50% 18%, rgba(255, 48, 112, 0.18), transparent 24%),
              radial-gradient(circle at 50% 80%, rgba(255, 38, 116, 0.16), transparent 22%),
              var(--bg);
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
            opacity: 0.24;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220' viewBox='0 0 220 220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
            mix-blend-mode: screen;
            animation: grainMove 0.4s steps(2, end) infinite;
          }

          .dining-page::after {
            background:
              radial-gradient(circle at 22% 30%, rgba(255, 74, 120, 0.22) 0 1px, transparent 2px),
              radial-gradient(circle at 72% 25%, rgba(255, 74, 120, 0.18) 0 1px, transparent 2px),
              radial-gradient(circle at 64% 62%, rgba(255, 74, 120, 0.18) 0 1px, transparent 2px),
              radial-gradient(circle at 36% 72%, rgba(255, 74, 120, 0.16) 0 1px, transparent 2px);
            background-size: 220px 220px, 260px 260px, 240px 240px, 280px 280px;
            opacity: 0.55;
          }

          .shell {
            width: min(1080px, 100%);
            margin: 0 auto;
            position: relative;
            z-index: 1;
          }

          .poster {
            position: relative;
            overflow: hidden;
            min-height: 100vh;
            padding: 18px 18px 26px;
            background:
              radial-gradient(circle at 50% 30%, rgba(255, 30, 92, 0.2), transparent 34%),
              radial-gradient(circle at 50% 74%, rgba(255, 25, 90, 0.22), transparent 28%),
              linear-gradient(to bottom, rgba(255,255,255,0.02), rgba(255,255,255,0)),
              var(--panel);
          }

          .poster::before {
            content: "";
            position: absolute;
            left: 8%;
            right: 8%;
            top: 5%;
            height: 30%;
            border-radius: 50%;
            border: 14px solid rgba(255, 45, 134, 0.95);
            box-shadow:
              0 0 18px rgba(255, 45, 134, 0.92),
              0 0 44px rgba(255, 45, 134, 0.8),
              0 0 90px rgba(255, 45, 134, 0.48);
            opacity: 0.95;
            pointer-events: none;
            filter: blur(1px);
          }

          .poster::after {
            content: "";
            position: absolute;
            left: 10%;
            right: 10%;
            bottom: 1%;
            height: 14%;
            border-radius: 50%;
            border: 12px solid rgba(255, 52, 148, 0.95);
            box-shadow:
              0 0 18px rgba(255, 45, 134, 0.92),
              0 0 44px rgba(255, 45, 134, 0.8),
              0 0 90px rgba(255, 45, 134, 0.48);
            opacity: 0.95;
            pointer-events: none;
            filter: blur(1px);
          }

          .beam {
            position: absolute;
            left: 16%;
            right: 16%;
            top: 10%;
            bottom: 8%;
            background:
              radial-gradient(circle at 50% 50%, rgba(255, 46, 80, 0.55), rgba(255, 24, 68, 0.4) 45%, rgba(255, 14, 42, 0.12) 76%, transparent 100%);
            filter: blur(10px);
            opacity: 0.88;
            pointer-events: none;
          }

          .beam::before {
            content: "";
            position: absolute;
            inset: 0;
            background:
              linear-gradient(to bottom, rgba(255, 80, 110, 0.08), rgba(255, 0, 0, 0.22), rgba(255, 50, 110, 0.08));
            mix-blend-mode: screen;
          }

          .content {
            position: relative;
            z-index: 1;
          }

          .header-meta {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 16px;
          }

          .issue-tag,
          .card-links a,
          .pink-chip {
            background: var(--pink);
            color: #14050a;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-weight: 700;
          }

          .issue-tag {
            padding: 10px 16px 11px;
            font-size: clamp(15px, 1.4vw, 24px);
            line-height: 1;
          }

          .dots,
          .footer-dots {
            display: flex;
            gap: 52px;
          }

          .dots {
            margin: 0 0 30px;
          }

          .footer-dots {
            margin-top: 28px;
          }

          .dots span,
          .footer-dots span {
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: var(--pink);
            box-shadow: 0 0 8px rgba(255, 45, 134, 0.8);
            display: block;
          }

          .hero {
            text-align: center;
            padding: 4px 0 20px;
          }

          .hero-title,
          .card-title,
          .schedule-head,
          .schedule-subhead,
          .placeholder-title,
          .card-image-placeholder-title {
            text-transform: uppercase;
            font-weight: 700;
            letter-spacing: 0.08em;
          }

          .hero-title {
            margin: 0;
            font-size: clamp(40px, 8vw, 92px);
            line-height: 0.9;
            color: #fff4f7;
            text-shadow:
              0 0 6px rgba(255,255,255,0.4),
              0 0 18px rgba(255, 72, 124, 0.28);
          }

          .hero-address {
            margin-top: 14px;
            color: rgba(255, 215, 226, 0.9);
            text-transform: uppercase;
            letter-spacing: 0.12em;
            font-size: clamp(16px, 2vw, 28px);
            line-height: 1;
            font-weight: 700;
            text-shadow: 0 0 12px rgba(255, 60, 130, 0.18);
          }

          .hero-tagline {
            margin: 28px auto 0;
            max-width: 920px;
            color: #fff2f6;
            text-transform: uppercase;
            letter-spacing: 0.07em;
            font-size: clamp(20px, 3vw, 42px);
            line-height: 1.02;
            font-weight: 700;
            text-shadow: 0 0 10px rgba(255, 40, 120, 0.18);
          }

          .section-shell {
            position: relative;
            border: 1px solid var(--line);
            background: rgba(10, 8, 10, 0.48);
            backdrop-filter: blur(1px);
            box-shadow:
              inset 0 0 0 1px rgba(255, 100, 145, 0.06),
              0 0 24px rgba(255, 60, 125, 0.06);
          }

          .section-shell::before {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            background: repeating-linear-gradient(
              to bottom,
              rgba(255,255,255,0.02) 0px,
              rgba(255,255,255,0.02) 1px,
              transparent 1px,
              transparent 4px
            );
            opacity: 0.12;
          }

          .schedule-section {
            margin-top: 10px;
          }

          .schedule-box {
            padding: 20px 20px 22px;
          }

          .schedule-head {
            text-align: center;
            font-size: clamp(22px, 2.8vw, 38px);
            line-height: 1;
            color: #fff1f5;
            padding-bottom: 16px;
            border-bottom: 1px solid rgba(255, 90, 145, 0.3);
            text-shadow: 0 0 14px rgba(255, 55, 120, 0.2);
          }

          .schedule-subhead {
            text-align: center;
            font-size: clamp(19px, 2.2vw, 28px);
            line-height: 1;
            color: rgba(255, 204, 221, 0.96);
            padding: 18px 0 10px;
          }

          .schedule-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0;
            padding-top: 10px;
          }

          .schedule-item {
            text-align: center;
            padding: 14px 10px 6px;
          }

          .schedule-title {
            min-height: 2.2em;
            font-size: clamp(18px, 2vw, 32px);
            line-height: 1.02;
            font-weight: 700;
            color: #fff2f7;
          }

          .schedule-time {
            margin-top: 18px;
            letter-spacing: 0.08em;
            font-size: clamp(30px, 3.5vw, 54px);
            line-height: 1;
            font-weight: 700;
            color: var(--pink);
            text-shadow:
              0 0 10px rgba(255, 44, 134, 0.65),
              0 0 24px rgba(255, 44, 134, 0.3);
          }

          .explore-wrap {
            padding: 18px 0 18px;
          }

          .explore-link {
            display: block;
            background: linear-gradient(to right, rgba(255, 44, 134, 0.96), rgba(255, 72, 120, 0.96));
            color: #14050a;
            padding: 20px 26px;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-size: clamp(20px, 2.4vw, 34px);
            line-height: 1;
            font-weight: 700;
            box-shadow:
              0 0 12px rgba(255, 44, 134, 0.4),
              0 0 26px rgba(255, 44, 134, 0.18);
          }

          .explore-link:hover {
            filter: brightness(1.04);
          }

          .map-zone {
            padding: 8px 0 28px;
          }

          .placeholder-panel,
          .concept-card {
            position: relative;
            overflow: hidden;
          }

          .placeholder-panel {
            min-height: 520px;
            display: grid;
            place-items: center;
            text-align: center;
            padding: 24px;
          }

          .placeholder-title,
          .card-image-placeholder-title,
          .card-title {
            color: #fff5f7;
            text-shadow:
              0 0 8px rgba(255,255,255,0.14),
              0 0 16px rgba(255, 64, 120, 0.18);
          }

          .placeholder-title,
          .card-image-placeholder-title {
            font-size: clamp(26px, 3.1vw, 48px);
            line-height: 1;
          }

          .placeholder-copy {
            margin-top: 12px;
            color: rgba(255, 216, 226, 0.8);
            text-transform: uppercase;
            letter-spacing: 0.06em;
            font-size: clamp(16px, 1.7vw, 24px);
            line-height: 1.2;
            font-weight: 700;
          }

          .placeholder-path,
          .card-image-placeholder-path,
          .card-subtitle {
            color: rgba(255, 197, 214, 0.66);
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-size: 12px;
            line-height: 1.2;
            font-weight: 700;
          }

          .placeholder-path,
          .card-image-placeholder-path {
            display: block;
            margin-top: 12px;
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
          }

          .card-title {
            position: relative;
            z-index: 1;
            margin: 0;
            font-size: clamp(30px, 3.3vw, 48px);
            line-height: 0.95;
          }

          .card-subtitle {
            position: relative;
            z-index: 1;
            margin-top: 10px;
            font-size: clamp(17px, 1.7vw, 24px);
            line-height: 1.05;
          }

          .card-copy {
            position: relative;
            z-index: 1;
            margin: 22px 0 22px;
            color: #ffe7ee;
            font-size: clamp(18px, 1.65vw, 24px);
            line-height: 1.42;
            max-width: 40ch;
            font-weight: 700;
            text-shadow: 0 0 12px rgba(255, 60, 120, 0.08);
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
            color: #fff4f8;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            font-size: clamp(22px, 2.1vw, 34px);
            line-height: 1;
            font-weight: 700;
          }

          .bullet-list li::before {
            content: "○ ";
            color: var(--pink);
            text-shadow: 0 0 8px rgba(255, 44, 134, 0.65);
          }

          .card-links {
            position: relative;
            z-index: 1;
            display: flex;
            flex-wrap: wrap;
            gap: 14px;
          }

          .card-links a {
            padding: 10px 14px 11px;
            font-size: clamp(18px, 1.8vw, 24px);
            line-height: 1;
            box-shadow: 0 0 12px rgba(255, 44, 134, 0.24);
          }

          .card-links a:hover {
            filter: brightness(1.04);
          }

          .side-rail {
            position: absolute;
            left: 0;
            bottom: 26px;
            transform: rotate(-90deg) translateX(-100%);
            transform-origin: bottom left;
            z-index: 1;
          }

          .side-rail .pink-chip,
          .footer-chip {
            padding: 10px 14px 11px;
            font-size: clamp(14px, 1.2vw, 20px);
            line-height: 1;
          }

          .footer-chip {
            position: relative;
            z-index: 1;
            margin-top: 22px;
            margin-left: auto;
            width: fit-content;
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

            .side-rail {
              position: static;
              transform: none;
              margin-top: 22px;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .dining-page::before,
            .poster::before,
            .poster::after {
              animation: none !important;
            }
          }
        `}</style>
      </Head>

      <main className="dining-page">
        <div className="shell">
          <section className="poster">
            <div className="beam" aria-hidden="true" />

            <div className="content">
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
                <div className="schedule-box section-shell">
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
                <div className="placeholder-panel section-shell" aria-label="Venue map placeholder">
                  <div>
                    <div className="placeholder-title">Venue Map Placeholder</div>
                    <div className="placeholder-copy">Add your PNG later and swap this block for an image</div>
                    <div className="placeholder-path">Suggested path: /images/dinning-map.png</div>
                  </div>
                </div>
              </div>

              <div className="concept-stack" id="concepts">
                <article className="concept-card section-shell">
                  <div className="card-image-placeholder section-shell">
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

                <article className="concept-card section-shell">
                  <div className="card-image-placeholder section-shell">
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

              <div className="footer-chip pink-chip">LPX//Underground</div>
              <div className="side-rail">
                <div className="pink-chip">yo@little-portland.com</div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default DinningPage;

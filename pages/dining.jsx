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
            --bg: #070312;
            --panel: rgba(7, 4, 18, 0.76);
            --panel-strong: rgba(4, 2, 12, 0.88);
            --ink: #ffeaf6;
            --pink: #ff198b;
            --pink-soft: rgba(255, 25, 139, 0.28);
            --pink-glow: rgba(255, 25, 139, 0.6);
            --blue: #4e8cff;
            --blue-soft: rgba(78, 140, 255, 0.3);
            --cyan: #45d8f1;
            --coral: #ff8c73;
            --line: rgba(255, 65, 170, 0.24);
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

          @keyframes pulseCore {
            0%, 100% { opacity: 0.82; }
            50% { opacity: 1; }
          }

          .dining-page {
            min-height: 100vh;
            padding: 12px;
            position: relative;
            background:
              radial-gradient(circle at 50% 18%, rgba(255, 29, 115, 0.18), transparent 22%),
              radial-gradient(circle at 50% 84%, rgba(255, 29, 115, 0.16), transparent 20%),
              linear-gradient(180deg, #090313 0%, #06020f 100%);
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
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220' viewBox='0 0 220 220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.15' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
            opacity: 0.22;
            mix-blend-mode: screen;
            animation: grainMove 0.42s steps(2, end) infinite;
          }

          .dining-page::after {
            background:
              radial-gradient(circle at 18% 24%, rgba(255,255,255,0.5) 0 1px, transparent 2px),
              radial-gradient(circle at 74% 18%, rgba(255,255,255,0.44) 0 1px, transparent 2px),
              radial-gradient(circle at 62% 68%, rgba(255,255,255,0.42) 0 1px, transparent 2px),
              radial-gradient(circle at 34% 78%, rgba(255,255,255,0.35) 0 1px, transparent 2px),
              radial-gradient(circle at 82% 52%, rgba(255,255,255,0.3) 0 1px, transparent 2px);
            background-size: 240px 240px, 300px 300px, 260px 260px, 340px 340px, 280px 280px;
            opacity: 0.35;
          }

          .shell {
            width: min(980px, 100%);
            margin: 0 auto;
            position: relative;
            z-index: 1;
          }

          .poster {
            position: relative;
            overflow: hidden;
            padding: 18px 14px 24px;
            background:
              radial-gradient(circle at 50% 12%, rgba(255, 25, 139, 0.22), transparent 16%),
              radial-gradient(circle at 50% 88%, rgba(255, 25, 139, 0.18), transparent 14%),
              linear-gradient(180deg, rgba(18, 10, 34, 0.9), rgba(5, 2, 12, 0.98));
            border: 2px solid rgba(255,255,255,0.06);
            box-shadow:
              inset 0 0 0 1px rgba(255,255,255,0.03),
              0 0 30px rgba(255, 25, 139, 0.08);
          }

          .space-grid {
            position: absolute;
            inset: 0;
            pointer-events: none;
            overflow: hidden;
          }

          .space-grid::before,
          .space-grid::after {
            content: "";
            position: absolute;
            inset: -14% -8%;
            border-radius: 50%;
          }

          .space-grid::before {
            background:
              repeating-linear-gradient(
                to right,
                transparent 0,
                transparent 46px,
                rgba(255, 40, 170, 0.55) 46px,
                rgba(255, 40, 170, 0.55) 49px,
                transparent 49px,
                transparent 94px
              ),
              repeating-linear-gradient(
                to bottom,
                transparent 0,
                transparent 42px,
                rgba(116, 150, 255, 0.55) 42px,
                rgba(116, 150, 255, 0.55) 45px,
                transparent 45px,
                transparent 90px
              );
            transform: perspective(900px) rotateX(74deg) scale(1.85) translateY(-8%);
            opacity: 0.62;
            filter: drop-shadow(0 0 8px rgba(255, 40, 170, 0.2));
          }

          .space-grid::after {
            background: radial-gradient(circle at 50% 50%, rgba(255, 20, 130, 0.12), transparent 48%);
          }

          .core-glow {
            position: absolute;
            left: 50%;
            top: 20%;
            width: min(46vw, 420px);
            aspect-ratio: 1 / 1;
            transform: translateX(-50%);
            border-radius: 50%;
            background:
              radial-gradient(circle at 50% 45%, rgba(255, 189, 224, 0.75), rgba(255, 81, 167, 0.7) 22%, rgba(255, 25, 139, 0.96) 54%, rgba(255, 25, 139, 0.22) 74%, transparent 78%);
            filter: blur(2px);
            opacity: 0.96;
            animation: pulseCore 4.8s ease-in-out infinite;
            pointer-events: none;
          }

          .content {
            position: relative;
            z-index: 1;
          }

          .hero {
            text-align: center;
            padding: 8px 0 22px;
          }

          .hero-title {
            margin: 0;
            color: var(--coral);
            font-size: clamp(42px, 7vw, 86px);
            line-height: 0.9;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-weight: 700;
            text-shadow:
              0 0 8px rgba(255, 140, 115, 0.18),
              0 0 18px rgba(255, 80, 90, 0.12);
          }

          .hero-address {
            margin-top: 12px;
            color: var(--cyan);
            font-size: clamp(15px, 1.9vw, 24px);
            line-height: 1;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            font-weight: 700;
          }

          .hero-tagline {
            margin: 20px auto 0;
            max-width: 820px;
            color: #c76b5d;
            font-size: clamp(20px, 3vw, 36px);
            line-height: 0.95;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            font-style: italic;
            text-shadow:
              0 1px 0 rgba(255,190,170,0.35),
              0 2px 0 rgba(126,58,50,0.9),
              -5px 7px 0 rgba(18,5,10,0.45);
            transform: perspective(900px) rotateX(14deg);
            display: inline-block;
          }

          .section-shell {
            position: relative;
            background: var(--panel-strong);
            border: 2px solid rgba(69, 216, 241, 0.92);
            box-shadow:
              inset 0 0 0 1px rgba(69, 216, 241, 0.1),
              0 0 14px rgba(69, 216, 241, 0.06);
          }

          .section-shell::before {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            background: repeating-linear-gradient(
              to bottom,
              rgba(255,255,255,0.018) 0px,
              rgba(255,255,255,0.018) 1px,
              transparent 1px,
              transparent 4px
            );
            opacity: 0.1;
          }

          .schedule-section {
            margin-top: 8px;
          }

          .schedule-box {
            background: rgba(69, 216, 241, 0.9);
            color: #000;
            border-color: rgba(0,0,0,0.95);
            box-shadow: none;
          }

          .schedule-head {
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-size: clamp(18px, 2.4vw, 30px);
            line-height: 1;
            font-weight: 700;
            padding: 14px 12px;
            border-bottom: 2px solid rgba(0,0,0,0.95);
          }

          .schedule-subhead {
            text-align: center;
            color: var(--coral);
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-size: clamp(16px, 1.8vw, 24px);
            line-height: 1;
            font-weight: 700;
            padding: 14px 12px 6px;
          }

          .schedule-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0;
            padding: 6px 8px 14px;
          }

          .schedule-item {
            text-align: center;
            padding: 8px;
          }

          .schedule-title {
            min-height: 2.2em;
            font-size: clamp(18px, 2vw, 28px);
            line-height: 1.02;
            font-weight: 700;
          }

          .schedule-time {
            margin-top: 14px;
            font-size: clamp(28px, 3vw, 44px);
            line-height: 1;
            font-weight: 700;
            letter-spacing: 0.06em;
          }

          .explore-wrap {
            padding: 12px 0 16px;
          }

          .explore-link {
            display: block;
            padding: 13px 18px;
            color: var(--cyan);
            font-size: clamp(18px, 2vw, 28px);
            line-height: 1;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            border-color: rgba(69, 216, 241, 0.92);
          }

          .map-zone {
            padding: 0 0 18px;
          }

          .placeholder-panel {
            min-height: 440px;
            display: grid;
            place-items: center;
            text-align: center;
            padding: 24px;
            border-color: rgba(69, 216, 241, 0.92);
          }

          .placeholder-title,
          .card-title {
            color: var(--coral);
            text-transform: none;
            letter-spacing: 0.02em;
            font-size: clamp(26px, 3vw, 42px);
            line-height: 1;
            font-weight: 700;
          }

          .placeholder-copy,
          .placeholder-path,
          .card-subtitle {
            color: rgba(255, 224, 232, 0.78);
            text-transform: uppercase;
            letter-spacing: 0.06em;
            font-weight: 700;
          }

          .placeholder-copy {
            margin-top: 12px;
            font-size: clamp(15px, 1.6vw, 21px);
            line-height: 1.2;
          }

          .placeholder-path {
            display: block;
            margin-top: 10px;
            font-size: 12px;
          }

          .concept-stack {
            display: grid;
            gap: 18px;
          }

          .concept-card {
            padding: 14px 14px 16px;
            border-color: rgba(69, 216, 241, 0.92);
          }

          .card-image-placeholder {
            min-height: 210px;
            display: grid;
            place-items: center;
            text-align: center;
            padding: 18px;
            margin-bottom: 18px;
            border: 2px solid rgba(69, 216, 241, 0.92);
            background: rgba(0,0,0,0.2);
          }

          .card-image-placeholder-title {
            color: var(--coral);
            font-size: clamp(28px, 4.5vw, 64px);
            line-height: 0.92;
            text-transform: uppercase;
            letter-spacing: 0.02em;
            font-weight: 700;
          }

          .card-image-placeholder-path {
            display: block;
            margin-top: 10px;
            color: rgba(255, 224, 232, 0.62);
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            font-weight: 700;
          }

          .card-title {
            margin: 0;
          }

          .card-subtitle {
            margin-top: 8px;
            font-size: clamp(15px, 1.5vw, 21px);
            line-height: 1.05;
          }

          .card-copy {
            margin: 18px 0 18px;
            color: var(--coral);
            font-size: clamp(16px, 1.45vw, 22px);
            line-height: 1.35;
            max-width: 40ch;
            font-weight: 700;
          }

          .bullet-list {
            list-style: none;
            margin: 0 0 18px;
            padding: 0;
          }

          .bullet-list li {
            margin-bottom: 10px;
            color: var(--cyan);
            font-size: clamp(18px, 1.8vw, 28px);
            line-height: 1;
            font-weight: 700;
          }

          .bullet-list li::before {
            content: "◦ ";
          }

          .card-links {
            display: flex;
            flex-wrap: wrap;
            gap: 14px;
          }

          .card-links a {
            color: var(--cyan);
            font-size: clamp(18px, 1.8vw, 24px);
            line-height: 1;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.04em;
          }

          .card-links a:hover,
          .explore-link:hover {
            opacity: 0.84;
          }

          @media (max-width: 720px) {
            .dining-page {
              padding: 4px;
            }

            .poster {
              padding: 14px 10px 18px;
            }

            .core-glow {
              width: min(76vw, 340px);
              top: 18%;
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
          }

          @media (prefers-reduced-motion: reduce) {
            .dining-page::before,
            .core-glow {
              animation: none !important;
            }
          }
        `}</style>
      </Head>

      <main className="dining-page">
        <div className="shell">
          <section className="poster">
            <div className="space-grid" aria-hidden="true" />
            <div className="core-glow" aria-hidden="true" />

            <div className="content">
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
                <a className="explore-link section-shell" href="#concepts">&gt; Explore our futurist dining concept</a>
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

                <article className="concept-card section-shell">
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
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default DinningPage;

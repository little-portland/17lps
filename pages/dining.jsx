import React from "react";
import Head from "next/head";
import Image from "next/image";

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
            --bg: #050505;
            --paper: #070707;
            --teal: #21d8e8;
            --coral: #ff7c5b;
            --magenta: #c347b5;
            --lime: #1ee36d;
            --white: #f0f0f0;
            --line: rgba(255,255,255,0.16);
            --soft-line: rgba(255,255,255,0.08);
            --shadow: rgba(0, 0, 0, 0.45);
          }

          html {
            background: var(--bg) !important;
            overflow-x: hidden !important;
          }

          body {
            margin: 0;
            background:
              radial-gradient(circle at 20% 10%, rgba(195, 71, 181, 0.12), transparent 25%),
              radial-gradient(circle at 80% 90%, rgba(33, 216, 232, 0.08), transparent 30%),
              var(--bg) !important;
            color: var(--white);
            overflow-x: hidden !important;
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
          }

          * {
            box-sizing: border-box;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          @keyframes flicker {
            0%, 100% { opacity: 0.18; }
            50% { opacity: 0.28; }
          }

          @keyframes scan {
            0% { transform: translateY(-120%); }
            100% { transform: translateY(120%); }
          }

          @keyframes floatPulse {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
          }

          .dining-page {
            position: relative;
            min-height: 100vh;
            padding: 24px;
            background: transparent;
          }

          .dining-page::before {
            content: "";
            position: fixed;
            inset: 0;
            pointer-events: none;
            opacity: 0.16;
            z-index: 0;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
            mix-blend-mode: screen;
            animation: flicker 3.4s ease-in-out infinite;
          }

          .dining-page::after {
            content: "";
            position: fixed;
            left: 0;
            right: 0;
            top: -30%;
            height: 40%;
            pointer-events: none;
            z-index: 0;
            background: linear-gradient(
              to bottom,
              rgba(255,255,255,0) 0%,
              rgba(255,255,255,0.035) 48%,
              rgba(255,255,255,0.08) 50%,
              rgba(255,255,255,0.035) 52%,
              rgba(255,255,255,0) 100%
            );
            mix-blend-mode: screen;
            animation: scan 9s linear infinite;
          }

          .shell {
            width: min(1120px, 100%);
            margin: 0 auto;
            position: relative;
            z-index: 1;
          }

          .poster {
            position: relative;
            overflow: hidden;
            background: var(--paper);
            border: 2px solid rgba(255,255,255,0.08);
            box-shadow:
              0 0 0 1px rgba(255,255,255,0.04),
              0 20px 60px rgba(0,0,0,0.38);
          }

          .poster::before {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            background:
              linear-gradient(to bottom, rgba(255,255,255,0.03), rgba(255,255,255,0.01)),
              repeating-linear-gradient(
                to bottom,
                rgba(255,255,255,0.02) 0px,
                rgba(255,255,255,0.02) 1px,
                transparent 1px,
                transparent 4px
              );
            opacity: 0.3;
          }

          .hero {
            padding: 34px 34px 24px;
            text-align: center;
            border-bottom: 2px solid #000;
          }

          .hero-title {
            margin: 0;
            color: var(--coral);
            text-transform: uppercase;
            font-size: clamp(48px, 8vw, 102px);
            line-height: 0.9;
            letter-spacing: 0.06em;
            text-shadow: 0 2px 0 rgba(0,0,0,0.6);
          }

          .hero-address {
            margin-top: 12px;
            color: var(--teal);
            text-transform: uppercase;
            font-size: clamp(20px, 2.8vw, 44px);
            line-height: 1;
            letter-spacing: 0.08em;
            font-family: "Courier New", monospace;
            font-weight: 700;
          }

          .hero-tagline {
            margin-top: 28px;
            color: #a95d52;
            text-transform: uppercase;
            font-size: clamp(22px, 4vw, 56px);
            line-height: 1;
            letter-spacing: 0.06em;
            font-style: italic;
            text-shadow:
              0 1px 0 #f28c72,
              0 2px 0 #83453c,
              0 3px 0 #6a3530,
              0 4px 0 #4f2724,
              -6px 10px 0 rgba(0,0,0,0.45);
            transform: perspective(800px) rotateX(16deg);
            display: inline-block;
          }

          .schedule-bar {
            background: rgba(33, 216, 232, 0.88);
            color: #050505;
            border-top: 2px solid #000;
            border-bottom: 2px solid #000;
            text-align: center;
            padding: 22px 16px;
            text-transform: uppercase;
            font-size: clamp(22px, 3vw, 42px);
            letter-spacing: 0.08em;
          }

          .schedule-box {
            background: rgba(33, 216, 232, 0.88);
            color: #050505;
            padding: 26px 20px 20px;
            border-bottom: 2px solid #000;
          }

          .schedule-heading {
            text-align: center;
            color: var(--coral);
            font-family: "Courier New", monospace;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-size: clamp(20px, 3vw, 40px);
            margin-bottom: 26px;
          }

          .schedule-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 18px;
          }

          .schedule-item {
            text-align: center;
            padding: 6px 8px 0;
          }

          .schedule-label {
            font-family: "Courier New", monospace;
            font-size: clamp(18px, 2.5vw, 34px);
            line-height: 1.05;
            font-weight: 700;
            min-height: 2.3em;
          }

          .schedule-time {
            margin-top: 18px;
            font-family: "Courier New", monospace;
            font-size: clamp(28px, 3.4vw, 54px);
            line-height: 1;
            font-weight: 700;
          }

          .explore-wrap {
            padding: 38px 38px 28px;
          }

          .explore-link {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 82px;
            border: 2px solid var(--teal);
            color: #159fb2;
            background: rgba(0,0,0,0.82);
            text-transform: uppercase;
            font-family: "Courier New", monospace;
            font-weight: 700;
            font-size: clamp(18px, 2.4vw, 38px);
            letter-spacing: 0.08em;
            padding: 16px 22px;
            transition: transform 0.2s ease, box-shadow 0.2s ease, color 0.2s ease;
          }

          .explore-link:hover {
            transform: translateY(-2px);
            color: var(--teal);
            box-shadow: 0 0 24px rgba(33, 216, 232, 0.14);
          }

          .explore-link .arrow {
            margin-right: 16px;
            font-size: 1.15em;
          }

          .map-zone {
            padding: 12px 30px 42px;
          }

          .venue-map-placeholder {
            position: relative;
            min-height: 720px;
            border: 2px dashed rgba(33, 216, 232, 0.42);
            background:
              radial-gradient(circle at 50% 30%, rgba(33, 216, 232, 0.05), transparent 28%),
              rgba(0, 0, 0, 0.72);
            display: grid;
            place-items: center;
            overflow: hidden;
          }

          .venue-map-placeholder::before {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            background:
              linear-gradient(to bottom, rgba(255,255,255,0.025), rgba(255,255,255,0.01)),
              repeating-linear-gradient(
                to bottom,
                rgba(255,255,255,0.018) 0px,
                rgba(255,255,255,0.018) 1px,
                transparent 1px,
                transparent 4px
              );
            opacity: 0.3;
          }

          .venue-map-placeholder-inner {
            position: relative;
            z-index: 1;
            text-align: center;
            padding: 28px;
            max-width: 560px;
          }

          .venue-map-placeholder-title {
            color: var(--coral);
            font-family: "Courier New", monospace;
            font-size: clamp(26px, 3vw, 42px);
            font-weight: 700;
            letter-spacing: 0.06em;
            margin-bottom: 12px;
          }

          .venue-map-placeholder-copy {
            color: var(--teal);
            font-family: "Courier New", monospace;
            font-size: clamp(16px, 1.8vw, 24px);
            line-height: 1.6;
            font-weight: 700;
          }

          .venue-map-placeholder-path {
            display: block;
            margin-top: 14px;
            color: rgba(240,240,240,0.78);
            font-size: clamp(14px, 1.4vw, 18px);
          }

          .divider-space {
            height: 22px;
          }

          @media (max-width: 980px) {
            .cards-section {
              grid-template-columns: 1fr;
            }

            .info-card {
              min-height: auto;
            }

            .venue-map-placeholder {
              min-height: 560px;
            }
          }

          @media (max-width: 768px) {
            .dining-page {
              padding: 10px;
            }

            .hero {
              padding: 24px 16px 18px;
            }

            .hero-tagline {
              margin-top: 18px;
            }

            .schedule-bar {
              padding: 16px 10px;
            }

            .schedule-box {
              padding: 20px 10px 14px;
            }

            .schedule-grid {
              grid-template-columns: 1fr;
              gap: 16px;
            }

            .schedule-label {
              min-height: 0;
            }

            .explore-wrap {
              padding: 22px 14px 18px;
            }

            .explore-link {
              min-height: 62px;
            }

            .map-zone {
              padding: 6px 10px 28px;
            }

            .diagram-card {
              min-height: 430px;
            }

            

            .cards-section {
              padding: 10px 10px 28px;
              gap: 16px;
            }

            .info-card {
              padding: 22px 18px 26px;
              border-width: 3px;
            }

            .card-copy {
              max-width: 100%;
            }

            .card-links {
              gap: 16px;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .dining-page::before,
            .dining-page::after,
            .iso-wrap {
              animation: none !important;
            }
          }
        `}</style>
      </Head>

      <main className="dining-page">
        <div className="shell">
          <section className="poster">
            <div className="hero">
              <h1 className="hero-title">DINING AT</h1>
              <div className="hero-address">17 LITTLE PORTLAND STREET</div>
              <div className="hero-tagline">MORE THAN A MEAL. STEP INTO THE VOID</div>
            </div>

            <div className="schedule-bar">OPEN THURSDAYS TO SATURDAYS</div>

            <div className="schedule-box">
              <div className="schedule-heading">NIGHTLY SCHEDULE</div>
              <div className="schedule-grid">
                <div className="schedule-item">
                  <div className="schedule-label">
                    Chef&apos;s<br />Studio
                  </div>
                  <div className="schedule-time">20:00</div>
                </div>

                <div className="schedule-item">
                  <div className="schedule-label">
                    Dinner in<br />The Tent
                  </div>
                  <div className="schedule-time">20:30</div>
                </div>

                <div className="schedule-item">
                  <div className="schedule-label">
                    Club<br />Opens
                  </div>
                  <div className="schedule-time">22:00</div>
                </div>
              </div>
            </div>

            <div className="explore-wrap">
              <a className="explore-link" href="#concepts">
                <span className="arrow">&gt;</span>
                EXPLORE OUR FUTURIST DINING CONCEPT
              </a>
            </div>

            <div className="map-zone">
              <div className="venue-map-placeholder" aria-label="Venue map placeholder">
                <div className="venue-map-placeholder-inner">
                  <div className="venue-map-placeholder-title">Venue map placeholder</div>
                  <div className="venue-map-placeholder-copy">
                    Add your PNG later in <code>/public/images/</code> and replace this block with an
                    <code> Image </code> component.
                    <span className="venue-map-placeholder-path">
                      Suggested path: <code>/images/dinning-map.png</code>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="divider-space" />

            <div className="cards-section" id="concepts">
              <article className="info-card">
                <div className="card-kicker tent">The Tent</div>
                <div className="tent-sub">at the End of the Universe</div>

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
                  <a href="#">[BOOK]</a>
                  <a href="#">[MENU]</a>
                  <a href="#">[EXPLORE THE TENT]</a>
                </div>
              </article>

              <article className="info-card">
                <div className="red-beams" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>

                <div className="card-kicker studio">CHEF&apos;S STUDIO</div>
                <div className="studio-sub">WHERE THE HEADS DINE</div>

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
                  <a href="#">[BOOK]</a>
                  <a href="#">[MENU]</a>
                  <a href="#">[EXPLORE CHEF&apos;S STUDIO]</a>
                </div>
              </article>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default DinningPage;

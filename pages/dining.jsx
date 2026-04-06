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
            --paper: #f1eee4;
            --paper-shadow: #e6e0d2;
            --ink: #1a130f;
            --pink: #ff3f97;
            --blue: #3848b9;
            --blue-dark: #263493;
            --muted: rgba(26, 19, 15, 0.68);
            --rule: rgba(26, 19, 15, 0.18);
          }

          html {
            background: var(--paper) !important;
            overflow-x: hidden !important;
          }

          body {
            margin: 0;
            background: var(--paper) !important;
            color: var(--ink);
            overflow-x: hidden !important;
            font-family: Arial, Helvetica, sans-serif;
          }

          * {
            box-sizing: border-box;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          @keyframes grainShift {
            0% { transform: translate(0, 0); }
            25% { transform: translate(-0.4%, 0.3%); }
            50% { transform: translate(0.3%, -0.4%); }
            75% { transform: translate(0.4%, 0.2%); }
            100% { transform: translate(0, 0); }
          }

          .dining-page {
            min-height: 100vh;
            padding: 28px 14px 36px;
            position: relative;
            background: var(--paper);
          }

          .dining-page::before,
          .dining-page::after {
            content: "";
            position: fixed;
            inset: -8%;
            pointer-events: none;
            z-index: 0;
          }

          .dining-page::before {
            opacity: 0.2;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220' viewBox='0 0 220 220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.3' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
            mix-blend-mode: multiply;
            animation: grainShift 0.45s steps(2, end) infinite;
          }

          .dining-page::after {
            background:
              radial-gradient(circle at 18% 22%, rgba(0,0,0,0.05) 0 1px, transparent 2px),
              radial-gradient(circle at 74% 15%, rgba(0,0,0,0.04) 0 1px, transparent 2px),
              radial-gradient(circle at 68% 62%, rgba(0,0,0,0.035) 0 1px, transparent 2px),
              radial-gradient(circle at 34% 78%, rgba(0,0,0,0.03) 0 1px, transparent 2px);
            background-size: 260px 260px, 320px 320px, 280px 280px, 340px 340px;
            opacity: 0.28;
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
            background: transparent;
            padding: 0;
          }

          .poster::before {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            background:
              radial-gradient(circle at 50% 42%, rgba(56,72,185,0.06), transparent 22%),
              radial-gradient(circle at 50% 76%, rgba(255,63,151,0.06), transparent 18%);
            opacity: 0.9;
          }

          .content {
            position: relative;
            z-index: 1;
          }

          .kicker-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 12px;
            margin-bottom: 18px;
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--ink);
            font-size: clamp(18px, 1.8vw, 28px);
            line-height: 1;
          }

          .hero {
            text-align: center;
            margin-bottom: 34px;
          }

          .hero-title,
          .section-title,
          .burst-word,
          .schedule-time {
            margin: 0;
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
            text-transform: uppercase;
            line-height: 0.9;
            letter-spacing: 0.03em;
          }

          .hero-title {
            color: var(--pink);
            font-size: clamp(64px, 12vw, 156px);
          }

          .hero-address {
            margin-top: 16px;
            color: var(--blue-dark);
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-size: clamp(18px, 2.6vw, 36px);
            line-height: 1;
          }

          .radial-row {
            display: grid;
            grid-template-columns: minmax(90px, 120px) 1fr minmax(90px, 120px);
            align-items: center;
            gap: 14px;
            margin: 36px 0 38px;
          }

          .radial-side {
            color: var(--ink);
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
            font-size: clamp(16px, 2vw, 30px);
            line-height: 0.94;
            text-transform: uppercase;
            letter-spacing: 0.02em;
            white-space: nowrap;
            justify-self: center;
          }

          .radial-side.left {
            transform: rotate(-78deg);
          }

          .radial-side.right {
            transform: rotate(78deg);
          }

          .radial-burst {
            width: min(100%, 430px);
            aspect-ratio: 1 / 1;
            margin: 0 auto;
            border-radius: 50%;
            background:
              radial-gradient(circle, var(--pink) 0 8%, transparent 8% 100%),
              repeating-conic-gradient(
                from 0deg,
                var(--blue) 0deg 8deg,
                transparent 8deg 16deg
              );
            position: relative;
          }

          .radial-burst::before {
            content: "";
            position: absolute;
            inset: 18%;
            border-radius: 50%;
            background:
              repeating-conic-gradient(
                from 0deg,
                transparent 0deg 8deg,
                var(--blue) 8deg 16deg
              );
          }

          .radial-burst::after {
            content: "";
            position: absolute;
            inset: 39%;
            border-radius: 50%;
            background:
              repeating-conic-gradient(
                from 0deg,
                var(--blue) 0deg 8deg,
                transparent 8deg 16deg
              );
          }

          .tagline {
            text-align: center;
            margin: 0 0 18px;
            color: var(--pink);
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
            text-transform: uppercase;
            font-size: clamp(20px, 3vw, 34px);
            line-height: 0.95;
            letter-spacing: 0.06em;
          }

          .schedule-section,
          .explore-wrap,
          .placeholder-panel,
          .concept-card {
            margin-bottom: 18px;
          }

          .box {
            position: relative;
            background: rgba(255,255,255,0.22);
            border: 1px solid rgba(0,0,0,0.14);
            box-shadow: inset 0 0 0 1px rgba(255,255,255,0.18);
          }

          .schedule-box {
            padding: 20px 18px 18px;
          }

          .schedule-head {
            text-align: center;
            color: var(--ink);
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            font-size: clamp(26px, 3vw, 42px);
            line-height: 1;
            margin-bottom: 12px;
          }

          .schedule-subhead {
            text-align: center;
            color: var(--pink);
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-size: clamp(16px, 1.8vw, 24px);
            line-height: 1;
            margin-bottom: 18px;
          }

          .schedule-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
            align-items: end;
          }

          .schedule-item {
            text-align: center;
            padding: 6px;
          }

          .schedule-title {
            color: var(--ink);
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
            font-size: clamp(20px, 2.2vw, 34px);
            line-height: 0.98;
            min-height: 2.1em;
          }

          .schedule-time {
            color: var(--blue-dark);
            font-size: clamp(38px, 4vw, 62px);
            margin-top: 12px;
          }

          .explore-link {
            display: block;
            padding: 16px 18px;
            text-align: center;
            color: var(--blue-dark);
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            font-size: clamp(20px, 2.4vw, 34px);
            line-height: 1;
          }

          .placeholder-panel {
            padding: 30px 18px;
            text-align: center;
          }

          .placeholder-title,
          .card-image-placeholder-title {
            color: var(--pink);
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
            text-transform: uppercase;
            font-size: clamp(30px, 4vw, 54px);
            line-height: 0.95;
            letter-spacing: 0.03em;
          }

          .placeholder-copy,
          .placeholder-path,
          .card-image-placeholder-path,
          .card-subtitle {
            color: var(--muted);
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
            text-transform: uppercase;
            letter-spacing: 0.06em;
          }

          .placeholder-copy {
            margin-top: 12px;
            font-size: clamp(14px, 1.5vw, 20px);
            line-height: 1.2;
          }

          .placeholder-path,
          .card-image-placeholder-path {
            display: block;
            margin-top: 10px;
            font-size: 11px;
          }

          .concept-stack {
            display: grid;
            gap: 20px;
          }

          .concept-card {
            padding: 18px;
          }

          .card-image-placeholder {
            min-height: 150px;
            display: grid;
            place-items: center;
            text-align: center;
            padding: 16px;
            margin-bottom: 18px;
            border: 1px solid rgba(0,0,0,0.14);
            background: rgba(255,255,255,0.16);
          }

          .section-title {
            color: var(--ink);
            font-size: clamp(28px, 4vw, 60px);
          }

          .card-subtitle {
            margin-top: 6px;
            font-size: clamp(14px, 1.6vw, 20px);
            line-height: 1.05;
          }

          .card-copy {
            margin: 18px 0 18px;
            color: var(--ink);
            font-size: clamp(17px, 1.8vw, 24px);
            line-height: 1.38;
            max-width: 40ch;
            font-weight: 700;
          }

          .bullet-list {
            list-style: none;
            margin: 0 0 16px;
            padding: 0;
          }

          .bullet-list li {
            margin-bottom: 10px;
            color: var(--blue-dark);
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
            font-size: clamp(20px, 2vw, 30px);
            line-height: 1;
            text-transform: uppercase;
            letter-spacing: 0.04em;
          }

          .bullet-list li::before {
            content: "○ ";
            color: var(--pink);
          }

          .card-links {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
          }

          .card-links a {
            color: var(--pink);
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
            font-size: clamp(18px, 1.8vw, 24px);
            line-height: 1;
            text-transform: uppercase;
            letter-spacing: 0.04em;
          }

          .divider {
            height: 1px;
            background: var(--rule);
            margin: 20px 0;
          }

          @media (max-width: 760px) {
            .dining-page {
              padding: 18px 10px 28px;
            }

            .radial-row {
              grid-template-columns: 1fr;
              gap: 18px;
            }

            .radial-side {
              transform: none !important;
              white-space: normal;
              text-align: center;
            }

            .schedule-grid {
              grid-template-columns: 1fr;
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
            <div className="content">
              <div className="kicker-row">
                <div>Issue 94</div>
                <div>LPX//Underground</div>
              </div>

              <div className="hero">
                <h1 className="hero-title">Dining At</h1>
                <div className="hero-address">17 Little Portland Street</div>
              </div>

              <div className="radial-row">
                <div className="radial-side left">Thursday 20:00</div>
                <div className="radial-burst" aria-hidden="true" />
                <div className="radial-side right">Saturday 22:00</div>
              </div>

              <div className="tagline">More than a meal. Step into the void</div>

              <div className="schedule-section box">
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

              <div className="explore-wrap box">
                <a className="explore-link" href="#concepts">Explore our futurist dining concept</a>
              </div>

              <div className="placeholder-panel box" aria-label="Venue map placeholder">
                <div>
                  <div className="placeholder-title">Venue Map Placeholder</div>
                  <div className="placeholder-copy">Add your PNG later and swap this block for an image</div>
                  <div className="placeholder-path">Suggested path: /images/dinning-map.png</div>
                </div>
              </div>

              <div className="concept-stack" id="concepts">
                <article className="concept-card box">
                  <div className="card-image-placeholder">
                    <div>
                      <div className="card-image-placeholder-title">The Tent Image Placeholder</div>
                      <span className="card-image-placeholder-path">Suggested path: /images/the-tent.png</span>
                    </div>
                  </div>

                  <h2 className="section-title">The Tent</h2>
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

                <article className="concept-card box">
                  <div className="card-image-placeholder">
                    <div>
                      <div className="card-image-placeholder-title">Chef&apos;s Studio Image Placeholder</div>
                      <span className="card-image-placeholder-path">Suggested path: /images/chefs-studio.png</span>
                    </div>
                  </div>

                  <h2 className="section-title">Chef&apos;s Studio</h2>
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

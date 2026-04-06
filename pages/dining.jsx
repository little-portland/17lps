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
            --paper: #f2efe6;
            --paper-shadow: #e5dece;
            --ink: #17110d;
            --pink: #ff4aa2;
            --pink-deep: #f23893;
            --blue: #3948b8;
            --blue-deep: #25358f;
            --muted: rgba(23, 17, 13, 0.52);
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
            25% { transform: translate(-0.5%, 0.4%); }
            50% { transform: translate(0.4%, -0.4%); }
            75% { transform: translate(0.3%, 0.5%); }
            100% { transform: translate(0, 0); }
          }

          @keyframes glitchDrift {
            0%, 100% { transform: translateX(0); opacity: 0.08; }
            20% { transform: translateX(-2px); opacity: 0.12; }
            40% { transform: translateX(1px); opacity: 0.05; }
            60% { transform: translateX(-1px); opacity: 0.1; }
            80% { transform: translateX(2px); opacity: 0.06; }
          }

          @keyframes pulseBadge {
            0%, 100% { transform: translateY(-50%); }
            50% { transform: translateY(calc(-50% - 2px)); }
          }

          .dining-page {
            min-height: 100vh;
            padding: 26px 14px 36px;
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
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220' viewBox='0 0 220 220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.35' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
            mix-blend-mode: multiply;
            animation: grainShift 0.42s steps(2, end) infinite;
          }

          .dining-page::after {
            background:
              linear-gradient(90deg, transparent 0%, rgba(255,74,162,0.08) 20%, transparent 40%, rgba(57,72,184,0.06) 58%, transparent 78%, rgba(255,74,162,0.08) 100%),
              radial-gradient(circle at 18% 22%, rgba(0,0,0,0.04) 0 1px, transparent 2px),
              radial-gradient(circle at 74% 15%, rgba(0,0,0,0.035) 0 1px, transparent 2px),
              radial-gradient(circle at 68% 62%, rgba(0,0,0,0.03) 0 1px, transparent 2px),
              radial-gradient(circle at 34% 78%, rgba(0,0,0,0.025) 0 1px, transparent 2px);
            background-size: 100% 100%, 260px 260px, 320px 320px, 280px 280px, 340px 340px;
            opacity: 0.42;
            animation: glitchDrift 6s steps(2, end) infinite;
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
              radial-gradient(circle at 50% 35%, rgba(57,72,184,0.06), transparent 18%),
              radial-gradient(circle at 50% 72%, rgba(255,74,162,0.08), transparent 22%);
            opacity: 0.8;
          }

          .content {
            position: relative;
            z-index: 1;
          }

          .hero {
            text-align: center;
            margin-bottom: 34px;
            position: relative;
          }

          .hero::before {
            content: "";
            position: absolute;
            left: 50%;
            top: 46%;
            width: min(56vw, 520px);
            aspect-ratio: 1 / 1;
            transform: translate(-50%, -50%);
            border-radius: 50%;
            background:
              radial-gradient(circle, rgba(57,72,184,0.15) 0 22%, rgba(57,72,184,0.08) 22% 46%, transparent 46% 100%),
              repeating-conic-gradient(from 0deg, rgba(57,72,184,0.9) 0deg 8deg, transparent 8deg 16deg);
            opacity: 0.95;
            z-index: 0;
          }

          .hero-inner {
            position: relative;
            z-index: 1;
            padding: 4px 0 10px;
          }

          .hero-title,
          .section-title,
          .schedule-head,
          .schedule-subhead,
          .schedule-time,
          .placeholder-title,
          .card-image-placeholder-title,
          .bullet-list li,
          .card-links a,
          .explore-link,
          .card-copy {
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
            text-transform: uppercase;
          }

          .hero-title {
            margin: 0;
            color: var(--pink);
            font-size: clamp(60px, 12vw, 152px);
            letter-spacing: 0.02em;
            line-height: 0.9;
          }

          .hero-address {
            margin-top: 14px;
            color: var(--blue);
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            font-size: clamp(18px, 2.6vw, 34px);
            line-height: 1;
          }

          .tagline {
            text-align: center;
            margin: 22px 0 24px;
            color: var(--pink);
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
            text-transform: uppercase;
            font-size: clamp(22px, 3.4vw, 46px);
            line-height: 0.94;
            letter-spacing: 0.02em;
          }

          .schedule-section,
          .explore-wrap,
          .placeholder-panel,
          .concept-card {
            margin-bottom: 18px;
          }

          .box {
            position: relative;
            background: rgba(255,255,255,0.26);
            border: 1px solid rgba(23,17,13,0.1);
            box-shadow: inset 0 0 0 1px rgba(255,255,255,0.18);
          }

          .box::before {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            background: linear-gradient(90deg, rgba(255,74,162,0.03), transparent 34%, rgba(57,72,184,0.03) 66%, transparent);
            mix-blend-mode: multiply;
          }

          .schedule-box {
            padding: 20px 18px 18px;
            background: rgba(255,255,255,0.14);
          }

          .schedule-head {
            text-align: center;
            color: var(--ink);
            letter-spacing: 0.02em;
            font-size: clamp(32px, 4vw, 68px);
            line-height: 0.92;
            margin-bottom: 10px;
          }

          .schedule-subhead {
            text-align: center;
            color: var(--pink);
            letter-spacing: 0.02em;
            font-size: clamp(18px, 2vw, 28px);
            line-height: 0.92;
            margin-bottom: 16px;
          }

          .schedule-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
            align-items: end;
          }

          .schedule-item {
            text-align: center;
            padding: 8px 6px;
          }

          .schedule-title {
            color: var(--ink);
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
            font-size: clamp(22px, 2.4vw, 40px);
            line-height: 0.94;
            min-height: 2em;
            text-transform: none;
          }

          .schedule-time {
            color: var(--blue);
            font-size: clamp(46px, 5vw, 82px);
            margin-top: 14px;
            letter-spacing: 0.01em;
            line-height: 0.92;
          }

          .explore-wrap {
            position: relative;
          }

          .explore-wrap::before,
          .explore-wrap::after {
            content: "";
            position: absolute;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: var(--pink);
            top: 50%;
            transform: translateY(-50%);
            animation: pulseBadge 2.6s ease-in-out infinite;
          }

          .explore-wrap::before {
            left: -22px;
          }

          .explore-wrap::after {
            right: -22px;
          }

          .explore-link {
            display: block;
            padding: 18px 18px 20px;
            text-align: center;
            color: var(--paper);
            background: linear-gradient(90deg, var(--blue-deep), var(--blue), var(--pink-deep));
            border: 2px solid rgba(23,17,13,0.08);
            box-shadow: 0 6px 0 rgba(23,17,13,0.08);
            letter-spacing: 0.02em;
            font-size: clamp(24px, 2.8vw, 42px);
            line-height: 0.92;
          }

          .explore-link:hover {
            filter: brightness(1.02);
            transform: translateY(-1px);
          }

          .placeholder-panel {
            padding: 34px 20px;
            text-align: center;
            background: rgba(255,255,255,0.2);
          }

          .placeholder-title,
          .card-image-placeholder-title {
            color: var(--pink);
            font-size: clamp(34px, 4.8vw, 72px);
            letter-spacing: 0.02em;
            line-height: 0.92;
          }

          .placeholder-copy,
          .placeholder-path,
          .card-image-placeholder-path,
          .card-subtitle {
            color: var(--muted);
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
            text-transform: uppercase;
            letter-spacing: 0.04em;
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
            gap: 22px;
          }

          .concept-card {
            padding: 18px;
            background: rgba(255,255,255,0.2);
          }

          .card-image-placeholder {
            min-height: 170px;
            display: grid;
            place-items: center;
            text-align: center;
            padding: 16px;
            margin-bottom: 18px;
            border: 1px solid rgba(23,17,13,0.14);
            background: rgba(255,255,255,0.14);
          }

          .section-title {
            color: var(--blue);
            font-size: clamp(32px, 4.2vw, 68px);
            letter-spacing: 0.01em;
            line-height: 0.92;
            margin: 0;
          }

          .card-subtitle {
            margin-top: 8px;
            font-size: clamp(18px, 1.9vw, 26px);
            line-height: 1.05;
          }

          .card-copy {
            margin: 20px 0 20px;
            color: var(--ink);
            font-size: clamp(22px, 2.2vw, 36px);
            line-height: 1.06;
            max-width: 30ch;
            letter-spacing: 0.01em;
          }

          .bullet-list {
            list-style: none;
            margin: 0 0 18px;
            padding: 0;
          }

          .bullet-list li {
            margin-bottom: 10px;
            color: var(--blue);
            font-size: clamp(24px, 2.2vw, 36px);
            letter-spacing: 0.01em;
            line-height: 0.92;
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
            font-size: clamp(22px, 2vw, 30px);
            line-height: 0.92;
            letter-spacing: 0.01em;
          }

          .card-links a:hover {
            color: var(--blue);
          }

          @media (max-width: 760px) {
            .dining-page {
              padding: 18px 10px 28px;
            }

            .hero::before {
              width: min(78vw, 420px);
            }

            .schedule-grid {
              grid-template-columns: 1fr;
            }

            .explore-wrap::before,
            .explore-wrap::after {
              display: none;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .dining-page::before,
            .dining-page::after,
            .explore-wrap::before,
            .explore-wrap::after {
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

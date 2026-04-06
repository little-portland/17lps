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
            --bg: #080808;
            --panel: #090909;
            --ink: #f1ede7;
            --magenta: #cc46b7;
            --teal: #10d6d8;
            --green: #1fe06a;
            --line: rgba(255, 255, 255, 0.12);
            --soft: rgba(255, 255, 255, 0.06);
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
            25% { transform: translate(-1%, 1%); }
            50% { transform: translate(1%, -1%); }
            75% { transform: translate(1%, 1%); }
            100% { transform: translate(0, 0); }
          }

          @keyframes glowPulse {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.32; }
          }

          .dining-page {
            min-height: 100vh;
            background:
              radial-gradient(circle at 20% 10%, rgba(204, 70, 183, 0.08), transparent 24%),
              radial-gradient(circle at 80% 85%, rgba(16, 214, 216, 0.05), transparent 26%),
              var(--bg);
            padding: 24px;
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
            opacity: 0.18;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220' viewBox='0 0 220 220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
            mix-blend-mode: screen;
            animation: grainShift 0.45s steps(2, end) infinite;
          }

          .dining-page::after {
            background: repeating-linear-gradient(
              to bottom,
              rgba(255,255,255,0.018) 0px,
              rgba(255,255,255,0.018) 1px,
              transparent 1px,
              transparent 4px
            );
            opacity: 0.18;
          }

          .shell {
            width: min(1080px, 100%);
            margin: 0 auto;
            position: relative;
            z-index: 1;
          }

          .poster {
            background: linear-gradient(to bottom, rgba(255,255,255,0.02), rgba(255,255,255,0.005)), var(--panel);
            border: 1px solid rgba(255,255,255,0.08);
            box-shadow: 0 0 0 1px rgba(255,255,255,0.03), 0 24px 60px rgba(0,0,0,0.45);
            overflow: hidden;
            position: relative;
          }

          .poster::before {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            background:
              radial-gradient(circle at 10% 20%, rgba(255,255,255,0.03), transparent 20%),
              radial-gradient(circle at 85% 25%, rgba(255,255,255,0.02), transparent 18%),
              radial-gradient(circle at 50% 75%, rgba(255,255,255,0.018), transparent 20%);
            opacity: 0.5;
          }

          .hero {
            padding: 38px 34px 28px;
            text-align: center;
            border-bottom: 1px solid var(--soft);
          }

          .hero-title,
          .section-title,
          .lineup-word {
            margin: 0;
            color: var(--magenta);
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
            text-transform: uppercase;
            letter-spacing: 0.03em;
            line-height: 0.88;
          }

          .hero-title {
            font-size: clamp(54px, 10vw, 112px);
          }

          .hero-address {
            margin-top: 12px;
            color: var(--teal);
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            font-size: clamp(22px, 3vw, 44px);
            line-height: 1;
          }

          .hero-tagline {
            margin: 26px auto 0;
            max-width: 820px;
            color: var(--ink);
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            font-size: clamp(24px, 4vw, 56px);
            line-height: 0.95;
          }

          .overview-grid {
            display: grid;
            grid-template-columns: 1.1fr 0.9fr;
            gap: 0;
            border-bottom: 1px solid var(--soft);
          }

          .schedule-panel,
          .lineup-panel {
            padding: 28px 28px 30px;
            min-width: 0;
          }

          .schedule-panel {
            border-right: 1px solid var(--soft);
          }

          .eyebrow {
            color: var(--green);
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            font-size: clamp(22px, 2.6vw, 38px);
            margin-bottom: 24px;
            line-height: 1;
          }

          .schedule-list {
            display: grid;
            gap: 16px;
          }

          .schedule-item {
            display: grid;
            grid-template-columns: 130px 1fr;
            gap: 18px;
            align-items: start;
            padding-top: 14px;
            border-top: 1px solid rgba(255,255,255,0.09);
          }

          .schedule-time {
            color: var(--teal);
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
            font-size: clamp(34px, 4vw, 60px);
            line-height: 0.9;
            letter-spacing: 0.03em;
          }

          .schedule-copy-title {
            color: var(--ink);
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
            font-size: clamp(26px, 3vw, 42px);
            line-height: 0.95;
            text-transform: uppercase;
            margin-bottom: 6px;
          }

          .schedule-copy-sub {
            color: rgba(241,237,231,0.78);
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.1em;
          }

          .radar-wrap {
            position: relative;
            margin: 8px auto 24px;
            width: min(100%, 380px);
            aspect-ratio: 1 / 1;
          }

          .radar-ring,
          .radar-spoke,
          .radar-core {
            position: absolute;
            inset: 0;
            border-radius: 50%;
          }

          .radar-ring.r1 { inset: 0; border: 2px solid rgba(255,255,255,0.9); }
          .radar-ring.r2 { inset: 16%; border: 2px solid rgba(255,255,255,0.9); }
          .radar-ring.r3 { inset: 32%; border: 2px solid rgba(255,255,255,0.9); }
          .radar-ring.r4 { inset: 46%; border: 2px solid rgba(255,255,255,0.9); }

          .radar-core {
            inset: 47.5%;
            background: var(--teal);
            border: none;
            z-index: 2;
          }

          .radar-spoke {
            border-radius: 0;
            inset: 0;
          }

          .radar-spoke::before {
            content: "";
            position: absolute;
            left: 50%;
            top: 0;
            width: 2px;
            height: 50%;
            background: rgba(255,255,255,0.86);
            transform-origin: bottom center;
          }

          .radar-spoke.s1::before { transform: translateX(-50%) rotate(0deg); }
          .radar-spoke.s2::before { transform: translateX(-50%) rotate(30deg); }
          .radar-spoke.s3::before { transform: translateX(-50%) rotate(60deg); }
          .radar-spoke.s4::before { transform: translateX(-50%) rotate(90deg); }
          .radar-spoke.s5::before { transform: translateX(-50%) rotate(120deg); }
          .radar-spoke.s6::before { transform: translateX(-50%) rotate(150deg); }

          .lineup-side-label {
            position: absolute;
            top: 50%;
            color: var(--teal);
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
            font-size: clamp(20px, 2.2vw, 34px);
            text-transform: uppercase;
            letter-spacing: 0.03em;
            line-height: 0.95;
            transform-origin: center;
            white-space: nowrap;
          }

          .lineup-side-label.left {
            left: -8px;
            transform: translate(-34%, -50%) rotate(-78deg);
          }

          .lineup-side-label.right {
            right: -8px;
            transform: translate(34%, -50%) rotate(78deg);
          }

          .lineup-block {
            margin-top: 26px;
          }

          .lineup-caption {
            color: var(--green);
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
            text-transform: uppercase;
            font-size: clamp(24px, 2.4vw, 38px);
            line-height: 0.95;
            margin-bottom: 8px;
          }

          .lineup-word {
            font-size: clamp(48px, 6vw, 86px);
            margin-bottom: 4px;
          }

          .explore-wrap {
            padding: 26px 28px 30px;
            border-bottom: 1px solid var(--soft);
          }

          .explore-link {
            display: inline-block;
            color: var(--teal);
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
            text-transform: uppercase;
            font-size: clamp(24px, 3.4vw, 52px);
            line-height: 0.95;
            letter-spacing: 0.04em;
          }

          .explore-link:hover {
            opacity: 0.82;
          }

          .map-zone,
          .cards-section {
            padding: 28px;
          }

          .cards-section {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 22px;
            padding-top: 0;
          }

          .placeholder-panel,
          .info-card {
            min-width: 0;
            background: rgba(0,0,0,0.45);
            border: 1px solid rgba(255,255,255,0.1);
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
              rgba(255,255,255,0.02) 0px,
              rgba(255,255,255,0.02) 1px,
              transparent 1px,
              transparent 4px
            );
            opacity: 0.16;
          }

          .placeholder-panel {
            min-height: 520px;
            display: grid;
            place-items: center;
            text-align: center;
            padding: 24px;
          }

          .placeholder-title {
            color: var(--magenta);
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
            text-transform: uppercase;
            font-size: clamp(34px, 4vw, 60px);
            line-height: 0.92;
            margin-bottom: 12px;
          }

          .placeholder-copy {
            color: var(--teal);
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
            text-transform: uppercase;
            font-size: clamp(20px, 2.2vw, 30px);
            line-height: 1;
          }

          .placeholder-path {
            margin-top: 14px;
            color: rgba(241,237,231,0.72);
            font-size: 13px;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }

          .info-card {
            padding: 26px 24px 28px;
          }

          .card-image-placeholder {
            min-height: 220px;
            border: 1px dashed rgba(255,255,255,0.16);
            display: grid;
            place-items: center;
            margin-bottom: 22px;
            position: relative;
            z-index: 1;
            text-align: center;
            padding: 18px;
          }

          .card-image-placeholder-title {
            color: var(--magenta);
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
            text-transform: uppercase;
            font-size: clamp(28px, 3vw, 44px);
            line-height: 0.95;
          }

          .card-image-placeholder-path {
            display: block;
            margin-top: 10px;
            color: rgba(241,237,231,0.65);
            font-size: 12px;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }

          .card-title {
            position: relative;
            z-index: 1;
            color: var(--green);
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
            text-transform: uppercase;
            font-size: clamp(30px, 3vw, 48px);
            line-height: 0.95;
            margin: 0 0 10px;
          }

          .card-subtitle {
            position: relative;
            z-index: 1;
            color: var(--teal);
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
            text-transform: uppercase;
            font-size: clamp(18px, 1.8vw, 24px);
            letter-spacing: 0.06em;
            margin-bottom: 18px;
          }

          .card-copy {
            position: relative;
            z-index: 1;
            color: rgba(241,237,231,0.88);
            font-size: 16px;
            line-height: 1.5;
            margin: 0 0 20px;
            max-width: 52ch;
          }

          .bullet-list {
            position: relative;
            z-index: 1;
            list-style: none;
            margin: 0 0 22px;
            padding: 0;
          }

          .bullet-list li {
            color: var(--magenta);
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
            text-transform: uppercase;
            font-size: clamp(22px, 2.2vw, 32px);
            line-height: 0.96;
            margin-bottom: 10px;
          }

          .bullet-list li::before {
            content: "+ ";
            color: var(--teal);
          }

          .card-links {
            position: relative;
            z-index: 1;
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
          }

          .card-links a {
            color: var(--teal);
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
            text-transform: uppercase;
            font-size: clamp(18px, 1.9vw, 24px);
            line-height: 1;
          }

          .card-links a:hover {
            opacity: 0.78;
          }

          .footer-note {
            padding: 0 28px 28px;
            color: rgba(241,237,231,0.58);
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.08em;
          }

          @media (max-width: 900px) {
            .overview-grid,
            .cards-section {
              grid-template-columns: 1fr;
            }

            .schedule-panel {
              border-right: none;
              border-bottom: 1px solid var(--soft);
            }
          }

          @media (max-width: 720px) {
            .dining-page {
              padding: 10px;
            }

            .hero,
            .schedule-panel,
            .lineup-panel,
            .explore-wrap,
            .map-zone,
            .cards-section,
            .footer-note {
              padding-left: 16px;
              padding-right: 16px;
            }

            .schedule-item {
              grid-template-columns: 1fr;
              gap: 8px;
            }

            .lineup-side-label {
              display: none;
            }

            .placeholder-panel {
              min-height: 340px;
            }

            .card-image-placeholder {
              min-height: 150px;
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
            <div className="hero">
              <h1 className="hero-title">DINING AT</h1>
              <div className="hero-address">17 LITTLE PORTLAND STREET</div>
              <div className="hero-tagline">More than a meal. Step into the void.</div>
            </div>

            <div className="overview-grid">
              <div className="schedule-panel">
                <div className="eyebrow">Open Thursdays to Saturdays</div>

                <div className="schedule-list">
                  <div className="schedule-item">
                    <div className="schedule-time">20:00</div>
                    <div>
                      <div className="schedule-copy-title">Chef&apos;s Studio</div>
                      <div className="schedule-copy-sub">Nightly dining sequence</div>
                    </div>
                  </div>

                  <div className="schedule-item">
                    <div className="schedule-time">20:30</div>
                    <div>
                      <div className="schedule-copy-title">Dinner in The Tent</div>
                      <div className="schedule-copy-sub">Futurist menu service</div>
                    </div>
                  </div>

                  <div className="schedule-item">
                    <div className="schedule-time">22:00</div>
                    <div>
                      <div className="schedule-copy-title">Club Opens</div>
                      <div className="schedule-copy-sub">Post-dinner transition</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lineup-panel">
                <div className="eyebrow">Night transmission</div>

                <div className="radar-wrap" aria-hidden="true">
                  <div className="radar-ring r1" />
                  <div className="radar-ring r2" />
                  <div className="radar-ring r3" />
                  <div className="radar-ring r4" />
                  <div className="radar-spoke s1" />
                  <div className="radar-spoke s2" />
                  <div className="radar-spoke s3" />
                  <div className="radar-spoke s4" />
                  <div className="radar-spoke s5" />
                  <div className="radar-spoke s6" />
                  <div className="radar-core" />
                  <div className="lineup-side-label left">Thursday 22.12.22</div>
                  <div className="lineup-side-label right">17 Little Portland Street</div>
                </div>

                <div className="lineup-block">
                  <div className="lineup-caption">In The Tent</div>
                  <div className="lineup-word">Jack D,</div>
                  <div className="lineup-word">Jack Swash, KT</div>
                </div>
              </div>
            </div>

            <div className="explore-wrap">
              <a className="explore-link" href="#concepts">Explore our futurist dining concept</a>
            </div>

            <div className="map-zone">
              <div className="placeholder-panel" aria-label="Venue map placeholder">
                <div>
                  <div className="placeholder-title">Venue map placeholder</div>
                  <div className="placeholder-copy">Add your PNG later and swap this block for an image</div>
                  <div className="placeholder-path">Suggested path: /images/dinning-map.png</div>
                </div>
              </div>
            </div>

            <div className="cards-section" id="concepts">
              <article className="info-card">
                <div className="card-image-placeholder">
                  <div>
                    <div className="card-image-placeholder-title">The Tent image placeholder</div>
                    <span className="card-image-placeholder-path">Suggested path: /images/the-tent.png</span>
                  </div>
                </div>

                <h2 className="card-title">The Tent</h2>
                <div className="card-subtitle">At the End of the Universe</div>

                <p className="card-copy">
                  In a floating tent, lost in space, futurist menus set the stage for a sensorial
                  experience as dinner transitions into a hypnotic after-dark mode.
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
                    <div className="card-image-placeholder-title">Chef&apos;s Studio image placeholder</div>
                    <span className="card-image-placeholder-path">Suggested path: /images/chefs-studio.png</span>
                  </div>
                </div>

                <h2 className="card-title">Chef&apos;s Studio</h2>
                <div className="card-subtitle">Where the heads dine</div>

                <p className="card-copy">
                  Chef&apos;s Studio is an intimate and futuristic space beneath The Tent — the table of
                  choice for those in the know.
                </p>

                <ul className="bullet-list">
                  <li>£65pp Set Dinner</li>
                  <li>Futurist Menu</li>
                  <li>6-12 Pax</li>
                  <li>8pm Start</li>
                </ul>

                <div className="card-links">
                  <a href="#">[Book]</a>
                  <a href="#">[Menu]</a>
                  <a href="#">[Explore Chef&apos;s Studio]</a>
                </div>
              </article>
            </div>

            <div className="footer-note">Poster-inspired layout with image placeholders ready for later asset drops.</div>
          </section>
        </div>
      </main>
    </>
  );
};

export default DinningPage;

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
            --bg: #07070b;
            --bg-2: #0d0b14;
            --panel: rgba(10, 10, 16, 0.76);
            --panel-strong: rgba(12, 12, 20, 0.9);
            --text: #f6efe6;
            --muted: rgba(246, 239, 230, 0.72);
            --cyan: #57e3f3;
            --magenta: #ff4fa3;
            --violet: #7f61ff;
            --gold: #ffbf66;
            --line: rgba(87, 227, 243, 0.22);
            --shadow: rgba(0, 0, 0, 0.45);
          }

          html {
            background: var(--bg) !important;
            overflow-x: hidden !important;
          }

          body {
            margin: 0;
            background: radial-gradient(circle at top, #151122 0%, var(--bg) 42%) !important;
            color: var(--text);
            overflow-x: hidden !important;
            font-family: Inter, Arial, Helvetica, sans-serif;
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
            50% { transform: translate(0.35%, -0.35%); }
            75% { transform: translate(0.45%, 0.25%); }
            100% { transform: translate(0, 0); }
          }

          @keyframes drift {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }

          @keyframes glowPulse {
            0%, 100% { opacity: 0.72; }
            50% { opacity: 1; }
          }

          @keyframes scanLine {
            0% { transform: translateY(-120%); }
            100% { transform: translateY(120%); }
          }

          @keyframes buttonGlow {
            0%, 100% { box-shadow: 0 0 0 rgba(87,227,243,0), 0 0 24px rgba(255,79,163,0.18); }
            50% { box-shadow: 0 0 14px rgba(87,227,243,0.35), 0 0 32px rgba(255,79,163,0.28); }
          }

          .page {
            min-height: 100vh;
            position: relative;
            overflow: hidden;
            padding: 32px 16px 44px;
            background:
              radial-gradient(circle at 20% 15%, rgba(127,97,255,0.16), transparent 24%),
              radial-gradient(circle at 80% 20%, rgba(255,79,163,0.12), transparent 22%),
              radial-gradient(circle at 50% 85%, rgba(87,227,243,0.08), transparent 28%),
              linear-gradient(180deg, var(--bg-2) 0%, var(--bg) 100%);
          }

          .page::before,
          .page::after {
            content: "";
            position: fixed;
            inset: -10%;
            pointer-events: none;
            z-index: 0;
          }

          .page::before {
            opacity: 0.18;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220' viewBox='0 0 220 220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.25' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
            mix-blend-mode: screen;
            animation: grainShift 0.45s steps(2, end) infinite;
          }

          .page::after {
            background:
              radial-gradient(circle at 18% 24%, rgba(255,255,255,0.6) 0 1px, transparent 2px),
              radial-gradient(circle at 72% 16%, rgba(255,255,255,0.45) 0 1px, transparent 2px),
              radial-gradient(circle at 64% 62%, rgba(255,255,255,0.4) 0 1px, transparent 2px),
              radial-gradient(circle at 32% 76%, rgba(255,255,255,0.3) 0 1px, transparent 2px);
            background-size: 260px 260px, 320px 320px, 280px 280px, 340px 340px;
            opacity: 0.22;
          }

          .shell {
            width: min(1100px, 100%);
            margin: 0 auto;
            position: relative;
            z-index: 1;
          }

          .hero {
            position: relative;
            min-height: 420px;
            border: 1px solid rgba(255,255,255,0.08);
            background: linear-gradient(180deg, rgba(15,14,25,0.92), rgba(9,9,16,0.86));
            overflow: hidden;
            box-shadow: 0 24px 80px rgba(0,0,0,0.34);
            margin-bottom: 24px;
          }

          .hero::before {
            content: "";
            position: absolute;
            inset: 0;
            background:
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
            background-size: 56px 56px;
            opacity: 0.22;
          }

          .hero::after {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            height: 32%;
            pointer-events: none;
            background: linear-gradient(to bottom, rgba(87,227,243,0), rgba(87,227,243,0.1), rgba(255,79,163,0));
            opacity: 0.22;
            animation: scanLine 7s linear infinite;
          }

          .sun {
            position: absolute;
            right: 6%;
            top: 48px;
            width: min(42vw, 360px);
            aspect-ratio: 1 / 1;
            border-radius: 50%;
            background:
              radial-gradient(circle at 50% 45%, #ffd8a4 0%, #ffbf66 18%, #ff7ba7 52%, #ff4fa3 75%, rgba(255,79,163,0) 78%);
            filter: blur(0.5px);
            opacity: 0.92;
            animation: glowPulse 5s ease-in-out infinite, drift 9s ease-in-out infinite;
          }

          .sun-rings {
            position: absolute;
            right: 3%;
            top: 22px;
            width: min(50vw, 430px);
            aspect-ratio: 1 / 1;
            border-radius: 50%;
            border: 1px solid rgba(87,227,243,0.24);
            box-shadow: 0 0 0 32px rgba(87,227,243,0.06), 0 0 0 64px rgba(127,97,255,0.04);
            opacity: 0.65;
            animation: drift 10s ease-in-out infinite;
          }

          .hero-inner {
            position: relative;
            z-index: 1;
            display: grid;
            grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
            min-height: 420px;
          }

          .hero-copy {
            padding: 42px 38px 34px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 18px;
          }

          .eyebrow {
            color: var(--cyan);
            font-size: 14px;
            letter-spacing: 0.28em;
            text-transform: uppercase;
            font-weight: 700;
          }

          .title {
            margin: 0;
            font-size: clamp(48px, 9vw, 110px);
            line-height: 0.9;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            font-weight: 900;
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
            color: var(--text);
            text-shadow: 0 0 18px rgba(87,227,243,0.12);
          }

          .title .accent {
            color: var(--magenta);
          }

          .subtitle {
            color: var(--gold);
            font-size: clamp(22px, 3vw, 38px);
            line-height: 0.94;
            text-transform: uppercase;
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
            letter-spacing: 0.04em;
            max-width: 11ch;
          }

          .hero-meta {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
            margin-top: 8px;
          }

          .pill {
            display: inline-flex;
            align-items: center;
            padding: 10px 14px;
            border: 1px solid rgba(255,255,255,0.1);
            background: rgba(255,255,255,0.04);
            color: var(--muted);
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            font-weight: 700;
          }

          .schedule {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 18px;
            margin-bottom: 22px;
          }

          .schedule-card,
          .cta-panel,
          .placeholder,
          .concept-card {
            border: 1px solid rgba(255,255,255,0.08);
            background: var(--panel);
            position: relative;
            overflow: hidden;
            box-shadow: 0 16px 40px rgba(0,0,0,0.2);
          }

          .schedule-card::before,
          .cta-panel::before,
          .placeholder::before,
          .concept-card::before {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            background: linear-gradient(135deg, rgba(87,227,243,0.08), transparent 42%, rgba(255,79,163,0.08));
            opacity: 0.75;
          }

          .schedule-card-inner {
            position: relative;
            z-index: 1;
            padding: 22px 20px 18px;
            min-height: 220px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          .schedule-kicker {
            color: var(--magenta);
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.18em;
            font-weight: 800;
          }

          .schedule-label {
            color: var(--text);
            font-size: clamp(26px, 2.7vw, 42px);
            line-height: 0.95;
            text-transform: uppercase;
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
          }

          .schedule-time {
            color: var(--cyan);
            font-size: clamp(44px, 4.2vw, 70px);
            line-height: 0.9;
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
            text-transform: uppercase;
            letter-spacing: 0.03em;
          }

          .cta-panel {
            margin-bottom: 22px;
            position: relative;
          }

          .cta-link {
            position: relative;
            z-index: 1;
            display: block;
            padding: 22px 26px;
            background: linear-gradient(90deg, rgba(127,97,255,0.94), rgba(255,79,163,0.94));
            color: #fff;
            text-align: center;
            font-size: clamp(24px, 2.7vw, 42px);
            line-height: 0.92;
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
            text-transform: uppercase;
            letter-spacing: 0.03em;
            animation: buttonGlow 3.8s ease-in-out infinite;
          }

          .cta-link:hover {
            filter: brightness(1.04);
            transform: translateY(-1px);
          }

          .placeholder {
            margin-bottom: 22px;
          }

          .placeholder-inner {
            position: relative;
            z-index: 1;
            min-height: 260px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 28px 20px;
          }

          .placeholder-title {
            color: var(--magenta);
            font-size: clamp(34px, 4vw, 58px);
            line-height: 0.92;
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
            text-transform: uppercase;
            letter-spacing: 0.02em;
          }

          .placeholder-copy {
            margin-top: 10px;
            color: var(--muted);
            font-size: 14px;
            line-height: 1.35;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            font-weight: 700;
          }

          .placeholder-path {
            margin-top: 10px;
            color: rgba(246,239,230,0.5);
            font-size: 11px;
            line-height: 1.2;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            font-weight: 700;
          }

          .concept-stack {
            display: grid;
            gap: 22px;
          }

          .concept-card-inner {
            position: relative;
            z-index: 1;
            padding: 20px;
            display: grid;
            grid-template-columns: minmax(260px, 0.9fr) minmax(0, 1.1fr);
            gap: 24px;
            align-items: start;
          }

          .image-placeholder {
            min-height: 220px;
            border: 1px solid rgba(87,227,243,0.24);
            background:
              radial-gradient(circle at 30% 20%, rgba(255,79,163,0.16), transparent 30%),
              radial-gradient(circle at 70% 80%, rgba(87,227,243,0.14), transparent 36%),
              rgba(255,255,255,0.03);
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 18px;
          }

          .image-placeholder-title {
            color: var(--gold);
            font-size: clamp(26px, 3vw, 40px);
            line-height: 0.94;
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
            text-transform: uppercase;
            letter-spacing: 0.03em;
          }

          .image-placeholder-path {
            display: block;
            margin-top: 10px;
            color: rgba(246,239,230,0.54);
            font-size: 11px;
            line-height: 1.2;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            font-weight: 700;
          }

          .concept-kicker {
            color: var(--cyan);
            font-size: 14px;
            line-height: 1;
            text-transform: uppercase;
            letter-spacing: 0.18em;
            font-weight: 800;
            margin-bottom: 10px;
          }

          .concept-title {
            margin: 0;
            color: var(--text);
            font-size: clamp(34px, 4.6vw, 72px);
            line-height: 0.9;
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
            text-transform: uppercase;
            letter-spacing: 0.02em;
          }

          .concept-subtitle {
            margin-top: 8px;
            color: var(--gold);
            font-size: clamp(14px, 1.5vw, 20px);
            text-transform: uppercase;
            letter-spacing: 0.14em;
            font-weight: 800;
          }

          .concept-copy {
            margin: 18px 0 18px;
            color: var(--muted);
            font-size: clamp(18px, 1.75vw, 24px);
            line-height: 1.35;
            font-weight: 700;
            max-width: 34ch;
          }

          .feature-list {
            list-style: none;
            padding: 0;
            margin: 0 0 18px;
            display: grid;
            gap: 8px;
          }

          .feature-list li {
            color: var(--cyan);
            font-size: clamp(18px, 1.9vw, 28px);
            line-height: 1;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
          }

          .feature-list li::before {
            content: "◦ ";
            color: var(--magenta);
          }

          .link-row {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
          }

          .link-row a {
            color: var(--magenta);
            font-size: clamp(18px, 1.85vw, 26px);
            line-height: 1;
            text-transform: uppercase;
            letter-spacing: 0.03em;
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
          }

          .link-row a:hover {
            color: var(--gold);
          }

          @media (max-width: 900px) {
            .hero-inner {
              grid-template-columns: 1fr;
              min-height: auto;
            }

            .sun,
            .sun-rings {
              position: relative;
              right: auto;
              top: auto;
              margin: 12px auto 22px;
              width: min(72vw, 360px);
            }

            .schedule {
              grid-template-columns: 1fr;
            }

            .concept-card-inner {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 640px) {
            .page {
              padding: 14px 10px 28px;
            }

            .hero-copy {
              padding: 28px 18px 22px;
            }

            .schedule-card-inner,
            .placeholder-inner,
            .concept-card-inner {
              padding-left: 16px;
              padding-right: 16px;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .page::before,
            .hero::after,
            .sun,
            .sun-rings,
            .cta-link {
              animation: none !important;
            }
          }
        `}</style>
      </Head>

      <main className="page">
        <div className="shell">
          <section className="hero">
            <div className="sun-rings" aria-hidden="true" />
            <div className="hero-inner">
              <div className="hero-copy">
                <div className="eyebrow">17 Little Portland Street</div>
                <h1 className="title">
                  <span className="accent">Dining</span> At
                </h1>
                <div className="subtitle">More than a meal. Step into the void.</div>
                <div className="hero-meta">
                  <div className="pill">Open Thursdays to Saturdays</div>
                  <div className="pill">Nightly schedule from 20:00</div>
                </div>
              </div>
              <div className="sun" aria-hidden="true" />
            </div>
          </section>

          <section className="schedule">
            <article className="schedule-card">
              <div className="schedule-card-inner">
                <div>
                  <div className="schedule-kicker">Nightly schedule</div>
                  <div className="schedule-label">Chef&apos;s Studio</div>
                </div>
                <div className="schedule-time">20:00</div>
              </div>
            </article>

            <article className="schedule-card">
              <div className="schedule-card-inner">
                <div>
                  <div className="schedule-kicker">Nightly schedule</div>
                  <div className="schedule-label">Dinner in The Tent</div>
                </div>
                <div className="schedule-time">20:30</div>
              </div>
            </article>

            <article className="schedule-card">
              <div className="schedule-card-inner">
                <div>
                  <div className="schedule-kicker">Nightly schedule</div>
                  <div className="schedule-label">Club Opens</div>
                </div>
                <div className="schedule-time">22:00</div>
              </div>
            </article>
          </section>

          <section className="cta-panel">
            <a className="cta-link" href="#concepts">Explore our futurist dining concept</a>
          </section>

          <section className="placeholder" aria-label="Venue map placeholder">
            <div className="placeholder-inner">
              <div className="placeholder-title">Venue Map Placeholder</div>
              <div className="placeholder-copy">Add your PNG later and swap this block for an image</div>
              <div className="placeholder-path">Suggested path: /images/dinning-map.png</div>
            </div>
          </section>

          <section className="concept-stack" id="concepts">
            <article className="concept-card">
              <div className="concept-card-inner">
                <div className="image-placeholder">
                  <div>
                    <div className="image-placeholder-title">The Tent Image Placeholder</div>
                    <span className="image-placeholder-path">Suggested path: /images/the-tent.png</span>
                  </div>
                </div>

                <div>
                  <div className="concept-kicker">Dining concept</div>
                  <h2 className="concept-title">The Tent</h2>
                  <div className="concept-subtitle">at the End of the Universe</div>

                  <p className="concept-copy">
                    In a floating tent, lost in space, futurist menus set the stage for a sensorial
                    experience as dinner seamlessly transitions into our hypnotic after-dark mode - a
                    cosmic journey.
                  </p>

                  <ul className="feature-list">
                    <li>£65pp Set Dinner</li>
                    <li>Futurist Menu</li>
                    <li>8:30pm Start</li>
                    <li>Club Access Included</li>
                  </ul>

                  <div className="link-row">
                    <a href="#">[Book]</a>
                    <a href="#">[Menu]</a>
                    <a href="#">[Explore The Tent]</a>
                  </div>
                </div>
              </div>
            </article>

            <article className="concept-card">
              <div className="concept-card-inner">
                <div className="image-placeholder">
                  <div>
                    <div className="image-placeholder-title">Chef&apos;s Studio Image Placeholder</div>
                    <span className="image-placeholder-path">Suggested path: /images/chefs-studio.png</span>
                  </div>
                </div>

                <div>
                  <div className="concept-kicker">Dining concept</div>
                  <h2 className="concept-title">Chef&apos;s Studio</h2>
                  <div className="concept-subtitle">Where the Heads Dine</div>

                  <p className="concept-copy">
                    Chef&apos;s Studio is an intimate and futuristic space beneath The Tent - the table of
                    choice for those in the know.
                  </p>

                  <ul className="feature-list">
                    <li>£65pp Set Dinner</li>
                    <li>Futurist Menu</li>
                    <li>6-12 PAX</li>
                    <li>8pm Start</li>
                  </ul>

                  <div className="link-row">
                    <a href="#">[Book]</a>
                    <a href="#">[Menu]</a>
                    <a href="#">[Explore Chef&apos;s Studio]</a>
                  </div>
                </div>
              </div>
            </article>
          </section>
        </div>
      </main>
    </>
  );
};

export default DinningPage;

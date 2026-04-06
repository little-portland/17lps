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
            --bg: #0a0207;
            --bg-deep: #050104;
            --red: #ff215d;
            --red-hot: #ff3b70;
            --red-dark: #c90d3f;
            --ink: #050505;
            --paper: #ffd8e3;
            --cyan: #45d8f1;
            --coral: #ff8c73;
            --line: rgba(255, 35, 93, 0.65);
            --line-soft: rgba(255, 35, 93, 0.24);
          }

          html {
            background: var(--bg) !important;
            overflow-x: hidden !important;
          }

          body {
            margin: 0;
            background: var(--bg) !important;
            color: var(--paper);
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
            25% { transform: translate(-0.5%, 0.4%); }
            50% { transform: translate(0.4%, -0.5%); }
            75% { transform: translate(0.5%, 0.3%); }
            100% { transform: translate(0, 0); }
          }

          .dining-page {
            min-height: 100vh;
            padding: 18px 12px;
            position: relative;
            background:
              radial-gradient(circle at 50% 12%, rgba(255, 35, 93, 0.12), transparent 18%),
              radial-gradient(circle at 50% 85%, rgba(255, 35, 93, 0.1), transparent 18%),
              linear-gradient(180deg, var(--bg) 0%, var(--bg-deep) 100%);
            overflow: hidden;
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
            opacity: 0.24;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220' viewBox='0 0 220 220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
            mix-blend-mode: screen;
            animation: grainMove 0.45s steps(2, end) infinite;
          }

          .dining-page::after {
            background:
              radial-gradient(circle at 14% 20%, rgba(255,255,255,0.42) 0 1px, transparent 2px),
              radial-gradient(circle at 74% 15%, rgba(255,255,255,0.35) 0 1px, transparent 2px),
              radial-gradient(circle at 68% 62%, rgba(255,255,255,0.28) 0 1px, transparent 2px),
              radial-gradient(circle at 34% 78%, rgba(255,255,255,0.22) 0 1px, transparent 2px);
            background-size: 280px 280px, 340px 340px, 260px 260px, 300px 300px;
            opacity: 0.24;
          }

          .shell {
            width: min(760px, 100%);
            margin: 0 auto;
            position: relative;
            z-index: 1;
          }

          .poster {
            position: relative;
            padding: 14px;
            background:
              linear-gradient(180deg, rgba(19, 4, 9, 0.92), rgba(6, 1, 5, 0.98));
            border: 1px solid rgba(255,255,255,0.04);
            box-shadow:
              inset 0 0 0 1px rgba(255,255,255,0.02),
              0 0 40px rgba(255, 35, 93, 0.08);
            overflow: hidden;
          }

          .warp-grid {
            position: absolute;
            inset: 0;
            pointer-events: none;
            overflow: hidden;
          }

          .warp-grid::before {
            content: "";
            position: absolute;
            left: 50%;
            top: 56%;
            width: 160%;
            height: 140%;
            transform: translate(-50%, -50%);
            background:
              repeating-linear-gradient(
                to right,
                transparent 0,
                transparent 28px,
                rgba(255, 35, 93, 0.72) 28px,
                rgba(255, 35, 93, 0.72) 30px,
                transparent 30px,
                transparent 58px
              ),
              repeating-linear-gradient(
                to bottom,
                transparent 0,
                transparent 24px,
                rgba(255, 35, 93, 0.72) 24px,
                rgba(255, 35, 93, 0.72) 26px,
                transparent 26px,
                transparent 50px
              );
            border-radius: 44% 56% 58% 42% / 34% 34% 66% 66%;
            filter: perspective(900px);
            opacity: 0.58;
            box-shadow: inset 0 0 80px rgba(255, 10, 60, 0.1);
          }

          .warp-grid::after {
            content: "";
            position: absolute;
            inset: 8% 10%;
            background:
              radial-gradient(circle at 50% 48%, rgba(255, 50, 95, 0.6), rgba(255, 15, 55, 0.35) 24%, rgba(255, 10, 45, 0.12) 38%, transparent 54%);
            filter: blur(18px);
            opacity: 0.88;
          }

          .content {
            position: relative;
            z-index: 1;
          }

          .box {
            position: relative;
            background: rgba(4, 1, 7, 0.82);
            border: 2px solid rgba(255, 35, 93, 0.78);
            box-shadow:
              inset 0 0 0 1px rgba(255,255,255,0.03),
              0 0 18px rgba(255, 35, 93, 0.08);
          }

          .box::before {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            background: repeating-linear-gradient(
              to bottom,
              rgba(255,255,255,0.016) 0px,
              rgba(255,255,255,0.016) 1px,
              transparent 1px,
              transparent 4px
            );
            opacity: 0.1;
          }

          .hero {
            text-align: center;
            padding: 10px 14px 14px;
            margin-bottom: 12px;
            background: linear-gradient(180deg, rgba(18, 7, 28, 0.82), rgba(7, 3, 15, 0.9));
          }

          .hero-title {
            margin: 0;
            color: var(--coral);
            font-size: clamp(34px, 8vw, 70px);
            line-height: 0.9;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-weight: 700;
            text-shadow: 0 0 16px rgba(255, 140, 115, 0.15);
          }

          .hero-address {
            margin-top: 10px;
            color: var(--cyan);
            font-size: clamp(13px, 2vw, 18px);
            line-height: 1;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-weight: 700;
          }

          .hero-tagline {
            margin: 16px auto 0;
            max-width: 620px;
            color: #c76b5d;
            font-size: clamp(16px, 3.2vw, 28px);
            line-height: 0.95;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            font-style: italic;
            text-shadow:
              0 1px 0 rgba(255,190,170,0.35),
              0 2px 0 rgba(126,58,50,0.9),
              -4px 6px 0 rgba(18,5,10,0.45);
            transform: perspective(900px) rotateX(14deg);
            display: inline-block;
          }

          .schedule-section {
            margin-bottom: 10px;
          }

          .schedule-box {
            background: rgba(69, 216, 241, 0.92);
            color: #000;
            border-color: rgba(0,0,0,0.96);
            box-shadow: none;
          }

          .schedule-head {
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-size: clamp(16px, 2.6vw, 24px);
            line-height: 1;
            font-weight: 700;
            padding: 12px 10px;
            border-bottom: 2px solid rgba(0,0,0,0.95);
          }

          .schedule-subhead {
            text-align: center;
            color: var(--coral);
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-size: clamp(14px, 1.8vw, 18px);
            line-height: 1;
            font-weight: 700;
            padding: 12px 10px 4px;
          }

          .schedule-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0;
            padding: 4px 8px 12px;
          }

          .schedule-item {
            text-align: center;
            padding: 8px;
          }

          .schedule-title {
            min-height: 2.2em;
            font-size: clamp(14px, 2vw, 22px);
            line-height: 1.04;
            font-weight: 700;
          }

          .schedule-time {
            margin-top: 12px;
            font-size: clamp(24px, 4vw, 38px);
            line-height: 1;
            font-weight: 700;
            letter-spacing: 0.06em;
          }

          .explore-wrap {
            margin-bottom: 10px;
          }

          .explore-link {
            display: block;
            padding: 10px 14px;
            color: var(--cyan);
            font-size: clamp(15px, 2vw, 22px);
            line-height: 1;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          .placeholder-panel {
            min-height: 220px;
            display: grid;
            place-items: center;
            text-align: center;
            padding: 18px;
            margin-bottom: 12px;
          }

          .placeholder-title,
          .card-title {
            color: var(--coral);
            font-size: clamp(18px, 3vw, 28px);
            line-height: 1;
            font-weight: 700;
            letter-spacing: 0.02em;
          }

          .placeholder-copy,
          .placeholder-path,
          .card-subtitle {
            color: rgba(255, 224, 232, 0.72);
            text-transform: uppercase;
            letter-spacing: 0.05em;
            font-weight: 700;
          }

          .placeholder-copy {
            margin-top: 8px;
            font-size: clamp(12px, 1.5vw, 15px);
            line-height: 1.2;
          }

          .placeholder-path,
          .card-image-placeholder-path {
            display: block;
            margin-top: 8px;
            font-size: 10px;
          }

          .concept-stack {
            display: grid;
            gap: 12px;
          }

          .concept-card {
            padding: 8px;
          }

          .card-image-placeholder {
            min-height: 100px;
            display: grid;
            place-items: center;
            text-align: center;
            padding: 12px;
            margin-bottom: 10px;
            border: 2px solid rgba(69, 216, 241, 0.92);
            background: rgba(0,0,0,0.25);
          }

          .card-image-placeholder-title {
            color: var(--coral);
            font-size: clamp(20px, 4vw, 34px);
            line-height: 0.95;
            text-transform: uppercase;
            letter-spacing: 0.02em;
            font-weight: 700;
          }

          .card-title {
            margin: 0;
          }

          .card-subtitle {
            margin-top: 6px;
            font-size: clamp(11px, 1.4vw, 14px);
            line-height: 1.05;
          }

          .card-copy {
            margin: 12px 0 12px;
            color: var(--coral);
            font-size: clamp(12px, 1.55vw, 16px);
            line-height: 1.34;
            max-width: 42ch;
            font-weight: 700;
          }

          .bullet-list {
            list-style: none;
            margin: 0 0 10px;
            padding: 0;
          }

          .bullet-list li {
            margin-bottom: 8px;
            color: var(--cyan);
            font-size: clamp(12px, 1.8vw, 18px);
            line-height: 1;
            font-weight: 700;
          }

          .bullet-list li::before {
            content: "◦ ";
          }

          .card-links {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
          }

          .card-links a {
            color: var(--cyan);
            font-size: clamp(12px, 1.7vw, 17px);
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
              padding: 0;
            }

            .poster {
              padding: 12px 10px 16px;
            }

            .schedule-grid {
              grid-template-columns: 1fr;
            }

            .placeholder-panel {
              min-height: 170px;
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
            <div className="warp-grid" aria-hidden="true" />

            <div className="content">
              <div className="hero box">
                <h1 className="hero-title">Dining At</h1>
                <div className="hero-address">17 Little Portland Street</div>
                <div className="hero-tagline">More than a meal. Step into the void</div>
              </div>

              <div className="schedule-section">
                <div className="schedule-box box">
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
                <a className="explore-link box" href="#concepts">&gt; Explore our futurist dining concept</a>
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

                <article className="concept-card box">
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

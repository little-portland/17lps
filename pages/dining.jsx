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
            --bg: #0a0a0a;
            --line: rgba(255, 255, 255, 0.9);
            --line-soft: rgba(255, 255, 255, 0.22);
            --text: #f3f3f0;
            --muted: rgba(243, 243, 240, 0.7);
            --shadow: rgba(0, 0, 0, 0.45);
            --display: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
            --tech: "Trebuchet MS", "Arial Black", Arial, sans-serif;
          }

          html {
            background: var(--bg) !important;
            overflow-x: hidden !important;
          }

          body {
            margin: 0;
            background: var(--bg) !important;
            color: var(--text);
            overflow-x: hidden !important;
            font-family: Arial, Helvetica, sans-serif;
          }

          * { box-sizing: border-box; }
          a { color: inherit; text-decoration: none; }

          @keyframes grainShift {
            0% { transform: translate(0, 0); }
            20% { transform: translate(-0.55%, 0.35%); }
            40% { transform: translate(0.35%, -0.45%); }
            60% { transform: translate(0.4%, 0.28%); }
            80% { transform: translate(-0.28%, -0.2%); }
            100% { transform: translate(0, 0); }
          }

          @keyframes tunnelPulse {
            0%, 100% { opacity: 0.82; filter: brightness(1); }
            50% { opacity: 1; filter: brightness(1.12); }
          }

          @keyframes scanSweep {
            0% { transform: translateY(-130%); opacity: 0; }
            10% { opacity: 0.12; }
            50% { opacity: 0.22; }
            90% { opacity: 0.12; }
            100% { transform: translateY(130%); opacity: 0; }
          }

          @keyframes screenGlitch {
            0%, 90%, 100% { opacity: 0; transform: translateX(0); }
            91% { opacity: 0.1; transform: translateX(-2px); }
            92% { opacity: 0.03; transform: translateX(2px); }
            93% { opacity: 0.08; transform: translateX(0); }
          }

          @keyframes textGlitch {
            0%, 100% { transform: translate3d(0,0,0); text-shadow: 0 0 0 rgba(255,255,255,0); }
            18% { transform: translate3d(0.5px,0,0); text-shadow: -1px 0 0 rgba(255,255,255,0.12); }
            19% { transform: translate3d(-0.5px,0,0); text-shadow: 1px 0 0 rgba(255,255,255,0.12); }
            20% { transform: translate3d(0,0,0); text-shadow: 0 0 0 rgba(255,255,255,0); }
            72% { transform: translate3d(0.3px,0,0); text-shadow: -1px 0 0 rgba(255,255,255,0.08); }
            73% { transform: translate3d(0,0,0); text-shadow: 0 0 0 rgba(255,255,255,0); }
          }

          @keyframes ambientBars {
            0% { background-position: 0 0, 0 0, 0 0; }
            100% { background-position: 24px 0, -18px 0, 0 0; }
          }

          .page {
            min-height: 100vh;
            position: relative;
            overflow: hidden;
            padding: 28px 16px 42px;
            background: radial-gradient(circle at center, rgba(255,255,255,0.03), transparent 30%), linear-gradient(180deg, #111 0%, #080808 100%);
          }

          .page::before,
          .page::after {
            content: "";
            position: fixed;
            inset: -8%;
            pointer-events: none;
            z-index: 0;
          }

          .page::before {
            opacity: 0.28;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220' viewBox='0 0 220 220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.15' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
            mix-blend-mode: screen;
            animation: grainShift 0.28s steps(2, end) infinite;
          }

          .page::after {
            background:
              repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0 2px, transparent 2px 28px),
              repeating-linear-gradient(90deg, transparent 0 14px, rgba(255,255,255,0.014) 14px 16px, transparent 16px 40px),
              linear-gradient(to bottom, rgba(255,255,255,0.035), transparent 20%, transparent 80%, rgba(255,255,255,0.03));
            opacity: 0.22;
            animation: ambientBars 8s linear infinite;
          }

          .screen-glitch {
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: 1;
            background:
              linear-gradient(90deg, transparent 0 18%, rgba(255,255,255,0.08) 18% 19%, transparent 19% 100%),
              linear-gradient(0deg, transparent 0 56%, rgba(255,255,255,0.05) 56% 58%, transparent 58% 100%);
            mix-blend-mode: screen;
            animation: screenGlitch 7s steps(1, end) infinite;
          }

          .shell {
            width: min(1160px, 100%);
            margin: 0 auto;
            position: relative;
            z-index: 2;
          }

          .frame {
            position: relative;
            border: 2px solid var(--line);
            border-radius: 10px;
            background: transparent;
            overflow: hidden;
          }

          .frame::before {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            background: linear-gradient(180deg, rgba(255,255,255,0.025), transparent 22%, transparent 78%, rgba(255,255,255,0.02));
          }

          .frame::after {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            height: 22%;
            pointer-events: none;
            background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.08), rgba(255,255,255,0));
            opacity: 0.1;
            animation: scanSweep 7s linear infinite;
          }

          .header-bar {
            display: grid;
            grid-template-columns: 1fr;
            align-items: center;
            gap: 12px;
            padding: 26px 22px 10px;
            position: relative;
            z-index: 2;
            text-align: center;
          }

          .header-title {
            font-family: var(--display);
            text-transform: uppercase;
            letter-spacing: 0.02em;
            line-height: 0.88;
            font-size: clamp(66px, 10vw, 150px);
            color: var(--text);
            animation: textGlitch 7s steps(1, end) infinite;
          }

          .header-subtitle {
            width: min(980px, 100%);
            margin: 0 auto;
            color: var(--text);
            font-family: var(--tech);
            text-transform: uppercase;
            letter-spacing: 0.12em;
            font-size: clamp(18px, 1.8vw, 26px);
            line-height: 1;
            font-weight: 800;
          }

          .top-lines {
            position: relative;
            width: min(980px, 100%);
            height: 18px;
            margin: 0 auto;
          }

          .top-lines::before,
          .top-lines::after {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            border-top: 2px solid var(--line);
          }

          .top-lines::before { top: 4px; }
          .top-lines::after { top: 11px; }

          .tagline {
            width: min(980px, 100%);
            margin: 8px auto 0;
            color: var(--text);
            font-family: var(--display);
            text-transform: uppercase;
            letter-spacing: 0.02em;
            line-height: 0.92;
            font-size: clamp(26px, 2.7vw, 44px);
            text-shadow:
              0 1px 0 rgba(255,255,255,0.18),
              -3px 4px 0 rgba(255,255,255,0.08),
              -6px 8px 0 rgba(255,255,255,0.04);
            transform: perspective(900px) rotateX(14deg);
            display: inline-block;
          }

          .header-tagline-wrap {
            text-align: center;
          }

          .hero {
            position: relative;
            z-index: 1;
            padding: 8px 22px 22px;
          }

          .tunnel-box {
            position: relative;
            margin: 0 0 22px;
            height: min(46vw, 470px);
            min-height: 260px;
            border: 2px solid var(--line);
            border-radius: 10px;
            overflow: hidden;
            background: transparent;
          }

          .tunnel-box::before {
            content: "";
            position: absolute;
            inset: 0;
            background:
              repeating-linear-gradient(to right, transparent 0, transparent 3.8%, var(--line) 3.8%, var(--line) 4%, transparent 4%, transparent 7.8%),
              repeating-linear-gradient(to bottom, transparent 0, transparent 4.8%, var(--line) 4.8%, var(--line) 5%, transparent 5%, transparent 9.8%);
            transform: perspective(1100px) rotateX(69deg) scale(2.15) translateY(-3%);
            transform-origin: center center;
            opacity: 0.92;
            animation: tunnelPulse 4.5s ease-in-out infinite;
          }

          .tunnel-box::after {
            content: "";
            position: absolute;
            left: 50%;
            top: 50%;
            width: 10%;
            height: 13%;
            transform: translate(-50%, -50%);
            background: var(--text);
            box-shadow: 0 0 24px rgba(255,255,255,0.34);
          }

          .floating-panel {
            position: relative;
            z-index: 2;
            display: grid;
            gap: 14px;
            margin: 0 22px 22px;
          }

          .content-stack {
            padding: 0 22px 22px;
            display: grid;
            gap: 18px;
            position: relative;
            z-index: 1;
          }

          .info-card,
          .cta-card,
          .venue-card,
          .concept-card,
          .content-wrap {
            position: relative;
            background: transparent;
            border: 1px solid var(--line);
            border-radius: 10px;
            overflow: hidden;
          }

          .info-card::before,
          .cta-card::before,
          .venue-card::before,
          .concept-card::before,
          .content-wrap::before {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            background: repeating-linear-gradient(to bottom, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 4px);
            opacity: 0.08;
          }

          .info-card {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 0;
            align-items: stretch;
          }

          .info-card > div {
            position: relative;
            z-index: 1;
            padding: 18px 16px 16px;
            border-right: 1px solid var(--line-soft);
          }

          .info-card > div:last-child { border-right: none; }

          .mini-label {
            color: var(--muted);
            text-transform: uppercase;
            letter-spacing: 0.16em;
            font-size: 12px;
            font-weight: 800;
            margin-bottom: 14px;
            font-family: var(--tech);
          }

          .card-title {
            color: var(--text);
            font-family: var(--display);
            font-size: clamp(22px, 2vw, 34px);
            line-height: 0.95;
            text-transform: uppercase;
            margin-bottom: 12px;
          }

          .card-time {
            color: var(--text);
            font-family: var(--display);
            font-size: clamp(36px, 3vw, 52px);
            line-height: 0.9;
            text-transform: uppercase;
          }

          .cta-link {
            position: relative;
            z-index: 1;
            display: block;
            text-align: center;
            padding: 18px 20px;
            color: var(--text);
            font-family: var(--display);
            text-transform: uppercase;
            font-size: clamp(24px, 2.4vw, 38px);
            line-height: 0.92;
            letter-spacing: 0.03em;
          }

          .cta-link:hover { background: rgba(255,255,255,0.04); }

          .venue-card-inner {
            min-height: 220px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 26px 20px;
            position: relative;
            z-index: 1;
          }

          .venue-title,
          .concept-title,
          .image-placeholder-title {
            color: var(--text);
            font-family: var(--display);
            text-transform: uppercase;
            line-height: 0.92;
            letter-spacing: 0.03em;
          }

          .venue-title { font-size: clamp(34px, 4vw, 58px); }

          .venue-copy,
          .image-placeholder-path,
          .concept-subtitle {
            color: var(--muted);
            text-transform: uppercase;
            letter-spacing: 0.12em;
            font-size: 12px;
            font-weight: 800;
            font-family: var(--tech);
          }

          .venue-copy {
            margin-top: 12px;
            font-size: 14px;
            line-height: 1.35;
          }

          .venue-path {
            margin-top: 10px;
            color: rgba(243,243,240,0.48);
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            font-weight: 800;
            font-family: var(--tech);
          }

          .concept-card-inner {
            position: relative;
            z-index: 1;
            display: grid;
            grid-template-columns: 1fr;
            gap: 18px;
            padding: 18px;
          }

          .image-placeholder {
            min-height: 220px;
            border: 1px solid var(--line-soft);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 18px;
            background: transparent;
          }

          .image-placeholder-title { font-size: clamp(28px, 3vw, 44px); }
          .image-placeholder-path { display: block; margin-top: 10px; }

          .concept-copy-wrap { order: 1; }

          .concept-kicker {
            color: var(--muted);
            text-transform: uppercase;
            letter-spacing: 0.18em;
            font-size: 12px;
            font-weight: 800;
            margin-bottom: 10px;
            font-family: var(--tech);
          }

          .concept-title {
            margin: 0;
            font-size: clamp(34px, 4.2vw, 68px);
          }

          .concept-subtitle { margin-top: 8px; }

          .concept-copy {
            margin: 18px 0 18px;
            color: var(--text);
            font-size: clamp(18px, 1.6vw, 24px);
            line-height: 1.34;
            font-weight: 700;
            max-width: 36ch;
          }

          .feature-list {
            list-style: none;
            padding: 0;
            margin: 0 0 18px;
            display: grid;
            gap: 10px;
          }

          .feature-list li {
            color: var(--text);
            font-family: var(--display);
            text-transform: uppercase;
            font-size: clamp(22px, 2vw, 30px);
            line-height: 0.95;
            letter-spacing: 0.03em;
            position: relative;
            padding-left: 34px;
          }

          .feature-list li::before {
            content: "◦";
            position: absolute;
            left: 0;
            top: 0.02em;
            font-size: 1.1em;
          }

          .link-row {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
          }

          .link-row a {
            color: var(--text);
            font-family: var(--display);
            text-transform: uppercase;
            font-size: clamp(20px, 1.8vw, 26px);
            line-height: 0.95;
            letter-spacing: 0.03em;
            position: relative;
            padding: 0 8px 0 22px;
          }

          .link-row a::before {
            content: "[";
            position: absolute;
            left: 0;
            top: 0;
          }

          .link-row a::after {
            content: "]";
            margin-left: 2px;
          }

          .link-row a:hover { color: var(--muted); }

          .footer-strip {
            display: grid;
            grid-template-columns: 90px 1fr 200px 80px;
            gap: 0;
            border-top: 1px solid var(--line);
            margin-top: 18px;
            position: relative;
            z-index: 1;
          }

          .footer-cell {
            min-height: 80px;
            border-right: 1px solid var(--line);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px;
            position: relative;
            overflow: hidden;
            background: transparent;
          }

          .footer-cell:last-child { border-right: none; }

          .globe,
          .globe::before,
          .globe::after { border-radius: 50%; }

          .globe {
            width: 48px;
            height: 48px;
            border: 2px solid var(--line);
            position: relative;
          }

          .globe::before,
          .globe::after {
            content: "";
            position: absolute;
            inset: 8px;
            border: 1px solid var(--line);
          }

          .globe::after {
            inset: 0;
            border-radius: 0;
            border: none;
            border-top: 2px solid var(--line);
            border-bottom: 2px solid var(--line);
            top: 50%;
            transform: translateY(-50%);
            height: 18px;
          }

          .footer-copy {
            text-align: left;
            justify-content: flex-start;
            font-size: 13px;
            line-height: 1.35;
            color: var(--muted);
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-weight: 800;
            font-family: var(--tech);
          }

          .barcode {
            width: 100%;
            height: 42px;
            background: repeating-linear-gradient(
              to right,
              var(--text) 0 2px,
              transparent 2px 4px,
              var(--text) 4px 5px,
              transparent 5px 8px,
              var(--text) 8px 11px,
              transparent 11px 13px,
              var(--text) 13px 14px,
              transparent 14px 18px
            );
          }

          .badge {
            width: 52px;
            height: 52px;
            border: 2px solid var(--line);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: var(--display);
            font-size: 30px;
            line-height: 1;
          }

          @media (max-width: 980px) {
            .footer-strip { grid-template-columns: 80px 1fr 160px 72px; }
          }

          @media (max-width: 900px) {
            .info-card { grid-template-columns: 1fr; }
            .info-card > div {
              border-right: none;
              border-bottom: 1px solid var(--line-soft);
            }
            .info-card > div:last-child { border-bottom: none; }
            .footer-strip { grid-template-columns: 1fr 1fr; }
          }

          @media (max-width: 640px) {
            .page { padding: 14px 8px 22px; }
            .header-bar,
            .hero,
            .content-stack { margin-left: 0; margin-right: 0; }
            .hero,
            .content-stack,
            .header-bar { padding-left: 14px; padding-right: 14px; }
            .floating-panel { margin: 0 14px 18px; }
            .tunnel-box { height: 220px; }
          }

          @media (prefers-reduced-motion: reduce) {
            .page::before,
            .frame::after,
            .tunnel-box::before,
            .screen-glitch,
            .header-title,
            .page::after {
              animation: none !important;
            }
          }
        `}</style>
      </Head>

      <main className="page">
        <div className="screen-glitch" aria-hidden="true" />
        <div className="shell">
          <section className="frame">
            <div className="header-bar">
              <div className="header-title">Dining At</div>
              <div className="header-subtitle">17 Little Portland Street</div>
              <div className="top-lines" aria-hidden="true" />
              <div className="header-tagline-wrap">
                <div className="tagline">More than a meal. Step into the void</div>
              </div>
            </div>

            <div className="hero">
              <div className="tunnel-box" aria-hidden="true" />
            </div>

            <div className="floating-panel">
              <div className="info-card">
                <div>
                  <div className="mini-label">Nightly schedule</div>
                  <div className="card-title">Chef&apos;s Studio</div>
                  <div className="card-time">20:00</div>
                </div>
                <div>
                  <div className="mini-label">Nightly schedule</div>
                  <div className="card-title">Dinner in The Tent</div>
                  <div className="card-time">20:30</div>
                </div>
                <div>
                  <div className="mini-label">Nightly schedule</div>
                  <div className="card-title">Club Opens</div>
                  <div className="card-time">22:00</div>
                </div>
              </div>

              <div className="cta-card">
                <a className="cta-link" href="#concepts">Explore our futurist dining concept</a>
              </div>
            </div>

            <div className="content-stack">
              <div className="venue-card">
                <div className="venue-card-inner">
                  <div className="venue-title">Venue Map Placeholder</div>
                  <div className="venue-copy">Add your PNG later and swap this block for an image</div>
                  <div className="venue-path">Suggested path: /images/dinning-map.png</div>
                </div>
              </div>

              <div className="concept-stack" id="concepts">
                <article className="concept-card">
                  <div className="concept-card-inner">
                    <div className="image-placeholder">
                      <div>
                        <div className="image-placeholder-title">The Tent Image Placeholder</div>
                        <span className="image-placeholder-path">Suggested path: /images/the-tent.png</span>
                      </div>
                    </div>

                    <div className="content-wrap concept-copy-wrap">
                      <div style={{ padding: '18px' }}>
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
                          <a href="#">Book</a>
                          <a href="#">Menu</a>
                          <a href="#">Explore The Tent</a>
                        </div>
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

                    <div className="content-wrap concept-copy-wrap">
                      <div style={{ padding: '18px' }}>
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
                          <a href="#">Book</a>
                          <a href="#">Menu</a>
                          <a href="#">Explore Chef&apos;s Studio</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>

              <div className="footer-strip">
                <div className="footer-cell"><div className="globe" aria-hidden="true" /></div>
                <div className="footer-cell footer-copy">17 Little Portland Street · Dining access sequence · Retrofuturist service environment</div>
                <div className="footer-cell"><div className="barcode" aria-hidden="true" /></div>
                <div className="footer-cell"><div className="badge">R</div></div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default DinningPage;

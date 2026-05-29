'use client';

import Head from 'next/head';
import { useEffect, useState } from 'react';
import SceneNav from '@components/SceneNav';

const SPACE_ITEMS = [
  {
    key: 'tent',
    label: 'THE TENT',
    href: '/thetent',
    overlay: '/images/concept/tent-highlight.png',
  },
  {
    key: 'chef',
    label: "CHEF'S STUDIO",
    href: '/chefstudio',
    overlay: '/images/concept/chefs-studio-highlight.png',
  },
  {
    key: 'studio',
    label: 'THE STUDIO',
    href: '/studio',
    overlay: '/images/concept/studio-highlight.png',
  },
] as const;

type SpaceKey = (typeof SPACE_ITEMS)[number]['key'];

function PanelButton({
  title,
  href,
  dark = false,
  active = false,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  onClick,
}: {
  title: string;
  href?: string;
  dark?: boolean;
  active?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onClick?: () => void;
}) {
  const className = `panel-btn ${dark ? 'is-dark' : ''} ${active ? 'is-active' : ''}`;

  const content = (
    <>
      <span className="panel-btn__title">{title}</span>
      <span className="panel-btn__sub">
        EXPLORE <span className="panel-btn__chevron" aria-hidden>›</span>
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={className}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={onClick}
    >
      {content}
    </button>
  );
}

export default function ConceptPage() {
  const [activeSpace, setActiveSpace] = useState<SpaceKey | null>(null);
  const [navReady, setNavReady] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const navTimer = window.setTimeout(() => setNavReady(true), 1900);
    return () => window.clearTimeout(navTimer);
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('.reveal-section'));

    const revealVisibleNow = () => {
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const isOnScreen = rect.top < window.innerHeight * 0.9 && rect.bottom > 0;

        if (index === 0 || isOnScreen) {
          section.classList.add('is-visible');
        }
      });
    };

    revealVisibleNow();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    sections.forEach((section) => {
      if (!section.classList.contains('is-visible')) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  const resetSpace = () => setActiveSpace(null);

  return (
    <>
      <Head>
        <title>Concept — 17 Little Portland Street</title>
        <meta
          name="description"
          content="Concept, space and experience at 17 Little Portland Street, London."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="page page--with-scene-nav">
        <div
          className={`concept-nav-shell ${navReady ? 'is-ready' : ''} ${
            isScrolled ? 'is-scrolled' : ''
          }`}
        >
          <SceneNav />
        </div>

        <div className="shell">
          <div className="axis-v" aria-hidden />

          <section className="hero-section reveal-section" id="concept">
            <div className="section-pad hero-pad">
              <div className="hero-grid">
                <div className="hero-copy">
                  <h1 className="concept-title title-glitch" id="concept-title">
                    <span className="title-word">CONCEPT</span>
                    <span className="concept-dot" aria-hidden>.</span>
                  </h1>

                  <p className="hero-address">17 LITTLE PORTLAND STREET, LONDON</p>
                </div>

                <div className="concept-graphic" aria-hidden>
                  <div className="concept-graphic__axis" />

                  <img
                    src="/images/concept/grid_funel.png"
                    alt=""
                    className="concept-graphic__funnel"
                    draggable={false}
                  />

                  <img
                    src="/images/concept/noise_floor.png"
                    alt=""
                    className="concept-graphic__floor"
                    draggable={false}
                  />

                  <img
                    src="/images/concept/obelisk-dark-grey.png"
                    alt=""
                    className="concept-graphic__obelisk"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="space-section reveal-section" id="space">
            <div className="section-rule" aria-hidden />

            <div className="section-pad">
              <h2 className="section-title title-glitch">
                <span className="title-word">THE SPACE</span>
              </h2>

              <div className="space-visual-wrap">
                <div className="space-visual">
                  <img
                    src="/images/concept/the-space-page-venue.png"
                    alt="Illustrated venue overview"
                    className="space-visual__base"
                    draggable={false}
                  />

                  {SPACE_ITEMS.map((item) => (
                    <img
                      key={item.key}
                      src={item.overlay}
                      alt=""
                      className={`space-visual__overlay ${
                        activeSpace === item.key ? 'is-active' : ''
                      }`}
                      draggable={false}
                    />
                  ))}
                </div>
              </div>

              <div className="space-buttons">
                {SPACE_ITEMS.map((item) => (
                  <PanelButton
                    key={item.key}
                    title={item.label}
                    href={item.href}
                    active={activeSpace === item.key}
                    onMouseEnter={() => setActiveSpace(item.key)}
                    onMouseLeave={resetSpace}
                    onFocus={() => setActiveSpace(item.key)}
                    onBlur={resetSpace}
                  />
                ))}
              </div>
            </div>
          </section>

          <section className="experience-section reveal-section" id="experience">
            <div className="section-rule" aria-hidden />

            <div className="section-pad">
              <h2 className="section-title section-title--stack title-glitch">
                <span className="title-word">THE</span>
                <span className="title-word">EXPERIENCE</span>
              </h2>

              <div className="experience-timeline" aria-hidden>
                <div className="timeline-line timeline-line--base" />
                <div className="timeline-line timeline-line--progress" />

                <div className="timeline-marker timeline-marker--start">
                  <span className="timeline-time">20:00 / 20:30</span>
                  <span className="timeline-dot">
                    <span className="timeline-dot__fill" />
                  </span>
                </div>

                <div className="timeline-marker timeline-marker--end">
                  <span className="timeline-time">22:00</span>
                  <span className="timeline-dot">
                    <span className="timeline-dot__fill" />
                  </span>
                </div>
              </div>

              <div className="experience-buttons">
                <PanelButton title="DINING" href="https://www.little-portland.com/food" />
                <PanelButton
                  title="AFTER DARK"
                  href="https://www.little-portland.com/theclub"
                  dark
                />
              </div>
            </div>
          </section>
        </div>
      </main>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
          background: #e8e2d4;
        }

        body {
          margin: 0;
          background: #e8e2d4;
          color: #1c1c1a;
          font-family: 'Space Mono', 'Courier New', monospace;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
          overflow-x: hidden;
        }

        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        ::selection {
          background: rgba(226, 92, 144, 0.18);
          color: #1c1c1a;
        }

        ::-webkit-scrollbar {
          width: 12px;
          height: 12px;
        }

        ::-webkit-scrollbar-track {
          background: #ddd6c8;
        }

        ::-webkit-scrollbar-thumb {
          background: #1c1c1a;
          border: 2px solid #ddd6c8;
        }

        * {
          scrollbar-color: #1c1c1a #ddd6c8;
          scrollbar-width: thin;
        }
      `}</style>

      <style jsx>{`
        :global(:root) {
          --bg: #e8e2d4;
          --ink: #1c1c1a;
          --muted: #8c877d;
          --soft: #bcb6ab;
          --pink: #e25c90;
          --section-pad: clamp(56px, 5.7vw, 110px);
          --shadow-soft: 0 12px 28px rgba(28, 28, 26, 0.04);
        }

        .page {
          position: relative;
          min-height: 100vh;
          background: var(--bg);
          isolation: isolate;
        }

        .page::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url('/images/concept/concept_bg.jpg');
          background-size: contain;
          background-repeat: repeat;
          opacity: 0.7;
          pointer-events: none;
          z-index: -1;
        }

        .concept-nav-shell {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 80;
          opacity: 0;
          transform: translateY(-18px);
          pointer-events: none;
          background: rgba(232, 226, 212, 0);
          border-bottom: 1px solid rgba(28, 28, 26, 0);
          transition:
            opacity 0.55s ease,
            transform 0.55s ease,
            background-color 0.35s ease,
            border-color 0.35s ease,
            box-shadow 0.35s ease,
            backdrop-filter 0.35s ease;
        }

        .concept-nav-shell.is-ready {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .concept-nav-shell.is-scrolled {
          background: rgba(232, 226, 212, 0.94);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom-color: rgba(28, 28, 26, 0.08);
          box-shadow: 0 10px 24px rgba(28, 28, 26, 0.06);
        }

        .concept-nav-shell :global(.scene-nav) {
          background: transparent !important;
        }

        .concept-nav-shell.is-scrolled :global(.scene-nav) {
          background: transparent !important;
          box-shadow: none !important;
        }

        .shell {
          position: relative;
          width: min(65%, 1380px);
          margin: 0 auto;
          min-height: 100vh;
          padding-top: 92px;
          padding-bottom: 70px;
        }

        .axis-v {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 2px;
          pointer-events: none;
          z-index: 1;
          transform: scaleY(0);
          transform-origin: top center;
          background: linear-gradient(
            90deg,
            rgba(28, 28, 26, 0.06) 0%,
            rgba(28, 28, 26, 0.14) 22%,
            rgba(28, 28, 26, 0.42) 50%,
            rgba(28, 28, 26, 0.14) 78%,
            rgba(28, 28, 26, 0.06) 100%
          );
          animation: drawVertical 1s cubic-bezier(0.2, 0.75, 0.25, 1) 120ms forwards;
        }

        .section-pad {
          position: relative;
          z-index: 2;
          padding-left: var(--section-pad);
          padding-right: clamp(8px, 1vw, 18px);
        }

        .hero-section,
        .space-section,
        .experience-section {
          position: relative;
        }

        .hero-pad {
          padding-top: clamp(86px, 8vw, 128px);
          padding-bottom: clamp(74px, 8vw, 118px);
        }

        .space-section .section-pad {
          padding-top: clamp(28px, 4vw, 40px);
          padding-bottom: clamp(72px, 6vw, 96px);
        }

        .experience-section .section-pad {
          padding-top: clamp(28px, 4vw, 40px);
          padding-bottom: clamp(24px, 4vw, 40px);
        }

        .section-rule {
          position: relative;
          width: calc(100% + var(--section-pad));
          height: 2px;
          margin-left: calc(var(--section-pad) * -1);
          margin-bottom: clamp(22px, 3vw, 40px);
          transform: scaleX(0);
          transform-origin: left center;
          background: linear-gradient(
            90deg,
            rgba(28, 28, 26, 0.42) 0%,
            rgba(28, 28, 26, 0.24) 18%,
            rgba(28, 28, 26, 0.12) 52%,
            rgba(28, 28, 26, 0.06) 78%,
            rgba(28, 28, 26, 0.03) 100%
          );
        }

        .reveal-section.is-visible .section-rule {
          animation: drawHorizontal 0.95s cubic-bezier(0.2, 0.75, 0.25, 1) forwards;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(300px, 0.85fr);
          gap: clamp(26px, 4vw, 54px);
          align-items: center;
        }

        .hero-copy {
          min-width: 0;
        }

        .concept-title,
        .section-title {
          margin: 0;
          font-family: 'Space Mono', 'Courier New', monospace;
          font-weight: 700;
          letter-spacing: 0;
          text-transform: uppercase;
          color: var(--ink);
          line-height: 0.86;
        }

        .concept-title {
          display: inline-flex;
          align-items: flex-end;
          gap: 0.08em;
          font-size: clamp(72px, 11.2vw, 172px);
        }

        .title-word {
          display: inline-block;
        }

        .concept-dot {
          display: inline-block;
          font-size: 0.92em;
          line-height: 0.52;
          position: relative;
          top: 0.18em;
          color: var(--ink);
          animation: dotCycle 7.6s ease-in-out infinite;
        }

        .hero-address {
          margin: 20px 0 0;
          font-size: clamp(18px, 1.5vw, 32px);
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--pink);
          line-height: 1.2;
        }

        .section-title {
          font-size: clamp(60px, 7.2vw, 124px);
          margin-bottom: 34px;
        }

        .section-title--stack {
          display: inline-flex;
          flex-direction: column;
          gap: 0.02em;
          line-height: 0.88;
          margin-bottom: 50px;
        }

        .concept-graphic {
          position: relative;
          min-height: clamp(360px, 38vw, 520px);
          width: 100%;
          max-width: 470px;
          justify-self: end;
        }

        .concept-graphic__axis {
          position: absolute;
          top: 24px;
          bottom: 22px;
          left: 50%;
          width: 2px;
          background: linear-gradient(
            90deg,
            rgba(28, 28, 26, 0.06) 0%,
            rgba(28, 28, 26, 0.14) 22%,
            rgba(28, 28, 26, 0.42) 50%,
            rgba(28, 28, 26, 0.14) 78%,
            rgba(28, 28, 26, 0.06) 100%
          );
        }

        .concept-graphic__funnel,
        .concept-graphic__floor,
        .concept-graphic__obelisk {
          position: absolute;
          display: block;
          opacity: 1;
          will-change: transform, filter;
        }

        .concept-graphic__funnel {
          width: clamp(110px, 11vw, 176px);
          top: 12px;
          right: 36px;
          animation: graphicFunnelLoop 13.6s ease-in-out infinite;
        }

        .concept-graphic__floor {
          width: clamp(190px, 18vw, 286px);
          right: 4px;
          bottom: 0;
          animation: graphicFloorLoop 13.6s ease-in-out infinite;
        }

        .concept-graphic__obelisk {
          width: clamp(54px, 5vw, 88px);
          right: 74px;
          bottom: 32px;
          animation: graphicObeliskLoop 13.6s ease-in-out infinite;
        }

        .space-visual-wrap {
          display: flex;
          justify-content: center;
          margin-top: 10px;
        }

        .space-visual {
          position: relative;
          width: min(100%, 1120px);
          aspect-ratio: 1.73 / 1;
          margin: 0 auto;
        }

        .space-visual__base,
        .space-visual__overlay {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }

        .space-visual__base {
          filter: drop-shadow(0 16px 34px rgba(28, 28, 26, 0.05));
          animation: tentIdle 9.5s ease-in-out infinite;
        }

        .space-visual__overlay {
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.18s ease, visibility 0.18s ease;
          mix-blend-mode: normal;
          filter: none;
        }

        .space-visual__overlay.is-active {
          opacity: 1;
          visibility: visible;
          animation: hoverGlitch 4.8s steps(1, end) infinite;
        }

        .space-buttons {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
          margin-top: 22px;
        }

        .panel-btn {
          appearance: none;
          width: 100%;
          min-height: 110px;
          padding: 18px 20px 16px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-end;
          gap: 10px;
          border: 1px solid rgba(28, 28, 26, 0.22);
          background: rgba(232, 226, 212, 0.68);
          color: var(--ink);
          box-shadow: var(--shadow-soft);
          cursor: pointer;
          text-align: left;
          text-decoration: none;
          transition:
            border-color 0.22s ease,
            background 0.22s ease,
            transform 0.22s ease,
            box-shadow 0.22s ease,
            color 0.22s ease;
          font-family: 'Space Mono', 'Courier New', monospace;
        }

        .panel-btn:hover,
        .panel-btn:focus-visible,
        .panel-btn.is-active {
          border-color: rgba(226, 92, 144, 0.5);
          background: rgba(255, 255, 255, 0.46);
          transform: translateY(-1px);
          outline: none;
        }

        .panel-btn.is-dark {
          background: #121210;
          color: #ece6da;
          border-color: #121210;
        }

        .panel-btn.is-dark:hover,
        .panel-btn.is-dark:focus-visible,
        .panel-btn.is-dark.is-active {
          background: #1b1b18;
          border-color: rgba(226, 92, 144, 0.5);
          color: #fff8ef;
        }

        .panel-btn__title {
          display: block;
          font-size: clamp(18px, 1.3vw, 34px);
          font-weight: 700;
          line-height: 1;
          letter-spacing: 0;
          text-transform: uppercase;
        }

        .panel-btn__sub {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          line-height: 1;
          letter-spacing: 0.12em;
          color: inherit;
          opacity: 0.6;
          text-transform: uppercase;
        }

        .panel-btn__chevron {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 1.35em;
          line-height: 0.8;
          transform: translateY(-0.02em);
        }

        .experience-timeline {
          position: relative;
          margin: 8px 0 22px;
          height: 64px;
        }

        .timeline-line {
          position: absolute;
          left: 0;
          right: 0;
          top: 38px;
          height: 2px;
          border-radius: 999px;
        }

        .timeline-line--base {
          background: linear-gradient(
            90deg,
            rgba(28, 28, 26, 0.34) 0%,
            rgba(28, 28, 26, 0.18) 40%,
            rgba(28, 28, 26, 0.08) 100%
          );
        }

        .timeline-line--progress {
          background: linear-gradient(
            90deg,
            rgba(226, 92, 144, 0.95) 0%,
            rgba(226, 92, 144, 0.88) 100%
          );
          transform-origin: left center;
          transform: scaleX(0);
          opacity: 0;
        }

        .timeline-marker {
          position: absolute;
          top: 0;
          height: 64px;
          min-width: 210px;
        }

        .timeline-marker--start {
          left: 0;
        }

        .timeline-marker--end {
          right: 0;
          text-align: right;
        }

        .timeline-time {
          position: absolute;
          top: 0;
          font-size: clamp(18px, 1.5vw, 28px);
          font-weight: 700;
          line-height: 1;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #6f6a62;
        }

        .timeline-marker--start .timeline-time {
          left: 0;
        }

        .timeline-marker--end .timeline-time {
          right: 0;
        }

        .timeline-dot {
          position: absolute;
          top: 38px;
          width: 22px;
          height: 22px;
          border-radius: 999px;
          background: #9d988e;
          overflow: hidden;
          transform: translateY(-50%);
          z-index: 2;
        }

        .timeline-marker--start .timeline-dot {
          left: 0;
        }

        .timeline-marker--end .timeline-dot {
          right: 0;
        }

        .timeline-dot__fill {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: var(--pink);
          opacity: 0;
        }

        .reveal-section.is-visible .timeline-line--progress {
          animation: timelineFill 7.4s ease-in-out infinite;
        }

        .reveal-section.is-visible .timeline-marker--start .timeline-dot__fill {
          animation: startDotFill 7.4s ease-in-out infinite;
        }

        .reveal-section.is-visible .timeline-marker--end .timeline-dot__fill {
          animation: endDotFill 7.4s ease-in-out infinite;
        }

        .reveal-section.is-visible .timeline-marker--start .timeline-time {
          animation: startTimeColor 7.4s ease-in-out infinite;
        }

        .reveal-section.is-visible .timeline-marker--end .timeline-time {
          animation: endTimeColor 7.4s ease-in-out infinite;
        }

        .experience-buttons {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px;
          margin-top: 10px;
        }

        .reveal-section .hero-copy,
        .reveal-section .concept-graphic,
        .reveal-section .space-visual-wrap,
        .reveal-section .space-buttons,
        .reveal-section .section-title,
        .reveal-section .experience-timeline,
        .reveal-section .experience-buttons {
          opacity: 0;
          transform: translateY(26px);
          transition: opacity 0.75s ease, transform 0.75s ease;
        }

        .reveal-section.is-visible .hero-copy,
        .reveal-section.is-visible .concept-graphic,
        .reveal-section.is-visible .space-visual-wrap,
        .reveal-section.is-visible .space-buttons,
        .reveal-section.is-visible .section-title,
        .reveal-section.is-visible .experience-timeline,
        .reveal-section.is-visible .experience-buttons {
          opacity: 1;
          transform: translateY(0);
        }

        .reveal-section.is-visible .hero-copy {
          transition-delay: 0.12s;
        }

        .reveal-section.is-visible .concept-graphic {
          transition-delay: 0.25s;
        }

        .reveal-section.is-visible .space-visual-wrap {
          transition-delay: 0.16s;
        }

        .reveal-section.is-visible .space-buttons {
          transition-delay: 0.26s;
        }

        .reveal-section.is-visible .experience-timeline {
          transition-delay: 0.16s;
        }

        .reveal-section.is-visible .experience-buttons {
          transition-delay: 0.28s;
        }

        .title-glitch .title-word {
          animation: titleJitterLoop 8.2s steps(2, end) infinite;
        }

        @keyframes drawVertical {
          from {
            transform: scaleY(0);
          }

          to {
            transform: scaleY(1);
          }
        }

        @keyframes drawHorizontal {
          from {
            transform: scaleX(0);
          }

          to {
            transform: scaleX(1);
          }
        }

        @keyframes titleJitterLoop {
          0%,
          89%,
          100% {
            transform: translate3d(0, 0, 0);
            text-shadow: 0 0 0 transparent;
          }

          90% {
            transform: translate3d(1px, 0, 0);
            text-shadow:
              1px 0 rgba(226, 92, 144, 0.45),
              -1px 0 rgba(28, 28, 26, 0.18);
          }

          91% {
            transform: translate3d(-1px, 0, 0);
            text-shadow:
              -1px 0 rgba(226, 92, 144, 0.55),
              1px 0 rgba(28, 28, 26, 0.12);
          }

          92% {
            transform: translate3d(0, 0, 0);
            text-shadow: 0 0 0 transparent;
          }
        }

        @keyframes dotCycle {
          0%,
          62%,
          100% {
            color: var(--ink);
            filter: none;
          }

          68% {
            color: #9c978c;
          }

          74% {
            color: var(--pink);
            filter: drop-shadow(1px 0 0 rgba(28, 28, 26, 0.18));
          }

          77% {
            color: var(--ink);
            filter: none;
          }
        }

        @keyframes tentIdle {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-6px);
          }
        }

        @keyframes hoverGlitch {
          0%,
          90%,
          100% {
            transform: translate3d(0, 0, 0);
            filter: none;
          }

          92% {
            transform: translate3d(1px, 0, 0);
            filter: contrast(1.02);
          }

          93% {
            transform: translate3d(-1px, 0, 0);
            filter: contrast(1.04);
          }

          94% {
            transform: translate3d(0, 0, 0);
            filter: none;
          }
        }

        @keyframes graphicFunnelLoop {
          0%,
          78%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
            filter: none;
          }

          82% {
            transform: translate3d(0, -2px, 0) scale(1.01);
          }

          84% {
            transform: translate3d(1px, -1px, 0) scale(1.01);
          }

          86% {
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        @keyframes graphicObeliskLoop {
          0%,
          76%,
          100% {
            transform: translate3d(0, 0, 0);
            filter: drop-shadow(0 8px 18px rgba(28, 28, 26, 0.03));
          }

          80% {
            transform: translate3d(0, -1px, 0);
            filter: drop-shadow(0 10px 20px rgba(28, 28, 26, 0.07));
          }

          83% {
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes graphicFloorLoop {
          0%,
          78%,
          100% {
            transform: translate3d(0, 0, 0);
            filter: none;
          }

          82% {
            transform: translate3d(0, 1px, 0);
          }

          86% {
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes timelineFill {
          0%,
          12% {
            transform: scaleX(0);
            opacity: 0;
          }

          18% {
            transform: scaleX(0);
            opacity: 1;
          }

          62% {
            transform: scaleX(1);
            opacity: 1;
          }

          78% {
            transform: scaleX(1);
            opacity: 0;
          }

          100% {
            transform: scaleX(0);
            opacity: 0;
          }
        }

        @keyframes startDotFill {
          0%,
          12% {
            opacity: 0;
          }

          18%,
          66% {
            opacity: 1;
          }

          82%,
          100% {
            opacity: 0;
          }
        }

        @keyframes endDotFill {
          0%,
          46% {
            opacity: 0;
          }

          60%,
          76% {
            opacity: 1;
          }

          92%,
          100% {
            opacity: 0;
          }
        }

        @keyframes startTimeColor {
          0%,
          12% {
            color: #6f6a62;
          }

          18%,
          66% {
            color: var(--pink);
          }

          82%,
          100% {
            color: #6f6a62;
          }
        }

        @keyframes endTimeColor {
          0%,
          46% {
            color: #6f6a62;
          }

          60%,
          76% {
            color: var(--pink);
          }

          92%,
          100% {
            color: #6f6a62;
          }
        }

        @media (max-width: 1180px) {
          .shell {
            width: min(78%, 1380px);
          }

          .hero-grid {
            grid-template-columns: minmax(0, 1fr);
          }

          .concept-graphic {
            justify-self: start;
            max-width: 420px;
          }
        }

        @media (max-width: 860px) {
          .shell {
            width: calc(100% - 28px);
            padding-top: 84px;
          }

          .hero-pad {
            padding-top: 54px;
          }

          .section-pad {
            padding-left: 28px;
            padding-right: 4px;
          }

          .section-rule {
            width: calc(100% + 28px);
            margin-left: -28px;
          }

          .concept-title {
            font-size: clamp(58px, 15vw, 98px);
          }

          .hero-address {
            font-size: clamp(14px, 4vw, 20px);
            letter-spacing: 0.14em;
          }

          .concept-graphic {
            min-height: 300px;
            max-width: 320px;
          }

          .concept-graphic__funnel {
            width: 108px;
            right: 20px;
            top: 8px;
          }

          .concept-graphic__floor {
            width: 180px;
            right: 0;
          }

          .concept-graphic__obelisk {
            width: 56px;
            right: 50px;
            bottom: 24px;
          }

          .space-buttons,
          .experience-buttons {
            grid-template-columns: 1fr;
          }

          .space-visual {
            width: 100%;
          }

          .section-title {
            font-size: clamp(48px, 11vw, 72px);
            margin-bottom: 24px;
          }

          .section-title--stack {
            margin-bottom: 38px;
          }

          .experience-timeline {
            height: 76px;
            margin-bottom: 18px;
          }

          .timeline-line,
          .timeline-dot {
            top: 42px;
          }

          .timeline-dot {
            width: 18px;
            height: 18px;
          }

          .timeline-time {
            font-size: 16px;
            letter-spacing: 0.12em;
          }

          .panel-btn {
            min-height: 96px;
          }

          .panel-btn__title {
            font-size: 17px;
          }

          .panel-btn__sub {
            font-size: 11px;
          }
        }

        @media (max-width: 560px) {
          .timeline-marker {
            min-width: 150px;
          }

          .timeline-time {
            font-size: 12px;
            letter-spacing: 0.08em;
          }
        }
      `}</style>
    </>
  );
}

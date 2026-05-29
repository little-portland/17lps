'use client';

import Head from 'next/head';
import { useEffect, useState, type MouseEvent } from 'react';
import SceneNav from '@components/SceneNav';

const C = {
  cream: '#E8E2D4',
  ink: '#1C1C1A',
  pink: '#D4507A',
  muted: '#7A7870',
} as const;

const MONO = '"Space Mono", "Courier New", monospace';

type AreaId = 'tent' | 'chefs-studio' | 'studio';

type AreaConfig = {
  id: AreaId;
  title: string;
  href: string;
  highlight: string;
};

const CONCEPT_ASSETS = {
  bg: '/images/concept/concept_bg.jpg',
  funnel: '/images/concept/grid_funel.png',
  floor: '/images/concept/noise_floor.png',
  obelisk: '/images/concept/obelisk-dark-grey.png',
};

const SPACE_ASSETS = {
  venue: '/images/the-space/the-space-page-venue.png',
};

const AREAS: AreaConfig[] = [
  {
    id: 'tent',
    title: 'THE TENT',
    href: '/thetent',
    highlight: '/images/the-space/tent-highlight.png',
  },
  {
    id: 'chefs-studio',
    title: "CHEF'S STUDIO",
    href: '/chefstudio',
    highlight: '/images/the-space/chefs-studio-highlight.png',
  },
  {
    id: 'studio',
    title: 'THE STUDIO',
    href: '/studio',
    highlight: '/images/the-space/studio-highlight.png',
  },
];

const EXPERIENCE_BTNS = [
  { label: 'Dining', href: '/dining', dark: false },
  { label: 'After Dark', href: '/after-dark', dark: true },
];

export default function ConceptPage() {
  const [activeArea, setActiveArea] = useState<AreaId | null>(null);
  const [isTouchMode, setIsTouchMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      '(hover: none), (pointer: coarse), (max-width: 900px)'
    );

    const updateMode = () => {
      setIsTouchMode(mediaQuery.matches || window.innerWidth <= 900);
    };

    updateMode();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateMode);
    } else {
      mediaQuery.addListener(updateMode);
    }

    window.addEventListener('resize', updateMode);

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', updateMode);
      } else {
        mediaQuery.removeListener(updateMode);
      }

      window.removeEventListener('resize', updateMode);
    };
  }, []);

  const handleCardClick =
    (areaId: AreaId) => (event: MouseEvent<HTMLAnchorElement>) => {
      if (isTouchMode && activeArea !== areaId) {
        event.preventDefault();
        setActiveArea(areaId);
      }
    };

  const handleCardEnter = (areaId: AreaId) => {
    if (!isTouchMode) {
      setActiveArea(areaId);
    }
  };

  const handleControlsLeave = () => {
    if (!isTouchMode) {
      setActiveArea(null);
    }
  };

  return (
    <>
      <Head>
        <title>Concept — 17 Little Portland Street</title>
        <meta
          name="description"
          content="Concept, space and experience at 17 Little Portland Street, London."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="page page--with-scene-nav">
        <SceneNav theme="space" />

        <div className="bg-image" aria-hidden="true" />

        <div className="shell">
          <div className="axis-v" aria-hidden="true" />

          <section className="content-section hero-section" aria-labelledby="concept-title">
            <img
              className="concept-funnel-inline"
              src={CONCEPT_ASSETS.funnel}
              alt=""
              draggable={false}
            />

            <h1 id="concept-title">
              Concept<span className="pink-dot">.</span>
            </h1>

            <p className="address">17 Little Portland Street, London</p>
          </section>

          <section className="content-section space-section" aria-labelledby="space-title">
            <div className="section-rule" aria-hidden="true" />

            <h2 id="space-title">The Space</h2>

            <div className="concept-space-map" aria-label="Interactive venue map">
              <div className="venue-wrap" aria-hidden="true">
                <img
                  src={SPACE_ASSETS.venue}
                  alt="Venue layout showing The Tent, Chef's Studio and The Studio"
                  className="venue-image venue-base"
                  draggable={false}
                />

                {AREAS.map((area) => {
                  const isActive = activeArea === area.id;

                  return (
                    <div key={area.id}>
                      <img
                        src={area.highlight}
                        alt=""
                        className={`venue-image venue-highlight-glow ${
                          isActive ? 'is-active' : ''
                        }`}
                        draggable={false}
                      />
                      <img
                        src={area.highlight}
                        alt=""
                        className={`venue-image venue-highlight ${
                          isActive ? 'is-active' : ''
                        }`}
                        draggable={false}
                      />
                    </div>
                  );
                })}

                <img
                  src={SPACE_ASSETS.venue}
                  alt=""
                  className="venue-image venue-glitch venue-glitch-a"
                  draggable={false}
                />
                <img
                  src={SPACE_ASSETS.venue}
                  alt=""
                  className="venue-image venue-glitch venue-glitch-b"
                  draggable={false}
                />
              </div>
            </div>

            <nav
              className="zone-controls"
              aria-label="Venue areas"
              onMouseLeave={handleControlsLeave}
            >
              {AREAS.map((area) => {
                const isActive = activeArea === area.id;
                const helperText = isTouchMode
                  ? isActive
                    ? 'Tap to explore →'
                    : 'Tap to preview'
                  : 'Explore →';

                return (
                  <a
                    key={area.id}
                    href={area.href}
                    className={`zone-card ${isActive ? 'is-active' : ''}`}
                    onMouseEnter={() => handleCardEnter(area.id)}
                    onFocus={() => setActiveArea(area.id)}
                    onClick={handleCardClick(area.id)}
                    aria-label={`${area.title} ${helperText}`}
                  >
                    <span className="zone-card-title">{area.title}</span>
                    <span className="zone-card-meta">{helperText}</span>
                  </a>
                );
              })}
            </nav>
          </section>

          <img
            className="noise-floor-asset"
            src={CONCEPT_ASSETS.floor}
            alt=""
            draggable={false}
          />

          <section className="content-section experience-section" aria-labelledby="experience-title">
            <div className="section-rule" aria-hidden="true" />

            <h2 id="experience-title">The Experience</h2>

            <div className="experience-layout">
              <nav className="experience-nav" aria-label="Explore the experience">
                {EXPERIENCE_BTNS.map((button) => (
                  <a
                    key={button.href}
                    href={button.href}
                    className={`experience-card ${button.dark ? 'is-dark' : ''}`}
                  >
                    <span>{button.label}</span>
                    <small>Explore →</small>
                  </a>
                ))}
              </nav>

              <img
                className="experience-obelisk"
                src={CONCEPT_ASSETS.obelisk}
                alt=""
                draggable={false}
              />
            </div>
          </section>
        </div>
      </main>

      <style jsx global>{`
        html,
        body,
        #__next {
          margin: 0;
          min-height: 100%;
          background: ${C.cream};
          color: ${C.ink};
          font-family: ${MONO};
          -webkit-font-smoothing: antialiased;
          text-rendering: geometricPrecision;
          scrollbar-color: ${C.ink} rgba(28, 28, 26, 0.14);
        }

        body {
          overflow-x: hidden;
        }

        * {
          box-sizing: border-box;
        }

        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(28, 28, 26, 0.12);
        }

        ::-webkit-scrollbar-thumb {
          background: ${C.ink};
          border: 2px solid rgba(232, 226, 212, 0.7);
          background-clip: content-box;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${C.pink};
          border: 2px solid rgba(232, 226, 212, 0.7);
          background-clip: content-box;
        }

        .scene-nav {
          z-index: 10020 !important;
        }

        .scene-nav-burger,
        .scene-nav-logo {
          position: relative;
          z-index: 10030 !important;
        }

        .scene-nav-mobile {
          z-index: 10010 !important;
        }

        .scene-nav--space {
          background: transparent !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
        }

        .scene-nav--space,
        .scene-nav--space a,
        .scene-nav-mobile--space,
        .scene-nav-mobile--space a {
          color: ${C.ink} !important;
          font-family: ${MONO} !important;
          letter-spacing: 0.16em !important;
        }

        .scene-nav--space a.active,
        .scene-nav-mobile--space a.active {
          color: ${C.pink} !important;
        }

        .scene-nav--space a.disabled,
        .scene-nav-mobile--space a.disabled {
          color: ${C.ink} !important;
          opacity: 0.4;
        }

        .scene-nav--space .scene-nav-burger span {
          background: ${C.ink} !important;
        }

        .scene-nav--space .scene-nav-logo img {
          filter: brightness(0) saturate(100%) invert(8%) sepia(5%) saturate(851%)
            hue-rotate(21deg) brightness(99%) contrast(91%);
        }

        .scene-nav-mobile.scene-nav--space,
        .scene-nav-mobile--space {
          background: rgba(232, 226, 212, 0.92) !important;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        @media (max-width: 900px) {
          .scene-nav-mobile.scene-nav--space .scene-nav-mobile-inner,
          .scene-nav-mobile--space .scene-nav-mobile-inner {
            padding-top: 96px;
          }
        }
      `}</style>

      <style jsx>{`
        .page {
          position: relative;
          min-height: 100svh;
          overflow-x: clip;
          background: ${C.cream};
        }

        .bg-image {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background-image: url('${CONCEPT_ASSETS.bg}');
          background-size: contain;
          background-repeat: repeat;
          background-position: center top;
          opacity: 0.7;
        }

        .shell {
          position: relative;
          z-index: 2;
          width: 65%;
          max-width: 1180px;
          min-height: 100svh;
          margin: 0 auto;
          padding: clamp(104px, 10vw, 132px) 0 clamp(72px, 8vw, 112px);
        }

        .axis-v {
          position: absolute;
          top: 30px;
          bottom: 30px;
          left: 0;
          z-index: 1;
          width: 1px;
          background: linear-gradient(
            180deg,
            rgba(28, 28, 26, 0),
            rgba(28, 28, 26, 0.48) 5%,
            rgba(28, 28, 26, 0.34) 94%,
            rgba(28, 28, 26, 0)
          );
          pointer-events: none;
        }

        .content-section {
          --section-pad: clamp(48px, 5.5vw, 82px);
          position: relative;
          z-index: 3;
          padding-left: var(--section-pad);
        }

        .section-rule {
          position: relative;
          width: calc(100% + var(--section-pad));
          height: 1px;
          margin-left: calc(var(--section-pad) * -1);
          margin-bottom: clamp(28px, 4vw, 48px);
          background: linear-gradient(
            90deg,
            rgba(28, 28, 26, 0.42),
            rgba(28, 28, 26, 0.16)
          );
        }

        .hero-section {
          min-height: clamp(380px, 52svh, 560px);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .space-section {
          padding-top: clamp(72px, 8vw, 110px);
          padding-bottom: clamp(58px, 6vw, 82px);
        }

        .experience-section {
          padding-top: clamp(58px, 6vw, 86px);
        }

        h1,
        h2,
        p {
          margin: 0;
        }

        h1,
        h2 {
          font-family: ${MONO};
          color: ${C.ink};
          text-transform: uppercase;
          font-weight: 700;
          line-height: 0.9;
          letter-spacing: 0px;
          text-wrap: balance;
          text-shadow: 0.018em 0 0 currentColor;
        }

        h1 {
          position: relative;
          z-index: 5;
          font-size: clamp(64px, 8.4vw, 128px);
        }

        h2 {
          position: relative;
          z-index: 5;
          max-width: 720px;
          font-size: clamp(48px, 5.8vw, 92px);
        }

        .pink-dot {
          color: ${C.pink};
          text-shadow: none;
        }

        .address {
          position: relative;
          z-index: 5;
          margin-top: clamp(18px, 2vw, 26px);
          font-family: ${MONO};
          color: rgba(28, 28, 26, 0.72);
          font-size: clamp(11px, 1.05vw, 15px);
          line-height: 1.45;
          letter-spacing: 0.24em;
          font-weight: 700;
          text-transform: uppercase;
        }

        .concept-funnel-inline {
          position: absolute;
          z-index: 4;
          top: 46%;
          right: clamp(0px, 4vw, 72px);
          width: clamp(190px, 23vw, 340px);
          height: auto;
          opacity: 0.62;
          pointer-events: none;
          user-select: none;
          mix-blend-mode: multiply;
          filter: saturate(0.9) contrast(1);
          transform: translateY(-58%);
          animation: funnelFloat 8.5s ease-in-out infinite;
        }

        .concept-space-map {
          position: relative;
          width: 100%;
          min-height: clamp(320px, 39vw, 560px);
          margin-top: clamp(8px, 2vw, 20px);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .concept-space-map::before {
          content: '';
          position: absolute;
          left: 5%;
          right: 5%;
          bottom: 14%;
          height: 18%;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(28, 28, 26, 0.16), transparent 72%);
          filter: blur(10px);
          opacity: 0.44;
          transform: rotate(-4deg);
        }

        .venue-wrap {
          position: relative;
          width: min(100%, 850px);
          aspect-ratio: 2048 / 1140;
          animation: venueFloat 4.8s ease-in-out infinite;
        }

        .venue-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          pointer-events: none;
          user-select: none;
        }

        .venue-base {
          z-index: 2;
          filter:
            saturate(0.8)
            contrast(1.02)
            drop-shadow(0 18px 28px rgba(28, 28, 26, 0.12))
            drop-shadow(0 36px 60px rgba(28, 28, 26, 0.1));
        }

        .venue-highlight-glow,
        .venue-highlight {
          opacity: 0;
          transition:
            opacity 0.28s ease,
            filter 0.28s ease,
            transform 0.28s ease;
        }

        .venue-highlight-glow {
          z-index: 3;
          filter:
            blur(14px)
            saturate(1.1)
            drop-shadow(0 0 20px rgba(212, 80, 122, 0.25));
          mix-blend-mode: multiply;
        }

        .venue-highlight {
          z-index: 4;
          mix-blend-mode: multiply;
          filter:
            saturate(1.08)
            contrast(1.08)
            drop-shadow(0 0 12px rgba(212, 80, 122, 0.18));
        }

        .venue-highlight-glow.is-active {
          opacity: 0.48;
          animation: highlightPulse 2.8s ease-in-out infinite;
        }

        .venue-highlight.is-active {
          opacity: 0.8;
          animation: highlightPulse 2.8s ease-in-out infinite;
        }

        .venue-glitch {
          z-index: 5;
          opacity: 0;
          mix-blend-mode: multiply;
          pointer-events: none;
        }

        .venue-glitch-a {
          filter:
            drop-shadow(0 0 12px rgba(212, 80, 122, 0.3))
            hue-rotate(-16deg)
            saturate(1.25);
          animation: venueGlitchA 8.5s steps(1, end) infinite;
        }

        .venue-glitch-b {
          filter:
            drop-shadow(0 0 12px rgba(80, 120, 130, 0.2))
            hue-rotate(18deg)
            saturate(1.12);
          animation: venueGlitchB 8.5s steps(1, end) infinite;
        }

        .zone-controls {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          margin-top: clamp(8px, 1.4vw, 18px);
        }

        .zone-card,
        .experience-card {
          position: relative;
          min-height: clamp(96px, 10vw, 138px);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 8px;
          padding: clamp(20px, 2vw, 28px);
          border: 1px solid rgba(28, 28, 26, 0.48);
          background: rgba(232, 226, 212, 0.34);
          color: ${C.ink};
          text-decoration: none;
          box-shadow: 6px 6px 0 rgba(28, 28, 26, 0.08);
          overflow: hidden;
          transition:
            transform 0.24s ease,
            border-color 0.24s ease,
            background 0.24s ease,
            color 0.24s ease,
            box-shadow 0.24s ease;
        }

        .zone-card::before,
        .experience-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg, rgba(212, 80, 122, 0.16), transparent 42%),
            repeating-linear-gradient(90deg, rgba(28, 28, 26, 0.06) 0 1px, transparent 1px 11px);
          opacity: 0;
          transition: opacity 0.24s ease;
        }

        .zone-card-title,
        .zone-card-meta,
        .experience-card span,
        .experience-card small {
          position: relative;
          z-index: 1;
        }

        .zone-card-title,
        .experience-card span {
          display: block;
          font-family: ${MONO};
          font-size: clamp(18px, 1.7vw, 28px);
          font-weight: 700;
          line-height: 0.95;
          letter-spacing: 0px;
          text-transform: uppercase;
          text-shadow: 0.012em 0 0 currentColor;
        }

        .zone-card-meta,
        .experience-card small {
          display: block;
          margin-top: 2px;
          font-family: ${MONO};
          color: rgba(28, 28, 26, 0.58);
          font-size: 10px;
          letter-spacing: 0.18em;
          line-height: 1;
          text-transform: uppercase;
        }

        .zone-card:hover,
        .zone-card:focus-visible,
        .zone-card.is-active,
        .experience-card:hover,
        .experience-card:focus-visible {
          border-color: rgba(212, 80, 122, 0.9);
          background: rgba(212, 80, 122, 0.1);
          color: ${C.ink};
          box-shadow: 10px 10px 0 rgba(212, 80, 122, 0.14);
          transform: translate(-3px, -3px);
          outline: none;
        }

        .zone-card:hover::before,
        .zone-card:focus-visible::before,
        .zone-card.is-active::before,
        .experience-card:hover::before,
        .experience-card:focus-visible::before {
          opacity: 1;
        }

        .zone-card.is-active .zone-card-meta {
          color: rgba(28, 28, 26, 0.78);
        }

        .noise-floor-asset {
          position: absolute;
          z-index: 1;
          left: clamp(48px, 5.5vw, 82px);
          right: 0;
          bottom: clamp(170px, 18vw, 260px);
          width: min(84%, 860px);
          height: auto;
          opacity: 0.28;
          pointer-events: none;
          user-select: none;
          mix-blend-mode: multiply;
          filter: contrast(0.92) saturate(0.8);
        }

        .experience-layout {
          position: relative;
          z-index: 4;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(150px, 300px);
          gap: clamp(28px, 5vw, 78px);
          align-items: center;
          margin-top: clamp(18px, 2.4vw, 32px);
        }

        .experience-nav {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        .experience-card.is-dark {
          background: ${C.ink};
          color: ${C.cream};
        }

        .experience-card.is-dark small {
          color: rgba(232, 226, 212, 0.66);
        }

        .experience-card.is-dark:hover,
        .experience-card.is-dark:focus-visible {
          background: ${C.pink};
          color: ${C.cream};
        }

        .experience-card:hover small,
        .experience-card:focus-visible small {
          color: currentColor;
          opacity: 0.7;
        }

        .experience-obelisk {
          position: relative;
          z-index: 4;
          display: block;
          width: clamp(108px, 11vw, 176px);
          height: auto;
          justify-self: center;
          opacity: 0.88;
          pointer-events: none;
          user-select: none;
          filter:
            contrast(0.98)
            drop-shadow(22px 34px 28px rgba(28, 28, 26, 0.18));
          animation: obeliskHover 8s ease-in-out infinite;
        }

        @keyframes funnelFloat {
          0%,
          100% {
            transform: translate3d(0, -58%, 0) rotate(0deg);
          }

          50% {
            transform: translate3d(-10px, calc(-58% + 10px), 0) rotate(1.4deg);
          }
        }

        @keyframes obeliskHover {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(0, -10px, 0);
          }
        }

        @keyframes venueFloat {
          0%,
          100% {
            transform: translateY(0px) rotate(-0.15deg);
          }

          50% {
            transform: translateY(-10px) rotate(0.25deg);
          }
        }

        @keyframes highlightPulse {
          0%,
          100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.01);
          }
        }

        @keyframes venueGlitchA {
          0%,
          72%,
          100% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
            clip-path: inset(0 0 0 0);
          }

          73% {
            opacity: 0.18;
            transform: translate3d(-8px, -3px, 0);
            clip-path: inset(0% 0 82% 0);
          }

          74% {
            opacity: 0.24;
            transform: translate3d(10px, 4px, 0);
            clip-path: inset(16% 0 58% 0);
          }

          75% {
            opacity: 0.18;
            transform: translate3d(-7px, -5px, 0);
            clip-path: inset(34% 0 34% 0);
          }

          76% {
            opacity: 0.22;
            transform: translate3d(8px, 6px, 0);
            clip-path: inset(52% 0 16% 0);
          }

          77% {
            opacity: 0.14;
            transform: translate3d(-5px, -4px, 0);
            clip-path: inset(74% 0 3% 0);
          }

          78% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
            clip-path: inset(0 0 0 0);
          }
        }

        @keyframes venueGlitchB {
          0%,
          72%,
          100% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
            clip-path: inset(0 0 0 0);
          }

          73.2% {
            opacity: 0.12;
            transform: translate3d(7px, 5px, 0);
            clip-path: inset(8% 0 72% 0);
          }

          74.1% {
            opacity: 0.18;
            transform: translate3d(-10px, -3px, 0);
            clip-path: inset(24% 0 46% 0);
          }

          75.2% {
            opacity: 0.14;
            transform: translate3d(6px, -7px, 0);
            clip-path: inset(44% 0 24% 0);
          }

          76.1% {
            opacity: 0.18;
            transform: translate3d(-8px, 6px, 0);
            clip-path: inset(63% 0 9% 0);
          }

          77.2% {
            opacity: 0.1;
            transform: translate3d(4px, -2px, 0);
            clip-path: inset(82% 0 0% 0);
          }

          78% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
            clip-path: inset(0 0 0 0);
          }
        }

        @media (max-width: 1280px) {
          .shell {
            width: 72%;
          }
        }

        @media (max-width: 980px) {
          .shell {
            width: 82%;
          }

          .zone-controls {
            grid-template-columns: 1fr;
          }

          .concept-funnel-inline {
            width: clamp(150px, 30vw, 220px);
            right: -10px;
            opacity: 0.34;
          }
        }

        @media (max-width: 820px) {
          .shell {
            width: calc(100% - 40px);
            max-width: none;
            padding-top: 96px;
          }

          .content-section {
            --section-pad: 48px;
          }

          .hero-section {
            min-height: 58svh;
          }

          .space-section {
            padding-top: 76px;
            padding-bottom: 56px;
          }

          .experience-section {
            padding-top: 72px;
            padding-bottom: 72px;
          }

          .zone-controls {
            margin-top: 8px;
          }

          h1 {
            font-size: clamp(52px, 14vw, 82px);
          }

          h2 {
            font-size: clamp(40px, 11vw, 64px);
          }

          .address {
            max-width: 320px;
            font-size: 11px;
            letter-spacing: 0.18em;
          }

          .concept-space-map {
            min-height: clamp(250px, 64vw, 410px);
          }

          .venue-wrap {
            width: min(116%, 640px);
            margin-left: -8%;
          }

          .experience-layout {
            grid-template-columns: 1fr;
            margin-top: 18px;
          }

          .experience-obelisk {
            width: 104px;
            justify-self: end;
            margin-right: 8%;
            opacity: 0.62;
          }

          .noise-floor-asset {
            left: 48px;
            width: 92%;
            bottom: 180px;
            opacity: 0.2;
          }
        }

        @media (max-width: 520px) {
          .shell {
            width: calc(100% - 28px);
            padding-top: 88px;
          }

          .axis-v {
            top: 24px;
            bottom: 24px;
          }

          .content-section {
            --section-pad: 34px;
          }

          .hero-section {
            min-height: 54svh;
          }

          .section-rule {
            margin-bottom: 26px;
          }

          .space-section {
            padding-top: 66px;
            padding-bottom: 44px;
          }

          .experience-section {
            padding-top: 66px;
            padding-bottom: 66px;
          }

          .concept-funnel-inline {
            top: 24%;
            right: -34px;
            width: 142px;
            opacity: 0.24;
          }

          .concept-space-map {
            min-height: 230px;
          }

          .venue-wrap {
            width: 132%;
            margin-left: -16%;
          }

          .zone-card,
          .experience-card {
            min-height: 104px;
          }

          .zone-card-title,
          .experience-card span {
            font-size: 20px;
          }

          .zone-card-meta,
          .experience-card small {
            font-size: 9px;
          }

          .noise-floor-asset {
            left: 34px;
            width: 108%;
            bottom: 156px;
            opacity: 0.16;
          }

          .experience-obelisk {
            width: 86px;
            justify-self: start;
            margin-left: 24px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .concept-funnel-inline,
          .experience-obelisk,
          .venue-wrap,
          .venue-glitch-a,
          .venue-glitch-b,
          .venue-highlight-glow.is-active,
          .venue-highlight.is-active {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}

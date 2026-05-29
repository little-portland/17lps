'use client';

import Head from 'next/head';
import { useEffect, useState, type CSSProperties, type MouseEvent } from 'react';
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
  chars: number;
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
    chars: 8,
  },
  {
    id: 'chefs-studio',
    title: "CHEF'S STUDIO",
    href: '/chefstudio',
    highlight: '/images/the-space/chefs-studio-highlight.png',
    chars: 13,
  },
  {
    id: 'studio',
    title: 'THE STUDIO',
    href: '/studio',
    highlight: '/images/the-space/studio-highlight.png',
    chars: 10,
  },
];

const EXPERIENCE_BTNS = [
  { label: 'Dining', href: '/dining', dark: false, chars: 6 },
  { label: 'After Dark', href: '/after-dark', dark: true, chars: 10 },
];

const typeStyle = (chars: number, delay: string): CSSProperties =>
  ({
    '--chars': chars,
    '--type-delay': delay,
  }) as CSSProperties;

export default function ConceptPage() {
  const [activeArea, setActiveArea] = useState<AreaId | null>(null);
  const [isTouchMode, setIsTouchMode] = useState(false);
  const [menuReady, setMenuReady] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const menuTimer = window.setTimeout(() => {
      setMenuReady(true);
    }, 2600);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.clearTimeout(menuTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
        <div
          className={`concept-nav-shell ${menuReady ? 'is-ready' : ''} ${
            isScrolled ? 'is-scrolled' : ''
          }`}
        >
          <SceneNav theme="space" />
        </div>

        <div className="bg-image" aria-hidden="true" />

        <div className="shell">
          <div className="axis-v" aria-hidden="true" />

          <section className="content-section hero-section" aria-labelledby="concept-title">
            <div className="hero-copy">
              <h1 id="concept-title" className="scan-title scan-title-hero">
                Concept
              </h1>

              <span className="concept-dot" aria-hidden="true" />

              <p className="address">
                <span className="type-text" style={typeStyle(33, '1120ms')}>
                  17 Little Portland Street, London
                </span>
              </p>
            </div>

            <div className="hero-art" aria-hidden="true">
              <img
                className="concept-floor"
                src={CONCEPT_ASSETS.floor}
                alt=""
                draggable={false}
              />

              <img
                className="concept-funnel-inline"
                src={CONCEPT_ASSETS.funnel}
                alt=""
                draggable={false}
              />

              <img
                className="concept-obelisk"
                src={CONCEPT_ASSETS.obelisk}
                alt=""
                draggable={false}
              />
            </div>
          </section>

          <section className="content-section space-section" aria-labelledby="space-title">
            <div className="section-rule" aria-hidden="true" />

            <h2 id="space-title" className="scan-title scan-title-space">
              The Space
            </h2>

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
              {AREAS.map((area, index) => {
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
                    className={`action-card zone-card ${isActive ? 'is-active' : ''}`}
                    onMouseEnter={() => handleCardEnter(area.id)}
                    onFocus={() => setActiveArea(area.id)}
                    onClick={handleCardClick(area.id)}
                    aria-label={`${area.title} ${helperText}`}
                    style={
                      {
                        '--card-delay': `${1960 + index * 120}ms`,
                      } as CSSProperties
                    }
                  >
                    <span className="action-card-title">
                      <span
                        className="type-text"
                        style={typeStyle(area.chars, `${2100 + index * 120}ms`)}
                      >
                        {area.title}
                      </span>
                    </span>
                    <span className="action-card-meta">
                      <span
                        className="type-text"
                        style={typeStyle(9, `${2260 + index * 120}ms`)}
                      >
                        {helperText}
                      </span>
                    </span>
                  </a>
                );
              })}
            </nav>
          </section>

          <section className="content-section experience-section" aria-labelledby="experience-title">
            <div className="section-rule" aria-hidden="true" />

            <h2 id="experience-title" className="scan-title scan-title-experience">
              The Experience
            </h2>

            <nav className="experience-nav" aria-label="Explore the experience">
              {EXPERIENCE_BTNS.map((button, index) => (
                <a
                  key={button.href}
                  href={button.href}
                  className={`action-card experience-card ${button.dark ? 'is-dark' : ''}`}
                  style={
                    {
                      '--card-delay': `${2420 + index * 140}ms`,
                    } as CSSProperties
                  }
                >
                  <span className="action-card-title">
                    <span
                      className="type-text"
                      style={typeStyle(button.chars, `${2560 + index * 140}ms`)}
                    >
                      {button.label}
                    </span>
                  </span>
                  <span className="action-card-meta">
                    <span
                      className="type-text"
                      style={typeStyle(9, `${2720 + index * 140}ms`)}
                    >
                      Explore →
                    </span>
                  </span>
                </a>
              ))}
            </nav>
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
          transition:
            background 0.28s ease,
            box-shadow 0.28s ease,
            backdrop-filter 0.28s ease,
            -webkit-backdrop-filter 0.28s ease !important;
        }

        .concept-nav-shell.is-scrolled .scene-nav {
          background: rgba(232, 226, 212, 0.5) !important;
          border-bottom: 1px solid rgba(28, 28, 26, 0.14);
          box-shadow: 0 10px 28px rgba(28, 28, 26, 0.07);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
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

        .concept-nav-shell {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 10000;
          opacity: 0;
          transform: translateY(-18px);
          pointer-events: none;
          transition:
            opacity 0.7s ease,
            transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .concept-nav-shell.is-ready {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
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
          transform: scaleY(0);
          transform-origin: top center;
          animation: drawVertical 0.95s cubic-bezier(0.25, 0.8, 0.25, 1) 120ms forwards;
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
          transform: scaleX(0);
          transform-origin: left center;
          animation: drawHorizontal 0.78s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
        }

        .space-section .section-rule {
          animation-delay: 1180ms;
        }

        .experience-section .section-rule {
          animation-delay: 1900ms;
        }

        .hero-section {
          min-height: clamp(440px, 62svh, 680px);
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(270px, 40%);
          align-items: center;
          gap: clamp(22px, 4vw, 64px);
        }

        .hero-copy {
          position: relative;
          z-index: 7;
        }

        .hero-art {
          position: relative;
          z-index: 4;
          min-height: clamp(420px, 40vw, 620px);
        }

        .space-section {
          padding-top: clamp(72px, 8vw, 110px);
          padding-bottom: clamp(34px, 4vw, 56px);
        }

        .experience-section {
          padding-top: clamp(48px, 5vw, 70px);
        }

        h1,
        h2,
        p {
          margin: 0;
        }

        h1,
        h2,
        .scan-title {
          font-family: ${MONO};
          color: ${C.ink};
          text-transform: uppercase;
          font-weight: 700;
          line-height: 0.9;
          letter-spacing: 0px;
          text-wrap: balance;
          text-shadow: 0.018em 0 0 currentColor;
        }

        h1,
        .scan-title-hero {
          position: relative;
          z-index: 5;
          font-size: clamp(64px, 8.4vw, 128px);
        }

        h2,
        .scan-title-space,
        .scan-title-experience {
          position: relative;
          z-index: 5;
          max-width: 720px;
          font-size: clamp(48px, 5.8vw, 92px);
        }

        .scan-title {
          display: inline-block;
          opacity: 0;
          clip-path: inset(0 100% 0 0);
          transform: translateX(-10px);
          animation:
            scanTitleReveal 0.48s steps(8, end) forwards,
            titleMicroGlitch 0.5s steps(2, end) forwards;
        }

        .scan-title-hero {
          animation-delay: 560ms, 1040ms;
        }

        .scan-title-space {
          animation-delay: 1320ms, 1780ms;
        }

        .scan-title-experience {
          animation-delay: 2040ms, 2480ms;
        }

        .concept-dot {
          position: absolute;
          z-index: 6;
          left: clamp(18px, 2.2vw, 32px);
          top: calc(100% + clamp(26px, 4vw, 54px));
          width: clamp(18px, 2vw, 31px);
          height: clamp(18px, 2vw, 31px);
          border-radius: 999px;
          background: ${C.ink};
          opacity: 0;
          transform: scale(0.4);
          animation:
            dotEnter 0.36s cubic-bezier(0.2, 1.6, 0.3, 1) 1020ms forwards,
            dotSignal 4.8s steps(1, end) 1700ms infinite;
        }

        .address {
          position: relative;
          z-index: 5;
          margin-top: clamp(82px, 7.5vw, 122px);
          font-family: ${MONO};
          color: ${C.pink};
          font-size: clamp(13px, 1.24vw, 18px);
          line-height: 1.45;
          letter-spacing: 0.24em;
          font-weight: 700;
          text-transform: uppercase;
        }

        .type-text {
          display: inline-block;
          white-space: nowrap;
          overflow: hidden;
          clip-path: inset(0 100% 0 0);
          animation: typeReveal 0.54s steps(var(--chars), end) var(--type-delay) forwards;
        }

        .concept-floor {
          position: absolute;
          z-index: 2;
          left: 50%;
          bottom: 0;
          width: clamp(390px, 42vw, 660px);
          height: auto;
          opacity: 0;
          mix-blend-mode: multiply;
          filter: contrast(0.94) saturate(0.9);
          pointer-events: none;
          user-select: none;
          transform: translate3d(-48%, 18px, 0);
          animation:
            floorIn 0.82s cubic-bezier(0.2, 0.8, 0.2, 1) 880ms forwards,
            floorDrift 10s ease-in-out 2300ms infinite;
        }

        .concept-funnel-inline {
          position: absolute;
          z-index: 3;
          top: clamp(12px, 2.2vw, 38px);
          left: 50%;
          width: clamp(124px, 13vw, 205px);
          height: auto;
          opacity: 0;
          pointer-events: none;
          user-select: none;
          mix-blend-mode: multiply;
          filter: saturate(1) contrast(1.02);
          transform: translate3d(-50%, -20px, 0) scale(0.96);
          animation:
            funnelIn 0.72s cubic-bezier(0.2, 0.8, 0.2, 1) 1000ms forwards,
            funnelFloat 8.5s ease-in-out 2200ms infinite;
        }

        .concept-obelisk {
          position: absolute;
          z-index: 4;
          left: 50%;
          bottom: clamp(60px, 6vw, 92px);
          width: clamp(56px, 5.4vw, 88px);
          height: auto;
          opacity: 0;
          pointer-events: none;
          user-select: none;
          filter:
            contrast(1)
            drop-shadow(20px 24px 22px rgba(28, 28, 26, 0.18));
          transform: translate3d(-10%, 22px, 0) scale(0.96);
          animation:
            obeliskIn 0.75s cubic-bezier(0.2, 0.8, 0.2, 1) 1140ms forwards,
            obeliskHover 8s ease-in-out 2400ms infinite;
        }

        .concept-space-map {
          position: relative;
          width: 100%;
          min-height: clamp(300px, 36vw, 500px);
          margin-top: clamp(26px, 4vw, 48px);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .concept-space-map::before {
          content: '';
          position: absolute;
          left: 8%;
          right: 8%;
          bottom: 14%;
          height: 18%;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(28, 28, 26, 0.16), transparent 72%);
          filter: blur(10px);
          opacity: 0;
          transform: rotate(-4deg) scaleX(0.7);
          animation: shadowIn 0.7s ease 1660ms forwards;
        }

        .venue-wrap {
          position: relative;
          width: min(100%, 820px);
          aspect-ratio: 2048 / 1140;
          opacity: 0;
          transform: translateY(22px) scale(0.98);
          animation:
            venueIn 0.82s cubic-bezier(0.2, 0.8, 0.2, 1) 1520ms forwards,
            venueFloat 4.8s ease-in-out 2700ms infinite;
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
          animation: venueGlitchA 8.5s steps(1, end) 3000ms infinite;
        }

        .venue-glitch-b {
          filter:
            drop-shadow(0 0 12px rgba(80, 120, 130, 0.2))
            hue-rotate(18deg)
            saturate(1.12);
          animation: venueGlitchB 8.5s steps(1, end) 3000ms infinite;
        }

        .zone-controls {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          margin-top: clamp(4px, 0.8vw, 10px);
        }

        .experience-nav {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          margin-top: clamp(42px, 5vw, 64px);
        }

        .action-card {
          position: relative;
          min-height: clamp(76px, 7vw, 104px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          padding: clamp(14px, 1.4vw, 20px) clamp(16px, 1.8vw, 24px);
          border: 1px solid transparent;
          background: rgba(232, 226, 212, 0.34);
          color: ${C.ink};
          text-decoration: none;
          box-shadow: 6px 6px 0 rgba(28, 28, 26, 0);
          overflow: hidden;
          opacity: 0;
          transform: translateY(12px);
          animation: cardIn 0.54s ease var(--card-delay, 1900ms) forwards;
          transition:
            transform 0.24s ease,
            background 0.24s ease,
            color 0.24s ease,
            box-shadow 0.24s ease;
        }

        .action-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg, rgba(212, 80, 122, 0.16), transparent 42%),
            repeating-linear-gradient(90deg, rgba(28, 28, 26, 0.06) 0 1px, transparent 1px 11px);
          opacity: 0;
          transition: opacity 0.24s ease;
        }

        .action-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border: 1px solid rgba(28, 28, 26, 0.48);
          pointer-events: none;
          clip-path: inset(0 100% 100% 0);
          animation: borderDraw 0.64s ease calc(var(--card-delay, 1900ms) + 100ms) forwards;
        }

        .action-card-title,
        .action-card-meta {
          position: relative;
          z-index: 1;
        }

        .action-card-title {
          display: block;
          font-family: ${MONO};
          font-size: clamp(18px, 1.7vw, 28px);
          font-weight: 700;
          line-height: 0.95;
          letter-spacing: 0px;
          text-transform: uppercase;
          text-shadow: 0.012em 0 0 currentColor;
        }

        .action-card-meta {
          display: block;
          margin-top: 0;
          font-family: ${MONO};
          color: rgba(28, 28, 26, 0.58);
          font-size: 10px;
          letter-spacing: 0.18em;
          line-height: 1;
          text-transform: uppercase;
        }

        .action-card:hover,
        .action-card:focus-visible,
        .zone-card.is-active {
          background: rgba(212, 80, 122, 0.1);
          color: ${C.ink};
          box-shadow: 10px 10px 0 rgba(212, 80, 122, 0.14);
          transform: translate(-3px, -3px);
          outline: none;
        }

        .action-card:hover::before,
        .action-card:focus-visible::before,
        .zone-card.is-active::before {
          opacity: 1;
        }

        .action-card:hover::after,
        .action-card:focus-visible::after,
        .zone-card.is-active::after {
          border-color: rgba(212, 80, 122, 0.9);
        }

        .zone-card.is-active .action-card-meta {
          color: rgba(28, 28, 26, 0.78);
        }

        .experience-card.is-dark {
          background: ${C.ink};
          color: ${C.cream};
        }

        .experience-card.is-dark .action-card-meta {
          color: rgba(232, 226, 212, 0.66);
        }

        .experience-card.is-dark:hover,
        .experience-card.is-dark:focus-visible {
          background: ${C.pink};
          color: ${C.cream};
        }

        .action-card:hover .action-card-meta,
        .action-card:focus-visible .action-card-meta {
          color: currentColor;
          opacity: 0.7;
        }

        @keyframes drawVertical {
          to {
            transform: scaleY(1);
          }
        }

        @keyframes drawHorizontal {
          to {
            transform: scaleX(1);
          }
        }

        @keyframes scanTitleReveal {
          0% {
            opacity: 0;
            clip-path: inset(0 100% 0 0);
            transform: translateX(-10px);
            filter: blur(2px);
          }

          65% {
            opacity: 1;
            clip-path: inset(0 0 0 0);
            transform: translateX(0);
            filter: blur(0);
          }

          75% {
            transform: translateX(4px);
          }

          82% {
            transform: translateX(-2px);
          }

          100% {
            opacity: 1;
            clip-path: inset(0 0 0 0);
            transform: translateX(0);
            filter: blur(0);
          }
        }

        @keyframes titleMicroGlitch {
          0%,
          100% {
            text-shadow: 0.018em 0 0 currentColor;
          }

          35% {
            text-shadow:
              0.018em 0 0 currentColor,
              0.08em 0 0 rgba(212, 80, 122, 0.38);
          }

          65% {
            text-shadow:
              0.018em 0 0 currentColor,
              -0.06em 0 0 rgba(122, 120, 112, 0.34);
          }
        }

        @keyframes typeReveal {
          to {
            clip-path: inset(0 0 0 0);
          }
        }

        @keyframes dotEnter {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes dotSignal {
          0%,
          72%,
          100% {
            background: ${C.ink};
            transform: scale(1);
            box-shadow: none;
          }

          76% {
            background: ${C.muted};
            transform: translateX(1px) scale(1.05);
          }

          80% {
            background: ${C.pink};
            transform: translateX(-2px) scale(1.12);
            box-shadow: 0 0 0 5px rgba(212, 80, 122, 0.08);
          }

          83% {
            background: ${C.ink};
            transform: translateX(2px) scale(0.96);
          }

          86% {
            background: ${C.pink};
            transform: scale(1.08);
          }

          90% {
            background: ${C.ink};
            transform: scale(1);
            box-shadow: none;
          }
        }

        @keyframes floorIn {
          to {
            opacity: 1;
            transform: translate3d(-48%, 0, 0);
          }
        }

        @keyframes funnelIn {
          to {
            opacity: 1;
            transform: translate3d(-50%, 0, 0) scale(1);
          }
        }

        @keyframes obeliskIn {
          to {
            opacity: 1;
            transform: translate3d(-10%, 0, 0) scale(1);
          }
        }

        @keyframes shadowIn {
          to {
            opacity: 0.38;
            transform: rotate(-4deg) scaleX(1);
          }
        }

        @keyframes venueIn {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes cardIn {
          to {
            opacity: 1;
            transform: translateY(0);
            box-shadow: 6px 6px 0 rgba(28, 28, 26, 0.08);
          }
        }

        @keyframes borderDraw {
          0% {
            clip-path: inset(0 100% 100% 0);
          }

          45% {
            clip-path: inset(0 0 100% 0);
          }

          100% {
            clip-path: inset(0 0 0 0);
          }
        }

        @keyframes funnelFloat {
          0%,
          100% {
            transform: translate3d(-50%, 0, 0) rotate(0deg);
          }

          50% {
            transform: translate3d(calc(-50% - 8px), 8px, 0) rotate(1.3deg);
          }
        }

        @keyframes floorDrift {
          0%,
          100% {
            transform: translate3d(-48%, 0, 0);
          }

          50% {
            transform: translate3d(calc(-48% + 10px), -4px, 0);
          }
        }

        @keyframes obeliskHover {
          0%,
          100% {
            transform: translate3d(-10%, 0, 0);
          }

          50% {
            transform: translate3d(-10%, -8px, 0);
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

          .hero-section {
            grid-template-columns: 1fr;
          }

          .hero-art {
            max-width: 460px;
            width: 100%;
            margin-left: auto;
            margin-right: auto;
          }

          .zone-controls {
            grid-template-columns: 1fr;
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
            min-height: auto;
            gap: 18px;
          }

          .hero-art {
            min-height: 350px;
            max-width: 380px;
          }

          .space-section {
            padding-top: 74px;
            padding-bottom: 36px;
          }

          .experience-section {
            padding-top: 64px;
            padding-bottom: 72px;
          }

          h1,
          .scan-title-hero {
            font-size: clamp(52px, 14vw, 82px);
          }

          h2,
          .scan-title-space,
          .scan-title-experience {
            font-size: clamp(40px, 11vw, 64px);
          }

          .concept-dot {
            left: 0;
            top: calc(100% + 22px);
          }

          .address {
            margin-top: 72px;
            max-width: 360px;
            font-size: 12px;
            letter-spacing: 0.18em;
          }

          .concept-space-map {
            min-height: clamp(250px, 64vw, 410px);
            margin-top: 34px;
          }

          .venue-wrap {
            width: min(116%, 640px);
            margin-left: -8%;
          }

          .zone-controls {
            margin-top: 4px;
          }

          .concept-floor {
            width: 410px;
          }

          .concept-funnel-inline {
            width: 142px;
            top: 16px;
          }

          .concept-obelisk {
            width: 76px;
            bottom: 68px;
          }

          .experience-nav {
            grid-template-columns: 1fr 1fr;
            margin-top: 42px;
          }
        }

        @media (max-width: 620px) {
          .experience-nav {
            grid-template-columns: 1fr;
          }

          .hero-art {
            max-width: 320px;
          }

          .concept-floor {
            width: 320px;
          }

          .concept-funnel-inline {
            width: 118px;
          }

          .concept-obelisk {
            width: 62px;
            bottom: 58px;
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
            gap: 14px;
          }

          .hero-art {
            min-height: 280px;
            max-width: 280px;
          }

          .section-rule {
            margin-bottom: 26px;
          }

          .space-section {
            padding-top: 62px;
            padding-bottom: 30px;
          }

          .experience-section {
            padding-top: 58px;
            padding-bottom: 60px;
          }

          .concept-space-map {
            min-height: 230px;
            margin-top: 30px;
          }

          .venue-wrap {
            width: 132%;
            margin-left: -16%;
          }

          .action-card {
            min-height: 84px;
          }

          .action-card-title {
            font-size: 20px;
          }

          .action-card-meta {
            font-size: 9px;
          }

          .concept-floor {
            width: 280px;
          }

          .concept-funnel-inline {
            width: 104px;
            top: 10px;
          }

          .concept-obelisk {
            width: 54px;
            bottom: 48px;
          }

          .experience-nav {
            margin-top: 36px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .concept-nav-shell,
          .axis-v,
          .section-rule,
          .scan-title,
          .type-text,
          .concept-dot,
          .concept-floor,
          .concept-funnel-inline,
          .concept-obelisk,
          .concept-space-map::before,
          .venue-wrap,
          .venue-glitch-a,
          .venue-glitch-b,
          .venue-highlight-glow.is-active,
          .venue-highlight.is-active,
          .action-card,
          .action-card::after {
            animation: none !important;
            transition: none !important;
          }

          .concept-nav-shell,
          .scan-title,
          .concept-dot,
          .concept-floor,
          .concept-funnel-inline,
          .concept-obelisk,
          .venue-wrap,
          .action-card {
            opacity: 1;
          }

          .axis-v,
          .section-rule {
            transform: none;
          }

          .scan-title,
          .type-text {
            clip-path: inset(0 0 0 0);
          }

          .concept-dot,
          .concept-floor,
          .concept-funnel-inline,
          .concept-obelisk,
          .venue-wrap,
          .action-card {
            transform: none;
          }

          .concept-floor {
            transform: translate3d(-48%, 0, 0);
          }

          .concept-funnel-inline {
            transform: translate3d(-50%, 0, 0);
          }

          .concept-obelisk {
            transform: translate3d(-10%, 0, 0);
          }

          .action-card::after {
            clip-path: inset(0 0 0 0);
          }
        }
      `}</style>
    </>
  );
}

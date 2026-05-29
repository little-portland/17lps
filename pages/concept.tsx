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
  flyerGraphic: '/images/concept/concept_flyer_graphics.png',
};

const SPACE_ASSETS = {
  venue: '/images/concept/the-space-page-venue.png',
};

const AREAS: AreaConfig[] = [
  {
    id: 'tent',
    title: 'THE TENT',
    href: '/thetent',
    highlight: '/images/concept/tent-highlight.png',
    chars: 8,
  },
  {
    id: 'chefs-studio',
    title: "CHEF'S STUDIO",
    href: '/chefstudio',
    highlight: '/images/concept/chefs-studio-highlight.png',
    chars: 13,
  },
  {
    id: 'studio',
    title: 'THE STUDIO',
    href: '/studio',
    highlight: '/images/concept/studio-highlight.png',
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
    }, 2100);

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
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('.reveal-section')
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add('is-inview');
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
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

          <section
            className="content-section hero-section reveal-section"
            aria-labelledby="concept-title"
          >
            <div className="hero-copy">
              <h1 id="concept-title" className="scan-title scan-title-hero">
                Concept<span className="concept-dot" aria-hidden="true" />
              </h1>

              <p className="address">
                <span className="type-text" style={typeStyle(33, '620ms')}>
                  17 Little Portland Street, London
                </span>
              </p>
            </div>

            <div className="hero-art" aria-hidden="true">
              <img
                className="concept-flyer-graphic"
                src={CONCEPT_ASSETS.flyerGraphic}
                alt=""
                draggable={false}
              />
            </div>
          </section>

          <section
            className="content-section space-section reveal-section"
            aria-labelledby="space-title"
          >
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
                        '--card-delay': `${280 + index * 100}ms`,
                      } as CSSProperties
                    }
                  >
                    <span className="action-card-title">
                      <span
                        className="type-text"
                        style={typeStyle(area.chars, `${420 + index * 100}ms`)}
                      >
                        {area.title}
                      </span>
                    </span>
                    <span className="action-card-meta">
                      <span
                        className="type-text"
                        style={typeStyle(9, `${560 + index * 100}ms`)}
                      >
                        {helperText}
                      </span>
                    </span>
                  </a>
                );
              })}
            </nav>
          </section>

          <section
            className="content-section experience-section reveal-section"
            aria-labelledby="experience-title"
          >
            <div className="section-rule" aria-hidden="true" />

            <h2 id="experience-title" className="scan-title scan-title-experience">
              The Experience
            </h2>

            <div className="experience-signal" aria-hidden="true">
              <div className="signal-track">
                <div className="signal-line" />
                <div className="signal-line-fill" />
              </div>

              <div className="signal-node signal-node-dining">
                <span className="signal-dot" />
                <span className="signal-time">20:00 / 20:30</span>
              </div>

              <div className="signal-node signal-node-after-dark">
                <span className="signal-dot" />
                <span className="signal-time">22:00</span>
              </div>
            </div>

            <nav className="experience-nav" aria-label="Explore the experience">
              {EXPERIENCE_BTNS.map((button, index) => (
                <a
                  key={button.href}
                  href={button.href}
                  className={`action-card experience-card ${button.dark ? 'is-dark' : ''}`}
                  style={
                    {
                      '--card-delay': `${460 + index * 120}ms`,
                    } as CSSProperties
                  }
                >
                  <span className="action-card-title">
                    <span
                      className="type-text"
                      style={typeStyle(button.chars, `${620 + index * 120}ms`)}
                    >
                      {button.label}
                    </span>
                  </span>
                  <span className="action-card-meta">
                    <span
                      className="type-text"
                      style={typeStyle(9, `${760 + index * 120}ms`)}
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

        .concept-nav-shell.is-scrolled .scene-nav.scene-nav--space {
          background: rgba(232, 226, 212, 0.5) !important;
          border-bottom: 1px solid rgba(28, 28, 26, 0.14);
          box-shadow: 0 10px 28px rgba(28, 28, 26, 0.07);
          backdrop-filter: blur(18px) !important;
          -webkit-backdrop-filter: blur(18px) !important;
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
        }

        .reveal-section.is-inview .section-rule {
          animation: drawHorizontal 0.78s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
        }

        .hero-section {
          min-height: clamp(420px, 58svh, 640px);
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(220px, 0.8fr);
          align-items: center;
          gap: clamp(28px, 5vw, 76px);
        }

        .hero-copy {
          position: relative;
          z-index: 7;
          min-width: 0;
        }

        .hero-art {
          position: relative;
          z-index: 4;
          min-height: clamp(320px, 32vw, 460px);
          overflow: visible;
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          padding-top: clamp(48px, 6vw, 90px);
        }

        .space-section {
          padding-top: clamp(72px, 8vw, 110px);
          padding-bottom: clamp(34px, 4vw, 56px);
        }

        .experience-section {
          padding-top: clamp(48px, 5vw, 70px);
          padding-bottom: clamp(92px, 9vw, 140px);
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
          white-space: nowrap;
          padding-right: clamp(34px, 3vw, 54px);
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
        }

        .reveal-section.is-inview .scan-title {
          animation:
            scanTitleReveal 0.46s steps(8, end) 220ms forwards,
            titleMicroGlitch 0.48s steps(2, end) 720ms forwards,
            titleIdleGlitch 7.5s steps(2, end) 3200ms infinite;
        }

        .concept-dot {
          position: absolute;
          right: 0;
          top: 50%;
          display: block;
          width: clamp(18px, 2vw, 31px);
          height: clamp(18px, 2vw, 31px);
          border-radius: 999px;
          background: ${C.ink};
          opacity: 0;
          transform: translateY(-50%) scale(0.4);
          text-shadow: none;
        }

        .hero-section.is-inview .concept-dot {
          animation:
            dotEnter 0.36s cubic-bezier(0.2, 1.6, 0.3, 1) 720ms forwards,
            dotSignal 4.8s steps(1, end) 1350ms infinite;
        }

        .address {
          position: relative;
          z-index: 5;
          margin-top: clamp(22px, 2.6vw, 38px);
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
        }

        .reveal-section.is-inview .type-text {
          animation: typeReveal 0.5s steps(var(--chars), end) var(--type-delay) forwards;
        }

        .concept-flyer-graphic {
          display: block;
          width: min(100%, 390px);
          height: auto;
          opacity: 0;
          transform: translate3d(18px, 42px, 0) scale(0.98);
          pointer-events: none;
          user-select: none;
          filter: contrast(1) saturate(1);
        }

        .hero-section.is-inview .concept-flyer-graphic {
          animation: flyerGraphicIn 0.76s cubic-bezier(0.2, 0.8, 0.2, 1) 760ms forwards;
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
        }

        .space-section.is-inview .concept-space-map::before {
          animation: shadowIn 0.7s ease 520ms forwards;
        }

        .venue-wrap {
          position: relative;
          width: min(100%, 820px);
          aspect-ratio: 2048 / 1140;
          opacity: 0;
          transform: translateY(22px) scale(0.98);
        }

        .space-section.is-inview .venue-wrap {
          animation:
            venueIn 0.82s cubic-bezier(0.2, 0.8, 0.2, 1) 420ms forwards,
            venueFloat 4.8s ease-in-out 1600ms infinite;
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

        .space-section.is-inview .venue-glitch-a {
          filter:
            drop-shadow(0 0 12px rgba(212, 80, 122, 0.3))
            hue-rotate(-16deg)
            saturate(1.25);
          animation: venueGlitchA 8.5s steps(1, end) 1800ms infinite;
        }

        .space-section.is-inview .venue-glitch-b {
          filter:
            drop-shadow(0 0 12px rgba(80, 120, 130, 0.2))
            hue-rotate(18deg)
            saturate(1.12);
          animation: venueGlitchB 8.5s steps(1, end) 1800ms infinite;
        }

        .zone-controls {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          margin-top: clamp(4px, 0.8vw, 10px);
        }

        .experience-signal {
          --signal-y: 36px;
          position: relative;
          z-index: 4;
          width: 100%;
          height: clamp(58px, 5.6vw, 78px);
          margin-top: clamp(34px, 4.6vw, 58px);
          margin-bottom: clamp(6px, 0.8vw, 12px);
          overflow: visible;
        }

        .signal-track {
          position: absolute;
          left: 0;
          right: 0;
          top: var(--signal-y);
          height: 1px;
        }

        .signal-line,
        .signal-line-fill {
          position: absolute;
          inset: 0;
          height: 1px;
          transform-origin: left center;
        }

        .signal-line {
          background: rgba(28, 28, 26, 0.32);
          transform: scaleX(0);
        }

        .signal-line-fill {
          background: ${C.pink};
          transform: scaleX(0);
        }

        .experience-section.is-inview .signal-line {
          animation: signalLineIn 0.82s cubic-bezier(0.25, 0.8, 0.25, 1) 420ms forwards;
        }

        .experience-section.is-inview .signal-line-fill {
          animation: signalFillLoop 4.6s cubic-bezier(0.65, 0, 0.25, 1) 1200ms infinite;
        }

        .signal-node {
          position: absolute;
          top: 0;
          min-width: 160px;
          height: 56px;
          opacity: 0;
          transform: translateY(8px);
        }

        .signal-node-dining {
          left: 0;
        }

        .signal-node-after-dark {
          right: 0;
          text-align: right;
        }

        .experience-section.is-inview .signal-node-dining {
          animation: signalNodeIn 0.48s ease 680ms forwards;
        }

        .experience-section.is-inview .signal-node-after-dark {
          animation: signalNodeIn 0.48s ease 820ms forwards;
        }

        .signal-dot {
          position: absolute;
          top: var(--signal-y);
          width: 15px;
          height: 15px;
          border-radius: 999px;
          background: rgba(28, 28, 26, 0.42);
          box-shadow: 0 0 0 5px rgba(28, 28, 26, 0.05);
          transform: translateY(-50%);
        }

        .signal-node-dining .signal-dot {
          left: 0;
        }

        .signal-node-after-dark .signal-dot {
          right: 0;
        }

        .experience-section.is-inview .signal-node-dining .signal-dot {
          animation: diningDotFill 4.6s steps(1, end) 1200ms infinite;
        }

        .experience-section.is-inview .signal-node-after-dark .signal-dot {
          animation: afterDarkDotFill 4.6s steps(1, end) 1200ms infinite;
        }

        .signal-time {
          position: absolute;
          top: 0;
          font-family: ${MONO};
          font-size: clamp(12px, 1.1vw, 16px);
          font-weight: 700;
          line-height: 1;
          letter-spacing: 0.18em;
          color: rgba(28, 28, 26, 0.62);
          text-transform: uppercase;
          white-space: nowrap;
        }

        .signal-node-dining .signal-time {
          left: 28px;
        }

        .signal-node-after-dark .signal-time {
          right: 28px;
        }

        .experience-section.is-inview .signal-node-dining .signal-time {
          animation: diningTimeFill 4.6s steps(1, end) 1200ms infinite;
        }

        .experience-section.is-inview .signal-node-after-dark .signal-time {
          animation: afterDarkTimeFill 4.6s steps(1, end) 1200ms infinite;
        }

        .experience-nav {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          margin-top: 0;
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
          transition:
            transform 0.24s ease,
            background 0.24s ease,
            color 0.24s ease,
            box-shadow 0.24s ease;
        }

        .reveal-section.is-inview .action-card {
          animation: cardIn 0.54s ease var(--card-delay, 320ms) forwards;
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
        }

        .reveal-section.is-inview .action-card::after {
          animation: borderDraw 0.64s ease calc(var(--card-delay, 320ms) + 100ms) forwards;
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

        @keyframes titleIdleGlitch {
          0%,
          92%,
          100% {
            filter: none;
            text-shadow: 0.018em 0 0 currentColor;
          }

          93% {
            filter: blur(0.2px);
            text-shadow:
              0.018em 0 0 currentColor,
              0.08em 0 0 rgba(212, 80, 122, 0.32);
          }

          94% {
            filter: none;
            text-shadow:
              0.018em 0 0 currentColor,
              -0.07em 0 0 rgba(122, 120, 112, 0.28);
          }

          95% {
            filter: blur(0.3px);
          }

          96% {
            filter: none;
            text-shadow: 0.018em 0 0 currentColor;
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
            transform: translateY(-50%) scale(1);
          }
        }

        @keyframes dotSignal {
          0%,
          72%,
          100% {
            background: ${C.ink};
            transform: translateY(-50%) scale(1);
            box-shadow: none;
          }

          76% {
            background: ${C.muted};
            transform: translateY(-50%) translateX(1px) scale(1.05);
          }

          80% {
            background: ${C.pink};
            transform: translateY(-50%) translateX(-2px) scale(1.12);
            box-shadow: 0 0 0 5px rgba(212, 80, 122, 0.08);
          }

          83% {
            background: ${C.ink};
            transform: translateY(-50%) translateX(2px) scale(0.96);
          }

          86% {
            background: ${C.pink};
            transform: translateY(-50%) scale(1.08);
          }

          90% {
            background: ${C.ink};
            transform: translateY(-50%) scale(1);
            box-shadow: none;
          }
        }

        @keyframes flyerGraphicIn {
          to {
            opacity: 1;
            transform: translate3d(0, 36px, 0) scale(1);
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

        @keyframes signalLineIn {
          to {
            transform: scaleX(1);
          }
        }

        @keyframes signalFillLoop {
          0%,
          12% {
            transform: scaleX(0);
            opacity: 0;
          }

          18% {
            opacity: 1;
          }

          56% {
            transform: scaleX(1);
            opacity: 1;
          }

          72%,
          100% {
            transform: scaleX(1);
            opacity: 0;
          }
        }

        @keyframes signalNodeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes diningDotFill {
          0%,
          12%,
          100% {
            background: rgba(28, 28, 26, 0.42);
            box-shadow: 0 0 0 5px rgba(28, 28, 26, 0.05);
          }

          18%,
          66% {
            background: ${C.pink};
            box-shadow: 0 0 0 7px rgba(212, 80, 122, 0.1);
          }
        }

        @keyframes afterDarkDotFill {
          0%,
          48%,
          100% {
            background: rgba(28, 28, 26, 0.42);
            box-shadow: 0 0 0 5px rgba(28, 28, 26, 0.05);
          }

          56%,
          76% {
            background: ${C.pink};
            box-shadow: 0 0 0 7px rgba(212, 80, 122, 0.1);
          }
        }

        @keyframes diningTimeFill {
          0%,
          12%,
          100% {
            color: rgba(28, 28, 26, 0.62);
          }

          18%,
          66% {
            color: ${C.pink};
          }
        }

        @keyframes afterDarkTimeFill {
          0%,
          48%,
          100% {
            color: rgba(28, 28, 26, 0.62);
          }

          56%,
          76% {
            color: ${C.pink};
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
            align-items: start;
          }

          .hero-art {
            max-width: 360px;
            width: 100%;
            margin-left: auto;
            margin-right: auto;
            min-height: auto;
            justify-content: center;
            padding-top: 18px;
          }

          .concept-flyer-graphic {
            width: min(100%, 320px);
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
            gap: 26px;
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
            width: 18px;
            height: 18px;
          }

          .address {
            margin-top: 24px;
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

          .experience-signal {
            height: 58px;
            margin-top: 34px;
            margin-bottom: 10px;
          }

          .signal-time {
            font-size: 11px;
            letter-spacing: 0.12em;
          }

          .experience-nav {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 620px) {
          .experience-nav {
            grid-template-columns: 1fr;
          }

          .concept-flyer-graphic {
            width: min(100%, 280px);
          }

          .experience-signal {
            height: 102px;
          }

          .signal-track {
            top: 48px;
          }

          .signal-node {
            min-width: 220px;
          }

          .signal-node-dining {
            left: 0;
            top: 0;
          }

          .signal-node-after-dark {
            right: auto;
            left: 0;
            top: 56px;
            text-align: left;
          }

          .signal-node-dining .signal-dot,
          .signal-node-after-dark .signal-dot {
            left: 0;
            right: auto;
          }

          .signal-node-dining .signal-time,
          .signal-node-after-dark .signal-time {
            left: 28px;
            right: auto;
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
            gap: 20px;
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

          .concept-flyer-graphic {
            width: min(100%, 240px);
          }

          .experience-signal {
            margin-top: 30px;
            margin-bottom: 10px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .concept-nav-shell,
          .axis-v,
          .section-rule,
          .scan-title,
          .type-text,
          .concept-dot,
          .concept-flyer-graphic,
          .concept-space-map::before,
          .venue-wrap,
          .venue-glitch-a,
          .venue-glitch-b,
          .venue-highlight-glow.is-active,
          .venue-highlight.is-active,
          .signal-line,
          .signal-line-fill,
          .signal-node,
          .signal-dot,
          .signal-time,
          .action-card,
          .action-card::after {
            animation: none !important;
            transition: none !important;
          }

          .concept-nav-shell,
          .scan-title,
          .concept-dot,
          .concept-flyer-graphic,
          .venue-wrap,
          .signal-node,
          .action-card {
            opacity: 1;
          }

          .axis-v,
          .section-rule,
          .signal-line,
          .signal-line-fill {
            transform: none;
          }

          .scan-title,
          .type-text {
            clip-path: inset(0 0 0 0);
          }

          .concept-dot {
            transform: translateY(-50%) scale(1);
          }

          .concept-flyer-graphic,
          .venue-wrap,
          .signal-node,
          .action-card {
            transform: none;
          }

          .action-card::after {
            clip-path: inset(0 0 0 0);
          }
        }
      `}</style>
    </>
  );
}

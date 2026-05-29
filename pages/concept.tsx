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
  {
    label: 'Dining',
    href: 'https://www.little-portland.com/food',
    dark: false,
    chars: 6,
  },
  {
    label: 'After Dark',
    href: 'https://www.little-portland.com/theclub',
    dark: true,
    chars: 10,
  },
];

const typeStyle = (chars: number, delay: string): CSSProperties =>
  ({
    '--chars': chars,
    '--type-delay': delay,
  }) as CSSProperties;

function ActionCard({
  href,
  title,
  dark = false,
  active = false,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  onClick,
  style,
}: {
  href: string;
  title: string;
  dark?: boolean;
  active?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  style?: CSSProperties;
}) {
  return (
    <a
      href={href}
      className={`action-card ${dark ? 'is-dark' : ''} ${active ? 'is-active' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={onClick}
      style={style}
    >
      <span className="action-card-title">{title}</span>
      <span className="action-card-meta">
        Explore <span className="action-chevron" aria-hidden="true">›</span>
      </span>
    </a>
  );
}

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
                <span>Concept</span>
                <span className="concept-dot" aria-hidden="true" />
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
                    <img
                      key={area.id}
                      src={area.highlight}
                      alt=""
                      className={`venue-image venue-highlight ${
                        isActive ? 'is-active' : ''
                      }`}
                      draggable={false}
                    />
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

                return (
                  <ActionCard
                    key={area.id}
                    href={area.href}
                    title={area.title}
                    active={isActive}
                    onMouseEnter={() => handleCardEnter(area.id)}
                    onFocus={() => setActiveArea(area.id)}
                    onClick={handleCardClick(area.id)}
                    style={
                      {
                        '--card-delay': `${280 + index * 100}ms`,
                      } as CSSProperties
                    }
                  />
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
                <span className="signal-time">20:00 / 20:30</span>
                <span className="signal-dot">
                  <span className="signal-dot-fill" />
                </span>
              </div>

              <div className="signal-node signal-node-after-dark">
                <span className="signal-time">22:00</span>
                <span className="signal-dot">
                  <span className="signal-dot-fill" />
                </span>
              </div>
            </div>

            <nav className="experience-nav" aria-label="Explore the experience">
              {EXPERIENCE_BTNS.map((button, index) => (
                <ActionCard
                  key={button.href}
                  href={button.href}
                  title={button.label}
                  dark={button.dark}
                  style={
                    {
                      '--card-delay': `${460 + index * 120}ms`,
                    } as CSSProperties
                  }
                />
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
          background: #1c1c1a;
          opacity: 0.28;
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
          background: rgba(28, 28, 26, 0.18);
          transform: scaleX(0);
          transform-origin: left center;
        }

        .reveal-section.is-inview .section-rule {
          animation: drawHorizontal 0.78s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
        }

        .hero-section {
          min-height: clamp(420px, 58svh, 640px);
          display: grid;
          grid-template-columns: minmax(0, 1.18fr) minmax(220px, 0.82fr);
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
          min-height: clamp(280px, 28vw, 420px);
          overflow: visible;
          display: flex;
          align-items: center;
          justify-content: center;
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
          display: inline-flex;
          align-items: flex-end;
          gap: clamp(12px, 1.2vw, 22px);
          font-size: clamp(64px, 8.4vw, 128px);
          white-space: nowrap;
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
          display: inline-block;
          width: clamp(18px, 2vw, 31px);
          height: clamp(18px, 2vw, 31px);
          border-radius: 999px;
          background: ${C.ink};
          opacity: 0;
          flex: 0 0 auto;
          transform: translateY(-0.02em) scale(0.4);
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
          width: min(100%, 360px);
          height: auto;
          opacity: 0;
          transform: translate3d(16px, 20px, 0) scale(0.98);
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

        .venue-highlight {
          z-index: 4;
          opacity: 0;
          visibility: hidden;
          mix-blend-mode: normal;
          filter: none;
          transition:
            opacity 0.18s ease,
            visibility 0.18s ease;
        }

        .venue-highlight.is-active {
          opacity: 1;
          visibility: visible;
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
          --signal-y: 38px;
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
          height: 2px;
        }

        .signal-line,
        .signal-line-fill {
          position: absolute;
          inset: 0;
          height: 2px;
          transform-origin: left center;
        }

        .signal-line {
          background: rgba(28, 28, 26, 0.28);
          transform: scaleX(0);
        }

        .signal-line-fill {
          background: ${C.pink};
          transform: scaleX(0);
          opacity: 0;
        }

        .experience-section.is-inview .signal-line {
          animation: signalLineIn 0.82s cubic-bezier(0.25, 0.8, 0.25, 1) 420ms forwards;
        }

        .experience-section.is-inview .signal-line-fill {
          animation: signalFillLoop 5.2s ease-in-out 1200ms infinite;
        }

        .signal-node {
          position: absolute;
          top: 0;
          min-width: 180px;
          height: 60px;
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
          width: 18px;
          height: 18px;
          border-radius: 999px;
          background: #8f8a80;
          overflow: hidden;
          transform: translateY(-50%);
          z-index: 2;
        }

        .signal-node-dining .signal-dot {
          left: 0;
        }

        .signal-node-after-dark .signal-dot {
          right: 0;
        }

        .signal-dot-fill {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: ${C.pink};
          opacity: 0;
          transition: opacity 0.45s ease;
        }

        .experience-section.is-inview .signal-node-dining .signal-dot-fill {
          animation: diningDotFill 5.2s ease-in-out 1200ms infinite;
        }

        .experience-section.is-inview .signal-node-after-dark .signal-dot-fill {
          animation: afterDarkDotFill 5.2s ease-in-out 1200ms infinite;
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
          left: 0;
        }

        .signal-node-after-dark .signal-time {
          right: 0;
        }

        .experience-section.is-inview .signal-node-dining .signal-time {
          animation: diningTimeFill 5.2s ease-in-out 1200ms infinite;
        }

        .experience-section.is-inview .signal-node-after-dark .signal-time {
          animation: afterDarkTimeFill 5.2s ease-in-out 1200ms infinite;
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
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 0;
          font-family: ${MONO};
          color: rgba(28, 28, 26, 0.58);
          font-size: 10px;
          letter-spacing: 0.18em;
          line-height: 1;
          text-transform: uppercase;
        }

        .action-chevron {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 1.45em;
          line-height: 0.7;
          transform: translateY(-0.01em);
        }

        .action-card:hover,
        .action-card:focus-visible,
        .action-card.is-active {
          background: rgba(212, 80, 122, 0.1);
          color: ${C.ink};
          box-shadow: 10px 10px 0 rgba(212, 80, 122, 0.14);
          transform: translate(-3px, -3px);
          outline: none;
        }

        .action-card:hover::before,
        .action-card:focus-visible::before,
        .action-card.is-active::before {
          opacity: 1;
        }

        .action-card:hover::after,
        .action-card:focus-visible::after,
        .action-card.is-active::after {
          border-color: rgba(212, 80, 122, 0.9);
        }

        .action-card.is-dark {
          background: ${C.ink};
          color: ${C.cream};
        }

        .action-card.is-dark .action-card-meta {
          color: rgba(232, 226, 212, 0.66);
        }

        .action-card.is-dark:hover,
        .action-card.is-dark:focus-visible {
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
            transform: translateY(-0.02em) scale(1);
          }
        }

        @keyframes dotSignal {
          0%,
          72%,
          100% {
            background: ${C.ink};
            transform: translateY(-0.02em) scale(1);
            box-shadow: none;
          }

          76% {
            background: ${C.muted};
            transform: translateY(-0.02em) translateX(1px) scale(1.05);
          }

          80% {
            background: ${C.pink};
            transform: translateY(-0.02em) translateX(-2px) scale(1.12);
            box-shadow: 0 0 0 5px rgba(212, 80, 122, 0.08);
          }

          83% {
            background: ${C.ink};
            transform: translateY(-0.02em) translateX(2px) scale(0.96);
          }

          86% {
            background: ${C.pink};
            transform: translateY(-0.02em) scale(1.08);
          }

          90% {
            background: ${C.ink};
            transform: translateY(-0.02em) scale(1);
            box-shadow: none;
          }
        }

        @keyframes flyerGraphicIn {
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
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

          20% {
            transform: scaleX(0);
            opacity: 1;
          }

          62% {
            transform: scaleX(1);
            opacity: 1;
          }

          80%,
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
          12% {
            opacity: 0;
          }

          20%,
          68% {
            opacity: 1;
          }

          86%,
          100% {
            opacity: 0;
          }
        }

        @keyframes afterDarkDotFill {
          0%,
          48% {
            opacity: 0;
          }

          62%,
          78% {
            opacity: 1;
          }

          92%,
          100% {
            opacity: 0;
          }
        }

        @keyframes diningTimeFill {
          0%,
          12% {
            color: rgba(28, 28, 26, 0.62);
          }

          20%,
          68% {
            color: ${C.pink};
          }

          86%,
          100% {
            color: rgba(28, 28, 26, 0.62);
          }
        }

        @keyframes afterDarkTimeFill {
          0%,
          48% {
            color: rgba(28, 28, 26, 0.62);
          }

          62%,
          78% {
            color: ${C.pink};
          }

          92%,
          100% {
            color: rgba(28, 28, 26, 0.62);
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
            left: 0;
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
          .venue-highlight.is-active,
          .signal-line,
          .signal-line-fill,
          .signal-node,
          .signal-dot-fill,
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
          .signal-line {
            transform: none;
          }

          .scan-title,
          .type-text {
            clip-path: inset(0 0 0 0);
          }

          .concept-dot,
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

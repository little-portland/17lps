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
};

const CONCEPT_ASSETS = {
  bg: '/images/concept/concept_bg.jpg',
  funnel: '/images/concept/grid_funel.png',
  floor: '/images/concept/noise_floor.png',
  obelisk: '/images/concept/obelisk-dark-grey.png',
};

const SPACE_ASSETS = {
  venue: '/images/concept/the-space-page-venue.png',
};

const AREAS: AreaConfig[] = [
  {
    id: 'tent',
    title: 'THE TENT',
    href: '/thetent-test',
    highlight: '/images/concept/tent-highlight.png',
  },
  {
    id: 'chefs-studio',
    title: "CHEF'S STUDIO",
    href: '/chefstudio-test',
    highlight: '/images/concept/chefs-studio-highlight.png',
  },
  {
    id: 'studio',
    title: 'THE STUDIO',
    href: '/studio-test',
    highlight: '/images/concept/studio-highlight.png',
  },
];

const EXPERIENCE_BTNS = [
  {
    label: 'Dining',
    href: '/food-test',
    dark: false,
  },
  {
    label: 'After Dark',
    href: '/theclub-test',
    dark: true,
  },
];

function ActionCard({
  href,
  title,
  meta = 'Explore',
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
  meta?: string;
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
        {meta} <span className="action-arrow" aria-hidden="true">→</span>
      </span>
    </a>
  );
}

export default function ConceptPage() {
  const [activeArea, setActiveArea] = useState<AreaId | null>(null);
  const [isTouchMode, setIsTouchMode] = useState(false);
  const [menuReady, setMenuReady] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [diningTime, setDiningTime] = useState('20:00 / 20:30');
  const [afterDarkTime, setAfterDarkTime] = useState('22:00');

  useEffect(() => {
    let timers: number[] = [];

    const clearTimers = () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      timers = [];
    };

    const runTimeSequence = () => {
      clearTimers();

      setDiningTime('20:00 / 20:30');
      setAfterDarkTime('22:00');

      timers = [
        window.setTimeout(() => setDiningTime('18:40 / 19:10'), 2200),
        window.setTimeout(() => setDiningTime('21:12 / 21:40'), 2420),
        window.setTimeout(() => setDiningTime('19:55 / 20:14'), 2640),
        window.setTimeout(() => setDiningTime('20:00 / 20:30'), 2880),

        window.setTimeout(() => setAfterDarkTime('23:17'), 5600),
        window.setTimeout(() => setAfterDarkTime('01:40'), 5820),
        window.setTimeout(() => setAfterDarkTime('21:52'), 6040),
        window.setTimeout(() => setAfterDarkTime('22:00'), 6280),
      ];
    };

    runTimeSequence();

    const interval = window.setInterval(runTimeSequence, 12000);

    return () => {
      window.clearInterval(interval);
      clearTimers();
    };
  }, []);

  useEffect(() => {
    const menuTimer = window.setTimeout(() => {
      setMenuReady(true);
    }, 850);

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
    const items = Array.from(
      document.querySelectorAll<HTMLElement>('.story-panel, .reveal-section')
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-inview', entry.isIntersecting);
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    items.forEach((item) => observer.observe(item));

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

        <section className="story-shell">
          <div className="story-axis-v" aria-hidden="true" />

          <article className="story-panel story-panel--intro" aria-labelledby="concept-title">
            <div className="story-rule" aria-hidden="true" />
            <div className="story-grid">
              <div className="story-copy">
                <p className="story-kicker">LPX // UNDERGROUND ISSUE 51</p>

                <h1 id="concept-title" className="story-title">
                  CONCEPT.
                </h1>

                <p className="story-address">
                  17 Little Portland Street, London
                </p>
              </div>

              <div className="story-art story-art--portal" aria-hidden="true">
                <div className="portal-scene portal-scene--intro">
                  <span className="portal-axis" />
                  <img
                    src={CONCEPT_ASSETS.funnel}
                    alt=""
                    className="portal-img portal-funnel"
                    draggable={false}
                  />
                  <img
                    src={CONCEPT_ASSETS.floor}
                    alt=""
                    className="portal-img portal-floor"
                    draggable={false}
                  />
                  <img
                    src={CONCEPT_ASSETS.obelisk}
                    alt=""
                    className="portal-img portal-obelisk"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          </article>

          <article className="story-panel story-panel--transition" aria-labelledby="signal-title">
            <div className="story-rule" aria-hidden="true" />
            <div className="story-grid story-grid--reverse">
              <div className="story-art story-art--portal-large" aria-hidden="true">
                <div className="portal-scene portal-scene--transition">
                  <span className="portal-axis" />
                  <img
                    src={CONCEPT_ASSETS.funnel}
                    alt=""
                    className="portal-img portal-funnel"
                    draggable={false}
                  />
                  <img
                    src={CONCEPT_ASSETS.floor}
                    alt=""
                    className="portal-img portal-floor"
                    draggable={false}
                  />
                  <img
                    src={CONCEPT_ASSETS.obelisk}
                    alt=""
                    className="portal-img portal-obelisk"
                    draggable={false}
                  />
                </div>
              </div>

              <div className="story-copy">
                <p className="story-kicker">SCROLL THROUGH THE SIGNAL</p>

                <h2 id="signal-title" className="story-section-title">
                  THE SIGNAL
                </h2>

                <p className="story-text">
                  The funnel opens the scene, the floor draws itself into place,
                  and the obelisk becomes the anchor — a portal that resolves
                  into the space below.
                </p>
              </div>
            </div>
          </article>

          <article className="story-panel story-panel--space" aria-labelledby="space-story-title">
            <div className="story-rule" aria-hidden="true" />
            <div className="story-grid">
              <div className="story-copy">
                <p className="story-kicker">THE ROOM APPEARS</p>

                <h2 id="space-story-title" className="story-section-title">
                  THE SPACE
                </h2>

                <p className="story-text">
                  From the portal, the venue emerges — The Tent, Chef’s Studio
                  and The Studio — ready to preview and explore.
                </p>

                <p className="story-prompt">Scroll to explore the zones</p>
              </div>

              <div className="story-art story-art--venue" aria-hidden="true">
                <div className="story-venue-wrap">
                  <img
                    src={SPACE_ASSETS.venue}
                    alt=""
                    className="story-venue-image"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          </article>
        </section>

        <div className="shell">
          <div className="axis-v" aria-hidden="true" />

          <section
            className="content-section space-section reveal-section"
            aria-labelledby="space-title"
          >
            <div className="section-rule" aria-hidden="true" />

            <h2 id="space-title" className="scan-title scan-title-space">
              THE SPACE
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
                const mobileMeta = isActive ? 'Tap to explore' : 'Tap to preview';

                return (
                  <ActionCard
                    key={area.id}
                    href={area.href}
                    title={area.title}
                    meta={isTouchMode ? mobileMeta : 'Explore'}
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
              THE EXPERIENCE
            </h2>

            <div className="experience-signal" aria-hidden="true">
              <div className="signal-track">
                <div className="signal-line" />
                <div className="signal-line-fill" />
              </div>

              <div className="signal-node signal-node-dining">
                <span className="signal-time signal-time-dining">{diningTime}</span>
                <span className="signal-dot">
                  <span className="signal-dot-fill" />
                </span>
              </div>

              <div className="signal-node signal-node-after-dark">
                <span className="signal-time signal-time-after-dark">{afterDarkTime}</span>
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
        .scene-nav-mobile--space a.active,
        .scene-nav--space a[aria-current='page'],
        .scene-nav-mobile--space a[aria-current='page'] {
          color: ${C.pink} !important;
          opacity: 1 !important;
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
          .concept-nav-shell {
            z-index: 50000 !important;
          }

          .concept-nav-shell::before {
            content: '';
            position: fixed;
            inset: 0;
            z-index: 49990;
            opacity: 0;
            pointer-events: none;
            background: rgba(232, 226, 212, 0.86);
            backdrop-filter: blur(22px) saturate(1.08);
            -webkit-backdrop-filter: blur(22px) saturate(1.08);
            transition: opacity 0.28s ease;
          }

          .concept-nav-shell:has(.scene-nav-burger[aria-expanded='true'])::before,
          .concept-nav-shell:has(button[aria-expanded='true'])::before {
            opacity: 1;
            pointer-events: auto;
          }

          .concept-nav-shell .scene-nav {
            z-index: 50020 !important;
          }

          .scene-nav-burger,
          .scene-nav-logo {
            z-index: 50040 !important;
          }

          .concept-nav-shell:has(.scene-nav-burger[aria-expanded='true']) .scene-nav,
          .concept-nav-shell:has(button[aria-expanded='true']) .scene-nav {
            background: rgba(232, 226, 212, 0.86) !important;
            backdrop-filter: blur(22px) !important;
            -webkit-backdrop-filter: blur(22px) !important;
            box-shadow: none !important;
          }

          .concept-nav-shell:has(.scene-nav-burger[aria-expanded='true']) .scene-nav-mobile,
          .concept-nav-shell:has(button[aria-expanded='true']) .scene-nav-mobile,
          .concept-nav-shell:has(.scene-nav-burger[aria-expanded='true']) .scene-nav-mobile--space,
          .concept-nav-shell:has(button[aria-expanded='true']) .scene-nav-mobile--space {
            position: fixed !important;
            inset: 0 !important;
            z-index: 50010 !important;
            min-height: 100dvh !important;
            height: 100dvh !important;
            padding: 104px 28px 38px !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: flex-start !important;
            gap: 20px !important;
            overflow-y: auto !important;
            background: rgba(232, 226, 212, 0.86) !important;
            backdrop-filter: blur(22px) saturate(1.08) !important;
            -webkit-backdrop-filter: blur(22px) saturate(1.08) !important;
          }

          .concept-nav-shell:has(.scene-nav-burger[aria-expanded='true']) .scene-nav-mobile-inner,
          .concept-nav-shell:has(button[aria-expanded='true']) .scene-nav-mobile-inner {
            width: 100% !important;
            min-height: auto !important;
            padding: 0 !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: flex-start !important;
            gap: 18px !important;
          }

          .concept-nav-shell:has(.scene-nav-burger[aria-expanded='true']) .scene-nav-mobile a,
          .concept-nav-shell:has(button[aria-expanded='true']) .scene-nav-mobile a,
          .concept-nav-shell:has(.scene-nav-burger[aria-expanded='true']) .scene-nav-mobile-link,
          .concept-nav-shell:has(button[aria-expanded='true']) .scene-nav-mobile-link {
            display: block !important;
            position: relative !important;
            margin: 0 !important;
            padding: 4px 0 !important;
            font-size: clamp(16px, 4.7vw, 24px) !important;
            line-height: 1.15 !important;
            letter-spacing: 0.16em !important;
            text-align: center !important;
            color: ${C.ink} !important;
            opacity: 1 !important;
            text-shadow: none !important;
          }

          .concept-nav-shell:has(.scene-nav-burger[aria-expanded='true']) .scene-nav-mobile a.active,
          .concept-nav-shell:has(button[aria-expanded='true']) .scene-nav-mobile a.active,
          .concept-nav-shell:has(.scene-nav-burger[aria-expanded='true']) .scene-nav-mobile-link.active,
          .concept-nav-shell:has(button[aria-expanded='true']) .scene-nav-mobile-link.active,
          .concept-nav-shell:has(.scene-nav-burger[aria-expanded='true']) .scene-nav-mobile a[aria-current='page'],
          .concept-nav-shell:has(button[aria-expanded='true']) .scene-nav-mobile a[aria-current='page'] {
            color: ${C.pink} !important;
            opacity: 1 !important;
          }

          .concept-nav-shell:has(.scene-nav-burger[aria-expanded='true']) .scene-nav-mobile a.disabled,
          .concept-nav-shell:has(button[aria-expanded='true']) .scene-nav-mobile a.disabled {
            opacity: 0.36 !important;
          }
        }
      `}</style>

      <style jsx global>{`
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

        .story-shell,
        .shell {
          position: relative;
          width: 65%;
          max-width: 1180px;
          margin: 0 auto;
        }

        .story-shell {
          z-index: 2;
          padding-top: clamp(104px, 10vw, 132px);
        }

        .shell {
          z-index: 3;
          padding: clamp(24px, 3vw, 36px) 0 clamp(72px, 8vw, 112px);
        }

        .story-axis-v,
        .axis-v {
          position: absolute;
          top: 30px;
          bottom: 30px;
          left: 0;
          z-index: 1;
          width: 1px;
          background: linear-gradient(
            to bottom,
            rgba(28, 28, 26, 0) 0%,
            rgba(28, 28, 26, 0.18) 6%,
            rgba(28, 28, 26, 0.34) 14%,
            rgba(28, 28, 26, 0.34) 86%,
            rgba(28, 28, 26, 0.18) 94%,
            rgba(28, 28, 26, 0) 100%
          );
          pointer-events: none;
        }

        .story-panel {
          --section-pad: clamp(48px, 5.5vw, 82px);
          position: relative;
          min-height: 88svh;
          display: flex;
          align-items: center;
          padding-left: var(--section-pad);
        }

        .story-rule,
        .section-rule {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 1px;
          background: linear-gradient(
            to right,
            rgba(28, 28, 26, 0.26) 0%,
            rgba(28, 28, 26, 0.22) 76%,
            rgba(28, 28, 26, 0.12) 92%,
            rgba(28, 28, 26, 0.02) 98%,
            rgba(28, 28, 26, 0) 100%
          );
          transform: scaleX(0);
          transform-origin: left center;
        }

        .story-panel.is-inview .story-rule,
        .reveal-section.is-inview .section-rule {
          animation: drawHorizontal 0.78s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
        }

        .story-grid {
          position: relative;
          z-index: 3;
          width: 100%;
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(280px, 0.95fr);
          align-items: center;
          gap: clamp(32px, 5vw, 84px);
        }

        .story-grid--reverse {
          grid-template-columns: minmax(280px, 0.95fr) minmax(0, 1.05fr);
        }

        .story-copy,
        .story-art {
          opacity: 0;
          transform: translateY(26px);
          transition:
            opacity 0.72s ease,
            transform 0.72s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .story-panel.is-inview .story-copy,
        .story-panel.is-inview .story-art {
          opacity: 1;
          transform: translateY(0);
        }

        .story-copy {
          min-width: 0;
        }

        .story-kicker {
          margin: 0 0 18px 0;
          font-family: ${MONO};
          font-size: 10px;
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: 0.22em;
          color: rgba(28, 28, 26, 0.48);
          text-transform: uppercase;
        }

        .story-title,
        .story-section-title,
        .scan-title {
          font-family: ${MONO};
          color: ${C.ink};
          text-transform: uppercase;
          font-weight: 700;
          line-height: 0.9;
          letter-spacing: 0px;
          text-shadow: 0.018em 0 0 currentColor;
        }

        .story-title {
          margin: 0;
          font-size: clamp(64px, 8.4vw, 128px);
          white-space: nowrap;
        }

        .story-section-title {
          margin: 0;
          font-size: clamp(48px, 5.8vw, 92px);
          max-width: 700px;
        }

        .story-address {
          margin: clamp(22px, 2.6vw, 38px) 0 0 clamp(8px, 0.62vw, 13px);
          font-family: ${MONO};
          color: ${C.pink};
          font-size: clamp(13px, 1.24vw, 18px);
          line-height: 1.45;
          letter-spacing: 0.24em;
          font-weight: 700;
          text-transform: uppercase;
        }

        .story-text {
          margin: clamp(18px, 2vw, 28px) 0 0 0;
          max-width: 480px;
          font-family: ${MONO};
          font-size: clamp(12px, 1.02vw, 15px);
          line-height: 1.8;
          letter-spacing: 0.08em;
          color: rgba(28, 28, 26, 0.66);
          text-transform: uppercase;
        }

        .story-prompt {
          margin: 26px 0 0 0;
          font-family: ${MONO};
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.22em;
          color: ${C.pink};
          text-transform: uppercase;
        }

        .story-prompt::before {
          content: '';
          display: inline-block;
          width: 42px;
          height: 1px;
          margin-right: 14px;
          vertical-align: middle;
          background: ${C.pink};
        }

        .story-art {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .portal-scene {
          position: relative;
          width: min(100%, 430px);
          aspect-ratio: 420 / 520;
        }

        .portal-scene--transition {
          width: min(100%, 520px);
        }

        .portal-axis {
          position: absolute;
          left: 34%;
          top: 5%;
          bottom: 13%;
          width: 1px;
          background: linear-gradient(
            to bottom,
            rgba(28, 28, 26, 0) 0%,
            rgba(28, 28, 26, 0.42) 14%,
            rgba(28, 28, 26, 0.42) 84%,
            rgba(28, 28, 26, 0) 100%
          );
          transform: scaleY(0.88);
          transform-origin: top center;
        }

        .story-panel.is-inview .portal-axis {
          animation: axisPulse 1.2s ease forwards;
        }

        .portal-img {
          position: absolute;
          display: block;
          height: auto;
          user-select: none;
          pointer-events: none;
        }

        .portal-funnel {
          z-index: 4;
          top: 0;
          right: 7%;
          width: 48%;
          opacity: 0;
          transform: translateY(-24px) scale(0.88);
        }

        .portal-floor {
          z-index: 2;
          left: 5%;
          bottom: 4%;
          width: 95%;
          opacity: 0;
          transform: translateX(-30px) scaleX(0.72);
          transform-origin: left center;
        }

        .portal-obelisk {
          z-index: 5;
          right: 22%;
          bottom: 8%;
          width: 22%;
          opacity: 0;
          transform: translateY(36px) scale(0.9);
          filter: drop-shadow(0 18px 26px rgba(28, 28, 26, 0.12));
        }

        .story-panel.is-inview .portal-funnel {
          animation: funnelIn 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 180ms forwards;
        }

        .story-panel.is-inview .portal-floor {
          animation: floorIn 0.86s cubic-bezier(0.2, 0.8, 0.2, 1) 280ms forwards;
        }

        .story-panel.is-inview .portal-obelisk {
          animation: obeliskIn 0.92s cubic-bezier(0.2, 0.8, 0.2, 1) 420ms forwards;
        }

        .story-panel--transition.is-inview .portal-scene {
          animation: portalFloat 6s ease-in-out 1s infinite;
        }

        .story-venue-wrap {
          position: relative;
          width: min(100%, 760px);
          opacity: 0;
          transform: translateY(22px) scale(0.98);
        }

        .story-panel.is-inview .story-venue-wrap {
          animation:
            venueIn 0.82s cubic-bezier(0.2, 0.8, 0.2, 1) 220ms forwards,
            venueFloat 4.8s ease-in-out 1400ms infinite;
        }

        .story-venue-wrap::before,
        .concept-space-map::before {
          content: '';
          position: absolute;
          left: 8%;
          right: 8%;
          bottom: 12%;
          height: 18%;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(28, 28, 26, 0.16), transparent 72%);
          filter: blur(10px);
          opacity: 0.36;
          transform: rotate(-4deg);
        }

        .story-venue-image {
          position: relative;
          z-index: 2;
          display: block;
          width: 100%;
          height: auto;
          filter:
            saturate(0.8)
            contrast(1.02)
            drop-shadow(0 18px 28px rgba(28, 28, 26, 0.12))
            drop-shadow(0 36px 60px rgba(28, 28, 26, 0.1));
        }

        .content-section {
          --section-pad: clamp(48px, 5.5vw, 82px);
          position: relative;
          z-index: 3;
          padding-left: var(--section-pad);
        }

        .space-section {
          padding-top: clamp(52px, 6vw, 74px);
          padding-bottom: clamp(28px, 3vw, 42px);
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

        .concept-space-map {
          position: relative;
          width: 100%;
          min-height: clamp(300px, 36vw, 500px);
          margin-top: clamp(26px, 4vw, 48px);
          display: flex;
          align-items: center;
          justify-content: center;
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
          margin-top: clamp(8px, 1vw, 12px);
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
          animation: signalFillLoop 12s ease-in-out 1200ms infinite;
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
          animation: diningDotFill 12s ease-in-out 1200ms infinite;
        }

        .experience-section.is-inview .signal-node-after-dark .signal-dot-fill {
          animation: afterDarkDotFill 12s ease-in-out 1200ms infinite;
        }

        .signal-time {
          position: absolute;
          top: 0;
          display: inline-block;
          font-family: ${MONO};
          font-size: clamp(12px, 1.1vw, 16px);
          font-weight: 700;
          line-height: 1;
          letter-spacing: 0.18em;
          color: rgba(28, 28, 26, 0.62);
          text-transform: uppercase;
          white-space: nowrap;
          transition: color 0.18s ease;
        }

        .signal-node-dining .signal-time {
          left: 0;
        }

        .signal-node-after-dark .signal-time {
          right: 0;
        }

        .experience-section.is-inview .signal-node-dining .signal-time {
          animation: diningTimeFill 12s ease-in-out 1200ms infinite;
        }

        .experience-section.is-inview .signal-node-after-dark .signal-time {
          animation: afterDarkTimeFill 12s ease-in-out 1200ms infinite;
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
          gap: 4px;
          font-family: ${MONO};
          color: rgba(28, 28, 26, 0.58);
          font-size: 10px;
          letter-spacing: 0.18em;
          line-height: 1;
          text-transform: uppercase;
        }

        .action-arrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 2.1em;
          line-height: 0.55;
          transform: translateY(-0.015em);
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
          0%, 100% {
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
          0%, 92%, 100% {
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

        @keyframes axisPulse {
          0% {
            transform: scaleY(0.84);
            opacity: 0.3;
          }
          100% {
            transform: scaleY(1);
            opacity: 1;
          }
        }

        @keyframes funnelIn {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes floorIn {
          to {
            opacity: 1;
            transform: translateX(0) scaleX(1);
          }
        }

        @keyframes obeliskIn {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes portalFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
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
          0%, 18% {
            transform: scaleX(0);
            opacity: 0;
          }
          23% {
            transform: scaleX(0);
            opacity: 1;
          }
          58% {
            transform: scaleX(1);
            opacity: 1;
          }
          74%, 100% {
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
          0%, 18% {
            opacity: 0;
          }
          23%, 64% {
            opacity: 1;
          }
          80%, 100% {
            opacity: 0;
          }
        }

        @keyframes afterDarkDotFill {
          0%, 48% {
            opacity: 0;
          }
          58%, 72% {
            opacity: 1;
          }
          86%, 100% {
            opacity: 0;
          }
        }

        @keyframes diningTimeFill {
          0%, 18% {
            color: rgba(28, 28, 26, 0.62);
          }
          23%, 64% {
            color: ${C.pink};
          }
          80%, 100% {
            color: rgba(28, 28, 26, 0.62);
          }
        }

        @keyframes afterDarkTimeFill {
          0%, 48% {
            color: rgba(28, 28, 26, 0.62);
          }
          58%, 72% {
            color: ${C.pink};
          }
          86%, 100% {
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
          0%, 100% {
            transform: translateY(0px) rotate(-0.15deg);
          }
          50% {
            transform: translateY(-10px) rotate(0.25deg);
          }
        }

        @keyframes venueGlitchA {
          0%, 72%, 100% {
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
          0%, 72%, 100% {
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
          .story-shell,
          .shell {
            width: 72%;
          }
        }

        @media (max-width: 980px) {
          .story-shell,
          .shell {
            width: 82%;
          }

          .zone-controls {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 820px) {
          .bg-image {
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center center;
          }

          .story-shell,
          .shell {
            width: calc(100% - 40px);
            max-width: none;
          }

          .story-shell {
            padding-top: 96px;
          }

          .shell {
            padding-top: 20px;
            padding-bottom: 28px;
          }

          .story-axis-v,
          .axis-v {
            top: 24px;
            bottom: 24px;
          }

          .story-panel {
            --section-pad: 24px;
            min-height: auto;
            padding-top: 56px;
            padding-bottom: 56px;
          }

          .story-grid,
          .story-grid--reverse {
            grid-template-columns: 1fr;
            gap: 28px;
          }

          .story-grid--reverse .story-art {
            order: -1;
          }

          .story-title {
            font-size: clamp(48px, 13vw, 82px);
            white-space: normal;
          }

          .story-section-title,
          .scan-title-space,
          .scan-title-experience {
            font-size: clamp(40px, 11vw, 64px);
          }

          .story-address {
            max-width: 360px;
            white-space: normal;
            font-size: 12px;
            letter-spacing: 0.18em;
          }

          .story-art {
            justify-content: center;
          }

          .portal-scene,
          .portal-scene--transition {
            width: min(88vw, 360px);
          }

          .story-venue-wrap {
            width: 100%;
            max-width: 640px;
            margin-left: auto;
            margin-right: auto;
          }

          .content-section {
            --section-pad: 24px;
          }

          .space-section {
            padding-top: 52px;
            padding-bottom: 12px;
          }

          .experience-section {
            padding-top: 56px;
            padding-bottom: 24px;
          }

          .concept-space-map {
            min-height: auto;
            margin-top: 30px;
            padding: 0 8px;
          }

          .venue-wrap {
            width: 100%;
            max-width: 640px;
            margin-left: auto;
            margin-right: auto;
          }

          .zone-controls {
            grid-template-columns: 1fr;
            margin-top: 18px;
            width: 100%;
          }

          .experience-signal {
            --signal-y: 30px;
            height: 58px;
            margin-top: 34px;
            margin-bottom: 14px;
          }

          .signal-time {
            font-size: 11px;
            letter-spacing: 0.1em;
          }

          .experience-nav {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
          }
        }

        @media (max-width: 520px) {
          .story-shell,
          .shell {
            width: calc(100% - 28px);
          }

          .story-shell {
            padding-top: 90px;
          }

          .story-panel {
            --section-pad: 18px;
            padding-top: 48px;
            padding-bottom: 48px;
          }

          .story-title {
            font-size: clamp(42px, 12.5vw, 60px);
          }

          .story-address {
            margin-top: 18px;
            font-size: 11px;
            letter-spacing: 0.13em;
          }

          .story-text {
            font-size: 11px;
            letter-spacing: 0.08em;
          }

          .portal-scene,
          .portal-scene--transition {
            width: min(88vw, 320px);
          }

          .content-section {
            --section-pad: 18px;
          }

          .space-section {
            padding-top: 54px;
            padding-bottom: 11px;
          }

          .experience-section {
            padding-top: 52px;
            padding-bottom: 16px;
          }

          .concept-space-map {
            min-height: auto;
            margin-top: 26px;
            padding-left: 6px;
            padding-right: 6px;
          }

          .venue-wrap {
            width: 100%;
            max-width: 100%;
            margin-left: auto;
            margin-right: auto;
          }

          .action-card {
            min-height: 84px;
          }

          .action-card-title {
            font-size: 20px;
          }

          .action-card-meta {
            font-size: 9px;
            gap: 3px;
          }

          .action-arrow {
            font-size: 2em;
          }

          .experience-signal {
            --signal-y: 28px;
            height: 56px;
            margin-top: 26px;
            margin-bottom: 12px;
          }

          .experience-nav {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 8px;
          }

          .experience-nav .action-card {
            min-height: 84px;
            padding: 14px 10px;
          }

          .experience-nav .action-card-title {
            font-size: clamp(14px, 3.8vw, 18px);
            white-space: nowrap;
          }
        }

        @media (max-width: 420px) {
          .signal-time {
            font-size: 9px;
            letter-spacing: 0.04em;
          }

          .signal-dot {
            width: 16px;
            height: 16px;
          }
        }

        @media (max-width: 380px) {
          .experience-nav {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 7px;
          }

          .experience-nav .action-card {
            padding: 13px 8px;
          }

          .experience-nav .action-card-title {
            font-size: 13px;
          }

          .experience-nav .action-card-meta {
            font-size: 7px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .concept-nav-shell,
          .story-copy,
          .story-art,
          .story-rule,
          .section-rule,
          .scan-title,
          .portal-axis,
          .portal-funnel,
          .portal-floor,
          .portal-obelisk,
          .story-venue-wrap,
          .venue-wrap,
          .venue-glitch-a,
          .venue-glitch-b,
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

          .story-copy,
          .story-art,
          .scan-title,
          .story-venue-wrap,
          .venue-wrap,
          .signal-node,
          .action-card {
            opacity: 1 !important;
            transform: none !important;
          }

          .story-rule,
          .section-rule,
          .signal-line {
            transform: scaleX(1) !important;
          }

          .scan-title {
            clip-path: inset(0 0 0 0) !important;
          }

          .portal-axis,
          .portal-funnel,
          .portal-floor,
          .portal-obelisk {
            opacity: 1 !important;
            transform: none !important;
          }

          .action-card::after {
            clip-path: inset(0 0 0 0) !important;
          }
        }
      `}</style>
    </>
  );
}

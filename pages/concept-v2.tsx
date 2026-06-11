'use client';

import Head from 'next/head';
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from 'react';
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

const clamp = (value: number, min = 0, max = 1) =>
  Math.max(min, Math.min(max, value));

const range = (value: number, start: number, end: number) => {
  if (start === end) return value >= end ? 1 : 0;
  return clamp((value - start) / (end - start));
};

const mix = (start: number, end: number, amount: number) =>
  start + (end - start) * amount;

function FloorFunnel({
  progress,
  className = '',
}: {
  progress: number;
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 460 220"
      aria-hidden="true"
      style={
        {
          '--draw': progress,
        } as CSSProperties
      }
    >
      <g className="floor-funnel-lines">
        {Array.from({ length: 11 }).map((_, i) => {
          const y = 30 + i * 14;
          const left = 30 + i * 13;
          const right = 286 + i * 6;

          return (
            <path
              key={`arc-${i}`}
              d={`M ${left} ${y} C ${right - 120} ${y + 52}, ${right - 78} ${
                y + 112
              }, ${right} ${y + 150}`}
              pathLength="1"
            />
          );
        })}

        {Array.from({ length: 12 }).map((_, i) => {
          const startX = 32 + i * 24;
          const endX = 264 + i * 4;

          return (
            <path
              key={`ray-${i}`}
              d={`M ${startX} 32 C ${startX + 52} 88, ${endX - 58} 154, ${endX} 205`}
              pathLength="1"
            />
          );
        })}
      </g>
    </svg>
  );
}

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
  const storyRef = useRef<HTMLElement | null>(null);

  const [progress, setProgress] = useState(0);
  const [activeArea, setActiveArea] = useState<AreaId | null>(null);
  const [isTouchMode, setIsTouchMode] = useState(false);
  const [menuReady, setMenuReady] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [diningTime, setDiningTime] = useState('20:00 / 20:30');
  const [afterDarkTime, setAfterDarkTime] = useState('22:00');

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      frame = 0;

      const story = storyRef.current;
      if (!story) return;

      const rect = story.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      const next = clamp(-rect.top / distance);

      setProgress(next);
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

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
        window.setTimeout(() => setDiningTime('18:40 / 19:10'), 2600),
        window.setTimeout(() => setDiningTime('21:12 / 21:40'), 2860),
        window.setTimeout(() => setDiningTime('19:55 / 20:14'), 3120),
        window.setTimeout(() => setDiningTime('20:00 / 20:30'), 3420),

        window.setTimeout(() => setAfterDarkTime('23:17'), 6400),
        window.setTimeout(() => setAfterDarkTime('01:40'), 6660),
        window.setTimeout(() => setAfterDarkTime('21:52'), 6920),
        window.setTimeout(() => setAfterDarkTime('22:00'), 7220),
      ];
    };

    runTimeSequence();

    const interval = window.setInterval(runTimeSequence, 14000);

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
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('.reveal-section')
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-inview', entry.isIntersecting);
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

  const axisDraw = range(progress, 0.02, 0.1);
  const floorDraw = range(progress, 0.08, 0.22);
  const floorFunnelDraw = range(progress, 0.14, 0.32);
  const obeliskDraw = range(progress, 0.22, 0.4);
  const topFunnelDraw = range(progress, 0.32, 0.48);
  const conceptDraw = range(progress, 0.02, 0.16);
  const addressDraw = range(progress, 0.12, 0.22);
  const conceptExit = range(progress, 0.42, 0.56);
  const sceneShift = range(progress, 0.42, 0.62);
  const portalFade = range(progress, 0.64, 0.78);
  const spaceTitleDraw = range(progress, 0.5, 0.64);
  const venueDraw = range(progress, 0.58, 0.78);
  const cardsDraw = range(progress, 0.74, 0.88);

  const storyLineStyle: CSSProperties = {
    transform: `scaleY(${axisDraw})`,
    opacity: range(progress, 0.01, 0.08),
  };

  const titleStyle: CSSProperties = {
    opacity: conceptDraw * (1 - conceptExit),
    clipPath: `inset(0 ${100 - conceptDraw * 100}% 0 0)`,
    transform: `translate3d(${mix(0, -40, conceptExit)}px, ${mix(
      0,
      -26,
      conceptExit
    )}px, 0)`,
  };

  const addressStyle: CSSProperties = {
    opacity: addressDraw * (1 - conceptExit),
    transform: `translate3d(0, ${mix(14, 0, addressDraw)}px, 0)`,
  };

  const portalSceneStyle: CSSProperties = {
    opacity: 1 - portalFade,
    transform: `translate3d(${mix(0, -40, sceneShift)}px, ${mix(
      0,
      -20,
      sceneShift
    )}px, 0) scale(${mix(1, 0.82, sceneShift)})`,
  };

  const floorStyle: CSSProperties = {
    opacity: floorDraw * (1 - portalFade * 0.7),
    transform: `translate3d(${mix(-80, 0, floorDraw)}px, ${mix(
      24,
      0,
      floorDraw
    )}px, 0) scaleX(${mix(0.35, 1, floorDraw)})`,
  };

  const floorFunnelStyle: CSSProperties = {
    opacity: floorFunnelDraw * (1 - portalFade * 0.7),
    transform: `translate3d(${mix(-32, 0, floorFunnelDraw)}px, ${mix(
      18,
      0,
      floorFunnelDraw
    )}px, 0)`,
  };

  const obeliskStyle: CSSProperties = {
    opacity: obeliskDraw * (1 - portalFade * 0.6),
    transform: `translate3d(${mix(34, 0, obeliskDraw)}px, ${mix(
      -140,
      0,
      obeliskDraw
    )}px, 0) scale(${mix(0.78, 1, obeliskDraw)})`,
  };

  const topFunnelStyle: CSSProperties = {
    opacity: topFunnelDraw * (1 - portalFade * 0.55),
    transform: `translate3d(0, ${mix(-52, 0, topFunnelDraw)}px, 0) scale(${mix(
      0.72,
      1,
      topFunnelDraw
    )})`,
  };

  const spaceTitleStyle: CSSProperties = {
    opacity: spaceTitleDraw,
    clipPath: `inset(0 ${100 - spaceTitleDraw * 100}% 0 0)`,
    transform: `translateY(${mix(24, 0, spaceTitleDraw)}px)`,
  };

  const venueStyle: CSSProperties = {
    opacity: venueDraw,
    transform: `translate3d(0, ${mix(74, 0, venueDraw)}px, 0) scale(${mix(
      0.86,
      1,
      venueDraw
    )})`,
  };

  const storyCardsStyle: CSSProperties = {
    opacity: cardsDraw,
    transform: `translateY(${mix(26, 0, cardsDraw)}px)`,
    pointerEvents: cardsDraw > 0.85 ? 'auto' : 'none',
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

        <section ref={storyRef} className="scroll-story" aria-label="Concept scroll story">
          <div className="story-stage">
            <div className="story-shell">
              <span className="story-axis" style={storyLineStyle} aria-hidden="true" />

              <div className="story-copy">
                <p className="story-kicker" style={addressStyle}>
                  LPX // UNDERGROUND
                </p>

                <h1 id="concept-title" className="story-title" style={titleStyle}>
                  CONCEPT.
                </h1>

                <p className="story-address" style={addressStyle}>
                  17 Little Portland Street, London
                </p>
              </div>

              <div className="portal-scene" style={portalSceneStyle} aria-hidden="true">
                <span className="portal-axis" style={storyLineStyle} />

                <img
                  src={CONCEPT_ASSETS.floor}
                  alt=""
                  className="portal-img portal-floor"
                  style={floorStyle}
                  draggable={false}
                />

                <FloorFunnel
                  progress={floorFunnelDraw}
                  className="portal-floor-funnel"
                />

                <img
                  src={CONCEPT_ASSETS.obelisk}
                  alt=""
                  className="portal-img portal-obelisk"
                  style={obeliskStyle}
                  draggable={false}
                />

                <img
                  src={CONCEPT_ASSETS.funnel}
                  alt=""
                  className="portal-img portal-funnel"
                  style={topFunnelStyle}
                  draggable={false}
                />
              </div>

              <div className="space-reveal">
                <h2 className="space-reveal-title" style={spaceTitleStyle}>
                  THE SPACE
                </h2>

                <div className="story-venue" style={venueStyle} aria-hidden="true">
                  <div className="venue-wrap story-venue-wrap">
                    <img
                      src={SPACE_ASSETS.venue}
                      alt=""
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
                  className="zone-controls story-zone-controls"
                  aria-label="Venue areas"
                  onMouseLeave={handleControlsLeave}
                  style={storyCardsStyle}
                >
                  {AREAS.map((area) => {
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
                      />
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>
        </section>

        <div className="shell">
          <div className="axis-v" aria-hidden="true" />

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

        .scroll-story {
          position: relative;
          z-index: 3;
          height: 520svh;
        }

        .story-stage {
          position: sticky;
          top: 0;
          height: 100svh;
          min-height: 680px;
          overflow: hidden;
        }

        .story-shell,
        .shell {
          position: relative;
          width: 65%;
          max-width: 1180px;
          margin: 0 auto;
        }

        .story-shell {
          height: 100%;
        }

        .shell {
          z-index: 5;
          padding: clamp(38px, 4vw, 58px) 0 clamp(72px, 8vw, 112px);
        }

        .story-axis,
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
          transform-origin: top center;
        }

        .story-copy {
          position: absolute;
          z-index: 7;
          left: clamp(48px, 5.5vw, 82px);
          top: 34%;
          width: min(58%, 720px);
          transform-origin: left center;
        }

        .story-kicker {
          margin: 0 0 20px 0;
          font-family: ${MONO};
          font-size: 10px;
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: 0.22em;
          color: rgba(28, 28, 26, 0.48);
          text-transform: uppercase;
        }

        .story-title,
        .space-reveal-title,
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

        .story-address {
          margin: clamp(22px, 2.6vw, 38px) 0 0 clamp(8px, 0.62vw, 13px);
          font-family: ${MONO};
          color: ${C.pink};
          font-size: clamp(13px, 1.24vw, 18px);
          line-height: 1.45;
          letter-spacing: 0.24em;
          font-weight: 700;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .portal-scene {
          position: absolute;
          z-index: 6;
          right: 0;
          top: 16%;
          width: min(42vw, 470px);
          height: min(54vw, 620px);
          pointer-events: none;
          will-change: transform, opacity;
        }

        .portal-axis {
          position: absolute;
          left: 34%;
          top: 3%;
          bottom: 12%;
          z-index: 1;
          width: 1px;
          background: linear-gradient(
            to bottom,
            rgba(28, 28, 26, 0) 0%,
            rgba(28, 28, 26, 0.4) 14%,
            rgba(28, 28, 26, 0.4) 84%,
            rgba(28, 28, 26, 0) 100%
          );
          transform-origin: top center;
        }

        .portal-img {
          position: absolute;
          display: block;
          height: auto;
          user-select: none;
          pointer-events: none;
          will-change: transform, opacity;
        }

        .portal-funnel {
          z-index: 5;
          top: 0;
          right: 8%;
          width: 48%;
          filter: drop-shadow(0 10px 18px rgba(212, 80, 122, 0.08));
        }

        .portal-floor {
          z-index: 2;
          left: 8%;
          bottom: 5%;
          width: 96%;
          transform-origin: left center;
        }

        .portal-obelisk {
          z-index: 6;
          right: 23%;
          bottom: 7%;
          width: 22%;
          filter: drop-shadow(0 20px 22px rgba(28, 28, 26, 0.12));
        }

        .portal-floor-funnel {
          position: absolute;
          z-index: 4;
          left: 6%;
          bottom: 2%;
          width: 46%;
          height: auto;
          overflow: visible;
          opacity: calc(var(--draw, 0));
          transform-origin: center center;
        }

        .floor-funnel-lines path {
          fill: none;
          stroke: ${C.pink};
          stroke-width: 2;
          opacity: 0.9;
          stroke-dasharray: 1;
          stroke-dashoffset: calc(1 - var(--draw, 0));
          vector-effect: non-scaling-stroke;
        }

        .space-reveal {
          position: absolute;
          z-index: 8;
          inset: 0;
          pointer-events: none;
        }

        .space-reveal-title {
          position: absolute;
          top: 12%;
          left: clamp(48px, 5.5vw, 82px);
          margin: 0;
          max-width: 720px;
          font-size: clamp(52px, 6vw, 96px);
          will-change: clip-path, opacity, transform;
        }

        .story-venue {
          position: absolute;
          left: clamp(48px, 5.5vw, 82px);
          right: 0;
          top: 26%;
          will-change: transform, opacity;
        }

        .story-venue-wrap {
          width: min(100%, 880px);
          margin-left: auto;
          margin-right: auto;
          pointer-events: none;
        }

        .story-zone-controls {
          position: absolute;
          left: clamp(48px, 5.5vw, 82px);
          right: 0;
          bottom: clamp(38px, 5vw, 76px);
          will-change: transform, opacity;
          pointer-events: auto;
        }

        .venue-wrap {
          position: relative;
          aspect-ratio: 2048 / 1140;
        }

        .venue-wrap::before {
          content: '';
          position: absolute;
          left: 8%;
          right: 8%;
          bottom: 14%;
          height: 18%;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(28, 28, 26, 0.16), transparent 72%);
          filter: blur(10px);
          opacity: 0.38;
          transform: rotate(-4deg);
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

        .story-zone-controls .action-card {
          opacity: 1;
          transform: none;
        }

        .zone-controls {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
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

        .reveal-section.is-inview .section-rule {
          animation: drawHorizontal 0.78s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
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
          animation: signalFillLoop 14s ease-in-out 1200ms infinite;
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
          animation: diningDotFill 14s ease-in-out 1200ms infinite;
        }

        .experience-section.is-inview .signal-node-after-dark .signal-dot-fill {
          animation: afterDarkDotFill 14s ease-in-out 1200ms infinite;
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
          animation: diningTimeFill 14s ease-in-out 1200ms infinite;
        }

        .experience-section.is-inview .signal-node-after-dark .signal-time {
          animation: afterDarkTimeFill 14s ease-in-out 1200ms infinite;
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

        .story-zone-controls .action-card::after {
          clip-path: inset(0 0 0 0);
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

        .story-zone-controls .venue-glitch-a,
        .story-zone-controls .venue-glitch-b {
          animation: none;
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

        @keyframes signalLineIn {
          to {
            transform: scaleX(1);
          }
        }

        @keyframes signalFillLoop {
          0%,
          18% {
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

          74%,
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
          18% {
            opacity: 0;
          }

          23%,
          64% {
            opacity: 1;
          }

          80%,
          100% {
            opacity: 0;
          }
        }

        @keyframes afterDarkDotFill {
          0%,
          48% {
            opacity: 0;
          }

          58%,
          72% {
            opacity: 1;
          }

          86%,
          100% {
            opacity: 0;
          }
        }

        @keyframes diningTimeFill {
          0%,
          18% {
            color: rgba(28, 28, 26, 0.62);
          }

          23%,
          64% {
            color: ${C.pink};
          }

          80%,
          100% {
            color: rgba(28, 28, 26, 0.62);
          }
        }

        @keyframes afterDarkTimeFill {
          0%,
          48% {
            color: rgba(28, 28, 26, 0.62);
          }

          58%,
          72% {
            color: ${C.pink};
          }

          86%,
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

          .scroll-story {
            height: 500svh;
          }

          .story-stage {
            min-height: 720px;
          }

          .story-shell,
          .shell {
            width: calc(100% - 40px);
            max-width: none;
          }

          .story-copy {
            left: 24px;
            right: 18px;
            top: 16%;
            width: auto;
          }

          .story-title {
            font-size: clamp(48px, 13vw, 82px);
            white-space: normal;
          }

          .story-address {
            max-width: 360px;
            white-space: normal;
            font-size: 12px;
            letter-spacing: 0.18em;
          }

          .portal-scene {
            width: min(86vw, 360px);
            height: min(112vw, 500px);
            right: auto;
            left: 50%;
            top: 38%;
            transform-origin: center center;
          }

          .space-reveal-title {
            top: 13%;
            left: 24px;
            font-size: clamp(40px, 11vw, 64px);
          }

          .story-venue {
            left: 18px;
            right: 18px;
            top: 28%;
          }

          .story-zone-controls {
            left: 24px;
            right: 24px;
            bottom: 30px;
          }

          .shell {
            padding-top: 34px;
            padding-bottom: 28px;
          }

          .axis-v {
            top: 24px;
            bottom: 24px;
          }

          .content-section {
            --section-pad: 24px;
          }

          .experience-section {
            padding-top: 56px;
            padding-bottom: 24px;
          }

          .scan-title-experience {
            font-size: clamp(40px, 11vw, 64px);
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

          .story-stage {
            min-height: 650px;
          }

          .story-copy {
            left: 18px;
            right: 14px;
          }

          .story-title {
            font-size: clamp(42px, 12.5vw, 60px);
          }

          .story-address {
            margin-top: 18px;
            font-size: 11px;
            letter-spacing: 0.13em;
          }

          .portal-scene {
            width: min(88vw, 320px);
            height: min(118vw, 470px);
          }

          .space-reveal-title {
            left: 18px;
          }

          .story-venue {
            left: 10px;
            right: 10px;
          }

          .story-zone-controls {
            left: 18px;
            right: 18px;
            bottom: 24px;
          }

          .content-section {
            --section-pad: 18px;
          }

          .experience-section {
            padding-top: 52px;
            padding-bottom: 16px;
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
          .scan-title,
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

          .scan-title,
          .signal-node,
          .action-card {
            opacity: 1 !important;
            transform: none !important;
          }

          .section-rule,
          .signal-line {
            transform: scaleX(1) !important;
          }

          .scan-title {
            clip-path: inset(0 0 0 0) !important;
          }

          .action-card::after {
            clip-path: inset(0 0 0 0) !important;
          }
        }
      `}</style>
    </>
  );
}

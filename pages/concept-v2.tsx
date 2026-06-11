'use client';

import Head from 'next/head';
import {
  useEffect,
  useMemo,
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

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

const lerp = (start: number, end: number, amount: number) =>
  start + (end - start) * amount;

const rangeProgress = (value: number, start: number, end: number) => {
  if (start === end) return value >= end ? 1 : 0;
  return clamp01((value - start) / (end - start));
};

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

  const [storyProgress, setStoryProgress] = useState(0);
  const [activeArea, setActiveArea] = useState<AreaId | null>(null);
  const [isTouchMode, setIsTouchMode] = useState(false);
  const [menuReady, setMenuReady] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [diningTime, setDiningTime] = useState('20:00 / 20:30');
  const [afterDarkTime, setAfterDarkTime] = useState('22:00');

  useEffect(() => {
    let frame = 0;

    const updateStoryProgress = () => {
      frame = 0;

      const story = storyRef.current;
      if (!story) return;

      const rect = story.getBoundingClientRect();
      const scrollable = Math.max(1, rect.height - window.innerHeight);
      const progress = clamp01(-rect.top / scrollable);

      setStoryProgress(progress);
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateStoryProgress);
    };

    updateStoryProgress();

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
        window.setTimeout(() => setDiningTime('18:40 / 19:10'), 1800),
        window.setTimeout(() => setDiningTime('21:12 / 21:40'), 1980),
        window.setTimeout(() => setDiningTime('19:55 / 20:14'), 2160),
        window.setTimeout(() => setDiningTime('20:00 / 20:30'), 2380),

        window.setTimeout(() => setAfterDarkTime('23:17'), 4800),
        window.setTimeout(() => setAfterDarkTime('01:40'), 4980),
        window.setTimeout(() => setAfterDarkTime('21:52'), 5160),
        window.setTimeout(() => setAfterDarkTime('22:00'), 5380),
      ];
    };

    runTimeSequence();

    const interval = window.setInterval(runTimeSequence, 12800);

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

  const storyStyles = useMemo(() => {
    const p = storyProgress;

    const introExit = rangeProgress(p, 0.16, 0.42);
    const sceneAssemble = rangeProgress(p, 0.06, 0.36);
    const portalExit = rangeProgress(p, 0.58, 0.78);
    const spaceIn = rangeProgress(p, 0.44, 0.68);
    const venueIn = rangeProgress(p, 0.58, 0.82);
    const promptIn = rangeProgress(p, 0.76, 0.92);

    const portalOpacity = Math.max(
      0.08,
      sceneAssemble * lerp(1, 0.16, portalExit)
    );

    const conceptStyle: CSSProperties = {
      opacity: lerp(1, 0.18, introExit),
      transform: `translate3d(${lerp(0, -32, introExit)}px, ${lerp(
        0,
        -76,
        introExit
      )}px, 0) scale(${lerp(1, 0.88, introExit)})`,
    };

    const storyLabelStyle: CSSProperties = {
      opacity: lerp(1, 0, rangeProgress(p, 0.18, 0.34)),
      transform: `translateY(${lerp(0, -18, rangeProgress(p, 0.18, 0.34))}px)`,
    };

    const portalStyle: CSSProperties = {
      opacity: portalOpacity,
      transform: `translate3d(${lerp(38, -12, sceneAssemble)}px, ${lerp(
        34,
        -18,
        rangeProgress(p, 0.12, 0.5)
      )}px, 0) scale(${lerp(0.88, 1, sceneAssemble)})`,
    };

    const portalAxisStyle: CSSProperties = {
      opacity: rangeProgress(p, 0.08, 0.24) * lerp(1, 0.18, portalExit),
      transform: `scaleY(${rangeProgress(p, 0.08, 0.32)})`,
    };

    const funnelStyle: CSSProperties = {
      opacity: rangeProgress(p, 0.03, 0.16) * lerp(1, 0.22, portalExit),
      transform: `translate3d(${lerp(20, 0, sceneAssemble)}px, ${lerp(
        -124,
        0,
        rangeProgress(p, 0.03, 0.24)
      )}px, 0) scale(${lerp(0.68, 1, rangeProgress(p, 0.03, 0.25))})`,
    };

    const floorStyle: CSSProperties = {
      opacity: rangeProgress(p, 0.16, 0.34) * lerp(1, 0.22, portalExit),
      transform: `translate3d(${lerp(-118, 0, rangeProgress(p, 0.16, 0.36))}px, ${lerp(
        42,
        0,
        rangeProgress(p, 0.16, 0.36)
      )}px, 0) scaleX(${lerp(0.48, 1, rangeProgress(p, 0.16, 0.38))})`,
    };

    const obeliskStyle: CSSProperties = {
      opacity: rangeProgress(p, 0.12, 0.3) * lerp(1, 0.2, portalExit),
      transform: `translate3d(${lerp(72, 0, rangeProgress(p, 0.12, 0.36))}px, ${lerp(
        162,
        0,
        rangeProgress(p, 0.12, 0.36)
      )}px, 0) scale(${lerp(0.82, 1, rangeProgress(p, 0.12, 0.36))})`,
    };

    const spaceCopyStyle: CSSProperties = {
      opacity: spaceIn,
      transform: `translate3d(0, ${lerp(44, 0, spaceIn)}px, 0) scale(${lerp(
        0.94,
        1,
        spaceIn
      )})`,
    };

    const storyVenueStyle: CSSProperties = {
      opacity: venueIn,
      transform: `translate3d(0, ${lerp(70, 0, venueIn)}px, 0) scale(${lerp(
        0.9,
        1,
        venueIn
      )})`,
    };

    const promptStyle: CSSProperties = {
      opacity: promptIn,
      transform: `translateY(${lerp(14, 0, promptIn)}px)`,
    };

    return {
      conceptStyle,
      storyLabelStyle,
      portalStyle,
      portalAxisStyle,
      funnelStyle,
      floorStyle,
      obeliskStyle,
      spaceCopyStyle,
      storyVenueStyle,
      promptStyle,
    };
  }, [storyProgress]);

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

        <section ref={storyRef} className="story-section" aria-label="Concept scroll story">
          <div className="story-stage">
            <div className="story-shell">
              <div className="story-axis" aria-hidden="true" />

              <div className="story-label" style={storyStyles.storyLabelStyle}>
                <span>LPX // UNDERGROUND</span>
                <span>ISSUE 51</span>
              </div>

              <div className="story-copy" style={storyStyles.conceptStyle}>
                <h1 id="concept-title" className="story-title">
                  CONCEPT.
                </h1>

                <p className="story-address">
                  17 Little Portland Street, London
                </p>
              </div>

              <div className="portal-scene" style={storyStyles.portalStyle} aria-hidden="true">
                <span className="portal-axis" style={storyStyles.portalAxisStyle} />

                <img
                  src={CONCEPT_ASSETS.funnel}
                  alt=""
                  className="portal-img portal-funnel"
                  style={storyStyles.funnelStyle}
                  draggable={false}
                />

                <img
                  src={CONCEPT_ASSETS.floor}
                  alt=""
                  className="portal-img portal-floor"
                  style={storyStyles.floorStyle}
                  draggable={false}
                />

                <img
                  src={CONCEPT_ASSETS.obelisk}
                  alt=""
                  className="portal-img portal-obelisk"
                  style={storyStyles.obeliskStyle}
                  draggable={false}
                />
              </div>

              <div className="story-space-copy" style={storyStyles.spaceCopyStyle}>
                <h2 className="story-space-title">The Space</h2>
                <p className="story-space-line">
                  The signal resolves into a room.
                </p>
              </div>

              <div className="story-venue" style={storyStyles.storyVenueStyle} aria-hidden="true">
                <img
                  src={SPACE_ASSETS.venue}
                  alt=""
                  className="story-venue-img"
                  draggable={false}
                />
              </div>

              <p className="story-scroll-prompt" style={storyStyles.promptStyle}>
                Enter the space
              </p>
            </div>
          </div>
        </section>

        <div className="shell">
          <div className="axis-v" aria-hidden="true" />

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
              The Experience
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

        .story-section {
          position: relative;
          z-index: 3;
          height: 320svh;
        }

        .story-stage {
          position: sticky;
          top: 0;
          height: 100svh;
          min-height: 620px;
          overflow: hidden;
        }

        .story-shell {
          position: relative;
          width: 65%;
          max-width: 1180px;
          height: 100%;
          margin: 0 auto;
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
          transform: scaleY(0);
          transform-origin: top center;
          animation: drawVertical 0.95s cubic-bezier(0.25, 0.8, 0.25, 1) 120ms forwards;
        }

        .story-label {
          position: absolute;
          z-index: 8;
          top: clamp(90px, 10vh, 130px);
          left: clamp(48px, 5.5vw, 82px);
          display: flex;
          gap: 18px;
          font-family: ${MONO};
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.22em;
          line-height: 1.2;
          text-transform: uppercase;
          color: rgba(28, 28, 26, 0.48);
          will-change: opacity, transform;
        }

        .story-copy {
          position: absolute;
          z-index: 8;
          left: clamp(48px, 5.5vw, 82px);
          top: 50%;
          transform-origin: left center;
          margin-top: -72px;
          will-change: transform, opacity;
        }

        .story-title {
          margin: 0;
          font-family: ${MONO};
          font-size: clamp(64px, 8.4vw, 128px);
          font-weight: 700;
          line-height: 0.9;
          letter-spacing: 0;
          white-space: nowrap;
          text-transform: uppercase;
          color: ${C.ink};
          text-shadow: 0.018em 0 0 currentColor;
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
          top: 50%;
          width: min(42vw, 440px);
          height: min(48vw, 560px);
          margin-top: -210px;
          pointer-events: none;
          will-change: opacity, transform;
        }

        .portal-axis {
          position: absolute;
          left: 34%;
          top: 3%;
          bottom: 14%;
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
          will-change: opacity, transform;
        }

        .portal-img {
          position: absolute;
          display: block;
          height: auto;
          user-select: none;
          will-change: opacity, transform;
        }

        .portal-funnel {
          z-index: 4;
          top: 0;
          right: 10%;
          width: 48%;
          filter: drop-shadow(0 10px 18px rgba(212, 80, 122, 0.08));
        }

        .portal-floor {
          z-index: 2;
          left: 8%;
          bottom: 5%;
          width: 94%;
          transform-origin: left center;
        }

        .portal-obelisk {
          z-index: 5;
          right: 23%;
          bottom: 8%;
          width: 22%;
          filter: drop-shadow(0 20px 22px rgba(28, 28, 26, 0.12));
        }

        .story-space-copy {
          position: absolute;
          z-index: 9;
          left: clamp(48px, 5.5vw, 82px);
          top: 17%;
          width: min(540px, 58%);
          pointer-events: none;
          will-change: opacity, transform;
        }

        .story-space-title {
          margin: 0;
          font-family: ${MONO};
          font-size: clamp(50px, 6vw, 96px);
          font-weight: 700;
          line-height: 0.9;
          letter-spacing: 0;
          text-transform: uppercase;
          color: ${C.ink};
          text-shadow: 0.018em 0 0 currentColor;
        }

        .story-space-line {
          margin: clamp(18px, 2vw, 28px) 0 0 0;
          max-width: 520px;
          font-family: ${MONO};
          font-size: clamp(12px, 1.05vw, 15px);
          line-height: 1.65;
          letter-spacing: 0.18em;
          color: rgba(28, 28, 26, 0.62);
          text-transform: uppercase;
          font-weight: 700;
        }

        .story-venue {
          position: absolute;
          z-index: 7;
          left: 8%;
          right: 0;
          bottom: 8%;
          pointer-events: none;
          will-change: opacity, transform;
        }

        .story-venue::before {
          content: '';
          position: absolute;
          left: 10%;
          right: 10%;
          bottom: 8%;
          height: 24%;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(28, 28, 26, 0.16), transparent 72%);
          filter: blur(10px);
          opacity: 0.38;
          transform: rotate(-4deg);
        }

        .story-venue-img {
          position: relative;
          z-index: 2;
          display: block;
          width: min(100%, 900px);
          height: auto;
          margin-left: auto;
          filter:
            saturate(0.82)
            contrast(1.02)
            drop-shadow(0 18px 28px rgba(28, 28, 26, 0.12))
            drop-shadow(0 36px 60px rgba(28, 28, 26, 0.1));
        }

        .story-scroll-prompt {
          position: absolute;
          z-index: 10;
          left: clamp(48px, 5.5vw, 82px);
          bottom: 40px;
          margin: 0;
          font-family: ${MONO};
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: ${C.pink};
          will-change: opacity, transform;
        }

        .story-scroll-prompt::before {
          content: '';
          display: inline-block;
          width: 42px;
          height: 1px;
          margin-right: 14px;
          vertical-align: middle;
          background: ${C.pink};
          transform-origin: left center;
          animation: promptPulse 1.8s ease-in-out infinite;
        }

        .shell {
          position: relative;
          z-index: 5;
          width: 65%;
          max-width: 1180px;
          min-height: 100svh;
          margin: 0 auto;
          padding: clamp(64px, 7vw, 96px) 0 clamp(72px, 8vw, 112px);
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
            rgba(28, 28, 26, 0.22) 72%,
            rgba(28, 28, 26, 0.14) 88%,
            rgba(28, 28, 26, 0.04) 97%,
            rgba(28, 28, 26, 0) 100%
          );
          transform: scaleX(0);
          transform-origin: left center;
        }

        .reveal-section.is-inview .section-rule {
          animation: drawHorizontal 0.78s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
        }

        .space-section {
          padding-top: clamp(24px, 4vw, 48px);
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
          animation: signalFillLoop 11.8s ease-in-out 1200ms infinite;
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
          animation: diningDotFill 11.8s ease-in-out 1200ms infinite;
        }

        .experience-section.is-inview .signal-node-after-dark .signal-dot-fill {
          animation: afterDarkDotFill 11.8s ease-in-out 1200ms infinite;
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
          transition: color 0.24s ease;
        }

        .signal-node-dining .signal-time {
          left: 0;
        }

        .signal-node-after-dark .signal-time {
          right: 0;
        }

        .experience-section.is-inview .signal-node-dining .signal-time {
          animation: diningTimeFill 11.8s ease-in-out 1200ms infinite;
        }

        .experience-section.is-inview .signal-node-after-dark .signal-time {
          animation: afterDarkTimeFill 11.8s ease-in-out 1200ms infinite;
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
          margin-top: 0;
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

        @keyframes promptPulse {
          0%,
          100% {
            transform: scaleX(0.42);
            opacity: 0.42;
          }

          50% {
            transform: scaleX(1);
            opacity: 1;
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

          .portal-scene {
            width: min(46vw, 380px);
            height: min(54vw, 500px);
          }

          .story-venue {
            left: 0;
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

          .story-section {
            height: 340svh;
          }

          .story-stage {
            min-height: 720px;
          }

          .story-shell,
          .shell {
            width: calc(100% - 40px);
            max-width: none;
          }

          .shell {
            padding-top: 42px;
            padding-bottom: 28px;
          }

          .story-label {
            top: 82px;
            left: 24px;
            right: 24px;
            flex-direction: column;
            gap: 6px;
            font-size: 9px;
          }

          .story-copy {
            left: 24px;
            right: 18px;
            top: 18%;
            margin-top: 0;
          }

          .story-title {
            font-size: clamp(48px, 13vw, 82px);
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
            top: 47%;
            margin-top: 0;
            transform-origin: center center;
          }

          .story-space-copy {
            top: 13%;
            left: 24px;
            right: 24px;
            width: auto;
          }

          .story-space-title {
            font-size: clamp(40px, 11vw, 64px);
          }

          .story-space-line {
            max-width: 360px;
            font-size: 11px;
            letter-spacing: 0.14em;
          }

          .story-venue {
            left: 8px;
            right: 8px;
            bottom: 14%;
          }

          .story-venue-img {
            width: 100%;
          }

          .story-scroll-prompt {
            left: 24px;
            bottom: 28px;
            font-size: 9px;
          }

          .content-section {
            --section-pad: 24px;
          }

          .space-section {
            padding-top: 64px;
            padding-bottom: 12px;
          }

          .experience-section {
            padding-top: 56px;
            padding-bottom: 24px;
          }

          h2,
          .scan-title-space,
          .scan-title-experience {
            font-size: clamp(40px, 11vw, 64px);
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

          .story-stage {
            min-height: 650px;
          }

          .shell {
            padding-top: 34px;
            padding-bottom: 22px;
          }

          .story-axis,
          .axis-v {
            top: 24px;
            bottom: 24px;
          }

          .story-label {
            left: 18px;
            right: 18px;
          }

          .story-copy {
            left: 18px;
            right: 14px;
            top: 18%;
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

          .story-space-copy {
            left: 18px;
            right: 18px;
          }

          .story-scroll-prompt {
            left: 18px;
          }

          .content-section {
            --section-pad: 18px;
          }

          .section-rule {
            margin-bottom: 26px;
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
          .story-title {
            font-size: clamp(42px, 12.5vw, 60px);
          }

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
          .story-axis,
          .axis-v,
          .section-rule,
          .story-label,
          .story-copy,
          .story-title,
          .story-address,
          .scan-title,
          .portal-scene,
          .portal-img,
          .portal-axis,
          .story-space-copy,
          .story-venue,
          .story-scroll-prompt,
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
          .story-label,
          .story-copy,
          .story-title,
          .story-address,
          .scan-title,
          .portal-scene,
          .portal-img,
          .story-space-copy,
          .story-venue,
          .story-scroll-prompt,
          .venue-wrap,
          .signal-node,
          .action-card {
            opacity: 1;
          }

          .story-axis,
          .axis-v,
          .section-rule,
          .signal-line,
          .portal-axis {
            transform: none;
          }

          .scan-title {
            clip-path: inset(0 0 0 0);
          }

          .portal-scene,
          .portal-img,
          .story-space-copy,
          .story-venue,
          .story-scroll-prompt,
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

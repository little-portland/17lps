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
type ModeId = 'concept' | 'space' | 'experience';

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

const MODES: { id: ModeId; label: string }[] = [
  { id: 'concept', label: 'Concept' },
  { id: 'space', label: 'The Space' },
  { id: 'experience', label: 'Experience' },
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
  const conceptRef = useRef<HTMLElement | null>(null);
  const spaceRef = useRef<HTMLElement | null>(null);
  const experienceRef = useRef<HTMLElement | null>(null);

  const [activeMode, setActiveMode] = useState<ModeId>('concept');
  const [activeArea, setActiveArea] = useState<AreaId | null>(null);
  const [isTouchMode, setIsTouchMode] = useState(false);
  const [menuReady, setMenuReady] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [diningTime, setDiningTime] = useState('20:00 / 20:30');
  const [afterDarkTime, setAfterDarkTime] = useState('22:00');

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setMenuReady(true);
    }, 650);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('.poster-section')
    );

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-inview', entry.isIntersecting);
        });
      },
      {
        threshold: 0.22,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    sections.forEach((section) => revealObserver.observe(section));

    const modeObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        const mode = visible?.target.getAttribute('data-mode') as ModeId | null;

        if (mode) {
          setActiveMode(mode);
        }
      },
      {
        threshold: [0.2, 0.35, 0.5, 0.65],
        rootMargin: '-24% 0px -42% 0px',
      }
    );

    sections.forEach((section) => modeObserver.observe(section));

    return () => {
      revealObserver.disconnect();
      modeObserver.disconnect();
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
        window.setTimeout(() => setDiningTime('18:40 / 19:10'), 3000),
        window.setTimeout(() => setDiningTime('21:12 / 21:40'), 3280),
        window.setTimeout(() => setDiningTime('19:55 / 20:14'), 3560),
        window.setTimeout(() => setDiningTime('20:00 / 20:30'), 3900),

        window.setTimeout(() => setAfterDarkTime('23:17'), 7200),
        window.setTimeout(() => setAfterDarkTime('01:40'), 7480),
        window.setTimeout(() => setAfterDarkTime('21:52'), 7760),
        window.setTimeout(() => setAfterDarkTime('22:00'), 8100),
      ];
    };

    runTimeSequence();

    const interval = window.setInterval(runTimeSequence, 15000);

    return () => {
      window.clearInterval(interval);
      clearTimers();
    };
  }, []);

  const scrollToMode = (mode: ModeId) => {
    const refs = {
      concept: conceptRef,
      space: spaceRef,
      experience: experienceRef,
    };

    refs[mode].current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

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

        <div className="site-bg" aria-hidden="true" />

        <article className="poster" aria-label="Concept interactive poster">
          <div className="poster-bg" aria-hidden="true" />
          <div className="poster-axis" aria-hidden="true" />

          <nav className="poster-mode-nav" aria-label="Concept page sections">
            {MODES.map((mode) => (
              <button
                key={mode.id}
                type="button"
                className={`poster-mode-btn ${
                  activeMode === mode.id ? 'is-active' : ''
                }`}
                onClick={() => scrollToMode(mode.id)}
              >
                {mode.label}
              </button>
            ))}
          </nav>

          <section
            ref={conceptRef}
            className="poster-section hero-section"
            data-mode="concept"
            aria-labelledby="concept-title"
          >
            <div className="section-line section-line-hero" aria-hidden="true" />

            <div className="hero-copy">
              <p className="micro-label">LPX // UNDERGROUND ISSUE 51</p>

              <h1 id="concept-title" className="hero-title">
                CONCEPT.
              </h1>

              <p className="hero-address">
                17 Little Portland Street, London
              </p>

              <p className="hero-note">
                A space hidden below street level, built as a living programme:
                dinner, sound, club energy and future-facing hospitality.
              </p>
            </div>

            <div className="portal-module" aria-hidden="true">
              <span className="portal-axis" />

              <img
                src={CONCEPT_ASSETS.funnel}
                alt=""
                className="portal-img portal-funnel-top"
                draggable={false}
              />

              <img
                src={CONCEPT_ASSETS.floor}
                alt=""
                className="portal-img portal-floor"
                draggable={false}
              />

              <img
                src={CONCEPT_ASSETS.funnel}
                alt=""
                className="portal-img portal-funnel-floor"
                draggable={false}
              />

              <img
                src={CONCEPT_ASSETS.obelisk}
                alt=""
                className="portal-img portal-obelisk"
                draggable={false}
              />

              <div className="portal-scan portal-scan-a" />
              <div className="portal-scan portal-scan-b" />
            </div>
          </section>

          <section
            ref={spaceRef}
            className="poster-section space-section"
            data-mode="space"
            aria-labelledby="space-title"
          >
            <div className="section-line" aria-hidden="true" />

            <div className="section-heading-row">
              <p className="micro-label">MODULE 01</p>
              <h2 id="space-title" className="section-title">
                THE SPACE
              </h2>
            </div>

            <div className="space-board">
              <div className="venue-wrap" aria-label="Interactive venue map">
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
                        '--card-delay': `${260 + index * 120}ms`,
                      } as CSSProperties
                    }
                  />
                );
              })}
            </nav>
          </section>

          <section
            ref={experienceRef}
            className="poster-section experience-section"
            data-mode="experience"
            aria-labelledby="experience-title"
          >
            <div className="section-line" aria-hidden="true" />

            <div className="section-heading-row">
              <p className="micro-label">MODULE 02</p>
              <h2 id="experience-title" className="section-title experience-title">
                THE EXPERIENCE
              </h2>
            </div>

            <div className="experience-grid">
              <div className="experience-copy">
                <p>
                  A controlled transition from seated dinner into late-night
                  Little Portland energy.
                </p>
              </div>

              <div className="experience-console">
                <div className="experience-signal" aria-hidden="true">
                  <div className="signal-track">
                    <div className="signal-line" />
                    <div className="signal-line-fill" />
                  </div>

                  <div className="signal-node signal-node-dining">
                    <span className="signal-time signal-time-dining">
                      {diningTime}
                    </span>
                    <span className="signal-dot">
                      <span className="signal-dot-fill" />
                    </span>
                  </div>

                  <div className="signal-node signal-node-after-dark">
                    <span className="signal-time signal-time-after-dark">
                      {afterDarkTime}
                    </span>
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
              </div>
            </div>
          </section>
        </article>
      </main>

      <style jsx global>{`
        html,
        body,
        #__next {
          margin: 0;
          min-height: 100%;
          background: #eadfe5;
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
          padding: clamp(82px, 7vw, 112px) 0 clamp(32px, 4vw, 60px);
          background: #eadfe5;
        }

        .site-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background:
            radial-gradient(circle at 50% 0%, rgba(232, 226, 212, 0.52), transparent 34%),
            #eadfe5;
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

        .poster {
          position: relative;
          z-index: 2;
          width: 65%;
          max-width: 1180px;
          margin: 0 auto;
          overflow: hidden;
          border: 1px solid rgba(28, 28, 26, 0.16);
          background: ${C.cream};
          box-shadow:
            0 30px 90px rgba(28, 28, 26, 0.12),
            0 2px 0 rgba(255, 255, 255, 0.25) inset;
          isolation: isolate;
        }

        .poster-bg {
          position: absolute;
          inset: 0;
          z-index: -2;
          background-image: url('${CONCEPT_ASSETS.bg}');
          background-size: contain;
          background-repeat: repeat;
          background-position: center top;
          opacity: 0.78;
        }

        .poster::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          background:
            linear-gradient(90deg, rgba(28, 28, 26, 0.035) 1px, transparent 1px),
            linear-gradient(180deg, rgba(28, 28, 26, 0.025) 1px, transparent 1px);
          background-size: 180px 180px;
          mix-blend-mode: multiply;
          opacity: 0.5;
        }

        .poster::after {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 30;
          background:
            radial-gradient(circle at 50% 20%, transparent 0 48%, rgba(28, 28, 26, 0.025) 100%),
            repeating-linear-gradient(
              0deg,
              rgba(28, 28, 26, 0.025) 0px,
              rgba(28, 28, 26, 0.025) 1px,
              transparent 1px,
              transparent 5px
            );
          opacity: 0.45;
        }

        .poster-axis {
          position: absolute;
          top: 28px;
          bottom: 28px;
          left: clamp(34px, 4vw, 64px);
          z-index: 4;
          width: 1px;
          pointer-events: none;
          background: linear-gradient(
            to bottom,
            rgba(28, 28, 26, 0) 0%,
            rgba(28, 28, 26, 0.16) 6%,
            rgba(28, 28, 26, 0.34) 14%,
            rgba(28, 28, 26, 0.34) 86%,
            rgba(28, 28, 26, 0.16) 94%,
            rgba(28, 28, 26, 0) 100%
          );
        }

        .poster-mode-nav {
          position: sticky;
          top: 72px;
          z-index: 40;
          display: flex;
          justify-content: center;
          gap: 8px;
          padding: 14px clamp(18px, 3vw, 40px);
          background: rgba(232, 226, 212, 0.62);
          border-bottom: 1px solid rgba(28, 28, 26, 0.12);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }

        .poster-mode-btn {
          appearance: none;
          border: 0;
          background: transparent;
          color: rgba(28, 28, 26, 0.45);
          font-family: ${MONO};
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          line-height: 1;
          text-transform: uppercase;
          cursor: pointer;
          padding: 10px 12px;
          transition:
            color 0.2s ease,
            background 0.2s ease,
            transform 0.2s ease;
        }

        .poster-mode-btn:hover,
        .poster-mode-btn:focus-visible {
          color: ${C.ink};
          background: rgba(28, 28, 26, 0.055);
          outline: none;
        }

        .poster-mode-btn.is-active {
          color: ${C.pink};
          background: rgba(212, 80, 122, 0.08);
        }

        .poster-section {
          position: relative;
          min-height: 88svh;
          padding: clamp(76px, 8vw, 132px) clamp(48px, 6vw, 96px)
            clamp(72px, 7vw, 118px) clamp(82px, 8vw, 132px);
        }

        .section-line {
          position: absolute;
          left: clamp(34px, 4vw, 64px);
          right: clamp(30px, 4vw, 62px);
          top: 0;
          height: 1px;
          background: linear-gradient(
            to right,
            rgba(28, 28, 26, 0.28) 0%,
            rgba(28, 28, 26, 0.24) 72%,
            rgba(28, 28, 26, 0.12) 92%,
            rgba(28, 28, 26, 0) 100%
          );
          transform-origin: left center;
          transform: scaleX(0);
        }

        .poster-section.is-inview .section-line {
          animation: drawHorizontal 0.78s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
        }

        .section-line-hero {
          display: none;
        }

        .hero-section {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(260px, 0.78fr);
          align-items: center;
          gap: clamp(32px, 5vw, 86px);
          padding-top: clamp(90px, 8vw, 140px);
        }

        .hero-copy {
          position: relative;
          z-index: 8;
        }

        .micro-label {
          margin: 0 0 18px 0;
          font-family: ${MONO};
          font-size: 10px;
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: 0.22em;
          color: rgba(28, 28, 26, 0.48);
          text-transform: uppercase;
        }

        .hero-title,
        .section-title {
          margin: 0;
          font-family: ${MONO};
          color: ${C.ink};
          text-transform: uppercase;
          font-weight: 700;
          line-height: 0.9;
          letter-spacing: 0;
          text-shadow: 0.018em 0 0 currentColor;
        }

        .hero-title {
          font-size: clamp(62px, 7.4vw, 126px);
          white-space: nowrap;
          opacity: 0;
          clip-path: inset(0 100% 0 0);
        }

        .poster-section.is-inview .hero-title {
          animation:
            scanTitleReveal 0.48s steps(8, end) 140ms forwards,
            titleMicroGlitch 0.48s steps(2, end) 680ms forwards,
            titleIdleGlitch 7.5s steps(2, end) 3400ms infinite;
        }

        .hero-address {
          margin: clamp(22px, 2.4vw, 34px) 0 0 clamp(8px, 0.62vw, 13px);
          font-family: ${MONO};
          color: ${C.pink};
          font-size: clamp(13px, 1.24vw, 18px);
          line-height: 1.45;
          letter-spacing: 0.24em;
          font-weight: 700;
          text-transform: uppercase;
          white-space: nowrap;
          opacity: 0;
          transform: translateY(12px);
        }

        .poster-section.is-inview .hero-address {
          animation: copyIn 0.54s ease 520ms forwards;
        }

        .hero-note {
          max-width: 520px;
          margin: clamp(30px, 3.4vw, 48px) 0 0 0;
          color: rgba(28, 28, 26, 0.58);
          font-family: ${MONO};
          font-size: clamp(11px, 0.92vw, 14px);
          line-height: 1.8;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(12px);
        }

        .poster-section.is-inview .hero-note {
          animation: copyIn 0.54s ease 680ms forwards;
        }

        .portal-module {
          position: relative;
          z-index: 7;
          width: min(100%, 470px);
          aspect-ratio: 460 / 600;
          margin-left: auto;
          opacity: 0;
          transform: translateY(20px);
        }

        .poster-section.is-inview .portal-module {
          animation:
            copyIn 0.7s ease 320ms forwards,
            portalIdle 7s ease-in-out 1400ms infinite;
        }

        .portal-axis {
          position: absolute;
          left: 34%;
          top: 7%;
          bottom: 15%;
          width: 1px;
          background: linear-gradient(
            to bottom,
            rgba(28, 28, 26, 0) 0%,
            rgba(28, 28, 26, 0.44) 18%,
            rgba(28, 28, 26, 0.44) 84%,
            rgba(28, 28, 26, 0) 100%
          );
          transform-origin: top center;
          animation: portalAxisPulse 5s ease-in-out infinite;
        }

        .portal-img {
          position: absolute;
          display: block;
          height: auto;
          user-select: none;
          pointer-events: none;
        }

        .portal-funnel-top {
          z-index: 5;
          top: 0;
          right: 9%;
          width: 46%;
          filter: drop-shadow(0 10px 18px rgba(212, 80, 122, 0.08));
        }

        .portal-floor {
          z-index: 2;
          left: 3%;
          bottom: 4%;
          width: 103%;
          opacity: 0.92;
        }

        .portal-funnel-floor {
          z-index: 4;
          left: 0%;
          bottom: 1%;
          width: 45%;
          transform: rotate(-2deg);
          filter: drop-shadow(0 8px 14px rgba(212, 80, 122, 0.08));
        }

        .portal-obelisk {
          z-index: 6;
          right: 22%;
          bottom: 8%;
          width: 22%;
          filter: drop-shadow(0 20px 24px rgba(28, 28, 26, 0.16));
        }

        .portal-scan {
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          z-index: 8;
          background: ${C.pink};
          opacity: 0;
          transform-origin: left center;
          mix-blend-mode: multiply;
        }

        .portal-scan-a {
          top: 34%;
          animation: portalScan 5.4s linear 1.2s infinite;
        }

        .portal-scan-b {
          top: 63%;
          animation: portalScan 6.8s linear 3.1s infinite;
        }

        .section-heading-row {
          position: relative;
          z-index: 8;
          display: grid;
          grid-template-columns: 150px minmax(0, 1fr);
          gap: clamp(24px, 4vw, 72px);
          align-items: end;
          margin-bottom: clamp(28px, 4vw, 58px);
        }

        .section-title {
          font-size: clamp(50px, 6vw, 96px);
          opacity: 0;
          clip-path: inset(0 100% 0 0);
        }

        .poster-section.is-inview .section-title {
          animation:
            scanTitleReveal 0.48s steps(8, end) 120ms forwards,
            titleMicroGlitch 0.48s steps(2, end) 640ms forwards,
            titleIdleGlitch 7.5s steps(2, end) 3300ms infinite;
        }

        .space-board {
          position: relative;
          z-index: 8;
          width: 100%;
          margin: 0 auto;
          opacity: 0;
          transform: translateY(26px) scale(0.98);
        }

        .space-section.is-inview .space-board {
          animation:
            objectIn 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) 360ms forwards,
            venueFloat 5.6s ease-in-out 1500ms infinite;
        }

        .venue-wrap {
          position: relative;
          width: min(100%, 930px);
          aspect-ratio: 2048 / 1140;
          margin: 0 auto;
        }

        .venue-wrap::before {
          content: '';
          position: absolute;
          left: 8%;
          right: 8%;
          bottom: 13%;
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
            saturate(0.86)
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
          position: relative;
          z-index: 9;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          margin-top: clamp(14px, 1.8vw, 22px);
        }

        .experience-grid {
          position: relative;
          z-index: 8;
          display: grid;
          grid-template-columns: minmax(180px, 0.32fr) minmax(0, 1fr);
          gap: clamp(26px, 4vw, 64px);
          align-items: start;
        }

        .experience-copy {
          opacity: 0;
          transform: translateY(18px);
        }

        .experience-section.is-inview .experience-copy {
          animation: copyIn 0.54s ease 420ms forwards;
        }

        .experience-copy p {
          margin: 0;
          color: rgba(28, 28, 26, 0.62);
          font-family: ${MONO};
          font-size: clamp(11px, 0.96vw, 14px);
          line-height: 1.8;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .experience-console {
          opacity: 0;
          transform: translateY(20px);
        }

        .experience-section.is-inview .experience-console {
          animation: copyIn 0.62s ease 520ms forwards;
        }

        .experience-signal {
          --signal-y: 38px;
          position: relative;
          z-index: 4;
          width: 100%;
          height: clamp(58px, 5.6vw, 78px);
          margin-top: 0;
          margin-bottom: clamp(14px, 1.5vw, 22px);
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
          animation: signalLineIn 0.82s cubic-bezier(0.25, 0.8, 0.25, 1) 720ms forwards;
        }

        .experience-section.is-inview .signal-line-fill {
          animation: signalFillLoop 15s ease-in-out 1500ms infinite;
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
          animation: signalNodeIn 0.48s ease 860ms forwards;
        }

        .experience-section.is-inview .signal-node-after-dark {
          animation: signalNodeIn 0.48s ease 980ms forwards;
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
          animation: diningDotFill 15s ease-in-out 1500ms infinite;
        }

        .experience-section.is-inview .signal-node-after-dark .signal-dot-fill {
          animation: afterDarkDotFill 15s ease-in-out 1500ms infinite;
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
          animation: diningTimeFill 15s ease-in-out 1500ms infinite;
        }

        .experience-section.is-inview .signal-node-after-dark .signal-time {
          animation: afterDarkTimeFill 15s ease-in-out 1500ms infinite;
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

        .poster-section.is-inview .action-card {
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

        .poster-section.is-inview .action-card::after {
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

        @keyframes copyIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes objectIn {
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

        @keyframes portalIdle {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes portalAxisPulse {
          0%,
          100% {
            opacity: 0.7;
            transform: scaleY(0.98);
          }

          50% {
            opacity: 1;
            transform: scaleY(1);
          }
        }

        @keyframes portalScan {
          0%,
          86%,
          100% {
            opacity: 0;
            transform: translateX(-20%) scaleX(0);
          }

          88% {
            opacity: 0.8;
            transform: translateX(0) scaleX(0.4);
          }

          91% {
            opacity: 0.35;
            transform: translateX(30%) scaleX(0.8);
          }

          94% {
            opacity: 0;
            transform: translateX(70%) scaleX(0.2);
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

        @media (max-width: 1280px) {
          .poster {
            width: 72%;
          }
        }

        @media (max-width: 980px) {
          .poster {
            width: 82%;
          }

          .poster-section {
            padding-left: 82px;
            padding-right: 48px;
          }

          .hero-section {
            grid-template-columns: 1fr;
          }

          .portal-module {
            width: min(100%, 440px);
            margin: 18px auto 0;
          }

          .section-heading-row,
          .experience-grid {
            grid-template-columns: 1fr;
          }

          .zone-controls {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 820px) {
          .page {
            padding-top: 86px;
            padding-bottom: 28px;
          }

          .poster {
            width: calc(100% - 40px);
          }

          .poster-bg {
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center center;
          }

          .poster-mode-nav {
            top: 68px;
            overflow-x: auto;
            justify-content: flex-start;
            padding: 12px 16px;
          }

          .poster-mode-btn {
            flex: 0 0 auto;
            font-size: 9px;
            padding: 9px 10px;
          }

          .poster-axis {
            left: 28px;
          }

          .poster-section {
            min-height: auto;
            padding: 66px 26px 62px 52px;
          }

          .hero-section {
            padding-top: 78px;
          }

          .hero-title {
            font-size: clamp(48px, 13vw, 82px);
            white-space: normal;
          }

          .hero-address {
            max-width: 360px;
            white-space: normal;
            font-size: 12px;
            letter-spacing: 0.18em;
          }

          .hero-note {
            font-size: 11px;
          }

          .portal-module {
            width: min(100%, 360px);
          }

          .section-title {
            font-size: clamp(40px, 11vw, 64px);
          }

          .venue-wrap {
            width: 100%;
          }

          .experience-signal {
            --signal-y: 30px;
            height: 58px;
            margin-top: 4px;
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
          .poster {
            width: calc(100% - 28px);
          }

          .poster-axis {
            left: 22px;
          }

          .poster-section {
            padding: 58px 20px 54px 42px;
          }

          .hero-title {
            font-size: clamp(42px, 12.5vw, 60px);
          }

          .hero-address {
            margin-top: 18px;
            font-size: 11px;
            letter-spacing: 0.13em;
          }

          .portal-module {
            width: min(100%, 320px);
          }

          .space-board {
            margin-top: 2px;
          }

          .zone-controls {
            margin-top: 14px;
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
            margin-top: 0;
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
          .hero-title,
          .section-title,
          .hero-address,
          .hero-note,
          .portal-module,
          .space-board,
          .experience-copy,
          .experience-console,
          .action-card,
          .section-line,
          .action-card::after,
          .signal-line,
          .signal-line-fill,
          .signal-node,
          .signal-dot-fill,
          .signal-time,
          .venue-glitch-a,
          .venue-glitch-b,
          .portal-scan,
          .portal-axis {
            animation: none !important;
            transition: none !important;
          }

          .hero-title,
          .section-title,
          .hero-address,
          .hero-note,
          .portal-module,
          .space-board,
          .experience-copy,
          .experience-console,
          .action-card,
          .signal-node {
            opacity: 1 !important;
            transform: none !important;
          }

          .hero-title,
          .section-title {
            clip-path: inset(0 0 0 0) !important;
          }

          .section-line,
          .signal-line {
            transform: scaleX(1) !important;
          }

          .action-card::after {
            clip-path: inset(0 0 0 0) !important;
          }
        }
      `}</style>
    </>
  );
}

'use client';

import Head from 'next/head';
import { useEffect, useState, type CSSProperties, type MouseEvent } from 'react';
import SceneNav from '@components/SceneNav';

const C = {
  concrete: '#A7A8A5',
  ink: '#090909',
  red: '#FF1A12',
  green: '#19FF38',
  blue: '#21178F',
  mist: '#D1D2CE',
} as const;

const MONO = '"Space Mono", "Courier New", monospace';

type AreaId = 'tent' | 'chefs-studio' | 'studio';

type AreaConfig = {
  id: AreaId;
  index: string;
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
    index: '01',
    title: 'THE TENT',
    href: '/thetent-test',
    highlight: '/images/concept/tent-highlight.png',
    chars: 8,
  },
  {
    id: 'chefs-studio',
    index: '02',
    title: "CHEF'S STUDIO",
    href: '/chefstudio-test',
    highlight: '/images/concept/chefs-studio-highlight.png',
    chars: 13,
  },
  {
    id: 'studio',
    index: '03',
    title: 'THE STUDIO',
    href: '/studio-test',
    highlight: '/images/concept/studio-highlight.png',
    chars: 10,
  },
];

const EXPERIENCE_BTNS = [
  {
    label: 'DINING',
    href: '/food-test',
    code: '20:00 / 20:30',
    tone: 'green',
  },
  {
    label: 'AFTER DARK',
    href: '/theclub-test',
    code: '22:00 → LATE',
    tone: 'blue',
  },
] as const;

const typeStyle = (chars: number, delay: string): CSSProperties =>
  ({
    '--chars': chars,
    '--type-delay': delay,
  }) as CSSProperties;

function AreaLink({
  area,
  active,
  isTouchMode,
  onMouseEnter,
  onFocus,
  onClick,
}: {
  area: AreaConfig;
  active: boolean;
  isTouchMode: boolean;
  onMouseEnter: () => void;
  onFocus: () => void;
  onClick: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <a
      href={area.href}
      className={`area-link ${active ? 'is-active' : ''}`}
      onMouseEnter={onMouseEnter}
      onFocus={onFocus}
      onClick={onClick}
    >
      <span className="area-orbits" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <span className="area-index">{area.index}</span>
      <span className="area-title">{area.title}</span>
      <span className="area-meta">
        {isTouchMode ? (active ? 'TAP AGAIN' : 'PREVIEW') : 'EXPLORE'} →
      </span>
    </a>
  );
}

function ExperienceCard({
  label,
  href,
  code,
  tone,
  index,
}: {
  label: string;
  href: string;
  code: string;
  tone: 'green' | 'blue';
  index: number;
}) {
  return (
    <a
      href={href}
      className={`experience-card is-${tone}`}
      style={{ '--card-delay': `${480 + index * 140}ms` } as CSSProperties}
    >
      <span className="experience-card-grid" aria-hidden="true" />
      <span className="experience-card-number">0{index + 1}</span>
      <span className="experience-card-title">{label}</span>
      <span className="experience-card-code">{code}</span>
      <span className="experience-card-cta">ENTER SIMULATION →</span>
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
        window.setTimeout(() => setDiningTime('18:40 / 19:10'), 1800),
        window.setTimeout(() => setDiningTime('21:12 / 21:40'), 1960),
        window.setTimeout(() => setDiningTime('19:55 / 20:14'), 2120),
        window.setTimeout(() => setDiningTime('20:00 / 20:30'), 2320),
        window.setTimeout(() => setAfterDarkTime('23:17'), 4600),
        window.setTimeout(() => setAfterDarkTime('01:40'), 4760),
        window.setTimeout(() => setAfterDarkTime('21:52'), 4920),
        window.setTimeout(() => setAfterDarkTime('22:00'), 5120),
      ];
    };

    runTimeSequence();
    const interval = window.setInterval(runTimeSequence, 9600);

    return () => {
      window.clearInterval(interval);
      clearTimers();
    };
  }, []);

  useEffect(() => {
    const menuTimer = window.setTimeout(() => setMenuReady(true), 900);

    const handleScroll = () => setIsScrolled(window.scrollY > 24);
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
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' }
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
    if (!isTouchMode) setActiveArea(areaId);
  };

  const handleControlsLeave = () => {
    if (!isTouchMode) setActiveArea(null);
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

        <div className="paper-noise" aria-hidden="true" />

        <div className="shell">
          <div className="poster-frame">
            <div className="window-bar" aria-hidden="true">
              <span className="window-dots">
                <i />
                <i />
                <i />
              </span>
              <span className="window-title">
                17LPS.OS // CONCEPT PROTOCOL // LONDON
              </span>
              <span className="window-status">LIVE</span>
            </div>

            <section
              className="hero-section reveal-section"
              aria-labelledby="concept-title"
            >
              <div className="hero-copy">
                <p className="hero-kicker">
                  <span className="type-text" style={typeStyle(26, '180ms')}>
                    STUDIO // LITTLE PORTLAND
                  </span>
                </p>

                <h1 id="concept-title" className="scan-title scan-title-hero">
                  CONCEPT
                </h1>

                <p className="hero-address">
                  <span className="type-text" style={typeStyle(33, '430ms')}>
                    17 LITTLE PORTLAND STREET, LONDON
                  </span>
                </p>

                <div className="loading-module">
                  <span className="loading-label">LOADING:</span>
                  <div className="loading-copy">
                    <span>DINING</span>
                    <span>PERFORMANCE</span>
                    <span>IMMERSION</span>
                    <span>AFTER DARK</span>
                    <span>HUMAN SIGNAL</span>
                  </div>
                  <div className="loading-orbits" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
              </div>

              <div className="hero-visual" aria-hidden="true">
                <span className="spark spark-a" />
                <span className="spark spark-b" />

                <div className="signal-head">
                  <div className="signal-head-grid" />
                  <img
                    className="concept-flyer-graphic"
                    src={CONCEPT_ASSETS.flyerGraphic}
                    alt=""
                    draggable={false}
                  />
                  <div className="signal-nodes">
                    {Array.from({ length: 11 }).map((_, index) => (
                      <i key={index} style={{ '--node': index } as CSSProperties} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="hero-meta">
                <div>
                  <span>ISSUE 17</span>
                  <strong>17 LITTLE PORTLAND</strong>
                </div>
                <div>
                  <span>FORMAT</span>
                  <strong>DINNER / THEATRE / NIGHT</strong>
                </div>
                <div>
                  <span>STATUS</span>
                  <strong>NEW WORLD LOADING</strong>
                </div>
              </div>

              <div className="simulator-card">
                <div className="simulator-grid" aria-hidden="true" />
                <span className="simulator-label">TRAINING SIMULATOR</span>
                <span className="simulator-rate">HEART RATE [128 BPM]</span>
                <div className="simulator-figure" aria-hidden="true">
                  <span className="sim-head" />
                  <span className="sim-body" />
                  <span className="sim-arm sim-arm-left" />
                  <span className="sim-arm sim-arm-right" />
                  <span className="sim-deck sim-deck-left" />
                  <span className="sim-deck sim-deck-right" />
                  <span className="sim-console" />
                </div>
              </div>
            </section>

            <section
              className="space-section reveal-section"
              aria-labelledby="space-title"
            >
              <header className="section-heading">
                <span className="section-number">01</span>
                <div>
                  <p>PHYSICAL INTERFACE</p>
                  <h2 id="space-title" className="scan-title">
                    THE SPACE
                  </h2>
                </div>
                <span className="section-code">MAP / 3 ZONES</span>
              </header>

              <div className="space-grid">
                <nav
                  className="area-nav"
                  aria-label="Venue areas"
                  onMouseLeave={handleControlsLeave}
                >
                  <span className="area-nav-label">SELECT ENVIRONMENT:</span>
                  {AREAS.map((area) => (
                    <AreaLink
                      key={area.id}
                      area={area}
                      active={activeArea === area.id}
                      isTouchMode={isTouchMode}
                      onMouseEnter={() => handleCardEnter(area.id)}
                      onFocus={() => setActiveArea(area.id)}
                      onClick={handleCardClick(area.id)}
                    />
                  ))}
                </nav>

                <div className="venue-panel">
                  <span className="venue-panel-label">VENUE MODEL // AXONOMETRIC</span>
                  <span className="venue-panel-coord">51.5176° N / 0.1431° W</span>
                  <div className="venue-grid-lines" aria-hidden="true" />

                  <div className="venue-wrap" aria-label="Interactive venue map">
                    <img
                      src={SPACE_ASSETS.venue}
                      alt="Venue layout showing The Tent, Chef's Studio and The Studio"
                      className="venue-image venue-base"
                      draggable={false}
                    />

                    {AREAS.map((area) => (
                      <img
                        key={area.id}
                        src={area.highlight}
                        alt=""
                        className={`venue-image venue-highlight ${
                          activeArea === area.id ? 'is-active' : ''
                        }`}
                        draggable={false}
                      />
                    ))}

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

                <aside className="space-diagnostics" aria-label="Venue diagnostics">
                  <div className="diagnostic-square diagnostic-radar">
                    <span className="radar-pulse" />
                  </div>
                  <div className="diagnostic-copy">
                    <span>CAPACITY</span>
                    <strong>VARIABLE</strong>
                    <span>CONFIGURATION</span>
                    <strong>ADAPTIVE</strong>
                    <span>INPUT</span>
                    <strong>HUMAN</strong>
                  </div>
                  <div className="diagnostic-wave" aria-hidden="true">
                    {Array.from({ length: 8 }).map((_, index) => (
                      <i key={index} />
                    ))}
                  </div>
                </aside>
              </div>
            </section>

            <section
              className="experience-section reveal-section"
              aria-labelledby="experience-title"
            >
              <header className="section-heading section-heading-experience">
                <span className="section-number">02</span>
                <div>
                  <p>TEMPORAL INTERFACE</p>
                  <h2 id="experience-title" className="scan-title">
                    THE EXPERIENCE
                  </h2>
                </div>
                <span className="section-code">SUNSET → LATE</span>
              </header>

              <div className="experience-layout">
                <div className="experience-monitor">
                  <span className="monitor-label">SEQUENCE STATUS:</span>

                  <div className="experience-signal" aria-hidden="true">
                    <div className="signal-track">
                      <div className="signal-line" />
                      <div className="signal-line-fill" />
                    </div>

                    <div className="signal-node signal-node-dining">
                      <span className="signal-time">{diningTime}</span>
                      <span className="signal-dot">
                        <span className="signal-dot-fill" />
                      </span>
                    </div>

                    <div className="signal-node signal-node-after-dark">
                      <span className="signal-time">{afterDarkTime}</span>
                      <span className="signal-dot">
                        <span className="signal-dot-fill" />
                      </span>
                    </div>
                  </div>

                  <div className="experience-copy">
                    <p>
                      ONE ADDRESS. MULTIPLE STATES. THE EVENING MUTATES FROM
                      TABLE TO PERFORMANCE TO AFTER-DARK ENERGY.
                    </p>
                    <span>NO FIXED GENRE // NO PASSIVE AUDIENCE</span>
                  </div>

                  <div className="globe-strip" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </div>
                </div>

                <nav className="experience-nav" aria-label="Explore the experience">
                  {EXPERIENCE_BTNS.map((button, index) => (
                    <ExperienceCard
                      key={button.href}
                      {...button}
                      index={index}
                    />
                  ))}
                </nav>
              </div>
            </section>

            <footer className="poster-footer">
              <span>17LPS // RESIDENT SYSTEM</span>
              <span>YOUNG LITTLE PORTLAND</span>
              <span>CONCEPT BUILD 02</span>
            </footer>
          </div>
        </div>
      </main>

      <style jsx global>{`
        html,
        body,
        #__next {
          margin: 0;
          min-height: 100%;
          background: ${C.concrete};
          color: ${C.ink};
          font-family: ${MONO};
          -webkit-font-smoothing: antialiased;
          text-rendering: geometricPrecision;
          scrollbar-color: ${C.red} rgba(9, 9, 9, 0.18);
        }

        body {
          overflow-x: hidden;
        }

        * {
          box-sizing: border-box;
        }

        ::selection {
          background: ${C.green};
          color: ${C.ink};
        }

        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(9, 9, 9, 0.12);
        }

        ::-webkit-scrollbar-thumb {
          background: ${C.red};
          border: 2px solid ${C.concrete};
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
          color: ${C.red} !important;
          opacity: 1 !important;
        }

        .scene-nav--space a.disabled,
        .scene-nav-mobile--space a.disabled {
          color: ${C.ink} !important;
          opacity: 0.35;
        }

        .scene-nav--space .scene-nav-burger span {
          background: ${C.ink} !important;
        }

        .scene-nav--space .scene-nav-logo img {
          filter: brightness(0) saturate(100%);
        }

        .concept-nav-shell.is-scrolled .scene-nav.scene-nav--space {
          background: rgba(167, 168, 165, 0.72) !important;
          border-bottom: 1px solid ${C.red};
          box-shadow: 0 10px 28px rgba(9, 9, 9, 0.08);
          backdrop-filter: blur(18px) !important;
          -webkit-backdrop-filter: blur(18px) !important;
        }

        .scene-nav-mobile.scene-nav--space,
        .scene-nav-mobile--space {
          background: rgba(167, 168, 165, 0.94) !important;
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
            background: rgba(167, 168, 165, 0.9);
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
            background: rgba(167, 168, 165, 0.9) !important;
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
            background: rgba(167, 168, 165, 0.9) !important;
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
            color: ${C.red} !important;
          }
        }
      `}</style>

      <style jsx global>{`
        .page {
          position: relative;
          min-height: 100svh;
          overflow-x: clip;
          background:
            linear-gradient(rgba(255, 255, 255, 0.025), rgba(255, 255, 255, 0.025)),
            ${C.concrete};
        }

        .concept-nav-shell {
          position: fixed;
          inset: 0 0 auto;
          z-index: 10000;
          opacity: 0;
          transform: translateY(-16px);
          pointer-events: none;
          transition:
            opacity 0.6s ease,
            transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .concept-nav-shell.is-ready {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .paper-noise {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background-image:
            url('${CONCEPT_ASSETS.bg}'),
            repeating-linear-gradient(
              0deg,
              rgba(9, 9, 9, 0.025) 0,
              rgba(9, 9, 9, 0.025) 1px,
              transparent 1px,
              transparent 4px
            );
          background-size: 560px auto, auto;
          background-repeat: repeat;
          mix-blend-mode: multiply;
          filter: grayscale(1) contrast(1.2);
          opacity: 0.14;
        }

        .shell {
          position: relative;
          z-index: 2;
          width: min(1180px, calc(100% - 72px));
          margin: 0 auto;
          padding: clamp(100px, 9vw, 132px) 0 clamp(48px, 6vw, 84px);
        }

        .poster-frame {
          position: relative;
          border: 2px solid ${C.red};
          background: rgba(167, 168, 165, 0.58);
          box-shadow: 14px 14px 0 rgba(9, 9, 9, 0.08);
        }

        .window-bar {
          min-height: 38px;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 18px;
          padding: 8px 16px;
          border-bottom: 2px solid ${C.red};
          color: ${C.ink};
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.13em;
          text-transform: lowercase;
        }

        .window-dots {
          display: inline-flex;
          gap: 8px;
        }

        .window-dots i {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: ${C.red};
        }

        .window-title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .window-status {
          color: ${C.red};
        }

        .hero-section,
        .space-section,
        .experience-section {
          position: relative;
          border-bottom: 1px solid rgba(255, 26, 18, 0.72);
        }

        .hero-section {
          min-height: 790px;
          display: grid;
          grid-template-columns: minmax(0, 1.12fr) minmax(330px, 0.88fr);
          grid-template-areas:
            'copy visual'
            'meta simulator';
          gap: 40px 46px;
          align-items: start;
          padding: clamp(54px, 6vw, 84px);
          overflow: hidden;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(90deg, transparent 49.9%, rgba(255, 26, 18, 0.14) 50%, transparent 50.1%),
            linear-gradient(0deg, transparent 49.9%, rgba(255, 26, 18, 0.1) 50%, transparent 50.1%);
          background-size: 110px 110px;
          opacity: 0.24;
          mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
        }

        .hero-copy {
          grid-area: copy;
          position: relative;
          z-index: 3;
          min-width: 0;
        }

        .hero-kicker,
        .hero-address,
        .loading-module,
        .hero-meta,
        .simulator-card {
          opacity: 0;
          transform: translateY(12px);
        }

        .hero-section.is-inview .hero-kicker {
          animation: moduleIn 0.5s ease 120ms forwards;
        }

        .hero-section.is-inview .hero-address {
          animation: moduleIn 0.5s ease 520ms forwards;
        }

        .hero-section.is-inview .loading-module {
          animation: moduleIn 0.65s ease 760ms forwards;
        }

        .hero-section.is-inview .hero-meta {
          animation: moduleIn 0.65s ease 980ms forwards;
        }

        .hero-section.is-inview .simulator-card {
          animation: moduleIn 0.65s ease 1120ms forwards;
        }

        h1,
        h2,
        p {
          margin: 0;
        }

        .hero-kicker {
          color: ${C.ink};
          font-size: clamp(18px, 2.1vw, 30px);
          letter-spacing: 0.16em;
          text-transform: lowercase;
        }

        .scan-title {
          font-family: ${MONO};
          color: ${C.ink};
          font-weight: 700;
          line-height: 0.86;
          letter-spacing: -0.07em;
          text-transform: uppercase;
          opacity: 0;
          clip-path: inset(0 100% 0 0);
          transform: translateX(-12px);
        }

        .scan-title-hero {
          margin-top: clamp(22px, 3vw, 38px);
          font-size: clamp(74px, 9.1vw, 142px);
          white-space: nowrap;
        }

        .reveal-section.is-inview .scan-title {
          animation:
            scanTitleReveal 0.56s steps(9, end) 230ms forwards,
            titleIdleGlitch 8s steps(2, end) 3000ms infinite;
        }

        .hero-address {
          margin-top: 24px;
          color: ${C.red};
          font-size: clamp(11px, 1.05vw, 15px);
          font-weight: 700;
          letter-spacing: 0.26em;
          text-transform: uppercase;
        }

        .type-text {
          display: inline-block;
          max-width: 100%;
          overflow: hidden;
          white-space: nowrap;
          clip-path: inset(0 100% 0 0);
        }

        .reveal-section.is-inview .type-text {
          animation: typeReveal 0.55s steps(var(--chars), end) var(--type-delay) forwards;
        }

        .loading-module {
          position: relative;
          width: min(100%, 520px);
          margin-top: clamp(58px, 6vw, 90px);
          padding-left: 20px;
          color: ${C.blue};
        }

        .loading-label {
          display: block;
          margin-bottom: 20px;
          font-size: 17px;
          letter-spacing: 0.16em;
        }

        .loading-copy {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          font-size: clamp(18px, 1.7vw, 25px);
          line-height: 1.06;
          letter-spacing: 0.05em;
        }

        .loading-copy span:nth-child(4) {
          color: ${C.ink};
          background: ${C.green};
          padding: 0 5px;
        }

        .loading-orbits {
          position: absolute;
          left: 0;
          top: 58px;
          width: min(100%, 430px);
          height: 150px;
          pointer-events: none;
        }

        .loading-orbits i {
          position: absolute;
          left: 0;
          width: 100%;
          height: 48px;
          border: 2px solid ${C.red};
          border-radius: 50%;
          transform: skewX(-7deg);
          opacity: 0.92;
        }

        .loading-orbits i:nth-child(1) { top: 0; }
        .loading-orbits i:nth-child(2) { top: 24px; }
        .loading-orbits i:nth-child(3) { top: 48px; }
        .loading-orbits i:nth-child(4) { top: 72px; }
        .loading-orbits i:nth-child(5) { top: 96px; }

        .hero-visual {
          grid-area: visual;
          position: relative;
          z-index: 3;
          min-height: 460px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .signal-head {
          position: relative;
          width: min(100%, 430px);
          aspect-ratio: 1 / 1;
          opacity: 0;
          transform: translate3d(30px, 16px, 0) scale(0.96);
        }

        .hero-section.is-inview .signal-head {
          animation:
            signalHeadIn 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 480ms forwards,
            signalHeadFloat 5.4s ease-in-out 1600ms infinite;
        }

        .signal-head-grid {
          position: absolute;
          inset: 6%;
          border-radius: 50%;
          background:
            repeating-radial-gradient(circle, transparent 0 19px, rgba(25, 255, 56, 0.6) 20px 21px),
            repeating-linear-gradient(0deg, transparent 0 19px, rgba(25, 255, 56, 0.3) 20px 21px),
            repeating-linear-gradient(90deg, transparent 0 19px, rgba(25, 255, 56, 0.3) 20px 21px);
          clip-path: circle(46% at 50% 50%);
          opacity: 0.42;
          animation: radarRotate 18s linear infinite;
        }

        .concept-flyer-graphic {
          position: absolute;
          inset: 10% 7% auto auto;
          z-index: 2;
          width: 84%;
          height: 84%;
          object-fit: contain;
          filter:
            contrast(1.16)
            saturate(1.3)
            drop-shadow(12px 16px 0 rgba(9, 9, 9, 0.12));
          user-select: none;
          pointer-events: none;
        }

        .signal-nodes i {
          --angle: calc(var(--node) * 32.72deg);
          position: absolute;
          left: 50%;
          top: 50%;
          z-index: 4;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: ${C.green};
          box-shadow: 0 0 0 2px ${C.ink};
          transform:
            rotate(var(--angle))
            translateX(clamp(96px, 12vw, 164px))
            rotate(calc(var(--angle) * -1));
          animation: nodePulse 2.4s ease-in-out calc(var(--node) * -0.14s) infinite;
        }

        .spark {
          position: absolute;
          z-index: 6;
          width: 44px;
          height: 44px;
        }

        .spark::before,
        .spark::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          background: ${C.red};
          transform: translate(-50%, -50%);
        }

        .spark::before {
          width: 100%;
          height: 8px;
          border-radius: 50%;
        }

        .spark::after {
          width: 8px;
          height: 100%;
          border-radius: 50%;
        }

        .spark-a {
          top: 5%;
          right: 1%;
        }

        .spark-b {
          bottom: 3%;
          left: 4%;
          transform: scale(0.72);
        }

        .hero-meta {
          grid-area: meta;
          position: relative;
          z-index: 3;
          display: grid;
          align-self: end;
          gap: 20px;
          padding-left: 18px;
          border-left: 2px solid ${C.red};
        }

        .hero-meta div {
          display: grid;
          gap: 5px;
        }

        .hero-meta span {
          color: ${C.blue};
          font-size: 10px;
          letter-spacing: 0.18em;
        }

        .hero-meta strong {
          color: ${C.ink};
          font-size: 13px;
          letter-spacing: 0.08em;
        }

        .simulator-card {
          grid-area: simulator;
          position: relative;
          min-height: 260px;
          align-self: end;
          border: 2px solid ${C.red};
          overflow: hidden;
        }

        .simulator-grid,
        .venue-grid-lines,
        .experience-card-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            repeating-linear-gradient(0deg, transparent 0 27px, rgba(255, 26, 18, 0.32) 28px 29px),
            repeating-linear-gradient(90deg, transparent 0 39px, rgba(255, 26, 18, 0.32) 40px 41px);
          transform: perspective(320px) rotateX(58deg) scale(1.3);
          transform-origin: center bottom;
          opacity: 0.68;
        }

        .simulator-label,
        .simulator-rate {
          position: absolute;
          z-index: 3;
          left: 16px;
          font-size: 12px;
          letter-spacing: 0.08em;
        }

        .simulator-label {
          top: 14px;
          color: ${C.blue};
        }

        .simulator-rate {
          top: 36px;
          color: ${C.red};
        }

        .simulator-figure {
          position: absolute;
          left: 50%;
          bottom: 22px;
          z-index: 3;
          width: 240px;
          height: 160px;
          transform: translateX(-50%);
        }

        .sim-head,
        .sim-body,
        .sim-arm,
        .sim-deck,
        .sim-console {
          position: absolute;
          display: block;
        }

        .sim-head {
          left: 50%;
          top: 4px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: ${C.blue};
          transform: translateX(-50%);
          box-shadow: inset 0 -11px 0 ${C.red};
        }

        .sim-body {
          left: 50%;
          top: 35px;
          width: 76px;
          height: 88px;
          border-radius: 45% 45% 10px 10px;
          background: ${C.blue};
          transform: translateX(-50%);
        }

        .sim-arm {
          top: 68px;
          width: 86px;
          height: 22px;
          background: ${C.blue};
        }

        .sim-arm-left {
          left: 23px;
          transform: rotate(-18deg);
          transform-origin: right center;
          box-shadow: -12px 0 0 ${C.red};
        }

        .sim-arm-right {
          right: 23px;
          transform: rotate(18deg);
          transform-origin: left center;
          box-shadow: 12px 0 0 ${C.red};
        }

        .sim-deck {
          bottom: 0;
          width: 94px;
          height: 48px;
          border: 5px solid ${C.red};
          transform: skewX(-14deg);
        }

        .sim-deck::after {
          content: '';
          position: absolute;
          inset: 10px 24px;
          border: 4px solid ${C.red};
          border-radius: 50%;
        }

        .sim-deck-left { left: 0; }
        .sim-deck-right { right: 0; transform: skewX(14deg); }

        .sim-console {
          left: 50%;
          bottom: 0;
          width: 46px;
          height: 42px;
          background: ${C.red};
          transform: translateX(-50%);
        }

        .space-section,
        .experience-section {
          padding: clamp(58px, 6vw, 86px);
        }

        .section-heading {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: end;
          gap: 20px;
          margin-bottom: clamp(44px, 5vw, 68px);
        }

        .section-number {
          align-self: start;
          color: ${C.red};
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.18em;
        }

        .section-heading p,
        .section-code {
          color: ${C.blue};
          font-size: 10px;
          letter-spacing: 0.18em;
        }

        .section-heading h2 {
          margin-top: 10px;
          font-size: clamp(56px, 7vw, 104px);
        }

        .section-code {
          padding-bottom: 8px;
          text-align: right;
        }

        .space-grid {
          display: grid;
          grid-template-columns: minmax(210px, 0.72fr) minmax(420px, 1.65fr) minmax(160px, 0.55fr);
          gap: 22px;
          align-items: stretch;
        }

        .area-nav {
          display: flex;
          flex-direction: column;
          min-width: 0;
          padding-top: 10px;
        }

        .area-nav-label {
          margin-bottom: 22px;
          color: ${C.blue};
          font-size: 11px;
          letter-spacing: 0.14em;
        }

        .area-link {
          position: relative;
          min-height: 94px;
          display: grid;
          grid-template-columns: 32px 1fr;
          grid-template-areas:
            'index title'
            '. meta';
          align-content: center;
          gap: 3px 10px;
          padding: 14px 8px;
          color: ${C.ink};
          text-decoration: none;
          border-bottom: 1px solid rgba(9, 9, 9, 0.38);
          isolation: isolate;
        }

        .area-index {
          grid-area: index;
          align-self: center;
          color: ${C.red};
          font-size: 10px;
          letter-spacing: 0.12em;
        }

        .area-title {
          grid-area: title;
          position: relative;
          z-index: 2;
          align-self: center;
          font-size: clamp(17px, 1.55vw, 24px);
          font-weight: 700;
          line-height: 1;
        }

        .area-meta {
          grid-area: meta;
          position: relative;
          z-index: 2;
          color: ${C.blue};
          font-size: 8px;
          letter-spacing: 0.14em;
        }

        .area-orbits {
          position: absolute;
          inset: 7px -2px;
          z-index: 1;
          opacity: 0;
          transition: opacity 0.22s ease;
          pointer-events: none;
        }

        .area-orbits span {
          position: absolute;
          left: 0;
          right: 0;
          height: 46px;
          border: 2px solid ${C.red};
          border-radius: 50%;
          transform: skewX(-7deg);
        }

        .area-orbits span:nth-child(1) { top: 0; }
        .area-orbits span:nth-child(2) { top: 18px; }
        .area-orbits span:nth-child(3) { top: 36px; }

        .area-link:hover .area-orbits,
        .area-link:focus-visible .area-orbits,
        .area-link.is-active .area-orbits {
          opacity: 1;
        }

        .area-link:hover,
        .area-link:focus-visible,
        .area-link.is-active {
          outline: none;
        }

        .area-link:hover .area-title,
        .area-link:focus-visible .area-title,
        .area-link.is-active .area-title {
          color: ${C.ink};
          background: ${C.green};
          width: fit-content;
          padding: 0 4px;
        }

        .venue-panel {
          position: relative;
          min-height: 470px;
          border: 2px solid ${C.red};
          overflow: hidden;
          background: rgba(209, 210, 206, 0.18);
        }

        .venue-panel::after {
          content: '';
          position: absolute;
          inset: auto 0 0;
          height: 42%;
          background: linear-gradient(to top, rgba(33, 23, 143, 0.12), transparent);
          pointer-events: none;
        }

        .venue-panel-label,
        .venue-panel-coord {
          position: absolute;
          top: 14px;
          z-index: 6;
          font-size: 9px;
          letter-spacing: 0.12em;
        }

        .venue-panel-label {
          left: 14px;
          color: ${C.blue};
        }

        .venue-panel-coord {
          right: 14px;
          color: ${C.red};
        }

        .venue-grid-lines {
          opacity: 0.45;
        }

        .venue-wrap {
          position: absolute;
          left: 3%;
          right: 3%;
          top: 15%;
          bottom: 4%;
          z-index: 3;
          opacity: 0;
          transform: translateY(20px) scale(0.97);
        }

        .space-section.is-inview .venue-wrap {
          animation:
            venueIn 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 420ms forwards,
            venueFloat 4.8s ease-in-out 1700ms infinite;
        }

        .venue-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          user-select: none;
          pointer-events: none;
        }

        .venue-base {
          z-index: 2;
          filter:
            saturate(0.7)
            contrast(1.05)
            drop-shadow(0 16px 18px rgba(9, 9, 9, 0.16));
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
          filter: saturate(1.35) contrast(1.06) drop-shadow(0 0 14px rgba(25, 255, 56, 0.42));
        }

        .venue-glitch {
          z-index: 5;
          opacity: 0;
          mix-blend-mode: multiply;
        }

        .space-section.is-inview .venue-glitch-a {
          filter: hue-rotate(-28deg) saturate(1.6);
          animation: venueGlitchA 8.5s steps(1, end) 1800ms infinite;
        }

        .space-section.is-inview .venue-glitch-b {
          filter: hue-rotate(110deg) saturate(1.8);
          animation: venueGlitchB 8.5s steps(1, end) 1800ms infinite;
        }

        .space-diagnostics {
          display: grid;
          grid-template-rows: auto auto 1fr;
          gap: 16px;
        }

        .diagnostic-square {
          position: relative;
          aspect-ratio: 1;
          border: 2px solid ${C.green};
          overflow: hidden;
        }

        .diagnostic-radar {
          background:
            repeating-radial-gradient(circle at 50% 50%, transparent 0 13px, rgba(25, 255, 56, 0.55) 14px 15px),
            repeating-linear-gradient(45deg, transparent 0 16px, rgba(25, 255, 56, 0.35) 17px 18px);
        }

        .radar-pulse {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: ${C.green};
          transform: translate(-50%, -50%);
          box-shadow: 0 0 0 0 rgba(25, 255, 56, 0.8);
          animation: radarPulse 2.2s ease-out infinite;
        }

        .diagnostic-copy {
          display: grid;
          gap: 4px;
          padding: 13px 12px;
          border: 1px solid ${C.blue};
        }

        .diagnostic-copy span {
          margin-top: 7px;
          color: ${C.blue};
          font-size: 8px;
          letter-spacing: 0.12em;
        }

        .diagnostic-copy strong {
          font-size: 11px;
          letter-spacing: 0.07em;
        }

        .diagnostic-wave {
          min-height: 160px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 5px;
          padding: 16px;
          border: 2px solid ${C.green};
          overflow: hidden;
        }

        .diagnostic-wave i {
          flex: 1;
          background: ${C.green};
          height: 30%;
          transform-origin: bottom;
          animation: waveBars 1.8s ease-in-out calc(var(--bar, 0) * -0.11s) infinite;
        }

        .diagnostic-wave i:nth-child(2) { --bar: 1; height: 58%; }
        .diagnostic-wave i:nth-child(3) { --bar: 2; height: 82%; }
        .diagnostic-wave i:nth-child(4) { --bar: 3; height: 44%; }
        .diagnostic-wave i:nth-child(5) { --bar: 4; height: 92%; }
        .diagnostic-wave i:nth-child(6) { --bar: 5; height: 64%; }
        .diagnostic-wave i:nth-child(7) { --bar: 6; height: 37%; }
        .diagnostic-wave i:nth-child(8) { --bar: 7; height: 76%; }

        .experience-layout {
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(400px, 1.1fr);
          gap: 24px;
        }

        .experience-monitor {
          position: relative;
          min-height: 470px;
          padding: 24px;
          border: 2px solid ${C.red};
          overflow: hidden;
        }

        .experience-monitor::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, transparent 49.8%, rgba(255, 26, 18, 0.18) 50%, transparent 50.2%),
            linear-gradient(0deg, transparent 49.8%, rgba(255, 26, 18, 0.18) 50%, transparent 50.2%);
          background-size: 72px 72px;
          opacity: 0.4;
        }

        .monitor-label {
          position: relative;
          z-index: 2;
          color: ${C.blue};
          font-size: 11px;
          letter-spacing: 0.14em;
        }

        .experience-signal {
          --signal-y: 54px;
          position: relative;
          z-index: 3;
          height: 92px;
          margin-top: 52px;
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
          background: rgba(9, 9, 9, 0.55);
          transform: scaleX(0);
        }

        .signal-line-fill {
          background: ${C.green};
          transform: scaleX(0);
          opacity: 0;
        }

        .experience-section.is-inview .signal-line {
          animation: signalLineIn 0.82s ease 420ms forwards;
        }

        .experience-section.is-inview .signal-line-fill {
          animation: signalFillLoop 9.6s ease-in-out 1200ms infinite;
        }

        .signal-node {
          position: absolute;
          top: 0;
          min-width: 170px;
          height: 72px;
          opacity: 0;
          transform: translateY(8px);
        }

        .signal-node-dining { left: 0; }
        .signal-node-after-dark { right: 0; text-align: right; }

        .experience-section.is-inview .signal-node-dining {
          animation: moduleIn 0.45s ease 680ms forwards;
        }

        .experience-section.is-inview .signal-node-after-dark {
          animation: moduleIn 0.45s ease 820ms forwards;
        }

        .signal-dot {
          position: absolute;
          top: var(--signal-y);
          width: 18px;
          height: 18px;
          border: 2px solid ${C.red};
          border-radius: 50%;
          background: ${C.concrete};
          overflow: hidden;
          transform: translateY(-50%);
        }

        .signal-node-dining .signal-dot { left: 0; }
        .signal-node-after-dark .signal-dot { right: 0; }

        .signal-dot-fill {
          position: absolute;
          inset: 2px;
          border-radius: inherit;
          background: ${C.green};
          opacity: 0;
        }

        .experience-section.is-inview .signal-node-dining .signal-dot-fill {
          animation: diningDotFill 9.6s ease-in-out 1200ms infinite;
        }

        .experience-section.is-inview .signal-node-after-dark .signal-dot-fill {
          animation: afterDarkDotFill 9.6s ease-in-out 1200ms infinite;
        }

        .signal-time {
          position: absolute;
          top: 0;
          color: ${C.blue};
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.14em;
          white-space: nowrap;
        }

        .signal-node-dining .signal-time { left: 0; }
        .signal-node-after-dark .signal-time { right: 0; }

        .experience-copy {
          position: relative;
          z-index: 2;
          margin-top: 42px;
        }

        .experience-copy p {
          max-width: 520px;
          font-size: clamp(20px, 2.2vw, 31px);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.04em;
        }

        .experience-copy span {
          display: block;
          margin-top: 24px;
          color: ${C.red};
          font-size: 10px;
          letter-spacing: 0.14em;
        }

        .globe-strip {
          position: absolute;
          left: 24px;
          right: 24px;
          bottom: 20px;
          display: flex;
          justify-content: flex-end;
        }

        .globe-strip i {
          width: 94px;
          aspect-ratio: 1;
          margin-left: -12px;
          border: 2px solid ${C.green};
          border-radius: 50%;
          background:
            repeating-radial-gradient(ellipse at center, transparent 0 13px, rgba(25, 255, 56, 0.65) 14px 15px),
            repeating-linear-gradient(90deg, transparent 0 16px, rgba(25, 255, 56, 0.65) 17px 18px);
          opacity: 0.8;
        }

        .globe-strip i:nth-child(2) {
          background:
            repeating-linear-gradient(45deg, transparent 0 12px, rgba(25, 255, 56, 0.75) 13px 14px),
            repeating-linear-gradient(-45deg, transparent 0 12px, rgba(25, 255, 56, 0.75) 13px 14px);
        }

        .globe-strip i:nth-child(3) {
          background:
            repeating-radial-gradient(circle at 80% 40%, transparent 0 12px, rgba(25, 255, 56, 0.75) 13px 14px),
            repeating-linear-gradient(0deg, transparent 0 16px, rgba(25, 255, 56, 0.55) 17px 18px);
        }

        .experience-nav {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }

        .experience-card {
          position: relative;
          min-height: 225px;
          display: grid;
          align-content: end;
          padding: 22px;
          color: ${C.ink};
          text-decoration: none;
          border: 2px solid currentColor;
          overflow: hidden;
          opacity: 0;
          transform: translateY(14px);
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            background 0.25s ease;
        }

        .experience-section.is-inview .experience-card {
          animation: moduleIn 0.55s ease var(--card-delay) forwards;
        }

        .experience-card.is-green {
          border-color: ${C.green};
        }

        .experience-card.is-blue {
          color: ${C.mist};
          border-color: ${C.blue};
          background: ${C.blue};
        }

        .experience-card:hover,
        .experience-card:focus-visible {
          outline: none;
          transform: translate(-5px, -5px);
          box-shadow: 10px 10px 0 ${C.red};
        }

        .experience-card.is-green:hover,
        .experience-card.is-green:focus-visible {
          background: ${C.green};
        }

        .experience-card.is-blue:hover,
        .experience-card.is-blue:focus-visible {
          background: ${C.ink};
        }

        .experience-card-grid {
          opacity: 0.32;
          color: inherit;
        }

        .experience-card-number,
        .experience-card-title,
        .experience-card-code,
        .experience-card-cta {
          position: relative;
          z-index: 2;
        }

        .experience-card-number {
          position: absolute;
          left: 20px;
          top: 17px;
          color: ${C.red};
          font-size: 12px;
          letter-spacing: 0.14em;
        }

        .experience-card-title {
          font-size: clamp(34px, 4vw, 58px);
          font-weight: 700;
          line-height: 0.92;
          letter-spacing: -0.06em;
        }

        .experience-card-code {
          margin-top: 10px;
          color: ${C.red};
          font-size: 12px;
          letter-spacing: 0.11em;
        }

        .experience-card-cta {
          margin-top: 24px;
          font-size: 9px;
          letter-spacing: 0.15em;
        }

        .poster-footer {
          min-height: 54px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          align-items: center;
          gap: 12px;
          padding: 12px 18px;
          color: ${C.blue};
          font-size: 9px;
          letter-spacing: 0.14em;
        }

        .poster-footer span:nth-child(2) { text-align: center; }
        .poster-footer span:nth-child(3) { text-align: right; }

        @keyframes scanTitleReveal {
          0% {
            opacity: 0;
            clip-path: inset(0 100% 0 0);
            transform: translateX(-12px);
            filter: blur(2px);
          }
          68% {
            opacity: 1;
            clip-path: inset(0 0 0 0);
            transform: translateX(0);
            filter: none;
          }
          80% { transform: translateX(5px); }
          88% { transform: translateX(-3px); }
          100% {
            opacity: 1;
            clip-path: inset(0 0 0 0);
            transform: translateX(0);
            filter: none;
          }
        }

        @keyframes titleIdleGlitch {
          0%, 91%, 100% { text-shadow: none; filter: none; }
          92% { text-shadow: 0.08em 0 ${C.red}; }
          93% { text-shadow: -0.06em 0 ${C.green}; }
          94% { filter: blur(0.5px); }
          95% { text-shadow: 0.04em 0 ${C.blue}; filter: none; }
        }

        @keyframes typeReveal {
          to { clip-path: inset(0 0 0 0); }
        }

        @keyframes moduleIn {
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes signalHeadIn {
          to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
        }

        @keyframes signalHeadFloat {
          0%, 100% { transform: translateY(0) rotate(-0.5deg); }
          50% { transform: translateY(-11px) rotate(0.6deg); }
        }

        @keyframes radarRotate {
          to { transform: rotate(360deg); }
        }

        @keyframes nodePulse {
          0%, 100% { opacity: 0.65; scale: 0.88; }
          50% { opacity: 1; scale: 1.12; }
        }

        @keyframes radarPulse {
          0% { box-shadow: 0 0 0 0 rgba(25, 255, 56, 0.82); }
          100% { box-shadow: 0 0 0 48px rgba(25, 255, 56, 0); }
        }

        @keyframes waveBars {
          0%, 100% { transform: scaleY(0.45); }
          50% { transform: scaleY(1); }
        }

        @keyframes venueIn {
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes venueFloat {
          0%, 100% { transform: translateY(0) rotate(-0.15deg); }
          50% { transform: translateY(-8px) rotate(0.2deg); }
        }

        @keyframes venueGlitchA {
          0%, 73%, 100% { opacity: 0; transform: translate3d(0, 0, 0); clip-path: inset(0); }
          74% { opacity: 0.22; transform: translate3d(-9px, -3px, 0); clip-path: inset(0 0 82% 0); }
          75% { opacity: 0.2; transform: translate3d(10px, 5px, 0); clip-path: inset(28% 0 44% 0); }
          76% { opacity: 0.18; transform: translate3d(-7px, 4px, 0); clip-path: inset(64% 0 8% 0); }
          77% { opacity: 0; transform: translate3d(0, 0, 0); clip-path: inset(0); }
        }

        @keyframes venueGlitchB {
          0%, 73%, 100% { opacity: 0; transform: translate3d(0, 0, 0); clip-path: inset(0); }
          74.2% { opacity: 0.12; transform: translate3d(8px, 4px, 0); clip-path: inset(12% 0 66% 0); }
          75.2% { opacity: 0.18; transform: translate3d(-11px, -4px, 0); clip-path: inset(42% 0 30% 0); }
          76.2% { opacity: 0.14; transform: translate3d(7px, -5px, 0); clip-path: inset(72% 0 4% 0); }
          77% { opacity: 0; transform: translate3d(0, 0, 0); clip-path: inset(0); }
        }

        @keyframes signalLineIn {
          to { transform: scaleX(1); }
        }

        @keyframes signalFillLoop {
          0%, 17% { transform: scaleX(0); opacity: 0; }
          22% { transform: scaleX(0); opacity: 1; }
          56% { transform: scaleX(1); opacity: 1; }
          72%, 100% { transform: scaleX(1); opacity: 0; }
        }

        @keyframes diningDotFill {
          0%, 17% { opacity: 0; }
          22%, 62% { opacity: 1; }
          78%, 100% { opacity: 0; }
        }

        @keyframes afterDarkDotFill {
          0%, 47% { opacity: 0; }
          56%, 70% { opacity: 1; }
          84%, 100% { opacity: 0; }
        }

        @media (max-width: 1120px) {
          .shell {
            width: min(1000px, calc(100% - 48px));
          }

          .hero-section {
            grid-template-columns: minmax(0, 1fr) minmax(300px, 0.8fr);
            padding: 54px;
          }

          .space-section,
          .experience-section {
            padding: 54px;
          }

          .space-grid {
            grid-template-columns: minmax(190px, 0.65fr) minmax(400px, 1.5fr);
          }

          .space-diagnostics {
            grid-column: 1 / -1;
            grid-template-columns: 180px 1fr 1fr;
            grid-template-rows: auto;
          }

          .diagnostic-wave {
            min-height: 180px;
          }
        }

        @media (max-width: 880px) {
          .shell {
            width: calc(100% - 32px);
            padding-top: 90px;
          }

          .hero-section {
            min-height: auto;
            grid-template-columns: 1fr;
            grid-template-areas:
              'copy'
              'visual'
              'simulator'
              'meta';
            gap: 34px;
            padding: 42px 30px;
          }

          .scan-title-hero {
            font-size: clamp(62px, 15vw, 108px);
          }

          .hero-visual {
            min-height: 390px;
          }

          .signal-head {
            max-width: 400px;
          }

          .loading-module {
            margin-top: 48px;
          }

          .hero-meta {
            grid-template-columns: repeat(3, 1fr);
            border-left: 0;
            border-top: 2px solid ${C.red};
            padding: 18px 0 0;
          }

          .space-section,
          .experience-section {
            padding: 44px 30px;
          }

          .section-heading {
            grid-template-columns: auto 1fr;
          }

          .section-code {
            display: none;
          }

          .section-heading h2 {
            font-size: clamp(48px, 11vw, 78px);
          }

          .space-grid {
            grid-template-columns: 1fr;
          }

          .area-nav {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
          }

          .area-nav-label {
            grid-column: 1 / -1;
          }

          .area-link {
            min-height: 115px;
            border: 1px solid rgba(9, 9, 9, 0.4);
            padding: 14px;
          }

          .venue-panel {
            min-height: 470px;
          }

          .space-diagnostics {
            grid-template-columns: repeat(3, 1fr);
          }

          .experience-layout {
            grid-template-columns: 1fr;
          }

          .experience-nav {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 620px) {
          .shell {
            width: calc(100% - 18px);
            padding-top: 82px;
            padding-bottom: 24px;
          }

          .poster-frame {
            box-shadow: 7px 7px 0 rgba(9, 9, 9, 0.08);
          }

          .window-bar {
            grid-template-columns: auto 1fr;
            padding: 8px 10px;
          }

          .window-dots i {
            width: 11px;
            height: 11px;
          }

          .window-title {
            font-size: 8px;
            letter-spacing: 0.08em;
          }

          .window-status {
            display: none;
          }

          .hero-section {
            padding: 36px 18px;
          }

          .hero-kicker {
            font-size: 13px;
            letter-spacing: 0.1em;
          }

          .scan-title-hero {
            margin-top: 18px;
            font-size: clamp(48px, 16vw, 78px);
          }

          .hero-address {
            max-width: 270px;
            font-size: 9px;
            line-height: 1.7;
            white-space: normal;
          }

          .type-text {
            white-space: normal;
          }

          .loading-module {
            margin-top: 38px;
            padding-left: 6px;
          }

          .loading-label {
            font-size: 12px;
          }

          .loading-copy {
            font-size: 16px;
          }

          .loading-orbits {
            top: 50px;
            width: 100%;
            height: 132px;
          }

          .loading-orbits i {
            height: 38px;
          }

          .loading-orbits i:nth-child(2) { top: 21px; }
          .loading-orbits i:nth-child(3) { top: 42px; }
          .loading-orbits i:nth-child(4) { top: 63px; }
          .loading-orbits i:nth-child(5) { top: 84px; }

          .hero-visual {
            min-height: 300px;
          }

          .signal-head {
            max-width: 310px;
          }

          .signal-nodes i {
            width: 12px;
            height: 12px;
            transform:
              rotate(var(--angle))
              translateX(clamp(72px, 30vw, 116px))
              rotate(calc(var(--angle) * -1));
          }

          .simulator-card {
            min-height: 230px;
          }

          .simulator-figure {
            width: 210px;
            transform: translateX(-50%) scale(0.88);
          }

          .hero-meta {
            grid-template-columns: 1fr;
          }

          .space-section,
          .experience-section {
            padding: 38px 18px;
          }

          .section-heading {
            gap: 12px;
            margin-bottom: 34px;
          }

          .section-heading h2 {
            font-size: clamp(39px, 12vw, 60px);
          }

          .section-heading p {
            font-size: 8px;
          }

          .area-nav {
            grid-template-columns: 1fr;
          }

          .area-link {
            min-height: 86px;
          }

          .venue-panel {
            min-height: 330px;
          }

          .venue-panel-label,
          .venue-panel-coord {
            font-size: 7px;
          }

          .venue-panel-coord {
            display: none;
          }

          .space-diagnostics {
            grid-template-columns: 1fr 1fr;
          }

          .diagnostic-wave {
            grid-column: 1 / -1;
            min-height: 130px;
          }

          .experience-monitor {
            min-height: 430px;
            padding: 18px;
          }

          .experience-signal {
            --signal-y: 46px;
            margin-top: 40px;
          }

          .signal-time {
            font-size: 9px;
            letter-spacing: 0.07em;
          }

          .experience-copy p {
            font-size: 19px;
          }

          .globe-strip {
            left: 18px;
            right: 18px;
          }

          .globe-strip i {
            width: 70px;
          }

          .experience-nav {
            grid-template-columns: 1fr;
          }

          .experience-card {
            min-height: 190px;
          }

          .poster-footer {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .poster-footer span,
          .poster-footer span:nth-child(2),
          .poster-footer span:nth-child(3) {
            text-align: left;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .concept-nav-shell,
          .scan-title,
          .type-text,
          .hero-kicker,
          .hero-address,
          .loading-module,
          .hero-meta,
          .simulator-card,
          .signal-head,
          .signal-head-grid,
          .signal-nodes i,
          .venue-wrap,
          .venue-glitch,
          .radar-pulse,
          .diagnostic-wave i,
          .signal-line,
          .signal-line-fill,
          .signal-node,
          .signal-dot-fill,
          .experience-card {
            animation: none !important;
            transition: none !important;
          }

          .concept-nav-shell,
          .scan-title,
          .hero-kicker,
          .hero-address,
          .loading-module,
          .hero-meta,
          .simulator-card,
          .signal-head,
          .venue-wrap,
          .signal-node,
          .experience-card {
            opacity: 1;
            transform: none;
          }

          .scan-title,
          .type-text {
            clip-path: inset(0);
          }

          .signal-line {
            transform: scaleX(1);
          }
        }
      `}</style>
    </>
  );
}

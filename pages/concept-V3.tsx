'use client';

import Head from 'next/head';
import {
  useEffect,
  useState,
  type CSSProperties,
  type MouseEvent,
} from 'react';
import SceneNav from '@components/SceneNav';

const C = {
  concrete: '#A7A8A5',
  ink: '#090909',
  red: '#FF1A12',
  green: '#19FF38',
  blue: '#21178F',
} as const;

const MONO = '"Space Mono", "Courier New", monospace';

type AreaId = 'tent' | 'chefs-studio' | 'studio';

type Area = {
  id: AreaId;
  index: string;
  title: string;
  href: string;
  highlight: string;
};

const ASSETS = {
  texture: '/images/concept/concept_bg.jpg',
  venue: '/images/concept/the-space-page-venue.png',
};

const AREAS: Area[] = [
  {
    id: 'tent',
    index: '01',
    title: 'THE TENT',
    href: '/thetent-test',
    highlight: '/images/concept/tent-highlight.png',
  },
  {
    id: 'chefs-studio',
    index: '02',
    title: "CHEF'S STUDIO",
    href: '/chefstudio-test',
    highlight: '/images/concept/chefs-studio-highlight.png',
  },
  {
    id: 'studio',
    index: '03',
    title: 'THE STUDIO',
    href: '/studio-test',
    highlight: '/images/concept/studio-highlight.png',
  },
];

const EXPERIENCE_LINKS = [
  {
    index: '01',
    label: 'DINING',
    time: '20:00 / 20:30',
    href: '/food-test',
    tone: 'green',
  },
  {
    index: '02',
    label: 'AFTER DARK',
    time: '22:00 → LATE',
    href: '/theclub-test',
    tone: 'blue',
  },
] as const;

const typeStyle = (chars: number, delay: string): CSSProperties =>
  ({
    '--chars': chars,
    '--type-delay': delay,
  }) as CSSProperties;

function AreaButton({
  area,
  active,
  touchMode,
  onEnter,
  onFocus,
  onClick,
}: {
  area: Area;
  active: boolean;
  touchMode: boolean;
  onEnter: () => void;
  onFocus: () => void;
  onClick: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <a
      href={area.href}
      className={`area-button ${active ? 'is-active' : ''}`}
      onMouseEnter={onEnter}
      onFocus={onFocus}
      onClick={onClick}
    >
      <span className="area-orbits" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>

      <span className="area-index">{area.index}</span>
      <span className="area-title">{area.title}</span>

      <span className="area-action">
        {touchMode ? (active ? 'TAP AGAIN' : 'PREVIEW') : 'EXPLORE'} →
      </span>
    </a>
  );
}

function ExperienceButton({
  index,
  label,
  time,
  href,
  tone,
  delay,
}: {
  index: string;
  label: string;
  time: string;
  href: string;
  tone: 'green' | 'blue';
  delay: number;
}) {
  return (
    <a
      href={href}
      className={`experience-button is-${tone}`}
      style={{ '--button-delay': `${delay}ms` } as CSSProperties}
    >
      <span className="experience-button-grid" aria-hidden="true" />
      <span className="experience-button-index">{index}</span>
      <span className="experience-button-title">{label}</span>
      <span className="experience-button-time">{time}</span>
      <span className="experience-button-action">ENTER SIMULATION →</span>
    </a>
  );
}

export default function ConceptPage() {
  const [activeArea, setActiveArea] = useState<AreaId | null>(null);
  const [touchMode, setTouchMode] = useState(false);
  const [menuReady, setMenuReady] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [diningTime, setDiningTime] = useState('20:00 / 20:30');
  const [afterDarkTime, setAfterDarkTime] = useState('22:00');

  useEffect(() => {
    const timer = window.setTimeout(() => setMenuReady(true), 850);

    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
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
        threshold: 0.14,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const query = window.matchMedia(
      '(hover: none), (pointer: coarse), (max-width: 900px)'
    );

    const update = () => {
      setTouchMode(query.matches || window.innerWidth <= 900);
    };

    update();

    if (query.addEventListener) {
      query.addEventListener('change', update);
    } else {
      query.addListener(update);
    }

    window.addEventListener('resize', update);

    return () => {
      if (query.removeEventListener) {
        query.removeEventListener('change', update);
      } else {
        query.removeListener(update);
      }

      window.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    let timers: number[] = [];

    const clear = () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      timers = [];
    };

    const run = () => {
      clear();

      setDiningTime('20:00 / 20:30');
      setAfterDarkTime('22:00');

      timers = [
        window.setTimeout(() => setDiningTime('18:40 / 19:10'), 1850),
        window.setTimeout(() => setDiningTime('21:12 / 21:40'), 2020),
        window.setTimeout(() => setDiningTime('19:55 / 20:14'), 2190),
        window.setTimeout(() => setDiningTime('20:00 / 20:30'), 2390),

        window.setTimeout(() => setAfterDarkTime('23:17'), 4650),
        window.setTimeout(() => setAfterDarkTime('01:40'), 4820),
        window.setTimeout(() => setAfterDarkTime('21:52'), 4990),
        window.setTimeout(() => setAfterDarkTime('22:00'), 5190),
      ];
    };

    run();

    const interval = window.setInterval(run, 9600);

    return () => {
      window.clearInterval(interval);
      clear();
    };
  }, []);

  const handleAreaClick =
    (areaId: AreaId) => (event: MouseEvent<HTMLAnchorElement>) => {
      if (touchMode && activeArea !== areaId) {
        event.preventDefault();
        setActiveArea(areaId);
      }
    };

  return (
    <>
      <Head>
        <title>Concept — 17 Little Portland Street</title>

        <meta
          name="description"
          content="The venue concept, spaces and evening experience at 17 Little Portland Street."
        />

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="page page--with-scene-nav">
        <div
          className={`concept-nav-shell ${menuReady ? 'is-ready' : ''} ${
            scrolled ? 'is-scrolled' : ''
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
                17LPS // VENUE CONCEPT
              </span>
            </div>

            <section
              className="hero-section reveal-section"
              aria-labelledby="concept-title"
            >
              <div className="hero-copy">
                <h1 id="concept-title" className="scan-title hero-title">
                  CONCEPT
                </h1>

                <p className="hero-address">
                  <span
                    className="type-text"
                    style={typeStyle(33, '360ms')}
                  >
                    17 LITTLE PORTLAND STREET, LONDON
                  </span>
                </p>

                <div className="concept-statement">
                  <p>
                    ONE ADDRESS. MULTIPLE STATES. THE EVENING MUTATES FROM TABLE
                    TO PERFORMANCE TO AFTER-DARK ENERGY.
                  </p>

                  <div className="statement-orbits" aria-hidden="true">
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

                <div className="signal-orbit">
                  <div className="orbit-rings" />

                  <div className="obelisk">
                    <span className="obelisk-front" />
                    <span className="obelisk-side" />
                  </div>

                  <div className="orbit-dots">
                    {Array.from({ length: 10 }).map((_, index) => (
                      <i
                        key={index}
                        style={{ '--node': index } as CSSProperties}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section
              className="space-section reveal-section"
              aria-labelledby="space-title"
            >
              <header className="section-heading">
                <span className="section-number">01</span>

                <h2
                  id="space-title"
                  className="scan-title section-title"
                >
                  THE SPACE
                </h2>
              </header>

              <div className="space-layout">
                <div className="space-upper">
                  <div className="venue-panel">
                    <span className="venue-label">
                      VENUE MODEL // AXONOMETRIC
                    </span>

                    <span className="venue-coordinate">
                      51.5176° N / 0.1431° W
                    </span>

                    <div
                      className="venue-floor-grid"
                      aria-hidden="true"
                    />

                    <div
                      className="venue-wrap"
                      aria-label="Interactive venue map"
                    >
                      <img
                        src={ASSETS.venue}
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
                        src={ASSETS.venue}
                        alt=""
                        className="venue-image venue-glitch venue-glitch-a"
                        draggable={false}
                      />

                      <img
                        src={ASSETS.venue}
                        alt=""
                        className="venue-image venue-glitch venue-glitch-b"
                        draggable={false}
                      />
                    </div>
                  </div>

                  <aside
                    className="diagnostics"
                    aria-label="Venue information"
                  >
                    <div
                      className="diagnostic-box radar-box"
                      aria-hidden="true"
                    >
                      <span className="radar-dot" />
                    </div>

                    <div className="diagnostic-box map-copy-box">
                      <strong>MAP / 3 ZONES</strong>

                      <p>
                        Three connected environments support the full evening:
                        arrival and dining, live performance, and the transition
                        into late-night energy.
                      </p>

                      <ul>
                        <li>THE TENT</li>
                        <li>CHEF&apos;S STUDIO</li>
                        <li>THE STUDIO</li>
                      </ul>
                    </div>

                    <div
                      className="diagnostic-box level-box"
                      aria-hidden="true"
                    >
                      {Array.from({ length: 8 }).map((_, index) => (
                        <i key={index} />
                      ))}
                    </div>
                  </aside>
                </div>

                <nav
                  className="area-buttons"
                  aria-label="Venue areas"
                  onMouseLeave={() => {
                    if (!touchMode) setActiveArea(null);
                  }}
                >
                  {AREAS.map((area) => (
                    <AreaButton
                      key={area.id}
                      area={area}
                      active={activeArea === area.id}
                      touchMode={touchMode}
                      onEnter={() => {
                        if (!touchMode) setActiveArea(area.id);
                      }}
                      onFocus={() => setActiveArea(area.id)}
                      onClick={handleAreaClick(area.id)}
                    />
                  ))}
                </nav>
              </div>
            </section>

            <section
              className="experience-section reveal-section"
              aria-labelledby="experience-title"
            >
              <header className="section-heading">
                <span className="section-number">02</span>

                <h2
                  id="experience-title"
                  className="scan-title section-title"
                >
                  THE EXPERIENCE
                </h2>
              </header>

              <div className="experience-layout">
                <div className="timeline-panel">
                  <div className="timeline-times">
                    <span>{diningTime}</span>
                    <span>{afterDarkTime}</span>
                  </div>

                  <div className="timeline-graphic" aria-hidden="true">
                    <div className="timeline-grid timeline-grid-back" />
                    <div className="timeline-grid timeline-grid-floor" />

                    <div className="energy-path">
                      <span className="energy-segment segment-dining" />
                      <span className="energy-segment segment-performance" />
                      <span className="energy-segment segment-dark" />
                      <span className="energy-scan" />

                      <i className="energy-node node-dining" />
                      <i className="energy-node node-performance" />
                      <i className="energy-node node-dark" />
                    </div>

                    <div className="timeline-labels">
                      <div>
                        <strong>DINING</strong>
                        <span>20:00 / 20:30</span>
                      </div>

                      <div>
                        <strong>PERFORMANCE</strong>
                        <span>LIVE TRANSITION</span>
                      </div>

                      <div>
                        <strong>AFTER DARK</strong>
                        <span>22:00 → LATE</span>
                      </div>
                    </div>
                  </div>
                </div>

                <nav
                  className="experience-buttons"
                  aria-label="Explore the experience"
                >
                  {EXPERIENCE_LINKS.map((item, index) => (
                    <ExperienceButton
                      key={item.href}
                      {...item}
                      delay={460 + index * 140}
                    />
                  ))}
                </nav>
              </div>
            </section>

            <footer className="poster-footer">
              <span>17LPS // VENUE CONCEPT</span>
              <span>DINING / PERFORMANCE / AFTER DARK</span>
              <span>3 ZONES // ONE ADDRESS</span>
            </footer>
          </div>
        </div>
      </main>

      <style jsx global>{`
        html,
        body,
        #__next {
          min-height: 100%;
          margin: 0;
          background: ${C.concrete};
          color: ${C.ink};
          font-family: ${MONO};
          -webkit-font-smoothing: antialiased;
          text-rendering: geometricPrecision;
          scrollbar-color: ${C.red} rgba(9, 9, 9, 0.16);
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
          background: rgba(9, 9, 9, 0.1);
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

          .concept-nav-shell:has(
              .scene-nav-burger[aria-expanded='true']
            )::before,
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

          .concept-nav-shell:has(
              .scene-nav-burger[aria-expanded='true']
            )
            .scene-nav,
          .concept-nav-shell:has(button[aria-expanded='true'])
            .scene-nav {
            background: rgba(167, 168, 165, 0.9) !important;
            backdrop-filter: blur(22px) !important;
            -webkit-backdrop-filter: blur(22px) !important;
            box-shadow: none !important;
          }

          .concept-nav-shell:has(
              .scene-nav-burger[aria-expanded='true']
            )
            .scene-nav-mobile,
          .concept-nav-shell:has(button[aria-expanded='true'])
            .scene-nav-mobile,
          .concept-nav-shell:has(
              .scene-nav-burger[aria-expanded='true']
            )
            .scene-nav-mobile--space,
          .concept-nav-shell:has(button[aria-expanded='true'])
            .scene-nav-mobile--space {
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

          .concept-nav-shell:has(
              .scene-nav-burger[aria-expanded='true']
            )
            .scene-nav-mobile-inner,
          .concept-nav-shell:has(button[aria-expanded='true'])
            .scene-nav-mobile-inner {
            width: 100% !important;
            min-height: auto !important;
            padding: 0 !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: flex-start !important;
            gap: 18px !important;
          }

          .concept-nav-shell:has(
              .scene-nav-burger[aria-expanded='true']
            )
            .scene-nav-mobile
            a,
          .concept-nav-shell:has(button[aria-expanded='true'])
            .scene-nav-mobile
            a,
          .concept-nav-shell:has(
              .scene-nav-burger[aria-expanded='true']
            )
            .scene-nav-mobile-link,
          .concept-nav-shell:has(button[aria-expanded='true'])
            .scene-nav-mobile-link {
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

          .concept-nav-shell:has(
              .scene-nav-burger[aria-expanded='true']
            )
            .scene-nav-mobile
            a.active,
          .concept-nav-shell:has(button[aria-expanded='true'])
            .scene-nav-mobile
            a.active,
          .concept-nav-shell:has(
              .scene-nav-burger[aria-expanded='true']
            )
            .scene-nav-mobile-link.active,
          .concept-nav-shell:has(button[aria-expanded='true'])
            .scene-nav-mobile-link.active,
          .concept-nav-shell:has(
              .scene-nav-burger[aria-expanded='true']
            )
            .scene-nav-mobile
            a[aria-current='page'],
          .concept-nav-shell:has(button[aria-expanded='true'])
            .scene-nav-mobile
            a[aria-current='page'] {
            color: ${C.red} !important;
          }
        }
      `}</style>

      <style jsx global>{`
        .page {
          position: relative;
          min-height: 100svh;
          overflow-x: clip;
          background: ${C.concrete};
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
            url('${ASSETS.texture}'),
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
          width: 65%;
          max-width: 1180px;
          min-height: 100svh;
          margin: 0 auto;
          padding: clamp(100px, 9vw, 132px) 0
            clamp(48px, 6vw, 84px);
        }

        .poster-frame {
          position: relative;
          border: 2px solid ${C.red};
          background: rgba(167, 168, 165, 0.58);
        }

        .window-bar {
          min-height: 38px;
          display: grid;
          grid-template-columns: auto 1fr;
          align-items: center;
          gap: 18px;
          padding: 8px 16px;
          border-bottom: 2px solid ${C.red};
          color: ${C.ink};
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.13em;
          text-transform: uppercase;
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

        .hero-section,
        .space-section,
        .experience-section {
          position: relative;
          border-bottom: 1px solid rgba(255, 26, 18, 0.72);
        }

        .hero-section {
          display: grid;
          grid-template-columns:
            minmax(0, 1.04fr)
            minmax(300px, 0.96fr);
          gap: 42px;
          align-items: center;
          padding: clamp(54px, 6vw, 84px);
          overflow: hidden;
        }

        h1,
        h2,
        p {
          margin: 0;
        }

        .hero-copy {
          position: relative;
          z-index: 3;
          min-width: 0;
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

        .hero-title {
          font-size: clamp(74px, 9.1vw, 142px);
          white-space: nowrap;
        }

        .reveal-section.is-inview .scan-title {
          animation:
            scanTitleReveal 0.56s steps(9, end) 220ms forwards,
            titleIdleGlitch 8s steps(2, end) 3000ms infinite;
        }

        .hero-address {
          margin-top: 24px;
          color: ${C.red};
          font-size: clamp(11px, 1.05vw, 15px);
          font-weight: 700;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(12px);
        }

        .hero-section.is-inview .hero-address {
          animation: moduleIn 0.5s ease 420ms forwards;
        }

        .type-text {
          display: inline-block;
          max-width: 100%;
          overflow: hidden;
          white-space: nowrap;
          clip-path: inset(0 100% 0 0);
        }

        .reveal-section.is-inview .type-text {
          animation: typeReveal 0.55s
            steps(var(--chars), end)
            var(--type-delay) forwards;
        }

        .concept-statement {
          position: relative;
          width: min(100%, 580px);
          min-height: 215px;
          margin-top: clamp(60px, 6vw, 92px);
          opacity: 0;
          transform: translateY(12px);
        }

        .hero-section.is-inview .concept-statement {
          animation: moduleIn 0.65s ease 690ms forwards;
        }

        .concept-statement p {
          position: relative;
          z-index: 2;
          max-width: 455px;
          padding-left: 20px;
          color: ${C.blue};
          font-size: clamp(20px, 1.85vw, 28px);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: 0.035em;
          text-transform: uppercase;
        }

        .statement-orbits {
          position: absolute;
          left: 0;
          top: 34px;
          width: min(100%, 480px);
          height: 170px;
          pointer-events: none;
        }

        .statement-orbits i {
          position: absolute;
          left: 0;
          width: 100%;
          height: 48px;
          border: 2px solid ${C.red};
          border-radius: 50%;
          opacity: 0.92;
          transform: skewX(-7deg);
        }

        .statement-orbits i:nth-child(1) {
          top: 0;
        }

        .statement-orbits i:nth-child(2) {
          top: 24px;
        }

        .statement-orbits i:nth-child(3) {
          top: 48px;
        }

        .statement-orbits i:nth-child(4) {
          top: 72px;
        }

        .statement-orbits i:nth-child(5) {
          top: 96px;
        }

        .hero-visual {
          position: relative;
          z-index: 3;
          min-height: 480px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .signal-orbit {
          position: relative;
          width: min(100%, 470px);
          aspect-ratio: 1;
          opacity: 0;
          transform: translate3d(30px, 16px, 0) scale(0.96);
        }

        .hero-section.is-inview .signal-orbit {
          animation:
            signalIn 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)
              480ms forwards,
            signalFloat 5.4s ease-in-out 1600ms infinite;
        }

        .orbit-rings {
          position: absolute;
          inset: 10%;
          border-radius: 50%;
          background: repeating-radial-gradient(
            circle,
            transparent 0 19px,
            rgba(25, 255, 56, 0.47) 20px 21px
          );
          opacity: 0.54;
          animation: orbitRotate 18s linear infinite;
        }

        .obelisk {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 94px;
          height: 248px;
          transform: translate(-50%, -50%);
          filter: drop-shadow(
            10px 16px 0 rgba(9, 9, 9, 0.12)
          );
        }

        .obelisk-front,
        .obelisk-side {
          position: absolute;
          inset: 0;
          display: block;
        }

        .obelisk-front {
          left: 18px;
          width: 58px;
          background: linear-gradient(
            180deg,
            #201c20 0%,
            #090909 100%
          );
          clip-path: polygon(
            20% 0%,
            100% 0%,
            80% 100%,
            0% 100%
          );
        }

        .obelisk-side {
          left: 50px;
          width: 28px;
          background: linear-gradient(
            180deg,
            rgba(33, 23, 143, 0.26) 0%,
            rgba(9, 9, 9, 0.78) 100%
          );
          clip-path: polygon(
            0% 0%,
            100% 5%,
            100% 95%,
            0% 100%
          );
        }

        .orbit-dots i {
          --angle: calc(var(--node) * 36deg);
          position: absolute;
          left: 50%;
          top: 50%;
          z-index: 4;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3b3aff;
          box-shadow:
            0 0 12px rgba(59, 58, 255, 0.72),
            0 0 28px rgba(59, 58, 255, 0.38);
          transform:
            rotate(var(--angle))
            translateX(clamp(108px, 12vw, 176px))
            rotate(calc(var(--angle) * -1));
          animation: dotPulse 2.4s ease-in-out
            calc(var(--node) * -0.14s) infinite;
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
          top: 6%;
          right: 2%;
        }

        .spark-b {
          bottom: 8%;
          left: 4%;
          transform: scale(0.72);
        }

        .space-section,
        .experience-section {
          padding: clamp(58px, 6vw, 86px);
        }

        .section-heading {
          display: block;
          margin-bottom: clamp(44px, 5vw, 68px);
        }

        .section-number {
          display: block;
          margin-bottom: 18px;
          color: ${C.red};
          font-size: clamp(26px, 3.1vw, 42px);
          font-weight: 700;
          line-height: 0.9;
          letter-spacing: 0.08em;
        }

        .section-title {
          font-size: clamp(56px, 7vw, 104px);
        }

        .space-layout {
          display: grid;
          gap: 18px;
        }

        .space-upper {
          display: grid;
          grid-template-columns:
            minmax(0, 1.65fr)
            minmax(180px, 0.55fr);
          gap: 22px;
          align-items: stretch;
        }

        .venue-panel {
          position: relative;
          min-height: 510px;
          border: 2px solid ${C.red};
          overflow: hidden;
          background: rgba(209, 210, 206, 0.12);
        }

        .venue-panel::after {
          content: '';
          position: absolute;
          inset: auto 0 0;
          height: 42%;
          background: linear-gradient(
            to top,
            rgba(33, 23, 143, 0.08),
            transparent
          );
          pointer-events: none;
        }

        .venue-label,
        .venue-coordinate {
          position: absolute;
          top: 14px;
          z-index: 6;
          font-size: 9px;
          letter-spacing: 0.12em;
        }

        .venue-label {
          left: 14px;
          color: ${C.blue};
        }

        .venue-coordinate {
          right: 14px;
          color: ${C.red};
        }

        .venue-floor-grid,
        .experience-button-grid,
        .timeline-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            repeating-linear-gradient(
              0deg,
              transparent 0 27px,
              rgba(255, 26, 18, 0.22) 28px 29px
            ),
            repeating-linear-gradient(
              90deg,
              transparent 0 39px,
              rgba(255, 26, 18, 0.22) 40px 41px
            );
          transform: perspective(320px)
            rotateX(58deg)
            scale(1.3);
          transform-origin: center bottom;
          opacity: 0.5;
        }

        .venue-wrap {
          position: absolute;
          left: 3%;
          right: 3%;
          top: 13%;
          bottom: 4%;
          z-index: 3;
          opacity: 0;
          transform: translateY(20px) scale(0.97);
        }

        .space-section.is-inview .venue-wrap {
          animation:
            venueIn 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)
              420ms forwards,
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
            drop-shadow(
              0 16px 18px rgba(9, 9, 9, 0.16)
            );
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
          filter:
            saturate(1.35)
            contrast(1.06)
            drop-shadow(
              0 0 14px rgba(25, 255, 56, 0.42)
            );
        }

        .venue-glitch {
          z-index: 5;
          opacity: 0;
          mix-blend-mode: multiply;
        }

        .space-section.is-inview .venue-glitch-a {
          filter: hue-rotate(-28deg) saturate(1.6);
          animation: venueGlitchA 8.5s steps(1, end)
            1800ms infinite;
        }

        .space-section.is-inview .venue-glitch-b {
          filter: hue-rotate(110deg) saturate(1.8);
          animation: venueGlitchB 8.5s steps(1, end)
            1800ms infinite;
        }

        .diagnostics {
          display: grid;
          grid-template-rows: repeat(
            3,
            minmax(0, 1fr)
          );
          gap: 18px;
        }

        .diagnostic-box {
          position: relative;
          border: 2px solid currentColor;
          overflow: hidden;
        }

        .radar-box {
          min-height: 170px;
          color: ${C.green};
          background: repeating-radial-gradient(
            circle at 50% 50%,
            transparent 0 15px,
            rgba(25, 255, 56, 0.5) 16px 17px
          );
        }

        .radar-dot {
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

        .map-copy-box {
          padding: 16px 16px 14px;
          color: ${C.blue};
        }

        .map-copy-box strong {
          display: block;
          margin-bottom: 12px;
          font-size: 11px;
          letter-spacing: 0.14em;
        }

        .map-copy-box p {
          color: ${C.ink};
          font-size: 12px;
          line-height: 1.45;
        }

        .map-copy-box ul {
          display: grid;
          gap: 6px;
          margin: 14px 0 0;
          padding: 0;
          color: ${C.ink};
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          list-style: none;
        }

        .level-box {
          min-height: 170px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 5px;
          padding: 16px;
          color: ${C.green};
        }

        .level-box i {
          flex: 1;
          height: 30%;
          background: currentColor;
          transform-origin: bottom;
          animation: levelBars 1.8s ease-in-out
            calc(var(--bar, 0) * -0.11s) infinite;
        }

        .level-box i:nth-child(2) {
          --bar: 1;
          height: 58%;
        }

        .level-box i:nth-child(3) {
          --bar: 2;
          height: 82%;
        }

        .level-box i:nth-child(4) {
          --bar: 3;
          height: 44%;
        }

        .level-box i:nth-child(5) {
          --bar: 4;
          height: 92%;
        }

        .level-box i:nth-child(6) {
          --bar: 5;
          height: 64%;
        }

        .level-box i:nth-child(7) {
          --bar: 6;
          height: 37%;
        }

        .level-box i:nth-child(8) {
          --bar: 7;
          height: 76%;
        }

        .area-buttons {
          display: grid;
          grid-template-columns: repeat(
            3,
            minmax(0, 1fr)
          );
          border: 2px solid ${C.red};
        }

        .area-button {
          position: relative;
          min-height: 102px;
          display: grid;
          grid-template-columns: 36px 1fr;
          grid-template-areas:
            'index title'
            '. action';
          align-content: center;
          gap: 3px 10px;
          padding: 16px 18px;
          color: ${C.ink};
          text-decoration: none;
          isolation: isolate;
        }

        .area-button + .area-button {
          border-left: 1px solid rgba(255, 26, 18, 0.72);
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
          font-size: clamp(18px, 1.55vw, 24px);
          font-weight: 700;
          line-height: 1;
        }

        .area-action {
          grid-area: action;
          position: relative;
          z-index: 2;
          color: ${C.blue};
          font-size: 8px;
          letter-spacing: 0.14em;
        }

        .area-orbits {
          position: absolute;
          inset: 10px 8px;
          z-index: 1;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.22s ease;
        }

        .area-orbits i {
          position: absolute;
          left: 0;
          right: 0;
          height: 44px;
          border: 2px solid ${C.red};
          border-radius: 50%;
          transform: skewX(-7deg);
        }

        .area-orbits i:nth-child(1) {
          top: 0;
        }

        .area-orbits i:nth-child(2) {
          top: 18px;
        }

        .area-orbits i:nth-child(3) {
          top: 36px;
        }

        .area-button:hover,
        .area-button:focus-visible,
        .area-button.is-active {
          outline: none;
          background: rgba(255, 26, 18, 0.04);
        }

        .area-button:hover .area-orbits,
        .area-button:focus-visible .area-orbits,
        .area-button.is-active .area-orbits {
          opacity: 1;
        }

        .area-button:hover .area-title,
        .area-button:focus-visible .area-title,
        .area-button.is-active .area-title {
          width: fit-content;
          padding: 0 4px;
          background: ${C.green};
        }

        .experience-layout {
          display: grid;
          grid-template-columns:
            minmax(0, 0.95fr)
            minmax(360px, 1.05fr);
          gap: 24px;
        }

        .timeline-panel {
          position: relative;
          min-height: 470px;
          padding: 22px;
          border: 2px solid ${C.red};
          overflow: hidden;
          background: rgba(209, 210, 206, 0.1);
        }

        .timeline-times {
          position: relative;
          z-index: 4;
          display: flex;
          justify-content: space-between;
          gap: 16px;
          color: ${C.blue};
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.14em;
        }

        .timeline-graphic {
          position: relative;
          min-height: 390px;
          margin-top: 16px;
        }

        .timeline-grid-back {
          inset: 6% 16% auto;
          height: 38%;
          opacity: 0.12;
          transform: perspective(360px)
            rotateX(76deg)
            scale(1.12);
          transform-origin: center top;
        }

        .timeline-grid-floor {
          inset: auto -12% 2%;
          height: 46%;
          opacity: 0.38;
        }

        .energy-path {
          position: absolute;
          left: 8%;
          right: 8%;
          top: 18%;
          z-index: 3;
          height: 34%;
        }

        .energy-segment {
          position: absolute;
          top: 50%;
          height: 12px;
          border-radius: 999px;
          transform: translateY(-50%);
        }

        .segment-dining {
          left: 0;
          width: 38%;
          background: linear-gradient(
            90deg,
            rgba(25, 255, 56, 0.2),
            rgba(25, 255, 56, 0.9)
          );
          box-shadow: 0 0 18px rgba(25, 255, 56, 0.28);
        }

        .segment-performance {
          left: 31%;
          width: 36%;
          background: linear-gradient(
            90deg,
            rgba(25, 255, 56, 0.95),
            rgba(255, 26, 18, 0.92)
          );
        }

        .segment-dark {
          right: 0;
          width: 40%;
          background: linear-gradient(
            90deg,
            rgba(255, 26, 18, 0.88),
            rgba(33, 23, 143, 0.94)
          );
          box-shadow: 0 0 18px rgba(33, 23, 143, 0.3);
        }

        .energy-scan {
          position: absolute;
          left: -10%;
          top: 50%;
          width: 20%;
          height: 26px;
          border-radius: 999px;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 0.64),
            rgba(255, 255, 255, 0)
          );
          mix-blend-mode: screen;
          transform: translateY(-50%);
          animation: scanAcross 4.8s
            cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .energy-node {
          position: absolute;
          top: 50%;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: energyPulse 3.6s ease-in-out infinite;
        }

        .node-dining {
          left: 18%;
          background: ${C.green};
          box-shadow: 0 0 18px rgba(25, 255, 56, 0.5);
        }

        .node-performance {
          left: 50%;
          background: ${C.red};
          box-shadow: 0 0 18px rgba(255, 26, 18, 0.42);
          animation-delay: -1s;
        }

        .node-dark {
          left: 82%;
          background: ${C.blue};
          box-shadow: 0 0 18px rgba(33, 23, 143, 0.46);
          animation-delay: -2s;
        }

        .timeline-labels {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 16px;
          z-index: 4;
          display: grid;
          grid-template-columns: repeat(
            3,
            minmax(0, 1fr)
          );
          gap: 18px;
        }

        .timeline-labels div {
          position: relative;
          padding-top: 22px;
        }

        .timeline-labels div::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 16px;
          height: 16px;
          border-radius: 50%;
        }

        .timeline-labels div:nth-child(1)::before {
          background: ${C.green};
          box-shadow: 0 0 0 3px rgba(25, 255, 56, 0.18);
        }

        .timeline-labels div:nth-child(2)::before {
          background: ${C.red};
          box-shadow: 0 0 0 3px rgba(255, 26, 18, 0.18);
        }

        .timeline-labels div:nth-child(3)::before {
          background: ${C.blue};
          box-shadow: 0 0 0 3px rgba(33, 23, 143, 0.18);
        }

        .timeline-labels strong {
          display: block;
          font-size: clamp(18px, 2.2vw, 28px);
          line-height: 1;
          letter-spacing: -0.05em;
        }

        .timeline-labels span {
          display: block;
          margin-top: 8px;
          color: ${C.blue};
          font-size: 9px;
          letter-spacing: 0.14em;
        }

        .experience-buttons {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }

        .experience-button {
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
          background: transparent;
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            background 0.25s ease;
        }

        .experience-section.is-inview .experience-button {
          animation: moduleIn 0.55s ease
            var(--button-delay) forwards;
        }

        .experience-button.is-green {
          border-color: ${C.green};
        }

        .experience-button.is-blue {
          border-color: ${C.blue};
        }

        .experience-button:hover,
        .experience-button:focus-visible {
          outline: none;
          transform: translate(-5px, -5px);
          box-shadow: 10px 10px 0 rgba(255, 26, 18, 0.3);
        }

        .experience-button.is-green:hover,
        .experience-button.is-green:focus-visible {
          background: rgba(25, 255, 56, 0.08);
        }

        .experience-button.is-blue:hover,
        .experience-button.is-blue:focus-visible {
          background: rgba(33, 23, 143, 0.08);
        }

        .experience-button-grid {
          opacity: 0.24;
        }

        .experience-button-index,
        .experience-button-title,
        .experience-button-time,
        .experience-button-action {
          position: relative;
          z-index: 2;
        }

        .experience-button-index {
          position: absolute;
          left: 20px;
          top: 17px;
          color: ${C.red};
          font-size: 12px;
          letter-spacing: 0.14em;
        }

        .experience-button-title {
          font-size: clamp(34px, 4vw, 58px);
          font-weight: 700;
          line-height: 0.92;
          letter-spacing: -0.06em;
        }

        .experience-button-time {
          margin-top: 10px;
          color: ${C.red};
          font-size: 12px;
          letter-spacing: 0.11em;
        }

        .experience-button-action {
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

        .poster-footer span:nth-child(2) {
          text-align: center;
        }

        .poster-footer span:nth-child(3) {
          text-align: right;
        }

        @keyframes scanTitleReveal {
          0% {
            opacity: 0;
            clip-path: inset(0 100% 0 0);
            transform: translateX(-12px);
            filter: blur(2px);
          }

          68% {
            opacity: 1;
            clip-path: inset(0);
            transform: translateX(0);
            filter: none;
          }

          80% {
            transform: translateX(5px);
          }

          88% {
            transform: translateX(-3px);
          }

          100% {
            opacity: 1;
            clip-path: inset(0);
            transform: translateX(0);
            filter: none;
          }
        }

        @keyframes titleIdleGlitch {
          0%,
          91%,
          100% {
            text-shadow: none;
            filter: none;
          }

          92% {
            text-shadow: 0.08em 0 ${C.red};
          }

          93% {
            text-shadow: -0.06em 0 ${C.green};
          }

          94% {
            filter: blur(0.5px);
          }

          95% {
            text-shadow: 0.04em 0 ${C.blue};
            filter: none;
          }
        }

        @keyframes typeReveal {
          to {
            clip-path: inset(0);
          }
        }

        @keyframes moduleIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes signalIn {
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        @keyframes signalFloat {
          0%,
          100% {
            transform: translateY(0) rotate(-0.5deg);
          }

          50% {
            transform: translateY(-11px) rotate(0.6deg);
          }
        }

        @keyframes orbitRotate {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes dotPulse {
          0%,
          100% {
            opacity: 0.66;
            scale: 0.88;
          }

          50% {
            opacity: 1;
            scale: 1.12;
          }
        }

        @keyframes radarPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(25, 255, 56, 0.82);
          }

          100% {
            box-shadow: 0 0 0 48px rgba(25, 255, 56, 0);
          }
        }

        @keyframes levelBars {
          0%,
          100% {
            transform: scaleY(0.45);
          }

          50% {
            transform: scaleY(1);
          }
        }

        @keyframes venueIn {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes venueFloat {
          0%,
          100% {
            transform: translateY(0) rotate(-0.15deg);
          }

          50% {
            transform: translateY(-8px) rotate(0.2deg);
          }
        }

        @keyframes venueGlitchA {
          0%,
          73%,
          100% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
            clip-path: inset(0);
          }

          74% {
            opacity: 0.22;
            transform: translate3d(-9px, -3px, 0);
            clip-path: inset(0 0 82% 0);
          }

          75% {
            opacity: 0.2;
            transform: translate3d(10px, 5px, 0);
            clip-path: inset(28% 0 44% 0);
          }

          76% {
            opacity: 0.18;
            transform: translate3d(-7px, 4px, 0);
            clip-path: inset(64% 0 8% 0);
          }

          77% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
            clip-path: inset(0);
          }
        }

        @keyframes venueGlitchB {
          0%,
          73%,
          100% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
            clip-path: inset(0);
          }

          74.2% {
            opacity: 0.12;
            transform: translate3d(8px, 4px, 0);
            clip-path: inset(12% 0 66% 0);
          }

          75.2% {
            opacity: 0.18;
            transform: translate3d(-11px, -4px, 0);
            clip-path: inset(42% 0 30% 0);
          }

          76.2% {
            opacity: 0.14;
            transform: translate3d(7px, -5px, 0);
            clip-path: inset(72% 0 4% 0);
          }

          77% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
            clip-path: inset(0);
          }
        }

        @keyframes scanAcross {
          0% {
            left: -10%;
            opacity: 0;
          }

          8% {
            opacity: 1;
          }

          52% {
            left: 48%;
            opacity: 1;
          }

          84% {
            left: 88%;
            opacity: 0.66;
          }

          100% {
            left: 102%;
            opacity: 0;
          }
        }

        @keyframes energyPulse {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(0.88);
            opacity: 0.7;
          }

          50% {
            transform: translate(-50%, -50%) scale(1.18);
            opacity: 1;
          }
        }

        @media (max-width: 1280px) {
          .shell {
            width: 72%;
          }
        }

        @media (max-width: 1120px) {
          .hero-section,
          .space-section,
          .experience-section {
            padding: 54px;
          }

          .space-upper {
            grid-template-columns:
              minmax(0, 1.4fr)
              minmax(180px, 0.6fr);
          }
        }

        @media (max-width: 980px) {
          .shell {
            width: 82%;
          }

          .hero-section {
            grid-template-columns: 1fr;
            gap: 32px;
            padding: 44px;
          }

          .hero-visual {
            min-height: 390px;
          }

          .space-section,
          .experience-section {
            padding: 44px;
          }

          .space-upper {
            grid-template-columns: 1fr;
          }

          .diagnostics {
            grid-template-columns: repeat(
              3,
              minmax(0, 1fr)
            );
            grid-template-rows: auto;
          }

          .area-buttons {
            grid-template-columns: 1fr;
          }

          .area-button + .area-button {
            border-top: 1px solid rgba(255, 26, 18, 0.72);
            border-left: 0;
          }

          .experience-layout {
            grid-template-columns: 1fr;
          }

          .experience-buttons {
            grid-template-columns: repeat(
              2,
              minmax(0, 1fr)
            );
          }
        }

        @media (max-width: 820px) {
          .shell {
            width: calc(100% - 40px);
            max-width: none;
            padding-top: 96px;
            padding-bottom: 28px;
          }
        }

        @media (max-width: 620px) {
          .shell {
            width: calc(100% - 18px);
            padding-top: 82px;
            padding-bottom: 24px;
          }

          .window-bar {
            gap: 10px;
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

          .hero-section {
            padding: 36px 18px;
          }

          .hero-title {
            font-size: clamp(48px, 16vw, 78px);
          }

          .hero-address {
            max-width: 280px;
            font-size: 9px;
            line-height: 1.7;
          }

          .type-text {
            white-space: normal;
          }

          .concept-statement {
            min-height: 180px;
            margin-top: 38px;
          }

          .concept-statement p {
            max-width: 290px;
            padding-left: 6px;
            font-size: 16px;
          }

          .statement-orbits {
            top: 28px;
            width: 100%;
            height: 140px;
          }

          .statement-orbits i {
            height: 38px;
          }

          .statement-orbits i:nth-child(2) {
            top: 21px;
          }

          .statement-orbits i:nth-child(3) {
            top: 42px;
          }

          .statement-orbits i:nth-child(4) {
            top: 63px;
          }

          .statement-orbits i:nth-child(5) {
            top: 84px;
          }

          .hero-visual {
            min-height: 300px;
          }

          .signal-orbit {
            max-width: 310px;
          }

          .obelisk {
            width: 64px;
            height: 190px;
          }

          .obelisk-front {
            left: 12px;
            width: 42px;
          }

          .obelisk-side {
            left: 36px;
            width: 20px;
          }

          .orbit-dots i {
            width: 12px;
            height: 12px;
            transform:
              rotate(var(--angle))
              translateX(clamp(72px, 30vw, 116px))
              rotate(calc(var(--angle) * -1));
          }

          .space-section,
          .experience-section {
            padding: 38px 18px;
          }

          .section-number {
            margin-bottom: 12px;
            font-size: 24px;
          }

          .section-title {
            font-size: clamp(39px, 12vw, 60px);
          }

          .venue-panel {
            min-height: 330px;
          }

          .venue-label,
          .venue-coordinate {
            font-size: 7px;
          }

          .venue-coordinate {
            display: none;
          }

          .diagnostics {
            grid-template-columns: 1fr;
          }

          .radar-box,
          .level-box {
            min-height: 130px;
          }

          .area-button {
            min-height: 86px;
            padding: 14px 12px;
          }

          .timeline-panel {
            min-height: 420px;
            padding: 18px;
          }

          .timeline-times {
            font-size: 9px;
            letter-spacing: 0.08em;
          }

          .timeline-graphic {
            min-height: 340px;
          }

          .energy-path {
            left: 6%;
            right: 6%;
            top: 14%;
            height: 30%;
          }

          .timeline-labels {
            grid-template-columns: 1fr;
            gap: 14px;
            bottom: 6px;
          }

          .timeline-labels div {
            padding-top: 18px;
          }

          .timeline-labels strong {
            font-size: 18px;
          }

          .timeline-labels span {
            font-size: 8px;
          }

          .experience-buttons {
            grid-template-columns: 1fr;
          }

          .experience-button {
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
          .hero-address,
          .concept-statement,
          .signal-orbit,
          .orbit-rings,
          .orbit-dots i,
          .venue-wrap,
          .venue-glitch,
          .radar-dot,
          .level-box i,
          .energy-scan,
          .energy-node,
          .experience-button {
            animation: none !important;
            transition: none !important;
          }

          .concept-nav-shell,
          .scan-title,
          .hero-address,
          .concept-statement,
          .signal-orbit,
          .venue-wrap,
          .experience-button {
            opacity: 1;
            transform: none;
          }

          .scan-title,
          .type-text {
            clip-path: inset(0);
          }
        }
      `}</style>
    </>
  );
}

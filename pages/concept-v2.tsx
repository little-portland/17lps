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
  black: '#040404',
  deep: '#090807',
  panel: '#10100E',
  panelSoft: '#171613',
  cream: '#F1E9D8',
  creamSoft: '#D8CDBA',
  red: '#E73522',
  redDeep: '#9E1D14',
  amber: '#F0A900',
  muted: '#8C8576',
  line: 'rgba(241, 233, 216, 0.16)',
} as const;

const MONO = '"Space Mono", "Courier New", monospace';

const ASSETS = {
  texture: '/images/concept/concept_bg.jpg',
  venue: '/images/concept/the-space-page-venue.png',
  tent: '/images/concept/tent-highlight.png',
  chefs: '/images/concept/chefs-studio-highlight.png',
  studio: '/images/concept/studio-highlight.png',
};

type AreaId = 'tent' | 'chefs' | 'studio';

const AREAS: {
  id: AreaId;
  title: string;
  href: string;
  highlight: string;
  description: string;
}[] = [
  {
    id: 'tent',
    title: 'THE TENT',
    href: '/thetent-test',
    highlight: ASSETS.tent,
    description:
      'A concealed dining chamber for close, theatrical evenings below street level.',
  },
  {
    id: 'chefs',
    title: "CHEF'S STUDIO",
    href: '/chefstudio-test',
    highlight: ASSETS.chefs,
    description:
      'An intimate studio for food-led performance, private dinners and controlled spectacle.',
  },
  {
    id: 'studio',
    title: 'THE STUDIO',
    href: '/studio-test',
    highlight: ASSETS.studio,
    description:
      'A cultural room for sound, conversation and after-dark transmission.',
  },
];

const EXPERIENCE = [
  {
    title: 'Dining',
    href: '/food-test',
    time: '20:00 / 20:30',
    description: 'Curated menus, conversation and atmosphere.',
    dark: false,
  },
  {
    title: 'After Dark',
    href: '/theclub-test',
    time: '22:00',
    description: 'Music, culture, connection and nocturn.',
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

function SignalBars() {
  return (
    <div className="signal-bars" aria-hidden="true">
      {Array.from({ length: 18 }).map((_, index) => (
        <span
          key={index}
          style={
            {
              '--bar-delay': `${index * 72}ms`,
              '--bar-height': `${28 + ((index * 17) % 44)}%`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

function HalCore() {
  return (
    <div className="hal-core" aria-hidden="true">
      <div className="hal-ring hal-ring-1" />
      <div className="hal-ring hal-ring-2" />
      <div className="hal-ring hal-ring-3" />
      <div className="hal-eye" />
    </div>
  );
}

function MonolithSystem() {
  return (
    <div className="monolith-system" aria-hidden="true">
      <div className="orbit orbit-1" />
      <div className="orbit orbit-2" />
      <div className="orbit orbit-3" />

      <div className="monolith-shadow" />
      <div className="monolith" />

      <div className="monolith-edge monolith-edge-left" />
      <div className="monolith-edge monolith-edge-right" />

      <HalCore />

      <span className="signal-dot signal-dot-a" />
      <span className="signal-dot signal-dot-b" />
      <span className="signal-dot signal-dot-c" />
      <span className="signal-dot signal-dot-d" />
    </div>
  );
}

export default function ConceptPage() {
  const [activeArea, setActiveArea] = useState<AreaId | null>(null);
  const [isTouchMode, setIsTouchMode] = useState(false);
  const [menuReady, setMenuReady] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setMenuReady(true);
    }, 420);

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
        threshold: 0.16,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(hover: none), (pointer: coarse), (max-width: 900px)');

    const updateMode = () => {
      setIsTouchMode(mq.matches || window.innerWidth <= 900);
    };

    updateMode();

    if (mq.addEventListener) {
      mq.addEventListener('change', updateMode);
    } else {
      mq.addListener(updateMode);
    }

    window.addEventListener('resize', updateMode);

    return () => {
      if (mq.removeEventListener) {
        mq.removeEventListener('change', updateMode);
      } else {
        mq.removeListener(updateMode);
      }

      window.removeEventListener('resize', updateMode);
    };
  }, []);

  const activeCopy = AREAS.find((area) => area.id === activeArea);

  const handleAreaClick =
    (areaId: AreaId) => (event: MouseEvent<HTMLAnchorElement>) => {
      if (isTouchMode && activeArea !== areaId) {
        event.preventDefault();
        setActiveArea(areaId);
      }
    };

  const handleAreaEnter = (areaId: AreaId) => {
    if (!isTouchMode) {
      setActiveArea(areaId);
    }
  };

  const handleAreaLeave = () => {
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
          content="Concept, space and experience at 17 Little Portland Street."
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

        <div className="ambient-bg" aria-hidden="true" />

        <section className="hero-section reveal-section" aria-labelledby="concept-title">
          <div className="section-inner hero-grid">
            <div className="hero-copy">
              <p className="terminal-label">LPX // UNDERGROUND TRANSMISSION</p>

              <h1 id="concept-title" className="hero-title">
                CONCEPT.
              </h1>

              <p className="hero-address">
                17 Little Portland Street, London
              </p>

              <p className="hero-intro">
                A future-focused cultural destination beneath the city.
                Dinner, architecture, sound and late-night energy operating
                as one continuous transmission.
              </p>

              <div className="hero-actions">
                <a href="#space">Scan The Space</a>
                <a href="#experience">Enter Sequence</a>
              </div>
            </div>

            <div className="hero-visual">
              <MonolithSystem />

              <div className="transmission-panel">
                <div className="panel-header">
                  <span>TRANSMISSION STATUS</span>
                  <span>LIVE</span>
                </div>

                <SignalBars />

                <div className="panel-footer">
                  <span>LPX / 001</span>
                  <span>17 LPS</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="space"
          className="space-section reveal-section"
          aria-labelledby="space-title"
        >
          <div className="section-inner">
            <div className="section-heading">
              <p className="terminal-label">MODULE 01 // SPATIAL SCAN</p>

              <h2 id="space-title" className="section-title">
                THE SPACE
              </h2>

              <p className="section-intro">
                Three chambers operate as one underground vessel. Hover or tap
                to isolate each programme.
              </p>
            </div>

            <div className="scan-layout">
              <div className="scan-frame">
                <div className="scan-line" aria-hidden="true" />

                <div className="venue-wrap" aria-hidden="true">
                  <img
                    src={ASSETS.venue}
                    alt=""
                    className="venue-img venue-base"
                    draggable={false}
                  />

                  {AREAS.map((area) => (
                    <img
                      key={area.id}
                      src={area.highlight}
                      alt=""
                      className={`venue-img venue-highlight ${
                        activeArea === area.id ? 'is-active' : ''
                      }`}
                      draggable={false}
                    />
                  ))}
                </div>
              </div>

              <aside className="readout-panel">
                <div className="readout-live">
                  <span />
                  ACTIVE CHAMBER
                </div>

                <p>
                  {activeCopy?.description ||
                    'Select a chamber to isolate the programme inside the space.'}
                </p>
              </aside>
            </div>

            <nav
              className="zone-controls"
              aria-label="Venue areas"
              onMouseLeave={handleAreaLeave}
            >
              {AREAS.map((area, index) => {
                const isActive = activeArea === area.id;
                const touchMeta = isActive ? 'Tap to explore' : 'Tap to preview';

                return (
                  <ActionCard
                    key={area.id}
                    href={area.href}
                    title={area.title}
                    meta={isTouchMode ? touchMeta : 'Explore'}
                    active={isActive}
                    onMouseEnter={() => handleAreaEnter(area.id)}
                    onFocus={() => setActiveArea(area.id)}
                    onClick={handleAreaClick(area.id)}
                    style={
                      {
                        '--card-delay': `${260 + index * 110}ms`,
                      } as CSSProperties
                    }
                  />
                );
              })}
            </nav>
          </div>
        </section>

        <section
          id="experience"
          className="experience-section reveal-section"
          aria-labelledby="experience-title"
        >
          <div className="section-inner experience-grid">
            <div className="experience-copy">
              <p className="terminal-label">MODULE 02 // SIGNAL CHANGE</p>

              <h2 id="experience-title" className="section-title">
                THE EXPERIENCE
              </h2>

              <p className="section-intro">
                A clean transition from seated dinner to after-dark Little
                Portland energy. The evening behaves like a signal changing
                state.
              </p>
            </div>

            <div className="experience-system">
              <HalCore />

              <div className="timeline">
                <div className="timeline-times">
                  <span>20:00 / 20:30</span>
                  <span>22:00</span>
                </div>

                <div className="timeline-track">
                  <span className="timeline-base" />
                  <span className="timeline-fill" />
                  <span className="timeline-dot timeline-dot-left" />
                  <span className="timeline-dot timeline-dot-right" />
                </div>
              </div>

              <div className="experience-cards">
                {EXPERIENCE.map((item, index) => (
                  <ActionCard
                    key={item.href}
                    href={item.href}
                    title={item.title}
                    meta={item.time}
                    dark={item.dark}
                    style={
                      {
                        '--card-delay': `${360 + index * 120}ms`,
                      } as CSSProperties
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="footer-transmission">
          <span>LPX // UNDERGROUND TRANSMISSION COMPLETE</span>
          <span>17 LITTLE PORTLAND STREET</span>
        </footer>
      </main>

      <style jsx global>{`
        html,
        body,
        #__next {
          margin: 0;
          min-height: 100%;
          background: ${C.black};
          color: ${C.cream};
          font-family: ${MONO};
          -webkit-font-smoothing: antialiased;
          text-rendering: geometricPrecision;
          scrollbar-color: ${C.red} ${C.black};
        }

        body {
          overflow-x: hidden;
        }

        * {
          box-sizing: border-box;
        }

        ::selection {
          background: ${C.red};
          color: ${C.cream};
        }

        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: ${C.black};
        }

        ::-webkit-scrollbar-thumb {
          background: ${C.red};
          border: 2px solid ${C.black};
          background-clip: content-box;
        }

        .concept-nav-shell {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 10000;
          opacity: 0;
          transform: translateY(-14px);
          pointer-events: none;
          transition:
            opacity 0.45s ease,
            transform 0.45s ease;
        }

        .concept-nav-shell.is-ready {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .scene-nav {
          z-index: 10020 !important;
          background: rgba(4, 4, 4, 0.62) !important;
          backdrop-filter: blur(18px) !important;
          -webkit-backdrop-filter: blur(18px) !important;
          border-bottom: 1px solid rgba(241, 233, 216, 0.1);
          transition:
            background 0.25s ease,
            box-shadow 0.25s ease !important;
        }

        .concept-nav-shell.is-scrolled .scene-nav {
          background: rgba(4, 4, 4, 0.86) !important;
          box-shadow: 0 14px 36px rgba(0, 0, 0, 0.24);
        }

        .scene-nav,
        .scene-nav a,
        .scene-nav-mobile,
        .scene-nav-mobile a {
          color: ${C.cream} !important;
          font-family: ${MONO} !important;
          letter-spacing: 0.16em !important;
        }

        .scene-nav a[href='/concept'],
        .scene-nav a[href='/concept-test'],
        .scene-nav a[aria-current='page'] {
          color: ${C.red} !important;
          opacity: 1 !important;
        }

        .scene-nav--space .scene-nav-burger span {
          background: ${C.cream} !important;
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
            background: rgba(4, 4, 4, 0.9);
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
            background: rgba(4, 4, 4, 0.9) !important;
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
            background: rgba(4, 4, 4, 0.9) !important;
            backdrop-filter: blur(22px) saturate(1.08) !important;
            -webkit-backdrop-filter: blur(22px) saturate(1.08) !important;
          }
        }

        .page {
          position: relative;
          min-height: 100svh;
          background: ${C.black};
          overflow-x: hidden;
        }

        .ambient-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background:
            radial-gradient(circle at 70% 18%, rgba(231, 53, 34, 0.18), transparent 28%),
            radial-gradient(circle at 18% 78%, rgba(240, 169, 0, 0.08), transparent 28%),
            linear-gradient(180deg, ${C.black}, ${C.deep});
        }

        .ambient-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url('${ASSETS.texture}');
          background-size: 700px auto;
          background-repeat: repeat;
          opacity: 0.1;
          mix-blend-mode: screen;
        }

        .ambient-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.028) 0px,
            rgba(255, 255, 255, 0.028) 1px,
            transparent 1px,
            transparent 5px
          );
          opacity: 0.42;
        }

        .hero-section,
        .space-section,
        .experience-section {
          position: relative;
          z-index: 2;
          min-height: 100svh;
          display: flex;
          align-items: center;
          padding: clamp(110px, 10vw, 150px) 0 clamp(76px, 7vw, 110px);
          border-bottom: 1px solid rgba(241, 233, 216, 0.1);
        }

        .section-inner {
          width: min(1340px, calc(100% - 72px));
          margin: 0 auto;
          position: relative;
          z-index: 3;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.92fr) minmax(360px, 0.76fr);
          gap: clamp(44px, 6vw, 96px);
          align-items: center;
        }

        .hero-copy,
        .section-heading,
        .experience-copy {
          opacity: 0;
          transform: translateY(18px);
        }

        .hero-section.is-inview .hero-copy,
        .space-section.is-inview .section-heading,
        .experience-section.is-inview .experience-copy {
          animation: fadeUp 0.72s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        .terminal-label {
          margin: 0 0 22px;
          color: ${C.red};
          font-size: 10px;
          line-height: 1.2;
          font-weight: 700;
          letter-spacing: 0.26em;
          text-transform: uppercase;
        }

        .hero-title,
        .section-title {
          margin: 0;
          color: ${C.cream};
          font-family: ${MONO};
          font-weight: 700;
          line-height: 0.86;
          letter-spacing: -0.07em;
          text-transform: uppercase;
          text-shadow:
            0.018em 0 0 currentColor,
            0 10px 0 rgba(231, 53, 34, 0.16);
        }

        .hero-title {
          font-size: clamp(72px, 11vw, 178px);
        }

        .section-title {
          font-size: clamp(62px, 8vw, 134px);
        }

        .hero-address {
          margin: clamp(24px, 2.8vw, 40px) 0 0;
          color: ${C.amber};
          font-size: clamp(13px, 1.24vw, 20px);
          line-height: 1.35;
          font-weight: 700;
          letter-spacing: 0.24em;
          text-transform: uppercase;
        }

        .hero-intro,
        .section-intro {
          max-width: 650px;
          margin: clamp(34px, 4vw, 56px) 0 0;
          color: rgba(241, 233, 216, 0.72);
          font-size: clamp(12px, 0.98vw, 15px);
          line-height: 1.9;
          font-weight: 700;
          letter-spacing: 0.09em;
          text-transform: uppercase;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 38px;
        }

        .hero-actions a {
          min-width: 168px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 13px 18px;
          border: 1px solid rgba(241, 233, 216, 0.36);
          color: ${C.cream};
          background: rgba(241, 233, 216, 0.03);
          text-decoration: none;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          transition:
            background 0.22s ease,
            color 0.22s ease,
            border-color 0.22s ease,
            transform 0.22s ease;
        }

        .hero-actions a:hover,
        .hero-actions a:focus-visible {
          background: ${C.red};
          color: ${C.cream};
          border-color: ${C.red};
          transform: translateY(-2px);
          outline: none;
        }

        .hero-visual {
          position: relative;
          opacity: 0;
          transform: translateY(18px) scale(0.985);
        }

        .hero-section.is-inview .hero-visual {
          animation: visualIn 0.84s cubic-bezier(0.2, 0.8, 0.2, 1) 220ms forwards;
        }

        .monolith-system {
          position: relative;
          width: min(100%, 520px);
          aspect-ratio: 1;
          margin-left: auto;
        }

        .orbit {
          position: absolute;
          left: 50%;
          top: 50%;
          border: 1px solid rgba(241, 233, 216, 0.16);
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }

        .orbit-1 {
          width: 96%;
          height: 96%;
        }

        .orbit-2 {
          width: 68%;
          height: 68%;
        }

        .orbit-3 {
          width: 38%;
          height: 38%;
        }

        .monolith-shadow {
          position: absolute;
          left: 48%;
          bottom: 12%;
          width: 44%;
          height: 11%;
          background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.75), transparent 70%);
          filter: blur(18px);
          transform: translateX(-50%);
        }

        .monolith {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 21%;
          height: 64%;
          background:
            linear-gradient(90deg, rgba(255, 255, 255, 0.04), transparent 24%),
            linear-gradient(180deg, #181818, #020202);
          border: 1px solid rgba(241, 233, 216, 0.14);
          transform: translate(-50%, -50%);
          box-shadow:
            0 28px 44px rgba(0, 0, 0, 0.56),
            inset -18px 0 24px rgba(255, 255, 255, 0.035);
          animation: monolithFloat 6.8s ease-in-out infinite;
        }

        .monolith-edge {
          position: absolute;
          top: 18%;
          bottom: 18%;
          width: 1px;
          background: ${C.red};
          opacity: 0.46;
        }

        .monolith-edge-left {
          left: 39.5%;
        }

        .monolith-edge-right {
          right: 39.5%;
        }

        .hal-core {
          position: absolute;
          left: 16%;
          top: 15%;
          width: 132px;
          height: 132px;
        }

        .hal-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1px solid rgba(241, 233, 216, 0.26);
          animation: ringPulse 4.8s ease-in-out infinite;
        }

        .hal-ring-2 {
          inset: 18%;
          animation-delay: 0.4s;
        }

        .hal-ring-3 {
          inset: 34%;
          animation-delay: 0.8s;
        }

        .hal-eye {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 34%;
          height: 34%;
          border-radius: 50%;
          background: ${C.red};
          transform: translate(-50%, -50%);
          box-shadow:
            0 0 20px rgba(231, 53, 34, 0.6),
            0 0 50px rgba(231, 53, 34, 0.28);
          animation: eyePulse 2.9s ease-in-out infinite;
        }

        .signal-dot {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: ${C.amber};
          box-shadow: 0 0 18px rgba(240, 169, 0, 0.5);
        }

        .signal-dot-a {
          right: 18%;
          top: 20%;
        }

        .signal-dot-b {
          right: 8%;
          top: 54%;
        }

        .signal-dot-c {
          left: 28%;
          bottom: 12%;
        }

        .signal-dot-d {
          left: 12%;
          top: 48%;
        }

        .transmission-panel {
          position: absolute;
          right: 0;
          bottom: -24px;
          width: min(360px, 70%);
          padding: 18px;
          background: rgba(16, 16, 14, 0.76);
          border: 1px solid rgba(241, 233, 216, 0.16);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          box-shadow: 0 22px 44px rgba(0, 0, 0, 0.34);
        }

        .panel-header,
        .panel-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: rgba(241, 233, 216, 0.62);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .panel-header span:last-child {
          color: ${C.red};
        }

        .signal-bars {
          height: 80px;
          display: flex;
          align-items: end;
          gap: 5px;
          margin: 22px 0;
        }

        .signal-bars span {
          width: 100%;
          height: var(--bar-height);
          background: linear-gradient(180deg, ${C.red}, rgba(231, 53, 34, 0.15));
          animation: barSignal 1.7s ease-in-out var(--bar-delay) infinite alternate;
          opacity: 0.65;
        }

        .space-section {
          background: linear-gradient(180deg, rgba(4, 4, 4, 0), rgba(231, 53, 34, 0.035));
        }

        .section-heading {
          max-width: 760px;
          margin-bottom: 42px;
        }

        .scan-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 300px;
          gap: 22px;
          align-items: stretch;
        }

        .scan-frame {
          position: relative;
          min-height: clamp(380px, 40vw, 620px);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: clamp(28px, 4vw, 54px);
          background:
            linear-gradient(90deg, rgba(231, 53, 34, 0.14), transparent 34%),
            rgba(241, 233, 216, 0.025);
          border: 1px solid rgba(241, 233, 216, 0.14);
          opacity: 0;
          transform: translateY(18px);
        }

        .space-section.is-inview .scan-frame {
          animation: visualIn 0.72s cubic-bezier(0.2, 0.8, 0.2, 1) 240ms forwards;
        }

        .scan-frame::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(rgba(241, 233, 216, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(241, 233, 216, 0.08) 1px, transparent 1px);
          background-size: 74px 74px;
          opacity: 0.18;
        }

        .scan-line {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 2px;
          background: ${C.red};
          box-shadow: 0 0 22px rgba(231, 53, 34, 0.72);
          opacity: 0;
          animation: scanLine 5.4s linear infinite;
        }

        .venue-wrap {
          position: relative;
          z-index: 3;
          width: min(100%, 920px);
          aspect-ratio: 2048 / 1140;
          filter:
            drop-shadow(0 24px 40px rgba(0, 0, 0, 0.42))
            saturate(0.9)
            contrast(1.08);
        }

        .venue-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          pointer-events: none;
          user-select: none;
        }

        .venue-base {
          z-index: 1;
        }

        .venue-highlight {
          z-index: 2;
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

        .readout-panel {
          position: relative;
          padding: 26px;
          background: rgba(16, 16, 14, 0.76);
          border: 1px solid rgba(241, 233, 216, 0.14);
          opacity: 0;
          transform: translateY(18px);
        }

        .space-section.is-inview .readout-panel {
          animation: visualIn 0.72s cubic-bezier(0.2, 0.8, 0.2, 1) 360ms forwards;
        }

        .readout-live {
          display: flex;
          align-items: center;
          gap: 12px;
          color: ${C.red};
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 28px;
        }

        .readout-live span {
          width: 13px;
          height: 13px;
          border-radius: 50%;
          background: ${C.red};
          box-shadow: 0 0 18px rgba(231, 53, 34, 0.6);
          animation: eyePulse 2.2s ease-in-out infinite;
        }

        .readout-panel p {
          margin: 0;
          color: rgba(241, 233, 216, 0.74);
          font-size: 12px;
          line-height: 1.9;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .zone-controls {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          margin-top: 20px;
        }

        .experience-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.8fr) minmax(360px, 0.9fr);
          gap: clamp(44px, 6vw, 96px);
          align-items: center;
        }

        .experience-system {
          position: relative;
          min-height: 460px;
          padding: 34px;
          background: rgba(241, 233, 216, 0.035);
          border: 1px solid rgba(241, 233, 216, 0.14);
          opacity: 0;
          transform: translateY(18px);
        }

        .experience-section.is-inview .experience-system {
          animation: visualIn 0.72s cubic-bezier(0.2, 0.8, 0.2, 1) 280ms forwards;
        }

        .experience-system .hal-core {
          position: relative;
          left: auto;
          top: auto;
          margin: 0 auto 48px;
          width: 180px;
          height: 180px;
        }

        .timeline {
          margin-bottom: 28px;
        }

        .timeline-times {
          display: flex;
          justify-content: space-between;
          color: rgba(241, 233, 216, 0.62);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .timeline-track {
          position: relative;
          height: 22px;
        }

        .timeline-base,
        .timeline-fill {
          position: absolute;
          left: 0;
          right: 0;
          top: 50%;
          height: 2px;
          transform: translateY(-50%);
          transform-origin: left center;
        }

        .timeline-base {
          background: rgba(241, 233, 216, 0.24);
        }

        .timeline-fill {
          background: ${C.red};
          animation: signalFill 8.5s ease-in-out infinite;
        }

        .timeline-dot {
          position: absolute;
          top: 50%;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: ${C.muted};
          transform: translateY(-50%);
        }

        .timeline-dot-left {
          left: 0;
          animation: leftDot 8.5s ease-in-out infinite;
        }

        .timeline-dot-right {
          right: 0;
          animation: rightDot 8.5s ease-in-out infinite;
        }

        .experience-cards {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .action-card {
          position: relative;
          min-height: 104px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 6px;
          padding: 18px 20px;
          color: ${C.cream};
          text-decoration: none;
          border: 1px solid rgba(241, 233, 216, 0.2);
          background: rgba(241, 233, 216, 0.035);
          box-shadow: 8px 8px 0 rgba(231, 53, 34, 0);
          overflow: hidden;
          opacity: 0;
          transform: translateY(12px);
          transition:
            transform 0.22s ease,
            background 0.22s ease,
            color 0.22s ease,
            border-color 0.22s ease,
            box-shadow 0.22s ease;
        }

        .reveal-section.is-inview .action-card {
          animation: cardIn 0.52s ease var(--card-delay, 320ms) forwards;
        }

        .action-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg, rgba(231, 53, 34, 0.16), transparent 45%),
            repeating-linear-gradient(90deg, rgba(241, 233, 216, 0.05) 0 1px, transparent 1px 10px);
          opacity: 0;
          transition: opacity 0.22s ease;
        }

        .action-card.is-dark {
          background: ${C.red};
          color: ${C.cream};
          border-color: ${C.red};
        }

        .action-card:hover,
        .action-card:focus-visible,
        .action-card.is-active {
          transform: translate(-3px, -3px);
          background: rgba(231, 53, 34, 0.12);
          border-color: ${C.red};
          box-shadow: 10px 10px 0 rgba(231, 53, 34, 0.16);
          outline: none;
        }

        .action-card:hover::before,
        .action-card:focus-visible::before,
        .action-card.is-active::before {
          opacity: 1;
        }

        .action-card-title,
        .action-card-meta {
          position: relative;
          z-index: 1;
        }

        .action-card-title {
          display: block;
          font-size: clamp(18px, 1.7vw, 30px);
          line-height: 0.96;
          font-weight: 700;
          letter-spacing: 0;
          text-transform: uppercase;
        }

        .action-card-meta {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: rgba(241, 233, 216, 0.62);
          font-size: 10px;
          line-height: 1;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .action-arrow {
          font-size: 2em;
          line-height: 0.55;
          transform: translateY(-0.02em);
        }

        .footer-transmission {
          position: relative;
          z-index: 3;
          display: flex;
          justify-content: space-between;
          gap: 20px;
          padding: 22px clamp(28px, 5vw, 72px);
          background: ${C.black};
          border-top: 1px solid rgba(241, 233, 216, 0.1);
          color: rgba(241, 233, 216, 0.48);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes visualIn {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes cardIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes monolithFloat {
          0%,
          100% {
            transform: translate(-50%, -50%) translateY(0);
          }

          50% {
            transform: translate(-50%, -50%) translateY(-10px);
          }
        }

        @keyframes ringPulse {
          0%,
          100% {
            opacity: 0.26;
            transform: scale(1);
          }

          50% {
            opacity: 0.72;
            transform: scale(1.04);
          }
        }

        @keyframes eyePulse {
          0%,
          100% {
            opacity: 0.78;
            transform: translate(-50%, -50%) scale(1);
          }

          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.08);
          }
        }

        .experience-system .hal-eye {
          animation-name: eyePulseOnly;
        }

        @keyframes eyePulseOnly {
          0%,
          100% {
            opacity: 0.78;
            transform: translate(-50%, -50%) scale(1);
          }

          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.08);
          }
        }

        @keyframes barSignal {
          0% {
            height: calc(var(--bar-height) * 0.42);
            opacity: 0.32;
          }

          100% {
            height: var(--bar-height);
            opacity: 0.88;
          }
        }

        @keyframes scanLine {
          0% {
            top: 0%;
            opacity: 0;
          }

          8% {
            opacity: 1;
          }

          52% {
            opacity: 0.75;
          }

          100% {
            top: 100%;
            opacity: 0;
          }
        }

        @keyframes signalFill {
          0%,
          18% {
            opacity: 0;
            transform: translateY(-50%) scaleX(0);
          }

          24% {
            opacity: 1;
            transform: translateY(-50%) scaleX(0);
          }

          62% {
            opacity: 1;
            transform: translateY(-50%) scaleX(1);
          }

          78%,
          100% {
            opacity: 0;
            transform: translateY(-50%) scaleX(1);
          }
        }

        @keyframes leftDot {
          0%,
          18% {
            background: ${C.muted};
          }

          24%,
          68% {
            background: ${C.red};
          }

          80%,
          100% {
            background: ${C.muted};
          }
        }

        @keyframes rightDot {
          0%,
          48% {
            background: ${C.muted};
          }

          62%,
          76% {
            background: ${C.red};
          }

          86%,
          100% {
            background: ${C.muted};
          }
        }

        @media (max-width: 1180px) {
          .hero-grid,
          .experience-grid,
          .scan-layout {
            grid-template-columns: 1fr;
          }

          .hero-visual {
            width: min(560px, 100%);
            margin: 0 auto;
          }

          .monolith-system {
            margin: 0 auto;
          }

          .transmission-panel {
            right: 50%;
            transform: translateX(50%);
          }

          .section-heading,
          .experience-copy {
            max-width: 820px;
          }

          .readout-panel {
            min-height: 180px;
          }
        }

        @media (max-width: 820px) {
          .hero-section,
          .space-section,
          .experience-section {
            min-height: auto;
            padding: 104px 0 68px;
          }

          .section-inner {
            width: calc(100% - 34px);
          }

          .hero-title {
            font-size: clamp(56px, 16vw, 98px);
          }

          .section-title {
            font-size: clamp(48px, 13vw, 82px);
          }

          .hero-address {
            font-size: 11px;
            letter-spacing: 0.14em;
          }

          .hero-intro,
          .section-intro {
            font-size: 11px;
          }

          .hero-actions {
            flex-direction: column;
          }

          .hero-actions a {
            width: 100%;
          }

          .monolith-system {
            width: min(100%, 390px);
          }

          .hal-core {
            width: 100px;
            height: 100px;
          }

          .transmission-panel {
            position: relative;
            right: auto;
            bottom: auto;
            transform: none;
            width: 100%;
            margin-top: 24px;
          }

          .scan-frame {
            min-height: auto;
            padding: 22px 14px;
          }

          .zone-controls {
            grid-template-columns: 1fr;
          }

          .experience-system {
            min-height: auto;
            padding: 24px;
          }

          .experience-system .hal-core {
            width: 140px;
            height: 140px;
            margin-bottom: 34px;
          }

          .experience-cards {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
          }

          .action-card {
            min-height: 86px;
            padding: 14px 12px;
          }

          .experience-cards .action-card-title {
            font-size: clamp(14px, 4vw, 18px);
          }

          .action-card-meta {
            font-size: 8px;
            letter-spacing: 0.14em;
          }

          .footer-transmission {
            flex-direction: column;
          }
        }

        @media (max-width: 520px) {
          .section-inner {
            width: calc(100% - 28px);
          }

          .hero-title {
            font-size: clamp(48px, 15vw, 68px);
          }

          .terminal-label {
            font-size: 8px;
          }

          .timeline-times {
            font-size: 9px;
            letter-spacing: 0.08em;
          }

          .experience-cards {
            gap: 8px;
          }

          .experience-cards .action-card {
            padding: 13px 9px;
          }

          .experience-cards .action-card-title {
            font-size: 13px;
          }

          .experience-cards .action-card-meta {
            font-size: 7px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-copy,
          .section-heading,
          .experience-copy,
          .hero-visual,
          .scan-frame,
          .readout-panel,
          .experience-system,
          .action-card,
          .monolith,
          .hal-ring,
          .hal-eye,
          .signal-bars span,
          .scan-line,
          .timeline-fill,
          .timeline-dot {
            animation: none !important;
            transition: none !important;
          }

          .hero-copy,
          .section-heading,
          .experience-copy,
          .hero-visual,
          .scan-frame,
          .readout-panel,
          .experience-system,
          .action-card {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </>
  );
}

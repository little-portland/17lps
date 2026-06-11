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
  cream: '#F1E9D8',
  paper: '#E8E2D4',
  ink: '#10100E',
  black: '#050504',
  red: '#E52520',
  redDark: '#B61514',
  pink: '#D4507A',
  amber: '#F3A800',
  muted: '#77736B',
} as const;

const MONO = '"Space Mono", "Courier New", monospace';

type AreaId = 'tent' | 'chefs-studio' | 'studio';

type AreaConfig = {
  id: AreaId;
  title: string;
  href: string;
  highlight: string;
  caption: string;
};

const ASSETS = {
  bg: '/images/concept/concept_bg.jpg',
  funnel: '/images/concept/grid_funel.png',
  floor: '/images/concept/noise_floor.png',
  obelisk: '/images/concept/obelisk-dark-grey.png',
  venue: '/images/concept/the-space-page-venue.png',
};

const AREAS: AreaConfig[] = [
  {
    id: 'tent',
    title: 'THE TENT',
    href: '/thetent-test',
    highlight: '/images/concept/tent-highlight.png',
    caption: 'A concealed dining chamber built for close, theatrical evenings.',
  },
  {
    id: 'chefs-studio',
    title: "CHEF'S STUDIO",
    href: '/chefstudio-test',
    highlight: '/images/concept/chefs-studio-highlight.png',
    caption: 'An intimate studio for food, performance and controlled spectacle.',
  },
  {
    id: 'studio',
    title: 'THE STUDIO',
    href: '/studio-test',
    highlight: '/images/concept/studio-highlight.png',
    caption: 'A private room for sound, culture and after-dark transmission.',
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

function CorridorGraphic() {
  return (
    <div className="corridor" aria-hidden="true">
      <div className="corridor-frame corridor-frame-1" />
      <div className="corridor-frame corridor-frame-2" />
      <div className="corridor-frame corridor-frame-3" />
      <div className="corridor-frame corridor-frame-4" />
      <div className="corridor-core" />
      <div className="corridor-panel corridor-panel-a" />
      <div className="corridor-panel corridor-panel-b" />
      <div className="corridor-panel corridor-panel-c" />
      <div className="corridor-panel corridor-panel-d" />
      <div className="corridor-person" />
    </div>
  );
}

function OrbitGraphic() {
  return (
    <div className="orbit" aria-hidden="true">
      <div className="orbit-ring orbit-ring-1" />
      <div className="orbit-ring orbit-ring-2" />
      <div className="orbit-ring orbit-ring-3" />
      <div className="orbit-arm orbit-arm-a" />
      <div className="orbit-arm orbit-arm-b" />
      <div className="orbit-arm orbit-arm-c" />
      <div className="orbit-core" />
      <div className="orbit-dot orbit-dot-a" />
      <div className="orbit-dot orbit-dot-b" />
      <div className="orbit-dot orbit-dot-c" />
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
    }, 520);

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
        threshold: 0.16,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
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

  const activeCaption =
    AREAS.find((area) => area.id === activeArea)?.caption ||
    'Select a chamber to isolate the programme inside the space.';

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

        <section className="hero reveal-section" aria-labelledby="concept-title">
          <div className="hero-paper" aria-hidden="true" />
          <div className="hero-grid" aria-hidden="true" />

          <div className="hero-inner">
            <div className="hero-copy">
              <p className="hero-kicker">LPX // UNDERGROUND TRANSMISSION</p>

              <h1 id="concept-title" className="hero-title">
                CONCEPT.
              </h1>

              <p className="hero-address">
                17 Little Portland Street, London
              </p>

              <p className="hero-intro">
                A concealed programme below street level. Dining, sound,
                architecture and after-dark energy arranged as a single
                cinematic sequence.
              </p>

              <div className="hero-actions" aria-label="Page sections">
                <a href="#the-space">The Space</a>
                <a href="#the-experience">The Experience</a>
              </div>
            </div>

            <div className="hero-visual" aria-hidden="true">
              <div className="red-panel">
                <div className="red-panel-grain" />
                <div className="red-panel-orbit">
                  <OrbitGraphic />
                </div>

                <div className="monolith-system">
                  <div className="monolith-shadow" />
                  <img
                    src={ASSETS.obelisk}
                    alt=""
                    className="monolith-img"
                    draggable={false}
                  />
                  <img
                    src={ASSETS.funnel}
                    alt=""
                    className="monolith-funnel"
                    draggable={false}
                  />
                  <span className="monolith-scan monolith-scan-a" />
                  <span className="monolith-scan monolith-scan-b" />
                </div>

                <div className="red-mark red-mark-a" />
                <div className="red-mark red-mark-b" />
                <div className="red-mark red-mark-c" />
              </div>

              <div className="corridor-panel">
                <CorridorGraphic />
              </div>
            </div>
          </div>
        </section>

        <section
          id="the-space"
          className="space-section reveal-section"
          aria-labelledby="space-title"
        >
          <div className="space-bg" aria-hidden="true" />

          <div className="section-label-row">
            <span>MODULE 01</span>
            <span>ARCHITECTURAL SYSTEM</span>
          </div>

          <div className="section-heading-grid">
            <h2 id="space-title" className="section-title">
              THE SPACE
            </h2>

            <p className="section-copy">
              Three chambers operate as one underground vessel. Hover or tap to
              isolate each programme.
            </p>
          </div>

          <div className="space-composition">
            <div className="venue-shell">
              <div className="venue-wrap">
                <img
                  src={ASSETS.venue}
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

            <aside className="space-readout">
              <span className="readout-dot" />
              <p className="readout-label">ACTIVE CHAMBER</p>
              <p className="readout-copy">{activeCaption}</p>
            </aside>
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
                      '--card-delay': `${220 + index * 120}ms`,
                    } as CSSProperties
                  }
                />
              );
            })}
          </nav>
        </section>

        <section
          id="the-experience"
          className="experience-section reveal-section"
          aria-labelledby="experience-title"
        >
          <div className="experience-bg" aria-hidden="true" />

          <div className="section-label-row">
            <span>MODULE 02</span>
            <span>EVENING TRANSITION</span>
          </div>

          <div className="experience-layout">
            <div className="experience-copy">
              <h2 id="experience-title" className="section-title">
                THE EXPERIENCE
              </h2>

              <p className="section-copy">
                A precise shift from seated dinner to late-night Little Portland
                energy. The evening behaves like a signal changing state.
              </p>
            </div>

            <div className="experience-orbit" aria-hidden="true">
              <div className="experience-orbit-ring" />
              <div className="experience-orbit-core" />
              <div className="experience-orbit-moon experience-orbit-moon-a" />
              <div className="experience-orbit-moon experience-orbit-moon-b" />
            </div>
          </div>

          <div className="experience-protocol" aria-hidden="true">
            <div className="time-row">
              <span>20:00 / 20:30</span>
              <span>22:00</span>
            </div>

            <div className="protocol-line">
              <span className="protocol-dot protocol-dot-left" />
              <span className="protocol-track" />
              <span className="protocol-fill" />
              <span className="protocol-dot protocol-dot-right" />
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
                    '--card-delay': `${420 + index * 120}ms`,
                  } as CSSProperties
                }
              />
            ))}
          </nav>
        </section>
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
          scrollbar-color: ${C.red} rgba(255, 255, 255, 0.12);
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
          color: ${C.cream} !important;
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
          color: ${C.cream} !important;
          opacity: 0.42;
        }

        .scene-nav--space .scene-nav-burger span {
          background: ${C.cream} !important;
        }

        .concept-nav-shell.is-scrolled .scene-nav.scene-nav--space {
          background: rgba(5, 5, 4, 0.72) !important;
          border-bottom: 1px solid rgba(241, 233, 216, 0.16);
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.28);
          backdrop-filter: blur(20px) !important;
          -webkit-backdrop-filter: blur(20px) !important;
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
            background: rgba(5, 5, 4, 0.88);
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
            background: rgba(5, 5, 4, 0.88) !important;
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
            background: rgba(5, 5, 4, 0.88) !important;
            backdrop-filter: blur(22px) saturate(1.08) !important;
            -webkit-backdrop-filter: blur(22px) saturate(1.08) !important;
          }

          .concept-nav-shell:has(.scene-nav-burger[aria-expanded='true']) .scene-nav-mobile a,
          .concept-nav-shell:has(button[aria-expanded='true']) .scene-nav-mobile a,
          .concept-nav-shell:has(.scene-nav-burger[aria-expanded='true']) .scene-nav-mobile-link,
          .concept-nav-shell:has(button[aria-expanded='true']) .scene-nav-mobile-link {
            display: block !important;
            position: relative !important;
            margin: 0 !important;
            padding: 4px 0 !important;
            font-size: clamp(15px, 4.4vw, 22px) !important;
            line-height: 1.15 !important;
            letter-spacing: 0.16em !important;
            text-align: center !important;
            color: ${C.cream} !important;
            opacity: 1 !important;
            text-shadow: none !important;
          }

          .concept-nav-shell:has(.scene-nav-burger[aria-expanded='true']) .scene-nav-mobile a.active,
          .concept-nav-shell:has(button[aria-expanded='true']) .scene-nav-mobile a.active,
          .concept-nav-shell:has(.scene-nav-burger[aria-expanded='true']) .scene-nav-mobile a[aria-current='page'],
          .concept-nav-shell:has(button[aria-expanded='true']) .scene-nav-mobile a[aria-current='page'] {
            color: ${C.red} !important;
            opacity: 1 !important;
          }
        }

        .page {
          position: relative;
          min-height: 100svh;
          overflow-x: clip;
          padding-top: clamp(74px, 6vw, 96px);
          background: ${C.black};
        }

        .site-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background:
            radial-gradient(circle at 50% 0%, rgba(229, 37, 32, 0.16), transparent 34%),
            radial-gradient(circle at 82% 18%, rgba(243, 168, 0, 0.12), transparent 22%),
            ${C.black};
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

        .hero {
          position: relative;
          z-index: 2;
          min-height: calc(100svh - 74px);
          display: flex;
          align-items: stretch;
          overflow: hidden;
          background: ${C.red};
          border-top: 1px solid rgba(241, 233, 216, 0.16);
          border-bottom: 1px solid rgba(241, 233, 216, 0.16);
        }

        .hero-paper {
          position: absolute;
          inset: 0;
          z-index: 0;
          background:
            radial-gradient(circle at 35% 40%, rgba(255, 255, 255, 0.12), transparent 26%),
            repeating-linear-gradient(
              0deg,
              rgba(255, 255, 255, 0.06) 0 1px,
              transparent 1px 5px
            );
          opacity: 0.6;
          mix-blend-mode: screen;
          pointer-events: none;
        }

        .hero-grid {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background:
            linear-gradient(90deg, rgba(5, 5, 4, 0.12) 1px, transparent 1px),
            linear-gradient(180deg, rgba(5, 5, 4, 0.1) 1px, transparent 1px);
          background-size: 110px 110px;
          mask-image: radial-gradient(circle at center, black, transparent 78%);
          opacity: 0.42;
        }

        .hero::before,
        .hero::after {
          content: '';
          position: absolute;
          z-index: 1;
          width: min(30vw, 430px);
          height: min(30vw, 430px);
          background: ${C.black};
          transform: rotate(45deg);
          opacity: 0.98;
        }

        .hero::before {
          left: min(-15vw, -150px);
          top: 16%;
        }

        .hero::after {
          right: min(-15vw, -150px);
          bottom: 10%;
        }

        .hero-inner {
          position: relative;
          z-index: 4;
          width: min(1380px, 86vw);
          min-height: inherit;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 0.92fr) minmax(420px, 0.88fr);
          gap: clamp(34px, 5vw, 84px);
          align-items: center;
          padding: clamp(56px, 7vw, 118px) 0 clamp(46px, 6vw, 88px);
        }

        .hero-copy {
          position: relative;
          z-index: 7;
          max-width: 720px;
          color: ${C.cream};
        }

        .hero-kicker {
          margin: 0 0 clamp(18px, 2vw, 28px) 0;
          font-size: 10px;
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: 0.24em;
          color: rgba(241, 233, 216, 0.7);
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(12px);
        }

        .hero.is-inview .hero-kicker {
          animation: copyIn 0.48s ease 120ms forwards;
        }

        .hero-title {
          margin: 0;
          color: ${C.cream};
          font-family: ${MONO};
          font-size: clamp(68px, 10.5vw, 176px);
          font-weight: 700;
          line-height: 0.84;
          letter-spacing: -0.055em;
          text-transform: uppercase;
          text-shadow:
            0.018em 0 0 currentColor,
            0 8px 0 rgba(5, 5, 4, 0.16);
          opacity: 0;
          clip-path: inset(0 100% 0 0);
        }

        .hero.is-inview .hero-title {
          animation:
            scanTitleReveal 0.5s steps(8, end) 180ms forwards,
            titleMicroGlitch 0.48s steps(2, end) 700ms forwards,
            titleIdleGlitch 7s steps(2, end) 3400ms infinite;
        }

        .hero-address {
          margin: clamp(20px, 2.2vw, 30px) 0 0 0;
          color: ${C.black};
          font-size: clamp(14px, 1.45vw, 22px);
          font-weight: 700;
          line-height: 1.45;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(12px);
        }

        .hero.is-inview .hero-address {
          animation: copyIn 0.54s ease 520ms forwards;
        }

        .hero-intro {
          max-width: 650px;
          margin: clamp(28px, 3.2vw, 46px) 0 0 0;
          color: rgba(241, 233, 216, 0.78);
          font-size: clamp(12px, 0.95vw, 15px);
          font-weight: 700;
          line-height: 1.85;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(12px);
        }

        .hero.is-inview .hero-intro {
          animation: copyIn 0.54s ease 680ms forwards;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: clamp(28px, 3.2vw, 46px);
          opacity: 0;
          transform: translateY(12px);
        }

        .hero.is-inview .hero-actions {
          animation: copyIn 0.54s ease 820ms forwards;
        }

        .hero-actions a {
          color: ${C.cream};
          text-decoration: none;
          border: 1px solid rgba(241, 233, 216, 0.58);
          padding: 12px 18px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          background: rgba(5, 5, 4, 0.1);
          transition:
            background 0.2s ease,
            color 0.2s ease,
            transform 0.2s ease;
        }

        .hero-actions a:hover,
        .hero-actions a:focus-visible {
          background: ${C.cream};
          color: ${C.red};
          transform: translateY(-2px);
          outline: none;
        }

        .hero-visual {
          position: relative;
          z-index: 5;
          display: grid;
          gap: clamp(18px, 2vw, 28px);
          align-items: center;
          opacity: 0;
          transform: translateY(26px);
        }

        .hero.is-inview .hero-visual {
          animation: visualIn 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 360ms forwards;
        }

        .red-panel {
          position: relative;
          min-height: clamp(420px, 46vw, 690px);
          overflow: hidden;
          background:
            radial-gradient(circle at 52% 42%, rgba(243, 168, 0, 0.26), transparent 9%),
            ${C.cream};
          box-shadow:
            0 30px 80px rgba(5, 5, 4, 0.28),
            inset 0 0 0 1px rgba(5, 5, 4, 0.14);
        }

        .red-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            linear-gradient(90deg, transparent 0 18%, rgba(229, 37, 32, 0.9) 18% 19%, transparent 19% 81%, rgba(229, 37, 32, 0.9) 81% 82%, transparent 82%),
            repeating-linear-gradient(
              0deg,
              rgba(5, 5, 4, 0.045) 0 1px,
              transparent 1px 4px
            );
          opacity: 0.5;
          pointer-events: none;
        }

        .red-panel-grain {
          position: absolute;
          inset: 0;
          z-index: 2;
          background-image: url('${ASSETS.bg}');
          background-size: contain;
          background-repeat: repeat;
          opacity: 0.26;
          mix-blend-mode: multiply;
          pointer-events: none;
        }

        .red-panel-orbit {
          position: absolute;
          inset: 5%;
          z-index: 3;
        }

        .orbit {
          position: absolute;
          inset: 0;
          opacity: 0.78;
        }

        .orbit-ring {
          position: absolute;
          left: 50%;
          top: 50%;
          border: 2px solid ${C.black};
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }

        .orbit-ring-1 {
          width: 78%;
          height: 78%;
          opacity: 0.18;
        }

        .orbit-ring-2 {
          width: 54%;
          height: 54%;
          opacity: 0.28;
        }

        .orbit-ring-3 {
          width: 26%;
          height: 26%;
          opacity: 0.35;
        }

        .orbit-arm {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 90%;
          height: 18px;
          background:
            linear-gradient(90deg, ${C.black} 0 10%, transparent 10% 19%, ${C.black} 19% 25%, transparent 25% 75%, ${C.black} 75% 81%, transparent 81% 90%, ${C.black} 90% 100%);
          transform-origin: center;
          opacity: 0.9;
        }

        .orbit-arm-a {
          transform: translate(-50%, -50%) rotate(0deg);
        }

        .orbit-arm-b {
          transform: translate(-50%, -50%) rotate(60deg);
        }

        .orbit-arm-c {
          transform: translate(-50%, -50%) rotate(120deg);
        }

        .orbit-core {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: ${C.amber};
          border: 6px solid ${C.black};
          transform: translate(-50%, -50%);
          box-shadow: 0 12px 22px rgba(5, 5, 4, 0.4);
        }

        .orbit-dot {
          position: absolute;
          width: 32px;
          height: 32px;
          background: ${C.black};
          transform: rotate(45deg);
        }

        .orbit-dot-a {
          top: 18%;
          left: 49%;
        }

        .orbit-dot-b {
          bottom: 18%;
          left: 49%;
        }

        .orbit-dot-c {
          top: 48%;
          right: 17%;
        }

        .monolith-system {
          position: absolute;
          inset: 0;
          z-index: 6;
        }

        .monolith-img {
          position: absolute;
          right: 15%;
          bottom: 12%;
          width: 18%;
          min-width: 78px;
          max-width: 120px;
          filter: drop-shadow(0 26px 28px rgba(5, 5, 4, 0.36));
          animation: monolithFloat 7s ease-in-out infinite;
        }

        .monolith-funnel {
          position: absolute;
          right: 6%;
          top: 12%;
          width: 34%;
          opacity: 0.96;
          filter: drop-shadow(0 8px 16px rgba(212, 80, 122, 0.18));
          animation: funnelPulse 6.5s ease-in-out infinite;
        }

        .monolith-shadow {
          position: absolute;
          right: 4%;
          bottom: 7%;
          width: 56%;
          height: 15%;
          background: radial-gradient(ellipse at center, rgba(5, 5, 4, 0.26), transparent 72%);
          filter: blur(14px);
          transform: rotate(-7deg);
        }

        .monolith-scan {
          position: absolute;
          left: 8%;
          right: 8%;
          height: 2px;
          background: ${C.red};
          opacity: 0;
          z-index: 8;
          mix-blend-mode: multiply;
        }

        .monolith-scan-a {
          top: 32%;
          animation: scanLine 5.8s linear 1.4s infinite;
        }

        .monolith-scan-b {
          top: 58%;
          animation: scanLine 7.4s linear 3.1s infinite;
        }

        .red-mark {
          position: absolute;
          z-index: 5;
          background: ${C.black};
          transform: rotate(45deg);
        }

        .red-mark-a {
          left: 7%;
          top: 12%;
          width: 70px;
          height: 70px;
        }

        .red-mark-b {
          left: 13%;
          bottom: 12%;
          width: 44px;
          height: 44px;
        }

        .red-mark-c {
          right: 12%;
          top: 48%;
          width: 38px;
          height: 38px;
        }

        .corridor-panel {
          position: relative;
          min-height: 210px;
          background: ${C.black};
          border: 1px solid rgba(241, 233, 216, 0.16);
          box-shadow: 0 24px 60px rgba(5, 5, 4, 0.28);
          overflow: hidden;
        }

        .corridor {
          position: absolute;
          inset: 0;
          perspective: 800px;
          background:
            radial-gradient(circle at 50% 50%, rgba(241, 233, 216, 0.12), transparent 26%),
            ${C.black};
        }

        .corridor-frame {
          position: absolute;
          left: 50%;
          top: 50%;
          border: 10px solid ${C.cream};
          transform: translate(-50%, -50%) rotate(45deg);
          opacity: 0.9;
        }

        .corridor-frame-1 {
          width: 90%;
          height: 90%;
        }

        .corridor-frame-2 {
          width: 66%;
          height: 66%;
          opacity: 0.76;
        }

        .corridor-frame-3 {
          width: 44%;
          height: 44%;
          opacity: 0.62;
        }

        .corridor-frame-4 {
          width: 24%;
          height: 24%;
          opacity: 0.48;
        }

        .corridor-core {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 72px;
          height: 72px;
          background: ${C.red};
          transform: translate(-50%, -50%) rotate(45deg);
        }

        .corridor-panel .corridor-panel-a,
        .corridor-panel .corridor-panel-b,
        .corridor-panel .corridor-panel-c,
        .corridor-panel .corridor-panel-d {
          position: absolute;
          width: 14%;
          height: 18%;
          background: ${C.black};
          border: 2px solid ${C.cream};
        }

        .corridor-panel-a {
          left: 12%;
          top: 18%;
          transform: rotate(45deg);
        }

        .corridor-panel-b {
          right: 12%;
          top: 18%;
          transform: rotate(45deg);
        }

        .corridor-panel-c {
          left: 12%;
          bottom: 18%;
          transform: rotate(45deg);
        }

        .corridor-panel-d {
          right: 12%;
          bottom: 18%;
          transform: rotate(45deg);
        }

        .corridor-person {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 16px;
          height: 42px;
          border-radius: 10px 10px 6px 6px;
          background: ${C.amber};
          transform: translate(-50%, -50%);
          box-shadow:
            0 -15px 0 2px ${C.cream},
            0 16px 0 -4px ${C.cream};
        }

        .space-section {
          position: relative;
          z-index: 2;
          overflow: hidden;
          padding: clamp(80px, 8vw, 132px) 7vw;
          background: ${C.black};
          color: ${C.cream};
        }

        .space-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          background:
            radial-gradient(circle at 20% 18%, rgba(229, 37, 32, 0.14), transparent 26%),
            radial-gradient(circle at 88% 72%, rgba(212, 80, 122, 0.12), transparent 24%),
            repeating-linear-gradient(
              90deg,
              rgba(241, 233, 216, 0.04) 0 1px,
              transparent 1px 120px
            );
          pointer-events: none;
        }

        .section-label-row {
          position: relative;
          z-index: 3;
          display: flex;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: clamp(26px, 3vw, 42px);
          color: rgba(241, 233, 216, 0.52);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(12px);
        }

        .reveal-section.is-inview .section-label-row {
          animation: copyIn 0.5s ease 90ms forwards;
        }

        .section-heading-grid {
          position: relative;
          z-index: 3;
          display: grid;
          grid-template-columns: minmax(0, 0.72fr) minmax(280px, 0.38fr);
          gap: clamp(30px, 5vw, 90px);
          align-items: end;
          margin-bottom: clamp(34px, 5vw, 74px);
        }

        .section-title {
          margin: 0;
          color: ${C.cream};
          font-size: clamp(54px, 8vw, 132px);
          font-weight: 700;
          line-height: 0.86;
          letter-spacing: -0.045em;
          text-transform: uppercase;
          text-shadow:
            0.018em 0 0 currentColor,
            0 7px 0 rgba(229, 37, 32, 0.12);
          opacity: 0;
          clip-path: inset(0 100% 0 0);
        }

        .reveal-section.is-inview .section-title {
          animation:
            scanTitleReveal 0.5s steps(8, end) 160ms forwards,
            titleMicroGlitch 0.48s steps(2, end) 680ms forwards,
            titleIdleGlitch 7s steps(2, end) 3400ms infinite;
        }

        .section-copy {
          margin: 0;
          max-width: 520px;
          color: rgba(241, 233, 216, 0.68);
          font-size: clamp(11px, 0.95vw, 14px);
          font-weight: 700;
          line-height: 1.8;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(12px);
        }

        .reveal-section.is-inview .section-copy {
          animation: copyIn 0.5s ease 360ms forwards;
        }

        .space-composition {
          position: relative;
          z-index: 3;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(220px, 0.28fr);
          gap: clamp(28px, 4vw, 70px);
          align-items: center;
        }

        .venue-shell {
          position: relative;
          opacity: 0;
          transform: translateY(26px) scale(0.98);
        }

        .space-section.is-inview .venue-shell {
          animation:
            visualIn 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) 360ms forwards,
            venueFloat 5.6s ease-in-out 1500ms infinite;
        }

        .venue-shell::before {
          content: '';
          position: absolute;
          inset: -6%;
          z-index: -1;
          background:
            linear-gradient(90deg, rgba(229, 37, 32, 0.16), transparent 38%),
            radial-gradient(circle at 50% 60%, rgba(241, 233, 216, 0.12), transparent 44%);
          border: 1px solid rgba(241, 233, 216, 0.12);
        }

        .venue-wrap {
          position: relative;
          width: min(100%, 900px);
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
          background: radial-gradient(ellipse at center, rgba(241, 233, 216, 0.18), transparent 72%);
          filter: blur(10px);
          opacity: 0.36;
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
            saturate(0.98)
            contrast(1.08)
            drop-shadow(0 18px 28px rgba(0, 0, 0, 0.34))
            drop-shadow(0 36px 60px rgba(0, 0, 0, 0.32));
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
          mix-blend-mode: screen;
          pointer-events: none;
        }

        .space-section.is-inview .venue-glitch-a {
          filter:
            drop-shadow(0 0 12px rgba(229, 37, 32, 0.38))
            hue-rotate(-18deg)
            saturate(1.35);
          animation: venueGlitchA 8.5s steps(1, end) 1800ms infinite;
        }

        .space-section.is-inview .venue-glitch-b {
          filter:
            drop-shadow(0 0 12px rgba(241, 233, 216, 0.26))
            hue-rotate(18deg)
            saturate(1.12);
          animation: venueGlitchB 8.5s steps(1, end) 1800ms infinite;
        }

        .space-readout {
          position: relative;
          min-height: 260px;
          padding: 26px 0 26px 26px;
          border-left: 1px solid rgba(241, 233, 216, 0.28);
          opacity: 0;
          transform: translateY(14px);
        }

        .space-section.is-inview .space-readout {
          animation: copyIn 0.6s ease 580ms forwards;
        }

        .readout-dot {
          display: block;
          width: 18px;
          height: 18px;
          margin-bottom: 26px;
          border-radius: 50%;
          background: ${C.red};
          box-shadow: 0 0 0 8px rgba(229, 37, 32, 0.12);
          animation: readoutPulse 2.4s ease-in-out infinite;
        }

        .readout-label {
          margin: 0 0 18px 0;
          color: ${C.red};
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .readout-copy {
          margin: 0;
          color: rgba(241, 233, 216, 0.74);
          font-size: clamp(11px, 0.95vw, 14px);
          font-weight: 700;
          line-height: 1.8;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .zone-controls {
          position: relative;
          z-index: 4;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          margin-top: clamp(30px, 4vw, 58px);
        }

        .experience-section {
          position: relative;
          z-index: 2;
          overflow: hidden;
          padding: clamp(80px, 8vw, 132px) 7vw;
          background: ${C.cream};
          color: ${C.black};
        }

        .experience-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          background:
            radial-gradient(circle at 76% 16%, rgba(229, 37, 32, 0.18), transparent 22%),
            linear-gradient(135deg, rgba(229, 37, 32, 0.96) 0 26%, transparent 26% 100%),
            ${C.cream};
          pointer-events: none;
        }

        .experience-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url('${ASSETS.bg}');
          background-size: contain;
          background-repeat: repeat;
          opacity: 0.22;
          mix-blend-mode: multiply;
        }

        .experience-section .section-label-row {
          color: rgba(5, 5, 4, 0.58);
        }

        .experience-section .section-title {
          color: ${C.black};
          text-shadow:
            0.018em 0 0 currentColor,
            0 7px 0 rgba(229, 37, 32, 0.14);
        }

        .experience-section .section-copy {
          color: rgba(5, 5, 4, 0.72);
        }

        .experience-layout {
          position: relative;
          z-index: 3;
          display: grid;
          grid-template-columns: minmax(0, 0.68fr) minmax(260px, 0.32fr);
          gap: clamp(32px, 5vw, 90px);
          align-items: center;
        }

        .experience-copy {
          position: relative;
          z-index: 2;
        }

        .experience-orbit {
          position: relative;
          aspect-ratio: 1;
          opacity: 0;
          transform: translateY(20px) scale(0.96);
        }

        .experience-section.is-inview .experience-orbit {
          animation:
            visualIn 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) 420ms forwards,
            orbitSpin 14s linear 1400ms infinite;
        }

        .experience-orbit-ring {
          position: absolute;
          inset: 8%;
          border: 18px solid ${C.black};
          border-radius: 50%;
          box-shadow:
            inset 0 0 0 2px ${C.cream},
            0 0 0 1px rgba(5, 5, 4, 0.12);
        }

        .experience-orbit-core {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 74px;
          height: 74px;
          border-radius: 50%;
          background: ${C.amber};
          border: 8px solid ${C.black};
          transform: translate(-50%, -50%);
        }

        .experience-orbit-moon {
          position: absolute;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: ${C.red};
          border: 5px solid ${C.black};
        }

        .experience-orbit-moon-a {
          left: 7%;
          top: 48%;
        }

        .experience-orbit-moon-b {
          right: 13%;
          top: 20%;
          background: ${C.cream};
        }

        .experience-protocol {
          position: relative;
          z-index: 3;
          margin-top: clamp(42px, 5vw, 80px);
          margin-bottom: clamp(26px, 3vw, 42px);
          opacity: 0;
          transform: translateY(14px);
        }

        .experience-section.is-inview .experience-protocol {
          animation: copyIn 0.58s ease 480ms forwards;
        }

        .time-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 16px;
          color: rgba(5, 5, 4, 0.62);
          font-size: clamp(12px, 1.1vw, 16px);
          font-weight: 700;
          letter-spacing: 0.16em;
        }

        .protocol-line {
          position: relative;
          height: 20px;
        }

        .protocol-track,
        .protocol-fill {
          position: absolute;
          left: 0;
          right: 0;
          top: 50%;
          height: 2px;
          transform: translateY(-50%);
          transform-origin: left center;
        }

        .protocol-track {
          background: rgba(5, 5, 4, 0.28);
        }

        .protocol-fill {
          background: ${C.red};
          transform: translateY(-50%) scaleX(0);
          animation: protocolFill 12s ease-in-out infinite;
        }

        .protocol-dot {
          position: absolute;
          top: 50%;
          z-index: 2;
          width: 20px;
          height: 20px;
          border-radius: 999px;
          background: #8f8a80;
          transform: translateY(-50%);
          animation: protocolDot 12s ease-in-out infinite;
        }

        .protocol-dot-left {
          left: 0;
        }

        .protocol-dot-right {
          right: 0;
          animation-delay: 1.8s;
        }

        .experience-nav {
          position: relative;
          z-index: 3;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .action-card {
          position: relative;
          min-height: clamp(86px, 7vw, 116px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 7px;
          padding: clamp(16px, 1.5vw, 22px) clamp(18px, 2vw, 28px);
          border: 1px solid transparent;
          background: rgba(241, 233, 216, 0.04);
          color: inherit;
          text-decoration: none;
          box-shadow: 7px 7px 0 rgba(229, 37, 32, 0);
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
            linear-gradient(135deg, rgba(229, 37, 32, 0.16), transparent 42%),
            repeating-linear-gradient(90deg, rgba(241, 233, 216, 0.08) 0 1px, transparent 1px 11px);
          opacity: 0;
          transition: opacity 0.24s ease;
        }

        .action-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border: 1px solid rgba(241, 233, 216, 0.5);
          pointer-events: none;
          clip-path: inset(0 100% 100% 0);
        }

        .experience-section .action-card::after {
          border-color: rgba(5, 5, 4, 0.48);
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
          font-size: clamp(18px, 1.8vw, 30px);
          font-weight: 700;
          line-height: 0.95;
          letter-spacing: 0;
          text-transform: uppercase;
          text-shadow: 0.012em 0 0 currentColor;
        }

        .action-card-meta {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: rgba(241, 233, 216, 0.62);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          line-height: 1;
          text-transform: uppercase;
        }

        .experience-section .action-card-meta {
          color: rgba(5, 5, 4, 0.56);
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
          background: rgba(229, 37, 32, 0.16);
          box-shadow: 10px 10px 0 rgba(229, 37, 32, 0.22);
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
          border-color: ${C.red};
        }

        .action-card.is-dark {
          background: ${C.black};
          color: ${C.cream};
        }

        .action-card.is-dark .action-card-meta {
          color: rgba(241, 233, 216, 0.66);
        }

        .action-card.is-dark:hover,
        .action-card.is-dark:focus-visible {
          background: ${C.red};
          color: ${C.cream};
        }

        .action-card:hover .action-card-meta,
        .action-card:focus-visible .action-card-meta {
          color: currentColor;
          opacity: 0.72;
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
            text-shadow:
              0.018em 0 0 currentColor,
              0 8px 0 rgba(5, 5, 4, 0.16);
          }

          35% {
            text-shadow:
              0.018em 0 0 currentColor,
              0.08em 0 0 rgba(5, 5, 4, 0.38);
          }

          65% {
            text-shadow:
              0.018em 0 0 currentColor,
              -0.06em 0 0 rgba(241, 233, 216, 0.34);
          }
        }

        @keyframes titleIdleGlitch {
          0%,
          92%,
          100% {
            filter: none;
          }

          93% {
            filter: blur(0.2px);
            transform: translateX(2px);
          }

          94% {
            transform: translateX(-2px);
          }

          96% {
            filter: none;
            transform: translateX(0);
          }
        }

        @keyframes copyIn {
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
            box-shadow: 7px 7px 0 rgba(229, 37, 32, 0.14);
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

        @keyframes monolithFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes funnelPulse {
          0%,
          100% {
            transform: translateY(0) scale(1);
            opacity: 0.92;
          }

          50% {
            transform: translateY(-8px) scale(1.025);
            opacity: 1;
          }
        }

        @keyframes scanLine {
          0%,
          84%,
          100% {
            opacity: 0;
            transform: translateX(-18%) scaleX(0);
          }

          87% {
            opacity: 0.72;
            transform: translateX(0) scaleX(0.4);
          }

          91% {
            opacity: 0.28;
            transform: translateX(32%) scaleX(0.8);
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

        @keyframes readoutPulse {
          0%,
          100% {
            box-shadow: 0 0 0 8px rgba(229, 37, 32, 0.12);
          }

          50% {
            box-shadow: 0 0 0 14px rgba(229, 37, 32, 0);
          }
        }

        @keyframes orbitSpin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes protocolFill {
          0%,
          16% {
            transform: translateY(-50%) scaleX(0);
            opacity: 0;
          }

          22% {
            transform: translateY(-50%) scaleX(0);
            opacity: 1;
          }

          58% {
            transform: translateY(-50%) scaleX(1);
            opacity: 1;
          }

          78%,
          100% {
            transform: translateY(-50%) scaleX(1);
            opacity: 0;
          }
        }

        @keyframes protocolDot {
          0%,
          20% {
            background: #8f8a80;
          }

          28%,
          66% {
            background: ${C.red};
          }

          82%,
          100% {
            background: #8f8a80;
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

        @media (max-width: 1120px) {
          .hero-inner {
            width: min(92vw, 1100px);
            grid-template-columns: 1fr;
          }

          .hero-visual {
            grid-template-columns: minmax(0, 1fr);
          }

          .red-panel {
            min-height: 520px;
          }

          .corridor-panel {
            display: none;
          }

          .section-heading-grid,
          .space-composition,
          .experience-layout {
            grid-template-columns: 1fr;
          }

          .space-readout {
            min-height: auto;
            border-left: 0;
            border-top: 1px solid rgba(241, 233, 216, 0.22);
            padding: 22px 0 0;
          }
        }

        @media (max-width: 820px) {
          .page {
            padding-top: 78px;
          }

          .hero {
            min-height: auto;
          }

          .hero-inner {
            width: calc(100% - 34px);
            padding: 44px 0 54px;
          }

          .hero-title {
            font-size: clamp(58px, 18vw, 96px);
            letter-spacing: -0.07em;
          }

          .hero-address {
            font-size: 12px;
            letter-spacing: 0.16em;
          }

          .hero-intro {
            font-size: 11px;
          }

          .red-panel {
            min-height: 460px;
          }

          .red-panel::before {
            opacity: 0.32;
          }

          .monolith-img {
            right: 18%;
            width: 20%;
          }

          .monolith-funnel {
            width: 38%;
          }

          .orbit-arm {
            height: 13px;
          }

          .orbit-core {
            width: 58px;
            height: 58px;
          }

          .space-section,
          .experience-section {
            padding: 60px 22px;
          }

          .section-label-row {
            font-size: 8px;
            letter-spacing: 0.16em;
          }

          .section-title {
            font-size: clamp(48px, 15vw, 82px);
          }

          .section-copy {
            font-size: 11px;
          }

          .zone-controls {
            grid-template-columns: 1fr;
          }

          .experience-nav {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
          }

          .action-card {
            min-height: 86px;
          }

          .experience-nav .action-card {
            padding: 14px 10px;
          }

          .experience-nav .action-card-title {
            font-size: clamp(14px, 4.1vw, 18px);
            white-space: nowrap;
          }

          .experience-orbit {
            max-width: 280px;
            margin: 0 auto;
          }
        }

        @media (max-width: 520px) {
          .hero-actions {
            flex-direction: column;
          }

          .hero-actions a {
            width: 100%;
            text-align: center;
          }

          .red-panel {
            min-height: 390px;
          }

          .red-mark-a,
          .red-mark-b,
          .red-mark-c {
            transform: rotate(45deg) scale(0.7);
          }

          .venue-shell::before {
            inset: -3%;
          }

          .time-row {
            font-size: 9px;
            letter-spacing: 0.06em;
          }

          .protocol-dot {
            width: 16px;
            height: 16px;
          }
        }

        @media (max-width: 380px) {
          .experience-nav {
            gap: 7px;
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
          .hero-kicker,
          .hero-title,
          .hero-address,
          .hero-intro,
          .hero-actions,
          .hero-visual,
          .section-label-row,
          .section-title,
          .section-copy,
          .venue-shell,
          .space-readout,
          .experience-orbit,
          .experience-protocol,
          .action-card,
          .action-card::after,
          .venue-glitch-a,
          .venue-glitch-b,
          .monolith-img,
          .monolith-funnel,
          .monolith-scan,
          .protocol-fill,
          .protocol-dot,
          .experience-orbit {
            animation: none !important;
            transition: none !important;
          }

          .hero-kicker,
          .hero-title,
          .hero-address,
          .hero-intro,
          .hero-actions,
          .hero-visual,
          .section-label-row,
          .section-title,
          .section-copy,
          .venue-shell,
          .space-readout,
          .experience-orbit,
          .experience-protocol,
          .action-card {
            opacity: 1 !important;
            transform: none !important;
          }

          .hero-title,
          .section-title {
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

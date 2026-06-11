'use client';

import Head from 'next/head';
import { useEffect, useMemo, useState, type CSSProperties, type MouseEvent } from 'react';
import SceneNav from '@components/SceneNav';

const C = {
  red: '#EE241D',
  redDeep: '#B51612',
  cream: '#F1EADB',
  creamSoft: '#E7DFCE',
  ink: '#090909',
  black: '#000000',
  offBlack: '#11100E',
  pink: '#F05B93',
  amber: '#F5B12C',
  grey: '#8C877E',
} as const;

const MONO = '"Space Mono", "Courier New", monospace';

type AreaId = 'tent' | 'chefs-studio' | 'studio';

type AreaConfig = {
  id: AreaId;
  title: string;
  href: string;
  highlight: string;
  description: string;
};

const ASSETS = {
  texture: '/images/concept/concept_bg.jpg',
  funnel: '/images/concept/grid_funel.png',
  obelisk: '/images/concept/obelisk-dark-grey.png',
  venue: '/images/concept/the-space-page-venue.png',
};

const AREAS: AreaConfig[] = [
  {
    id: 'tent',
    title: 'THE TENT',
    href: '/thetent-test',
    highlight: '/images/concept/tent-highlight.png',
    description:
      'A concealed dining chamber for close theatrical evenings below street level.',
  },
  {
    id: 'chefs-studio',
    title: "CHEF'S STUDIO",
    href: '/chefstudio-test',
    highlight: '/images/concept/chefs-studio-highlight.png',
    description:
      'An intimate studio for food-led performance, private dinners and controlled spectacle.',
  },
  {
    id: 'studio',
    title: 'THE STUDIO',
    href: '/studio-test',
    highlight: '/images/concept/studio-highlight.png',
    description:
      'A cultural room for sound, conversation and after-dark transmission.',
  },
];

const EXPERIENCE_BTNS = [
  { label: 'Dining', href: '/food-test', dark: false },
  { label: 'After Dark', href: '/theclub-test', dark: true },
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

function CorridorPoster() {
  return (
    <div className="corridor-poster" aria-hidden="true">
      <div className="corridor-depth corridor-depth-1" />
      <div className="corridor-depth corridor-depth-2" />
      <div className="corridor-depth corridor-depth-3" />

      <div className="corridor-panel corridor-panel-a" />
      <div className="corridor-panel corridor-panel-b" />
      <div className="corridor-panel corridor-panel-c" />
      <div className="corridor-panel corridor-panel-d" />
      <div className="corridor-panel corridor-panel-e" />
      <div className="corridor-panel corridor-panel-f" />
      <div className="corridor-panel corridor-panel-g" />
      <div className="corridor-panel corridor-panel-h" />

      <div className="corridor-core" />
      <div className="corridor-core-shadow" />

      <img src={ASSETS.funnel} alt="" className="poster-funnel" draggable={false} />
      <img src={ASSETS.obelisk} alt="" className="poster-obelisk" draggable={false} />
    </div>
  );
}

function ExperienceOrbit() {
  return (
    <div className="experience-orbit" aria-hidden="true">
      <div className="experience-orbit-ring" />
      <div className="experience-orbit-core" />
      <div className="experience-orbit-dot experience-orbit-dot-a" />
      <div className="experience-orbit-dot experience-orbit-dot-b" />
      <div className="experience-orbit-dash experience-orbit-dash-a" />
      <div className="experience-orbit-dash experience-orbit-dash-b" />
      <div className="experience-orbit-dash experience-orbit-dash-c" />
      <div className="experience-orbit-dash experience-orbit-dash-d" />
    </div>
  );
}

export default function ConceptPage() {
  const [activeArea, setActiveArea] = useState<AreaId | null>(null);
  const [isTouchMode, setIsTouchMode] = useState(false);
  const [menuReady, setMenuReady] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const activeAreaConfig = useMemo(
    () => AREAS.find((area) => area.id === activeArea) || null,
    [activeArea]
  );

  useEffect(() => {
    const menuTimer = window.setTimeout(() => {
      setMenuReady(true);
    }, 420);

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
        threshold: 0.16,
        rootMargin: '0px 0px -9% 0px',
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

        <div className="page-texture" aria-hidden="true" />

        <section className="hero-section reveal-section" aria-labelledby="concept-title">
          <div className="hero-black hero-black-left" aria-hidden="true" />
          <div className="hero-black hero-black-right" aria-hidden="true" />

          <div className="hero-inner">
            <div className="hero-copy">
              <p className="kicker">LPX // UNDERGROUND SEQUENCE</p>

              <h1 id="concept-title" className="hero-title">
                CONCEPT.
              </h1>

              <p className="hero-address">17 Little Portland Street, London</p>

              <p className="hero-intro">
                A concealed programme below street level. Dinner, architecture,
                sound and late-night energy arranged as one precise cinematic
                transition.
              </p>

              <div className="hero-actions">
                <a href="#space">The Space</a>
                <a href="#experience">The Experience</a>
              </div>
            </div>

            <div className="hero-visual">
              <CorridorPoster />
            </div>
          </div>
        </section>

        <section
          id="space"
          className="space-section reveal-section"
          aria-labelledby="space-title"
        >
          <div className="space-inner">
            <div className="space-heading">
              <h2 id="space-title" className="section-title section-title-light">
                THE SPACE
              </h2>

              <p>
                Three chambers operate as one underground vessel. Hover or tap to
                isolate each programme.
              </p>
            </div>

            <div className="space-stage">
              <div className="space-stage-frame" />

              <div className="venue-wrap" aria-hidden="true">
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

              <aside className="readout">
                <span className="readout-dot" />
                <p className="readout-label">ACTIVE CHAMBER</p>
                <p className="readout-copy">
                  {activeAreaConfig?.description ||
                    'Select a chamber to isolate the programme inside the space.'}
                </p>
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
          <div className="experience-red-angle" aria-hidden="true" />

          <div className="experience-inner">
            <div className="experience-header">
              <div>
                <h2 id="experience-title" className="section-title section-title-dark">
                  THE EXPERIENCE
                </h2>

                <p className="experience-intro">
                  A precise shift from seated dinner to late-night Little
                  Portland energy. The evening behaves like a signal changing
                  state.
                </p>
              </div>

              <ExperienceOrbit />
            </div>

            <div className="experience-timeline" aria-hidden="true">
              <div className="timeline-times">
                <span>20:00 / 20:30</span>
                <span>22:00</span>
              </div>

              <div className="timeline-track">
                <div className="timeline-line" />
                <div className="timeline-fill" />
                <span className="timeline-dot timeline-dot-left" />
                <span className="timeline-dot timeline-dot-right" />
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
                      '--card-delay': `${440 + index * 120}ms`,
                    } as CSSProperties
                  }
                />
              ))}
            </nav>
          </div>
        </section>
      </main>

      <style jsx global>{`
        html,
        body,
        #__next {
          margin: 0;
          min-height: 100%;
          background: ${C.ink};
          color: ${C.cream};
          font-family: ${MONO};
          -webkit-font-smoothing: antialiased;
          text-rendering: geometricPrecision;
          scrollbar-color: ${C.red} rgba(0, 0, 0, 0.55);
        }

        body {
          overflow-x: hidden;
        }

        * {
          box-sizing: border-box;
        }

        ::selection {
          background: ${C.amber};
          color: ${C.ink};
        }

        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: ${C.ink};
        }

        ::-webkit-scrollbar-thumb {
          background: ${C.red};
          border: 2px solid ${C.ink};
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
          background: rgba(0, 0, 0, 0.68) !important;
          backdrop-filter: blur(18px) !important;
          -webkit-backdrop-filter: blur(18px) !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
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
        .scene-nav-mobile--space a[aria-current='page'],
        .scene-nav--space a[href='/concept'],
        .scene-nav--space a[href='/concept-test'] {
          color: ${C.cream} !important;
          opacity: 1 !important;
        }

        .scene-nav--space a.disabled,
        .scene-nav-mobile--space a.disabled {
          color: ${C.cream} !important;
          opacity: 0.42 !important;
        }

        .scene-nav--space .scene-nav-burger span {
          background: ${C.cream} !important;
        }

        .concept-nav-shell.is-scrolled .scene-nav.scene-nav--space {
          background: rgba(0, 0, 0, 0.82) !important;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.24);
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
            background: rgba(0, 0, 0, 0.88);
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
            background: rgba(0, 0, 0, 0.9) !important;
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
            background: rgba(0, 0, 0, 0.9) !important;
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
            font-size: clamp(16px, 4.6vw, 24px) !important;
            line-height: 1.15 !important;
            letter-spacing: 0.16em !important;
            text-align: center !important;
            color: ${C.cream} !important;
            opacity: 1 !important;
          }
        }

        .page {
          position: relative;
          min-height: 100svh;
          overflow-x: clip;
          background: ${C.ink};
          padding-top: 70px;
        }

        .page-texture {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background-image: url('${ASSETS.texture}');
          background-size: contain;
          background-repeat: repeat;
          background-position: center top;
          opacity: 0.18;
          mix-blend-mode: screen;
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

        .hero-section {
          position: relative;
          z-index: 2;
          min-height: calc(100svh - 70px);
          display: flex;
          align-items: center;
          overflow: hidden;
          background: ${C.red};
        }

        .hero-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.08), transparent 28%),
            repeating-linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.05) 0 1px,
              transparent 1px 6px
            );
          opacity: 0.74;
          pointer-events: none;
        }

        .hero-section::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url('${ASSETS.texture}');
          background-size: cover;
          background-position: center;
          opacity: 0.16;
          mix-blend-mode: multiply;
          pointer-events: none;
        }

        .hero-black {
          position: absolute;
          z-index: 2;
          width: 260px;
          height: 260px;
          background: ${C.black};
          transform: rotate(45deg);
          pointer-events: none;
        }

        .hero-black-left {
          left: -145px;
          top: 35%;
        }

        .hero-black-right {
          right: -145px;
          bottom: -68px;
        }

        .hero-inner {
          position: relative;
          z-index: 4;
          width: min(1380px, 86vw);
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(360px, 0.9fr);
          gap: clamp(42px, 5vw, 88px);
          align-items: center;
          padding: clamp(52px, 6vw, 90px) 0;
        }

        .hero-copy {
          color: ${C.cream};
          min-width: 0;
        }

        .kicker {
          margin: 0 0 18px;
          color: rgba(255, 255, 255, 0.86);
          font-size: 10px;
          line-height: 1.1;
          font-weight: 700;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(10px);
        }

        .hero-section.is-inview .kicker {
          animation: fadeUp 0.45s ease 120ms forwards;
        }

        .hero-title {
          margin: 0;
          color: ${C.cream};
          font-family: ${MONO};
          font-size: clamp(82px, 10.4vw, 164px);
          line-height: 0.86;
          font-weight: 700;
          letter-spacing: -0.07em;
          text-transform: uppercase;
          text-shadow:
            0.022em 0 0 currentColor,
            0 10px 0 rgba(0, 0, 0, 0.16);
          opacity: 0;
          clip-path: inset(0 100% 0 0);
        }

        .hero-section.is-inview .hero-title {
          animation:
            scanTitleReveal 0.46s steps(8, end) 210ms forwards,
            titleIdleGlitch 7.2s steps(2, end) 2600ms infinite;
        }

        .hero-address {
          margin: clamp(20px, 2.1vw, 28px) 0 0;
          color: ${C.black};
          font-size: clamp(15px, 1.35vw, 22px);
          line-height: 1.25;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(10px);
        }

        .hero-section.is-inview .hero-address {
          animation: fadeUp 0.45s ease 520ms forwards;
        }

        .hero-intro {
          max-width: 620px;
          margin: clamp(34px, 4vw, 54px) 0 0;
          color: rgba(255, 255, 255, 0.88);
          font-size: clamp(12px, 0.94vw, 15px);
          line-height: 1.9;
          font-weight: 700;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(10px);
        }

        .hero-section.is-inview .hero-intro {
          animation: fadeUp 0.45s ease 720ms forwards;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 38px;
          opacity: 0;
          transform: translateY(10px);
        }

        .hero-section.is-inview .hero-actions {
          animation: fadeUp 0.45s ease 880ms forwards;
        }

        .hero-actions a {
          min-width: 154px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 18px;
          border: 1px solid rgba(255, 255, 255, 0.46);
          color: ${C.cream};
          text-decoration: none;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          transition:
            background 0.22s ease,
            color 0.22s ease,
            transform 0.22s ease;
        }

        .hero-actions a:hover,
        .hero-actions a:focus-visible {
          background: ${C.cream};
          color: ${C.red};
          transform: translateY(-2px);
          outline: none;
        }

        .hero-visual {
          opacity: 0;
          transform: translateY(18px) scale(0.985);
        }

        .hero-section.is-inview .hero-visual {
          animation: visualIn 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) 380ms forwards;
        }

        .corridor-poster {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1.08;
          overflow: hidden;
          background: ${C.cream};
          box-shadow:
            0 22px 48px rgba(0, 0, 0, 0.22),
            inset 0 0 0 1px rgba(0, 0, 0, 0.1);
        }

        .corridor-poster::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url('${ASSETS.texture}');
          background-size: cover;
          background-position: center;
          opacity: 0.25;
          mix-blend-mode: multiply;
        }

        .corridor-poster::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, transparent 18%, rgba(238, 36, 29, 0.25) 18.4%, transparent 19%),
            linear-gradient(90deg, transparent 80%, rgba(238, 36, 29, 0.25) 80.4%, transparent 81%);
          pointer-events: none;
        }

        .corridor-depth {
          position: absolute;
          left: 50%;
          top: 50%;
          border: 2px solid rgba(0, 0, 0, 0.13);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
        }

        .corridor-depth-1 {
          width: 72%;
          height: 72%;
        }

        .corridor-depth-2 {
          width: 47%;
          height: 47%;
        }

        .corridor-depth-3 {
          width: 22%;
          height: 22%;
        }

        .corridor-core {
          position: absolute;
          left: 50%;
          top: 50%;
          z-index: 3;
          width: 78px;
          height: 78px;
          border-radius: 50%;
          background: ${C.amber};
          border: 7px solid ${C.ink};
          transform: translate(-50%, -50%);
          box-shadow: 0 14px 22px rgba(0, 0, 0, 0.22);
        }

        .corridor-core-shadow {
          position: absolute;
          left: 50%;
          top: 50%;
          z-index: 2;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,0,0,0.22), transparent 68%);
          transform: translate(-50%, -50%);
          filter: blur(8px);
        }

        .corridor-panel {
          position: absolute;
          z-index: 2;
          background: ${C.ink};
        }

        .corridor-panel-a {
          left: 11%;
          top: 12%;
          width: 72px;
          height: 72px;
          transform: rotate(45deg);
        }

        .corridor-panel-b {
          right: 10%;
          top: 18%;
          width: 72px;
          height: 72px;
          transform: rotate(45deg);
        }

        .corridor-panel-c {
          left: 16%;
          bottom: 12%;
          width: 54px;
          height: 54px;
          transform: rotate(45deg);
        }

        .corridor-panel-d {
          right: 15%;
          bottom: 15%;
          width: 56px;
          height: 56px;
          transform: rotate(45deg);
        }

        .corridor-panel-e {
          left: 31%;
          top: 25%;
          width: 18px;
          height: 52px;
          transform: rotate(-28deg);
          opacity: 0.75;
        }

        .corridor-panel-f {
          right: 31%;
          top: 25%;
          width: 18px;
          height: 52px;
          transform: rotate(28deg);
          opacity: 0.75;
        }

        .corridor-panel-g {
          left: 30%;
          bottom: 25%;
          width: 18px;
          height: 52px;
          transform: rotate(28deg);
          opacity: 0.75;
        }

        .corridor-panel-h {
          right: 30%;
          bottom: 25%;
          width: 18px;
          height: 52px;
          transform: rotate(-28deg);
          opacity: 0.75;
        }

        .poster-funnel {
          position: absolute;
          z-index: 6;
          right: 2%;
          top: 14%;
          width: 46%;
          pointer-events: none;
          user-select: none;
          filter: drop-shadow(0 10px 18px rgba(240, 91, 147, 0.16));
          animation: funnelFloat 5.8s ease-in-out infinite;
        }

        .poster-obelisk {
          position: absolute;
          z-index: 5;
          right: 15%;
          bottom: 14%;
          width: 21%;
          pointer-events: none;
          user-select: none;
          filter: drop-shadow(0 20px 28px rgba(0, 0, 0, 0.28));
          animation: obeliskFloat 6.4s ease-in-out infinite;
        }

        .space-section {
          position: relative;
          z-index: 2;
          overflow: hidden;
          background: ${C.black};
          padding: clamp(72px, 8vw, 120px) 5vw clamp(76px, 8vw, 124px);
        }

        .space-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px),
            radial-gradient(circle at 9% 18%, rgba(238, 36, 29, 0.22), transparent 28%),
            radial-gradient(circle at 94% 82%, rgba(238, 36, 29, 0.16), transparent 32%);
          background-size: 92px 92px, 92px 92px, auto, auto;
          opacity: 0.62;
          pointer-events: none;
        }

        .space-inner,
        .experience-inner {
          position: relative;
          z-index: 3;
          width: min(1500px, 100%);
          margin: 0 auto;
        }

        .space-heading {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(300px, 430px);
          gap: 40px;
          align-items: start;
          margin-bottom: clamp(34px, 4vw, 52px);
        }

        .section-title {
          margin: 0;
          font-family: ${MONO};
          font-weight: 700;
          line-height: 0.9;
          letter-spacing: -0.055em;
          text-transform: uppercase;
          opacity: 0;
          clip-path: inset(0 100% 0 0);
        }

        .section-title-light {
          color: ${C.cream};
          font-size: clamp(66px, 9vw, 154px);
          text-shadow:
            0.02em 0 0 currentColor,
            0 10px 0 rgba(238, 36, 29, 0.12);
        }

        .section-title-dark {
          color: ${C.ink};
          font-size: clamp(60px, 8vw, 132px);
          text-shadow:
            0.018em 0 0 currentColor,
            0 8px 0 rgba(0, 0, 0, 0.08);
        }

        .reveal-section.is-inview .section-title {
          animation:
            scanTitleReveal 0.48s steps(8, end) 150ms forwards,
            titleIdleGlitch 7.4s steps(2, end) 2600ms infinite;
        }

        .space-heading p {
          margin: 22px 0 0;
          color: rgba(241, 234, 219, 0.74);
          font-size: clamp(12px, 0.95vw, 15px);
          line-height: 1.9;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(10px);
        }

        .space-section.is-inview .space-heading p {
          animation: fadeUp 0.5s ease 420ms forwards;
        }

        .space-stage {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 1fr) 300px;
          gap: 22px;
          align-items: stretch;
          margin-bottom: 22px;
        }

        .space-stage-frame {
          position: absolute;
          inset: 0 322px 0 0;
          border: 1px solid rgba(241, 234, 219, 0.13);
          pointer-events: none;
        }

        .space-stage-frame::before {
          content: '';
          position: absolute;
          inset: 0 auto 0 0;
          width: 34%;
          background: linear-gradient(90deg, rgba(238, 36, 29, 0.28), transparent);
        }

        .venue-wrap {
          position: relative;
          z-index: 3;
          width: 100%;
          aspect-ratio: 2048 / 1140;
          align-self: center;
          opacity: 0;
          transform: translateY(20px) scale(0.985);
        }

        .space-section.is-inview .venue-wrap {
          animation:
            visualIn 0.72s cubic-bezier(0.2, 0.8, 0.2, 1) 320ms forwards,
            venueFloat 5.4s ease-in-out 1.4s infinite;
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
            saturate(0.9)
            contrast(1.04)
            drop-shadow(0 18px 32px rgba(0,0,0,0.36))
            drop-shadow(0 36px 64px rgba(0,0,0,0.28));
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
            drop-shadow(0 0 12px rgba(240, 91, 147, 0.28))
            hue-rotate(-16deg)
            saturate(1.22);
          animation: venueGlitchA 8.5s steps(1, end) 1800ms infinite;
        }

        .space-section.is-inview .venue-glitch-b {
          filter:
            drop-shadow(0 0 12px rgba(255, 255, 255, 0.12))
            hue-rotate(18deg)
            saturate(1.08);
          animation: venueGlitchB 8.5s steps(1, end) 1800ms infinite;
        }

        .readout {
          position: relative;
          z-index: 3;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 32px 0 32px 24px;
          border-left: 1px solid rgba(241, 234, 219, 0.18);
          opacity: 0;
          transform: translateY(12px);
        }

        .space-section.is-inview .readout {
          animation: fadeUp 0.5s ease 520ms forwards;
        }

        .readout-dot {
          width: 18px;
          height: 18px;
          display: block;
          border-radius: 50%;
          margin-bottom: 24px;
          background: ${C.red};
          box-shadow: 0 0 0 8px rgba(238, 36, 29, 0.12);
          animation: pulse 2.5s ease-in-out infinite;
        }

        .readout-label {
          margin: 0 0 14px;
          color: ${C.red};
          font-size: 10px;
          line-height: 1;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .readout-copy {
          margin: 0;
          color: rgba(241, 234, 219, 0.74);
          font-size: clamp(11px, 0.92vw, 14px);
          line-height: 1.9;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .zone-controls {
          position: relative;
          z-index: 4;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .experience-section {
          position: relative;
          z-index: 2;
          overflow: hidden;
          background: ${C.cream};
          color: ${C.ink};
          padding: clamp(72px, 8vw, 116px) 5vw clamp(76px, 8vw, 124px);
        }

        .experience-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url('${ASSETS.texture}');
          background-size: cover;
          background-position: center;
          opacity: 0.16;
          mix-blend-mode: multiply;
          pointer-events: none;
        }

        .experience-red-angle {
          position: absolute;
          left: 0;
          top: 0;
          width: 30vw;
          height: 30vw;
          min-width: 300px;
          min-height: 300px;
          background: ${C.red};
          clip-path: polygon(0 0, 100% 0, 0 100%);
          pointer-events: none;
        }

        .experience-header {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(260px, 390px);
          gap: 42px;
          align-items: start;
        }

        .experience-intro {
          max-width: 620px;
          margin: 28px 0 0;
          color: rgba(9, 9, 9, 0.72);
          font-size: clamp(12px, 0.95vw, 15px);
          line-height: 1.85;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(10px);
        }

        .experience-section.is-inview .experience-intro {
          animation: fadeUp 0.5s ease 420ms forwards;
        }

        .experience-orbit {
          position: relative;
          width: min(360px, 27vw);
          aspect-ratio: 1;
          justify-self: end;
          opacity: 0;
          transform: translateY(16px) scale(0.985);
        }

        .experience-section.is-inview .experience-orbit {
          animation: visualIn 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) 320ms forwards;
        }

        .experience-orbit-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 10px solid ${C.black};
          animation: slowSpin 14s linear infinite;
        }

        .experience-orbit-core {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 76px;
          height: 76px;
          border-radius: 50%;
          background: ${C.amber};
          border: 7px solid ${C.black};
          transform: translate(-50%, -50%);
        }

        .experience-orbit-dot {
          position: absolute;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 5px solid ${C.black};
        }

        .experience-orbit-dot-a {
          left: -6px;
          top: 50%;
          background: ${C.red};
          transform: translateY(-50%);
        }

        .experience-orbit-dot-b {
          right: -6px;
          top: 12%;
          background: ${C.cream};
        }

        .experience-orbit-dash {
          position: absolute;
          width: 20px;
          height: 52px;
          background: ${C.black};
          opacity: 0.86;
        }

        .experience-orbit-dash-a {
          left: 23%;
          top: 14%;
          transform: rotate(-30deg);
        }

        .experience-orbit-dash-b {
          right: 23%;
          top: 14%;
          transform: rotate(30deg);
        }

        .experience-orbit-dash-c {
          left: 23%;
          bottom: 14%;
          transform: rotate(30deg);
        }

        .experience-orbit-dash-d {
          right: 23%;
          bottom: 14%;
          transform: rotate(-30deg);
        }

        .experience-timeline {
          margin-top: clamp(42px, 5vw, 70px);
          margin-bottom: 24px;
          opacity: 0;
          transform: translateY(10px);
        }

        .experience-section.is-inview .experience-timeline {
          animation: fadeUp 0.5s ease 520ms forwards;
        }

        .timeline-times {
          display: flex;
          justify-content: space-between;
          margin-bottom: 16px;
          color: rgba(9, 9, 9, 0.62);
          font-size: clamp(12px, 1vw, 16px);
          line-height: 1;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .timeline-track {
          position: relative;
          height: 22px;
        }

        .timeline-line,
        .timeline-fill {
          position: absolute;
          left: 0;
          right: 0;
          top: 50%;
          height: 2px;
          transform: translateY(-50%);
          transform-origin: left center;
        }

        .timeline-line {
          background: rgba(9, 9, 9, 0.24);
        }

        .timeline-fill {
          background: ${C.red};
          animation: signalFillLoop 8.8s ease-in-out infinite;
        }

        .timeline-dot {
          position: absolute;
          top: 50%;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #9A948B;
          transform: translateY(-50%);
        }

        .timeline-dot-left {
          left: 0;
          animation: leftDotLoop 8.8s ease-in-out infinite;
        }

        .timeline-dot-right {
          right: 0;
          animation: rightDotLoop 8.8s ease-in-out infinite;
        }

        .experience-nav {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .action-card {
          position: relative;
          min-height: clamp(88px, 7vw, 114px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 6px;
          padding: 18px 22px;
          text-decoration: none;
          overflow: hidden;
          opacity: 0;
          transform: translateY(12px);
          transition:
            transform 0.24s ease,
            background 0.24s ease,
            color 0.24s ease,
            box-shadow 0.24s ease,
            border-color 0.24s ease;
        }

        .space-section .action-card {
          background: rgba(255,255,255,0.02);
          color: ${C.cream};
          border: 1px solid rgba(241,234,219,0.2);
        }

        .experience-section .action-card {
          background: rgba(255,255,255,0.28);
          color: ${C.ink};
          border: 1px solid rgba(9,9,9,0.24);
        }

        .action-card.is-dark {
          background: ${C.ink};
          color: ${C.cream};
          border-color: ${C.ink};
        }

        .reveal-section.is-inview .action-card {
          animation: cardIn 0.54s ease var(--card-delay, 320ms) forwards;
        }

        .action-card::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.24s ease;
        }

        .space-section .action-card::before {
          background:
            linear-gradient(135deg, rgba(238, 36, 29, 0.18), transparent 45%),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 11px);
        }

        .experience-section .action-card::before {
          background:
            linear-gradient(135deg, rgba(238, 36, 29, 0.1), transparent 45%),
            repeating-linear-gradient(90deg, rgba(9,9,9,0.05) 0 1px, transparent 1px 11px);
        }

        .action-card-title,
        .action-card-meta {
          position: relative;
          z-index: 1;
        }

        .action-card-title {
          display: block;
          font-size: clamp(18px, 1.8vw, 30px);
          line-height: 0.95;
          font-weight: 700;
          letter-spacing: 0;
          text-transform: uppercase;
          text-shadow: 0.012em 0 0 currentColor;
        }

        .action-card-meta {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 10px;
          line-height: 1;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .space-section .action-card-meta {
          color: rgba(241, 234, 219, 0.62);
        }

        .experience-section .action-card-meta {
          color: rgba(9, 9, 9, 0.56);
        }

        .action-card.is-dark .action-card-meta {
          color: rgba(241, 234, 219, 0.66);
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
          transform: translate(-3px, -3px);
          outline: none;
        }

        .space-section .action-card:hover,
        .space-section .action-card:focus-visible,
        .space-section .action-card.is-active {
          background: rgba(238, 36, 29, 0.08);
          border-color: rgba(241,234,219,0.34);
          box-shadow: 10px 10px 0 rgba(238, 36, 29, 0.14);
        }

        .experience-section .action-card:hover,
        .experience-section .action-card:focus-visible,
        .experience-section .action-card.is-active {
          background: rgba(238, 36, 29, 0.08);
          border-color: rgba(9,9,9,0.34);
          box-shadow: 8px 8px 0 rgba(238, 36, 29, 0.12);
        }

        .action-card:hover::before,
        .action-card:focus-visible::before,
        .action-card.is-active::before {
          opacity: 1;
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

        @keyframes scanTitleReveal {
          0% {
            opacity: 0;
            clip-path: inset(0 100% 0 0);
            transform: translateX(-10px);
            filter: blur(2px);
          }

          64% {
            opacity: 1;
            clip-path: inset(0 0 0 0);
            transform: translateX(0);
            filter: blur(0);
          }

          75% {
            transform: translateX(4px);
          }

          84% {
            transform: translateX(-2px);
          }

          100% {
            opacity: 1;
            clip-path: inset(0 0 0 0);
            transform: translateX(0);
            filter: blur(0);
          }
        }

        @keyframes titleIdleGlitch {
          0%,
          92%,
          100% {
            filter: none;
            transform: translateX(0);
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

        @keyframes funnelFloat {
          0%,
          100% {
            transform: translateY(0) scale(1);
            opacity: 0.96;
          }

          50% {
            transform: translateY(-7px) scale(1.015);
            opacity: 1;
          }
        }

        @keyframes obeliskFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-9px);
          }
        }

        @keyframes venueFloat {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }

          50% {
            transform: translateY(-9px) scale(1);
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
            opacity: 0.16;
            transform: translate3d(-8px, -3px, 0);
            clip-path: inset(0% 0 82% 0);
          }

          74% {
            opacity: 0.22;
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
            opacity: 0.12;
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
            opacity: 0.1;
            transform: translate3d(7px, 5px, 0);
            clip-path: inset(8% 0 72% 0);
          }

          74.1% {
            opacity: 0.16;
            transform: translate3d(-10px, -3px, 0);
            clip-path: inset(24% 0 46% 0);
          }

          75.2% {
            opacity: 0.12;
            transform: translate3d(6px, -7px, 0);
            clip-path: inset(44% 0 24% 0);
          }

          76.1% {
            opacity: 0.16;
            transform: translate3d(-8px, 6px, 0);
            clip-path: inset(63% 0 9% 0);
          }

          77.2% {
            opacity: 0.08;
            transform: translate3d(4px, -2px, 0);
            clip-path: inset(82% 0 0% 0);
          }

          78% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
            clip-path: inset(0 0 0 0);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            box-shadow: 0 0 0 8px rgba(238, 36, 29, 0.12);
          }

          50% {
            box-shadow: 0 0 0 15px rgba(238, 36, 29, 0);
          }
        }

        @keyframes slowSpin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes signalFillLoop {
          0%,
          18% {
            transform: translateY(-50%) scaleX(0);
            opacity: 0;
          }

          24% {
            transform: translateY(-50%) scaleX(0);
            opacity: 1;
          }

          58% {
            transform: translateY(-50%) scaleX(1);
            opacity: 1;
          }

          76%,
          100% {
            transform: translateY(-50%) scaleX(1);
            opacity: 0;
          }
        }

        @keyframes leftDotLoop {
          0%,
          18% {
            background: #9A948B;
          }

          24%,
          64% {
            background: ${C.red};
          }

          78%,
          100% {
            background: #9A948B;
          }
        }

        @keyframes rightDotLoop {
          0%,
          48% {
            background: #9A948B;
          }

          58%,
          72% {
            background: ${C.red};
          }

          84%,
          100% {
            background: #9A948B;
          }
        }

        @keyframes cardIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 1180px) {
          .hero-inner {
            grid-template-columns: 1fr;
          }

          .hero-visual {
            width: min(620px, 100%);
            margin: 0 auto;
          }

          .space-heading,
          .space-stage,
          .experience-header {
            grid-template-columns: 1fr;
          }

          .space-stage-frame {
            inset: 0;
          }

          .readout {
            border-left: 0;
            border-top: 1px solid rgba(241, 234, 219, 0.18);
            padding: 24px 0 0;
          }

          .experience-orbit {
            justify-self: start;
          }
        }

        @media (max-width: 980px) {
          .zone-controls {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 820px) {
          .page {
            padding-top: 72px;
          }

          .hero-section {
            min-height: auto;
          }

          .hero-inner {
            width: calc(100% - 34px);
            padding: 42px 0 54px;
            gap: 28px;
          }

          .hero-title {
            font-size: clamp(60px, 17vw, 104px);
          }

          .hero-address {
            font-size: 12px;
            letter-spacing: 0.16em;
          }

          .hero-intro {
            margin-top: 28px;
            font-size: 11px;
          }

          .hero-actions {
            margin-top: 28px;
          }

          .hero-black {
            width: 140px;
            height: 140px;
          }

          .hero-black-left {
            left: -82px;
            top: 20%;
          }

          .hero-black-right {
            right: -84px;
            bottom: -44px;
          }

          .corridor-core {
            width: 58px;
            height: 58px;
            border-width: 5px;
          }

          .space-section,
          .experience-section {
            padding: 58px 22px 64px;
          }

          .section-title-light,
          .section-title-dark {
            font-size: clamp(48px, 13vw, 78px);
          }

          .space-heading {
            gap: 18px;
          }

          .space-heading p,
          .experience-intro {
            font-size: 11px;
          }

          .venue-wrap {
            margin-top: 10px;
          }

          .experience-orbit {
            width: min(280px, 60vw);
          }

          .experience-nav {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
          }

          .action-card {
            min-height: 86px;
            padding: 14px 12px;
          }

          .experience-nav .action-card-title {
            font-size: clamp(14px, 4vw, 18px);
            white-space: nowrap;
          }

          .experience-nav .action-card-meta {
            font-size: 8px;
          }
        }

        @media (max-width: 620px) {
          .hero-actions {
            flex-direction: column;
          }

          .hero-actions a {
            width: 100%;
          }

          .timeline-times {
            font-size: 10px;
            letter-spacing: 0.08em;
          }

          .timeline-dot {
            width: 16px;
            height: 16px;
          }

          .corridor-poster {
            aspect-ratio: 1 / 1.16;
          }

          .corridor-panel-a,
          .corridor-panel-b {
            width: 54px;
            height: 54px;
          }

          .corridor-panel-c,
          .corridor-panel-d {
            width: 42px;
            height: 42px;
          }

          .poster-funnel {
            width: 52%;
          }

          .poster-obelisk {
            width: 23%;
          }
        }

        @media (max-width: 480px) {
          .hero-inner {
            width: calc(100% - 28px);
          }

          .kicker {
            font-size: 8px;
          }

          .hero-title {
            font-size: clamp(54px, 16vw, 74px);
          }

          .hero-address {
            font-size: 10px;
          }

          .experience-nav .action-card {
            min-height: 82px;
            padding: 13px 9px;
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
          .kicker,
          .hero-title,
          .hero-address,
          .hero-intro,
          .hero-actions,
          .hero-visual,
          .section-title,
          .space-heading p,
          .venue-wrap,
          .venue-glitch-a,
          .venue-glitch-b,
          .readout,
          .experience-intro,
          .experience-orbit,
          .timeline-fill,
          .timeline-dot,
          .action-card,
          .poster-funnel,
          .poster-obelisk,
          .experience-orbit-ring {
            animation: none !important;
            transition: none !important;
          }

          .concept-nav-shell,
          .kicker,
          .hero-title,
          .hero-address,
          .hero-intro,
          .hero-actions,
          .hero-visual,
          .section-title,
          .space-heading p,
          .venue-wrap,
          .readout,
          .experience-intro,
          .experience-orbit,
          .action-card {
            opacity: 1 !important;
            transform: none !important;
          }

          .hero-title,
          .section-title {
            clip-path: inset(0 0 0 0) !important;
          }
        }
      `}</style>
    </>
  );
}

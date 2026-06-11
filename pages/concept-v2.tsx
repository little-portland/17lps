'use client';

import Head from 'next/head';
import { useEffect, useMemo, useState, type CSSProperties, type MouseEvent } from 'react';
import SceneNav from '@components/SceneNav';

const C = {
  red: '#ED221D',
  redDark: '#B61512',
  cream: '#EFE8DB',
  creamDeep: '#E8E0D0',
  black: '#060606',
  ink: '#12110F',
  pink: '#EC5B95',
  amber: '#F2B233',
  muted: '#8C857D',
  lineDark: 'rgba(255,255,255,0.10)',
  lineLight: 'rgba(0,0,0,0.14)',
} as const;

const MONO = '"Space Mono", "Courier New", monospace';

type AreaId = 'tent' | 'chefs-studio' | 'studio';

type AreaConfig = {
  id: AreaId;
  title: string;
  href: string;
  highlight: string;
  chars: number;
  description: string;
};

const ASSETS = {
  bg: '/images/concept/concept_bg.jpg',
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
    chars: 8,
    description:
      'A concealed dining chamber built for close, theatrical evenings and intimate hospitality.',
  },
  {
    id: 'chefs-studio',
    title: "CHEF'S STUDIO",
    href: '/chefstudio-test',
    highlight: '/images/concept/chefs-studio-highlight.png',
    chars: 13,
    description:
      'An intimate studio for food-led performance, private gatherings and controlled spectacle.',
  },
  {
    id: 'studio',
    title: 'THE STUDIO',
    href: '/studio-test',
    highlight: '/images/concept/studio-highlight.png',
    chars: 10,
    description:
      'A cultural room for sound, conversation and after-dark transmission beneath street level.',
  },
];

const EXPERIENCE_BTNS = [
  { label: 'Dining', href: '/food-test', dark: false },
  { label: 'After Dark', href: '/theclub-test', dark: true },
];

const typeStyle = (chars: number, delay: string): CSSProperties =>
  ({
    '--chars': chars,
    '--type-delay': delay,
  }) as CSSProperties;

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

function OrbitPosterGraphic() {
  return (
    <div className="poster-orbit" aria-hidden="true">
      <div className="poster-ring poster-ring-1" />
      <div className="poster-ring poster-ring-2" />
      <div className="poster-ring poster-ring-3" />
      <div className="poster-sun" />

      <div className="poster-dash poster-dash-a" />
      <div className="poster-dash poster-dash-b" />
      <div className="poster-dash poster-dash-c" />
      <div className="poster-dash poster-dash-d" />
      <div className="poster-dash poster-dash-e" />
      <div className="poster-dash poster-dash-f" />
      <div className="poster-diamond poster-diamond-a" />
      <div className="poster-diamond poster-diamond-b" />
      <div className="poster-diamond poster-diamond-c" />
      <div className="poster-diamond poster-diamond-d" />
    </div>
  );
}

function ExperienceOrbit() {
  return (
    <div className="exp-orbit" aria-hidden="true">
      <div className="exp-orbit-ring" />
      <div className="exp-orbit-center" />
      <div className="exp-orbit-dot exp-orbit-dot-a" />
      <div className="exp-orbit-dot exp-orbit-dot-b" />
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
    }, 500);

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
        threshold: 0.15,
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

        <div className="page-noise" aria-hidden="true" />

        <section className="hero-section reveal-section" aria-labelledby="concept-title">
          <div className="hero-corner hero-corner-left" aria-hidden="true" />
          <div className="hero-corner hero-corner-right" aria-hidden="true" />

          <div className="hero-inner">
            <div className="hero-copy">
              <p className="hero-kicker">
                <span className="type-text" style={typeStyle(31, '380ms')}>
                  LPX // UNDERGROUND TRANSMISSION
                </span>
              </p>

              <h1 id="concept-title" className="hero-title">
                CONCEPT
              </h1>

              <p className="hero-address">
                <span className="type-text" style={typeStyle(33, '650ms')}>
                  17 Little Portland Street, London
                </span>
              </p>

              <p className="hero-intro">
                A concealed programme below street level. Dining, sound,
                architecture and after-dark energy arranged as a single
                cinematic sequence.
              </p>

              <div className="hero-actions">
                <a href="#the-space">The Space</a>
                <a href="#the-experience">The Experience</a>
              </div>
            </div>

            <div className="hero-poster" aria-hidden="true">
              <div className="poster-frame">
                <div className="poster-vertical poster-vertical-left" />
                <div className="poster-vertical poster-vertical-right" />

                <OrbitPosterGraphic />

                <div className="poster-black-square poster-black-square-a" />
                <div className="poster-black-square poster-black-square-b" />
                <div className="poster-black-square poster-black-square-c" />

                <div className="poster-shadow" />
                <img
                  src={ASSETS.obelisk}
                  alt=""
                  className="poster-obelisk"
                  draggable={false}
                />
                <img
                  src={ASSETS.funnel}
                  alt=""
                  className="poster-funnel"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="the-space"
          className="space-section reveal-section"
          aria-labelledby="space-title"
        >
          <div className="space-grid" aria-hidden="true" />

          <div className="space-header">
            <h2 id="space-title" className="section-title section-title-space">
              THE SPACE
            </h2>

            <p className="space-header-copy">
              THREE CHAMBERS OPERATE AS ONE UNDERGROUND VESSEL. HOVER OR TAP TO
              ISOLATE EACH PROGRAMME.
            </p>
          </div>

          <div className="space-panel">
            <div className="space-panel-glow" aria-hidden="true" />

            <div className="space-map">
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
            </div>

            <aside className="space-readout">
              <span className="readout-dot" />
              <p className="readout-label">ACTIVE CHAMBER</p>
              <p className="readout-copy">
                {activeAreaConfig?.description ||
                  'SELECT A CHAMBER TO ISOLATE THE PROGRAMME INSIDE THE SPACE.'}
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
                      '--card-delay': `${240 + index * 110}ms`,
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
          <div className="experience-angle" aria-hidden="true" />

          <div className="experience-top">
            <div className="experience-copy">
              <h2 id="experience-title" className="section-title section-title-experience">
                THE EXPERIENCE
              </h2>

              <p className="experience-copy-text">
                A precise shift from seated dinner to late-night Little Portland
                energy. The evening behaves like a signal changing state.
              </p>
            </div>

            <div className="experience-orbit-wrap">
              <ExperienceOrbit />
            </div>
          </div>

          <div className="experience-timeline" aria-hidden="true">
            <div className="timeline-row">
              <span>20:00 / 20:30</span>
              <span>22:00</span>
            </div>

            <div className="timeline-line-wrap">
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
          scrollbar-color: ${C.red} rgba(255,255,255,0.12);
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
          color: ${C.cream} !important;
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
          background: rgba(6, 6, 6, 0.72) !important;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.22);
          backdrop-filter: blur(18px) !important;
          -webkit-backdrop-filter: blur(18px) !important;
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
            background: rgba(6, 6, 6, 0.9);
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
            background: rgba(6, 6, 6, 0.9) !important;
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
            background: rgba(6, 6, 6, 0.9) !important;
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
          background: ${C.black};
          padding-top: 76px;
        }

        .page-noise {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background-image: url('${ASSETS.bg}');
          background-size: contain;
          background-repeat: repeat;
          background-position: center top;
          opacity: 0.12;
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
          overflow: hidden;
          background: ${C.red};
          min-height: calc(100svh - 76px);
          display: flex;
          align-items: center;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.07) 0, transparent 22%),
            repeating-linear-gradient(
              180deg,
              rgba(255,255,255,0.035) 0 1px,
              transparent 1px 6px
            );
          opacity: 0.6;
          pointer-events: none;
        }

        .hero-corner {
          position: absolute;
          z-index: 1;
          width: 230px;
          height: 230px;
          background: ${C.black};
          transform: rotate(45deg);
          opacity: 1;
          pointer-events: none;
        }

        .hero-corner-left {
          left: -120px;
          top: 28%;
        }

        .hero-corner-right {
          right: -130px;
          bottom: -60px;
        }

        .hero-inner {
          position: relative;
          z-index: 3;
          width: min(1360px, 86vw);
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(360px, 0.86fr);
          gap: clamp(36px, 5vw, 86px);
          align-items: center;
          padding: clamp(56px, 7vw, 92px) 0;
        }

        .hero-copy {
          min-width: 0;
          color: ${C.cream};
        }

        .hero-kicker {
          margin: 0 0 18px 0;
          font-size: 10px;
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: 0.24em;
          color: rgba(255,255,255,0.88);
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(10px);
        }

        .hero-section.is-inview .hero-kicker {
          animation: fadeUp 0.45s ease 120ms forwards;
        }

        .type-text {
          display: inline-block;
          white-space: nowrap;
          overflow: hidden;
          clip-path: inset(0 100% 0 0);
        }

        .hero-section.is-inview .type-text {
          animation: typeReveal 0.5s steps(var(--chars), end) var(--type-delay) forwards;
        }

        .hero-title {
          margin: 0;
          font-family: ${MONO};
          font-size: clamp(92px, 10.2vw, 168px);
          line-height: 0.88;
          letter-spacing: -0.06em;
          font-weight: 700;
          text-transform: uppercase;
          color: ${C.cream};
          text-shadow:
            0.02em 0 0 currentColor,
            0 9px 0 rgba(0, 0, 0, 0.16);
          opacity: 0;
          clip-path: inset(0 100% 0 0);
        }

        .hero-section.is-inview .hero-title {
          animation:
            scanTitleReveal 0.48s steps(8, end) 220ms forwards,
            titleMicroGlitch 0.48s steps(2, end) 760ms forwards,
            titleIdleGlitch 7.5s steps(2, end) 3000ms infinite;
        }

        .hero-address {
          margin: 24px 0 0 0;
          font-size: clamp(16px, 1.38vw, 22px);
          line-height: 1.3;
          font-weight: 700;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: ${C.black};
        }

        .hero-intro {
          max-width: 660px;
          margin: 44px 0 0 0;
          font-size: clamp(13px, 0.98vw, 16px);
          line-height: 1.9;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.9);
          opacity: 0;
          transform: translateY(10px);
        }

        .hero-section.is-inview .hero-intro {
          animation: fadeUp 0.5s ease 780ms forwards;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 42px;
          opacity: 0;
          transform: translateY(10px);
        }

        .hero-section.is-inview .hero-actions {
          animation: fadeUp 0.5s ease 940ms forwards;
        }

        .hero-actions a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 150px;
          padding: 12px 18px;
          color: ${C.cream};
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.45);
          background: transparent;
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

        .hero-poster {
          opacity: 0;
          transform: translateY(20px) scale(0.985);
        }

        .hero-section.is-inview .hero-poster {
          animation: visualIn 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 420ms forwards;
        }

        .poster-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1.06;
          background: ${C.cream};
          overflow: hidden;
          box-shadow:
            0 20px 50px rgba(0,0,0,0.2),
            inset 0 0 0 1px rgba(0,0,0,0.08);
        }

        .poster-frame::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url('${ASSETS.bg}');
          background-size: cover;
          background-position: center;
          opacity: 0.18;
          mix-blend-mode: multiply;
        }

        .poster-vertical {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 6px;
          background: rgba(236, 91, 149, 0.42);
          z-index: 1;
        }

        .poster-vertical-left {
          left: 20%;
        }

        .poster-vertical-right {
          right: 20%;
        }

        .poster-orbit {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .poster-ring {
          position: absolute;
          left: 50%;
          top: 50%;
          border: 2px solid rgba(18, 17, 15, 0.18);
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }

        .poster-ring-1 {
          width: 68%;
          height: 68%;
        }

        .poster-ring-2 {
          width: 43%;
          height: 43%;
        }

        .poster-ring-3 {
          width: 22%;
          height: 22%;
        }

        .poster-sun {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: ${C.amber};
          border: 6px solid rgba(18, 17, 15, 0.82);
          transform: translate(-50%, -50%);
          box-shadow: 0 12px 22px rgba(0,0,0,0.18);
        }

        .poster-dash {
          position: absolute;
          background: rgba(18, 17, 15, 0.7);
          width: 18px;
          height: 54px;
        }

        .poster-dash-a { left: 36%; top: 18%; transform: rotate(-29deg); }
        .poster-dash-b { left: 62%; top: 18%; transform: rotate(29deg); }
        .poster-dash-c { left: 31%; top: 34%; transform: rotate(-31deg); height: 40px; }
        .poster-dash-d { right: 31%; top: 34%; transform: rotate(31deg); height: 40px; }
        .poster-dash-e { left: 31%; bottom: 18%; transform: rotate(29deg); }
        .poster-dash-f { right: 31%; bottom: 18%; transform: rotate(-29deg); }

        .poster-diamond {
          position: absolute;
          background: rgba(18, 17, 15, 0.86);
          transform: rotate(45deg);
        }

        .poster-diamond-a {
          width: 42px;
          height: 42px;
          left: 49%;
          top: 22%;
          margin-left: -21px;
        }

        .poster-diamond-b {
          width: 30px;
          height: 30px;
          left: 49%;
          bottom: 22%;
          margin-left: -15px;
        }

        .poster-diamond-c {
          width: 72px;
          height: 72px;
          left: 9%;
          bottom: 16%;
        }

        .poster-diamond-d {
          width: 96px;
          height: 96px;
          left: 10%;
          top: 10%;
        }

        .poster-black-square {
          position: absolute;
          background: ${C.black};
          transform: rotate(45deg);
          z-index: 2;
        }

        .poster-black-square-a {
          width: 96px;
          height: 96px;
          left: 10%;
          top: 10%;
        }

        .poster-black-square-b {
          width: 64px;
          height: 64px;
          left: 12%;
          bottom: 14%;
        }

        .poster-black-square-c {
          width: 80px;
          height: 80px;
          right: 12%;
          top: 48%;
        }

        .poster-shadow {
          position: absolute;
          right: 10%;
          bottom: 10%;
          width: 44%;
          height: 13%;
          background: radial-gradient(ellipse at center, rgba(0,0,0,0.18), transparent 72%);
          filter: blur(12px);
          z-index: 2;
        }

        .poster-obelisk {
          position: absolute;
          right: 13%;
          bottom: 14%;
          width: 20%;
          z-index: 4;
          filter: drop-shadow(0 16px 26px rgba(0,0,0,0.24));
          animation: obeliskFloat 6.5s ease-in-out infinite;
        }

        .poster-funnel {
          position: absolute;
          right: 2%;
          top: 12%;
          width: 46%;
          z-index: 5;
          opacity: 0.96;
          filter: drop-shadow(0 10px 18px rgba(236, 91, 149, 0.14));
          animation: funnelPulse 6.2s ease-in-out infinite;
        }

        .space-section {
          position: relative;
          z-index: 2;
          padding: clamp(70px, 7vw, 110px) 5vw clamp(72px, 7vw, 110px);
          background: ${C.black};
          overflow: hidden;
        }

        .space-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px);
          background-size: 96px 96px;
          opacity: 0.26;
        }

        .space-grid::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 8% 20%, rgba(237, 34, 29, 0.28), transparent 24%),
            radial-gradient(circle at 88% 80%, rgba(237, 34, 29, 0.14), transparent 28%);
        }

        .space-header {
          position: relative;
          z-index: 3;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(280px, 420px);
          gap: 30px;
          align-items: start;
          margin-bottom: 38px;
        }

        .section-title {
          margin: 0;
          font-family: ${MONO};
          font-weight: 700;
          line-height: 0.9;
          text-transform: uppercase;
          letter-spacing: -0.055em;
          opacity: 0;
          clip-path: inset(0 100% 0 0);
        }

        .section-title-space {
          color: ${C.cream};
          font-size: clamp(64px, 9vw, 160px);
          text-shadow:
            0.02em 0 0 currentColor,
            0 8px 0 rgba(237, 34, 29, 0.1);
        }

        .section-title-experience {
          color: ${C.ink};
          font-size: clamp(62px, 8vw, 132px);
          text-shadow:
            0.02em 0 0 currentColor,
            0 8px 0 rgba(0, 0, 0, 0.08);
        }

        .reveal-section.is-inview .section-title {
          animation:
            scanTitleReveal 0.48s steps(8, end) 180ms forwards,
            titleMicroGlitch 0.48s steps(2, end) 720ms forwards,
            titleIdleGlitch 7.5s steps(2, end) 3000ms infinite;
        }

        .space-header-copy {
          margin: 18px 0 0 0;
          font-size: clamp(12px, 0.92vw, 15px);
          line-height: 1.9;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(239, 232, 219, 0.76);
          opacity: 0;
          transform: translateY(10px);
        }

        .space-section.is-inview .space-header-copy {
          animation: fadeUp 0.5s ease 400ms forwards;
        }

        .space-panel {
          position: relative;
          z-index: 3;
          display: grid;
          grid-template-columns: minmax(0, 1fr) 280px;
          gap: 18px;
          align-items: stretch;
          margin-bottom: 24px;
        }

        .space-panel-glow {
          position: absolute;
          inset: 0 auto 0 0;
          width: 34%;
          background: linear-gradient(90deg, rgba(237, 34, 29, 0.34), transparent);
          pointer-events: none;
          opacity: 0.7;
        }

        .space-map {
          position: relative;
          min-height: clamp(360px, 34vw, 540px);
          border: 1px solid rgba(255,255,255,0.14);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(26px, 3vw, 40px);
          background: rgba(0,0,0,0.22);
          opacity: 0;
          transform: translateY(16px) scale(0.99);
        }

        .space-section.is-inview .space-map {
          animation: visualIn 0.72s cubic-bezier(0.2, 0.8, 0.2, 1) 300ms forwards;
        }

        .venue-wrap {
          position: relative;
          width: min(100%, 960px);
          aspect-ratio: 2048 / 1140;
          animation: venueFloat 5.5s ease-in-out 1.4s infinite;
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
            saturate(0.84)
            contrast(1.04)
            drop-shadow(0 16px 28px rgba(0,0,0,0.32))
            drop-shadow(0 26px 56px rgba(0,0,0,0.28));
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
            drop-shadow(0 0 12px rgba(236, 91, 149, 0.28))
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

        .space-readout {
          position: relative;
          border-left: 1px solid rgba(255,255,255,0.18);
          padding: 36px 0 36px 22px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          opacity: 0;
          transform: translateY(12px);
        }

        .space-section.is-inview .space-readout {
          animation: fadeUp 0.55s ease 460ms forwards;
        }

        .readout-dot {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: block;
          margin-bottom: 26px;
          background: ${C.red};
          box-shadow: 0 0 0 8px rgba(237, 34, 29, 0.12);
          animation: pulse 2.5s ease-in-out infinite;
        }

        .readout-label {
          margin: 0 0 14px 0;
          color: ${C.red};
          font-size: 10px;
          letter-spacing: 0.22em;
          font-weight: 700;
          text-transform: uppercase;
        }

        .readout-copy {
          margin: 0;
          color: rgba(239, 232, 219, 0.74);
          font-size: clamp(11px, 0.92vw, 14px);
          line-height: 1.9;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .zone-controls {
          position: relative;
          z-index: 3;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .experience-section {
          position: relative;
          z-index: 2;
          padding: clamp(70px, 7vw, 110px) 5vw clamp(72px, 7vw, 110px);
          background: ${C.cream};
          overflow: hidden;
        }

        .experience-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url('${ASSETS.bg}');
          background-size: cover;
          background-position: center;
          opacity: 0.15;
          mix-blend-mode: multiply;
          pointer-events: none;
        }

        .experience-angle {
          position: absolute;
          left: 0;
          top: 0;
          width: 30vw;
          height: 30vw;
          min-width: 280px;
          min-height: 280px;
          background: ${C.red};
          clip-path: polygon(0 0, 100% 0, 0 100%);
          opacity: 1;
          pointer-events: none;
        }

        .experience-top {
          position: relative;
          z-index: 3;
          display: grid;
          grid-template-columns: minmax(0, 1fr) 360px;
          gap: 40px;
          align-items: start;
        }

        .experience-copy {
          position: relative;
          z-index: 2;
        }

        .experience-copy-text {
          max-width: 620px;
          margin: 26px 0 0 0;
          font-size: clamp(12px, 0.92vw, 15px);
          line-height: 1.85;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(18, 17, 15, 0.72);
          opacity: 0;
          transform: translateY(10px);
        }

        .experience-section.is-inview .experience-copy-text {
          animation: fadeUp 0.5s ease 420ms forwards;
        }

        .experience-orbit-wrap {
          display: flex;
          align-items: flex-start;
          justify-content: flex-end;
          opacity: 0;
          transform: translateY(16px) scale(0.985);
        }

        .experience-section.is-inview .experience-orbit-wrap {
          animation: visualIn 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) 320ms forwards;
        }

        .exp-orbit {
          position: relative;
          width: min(360px, 28vw);
          aspect-ratio: 1;
        }

        .exp-orbit-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 10px solid ${C.black};
          animation: slowSpin 14s linear infinite;
        }

        .exp-orbit-center {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 74px;
          height: 74px;
          border-radius: 50%;
          background: ${C.amber};
          border: 6px solid ${C.black};
          transform: translate(-50%, -50%);
        }

        .exp-orbit-dot {
          position: absolute;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 4px solid ${C.black};
        }

        .exp-orbit-dot-a {
          left: -6px;
          top: 50%;
          transform: translateY(-50%);
          background: ${C.red};
        }

        .exp-orbit-dot-b {
          right: -4px;
          top: 12%;
          background: ${C.cream};
        }

        .experience-timeline {
          position: relative;
          z-index: 3;
          margin-top: 38px;
          margin-bottom: 22px;
          opacity: 0;
          transform: translateY(10px);
        }

        .experience-section.is-inview .experience-timeline {
          animation: fadeUp 0.5s ease 520ms forwards;
        }

        .timeline-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 16px;
          color: rgba(18, 17, 15, 0.58);
          font-size: clamp(12px, 1.02vw, 16px);
          line-height: 1;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .timeline-line-wrap {
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
          background: rgba(18, 17, 15, 0.24);
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
          position: relative;
          z-index: 3;
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
          border: 1px solid rgba(255,255,255,0.18);
          box-shadow: 0 0 0 rgba(0,0,0,0);
        }

        .experience-section .action-card {
          background: rgba(255,255,255,0.34);
          color: ${C.ink};
          border: 1px solid rgba(18,17,15,0.24);
          box-shadow: 0 0 0 rgba(0,0,0,0);
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
            linear-gradient(135deg, rgba(237, 34, 29, 0.18), transparent 45%),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 11px);
        }

        .experience-section .action-card::before {
          background:
            linear-gradient(135deg, rgba(236, 91, 149, 0.12), transparent 45%),
            repeating-linear-gradient(90deg, rgba(18,17,15,0.05) 0 1px, transparent 1px 11px);
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
          color: rgba(239, 232, 219, 0.62);
        }

        .experience-section .action-card-meta {
          color: rgba(18, 17, 15, 0.56);
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
          background: rgba(237, 34, 29, 0.08);
          border-color: rgba(255,255,255,0.32);
          box-shadow: 10px 10px 0 rgba(237, 34, 29, 0.14);
        }

        .experience-section .action-card:hover,
        .experience-section .action-card:focus-visible,
        .experience-section .action-card.is-active {
          background: rgba(236, 91, 149, 0.08);
          border-color: rgba(18,17,15,0.3);
          box-shadow: 8px 8px 0 rgba(236, 91, 149, 0.12);
        }

        .action-card:hover::before,
        .action-card:focus-visible::before,
        .action-card.is-active::before {
          opacity: 1;
        }

        .action-card.is-dark {
          background: ${C.black};
          color: ${C.cream};
          border-color: rgba(18,17,15,0.08);
        }

        .action-card.is-dark .action-card-meta {
          color: rgba(239, 232, 219, 0.66);
        }

        .action-card.is-dark:hover,
        .action-card.is-dark:focus-visible {
          background: #111;
          color: ${C.cream};
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

        @keyframes typeReveal {
          to {
            clip-path: inset(0 0 0 0);
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
            text-shadow:
              0.02em 0 0 currentColor,
              0 8px 0 rgba(0,0,0,0.12);
          }

          35% {
            text-shadow:
              0.02em 0 0 currentColor,
              0.08em 0 0 rgba(236, 91, 149, 0.25);
          }

          65% {
            text-shadow:
              0.02em 0 0 currentColor,
              -0.06em 0 0 rgba(255,255,255,0.18);
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

        @keyframes obeliskFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @keyframes funnelPulse {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.96; }
          50% { transform: translateY(-6px) scale(1.02); opacity: 1; }
        }

        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 8px rgba(237, 34, 29, 0.12); }
          50% { box-shadow: 0 0 0 14px rgba(237, 34, 29, 0); }
        }

        @keyframes venueFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-9px); }
        }

        @keyframes slowSpin {
          to { transform: rotate(360deg); }
        }

        @keyframes signalFillLoop {
          0%, 18% {
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
          76%, 100% {
            transform: translateY(-50%) scaleX(1);
            opacity: 0;
          }
        }

        @keyframes leftDotLoop {
          0%, 18% { background: #9A948B; }
          24%, 64% { background: ${C.red}; }
          78%, 100% { background: #9A948B; }
        }

        @keyframes rightDotLoop {
          0%, 48% { background: #9A948B; }
          58%, 72% { background: ${C.red}; }
          84%, 100% { background: #9A948B; }
        }

        @keyframes cardIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes venueGlitchA {
          0%, 72%, 100% {
            opacity: 0;
            transform: translate3d(0,0,0);
            clip-path: inset(0 0 0 0);
          }
          73% {
            opacity: 0.16;
            transform: translate3d(-8px,-3px,0);
            clip-path: inset(0% 0 82% 0);
          }
          74% {
            opacity: 0.22;
            transform: translate3d(10px,4px,0);
            clip-path: inset(16% 0 58% 0);
          }
          75% {
            opacity: 0.18;
            transform: translate3d(-7px,-5px,0);
            clip-path: inset(34% 0 34% 0);
          }
          76% {
            opacity: 0.22;
            transform: translate3d(8px,6px,0);
            clip-path: inset(52% 0 16% 0);
          }
          77% {
            opacity: 0.12;
            transform: translate3d(-5px,-4px,0);
            clip-path: inset(74% 0 3% 0);
          }
          78% {
            opacity: 0;
            transform: translate3d(0,0,0);
            clip-path: inset(0 0 0 0);
          }
        }

        @keyframes venueGlitchB {
          0%, 72%, 100% {
            opacity: 0;
            transform: translate3d(0,0,0);
            clip-path: inset(0 0 0 0);
          }
          73.2% {
            opacity: 0.1;
            transform: translate3d(7px,5px,0);
            clip-path: inset(8% 0 72% 0);
          }
          74.1% {
            opacity: 0.16;
            transform: translate3d(-10px,-3px,0);
            clip-path: inset(24% 0 46% 0);
          }
          75.2% {
            opacity: 0.12;
            transform: translate3d(6px,-7px,0);
            clip-path: inset(44% 0 24% 0);
          }
          76.1% {
            opacity: 0.16;
            transform: translate3d(-8px,6px,0);
            clip-path: inset(63% 0 9% 0);
          }
          77.2% {
            opacity: 0.08;
            transform: translate3d(4px,-2px,0);
            clip-path: inset(82% 0 0% 0);
          }
          78% {
            opacity: 0;
            transform: translate3d(0,0,0);
            clip-path: inset(0 0 0 0);
          }
        }

        @media (max-width: 1180px) {
          .hero-inner {
            grid-template-columns: 1fr;
          }

          .hero-poster {
            max-width: 620px;
            width: 100%;
            margin: 0 auto;
          }

          .space-header,
          .space-panel,
          .experience-top {
            grid-template-columns: 1fr;
          }

          .experience-orbit-wrap {
            justify-content: flex-start;
          }

          .space-readout {
            border-left: 0;
            border-top: 1px solid rgba(255,255,255,0.18);
            padding: 24px 0 0 0;
          }
        }

        @media (max-width: 980px) {
          .zone-controls {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 820px) {
          .page {
            padding-top: 74px;
          }

          .hero-section {
            min-height: auto;
          }

          .hero-inner {
            width: calc(100% - 34px);
            padding: 40px 0 54px;
            gap: 24px;
          }

          .hero-title {
            font-size: clamp(64px, 18vw, 104px);
          }

          .hero-intro {
            margin-top: 30px;
            font-size: 11px;
          }

          .hero-actions {
            margin-top: 26px;
          }

          .hero-corner {
            width: 140px;
            height: 140px;
          }

          .hero-corner-left {
            left: -82px;
            top: 18%;
          }

          .hero-corner-right {
            right: -84px;
            bottom: -44px;
          }

          .poster-sun {
            width: 56px;
            height: 56px;
          }

          .space-section,
          .experience-section {
            padding: 58px 22px 62px;
          }

          .space-map {
            min-height: auto;
            padding: 20px 14px;
          }

          .experience-nav {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
          }

          .action-card {
            min-height: 84px;
            padding: 14px 12px;
          }

          .experience-nav .action-card-title {
            font-size: clamp(15px, 4vw, 18px);
            white-space: nowrap;
          }

          .exp-orbit {
            width: min(280px, 58vw);
          }
        }

        @media (max-width: 620px) {
          .hero-address {
            font-size: 12px;
            letter-spacing: 0.16em;
          }

          .hero-actions {
            flex-direction: column;
          }

          .hero-actions a {
            width: 100%;
          }

          .experience-nav {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .timeline-row {
            font-size: 10px;
            letter-spacing: 0.08em;
          }

          .timeline-dot {
            width: 16px;
            height: 16px;
          }
        }

        @media (max-width: 520px) {
          .hero-inner {
            width: calc(100% - 28px);
            padding: 34px 0 48px;
          }

          .poster-frame {
            aspect-ratio: 1 / 1.12;
          }

          .poster-black-square-a {
            width: 74px;
            height: 74px;
          }

          .poster-black-square-b {
            width: 48px;
            height: 48px;
          }

          .poster-black-square-c {
            width: 58px;
            height: 58px;
          }

          .poster-funnel {
            width: 52%;
          }

          .poster-obelisk {
            width: 22%;
          }

          .experience-nav .action-card-title {
            font-size: 14px;
          }

          .experience-nav .action-card-meta {
            font-size: 8px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .concept-nav-shell,
          .hero-kicker,
          .hero-title,
          .hero-intro,
          .hero-actions,
          .hero-poster,
          .section-title,
          .space-header-copy,
          .space-map,
          .space-readout,
          .experience-copy-text,
          .experience-orbit-wrap,
          .experience-timeline,
          .action-card,
          .poster-obelisk,
          .poster-funnel,
          .venue-wrap,
          .venue-glitch-a,
          .venue-glitch-b,
          .timeline-fill,
          .timeline-dot,
          .exp-orbit-ring {
            animation: none !important;
            transition: none !important;
          }

          .hero-kicker,
          .hero-title,
          .hero-intro,
          .hero-actions,
          .hero-poster,
          .section-title,
          .space-header-copy,
          .space-map,
          .space-readout,
          .experience-copy-text,
          .experience-orbit-wrap,
          .experience-timeline,
          .action-card {
            opacity: 1 !important;
            transform: none !important;
          }

          .hero-title,
          .section-title,
          .type-text {
            clip-path: inset(0 0 0 0) !important;
          }
        }
      `}</style>
    </>
  );
}

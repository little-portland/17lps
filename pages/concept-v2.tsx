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
    caption: 'A flexible underground dining and gathering chamber.',
  },
  {
    id: 'chefs-studio',
    title: "CHEF'S STUDIO",
    href: '/chefstudio-test',
    highlight: '/images/concept/chefs-studio-highlight.png',
    caption: 'An intimate studio for food, theatre and close encounters.',
  },
  {
    id: 'studio',
    title: 'THE STUDIO',
    href: '/studio-test',
    highlight: '/images/concept/studio-highlight.png',
    caption: 'A future-facing room for sound, culture and private energy.',
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
        threshold: 0.18,
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

        <article className="protocol-shell" aria-label="Monolith Protocol concept page">
          <div className="paper-bg" aria-hidden="true" />
          <div className="protocol-axis" aria-hidden="true" />

          <section className="hero-section reveal-section" aria-labelledby="concept-title">
            <div className="hero-copy">
              <p className="micro-label">LPX // UNDERGROUND ISSUE 51</p>

              <h1 id="concept-title" className="hero-title">
                CONCEPT.
              </h1>

              <p className="hero-address">
                17 Little Portland Street, London
              </p>

              <p className="hero-intro">
                A concealed programme beneath the city: dining, sound,
                architecture and after-dark energy, arranged as one continuous
                underground sequence.
              </p>
            </div>

            <div className="monolith-stage" aria-hidden="true">
              <div className="monolith-field">
                <span className="monolith-axis" />
                <img
                  src={ASSETS.funnel}
                  alt=""
                  className="monolith-img funnel-top"
                  draggable={false}
                />
                <img
                  src={ASSETS.floor}
                  alt=""
                  className="monolith-img floor-plane"
                  draggable={false}
                />
                <img
                  src={ASSETS.funnel}
                  alt=""
                  className="monolith-img funnel-floor"
                  draggable={false}
                />
                <img
                  src={ASSETS.obelisk}
                  alt=""
                  className="monolith-img obelisk"
                  draggable={false}
                />

                <span className="scan-line scan-one" />
                <span className="scan-line scan-two" />
              </div>
            </div>
          </section>

          <section className="space-section reveal-section" aria-labelledby="space-title">
            <div className="section-rule" aria-hidden="true" />

            <div className="section-kicker-row">
              <p className="micro-label">MODULE 01</p>
              <p className="module-copy">
                The venue is treated as a diagram: three zones, one connected
                system.
              </p>
            </div>

            <h2 id="space-title" className="section-title">
              THE SPACE
            </h2>

            <div className="space-grid">
              <div className="venue-system">
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

              <aside className="space-console">
                <p className="console-label">ACTIVE CHAMBER</p>
                <p className="console-copy">{activeCaption}</p>
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
                        '--card-delay': `${260 + index * 120}ms`,
                      } as CSSProperties
                    }
                  />
                );
              })}
            </nav>
          </section>

          <section
            className="experience-section reveal-section"
            aria-labelledby="experience-title"
          >
            <div className="section-rule" aria-hidden="true" />

            <div className="section-kicker-row">
              <p className="micro-label">MODULE 02</p>
              <p className="module-copy">
                The night moves from dinner into late-night Little Portland
                energy.
              </p>
            </div>

            <h2 id="experience-title" className="section-title experience-title">
              THE EXPERIENCE
            </h2>

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
                      '--card-delay': `${460 + index * 120}ms`,
                    } as CSSProperties
                  }
                />
              ))}
            </nav>
          </section>

          <footer className="protocol-footer">
            <span>17 LITTLE PORTLAND STREET</span>
            <span>ENTRY SEQUENCE COMPLETE</span>
            <span>LPX // UNDERGROUND</span>
          </footer>
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

        .concept-nav-shell.is-scrolled .scene-nav.scene-nav--space {
          background: rgba(232, 226, 212, 0.5) !important;
          border-bottom: 1px solid rgba(28, 28, 26, 0.14);
          box-shadow: 0 10px 28px rgba(28, 28, 26, 0.07);
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
          .concept-nav-shell:has(.scene-nav-burger[aria-expanded='true']) .scene-nav-mobile a[aria-current='page'],
          .concept-nav-shell:has(button[aria-expanded='true']) .scene-nav-mobile a[aria-current='page'] {
            color: ${C.pink} !important;
            opacity: 1 !important;
          }
        }

        .page {
          position: relative;
          min-height: 100svh;
          overflow-x: clip;
          padding: clamp(88px, 7vw, 120px) 0 clamp(32px, 4vw, 60px);
          background: #eadfe5;
        }

        .site-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background:
            radial-gradient(circle at 50% 0%, rgba(232, 226, 212, 0.5), transparent 34%),
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

        .protocol-shell {
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

        .paper-bg {
          position: absolute;
          inset: 0;
          z-index: -2;
          background-image: url('${ASSETS.bg}');
          background-size: contain;
          background-repeat: repeat;
          background-position: center top;
          opacity: 0.78;
        }

        .protocol-shell::before {
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
          opacity: 0.45;
        }

        .protocol-shell::after {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 30;
          background:
            radial-gradient(circle at 50% 20%, transparent 0 48%, rgba(28, 28, 26, 0.025) 100%),
            repeating-linear-gradient(
              0deg,
              rgba(28, 28, 26, 0.024) 0px,
              rgba(28, 28, 26, 0.024) 1px,
              transparent 1px,
              transparent 5px
            );
          opacity: 0.42;
        }

        .protocol-axis {
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

        .hero-section {
          position: relative;
          min-height: 84svh;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(280px, 0.74fr);
          align-items: center;
          gap: clamp(28px, 4.8vw, 78px);
          padding: clamp(88px, 8vw, 138px) clamp(48px, 6vw, 96px)
            clamp(74px, 7vw, 118px) clamp(82px, 8vw, 132px);
        }

        .hero-copy {
          position: relative;
          z-index: 8;
        }

        .micro-label {
          margin: 0;
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
          margin-top: 20px;
          font-size: clamp(62px, 7.4vw, 126px);
          white-space: nowrap;
          opacity: 0;
          clip-path: inset(0 100% 0 0);
        }

        .hero-section.is-inview .hero-title {
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

        .hero-section.is-inview .hero-address {
          animation: copyIn 0.54s ease 520ms forwards;
        }

        .hero-intro {
          max-width: 560px;
          margin: clamp(30px, 3.4vw, 48px) 0 0 0;
          color: rgba(28, 28, 26, 0.6);
          font-family: ${MONO};
          font-size: clamp(11px, 0.92vw, 14px);
          line-height: 1.8;
          letter-spacing: 0.08em;
          font-weight: 700;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(12px);
        }

        .hero-section.is-inview .hero-intro {
          animation: copyIn 0.54s ease 680ms forwards;
        }

        .monolith-stage {
          position: relative;
          z-index: 7;
          opacity: 0;
          transform: translateY(20px);
        }

        .hero-section.is-inview .monolith-stage {
          animation:
            copyIn 0.7s ease 320ms forwards,
            monolithFloat 7s ease-in-out 1400ms infinite;
        }

        .monolith-field {
          position: relative;
          width: min(100%, 470px);
          aspect-ratio: 460 / 600;
          margin-left: auto;
        }

        .monolith-axis {
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

        .monolith-img {
          position: absolute;
          display: block;
          height: auto;
          user-select: none;
          pointer-events: none;
        }

        .funnel-top {
          z-index: 5;
          top: 0;
          right: 9%;
          width: 46%;
          filter: drop-shadow(0 10px 18px rgba(212, 80, 122, 0.08));
        }

        .floor-plane {
          z-index: 2;
          left: 3%;
          bottom: 4%;
          width: 103%;
          opacity: 0.92;
        }

        .funnel-floor {
          z-index: 4;
          left: 0%;
          bottom: 1%;
          width: 45%;
          transform: rotate(-2deg);
          filter: drop-shadow(0 8px 14px rgba(212, 80, 122, 0.08));
        }

        .obelisk {
          z-index: 6;
          right: 22%;
          bottom: 8%;
          width: 22%;
          filter: drop-shadow(0 20px 24px rgba(28, 28, 26, 0.16));
        }

        .scan-line {
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

        .scan-one {
          top: 34%;
          animation: portalScan 5.4s linear 1.2s infinite;
        }

        .scan-two {
          top: 63%;
          animation: portalScan 6.8s linear 3.1s infinite;
        }

        .space-section,
        .experience-section {
          position: relative;
          padding: clamp(76px, 8vw, 124px) clamp(48px, 6vw, 96px)
            clamp(76px, 7vw, 116px) clamp(82px, 8vw, 132px);
        }

        .section-rule {
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

        .reveal-section.is-inview .section-rule {
          animation: drawHorizontal 0.78s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
        }

        .section-kicker-row {
          display: grid;
          grid-template-columns: 150px minmax(0, 1fr);
          gap: clamp(24px, 4vw, 72px);
          align-items: start;
          margin-bottom: clamp(24px, 3vw, 42px);
        }

        .module-copy {
          max-width: 560px;
          margin: 0;
          color: rgba(28, 28, 26, 0.58);
          font-family: ${MONO};
          font-size: clamp(11px, 0.92vw, 14px);
          line-height: 1.8;
          letter-spacing: 0.08em;
          font-weight: 700;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(12px);
        }

        .reveal-section.is-inview .module-copy {
          animation: copyIn 0.54s ease 420ms forwards;
        }

        .section-title {
          font-size: clamp(50px, 6vw, 96px);
          opacity: 0;
          clip-path: inset(0 100% 0 0);
        }

        .reveal-section.is-inview .section-title {
          animation:
            scanTitleReveal 0.48s steps(8, end) 120ms forwards,
            titleMicroGlitch 0.48s steps(2, end) 640ms forwards,
            titleIdleGlitch 7.5s steps(2, end) 3300ms infinite;
        }

        .space-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(210px, 0.28fr);
          gap: clamp(24px, 4vw, 58px);
          align-items: center;
          margin-top: clamp(26px, 4vw, 54px);
        }

        .venue-system {
          opacity: 0;
          transform: translateY(26px) scale(0.98);
        }

        .space-section.is-inview .venue-system {
          animation:
            objectIn 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) 360ms forwards,
            venueFloat 5.6s ease-in-out 1500ms infinite;
        }

        .venue-wrap {
          position: relative;
          width: min(100%, 860px);
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

        .space-console {
          position: relative;
          border-left: 1px solid rgba(28, 28, 26, 0.24);
          padding: 22px 0 22px 22px;
          opacity: 0;
          transform: translateY(14px);
        }

        .space-section.is-inview .space-console {
          animation: copyIn 0.6s ease 580ms forwards;
        }

        .console-label {
          margin: 0 0 18px 0;
          color: ${C.pink};
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        .console-copy {
          margin: 0;
          color: rgba(28, 28, 26, 0.66);
          font-size: clamp(11px, 0.9vw, 13px);
          line-height: 1.75;
          letter-spacing: 0.06em;
          font-weight: 700;
          text-transform: uppercase;
        }

        .zone-controls {
          position: relative;
          z-index: 9;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          margin-top: clamp(18px, 2vw, 28px);
        }

        .experience-protocol {
          position: relative;
          margin-top: clamp(34px, 4.6vw, 58px);
          margin-bottom: clamp(20px, 2vw, 30px);
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
          color: rgba(28, 28, 26, 0.62);
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
          background: rgba(28, 28, 26, 0.28);
        }

        .protocol-fill {
          background: ${C.pink};
          transform: translateY(-50%) scaleX(0);
          animation: protocolFill 12s ease-in-out infinite;
        }

        .protocol-dot {
          position: absolute;
          top: 50%;
          z-index: 2;
          width: 18px;
          height: 18px;
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
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .protocol-footer {
          position: relative;
          z-index: 5;
          display: flex;
          justify-content: space-between;
          gap: 22px;
          padding: 20px clamp(34px, 4vw, 64px);
          border-top: 1px solid rgba(28, 28, 26, 0.14);
          color: rgba(28, 28, 26, 0.52);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
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

        @keyframes monolithFloat {
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
            background: ${C.pink};
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

        @media (max-width: 1280px) {
          .protocol-shell {
            width: 72%;
          }
        }

        @media (max-width: 980px) {
          .protocol-shell {
            width: 82%;
          }

          .hero-section,
          .space-section,
          .experience-section {
            padding-left: 82px;
            padding-right: 48px;
          }

          .hero-section,
          .space-grid {
            grid-template-columns: 1fr;
          }

          .monolith-field {
            width: min(100%, 440px);
            margin: 18px auto 0;
          }

          .section-kicker-row {
            grid-template-columns: 1fr;
          }

          .space-console {
            border-left: 0;
            border-top: 1px solid rgba(28, 28, 26, 0.18);
            padding: 20px 0 0;
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

          .protocol-shell {
            width: calc(100% - 40px);
          }

          .paper-bg {
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center center;
          }

          .protocol-axis {
            left: 28px;
          }

          .hero-section,
          .space-section,
          .experience-section {
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

          .hero-intro {
            font-size: 11px;
          }

          .monolith-field {
            width: min(100%, 360px);
          }

          .section-title {
            font-size: clamp(40px, 11vw, 64px);
          }

          .venue-wrap {
            width: 100%;
          }

          .experience-protocol {
            margin-top: 34px;
            margin-bottom: 18px;
          }

          .time-row {
            font-size: 11px;
            letter-spacing: 0.1em;
          }

          .experience-nav {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
          }

          .protocol-footer {
            flex-direction: column;
            gap: 8px;
            padding: 18px 28px;
          }
        }

        @media (max-width: 520px) {
          .protocol-shell {
            width: calc(100% - 28px);
          }

          .protocol-axis {
            left: 22px;
          }

          .hero-section,
          .space-section,
          .experience-section {
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

          .monolith-field {
            width: min(100%, 320px);
          }

          .space-grid {
            margin-top: 26px;
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
          .time-row {
            font-size: 9px;
            letter-spacing: 0.04em;
          }

          .protocol-dot {
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
          .hero-intro,
          .monolith-stage,
          .module-copy,
          .venue-system,
          .space-console,
          .experience-protocol,
          .action-card,
          .section-rule,
          .action-card::after,
          .venue-glitch-a,
          .venue-glitch-b,
          .scan-line,
          .monolith-axis,
          .protocol-fill,
          .protocol-dot {
            animation: none !important;
            transition: none !important;
          }

          .hero-title,
          .section-title,
          .hero-address,
          .hero-intro,
          .monolith-stage,
          .module-copy,
          .venue-system,
          .space-console,
          .experience-protocol,
          .action-card {
            opacity: 1 !important;
            transform: none !important;
          }

          .hero-title,
          .section-title {
            clip-path: inset(0 0 0 0) !important;
          }

          .section-rule {
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

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
  paper: '#EDE6D7',
  paperLight: '#F4EFE3',
  ink: '#252525',
  inkSoft: '#4B4B48',
  black: '#080808',
  pink: '#E84F8A',
  pinkSoft: 'rgba(232, 79, 138, 0.16)',
  red: '#E33A27',
  line: 'rgba(37, 37, 37, 0.34)',
  lineSoft: 'rgba(37, 37, 37, 0.12)',
} as const;

const MONO = '"Space Mono", "Courier New", monospace';

const ASSETS = {
  texture: '/images/concept/concept_bg.jpg',
  funnel: '/images/concept/grid_funel.png',
  obelisk: '/images/concept/obelisk-dark-grey.png',
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
    description: 'An iconic chamber for immersive dining below street level.',
  },
  {
    id: 'chefs',
    title: "CHEF'S STUDIO",
    href: '/chefstudio-test',
    highlight: ASSETS.chefs,
    description: 'An intimate stage for culinary performance and private dinners.',
  },
  {
    id: 'studio',
    title: 'THE STUDIO',
    href: '/studio-test',
    highlight: ASSETS.studio,
    description: 'A flexible room for music, culture and late-night energy.',
  },
];

const EXPERIENCE = [
  {
    title: 'DINING',
    href: '/food-test',
    time: '20:00 / 20:30',
    description: 'Curated menus, conversation, atmosphere.',
  },
  {
    title: 'AFTER DARK',
    href: '/theclub-test',
    time: '22:00',
    description: 'Music, culture, connection, nocturn.',
  },
];

function PosterMeta({
  left,
  right,
}: {
  left: string;
  right: string;
}) {
  return (
    <div className="poster-meta">
      <span>{left}</span>
      <span>{right}</span>
    </div>
  );
}

function PosterLabel({
  children,
  active = false,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return <p className={`poster-label ${active ? 'is-active' : ''}`}>{children}</p>;
}

function MonolithScene() {
  return (
    <div className="monolith-scene" aria-hidden="true">
      <img src={ASSETS.funnel} alt="" className="wireframe wireframe-top" draggable={false} />
      <img src={ASSETS.funnel} alt="" className="wireframe wireframe-floor" draggable={false} />

      <div className="ground-shadow" />

      <img
        src={ASSETS.obelisk}
        alt=""
        className="monolith-img"
        draggable={false}
      />
    </div>
  );
}

function VenueScene({
  activeArea,
}: {
  activeArea: AreaId | null;
}) {
  return (
    <div className="venue-scene" aria-hidden="true">
      <div className="scan-beam" />

      <div className="venue-wrap">
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
  );
}

function ExperienceScene() {
  return (
    <div className="experience-scene">
      <div className="experience-axis" aria-hidden="true">
        <span className="experience-line" />
        <span className="experience-fill" />
        <span className="experience-dot experience-dot-left" />
        <span className="experience-dot experience-dot-right" />
      </div>

      <div className="experience-items">
        {EXPERIENCE.map((item) => (
          <a key={item.href} href={item.href} className="experience-item">
            <span className="experience-time">{item.time}</span>
            <span className="experience-title">{item.title}</span>
            <span className="experience-description">{item.description}</span>
          </a>
        ))}
      </div>
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
      document.querySelectorAll<HTMLElement>('.poster-section')
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-inview', entry.isIntersecting);
        });
      },
      {
        threshold: 0.28,
        rootMargin: '0px 0px -12% 0px',
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

        <div className="site-texture" aria-hidden="true" />

        <section className="poster-section poster-hero">
          <div className="poster-inner">
            <div className="poster-axis" aria-hidden="true" />

            <div className="poster-left">
              <PosterLabel active>LPX ISSUE 51</PosterLabel>

              <h1 className="poster-title">CONCEPT.</h1>

              <p className="poster-copy">
                A concealed cultural destination below street level. Dinner,
                architecture, sound and late-night energy arranged as one
                continuous sequence.
              </p>
            </div>

            <div className="poster-right">
              <MonolithScene />
            </div>

            <PosterMeta
              left="17 LITTLE PORTLAND STREET / LONDON W1W 8BP"
              right="LPX//UNDERGROUND / ISSUE 51"
            />
          </div>
        </section>

        <section id="space" className="poster-section poster-space">
          <div className="poster-inner">
            <div className="poster-axis" aria-hidden="true" />

            <div className="poster-left">
              <PosterLabel>MODULE 01</PosterLabel>

              <h2 className="poster-title">THE SPACE.</h2>

              <p className="poster-copy">
                Three distinct environments operating as one underground vessel.
                Select a chamber to isolate the programme.
              </p>

              <p className="active-copy">
                {activeCopy?.description ||
                  'Hover or tap one of the spatial labels below.'}
              </p>

              <nav
                className="space-links"
                aria-label="Venue areas"
                onMouseLeave={handleAreaLeave}
              >
                {AREAS.map((area) => {
                  const isActive = activeArea === area.id;

                  return (
                    <a
                      key={area.id}
                      href={area.href}
                      className={`space-link ${isActive ? 'is-active' : ''}`}
                      onMouseEnter={() => handleAreaEnter(area.id)}
                      onFocus={() => setActiveArea(area.id)}
                      onClick={handleAreaClick(area.id)}
                    >
                      <span>{area.title}</span>
                      <em>{isTouchMode && !isActive ? 'tap to preview' : 'explore'}</em>
                    </a>
                  );
                })}
              </nav>
            </div>

            <div className="poster-right">
              <VenueScene activeArea={activeArea} />
            </div>

            <PosterMeta
              left="THE TENT / CHEF'S STUDIO / THE STUDIO"
              right="SPATIAL SCAN / 17 LPS"
            />
          </div>
        </section>

        <section id="experience" className="poster-section poster-experience">
          <div className="poster-inner">
            <div className="poster-axis" aria-hidden="true" />

            <div className="poster-left">
              <PosterLabel>MODULE 02</PosterLabel>

              <h2 className="poster-title">THE EXPERIENCE.</h2>

              <p className="poster-copy">
                A quiet transition from seated dinner into after-dark Little
                Portland energy. One evening, two states.
              </p>
            </div>

            <div className="poster-right">
              <ExperienceScene />
            </div>

            <PosterMeta
              left="DINING / 20:00—20:30"
              right="AFTER DARK / 22:00"
            />
          </div>
        </section>
      </main>

      <style jsx global>{`
        html,
        body,
        #__next {
          margin: 0;
          min-height: 100%;
          background: ${C.paper};
          color: ${C.ink};
          font-family: ${MONO};
          -webkit-font-smoothing: antialiased;
          text-rendering: geometricPrecision;
          scrollbar-color: ${C.pink} ${C.paper};
        }

        body {
          overflow-x: hidden;
        }

        * {
          box-sizing: border-box;
        }

        ::selection {
          background: ${C.pink};
          color: ${C.paper};
        }

        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: ${C.paper};
        }

        ::-webkit-scrollbar-thumb {
          background: ${C.pink};
          border: 2px solid ${C.paper};
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
          background: rgba(244, 239, 227, 0.72) !important;
          backdrop-filter: blur(18px) !important;
          -webkit-backdrop-filter: blur(18px) !important;
          border-bottom: 1px solid rgba(37, 37, 37, 0.12);
          transition:
            background 0.25s ease,
            box-shadow 0.25s ease !important;
        }

        .concept-nav-shell.is-scrolled .scene-nav {
          background: rgba(244, 239, 227, 0.9) !important;
          box-shadow: 0 14px 36px rgba(37, 37, 37, 0.08);
        }

        .scene-nav,
        .scene-nav a,
        .scene-nav-mobile,
        .scene-nav-mobile a {
          color: ${C.ink} !important;
          font-family: ${MONO} !important;
          letter-spacing: 0.16em !important;
        }

        .scene-nav a[href='/concept'],
        .scene-nav a[href='/concept-test'],
        .scene-nav a[aria-current='page'] {
          color: ${C.pink} !important;
          opacity: 1 !important;
        }

        .scene-nav--space .scene-nav-burger span {
          background: ${C.ink} !important;
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
            background: rgba(244, 239, 227, 0.9);
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
            background: rgba(244, 239, 227, 0.9) !important;
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
            background: rgba(244, 239, 227, 0.9) !important;
            backdrop-filter: blur(22px) saturate(1.08) !important;
            -webkit-backdrop-filter: blur(22px) saturate(1.08) !important;
          }
        }

        .page {
          position: relative;
          min-height: 100svh;
          background: ${C.paper};
          overflow-x: hidden;
        }

        .site-texture {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background-image: url('${ASSETS.texture}');
          background-size: 720px auto;
          background-repeat: repeat;
          background-position: center;
          opacity: 0.42;
          mix-blend-mode: multiply;
        }

        .poster-section {
          position: relative;
          z-index: 2;
          min-height: 100svh;
          display: flex;
          align-items: center;
          padding: clamp(96px, 9vw, 136px) 0 clamp(64px, 6vw, 96px);
          border-bottom: 1px solid ${C.lineSoft};
          background:
            linear-gradient(180deg, rgba(255,255,255,0.18), transparent 42%),
            ${C.paper};
        }

        .poster-inner {
          position: relative;
          width: min(1180px, calc(100% - 88px));
          min-height: min(720px, 72svh);
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 0.72fr) 1px minmax(360px, 0.88fr);
          gap: clamp(38px, 5vw, 78px);
          align-items: center;
        }

        .poster-axis {
          position: relative;
          width: 1px;
          height: 100%;
          min-height: 620px;
          background: ${C.line};
          transform: scaleY(0);
          transform-origin: top center;
        }

        .poster-section.is-inview .poster-axis {
          animation: axisDraw 0.82s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        .poster-left,
        .poster-right {
          position: relative;
          z-index: 2;
          opacity: 0;
          transform: translateY(18px);
        }

        .poster-section.is-inview .poster-left {
          animation: fadeUp 0.72s cubic-bezier(0.2, 0.8, 0.2, 1) 120ms forwards;
        }

        .poster-section.is-inview .poster-right {
          animation: fadeUp 0.78s cubic-bezier(0.2, 0.8, 0.2, 1) 240ms forwards;
        }

        .poster-label {
          margin: 0 0 clamp(18px, 2vw, 28px);
          color: ${C.inkSoft};
          font-size: 10px;
          line-height: 1.1;
          font-weight: 700;
          letter-spacing: 0.24em;
          text-transform: uppercase;
        }

        .poster-label.is-active {
          color: ${C.pink};
        }

        .poster-title {
          margin: 0;
          color: ${C.ink};
          font-family: ${MONO};
          font-size: clamp(58px, 7.8vw, 126px);
          font-weight: 700;
          line-height: 0.88;
          letter-spacing: -0.07em;
          text-transform: uppercase;
          text-shadow:
            0.018em 0 0 currentColor,
            0 10px 0 rgba(37, 37, 37, 0.06);
        }

        .poster-copy {
          max-width: 520px;
          margin: clamp(32px, 4vw, 54px) 0 0;
          color: rgba(37, 37, 37, 0.72);
          font-size: clamp(12px, 0.96vw, 15px);
          line-height: 1.85;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .poster-meta {
          position: absolute;
          left: 0;
          right: 0;
          bottom: -22px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          color: ${C.inkSoft};
          font-size: 11px;
          line-height: 1.3;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(8px);
        }

        .poster-section.is-inview .poster-meta {
          animation: fadeUp 0.64s ease 420ms forwards;
        }

        .monolith-scene {
          position: relative;
          width: min(100%, 540px);
          aspect-ratio: 1 / 1.15;
          margin-left: auto;
        }

        .wireframe {
          position: absolute;
          user-select: none;
          pointer-events: none;
          opacity: 0.95;
          filter: drop-shadow(0 10px 18px rgba(232, 79, 138, 0.08));
        }

        .wireframe-top {
          right: 6%;
          top: 0;
          width: 44%;
          animation: wireFloatTop 7.5s ease-in-out infinite;
        }

        .wireframe-floor {
          left: -3%;
          bottom: 9%;
          width: 54%;
          transform: rotate(-8deg) skewX(-7deg);
          opacity: 0.82;
          animation: wireFloatFloor 8.4s ease-in-out infinite;
        }

        .ground-shadow {
          position: absolute;
          left: 18%;
          right: 6%;
          bottom: 7%;
          height: 17%;
          background: radial-gradient(ellipse at center, rgba(37,37,37,0.22), transparent 70%);
          filter: blur(10px);
          transform: rotate(-3deg);
        }

        .monolith-img {
          position: absolute;
          right: 18%;
          bottom: 14%;
          width: 22%;
          min-width: 86px;
          user-select: none;
          pointer-events: none;
          filter:
            drop-shadow(0 22px 28px rgba(37,37,37,0.22))
            contrast(1.04);
          animation: monolithFloat 6.8s ease-in-out infinite;
        }

        .active-copy {
          max-width: 460px;
          min-height: 64px;
          margin: 30px 0 0;
          padding-left: 18px;
          border-left: 4px solid ${C.pink};
          color: ${C.inkSoft};
          font-size: 11px;
          line-height: 1.8;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .space-links {
          display: grid;
          gap: 12px;
          margin-top: 34px;
        }

        .space-link {
          position: relative;
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 18px;
          padding: 13px 0;
          color: ${C.ink};
          text-decoration: none;
          border-top: 1px solid ${C.lineSoft};
          font-weight: 700;
          text-transform: uppercase;
          transition:
            color 0.22s ease,
            padding-left 0.22s ease,
            border-color 0.22s ease;
        }

        .space-link:last-child {
          border-bottom: 1px solid ${C.lineSoft};
        }

        .space-link span {
          font-size: clamp(15px, 1.3vw, 20px);
          letter-spacing: -0.02em;
        }

        .space-link em {
          color: rgba(37,37,37,0.48);
          font-style: normal;
          font-size: 9px;
          letter-spacing: 0.18em;
        }

        .space-link:hover,
        .space-link:focus-visible,
        .space-link.is-active {
          color: ${C.pink};
          border-color: rgba(232, 79, 138, 0.42);
          padding-left: 12px;
          outline: none;
        }

        .venue-scene {
          position: relative;
          width: min(100%, 680px);
          aspect-ratio: 2048 / 1140;
          margin-left: auto;
          padding: 22px;
          border: 1px solid ${C.lineSoft};
          background: rgba(255,255,255,0.18);
          overflow: hidden;
        }

        .venue-scene::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(rgba(37,37,37,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,37,37,0.08) 1px, transparent 1px);
          background-size: 46px 46px;
          opacity: 0.16;
        }

        .scan-beam {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 2px;
          background: ${C.pink};
          box-shadow: 0 0 18px rgba(232, 79, 138, 0.55);
          opacity: 0;
          z-index: 4;
          animation: scanBeam 5.5s linear infinite;
        }

        .venue-wrap {
          position: relative;
          z-index: 3;
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 20px 28px rgba(37,37,37,0.15));
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
          filter: saturate(0.85) contrast(1.02);
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

        .experience-scene {
          width: min(100%, 650px);
          margin-left: auto;
        }

        .experience-axis {
          position: relative;
          height: 78px;
          margin-bottom: 28px;
        }

        .experience-line,
        .experience-fill {
          position: absolute;
          left: 0;
          right: 0;
          top: 50%;
          height: 1px;
          transform: translateY(-50%);
          transform-origin: left center;
        }

        .experience-line {
          background: ${C.line};
        }

        .experience-fill {
          background: ${C.pink};
          animation: experienceFill 8s ease-in-out infinite;
        }

        .experience-dot {
          position: absolute;
          top: 50%;
          width: 18px;
          height: 18px;
          border-radius: 999px;
          background: ${C.inkSoft};
          transform: translateY(-50%);
        }

        .experience-dot-left {
          left: 0;
          animation: dotLeft 8s ease-in-out infinite;
        }

        .experience-dot-right {
          right: 0;
          animation: dotRight 8s ease-in-out infinite;
        }

        .experience-items {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .experience-item {
          min-height: 220px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 24px;
          color: ${C.ink};
          text-decoration: none;
          border: 1px solid ${C.lineSoft};
          background: rgba(255,255,255,0.16);
          transition:
            transform 0.22s ease,
            border-color 0.22s ease,
            background 0.22s ease;
        }

        .experience-item:hover,
        .experience-item:focus-visible {
          transform: translateY(-4px);
          border-color: rgba(232, 79, 138, 0.48);
          background: ${C.pinkSoft};
          outline: none;
        }

        .experience-time {
          display: block;
          color: ${C.pink};
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-bottom: 18px;
        }

        .experience-title {
          display: block;
          font-size: clamp(24px, 2.6vw, 44px);
          line-height: 0.92;
          font-weight: 700;
          letter-spacing: -0.06em;
          text-transform: uppercase;
        }

        .experience-description {
          display: block;
          max-width: 260px;
          margin-top: 18px;
          color: rgba(37,37,37,0.62);
          font-size: 10px;
          line-height: 1.7;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        @keyframes axisDraw {
          to {
            transform: scaleY(1);
          }
        }

        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes monolithFloat {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }

          50% {
            transform: translateY(-10px) rotate(0.8deg);
          }
        }

        @keyframes wireFloatTop {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }

          50% {
            transform: translateY(-8px) rotate(1.4deg);
          }
        }

        @keyframes wireFloatFloor {
          0%,
          100% {
            transform: rotate(-8deg) skewX(-7deg) translateY(0);
          }

          50% {
            transform: rotate(-8deg) skewX(-7deg) translateY(8px);
          }
        }

        @keyframes scanBeam {
          0% {
            left: 0%;
            opacity: 0;
          }

          8% {
            opacity: 1;
          }

          55% {
            opacity: 0.65;
          }

          100% {
            left: 100%;
            opacity: 0;
          }
        }

        @keyframes experienceFill {
          0%,
          15% {
            transform: translateY(-50%) scaleX(0);
            opacity: 0;
          }

          24% {
            transform: translateY(-50%) scaleX(0);
            opacity: 1;
          }

          68% {
            transform: translateY(-50%) scaleX(1);
            opacity: 1;
          }

          88%,
          100% {
            transform: translateY(-50%) scaleX(1);
            opacity: 0;
          }
        }

        @keyframes dotLeft {
          0%,
          15% {
            background: ${C.inkSoft};
          }

          24%,
          70% {
            background: ${C.pink};
          }

          88%,
          100% {
            background: ${C.inkSoft};
          }
        }

        @keyframes dotRight {
          0%,
          55% {
            background: ${C.inkSoft};
          }

          68%,
          82% {
            background: ${C.pink};
          }

          92%,
          100% {
            background: ${C.inkSoft};
          }
        }

        @media (max-width: 1180px) {
          .poster-inner {
            grid-template-columns: 1fr;
            gap: 42px;
          }

          .poster-axis {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            height: auto;
            min-height: 0;
          }

          .poster-left {
            padding-left: 34px;
          }

          .poster-right {
            padding-left: 34px;
          }

          .monolith-scene,
          .venue-scene,
          .experience-scene {
            margin-left: 0;
          }
        }

        @media (max-width: 820px) {
          .poster-section {
            min-height: auto;
            padding: 104px 0 74px;
          }

          .poster-inner {
            width: calc(100% - 34px);
            min-height: auto;
          }

          .poster-left,
          .poster-right {
            padding-left: 24px;
          }

          .poster-title {
            font-size: clamp(48px, 14vw, 78px);
          }

          .poster-copy {
            font-size: 11px;
          }

          .poster-meta {
            position: relative;
            bottom: auto;
            flex-direction: column;
            align-items: flex-start;
            padding-left: 24px;
            margin-top: 28px;
            font-size: 9px;
          }

          .monolith-scene {
            width: min(100%, 390px);
          }

          .venue-scene {
            padding: 14px;
          }

          .space-links {
            margin-top: 28px;
          }

          .experience-items {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
          }

          .experience-item {
            min-height: 160px;
            padding: 16px;
          }

          .experience-title {
            font-size: clamp(18px, 5vw, 28px);
          }

          .experience-description {
            font-size: 8px;
          }
        }

        @media (max-width: 520px) {
          .poster-inner {
            width: calc(100% - 28px);
          }

          .poster-title {
            font-size: clamp(42px, 13vw, 62px);
          }

          .poster-label {
            font-size: 8px;
          }

          .poster-copy,
          .active-copy {
            font-size: 10px;
          }

          .space-link {
            flex-direction: column;
            align-items: flex-start;
            gap: 5px;
          }

          .experience-axis {
            height: 54px;
          }

          .experience-items {
            gap: 8px;
          }

          .experience-item {
            min-height: 142px;
            padding: 14px 10px;
          }

          .experience-time {
            font-size: 8px;
            letter-spacing: 0.1em;
          }

          .experience-title {
            font-size: 16px;
          }

          .experience-description {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .poster-axis,
          .poster-left,
          .poster-right,
          .poster-meta,
          .monolith-img,
          .wireframe,
          .scan-beam,
          .experience-fill,
          .experience-dot {
            animation: none !important;
            transition: none !important;
          }

          .poster-axis {
            transform: scaleY(1) !important;
          }

          .poster-left,
          .poster-right,
          .poster-meta {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </>
  );
}

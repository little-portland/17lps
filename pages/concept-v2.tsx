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
  paper: '#ede6d7',
  paperLight: '#f4efe3',
  ink: '#202020',
  inkSoft: '#6a665f',
  black: '#090909',
  pink: '#e84f8a',
  line: 'rgba(32, 32, 32, 0.2)',
  lineSoft: 'rgba(32, 32, 32, 0.1)',
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
}[] = [
  {
    id: 'tent',
    title: 'THE TENT',
    href: '/thetent-test',
    highlight: ASSETS.tent,
  },
  {
    id: 'chefs',
    title: "CHEF'S STUDIO",
    href: '/chefstudio-test',
    highlight: ASSETS.chefs,
  },
  {
    id: 'studio',
    title: 'THE STUDIO',
    href: '/studio-test',
    highlight: ASSETS.studio,
  },
];

const EXPERIENCE = [
  {
    title: 'DINING',
    href: '/food-test',
    time: '20:00 / 20:30',
  },
  {
    title: 'AFTER DARK',
    href: '/theclub-test',
    time: '22:00',
  },
];

function PosterButton({
  href,
  title,
  active = false,
  dark = false,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  onClick,
  style,
}: {
  href: string;
  title: string;
  active?: boolean;
  dark?: boolean;
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
      className={`poster-button ${active ? 'is-active' : ''} ${
        dark ? 'is-dark' : ''
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={onClick}
      style={style}
    >
      <span>{title}</span>
    </a>
  );
}

function HeroVisual() {
  return (
    <div className="hero-visual-stage" aria-hidden="true">
      <img
        src={ASSETS.funnel}
        alt=""
        className="wireframe wireframe-top"
        draggable={false}
      />

      <img
        src={ASSETS.funnel}
        alt=""
        className="wireframe wireframe-floor"
        draggable={false}
      />

      <div className="floor-shadow" />

      <img
        src={ASSETS.obelisk}
        alt=""
        className="monolith-img"
        draggable={false}
      />
    </div>
  );
}

function SpaceVisual({ activeArea }: { activeArea: AreaId | null }) {
  return (
    <div className="venue-frame" aria-hidden="true">
      <span className="scan-line" />

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

function ExperienceVisual() {
  return (
    <div className="experience-visual">
      <div className="timeline">
        <div className="timeline-times">
          <span>20:00 / 20:30</span>
          <span>22:00</span>
        </div>

        <div className="timeline-track" aria-hidden="true">
          <span className="timeline-base" />
          <span className="timeline-fill" />
          <span className="timeline-dot timeline-dot-left" />
          <span className="timeline-dot timeline-dot-right" />
        </div>
      </div>

      <div className="experience-buttons">
        {EXPERIENCE.map((item, index) => (
          <PosterButton
            key={item.href}
            href={item.href}
            title={item.title}
            dark={index === 1}
            style={
              {
                '--button-delay': `${220 + index * 100}ms`,
              } as CSSProperties
            }
          />
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
    }, 360);

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
      document.querySelectorAll<HTMLElement>('.concept-section')
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-inview', entry.isIntersecting);
        });
      },
      {
        threshold: 0.36,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(
      '(hover: none), (pointer: coarse), (max-width: 900px)'
    );

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
          content="Concept at 17 Little Portland Street."
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

        <div className="paper-texture" aria-hidden="true" />

        <section className="concept-section hero-section">
          <div className="section-frame">
            <div className="section-left">
              <h1 className="hero-title">CONCEPT.</h1>

              <p className="venue-name">
                17 Little Portland Street, London
              </p>
            </div>

            <div className="section-axis" aria-hidden="true" />

            <div className="section-right">
              <HeroVisual />
            </div>
          </div>
        </section>

        <section id="space" className="concept-section space-section">
          <div className="section-frame">
            <div className="section-left">
              <h2 className="section-title">THE SPACE.</h2>

              <nav
                className="button-stack"
                aria-label="Venue areas"
                onMouseLeave={handleAreaLeave}
              >
                {AREAS.map((area, index) => (
                  <PosterButton
                    key={area.id}
                    href={area.href}
                    title={area.title}
                    active={activeArea === area.id}
                    onMouseEnter={() => handleAreaEnter(area.id)}
                    onFocus={() => setActiveArea(area.id)}
                    onClick={handleAreaClick(area.id)}
                    style={
                      {
                        '--button-delay': `${220 + index * 90}ms`,
                      } as CSSProperties
                    }
                  />
                ))}
              </nav>
            </div>

            <div className="section-axis" aria-hidden="true" />

            <div className="section-right">
              <SpaceVisual activeArea={activeArea} />
            </div>
          </div>
        </section>

        <section id="experience" className="concept-section experience-section">
          <div className="section-frame">
            <div className="section-left">
              <h2 className="section-title">THE EXPERIENCE.</h2>
            </div>

            <div className="section-axis" aria-hidden="true" />

            <div className="section-right">
              <ExperienceVisual />
            </div>
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

        .page {
          position: relative;
          min-height: 100svh;
          background: ${C.paper};
          overflow-x: hidden;
        }

        .paper-texture {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background-image: url('${ASSETS.texture}');
          background-size: 760px auto;
          background-repeat: repeat;
          background-position: center;
          opacity: 0.36;
          mix-blend-mode: multiply;
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
          background: rgba(244, 239, 227, 0.76) !important;
          backdrop-filter: blur(18px) !important;
          -webkit-backdrop-filter: blur(18px) !important;
          border-bottom: 1px solid rgba(32, 32, 32, 0.1);
          transition:
            background 0.25s ease,
            box-shadow 0.25s ease !important;
        }

        .concept-nav-shell.is-scrolled .scene-nav {
          background: rgba(244, 239, 227, 0.94) !important;
          box-shadow: 0 14px 36px rgba(32, 32, 32, 0.08);
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

        .concept-section {
          position: relative;
          z-index: 2;
          min-height: 100svh;
          display: flex;
          align-items: center;
          padding: clamp(108px, 9vw, 142px) 0 clamp(76px, 7vw, 112px);
          border-bottom: 1px solid ${C.lineSoft};
        }

        .section-frame {
          position: relative;
          width: min(1180px, calc(100% - 96px));
          min-height: min(620px, 70svh);
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(310px, 0.75fr) 1px minmax(430px, 1fr);
          gap: clamp(42px, 5vw, 78px);
          align-items: center;
        }

        .section-left,
        .section-right {
          position: relative;
          z-index: 2;
          opacity: 0;
          transform: translateY(18px);
        }

        .concept-section.is-inview .section-left {
          animation: fadeUp 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) 80ms forwards;
        }

        .concept-section.is-inview .section-right {
          animation: fadeUp 0.76s cubic-bezier(0.2, 0.8, 0.2, 1) 180ms forwards;
        }

        .section-axis {
          position: relative;
          width: 1px;
          height: 100%;
          min-height: 560px;
          background: ${C.line};
          transform: scaleY(0);
          transform-origin: top center;
        }

        .concept-section.is-inview .section-axis {
          animation: axisDraw 0.82s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        .hero-title,
        .section-title {
          margin: 0;
          color: ${C.ink};
          font-family: ${MONO};
          font-weight: 700;
          line-height: 0.88;
          letter-spacing: -0.075em;
          text-transform: uppercase;
          text-shadow:
            0.018em 0 0 currentColor,
            0 10px 0 rgba(32, 32, 32, 0.055);
        }

        .hero-title {
          font-size: clamp(70px, 9vw, 132px);
        }

        .section-title {
          max-width: 460px;
          font-size: clamp(58px, 6.8vw, 104px);
        }

        .venue-name {
          margin: clamp(24px, 2.8vw, 42px) 0 0;
          max-width: 480px;
          color: ${C.ink};
          font-size: clamp(14px, 1.24vw, 20px);
          line-height: 1.35;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .hero-visual-stage {
          position: relative;
          width: min(100%, 540px);
          aspect-ratio: 1 / 1;
          margin-left: auto;
        }

        .wireframe {
          position: absolute;
          pointer-events: none;
          user-select: none;
          filter: drop-shadow(0 8px 18px rgba(232, 79, 138, 0.08));
        }

        .wireframe-top {
          right: 8%;
          top: 2%;
          width: 35%;
          opacity: 0.92;
          animation: wireTop 7s ease-in-out infinite;
        }

        .wireframe-floor {
          left: 6%;
          bottom: 10%;
          width: 52%;
          opacity: 0.82;
          transform: rotate(-8deg) skewX(-8deg);
          animation: wireFloor 8s ease-in-out infinite;
        }

        .floor-shadow {
          position: absolute;
          left: 16%;
          right: 6%;
          bottom: 8%;
          height: 16%;
          background: radial-gradient(ellipse at center, rgba(32,32,32,0.2), transparent 70%);
          filter: blur(10px);
        }

        .monolith-img {
          position: absolute;
          right: 18%;
          bottom: 15%;
          width: 22%;
          min-width: 86px;
          pointer-events: none;
          user-select: none;
          filter:
            drop-shadow(0 22px 28px rgba(32,32,32,0.22))
            contrast(1.04);
          animation: monolithFloat 6.6s ease-in-out infinite;
        }

        .button-stack {
          display: grid;
          gap: 14px;
          margin-top: clamp(40px, 4vw, 60px);
          max-width: 430px;
        }

        .poster-button {
          position: relative;
          min-height: 62px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 0;
          color: ${C.ink};
          text-decoration: none;
          border-top: 1px solid ${C.lineSoft};
          font-weight: 700;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(10px);
          transition:
            color 0.22s ease,
            border-color 0.22s ease,
            padding-left 0.22s ease,
            background 0.22s ease;
        }

        .concept-section.is-inview .poster-button {
          animation: buttonIn 0.48s ease var(--button-delay, 240ms) forwards;
        }

        .poster-button:last-child {
          border-bottom: 1px solid ${C.lineSoft};
        }

        .poster-button span {
          position: relative;
          z-index: 1;
          display: block;
          font-size: clamp(18px, 1.45vw, 24px);
          line-height: 0.96;
          letter-spacing: -0.04em;
        }

        .poster-button::after {
          content: '→';
          color: rgba(32,32,32,0.38);
          font-size: 22px;
          line-height: 1;
          opacity: 0;
          transform: translateX(-6px);
          transition:
            opacity 0.22s ease,
            transform 0.22s ease,
            color 0.22s ease;
        }

        .poster-button:hover,
        .poster-button:focus-visible,
        .poster-button.is-active {
          color: ${C.pink};
          border-color: rgba(232, 79, 138, 0.46);
          padding-left: 12px;
          outline: none;
        }

        .poster-button:hover::after,
        .poster-button:focus-visible::after,
        .poster-button.is-active::after {
          opacity: 1;
          transform: translateX(0);
          color: ${C.pink};
        }

        .poster-button.is-dark {
          background: ${C.ink};
          color: ${C.paper};
          border-color: ${C.ink};
          padding-left: 18px;
          padding-right: 18px;
        }

        .poster-button.is-dark::after {
          color: rgba(244,239,227,0.52);
        }

        .poster-button.is-dark:hover,
        .poster-button.is-dark:focus-visible {
          color: ${C.paper};
          background: ${C.black};
          border-color: ${C.black};
        }

        .venue-frame {
          position: relative;
          width: min(100%, 700px);
          aspect-ratio: 2048 / 1140;
          margin-left: auto;
          padding: 22px;
          border: 1px solid ${C.lineSoft};
          background: rgba(255,255,255,0.15);
          overflow: hidden;
        }

        .venue-frame::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(rgba(32,32,32,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(32,32,32,0.08) 1px, transparent 1px);
          background-size: 48px 48px;
          opacity: 0.12;
          pointer-events: none;
        }

        .scan-line {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 2px;
          background: ${C.pink};
          box-shadow: 0 0 18px rgba(232, 79, 138, 0.45);
          z-index: 5;
          opacity: 0;
          animation: scanLine 5.8s linear infinite;
        }

        .venue-wrap {
          position: relative;
          z-index: 3;
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 20px 28px rgba(32,32,32,0.14));
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
          filter: saturate(0.86) contrast(1.02);
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

        .experience-visual {
          width: min(100%, 650px);
          margin-left: auto;
        }

        .timeline {
          margin-bottom: clamp(32px, 4vw, 50px);
        }

        .timeline-times {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 16px;
          color: ${C.inkSoft};
          font-size: clamp(11px, 0.96vw, 14px);
          line-height: 1;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
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
          height: 1px;
          transform: translateY(-50%);
          transform-origin: left center;
        }

        .timeline-base {
          background: ${C.line};
        }

        .timeline-fill {
          background: ${C.pink};
          animation: timelineFill 8s ease-in-out infinite;
        }

        .timeline-dot {
          position: absolute;
          top: 50%;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: ${C.inkSoft};
          transform: translateY(-50%);
        }

        .timeline-dot-left {
          left: 0;
          animation: dotLeft 8s ease-in-out infinite;
        }

        .timeline-dot-right {
          right: 0;
          animation: dotRight 8s ease-in-out infinite;
        }

        .experience-buttons {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .experience-buttons .poster-button {
          min-height: 150px;
          align-items: flex-end;
          padding: 22px;
          border: 1px solid ${C.lineSoft};
          background: rgba(255,255,255,0.16);
        }

        .experience-buttons .poster-button span {
          font-size: clamp(24px, 2.4vw, 40px);
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

        @keyframes buttonIn {
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
            transform: translateY(-10px) rotate(0.6deg);
          }
        }

        @keyframes wireTop {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }

          50% {
            transform: translateY(-8px) rotate(1.2deg);
          }
        }

        @keyframes wireFloor {
          0%,
          100% {
            transform: rotate(-8deg) skewX(-8deg) translateY(0);
          }

          50% {
            transform: rotate(-8deg) skewX(-8deg) translateY(8px);
          }
        }

        @keyframes scanLine {
          0% {
            left: 0%;
            opacity: 0;
          }

          8% {
            opacity: 1;
          }

          50% {
            opacity: 0.72;
          }

          100% {
            left: 100%;
            opacity: 0;
          }
        }

        @keyframes timelineFill {
          0%,
          16% {
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

          86%,
          100% {
            transform: translateY(-50%) scaleX(1);
            opacity: 0;
          }
        }

        @keyframes dotLeft {
          0%,
          16% {
            background: ${C.inkSoft};
          }

          24%,
          70% {
            background: ${C.pink};
          }

          86%,
          100% {
            background: ${C.inkSoft};
          }
        }

        @keyframes dotRight {
          0%,
          54% {
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
          .section-frame {
            grid-template-columns: 1fr;
            gap: 42px;
          }

          .section-axis {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            height: auto;
            min-height: 0;
          }

          .section-left,
          .section-right {
            padding-left: 34px;
          }

          .hero-visual-stage,
          .venue-frame,
          .experience-visual {
            margin-left: 0;
          }
        }

        @media (max-width: 820px) {
          .concept-section {
            min-height: auto;
            padding: 104px 0 74px;
          }

          .section-frame {
            width: calc(100% - 34px);
            min-height: auto;
          }

          .section-left,
          .section-right {
            padding-left: 24px;
          }

          .hero-title {
            font-size: clamp(48px, 15vw, 78px);
          }

          .section-title {
            font-size: clamp(46px, 13vw, 74px);
          }

          .venue-name {
            font-size: 11px;
            letter-spacing: 0.14em;
          }

          .hero-visual-stage {
            width: min(100%, 390px);
          }

          .venue-frame {
            padding: 14px;
          }

          .button-stack {
            margin-top: 32px;
          }

          .experience-buttons {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
          }

          .experience-buttons .poster-button {
            min-height: 120px;
            padding: 16px;
          }

          .experience-buttons .poster-button span {
            font-size: clamp(18px, 5vw, 28px);
          }
        }

        @media (max-width: 520px) {
          .section-frame {
            width: calc(100% - 28px);
          }

          .hero-title {
            font-size: clamp(42px, 14vw, 62px);
          }

          .section-title {
            font-size: clamp(40px, 12vw, 58px);
          }

          .poster-button span {
            font-size: 17px;
          }

          .timeline-times {
            font-size: 9px;
            letter-spacing: 0.08em;
          }

          .experience-buttons {
            gap: 8px;
          }

          .experience-buttons .poster-button {
            min-height: 104px;
            padding: 13px 10px;
          }

          .experience-buttons .poster-button span {
            font-size: 15px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .section-axis,
          .section-left,
          .section-right,
          .poster-button,
          .wireframe,
          .monolith-img,
          .scan-line,
          .timeline-fill,
          .timeline-dot {
            animation: none !important;
            transition: none !important;
          }

          .section-axis {
            transform: scaleY(1) !important;
          }

          .section-left,
          .section-right,
          .poster-button {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </>
  );
}

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
  paper: '#fff4c8',
  paperSoft: '#f6eecf',
  ink: '#191817',
  shadow: '#3b332e',
  blue: '#313a98',
  cyan: '#45b6d4',
  orange: '#f6a100',
  cream: '#fff7d8',
  black: '#1c1715',
  pink: '#e84f8a',
  line: 'rgba(25, 24, 23, 0.16)',
} as const;

const MONO = '"Space Mono", "Courier New", monospace';
const SCRIPT = '"Yellowtail", cursive';
const HEAVY = '"Archivo Black", "Arial Black", sans-serif';

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

function HeroGraphic() {
  return (
    <div className="hero-graphic" aria-hidden="true">
      <div className="sky-block" />
      <div className="night-block" />
      <div className="moon" />
      <div className="planet" />
      <div className="orange-disc">
        <span>17</span>
      </div>
    </div>
  );
}

function SpaceGraphic({ activeArea }: { activeArea: AreaId | null }) {
  return (
    <div className="space-graphic" aria-hidden="true">
      <div className="space-band" />

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

function ExperienceGraphic() {
  return (
    <div className="experience-graphic">
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
          <a
            key={item.href}
            href={item.href}
            className={`experience-button ${index === 1 ? 'is-dark' : ''}`}
          >
            <span className="experience-time">{item.time}</span>
            <span className="experience-title">{item.title}</span>
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
      document.querySelectorAll<HTMLElement>('.poster-section')
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-inview', entry.isIntersecting);
        });
      },
      {
        threshold: 0.32,
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
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Mono:wght@400;700&family=Yellowtail&display=swap"
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

        <section className="poster-section hero-section">
          <div className="poster-sheet hero-sheet">
            <div className="script-title">Concept</div>

            <div className="blue-bar">
              <span>17 LITTLE PORTLAND STREET</span>
            </div>

            <div className="hero-main">
              <div className="hero-left">
                <h1>CONCEPT.</h1>
              </div>

              <div className="hero-right">
                <HeroGraphic />
              </div>
            </div>

            <div className="bottom-strip">
              <span>17 LITTLE PORTLAND STREET</span>
              <span>LONDON</span>
            </div>
          </div>
        </section>

        <section id="space" className="poster-section space-section">
          <div className="poster-sheet space-sheet">
            <div className="script-title small-script">The Space</div>

            <div className="blue-bar">
              <span>THE TENT / CHEF'S STUDIO / THE STUDIO</span>
            </div>

            <div className="space-main">
              <div className="space-left">
                <h2>THE SPACE.</h2>

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

              <div className="space-right">
                <SpaceGraphic activeArea={activeArea} />
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="poster-section experience-section">
          <div className="poster-sheet experience-sheet">
            <div className="script-title small-script">The Experience</div>

            <div className="blue-bar">
              <span>DINING / AFTER DARK</span>
            </div>

            <div className="experience-main">
              <div className="experience-left">
                <h2>THE EXPERIENCE.</h2>
              </div>

              <div className="experience-right">
                <ExperienceGraphic />
              </div>
            </div>

            <div className="bottom-black">
              <span>17 LITTLE PORTLAND STREET</span>
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
          scrollbar-color: ${C.orange} ${C.paper};
        }

        body {
          overflow-x: hidden;
        }

        * {
          box-sizing: border-box;
        }

        ::selection {
          background: ${C.orange};
          color: ${C.cream};
        }

        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: ${C.paper};
        }

        ::-webkit-scrollbar-thumb {
          background: ${C.orange};
          border: 2px solid ${C.paper};
          background-clip: content-box;
        }

        .page {
          position: relative;
          min-height: 100svh;
          overflow-x: hidden;
          background: ${C.paper};
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
          opacity: 0.34;
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
          background: rgba(255, 244, 200, 0.78) !important;
          backdrop-filter: blur(18px) !important;
          -webkit-backdrop-filter: blur(18px) !important;
          border-bottom: 1px solid rgba(25, 24, 23, 0.12);
          transition:
            background 0.25s ease,
            box-shadow 0.25s ease !important;
        }

        .concept-nav-shell.is-scrolled .scene-nav {
          background: rgba(255, 244, 200, 0.94) !important;
          box-shadow: 0 14px 36px rgba(25, 24, 23, 0.08);
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
          color: ${C.orange} !important;
          opacity: 1 !important;
        }

        .scene-nav--space .scene-nav-burger span {
          background: ${C.ink} !important;
        }

        .poster-section {
          position: relative;
          z-index: 2;
          min-height: 100svh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(96px, 8vw, 128px) 0 clamp(50px, 5vw, 76px);
        }

        .poster-sheet {
          position: relative;
          width: min(1120px, calc(100% - 72px));
          min-height: min(760px, 78svh);
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: rgba(255, 244, 200, 0.18);
          opacity: 0;
          transform: translateY(18px);
        }

        .poster-section.is-inview .poster-sheet {
          animation: sheetIn 0.72s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        .script-title {
          position: relative;
          z-index: 3;
          color: ${C.orange};
          font-family: ${SCRIPT};
          font-size: clamp(72px, 9vw, 138px);
          line-height: 0.9;
          letter-spacing: 0.01em;
          text-shadow:
            5px 5px 0 rgba(25, 24, 23, 0.82),
            0 0 1px rgba(25, 24, 23, 0.2);
          margin: 0 0 26px;
        }

        .small-script {
          color: ${C.cyan};
          text-shadow:
            5px 5px 0 rgba(25, 24, 23, 0.72),
            0 0 1px rgba(25, 24, 23, 0.2);
        }

        .blue-bar {
          position: relative;
          z-index: 2;
          width: 100%;
          min-height: clamp(72px, 6vw, 92px);
          display: flex;
          align-items: center;
          padding: 0 clamp(28px, 4vw, 58px);
          background: ${C.blue};
          color: ${C.cream};
          overflow: hidden;
        }

        .blue-bar span {
          width: 100%;
          display: block;
          font-family: ${HEAVY};
          font-size: clamp(24px, 3.4vw, 52px);
          line-height: 1;
          letter-spacing: 0.48em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .hero-main,
        .space-main,
        .experience-main {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 0.76fr) minmax(420px, 1fr);
          align-items: center;
          gap: clamp(32px, 5vw, 70px);
        }

        .hero-main {
          min-height: 460px;
          background: linear-gradient(
            90deg,
            ${C.cyan} 0%,
            ${C.cyan} 45%,
            ${C.black} 45%,
            ${C.black} 100%
          );
          padding: clamp(34px, 4vw, 56px);
        }

        .hero-left h1,
        .space-left h2,
        .experience-left h2 {
          margin: 0;
          font-family: ${HEAVY};
          font-weight: 900;
          line-height: 0.88;
          text-transform: uppercase;
          letter-spacing: -0.06em;
        }

        .hero-left h1 {
          color: ${C.cream};
          font-size: clamp(56px, 7.8vw, 126px);
          text-shadow: 6px 6px 0 rgba(25, 24, 23, 0.55);
        }

        .hero-right {
          position: relative;
          min-height: 430px;
        }

        .hero-graphic {
          position: absolute;
          inset: 0;
        }

        .sky-block,
        .night-block {
          position: absolute;
          inset: 0;
        }

        .planet {
          position: absolute;
          left: 16%;
          bottom: 8%;
          width: min(300px, 44vw);
          aspect-ratio: 1;
          border-radius: 50%;
          background:
            radial-gradient(circle at 30% 28%, rgba(255,255,255,0.35), transparent 21%),
            radial-gradient(circle at 48% 45%, #6ca8db, #284a92 72%);
          box-shadow:
            -28px 20px 40px rgba(246, 161, 0, 0.35),
            26px 28px 38px rgba(0, 0, 0, 0.42);
        }

        .moon {
          position: absolute;
          right: 15%;
          top: 18%;
          width: 124px;
          aspect-ratio: 1;
          border-radius: 50%;
          background: ${C.cream};
        }

        .moon::after {
          content: '';
          position: absolute;
          inset: -3px -18px 0 22px;
          border-radius: 50%;
          background: ${C.black};
        }

        .orange-disc {
          position: absolute;
          left: 0;
          bottom: -22px;
          width: clamp(130px, 16vw, 190px);
          aspect-ratio: 1;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: ${C.orange};
          color: ${C.cream};
          box-shadow: 0 18px 36px rgba(25, 24, 23, 0.18);
        }

        .orange-disc span {
          font-family: ${HEAVY};
          font-size: clamp(58px, 6vw, 88px);
          line-height: 1;
        }

        .bottom-strip {
          display: flex;
          justify-content: space-between;
          gap: 24px;
          padding: 18px 0 0;
          color: ${C.ink};
          font-family: ${MONO};
          font-size: clamp(11px, 1vw, 16px);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .space-main {
          min-height: 500px;
          padding: clamp(38px, 5vw, 64px) 0;
        }

        .space-left h2,
        .experience-left h2 {
          color: ${C.ink};
          font-size: clamp(54px, 7.4vw, 118px);
          text-shadow: 7px 7px 0 rgba(25, 24, 23, 0.14);
        }

        .button-stack {
          display: grid;
          gap: 12px;
          margin-top: clamp(34px, 4vw, 56px);
          max-width: 420px;
        }

        .poster-button {
          position: relative;
          min-height: 62px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 15px 18px;
          color: ${C.ink};
          text-decoration: none;
          border: 2px solid ${C.ink};
          background: transparent;
          font-family: ${HEAVY};
          font-weight: 900;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(10px);
          transition:
            color 0.22s ease,
            background 0.22s ease,
            border-color 0.22s ease,
            transform 0.22s ease;
        }

        .poster-section.is-inview .poster-button {
          animation: buttonIn 0.48s ease var(--button-delay, 240ms) forwards;
        }

        .poster-button span {
          position: relative;
          z-index: 1;
          display: block;
          font-size: clamp(18px, 1.6vw, 27px);
          line-height: 0.96;
          letter-spacing: -0.04em;
        }

        .poster-button::after {
          content: '→';
          font-size: 24px;
          line-height: 1;
          opacity: 0;
          transform: translateX(-6px);
          transition:
            opacity 0.22s ease,
            transform 0.22s ease;
        }

        .poster-button:hover,
        .poster-button:focus-visible,
        .poster-button.is-active {
          color: ${C.cream};
          background: ${C.blue};
          border-color: ${C.blue};
          outline: none;
        }

        .poster-button:hover::after,
        .poster-button:focus-visible::after,
        .poster-button.is-active::after {
          opacity: 1;
          transform: translateX(0);
        }

        .poster-button.is-dark {
          color: ${C.cream};
          background: ${C.black};
          border-color: ${C.black};
        }

        .space-graphic {
          position: relative;
          width: 100%;
          min-height: 430px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .space-band {
          position: absolute;
          left: -5%;
          right: -5%;
          top: 50%;
          height: 62%;
          background: linear-gradient(90deg, ${C.cyan} 0 45%, ${C.black} 45% 100%);
          transform: translateY(-50%);
        }

        .venue-wrap {
          position: relative;
          z-index: 3;
          width: min(100%, 720px);
          aspect-ratio: 2048 / 1140;
          filter:
            drop-shadow(0 24px 32px rgba(25, 24, 23, 0.22))
            saturate(0.94)
            contrast(1.04);
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

        .experience-main {
          min-height: 500px;
          padding: clamp(38px, 5vw, 64px) 0;
        }

        .experience-graphic {
          width: 100%;
        }

        .timeline {
          margin-bottom: clamp(28px, 3.6vw, 46px);
        }

        .timeline-times {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 14px;
          color: ${C.ink};
          font-family: ${MONO};
          font-size: clamp(11px, 1vw, 15px);
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .timeline-track {
          position: relative;
          height: 24px;
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
          background: rgba(25, 24, 23, 0.22);
        }

        .timeline-fill {
          background: ${C.orange};
          animation: timelineFill 8s ease-in-out infinite;
        }

        .timeline-dot {
          position: absolute;
          top: 50%;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: ${C.ink};
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

        .experience-button {
          min-height: 220px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 24px;
          color: ${C.ink};
          text-decoration: none;
          background: ${C.cyan};
          border: 2px solid ${C.ink};
          transition:
            transform 0.22s ease,
            box-shadow 0.22s ease;
        }

        .experience-button.is-dark {
          color: ${C.cream};
          background: ${C.black};
        }

        .experience-button:hover,
        .experience-button:focus-visible {
          transform: translateY(-4px);
          box-shadow: 10px 10px 0 ${C.orange};
          outline: none;
        }

        .experience-time {
          margin-bottom: 18px;
          color: ${C.orange};
          font-family: ${MONO};
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .experience-title {
          font-family: ${HEAVY};
          font-size: clamp(32px, 4vw, 66px);
          line-height: 0.9;
          letter-spacing: -0.07em;
          text-transform: uppercase;
        }

        .bottom-black {
          min-height: clamp(82px, 8vw, 126px);
          display: flex;
          align-items: center;
          padding: 0 clamp(24px, 4vw, 52px);
          background: ${C.black};
          color: ${C.cream};
        }

        .bottom-black span {
          font-family: ${HEAVY};
          font-size: clamp(34px, 5.7vw, 92px);
          line-height: 0.9;
          letter-spacing: -0.055em;
          text-transform: uppercase;
        }

        @keyframes sheetIn {
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
            background: ${C.ink};
          }

          24%,
          70% {
            background: ${C.orange};
          }

          86%,
          100% {
            background: ${C.ink};
          }
        }

        @keyframes dotRight {
          0%,
          54% {
            background: ${C.ink};
          }

          68%,
          82% {
            background: ${C.orange};
          }

          92%,
          100% {
            background: ${C.ink};
          }
        }

        @media (max-width: 1120px) {
          .hero-main,
          .space-main,
          .experience-main {
            grid-template-columns: 1fr;
          }

          .hero-right {
            min-height: 360px;
          }

          .space-graphic {
            min-height: 360px;
          }
        }

        @media (max-width: 820px) {
          .poster-section {
            min-height: auto;
            padding: 96px 0 54px;
          }

          .poster-sheet {
            width: calc(100% - 30px);
            min-height: auto;
          }

          .script-title {
            font-size: clamp(58px, 17vw, 92px);
            margin-bottom: 18px;
          }

          .blue-bar {
            min-height: 58px;
            padding: 0 18px;
          }

          .blue-bar span {
            font-size: clamp(16px, 5vw, 28px);
            letter-spacing: 0.24em;
          }

          .hero-main,
          .space-main,
          .experience-main {
            gap: 28px;
            padding: 28px 18px;
          }

          .hero-left h1,
          .space-left h2,
          .experience-left h2 {
            font-size: clamp(42px, 13vw, 72px);
          }

          .hero-right {
            min-height: 300px;
          }

          .planet {
            width: 190px;
          }

          .moon {
            width: 84px;
          }

          .orange-disc {
            width: 120px;
          }

          .orange-disc span {
            font-size: 52px;
          }

          .bottom-strip {
            flex-direction: column;
            gap: 6px;
            font-size: 10px;
          }

          .button-stack {
            max-width: none;
          }

          .space-graphic {
            min-height: 300px;
          }

          .experience-buttons {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
          }

          .experience-button {
            min-height: 150px;
            padding: 16px;
          }

          .experience-title {
            font-size: clamp(22px, 7vw, 38px);
          }

          .bottom-black span {
            font-size: clamp(28px, 9vw, 54px);
          }
        }

        @media (max-width: 520px) {
          .blue-bar span {
            letter-spacing: 0.12em;
          }

          .experience-button {
            min-height: 120px;
            padding: 13px 10px;
          }

          .experience-time {
            font-size: 8px;
            letter-spacing: 0.08em;
          }

          .experience-title {
            font-size: 18px;
          }

          .timeline-times {
            font-size: 9px;
            letter-spacing: 0.08em;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .poster-sheet,
          .poster-button,
          .timeline-fill,
          .timeline-dot {
            animation: none !important;
            transition: none !important;
          }

          .poster-sheet,
          .poster-button {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </>
  );
}

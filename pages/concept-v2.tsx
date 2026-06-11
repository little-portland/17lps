'use client';

import Head from 'next/head';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from 'react';
import SceneNav from '@components/SceneNav';

const C = {
  cream: '#F4EFE3',
  cream2: '#E9E2D2',
  ink: '#070707',
  black: '#000000',
  red: '#EB3A21',
  redDark: '#B92314',
  grey: '#8D877D',
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
    description: 'Dinner in the tent. A hidden room below street level.',
  },
  {
    id: 'chefs',
    title: "CHEF'S STUDIO",
    href: '/chefstudio-test',
    highlight: ASSETS.chefs,
    description: 'A tighter dining chamber. Controlled, intimate, cinematic.',
  },
  {
    id: 'studio',
    title: 'THE STUDIO',
    href: '/studio-test',
    highlight: ASSETS.studio,
    description: 'A room for sound, culture and late-night transmission.',
  },
];

const EXPERIENCE = [
  {
    title: 'DINING',
    href: '/food-test',
    meta: '20:00 / 20:30',
    dark: false,
  },
  {
    title: 'AFTER DARK',
    href: '/theclub-test',
    meta: '22:00',
    dark: true,
  },
];

const WINDOWS = [
  // outer ring — closest black windows
  { angle: 0, radius: '46vmin', w: '5.4vmin', h: '14vmin', rot: 0 },
  { angle: 30, radius: '46vmin', w: '5vmin', h: '13vmin', rot: 0 },
  { angle: 60, radius: '46vmin', w: '5vmin', h: '13vmin', rot: 0 },
  { angle: 90, radius: '46vmin', w: '13vmin', h: '13vmin', rot: 45 },
  { angle: 120, radius: '46vmin', w: '5vmin', h: '13vmin', rot: 0 },
  { angle: 150, radius: '46vmin', w: '5vmin', h: '13vmin', rot: 0 },
  { angle: 180, radius: '46vmin', w: '5.4vmin', h: '14vmin', rot: 0 },
  { angle: 210, radius: '46vmin', w: '5vmin', h: '13vmin', rot: 0 },
  { angle: 240, radius: '46vmin', w: '5vmin', h: '13vmin', rot: 0 },
  { angle: 270, radius: '46vmin', w: '13vmin', h: '13vmin', rot: 45 },
  { angle: 300, radius: '46vmin', w: '5vmin', h: '13vmin', rot: 0 },
  { angle: 330, radius: '46vmin', w: '5vmin', h: '13vmin', rot: 0 },

  // middle ring
  { angle: 0, radius: '31vmin', w: '3.8vmin', h: '9.5vmin', rot: 0 },
  { angle: 45, radius: '31vmin', w: '7vmin', h: '7vmin', rot: 45 },
  { angle: 90, radius: '31vmin', w: '3.8vmin', h: '9.5vmin', rot: 0 },
  { angle: 135, radius: '31vmin', w: '7vmin', h: '7vmin', rot: 45 },
  { angle: 180, radius: '31vmin', w: '3.8vmin', h: '9.5vmin', rot: 0 },
  { angle: 225, radius: '31vmin', w: '7vmin', h: '7vmin', rot: 45 },
  { angle: 270, radius: '31vmin', w: '3.8vmin', h: '9.5vmin', rot: 0 },
  { angle: 315, radius: '31vmin', w: '7vmin', h: '7vmin', rot: 45 },

  // inner ring — distant windows
  { angle: 0, radius: '17vmin', w: '2.3vmin', h: '5.8vmin', rot: 0 },
  { angle: 60, radius: '17vmin', w: '2.3vmin', h: '5.8vmin', rot: 0 },
  { angle: 120, radius: '17vmin', w: '2.3vmin', h: '5.8vmin', rot: 0 },
  { angle: 180, radius: '17vmin', w: '2.3vmin', h: '5.8vmin', rot: 0 },
  { angle: 240, radius: '17vmin', w: '2.3vmin', h: '5.8vmin', rot: 0 },
  { angle: 300, radius: '17vmin', w: '2.3vmin', h: '5.8vmin', rot: 0 },
];

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

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
    >
      <span className="action-title">{title}</span>
      <span className="action-meta">
        {meta} <span className="action-arrow">→</span>
      </span>
    </a>
  );
}

function CorridorWindows({ progress }: { progress: number }) {
  return (
    <div className="corridor-windows" aria-hidden="true">
      {WINDOWS.map((win, index) => {
        const pulse = 1 + progress * 0.035;

        return (
          <span
            key={`${win.angle}-${index}`}
            className="window-panel"
            style={
              {
                '--angle': `${win.angle}deg`,
                '--radius': win.radius,
                '--w': win.w,
                '--h': win.h,
                '--rot': `${win.rot}deg`,
                '--pulse': pulse,
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
}

function CorridorFrame({ progress }: { progress: number }) {
  const gateScale = 1 + progress * 0.14;

  return (
    <div className="corridor-frame" aria-hidden="true">
      <div
        className="corridor-gate corridor-gate-a"
        style={{ transform: `translate(-50%, -50%) scale(${gateScale})` }}
      />
      <div
        className="corridor-gate corridor-gate-b"
        style={{ transform: `translate(-50%, -50%) scale(${gateScale * 0.72})` }}
      />
      <div
        className="corridor-gate corridor-gate-c"
        style={{ transform: `translate(-50%, -50%) scale(${gateScale * 0.46})` }}
      />

      <CorridorWindows progress={progress} />

      <div className="vanish-point" />
    </div>
  );
}

export default function ConceptPage() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeArea, setActiveArea] = useState<AreaId | null>(null);
  const [isTouchMode, setIsTouchMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuReady, setMenuReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setMenuReady(true), 350);

    const update = () => {
      const track = trackRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const trackTop = window.scrollY + rect.top;
      const scrollable = Math.max(track.offsetHeight - window.innerHeight, 1);
      const nextProgress = clamp((window.scrollY - trackTop) / scrollable, 0, 1);

      setScrollProgress(nextProgress);
      setIsScrolled(window.scrollY > 18);
    };

    update();

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
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

  const slidePosition = scrollProgress * 2;

  const panelStyle = useMemo(
    () =>
      (index: number): CSSProperties => {
        const diff = Math.abs(slidePosition - index);
        const closeness = clamp(1 - diff, 0, 1);

        return {
          opacity: clamp(1 - diff * 1.35, 0, 1),
          transform: `translate3d(-50%, -50%, 0) scale(${0.42 + closeness * 0.58})`,
          filter: `blur(${diff * 5}px)`,
          pointerEvents: diff < 0.42 ? 'auto' : 'none',
          zIndex: Math.round(closeness * 20) + 20,
        };
      },
    [slidePosition]
  );

  const activeCopy = AREAS.find((area) => area.id === activeArea);

  const handleAreaClick =
    (areaId: AreaId) => (event: MouseEvent<HTMLAnchorElement>) => {
      if (isTouchMode && activeArea !== areaId) {
        event.preventDefault();
        setActiveArea(areaId);
      }
    };

  const handleAreaEnter = (areaId: AreaId) => {
    if (!isTouchMode) setActiveArea(areaId);
  };

  const handleAreaLeave = () => {
    if (!isTouchMode) setActiveArea(null);
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

        <section ref={trackRef} className="odyssey-track">
          <div className="odyssey-sticky">
            <div className="paper-texture" aria-hidden="true" />

            <CorridorFrame progress={scrollProgress} />

            <div className="panel panel-concept" style={panelStyle(0)}>
              <div className="concept-copy">
                <p className="tiny-label">1968 CLASSIC // UNDERGROUND PROGRAMME</p>

                <h1 className="main-title">CONCEPT.</h1>

                <p className="address">17 Little Portland Street, London</p>

                <p className="intro">
                  A concealed sequence below street level. Dinner, architecture,
                  sound and late-night movement arranged as one continuous
                  cinematic passage.
                </p>
              </div>
            </div>

            <div className="panel panel-space" style={panelStyle(1)}>
              <div className="section-grid">
                <div className="section-copy">
                  <p className="tiny-label">MODULE 01</p>

                  <h2 className="section-title">THE SPACE</h2>

                  <p className="section-text">
                    Three chambers inside one underground vessel. Hover or tap to
                    isolate each room.
                  </p>

                  <p className="active-room">
                    {activeCopy?.description || 'Select a chamber to preview the room.'}
                  </p>
                </div>

                <div className="space-visual">
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

                  <div className="zone-controls" onMouseLeave={handleAreaLeave}>
                    {AREAS.map((area) => {
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
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="panel panel-experience" style={panelStyle(2)}>
              <div className="section-grid experience-grid">
                <div className="section-copy">
                  <p className="tiny-label">MODULE 02</p>

                  <h2 className="section-title">THE EXPERIENCE</h2>

                  <p className="section-text">
                    A clean signal change from seated dinner to after-dark Little
                    Portland energy.
                  </p>
                </div>

                <div className="experience-content">
                  <div className="timeline" aria-hidden="true">
                    <div className="timeline-times">
                      <span>20:00 / 20:30</span>
                      <span>22:00</span>
                    </div>

                    <div className="timeline-track">
                      <span className="timeline-line" />
                      <span className="timeline-fill" />
                      <span className="timeline-dot timeline-dot-left" />
                      <span className="timeline-dot timeline-dot-right" />
                    </div>
                  </div>

                  <div className="experience-buttons">
                    {EXPERIENCE.map((item) => (
                      <ActionCard
                        key={item.href}
                        href={item.href}
                        title={item.title}
                        meta={item.meta}
                        dark={item.dark}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="scroll-indicator" aria-hidden="true">
              <span />
              Scroll
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
          background: ${C.cream2};
          color: ${C.ink};
          font-family: ${MONO};
          -webkit-font-smoothing: antialiased;
          text-rendering: geometricPrecision;
          scrollbar-color: ${C.red} ${C.cream2};
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
          background: ${C.cream2};
        }

        ::-webkit-scrollbar-thumb {
          background: ${C.red};
          border: 2px solid ${C.cream2};
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
          background: rgba(244, 239, 227, 0.74) !important;
          backdrop-filter: blur(18px) !important;
          -webkit-backdrop-filter: blur(18px) !important;
          border-bottom: 1px solid rgba(0, 0, 0, 0.12);
          transition:
            background 0.25s ease,
            box-shadow 0.25s ease !important;
        }

        .concept-nav-shell.is-scrolled .scene-nav {
          background: rgba(244, 239, 227, 0.92) !important;
          box-shadow: 0 14px 36px rgba(0, 0, 0, 0.08);
        }

        .scene-nav,
        .scene-nav a,
        .scene-nav-mobile,
        .scene-nav-mobile a {
          font-family: ${MONO} !important;
          letter-spacing: 0.16em !important;
        }

        .scene-nav a[href='/concept'],
        .scene-nav a[href='/concept-test'],
        .scene-nav a[aria-current='page'] {
          color: ${C.red} !important;
          opacity: 1 !important;
        }

        .page {
          min-height: 100svh;
          background: ${C.cream2};
        }

        .odyssey-track {
          position: relative;
          height: 340svh;
          background: ${C.cream2};
        }

        .odyssey-sticky {
          position: sticky;
          top: 0;
          width: 100%;
          height: 100svh;
          overflow: hidden;
          background: ${C.cream};
          isolation: isolate;
        }

        .paper-texture {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background-image: url('${ASSETS.texture}');
          background-size: 720px auto;
          background-repeat: repeat;
          background-position: center;
          opacity: 0.32;
          mix-blend-mode: multiply;
        }

        .odyssey-sticky::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background:
            radial-gradient(circle at 50% 52%, rgba(255, 255, 255, 0.95), transparent 30%),
            linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.075),
              transparent 15%,
              transparent 85%,
              rgba(0, 0, 0, 0.075)
            );
          opacity: 0.72;
        }

        .corridor-frame {
          position: absolute;
          inset: 70px 0 0;
          z-index: 3;
          pointer-events: none;
          perspective: 900px;
        }

        .corridor-gate {
          position: absolute;
          left: 50%;
          top: 50%;
          border: 2px solid rgba(0, 0, 0, 0.06);
          transform-origin: center;
        }

        .corridor-gate-a {
          width: 92vw;
          height: 76vh;
        }

        .corridor-gate-b {
          width: 92vw;
          height: 76vh;
        }

        .corridor-gate-c {
          width: 92vw;
          height: 76vh;
        }

        .vanish-point {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: ${C.red};
          transform: translate(-50%, -50%);
          opacity: 0.12;
        }

        .corridor-windows {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
        }

        .window-panel {
          position: absolute;
          left: 50%;
          top: 50%;
          display: block;
          width: var(--w);
          height: var(--h);
          background: ${C.black};
          transform:
            translate(-50%, -50%)
            rotate(var(--angle))
            translateY(calc(-1 * var(--radius)))
            rotate(var(--rot))
            scale(var(--pulse));
          transform-origin: center;
          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08);
        }

        .panel {
          position: absolute;
          left: 50%;
          top: calc(50% + 35px);
          z-index: 20;
          width: min(1320px, 84vw);
          min-height: 66vh;
          display: grid;
          place-items: center;
          will-change: transform, opacity, filter;
        }

        .concept-copy {
          width: min(900px, 100%);
          text-align: center;
        }

        .tiny-label {
          margin: 0 0 22px;
          color: rgba(0, 0, 0, 0.58);
          font-size: 10px;
          line-height: 1.1;
          font-weight: 700;
          letter-spacing: 0.28em;
          text-transform: uppercase;
        }

        .main-title {
          margin: 0;
          color: ${C.red};
          font-family: ${MONO};
          font-size: clamp(76px, 14vw, 210px);
          font-weight: 700;
          line-height: 0.82;
          letter-spacing: -0.075em;
          text-transform: uppercase;
          text-shadow:
            0.018em 0 0 currentColor,
            0 14px 0 rgba(0, 0, 0, 0.08);
        }

        .address {
          margin: clamp(20px, 2.4vw, 36px) 0 0;
          color: ${C.ink};
          font-size: clamp(13px, 1.3vw, 22px);
          line-height: 1.3;
          font-weight: 700;
          letter-spacing: 0.26em;
          text-transform: uppercase;
        }

        .intro {
          max-width: 720px;
          margin: clamp(34px, 4.5vw, 60px) auto 0;
          color: rgba(0, 0, 0, 0.66);
          font-size: clamp(11px, 1vw, 15px);
          line-height: 1.9;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .section-grid {
          width: min(1320px, 100%);
          display: grid;
          grid-template-columns: minmax(300px, 0.44fr) minmax(0, 1fr);
          gap: clamp(34px, 5vw, 76px);
          align-items: center;
        }

        .section-copy {
          align-self: center;
        }

        .section-title {
          margin: 0;
          color: ${C.ink};
          font-size: clamp(58px, 8.2vw, 136px);
          line-height: 0.9;
          font-weight: 700;
          letter-spacing: -0.065em;
          text-transform: uppercase;
          text-shadow:
            0.016em 0 0 currentColor,
            0 10px 0 rgba(0, 0, 0, 0.07);
        }

        .section-text {
          max-width: 520px;
          margin: 28px 0 0;
          color: rgba(0, 0, 0, 0.62);
          font-size: clamp(11px, 0.95vw, 15px);
          line-height: 1.85;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .active-room {
          max-width: 460px;
          min-height: 62px;
          margin: 32px 0 0;
          padding-left: 18px;
          border-left: 5px solid ${C.red};
          color: ${C.redDark};
          font-size: 11px;
          line-height: 1.8;
          font-weight: 700;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }

        .space-visual {
          min-width: 0;
        }

        .venue-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 2048 / 1140;
          filter: drop-shadow(0 22px 32px rgba(0, 0, 0, 0.16));
        }

        .venue-wrap::before {
          content: '';
          position: absolute;
          inset: -4%;
          border: 1px solid rgba(0, 0, 0, 0.14);
          background: rgba(255, 255, 255, 0.24);
          z-index: -1;
        }

        .venue-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          user-select: none;
          pointer-events: none;
        }

        .venue-base {
          z-index: 1;
        }

        .venue-highlight {
          z-index: 2;
          opacity: 0;
          visibility: hidden;
          transition:
            opacity 0.16s ease,
            visibility 0.16s ease;
        }

        .venue-highlight.is-active {
          opacity: 1;
          visibility: visible;
        }

        .zone-controls {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
          margin-top: 22px;
        }

        .experience-grid {
          align-items: center;
        }

        .experience-content {
          align-self: center;
        }

        .timeline {
          margin-bottom: 30px;
        }

        .timeline-times {
          display: flex;
          justify-content: space-between;
          margin-bottom: 14px;
          color: rgba(0, 0, 0, 0.62);
          font-size: clamp(11px, 1vw, 15px);
          font-weight: 700;
          letter-spacing: 0.18em;
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
          background: rgba(0, 0, 0, 0.22);
        }

        .timeline-fill {
          background: ${C.red};
          animation: signalFill 8.5s ease-in-out infinite;
        }

        .timeline-dot {
          position: absolute;
          top: 50%;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: ${C.grey};
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

        .experience-buttons {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .action-card {
          min-height: 104px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 6px;
          padding: 18px 20px;
          color: ${C.ink};
          text-decoration: none;
          border: 1px solid rgba(0, 0, 0, 0.32);
          background: rgba(255, 255, 255, 0.32);
          box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.06);
          transition:
            transform 0.22s ease,
            background 0.22s ease,
            color 0.22s ease,
            border-color 0.22s ease,
            box-shadow 0.22s ease;
        }

        .action-card.is-dark {
          background: ${C.ink};
          color: ${C.cream};
          border-color: ${C.ink};
        }

        .action-card:hover,
        .action-card:focus-visible,
        .action-card.is-active {
          transform: translate(-3px, -3px);
          background: rgba(235, 58, 33, 0.1);
          border-color: ${C.red};
          box-shadow: 10px 10px 0 rgba(235, 58, 33, 0.18);
          outline: none;
        }

        .action-card.is-dark:hover,
        .action-card.is-dark:focus-visible {
          background: ${C.black};
        }

        .action-title {
          display: block;
          font-size: clamp(18px, 1.7vw, 30px);
          line-height: 0.96;
          font-weight: 700;
          letter-spacing: 0;
          text-transform: uppercase;
        }

        .action-meta {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: rgba(0, 0, 0, 0.56);
          font-size: 10px;
          line-height: 1;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .action-card.is-dark .action-meta {
          color: rgba(244, 239, 227, 0.66);
        }

        .action-arrow {
          font-size: 2em;
          line-height: 0.55;
          transform: translateY(-0.02em);
        }

        .scroll-indicator {
          position: absolute;
          left: 50%;
          bottom: 22px;
          z-index: 60;
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(0, 0, 0, 0.5);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          transform: translateX(-50%);
          pointer-events: none;
        }

        .scroll-indicator span {
          width: 34px;
          height: 1px;
          background: rgba(0, 0, 0, 0.45);
          animation: scrollPulse 1.8s ease-in-out infinite;
        }

        @keyframes scrollPulse {
          0%,
          100% {
            transform: scaleX(0.45);
            opacity: 0.38;
          }

          50% {
            transform: scaleX(1);
            opacity: 1;
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
            background: ${C.grey};
          }

          24%,
          68% {
            background: ${C.red};
          }

          80%,
          100% {
            background: ${C.grey};
          }
        }

        @keyframes rightDot {
          0%,
          48% {
            background: ${C.grey};
          }

          62%,
          76% {
            background: ${C.red};
          }

          86%,
          100% {
            background: ${C.grey};
          }
        }

        @media (max-width: 1180px) {
          .section-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .section-copy {
            max-width: 760px;
          }

          .zone-controls {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 760px) {
          .odyssey-track {
            height: auto;
          }

          .odyssey-sticky {
            position: relative;
            height: auto;
            min-height: 100svh;
            overflow: visible;
            padding: 92px 18px 70px;
          }

          .corridor-frame {
            inset: 72px 0 0;
            height: 90svh;
          }

          .window-panel {
            opacity: 0.26;
          }

          .panel {
            position: relative;
            left: auto;
            top: auto;
            width: 100%;
            min-height: auto;
            padding: 46px 0;
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
            pointer-events: auto !important;
          }

          .concept-copy,
          .section-grid {
            width: min(100%, 620px);
          }

          .concept-copy {
            margin: 0 auto;
            text-align: left;
          }

          .main-title {
            font-size: clamp(52px, 16vw, 84px);
            letter-spacing: -0.08em;
          }

          .address {
            font-size: 11px;
            letter-spacing: 0.14em;
          }

          .intro {
            font-size: 10px;
          }

          .section-grid {
            grid-template-columns: 1fr;
          }

          .section-title {
            font-size: clamp(48px, 13vw, 74px);
          }

          .section-text,
          .active-room {
            font-size: 10px;
          }

          .experience-buttons {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 9px;
          }

          .action-card {
            min-height: 82px;
            padding: 13px 10px;
          }

          .action-title {
            font-size: clamp(13px, 4vw, 18px);
          }

          .action-meta {
            font-size: 7px;
            letter-spacing: 0.14em;
          }

          .timeline-times {
            font-size: 10px;
            letter-spacing: 0.08em;
          }

          .scroll-indicator {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .timeline-fill,
          .timeline-dot,
          .scroll-indicator span {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}

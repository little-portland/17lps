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
  softGrey: '#C8C0B3',
  pink: '#E44E83',
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

function CorridorWindows() {
  return (
    <div className="corridor-windows" aria-hidden="true">
      <span className="cw cw-01" />
      <span className="cw cw-02" />
      <span className="cw cw-03" />
      <span className="cw cw-04" />
      <span className="cw cw-05" />
      <span className="cw cw-06" />
      <span className="cw cw-07" />
      <span className="cw cw-08" />
      <span className="cw cw-09" />
      <span className="cw cw-10" />
      <span className="cw cw-11" />
      <span className="cw cw-12" />
      <span className="cw cw-13" />
      <span className="cw cw-14" />
      <span className="cw cw-15" />
      <span className="cw cw-16" />
      <span className="cw cw-17" />
      <span className="cw cw-18" />
    </div>
  );
}

function CorridorFrame({ progress }: { progress: number }) {
  const gateScale = 1 + progress * 0.18;
  const gateOpacity = 0.9 - progress * 0.22;

  return (
    <div className="corridor-frame" aria-hidden="true">
      <div
        className="corridor-gate corridor-gate-a"
        style={{
          transform: `translate(-50%, -50%) scale(${gateScale})`,
          opacity: gateOpacity,
        }}
      />
      <div
        className="corridor-gate corridor-gate-b"
        style={{
          transform: `translate(-50%, -50%) scale(${gateScale * 0.76})`,
          opacity: gateOpacity * 0.78,
        }}
      />
      <div
        className="corridor-gate corridor-gate-c"
        style={{
          transform: `translate(-50%, -50%) scale(${gateScale * 0.52})`,
          opacity: gateOpacity * 0.62,
        }}
      />

      <CorridorWindows />

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
      const top = window.scrollY + rect.top;
      const scrollable = Math.max(track.offsetHeight - window.innerHeight, 1);
      const next = clamp((window.scrollY - top) / scrollable, 0, 1);

      setScrollProgress(next);
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
        const direction = index - slidePosition;

        return {
          opacity: clamp(1 - diff * 1.35, 0, 1),
          transform: `
            translate3d(0, ${direction * 7}vh, 0)
            scale(${0.72 + closeness * 0.28})
          `,
          filter: `blur(${diff * 4}px)`,
          pointerEvents: diff < 0.45 ? 'auto' : 'none',
          zIndex: Math.round(closeness * 10),
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

                  <div
                    className="zone-controls"
                    onMouseLeave={handleAreaLeave}
                  >
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
          background: rgba(244, 239, 227, 0.72) !important;
          backdrop-filter: blur(18px) !important;
          -webkit-backdrop-filter: blur(18px) !important;
          border-bottom: 1px solid rgba(0, 0, 0, 0.12);
          transition:
            background 0.25s ease,
            box-shadow 0.25s ease !important;
        }

        .concept-nav-shell.is-scrolled .scene-nav {
          background: rgba(244, 239, 227, 0.9) !important;
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
          height: 360svh;
          background: ${C.cream2};
        }

        .odyssey-sticky {
          position: sticky;
          top: 0;
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
          background-size: 680px auto;
          background-repeat: repeat;
          background-position: center;
          opacity: 0.34;
          mix-blend-mode: multiply;
        }

        .odyssey-sticky::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background:
            radial-gradient(circle at 50% 48%, rgba(255,255,255,0.9), transparent 28%),
            linear-gradient(90deg, rgba(0,0,0,0.08), transparent 16%, transparent 84%, rgba(0,0,0,0.08));
          opacity: 0.68;
        }

        .corridor-frame {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
          perspective: 900px;
        }

        .corridor-gate {
          position: absolute;
          left: 50%;
          top: 52%;
          border: 2px solid rgba(0, 0, 0, 0.08);
          transform-origin: center;
        }

        .corridor-gate-a {
          width: 92vw;
          height: 78vh;
        }

        .corridor-gate-b {
          width: 92vw;
          height: 78vh;
        }

        .corridor-gate-c {
          width: 92vw;
          height: 78vh;
        }

        .vanish-point {
          position: absolute;
          left: 50%;
          top: 52%;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: ${C.red};
          transform: translate(-50%, -50%);
          opacity: 0.14;
        }

        .corridor-windows {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
        }

        .cw {
          position: absolute;
          display: block;
          background: ${C.black};
          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08);
        }

        .cw-01 {
          left: 49%;
          top: 6%;
          width: 54px;
          height: 110px;
          transform: translateX(-50%);
        }

        .cw-02 {
          left: 31%;
          top: 16%;
          width: 38px;
          height: 88px;
          transform: rotate(34deg);
        }

        .cw-03 {
          right: 31%;
          top: 16%;
          width: 38px;
          height: 88px;
          transform: rotate(-34deg);
        }

        .cw-04 {
          left: 22%;
          top: 29%;
          width: 42px;
          height: 92px;
          transform: rotate(53deg);
        }

        .cw-05 {
          right: 22%;
          top: 29%;
          width: 42px;
          height: 92px;
          transform: rotate(-53deg);
        }

        .cw-06 {
          left: 14%;
          top: 45%;
          width: 48px;
          height: 110px;
          transform: rotate(72deg);
        }

        .cw-07 {
          right: 14%;
          top: 45%;
          width: 48px;
          height: 110px;
          transform: rotate(-72deg);
        }

        .cw-08 {
          left: 49%;
          bottom: 7%;
          width: 54px;
          height: 110px;
          transform: translateX(-50%);
        }

        .cw-09 {
          left: 31%;
          bottom: 16%;
          width: 38px;
          height: 88px;
          transform: rotate(-34deg);
        }

        .cw-10 {
          right: 31%;
          bottom: 16%;
          width: 38px;
          height: 88px;
          transform: rotate(34deg);
        }

        .cw-11 {
          left: 22%;
          bottom: 29%;
          width: 42px;
          height: 92px;
          transform: rotate(-53deg);
        }

        .cw-12 {
          right: 22%;
          bottom: 29%;
          width: 42px;
          height: 92px;
          transform: rotate(53deg);
        }

        .cw-13 {
          left: 2%;
          top: 22%;
          width: 190px;
          height: 190px;
          transform: rotate(45deg);
        }

        .cw-14 {
          right: 2%;
          bottom: 15%;
          width: 190px;
          height: 190px;
          transform: rotate(45deg);
        }

        .cw-15 {
          left: 41%;
          top: 28%;
          width: 26px;
          height: 50px;
          transform: rotate(25deg);
          opacity: 0.72;
        }

        .cw-16 {
          right: 41%;
          top: 28%;
          width: 26px;
          height: 50px;
          transform: rotate(-25deg);
          opacity: 0.72;
        }

        .cw-17 {
          left: 41%;
          bottom: 28%;
          width: 26px;
          height: 50px;
          transform: rotate(-25deg);
          opacity: 0.72;
        }

        .cw-18 {
          right: 41%;
          bottom: 28%;
          width: 26px;
          height: 50px;
          transform: rotate(25deg);
          opacity: 0.72;
        }

        .panel {
          position: absolute;
          inset: 0;
          z-index: 8;
          min-height: 100svh;
          display: grid;
          place-items: center;
          padding: 96px clamp(24px, 6vw, 96px) 54px;
          will-change: transform, opacity, filter;
        }

        .concept-copy {
          width: min(880px, 72vw);
          text-align: center;
          transform: translateY(-1vh);
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
          max-width: 680px;
          margin: clamp(34px, 4.5vw, 60px) auto 0;
          color: rgba(0, 0, 0, 0.66);
          font-size: clamp(11px, 1vw, 15px);
          line-height: 1.9;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .section-grid {
          width: min(1380px, 90vw);
          display: grid;
          grid-template-columns: minmax(300px, 0.46fr) minmax(0, 1fr);
          gap: clamp(32px, 5vw, 72px);
          align-items: center;
        }

        .section-copy {
          align-self: center;
        }

        .section-title {
          margin: 0;
          color: ${C.ink};
          font-size: clamp(58px, 8.2vw, 140px);
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
          background: rgba(255, 255, 255, 0.2);
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
          background: rgba(255, 255, 255, 0.22);
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
          z-index: 20;
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
            height: 390svh;
          }

          .panel {
            padding: 96px 20px 48px;
            align-items: center;
          }

          .concept-copy,
          .section-grid {
            width: min(100%, 620px);
          }

          .main-title {
            font-size: clamp(54px, 16vw, 86px);
            letter-spacing: -0.08em;
          }

          .address {
            font-size: 11px;
            letter-spacing: 0.14em;
          }

          .intro {
            font-size: 10px;
          }

          .section-title {
            font-size: clamp(48px, 13vw, 74px);
          }

          .section-text,
          .active-room {
            font-size: 10px;
          }

          .venue-wrap {
            width: 100%;
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

          .cw-13,
          .cw-14 {
            width: 112px;
            height: 112px;
          }

          .cw-01,
          .cw-08 {
            width: 36px;
            height: 78px;
          }

          .scroll-indicator {
            display: none;
          }
        }

        @media (max-width: 520px) {
          .concept-copy {
            text-align: left;
          }

          .main-title {
            font-size: clamp(48px, 16vw, 68px);
          }

          .experience-buttons {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .action-card {
            min-height: 78px;
          }

          .action-title {
            font-size: 12px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .panel {
            transition: none !important;
            filter: none !important;
          }

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

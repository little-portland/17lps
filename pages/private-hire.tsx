import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';

type Venue = {
  id: string;
  title: string;
  image: string;
  alt: string;
  objectPosition?: string;
  infoLines: string[];
  accent: string;
};

const IMAGE_BASE = '/images/private-hire';
const STAR_BG = `${IMAGE_BASE}/night-starry-sky-dark.jpg`;
const GRID_BG = `${IMAGE_BASE}/buldge-grid.svg`;

const VENUES: Venue[] = [
  {
    id: 'full-venue',
    title: 'FULL VENUE',
    image: `${IMAGE_BASE}/full-venue-placeholder.jpg`,
    alt: 'Full venue private hire image.',
    objectPosition: '50% 52%',
    infoLines: ['150 Standing', 'Both Floors'],
    accent: '#46f4d1',
  },
  {
    id: 'the-tent',
    title: 'THE TENT',
    image: `${IMAGE_BASE}/the-tent-placeholder.jpg`,
    alt: 'The Tent private hire image.',
    objectPosition: '50% 50%',
    infoLines: ['36 Seated', '50 Standing', 'Located on the Ground Floor'],
    accent: '#59f6d8',
  },
  {
    id: 'the-studio',
    title: 'THE STUDIO',
    image: `${IMAGE_BASE}/the-studio-placeholder.jpg`,
    alt: 'The Studio private hire image.',
    objectPosition: '50% 42%',
    infoLines: ['100 Standing', 'Located on the lower ground floor'],
    accent: '#3af2cb',
  },
  {
    id: 'chefs-studio',
    title: "CHEF'S STUDIO",
    image: `${IMAGE_BASE}/chefs-studio-placeholder.jpg`,
    alt: "Chef's Studio private hire image.",
    objectPosition: '50% 50%',
    infoLines: ['Private Dining | 12 Seated', 'Located on the lower ground floor'],
    accent: '#67f7dd',
  },
];

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export default function PrivateHirePage() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeVenue = VENUES[activeIndex];

  useEffect(() => {
    const updateActiveIndex = () => {
      const nextIndex = clamp(Math.round(window.scrollY / Math.max(window.innerHeight, 1)), 0, VENUES.length - 1);
      setActiveIndex(nextIndex);
    };

    updateActiveIndex();
    window.addEventListener('scroll', updateActiveIndex, { passive: true });
    window.addEventListener('resize', updateActiveIndex);

    return () => {
      window.removeEventListener('scroll', updateActiveIndex);
      window.removeEventListener('resize', updateActiveIndex);
    };
  }, []);

  const goToSlide = (index: number) => {
    const nextIndex = clamp(index, 0, VENUES.length - 1);
    window.scrollTo({ top: nextIndex * window.innerHeight, behavior: 'smooth' });
  };

  const titleArcId = useMemo(() => `private-hire-top-arc-${VENUES.length}`, []);

  return (
    <>
      <Head>
        <title>Private Hire</title>
        <meta
          name="description"
          content="Poster-inspired private hire page with snap scrolling, curved titles, and a circular venue image reveal."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="retroPage">
        <div className="retroStage" style={{ ['--accent' as string]: activeVenue.accent }}>
          <div className="retroSky" style={{ backgroundImage: `url(${STAR_BG})` }} />
          <img src={GRID_BG} alt="" aria-hidden="true" className="retroGrid" />
          <div className="retroVignette" />
          <div className="retroNoise" />

          <div className="retroHud">
            <div className="retroLabel retroLabel--left">17 LITTLE PORTLAND STREET</div>
            <a href="mailto:yo@little-portland.com" className="retroLabel retroLabel--right">
              yo@little-portland.com
            </a>
          </div>

          <button
            type="button"
            className="retroNav retroNav--prev"
            onClick={() => goToSlide(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Previous venue"
          >
            <span className="retroNav__arrow">↑</span>
            <span className="retroNav__text">Prev</span>
          </button>

          <button
            type="button"
            className="retroNav retroNav--next"
            onClick={() => goToSlide(activeIndex + 1)}
            disabled={activeIndex === VENUES.length - 1}
            aria-label="Next venue"
          >
            <span className="retroNav__text">Next</span>
            <span className="retroNav__arrow">↓</span>
          </button>

          <section className="retroPoster" aria-live="polite">
            <div className="retroArc retroArc--top" aria-hidden="true">
              <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
                <defs>
                  <path id={titleArcId} d="M 170 500 A 330 330 0 0 1 830 500" />
                </defs>
                <text>
                  <textPath href={`#${titleArcId}`} startOffset="50%" textAnchor="middle">
                    PRIVATE HIRE
                  </textPath>
                </text>
              </svg>
            </div>

            <div className="retroCircleCluster">
              <div className="retroOuterGlow" />
              <div className="retroCircleShell">
                <div className="retroCircleMask">
                  {VENUES.map((venue, index) => {
                    const isActive = index === activeIndex;
                    return (
                      <img
                        key={venue.id}
                        src={venue.image}
                        alt={venue.alt}
                        className={`retroCircleImage ${isActive ? 'is-active' : ''}`}
                        style={{ objectPosition: venue.objectPosition || '50% 50%' }}
                      />
                    );
                  })}
                  <div className="retroCircleShade" />
                </div>
              </div>
            </div>

            <div className="retroArc retroArc--bottom">
              {VENUES.map((venue, index) => {
                const isActive = index === activeIndex;
                return (
                  <svg
                    key={venue.id}
                    viewBox="0 0 1000 1000"
                    preserveAspectRatio="none"
                    className={`retroVenueArc ${isActive ? 'is-active' : ''}`}
                    aria-hidden={!isActive}
                  >
                    <defs>
                      <path id={`venue-arc-${venue.id}`} d="M 200 500 A 300 300 0 0 0 800 500" />
                    </defs>
                    <text>
                      <textPath href={`#venue-arc-${venue.id}`} startOffset="50%" textAnchor="middle">
                        {venue.title}
                      </textPath>
                    </text>
                  </svg>
                );
              })}
            </div>

            <div className="retroInfo">
              {VENUES.map((venue, index) => {
                const isActive = index === activeIndex;
                return (
                  <div key={venue.id} className={`retroInfo__block ${isActive ? 'is-active' : ''}`}>
                    {venue.infoLines.map((line) => (
                      <p key={`${venue.id}-${line}`} className="retroInfo__line">
                        {line}
                      </p>
                    ))}
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <div className="retroScrollTrack" aria-hidden="true">
          {VENUES.map((venue) => (
            <div key={venue.id} className="retroScrollMarker" />
          ))}
        </div>
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;800;900&family=IBM+Plex+Mono:wght@400;500;700&display=swap');

        html {
          scroll-behavior: smooth;
          scroll-snap-type: y mandatory;
        }

        body {
          margin: 0;
          background: #020406;
          color: #f3efe7;
          overflow-x: hidden;
          font-family: 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        }

        * {
          box-sizing: border-box;
        }

        a,
        button {
          color: inherit;
          font: inherit;
        }

        a {
          text-decoration: none;
        }

        img,
        svg {
          display: block;
        }

        button {
          background: none;
          border: 0;
          padding: 0;
          cursor: pointer;
        }

        #__next {
          min-height: 100vh;
        }

        .retroPage {
          min-height: 100vh;
          background: #020406;
        }

        .retroStage {
          position: fixed;
          inset: 0;
          overflow: clip;
          background: #020406;
          z-index: 2;
        }

        .retroScrollTrack {
          position: relative;
          z-index: 0;
          pointer-events: none;
        }

        .retroScrollMarker {
          height: 100vh;
          scroll-snap-align: start;
          scroll-snap-stop: always;
        }

        .retroSky,
        .retroGrid,
        .retroVignette,
        .retroNoise {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .retroSky {
          background-size: cover;
          background-position: center;
          filter: saturate(0.92) brightness(0.56);
          opacity: 0.96;
        }

        .retroGrid {
          width: 100%;
          height: 100%;
          object-fit: cover;
          mix-blend-mode: screen;
          opacity: 0.74;
          filter: drop-shadow(0 0 22px rgba(70, 244, 209, 0.14));
          animation: gridPulse 9s ease-in-out infinite;
        }

        .retroVignette {
          background:
            radial-gradient(circle at center, transparent 38%, rgba(2, 4, 6, 0.14) 58%, rgba(2, 4, 6, 0.72) 100%),
            linear-gradient(180deg, rgba(2, 4, 6, 0.18), rgba(2, 4, 6, 0.46));
        }

        .retroNoise {
          opacity: 0.08;
          background-image:
            radial-gradient(circle at 8% 16%, rgba(255, 255, 255, 0.8) 0 1px, transparent 1.4px),
            radial-gradient(circle at 76% 22%, rgba(255, 255, 255, 0.66) 0 1px, transparent 1.4px),
            radial-gradient(circle at 86% 72%, rgba(255, 255, 255, 0.5) 0 1px, transparent 1.4px),
            radial-gradient(circle at 28% 80%, rgba(255, 255, 255, 0.42) 0 1px, transparent 1.4px);
          background-size: 320px 320px, 380px 380px, 340px 340px, 400px 400px;
          mix-blend-mode: screen;
        }

        .retroHud {
          position: absolute;
          inset: 0;
          z-index: 12;
          pointer-events: none;
        }

        .retroLabel {
          position: absolute;
          top: 16px;
          max-width: calc(50vw - 26px);
          padding: 11px 16px 10px;
          border: 1px solid rgba(70, 244, 209, 0.26);
          background: rgba(4, 12, 14, 0.68);
          box-shadow: 0 0 28px rgba(70, 244, 209, 0.08);
          color: #46f4d1;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-size: 0.78rem;
          line-height: 1;
          font-weight: 700;
          pointer-events: auto;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .retroLabel--left {
          left: 16px;
        }

        .retroLabel--right {
          right: 16px;
          text-align: right;
        }

        .retroPoster {
          --circleSize: min(48vw, 620px);
          --arcSize: calc(var(--circleSize) + clamp(140px, 16vw, 220px));
          position: absolute;
          inset: 0;
          z-index: 6;
          display: grid;
          place-items: center;
          padding: clamp(88px, 11vh, 118px) 88px clamp(72px, 10vh, 100px);
          pointer-events: none;
        }

        .retroCircleCluster {
          position: relative;
          width: var(--circleSize);
          aspect-ratio: 1 / 1;
          z-index: 7;
        }

        .retroOuterGlow {
          position: absolute;
          inset: -18%;
          border-radius: 999px;
          background:
            radial-gradient(circle, color-mix(in srgb, var(--accent) 76%, white) 0%, color-mix(in srgb, var(--accent) 64%, transparent) 24%, rgba(70, 244, 209, 0.12) 42%, transparent 74%);
          filter: blur(28px);
          opacity: 1;
          animation: haloBreath 4.6s ease-in-out infinite;
        }

        .retroCircleShell {
          position: absolute;
          inset: 0;
          padding: clamp(20px, 2.2vw, 30px);
          border-radius: 999px;
          background:
            radial-gradient(circle at 50% 46%, color-mix(in srgb, var(--accent) 98%, white) 0%, color-mix(in srgb, var(--accent) 92%, black) 46%, rgba(6, 28, 27, 0.98) 72%, rgba(3, 7, 8, 0.98) 100%);
          box-shadow:
            0 0 46px color-mix(in srgb, var(--accent) 48%, transparent),
            0 0 120px color-mix(in srgb, var(--accent) 22%, transparent),
            inset 0 0 0 1px rgba(255, 255, 255, 0.05),
            inset 0 0 80px rgba(0, 0, 0, 0.18);
          animation: ringBreath 5.3s ease-in-out infinite;
        }

        .retroCircleMask {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 999px;
          overflow: hidden;
          background: rgba(8, 18, 18, 0.96);
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04);
        }

        .retroCircleImage {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(100%) contrast(1.08) brightness(0.9);
          opacity: 0;
          transform: scale(1.04);
          transition: opacity 360ms ease, transform 360ms ease;
        }

        .retroCircleImage.is-active {
          opacity: 1;
          transform: scale(1);
        }

        .retroCircleShade {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at center, rgba(255, 255, 255, 0.04), transparent 54%),
            linear-gradient(180deg, rgba(4, 8, 9, 0.05), rgba(4, 8, 9, 0.24));
          mix-blend-mode: screen;
        }

        .retroArc {
          position: absolute;
          left: 50%;
          top: 50%;
          width: var(--arcSize);
          aspect-ratio: 1 / 1;
          transform: translate(-50%, -50%);
          pointer-events: none;
          pointer-events: none;
        }

        .retroArc svg {
          width: 100%;
          height: 100%;
        }

        .retroArc--top {
          z-index: 8;
        }

        .retroArc--top text {
          fill: #f3efe7;
          font-family: 'Orbitron', 'IBM Plex Mono', monospace;
          font-size: 78px;
          font-weight: 900;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .retroArc--bottom {
          z-index: 8;
        }

        .retroVenueArc {
          position: absolute;
          inset: 0;
          opacity: 0;
          transform: translateY(10px) scale(0.98);
          transition: opacity 320ms ease, transform 320ms ease;
        }

        .retroVenueArc.is-active {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .retroArc--bottom text {
          fill: var(--accent, #46f4d1);
          font-family: 'Orbitron', 'IBM Plex Mono', monospace;
          font-size: 56px;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .retroInfo {
          position: absolute;
          left: 50%;
          top: calc(50% + (var(--circleSize) / 2) + clamp(20px, 3vw, 34px));
          width: min(760px, calc(100vw - 120px));
          min-height: 120px;
          transform: translateX(-50%);
          pointer-events: none;
        }

        .retroInfo__block {
          position: absolute;
          inset: 0;
          opacity: 0;
          transform: translateY(10px) scale(0.98);
          transition: opacity 320ms ease, transform 320ms ease;
          text-align: center;
        }

        .retroInfo__block.is-active {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .retroInfo__line {
          margin: 0;
          color: #f3efe7;
          text-transform: uppercase;
          letter-spacing: 0.13em;
          line-height: 1.48;
          font-size: clamp(1rem, 1.45vw, 1.22rem);
          font-weight: 700;
          text-wrap: balance;
        }

        .retroInfo__line + .retroInfo__line {
          margin-top: 4px;
        }

        .retroNav {
          position: absolute;
          top: 50%;
          z-index: 14;
          display: inline-flex;
          align-items: center;
          gap: 11px;
          padding: 14px 16px;
          border-radius: 999px;
          border: 1px solid rgba(70, 244, 209, 0.24);
          background: rgba(5, 11, 13, 0.78);
          color: #46f4d1;
          box-shadow: 0 0 24px rgba(70, 244, 209, 0.08);
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-size: 0.84rem;
          font-weight: 700;
          backdrop-filter: blur(12px);
          transform: translateY(-50%);
          transition: opacity 180ms ease, transform 180ms ease, border-color 180ms ease, background 180ms ease;
          pointer-events: auto;
        }

        .retroNav:hover,
        .retroNav:focus-visible {
          transform: translateY(calc(-50% - 2px));
          border-color: rgba(70, 244, 209, 0.45);
          background: rgba(7, 15, 17, 0.88);
        }

        .retroNav:disabled {
          opacity: 0.22;
          cursor: not-allowed;
        }

        .retroNav:disabled:hover,
        .retroNav:disabled:focus-visible {
          transform: translateY(-50%);
          border-color: rgba(70, 244, 209, 0.24);
          background: rgba(5, 11, 13, 0.78);
        }

        .retroNav--prev {
          left: 20px;
        }

        .retroNav--next {
          right: 20px;
        }

        .retroNav__arrow {
          font-size: 0.98rem;
          line-height: 1;
        }

        @keyframes haloBreath {
          0%,
          100% {
            transform: scale(0.98);
            opacity: 0.94;
          }
          50% {
            transform: scale(1.035);
            opacity: 1;
          }
        }

        @keyframes ringBreath {
          0%,
          100% {
            transform: scale(1);
            box-shadow:
              0 0 46px color-mix(in srgb, var(--accent) 48%, transparent),
              0 0 120px color-mix(in srgb, var(--accent) 22%, transparent),
              inset 0 0 0 1px rgba(255, 255, 255, 0.05),
              inset 0 0 80px rgba(0, 0, 0, 0.18);
          }
          50% {
            transform: scale(1.012);
            box-shadow:
              0 0 68px color-mix(in srgb, var(--accent) 68%, transparent),
              0 0 156px color-mix(in srgb, var(--accent) 28%, transparent),
              inset 0 0 0 1px rgba(255, 255, 255, 0.08),
              inset 0 0 90px rgba(0, 0, 0, 0.14);
          }
        }

        @keyframes gridPulse {
          0%,
          100% {
            opacity: 0.72;
          }
          50% {
            opacity: 0.82;
          }
        }

        @media (max-width: 1180px) {
          .retroPoster {
            --circleSize: min(58vw, 560px);
            --arcSize: calc(var(--circleSize) + 180px);
            padding-left: 72px;
            padding-right: 72px;
          }

          .retroArc--top text {
            font-size: 68px;
          }

          .retroArc--bottom text {
            font-size: 48px;
          }
        }

        @media (max-width: 860px) {
          html {
            scroll-snap-type: y proximity;
          }

          .retroLabel {
            top: 14px;
            max-width: 44vw;
            padding: 0;
            border: 0;
            background: transparent;
            box-shadow: none;
            font-size: 0.62rem;
            letter-spacing: 0.1em;
          }

          .retroPoster {
            --circleSize: min(78vw, 450px);
            --arcSize: calc(var(--circleSize) + 130px);
            padding: 84px 26px 120px;
          }

          .retroArc--top text {
            font-size: 52px;
          }

          .retroArc--bottom text {
            font-size: 42px;
          }

          .retroInfo {
            top: calc(50% + (var(--circleSize) / 2) + 20px);
            width: min(92vw, 560px);
          }

          .retroInfo__line {
            font-size: 0.96rem;
            line-height: 1.42;
          }

          .retroNav {
            top: auto;
            bottom: 18px;
            transform: none;
            padding: 13px 14px;
          }

          .retroNav:hover,
          .retroNav:focus-visible,
          .retroNav:disabled:hover,
          .retroNav:disabled:focus-visible {
            transform: none;
          }

          .retroNav--prev {
            left: 16px;
          }

          .retroNav--next {
            right: 16px;
          }
        }

        @media (max-width: 560px) {
          .retroLabel {
            max-width: 42vw;
            font-size: 0.54rem;
            letter-spacing: 0.08em;
          }

          .retroLabel--left {
            left: 12px;
            right: auto;
            top: 10px;
          }

          .retroLabel--right {
            right: 12px;
            left: auto;
            top: 10px;
            text-align: right;
          }

          .retroPoster {
            --circleSize: min(84vw, 360px);
            --arcSize: calc(var(--circleSize) + 104px);
            padding: 76px 18px 108px;
          }

          .retroArc--top text {
            font-size: 44px;
          }

          .retroArc--bottom text {
            font-size: 34px;
          }

          .retroInfo {
            top: calc(50% + (var(--circleSize) / 2) + 12px);
            width: calc(100vw - 28px);
          }

          .retroInfo__line {
            font-size: 0.82rem;
            letter-spacing: 0.1em;
          }

          .retroNav {
            bottom: 12px;
            padding: 12px 13px;
            font-size: 0.68rem;
          }

          .retroNav__text {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
            scroll-snap-type: none;
          }

          .retroGrid,
          .retroOuterGlow,
          .retroCircleShell {
            animation: none;
          }

          .retroCircleImage,
          .retroVenueArc,
          .retroInfo__block,
          .retroNav {
            transition: none;
          }
        }
      `}</style>
    </>
  );
}

import Head from 'next/head';
import { useCallback, useEffect, useMemo, useState } from 'react';

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
  const slideCount = VENUES.length;
  const [floatIndex, setFloatIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || typeof window === 'undefined') return;

    let frame = 0;

    const update = () => {
      const scrollRange = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = clamp(window.scrollY / scrollRange, 0, 1);
      setFloatIndex(progress * (slideCount - 1));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [isMounted, slideCount]);

  const goToSlide = useCallback(
    (index: number) => {
      if (typeof window === 'undefined') return;
      const clampedIndex = clamp(index, 0, slideCount - 1);
      const scrollRange = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const target = slideCount === 1 ? 0 : (clampedIndex / (slideCount - 1)) * scrollRange;
      window.scrollTo({ top: target, behavior: 'smooth' });
    },
    [slideCount]
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown' || event.key === 'PageDown') {
        event.preventDefault();
        goToSlide(Math.round(floatIndex) + 1);
      }

      if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        event.preventDefault();
        goToSlide(Math.round(floatIndex) - 1);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [floatIndex, goToSlide]);

  const activeIndex = clamp(Math.round(floatIndex), 0, slideCount - 1);
  const activeVenue = VENUES[activeIndex];
  const spacerHeight = `${slideCount * 100}vh`;

  const skyTransform = useMemo(() => {
    const y = floatIndex * -1.3;
    return `translate3d(0, ${y}%, 0) scale(1.06)`;
  }, [floatIndex]);

  const gridTransform = useMemo(() => {
    const y = floatIndex * -2.2;
    const x = Math.sin(floatIndex * 0.9) * 1.2;
    const scale = 1.02 + floatIndex * 0.012;
    return `translate3d(${x}%, ${y}%, 0) scale(${scale})`;
  }, [floatIndex]);

  const getLayerStyle = useCallback(
    (index: number, options?: { offset?: number; scale?: number; fade?: number }) => {
      const offset = options?.offset ?? 26;
      const scaleAmount = options?.scale ?? 0.08;
      const fadeAmount = options?.fade ?? 1.45;
      const delta = index - floatIndex;
      const distance = Math.abs(delta);
      const opacity = Math.max(0, 1 - distance * fadeAmount);
      const translateY = delta * offset;
      const scale = 1 - Math.min(distance, 1) * scaleAmount;

      return {
        opacity,
        transform: `translate3d(-50%, ${translateY}px, 0) scale(${scale})`,
      };
    },
    [floatIndex]
  );

  return (
    <>
      <Head>
        <title>Private Hire</title>
        <meta
          name="description"
          content="Poster-inspired private hire page with a fixed immersive stage, curved typography, circular venue image mask, and scroll-driven venue updates."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main id="top" className="retroPage">
        <div className="retroStage">
          <div className="retroSky" style={{ backgroundImage: `url(${STAR_BG})`, transform: skyTransform }} />
          <img src={GRID_BG} alt="" aria-hidden="true" className="retroGrid" style={{ transform: gridTransform }} />
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
            disabled={activeIndex === slideCount - 1}
            aria-label="Next venue"
          >
            <span className="retroNav__text">Next</span>
            <span className="retroNav__arrow">↓</span>
          </button>

          <div className="retroCounter" aria-live="polite">
            {String(activeIndex + 1).padStart(2, '0')} OF {String(slideCount).padStart(2, '0')}
          </div>

          <div className="retroCenterpiece">
            <div className="retroTopArc" aria-hidden="true">
              <svg viewBox="0 0 1200 460" preserveAspectRatio="none">
                <defs>
                  <path id="retroTopArcPath" d="M 205 355 Q 600 112 995 355" />
                </defs>
                <text>
                  <textPath href="#retroTopArcPath" startOffset="50%" textAnchor="middle">
                    PRIVATE HIRE
                  </textPath>
                </text>
              </svg>
            </div>

            <div className="retroCircleCluster" style={{ ['--accent' as string]: activeVenue.accent }}>
              <div className="retroOuterGlow" />
              <div className="retroCircleShell">
                <div className="retroCircleMask">
                  {VENUES.map((venue, index) => (
                    <img
                      key={venue.id}
                      src={venue.image}
                      alt={venue.alt}
                      className="retroCircleImage"
                      style={{
                        ...getLayerStyle(index, { offset: 34, scale: 0.18, fade: 1.25 }),
                        objectPosition: venue.objectPosition || '50% 50%',
                      }}
                    />
                  ))}
                  <div className="retroCircleShade" />
                </div>
              </div>
            </div>

            <div className="retroBottomArc" aria-live="polite">
              {VENUES.map((venue, index) => (
                <svg
                  key={`${venue.id}-title`}
                  viewBox="0 0 1200 360"
                  preserveAspectRatio="none"
                  className="retroBottomArc__svg"
                  style={getLayerStyle(index, { offset: 22, scale: 0.08, fade: 1.42 })}
                >
                  <defs>
                    <path id={`retroBottomArcPath-${venue.id}`} d="M 165 88 Q 600 290 1035 88" />
                  </defs>
                  <text>
                    <textPath href={`#retroBottomArcPath-${venue.id}`} startOffset="50%" textAnchor="middle">
                      {venue.title}
                    </textPath>
                  </text>
                </svg>
              ))}
            </div>

            <div className="retroInfo" aria-live="polite">
              {VENUES.map((venue, index) => (
                <div
                  key={`${venue.id}-info`}
                  className="retroInfo__block"
                  style={getLayerStyle(index, { offset: 16, scale: 0.04, fade: 1.5 })}
                >
                  {venue.infoLines.map((line) => (
                    <p key={`${venue.id}-${line}`} className="retroInfo__line">
                      {line}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="retroScrollSpacer" style={{ height: spacerHeight }} aria-hidden="true" />
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;800;900&family=IBM+Plex+Mono:wght@400;500;700&display=swap');

        html {
          scroll-behavior: smooth;
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
        }

        .retroScrollSpacer {
          position: relative;
          z-index: 0;
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
          animation: gridFloat 11s ease-in-out infinite;
        }

        .retroVignette {
          background:
            radial-gradient(circle at center, transparent 38%, rgba(2, 4, 6, 0.14) 58%, rgba(2, 4, 6, 0.72) 100%),
            linear-gradient(180deg, rgba(2, 4, 6, 0.2), rgba(2, 4, 6, 0.48));
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
          pointer-events: none;
        }

        .retroHud {
          position: absolute;
          inset: 0;
          z-index: 7;
          pointer-events: none;
        }

        .retroLabel {
          position: absolute;
          top: 16px;
          padding: 11px 16px 10px;
          border: 1px solid rgba(70, 244, 209, 0.26);
          background: rgba(4, 12, 14, 0.68);
          box-shadow: 0 0 28px rgba(70, 244, 209, 0.08);
          color: #46f4d1;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-size: 0.9rem;
          line-height: 1;
          font-weight: 700;
          pointer-events: auto;
        }

        .retroLabel--left {
          left: 16px;
        }

        .retroLabel--right {
          right: 16px;
        }

        .retroCenterpiece {
          position: absolute;
          inset: 0;
          z-index: 5;
          display: grid;
          place-items: center;
          padding: 5.5vh 0 6vh;
          pointer-events: none;
        }

        .retroTopArc {
          position: absolute;
          top: 2.6vh;
          left: 50%;
          width: min(1200px, 90vw);
          transform: translateX(-50%);
          filter: drop-shadow(0 0 18px rgba(70, 244, 209, 0.1));
        }

        .retroTopArc svg {
          width: 100%;
          height: auto;
        }

        .retroTopArc text {
          fill: #f3efe7;
          font-family: 'Orbitron', 'IBM Plex Mono', monospace;
          font-size: 96px;
          font-weight: 900;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .retroCircleCluster {
          position: relative;
          width: min(44vw, 600px);
          aspect-ratio: 1 / 1;
          display: grid;
          place-items: center;
          z-index: 6;
          pointer-events: none;
        }

        .retroOuterGlow {
          position: absolute;
          inset: -18%;
          border-radius: 999px;
          background:
            radial-gradient(circle, color-mix(in srgb, var(--accent) 72%, white) 0%, color-mix(in srgb, var(--accent) 65%, transparent) 24%, rgba(70, 244, 209, 0.1) 42%, transparent 74%);
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
          left: 50%;
          top: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(100%) contrast(1.08) brightness(0.9);
          will-change: opacity, transform;
          transition: opacity 320ms ease, transform 320ms ease;
        }

        .retroCircleShade {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at center, rgba(255, 255, 255, 0.04), transparent 54%),
            linear-gradient(180deg, rgba(4, 8, 9, 0.05), rgba(4, 8, 9, 0.24));
          mix-blend-mode: screen;
        }

        .retroBottomArc {
          position: absolute;
          left: 50%;
          top: calc(50% + min(27vw, 320px));
          width: min(1080px, 92vw);
          height: clamp(110px, 14vw, 170px);
          transform: translateX(-50%);
          pointer-events: none;
        }

        .retroBottomArc__svg {
          position: absolute;
          left: 50%;
          top: 0;
          width: 100%;
          height: 100%;
          transform-origin: center;
        }

        .retroBottomArc__svg text {
          fill: var(--accent, #46f4d1);
          font-family: 'Orbitron', 'IBM Plex Mono', monospace;
          font-size: 84px;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .retroInfo {
          position: absolute;
          left: 50%;
          top: calc(50% + min(31vw, 380px));
          width: min(880px, 88vw);
          min-height: 150px;
          transform: translateX(-50%);
          pointer-events: none;
        }

        .retroInfo__block {
          position: absolute;
          left: 50%;
          top: 0;
          width: 100%;
          text-align: center;
          transform-origin: center;
        }

        .retroInfo__line {
          margin: 0;
          color: #f3efe7;
          text-transform: uppercase;
          letter-spacing: 0.13em;
          line-height: 1.48;
          font-size: clamp(1rem, 1.55vw, 1.28rem);
          font-weight: 700;
          text-wrap: balance;
        }

        .retroInfo__line + .retroInfo__line {
          margin-top: 4px;
        }

        .retroNav {
          position: absolute;
          top: 50%;
          z-index: 8;
          display: inline-flex;
          align-items: center;
          gap: 11px;
          padding: 14px 16px;
          border-radius: 999px;
          border: 1px solid rgba(70, 244, 209, 0.24);
          background: rgba(5, 11, 13, 0.7);
          color: #46f4d1;
          box-shadow: 0 0 24px rgba(70, 244, 209, 0.06);
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-size: 0.84rem;
          font-weight: 700;
          backdrop-filter: blur(12px);
          transform: translateY(-50%);
          transition:
            opacity 180ms ease,
            transform 180ms ease,
            border-color 180ms ease,
            background 180ms ease;
        }

        .retroNav:hover,
        .retroNav:focus-visible {
          transform: translateY(calc(-50% - 2px));
          border-color: rgba(70, 244, 209, 0.45);
          background: rgba(7, 15, 17, 0.82);
        }

        .retroNav:disabled {
          opacity: 0.22;
          cursor: not-allowed;
        }

        .retroNav:disabled:hover,
        .retroNav:disabled:focus-visible {
          transform: translateY(-50%);
          border-color: rgba(70, 244, 209, 0.24);
          background: rgba(5, 11, 13, 0.7);
        }

        .retroNav--prev {
          left: 16px;
        }

        .retroNav--next {
          right: 16px;
        }

        .retroNav__arrow {
          font-size: 0.98rem;
          line-height: 1;
        }

        .retroCounter {
          position: absolute;
          right: 24px;
          bottom: 26px;
          z-index: 8;
          color: #46f4d1;
          font-size: 0.94rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          text-shadow: 0 0 14px rgba(70, 244, 209, 0.18);
          pointer-events: none;
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

        @keyframes gridFloat {
          0%,
          100% {
            opacity: 0.72;
          }
          50% {
            opacity: 0.84;
          }
        }

        @media (max-width: 1180px) {
          .retroTopArc {
            width: 94vw;
          }

          .retroTopArc text {
            font-size: 84px;
          }

          .retroCircleCluster {
            width: min(54vw, 560px);
          }

          .retroBottomArc {
            width: min(1000px, 94vw);
          }

          .retroBottomArc__svg text {
            font-size: 72px;
          }
        }

        @media (max-width: 860px) {
          .retroLabel {
            top: 12px;
            padding: 10px 12px 9px;
            font-size: 0.72rem;
            letter-spacing: 0.11em;
          }

          .retroTopArc {
            top: 4vh;
            width: 100vw;
          }

          .retroTopArc text {
            font-size: 58px;
            letter-spacing: 0.06em;
          }

          .retroCircleCluster {
            width: min(74vw, 460px);
          }

          .retroBottomArc {
            top: calc(50% + min(37vw, 290px));
            height: 122px;
          }

          .retroBottomArc__svg text {
            font-size: 52px;
          }

          .retroInfo {
            top: calc(50% + min(42vw, 340px));
            width: min(92vw, 620px);
            min-height: 120px;
          }

          .retroInfo__line {
            font-size: 0.98rem;
            line-height: 1.42;
          }

          .retroNav {
            top: auto;
            bottom: 24px;
            transform: none;
            padding: 12px 14px;
            font-size: 0.74rem;
          }

          .retroNav:hover,
          .retroNav:focus-visible,
          .retroNav:disabled:hover,
          .retroNav:disabled:focus-visible {
            transform: none;
          }

          .retroNav--prev {
            left: 12px;
          }

          .retroNav--next {
            right: 12px;
          }

          .retroCounter {
            right: 50%;
            bottom: 76px;
            transform: translateX(50%);
            font-size: 0.82rem;
          }
        }

        @media (max-width: 560px) {
          .retroTopArc {
            top: 5vh;
          }

          .retroTopArc text {
            font-size: 42px;
            letter-spacing: 0.05em;
          }

          .retroCircleCluster {
            width: min(84vw, 360px);
          }

          .retroOuterGlow {
            inset: -20%;
          }

          .retroBottomArc {
            top: calc(50% + min(39vw, 240px));
            height: 92px;
          }

          .retroBottomArc__svg text {
            font-size: 34px;
            letter-spacing: 0.05em;
          }

          .retroInfo {
            top: calc(50% + min(47vw, 285px));
            width: calc(100vw - 34px);
          }

          .retroInfo__line {
            font-size: 0.82rem;
            letter-spacing: 0.1em;
          }

          .retroNav {
            padding: 11px 13px;
            font-size: 0.68rem;
          }

          .retroNav__text {
            display: none;
          }

          .retroCounter {
            bottom: 72px;
            font-size: 0.74rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          .retroGrid,
          .retroOuterGlow,
          .retroCircleShell {
            animation: none;
          }

          .retroCircleImage,
          .retroNav {
            transition: none;
          }
        }
      `}</style>
    </>
  );
}

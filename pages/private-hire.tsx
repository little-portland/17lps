import Head from 'next/head';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type Venue = {
  id: string;
  title: string;
  image: string;
  alt: string;
  floor: string;
  kicker: string;
  description: string;
  stats: string[];
  objectPosition?: string;
  accent: string;
};

const IMAGE_BASE = '/images/private-hire';
const STAR_BG = `${IMAGE_BASE}/night-starry-sky-dark.jpg`;
const GRID_BG = `${IMAGE_BASE}/buldge-grid.svg`;

const VENUES: Venue[] = [
  {
    id: 'full-venue',
    title: 'Full Venue',
    image: `${IMAGE_BASE}/full-venue-placeholder.jpg`,
    alt: 'Full venue private hire image.',
    floor: 'Both floors',
    kicker: 'Full building takeover',
    description:
      'A full-scale takeover for launches, private parties, screenings, and music-led nights. The broadest canvas, with the strongest sense of occasion.',
    stats: ['150 standing', '2 floors'],
    objectPosition: '50% 52%',
    accent: '#4af6d4',
  },
  {
    id: 'the-tent',
    title: 'The Tent',
    image: `${IMAGE_BASE}/the-tent-placeholder.jpg`,
    alt: 'The Tent private hire image.',
    floor: 'Ground floor',
    kicker: 'Atmospheric arrival space',
    description:
      'A warmer, more intimate setting for dinners, drinks receptions, and events that want a softer first impression before opening out into the wider venue.',
    stats: ['36 seated', '50 standing'],
    objectPosition: '50% 52%',
    accent: '#7ff6d8',
  },
  {
    id: 'the-studio',
    title: 'The Studio',
    image: `${IMAGE_BASE}/the-studio-placeholder.jpg`,
    alt: 'The Studio private hire image.',
    floor: 'Lower ground floor',
    kicker: 'Sound-led late-night energy',
    description:
      'Sharper and more stripped-back, with a stronger club and performance identity. Best for showcases, talks, DJ-led events, or a more focused takeover.',
    stats: ['100 standing'],
    objectPosition: '50% 44%',
    accent: '#35f3cd',
  },
  {
    id: 'chefs-studio',
    title: "Chef's Studio",
    image: `${IMAGE_BASE}/chefs-studio-placeholder.jpg`,
    alt: "Chef's Studio private hire image.",
    floor: 'Lower ground floor',
    kicker: 'Private dining and tastings',
    description:
      'A quieter, more exclusive room for hosted dinners, tastings, and smaller invitation-only gatherings with a stronger sense of privacy.',
    stats: ['12 seated'],
    objectPosition: '50% 50%',
    accent: '#59f7da',
  },
];

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export default function PrivateHirePage() {
  const sceneRef = useRef<HTMLElement | null>(null);
  const [floatIndex, setFloatIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const slideCount = VENUES.length;
  const sceneHeight = `${slideCount * 100 + 40}svh`;
  const activeIndex = clamp(Math.round(floatIndex), 0, slideCount - 1);
  const activeVenue = VENUES[activeIndex];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || typeof window === 'undefined') return;

    let frame = 0;

    const updateProgress = () => {
      const scene = sceneRef.current;
      if (!scene) return;

      const rect = scene.getBoundingClientRect();
      const totalScrollable = Math.max(rect.height - window.innerHeight, 1);
      const rawProgress = clamp(-rect.top / totalScrollable, 0, 1);
      const nextFloat = rawProgress * (slideCount - 1);
      setFloatIndex(nextFloat);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateProgress);
    };

    updateProgress();
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
      const scene = sceneRef.current;
      if (!scene) return;

      const clampedIndex = clamp(index, 0, slideCount - 1);
      const rect = scene.getBoundingClientRect();
      const sceneTop = window.scrollY + rect.top;
      const totalScrollable = Math.max(scene.offsetHeight - window.innerHeight, 1);
      const target = sceneTop + (clampedIndex / (slideCount - 1)) * totalScrollable;

      window.scrollTo({ top: target, behavior: 'smooth' });
    },
    [slideCount]
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown' || event.key === 'PageDown') {
        event.preventDefault();
        goToSlide(activeIndex + 1);
      }

      if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        event.preventDefault();
        goToSlide(activeIndex - 1);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, goToSlide]);

  const getLayerStyle = useCallback(
    (index: number, options?: { offset?: number; scale?: number; fade?: number }) => {
      const offset = options?.offset ?? 28;
      const scaleAmount = options?.scale ?? 0.12;
      const fadeAmount = options?.fade ?? 1.35;
      const delta = index - floatIndex;
      const distance = Math.abs(delta);
      const opacity = Math.max(0, 1 - distance * fadeAmount);
      const translateY = delta * offset;
      const scale = 1 - Math.min(distance, 1) * scaleAmount;

      return {
        opacity,
        transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
      };
    },
    [floatIndex]
  );

  const gridTransform = useMemo(() => {
    const y = floatIndex * -1.8;
    const scale = 1 + floatIndex * 0.02;
    return `translate3d(0, ${y}%, 0) scale(${scale})`;
  }, [floatIndex]);

  const skyTransform = useMemo(() => {
    const y = floatIndex * -0.9;
    const scale = 1.05 + floatIndex * 0.01;
    return `translate3d(0, ${y}%, 0) scale(${scale})`;
  }, [floatIndex]);

  return (
    <>
      <Head>
        <title>Private Hire</title>
        <meta
          name="description"
          content="Poster-inspired private hire page with a bulged grid, circular image mask, curved typography, and scroll-driven venue transitions."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main id="top" className="posterPage">
        <section ref={sceneRef} className="posterScene" style={{ height: sceneHeight }}>
          <div className="posterSticky">
            <div className="posterSky" style={{ backgroundImage: `url(${STAR_BG})`, transform: skyTransform }} />
            <img src={GRID_BG} alt="" aria-hidden="true" className="posterGrid" style={{ transform: gridTransform }} />
            <div className="posterGlowCloud posterGlowCloud--left" />
            <div className="posterGlowCloud posterGlowCloud--right" />
            <div className="posterNoise" />
            <div className="posterVignette" />

            <div className="posterHud">
              <div className="posterLabel posterLabel--topLeft">17 LITTLE PORTLAND STREET</div>
              <div className="posterLabel posterLabel--topRight">
                {String(activeIndex + 1).padStart(2, '0')} / {String(slideCount).padStart(2, '0')}
              </div>
              <div className="posterLabel posterLabel--bottomLeft">PRIVATE EVENTS / SCROLL TO EXPLORE</div>
              <div className="posterLabel posterLabel--bottomRight">LPX / PRIVATE HIRE</div>
            </div>

            <div className="posterTopArc" aria-hidden="true">
              <svg viewBox="0 0 1200 320" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="posterTitleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f7f4ef" />
                    <stop offset="58%" stopColor="#f7f4ef" />
                    <stop offset="100%" stopColor="#53f7d5" />
                  </linearGradient>
                  <path id="topArcPath" d="M 130 220 Q 600 75 1070 220" />
                </defs>
                <text>
                  <textPath href="#topArcPath" startOffset="50%" textAnchor="middle">
                    PRIVATE HIRE
                  </textPath>
                </text>
              </svg>
            </div>

            <button
              type="button"
              className="posterNav posterNav--prev"
              onClick={() => goToSlide(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Previous venue"
            >
              <span className="posterNav__arrow">↑</span>
              <span className="posterNav__label">Prev</span>
            </button>

            <button
              type="button"
              className="posterNav posterNav--next"
              onClick={() => goToSlide(activeIndex + 1)}
              disabled={activeIndex === slideCount - 1}
              aria-label="Next venue"
            >
              <span className="posterNav__label">Next</span>
              <span className="posterNav__arrow">↓</span>
            </button>

            <div className="posterCenter">
              <div className="posterCircleWrap">
                <div
                  className="posterCircleHalo"
                  style={{
                    background: `radial-gradient(circle, ${activeVenue.accent}77 0%, ${activeVenue.accent}22 38%, transparent 70%)`,
                    boxShadow: `0 0 80px ${activeVenue.accent}66, 0 0 180px ${activeVenue.accent}33`,
                  }}
                />
                <div className="posterCircleRing" style={{ borderColor: `${activeVenue.accent}66` }} />
                <div className="posterCircleMask">
                  {VENUES.map((venue, index) => (
                    <img
                      key={venue.id}
                      src={venue.image}
                      alt={venue.alt}
                      className="posterCircleImage"
                      style={{
                        ...getLayerStyle(index, { offset: 34, scale: 0.16, fade: 1.28 }),
                        objectPosition: venue.objectPosition || '50% 50%',
                      }}
                    />
                  ))}
                  <div className="posterCircleShade" />
                </div>
              </div>
            </div>

            <div className="posterBottomBlock">
              <div className="posterMiniInfo" aria-live="polite">
                {VENUES.map((venue, index) => (
                  <div
                    key={`${venue.id}-meta`}
                    className="posterMiniInfo__item"
                    style={getLayerStyle(index, { offset: 16, scale: 0.06, fade: 1.5 })}
                  >
                    <span>{venue.kicker}</span>
                    <span className="posterMiniInfo__dot" />
                    <span>{venue.floor}</span>
                  </div>
                ))}
              </div>

              <div className="posterBottomArc" aria-live="polite">
                {VENUES.map((venue, index) => (
                  <svg
                    key={`${venue.id}-arc`}
                    viewBox="0 0 1200 250"
                    preserveAspectRatio="none"
                    className="posterBottomArc__svg"
                    style={getLayerStyle(index, { offset: 24, scale: 0.08, fade: 1.38 })}
                  >
                    <defs>
                      <path id={`bottomArcPath-${venue.id}`} d="M 165 185 Q 600 16 1035 185" />
                    </defs>
                    <text>
                      <textPath href={`#bottomArcPath-${venue.id}`} startOffset="50%" textAnchor="middle">
                        {venue.title.toUpperCase()}
                      </textPath>
                    </text>
                  </svg>
                ))}
              </div>

              <div className="posterStatsPill" aria-live="polite">
                {VENUES.map((venue, index) => (
                  <div
                    key={`${venue.id}-pill`}
                    className="posterStatsPill__item"
                    style={getLayerStyle(index, { offset: 18, scale: 0.08, fade: 1.45 })}
                  >
                    {venue.stats.join(' • ')}
                  </div>
                ))}
              </div>

              <div className="posterDescription" aria-live="polite">
                {VENUES.map((venue, index) => (
                  <p
                    key={`${venue.id}-description`}
                    className="posterDescription__item"
                    style={getLayerStyle(index, { offset: 12, scale: 0.03, fade: 1.55 })}
                  >
                    {venue.description}
                  </p>
                ))}
              </div>
            </div>

            <div className="posterProgress" aria-label="Venue progress">
              {VENUES.map((venue, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={venue.id}
                    type="button"
                    className={`posterProgress__dot ${isActive ? 'is-active' : ''}`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to ${venue.title}`}
                  />
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #040507;
          color: #f7f4ef;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          overflow-x: hidden;
        }

        * {
          box-sizing: border-box;
        }

        a,
        button {
          color: inherit;
          font: inherit;
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

        .posterPage {
          min-height: 100vh;
          background: radial-gradient(circle at top, rgba(74, 246, 212, 0.05), transparent 28%), #040507;
        }

        .posterScene {
          position: relative;
        }

        .posterSticky {
          position: sticky;
          top: 0;
          min-height: 100svh;
          overflow: clip;
          background: #040507;
        }

        .posterSky,
        .posterGrid,
        .posterNoise,
        .posterVignette,
        .posterGlowCloud {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .posterSky {
          background-size: cover;
          background-position: center;
          opacity: 0.9;
          filter: saturate(0.88) brightness(0.54);
        }

        .posterGrid {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.82;
          mix-blend-mode: screen;
          filter: drop-shadow(0 0 22px rgba(66, 246, 210, 0.18));
          animation: gridPulse 9s ease-in-out infinite;
        }

        .posterGlowCloud {
          border-radius: 999px;
          filter: blur(120px);
          opacity: 0.18;
        }

        .posterGlowCloud--left {
          inset: auto auto -18vh -18vw;
          width: 48vw;
          height: 48vw;
          background: #3cf3cb;
        }

        .posterGlowCloud--right {
          inset: 8vh -18vw auto auto;
          width: 46vw;
          height: 46vw;
          background: #ffbf59;
          opacity: 0.09;
        }

        .posterNoise {
          opacity: 0.12;
          background-image:
            radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.8) 0 1px, transparent 1.5px),
            radial-gradient(circle at 72% 18%, rgba(255, 255, 255, 0.7) 0 1px, transparent 1.5px),
            radial-gradient(circle at 82% 74%, rgba(255, 255, 255, 0.6) 0 1px, transparent 1.5px),
            radial-gradient(circle at 36% 80%, rgba(255, 255, 255, 0.55) 0 1px, transparent 1.5px),
            radial-gradient(circle at 58% 58%, rgba(255, 255, 255, 0.5) 0 1px, transparent 1.5px);
          background-size: 280px 280px, 360px 360px, 340px 340px, 420px 420px, 300px 300px;
          mix-blend-mode: screen;
        }

        .posterVignette {
          background:
            radial-gradient(circle at center, transparent 34%, rgba(4, 5, 7, 0.22) 60%, rgba(4, 5, 7, 0.7) 100%),
            linear-gradient(180deg, rgba(4, 5, 7, 0.25) 0%, rgba(4, 5, 7, 0.55) 100%);
        }

        .posterHud {
          position: absolute;
          inset: 0;
          z-index: 4;
          pointer-events: none;
        }

        .posterLabel {
          position: absolute;
          padding: 10px 14px;
          border: 1px solid rgba(46, 247, 210, 0.26);
          background: rgba(3, 9, 10, 0.72);
          box-shadow: 0 0 32px rgba(46, 247, 210, 0.08);
          color: #27efd2;
          font-size: 0.86rem;
          line-height: 1;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 700;
        }

        .posterLabel--topLeft {
          top: 16px;
          left: 16px;
        }

        .posterLabel--topRight {
          top: 16px;
          right: 16px;
        }

        .posterLabel--bottomLeft {
          left: 16px;
          bottom: 16px;
        }

        .posterLabel--bottomRight {
          right: 16px;
          bottom: 16px;
        }

        .posterTopArc {
          position: absolute;
          top: 1.6vh;
          left: 50%;
          z-index: 3;
          width: min(1100px, 88vw);
          transform: translateX(-50%);
          filter: drop-shadow(0 0 18px rgba(84, 247, 214, 0.08));
          pointer-events: none;
        }

        .posterTopArc svg {
          width: 100%;
          height: auto;
        }

        .posterTopArc text {
          fill: url(#posterTitleGradient);
          font-size: 90px;
          font-weight: 900;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .posterCenter {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: grid;
          place-items: center;
          padding: 17vh 0 25vh;
        }

        .posterCircleWrap {
          position: relative;
          width: min(46vw, 560px);
          aspect-ratio: 1 / 1;
          display: grid;
          place-items: center;
        }

        .posterCircleHalo,
        .posterCircleRing,
        .posterCircleMask {
          position: absolute;
          inset: 0;
          border-radius: 999px;
        }

        .posterCircleHalo {
          inset: -7%;
          animation: haloPulse 4.8s ease-in-out infinite;
        }

        .posterCircleRing {
          border: 1px solid rgba(74, 246, 212, 0.45);
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.05) inset,
            0 0 44px rgba(74, 246, 212, 0.18);
          animation: ringRotate 18s linear infinite;
        }

        .posterCircleMask {
          overflow: hidden;
          background: rgba(7, 16, 14, 0.84);
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.05) inset,
            0 12px 80px rgba(0, 0, 0, 0.45);
        }

        .posterCircleImage {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(100%) contrast(1.04) brightness(0.86);
          transition:
            opacity 420ms ease,
            transform 420ms ease;
          will-change: opacity, transform;
        }

        .posterCircleShade {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at center, rgba(255, 255, 255, 0.06), transparent 52%),
            linear-gradient(180deg, rgba(3, 8, 9, 0.06), rgba(3, 8, 9, 0.26));
          mix-blend-mode: screen;
        }

        .posterBottomBlock {
          position: absolute;
          left: 50%;
          bottom: 8.2vh;
          z-index: 3;
          width: min(1120px, calc(100vw - 180px));
          transform: translateX(-50%);
          pointer-events: none;
        }

        .posterMiniInfo,
        .posterStatsPill,
        .posterDescription {
          position: relative;
          min-height: 40px;
        }

        .posterMiniInfo__item,
        .posterStatsPill__item,
        .posterDescription__item,
        .posterBottomArc__svg {
          position: absolute;
          left: 50%;
          top: 0;
          transform-origin: center;
        }

        .posterMiniInfo__item {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          width: max-content;
          transform: translateX(-50%);
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-size: 0.86rem;
          font-weight: 700;
          color: rgba(244, 243, 238, 0.82);
        }

        .posterMiniInfo__dot {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: #36f2cc;
          box-shadow: 0 0 16px rgba(54, 242, 204, 0.85);
        }

        .posterBottomArc {
          position: relative;
          height: clamp(140px, 17vw, 200px);
          margin-top: -6px;
        }

        .posterBottomArc__svg {
          width: min(980px, 92vw);
          height: 100%;
          transform: translateX(-50%);
          filter: drop-shadow(0 0 22px rgba(54, 242, 204, 0.16));
        }

        .posterBottomArc__svg text {
          fill: #39f2ce;
          font-size: 84px;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .posterStatsPill {
          margin-top: -8px;
          min-height: 56px;
        }

        .posterStatsPill__item {
          width: max-content;
          transform: translateX(-50%);
          padding: 14px 28px 13px;
          border-radius: 999px;
          border: 1px solid rgba(67, 245, 210, 0.3);
          background: rgba(11, 21, 21, 0.72);
          box-shadow: 0 0 42px rgba(67, 245, 210, 0.16);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-size: clamp(1rem, 2vw, 1.35rem);
          font-weight: 800;
          color: #77f9de;
          white-space: nowrap;
        }

        .posterDescription {
          margin-top: 18px;
          min-height: 68px;
        }

        .posterDescription__item {
          width: min(760px, 100%);
          margin: 0;
          transform: translateX(-50%);
          text-align: center;
          font-size: 1rem;
          line-height: 1.72;
          color: rgba(244, 243, 238, 0.78);
        }

        .posterNav {
          position: absolute;
          top: 50%;
          z-index: 5;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border-radius: 999px;
          border: 1px solid rgba(67, 245, 210, 0.24);
          background: rgba(6, 11, 12, 0.74);
          color: #7bf9df;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-size: 0.8rem;
          font-weight: 800;
          box-shadow: 0 0 28px rgba(67, 245, 210, 0.08);
          backdrop-filter: blur(12px);
          transform: translateY(-50%);
          transition:
            opacity 180ms ease,
            transform 180ms ease,
            border-color 180ms ease,
            background 180ms ease;
        }

        .posterNav:hover,
        .posterNav:focus-visible {
          transform: translateY(calc(-50% - 2px));
          border-color: rgba(67, 245, 210, 0.48);
          background: rgba(8, 16, 17, 0.84);
        }

        .posterNav:disabled {
          opacity: 0.28;
          cursor: not-allowed;
        }

        .posterNav:disabled:hover,
        .posterNav:disabled:focus-visible {
          transform: translateY(-50%);
          background: rgba(6, 11, 12, 0.74);
          border-color: rgba(67, 245, 210, 0.24);
        }

        .posterNav--prev {
          left: 18px;
        }

        .posterNav--next {
          right: 18px;
        }

        .posterNav__arrow {
          font-size: 1rem;
          line-height: 1;
        }

        .posterProgress {
          position: absolute;
          right: 24px;
          bottom: 84px;
          z-index: 5;
          display: grid;
          gap: 10px;
        }

        .posterProgress__dot {
          width: 12px;
          height: 12px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.4);
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 18px rgba(67, 245, 210, 0.06);
          transition:
            transform 180ms ease,
            background 180ms ease,
            border-color 180ms ease,
            box-shadow 180ms ease;
        }

        .posterProgress__dot:hover,
        .posterProgress__dot:focus-visible,
        .posterProgress__dot.is-active {
          transform: scale(1.16);
          background: #43f5d2;
          border-color: #43f5d2;
          box-shadow: 0 0 20px rgba(67, 245, 210, 0.42);
        }

        @keyframes haloPulse {
          0%,
          100% {
            transform: scale(0.98);
            opacity: 0.72;
          }
          50% {
            transform: scale(1.03);
            opacity: 1;
          }
        }

        @keyframes ringRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes gridPulse {
          0%,
          100% {
            opacity: 0.76;
          }
          50% {
            opacity: 0.9;
          }
        }

        @media (max-width: 1100px) {
          .posterTopArc {
            width: min(1000px, 92vw);
          }

          .posterTopArc text {
            font-size: 80px;
          }

          .posterCircleWrap {
            width: min(58vw, 500px);
          }

          .posterBottomBlock {
            width: min(960px, calc(100vw - 120px));
          }

          .posterBottomArc__svg text {
            font-size: 72px;
          }
        }

        @media (max-width: 820px) {
          .posterLabel {
            font-size: 0.7rem;
            padding: 9px 11px;
          }

          .posterLabel--bottomLeft,
          .posterLabel--bottomRight {
            bottom: 14px;
          }

          .posterTopArc {
            top: 3.5vh;
            width: 96vw;
          }

          .posterTopArc text {
            font-size: 56px;
            letter-spacing: 0.12em;
          }

          .posterCenter {
            padding: 18vh 0 30vh;
          }

          .posterCircleWrap {
            width: min(76vw, 430px);
          }

          .posterBottomBlock {
            width: calc(100vw - 32px);
            bottom: 12vh;
          }

          .posterMiniInfo__item {
            font-size: 0.72rem;
            gap: 8px;
            text-align: center;
          }

          .posterBottomArc {
            height: 116px;
          }

          .posterBottomArc__svg {
            width: 100%;
          }

          .posterBottomArc__svg text {
            font-size: 54px;
            letter-spacing: 0.06em;
          }

          .posterStatsPill {
            min-height: 50px;
          }

          .posterStatsPill__item {
            max-width: min(92vw, 560px);
            padding: 13px 18px 12px;
            font-size: 0.95rem;
            white-space: normal;
            text-align: center;
          }

          .posterDescription__item {
            width: min(92vw, 620px);
            font-size: 0.92rem;
            line-height: 1.62;
          }

          .posterNav {
            top: auto;
            bottom: 82px;
            transform: none;
            padding: 12px 14px;
            font-size: 0.72rem;
          }

          .posterNav:hover,
          .posterNav:focus-visible,
          .posterNav:disabled:hover,
          .posterNav:disabled:focus-visible {
            transform: none;
          }

          .posterNav--prev {
            left: 14px;
          }

          .posterNav--next {
            right: 14px;
          }

          .posterProgress {
            right: 50%;
            bottom: 22px;
            transform: translateX(50%);
            grid-auto-flow: column;
          }
        }

        @media (max-width: 560px) {
          .posterLabel--bottomLeft,
          .posterLabel--bottomRight {
            display: none;
          }

          .posterLabel--topLeft,
          .posterLabel--topRight {
            top: 10px;
          }

          .posterTopArc {
            top: 4.5vh;
            width: 100vw;
          }

          .posterTopArc text {
            font-size: 42px;
            letter-spacing: 0.14em;
          }

          .posterCenter {
            padding: 18vh 0 34vh;
          }

          .posterCircleWrap {
            width: min(84vw, 360px);
          }

          .posterCircleHalo {
            inset: -10%;
          }

          .posterMiniInfo__item {
            width: calc(100vw - 48px);
            flex-wrap: wrap;
            gap: 6px 10px;
          }

          .posterBottomArc {
            margin-top: 2px;
            height: 96px;
          }

          .posterBottomArc__svg text {
            font-size: 38px;
            letter-spacing: 0.05em;
          }

          .posterStatsPill {
            margin-top: 2px;
          }

          .posterStatsPill__item {
            max-width: calc(100vw - 42px);
            font-size: 0.84rem;
            letter-spacing: 0.11em;
          }

          .posterDescription {
            margin-top: 14px;
          }

          .posterDescription__item {
            width: calc(100vw - 34px);
            font-size: 0.86rem;
          }

          .posterNav {
            bottom: 64px;
            gap: 8px;
            padding: 11px 13px;
            font-size: 0.68rem;
          }

          .posterNav__arrow {
            font-size: 0.9rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          .posterGrid,
          .posterCircleHalo,
          .posterCircleRing {
            animation: none;
          }

          .posterCircleImage,
          .posterProgress__dot,
          .posterNav {
            transition: none;
          }
        }
      `}</style>
    </>
  );
}

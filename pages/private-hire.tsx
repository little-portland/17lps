import Head from 'next/head';
import { useEffect, useState } from 'react';

type Venue = {
  id: string;
  title: string;
  image: string;
  alt: string;
  objectPosition?: string;
  infoLines: string[];
};

const IMAGE_BASE = '/images/private-hire';
const STAR_BG = `${IMAGE_BASE}/night-starry-sky-dark.jpg`;
const GRID_BG = `${IMAGE_BASE}/buldge-grid.svg`;
const ORB_OVERLAY = `${IMAGE_BASE}/circle-orb-overlay.png`;
const ACCENT = '#348159';

const VENUES: Venue[] = [
  {
    id: 'full-venue',
    title: 'FULL VENUE',
    image: `${IMAGE_BASE}/full-venue-placeholder.png`,
    alt: 'Full venue private hire image.',
    objectPosition: '50% 52%',
    infoLines: ['150 Standing', 'Both Floors'],
  },
  {
    id: 'the-tent',
    title: 'THE TENT',
    image: `${IMAGE_BASE}/the-tent-placeholder.png`,
    alt: 'The Tent private hire image.',
    objectPosition: '50% 50%',
    infoLines: ['36 Seated / 50 Standing', 'Located on the Ground Floor'],
  },
  {
    id: 'the-studio',
    title: 'THE STUDIO',
    image: `${IMAGE_BASE}/the-studio-placeholder.png`,
    alt: 'The Studio private hire image.',
    objectPosition: '50% 42%',
    infoLines: ['100 Standing', 'Located on the lower ground floor'],
  },
  {
    id: 'chefs-studio',
    title: "CHEF'S STUDIO",
    image: `${IMAGE_BASE}/chefs-studio-placeholder.png`,
    alt: "Chef's Studio private hire image.",
    objectPosition: '50% 50%',
    infoLines: ['Private Dining | 12 Seated', 'Located on the lower ground floor'],
  },
];

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export default function PrivateHirePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);

  useEffect(() => {
    const updateActiveIndex = () => {
      const nextIndex = clamp(
        Math.round(window.scrollY / Math.max(window.innerHeight, 1)),
        0,
        VENUES.length - 1
      );
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

  useEffect(() => {
    if (activeIndex === displayIndex) return;

    setPreviousIndex(displayIndex);
    setDisplayIndex(activeIndex);

    const timeout = window.setTimeout(() => {
      setPreviousIndex(null);
    }, 360);

    return () => window.clearTimeout(timeout);
  }, [activeIndex, displayIndex]);

  const activeVenue = VENUES[displayIndex];

  const goToSlide = (index: number) => {
    const nextIndex = clamp(index, 0, VENUES.length - 1);
    window.scrollTo({ top: nextIndex * window.innerHeight, behavior: 'smooth' });
  };

  return (
    <>
      <Head>
        <title>Private Hire</title>
        <meta
          name="description"
          content="Poster-inspired private hire page with snap scrolling, glowing orb imagery, and venue-by-venue transitions."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="posterPage">
        <div className="posterStage">
          <div className="posterSky" style={{ backgroundImage: `url(${STAR_BG})` }} />
          <img src={GRID_BG} alt="" aria-hidden="true" className="posterGrid" />
          <div className="posterGridSweep" aria-hidden="true" />
          <div className="posterVignette" />
          <div className="posterNoise" />

          <button
            type="button"
            className="posterNav posterNav--prev"
            onClick={() => goToSlide(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Previous venue"
          >
            <span className="posterNav__arrow">↑</span>
            <span className="posterNav__text">Prev</span>
          </button>

          <button
            type="button"
            className="posterNav posterNav--next"
            onClick={() => goToSlide(activeIndex + 1)}
            disabled={activeIndex === VENUES.length - 1}
            aria-label="Next venue"
          >
            <span className="posterNav__text">Next</span>
            <span className="posterNav__arrow">↓</span>
          </button>

          <section className="posterFrame" aria-live="polite">
            <div className="posterTitleWrap">
              <h1 className="posterTitle">PRIVATE HIRE</h1>
            </div>

            <div className="orbCluster">
              <div className="orbBloomBack" />

              <div className="orbPhotoMask">
                {previousIndex !== null && (
                  <div
                    aria-hidden="true"
                    className="orbPhotoLayer orbPhotoLayer--previous"
                    style={{
                      backgroundImage: `url(${VENUES[previousIndex].image})`,
                      backgroundPosition: VENUES[previousIndex].objectPosition || '50% 50%',
                    }}
                  />
                )}

                <div
                  key={activeVenue.id}
                  role="img"
                  aria-label={activeVenue.alt}
                  className={`orbPhotoLayer orbPhotoLayer--current ${previousIndex !== null ? 'is-glitching' : ''}`}
                  style={{
                    backgroundImage: `url(${activeVenue.image})`,
                    backgroundPosition: activeVenue.objectPosition || '50% 50%',
                  }}
                />

                <div className="orbInnerTint" />
                <div className="orbInnerGlow" />
              </div>

              <img src={ORB_OVERLAY} alt="" aria-hidden="true" className="orbOverlay orbOverlay--main" />
            </div>

            <div className="posterAreaTitle">
              {VENUES.map((venue, index) => {
                const isActive = index === activeIndex;
                return (
                  <div key={venue.id} className={`posterAreaTitle__item ${isActive ? 'is-active' : ''}`}>
                    {venue.title}
                  </div>
                );
              })}
            </div>

            <div className="posterInfo">
              {VENUES.map((venue, index) => {
                const isActive = index === activeIndex;
                return (
                  <div key={venue.id} className={`posterInfo__block ${isActive ? 'is-active' : ''}`}>
                    {venue.infoLines.map((line, lineIndex) => (
                      <p
                        key={`${venue.id}-${line}`}
                        className={`posterInfo__line ${lineIndex > 0 ? 'posterInfo__line--secondary' : ''}`}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                );
              })}
            </div>

            <a href="mailto:yo@little-portland.com" className="posterFooterContact">
              yo@little-portland.com
            </a>
          </section>
        </div>

        <div className="posterScrollTrack" aria-hidden="true">
          {VENUES.map((venue) => (
            <div key={venue.id} className="posterScrollMarker" />
          ))}
        </div>
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;800;900&family=IBM+Plex+Mono:wght@400;500;700&display=swap');

        html {
          scroll-behavior: smooth;
          scroll-snap-type: y mandatory;
          overflow-x: hidden;
        }

        body {
          margin: 0;
          background: #040707;
          color: #f1eee7;
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

        .posterPage {
          min-height: 100vh;
          background: #040707;
        }

        .posterStage {
          position: fixed;
          inset: 0;
          overflow: clip;
          background: #040707;
          z-index: 2;
        }

        .posterScrollTrack {
          position: relative;
          z-index: 0;
          pointer-events: none;
        }

        .posterScrollMarker {
          height: 100vh;
          scroll-snap-align: start;
          scroll-snap-stop: always;
        }

        .posterSky,
        .posterGrid,
        .posterGridSweep,
        .posterVignette,
        .posterNoise {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .posterSky {
          background-size: contain;
          background-position: center;
          filter: saturate(0.92) brightness(0.54);
          opacity: 0.96;
        }

        .posterGrid {
          width: 100%;
          height: 100%;
          object-fit: cover;
          mix-blend-mode: screen;
          opacity: 0.78;
          filter: drop-shadow(0 0 18px rgba(52, 129, 89, 0.18));
          animation: gridPulse 8s ease-in-out infinite;
        }

        .posterGridSweep {
          opacity: 0;
          background: linear-gradient(
            180deg,
            transparent 0%,
            transparent 34%,
            rgba(145, 242, 189, 0.05) 40%,
            rgba(145, 242, 189, 0.16) 45%,
            rgba(145, 242, 189, 0.32) 50%,
            rgba(145, 242, 189, 0.16) 55%,
            rgba(145, 242, 189, 0.05) 60%,
            transparent 66%,
            transparent 100%
          );
          mix-blend-mode: screen;
          filter: blur(16px);
          transform: translateY(-130%);
          animation: gridSweepVertical 12s linear infinite;
        }

        .posterVignette {
          background:
            radial-gradient(circle at center, transparent 34%, rgba(4, 7, 7, 0.12) 58%, rgba(4, 7, 7, 0.74) 100%),
            linear-gradient(180deg, rgba(4, 7, 7, 0.12), rgba(4, 7, 7, 0.44));
        }

        .posterNoise {
          opacity: 0.08;
          background-image:
            radial-gradient(circle at 8% 16%, rgba(255, 255, 255, 0.8) 0 1px, transparent 1.4px),
            radial-gradient(circle at 76% 22%, rgba(255, 255, 255, 0.66) 0 1px, transparent 1.4px),
            radial-gradient(circle at 86% 72%, rgba(255, 255, 255, 0.5) 0 1px, transparent 1.4px),
            radial-gradient(circle at 28% 80%, rgba(255, 255, 255, 0.42) 0 1px, transparent 1.4px);
          background-size: 320px 320px, 380px 380px, 340px 340px, 400px 400px;
          mix-blend-mode: screen;
        }

        .posterNav {
          position: absolute;
          top: 50%;
          z-index: 14;
          display: inline-flex;
          align-items: center;
          gap: 11px;
          padding: 14px 16px;
          border-radius: 999px;
          border: 1px solid rgba(52, 129, 89, 0.42);
          background: rgba(0, 0, 0, 0.74);
          color: ${ACCENT};
          box-shadow: 0 0 16px rgba(52, 129, 89, 0.14);
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-size: 0.82rem;
          font-weight: 700;
          backdrop-filter: blur(10px);
          transform: translateY(-50%);
          transition: opacity 180ms ease, border-color 180ms ease, background 180ms ease;
          pointer-events: auto;
          text-shadow: 0 0 8px rgba(52, 129, 89, 0.5), 0 0 18px rgba(52, 129, 89, 0.3), 0 0 34px rgba(52, 129, 89, 0.5);
        }

        .posterNav:hover,
        .posterNav:focus-visible {
          transform: translateY(-50%);
          border-color: rgba(52, 129, 89, 0.56);
          background: rgba(0, 0, 0, 0.84);
        }

        .posterNav:disabled {
          opacity: 0.22;
          cursor: not-allowed;
        }

        .posterNav:disabled:hover,
        .posterNav:disabled:focus-visible {
          transform: translateY(-50%);
          border-color: rgba(52, 129, 89, 0.42);
          background: rgba(0, 0, 0, 0.74);
        }

        .posterNav--prev {
          left: 20px;
        }

        .posterNav--next {
          right: 20px;
        }

        .posterNav__arrow {
          font-size: 0.96rem;
          line-height: 1;
        }

        .posterFrame {
          --core-size: min(41vw, 520px);
          --orb-shell-size: calc(var(--core-size) + clamp(120px, 12vw, 170px));
          position: absolute;
          inset: 0;
          z-index: 6;
          display: grid;
          place-items: center;
          justify-items: center;
          padding: clamp(88px, 11vh, 118px) 88px clamp(72px, 10vh, 100px);
          pointer-events: none;
        }

        .posterTitleWrap {
          position: absolute;
          left: 50%;
          top: calc(50% - (var(--core-size) / 2) - 98px);
          transform: translateX(-50%);
          z-index: 9;
          width: min(90vw, 900px);
          display: flex;
          justify-content: center;
        }

        .posterTitle {
          margin: 0;
          color: #f2efe6;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-family: 'Orbitron', 'IBM Plex Mono', monospace;
          font-size: 3.8rem;
          font-weight: 900;
          text-shadow:
            0 0 10px rgba(255, 255, 255, 0.18),
            0 0 24px rgba(255, 255, 255, 0.2),
            0 0 40px rgba(255, 255, 255, 0.5);
        }

        .orbCluster {
          position: relative;
          width: min(var(--orb-shell-size), calc(100vw - 24px));
          aspect-ratio: 1 / 1;
          z-index: 7;
          display: grid;
          place-items: center;
          justify-self: center;
          align-self: center;
          margin-inline: auto;
          pointer-events: none;
        }

        .orbBloomBack {
          position: absolute;
          inset: 5%;
          border-radius: 999px;
          background:
            radial-gradient(circle,
              rgba(95, 212, 156, 0.3) 0%,
              rgba(63, 180, 121, 0.52) 32%,
              rgba(52, 129, 89, 0.42) 50%,
              rgba(52, 129, 89, 0.24) 68%,
              rgba(52, 129, 89, 0) 86%);
          filter: blur(54px);
          transform: scale(1.08);
          opacity: 0.72;
          animation: orbPulse 2.8s ease-in-out infinite;
          pointer-events: none;
        }

        .orbPhotoMask {
          position: absolute;
          left: 50%;
          top: 50%;
          width: var(--core-size);
          height: var(--core-size);
          transform: translate3d(-50%, -50%, 0);
          border-radius: 50%;
          overflow: hidden;
          clip-path: circle(50% at 50% 50%);
          -webkit-clip-path: circle(50% at 50% 50%);
          -webkit-mask-image: -webkit-radial-gradient(white, black);
          isolation: isolate;
          contain: paint;
          background: rgba(52, 129, 89, 0.28);
          box-shadow:
            inset 0 0 0 1px rgba(255, 255, 255, 0.03),
            inset 0 0 60px rgba(52, 129, 89, 0.26),
            inset 0 0 130px rgba(52, 129, 89, 0.2),
            0 0 22px rgba(52, 129, 89, 0.12);
          animation: orbCorePulse 2.8s ease-in-out infinite;
        }

        .orbPhotoLayer {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-repeat: no-repeat;
          filter: contrast(1.02) brightness(0.96);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform: translateZ(0);
          will-change: opacity, transform;
        }

        .orbPhotoLayer::before,
        .orbPhotoLayer::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: inherit;
          background-size: inherit;
          background-position: inherit;
          background-repeat: inherit;
          pointer-events: none;
          opacity: 0;
          mix-blend-mode: screen;
        }

        .orbPhotoLayer--current {
          opacity: 1;
        }

        .orbPhotoLayer--current.is-glitching {
          animation: photoGlitchIn 360ms ease both;
        }

        .orbPhotoLayer--current.is-glitching::before {
          animation: photoGlitchSliceA 360ms steps(2, end) both;
        }

        .orbPhotoLayer--current.is-glitching::after {
          animation: photoGlitchSliceB 360ms steps(2, end) both;
        }

        .orbPhotoLayer--previous {
          opacity: 1;
          animation: photoGlitchOut 360ms ease forwards;
        }

        .orbInnerTint {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 50% 50%, rgba(52, 129, 89, 0.04), rgba(52, 129, 89, 0.08) 54%, rgba(52, 129, 89, 0.18) 78%, rgba(52, 129, 89, 0.3) 100%),
            linear-gradient(180deg, rgba(125, 225, 180, 0.08), transparent 18%, transparent 68%, rgba(0, 0, 0, 0.18) 100%);
          mix-blend-mode: screen;
          pointer-events: none;
        }

        .orbInnerGlow {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          box-shadow:
            inset 0 0 52px rgba(126, 228, 183, 0.22),
            inset 0 0 140px rgba(52, 129, 89, 0.22),
            inset 0 0 220px rgba(52, 129, 89, 0.12);
          pointer-events: none;
        }

        .orbOverlay {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          pointer-events: none;
        }

        .orbOverlay--main {
          opacity: 0.96;
          mix-blend-mode: screen;
          animation: orbPulseSoft 2.8s ease-in-out infinite;
        }

        .posterAreaTitle {
          position: absolute;
          left: 50%;
          top: calc(50% + (var(--core-size) / 2) + 20px);
          width: min(820px, calc(100vw - 100px));
          min-height: 78px;
          transform: translateX(-50%);
          z-index: 8;
          pointer-events: none;
        }

        .posterAreaTitle__item {
          position: absolute;
          left: 50%;
          top: 0;
          width: max-content;
          max-width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 26px 15px;
          border-radius: 999px;
          border: 1px solid rgba(52, 129, 89, 0.42);
          background: rgba(0, 0, 0, 0.74);
          box-shadow:
            0 0 16px rgba(52, 129, 89, 0.14),
            inset 0 0 18px rgba(52, 129, 89, 0.08);
          opacity: 0;
          transform: translate(-50%, 10px) scale(0.98);
          transition: opacity 320ms ease, transform 320ms ease;
          color: ${ACCENT};
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-family: 'Orbitron', 'IBM Plex Mono', monospace;
          font-size: 2.2rem;
          font-weight: 900;
          text-shadow: 0 0 8px rgba(52, 129, 89, 0.5), 0 0 18px rgba(52, 129, 89, 0.3), 0 0 34px rgba(52, 129, 89, 0.5);
        }

        .posterAreaTitle__item.is-active {
          opacity: 1;
          transform: translate(-50%, 0) scale(1);
        }

        .posterInfo {
          position: absolute;
          left: 50%;
          top: calc(50% + (var(--core-size) / 2) + 96px);
          width: min(760px, calc(100vw - 120px));
          min-height: 110px;
          transform: translateX(-50%);
          pointer-events: none;
        }

        .posterInfo__block {
          position: absolute;
          inset: 0;
          opacity: 0;
          transform: translateY(10px) scale(0.98);
          transition: opacity 320ms ease, transform 320ms ease;
          text-align: center;
        }

        .posterInfo__block.is-active {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .posterInfo__line {
          margin: 0;
          color: #f4f0e8;
          text-transform: uppercase;
          letter-spacing: 0.13em;
          line-height: 1.48;
          font-size: clamp(1rem, 1.45vw, 1.18rem);
          font-weight: 700;
          text-wrap: balance;
          text-shadow:
            0 0 8px rgba(255, 255, 255, 0.5),
            0 0 18px rgba(52, 129, 89, 0.3),
            0 0 34px rgba(52, 129, 89, 0.5);
        }

        .posterInfo__line--secondary {
          margin-top: 4px;
          font-size: 0.84em;
          opacity: 0.96;
        }

        .posterFooterContact {
          position: absolute;
          left: 50%;
          bottom: 26px;
          transform: translateX(-50%);
          z-index: 12;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: ${ACCENT};
          text-transform: uppercase;
          letter-spacing: 0.14em;
          font-size: 0.98rem;
          font-weight: 700;
          white-space: nowrap;
          text-shadow: 0 0 8px rgba(52, 129, 89, 0.5), 0 0 18px rgba(52, 129, 89, 0.3), 0 0 34px rgba(52, 129, 89, 0.5);
          pointer-events: auto;
        }

        @keyframes gridPulse {
          0%,
          100% {
            opacity: 0.75;
          }
          50% {
            opacity: 0.84;
          }
        }

        @keyframes gridSweepVertical {
          0%,
          62% {
            opacity: 0;
            transform: translateY(-130%);
          }
          66% {
            opacity: 0.14;
          }
          78% {
            opacity: 0.42;
            transform: translateY(18%);
          }
          88% {
            opacity: 0.12;
            transform: translateY(116%);
          }
          100% {
            opacity: 0;
            transform: translateY(116%);
          }
        }

        @keyframes orbPulse {
          0%,
          100% {
            transform: scale(1.06);
            opacity: 0.58;
            filter: blur(46px) brightness(0.96);
          }
          50% {
            transform: scale(1.24);
            opacity: 1;
            filter: blur(66px) brightness(1.12);
          }
        }

        @keyframes orbPulseSoft {
          0%,
          100% {
            transform: scale(0.992);
            opacity: 0.82;
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
          }
        }

        @keyframes orbCorePulse {
          0%,
          100% {
            box-shadow:
              inset 0 0 0 1px rgba(255, 255, 255, 0.03),
              inset 0 0 54px rgba(52, 129, 89, 0.2),
              inset 0 0 110px rgba(52, 129, 89, 0.14),
              0 0 14px rgba(52, 129, 89, 0.08);
          }
          50% {
            box-shadow:
              inset 0 0 0 1px rgba(255, 255, 255, 0.04),
              inset 0 0 78px rgba(52, 129, 89, 0.34),
              inset 0 0 160px rgba(52, 129, 89, 0.24),
              0 0 28px rgba(52, 129, 89, 0.18);
          }
        }

        @keyframes photoGlitchIn {
          0% {
            opacity: 0.28;
            transform: scale(1.02) translateX(8px);
            filter: contrast(1.12) brightness(1.04);
          }
          18% {
            opacity: 0.9;
            transform: scale(1.008) translateX(-6px);
          }
          42% {
            opacity: 0.74;
            transform: scale(1.005) translateX(4px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateX(0);
            filter: contrast(1.02) brightness(0.96);
          }
        }

        @keyframes photoGlitchOut {
          0% {
            opacity: 1;
            transform: scale(1) translateX(0);
          }
          100% {
            opacity: 0;
            transform: scale(0.998) translateX(-6px);
          }
        }

        @keyframes photoGlitchSliceA {
          0% {
            opacity: 0;
            transform: translateX(0);
            clip-path: inset(0 0 64% 0);
          }
          20% {
            opacity: 0.22;
            transform: translateX(-10px);
            clip-path: inset(0 0 68% 0);
          }
          44% {
            opacity: 0.08;
            transform: translateX(6px);
            clip-path: inset(0 0 58% 0);
          }
          100% {
            opacity: 0;
            transform: translateX(0);
            clip-path: inset(0 0 64% 0);
          }
        }

        @keyframes photoGlitchSliceB {
          0% {
            opacity: 0;
            transform: translateX(0);
            clip-path: inset(58% 0 0 0);
          }
          22% {
            opacity: 0.18;
            transform: translateX(12px);
            clip-path: inset(54% 0 0 0);
          }
          46% {
            opacity: 0.06;
            transform: translateX(-5px);
            clip-path: inset(62% 0 0 0);
          }
          100% {
            opacity: 0;
            transform: translateX(0);
            clip-path: inset(58% 0 0 0);
          }
        }

        @media (max-width: 1180px) {
          .posterFrame {
            --core-size: min(50vw, 480px);
            --orb-shell-size: calc(var(--core-size) + 120px);
            padding-left: 72px;
            padding-right: 72px;
          }

          .posterTitleWrap {
            top: calc(50% - (var(--core-size) / 2) - 86px);
          }

          .posterTitle {
            font-size: 3.2rem;
          }

          .posterAreaTitle__item {
            font-size: 1.95rem;
          }
        }

        @media (min-width: 861px) {
          .posterTitleWrap {
            top: calc(50% - (var(--core-size) / 2) - 128px);
          }

          .orbCluster {
            transform: translateY(-22px);
          }

          .posterAreaTitle {
            top: calc(50% + (var(--core-size) / 2) + 4px);
          }

          .posterInfo {
            top: calc(50% + (var(--core-size) / 2) + 74px);
          }
        }

        @media (max-width: 860px) {
          html {
            scroll-snap-type: y proximity;
          }

          .posterFrame {
            --core-size: min(72vw, 410px);
            --orb-shell-size: calc(var(--core-size) + 96px);
            padding: 84px 20px 118px;
          }

          .orbCluster {
            width: min(var(--orb-shell-size), calc(100vw - 20px));
          }

          .posterTitleWrap {
            top: 98px;
            width: min(94vw, 700px);
          }

          .posterTitle {
            font-size: 2.55rem;
          }

          .posterAreaTitle {
            top: calc(50% + (var(--core-size) / 2) + 18px);
            width: min(94vw, 700px);
          }

          .posterAreaTitle__item {
            padding: 12px 22px 13px;
            font-size: 1.7rem;
          }

          .posterInfo {
            top: calc(50% + (var(--core-size) / 2) + 82px);
            width: min(92vw, 560px);
          }

          .posterInfo__line {
            font-size: 0.94rem;
            line-height: 1.42;
          }

          .posterNav {
            top: auto;
            bottom: 18px;
            transform: none;
            padding: 13px 14px;
          }

          .posterNav:hover,
          .posterNav:focus-visible,
          .posterNav:disabled:hover,
          .posterNav:disabled:focus-visible {
            transform: none;
          }

          .posterNav--prev {
            left: 16px;
          }

          .posterNav--next {
            right: 16px;
          }

          .posterFooterContact {
            bottom: 20px;
            font-size: 0.84rem;
            letter-spacing: 0.12em;
          }
        }

        @media (max-width: 560px) {
          .posterFrame {
            --core-size: min(72vw, 310px);
            --orb-shell-size: calc(var(--core-size) + 82px);
            padding: 62px 10px 108px;
          }

          .orbCluster {
            width: min(var(--orb-shell-size), calc(100vw - 12px));
          }

          .posterTitleWrap {
            top: 58px;
            width: calc(100vw - 16px);
          }

          .posterTitle {
            font-size: 1.68rem;
            letter-spacing: 0.03em;
          }

          .posterAreaTitle {
            top: calc(50% + (var(--core-size) / 2) + 12px);
            width: calc(100vw - 20px);
            min-height: 48px;
          }

          .posterAreaTitle__item {
            max-width: calc(100vw - 42px);
            padding: 10px 16px 11px;
            font-size: 0.98rem;
            letter-spacing: 0.04em;
          }

          .posterInfo {
            top: calc(50% + (var(--core-size) / 2) + 56px);
            width: calc(100vw - 20px);
          }

          .posterInfo__line {
            font-size: 0.76rem;
            letter-spacing: 0.08em;
          }

          .posterNav {
            bottom: 12px;
            padding: 12px 13px;
            font-size: 0.68rem;
          }

          .posterNav__text {
            display: none;
          }

          .posterFooterContact {
            bottom: 18px;
            font-size: 0.78rem;
            letter-spacing: 0.11em;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
            scroll-snap-type: none;
          }

          .posterGrid,
          .posterGridSweep,
          .orbBloomBack,
          .orbPhotoMask,
          .orbOverlay--main {
            animation: none;
          }

          .orbPhotoLayer,
          .posterAreaTitle__item,
          .posterInfo__block,
          .posterNav {
            transition: none;
            animation: none;
          }
        }
      `}</style>
    </>
  );
}

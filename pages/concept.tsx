'use client';

import Head from 'next/head';
import { useEffect, useState, type MouseEvent } from 'react';
import SceneNav from '@components/SceneNav';

const C = {
  cream: '#E8E2D4',
  ink: '#1C1C1A',
  pink: '#D4507A',
  muted: '#7A7870',
} as const;

const MONO = '"Space Mono", "Courier New", monospace';
const SANS = '"Space Grotesk", "Helvetica Neue", Arial, sans-serif';

type AreaId = 'tent' | 'chefs-studio' | 'studio';

type AreaConfig = {
  id: AreaId;
  title: string;
  href: string;
  highlight: string;
};

const CONCEPT_ASSETS = {
  funnel: '/images/concept/grid_funel.png',
  floor: '/images/concept/noise_floor.png',
  obelisk: '/images/concept/obelisk-dark-grey.png',
};

const SPACE_ASSETS = {
  venue: '/images/the-space/the-space-page-venue.png',
};

const AREAS: AreaConfig[] = [
  {
    id: 'tent',
    title: 'THE TENT',
    href: '/thetent',
    highlight: '/images/the-space/tent-highlight.png',
  },
  {
    id: 'chefs-studio',
    title: "CHEF'S STUDIO",
    href: '/chefstudio',
    highlight: '/images/the-space/chefs-studio-highlight.png',
  },
  {
    id: 'studio',
    title: 'THE STUDIO',
    href: '/studio',
    highlight: '/images/the-space/studio-highlight.png',
  },
];

const EXPERIENCE_BTNS = [
  { label: 'After Dark', href: '/after-dark', dark: true },
  { label: 'Dining', href: '/dining', dark: false },
];

function Grain() {
  return (
    <svg
      aria-hidden="true"
      className="grain-layer"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      <filter id="concept-grain" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.72"
          numOctaves="4"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100" height="100" filter="url(#concept-grain)" />
    </svg>
  );
}

export default function ConceptPage() {
  const [activeArea, setActiveArea] = useState<AreaId | null>(null);
  const [isTouchMode, setIsTouchMode] = useState(false);

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
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;900&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="page page--with-scene-nav">
        <SceneNav theme="space" />
        <Grain />

        <div className="paper-field" aria-hidden="true" />

        <div className="shell">
          <div className="axis-v" aria-hidden="true" />

          <img
            className="concept-asset asset-funnel asset-funnel-top"
            src={CONCEPT_ASSETS.funnel}
            alt=""
            draggable={false}
          />
          <img
            className="concept-asset asset-funnel asset-funnel-echo"
            src={CONCEPT_ASSETS.funnel}
            alt=""
            draggable={false}
          />
          <img
            className="concept-asset asset-floor"
            src={CONCEPT_ASSETS.floor}
            alt=""
            draggable={false}
          />
          <img
            className="concept-asset asset-obelisk"
            src={CONCEPT_ASSETS.obelisk}
            alt=""
            draggable={false}
          />

          <section className="rail-section hero-section" aria-labelledby="concept-title">
            <div className="rail-title">
              <p className="eyebrow">LPX // Underground</p>
              <h1 id="concept-title">
                Concept<span className="pink-dot">.</span>
              </h1>
            </div>

            <div className="rail-content hero-content">
              <div className="address-card">
                <span className="address-kicker">Location</span>
                <p>17 Little Portland Street, London</p>
              </div>
            </div>
          </section>

          <section className="rail-section space-section" aria-labelledby="space-title">
            <div className="rail-title">
              <h2 id="space-title">The Space</h2>
            </div>

            <div className="rail-content">
              <div className="concept-space-map" aria-label="Interactive venue map">
                <div className="venue-wrap" aria-hidden="true">
                  <img
                    src={SPACE_ASSETS.venue}
                    alt="Venue layout showing The Tent, Chef's Studio and The Studio"
                    className="venue-image venue-base"
                    draggable={false}
                  />

                  {AREAS.map((area) => {
                    const isActive = activeArea === area.id;

                    return (
                      <div key={area.id}>
                        <img
                          src={area.highlight}
                          alt=""
                          className={`venue-image venue-highlight-glow ${
                            isActive ? 'is-active' : ''
                          }`}
                          draggable={false}
                        />
                        <img
                          src={area.highlight}
                          alt=""
                          className={`venue-image venue-highlight ${
                            isActive ? 'is-active' : ''
                          }`}
                          draggable={false}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              <nav
                className="zone-controls"
                aria-label="Venue areas"
                onMouseLeave={handleControlsLeave}
              >
                {AREAS.map((area) => {
                  const isActive = activeArea === area.id;
                  const helperText = isTouchMode
                    ? isActive
                      ? 'Tap to explore →'
                      : 'Tap to preview'
                    : 'Explore →';

                  return (
                    <a
                      key={area.id}
                      href={area.href}
                      className={`zone-card ${isActive ? 'is-active' : ''}`}
                      onMouseEnter={() => handleCardEnter(area.id)}
                      onFocus={() => setActiveArea(area.id)}
                      onClick={handleCardClick(area.id)}
                      aria-label={`${area.title} ${helperText}`}
                    >
                      <span className="zone-card-title">{area.title}</span>
                      <span className="zone-card-meta">{helperText}</span>
                    </a>
                  );
                })}
              </nav>
            </div>
          </section>

          <section className="rail-section experience-section" aria-labelledby="experience-title">
            <div className="rail-title">
              <h2 id="experience-title">The Experience</h2>
            </div>

            <div className="rail-content experience-content">
              <div className="experience-copy">
                <span className="address-kicker">Programme</span>
                <p>Move from dinner into late-night Little Portland energy.</p>
              </div>

              <nav className="experience-nav" aria-label="Explore the experience">
                {EXPERIENCE_BTNS.map((button) => (
                  <a
                    key={button.href}
                    href={button.href}
                    className={`concept-btn ${button.dark ? 'is-dark' : ''}`}
                  >
                    {button.label}
                  </a>
                ))}
              </nav>
            </div>
          </section>

          <footer className="foot">
            <span>17 Little Portland Street</span>
            <span>LPX // Underground</span>
          </footer>
        </div>
      </main>

      <style jsx global>{`
        html,
        body,
        #__next {
          margin: 0;
          min-height: 100%;
          background: ${C.cream};
          color: ${C.ink};
          -webkit-font-smoothing: antialiased;
          text-rendering: geometricPrecision;
        }

        body {
          overflow-x: hidden;
        }

        * {
          box-sizing: border-box;
        }

        .scene-nav {
          z-index: 10020 !important;
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
        .scene-nav-mobile--space a.active {
          color: ${C.pink} !important;
        }

        .scene-nav--space a.disabled,
        .scene-nav-mobile--space a.disabled {
          color: ${C.ink} !important;
          opacity: 0.4;
        }

        .scene-nav--space .scene-nav-burger span {
          background: ${C.ink} !important;
        }

        .scene-nav--space .scene-nav-logo img {
          filter: brightness(0) saturate(100%) invert(8%) sepia(5%) saturate(851%)
            hue-rotate(21deg) brightness(99%) contrast(91%);
        }

        .scene-nav-mobile.scene-nav--space,
        .scene-nav-mobile--space {
          background: rgba(232, 226, 212, 0.92) !important;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        @media (max-width: 900px) {
          .scene-nav-mobile.scene-nav--space .scene-nav-mobile-inner,
          .scene-nav-mobile--space .scene-nav-mobile-inner {
            padding-top: 96px;
          }
        }
      `}</style>

      <style jsx>{`
        .page {
          position: relative;
          min-height: 100svh;
          overflow: hidden;
          background:
            radial-gradient(circle at 72% 17%, rgba(212, 80, 122, 0.08), transparent 24rem),
            radial-gradient(circle at 31% 76%, rgba(28, 28, 26, 0.08), transparent 28rem),
            linear-gradient(180deg, rgba(255, 250, 236, 0.32), rgba(213, 207, 191, 0.22)),
            ${C.cream};
        }

        .paper-field {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background:
            radial-gradient(circle at 12% 16%, rgba(38, 89, 92, 0.08) 0 1px, transparent 1px 7px),
            radial-gradient(circle at 74% 64%, rgba(212, 80, 122, 0.08) 0 1px, transparent 1px 8px),
            radial-gradient(circle at 35% 74%, rgba(28, 28, 26, 0.08) 0 1px, transparent 1px 6px),
            repeating-linear-gradient(98deg, rgba(60, 72, 74, 0.035) 0 1px, transparent 1px 4px);
          opacity: 0.78;
          mix-blend-mode: multiply;
        }

        .grain-layer {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 70;
          pointer-events: none;
          opacity: 0.22;
          mix-blend-mode: multiply;
        }

        .shell {
          position: relative;
          z-index: 2;
          width: 75%;
          max-width: 1120px;
          min-height: 100svh;
          margin: 0 auto;
          padding: clamp(96px, 10vw, 128px) 0 48px;
        }

        .axis-v {
          position: absolute;
          top: 30px;
          bottom: 30px;
          left: 25%;
          z-index: 1;
          width: 1px;
          background: linear-gradient(
            180deg,
            rgba(28, 28, 26, 0),
            rgba(28, 28, 26, 0.48) 8%,
            rgba(28, 28, 26, 0.34) 92%,
            rgba(28, 28, 26, 0)
          );
          pointer-events: none;
        }

        .concept-asset {
          position: absolute;
          z-index: 0;
          pointer-events: none;
          user-select: none;
          mix-blend-mode: multiply;
        }

        .asset-funnel {
          width: clamp(110px, 12vw, 174px);
          opacity: 0.72;
          filter: saturate(0.88) contrast(0.96);
        }

        .asset-funnel-top {
          top: 82px;
          right: 6%;
          animation: assetFloatA 7.5s ease-in-out infinite;
        }

        .asset-funnel-echo {
          top: 54%;
          left: 1.5%;
          width: clamp(92px, 11vw, 142px);
          opacity: 0.28;
          transform: rotate(-22deg) scaleY(0.68);
          transform-origin: center center;
          animation: assetFloatB 9s ease-in-out infinite;
        }

        .asset-floor {
          top: 61%;
          left: 31%;
          width: clamp(190px, 30vw, 390px);
          opacity: 0.36;
          filter: contrast(0.9) saturate(0.7);
          animation: floorDrift 10s ease-in-out infinite;
        }

        .asset-obelisk {
          top: 58%;
          right: 8%;
          width: clamp(56px, 6vw, 86px);
          opacity: 0.58;
          filter: contrast(0.96) drop-shadow(16px 26px 24px rgba(28, 28, 26, 0.16));
          animation: obeliskHover 8s ease-in-out infinite;
        }

        .rail-section {
          position: relative;
          z-index: 3;
          display: grid;
          grid-template-columns: 25% minmax(0, 75%);
          align-items: start;
        }

        .hero-section {
          min-height: clamp(460px, 76svh, 760px);
          align-items: center;
        }

        .space-section,
        .experience-section {
          padding: clamp(88px, 10vw, 140px) 0;
        }

        .rail-title {
          position: relative;
          z-index: 4;
          padding-right: clamp(18px, 3vw, 42px);
        }

        .rail-content {
          position: relative;
          z-index: 4;
          padding-left: clamp(34px, 5vw, 68px);
        }

        h1,
        h2,
        p {
          margin: 0;
        }

        .eyebrow,
        .address-kicker,
        .foot,
        .zone-card-meta,
        .concept-btn {
          font-family: ${MONO};
        }

        .eyebrow {
          display: block;
          margin-bottom: 22px;
          color: ${C.muted};
          font-size: 10px;
          line-height: 1.2;
          letter-spacing: 0.24em;
          text-transform: uppercase;
        }

        h1,
        h2 {
          font-family: ${SANS};
          color: ${C.ink};
          text-transform: uppercase;
          font-weight: 900;
          line-height: 0.9;
          letter-spacing: -0.045em;
          text-wrap: balance;
        }

        h1 {
          font-size: clamp(44px, 5.2vw, 80px);
        }

        h2 {
          font-size: clamp(36px, 4.4vw, 66px);
        }

        .pink-dot {
          color: ${C.pink};
        }

        .address-card,
        .experience-copy {
          width: min(100%, 610px);
          border-top: 1px solid rgba(28, 28, 26, 0.22);
          border-bottom: 1px solid rgba(28, 28, 26, 0.12);
          padding: 24px 0 26px;
        }

        .address-kicker {
          display: block;
          margin-bottom: 12px;
          color: ${C.muted};
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
        }

        .address-card p,
        .experience-copy p {
          font-family: ${MONO};
          color: rgba(28, 28, 26, 0.72);
          font-size: clamp(12px, 1.25vw, 16px);
          line-height: 1.55;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .concept-space-map {
          position: relative;
          width: 100%;
          min-height: clamp(300px, 38vw, 520px);
          margin-top: -24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .concept-space-map::before {
          content: '';
          position: absolute;
          left: 7%;
          right: 7%;
          bottom: 14%;
          height: 18%;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(28, 28, 26, 0.16), transparent 72%);
          filter: blur(10px);
          opacity: 0.56;
          transform: rotate(-4deg);
        }

        .venue-wrap {
          position: relative;
          width: min(100%, 760px);
          aspect-ratio: 2048 / 1140;
          animation: venueFloat 4.8s ease-in-out infinite;
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
            saturate(0.78)
            contrast(1.02)
            drop-shadow(0 18px 28px rgba(28, 28, 26, 0.12))
            drop-shadow(0 36px 60px rgba(28, 28, 26, 0.1));
        }

        .venue-highlight-glow,
        .venue-highlight {
          opacity: 0;
          transition:
            opacity 0.28s ease,
            filter 0.28s ease,
            transform 0.28s ease;
        }

        .venue-highlight-glow {
          z-index: 3;
          filter:
            blur(14px)
            saturate(1.1)
            drop-shadow(0 0 20px rgba(212, 80, 122, 0.25));
          mix-blend-mode: multiply;
        }

        .venue-highlight {
          z-index: 4;
          mix-blend-mode: multiply;
          filter:
            saturate(1.08)
            contrast(1.08)
            drop-shadow(0 0 12px rgba(212, 80, 122, 0.18));
        }

        .venue-highlight-glow.is-active {
          opacity: 0.46;
          animation: highlightPulse 2.8s ease-in-out infinite;
        }

        .venue-highlight.is-active {
          opacity: 0.78;
          animation: highlightPulse 2.8s ease-in-out infinite;
        }

        .zone-controls {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
          margin-top: 22px;
        }

        .zone-card {
          position: relative;
          min-height: 76px;
          padding: 15px 16px 13px;
          border: 1px solid rgba(28, 28, 26, 0.42);
          background: rgba(232, 226, 212, 0.4);
          color: ${C.ink};
          text-decoration: none;
          box-shadow: 5px 5px 0 rgba(28, 28, 26, 0.08);
          transition:
            transform 0.22s ease,
            border-color 0.22s ease,
            background 0.22s ease,
            box-shadow 0.22s ease;
        }

        .zone-card::before {
          content: '';
          position: absolute;
          left: 12px;
          right: 12px;
          bottom: 9px;
          height: 1px;
          background: ${C.pink};
          opacity: 0;
          transform: scaleX(0.28);
          transform-origin: left center;
          transition: opacity 0.22s ease, transform 0.22s ease;
        }

        .zone-card-title {
          display: block;
          font-family: ${SANS};
          font-size: clamp(13px, 1.25vw, 18px);
          font-weight: 900;
          line-height: 1.02;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .zone-card-meta {
          display: block;
          margin-top: 7px;
          color: rgba(28, 28, 26, 0.58);
          font-size: 10px;
          letter-spacing: 0.16em;
          line-height: 1.15;
          text-transform: uppercase;
        }

        .zone-card:hover,
        .zone-card:focus-visible,
        .zone-card.is-active {
          border-color: rgba(212, 80, 122, 0.8);
          background: rgba(212, 80, 122, 0.08);
          box-shadow: 8px 8px 0 rgba(212, 80, 122, 0.12);
          transform: translate(-2px, -2px);
          outline: none;
        }

        .zone-card:hover::before,
        .zone-card:focus-visible::before,
        .zone-card.is-active::before {
          opacity: 1;
          transform: scaleX(1);
        }

        .experience-content {
          display: grid;
          gap: 28px;
        }

        .experience-copy {
          max-width: 600px;
        }

        .experience-nav {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .concept-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 46px;
          min-width: 168px;
          padding: 13px 26px 12px;
          border: 1px solid ${C.ink};
          background: transparent;
          color: ${C.ink};
          text-decoration: none;
          font-size: 10px;
          line-height: 1;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          box-shadow: 5px 5px 0 rgba(28, 28, 26, 0.08);
          transition:
            transform 0.22s ease,
            background 0.22s ease,
            color 0.22s ease,
            border-color 0.22s ease,
            box-shadow 0.22s ease;
        }

        .concept-btn.is-dark {
          background: ${C.ink};
          color: ${C.cream};
        }

        .concept-btn:hover,
        .concept-btn:focus-visible {
          border-color: ${C.pink};
          background: rgba(212, 80, 122, 0.1);
          color: ${C.ink};
          box-shadow: 8px 8px 0 rgba(212, 80, 122, 0.14);
          transform: translate(-2px, -2px);
          outline: none;
        }

        .concept-btn.is-dark:hover,
        .concept-btn.is-dark:focus-visible {
          background: ${C.pink};
          color: ${C.cream};
        }

        .foot {
          position: relative;
          z-index: 4;
          display: flex;
          justify-content: space-between;
          gap: 24px;
          padding: 36px 0 24px;
          border-top: 1px solid rgba(28, 28, 26, 0.15);
          color: ${C.muted};
          font-size: 9px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
        }

        @keyframes assetFloatA {
          0%,
          100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          50% {
            transform: translate3d(-8px, 10px, 0) rotate(1.4deg);
          }
        }

        @keyframes assetFloatB {
          0%,
          100% {
            transform: translate3d(0, 0, 0) rotate(-22deg) scaleY(0.68);
          }
          50% {
            transform: translate3d(10px, -7px, 0) rotate(-19deg) scaleY(0.68);
          }
        }

        @keyframes floorDrift {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(12px, -6px, 0);
          }
        }

        @keyframes obeliskHover {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -10px, 0);
          }
        }

        @keyframes venueFloat {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes highlightPulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.01);
          }
        }

        @media (max-width: 1100px) {
          .shell {
            width: 82%;
          }

          .zone-controls {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 820px) {
          .shell {
            width: calc(100% - 40px);
            max-width: none;
            padding-top: 96px;
          }

          .axis-v {
            left: 22px;
          }

          .rail-section {
            grid-template-columns: 1fr;
            padding-left: 52px;
          }

          .hero-section {
            min-height: 68svh;
          }

          .space-section,
          .experience-section {
            padding: 88px 0;
          }

          .rail-title {
            padding-right: 0;
            margin-bottom: 26px;
          }

          .rail-content {
            padding-left: 0;
          }

          .eyebrow {
            margin-bottom: 16px;
          }

          h1 {
            font-size: clamp(48px, 15vw, 74px);
          }

          h2 {
            font-size: clamp(38px, 12vw, 60px);
          }

          .address-card,
          .experience-copy {
            padding: 20px 0 22px;
          }

          .concept-space-map {
            min-height: clamp(240px, 64vw, 390px);
            margin-top: -10px;
          }

          .venue-wrap {
            width: min(112%, 620px);
            margin-left: -6%;
          }

          .asset-funnel-top {
            top: 116px;
            right: -16px;
            width: 112px;
            opacity: 0.44;
          }

          .asset-funnel-echo {
            display: none;
          }

          .asset-floor {
            top: 66%;
            left: 12%;
            width: 260px;
            opacity: 0.22;
          }

          .asset-obelisk {
            top: 62%;
            right: -10px;
            width: 58px;
            opacity: 0.28;
          }

          .foot {
            margin-left: 52px;
            flex-direction: column;
            gap: 9px;
          }
        }

        @media (max-width: 520px) {
          .shell {
            width: calc(100% - 28px);
            padding-top: 88px;
          }

          .axis-v {
            left: 16px;
            top: 24px;
            bottom: 24px;
          }

          .rail-section {
            padding-left: 40px;
          }

          .hero-section {
            min-height: 62svh;
          }

          .space-section,
          .experience-section {
            padding: 72px 0;
          }

          .address-card p,
          .experience-copy p {
            font-size: 11px;
            letter-spacing: 0.12em;
          }

          .concept-space-map {
            min-height: 230px;
          }

          .venue-wrap {
            width: 124%;
            margin-left: -12%;
          }

          .zone-card {
            min-height: 66px;
            padding: 13px 14px 12px;
          }

          .zone-card-title {
            font-size: 13px;
          }

          .zone-card-meta {
            font-size: 9px;
          }

          .experience-nav,
          .concept-btn {
            width: 100%;
          }

          .concept-btn {
            min-width: 0;
          }

          .foot {
            margin-left: 40px;
            padding-bottom: 30px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .asset-funnel-top,
          .asset-funnel-echo,
          .asset-floor,
          .asset-obelisk,
          .venue-wrap,
          .venue-highlight-glow.is-active,
          .venue-highlight.is-active {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}

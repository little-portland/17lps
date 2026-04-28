import Head from 'next/head';
import { useEffect, useState, type MouseEvent } from 'react';
import SceneNav from '@components/SceneNav';

type AreaId = 'tent' | 'chefs-studio' | 'studio';

type AreaConfig = {
  id: AreaId;
  title: string;
  href: string;
  highlight: string;
};

const ASSETS = {
  bg: '/images/the-space/the-space-page-bg.jpg',
  frame: '/images/the-space/the-space-page-hud-frame.png',
  frameMobile: '/images/the-space/the-space-page-hud-frame-mobile.png',
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

export default function TheSpacePage() {
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
        <title>The Space</title>
        <meta
          name="description"
          content="Interactive retro-futurist venue map."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="page page--with-scene-nav">
        <SceneNav theme="space" />

        <div className="page-bg" aria-hidden="true" />
        <div className="page-bg-overlay" aria-hidden="true" />

        <div className="twinkle twinkle-a" aria-hidden="true" />
        <div className="twinkle twinkle-b" aria-hidden="true" />

        <div className="page-glow page-glow-a" aria-hidden="true" />
        <div className="page-glow page-glow-b" aria-hidden="true" />
        <div className="page-glow page-glow-c" aria-hidden="true" />

        <section className="scene-shell" aria-label="Interactive venue map">
          <picture className="layer frame-picture" aria-hidden="true">
            <source media="(max-width: 900px)" srcSet={ASSETS.frameMobile} />
            <img
              src={ASSETS.frame}
              alt=""
              className="frame-image"
              draggable={false}
            />
          </picture>

          <div className="scanlines" aria-hidden="true" />

          <div className="hud-title-wrap" aria-hidden="true">
            <div className="hud-title-kicker hud-title-kicker-left" />
            <h1 className="hud-title">THE SPACE</h1>
            <div className="hud-title-kicker hud-title-kicker-right" />
          </div>

          <div className="venue-wrap layer" aria-hidden="true">
            <img
              src={ASSETS.venue}
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

            <img
              src={ASSETS.venue}
              alt=""
              className="venue-image venue-glitch venue-glitch-a"
              draggable={false}
            />
            <img
              src={ASSETS.venue}
              alt=""
              className="venue-image venue-glitch venue-glitch-b"
              draggable={false}
            />
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
        </section>

        <style jsx global>{`
          html,
          body,
          #__next {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            overscroll-behavior: none;
            background: #000;
          }

          * {
            box-sizing: border-box;
          }
        
        /* =====================================================
           THE SPACE NAV THEME
        ===================================================== */
        
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
          z-index: 10020 !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
        }
        
        /* Desktop nav + mobile open menu links */
        .scene-nav--space,
        .scene-nav--space a,
        .scene-nav-mobile--space,
        .scene-nav-mobile--space a {
          color: #e031c1 !important;
          font-family: 'Orbitron', sans-serif !important;
        }
        
        /* Active item on desktop + mobile */
        .scene-nav--space a.active,
        .scene-nav-mobile--space a.active {
          color: #ffffff !important;
        }
        
        /* Disabled items on desktop + mobile */
        .scene-nav--space a.disabled,
        .scene-nav-mobile--space a.disabled {
          color: #e031c1 !important;
          opacity: 0.45;
        }
        
        .scene-nav--space .scene-nav-burger span {
          background: #e031c1 !important;
        }
        
        .scene-nav--space .scene-nav-logo img {
          filter: brightness(0) saturate(100%) invert(38%) sepia(87%)
            saturate(2127%) hue-rotate(283deg) brightness(93%) contrast(93%);
        }
        
        .scene-nav-mobile.scene-nav--space,
        .scene-nav-mobile--space {
          background: transparent !important;
        }
        
        @media (max-width: 900px) {
          .scene-nav--space {
            background: transparent !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
          }
        
          /* Blur only when mobile menu is open */
          .scene-nav-mobile.scene-nav--space,
          .scene-nav-mobile--space {
            background: rgba(5, 0, 16, 0.42) !important;
            backdrop-filter: blur(18px);
            -webkit-backdrop-filter: blur(18px);
          }
        
          .scene-nav-mobile.scene-nav--space .scene-nav-mobile-inner,
          .scene-nav-mobile--space .scene-nav-mobile-inner {
            padding-top: 96px;
          }
        
          .scene-nav-mobile--space a {
            color: #e031c1 !important;
            font-family: 'Orbitron', sans-serif !important;
          }
        
          .scene-nav-mobile--space a.active {
            color: #ffffff !important;
          }
        
          .scene-nav-mobile--space a.disabled {
            color: #e031c1 !important;
            opacity: 0.45;
          }
        }
        `}</style>

        <style jsx>{`
          .page {
            position: relative;
            height: 100dvh;
            min-height: 100dvh;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            background: #000;
          }

          .page-bg,
          .page-bg-overlay,
          .page-glow,
          .twinkle {
            position: absolute;
            inset: 0;
            pointer-events: none;
          }

          .page-bg {
            background-image: url('${ASSETS.bg}');
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
            opacity: 0.65;
            transform: scale(1.03);
          }

          .page-bg-overlay {
            background:
              radial-gradient(circle at 50% 10%, rgba(181, 74, 255, 0.14), transparent 24%),
              radial-gradient(circle at 20% 24%, rgba(217, 58, 255, 0.1), transparent 18%),
              radial-gradient(circle at 80% 72%, rgba(140, 34, 232, 0.1), transparent 20%),
              linear-gradient(180deg, rgba(0, 0, 0, 0.22) 0%, rgba(0, 0, 0, 0.3) 100%);
          }

          .twinkle {
            mix-blend-mode: screen;
            opacity: 0.58;
            filter:
              drop-shadow(0 0 3px rgba(246, 210, 255, 0.42))
              drop-shadow(0 0 8px rgba(193, 120, 255, 0.22));
          }

          .twinkle-a {
            background-image:
              radial-gradient(circle at 10% 18%, rgba(255, 245, 255, 0.96) 0 1px, transparent 2.2px),
              radial-gradient(circle at 22% 64%, rgba(238, 188, 255, 0.88) 0 1.2px, transparent 2.4px),
              radial-gradient(circle at 39% 28%, rgba(227, 170, 255, 0.86) 0 1px, transparent 2.2px),
              radial-gradient(circle at 51% 72%, rgba(255, 230, 255, 0.96) 0 1.1px, transparent 2.2px),
              radial-gradient(circle at 68% 22%, rgba(219, 154, 255, 0.84) 0 1px, transparent 2.2px),
              radial-gradient(circle at 79% 61%, rgba(235, 186, 255, 0.88) 0 1.2px, transparent 2.4px),
              radial-gradient(circle at 92% 18%, rgba(230, 174, 255, 0.84) 0 1px, transparent 2.2px);
            animation: twinkleA 6s ease-in-out infinite;
          }

          .twinkle-b {
            background-image:
              radial-gradient(circle at 14% 82%, rgba(255, 242, 255, 0.94) 0 1.2px, transparent 2.4px),
              radial-gradient(circle at 29% 15%, rgba(233, 182, 255, 0.84) 0 1px, transparent 2.2px),
              radial-gradient(circle at 44% 48%, rgba(243, 198, 255, 0.9) 0 1.1px, transparent 2.3px),
              radial-gradient(circle at 58% 18%, rgba(255, 235, 255, 0.94) 0 1.1px, transparent 2.3px),
              radial-gradient(circle at 73% 78%, rgba(230, 172, 255, 0.88) 0 1px, transparent 2.2px),
              radial-gradient(circle at 86% 36%, rgba(223, 162, 255, 0.84) 0 1px, transparent 2.2px);
            animation: twinkleB 8s ease-in-out infinite;
          }

          .page-glow {
            border-radius: 999px;
            filter: blur(90px);
            opacity: 0.55;
          }

          .page-glow-a {
            width: 380px;
            height: 380px;
            top: -4%;
            left: -4%;
            background: radial-gradient(circle, rgba(208, 88, 255, 0.22), transparent 72%);
            animation: driftA 9s ease-in-out infinite alternate;
          }

          .page-glow-b {
            width: 420px;
            height: 420px;
            top: -8%;
            right: 8%;
            background: radial-gradient(circle, rgba(122, 40, 220, 0.16), transparent 72%);
            animation: driftB 11s ease-in-out infinite alternate;
          }

          .page-glow-c {
            width: 460px;
            height: 460px;
            bottom: -16%;
            left: 50%;
            transform: translateX(-50%);
            background: radial-gradient(circle, rgba(116, 24, 180, 0.16), transparent 72%);
            animation: driftC 13s ease-in-out infinite alternate;
          }

          .scene-shell {
            position: relative;
            width: min(86vw, calc((100dvh - 48px) * 1.5004), 1240px);
            aspect-ratio: 2048 / 1365;
            overflow: visible;
          }

          .layer {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            user-select: none;
          }

          .frame-picture {
            z-index: 8;
            pointer-events: none;
          }

          .frame-image {
            width: 100%;
            height: 100%;
            object-fit: contain;
            display: block;
            pointer-events: none;
          }

          .scanlines {
            position: absolute;
            inset: 0;
            z-index: 9;
            pointer-events: none;
            opacity: 0.08;
            background: linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.06) 0%,
              rgba(255, 255, 255, 0) 10%,
              rgba(255, 255, 255, 0.04) 20%,
              rgba(255, 255, 255, 0) 30%,
              rgba(255, 255, 255, 0.03) 40%,
              rgba(255, 255, 255, 0) 50%,
              rgba(255, 255, 255, 0.04) 60%,
              rgba(255, 255, 255, 0) 70%,
              rgba(255, 255, 255, 0.03) 80%,
              rgba(255, 255, 255, 0) 90%,
              rgba(255, 255, 255, 0.04) 100%
            );
            mix-blend-mode: screen;
          }

          .hud-title-wrap {
            position: absolute;
            top: 7.4%;
            left: 50%;
            transform: translateX(-50%);
            z-index: 20;
            display: flex;
            align-items: center;
            gap: 14px;
            pointer-events: none;
          }

          .hud-title {
            margin: 0;
            font-family: 'Orbitron', sans-serif;
            font-size: clamp(24px, 2.25vw, 38px);
            font-weight: 700;
            letter-spacing: 0.26em;
            color: #fff1ff;
            text-transform: uppercase;
            text-shadow:
              0 0 12px rgba(255, 115, 235, 0.18),
              0 0 28px rgba(183, 86, 255, 0.12);
            white-space: nowrap;
          }

          .hud-title-kicker {
            width: 68px;
            height: 1px;
            box-shadow: 0 0 10px rgba(255, 90, 229, 0.16);
          }

          .hud-title-kicker-left {
            background: linear-gradient(
              90deg,
              rgba(255, 90, 229, 0) 0%,
              rgba(208, 86, 255, 0.82) 55%,
              rgba(255, 245, 255, 0.86) 100%
            );
          }

          .hud-title-kicker-right {
            background: linear-gradient(
              90deg,
              rgba(255, 245, 255, 0.86) 0%,
              rgba(208, 86, 255, 0.82) 45%,
              rgba(255, 90, 229, 0) 100%
            );
          }

          .venue-wrap {
            z-index: 2;
            pointer-events: none;
            animation: venueFloat 4.2s ease-in-out infinite;
          }

          .venue-image {
            position: absolute;
            inset: auto;
            top: 21%;
            left: 12.4%;
            width: 75.6%;
            height: auto;
            object-fit: contain;
            pointer-events: none;
            user-select: none;
          }

          .venue-base {
            z-index: 2;
            filter:
              drop-shadow(0 12px 26px rgba(255, 0, 212, 0.12))
              drop-shadow(0 32px 62px rgba(93, 0, 130, 0.18));
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
              blur(16px)
              saturate(1.2)
              drop-shadow(0 0 22px rgba(255, 70, 230, 0.28));
            mix-blend-mode: screen;
          }

          .venue-highlight {
            z-index: 4;
            mix-blend-mode: screen;
            filter:
              saturate(1.18)
              drop-shadow(0 0 14px rgba(255, 60, 220, 0.22));
          }

          .venue-highlight-glow.is-active {
            opacity: 0.55;
            animation: highlightPulse 2.8s ease-in-out infinite;
          }

          .venue-highlight.is-active {
            opacity: 0.92;
            animation: highlightPulse 2.8s ease-in-out infinite;
          }

          .venue-glitch {
            z-index: 5;
            opacity: 0;
            mix-blend-mode: screen;
            pointer-events: none;
          }

          .venue-glitch-a {
            filter:
              drop-shadow(0 0 12px rgba(255, 0, 190, 0.38))
              hue-rotate(-18deg)
              saturate(1.35);
            animation: venueGlitchA 9s steps(1, end) infinite;
          }

          .venue-glitch-b {
            filter:
              drop-shadow(0 0 12px rgba(120, 220, 255, 0.28))
              hue-rotate(24deg)
              saturate(1.2);
            animation: venueGlitchB 9s steps(1, end) infinite;
          }

          .zone-controls {
            position: absolute;
            left: 11%;
            right: 11%;
            bottom: calc(7.8% + 25px);
            z-index: 20;
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 14px;
          }

          .zone-card {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            min-height: 88px;
            padding: 16px 18px 14px;
            border-radius: 18px;
            border: 1.2px solid rgba(255, 40, 214, 0.34);
            background: linear-gradient(
              180deg,
              rgba(18, 2, 28, 0.42) 0%,
              rgba(10, 0, 18, 0.2) 100%
            );
            box-shadow:
              0 0 0 1px rgba(255, 160, 244, 0.08) inset,
              0 0 18px rgba(255, 0, 190, 0.06);
            text-decoration: none;
            backdrop-filter: blur(6px);
            transition:
              border-color 0.22s ease,
              box-shadow 0.22s ease,
              background 0.22s ease;
          }

          .zone-card::before {
            content: '';
            position: absolute;
            inset: 5px;
            border-radius: 13px;
            border: 1px solid rgba(255, 180, 244, 0.12);
            pointer-events: none;
          }

          .zone-card-title {
            font-family: 'Orbitron', sans-serif;
            font-size: clamp(12px, 1vw, 17px);
            font-weight: 600;
            letter-spacing: 0.08em;
            line-height: 1.1;
            color: #fff6ff;
          }

          .zone-card-meta {
            margin-top: 6px;
            font-family: 'Orbitron', sans-serif;
            font-size: 10px;
            line-height: 1.05;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: rgba(255, 196, 247, 0.72);
          }

          .zone-card:hover,
          .zone-card:focus-visible,
          .zone-card.is-active {
            border-color: rgba(255, 90, 229, 0.88);
            background: linear-gradient(
              180deg,
              rgba(30, 4, 40, 0.54) 0%,
              rgba(16, 0, 24, 0.28) 100%
            );
            box-shadow:
              0 0 0 1px rgba(255, 160, 244, 0.12) inset,
              0 0 24px rgba(255, 0, 190, 0.14);
            outline: none;
          }

          .zone-card.is-active .zone-card-meta {
            color: rgba(255, 228, 251, 0.95);
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

          @keyframes venueGlitchA {
            0%,
            72%,
            100% {
              opacity: 0;
              transform: translate3d(0, 0, 0);
              clip-path: inset(0 0 0 0);
            }

            73% {
              opacity: 0.24;
              transform: translate3d(-10px, -3px, 0);
              clip-path: inset(0% 0 82% 0);
            }

            74% {
              opacity: 0.3;
              transform: translate3d(12px, 4px, 0);
              clip-path: inset(16% 0 58% 0);
            }

            75% {
              opacity: 0.22;
              transform: translate3d(-8px, -6px, 0);
              clip-path: inset(34% 0 34% 0);
            }

            76% {
              opacity: 0.28;
              transform: translate3d(9px, 7px, 0);
              clip-path: inset(52% 0 16% 0);
            }

            77% {
              opacity: 0.18;
              transform: translate3d(-6px, -4px, 0);
              clip-path: inset(74% 0 3% 0);
            }

            78% {
              opacity: 0;
              transform: translate3d(0, 0, 0);
              clip-path: inset(0 0 0 0);
            }
          }

          @keyframes venueGlitchB {
            0%,
            72%,
            100% {
              opacity: 0;
              transform: translate3d(0, 0, 0);
              clip-path: inset(0 0 0 0);
            }

            73.2% {
              opacity: 0.16;
              transform: translate3d(8px, 5px, 0);
              clip-path: inset(8% 0 72% 0);
            }

            74.1% {
              opacity: 0.22;
              transform: translate3d(-12px, -3px, 0);
              clip-path: inset(24% 0 46% 0);
            }

            75.2% {
              opacity: 0.18;
              transform: translate3d(7px, -8px, 0);
              clip-path: inset(44% 0 24% 0);
            }

            76.1% {
              opacity: 0.24;
              transform: translate3d(-9px, 6px, 0);
              clip-path: inset(63% 0 9% 0);
            }

            77.2% {
              opacity: 0.12;
              transform: translate3d(4px, -2px, 0);
              clip-path: inset(82% 0 0% 0);
            }

            78% {
              opacity: 0;
              transform: translate3d(0, 0, 0);
              clip-path: inset(0 0 0 0);
            }
          }

          @keyframes twinkleA {
            0%,
            100% {
              opacity: 0.18;
            }
            25% {
              opacity: 0.34;
            }
            50% {
              opacity: 0.54;
            }
            75% {
              opacity: 0.28;
            }
          }

          @keyframes twinkleB {
            0%,
            100% {
              opacity: 0.12;
            }
            20% {
              opacity: 0.3;
            }
            45% {
              opacity: 0.2;
            }
            70% {
              opacity: 0.46;
            }
          }

          @keyframes driftA {
            from {
              transform: translate3d(0, 0, 0);
            }
            to {
              transform: translate3d(20px, 6px, 0);
            }
          }

          @keyframes driftB {
            from {
              transform: translate3d(0, 0, 0);
            }
            to {
              transform: translate3d(-18px, 12px, 0);
            }
          }

          @keyframes driftC {
            from {
              transform: translate3d(-50%, 0, 0);
            }
            to {
              transform: translate3d(calc(-50% + 18px), -10px, 0);
            }
          }

          @media (max-width: 900px) {
            .page {
              height: 100dvh;
              min-height: 100dvh;
              padding:
                max(10px, env(safe-area-inset-top))
                10px
                max(10px, env(safe-area-inset-bottom))
                10px;
              overflow: hidden;
            }

            .scene-shell {
              width: min(
                92vw,
                calc(
                  100dvh -
                  env(safe-area-inset-top) -
                  env(safe-area-inset-bottom) -
                  20px
                )
              );
              aspect-ratio: 1340 / 2048;
            }

            .hud-title-wrap {
              top: calc(10% + 20px);
              gap: 10px;
            }

            .hud-title {
              font-size: clamp(18px, 4.2vw, 26px);
              letter-spacing: 0.18em;
            }

            .hud-title-kicker {
              width: 36px;
            }

            .venue-image {
              top: calc(20% + 8px);
              left: 9.4%;
              width: 80.5%;
            }

            .zone-controls {
              left: 9%;
              right: 9%;
              bottom: calc(8% + 10px);
              grid-template-columns: 1fr;
              gap: 10px;
            }

            .zone-card {
              min-height: 68px;
              padding: 13px 14px 11px;
              border-radius: 16px;
            }

            .zone-card::before {
              inset: 4px;
              border-radius: 11px;
            }

            .zone-card-title {
              font-size: clamp(11px, 3vw, 14px);
            }

            .zone-card-meta {
              margin-top: 4px;
              font-size: 9px;
            }
          }
        `}</style>
      </main>
    </>
  );
}

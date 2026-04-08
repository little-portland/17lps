import Head from 'next/head';
import Link from 'next/link';

type Point = {
  x: string;
  y: string;
};

type HotspotLayout = {
  button: Point;
  lineStart: Point;
  lineEnd: Point;
};

type AreaConfig = {
  id: 'tent' | 'chefs-studio' | 'studio';
  title: string;
  href: string;
  desktop: HotspotLayout;
  mobile?: HotspotLayout;
};

const ASSETS = {
  bg: '/images/the-space/the-space-page-bg.jpg',
  frame: '/images/the-space/the-space-page-hud-frame.png',
  venue: '/images/the-space/the-space-page-venue.png',
};

// Change ONLY these hrefs if your real page routes are different.
const AREAS: AreaConfig[] = [
  {
    id: 'tent',
    title: 'The Tent',
    href: '/tent',
    desktop: {
      button: { x: '37.5%', y: '18.0%' },
      lineStart: { x: '45.0%', y: '18.0%' },
      lineEnd: { x: '51.5%', y: '31.0%' },
    },
    mobile: {
      button: { x: '36.0%', y: '18.0%' },
      lineStart: { x: '45.0%', y: '18.0%' },
      lineEnd: { x: '52.0%', y: '31.2%' },
    },
  },
  {
    id: 'chefs-studio',
    title: "Chef's Studio",
    href: '/chefs-studio',
    desktop: {
      button: { x: '29.0%', y: '80.5%' },
      lineStart: { x: '40.5%', y: '80.5%' },
      lineEnd: { x: '36.5%', y: '73.0%' },
    },
    mobile: {
      button: { x: '28.0%', y: '82.5%' },
      lineStart: { x: '40.0%', y: '82.5%' },
      lineEnd: { x: '36.5%', y: '74.0%' },
    },
  },
  {
    id: 'studio',
    title: 'The Studio',
    href: '/studio',
    desktop: {
      button: { x: '76.0%', y: '75.0%' },
      lineStart: { x: '68.0%', y: '75.0%' },
      lineEnd: { x: '61.8%', y: '69.0%' },
    },
    mobile: {
      button: { x: '75.5%', y: '78.0%' },
      lineStart: { x: '67.5%', y: '78.0%' },
      lineEnd: { x: '61.8%', y: '70.0%' },
    },
  },
];

function percentToNumber(value: string): number {
  return parseFloat(value.replace('%', ''));
}

export default function TheSpacePage() {
  return (
    <>
      <Head>
        <title>Venue Map</title>
        <meta
          name="description"
          content="Interactive retro-futurist venue map."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="page">
        <div className="page-glow page-glow-a" />
        <div className="page-glow page-glow-b" />
        <div className="page-glow page-glow-c" />

        <section className="scene-shell" aria-label="Interactive venue map">
          <img
            src={ASSETS.bg}
            alt=""
            aria-hidden="true"
            className="layer bg-image"
            draggable={false}
          />

          <div className="layer ambient-light ambient-light-a" aria-hidden="true" />
          <div className="layer ambient-light ambient-light-b" aria-hidden="true" />

          <img
            src={ASSETS.venue}
            alt="Venue layout showing The Tent, Chef's Studio and The Studio"
            className="layer venue-image"
            draggable={false}
          />

          <img
            src={ASSETS.frame}
            alt=""
            aria-hidden="true"
            className="layer frame-image"
            draggable={false}
          />

          <div className="layer vignette" aria-hidden="true" />

          {AREAS.map((area) => (
            <div key={`${area.id}-desktop`} className="hotspot-group hotspot-desktop">
              <Hotspot area={area} layout={area.desktop} />
            </div>
          ))}

          {AREAS.map((area) => (
            <div key={`${area.id}-mobile`} className="hotspot-group hotspot-mobile">
              <Hotspot area={area} layout={area.mobile || area.desktop} />
            </div>
          ))}
        </section>

        <style jsx global>{`
          html,
          body,
          #__next {
            margin: 0;
            padding: 0;
            min-height: 100%;
            background: #04010a;
          }

          * {
            box-sizing: border-box;
          }
        `}</style>

        <style jsx>{`
          .page {
            position: relative;
            min-height: 100vh;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
            background:
              radial-gradient(circle at 50% 10%, rgba(162, 62, 255, 0.18), transparent 26%),
              radial-gradient(circle at 18% 28%, rgba(204, 61, 255, 0.10), transparent 18%),
              radial-gradient(circle at 80% 70%, rgba(135, 38, 222, 0.12), transparent 20%),
              linear-gradient(180deg, #070311 0%, #04010a 100%);
          }

          .page-glow {
            position: absolute;
            pointer-events: none;
            border-radius: 999px;
            filter: blur(90px);
            opacity: 0.6;
          }

          .page-glow-a {
            width: 380px;
            height: 380px;
            top: 2%;
            left: -5%;
            background: radial-gradient(circle, rgba(210, 88, 255, 0.28), transparent 70%);
            animation: driftA 10s ease-in-out infinite alternate;
          }

          .page-glow-b {
            width: 420px;
            height: 420px;
            top: -6%;
            right: 8%;
            background: radial-gradient(circle, rgba(120, 40, 220, 0.22), transparent 72%);
            animation: driftB 12s ease-in-out infinite alternate;
          }

          .page-glow-c {
            width: 460px;
            height: 460px;
            bottom: -10%;
            left: 50%;
            transform: translateX(-50%);
            background: radial-gradient(circle, rgba(110, 24, 180, 0.20), transparent 72%);
            animation: driftC 14s ease-in-out infinite alternate;
          }

          .scene-shell {
            position: relative;
            width: min(96vw, 1500px);
            aspect-ratio: 1500 / 1000;
            overflow: hidden;
            border-radius: 34px;
          }

          .layer {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            user-select: none;
          }

          .bg-image,
          .frame-image {
            object-fit: cover;
          }

          .bg-image {
            z-index: 1;
          }

          .ambient-light {
            z-index: 2;
            mix-blend-mode: screen;
            opacity: 0.5;
          }

          .ambient-light-a {
            background: radial-gradient(circle at 52% 55%, rgba(255, 0, 212, 0.14), transparent 20%);
            animation: pulseGlow 4.5s ease-in-out infinite;
          }

          .ambient-light-b {
            background: radial-gradient(circle at 55% 54%, rgba(255, 255, 255, 0.05), transparent 26%);
            animation: pulseGlow 6s ease-in-out infinite;
          }

          .venue-image {
            z-index: 3;
            inset: auto;
            top: 22.0%;
            left: 12.2%;
            width: 76%;
            height: auto;
            object-fit: contain;
            filter:
              drop-shadow(0 12px 30px rgba(255, 0, 212, 0.12))
              drop-shadow(0 24px 60px rgba(76, 0, 120, 0.18));
            animation: venueFloat 5.5s ease-in-out infinite;
          }

          .frame-image {
            z-index: 4;
          }

          .vignette {
            z-index: 5;
            box-shadow: inset 0 0 160px rgba(0, 0, 0, 0.18);
          }

          .hotspot-group {
            position: absolute;
            inset: 0;
            z-index: 10;
          }

          .hotspot-mobile {
            display: none;
          }

          @keyframes venueFloat {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-4px);
            }
          }

          @keyframes pulseGlow {
            0%,
            100% {
              opacity: 0.36;
            }
            50% {
              opacity: 0.62;
            }
          }

          @keyframes driftA {
            from {
              transform: translate3d(0, 0, 0);
            }
            to {
              transform: translate3d(24px, 8px, 0);
            }
          }

          @keyframes driftB {
            from {
              transform: translate3d(0, 0, 0);
            }
            to {
              transform: translate3d(-20px, 12px, 0);
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
              padding: 12px;
            }

            .scene-shell {
              width: min(100vw - 16px, 1500px);
              border-radius: 24px;
            }

            .venue-image {
              top: 22.6%;
              left: 6%;
              width: 88%;
            }

            .hotspot-desktop {
              display: none;
            }

            .hotspot-mobile {
              display: block;
            }
          }
        `}</style>
      </main>
    </>
  );
}

function Hotspot({
  area,
  layout,
}: {
  area: AreaConfig;
  layout: HotspotLayout;
}) {
  const x1 = percentToNumber(layout.lineStart.x);
  const y1 = percentToNumber(layout.lineStart.y);
  const x2 = percentToNumber(layout.lineEnd.x);
  const y2 = percentToNumber(layout.lineEnd.y);

  return (
    <div className="hotspot">
      <svg
        className="connector-svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          className={`connector-line connector-line-${area.id}`}
        />
      </svg>

      <span
        className={`hotspot-dot hotspot-dot-start hotspot-dot-${area.id}`}
        style={{ left: layout.lineStart.x, top: layout.lineStart.y }}
        aria-hidden="true"
      />
      <span
        className={`hotspot-dot hotspot-dot-end hotspot-dot-${area.id}`}
        style={{ left: layout.lineEnd.x, top: layout.lineEnd.y }}
        aria-hidden="true"
      />
      <span
        className="hotspot-pulse"
        style={{ left: layout.lineEnd.x, top: layout.lineEnd.y }}
        aria-hidden="true"
      />

      <Link href={area.href} passHref>
        <a
          className={`hotspot-button hotspot-button-${area.id}`}
          style={{ left: layout.button.x, top: layout.button.y }}
          aria-label={`Open ${area.title}`}
        >
          <span className="button-label">{area.title}</span>
        </a>
      </Link>

      <style jsx>{`
        .hotspot {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .connector-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
          pointer-events: none;
        }

        .connector-line {
          fill: none;
          stroke-width: 0.18;
          stroke-linecap: round;
          stroke: #ff18d9;
          filter: drop-shadow(0 0 6px rgba(255, 24, 217, 0.8));
          animation: connectorBlink 1.8s ease-in-out infinite;
        }

        .hotspot-button {
          position: absolute;
          transform: translate(-50%, -50%);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 180px;
          padding: 12px 22px;
          border-radius: 999px;
          border: 2px solid rgba(255, 42, 214, 0.88);
          background: linear-gradient(
            180deg,
            rgba(45, 8, 54, 0.72) 0%,
            rgba(24, 2, 28, 0.76) 100%
          );
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.03) inset,
            0 0 24px rgba(255, 0, 191, 0.14);
          color: #fff3ff;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          font-weight: 700;
          pointer-events: auto;
          backdrop-filter: blur(6px);
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            border-color 0.2s ease;
          touch-action: manipulation;
        }

        .hotspot-button::before {
          content: '';
          position: absolute;
          inset: 4px;
          border-radius: inherit;
          border: 1px solid rgba(255, 180, 245, 0.18);
          pointer-events: none;
        }

        .button-label {
          position: relative;
          z-index: 1;
          font-size: clamp(12px, 1.15vw, 20px);
          line-height: 1;
          white-space: nowrap;
        }

        .hotspot-button:hover,
        .hotspot-button:focus-visible {
          transform: translate(-50%, -50%) translateY(-2px);
          border-color: rgba(255, 146, 243, 0.96);
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.03) inset,
            0 0 32px rgba(255, 0, 204, 0.22);
          outline: none;
        }

        .hotspot-dot,
        .hotspot-pulse {
          position: absolute;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        .hotspot-dot {
          width: 14px;
          height: 14px;
          border-radius: 999px;
          background: #ff1fd8;
          box-shadow: 0 0 14px rgba(255, 31, 216, 0.9);
          animation: dotBlink 1.35s ease-in-out infinite;
        }

        .hotspot-dot-end {
          background: #ff1fd8;
          box-shadow:
            0 0 0 4px rgba(255, 31, 216, 0.12),
            0 0 18px rgba(255, 31, 216, 0.96);
          animation-delay: 0.25s;
        }

        .hotspot-pulse {
          width: 18px;
          height: 18px;
          border-radius: 999px;
          border: 2px solid rgba(255, 31, 216, 0.88);
          box-shadow: 0 0 18px rgba(255, 31, 216, 0.24);
          animation: pulseRing 1.8s ease-out infinite;
        }

        @keyframes connectorBlink {
          0%,
          100% {
            stroke-opacity: 0.52;
          }
          50% {
            stroke-opacity: 1;
          }
        }

        @keyframes dotBlink {
          0%,
          100% {
            opacity: 0.42;
            transform: translate(-50%, -50%) scale(0.92);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.12);
          }
        }

        @keyframes pulseRing {
          0% {
            opacity: 0.9;
            transform: translate(-50%, -50%) scale(0.5);
          }
          70% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.9);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.9);
          }
        }

        @media (max-width: 900px) {
          .hotspot-button {
            min-width: 132px;
            padding: 9px 14px;
            border-width: 1.5px;
          }

          .button-label {
            font-size: clamp(10px, 2.4vw, 14px);
            letter-spacing: 0.03em;
          }

          .hotspot-dot {
            width: 10px;
            height: 10px;
          }

          .hotspot-pulse {
            width: 14px;
            height: 14px;
          }

          .connector-line {
            stroke-width: 0.24;
          }
        }
      `}</style>
    </div>
  );
}

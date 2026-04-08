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

// Update these if your real routes are different.
const AREAS: AreaConfig[] = [
  {
    id: 'tent',
    title: 'THE TENT',
    href: '/tent',
    desktop: {
      button: { x: '37.8%', y: '18.2%' },
      lineStart: { x: '45.4%', y: '18.4%' },
      lineEnd: { x: '52.0%', y: '31.2%' },
    },
    mobile: {
      button: { x: '36.0%', y: '19.2%' },
      lineStart: { x: '44.2%', y: '19.4%' },
      lineEnd: { x: '51.6%', y: '32.0%' },
    },
  },
  {
    id: 'chefs-studio',
    title: "CHEF'S STUDIO",
    href: '/chefs-studio',
    desktop: {
      button: { x: '30.6%', y: '80.2%' },
      lineStart: { x: '39.4%', y: '80.0%' },
      lineEnd: { x: '35.6%', y: '72.8%' },
    },
    mobile: {
      button: { x: '29.8%', y: '82.6%' },
      lineStart: { x: '39.6%', y: '82.3%' },
      lineEnd: { x: '35.8%', y: '74.4%' },
    },
  },
  {
    id: 'studio',
    title: 'THE STUDIO',
    href: '/studio',
    desktop: {
      button: { x: '76.7%', y: '74.8%' },
      lineStart: { x: '67.8%', y: '74.5%' },
      lineEnd: { x: '61.4%', y: '68.5%' },
    },
    mobile: {
      button: { x: '75.8%', y: '78.0%' },
      lineStart: { x: '67.4%', y: '77.6%' },
      lineEnd: { x: '61.5%', y: '70.0%' },
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

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="page">
        <div className="page-bg" aria-hidden="true" />
        <div className="page-bg-overlay" aria-hidden="true" />
        <div className="page-glow page-glow-a" aria-hidden="true" />
        <div className="page-glow page-glow-b" aria-hidden="true" />
        <div className="page-glow page-glow-c" aria-hidden="true" />

        <section className="scene-shell" aria-label="Interactive venue map">
          <img
            src={ASSETS.frame}
            alt=""
            aria-hidden="true"
            className="layer frame-image"
            draggable={false}
          />

          <img
            src={ASSETS.venue}
            alt="Venue layout showing The Tent, Chef's Studio and The Studio"
            className="layer venue-image"
            draggable={false}
          />

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
            background: #000;
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
            padding: 20px;
            background: #000;
          }

          .page-bg,
          .page-bg-overlay,
          .page-glow {
            position: absolute;
            inset: 0;
            pointer-events: none;
          }

          .page-bg {
            background-image: url('${ASSETS.bg}');
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
            opacity: 0.35;
            transform: scale(1.03);
          }

          .page-bg-overlay {
            background:
              radial-gradient(circle at 50% 12%, rgba(181, 74, 255, 0.10), transparent 24%),
              radial-gradient(circle at 20% 24%, rgba(217, 58, 255, 0.08), transparent 18%),
              radial-gradient(circle at 80% 72%, rgba(140, 34, 232, 0.08), transparent 20%),
              linear-gradient(180deg, rgba(0, 0, 0, 0.42) 0%, rgba(0, 0, 0, 0.52) 100%);
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
            width: min(86vw, calc((100vh - 48px) * 1.5), 1240px);
            aspect-ratio: 1500 / 1000;
            overflow: visible;
          }

          .layer {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            user-select: none;
          }

          .frame-image {
            z-index: 3;
            object-fit: contain;
            pointer-events: none;
          }

          .venue-image {
            z-index: 2;
            inset: auto;
            top: 24.8%;
            left: 15.6%;
            width: 69.4%;
            height: auto;
            object-fit: contain;
            pointer-events: none;
            filter:
              drop-shadow(0 10px 24px rgba(255, 0, 212, 0.10))
              drop-shadow(0 28px 54px rgba(93, 0, 130, 0.16));
            animation: venueFloat 4.6s ease-in-out infinite;
          }

          .hotspot-group {
            position: absolute;
            inset: 0;
            z-index: 5;
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
              transform: translateY(-10px);
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
              padding: 10px;
            }

            .scene-shell {
              width: min(96vw, calc((100vh - 20px) * 1.5));
            }

            .venue-image {
              top: 25.6%;
              left: 10.8%;
              width: 78.8%;
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
          className="connector-line"
        />
      </svg>

      <span
        className="hotspot-dot hotspot-dot-start"
        style={{ left: layout.lineStart.x, top: layout.lineStart.y }}
        aria-hidden="true"
      />
      <span
        className="hotspot-dot hotspot-dot-end"
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
          className="hotspot-button"
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
          stroke: rgba(255, 35, 214, 0.98);
          filter: drop-shadow(0 0 7px rgba(255, 35, 214, 0.72));
          animation: connectorBlink 1.8s ease-in-out infinite;
        }

        .hotspot-button {
          position: absolute;
          transform: translate(-50%, -50%);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 178px;
          padding: 12px 20px;
          border-radius: 999px;
          border: 1.6px solid rgba(255, 30, 210, 0.96);
          background: rgba(8, 0, 16, 0.16);
          box-shadow:
            0 0 0 1px rgba(255, 116, 231, 0.16) inset,
            0 0 14px rgba(255, 0, 180, 0.16);
          backdrop-filter: blur(2px);
          color: #fff6ff;
          text-decoration: none;
          pointer-events: auto;
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            border-color 0.2s ease,
            background 0.2s ease;
          touch-action: manipulation;
        }

        .hotspot-button::before {
          content: '';
          position: absolute;
          inset: 4px;
          border-radius: inherit;
          border: 1px solid rgba(255, 180, 244, 0.22);
          pointer-events: none;
        }

        .button-label {
          position: relative;
          z-index: 1;
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(12px, 1vw, 18px);
          font-weight: 600;
          line-height: 1;
          letter-spacing: 0.08em;
          white-space: nowrap;
        }

        .hotspot-button:hover,
        .hotspot-button:focus-visible {
          transform: translate(-50%, -50%) translateY(-2px);
          border-color: rgba(255, 142, 243, 1);
          background: rgba(14, 0, 24, 0.22);
          box-shadow:
            0 0 0 1px rgba(255, 116, 231, 0.22) inset,
            0 0 22px rgba(255, 0, 180, 0.24);
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
          background: #ff28d6;
          box-shadow: 0 0 16px rgba(255, 40, 214, 0.9);
          animation: dotBlink 1.35s ease-in-out infinite;
        }

        .hotspot-dot-end {
          box-shadow:
            0 0 0 4px rgba(255, 40, 214, 0.12),
            0 0 18px rgba(255, 40, 214, 0.98);
          animation-delay: 0.25s;
        }

        .hotspot-pulse {
          width: 18px;
          height: 18px;
          border-radius: 999px;
          border: 2px solid rgba(255, 40, 214, 0.88);
          box-shadow: 0 0 18px rgba(255, 40, 214, 0.20);
          animation: pulseRing 1.8s ease-out infinite;
        }

        @keyframes connectorBlink {
          0%,
          100% {
            stroke-opacity: 0.55;
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
            min-width: 128px;
            padding: 8px 12px;
            border-width: 1.3px;
          }

          .button-label {
            font-size: clamp(10px, 2.2vw, 13px);
            letter-spacing: 0.07em;
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

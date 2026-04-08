import Head from 'next/head';
import Link from 'next/link';

const VENUE_IMAGE = '/images/venue-3d.png';

const AREAS = [
  {
    id: 'tent',
    title: 'The Tent',
    href: '/tent',
    desktop: {
      labelTop: '10%',
      labelLeft: '12%',
      pointTop: '23%',
      pointLeft: '42%',
      width: '28%',
    },
    mobile: {
      labelTop: '6%',
      labelLeft: '6%',
      pointTop: '24%',
      pointLeft: '49%',
      width: '40%',
    },
  },
  {
    id: 'chefs-studio',
    title: "The Chef's Studio",
    href: '/chefs-studio',
    desktop: {
      labelTop: '73%',
      labelLeft: '18%',
      pointTop: '78%',
      pointLeft: '41%',
      width: '22%',
    },
    mobile: {
      labelTop: '80%',
      labelLeft: '4%',
      pointTop: '73%',
      pointLeft: '42%',
      width: '34%',
    },
  },
  {
    id: 'studio',
    title: 'The Studio',
    href: '/studio',
    desktop: {
      labelTop: '69%',
      labelLeft: '72%',
      pointTop: '72%',
      pointLeft: '77%',
      width: '16%',
    },
    mobile: {
      labelTop: '82%',
      labelLeft: '63%',
      pointTop: '74%',
      pointLeft: '78%',
      width: '18%',
    },
  },
];

export default function TheSpacePage() {
  return (
    <>
      <Head>
        <title>Venue Portal</title>
        <meta
          name="description"
          content="Explore The Tent, The Chef's Studio, and The Studio from a retro-futurist venue screen."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="space-page">
        <div className="stars" />
        <div className="glow glow-a" />
        <div className="glow glow-b" />

        <div className="shell">
          <header className="hero">
            <div className="eyebrow">Venue navigation portal</div>
            <h1>Venue map</h1>
            <p>
              A clean retro-futurist screen for entering each part of the venue.
            </p>
          </header>

          <section className="screen">
            <div className="screen-topline" />
            <div className="screen-corner screen-corner-left" />
            <div className="screen-corner screen-corner-right" />

            <div className="screen-header">
              <span>Interactive venue display</span>
              <span>3 linked zones</span>
            </div>

            <div className="map-wrap">
              <div className="map-grid" />
              <img
                src={VENUE_IMAGE}
                alt="3D venue map with The Tent, The Chef's Studio and The Studio"
                className="venue-image"
              />

              {AREAS.map((area) => (
                <>
                  <div key={`${area.id}-desktop`} className="hotspot desktop-only">
                    <AreaLink area={area} position={area.desktop} />
                  </div>
                  <div key={`${area.id}-mobile`} className="hotspot mobile-only">
                    <AreaLink area={area} position={area.mobile} />
                  </div>
                </>
              ))}
            </div>
          </section>
        </div>

        <style jsx>{`
          .space-page {
            position: relative;
            min-height: 100vh;
            overflow: hidden;
            background:
              radial-gradient(circle at 50% 20%, rgba(205, 60, 255, 0.12), transparent 28%),
              radial-gradient(circle at 50% 54%, rgba(28, 235, 223, 0.12), transparent 20%),
              linear-gradient(180deg, #060611 0%, #04040c 100%);
            color: #f7e9ff;
            font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          }

          .stars,
          .glow {
            position: absolute;
            inset: 0;
            pointer-events: none;
          }

          .stars {
            opacity: 0.32;
            background-image: radial-gradient(rgba(255,255,255,0.9) 0.8px, transparent 0.8px);
            background-size: 36px 36px;
          }

          .glow-a {
            background: radial-gradient(circle at 22% 18%, rgba(210, 92, 255, 0.13), transparent 22%);
            filter: blur(60px);
          }

          .glow-b {
            background: radial-gradient(circle at 68% 56%, rgba(23, 236, 228, 0.12), transparent 18%);
            filter: blur(80px);
          }

          .shell {
            position: relative;
            z-index: 1;
            max-width: 1200px;
            margin: 0 auto;
            padding: 32px 20px 56px;
          }

          .hero {
            max-width: 700px;
            margin: 0 auto 22px;
            text-align: center;
          }

          .eyebrow {
            display: inline-block;
            padding: 8px 14px;
            border: 1px solid rgba(255, 168, 249, 0.35);
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.04);
            color: #ffc9fb;
            font-size: 11px;
            letter-spacing: 0.24em;
            text-transform: uppercase;
            box-shadow: 0 0 24px rgba(255, 112, 249, 0.12);
          }

          .hero h1 {
            margin: 18px 0 0;
            font-size: clamp(2.4rem, 6vw, 5.2rem);
            line-height: 0.95;
            letter-spacing: -0.05em;
            color: #fff3ff;
          }

          .hero p {
            margin: 16px auto 0;
            max-width: 520px;
            color: rgba(243, 222, 255, 0.72);
            font-size: 1rem;
            line-height: 1.7;
          }

          .screen {
            position: relative;
            max-width: 980px;
            margin: 0 auto;
            padding: 20px 20px 22px;
            border: 1px solid rgba(240, 154, 255, 0.2);
            border-radius: 30px;
            background: rgba(11, 10, 24, 0.76);
            backdrop-filter: blur(16px);
            box-shadow:
              0 0 0 1px rgba(255, 255, 255, 0.03) inset,
              0 0 60px rgba(152, 55, 199, 0.14),
              0 24px 120px rgba(0, 0, 0, 0.45);
          }

          .screen-topline {
            position: absolute;
            left: 34px;
            right: 34px;
            top: 12px;
            height: 2px;
            background: linear-gradient(90deg, transparent, rgba(255, 127, 244, 0.5), rgba(112, 249, 255, 0.5), transparent);
          }

          .screen-corner {
            position: absolute;
            top: 16px;
            width: 32px;
            height: 32px;
            border-top: 1px solid rgba(255, 150, 245, 0.34);
          }

          .screen-corner-left {
            left: 16px;
            border-left: 1px solid rgba(255, 150, 245, 0.34);
            border-top-left-radius: 12px;
          }

          .screen-corner-right {
            right: 16px;
            border-right: 1px solid rgba(255, 150, 245, 0.34);
            border-top-right-radius: 12px;
          }

          .screen-header {
            display: flex;
            justify-content: space-between;
            gap: 16px;
            padding: 6px 4px 18px;
            color: rgba(255, 208, 251, 0.74);
            font-size: 11px;
            letter-spacing: 0.22em;
            text-transform: uppercase;
          }

          .map-wrap {
            position: relative;
            overflow: hidden;
            min-height: 720px;
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 24px;
            background:
              radial-gradient(circle at 50% 50%, rgba(0, 255, 240, 0.12), transparent 18%),
              linear-gradient(180deg, rgba(17, 8, 28, 0.94) 0%, rgba(8, 8, 18, 0.96) 100%);
          }

          .map-grid {
            position: absolute;
            inset: 0;
            background-image:
              linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
            background-size: 52px 52px;
            opacity: 0.28;
          }

          .venue-image {
            position: relative;
            z-index: 1;
            display: block;
            width: 100%;
            max-width: 900px;
            margin: 60px auto 70px;
            height: auto;
            filter: drop-shadow(0 24px 70px rgba(20, 237, 227, 0.16));
          }

          .hotspot {
            position: absolute;
            inset: 0;
            z-index: 2;
          }

          .desktop-only {
            display: block;
          }

          .mobile-only {
            display: none;
          }

          @media (max-width: 860px) {
            .desktop-only {
              display: none;
            }

            .mobile-only {
              display: block;
            }
          }

          @media (max-width: 900px) {
            .shell {
              padding-left: 14px;
              padding-right: 14px;
            }

            .screen {
              padding: 16px 12px 14px;
              border-radius: 22px;
            }

            .screen-header {
              padding: 4px 4px 14px;
              font-size: 10px;
              letter-spacing: 0.14em;
            }

            .map-wrap {
              min-height: 500px;
              border-radius: 18px;
            }

            .venue-image {
              margin-top: 72px;
              margin-bottom: 90px;
            }
          }

          @media (max-width: 640px) {
            .hero {
              margin-bottom: 16px;
            }

            .hero p {
              font-size: 0.94rem;
            }

            .screen-header {
              flex-direction: column;
              align-items: flex-start;
            }

            .map-wrap {
              min-height: 420px;
            }

            .venue-image {
              margin-top: 78px;
              margin-bottom: 110px;
            }
          }
        `}</style>
      </main>
    </>
  );
}

function AreaLink({ area, position }: any) {
  return (
    <>
      <Link href={area.href} passHref>
        <a
          className={`area-link area-${area.id}`}
          style={{ top: position.labelTop, left: position.labelLeft, width: position.width }}
          aria-label={`Open ${area.title}`}
        >
          <span className="area-title">{area.title}</span>
          <span
            className="area-line"
            style={{ top: `calc(${position.pointTop} - ${position.labelTop})`, width: position.width }}
          />
          <span
            className="area-dot area-dot-start"
            style={{ top: `calc(${position.pointTop} - ${position.labelTop} - 5px)`, left: `calc(${position.width} - 6px)` }}
          />
          <span
            className="area-dot area-dot-end"
            style={{ top: `calc(${position.pointTop} - ${position.labelTop} - 5px)`, left: position.pointLeft }}
          />
          <span className="area-pulse" style={{ top: position.pointTop, left: position.pointLeft }} />
        </a>
      </Link>

      <style jsx>{`
        .area-link {
          position: absolute;
          display: block;
          color: #ffd8fd;
          text-decoration: none;
        }

        .area-title {
          display: inline-block;
          padding: 10px 14px;
          border: 1px solid rgba(255, 154, 245, 0.28);
          border-radius: 999px;
          background: rgba(28, 12, 40, 0.78);
          color: #ffeafd;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          box-shadow: 0 0 18px rgba(255, 111, 238, 0.08);
          transition: transform 0.24s ease, border-color 0.24s ease, box-shadow 0.24s ease;
          position: relative;
          z-index: 2;
        }

        .area-line {
          position: absolute;
          left: calc(100% - 6px);
          height: 1px;
          background: linear-gradient(90deg, rgba(255, 117, 241, 0.95), rgba(117, 244, 255, 0.95));
          box-shadow: 0 0 10px rgba(255, 117, 241, 0.24);
          transform-origin: left center;
          animation: scan 1.8s ease-in-out infinite;
        }

        .area-dot {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: #ff8af3;
          box-shadow: 0 0 14px rgba(255, 138, 243, 0.75);
          animation: blink 1.5s ease-in-out infinite;
        }

        .area-dot-end {
          background: #81f7ff;
          box-shadow: 0 0 14px rgba(129, 247, 255, 0.75);
          animation-delay: 0.3s;
        }

        .area-pulse {
          position: absolute;
          width: 20px;
          height: 20px;
          margin-left: -10px;
          margin-top: -10px;
          border-radius: 999px;
          border: 1px solid rgba(129, 247, 255, 0.8);
          box-shadow: 0 0 18px rgba(129, 247, 255, 0.32);
          animation: pulse 1.8s ease-out infinite;
        }

        .area-link:hover .area-title,
        .area-link:focus .area-title {
          transform: translateY(-2px);
          border-color: rgba(129, 247, 255, 0.4);
          box-shadow: 0 0 26px rgba(129, 247, 255, 0.16);
        }

        @keyframes blink {
          0%,
          100% { opacity: 0.35; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.1); }
        }

        @keyframes pulse {
          0% { opacity: 0.9; transform: scale(0.4); }
          70% { opacity: 0; transform: scale(1.65); }
          100% { opacity: 0; transform: scale(1.65); }
        }

        @keyframes scan {
          0%,
          100% { opacity: 0.55; transform: scaleX(0.94); }
          50% { opacity: 1; transform: scaleX(1); }
        }

        @media (max-width: 900px) {
          .area-title {
            padding: 8px 11px;
            font-size: 10px;
            letter-spacing: 0.12em;
          }

          .area-dot {
            width: 8px;
            height: 8px;
          }

          .area-pulse {
            width: 16px;
            height: 16px;
            margin-left: -8px;
            margin-top: -8px;
          }
        }
      `}</style>
    </>
  );
}

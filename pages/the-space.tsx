import Head from 'next/head';
import Link from 'next/link';
import { useMemo, useState } from 'react';

const VENUE_IMAGE = '/images/venue-3d.png';

const AREAS = [
  {
    id: 'tent',
    title: 'The Tent',
    href: '/tent',
    subtitle: 'Lounge energy under a luminous canopy.',
    theme: 'pink',
    desktop: { top: '15%', left: '21%' },
    mobile: { top: '7%', left: '50%' },
  },
  {
    id: 'chefs-studio',
    title: "The Chef's Studio",
    href: '/chefs-studio',
    subtitle: 'Interactive culinary moments in mission control.',
    theme: 'mint',
    desktop: { bottom: '14%', left: '40%' },
    mobile: { bottom: '19%', left: '18%' },
  },
  {
    id: 'studio',
    title: 'The Studio',
    href: '/studio',
    subtitle: 'Broadcast-grade atmosphere with cosmic drama.',
    theme: 'blue',
    desktop: { bottom: '12%', right: '8%' },
    mobile: { bottom: '8%', right: '7%' },
  },
];

export default function TheSpacePage() {
  const [activeArea, setActiveArea] = useState('tent');

  const active = useMemo(() => {
    return AREAS.find((area) => area.id === activeArea) || AREAS[0];
  }, [activeArea]);

  return (
    <>
      <Head>
        <title>Venue Portal</title>
        <meta
          name="description"
          content="Explore The Tent, The Chef's Studio, and The Studio."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="space-page">
        <div className="space-bg" />
        <div className="stars" />
        <div className="nebula nebula-a" />
        <div className="nebula nebula-b" />

        <div className="shell">
          <header className="hero">
            <div className="eyebrow">Venue Navigation Portal</div>
            <h1>Retro-futurist venue map</h1>
            <p>
              Drift through the venue and jump directly into each experience zone.
              Tap a signal beacon on the image or use the access cards below.
            </p>
          </header>

          <section className="layout">
            <div className="map-panel">
              <div className="map-frame">
                <img
                  src={VENUE_IMAGE}
                  alt="3D venue map showing The Tent, The Chef's Studio and The Studio"
                  className="venue-image"
                />

                {AREAS.map((area) => (
                  <AreaBeacon
                    key={area.id}
                    area={area}
                    active={area.id === active.id}
                    onActivate={() => setActiveArea(area.id)}
                  />
                ))}
              </div>

              <div className="cards-grid">
                {AREAS.map((area) => {
                  const isActive = area.id === active.id;
                  return (
                    <Link key={area.id} href={area.href} passHref>
                      <a
                        className={['area-card', isActive ? 'is-active' : '', `theme-${area.theme}`]
                          .filter(Boolean)
                          .join(' ')}
                        onMouseEnter={() => setActiveArea(area.id)}
                        onFocus={() => setActiveArea(area.id)}
                      >
                        <span className="card-line" />
                        <span className="card-kicker">Access node</span>
                        <span className="card-title">{area.title}</span>
                        <span className="card-text">{area.subtitle}</span>
                        <span className="card-link">Enter zone →</span>
                      </a>
                    </Link>
                  );
                })}
              </div>
            </div>

            <aside className="side-panel">
              <div className={`focus-card theme-${active.theme}`}>
                <div className="focus-kicker">Now selected</div>
                <h2>{active.title}</h2>
                <p>{active.subtitle}</p>

                <div className="focus-list">
                  {AREAS.map((area, index) => {
                    const isSelected = area.id === active.id;
                    return (
                      <div
                        key={area.id}
                        className={['focus-row', isSelected ? 'selected' : '']
                          .filter(Boolean)
                          .join(' ')}
                        onMouseEnter={() => setActiveArea(area.id)}
                      >
                        <button
                          type="button"
                          className="focus-row-main"
                          onClick={() => setActiveArea(area.id)}
                        >
                          <span className="focus-index">0{index + 1}</span>
                          <span className="focus-copy">
                            <strong>{area.title}</strong>
                            <small>Destination page</small>
                          </span>
                        </button>
                        <Link href={area.href} passHref>
                          <a className="focus-open">Open</a>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="stat-row">
                <div className="stat-box">
                  <span>Zones</span>
                  <strong>03</strong>
                </div>
                <div className="stat-box">
                  <span>Mode</span>
                  <strong>Live</strong>
                </div>
                <div className="stat-box">
                  <span>Theme</span>
                  <strong>Neo</strong>
                </div>
              </div>
            </aside>
          </section>
        </div>

        <style jsx>{`
          .space-page {
            position: relative;
            min-height: 100vh;
            overflow: hidden;
            background: #02050b;
            color: #ffffff;
            font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          }

          .space-bg,
          .stars,
          .nebula {
            position: absolute;
            inset: 0;
            pointer-events: none;
          }

          .space-bg {
            background:
              radial-gradient(circle at 50% 42%, rgba(0, 233, 200, 0.18), transparent 18%),
              radial-gradient(circle at 20% 15%, rgba(119, 72, 255, 0.12), transparent 22%),
              radial-gradient(circle at 80% 12%, rgba(0, 189, 255, 0.1), transparent 18%),
              linear-gradient(180deg, #02050b 0%, #010308 100%);
          }

          .stars {
            opacity: 0.28;
            background-image: radial-gradient(#ffffff 0.8px, transparent 0.8px);
            background-size: 30px 30px;
          }

          .nebula-a {
            background: radial-gradient(circle at 50% 30%, rgba(49, 220, 197, 0.14), transparent 25%);
            filter: blur(80px);
          }

          .nebula-b {
            background: radial-gradient(circle at 50% 75%, rgba(2, 167, 141, 0.14), transparent 22%);
            filter: blur(100px);
          }

          .shell {
            position: relative;
            z-index: 2;
            max-width: 1380px;
            margin: 0 auto;
            padding: 28px 20px 40px;
          }

          .hero {
            max-width: 760px;
            margin-bottom: 24px;
          }

          .eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 14px;
            border: 1px solid rgba(113, 235, 255, 0.25);
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(14px);
            color: #bdf6ff;
            font-size: 11px;
            letter-spacing: 0.24em;
            text-transform: uppercase;
            margin-bottom: 16px;
            box-shadow: 0 0 24px rgba(75, 217, 255, 0.12);
          }

          .hero h1 {
            margin: 0;
            font-size: clamp(2.4rem, 4.8vw, 5rem);
            line-height: 0.98;
            letter-spacing: -0.04em;
          }

          .hero p {
            margin: 16px 0 0;
            max-width: 640px;
            font-size: 1rem;
            line-height: 1.75;
            color: rgba(220, 233, 240, 0.82);
          }

          .layout {
            display: grid;
            grid-template-columns: minmax(0, 1.45fr) 360px;
            gap: 24px;
            align-items: start;
          }

          .map-panel,
          .focus-card,
          .stat-box {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(16px);
            box-shadow: 0 30px 120px rgba(0, 0, 0, 0.42);
          }

          .map-panel {
            border-radius: 32px;
            padding: 18px;
          }

          .map-frame {
            position: relative;
            border-radius: 26px;
            overflow: hidden;
            min-height: 700px;
            display: flex;
            align-items: center;
            justify-content: center;
            background:
              radial-gradient(circle at 50% 48%, rgba(15, 173, 154, 0.2), transparent 25%),
              radial-gradient(circle at 50% 50%, transparent 38%, rgba(0, 0, 0, 0.25) 70%, rgba(0, 0, 0, 0.72) 100%),
              linear-gradient(180deg, rgba(8, 18, 25, 0.96) 0%, rgba(2, 6, 11, 0.98) 100%);
          }

          .map-frame::before {
            content: '';
            position: absolute;
            inset: 0;
            background-image:
              linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
            background-size: 48px 48px;
            opacity: 0.5;
          }

          .venue-image {
            position: relative;
            z-index: 1;
            width: 100%;
            max-width: 1250px;
            height: auto;
            object-fit: contain;
            filter: drop-shadow(0 20px 70px rgba(0, 232, 197, 0.18));
          }

          .cards-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 14px;
            margin-top: 16px;
          }

          .area-card {
            position: relative;
            display: block;
            overflow: hidden;
            min-height: 180px;
            border-radius: 24px;
            padding: 18px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(255, 255, 255, 0.04);
            color: #fff;
            text-decoration: none;
            transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
          }

          .area-card:hover,
          .area-card:focus {
            transform: translateY(-3px);
            border-color: rgba(255, 255, 255, 0.2);
            background: rgba(255, 255, 255, 0.08);
          }

          .area-card.is-active {
            box-shadow: 0 0 0 1px rgba(145, 247, 255, 0.18), 0 0 32px rgba(58, 226, 255, 0.12);
          }

          .card-line {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            height: 4px;
          }

          .theme-pink .card-line,
          .theme-pink.beacon-pill,
          .theme-pink .focus-open,
          .theme-pink.focus-card {
            --theme-a: #ff58c7;
            --theme-b: #61e8ff;
          }

          .theme-mint .card-line,
          .theme-mint.beacon-pill,
          .theme-mint .focus-open,
          .theme-mint.focus-card {
            --theme-a: #53f4c6;
            --theme-b: #7ef5ff;
          }

          .theme-blue .card-line,
          .theme-blue.beacon-pill,
          .theme-blue .focus-open,
          .theme-blue.focus-card {
            --theme-a: #63b7ff;
            --theme-b: #a67cff;
          }

          .card-line,
          .beacon-pill::before,
          .focus-open::before {
            background: linear-gradient(90deg, var(--theme-a), var(--theme-b));
          }

          .card-kicker {
            display: block;
            font-size: 11px;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            color: #95a7b6;
            margin-top: 6px;
          }

          .card-title {
            display: block;
            margin-top: 14px;
            font-size: 1.45rem;
            font-weight: 600;
          }

          .card-text {
            display: block;
            margin-top: 10px;
            color: rgba(220, 233, 240, 0.82);
            line-height: 1.65;
          }

          .card-link {
            display: inline-block;
            margin-top: 16px;
            color: #bff6ff;
            font-weight: 500;
          }

          .side-panel {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }

          .focus-card {
            border-radius: 32px;
            padding: 20px;
          }

          .focus-kicker {
            color: #bdf6ff;
            font-size: 11px;
            letter-spacing: 0.22em;
            text-transform: uppercase;
          }

          .focus-card h2 {
            margin: 14px 0 0;
            font-size: 2rem;
            line-height: 1.05;
          }

          .focus-card p {
            margin: 12px 0 0;
            color: rgba(220, 233, 240, 0.82);
            line-height: 1.7;
          }

          .focus-list {
            margin-top: 20px;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .focus-row {
            display: flex;
            align-items: center;
            gap: 10px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 18px;
            background: rgba(255, 255, 255, 0.03);
            padding: 10px;
          }

          .focus-row.selected {
            border-color: rgba(145, 247, 255, 0.18);
            background: rgba(145, 247, 255, 0.08);
          }

          .focus-row-main {
            flex: 1;
            display: flex;
            align-items: center;
            gap: 12px;
            border: 0;
            background: transparent;
            color: #fff;
            text-align: left;
            cursor: pointer;
            padding: 0;
          }

          .focus-index {
            width: 42px;
            height: 42px;
            border-radius: 999px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(255, 255, 255, 0.05);
            font-size: 12px;
          }

          .focus-copy {
            display: flex;
            flex-direction: column;
          }

          .focus-copy strong {
            font-size: 0.98rem;
            font-weight: 600;
          }

          .focus-copy small {
            margin-top: 3px;
            color: #95a7b6;
            font-size: 12px;
          }

          .focus-open {
            position: relative;
            overflow: hidden;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 70px;
            border-radius: 999px;
            border: 1px solid rgba(255, 255, 255, 0.12);
            padding: 10px 14px;
            color: #fff;
            text-decoration: none;
            font-size: 12px;
          }

          .focus-open::before {
            content: '';
            position: absolute;
            inset: 0;
            opacity: 0.14;
          }

          .focus-open span,
          .focus-open {
            position: relative;
            z-index: 1;
          }

          .stat-row {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 12px;
          }

          .stat-box {
            border-radius: 24px;
            padding: 16px 12px;
            text-align: center;
          }

          .stat-box span {
            display: block;
            color: #95a7b6;
            font-size: 11px;
            letter-spacing: 0.18em;
            text-transform: uppercase;
          }

          .stat-box strong {
            display: block;
            margin-top: 8px;
            font-size: 1.25rem;
          }

          .beacon {
            position: absolute;
            z-index: 3;
          }

          .beacon-inner {
            position: relative;
            transform: translateX(-50%);
          }

          .beacon-line {
            position: absolute;
            left: 50%;
            top: 100%;
            width: 1px;
            height: 46px;
            transform: translateX(-50%);
            background: linear-gradient(180deg, rgba(122, 241, 255, 0.85), transparent);
          }

          .beacon-dot {
            position: absolute;
            left: 50%;
            top: calc(100% + 38px);
            width: 12px;
            height: 12px;
            border-radius: 999px;
            transform: translateX(-50%);
            background: #88f5ff;
            box-shadow: 0 0 18px rgba(136, 245, 255, 0.9);
          }

          .beacon-pill {
            position: relative;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 12px 16px;
            border-radius: 999px;
            border: 1px solid rgba(255, 255, 255, 0.15);
            background: rgba(4, 12, 19, 0.72);
            color: #ffffff;
            text-decoration: none;
            backdrop-filter: blur(12px);
            transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;
          }

          .beacon-pill::before {
            content: '';
            position: absolute;
            inset: 0;
            opacity: 0.14;
            border-radius: inherit;
          }

          .beacon-pill:hover,
          .beacon-pill:focus,
          .beacon-pill.active {
            transform: translateY(-2px);
            border-color: rgba(255, 255, 255, 0.24);
            background: rgba(255, 255, 255, 0.09);
            box-shadow: 0 0 28px rgba(114, 240, 255, 0.14);
          }

          .beacon-signal {
            position: relative;
            z-index: 1;
            width: 10px;
            height: 10px;
            border-radius: 999px;
            background: linear-gradient(90deg, var(--theme-a), var(--theme-b));
            box-shadow: 0 0 18px rgba(114, 240, 255, 0.55);
          }

          .beacon-label {
            position: relative;
            z-index: 1;
            white-space: nowrap;
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.18em;
            text-transform: uppercase;
          }

          @media (max-width: 1180px) {
            .layout {
              grid-template-columns: 1fr;
            }

            .side-panel {
              order: -1;
            }
          }

          @media (max-width: 900px) {
            .shell {
              padding-left: 14px;
              padding-right: 14px;
            }

            .map-panel,
            .focus-card {
              border-radius: 24px;
            }

            .map-frame {
              min-height: 460px;
              padding: 12px;
            }

            .cards-grid {
              grid-template-columns: 1fr;
            }

            .stat-row {
              grid-template-columns: repeat(3, 1fr);
            }
          }

          @media (max-width: 640px) {
            .hero {
              margin-bottom: 18px;
            }

            .hero p {
              font-size: 0.95rem;
              line-height: 1.65;
            }

            .map-panel {
              padding: 12px;
            }

            .map-frame {
              min-height: 360px;
              border-radius: 20px;
            }

            .beacon-pill {
              padding: 10px 12px;
            }

            .beacon-label {
              font-size: 10px;
              letter-spacing: 0.12em;
            }

            .focus-card h2 {
              font-size: 1.6rem;
            }

            .focus-row {
              align-items: stretch;
            }

            .focus-open {
              min-width: 62px;
              padding-left: 10px;
              padding-right: 10px;
            }
          }
        `}</style>
      </main>
    </>
  );
}

function AreaBeacon({ area, active, onActivate }: any) {
  return (
    <>
      <div className={`beacon desktop-only`} style={area.desktop}>
        <BeaconLink area={area} active={active} onActivate={onActivate} />
      </div>
      <div className={`beacon mobile-only`} style={area.mobile}>
        <BeaconLink area={area} active={active} onActivate={onActivate} />
      </div>

      <style jsx>{`
        .desktop-only {
          display: block;
        }

        .mobile-only {
          display: none;
        }

        @media (max-width: 900px) {
          .desktop-only {
            display: none;
          }

          .mobile-only {
            display: block;
          }
        }
      `}</style>
    </>
  );
}

function BeaconLink({ area, active, onActivate }: any) {
  return (
    <div className="beacon-inner">
      <Link href={area.href} passHref>
        <a
          className={`beacon-pill theme-${area.theme} ${active ? 'active' : ''}`}
          onMouseEnter={onActivate}
          onFocus={onActivate}
          aria-label={`Open ${area.title}`}
        >
          <span className="beacon-signal" />
          <span className="beacon-label">{area.title}</span>
        </a>
      </Link>
      <span className="beacon-line" />
      <span className="beacon-dot" />
    </div>
  );
}

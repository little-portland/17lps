import Head from 'next/head';
import Link from 'next/link';

const VENUE_IMAGE = '/images/venue-3d.png';

const AREAS = [
  {
    id: 'tent',
    title: 'The Tent',
    href: '/tent',
    desktop: {
      labelTop: '9%',
      labelLeft: '10%',
      pointTop: '23%',
      pointLeft: '40%',
      width: '28%',
    },
    mobile: {
      labelTop: '7%',
      labelLeft: '6%',
      pointTop: '24%',
      pointLeft: '48%',
      width: '38%',
    },
  },
  {
    id: 'chefs-studio',
    title: "The Chef's Studio",
    href: '/chefs-studio',
    desktop: {
      labelTop: '73%',
      labelLeft: '16%',
      pointTop: '76%',
      pointLeft: '40%',
      width: '26%',
    },
    mobile: {
      labelTop: '82%',
      labelLeft: '4%',
      pointTop: '74%',
      pointLeft: '42%',
      width: '38%',
    },
  },
  {
    id: 'studio',
    title: 'The Studio',
    href: '/studio',
    desktop: {
      labelTop: '67%',
      labelLeft: '71%',
      pointTop: '72%',
      pointLeft: '78%',
      width: '18%',
    },
    mobile: {
      labelTop: '83%',
      labelLeft: '66%',
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
        <title>Venue Map</title>
        <meta
          name="description"
          content="Retro-futurist venue map with links to The Tent, The Chef's Studio and The Studio."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="space-page">
        <div className="starfield starfield-a" />
        <div className="starfield starfield-b" />
        <div className="purple-glow glow-left" />
        <div className="purple-glow glow-top" />
        <div className="purple-glow glow-bottom" />

        <div className="hud hud-left-scale" />
        <div className="hud hud-right-scale" />
        <div className="hud hud-hexes">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="hud hud-target">
          <span className="ring ring-a" />
          <span className="ring ring-b" />
          <span className="ring ring-c" />
          <span className="cross cross-h" />
          <span className="cross cross-v" />
        </div>
        <div className="hud hud-bars">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="hud hud-circuit hud-circuit-left" />
        <div className="hud hud-circuit hud-circuit-right" />
        <div className="hud hud-waveform" />

        <div className="shell">
          <section className="screen">
            <div className="screen-frame frame-top-left" />
            <div className="screen-frame frame-top-right" />
            <div className="screen-frame frame-bottom-left" />
            <div className="screen-frame frame-bottom-right" />
            <div className="screen-topline" />
            <div className="screen-scanlines" />
            <div className="screen-rings screen-rings-left" />
            <div className="screen-rings screen-rings-right" />
            <div className="screen-corners corner-top-left" />
            <div className="screen-corners corner-top-right" />
            <div className="screen-corners corner-bottom-left" />
            <div className="screen-corners corner-bottom-right" />

            <div className="map-wrap">
              <div className="map-inner-glow" />
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
              radial-gradient(circle at 50% 8%, rgba(181, 74, 255, 0.16), transparent 24%),
              radial-gradient(circle at 50% 58%, rgba(121, 28, 195, 0.12), transparent 22%),
              linear-gradient(180deg, #070311 0%, #05020b 45%, #04010a 100%);
            color: #ffe7ff;
            font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          }

          .shell {
            position: relative;
            z-index: 2;
            max-width: 1160px;
            margin: 0 auto;
            padding: 34px 20px 54px;
          }

          .starfield,
          .purple-glow,
          .hud {
            position: absolute;
            pointer-events: none;
          }

          .starfield {
            inset: 0;
            background-repeat: repeat;
            opacity: 0.9;
          }

          .starfield-a {
            background-image:
              radial-gradient(circle at 14% 18%, rgba(255,255,255,0.9) 0 1px, transparent 1.6px),
              radial-gradient(circle at 39% 72%, rgba(255,255,255,0.8) 0 1px, transparent 1.5px),
              radial-gradient(circle at 72% 26%, rgba(255,255,255,0.7) 0 1px, transparent 1.7px),
              radial-gradient(circle at 88% 62%, rgba(255,255,255,0.92) 0 1.1px, transparent 1.8px),
              radial-gradient(circle at 23% 48%, rgba(255,255,255,0.7) 0 0.8px, transparent 1.4px),
              radial-gradient(circle at 58% 12%, rgba(255,255,255,0.78) 0 0.9px, transparent 1.6px),
              radial-gradient(circle at 8% 84%, rgba(255,255,255,0.76) 0 0.9px, transparent 1.5px),
              radial-gradient(circle at 95% 14%, rgba(255,255,255,0.86) 0 1px, transparent 1.7px);
            background-size: 260px 260px, 320px 320px, 290px 290px, 340px 340px, 230px 230px, 310px 310px, 360px 360px, 300px 300px;
            animation: drift 22s linear infinite;
          }

          .starfield-b {
            inset: -10%;
            opacity: 0.38;
            background-image:
              radial-gradient(circle at 18% 22%, rgba(245,181,255,0.9) 0 0.9px, transparent 1.5px),
              radial-gradient(circle at 67% 38%, rgba(187,255,255,0.72) 0 0.9px, transparent 1.5px),
              radial-gradient(circle at 43% 87%, rgba(255,255,255,0.84) 0 0.9px, transparent 1.5px),
              radial-gradient(circle at 81% 79%, rgba(255,195,252,0.74) 0 0.8px, transparent 1.5px);
            background-size: 420px 420px, 470px 470px, 390px 390px, 510px 510px;
            animation: driftReverse 30s linear infinite;
          }

          .purple-glow {
            filter: blur(90px);
            opacity: 0.7;
          }

          .glow-left {
            left: -12%;
            top: 14%;
            width: 460px;
            height: 460px;
            background: radial-gradient(circle, rgba(198, 73, 255, 0.24), transparent 66%);
          }

          .glow-top {
            left: 50%;
            top: -8%;
            width: 560px;
            height: 260px;
            transform: translateX(-50%);
            background: radial-gradient(circle, rgba(171, 69, 255, 0.2), transparent 68%);
          }

          .glow-bottom {
            right: -6%;
            bottom: 8%;
            width: 420px;
            height: 420px;
            background: radial-gradient(circle, rgba(117, 24, 191, 0.2), transparent 68%);
          }

          .screen {
            position: relative;
            max-width: 1020px;
            margin: 0 auto;
            padding: 28px;
            border: 1px solid rgba(239, 125, 255, 0.22);
            border-radius: 34px;
            background: linear-gradient(180deg, rgba(23, 7, 39, 0.74) 0%, rgba(10, 5, 18, 0.82) 100%);
            backdrop-filter: blur(18px);
            box-shadow:
              0 0 0 1px rgba(255,255,255,0.03) inset,
              0 0 68px rgba(196, 75, 255, 0.18),
              0 24px 100px rgba(0, 0, 0, 0.46);
          }

          .screen-topline {
            position: absolute;
            left: 40px;
            right: 40px;
            top: 18px;
            height: 2px;
            background: linear-gradient(90deg, rgba(255,130,244,0.1), rgba(255,130,244,0.85), rgba(124,244,255,0.8), rgba(255,130,244,0.1));
            opacity: 0.8;
          }

          .screen-frame,
          .screen-corners {
            position: absolute;
            width: 42px;
            height: 42px;
            opacity: 0.7;
          }

          .frame-top-left {
            left: 16px;
            top: 16px;
            border-left: 1px solid rgba(255,145,246,0.34);
            border-top: 1px solid rgba(255,145,246,0.34);
            border-top-left-radius: 16px;
          }

          .frame-top-right {
            right: 16px;
            top: 16px;
            border-right: 1px solid rgba(255,145,246,0.34);
            border-top: 1px solid rgba(255,145,246,0.34);
            border-top-right-radius: 16px;
          }

          .frame-bottom-left {
            left: 16px;
            bottom: 16px;
            border-left: 1px solid rgba(255,145,246,0.24);
            border-bottom: 1px solid rgba(255,145,246,0.24);
            border-bottom-left-radius: 16px;
          }

          .frame-bottom-right {
            right: 16px;
            bottom: 16px;
            border-right: 1px solid rgba(255,145,246,0.24);
            border-bottom: 1px solid rgba(255,145,246,0.24);
            border-bottom-right-radius: 16px;
          }

          .screen-corners {
            border-color: rgba(137, 244, 255, 0.2);
          }

          .corner-top-left {
            left: 26px;
            top: 26px;
            border-left: 1px solid rgba(137,244,255,0.18);
            border-top: 1px solid rgba(137,244,255,0.18);
          }

          .corner-top-right {
            right: 26px;
            top: 26px;
            border-right: 1px solid rgba(137,244,255,0.18);
            border-top: 1px solid rgba(137,244,255,0.18);
          }

          .corner-bottom-left {
            left: 26px;
            bottom: 26px;
            border-left: 1px solid rgba(137,244,255,0.14);
            border-bottom: 1px solid rgba(137,244,255,0.14);
          }

          .corner-bottom-right {
            right: 26px;
            bottom: 26px;
            border-right: 1px solid rgba(137,244,255,0.14);
            border-bottom: 1px solid rgba(137,244,255,0.14);
          }

          .screen-rings {
            position: absolute;
            top: 22px;
            width: 120px;
            height: 120px;
            border-radius: 999px;
            opacity: 0.14;
            border: 1px solid rgba(255,132,244,0.5);
          }

          .screen-rings::before,
          .screen-rings::after {
            content: '';
            position: absolute;
            inset: 12px;
            border-radius: inherit;
            border: 1px solid rgba(255,132,244,0.35);
          }

          .screen-rings::after {
            inset: 26px;
            border-color: rgba(137,244,255,0.28);
          }

          .screen-rings-left {
            left: -40px;
          }

          .screen-rings-right {
            right: -38px;
          }

          .screen-scanlines {
            position: absolute;
            inset: 0;
            border-radius: 34px;
            background: linear-gradient(180deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0) 18%, rgba(255,255,255,0.02) 36%, rgba(255,255,255,0) 52%, rgba(255,255,255,0.02) 72%, rgba(255,255,255,0) 100%);
            opacity: 0.24;
          }

          .map-wrap {
            position: relative;
            overflow: hidden;
            min-height: 770px;
            border-radius: 26px;
            border: 1px solid rgba(255,255,255,0.07);
            background:
              radial-gradient(circle at 50% 50%, rgba(140, 40, 214, 0.14), transparent 26%),
              radial-gradient(circle at 50% 58%, rgba(23, 236, 228, 0.08), transparent 16%),
              linear-gradient(180deg, rgba(16, 8, 28, 0.92) 0%, rgba(7, 3, 12, 0.96) 100%);
          }

          .map-inner-glow {
            position: absolute;
            inset: 0;
            background:
              radial-gradient(circle at 50% 16%, rgba(255, 136, 246, 0.08), transparent 24%),
              radial-gradient(circle at 50% 84%, rgba(121, 241, 255, 0.08), transparent 20%);
          }

          .venue-image {
            position: relative;
            z-index: 1;
            display: block;
            width: 100%;
            max-width: 900px;
            margin: 76px auto 98px;
            height: auto;
            filter: drop-shadow(0 26px 75px rgba(22, 225, 220, 0.12));
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

          .hud-left-scale,
          .hud-right-scale {
            top: 110px;
            bottom: 110px;
            width: 34px;
            opacity: 0.34;
            background-image: repeating-linear-gradient(
              to bottom,
              rgba(255, 161, 246, 0.85) 0 2px,
              transparent 2px 12px,
              rgba(255, 161, 246, 0.42) 12px 13px,
              transparent 13px 20px
            );
          }

          .hud-left-scale {
            left: 30px;
          }

          .hud-right-scale {
            right: 30px;
          }

          .hud-hexes {
            top: 72px;
            left: 94px;
            width: 132px;
            display: grid;
            grid-template-columns: repeat(3, 34px);
            gap: 8px;
            opacity: 0.42;
          }

          .hud-hexes span {
            width: 34px;
            height: 38px;
            background: rgba(246, 152, 255, 0.75);
            clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
            box-shadow: 0 0 18px rgba(255, 126, 240, 0.16);
          }

          .hud-target {
            top: 72px;
            right: 86px;
            width: 160px;
            height: 160px;
            opacity: 0.34;
          }

          .hud-target .ring,
          .hud-target .cross {
            position: absolute;
          }

          .ring-a {
            inset: 0;
            border-radius: 999px;
            border: 2px solid rgba(252, 157, 255, 0.9);
            box-shadow: 0 0 18px rgba(255, 132, 245, 0.24);
          }

          .ring-b {
            inset: 16px;
            border-radius: 999px;
            border: 1px solid rgba(252, 157, 255, 0.72);
          }

          .ring-c {
            inset: 36px;
            border-radius: 999px;
            border: 1px solid rgba(137, 244, 255, 0.6);
          }

          .cross-h {
            left: 18px;
            right: 18px;
            top: 50%;
            height: 1px;
            background: rgba(252, 157, 255, 0.75);
          }

          .cross-v {
            top: 18px;
            bottom: 18px;
            left: 50%;
            width: 1px;
            background: rgba(252, 157, 255, 0.75);
          }

          .hud-bars {
            top: 258px;
            right: 106px;
            width: 134px;
            display: grid;
            gap: 10px;
            opacity: 0.42;
          }

          .hud-bars span {
            display: block;
            height: 10px;
            background: linear-gradient(90deg, rgba(255, 86, 239, 0.95) 0 70%, rgba(255, 188, 250, 0.48) 70% 100%);
            box-shadow: 0 0 12px rgba(255, 86, 239, 0.12);
          }

          .hud-circuit {
            width: 160px;
            height: 130px;
            opacity: 0.34;
            border-left: 2px solid rgba(255, 144, 247, 0.55);
            border-bottom: 2px solid rgba(255, 144, 247, 0.55);
          }

          .hud-circuit::before,
          .hud-circuit::after {
            content: '';
            position: absolute;
            width: 84px;
            height: 2px;
            background: rgba(255, 144, 247, 0.55);
          }

          .hud-circuit::before {
            left: 0;
            top: 42px;
          }

          .hud-circuit::after {
            left: 0;
            top: 88px;
          }

          .hud-circuit-left {
            left: 54px;
            top: 240px;
          }

          .hud-circuit-right {
            right: 54px;
            bottom: 186px;
            transform: scaleX(-1);
          }

          .hud-waveform {
            left: 120px;
            right: 120px;
            bottom: 42px;
            height: 78px;
            opacity: 0.34;
            background:
              linear-gradient(180deg, transparent 0 34px, rgba(255, 160, 247, 0.36) 34px 35px, transparent 35px 100%),
              linear-gradient(90deg,
                transparent 0%,
                rgba(255, 160, 247, 0.6) 4%,
                transparent 8%,
                rgba(255, 160, 247, 0.6) 12%,
                transparent 16%,
                rgba(255, 160, 247, 0.5) 21%,
                transparent 24%,
                rgba(255, 160, 247, 0.6) 29%,
                transparent 33%,
                rgba(255, 160, 247, 0.6) 37%,
                transparent 41%,
                rgba(255, 160, 247, 0.55) 45%,
                transparent 49%,
                rgba(255, 160, 247, 0.65) 54%,
                transparent 58%,
                rgba(255, 160, 247, 0.6) 63%,
                transparent 67%,
                rgba(255, 160, 247, 0.6) 71%,
                transparent 75%,
                rgba(255, 160, 247, 0.5) 79%,
                transparent 83%,
                rgba(255, 160, 247, 0.6) 88%,
                transparent 92%,
                rgba(255, 160, 247, 0.5) 96%,
                transparent 100%);
            clip-path: polygon(0 64%, 3% 58%, 6% 72%, 9% 38%, 12% 60%, 15% 48%, 18% 69%, 21% 40%, 24% 58%, 27% 36%, 30% 63%, 33% 44%, 36% 70%, 39% 34%, 42% 52%, 45% 61%, 48% 28%, 51% 67%, 54% 42%, 57% 72%, 60% 36%, 63% 58%, 66% 31%, 69% 63%, 72% 46%, 75% 70%, 78% 37%, 81% 55%, 84% 41%, 87% 69%, 90% 35%, 93% 60%, 96% 47%, 100% 58%, 100% 100%, 0 100%);
          }

          @keyframes drift {
            from { transform: translate3d(0, 0, 0); }
            to { transform: translate3d(-32px, 18px, 0); }
          }

          @keyframes driftReverse {
            from { transform: translate3d(0, 0, 0); }
            to { transform: translate3d(22px, -18px, 0); }
          }

          @media (max-width: 1180px) {
            .hud-left-scale,
            .hud-right-scale,
            .hud-hexes,
            .hud-target,
            .hud-bars,
            .hud-circuit,
            .hud-waveform {
              opacity: 0.24;
            }
          }

          @media (max-width: 980px) {
            .desktop-only {
              display: none;
            }

            .mobile-only {
              display: block;
            }

            .shell {
              padding-left: 14px;
              padding-right: 14px;
            }

            .screen {
              padding: 16px;
              border-radius: 24px;
            }

            .screen-topline {
              left: 28px;
              right: 28px;
            }

            .map-wrap {
              min-height: 520px;
              border-radius: 18px;
            }

            .venue-image {
              max-width: 760px;
              margin-top: 76px;
              margin-bottom: 118px;
            }

            .screen-rings-left,
            .screen-rings-right,
            .hud-hexes,
            .hud-bars,
            .hud-circuit-right {
              display: none;
            }

            .hud-left-scale,
            .hud-right-scale {
              width: 20px;
              left: 8px;
              right: auto;
            }

            .hud-right-scale {
              left: auto;
              right: 8px;
            }

            .hud-target {
              top: 44px;
              right: 16px;
              width: 100px;
              height: 100px;
            }

            .hud-circuit-left {
              left: 14px;
              top: 170px;
              transform: scale(0.72);
              transform-origin: top left;
            }

            .hud-waveform {
              left: 44px;
              right: 44px;
              bottom: 18px;
            }
          }

          @media (max-width: 640px) {
            .screen {
              padding: 12px;
            }

            .map-wrap {
              min-height: 420px;
            }

            .venue-image {
              margin-top: 84px;
              margin-bottom: 126px;
            }

            .hud-left-scale,
            .hud-right-scale,
            .hud-target,
            .hud-circuit-left,
            .hud-waveform {
              display: none;
            }
          }
        `}</style>
      </main>
    </>
  );
}

function AreaLink({ area, position }: any) {
  const lineTop = `calc(${position.pointTop} - ${position.labelTop})`;

  return (
    <>
      <Link href={area.href} passHref>
        <a
          className={`area-link area-${area.id}`}
          style={{ top: position.labelTop, left: position.labelLeft, width: position.width }}
          aria-label={`Open ${area.title}`}
        >
          <span className="area-title">{area.title}</span>
          <span className="area-line" style={{ top: lineTop }} />
          <span className="area-dot area-dot-start" style={{ top: `calc(${lineTop} - 5px)` }} />
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
          color: #ffd7fb;
          text-decoration: none;
        }

        .area-title {
          position: relative;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          padding: 10px 15px;
          border: 1px solid rgba(255, 148, 245, 0.28);
          border-radius: 999px;
          background: linear-gradient(180deg, rgba(43, 16, 58, 0.88) 0%, rgba(21, 7, 30, 0.92) 100%);
          color: #ffeaff;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.02) inset,
            0 0 18px rgba(255, 110, 238, 0.12);
          transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
        }

        .area-title::after {
          content: '';
          position: absolute;
          inset: 3px;
          border-radius: inherit;
          border: 1px solid rgba(137, 244, 255, 0.08);
          pointer-events: none;
        }

        .area-line {
          position: absolute;
          left: calc(100% - 4px);
          width: 56%;
          height: 1px;
          background: linear-gradient(90deg, rgba(255, 96, 236, 0.98), rgba(137, 244, 255, 0.98));
          box-shadow: 0 0 14px rgba(255, 96, 236, 0.24);
          transform-origin: left center;
          animation: lineGlow 1.8s ease-in-out infinite;
        }

        .area-dot {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: #ff8ef2;
          box-shadow: 0 0 16px rgba(255, 142, 242, 0.82);
          animation: dotBlink 1.4s ease-in-out infinite;
        }

        .area-dot-start {
          left: calc(100% + 31% - 5px);
        }

        .area-dot-end {
          background: #8ef7ff;
          box-shadow: 0 0 16px rgba(142, 247, 255, 0.82);
          animation-delay: 0.35s;
        }

        .area-pulse {
          position: absolute;
          width: 18px;
          height: 18px;
          margin-left: -9px;
          margin-top: -9px;
          border-radius: 999px;
          border: 1px solid rgba(142, 247, 255, 0.82);
          box-shadow: 0 0 18px rgba(142, 247, 255, 0.28);
          animation: pulse 1.85s ease-out infinite;
        }

        .area-link:hover .area-title,
        .area-link:focus .area-title {
          transform: translateY(-2px);
          border-color: rgba(142, 247, 255, 0.4);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.02) inset,
            0 0 26px rgba(142, 247, 255, 0.18);
        }

        @keyframes dotBlink {
          0%, 100% { opacity: 0.38; transform: scale(0.86); }
          50% { opacity: 1; transform: scale(1.08); }
        }

        @keyframes pulse {
          0% { opacity: 0.9; transform: scale(0.45); }
          70% { opacity: 0; transform: scale(1.7); }
          100% { opacity: 0; transform: scale(1.7); }
        }

        @keyframes lineGlow {
          0%, 100% { opacity: 0.55; transform: scaleX(0.93); }
          50% { opacity: 1; transform: scaleX(1); }
        }

        @media (max-width: 980px) {
          .area-title {
            padding: 8px 12px;
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

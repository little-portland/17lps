// concept.tsx — PART 1: imports, constants, helper components
'use client';
import { useState, useEffect } from 'react';
import Head from 'next/head';

// ── Palette & typography ──────────────────────────────────────────────
const C = {
  cream: '#E8E2D4',
  ink:   '#1C1C1A',
  pink:  '#D4507A',
  muted: '#7A7870',
} as const;
const MONO = '"Space Mono", "Courier New", monospace';
const SANS = '"Space Grotesk", "Helvetica Neue", Arial, sans-serif';

// ── Data ──────────────────────────────────────────────────────────────
const SPACE_BTNS  = ['The Venue', 'Capacity', 'Technical Spec'];
const EXPERIENCE_BTNS = [
  { label: 'After Dark', dark: true  },
  { label: 'Dining',     dark: false },
];

// Ring definitions: [yFrac, rxFrac, ryFrac] — hyperboloid funnel shape
const W_RINGS: [number, number, number][] = [
  [0.06, 0.90, 0.19],
  [0.17, 0.72, 0.15],
  [0.32, 0.44, 0.09],
  [0.44, 0.22, 0.05],
  [0.50, 0.11, 0.025],
  [0.58, 0.23, 0.055],
  [0.73, 0.60, 0.13],
  [0.93, 0.90, 0.20],
];

// ── Wireframe Wormhole ────────────────────────────────────────────────
function Wormhole({ size = 170, style }: { size?: number; style?: React.CSSProperties }) {
  const cx = size / 2, h = size * 1.05, N = 14;
  const rings = W_RINGS.map(([yf, rxf, ryf]) => ({
    y: h * yf, rx: (size * rxf) / 2, ry: h * ryf,
  }));
  const pts = (i: number) => {
    const a = (i / N) * Math.PI * 2;
    return rings
      .map(r => `${(cx + r.rx * Math.cos(a)).toFixed(1)},${(r.y + r.ry * Math.sin(a)).toFixed(1)}`)
      .join(' ');
  };
  return (
    <svg viewBox={`0 0 ${size} ${h.toFixed(0)}`} style={{ overflow: 'visible', ...style }}>
      {rings.map((r, i) => (
        <ellipse key={i} cx={cx} cy={r.y} rx={r.rx} ry={r.ry}
          fill="none" stroke={C.pink} strokeWidth="0.85" opacity="0.92" />
      ))}
      {Array.from({ length: N }, (_, i) => (
        <polyline key={i} points={pts(i)}
          fill="none" stroke={C.pink} strokeWidth="0.85" opacity="0.92" />
      ))}
    </svg>
  );
}

// ── Floor Wormhole (flattened, lying in perspective) ──────────────────
function WormholeFloor({ style }: { style?: React.CSSProperties }) {
  const W = 240, H = 68, cx = W / 2, N = 14;
  // same proportional ring positions, vertically squashed for floor perspective
  const rings = W_RINGS.map(([yf, rxf, ryf]) => ({
    y: H * yf, rx: (W * rxf) / 2, ry: H * ryf * 0.55,
  }));
  const pts = (i: number) => {
    const a = (i / N) * Math.PI * 2;
    return rings
      .map(r => `${(cx + r.rx * Math.cos(a)).toFixed(1)},${(r.y + r.ry * Math.sin(a)).toFixed(1)}`)
      .join(' ');
  };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ overflow: 'visible', ...style }}>
      {rings.map((r, i) => (
        <ellipse key={i} cx={cx} cy={r.y} rx={r.rx} ry={r.ry}
          fill="none" stroke={C.pink} strokeWidth="0.85" opacity="0.92" />
      ))}
      {Array.from({ length: N }, (_, i) => (
        <polyline key={i} points={pts(i)}
          fill="none" stroke={C.pink} strokeWidth="0.85" opacity="0.92" />
      ))}
    </svg>
  );
}

// ── Obelisk ───────────────────────────────────────────────────────────
function Obelisk({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={{ position: 'relative', width: 68, height: 270, ...style }}>
      {/* front face */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(165deg, #3C3C3A 0%, #1C1C1A 55%, #0E0E0C 100%)',
      }} />
      {/* right side face — skewed sliver */}
      <div style={{
        position: 'absolute', top: 0, left: '100%',
        width: 22, height: '100%',
        background: 'linear-gradient(to right, #252520, #080806)',
        transformOrigin: 'left center',
        transform: 'skewY(-1deg)',
        clipPath: 'polygon(0 0, 100% 3%, 100% 97%, 0 100%)',
      }} />
      {/* top cap */}
      <div style={{
        position: 'absolute', top: -6, left: 0, right: 0, height: 10,
        background: '#4A4A48',
        clipPath: 'polygon(0 100%, 100% 100%, 85% 0%, 15% 0%)',
      }} />
    </div>
  );
}

// ── Thin axis / perspective line ──────────────────────────────────────
function AxisLine({ style }: { style?: React.CSSProperties }) {
  return <div style={{ width: 1, background: C.ink, opacity: 0.35, ...style }} />;
}

// ── Film-grain overlay ────────────────────────────────────────────────
function Grain() {
  return (
    <svg aria-hidden style={{
      position: 'fixed', inset: 0, width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: 60, opacity: 0.26,
    }}>
      <filter id="gn" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.70" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#gn)" />
    </svg>
  );
}

// ── Reusable button ───────────────────────────────────────────────────
function Btn({
  label, dark = false, onClick,
}: { label: string; dark?: boolean; onClick?: () => void }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: '10px 30px',
        border: `1px solid ${dark ? 'transparent' : C.ink}`,
        background: dark
          ? hover ? '#333' : C.ink
          : hover ? 'rgba(28,28,26,0.06)' : 'transparent',
        color: dark ? C.cream : C.ink,
        fontFamily: MONO,
        fontSize: '10px',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        transition: 'background 0.18s',
      }}
    >
      {label}
    </button>
  );
}

// PART 2 — main page component (append after PART 1)

export default function ConceptPage() {
  return (
    <>
      <Head>
        <title>Concept — 17 Little Portland Street</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono&family=Space+Grotesk:wght@700;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Grain />

      <main className="pg">

        {/* ─── HERO ──────────────────────────────────────────────── */}
        <section className="s-hero">
          <div className="axis-v hero-axis" />

          <div className="wh-hero float-a">
            <Wormhole size={200} />
          </div>

          <div className="wrap">
            <p className="eyebrow">LPX // Underground</p>
            <h1 className="mega">
              Concept<span className="pink-dot">.</span>
            </h1>
            <hr className="rule" />
            <p className="addr">17 Little Portland Street, London</p>
          </div>
        </section>

        {/* ─── THE SPACE ─────────────────────────────────────────── */}
        <section className="s-space">
          <div className="wh-space float-b">
            <Wormhole size={118} />
          </div>

          <div className="wrap">
            <h2 className="sec-head">The Space</h2>

            {/* Tent placeholder — swap for real component later */}
            <div className="tent-ph">
              <div className="tent-inner">
                <span className="ph-label">[ The Tent — Placeholder ]</span>
              </div>
            </div>

            <div className="btn-row">
              {SPACE_BTNS.map(b => <Btn key={b} label={b} />)}
            </div>
          </div>
        </section>

        {/* ─── THE EXPERIENCE ────────────────────────────────────── */}
        <section className="s-exp">

          {/* Ground plane */}
          <div className="ground" />

          {/* Vertical axis line */}
          <div className="axis-v exp-axis" />

          {/* Floor wormhole — lower left */}
          <div className="wh-floor">
            <WormholeFloor />
          </div>

          {/* Obelisk — lower right */}
          <div className="obelisk-wrap">
            <Obelisk />
          </div>

          {/* Small floating wormhole — upper right */}
          <div className="wh-exp-float float-a">
            <Wormhole size={90} />
          </div>

          <div className="wrap exp-content">
            <h2 className="sec-head">The Experience</h2>

            <div className="btn-row exp-btns">
              {EXPERIENCE_BTNS.map(b => (
                <Btn key={b.label} label={b.label} dark={b.dark} />
              ))}
            </div>
          </div>
        </section>

        {/* ─── FOOTER ────────────────────────────────────────────── */}
        <footer className="foot">
          <span>17 Little Portland Street</span>
          <span>LPX // Underground</span>
        </footer>

      </main>
    </>
  );
}

// PART 3 — paste this inside ConceptPage's return, after </main> and before closing </>

      <style jsx global>{`

        /* ── Reset ───────────────────────────────────────────────── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html { scroll-behavior: smooth; }

        body {
          background: #E8E2D4;
          color: #1C1C1A;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }

        /* ── Page root ───────────────────────────────────────────── */
        .pg {
          background: #E8E2D4;
          min-height: 100vh;
          position: relative;
        }

        /* ── Content wrapper ─────────────────────────────────────── */
        .wrap {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 52px;
          position: relative;
          z-index: 2;
        }

        /* ── Axis lines ──────────────────────────────────────────── */
        .axis-v {
          position: absolute;
          width: 1px;
          background: #1C1C1A;
          opacity: 0.28;
          z-index: 1;
          pointer-events: none;
        }

        .hero-axis {
          left: 29%;
          top: 80px;
          height: 78%;
        }

        .exp-axis {
          left: 37%;
          top: 0;
          height: 62%;
        }

        /* ── Float animations ────────────────────────────────────── */
        @keyframes floatA {
          0%, 100% { transform: translateY(0px);   }
          50%       { transform: translateY(-16px); }
        }
        @keyframes floatB {
          0%, 100% { transform: translateY(-6px); }
          50%       { transform: translateY(10px); }
        }

        .float-a { animation: floatA 6s ease-in-out infinite; }
        .float-b { animation: floatB 8s ease-in-out infinite; }

        /* ── HERO ────────────────────────────────────────────────── */
        .s-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding: 100px 0 80px;
        }

        .wh-hero {
          position: absolute;
          top: 7%;
          right: 7%;
          width: 200px;
          z-index: 1;
        }

        .eyebrow {
          font-family: "Space Mono", "Courier New", monospace;
          font-size: 10px;
          letter-spacing: 0.30em;
          text-transform: uppercase;
          color: #7A7870;
          display: block;
          margin-bottom: 28px;
        }

        .mega {
          font-family: "Space Grotesk", "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(76px, 13.5vw, 196px);
          font-weight: 900;
          line-height: 0.88;
          letter-spacing: -0.025em;
          text-transform: uppercase;
          color: #1C1C1A;
        }

        .pink-dot { color: #D4507A; }

        .rule {
          border: none;
          border-top: 1px solid rgba(28,28,26,0.18);
          margin: 38px 0;
          width: 100%;
        }

        .addr {
          font-family: "Space Mono", "Courier New", monospace;
          font-size: 11px;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: #1C1C1A;
          opacity: 0.6;
        }

        /* ── THE SPACE ───────────────────────────────────────────── */
        .s-space {
          position: relative;
          padding: 130px 0 150px;
          overflow: hidden;
        }

        .wh-space {
          position: absolute;
          top: 6%;
          right: -1%;
          width: 118px;
          opacity: 0.52;
          z-index: 1;
        }

        .sec-head {
          font-family: "Space Grotesk", "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(42px, 7vw, 100px);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          color: #1C1C1A;
          margin-bottom: 56px;
        }

        .tent-ph {
          width: 100%;
          aspect-ratio: 16 / 7;
          border: 1px dashed rgba(28,28,26,0.20);
          background: rgba(28,28,26,0.03);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 44px;
        }

        .tent-inner {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ph-label {
          font-family: "Space Mono", "Courier New", monospace;
          font-size: 10px;
          letter-spacing: 0.24em;
          color: #7A7870;
          text-transform: uppercase;
        }

        .btn-row {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          align-items: center;
        }

        /* ── THE EXPERIENCE ──────────────────────────────────────── */
        .s-exp {
          position: relative;
          min-height: 92vh;
          padding: 130px 0 220px;
          overflow: hidden;
        }

        .ground {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 44%;
          background: linear-gradient(to bottom,
            transparent 0%,
            rgba(162,157,144,0.28) 100%);
          pointer-events: none;
          z-index: 0;
        }

        .wh-floor {
          position: absolute;
          bottom: 20%;
          left: 5%;
          width: 240px;
          z-index: 1;
        }

        .obelisk-wrap {
          position: absolute;
          bottom: 58px;
          right: 18%;
          z-index: 2;
        }

        .wh-exp-float {
          position: absolute;
          top: 7%;
          right: 7%;
          width: 90px;
          opacity: 0.60;
          z-index: 1;
        }

        .exp-content {
          position: relative;
          z-index: 3;
        }

        .exp-btns { margin-top: 56px; }

        /* ── FOOTER ──────────────────────────────────────────────── */
        .foot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 22px 52px;
          border-top: 1px solid rgba(28,28,26,0.14);
          font-family: "Space Mono", "Courier New", monospace;
          font-size: 9px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #7A7870;
          position: relative;
          z-index: 10;
        }

        /* ── Responsive ──────────────────────────────────────────── */
        @media (max-width: 768px) {
          .wrap        { padding: 0 24px; }
          .wh-hero     { width: 130px; right: 2%; top: 5%; }
          .wh-space    { display: none; }
          .hero-axis   { display: none; }
          .wh-floor    { width: 160px; left: 2%; }
          .obelisk-wrap { right: 6%; }
          .exp-axis    { display: none; }
          .foot        { padding: 20px 24px; flex-direction: column; gap: 10px; text-align: center; }
        }

      `}</style>

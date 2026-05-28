import React, { useEffect, useMemo, useState } from "react";
import Head from "next/head";

const SPACE_LINKS = [
  { label: "The Tent", href: "/thetent" },
  { label: "Chef’s Studio", href: "/chefstudio" },
  { label: "The Studio", href: "/studio" },
];

const EXPERIENCE_LINKS = [
  { label: "After Dark", href: "/after-dark" },
  { label: "Dining", href: "/dining" },
];

function Wormhole({ className = "" }: { className?: string }) {
  const verticals = useMemo(() => Array.from({ length: 17 }), []);
  const rings = useMemo(() => Array.from({ length: 14 }), []);

  return (
    <div className={`wormhole ${className}`} aria-hidden="true">
      <svg viewBox="0 0 420 300" role="img">
        <defs>
          <linearGradient id="wormLine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f2469a" />
            <stop offset="1" stopColor="#e94f93" />
          </linearGradient>
        </defs>

        {rings.map((_, i) => {
          const t = i / (rings.length - 1);
          const cx = 210;
          const cy = 242 - t * 196;
          const rx = 172 - t * 108;
          const ry = 34 - t * 18;
          return (
            <ellipse
              key={`ring-${i}`}
              cx={cx}
              cy={cy}
              rx={rx}
              ry={ry}
              fill="none"
              stroke="url(#wormLine)"
              strokeWidth="2.2"
              opacity={0.72 - t * 0.1}
            />
          );
        })}

        {verticals.map((_, i) => {
          const t = i / (verticals.length - 1);
          const xTop = 154 + t * 112;
          const xBottom = 38 + t * 344;
          return (
            <path
              key={`strand-${i}`}
              d={`M ${xTop} 50 C ${xTop + (t - 0.5) * 78} 116, ${xBottom + (0.5 - t) * 34} 188, ${xBottom} 242`}
              fill="none"
              stroke="url(#wormLine)"
              strokeWidth="2.2"
              opacity="0.74"
            />
          );
        })}
      </svg>
    </div>
  );
}

function Obelisk() {
  return (
    <div className="obelisk" aria-hidden="true">
      <span className="obeliskFace obeliskFaceA" />
      <span className="obeliskFace obeliskFaceB" />
      <span className="obeliskFace obeliskFaceC" />
    </div>
  );
}

function Axis() {
  return (
    <div className="axis" aria-hidden="true">
      <span className="axisVertical" />
      <span className="axisFloor" />
      <span className="axisFloor axisFloorB" />
    </div>
  );
}

export default function RhadooConceptPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const previousBg = document.body.style.background;
    const previousColor = document.body.style.color;

    document.body.style.background = "#e5e1d6";
    document.body.style.color = "#35363d";
    setLoaded(true);

    return () => {
      document.body.style.background = previousBg;
      document.body.style.color = previousColor;
    };
  }, []);

  return (
    <>
      <Head>
        <title>Concept — Little Portland</title>
        <meta
          name="description"
          content="Concept, space and experience at 17 Little Portland Street, London."
        />
      </Head>

      <main className={`posterPage ${loaded ? "isLoaded" : ""}`}>
        <div className="paperTexture" aria-hidden="true" />
        <div className="posterGrain" aria-hidden="true" />
        <Axis />
        <Wormhole className="wormholeTop" />
        <Wormhole className="wormholeFloor" />
        <Obelisk />

        <section className="heroBlock" aria-labelledby="concept-title">
          <p className="microLabel">LPX//UNDERGROUND ISSUE 51</p>

          <div className="conceptIntro revealBlock">
            <h1 id="concept-title">Concept</h1>
            <p>17 Little Portland Street, London</p>
          </div>

          <div className="spaceBlock revealBlock revealDelayA" aria-labelledby="space-title">
            <h2 id="space-title">The Space</h2>

            <div className="spaceScene">
              <div className="floatingTentWrap" aria-hidden="true">
                <img
                  className="floatingTent"
                  src="/images/the-space/the-space-page-venue.png"
                  alt=""
                />
              </div>

              <nav className="spaceNav" aria-label="Explore the space">
                {SPACE_LINKS.map((item) => (
                  <a key={item.href} href={item.href}>
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          <div className="experienceBlock revealBlock revealDelayB" aria-labelledby="experience-title">
            <h2 id="experience-title">The Experience</h2>

            <nav className="experienceNav" aria-label="Explore the experience">
              {EXPERIENCE_LINKS.map((item) => (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </section>
      </main>

      <style jsx>{`
        @font-face {
          font-family: "RhadooMono";
          src: local("Courier New");
          font-weight: 700;
          font-style: normal;
          font-display: swap;
        }

        :global(html),
        :global(body) {
          margin: 0;
          min-height: 100%;
          background: #e5e1d6;
        }

        :global(*) {
          box-sizing: border-box;
        }

        .posterPage {
          --paper: #e5e1d6;
          --paperWarm: #d8d2c4;
          --ink: #34353d;
          --inkSoft: rgba(52, 53, 61, 0.72);
          --pink: #ee4f98;
          --line: rgba(52, 53, 61, 0.32);
          position: relative;
          min-height: 100svh;
          overflow: hidden;
          isolation: isolate;
          color: var(--ink);
          background:
            radial-gradient(circle at 72% 38%, rgba(238, 79, 152, 0.07), transparent 28rem),
            linear-gradient(180deg, rgba(255, 252, 238, 0.42), rgba(196, 204, 195, 0.28) 82%, rgba(229, 225, 214, 0.95)),
            var(--paper);
          font-family: "RhadooMono", "Courier New", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          letter-spacing: -0.045em;
        }

        .paperTexture {
          position: absolute;
          inset: 0;
          z-index: -5;
          background:
            radial-gradient(circle at 12% 16%, rgba(76, 113, 125, 0.08) 0 1px, transparent 1px 7px),
            radial-gradient(circle at 74% 64%, rgba(238, 79, 152, 0.08) 0 1px, transparent 1px 8px),
            radial-gradient(circle at 35% 74%, rgba(43, 45, 55, 0.08) 0 1px, transparent 1px 6px),
            repeating-linear-gradient(98deg, rgba(60, 72, 74, 0.035) 0 1px, transparent 1px 4px);
          opacity: 0.88;
          mix-blend-mode: multiply;
        }

        .posterGrain {
          position: absolute;
          inset: -50%;
          z-index: 20;
          pointer-events: none;
          opacity: 0.21;
          mix-blend-mode: multiply;
          background-image:
            radial-gradient(circle at 18% 22%, rgba(0, 0, 0, 0.44) 0 0.55px, transparent 0.75px),
            radial-gradient(circle at 82% 72%, rgba(238, 79, 152, 0.34) 0 0.55px, transparent 0.75px),
            radial-gradient(circle at 45% 58%, rgba(38, 105, 110, 0.28) 0 0.55px, transparent 0.75px);
          background-size: 3px 3px, 4px 4px, 5px 5px;
          animation: grainDrift 9s steps(8) infinite;
        }

        .heroBlock {
          position: relative;
          z-index: 5;
          width: min(100%, 1120px);
          min-height: 100svh;
          margin: 0 auto;
          padding: clamp(34px, 6vw, 78px) clamp(20px, 5vw, 74px) clamp(44px, 7vw, 86px);
          display: grid;
          grid-template-rows: auto 1fr auto;
          gap: clamp(44px, 7vw, 90px);
        }

        .microLabel {
          position: absolute;
          right: clamp(20px, 4.5vw, 64px);
          bottom: clamp(16px, 3vw, 34px);
          margin: 0;
          max-width: 20rem;
          color: rgba(38, 39, 46, 0.78);
          font-size: clamp(11px, 1.2vw, 16px);
          line-height: 0.98;
          text-align: right;
          text-transform: uppercase;
          letter-spacing: -0.08em;
        }

        .conceptIntro {
          align-self: start;
          max-width: 760px;
          padding-top: clamp(12px, 4vw, 26px);
        }

        h1,
        h2,
        p {
          margin: 0;
        }

        h1,
        h2 {
          color: var(--ink);
          text-transform: uppercase;
          font-weight: 900;
          line-height: 0.82;
          letter-spacing: -0.095em;
          text-wrap: balance;
        }

        h1 {
          font-size: clamp(58px, 12vw, 152px);
        }

        h2 {
          font-size: clamp(42px, 8vw, 102px);
        }

        .conceptIntro p {
          margin-top: clamp(10px, 1.8vw, 18px);
          color: rgba(38, 39, 46, 0.83);
          font-size: clamp(15px, 1.8vw, 24px);
          line-height: 0.95;
          text-transform: uppercase;
          letter-spacing: -0.075em;
        }

        .spaceBlock {
          align-self: center;
          display: grid;
          gap: clamp(24px, 4vw, 46px);
        }

        .spaceScene {
          position: relative;
          min-height: clamp(330px, 48vw, 520px);
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(220px, 360px);
          align-items: end;
          gap: clamp(26px, 5vw, 72px);
        }

        .floatingTentWrap {
          position: relative;
          min-height: clamp(260px, 37vw, 440px);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .floatingTentWrap::before {
          content: "";
          position: absolute;
          width: 72%;
          height: 18%;
          left: 14%;
          bottom: 7%;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(52, 53, 61, 0.19), transparent 70%);
          filter: blur(8px);
          transform: rotate(-5deg);
          opacity: 0.46;
        }

        .floatingTent {
          position: relative;
          display: block;
          width: min(100%, 600px);
          max-height: 440px;
          object-fit: contain;
          filter: contrast(1.05) saturate(0.78) drop-shadow(16px 26px 28px rgba(47, 47, 54, 0.22));
          animation: floatTent 6.5s ease-in-out infinite;
        }

        .spaceNav,
        .experienceNav {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          align-items: center;
        }

        .spaceNav {
          align-self: center;
          justify-content: flex-end;
          flex-direction: column;
        }

        .spaceNav a,
        .experienceNav a {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 44px;
          padding: 12px 18px 10px;
          color: var(--ink);
          text-decoration: none;
          text-transform: uppercase;
          font-size: clamp(13px, 1.22vw, 17px);
          line-height: 1;
          letter-spacing: -0.07em;
          background: rgba(229, 225, 214, 0.56);
          border: 1px solid rgba(52, 53, 61, 0.5);
          box-shadow: 4px 4px 0 rgba(52, 53, 61, 0.13);
          backdrop-filter: blur(5px);
          transition: transform 220ms ease, border-color 220ms ease, background 220ms ease, color 220ms ease,
            box-shadow 220ms ease;
        }

        .spaceNav a::after,
        .experienceNav a::after {
          content: "";
          position: absolute;
          left: 12px;
          right: 12px;
          bottom: 7px;
          height: 1px;
          background: var(--pink);
          opacity: 0;
          transform: scaleX(0.3);
          transform-origin: left center;
          transition: opacity 220ms ease, transform 220ms ease;
        }

        .spaceNav a:hover,
        .experienceNav a:hover,
        .spaceNav a:focus-visible,
        .experienceNav a:focus-visible {
          color: #17181d;
          background: rgba(238, 79, 152, 0.12);
          border-color: rgba(238, 79, 152, 0.76);
          box-shadow: 7px 7px 0 rgba(238, 79, 152, 0.16);
          transform: translate(-2px, -2px);
          outline: none;
        }

        .spaceNav a:hover::after,
        .experienceNav a:hover::after,
        .spaceNav a:focus-visible::after,
        .experienceNav a:focus-visible::after {
          opacity: 1;
          transform: scaleX(1);
        }

        .experienceBlock {
          align-self: end;
          display: grid;
          gap: clamp(20px, 3vw, 34px);
          padding-bottom: clamp(32px, 4vw, 54px);
        }

        .experienceNav {
          justify-content: flex-start;
        }

        .experienceNav a {
          min-width: clamp(142px, 17vw, 210px);
        }

        .axis {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          opacity: 0.72;
        }

        .axisVertical {
          position: absolute;
          left: 39%;
          top: 8.6%;
          width: 2px;
          height: 68%;
          background: linear-gradient(180deg, rgba(45, 48, 56, 0.72), rgba(45, 48, 56, 0.3), transparent);
          transform-origin: top center;
        }

        .axisFloor,
        .axisFloorB {
          position: absolute;
          left: 39%;
          top: 76%;
          width: 34%;
          height: 2px;
          background: linear-gradient(90deg, rgba(45, 48, 56, 0.42), transparent);
          transform-origin: left center;
          transform: rotate(0deg);
        }

        .axisFloorB {
          width: 30%;
          transform: rotate(-20deg);
          opacity: 0.52;
        }

        .wormhole {
          position: absolute;
          z-index: 1;
          pointer-events: none;
          filter: saturate(0.95) contrast(0.92);
          mix-blend-mode: multiply;
        }

        .wormhole svg {
          display: block;
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .wormholeTop {
          top: 9%;
          right: 9%;
          width: clamp(160px, 23vw, 316px);
          height: clamp(120px, 18vw, 226px);
          opacity: 0.74;
          transform: rotate(0deg);
          animation: driftTop 9s ease-in-out infinite;
        }

        .wormholeFloor {
          left: 18%;
          bottom: 17%;
          width: clamp(190px, 35vw, 444px);
          height: clamp(126px, 22vw, 280px);
          opacity: 0.48;
          transform: rotate(-7deg) scaleY(0.72);
          animation: driftFloor 10.5s ease-in-out infinite;
        }

        .obelisk {
          position: absolute;
          right: clamp(74px, 14vw, 190px);
          top: 41%;
          z-index: 2;
          width: clamp(58px, 7vw, 96px);
          height: clamp(238px, 26vw, 360px);
          transform: perspective(720px) rotateY(-17deg) rotateX(1deg);
          filter: drop-shadow(32px 30px 30px rgba(47, 48, 55, 0.24));
          opacity: 0.9;
          animation: obeliskBreathe 7.5s ease-in-out infinite;
        }

        .obeliskFace {
          position: absolute;
          inset: 0;
          display: block;
        }

        .obeliskFaceA {
          clip-path: polygon(26% 9%, 100% 0, 100% 100%, 26% 92%);
          background: linear-gradient(90deg, #2a2b30, #3c3e42);
        }

        .obeliskFaceB {
          clip-path: polygon(0 22%, 26% 9%, 26% 92%, 0 82%);
          background: linear-gradient(180deg, #44474a, #16171b);
        }

        .obeliskFaceC {
          clip-path: polygon(26% 9%, 100% 0, 74% 10%, 0 22%);
          background: #53575a;
          opacity: 0.42;
        }

        .revealBlock {
          opacity: 0;
          transform: translateY(18px);
        }

        .isLoaded .revealBlock {
          animation: reveal 850ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        .isLoaded .revealDelayA {
          animation-delay: 130ms;
        }

        .isLoaded .revealDelayB {
          animation-delay: 260ms;
        }

        @keyframes reveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes floatTent {
          0%,
          100% {
            transform: translate3d(0, 0, 0) rotate(-0.5deg);
          }
          50% {
            transform: translate3d(0, -14px, 0) rotate(0.8deg);
          }
        }

        @keyframes driftTop {
          0%,
          100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          50% {
            transform: translate3d(-9px, 10px, 0) rotate(1.8deg);
          }
        }

        @keyframes driftFloor {
          0%,
          100% {
            transform: translate3d(0, 0, 0) rotate(-7deg) scaleY(0.72);
          }
          50% {
            transform: translate3d(12px, -8px, 0) rotate(-4.5deg) scaleY(0.72);
          }
        }

        @keyframes obeliskBreathe {
          0%,
          100% {
            transform: perspective(720px) rotateY(-17deg) rotateX(1deg) translateY(0);
          }
          50% {
            transform: perspective(720px) rotateY(-14deg) rotateX(1deg) translateY(-8px);
          }
        }

        @keyframes grainDrift {
          0%,
          100% {
            transform: translate(0, 0);
          }
          10% {
            transform: translate(-1%, -1%);
          }
          20% {
            transform: translate(-2%, 1%);
          }
          30% {
            transform: translate(1%, -2%);
          }
          40% {
            transform: translate(-1%, 2%);
          }
          50% {
            transform: translate(2%, 1%);
          }
          60% {
            transform: translate(1%, 2%);
          }
          70% {
            transform: translate(-2%, -1%);
          }
          80% {
            transform: translate(2%, -2%);
          }
          90% {
            transform: translate(1%, -1%);
          }
        }

        @media (max-width: 900px) {
          .heroBlock {
            gap: 58px;
            padding-inline: 22px;
            grid-template-rows: auto auto auto;
          }

          .conceptIntro {
            padding-top: 22px;
          }

          .spaceScene {
            min-height: auto;
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .floatingTentWrap {
            min-height: clamp(250px, 68vw, 440px);
          }

          .floatingTent {
            width: min(100%, 520px);
          }

          .spaceNav {
            width: 100%;
            justify-content: center;
            flex-direction: row;
          }

          .spaceNav a {
            flex: 1 1 160px;
          }

          .experienceBlock {
            padding-bottom: 80px;
          }

          .experienceNav a {
            flex: 1 1 150px;
          }

          .microLabel {
            left: 22px;
            right: 22px;
            text-align: left;
          }

          .axisVertical {
            left: 50%;
            top: 20%;
            height: 54%;
            opacity: 0.42;
          }

          .axisFloor,
          .axisFloorB {
            left: 50%;
            top: 74%;
            width: 42%;
          }

          .wormholeTop {
            top: 14%;
            right: -6%;
            opacity: 0.42;
          }

          .wormholeFloor {
            left: -8%;
            bottom: 30%;
            opacity: 0.3;
          }

          .obelisk {
            top: 44%;
            right: 1%;
            opacity: 0.32;
            width: 58px;
            height: 240px;
          }
        }

        @media (max-width: 560px) {
          .posterPage {
            letter-spacing: -0.055em;
          }

          .heroBlock {
            min-height: auto;
            padding-top: 30px;
            padding-bottom: 112px;
          }

          h1 {
            font-size: clamp(54px, 18vw, 82px);
          }

          h2 {
            font-size: clamp(40px, 14vw, 62px);
          }

          .conceptIntro p {
            max-width: 260px;
            font-size: 15px;
          }

          .floatingTentWrap {
            min-height: 260px;
            margin-inline: -10px;
          }

          .spaceNav,
          .experienceNav {
            gap: 10px;
          }

          .spaceNav a,
          .experienceNav a {
            width: 100%;
            min-height: 48px;
            font-size: 14px;
          }

          .wormholeTop {
            width: 160px;
            height: 120px;
            right: -42px;
            top: 135px;
          }

          .wormholeFloor {
            width: 250px;
            height: 160px;
            left: -94px;
            bottom: 39%;
          }

          .obelisk {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .posterGrain,
          .floatingTent,
          .wormholeTop,
          .wormholeFloor,
          .obelisk,
          .isLoaded .revealBlock {
            animation: none;
          }

          .revealBlock {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </>
  );
}

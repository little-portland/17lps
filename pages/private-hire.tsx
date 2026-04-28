import Head from 'next/head';

type Venue = {
  id: string;
  title: string;
  image: string;
  alt: string;
  objectPosition?: string;
  infoLines: string[];
};

const IMAGE_BASE = '/images/private-hire';
const ACCENT = '#ff00b8';

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
    infoLines: ['36 Seated / 50 Standing', 'Ground Floor'],
  },
  {
    id: 'the-studio',
    title: 'THE STUDIO',
    image: `${IMAGE_BASE}/the-studio-placeholder.png`,
    alt: 'The Studio private hire image.',
    objectPosition: '50% 42%',
    infoLines: ['100 Standing', 'Lower Ground Floor'],
  },
  {
    id: 'chefs-studio',
    title: "CHEF'S STUDIO",
    image: `${IMAGE_BASE}/chefs-studio-placeholder.png`,
    alt: "Chef's Studio private hire image.",
    objectPosition: '50% 50%',
    infoLines: ['Private Dining | 12 Seated', 'Lower Ground Floor'],
  },
];

export default function PrivateHirePage() {
  return (
    <>
      <Head>
        <title>Private Hire | Little Portland</title>
        <meta
          name="description"
          content="Private hire options at Little Portland: full venue, The Tent, The Studio, and Chef's Studio."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="flyerPage">
        <section className="flyerSheet" aria-labelledby="private-hire-title">
          <div className="topBar">17 LITTLE PORTLAND STREET</div>
          <div className="sideBar">YO@LITTLE-PORTLAND.COM</div>
          <div className="bottomBar">LPX // PRIVATE HIRE</div>

          <div className="dateBlock">
            <span>PRIVATE</span>
            <span>HIRE</span>
          </div>

          <div className="issueBlock">ISSUE 01</div>

          <header className="heroTitleWrap">
            <h1 id="private-hire-title" className="heroTitle">
              PRIVATE HIRE
            </h1>
            <div className="titleRule" aria-hidden="true" />
          </header>

          <section className="orbSystem" aria-label="Private hire venue options">
            <div className="connector connector--top" aria-hidden="true" />
            <div className="connector connector--left" aria-hidden="true" />

            <div className="orbit orbit--outer" aria-hidden="true">
              <span style={{ '--i': 0 } as React.CSSProperties} />
              <span style={{ '--i': 1 } as React.CSSProperties} />
              <span style={{ '--i': 2 } as React.CSSProperties} />
              <span style={{ '--i': 3 } as React.CSSProperties} />
              <span style={{ '--i': 4 } as React.CSSProperties} />
              <span style={{ '--i': 5 } as React.CSSProperties} />
            </div>

            <div className="orbit orbit--middle" aria-hidden="true">
              <span style={{ '--i': 0 } as React.CSSProperties} />
              <span style={{ '--i': 1 } as React.CSSProperties} />
              <span style={{ '--i': 2 } as React.CSSProperties} />
              <span style={{ '--i': 3 } as React.CSSProperties} />
              <span style={{ '--i': 4 } as React.CSSProperties} />
            </div>

            <div className="orbit orbit--inner" aria-hidden="true">
              <span style={{ '--i': 0 } as React.CSSProperties} />
              <span style={{ '--i': 1 } as React.CSSProperties} />
              <span style={{ '--i': 2 } as React.CSSProperties} />
              <span style={{ '--i': 3 } as React.CSSProperties} />
            </div>

            <div className="imageCircle">
              {VENUES.map((venue, index) => (
                <article key={venue.id} className={`venueSlice venueSlice--${index + 1}`}>
                  <img
                    src={venue.image}
                    alt={venue.alt}
                    style={{ objectPosition: venue.objectPosition || '50% 50%' }}
                  />
                </article>
              ))}
              <div className="circleShade" aria-hidden="true" />
              <div className="pinkCrescent" aria-hidden="true" />
            </div>
          </section>

          <section className="venueGrid" aria-label="Venue capacities">
            {VENUES.map((venue, index) => (
              <article key={venue.id} className={`venueCard venueCard--${index + 1}`}>
                <h2>{venue.title}</h2>
                {venue.infoLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </article>
            ))}
          </section>
        </section>
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;600;700&display=swap');

        html,
        body,
        #__next {
          min-height: 100%;
        }

        body {
          margin: 0;
          background: #e9e9e6;
          color: #050505;
          font-family: 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        }

        * {
          box-sizing: border-box;
        }

        img {
          display: block;
        }

        .flyerPage {
          min-height: 100dvh;
          display: grid;
          place-items: center;
          padding: clamp(10px, 2vw, 24px);
          background: #e9e9e6;
        }

        .flyerSheet {
          position: relative;
          width: min(100%, 1180px);
          min-height: min(100dvh - 20px, 940px);
          overflow: hidden;
          background: #f6f6f4;
          isolation: isolate;
          padding: clamp(72px, 8vw, 112px) clamp(24px, 6vw, 88px) clamp(82px, 7vw, 104px);
        }

        .topBar,
        .sideBar,
        .bottomBar {
          position: absolute;
          z-index: 20;
          display: inline-flex;
          align-items: center;
          width: max-content;
          background: #000;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 700;
          line-height: 1;
          box-decoration-break: clone;
          -webkit-box-decoration-break: clone;
        }

        .topBar {
          top: 16px;
          left: 16px;
          padding: 7px 10px 8px;
          font-size: clamp(0.82rem, 1.6vw, 1.22rem);
        }

        .sideBar {
          left: 16px;
          bottom: 16px;
          transform-origin: left bottom;
          transform: rotate(-90deg) translateY(100%);
          padding: 7px 10px 8px;
          font-size: clamp(0.78rem, 1.25vw, 1rem);
        }

        .bottomBar {
          right: 16px;
          bottom: 16px;
          padding: 8px 12px 9px;
          font-size: clamp(0.78rem, 1.5vw, 1.1rem);
        }

        .dateBlock,
        .issueBlock {
          position: absolute;
          z-index: 15;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          font-weight: 700;
          line-height: 1.12;
          font-size: clamp(0.86rem, 1.6vw, 1.14rem);
        }

        .dateBlock {
          left: clamp(24px, 4vw, 36px);
          top: 55%;
          display: grid;
        }

        .issueBlock {
          right: clamp(24px, 4vw, 36px);
          top: 55.5%;
        }

        .heroTitleWrap {
          position: absolute;
          left: 15.2%;
          top: 34%;
          z-index: 14;
          display: flex;
          align-items: center;
          gap: clamp(18px, 3vw, 32px);
        }

        .heroTitle {
          margin: 0;
          color: ${ACCENT};
          font-size: clamp(2.8rem, 6.3vw, 5.1rem);
          line-height: 0.9;
          letter-spacing: -0.04em;
          text-transform: uppercase;
          font-weight: 700;
        }

        .titleRule {
          width: clamp(96px, 18vw, 230px);
          height: 2px;
          background: #000;
          position: relative;
        }

        .titleRule::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          width: 2px;
          height: 34px;
          background: #000;
          transform: translateY(-50%);
        }

        .orbSystem {
          position: absolute;
          left: 52%;
          top: 62%;
          width: min(58vw, 650px);
          aspect-ratio: 1;
          transform: translate(-50%, -50%);
          z-index: 8;
        }

        .connector {
          position: absolute;
          z-index: -1;
          background: #000;
        }

        .connector--top {
          left: 50%;
          top: -16%;
          width: 2px;
          height: 34%;
        }

        .connector--top::before {
          content: '';
          position: absolute;
          right: 0;
          top: 0;
          width: 34%;
          height: 2px;
          background: #000;
        }

        .connector--left {
          left: -12%;
          top: 58%;
          width: 28%;
          height: 2px;
        }

        .connector--left::before {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 2px;
          height: 34px;
          background: #000;
        }

        .orbit {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          pointer-events: none;
        }

        .orbit--outer {
          animation: rotateSlow 54s linear infinite;
        }

        .orbit--middle {
          inset: 9%;
          animation: rotateSlowReverse 44s linear infinite;
        }

        .orbit--inner {
          inset: 18%;
          animation: rotateSlow 34s linear infinite;
        }

        .orbit span {
          --i: 0;
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: clamp(6px, 0.8vw, 9px) solid #000;
          clip-path: polygon(50% 50%, 100% 0, 100% 30%, 50% 50%);
          transform: rotate(calc(var(--i) * 61deg));
        }

        .orbit--middle span {
          border-width: clamp(5px, 0.7vw, 8px);
          clip-path: polygon(50% 50%, 100% 8%, 100% 31%, 50% 50%);
          transform: rotate(calc(var(--i) * 72deg + 10deg));
        }

        .orbit--inner span {
          border-width: clamp(5px, 0.62vw, 7px);
          clip-path: polygon(50% 50%, 100% 5%, 100% 28%, 50% 50%);
          transform: rotate(calc(var(--i) * 88deg + 18deg));
        }

        .imageCircle {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 44%;
          aspect-ratio: 1;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          overflow: hidden;
          background: #000;
          box-shadow: 0 0 0 2px #000;
        }

        .venueSlice {
          position: absolute;
          inset: 0;
          overflow: hidden;
          opacity: 0.72;
        }

        .venueSlice img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(1) contrast(1.1) brightness(0.62);
        }

        .venueSlice--1 {
          clip-path: polygon(50% 50%, 50% 0, 100% 0, 100% 50%);
        }

        .venueSlice--2 {
          clip-path: polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%);
        }

        .venueSlice--3 {
          clip-path: polygon(50% 50%, 50% 100%, 0 100%, 0 50%);
        }

        .venueSlice--4 {
          clip-path: polygon(50% 50%, 0 50%, 0 0, 50% 0);
        }

        .circleShade {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at center, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.78) 65%, #000 100%),
            linear-gradient(90deg, rgba(0, 0, 0, 0.34), transparent 52%, rgba(0, 0, 0, 0.24));
          mix-blend-mode: multiply;
        }

        .pinkCrescent {
          position: absolute;
          inset: 4%;
          border-radius: 50%;
          border: clamp(6px, 0.75vw, 9px) solid transparent;
          border-right-color: ${ACCENT};
          transform: rotate(18deg);
          filter: drop-shadow(0 0 6px rgba(255, 0, 184, 0.35));
        }

        .venueGrid {
          position: absolute;
          inset: auto clamp(40px, 6vw, 92px) clamp(72px, 8vw, 104px);
          z-index: 18;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: clamp(12px, 1.7vw, 22px);
        }

        .venueCard {
          min-height: 126px;
          padding: 14px 14px 16px;
          background: rgba(246, 246, 244, 0.88);
          border-top: 3px solid #000;
          text-transform: uppercase;
        }

        .venueCard h2 {
          margin: 0 0 12px;
          color: ${ACCENT};
          font-size: clamp(0.94rem, 1.55vw, 1.32rem);
          line-height: 1.02;
          letter-spacing: -0.03em;
        }

        .venueCard p {
          margin: 0;
          font-size: clamp(0.68rem, 1vw, 0.84rem);
          font-weight: 700;
          line-height: 1.28;
          letter-spacing: 0.01em;
        }

        .venueCard p + p {
          margin-top: 5px;
        }

        @keyframes rotateSlow {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes rotateSlowReverse {
          to {
            transform: rotate(-360deg);
          }
        }

        @media (max-width: 900px) {
          .flyerPage {
            display: block;
            padding: 0;
            background: #f6f6f4;
          }

          .flyerSheet {
            width: 100%;
            min-height: 100dvh;
            padding: 70px 18px 88px;
          }

          .topBar {
            top: 12px;
            left: 12px;
          }

          .sideBar {
            display: none;
          }

          .bottomBar {
            right: 12px;
            bottom: 12px;
          }

          .dateBlock,
          .issueBlock {
            top: 118px;
            font-size: 0.78rem;
          }

          .dateBlock {
            left: 18px;
          }

          .issueBlock {
            right: 18px;
          }

          .heroTitleWrap {
            position: relative;
            left: auto;
            top: auto;
            margin-top: 78px;
            justify-content: center;
            gap: 16px;
          }

          .heroTitle {
            font-size: clamp(2.35rem, 11vw, 4.2rem);
          }

          .titleRule {
            flex: 1;
            max-width: 96px;
          }

          .orbSystem {
            position: relative;
            left: auto;
            top: auto;
            width: min(104vw, 560px);
            margin: 30px auto 18px;
            transform: none;
          }

          .connector {
            display: none;
          }

          .imageCircle {
            width: 47%;
          }

          .venueGrid {
            position: relative;
            inset: auto;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
            margin-top: 8px;
          }

          .venueCard {
            min-height: 112px;
            padding: 12px;
            background: transparent;
          }
        }

        @media (max-width: 520px) {
          .flyerSheet {
            padding: 58px 12px 74px;
          }

          .topBar,
          .bottomBar {
            font-size: 0.68rem;
          }

          .dateBlock,
          .issueBlock {
            display: none;
          }

          .heroTitleWrap {
            margin-top: 46px;
            gap: 10px;
          }

          .titleRule {
            max-width: 54px;
          }

          .titleRule::before {
            height: 24px;
          }

          .orbSystem {
            width: 112vw;
            margin-left: -6vw;
            margin-top: 20px;
            margin-bottom: 10px;
          }

          .orbit span {
            border-width: 5px;
          }

          .venueGrid {
            grid-template-columns: 1fr;
            gap: 4px;
          }

          .venueCard {
            min-height: 0;
            display: grid;
            grid-template-columns: 1fr 1.45fr;
            gap: 12px;
            align-items: start;
            padding: 11px 4px;
            border-top-width: 2px;
          }

          .venueCard h2 {
            margin: 0;
            font-size: 0.98rem;
          }

          .venueCard p {
            font-size: 0.72rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .orbit--outer,
          .orbit--middle,
          .orbit--inner {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}

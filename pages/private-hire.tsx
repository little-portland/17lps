import Head from 'next/head';
import { useEffect, useState } from 'react';

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
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % VENUES.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  const activeVenue = VENUES[activeIndex];

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

          <header className="heroTitleWrap">
            <h1 id="private-hire-title" className="heroTitle">
              PRIVATE HIRE
            </h1>
            <div className="titleRule" aria-hidden="true" />
          </header>

          <section className="orbSystem" aria-label="Private hire venue options">
            <div className="connector connector--top" aria-hidden="true" />

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

            <div className="imageCircle" aria-live="polite">
              <img
                key={activeVenue.id}
                src={activeVenue.image}
                alt={activeVenue.alt}
                className="activeVenueImage"
                style={{ objectPosition: activeVenue.objectPosition || '50% 50%' }}
              />
              <div className="circleShade" aria-hidden="true" />
              <div className="pinkCrescent" aria-hidden="true" />
            </div>
          </section>

          <section className="venueGrid" aria-label="Venue capacities">
            {VENUES.map((venue, index) => (
              <button
                key={venue.id}
                type="button"
                className={`venueCard venueCard--${index + 1} ${activeIndex === index ? 'is-active' : ''}`}
                onClick={() => setActiveIndex(index)}
                aria-pressed={activeIndex === index}
              >
                <h2>{venue.title}</h2>
                {venue.infoLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </button>
            ))}
          </section>

          <a href="mailto:yo@little-portland.com" className="footerEmail">
            yo@little-portland.com
          </a>
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
          background: #fff;
          color: #050505;
          font-family: 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        }

        * {
          box-sizing: border-box;
        }

        button,
        a {
          color: inherit;
          font: inherit;
        }

        button {
          border: 0;
          cursor: pointer;
        }

        a {
          text-decoration: none;
        }

        img {
          display: block;
        }

        .flyerPage {
          min-height: 100dvh;
          display: grid;
          place-items: center;
          padding: clamp(18px, 3vw, 38px) 0;
          background: #fff;
        }

        .flyerSheet {
          position: relative;
          width: 50%;
          min-height: min(100dvh - 76px, 860px);
          margin: 0 auto;
          overflow: hidden;
          background: #fff;
          border: 2px solid #000;
          isolation: isolate;
          padding: clamp(34px, 4vw, 58px) clamp(20px, 3vw, 54px) 82px;
        }

        .heroTitleWrap {
          position: relative;
          z-index: 14;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          margin: 0 auto;
        }

        .heroTitle {
          margin: 0;
          color: ${ACCENT};
          font-size: clamp(2.45rem, 4.8vw, 5.2rem);
          line-height: 0.9;
          letter-spacing: -0.05em;
          text-align: center;
          text-transform: uppercase;
          font-weight: 700;
        }

        .titleRule {
          display: none;
        }

        .orbSystem {
          position: relative;
          z-index: 8;
          width: min(82%, 560px);
          aspect-ratio: 1;
          margin: -4px auto -18px;
        }

        .connector {
          position: absolute;
          z-index: 1;
          background: #000;
          pointer-events: none;
        }

        .connector--top {
          left: 50%;
          top: -2%;
          width: 2px;
          height: 31%;
          transform: translateX(-50%);
          z-index: -1;
        }

        .connector--top::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 0;
          width: clamp(42px, 5vw, 68px);
          height: 2px;
          background: #000;
          transform: translateX(-50%);
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
          inset: 5%;
          animation: rotateSlowReverse 44s linear infinite;
        }

        .orbit--inner {
          inset: 10%;
          animation: rotateSlow 34s linear infinite;
        }

        .orbit span {
          --i: 0;
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: clamp(6px, 0.75vw, 9px) solid #000;
          clip-path: polygon(50% 50%, 100% 3%, 100% 23%, 50% 50%);
          transform: rotate(calc(var(--i) * 61deg));
        }

        .orbit span::after {
          content: '';
          position: absolute;
          right: -8px;
          top: 9%;
          width: 16px;
          height: 16px;
          border-radius: 999px;
          background: #000;
        }

        .orbit span:nth-child(even) {
          clip-path: polygon(50% 50%, 100% 4%, 100% 17%, 50% 50%);
        }

        .orbit--middle span {
          border-width: clamp(5px, 0.64vw, 8px);
          clip-path: polygon(50% 50%, 100% 7%, 100% 25%, 50% 50%);
          transform: rotate(calc(var(--i) * 72deg + 10deg));
        }

        .orbit--middle span:nth-child(even) {
          clip-path: polygon(50% 50%, 100% 11%, 100% 22%, 50% 50%);
        }

        .orbit--inner span {
          border-width: clamp(5px, 0.58vw, 7px);
          clip-path: polygon(50% 50%, 100% 8%, 100% 26%, 50% 50%);
          transform: rotate(calc(var(--i) * 88deg + 18deg));
        }

        .orbit--inner span:nth-child(even) {
          clip-path: polygon(50% 50%, 100% 13%, 100% 23%, 50% 50%);
        }

        .orbit--outer span:nth-child(n + 5),
        .orbit--middle span:nth-child(n + 5) {
          display: none;
        }

        .imageCircle {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 58%;
          aspect-ratio: 1;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          overflow: hidden;
          background: #000;
          box-shadow: 0 0 0 2px #000;
          isolation: isolate;
          z-index: 3;
        }

        .activeVenueImage {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(1) contrast(1.02) brightness(0.95);
          transform: scale(1.04);
          animation: imageReveal 720ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }

        .circleShade {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at center, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.34) 68%, rgba(0, 0, 0, 0.82) 100%),
            linear-gradient(90deg, rgba(0, 0, 0, 0.2), transparent 52%, rgba(0, 0, 0, 0.16));
          mix-blend-mode: multiply;
          pointer-events: none;
        }

        .pinkCrescent {
          position: absolute;
          inset: 4%;
          border-radius: 50%;
          border: clamp(6px, 0.75vw, 9px) solid transparent;
          border-right-color: ${ACCENT};
          transform: rotate(18deg);
          filter: drop-shadow(0 0 6px rgba(255, 0, 184, 0.35));
          animation: crescentPulse 5s ease-in-out infinite;
          pointer-events: none;
        }

        .venueGrid {
          position: relative;
          z-index: 18;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: clamp(10px, 1.25vw, 18px);
          margin-top: 0;
        }

        .venueCard {
          min-height: 126px;
          padding: 13px 12px 15px;
          background: transparent;
          border-top: 3px solid #000;
          text-align: left;
          text-transform: uppercase;
          transition:
            background 260ms ease,
            box-shadow 260ms ease,
            border-color 260ms ease,
            opacity 260ms ease;
        }

        .venueCard:hover,
        .venueCard:focus-visible {
          outline: none;
        }

        .venueCard.is-active {
          background: #000;
          border-color: ${ACCENT};
          box-shadow: 0 14px 30px rgba(0, 0, 0, 0.12);
        }

        .venueCard h2 {
          margin: 0 0 12px;
          color: ${ACCENT};
          font-size: clamp(0.76rem, 1vw, 1rem);
          line-height: 1.02;
          letter-spacing: -0.03em;
          white-space: nowrap;
          transition: color 260ms ease;
        }

        .venueCard p {
          margin: 0;
          color: #000;
          font-size: clamp(0.78rem, 0.95vw, 1rem);
          font-weight: 700;
          line-height: 1.24;
          letter-spacing: 0.01em;
          transition: color 260ms ease;
        }

        .venueCard p + p {
          margin-top: 7px;
          font-size: clamp(0.62rem, 0.72vw, 0.78rem);
          line-height: 1.32;
          opacity: 0.9;
        }

        .venueCard.is-active p {
          color: #fff;
        }

        .footerEmail {
          position: absolute;
          left: 50%;
          bottom: 22px;
          z-index: 20;
          transform: translateX(-50%);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 8px 12px 9px;
          background: #000;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          .footerEmail:hover,
        .footerEmail:focus-visible {
          color: ${ACCENT};
          background: #000;
          outline: none;
        }-height: 1;
          white-space: nowrap;
          transition: color 180ms ease, background 180ms ease;
        }

        .footerEmail:hover,
        .footerEmail:focus-visible {
          color: ${ACCENT};
          outline: none;
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

        @keyframes imageReveal {
          0% {
            opacity: 0;
            transform: scale(1.12) rotate(1.5deg);
            filter: grayscale(1) contrast(1.08) brightness(0.82) blur(3px);
          }
          55% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: scale(1.04) rotate(0deg);
            filter: grayscale(1) contrast(1.02) brightness(0.95) blur(0);
          }
        }

        @keyframes crescentPulse {
          0%,
          100% {
            opacity: 0.86;
            transform: rotate(18deg) scale(0.99);
          }
          50% {
            opacity: 1;
            transform: rotate(18deg) scale(1.03);
          }
        }

        @media (max-width: 1280px) {
          .flyerSheet {
            width: 64%;
          }
        }

        @media (max-width: 900px) {
          .flyerPage {
            display: block;
            padding: 16px 0;
          }

          .flyerSheet {
            width: 90%;
            min-height: auto;
            padding: 30px 16px 70px;
          }

          .heroTitle {
            font-size: clamp(2.3rem, 11vw, 4.4rem);
          }

          .orbSystem {
            width: min(96%, 500px);
            margin-top: -2px;
            margin-bottom: -12px;
          }

          .connector--top {
            top: -1%;
            height: 31%;
          }

          .imageCircle {
            width: 58%;
          }

          .venueGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
            margin-top: 0;
          }

          .venueCard {
            min-height: 112px;
            padding: 12px;
          }
        }

        @media (max-width: 560px) {
          .flyerPage {
            padding: 10px 0;
          }

          .flyerSheet {
            width: 90%;
            padding: 24px 10px 64px;
          }

          .heroTitle {
            font-size: clamp(2rem, 13vw, 3.45rem);
            letter-spacing: -0.07em;
          }

          .orbSystem {
            width: 108%;
            margin-left: -4%;
            margin-top: -2px;
            margin-bottom: -8px;
          }

          .orbit span {
            border-width: 5px;
          }

          .connector--top::before {
            width: 42px;
          }

          .imageCircle {
            width: 57%;
          }

          .venueGrid {
            grid-template-columns: 1fr;
            gap: 7px;
            margin-top: 0;
          }

          .venueCard {
            min-height: 0;
            display: grid;
            grid-template-columns: 1fr 1.55fr;
            gap: 12px;
            align-items: start;
            padding: 11px 9px;
            border-top-width: 2px;
          }

          .venueCard h2 {
            margin: 0;
            font-size: 0.88rem;
            white-space: normal;
          }

          .venueCard p {
            font-size: 0.72rem;
          }

          .footerEmail {
            bottom: 20px;
            font-size: 0.7rem;
            letter-spacing: 0.04em;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .orbit--outer,
          .orbit--middle,
          .orbit--inner,
          .pinkCrescent,
          .activeVenueImage {
            animation: none;
          }

          .venueCard,
          .venueCard h2,
          .venueCard p,
          .footerEmail {
            transition: none;
          }
        }
      `}</style>
    </>
  );
}

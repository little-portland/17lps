import Head from 'next/head';
import { useEffect, useMemo, useRef, useState } from 'react';

type Venue = {
  id: string;
  kicker: string;
  title: string;
  image: string;
  alt: string;
  eyebrow?: string;
  stats: Array<{
    label: string;
    value: number;
    suffix?: string;
  }>;
  description: string;
  floor: string;
  accent: string;
};

const VENUES: Venue[] = [
  {
    id: 'full-venue',
    kicker: '01 / Cinematic takeover',
    title: 'Full Venue',
    image: '/images/private-hire/full-venue-placeholder.jpg',
    alt: 'Placeholder image for the full venue.',
    eyebrow: 'Private Hire',
    stats: [
      { label: 'Standing', value: 150 },
      { label: 'Floors', value: 2 },
    ],
    description:
      'A full-building takeover designed for launches, parties, screenings, and late-night events. Built as a scroll-led hero moment, this section introduces the venue with scale and drama.',
    floor: 'Both floors',
    accent: '#c5fff1',
  },
  {
    id: 'the-tent',
    kicker: '02 / Ground floor mood',
    title: 'The Tent',
    image: '/images/private-hire/the-tent-placeholder.jpg',
    alt: 'Placeholder image for The Tent.',
    stats: [
      { label: 'Seated', value: 36 },
      { label: 'Standing', value: 50 },
    ],
    description:
      'Atmospheric and intimate, with a softer visual language and slower reveal. This panel is designed to feel warm and immersive, giving the space its own identity within the overall story.',
    floor: 'Ground floor',
    accent: '#fff0cb',
  },
  {
    id: 'the-studio',
    kicker: '03 / Lower ground energy',
    title: 'The Studio',
    image: '/images/private-hire/the-studio-placeholder.jpg',
    alt: 'Placeholder image for The Studio.',
    stats: [{ label: 'Standing', value: 100 }],
    description:
      'A sharper, more stripped-back panel with stronger contrast and a sound-led attitude. The layout gives this space room to breathe while still feeling part of the same cinematic sequence.',
    floor: 'Lower ground floor',
    accent: '#d9d2ff',
  },
  {
    id: 'chefs-studio',
    kicker: '04 / Private dining finish',
    title: "Chef's Studio",
    image: '/images/private-hire/chefs-studio-placeholder.jpg',
    alt: "Placeholder image for Chef's Studio.",
    stats: [{ label: 'Seated', value: 12 }],
    description:
      'The closing note of the experience: quieter, more intimate, and designed to feel exclusive. Perfect for private dining, hosted tastings, or a smaller gathering within the wider venue offer.',
    floor: 'Lower ground floor',
    accent: '#ffd9e8',
  },
];

function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0px -30% 0px',
        threshold: [0.2, 0.4, 0.6, 0.8],
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

function CountUp({ value, active }: { value: number; active: boolean }) {
  const [displayValue, setDisplayValue] = useState(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;

    const duration = 1000;
    const start = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));

      if (progress < 1) {
        frame.current = requestAnimationFrame(animate);
      }
    };

    frame.current = requestAnimationFrame(animate);

    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [value, active]);

  return <span>{displayValue}</span>;
}

function VenueSection({
  venue,
  isActive,
}: {
  venue: Venue;
  isActive: boolean;
}) {
  return (
    <section id={venue.id} className={`panel ${isActive ? 'is-active' : ''}`}>
      <div className="panel__sticky">
        <div
          className="panel__image"
          role="img"
          aria-label={venue.alt}
          style={{ backgroundImage: `url(${venue.image})` }}
        >
          <div className="panel__noise" />
          <div className="panel__gradient" />
        </div>

        <div className="panel__content">
          <div className="panel__header">
            <p className="panel__kicker">{venue.kicker}</p>
            <p className="panel__floor">{venue.floor}</p>
          </div>

          <div className="panel__titleWrap">
            {venue.eyebrow ? <span className="panel__eyebrow">{venue.eyebrow}</span> : null}
            <h2 className="panel__title">{venue.title}</h2>
          </div>

          <div className="panel__meta">
            <div className="panel__stats" aria-label={`${venue.title} capacities`}>
              {venue.stats.map((stat) => (
                <div className="stat" key={stat.label}>
                  <div className="stat__value">
                    <CountUp value={stat.value} active={isActive} />
                    {stat.suffix ? <span>{stat.suffix}</span> : null}
                  </div>
                  <div className="stat__label">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="panel__copy">
              <p>{venue.description}</p>
              <div className="panel__accent" style={{ background: venue.accent }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PrivateHirePage() {
  const ids = useMemo(() => VENUES.map((venue) => venue.id), []);
  const activeId = useActiveSection(ids);

  return (
    <>
      <Head>
        <title>Private Hire</title>
        <meta
          name="description"
          content="A cinematic private hire page concept for the venue, designed for desktop and mobile."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="page">
        <section className="hero">
          <div className="hero__grid" />
          <div className="hero__inner">
            <div className="hero__copy">
              <p className="hero__kicker">Venue hire / Scroll experience</p>
              <h1 className="hero__title">
                Private <span>Hire</span>
              </h1>
              <p className="hero__body">
                A scroll-driven, cinematic landing page concept that turns the venue into an experience.
                Each space gets a full-screen reveal, animated capacity stats, and a distinct mood while
                staying easy to explore on mobile.
              </p>
            </div>

            <nav className="hero__nav" aria-label="Jump to venue section">
              {VENUES.map((venue, index) => {
                const isActive = activeId === venue.id;
                return (
                  <a
                    key={venue.id}
                    href={`#${venue.id}`}
                    className={`hero__navItem ${isActive ? 'is-active' : ''}`}
                  >
                    <span className="hero__navIndex">0{index + 1}</span>
                    <span className="hero__navLabel">{venue.title}</span>
                  </a>
                );
              })}
            </nav>
          </div>
        </section>

        {VENUES.map((venue) => (
          <VenueSection key={venue.id} venue={venue} isActive={activeId === venue.id} />
        ))}

        <section className="cta">
          <div className="cta__card">
            <p className="cta__kicker">Next step</p>
            <h2>Swap in your final images and connect your enquiry flow.</h2>
            <p>
              The structure is already built for mobile and desktop. Once the final assets are added to
              <code> /public/images/private-hire/</code>, this page is ready for copy refinement and CTA wiring.
            </p>
            <div className="cta__actions">
              <a href="mailto:hello@example.com" className="cta__button cta__button--solid">
                Enquire now
              </a>
              <a href="#full-venue" className="cta__button cta__button--ghost">
                Back to top
              </a>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        :global(html) {
          scroll-behavior: smooth;
        }

        :global(body) {
          margin: 0;
          background: #0b0b0f;
          color: #f7f5ef;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        :global(*) {
          box-sizing: border-box;
        }

        :global(a) {
          color: inherit;
          text-decoration: none;
        }

        .page {
          background:
            radial-gradient(circle at top left, rgba(173, 255, 239, 0.11), transparent 34%),
            radial-gradient(circle at top right, rgba(255, 223, 188, 0.08), transparent 28%),
            #0b0b0f;
          overflow-x: clip;
        }

        .hero {
          min-height: 100svh;
          position: relative;
          padding: 24px;
          display: flex;
          align-items: center;
        }

        .hero__grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 44px 44px;
          mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), transparent 80%);
          pointer-events: none;
        }

        .hero__inner {
          position: relative;
          z-index: 1;
          width: min(1320px, 100%);
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 1.3fr) minmax(260px, 0.7fr);
          gap: 48px;
          align-items: end;
        }

        .hero__copy {
          max-width: 780px;
        }

        .hero__kicker,
        .panel__kicker,
        .panel__floor,
        .cta__kicker {
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 0.22em;
          font-size: 11px;
          opacity: 0.78;
        }

        .hero__title {
          margin: 12px 0 18px;
          font-size: clamp(4rem, 12vw, 10rem);
          line-height: 0.88;
          text-transform: uppercase;
          letter-spacing: -0.06em;
        }

        .hero__title span {
          display: block;
          color: #b4fff0;
          text-shadow: 0 0 32px rgba(180, 255, 240, 0.14);
        }

        .hero__body {
          margin: 0;
          max-width: 56ch;
          font-size: clamp(1rem, 1.6vw, 1.15rem);
          line-height: 1.7;
          color: rgba(247, 245, 239, 0.8);
        }

        .hero__nav {
          display: grid;
          gap: 12px;
          align-self: center;
        }

        .hero__navItem {
          display: grid;
          grid-template-columns: 42px 1fr;
          gap: 16px;
          align-items: center;
          padding: 14px 16px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(10px);
          transition:
            transform 180ms ease,
            border-color 180ms ease,
            background 180ms ease;
        }

        .hero__navItem:hover,
        .hero__navItem:focus-visible,
        .hero__navItem.is-active {
          transform: translateY(-2px);
          border-color: rgba(180, 255, 240, 0.35);
          background: rgba(180, 255, 240, 0.09);
        }

        .hero__navIndex {
          font-size: 0.78rem;
          letter-spacing: 0.18em;
          opacity: 0.6;
        }

        .hero__navLabel {
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .panel {
          min-height: 170svh;
          position: relative;
          padding: 0 24px;
        }

        .panel__sticky {
          position: sticky;
          top: 0;
          min-height: 100svh;
          display: grid;
          place-items: center;
          overflow: clip;
        }

        .panel__image {
          position: absolute;
          inset: 0;
          background-position: center;
          background-size: cover;
          filter: grayscale(100%) contrast(1.05) brightness(0.45);
          transform: scale(1.05);
          transition:
            transform 700ms ease,
            filter 700ms ease;
        }

        .panel__noise {
          position: absolute;
          inset: 0;
          opacity: 0.16;
          background-image:
            radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.14) 0 1px, transparent 1px),
            radial-gradient(circle at 80% 40%, rgba(255, 255, 255, 0.12) 0 1px, transparent 1px),
            radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.08) 0 1px, transparent 1px);
          background-size: 34px 34px, 48px 48px, 54px 54px;
          mix-blend-mode: screen;
        }

        .panel__gradient {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(11, 11, 15, 0.18) 0%, rgba(11, 11, 15, 0.38) 22%, rgba(11, 11, 15, 0.88) 100%),
            linear-gradient(90deg, rgba(11, 11, 15, 0.84) 0%, rgba(11, 11, 15, 0.3) 48%, rgba(11, 11, 15, 0.72) 100%);
        }

        .panel__content {
          position: relative;
          z-index: 1;
          width: min(1320px, 100%);
          min-height: 100svh;
          margin: 0 auto;
          padding: clamp(28px, 4vw, 48px) 0;
          display: grid;
          grid-template-rows: auto 1fr auto;
          gap: 24px;
        }

        .panel__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .panel__titleWrap {
          align-self: end;
          max-width: min(920px, 100%);
        }

        .panel__eyebrow {
          display: inline-block;
          margin-bottom: 16px;
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(180, 255, 240, 0.12);
          border: 1px solid rgba(180, 255, 240, 0.18);
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.16em;
        }

        .panel__title {
          margin: 0;
          font-size: clamp(3rem, 10vw, 8.8rem);
          line-height: 0.9;
          text-transform: uppercase;
          letter-spacing: -0.06em;
          transform: translateY(22px);
          opacity: 0.5;
          transition:
            transform 700ms ease,
            opacity 700ms ease;
          text-wrap: balance;
        }

        .panel__meta {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.8fr);
          gap: 24px;
          align-items: end;
        }

        .panel__stats {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
        }

        .stat {
          min-width: 154px;
          padding: 18px 18px 16px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(255, 255, 255, 0.07);
          backdrop-filter: blur(12px);
        }

        .stat__value {
          display: flex;
          align-items: baseline;
          gap: 6px;
          font-size: clamp(2rem, 5vw, 3.4rem);
          line-height: 1;
          letter-spacing: -0.06em;
        }

        .stat__label {
          margin-top: 10px;
          font-size: 0.76rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          opacity: 0.72;
        }

        .panel__copy {
          display: grid;
          gap: 18px;
          justify-items: start;
        }

        .panel__copy p {
          margin: 0;
          max-width: 34ch;
          font-size: clamp(0.98rem, 1.7vw, 1.1rem);
          line-height: 1.75;
          color: rgba(247, 245, 239, 0.86);
        }

        .panel__accent {
          width: 120px;
          height: 6px;
          border-radius: 999px;
          box-shadow: 0 0 30px rgba(255, 255, 255, 0.16);
        }

        .panel.is-active .panel__image {
          transform: scale(1);
          filter: grayscale(100%) contrast(1.05) brightness(0.6);
        }

        .panel.is-active .panel__title {
          transform: translateY(0);
          opacity: 1;
        }

        .cta {
          padding: 24px 24px 48px;
        }

        .cta__card {
          width: min(1320px, 100%);
          margin: 0 auto;
          padding: clamp(24px, 4vw, 42px);
          border-radius: 28px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.03)),
            rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(16px);
        }

        .cta__card h2 {
          margin: 10px 0 12px;
          font-size: clamp(2rem, 5vw, 3.5rem);
          line-height: 1;
          letter-spacing: -0.05em;
          max-width: 12ch;
        }

        .cta__card p {
          margin: 0;
          max-width: 62ch;
          color: rgba(247, 245, 239, 0.8);
          line-height: 1.75;
        }

        .cta__card code {
          font-family: inherit;
          background: rgba(255, 255, 255, 0.08);
          padding: 2px 7px;
          border-radius: 999px;
        }

        .cta__actions {
          margin-top: 24px;
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .cta__button {
          min-height: 48px;
          padding: 0 18px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.14);
          transition:
            transform 180ms ease,
            background 180ms ease,
            border-color 180ms ease;
        }

        .cta__button:hover,
        .cta__button:focus-visible {
          transform: translateY(-2px);
        }

        .cta__button--solid {
          background: #b4fff0;
          color: #0b0b0f;
          border-color: #b4fff0;
          font-weight: 700;
        }

        .cta__button--ghost {
          background: rgba(255, 255, 255, 0.04);
        }

        @media (max-width: 980px) {
          .hero__inner,
          .panel__meta {
            grid-template-columns: 1fr;
          }

          .hero__nav {
            grid-template-columns: 1fr 1fr;
          }

          .panel__header {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        @media (max-width: 720px) {
          .hero {
            padding: 18px;
          }

          .hero__inner {
            gap: 28px;
          }

          .hero__nav {
            grid-template-columns: 1fr;
          }

          .hero__navItem {
            grid-template-columns: 34px 1fr;
            padding: 12px 14px;
          }

          .panel {
            min-height: 150svh;
            padding: 0 18px;
          }

          .panel__content {
            padding: 18px 0 28px;
            gap: 18px;
            grid-template-rows: auto auto 1fr;
            align-content: end;
          }

          .panel__title {
            font-size: clamp(2.6rem, 18vw, 4.8rem);
          }

          .panel__meta {
            align-items: start;
          }

          .panel__stats {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .stat {
            min-width: 0;
            padding: 16px 14px 14px;
            border-radius: 18px;
          }

          .panel__copy p {
            max-width: none;
          }

          .cta {
            padding: 18px 18px 28px;
          }

          .cta__card h2 {
            max-width: none;
          }

          .cta__actions {
            flex-direction: column;
          }

          .cta__button {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .hero__title {
            font-size: clamp(3.3rem, 19vw, 4.8rem);
          }

          .panel__stats {
            grid-template-columns: 1fr;
          }

          .panel__floor,
          .panel__kicker,
          .hero__kicker,
          .cta__kicker {
            letter-spacing: 0.16em;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          :global(html) {
            scroll-behavior: auto;
          }

          .hero__navItem,
          .panel__image,
          .panel__title,
          .cta__button {
            transition: none;
          }
        }
      `}</style>
    </>
  );
}

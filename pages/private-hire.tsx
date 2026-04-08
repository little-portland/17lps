import Head from 'next/head';
import { useEffect, useMemo, useRef, useState } from 'react';

type Stat = {
  label: string;
  value: number;
  suffix?: string;
};

type Venue = {
  id: string;
  index: string;
  title: string;
  eyebrow: string;
  floor: string;
  kicker: string;
  strap: string;
  image: string;
  alt: string;
  summary: string;
  description: string;
  accent: string;
  stats: Stat[];
};

/**
 * Update these filenames if your final files use different names.
 * They are expected to live in /public/images/private-hire/
 */
const IMAGE_BASE = '/images/private-hire';

const VENUES: Venue[] = [
  {
    id: 'full-venue',
    index: '01',
    title: 'Full Venue',
    eyebrow: 'Private Hire',
    floor: 'Both floors',
    kicker: 'Cinematic takeover',
    strap: 'Launches / parties / screenings / full building takeover',
    image: `${IMAGE_BASE}/full-venue.jpg`,
    alt: 'Full venue private hire image.',
    summary: 'The full-building moment. Big energy, sharp visuals, and enough drama to make the venue feel like an event before the event starts.',
    description:
      'Designed as the main reveal, this chapter sells the venue as an experience rather than a list of rooms. Use it for brand launches, private parties, screenings, music-led nights, and full-scale takeovers.',
    accent: '#b7fff1',
    stats: [
      { label: 'Standing', value: 150 },
      { label: 'Floors', value: 2 },
    ],
  },
  {
    id: 'the-tent',
    index: '02',
    title: 'The Tent',
    eyebrow: 'Ground floor',
    floor: 'Ground floor',
    kicker: 'Atmospheric arrival',
    strap: 'Soft light / seated dinners / drinks receptions / warm welcome',
    image: `${IMAGE_BASE}/the-tent.jpg`,
    alt: 'The Tent private hire image.',
    summary: 'A softer, more intimate chapter that feels warm, glowy, and slightly theatrical.',
    description:
      'This section is deliberately mood-forward. It works beautifully for seated dinners, smaller receptions, and events that want a more immersive arrival space before opening out into the rest of the venue.',
    accent: '#ffe3b5',
    stats: [
      { label: 'Seated', value: 36 },
      { label: 'Standing', value: 50 },
    ],
  },
  {
    id: 'the-studio',
    index: '03',
    title: 'The Studio',
    eyebrow: 'Lower ground',
    floor: 'Lower ground floor',
    kicker: 'Sound-led energy',
    strap: 'Club nights / talks / showcases / sharper visual identity',
    image: `${IMAGE_BASE}/the-studio.jpg`,
    alt: 'The Studio private hire image.',
    summary: 'Stripped back, focused, and stronger on contrast — this is the chapter with more edge.',
    description:
      'The Studio is framed as the performance-minded space: clean lines, harder typography, and a more confident energy. Ideal for late-night formats, talks, showcases, listening events, or a more club-like setup.',
    accent: '#d5c9ff',
    stats: [{ label: 'Standing', value: 100 }],
  },
  {
    id: 'chefs-studio',
    index: '04',
    title: "Chef's Studio",
    eyebrow: 'Private dining',
    floor: 'Lower ground floor',
    kicker: 'Intimate finish',
    strap: 'Hosted dinners / tastings / boardroom-style private dining',
    image: `${IMAGE_BASE}/chefs-studio.jpg`,
    alt: "Chef's Studio private hire image.",
    summary: 'The quietest and most exclusive chapter — smaller scale, but with the strongest feeling of privacy.',
    description:
      'Use this as the closing note of the page. It shifts the tone from spectacle to intimacy, positioning the venue as somewhere that can also host dinners, tastings, and smaller invitation-only moments.',
    accent: '#ffd5e4',
    stats: [{ label: 'Seated', value: 12 }],
  },
];

function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

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
        threshold: [0.2, 0.35, 0.5, 0.7],
        rootMargin: '-15% 0px -25% 0px',
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

    const duration = 900;
    const startedAt = performance.now();

    const tick = (time: number) => {
      const progress = Math.min((time - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));

      if (progress < 1) {
        frame.current = requestAnimationFrame(tick);
      }
    };

    frame.current = requestAnimationFrame(tick);

    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [value, active]);

  return <>{displayValue}</>;
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
          content="A cinematic, editorial private hire page with immersive venue sections and mobile-first layouts."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="phPage">
        <section className="phHero">
          <div className="phHero__ambient phHero__ambient--left" />
          <div className="phHero__ambient phHero__ambient--right" />
          <div className="phHero__grid" />

          <div className="phShell phHero__inner">
            <div className="phHero__copy">
              <p className="phOverline">Venue hire / immersive microsite concept</p>
              <h1 className="phHero__title">
                Private
                <span>Hire</span>
              </h1>
              <p className="phHero__body">
                A more cinematic direction: oversized editorial type, immersive chapter reveals, and a
                premium venue-story layout that feels designed for nightlife, launches, dinners, and
                special events — not just a brochure page.
              </p>

              <div className="phHero__actions">
                <a href="#full-venue" className="phButton phButton--solid">
                  Explore the spaces
                </a>
                <a href="#enquire" className="phButton phButton--ghost">
                  Start an enquiry
                </a>
              </div>
            </div>

            <nav className="phRail" aria-label="Venue chapters">
              {VENUES.map((venue) => {
                const isActive = activeId === venue.id;
                return (
                  <a
                    key={venue.id}
                    href={`#${venue.id}`}
                    className={`phRail__item ${isActive ? 'is-active' : ''}`}
                  >
                    <span className="phRail__index">{venue.index}</span>
                    <span className="phRail__labelWrap">
                      <span className="phRail__label">{venue.title}</span>
                      <span className="phRail__meta">{venue.floor}</span>
                    </span>
                  </a>
                );
              })}
            </nav>
          </div>
        </section>

        <section className="phIntroBand">
          <div className="phShell phIntroBand__inner">
            <p>
              Built to feel like a guided venue experience. Each space becomes a chapter with its own mood,
              scale, and pace while the whole page stays clean, mobile-friendly, and easy to update.
            </p>
          </div>
        </section>

        {VENUES.map((venue, index) => {
          const isActive = activeId === venue.id;
          const reverse = index % 2 === 1;

          return (
            <section
              key={venue.id}
              id={venue.id}
              className={`phChapter ${reverse ? 'phChapter--reverse' : ''} ${isActive ? 'is-active' : ''}`}
            >
              <div className="phChapter__sticky">
                <div className="phChapter__backdrop">
                  <img src={venue.image} alt={venue.alt} className="phChapter__backdropImage" />
                  <div className="phChapter__backdropWash" />
                  <div className="phChapter__backdropGrid" />
                </div>

                <div className="phShell phChapter__shell">
                  <div className="phChapter__frame">
                    <div className="phChapter__mediaCol">
                      <div className="phChapter__mediaCard">
                        <img src={venue.image} alt={venue.alt} className="phChapter__mediaImage" />
                        <div className="phChapter__mediaShade" />
                        <div className="phChapter__strap">{venue.strap}</div>
                      </div>
                    </div>

                    <div className="phChapter__contentCol">
                      <div className="phChapter__contentCard">
                        <div className="phChapter__topline">
                          <p className="phOverline">
                            {venue.index} / {venue.kicker}
                          </p>
                          <p className="phOverline">{venue.floor}</p>
                        </div>

                        <div className="phChapter__titleBlock">
                          <span className="phChapter__eyebrow" style={{ borderColor: `${venue.accent}44`, color: venue.accent }}>
                            {venue.eyebrow}
                          </span>
                          <h2 className="phChapter__title">{venue.title}</h2>
                          <p className="phChapter__summary">{venue.summary}</p>
                        </div>

                        <div className="phChapter__stats">
                          {venue.stats.map((stat) => (
                            <div className="phStat" key={`${venue.id}-${stat.label}`}>
                              <div className="phStat__value" style={{ color: venue.accent }}>
                                <CountUp value={stat.value} active={isActive} />
                                {stat.suffix ? <span>{stat.suffix}</span> : null}
                              </div>
                              <div className="phStat__label">{stat.label}</div>
                            </div>
                          ))}
                        </div>

                        <p className="phChapter__description">{venue.description}</p>

                        <div className="phChapter__footer">
                          <div className="phChapter__line" style={{ background: venue.accent }} />
                          <span className="phChapter__footerText">{venue.strap}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        <section id="enquire" className="phCta">
          <div className="phShell">
            <div className="phCta__card">
              <div className="phCta__glow" />
              <p className="phOverline">Next step</p>
              <h2>Turn this into a polished venue enquiry page with your final copy and live CTA.</h2>
              <p>
                The layout now supports real imagery, stronger pacing, and a more premium venue-story feel.
                If your filenames differ, just update the paths at the top of the file.
              </p>

              <div className="phCta__actions">
                <a href="mailto:hello@example.com" className="phButton phButton--solid">
                  Enquire now
                </a>
                <a href="#top" className="phButton phButton--ghost">
                  Back to top
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #05070b;
          color: #f4f0ea;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        img {
          display: block;
          max-width: 100%;
        }

        #__next {
          min-height: 100vh;
        }

        .phPage {
          position: relative;
          background:
            radial-gradient(circle at 10% 10%, rgba(132, 255, 236, 0.12), transparent 28%),
            radial-gradient(circle at 90% 12%, rgba(255, 207, 163, 0.07), transparent 30%),
            linear-gradient(180deg, #070a10 0%, #05070b 100%);
          overflow-x: clip;
        }

        .phShell {
          width: min(1360px, calc(100% - 40px));
          margin: 0 auto;
        }

        .phOverline {
          margin: 0;
          font-size: 0.72rem;
          line-height: 1.2;
          text-transform: uppercase;
          letter-spacing: 0.24em;
          opacity: 0.76;
        }

        .phButton {
          min-height: 50px;
          padding: 0 20px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          transition:
            transform 180ms ease,
            border-color 180ms ease,
            background 180ms ease;
          backdrop-filter: blur(12px);
        }

        .phButton:hover,
        .phButton:focus-visible {
          transform: translateY(-2px);
        }

        .phButton--solid {
          background: #b7fff1;
          border-color: #b7fff1;
          color: #071016;
          font-weight: 700;
        }

        .phButton--ghost {
          background: rgba(255, 255, 255, 0.05);
        }

        .phHero {
          position: relative;
          min-height: 100svh;
          display: flex;
          align-items: center;
          padding: 28px 0;
        }

        .phHero__grid,
        .phChapter__backdropGrid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.055) 1px, transparent 1px);
          background-size: 46px 46px;
          pointer-events: none;
        }

        .phHero__ambient {
          position: absolute;
          width: 48vw;
          height: 48vw;
          filter: blur(70px);
          border-radius: 999px;
          opacity: 0.18;
          pointer-events: none;
        }

        .phHero__ambient--left {
          left: -14vw;
          top: 8vh;
          background: #74ffe6;
        }

        .phHero__ambient--right {
          right: -18vw;
          top: 15vh;
          background: #ffb974;
        }

        .phHero__inner {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(300px, 0.85fr);
          gap: 56px;
          align-items: center;
        }

        .phHero__copy {
          max-width: 760px;
        }

        .phHero__title {
          margin: 16px 0 20px;
          font-size: clamp(4rem, 14vw, 10rem);
          line-height: 0.88;
          letter-spacing: -0.08em;
          text-transform: uppercase;
        }

        .phHero__title span {
          display: block;
          color: #b7fff1;
          text-shadow: 0 0 34px rgba(183, 255, 241, 0.14);
        }

        .phHero__body {
          margin: 0;
          max-width: 54ch;
          font-size: clamp(1rem, 1.7vw, 1.18rem);
          line-height: 1.75;
          color: rgba(244, 240, 234, 0.82);
        }

        .phHero__actions {
          margin-top: 28px;
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .phRail {
          display: grid;
          gap: 12px;
        }

        .phRail__item {
          display: grid;
          grid-template-columns: 42px 1fr;
          gap: 16px;
          align-items: center;
          padding: 14px 18px;
          border-radius: 22px;
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.025));
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition:
            border-color 180ms ease,
            transform 180ms ease,
            background 180ms ease;
          backdrop-filter: blur(12px);
        }

        .phRail__item:hover,
        .phRail__item:focus-visible,
        .phRail__item.is-active {
          transform: translateY(-2px);
          border-color: rgba(183, 255, 241, 0.28);
          background: linear-gradient(90deg, rgba(183, 255, 241, 0.12), rgba(255, 255, 255, 0.04));
        }

        .phRail__index {
          font-size: 0.78rem;
          letter-spacing: 0.24em;
          opacity: 0.72;
        }

        .phRail__labelWrap {
          display: grid;
          gap: 4px;
        }

        .phRail__label {
          font-size: 1.02rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .phRail__meta {
          font-size: 0.82rem;
          color: rgba(244, 240, 234, 0.62);
        }

        .phIntroBand {
          position: relative;
          padding: 0 0 36px;
        }

        .phIntroBand__inner {
          padding: 18px 0 0;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .phIntroBand__inner p {
          margin: 0;
          max-width: 64ch;
          font-size: 1rem;
          line-height: 1.8;
          color: rgba(244, 240, 234, 0.76);
        }

        .phChapter {
          position: relative;
          min-height: 170svh;
          scroll-margin-top: 24px;
        }

        .phChapter__sticky {
          position: sticky;
          top: 0;
          min-height: 100svh;
          display: flex;
          align-items: center;
        }

        .phChapter__backdrop {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .phChapter__backdropImage {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(100%) brightness(0.28) contrast(1.05) blur(12px);
          transform: scale(1.1);
          transition:
            transform 700ms ease,
            filter 700ms ease;
        }

        .phChapter__backdropWash {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 50% 35%, rgba(183, 255, 241, 0.08), transparent 32%),
            linear-gradient(180deg, rgba(5, 7, 11, 0.34) 0%, rgba(5, 7, 11, 0.86) 100%),
            linear-gradient(90deg, rgba(5, 7, 11, 0.84) 0%, rgba(5, 7, 11, 0.45) 48%, rgba(5, 7, 11, 0.78) 100%);
        }

        .phChapter__shell {
          position: relative;
          z-index: 1;
          width: 100%;
        }

        .phChapter__frame {
          display: grid;
          grid-template-columns: minmax(360px, 0.9fr) minmax(0, 1.1fr);
          gap: 28px;
          align-items: stretch;
          min-height: 78svh;
        }

        .phChapter--reverse .phChapter__frame {
          grid-template-columns: minmax(0, 1.1fr) minmax(360px, 0.9fr);
        }

        .phChapter--reverse .phChapter__mediaCol {
          order: 2;
        }

        .phChapter--reverse .phChapter__contentCol {
          order: 1;
        }

        .phChapter__mediaCard,
        .phChapter__contentCard {
          position: relative;
          height: 100%;
          border-radius: 32px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.03));
          box-shadow: 0 24px 120px rgba(0, 0, 0, 0.28);
          backdrop-filter: blur(16px);
        }

        .phChapter__mediaCard {
          min-height: 74svh;
        }

        .phChapter__mediaImage {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(100%) contrast(1.04) brightness(0.78);
          transform: scale(1.06);
          transition: transform 700ms ease;
        }

        .phChapter__mediaShade {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(5, 7, 11, 0.12) 0%, rgba(5, 7, 11, 0.22) 34%, rgba(5, 7, 11, 0.72) 100%),
            linear-gradient(90deg, rgba(5, 7, 11, 0.52) 0%, rgba(5, 7, 11, 0.1) 55%, rgba(5, 7, 11, 0.26) 100%);
        }

        .phChapter__strap {
          position: absolute;
          left: 18px;
          right: 18px;
          bottom: 18px;
          padding: 14px 16px;
          border-radius: 18px;
          background: rgba(9, 12, 18, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.09);
          font-size: 0.72rem;
          line-height: 1.5;
          text-transform: uppercase;
          letter-spacing: 0.18em;
        }

        .phChapter__contentCard {
          padding: clamp(24px, 3vw, 34px);
          display: grid;
          gap: 26px;
          align-content: center;
        }

        .phChapter__topline {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          padding-bottom: 18px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .phChapter__titleBlock {
          display: grid;
          gap: 16px;
        }

        .phChapter__eyebrow {
          width: fit-content;
          padding: 9px 12px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(255, 255, 255, 0.03);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.16em;
        }

        .phChapter__title {
          margin: 0;
          font-size: clamp(2.6rem, 7vw, 6.1rem);
          line-height: 0.94;
          letter-spacing: -0.07em;
          text-transform: uppercase;
          text-wrap: balance;
        }

        .phChapter__summary {
          margin: 0;
          max-width: 36ch;
          font-size: clamp(1rem, 1.55vw, 1.15rem);
          line-height: 1.75;
          color: rgba(244, 240, 234, 0.84);
        }

        .phChapter__stats {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .phStat {
          min-width: 158px;
          padding: 16px 16px 14px;
          border-radius: 22px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.04);
        }

        .phStat__value {
          display: flex;
          align-items: baseline;
          gap: 5px;
          font-size: clamp(2rem, 4vw, 3rem);
          line-height: 1;
          letter-spacing: -0.06em;
          font-weight: 700;
        }

        .phStat__label {
          margin-top: 10px;
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: rgba(244, 240, 234, 0.68);
        }

        .phChapter__description {
          margin: 0;
          max-width: 54ch;
          font-size: 1rem;
          line-height: 1.8;
          color: rgba(244, 240, 234, 0.8);
        }

        .phChapter__footer {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .phChapter__line {
          width: 86px;
          height: 6px;
          border-radius: 999px;
          box-shadow: 0 0 34px rgba(255, 255, 255, 0.08);
        }

        .phChapter__footerText {
          font-size: 0.75rem;
          line-height: 1.5;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: rgba(244, 240, 234, 0.68);
        }

        .phChapter.is-active .phChapter__backdropImage {
          transform: scale(1.03);
          filter: grayscale(100%) brightness(0.34) contrast(1.08) blur(8px);
        }

        .phChapter.is-active .phChapter__mediaImage {
          transform: scale(1.01);
        }

        .phCta {
          position: relative;
          padding: 0 0 44px;
        }

        .phCta__card {
          position: relative;
          overflow: hidden;
          padding: clamp(26px, 4vw, 46px);
          border-radius: 34px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.03)),
            rgba(255, 255, 255, 0.03);
          box-shadow: 0 24px 120px rgba(0, 0, 0, 0.24);
        }

        .phCta__glow {
          position: absolute;
          right: -140px;
          top: -110px;
          width: 340px;
          height: 340px;
          border-radius: 999px;
          background: rgba(183, 255, 241, 0.16);
          filter: blur(70px);
          pointer-events: none;
        }

        .phCta__card h2 {
          position: relative;
          margin: 14px 0 14px;
          max-width: 14ch;
          font-size: clamp(2.2rem, 6vw, 4.6rem);
          line-height: 0.96;
          letter-spacing: -0.07em;
          text-wrap: balance;
        }

        .phCta__card p:last-of-type {
          position: relative;
          margin: 0;
          max-width: 60ch;
          font-size: 1rem;
          line-height: 1.8;
          color: rgba(244, 240, 234, 0.82);
        }

        .phCta__actions {
          margin-top: 26px;
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        @media (max-width: 1120px) {
          .phHero__inner,
          .phChapter__frame,
          .phChapter--reverse .phChapter__frame {
            grid-template-columns: 1fr;
          }

          .phRail {
            grid-template-columns: 1fr 1fr;
          }

          .phChapter {
            min-height: 160svh;
          }

          .phChapter__mediaCol,
          .phChapter__contentCol,
          .phChapter--reverse .phChapter__mediaCol,
          .phChapter--reverse .phChapter__contentCol {
            order: unset;
          }

          .phChapter__mediaCard {
            min-height: 38svh;
          }
        }

        @media (max-width: 760px) {
          .phShell {
            width: min(100% - 28px, 1360px);
          }

          .phHero {
            min-height: auto;
            padding: 92px 0 32px;
          }

          .phHero__inner {
            gap: 30px;
          }

          .phHero__title {
            font-size: clamp(3.4rem, 22vw, 5.6rem);
          }

          .phHero__actions,
          .phCta__actions {
            flex-direction: column;
          }

          .phButton {
            width: 100%;
          }

          .phRail {
            grid-template-columns: 1fr;
          }

          .phIntroBand {
            padding-bottom: 24px;
          }

          .phChapter {
            min-height: auto;
            padding-bottom: 26px;
          }

          .phChapter__sticky {
            position: relative;
            min-height: auto;
            display: block;
          }

          .phChapter__backdrop {
            display: none;
          }

          .phChapter__frame {
            min-height: auto;
            gap: 16px;
          }

          .phChapter__mediaCard,
          .phChapter__contentCard,
          .phCta__card {
            border-radius: 24px;
          }

          .phChapter__mediaCard {
            min-height: 48svh;
          }

          .phChapter__contentCard {
            padding: 22px 18px;
            gap: 20px;
          }

          .phChapter__topline {
            align-items: flex-start;
            flex-direction: column;
            padding-bottom: 16px;
          }

          .phChapter__title {
            font-size: clamp(2.4rem, 14vw, 3.8rem);
          }

          .phChapter__summary,
          .phChapter__description,
          .phIntroBand__inner p,
          .phHero__body,
          .phCta__card p:last-of-type {
            font-size: 0.98rem;
          }

          .phChapter__stats {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .phStat {
            min-width: 0;
          }

          .phCta {
            padding-bottom: 28px;
          }

          .phCta__card h2 {
            max-width: none;
          }
        }

        @media (max-width: 480px) {
          .phOverline {
            letter-spacing: 0.18em;
          }

          .phHero {
            padding-top: 82px;
          }

          .phChapter__mediaCard {
            min-height: 42svh;
          }

          .phChapter__stats {
            grid-template-columns: 1fr;
          }

          .phRail__item {
            padding: 13px 14px;
            grid-template-columns: 34px 1fr;
          }

          .phChapter__strap,
          .phChapter__footerText {
            letter-spacing: 0.14em;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          .phButton,
          .phRail__item,
          .phChapter__backdropImage,
          .phChapter__mediaImage {
            transition: none;
          }
        }
      `}</style>
    </>
  );
}

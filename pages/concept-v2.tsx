'use client';

import Head from 'next/head';
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import SceneNav from '@components/SceneNav';

const C = {
  cream: '#E8E2D4',
  ink: '#1C1C1A',
  pink: '#D4507A',
  muted: '#7A7870',
} as const;

const MONO = '"Space Mono", "Courier New", monospace';

type AreaId = 'tent' | 'chefs-studio' | 'studio';
type Area = {
  id: AreaId;
  title: string;
  href: string;
  highlight: string;
};

const IMG = {
  bg: '/images/concept/concept_bg.jpg',
  obelisk: '/images/concept/obelisk-dark-grey.svg',
  venue: '/images/concept/the-space-page-venue.png',
  donutBottom: '/images/concept/donut-bottom-view.svg',
  donutStraight: '/images/concept/donut-straight.svg',
  donutTop: '/images/concept/donut-top-view.svg',
};

const AREAS: Area[] = [
  {
    id: 'tent',
    title: 'THE TENT',
    href: '/thetent-test',
    highlight: '/images/concept/tent-highlight.png',
  },
  {
    id: 'chefs-studio',
    title: "CHEF'S STUDIO",
    href: '/chefstudio-test',
    highlight: '/images/concept/chefs-studio-highlight.png',
  },
  {
    id: 'studio',
    title: 'THE STUDIO',
    href: '/studio-test',
    highlight: '/images/concept/studio-highlight.png',
  },
];

const EXP = [
  { label: 'Dining', href: '/food-test', dark: false },
  { label: 'After Dark', href: '/theclub-test', dark: true },
];

const typeStyle = (chars: number, delay: string): CSSProperties =>
  ({ '--chars': chars, '--type-delay': delay }) as CSSProperties;

function Card({
  href,
  title,
  meta = 'Explore',
  dark = false,
  active = false,
  onEnter,
  onFocus,
  onClick,
  style,
}: {
  href: string;
  title: string;
  meta?: string;
  dark?: boolean;
  active?: boolean;
  onEnter?: () => void;
  onFocus?: () => void;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  style?: CSSProperties;
}) {
  return (
    <a
      href={href}
      className={`card ${dark ? 'is-dark' : ''} ${active ? 'is-active' : ''}`}
      onMouseEnter={onEnter}
      onFocus={onFocus}
      onClick={onClick}
      style={style}
    >
      <span className="card-title">{title}</span>
      <span className="card-meta">
        {meta} <span aria-hidden="true">→</span>
      </span>
    </a>
  );
}

export default function ConceptPage() {
  const [active, setActive] = useState<AreaId | null>(null);
  const [touch, setTouch] = useState(false);
  const [ready, setReady] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [dining, setDining] = useState('20:00 / 20:30');
  const [darkTime, setDarkTime] = useState('22:00');

  const [curtainPhase, setCurtainPhase] = useState<'visible' | 'fading' | 'gone'>('visible');

  const [firstDonut, setFirstDonut] = useState<'bottom' | 'straight'>('bottom');
  const [secondDonut, setSecondDonut] = useState<'top' | 'straight'>('top');
  const [firstDonutGlitch, setFirstDonutGlitch] = useState(false);
  const [secondDonutGlitch, setSecondDonutGlitch] = useState(false);

  const obeliskParRef = useRef<HTMLDivElement>(null);
  const firstDonutParRef = useRef<HTMLDivElement>(null);
  const secondDonutParRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let tt: number[] = [];

    const run = () => {
      tt.forEach(t => window.clearTimeout(t));
      tt = [];

      setDining('20:00 / 20:30');
      setDarkTime('22:00');

      tt = [
        window.setTimeout(() => setDining('18:40 / 19:10'), 1700),
        window.setTimeout(() => setDining('21:12 / 21:40'), 1860),
        window.setTimeout(() => setDining('19:55 / 20:14'), 2020),
        window.setTimeout(() => setDining('20:00 / 20:30'), 2240),

        window.setTimeout(() => setDarkTime('20:46'), 4080),
        window.setTimeout(() => setDarkTime('23:17'), 4220),
        window.setTimeout(() => setDarkTime('01:40'), 4360),
        window.setTimeout(() => setDarkTime('21:52'), 4500),
        window.setTimeout(() => setDarkTime('22:34'), 4640),
        window.setTimeout(() => setDarkTime('23:03'), 4780),
        window.setTimeout(() => setDarkTime('22:00'), 4980),
      ];
    };

    run();
    const iv = window.setInterval(run, 9600);

    return () => {
      window.clearInterval(iv);
      tt.forEach(t => window.clearTimeout(t));
    };
  }, []);

  useEffect(() => {
    const t1 = window.setTimeout(() => setCurtainPhase('fading'), 200);
    const t2 = window.setTimeout(() => setReady(true), 1900);
    const t3 = window.setTimeout(() => setCurtainPhase('gone'), 2500);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, []);

  useEffect(() => {
    const onS = () => setScrolled(window.scrollY > 24);
    onS();
    window.addEventListener('scroll', onS, { passive: true });
    return () => window.removeEventListener('scroll', onS);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.rs');

    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          e.target.classList.add('iv');
          obs.unobserve(e.target);
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
    );

    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(hover: none), (pointer: coarse), (max-width: 900px)');
    const update = () => setTouch(mq.matches || window.innerWidth <= 900);

    update();
    mq.addEventListener('change', update);
    window.addEventListener('resize', update);

    return () => {
      mq.removeEventListener('change', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    if (touch) return;

    let raf = 0;

    const onMove = (e: globalThis.MouseEvent) => {
      if (raf) window.cancelAnimationFrame(raf);

      raf = window.requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        if (obeliskParRef.current) {
          obeliskParRef.current.style.transform = `translate(${x * 6}px, ${y * 4}px)`;
        }

        if (firstDonutParRef.current) {
          firstDonutParRef.current.style.transform = `translate(${x * 10}px, ${y * 8}px)`;
        }

        if (secondDonutParRef.current) {
          secondDonutParRef.current.style.transform = `translate(${x * -8}px, ${y * -6}px)`;
        }
      });
    };

    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [touch]);

  useEffect(() => {
    let swapTimer = 0;
    let clearGlitchTimer = 0;

    const trigger = () => {
      setFirstDonutGlitch(true);

      swapTimer = window.setTimeout(() => {
        setFirstDonut(prev => (prev === 'bottom' ? 'straight' : 'bottom'));
      }, 180);

      clearGlitchTimer = window.setTimeout(() => {
        setFirstDonutGlitch(false);
      }, 560);
    };

    const iv = window.setInterval(trigger, 8000);

    return () => {
      window.clearInterval(iv);
      window.clearTimeout(swapTimer);
      window.clearTimeout(clearGlitchTimer);
    };
  }, []);

  useEffect(() => {
    let startTimer = 0;
    let intervalTimer = 0;
    let swapTimer = 0;
    let clearGlitchTimer = 0;

    const trigger = () => {
      setSecondDonutGlitch(true);

      swapTimer = window.setTimeout(() => {
        setSecondDonut(prev => (prev === 'top' ? 'straight' : 'top'));
      }, 180);

      clearGlitchTimer = window.setTimeout(() => {
        setSecondDonutGlitch(false);
      }, 560);
    };

    startTimer = window.setTimeout(() => {
      trigger();
      intervalTimer = window.setInterval(trigger, 8000);
    }, 4000);

    return () => {
      window.clearTimeout(startTimer);
      window.clearInterval(intervalTimer);
      window.clearTimeout(swapTimer);
      window.clearTimeout(clearGlitchTimer);
    };
  }, []);

  const onEnter = (id: AreaId) => () => {
    if (!touch) setActive(id);
  };

  const onLeave = () => {
    if (!touch) setActive(null);
  };

  const onClick = (id: AreaId) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (touch && active !== id) {
      e.preventDefault();
      setActive(id);
    }
  };

  return (
    <>
      <Head>
        <title>Concept — 17 Little Portland Street</title>
        <meta
          name="description"
          content="Concept, space and experience at 17 Little Portland Street, London."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {curtainPhase !== 'gone' && (
        <div className={`curtain${curtainPhase === 'fading' ? ' is-up' : ''}`} aria-hidden="true" />
      )}

      <div className="scanlines" aria-hidden="true" />

      <main className="page">
        <div className={`nav-shell ${ready ? 'rdy' : ''} ${scrolled ? 'scrolled' : ''}`}>
          <SceneNav theme="space" />
        </div>

        <div className="bg-tex" aria-hidden="true" />

        <section className="act a-hero">
          <div className="hero-obelisk-drop" aria-hidden="true">
            <div ref={obeliskParRef} className="par-wrap">
              <div className="hero-obelisk-stack">
                <div className="hero-field">
                  <span className="hero-glow" />
                  <span className="hero-mist hero-mist-a" />
                  <span className="hero-mist hero-mist-b" />
                  <span className="hero-grid-plane" />
                  <span className="hero-grid-plane hero-grid-plane-b" />
                  <span className="hero-burst-lines hero-burst-lines-a" />
                  <span className="hero-burst-lines hero-burst-lines-b" />
                  <span className="hero-shadow-floor" />
                </div>

                <div className="hero-obelisk-shell">
                  <img
                    src={IMG.obelisk}
                    alt=""
                    className="hero-obelisk-img hero-obelisk-base"
                    draggable={false}
                  />
                  <img
                    src={IMG.obelisk}
                    alt=""
                    className="hero-obelisk-img hero-obelisk-ghost hero-obelisk-ghost-a"
                    draggable={false}
                  />
                  <img
                    src={IMG.obelisk}
                    alt=""
                    className="hero-obelisk-img hero-obelisk-ghost hero-obelisk-ghost-b"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="hero-copy">
            <h1 className="hero-h1">CONCEPT</h1>
            <p className="hero-addr">
              <span className="tt-hero" style={typeStyle(33, '4.6s')}>
                17 Little Portland Street, London
              </span>
            </p>
          </div>
        </section>

        <section className="act a-donut rs">
          <div className="flank-line flank-a" aria-hidden="true" />

          <div className="donut-stage">
            <div
              ref={firstDonutParRef}
              className={`par-wrap donut-wrap ${firstDonutGlitch ? 'is-glitch' : ''}`}
            >
              <img
                src={IMG.donutBottom}
                alt=""
                className={`donut-img ${firstDonut === 'bottom' ? 'is-visible' : ''}`}
                draggable={false}
              />
              <img
                src={IMG.donutStraight}
                alt=""
                className={`donut-img ${firstDonut === 'straight' ? 'is-visible' : ''}`}
                draggable={false}
              />
              <span className="donut-glitch-slice dgs-a" />
              <span className="donut-glitch-slice dgs-b" />
            </div>
          </div>

          <div className="flank-line flank-b" aria-hidden="true" />
        </section>

        <section className="act a-space rs" aria-labelledby="space-title">
          <div className="shell">
            <h2 id="space-title" className="st space-h2">
              The Space
            </h2>

            <p className="section-lead">
              Three distinct environments,&nbsp;&nbsp;one continuous experience.
            </p>

            <div className="venue-stage" aria-label="Interactive venue map">
              <div className="venue-wrap" aria-hidden="true">
                <img
                  src={IMG.venue}
                  alt="Venue — The Tent, Chef's Studio, The Studio"
                  className="vi v-base"
                  draggable={false}
                />

                {AREAS.map(a => (
                  <img
                    key={a.id}
                    src={a.highlight}
                    alt=""
                    className={`vi v-hl ${active === a.id ? 'on' : ''}`}
                    draggable={false}
                  />
                ))}

                <img src={IMG.venue} alt="" className="vi v-glitch vg-a" draggable={false} />
                <img src={IMG.venue} alt="" className="vi v-glitch vg-b" draggable={false} />
              </div>
            </div>

            <nav className="zone-nav" onMouseLeave={onLeave} aria-label="Venue areas">
              {AREAS.map((a, i) => {
                const on = active === a.id;

                return (
                  <Card
                    key={a.id}
                    href={a.href}
                    title={a.title}
                    meta={touch ? (on ? 'Tap to explore' : 'Tap to preview') : 'Explore'}
                    active={on}
                    onEnter={onEnter(a.id)}
                    onFocus={() => setActive(a.id)}
                    onClick={onClick(a.id)}
                    style={{ '--card-delay': `${220 + i * 80}ms` } as CSSProperties}
                  />
                );
              })}
            </nav>
          </div>
        </section>

        <section className="act a-donut a-donut-second rs">
          <div className="flank-line flank-a" aria-hidden="true" />

          <div className="donut-stage">
            <div
              ref={secondDonutParRef}
              className={`par-wrap donut-wrap donut-wrap--second ${secondDonutGlitch ? 'is-glitch' : ''}`}
            >
              <img
                src={IMG.donutTop}
                alt=""
                className={`donut-img ${secondDonut === 'top' ? 'is-visible' : ''}`}
                draggable={false}
              />
              <img
                src={IMG.donutStraight}
                alt=""
                className={`donut-img ${secondDonut === 'straight' ? 'is-visible' : ''}`}
                draggable={false}
              />
              <span className="donut-glitch-slice dgs-a" />
              <span className="donut-glitch-slice dgs-b" />
            </div>
          </div>

          <div className="flank-line flank-b" aria-hidden="true" />
        </section>

        <section className="act a-exp rs" aria-labelledby="exp-title">
          <div className="shell">
            <h2 id="exp-title" className="st exp-h2">
              The Experience
            </h2>

            <p className="section-lead">An evening composed with intention.</p>

            <div className="sig">
              <div className="sig-track">
                <div className="sig-line" />
                <div className="sig-fill" />
                <div className="sig-tick" style={{ left: '25%' }} />
                <div className="sig-tick" style={{ left: '50%' }} />
                <div className="sig-tick" style={{ left: '75%' }} />
              </div>

              <div className="sig-node sn-dining">
                <span className="sig-time">{dining}</span>
                <span className="sig-dot">
                  <span className="sig-sonar" />
                  <span className="sig-dot-fill" />
                </span>
              </div>

              <div className="sig-node sn-dark">
                <span className="sig-time">{darkTime}</span>
                <span className="sig-dot">
                  <span className="sig-sonar" />
                  <span className="sig-dot-fill" />
                </span>
              </div>
            </div>

            <nav className="exp-nav" aria-label="Explore the experience">
              {EXP.map((b, i) => (
                <Card
                  key={b.href}
                  href={b.href}
                  title={b.label}
                  dark={b.dark}
                  style={{ '--card-delay': `${380 + i * 110}ms` } as CSSProperties}
                />
              ))}
            </nav>
          </div>
        </section>
      </main>

      <style jsx global>{`
        html,
        body,
        #__next {
          margin: 0;
          min-height: 100%;
          background: ${C.cream};
          color: ${C.ink};
          font-family: ${MONO};
          -webkit-font-smoothing: antialiased;
        }

        body {
          overflow-x: hidden;
        }

        * {
          box-sizing: border-box;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(28, 28, 26, 0.1);
        }

        ::-webkit-scrollbar-thumb {
          background: ${C.ink};
          border: 2px solid rgba(232, 226, 212, 0.6);
          background-clip: content-box;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${C.pink};
          border: 2px solid rgba(232, 226, 212, 0.6);
          background-clip: content-box;
        }

        .scene-nav {
          z-index: 10020 !important;
          transition: background 0.3s, box-shadow 0.3s, backdrop-filter 0.3s !important;
        }

        .scene-nav-burger,
        .scene-nav-logo {
          z-index: 10030 !important;
        }

        .scene-nav-mobile {
          z-index: 10010 !important;
        }

        .scene-nav--space {
          background: transparent !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
        }

        .scene-nav--space,
        .scene-nav--space a,
        .scene-nav-mobile--space,
        .scene-nav-mobile--space a {
          color: ${C.ink} !important;
          font-family: ${MONO} !important;
          letter-spacing: 0.16em !important;
        }

        .scene-nav--space a.active,
        .scene-nav-mobile--space a.active,
        .scene-nav--space a[aria-current='page'],
        .scene-nav-mobile--space a[aria-current='page'] {
          color: ${C.pink} !important;
        }

        .scene-nav--space a.disabled,
        .scene-nav-mobile--space a.disabled {
          opacity: 0.4;
        }

        .scene-nav--space .scene-nav-burger span {
          background: ${C.ink} !important;
        }

        .scene-nav--space .scene-nav-logo img {
          filter: brightness(0) saturate(100%) invert(8%) sepia(5%) saturate(851%)
            hue-rotate(21deg) brightness(99%) contrast(91%);
        }

        .nav-shell.scrolled .scene-nav.scene-nav--space {
          background: rgba(232, 226, 212, 0.52) !important;
          border-bottom: 1px solid rgba(28, 28, 26, 0.12);
          box-shadow: 0 8px 24px rgba(28, 28, 26, 0.06);
          backdrop-filter: blur(18px) !important;
          -webkit-backdrop-filter: blur(18px) !important;
        }

        .scene-nav-mobile.scene-nav--space,
        .scene-nav-mobile--space {
          background: rgba(232, 226, 212, 0.92) !important;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        @media (max-width: 900px) {
          .nav-shell {
            z-index: 50000 !important;
          }

          .nav-shell .scene-nav {
            z-index: 50020 !important;
          }

          .scene-nav-burger,
          .scene-nav-logo {
            z-index: 50040 !important;
          }

          .nav-shell:has(.scene-nav-burger[aria-expanded='true']) .scene-nav-mobile,
          .nav-shell:has(button[aria-expanded='true']) .scene-nav-mobile {
            position: fixed !important;
            inset: 0 !important;
            z-index: 50010 !important;
            min-height: 100dvh !important;
            height: 100dvh !important;
            padding: 104px 28px 38px !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: flex-start !important;
            gap: 20px !important;
            overflow-y: auto !important;
            background: rgba(232, 226, 212, 0.9) !important;
            backdrop-filter: blur(22px) !important;
            -webkit-backdrop-filter: blur(22px) !important;
          }

          .nav-shell:has(.scene-nav-burger[aria-expanded='true']) .scene-nav-mobile a,
          .nav-shell:has(button[aria-expanded='true']) .scene-nav-mobile a {
            display: block !important;
            color: ${C.ink} !important;
            opacity: 1 !important;
            font-size: clamp(16px, 4.7vw, 24px) !important;
            letter-spacing: 0.16em !important;
            text-align: center !important;
            padding: 4px 0 !important;
          }

          .nav-shell:has(.scene-nav-burger[aria-expanded='true']) .scene-nav-mobile a.active,
          .nav-shell:has(button[aria-expanded='true']) .scene-nav-mobile a.active {
            color: ${C.pink} !important;
          }
        }
      `}</style>

      <style jsx global>{`
        .page {
          position: relative;
          min-height: 100svh;
          overflow-x: clip;
          background: ${C.cream};
        }

        .nav-shell {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 10000;
          opacity: 0;
          transform: translateY(-16px);
          pointer-events: none;
          transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .nav-shell.rdy {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .bg-tex {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background-image: url('${IMG.bg}');
          background-size: contain;
          background-repeat: repeat;
          background-position: center top;
          opacity: 0.45;
        }

        .act {
          position: relative;
          z-index: 2;
        }

        .shell {
          width: 68%;
          max-width: 1140px;
          margin: 0 auto;
        }

        .curtain {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: #0b0906;
          pointer-events: none;
          opacity: 1;
          transition: opacity 2.1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .curtain.is-up {
          opacity: 0;
        }

        .scanlines {
          position: fixed;
          inset: 0;
          z-index: 9997;
          pointer-events: none;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(28, 28, 26, 0.013) 3px,
            rgba(28, 28, 26, 0.013) 4px
          );
          mix-blend-mode: multiply;
        }

        .par-wrap {
          transition: transform 0.72s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: transform;
        }

        .flank-line {
          width: 1px;
          height: clamp(82px, 10vh, 128px);
          margin: 0 auto;
          transform: scaleY(0);
        }

        .flank-a {
          background: linear-gradient(to bottom, transparent 0%, rgba(28, 28, 26, 0.42) 100%);
          transform-origin: bottom;
        }

        .flank-b {
          background: linear-gradient(to bottom, rgba(28, 28, 26, 0.42) 0%, transparent 100%);
          transform-origin: top;
        }

        .rs.iv .flank-a {
          animation: flankGrow 1.1s cubic-bezier(0.25, 0.8, 0.25, 1) 0.3s forwards;
        }

        .rs.iv .flank-b {
          animation: flankGrow 1.1s cubic-bezier(0.25, 0.8, 0.25, 1) 0.72s forwards;
        }

        .a-hero {
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: clamp(88px, 10vw, 120px) clamp(20px, 5vw, 60px)
            clamp(54px, 6vw, 78px);
        }

        .hero-obelisk-drop {
          display: flex;
          justify-content: center;
          margin-bottom: clamp(18px, 2.8vw, 30px);
          opacity: 0;
          transform: translateY(-80px);
          animation: heroObeliskIn 1.65s cubic-bezier(0.22, 1, 0.36, 1) 2.1s forwards;
        }

        .hero-obelisk-stack {
          position: relative;
          display: grid;
          place-items: center;
          line-height: 0;
          pointer-events: none;
          user-select: none;
          isolation: isolate;
          animation: heroObeliskFloat 8s ease-in-out 4.2s infinite;
        }

        .hero-field {
          position: absolute;
          inset: auto;
          left: 50%;
          top: 50%;
          width: clamp(620px, 84svh, 980px);
          height: clamp(420px, 56svh, 700px);
          transform: translate(-50%, -50%);
          z-index: 0;
          pointer-events: none;
        }

        .hero-glow {
          position: absolute;
          left: 50%;
          top: 48%;
          width: 70%;
          height: 86%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background:
            radial-gradient(
              ellipse at center,
              rgba(212, 80, 122, 0.3) 0%,
              rgba(212, 80, 122, 0.16) 22%,
              rgba(232, 226, 212, 0.18) 46%,
              transparent 70%
            );
          filter: blur(26px);
          opacity: 0.9;
          animation:
            heroFieldIn 1.6s cubic-bezier(0.22, 1, 0.36, 1) 2.35s forwards,
            heroGlowBreath 10s ease-in-out 4.2s infinite;
        }

        .hero-mist {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          filter: blur(24px);
          opacity: 0;
          animation: heroFieldIn 1.6s cubic-bezier(0.22, 1, 0.36, 1) 2.45s forwards;
        }

        .hero-mist-a {
          background:
            radial-gradient(circle at 34% 46%, rgba(212, 80, 122, 0.18), transparent 24%),
            radial-gradient(circle at 62% 44%, rgba(232, 226, 212, 0.26), transparent 28%),
            radial-gradient(circle at 50% 66%, rgba(28, 28, 26, 0.07), transparent 30%);
          animation:
            heroFieldIn 1.6s cubic-bezier(0.22, 1, 0.36, 1) 2.45s forwards,
            mistDriftA 12s ease-in-out 4.5s infinite;
        }

        .hero-mist-b {
          background:
            radial-gradient(circle at 58% 52%, rgba(212, 80, 122, 0.14), transparent 28%),
            radial-gradient(circle at 42% 34%, rgba(122, 120, 112, 0.14), transparent 34%);
          animation:
            heroFieldIn 1.6s cubic-bezier(0.22, 1, 0.36, 1) 2.55s forwards,
            mistDriftB 15s ease-in-out 4.8s infinite;
        }

        .hero-grid-plane {
          position: absolute;
          left: 50%;
          top: 60%;
          width: 92%;
          height: 42%;
          transform: translate(-50%, -50%) perspective(1100px) rotateX(75deg);
          border-radius: 50%;
          opacity: 0;
          background:
            repeating-linear-gradient(
              90deg,
              rgba(212, 80, 122, 0.22) 0 1px,
              transparent 1px 36px
            ),
            repeating-radial-gradient(
              ellipse at 50% 45%,
              transparent 0 24px,
              rgba(212, 80, 122, 0.34) 24px 25px
            );
          mask-image: radial-gradient(ellipse at center, #000 0%, #000 62%, transparent 84%);
          -webkit-mask-image: radial-gradient(
            ellipse at center,
            #000 0%,
            #000 62%,
            transparent 84%
          );
          animation:
            heroFieldIn 1.8s cubic-bezier(0.22, 1, 0.36, 1) 2.6s forwards,
            gridBreath 10s ease-in-out 4.5s infinite,
            heroBurstShift 10s steps(1, end) 6.2s infinite;
        }

        .hero-grid-plane-b {
          width: 86%;
          height: 36%;
          opacity: 0;
          filter: blur(1px);
          background:
            repeating-linear-gradient(
              90deg,
              rgba(212, 80, 122, 0.16) 0 1px,
              transparent 1px 42px
            ),
            repeating-radial-gradient(
              ellipse at 50% 45%,
              transparent 0 28px,
              rgba(212, 80, 122, 0.22) 28px 29px
            );
          animation:
            heroFieldIn 1.8s cubic-bezier(0.22, 1, 0.36, 1) 2.8s forwards,
            gridBreathSoft 11s ease-in-out 4.5s infinite,
            heroBurstShiftB 10s steps(1, end) 6.2s infinite;
        }

        .hero-burst-lines {
          position: absolute;
          inset: 12% 18%;
          opacity: 0;
          background:
            linear-gradient(
              to bottom,
              transparent 0%,
              transparent 18%,
              rgba(212, 80, 122, 0.18) 18%,
              rgba(212, 80, 122, 0.18) 20%,
              transparent 20%,
              transparent 48%,
              rgba(232, 226, 212, 0.22) 48%,
              rgba(232, 226, 212, 0.22) 50%,
              transparent 50%,
              transparent 100%
            );
          mix-blend-mode: multiply;
          pointer-events: none;
        }

        .hero-burst-lines-a {
          animation: heroBurstLinesA 10s steps(1, end) 6.2s infinite;
        }

        .hero-burst-lines-b {
          animation: heroBurstLinesB 10s steps(1, end) 6.2s infinite;
        }

        .hero-shadow-floor {
          position: absolute;
          left: 50%;
          top: 67%;
          width: 24%;
          height: 9%;
          transform: translate(-50%, -50%);
          background: radial-gradient(ellipse, rgba(28, 28, 26, 0.18), transparent 72%);
          filter: blur(12px);
          opacity: 0;
          animation:
            heroFieldIn 1.4s cubic-bezier(0.22, 1, 0.36, 1) 2.85s forwards,
            floorShadowBreath 9s ease-in-out 4.6s infinite;
        }

        .hero-obelisk-shell {
          position: relative;
          z-index: 5;
          display: grid;
          place-items: center;
        }

        .hero-obelisk-img {
          grid-area: 1 / 1;
          display: block;
          height: clamp(340px, 48svh, 540px);
          width: auto;
          pointer-events: none;
          user-select: none;
        }

        .hero-obelisk-base {
          position: relative;
          z-index: 5;
        }

        .hero-obelisk-ghost {
          position: relative;
          z-index: 6;
          opacity: 0;
        }

        .hero-obelisk-ghost-a {
          animation: obeliskGhostPink 7.5s steps(1, end) 4.9s infinite;
        }

        .hero-obelisk-ghost-b {
          animation: obeliskGhostCream 7.5s steps(1, end) 4.9s infinite;
        }

        .hero-copy {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(12px, 1.6vw, 20px);
        }

        .hero-h1 {
          font-family: ${MONO};
          font-size: clamp(64px, 12.5vw, 186px);
          font-weight: 700;
          text-transform: uppercase;
          color: ${C.ink};
          text-shadow: 0.018em 0 0 currentColor;
          line-height: 0.88;
          letter-spacing: -0.01em;
          margin: 0;
          opacity: 0;
          transform: translateY(-28px) scaleY(0.35);
          transform-origin: top center;
          animation:
            titleFromField 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) 3.3s forwards,
            stIdle 7.5s steps(2, end) 4.9s infinite;
        }

        .hero-addr {
          font-size: clamp(11px, 1.1vw, 16px);
          letter-spacing: 0.26em;
          font-weight: 700;
          text-transform: uppercase;
          color: ${C.pink};
          margin: 0;
          overflow: visible;
        }

        .tt-hero {
          display: inline-flex;
          white-space: nowrap;
          overflow: visible;
          padding-right: 0.72em;
          margin-right: -0.08em;
          clip-path: inset(0 100% 0 0);
          animation: typeIn 0.56s steps(33, end) 4.5s forwards;
        }

        .a-donut {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: clamp(18px, 2.8vh, 34px) clamp(20px, 4vw, 40px);
        }

        .donut-stage {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: clamp(8px, 1.5vh, 18px) 0;
          position: relative;
        }

        .donut-stage::after {
          content: '';
          position: absolute;
          bottom: clamp(8px, 1.6vh, 16px);
          left: 34%;
          right: 34%;
          height: 2px;
          background: radial-gradient(ellipse, rgba(28, 28, 26, 0.14), transparent 70%);
          filter: blur(6px);
          opacity: 0;
          transition: opacity 1.8s ease 1.8s;
        }

        .rs.iv .donut-stage::after {
          opacity: 1;
        }

        .donut-wrap {
          position: relative;
          width: min(42vw, 320px);
          aspect-ratio: 1.1 / 0.72;
          opacity: 0;
          transform: translateY(36px) scale(0.92);
          line-height: 0;
          pointer-events: none;
          user-select: none;
          filter: drop-shadow(0 0 8px rgba(212, 80, 122, 0.14));
        }

        .rs.iv .donut-wrap {
          animation:
            donutIn 1.7s cubic-bezier(0.22, 1, 0.36, 1) 0.18s forwards,
            donutFloat 8s ease-in-out 2s infinite;
        }

        .donut-wrap--second {
          width: min(36vw, 260px);
          aspect-ratio: 1 / 1;
        }

        .donut-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          opacity: 0;
          transform: scale(0.985);
          transition: opacity 0.34s ease, transform 0.34s ease;
        }

        .donut-img.is-visible {
          opacity: 1;
          transform: scale(1);
        }

        .donut-wrap.is-glitch .donut-img {
          filter: contrast(1.04) saturate(1.04);
        }

        .donut-wrap.is-glitch .donut-img.is-visible {
          transform: translateX(-4px) scale(1.008);
        }

        .donut-glitch-slice {
          position: absolute;
          left: 3%;
          right: 3%;
          height: 12%;
          opacity: 0;
          pointer-events: none;
          mix-blend-mode: multiply;
          background:
            linear-gradient(
              90deg,
              rgba(212, 80, 122, 0.16) 0%,
              rgba(232, 226, 212, 0.32) 46%,
              rgba(122, 120, 112, 0.16) 100%
            );
        }

        .dgs-a {
          top: 28%;
        }

        .dgs-b {
          top: 58%;
        }

        .donut-wrap.is-glitch .dgs-a {
          animation: donutGlitchSliceA 0.52s steps(1, end) forwards;
        }

        .donut-wrap.is-glitch .dgs-b {
          animation: donutGlitchSliceB 0.52s steps(1, end) forwards;
        }

        .a-space {
          padding: clamp(22px, 3vw, 38px) 0 clamp(40px, 4.7vw, 62px);
        }

        .st {
          font-family: ${MONO};
          font-weight: 700;
          text-transform: uppercase;
          color: ${C.ink};
          text-shadow: 0.018em 0 0 currentColor;
          line-height: 0.9;
          letter-spacing: 0;
          margin: 0;
          text-align: center;
          opacity: 0;
          clip-path: inset(0 100% 0 0);
          transform: translateX(-8px);
        }

        .rs.iv .st {
          animation:
            scanIn 0.52s steps(8, end) 0.24s forwards,
            stIdle 7.5s steps(2, end) 3.2s infinite;
        }

        .space-h2 {
          font-size: clamp(44px, 5.5vw, 86px);
          margin-bottom: clamp(6px, 1vw, 12px) !important;
        }

        .exp-h2 {
          font-size: clamp(38px, 4.8vw, 76px);
          margin-bottom: clamp(6px, 1vw, 12px) !important;
        }

        .section-lead {
          font-family: ${MONO};
          font-size: clamp(9px, 0.88vw, 11px);
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(28, 28, 26, 0.36);
          text-align: center;
          margin: 0 auto clamp(18px, 2.5vw, 30px);
          max-width: 520px;
          line-height: 1.8;
          opacity: 0;
          transform: translateY(5px);
        }

        .a-space.iv .section-lead,
        .a-exp.iv .section-lead {
          animation: leadIn 0.7s ease 0.72s forwards;
        }

        .venue-stage {
          position: relative;
          width: 100%;
          min-height: clamp(232px, 31vw, 440px);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .venue-stage::before {
          content: '';
          position: absolute;
          left: 9%;
          right: 9%;
          bottom: 10%;
          height: 14%;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(28, 28, 26, 0.12), transparent 72%);
          filter: blur(10px);
          opacity: 0;
          transform: rotate(-3deg) scaleX(0.7);
        }

        .a-space.iv .venue-stage::before {
          animation: shadowIn 0.7s ease 0.5s forwards;
        }

        .venue-wrap {
          position: relative;
          width: min(100%, 800px);
          aspect-ratio: 2048 / 1140;
          opacity: 0;
          transform: translateY(18px) scale(0.985);
        }

        .a-space.iv .venue-wrap {
          animation:
            venueIn 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) 0.35s forwards,
            venueFloat 5s ease-in-out 1.8s infinite;
        }

        .vi {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          pointer-events: none;
          user-select: none;
        }

        .v-base {
          z-index: 2;
          filter:
            saturate(0.78)
            contrast(1.02)
            drop-shadow(0 14px 24px rgba(28, 28, 26, 0.1))
            drop-shadow(0 28px 50px rgba(28, 28, 26, 0.07));
        }

        .v-hl {
          z-index: 4;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.18s, visibility 0.18s;
        }

        .v-hl.on {
          opacity: 1;
          visibility: visible;
        }

        .v-glitch {
          z-index: 5;
          opacity: 0;
          mix-blend-mode: multiply;
          pointer-events: none;
        }

        .a-space.iv .vg-a {
          filter: drop-shadow(0 0 10px rgba(212, 80, 122, 0.28)) hue-rotate(-16deg)
            saturate(1.2);
          animation: glitchA 8.5s steps(1, end) 2s infinite;
        }

        .a-space.iv .vg-b {
          filter: drop-shadow(0 0 10px rgba(122, 120, 112, 0.22)) hue-rotate(0deg)
            saturate(0.98);
          animation: glitchB 8.5s steps(1, end) 2s infinite;
        }

        .zone-nav {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
          margin-top: clamp(8px, 1vw, 16px);
        }

        .a-exp {
          padding: clamp(30px, 4.4vw, 58px) 0 clamp(80px, 10vw, 140px);
        }

        .sig {
          --sy: 60px;
          position: relative;
          width: 100%;
          height: clamp(100px, 13vw, 150px);
          margin-top: clamp(24px, 3vw, 38px);
          margin-bottom: clamp(14px, 1.8vw, 24px);
          overflow: visible;
        }

        .sig-track {
          position: absolute;
          left: 0;
          right: 0;
          top: var(--sy);
          height: 2px;
        }

        .sig-line,
        .sig-fill {
          position: absolute;
          inset: 0;
          height: 2px;
          transform-origin: left;
        }

        .sig-line {
          background: rgba(28, 28, 26, 0.18);
          transform: scaleX(0);
        }

        .sig-fill {
          background: linear-gradient(90deg, ${C.pink} 0%, rgba(212, 80, 122, 0.3) 100%);
          transform: scaleX(0);
          opacity: 0;
        }

        .a-exp.iv .sig-line {
          animation: sigLineIn 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) 0.3s forwards;
        }

        .a-exp.iv .sig-fill {
          animation: sigFillLoop 9.6s ease-in-out 1.2s infinite;
        }

        .sig-tick {
          position: absolute;
          top: -5px;
          width: 1px;
          height: 12px;
          background: rgba(28, 28, 26, 0.22);
          opacity: 0;
        }

        .a-exp.iv .sig-tick {
          animation: tickIn 0.4s ease 0.9s forwards;
        }

        .sig-node {
          position: absolute;
          top: 0;
          opacity: 0;
          transform: translateY(10px);
        }

        .sn-dining {
          left: 0;
        }

        .sn-dark {
          right: 0;
          text-align: right;
        }

        .a-exp.iv .sn-dining {
          animation: nodeIn 0.48s ease 0.6s forwards;
        }

        .a-exp.iv .sn-dark {
          animation: nodeIn 0.48s ease 0.8s forwards;
        }

        .sig-time {
          display: block;
          font-size: clamp(15px, 1.7vw, 22px);
          font-weight: 700;
          letter-spacing: 0.06em;
          line-height: 1;
          color: rgba(28, 28, 26, 0.72);
          white-space: nowrap;
          font-variant-numeric: tabular-nums;
          font-feature-settings: 'tnum';
          text-shadow: 0.012em 0 0 currentColor;
        }

        .sn-dining .sig-time {
          min-width: 156px;
          text-align: left;
        }

        .sn-dark .sig-time {
          min-width: 72px;
          text-align: right;
        }

        .a-exp.iv .sn-dining .sig-time {
          animation: timeDining 9.6s ease-in-out 1.2s infinite;
        }

        .a-exp.iv .sn-dark .sig-time {
          animation: timeDark 9.6s ease-in-out 1.2s infinite;
        }

        .sig-dot {
          position: absolute;
          top: var(--sy);
          width: 22px;
          height: 22px;
          border-radius: 999px;
          background: #8a8680;
          transform: translateY(-50%);
          z-index: 2;
          overflow: visible;
        }

        .sn-dining .sig-dot {
          left: -5px;
        }

        .sn-dark .sig-dot {
          right: -5px;
        }

        .sig-sonar {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1.5px solid rgba(28, 28, 26, 0.35);
          transform: scale(1);
          opacity: 0;
        }

        .a-exp.iv .sn-dining .sig-sonar {
          animation: sonarRing 3.2s ease-out 1s infinite;
        }

        .a-exp.iv .sn-dark .sig-sonar {
          animation: sonarRing 3.2s ease-out 1.7s infinite;
        }

        .sig-dot-fill {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: ${C.pink};
          opacity: 0;
        }

        .a-exp.iv .sn-dining .sig-dot-fill {
          animation: dotDining 9.6s ease-in-out 1.2s infinite;
        }

        .a-exp.iv .sn-dark .sig-dot-fill {
          animation: dotDark 9.6s ease-in-out 1.2s infinite;
        }

        .exp-nav {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .card {
          position: relative;
          min-height: clamp(82px, 7.4vw, 108px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 6px;
          padding: clamp(16px, 1.5vw, 22px) clamp(16px, 1.8vw, 24px);
          border: 1px solid transparent;
          background: rgba(232, 226, 212, 0.32);
          color: ${C.ink};
          text-decoration: none;
          box-shadow: 6px 6px 0 rgba(28, 28, 26, 0);
          overflow: hidden;
          opacity: 0;
          transform: translateY(12px);
          transition: transform 0.22s, background 0.22s, color 0.22s, box-shadow 0.22s;
        }

        .rs.iv .card {
          animation: cardIn 0.52s ease var(--card-delay, 300ms) forwards;
        }

        .card::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg, rgba(212, 80, 122, 0.14), transparent 42%),
            repeating-linear-gradient(90deg, rgba(28, 28, 26, 0.05) 0 1px, transparent 1px 11px);
          opacity: 0;
          transition: opacity 0.22s;
        }

        .card::after {
          content: '';
          position: absolute;
          inset: 0;
          border: 1px solid rgba(28, 28, 26, 0.44);
          pointer-events: none;
          clip-path: inset(0 100% 100% 0);
        }

        .rs.iv .card::after {
          animation: borderDraw 0.62s ease calc(var(--card-delay, 300ms) + 80ms) forwards;
        }

        .card-title {
          display: block;
          position: relative;
          z-index: 1;
          font-size: clamp(16px, 1.6vw, 25px);
          font-weight: 700;
          line-height: 0.95;
          text-transform: uppercase;
          text-shadow: 0.012em 0 0 currentColor;
        }

        .card-meta {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          position: relative;
          z-index: 1;
          color: rgba(28, 28, 26, 0.54);
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .card:hover,
        .card:focus-visible,
        .card.is-active {
          background: rgba(212, 80, 122, 0.09);
          box-shadow: 10px 10px 0 rgba(212, 80, 122, 0.12);
          transform: translate(-3px, -3px);
          outline: none;
        }

        .card:hover::before,
        .card:focus-visible::before,
        .card.is-active::before {
          opacity: 1;
        }

        .card:hover::after,
        .card:focus-visible::after,
        .card.is-active::after {
          border-color: rgba(212, 80, 122, 0.82);
        }

        .card.is-dark {
          background: ${C.ink};
          color: ${C.cream};
        }

        .card.is-dark .card-meta {
          color: rgba(232, 226, 212, 0.6);
        }

        .card.is-dark:hover,
        .card.is-dark:focus-visible {
          background: ${C.pink};
          color: ${C.cream};
        }

        @keyframes flankGrow {
          from {
            transform: scaleY(0);
          }
          to {
            transform: scaleY(1);
          }
        }

        @keyframes leadIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heroObeliskIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heroFieldIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @keyframes heroObeliskFloat {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes heroGlowBreath {
          0%,
          100% {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(0.98);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.05);
          }
        }

        @keyframes gridBreath {
          0%,
          100% {
            opacity: 0.56;
            transform: translate(-50%, -50%) perspective(1100px) rotateX(75deg) scale(0.98);
          }
          50% {
            opacity: 0.78;
            transform: translate(-50%, -50%) perspective(1100px) rotateX(75deg) scale(1.03);
          }
        }

        @keyframes gridBreathSoft {
          0%,
          100% {
            opacity: 0.32;
            transform: translate(-50%, -50%) perspective(1100px) rotateX(75deg) scale(0.99);
          }
          50% {
            opacity: 0.5;
            transform: translate(-50%, -50%) perspective(1100px) rotateX(75deg) scale(1.04);
          }
        }

        @keyframes mistDriftA {
          0%,
          100% {
            opacity: 0.38;
            transform: scale(1) translate3d(-2%, -1%, 0);
          }
          50% {
            opacity: 0.58;
            transform: scale(1.08) translate3d(3%, 2%, 0);
          }
        }

        @keyframes mistDriftB {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1) translate3d(2%, 1%, 0) rotate(0deg);
          }
          50% {
            opacity: 0.46;
            transform: scale(1.12) translate3d(-3%, -2%, 0) rotate(8deg);
          }
        }

        @keyframes floorShadowBreath {
          0%,
          100% {
            opacity: 0.15;
            transform: translate(-50%, -50%) scale(0.94);
          }
          50% {
            opacity: 0.24;
            transform: translate(-50%, -50%) scale(1.04);
          }
        }

        @keyframes heroBurstShift {
          0%,
          84%,
          100% {
            filter: none;
          }
          85% {
            filter: drop-shadow(-6px 0 0 rgba(212, 80, 122, 0.22));
          }
          86.5% {
            filter: drop-shadow(6px 0 0 rgba(232, 226, 212, 0.22));
          }
          88% {
            filter: none;
          }
        }

        @keyframes heroBurstShiftB {
          0%,
          84%,
          100% {
            filter: none;
          }
          85.5% {
            filter: drop-shadow(4px 0 0 rgba(212, 80, 122, 0.18));
          }
          87% {
            filter: drop-shadow(-4px 0 0 rgba(232, 226, 212, 0.16));
          }
          88.5% {
            filter: none;
          }
        }

        @keyframes heroBurstLinesA {
          0%,
          84%,
          100% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
            clip-path: inset(0 0 0 0);
          }
          85% {
            opacity: 0.72;
            transform: translate3d(-10px, 0, 0);
            clip-path: inset(12% 0 70% 0);
          }
          86.5% {
            opacity: 0.4;
            transform: translate3d(10px, 0, 0);
            clip-path: inset(42% 0 34% 0);
          }
          88.2% {
            opacity: 0.2;
            transform: translate3d(-6px, 0, 0);
            clip-path: inset(68% 0 10% 0);
          }
          89% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
            clip-path: inset(0 0 0 0);
          }
        }

        @keyframes heroBurstLinesB {
          0%,
          84%,
          100% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
            clip-path: inset(0 0 0 0);
          }
          85.2% {
            opacity: 0.46;
            transform: translate3d(8px, 0, 0);
            clip-path: inset(28% 0 46% 0);
          }
          87.2% {
            opacity: 0.24;
            transform: translate3d(-8px, 0, 0);
            clip-path: inset(58% 0 16% 0);
          }
          88.6% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
            clip-path: inset(0 0 0 0);
          }
        }

        @keyframes obeliskGhostPink {
          0%,
          84%,
          100% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
            filter: none;
          }
          85% {
            opacity: 0.24;
            transform: translate3d(-7px, 0, 0);
            filter: drop-shadow(0 0 0 rgba(212, 80, 122, 0.8))
              drop-shadow(-2px 0 0 rgba(212, 80, 122, 0.75));
          }
          86.4% {
            opacity: 0.1;
            transform: translate3d(-3px, 0, 0);
            filter: drop-shadow(-1px 0 0 rgba(212, 80, 122, 0.55));
          }
          87.6% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
            filter: none;
          }
        }

        @keyframes obeliskGhostCream {
          0%,
          84%,
          100% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
            filter: none;
          }
          85.6% {
            opacity: 0.18;
            transform: translate3d(7px, 0, 0);
            filter: drop-shadow(2px 0 0 rgba(232, 226, 212, 0.86));
          }
          86.9% {
            opacity: 0.08;
            transform: translate3d(3px, 0, 0);
            filter: drop-shadow(1px 0 0 rgba(232, 226, 212, 0.62));
          }
          88% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
            filter: none;
          }
        }

        @keyframes titleFromField {
          0% {
            opacity: 0;
            transform: translateY(-28px) scaleY(0.35);
            filter: blur(2px);
          }
          60% {
            opacity: 1;
            transform: translateY(4px) scaleY(1.06);
            filter: blur(0);
          }
          80% {
            transform: translateY(-2px) scaleY(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scaleY(1);
            filter: blur(0);
          }
        }

        @keyframes scanIn {
          0% {
            opacity: 0;
            clip-path: inset(0 100% 0 0);
            transform: translateX(-8px);
            filter: blur(1.5px);
          }
          60% {
            opacity: 1;
            clip-path: inset(0 0 0 0);
            transform: translateX(0);
            filter: blur(0);
          }
          74% {
            transform: translateX(4px);
          }
          86% {
            transform: translateX(-2px);
          }
          100% {
            opacity: 1;
            clip-path: inset(0 0 0 0);
            transform: translateX(0);
            filter: blur(0);
          }
        }

        @keyframes stIdle {
          0%,
          84%,
          100% {
            filter: none;
            text-shadow: 0.018em 0 0 currentColor;
          }
          85% {
            filter: blur(0.4px);
            text-shadow:
              -0.08em 0 0 rgba(212, 80, 122, 0.9),
              0.08em 0 0 rgba(232, 226, 212, 0.92),
              0.018em 0 0 currentColor;
          }
          86.5% {
            filter: none;
            text-shadow:
              0.1em 0 0 rgba(212, 80, 122, 0.78),
              -0.09em 0 0 rgba(232, 226, 212, 0.76),
              0.018em 0 0 currentColor;
          }
          88% {
            filter: blur(0.3px);
            text-shadow:
              -0.06em -0.02em 0 rgba(212, 80, 122, 0.85),
              0.07em 0.02em 0 rgba(232, 226, 212, 0.84),
              0.018em 0 0 currentColor;
          }
          89.5% {
            filter: none;
            text-shadow: 0.018em 0 0 currentColor;
          }
          91% {
            filter: none;
            text-shadow:
              0.06em 0 0 rgba(212, 80, 122, 0.6),
              -0.05em 0 0 rgba(122, 120, 112, 0.62),
              0.018em 0 0 currentColor;
          }
          92.5% {
            filter: none;
            text-shadow: 0.018em 0 0 currentColor;
          }
        }

        @keyframes typeIn {
          to {
            clip-path: inset(0 0 0 0);
          }
        }

        @keyframes donutIn {
          0% {
            opacity: 0;
            transform: translateY(36px) scale(0.92);
          }
          66% {
            opacity: 1;
            transform: translateY(-3px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes donutFloat {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(0.35deg);
          }
        }

        @keyframes donutGlitchSliceA {
          0% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
          }
          30% {
            opacity: 0.7;
            transform: translate3d(-10px, 0, 0);
          }
          60% {
            opacity: 0.34;
            transform: translate3d(8px, 0, 0);
          }
          100% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes donutGlitchSliceB {
          0% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
          }
          36% {
            opacity: 0.44;
            transform: translate3d(8px, 0, 0);
          }
          70% {
            opacity: 0.18;
            transform: translate3d(-6px, 0, 0);
          }
          100% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes shadowIn {
          to {
            opacity: 0.34;
            transform: rotate(-3deg) scaleX(1);
          }
        }

        @keyframes venueIn {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes venueFloat {
          0%,
          100% {
            transform: translateY(0) rotate(-0.15deg);
          }
          50% {
            transform: translateY(-9px) rotate(0.22deg);
          }
        }

        @keyframes glitchA {
          0%,
          72%,
          100% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
            clip-path: inset(0 0 0 0);
          }
          73% {
            opacity: 0.18;
            transform: translate3d(-8px, -3px, 0);
            clip-path: inset(0% 0 82% 0);
          }
          74% {
            opacity: 0.2;
            transform: translate3d(10px, 4px, 0);
            clip-path: inset(18% 0 56% 0);
          }
          76% {
            opacity: 0.16;
            transform: translate3d(8px, 5px, 0);
            clip-path: inset(54% 0 14% 0);
          }
          78% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
            clip-path: inset(0 0 0 0);
          }
        }

        @keyframes glitchB {
          0%,
          72%,
          100% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
            clip-path: inset(0 0 0 0);
          }
          73.2% {
            opacity: 0.12;
            transform: translate3d(7px, 5px, 0);
            clip-path: inset(8% 0 72% 0);
          }
          74.8% {
            opacity: 0.14;
            transform: translate3d(-8px, -3px, 0);
            clip-path: inset(26% 0 44% 0);
          }
          76.4% {
            opacity: 0.1;
            transform: translate3d(4px, -5px, 0);
            clip-path: inset(62% 0 8% 0);
          }
          78% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
            clip-path: inset(0 0 0 0);
          }
        }

        @keyframes sigLineIn {
          to {
            transform: scaleX(1);
          }
        }

        @keyframes sigFillLoop {
          0%,
          17% {
            transform: scaleX(0);
            opacity: 0;
          }
          22% {
            transform: scaleX(0);
            opacity: 1;
          }
          56% {
            transform: scaleX(1);
            opacity: 1;
          }
          72%,
          100% {
            transform: scaleX(1);
            opacity: 0;
          }
        }

        @keyframes tickIn {
          to {
            opacity: 1;
          }
        }

        @keyframes nodeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes sonarRing {
          0% {
            transform: scale(1);
            opacity: 0.55;
          }
          75% {
            transform: scale(3.2);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }

        @keyframes dotDining {
          0%,
          17% {
            opacity: 0;
          }
          22%,
          62% {
            opacity: 1;
          }
          78%,
          100% {
            opacity: 0;
          }
        }

        @keyframes dotDark {
          0%,
          47% {
            opacity: 0;
          }
          56%,
          70% {
            opacity: 1;
          }
          84%,
          100% {
            opacity: 0;
          }
        }

        @keyframes timeDining {
          0%,
          17% {
            color: rgba(28, 28, 26, 0.72);
            filter: none;
          }
          22%,
          62% {
            color: ${C.pink};
            filter: drop-shadow(0 0 4px rgba(212, 80, 122, 0.18));
          }
          78%,
          100% {
            color: rgba(28, 28, 26, 0.72);
            filter: none;
          }
        }

        @keyframes timeDark {
          0%,
          47% {
            color: rgba(28, 28, 26, 0.72);
            filter: none;
            transform: translateX(0);
          }
          50% {
            color: ${C.pink};
            filter: drop-shadow(0 0 4px rgba(212, 80, 122, 0.22));
            transform: translateX(-2px);
          }
          52% {
            transform: translateX(2px);
          }
          56%,
          70% {
            color: ${C.pink};
            filter: drop-shadow(0 0 4px rgba(212, 80, 122, 0.22));
            transform: translateX(0);
          }
          84%,
          100% {
            color: rgba(28, 28, 26, 0.72);
            filter: none;
            transform: translateX(0);
          }
        }

        @keyframes cardIn {
          to {
            opacity: 1;
            transform: translateY(0);
            box-shadow: 6px 6px 0 rgba(28, 28, 26, 0.07);
          }
        }

        @keyframes borderDraw {
          0% {
            clip-path: inset(0 100% 100% 0);
          }
          45% {
            clip-path: inset(0 0 100% 0);
          }
          100% {
            clip-path: inset(0 0 0 0);
          }
        }

        @media (max-width: 1280px) {
          .shell {
            width: 76%;
          }
        }

        @media (max-width: 980px) {
          .shell {
            width: 86%;
          }

          .zone-nav {
            grid-template-columns: 1fr;
          }

          .hero-obelisk-img {
            height: clamp(280px, 40svh, 420px);
          }

          .hero-field {
            width: clamp(480px, 66svh, 680px);
            height: clamp(360px, 48svh, 520px);
          }

          .donut-wrap {
            width: min(54vw, 320px);
          }

          .donut-wrap--second {
            width: min(44vw, 250px);
          }
        }

        @media (max-width: 820px) {
          .bg-tex {
            background-size: cover;
            background-repeat: no-repeat;
          }

          .shell {
            width: calc(100% - 40px);
            max-width: none;
          }

          .a-hero {
            padding-top: 96px;
          }

          .hero-obelisk-img {
            height: clamp(250px, 34svh, 350px);
          }

          .hero-field {
            width: clamp(360px, 54svh, 520px);
            height: clamp(300px, 40svh, 420px);
          }

          .hero-h1 {
            font-size: clamp(50px, 13vw, 86px);
          }

          .donut-wrap {
            width: min(66vw, 280px);
          }

          .donut-wrap--second {
            width: min(52vw, 210px);
          }

          .sig {
            --sy: 50px;
            height: clamp(90px, 12vw, 130px);
          }

          .sig-time {
            font-size: clamp(15px, 3.6vw, 20px);
          }

          .exp-nav {
            gap: 10px;
          }

          .section-lead {
            font-size: clamp(8px, 2.2vw, 10px);
          }
        }

        @media (max-width: 520px) {
          .shell {
            width: calc(100% - 28px);
          }

          .a-hero {
            padding-top: 88px;
          }

          .hero-obelisk-img {
            height: clamp(220px, 30svh, 300px);
          }

          .hero-field {
            width: clamp(300px, 46svh, 410px);
            height: clamp(250px, 34svh, 330px);
          }

          .hero-h1 {
            font-size: clamp(44px, 12.5vw, 68px);
          }

          .donut-wrap {
            width: min(74vw, 230px);
          }

          .donut-wrap--second {
            width: min(60vw, 180px);
          }

          .exp-nav {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .sig {
            --sy: 46px;
          }

          .sig-time {
            font-size: clamp(14px, 3.4vw, 18px);
          }

          .sn-dining .sig-time {
            min-width: 132px;
          }

          .sn-dark .sig-time {
            min-width: 60px;
          }
        }

        @media (max-width: 380px) {
          .card-title {
            font-size: 16px;
          }

          .sig-time {
            font-size: 14px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .curtain {
            transition: none !important;
            opacity: 0;
          }

          .hero-obelisk-drop,
          .hero-obelisk-stack,
          .hero-glow,
          .hero-mist,
          .hero-grid-plane,
          .hero-burst-lines,
          .hero-shadow-floor,
          .hero-obelisk-ghost,
          .hero-h1,
          .tt-hero,
          .st,
          .flank-line,
          .donut-wrap,
          .donut-glitch-slice,
          .venue-wrap,
          .vg-a,
          .vg-b,
          .v-hl.on,
          .sig-line,
          .sig-fill,
          .sig-tick,
          .sig-node,
          .sig-sonar,
          .sig-dot-fill,
          .sig-time,
          .section-lead,
          .card,
          .card::after {
            animation: none !important;
            transition: none !important;
          }

          .par-wrap {
            transition: none !important;
          }

          .flank-line {
            transform: none;
          }

          .hero-obelisk-drop,
          .donut-wrap {
            opacity: 1;
            transform: none;
          }

          .hero-glow,
          .hero-mist,
          .hero-grid-plane,
          .hero-shadow-floor {
            opacity: 1;
          }

          .hero-h1 {
            opacity: 1;
            transform: none;
          }

          .st {
            opacity: 1;
            clip-path: inset(0 0 0 0);
            transform: none;
          }

          .tt-hero {
            clip-path: inset(0 0 0 0);
          }

          .venue-wrap,
          .sig-node,
          .card {
            opacity: 1;
            transform: none;
          }

          .sig-line {
            transform: none;
          }

          .card::after {
            clip-path: inset(0 0 0 0);
          }

          .section-lead {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </>
  );
}

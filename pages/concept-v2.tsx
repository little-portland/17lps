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
type DonutPhase = 'top' | 'straight' | 'bottom';

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

  const [topDonutPhase, setTopDonutPhase] = useState<DonutPhase>('top');
  const [bottomDonutPhase, setBottomDonutPhase] = useState<DonutPhase>('bottom');
  const [topDonutGlitch, setTopDonutGlitch] = useState(false);
  const [bottomDonutGlitch, setBottomDonutGlitch] = useState(false);

  const obeliskParRef = useRef<HTMLDivElement>(null);
  const topDonutParRef = useRef<HTMLDivElement>(null);
  const bottomDonutParRef = useRef<HTMLDivElement>(null);

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

        if (topDonutParRef.current) {
          topDonutParRef.current.style.transform = `translate(${x * 9}px, ${y * 7}px)`;
        }

        if (bottomDonutParRef.current) {
          bottomDonutParRef.current.style.transform = `translate(${x * -9}px, ${y * -7}px)`;
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
    let timers: number[] = [];
    let forward = true;

    const scheduleCycle = (holdMs = 7600) => {
      timers.push(
        window.setTimeout(() => {
          setTopDonutGlitch(true);
          setBottomDonutGlitch(true);

          timers.push(
            window.setTimeout(() => {
              setTopDonutPhase('straight');
              setBottomDonutPhase('straight');
            }, 70)
          );

          timers.push(
            window.setTimeout(() => {
              setTopDonutPhase(forward ? 'bottom' : 'top');
              setBottomDonutPhase(forward ? 'top' : 'bottom');
            }, 230)
          );

          timers.push(
            window.setTimeout(() => {
              setTopDonutGlitch(false);
              setBottomDonutGlitch(false);
              forward = !forward;
              scheduleCycle(7600);
            }, 500)
          );
        }, holdMs)
      );
    };

    scheduleCycle(7600);

    return () => {
      timers.forEach(t => window.clearTimeout(t));
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
                  <span className="hero-back-aura" />
                  <span className="hero-rear-fog hero-rear-fog-a" />
                  <span className="hero-rear-fog hero-rear-fog-b" />
                  <span className="hero-base-rings" />
                  <span className="hero-base-circle" />
                  <span className="hero-base-glow" />
                  <span className="hero-shadow-floor" />
                  <span className="hero-front-fog hero-front-fog-a" />
                  <span className="hero-front-fog hero-front-fog-b" />
                  <span className="hero-burst-lines hero-burst-lines-a" />
                  <span className="hero-burst-lines hero-burst-lines-b" />
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

                <span className="hero-front-atmosphere" />
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
              ref={topDonutParRef}
              className={`par-wrap donut-wrap ${topDonutGlitch ? 'is-glitch' : ''}`}
            >
              <img
                src={IMG.donutTop}
                alt=""
                className={`donut-img donut-view-top ${topDonutPhase === 'top' ? 'is-visible' : ''}`}
                draggable={false}
              />
              <img
                src={IMG.donutStraight}
                alt=""
                className={`donut-img donut-view-straight ${topDonutPhase === 'straight' ? 'is-visible' : ''}`}
                draggable={false}
              />
              <img
                src={IMG.donutBottom}
                alt=""
                className={`donut-img donut-view-bottom ${topDonutPhase === 'bottom' ? 'is-visible' : ''}`}
                draggable={false}
              />

              <img
                src={IMG.donutTop}
                alt=""
                className={`donut-img donut-ghost donut-ghost-top ${topDonutGlitch ? 'is-active' : ''}`}
                draggable={false}
              />
              <img
                src={IMG.donutBottom}
                alt=""
                className={`donut-img donut-ghost donut-ghost-bottom ${topDonutGlitch ? 'is-active' : ''}`}
                draggable={false}
              />

              <span className="donut-glitch-slice dgs-a" />
              <span className="donut-glitch-slice dgs-b" />
              <span className="donut-glitch-slice dgs-c" />
              <span className="donut-signal-line" />
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
              ref={bottomDonutParRef}
              className={`par-wrap donut-wrap ${bottomDonutGlitch ? 'is-glitch' : ''}`}
            >
              <img
                src={IMG.donutTop}
                alt=""
                className={`donut-img donut-view-top ${bottomDonutPhase === 'top' ? 'is-visible' : ''}`}
                draggable={false}
              />
              <img
                src={IMG.donutStraight}
                alt=""
                className={`donut-img donut-view-straight ${bottomDonutPhase === 'straight' ? 'is-visible' : ''}`}
                draggable={false}
              />
              <img
                src={IMG.donutBottom}
                alt=""
                className={`donut-img donut-view-bottom ${bottomDonutPhase === 'bottom' ? 'is-visible' : ''}`}
                draggable={false}
              />

              <img
                src={IMG.donutTop}
                alt=""
                className={`donut-img donut-ghost donut-ghost-top ${bottomDonutGlitch ? 'is-active' : ''}`}
                draggable={false}
              />
              <img
                src={IMG.donutBottom}
                alt=""
                className={`donut-img donut-ghost donut-ghost-bottom ${bottomDonutGlitch ? 'is-active' : ''}`}
                draggable={false}
              />

              <span className="donut-glitch-slice dgs-a" />
              <span className="donut-glitch-slice dgs-b" />
              <span className="donut-glitch-slice dgs-c" />
              <span className="donut-signal-line" />
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
          left: 50%;
          top: 50%;
          width: clamp(600px, 76svh, 900px);
          height: clamp(430px, 56svh, 670px);
          transform: translate(-50%, -50%) scale(0.94);
          z-index: 0;
          pointer-events: none;
          opacity: 0;
          animation: heroFieldContainerIn 1.7s cubic-bezier(0.22, 1, 0.36, 1) 2.3s forwards;
        }

        .hero-back-aura {
          position: absolute;
          left: 50%;
          top: 47%;
          width: 72%;
          height: 86%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background:
            radial-gradient(
              ellipse at center,
              rgba(212, 80, 122, 0.18) 0%,
              rgba(212, 80, 122, 0.1) 30%,
              rgba(232, 226, 212, 0.12) 50%,
              transparent 78%
            );
          filter: blur(23px);
          animation: heroAuraPulse 11s ease-in-out 4s infinite;
        }

        .hero-rear-fog {
          position: absolute;
          inset: 4%;
          border-radius: 50%;
          filter: blur(30px);
          pointer-events: none;
          opacity: 0.42;
        }

        .hero-rear-fog-a {
          background:
            radial-gradient(circle at 34% 42%, rgba(212, 80, 122, 0.21), transparent 25%),
            radial-gradient(circle at 60% 43%, rgba(232, 226, 212, 0.18), transparent 30%),
            radial-gradient(circle at 48% 65%, rgba(212, 80, 122, 0.14), transparent 32%);
          animation: rearFogA 13s ease-in-out 4.5s infinite;
        }

        .hero-rear-fog-b {
          background:
            radial-gradient(circle at 56% 53%, rgba(212, 80, 122, 0.16), transparent 29%),
            radial-gradient(circle at 42% 34%, rgba(122, 120, 112, 0.08), transparent 36%);
          animation: rearFogB 16s ease-in-out 4.8s infinite;
        }

        .hero-base-rings {
          position: absolute;
          left: 50%;
          top: 66%;
          width: 58%;
          height: 28%;
          border-radius: 50%;
          transform: translate(-50%, -50%) perspective(900px) rotateX(68deg);
          transform-origin: center;
          opacity: 0.64;
          background:
            repeating-radial-gradient(
              ellipse at 50% 50%,
              transparent 0 20px,
              rgba(212, 80, 122, 0.42) 21px 22px,
              transparent 23px 42px
            );
          filter: blur(0.25px) drop-shadow(0 0 6px rgba(212, 80, 122, 0.12));
          mask-image: radial-gradient(ellipse at center, #000 0%, #000 62%, transparent 82%);
          -webkit-mask-image: radial-gradient(
            ellipse at center,
            #000 0%,
            #000 62%,
            transparent 82%
          );
          animation:
            baseRingsPulse 8.5s ease-in-out 4.4s infinite,
            baseRingsGlitch 10s steps(1, end) 6.2s infinite;
        }

        .hero-base-circle {
          position: absolute;
          left: 50%;
          top: 66.5%;
          width: 48%;
          height: 18%;
          transform: translate(-50%, -50%) perspective(900px) rotateX(68deg);
          border-radius: 50%;
          background:
            radial-gradient(
              ellipse at center,
              rgba(212, 80, 122, 0.32) 0%,
              rgba(212, 80, 122, 0.18) 35%,
              rgba(232, 226, 212, 0.12) 52%,
              transparent 74%
            );
          filter: blur(13px);
          opacity: 0.86;
          animation: baseCirclePulse 8.2s ease-in-out 4.3s infinite;
        }

        .hero-base-glow {
          position: absolute;
          left: 50%;
          top: 68%;
          width: 30%;
          height: 12%;
          transform: translate(-50%, -50%);
          background:
            radial-gradient(
              ellipse,
              rgba(212, 80, 122, 0.28) 0%,
              rgba(232, 226, 212, 0.14) 38%,
              transparent 74%
            );
          filter: blur(12px);
          opacity: 0.82;
          animation: baseGlowPulse 8.5s ease-in-out 4.5s infinite;
        }

        .hero-shadow-floor {
          position: absolute;
          left: 50%;
          top: 69.5%;
          width: 26%;
          height: 9%;
          transform: translate(-50%, -50%);
          background: radial-gradient(ellipse, rgba(28, 28, 26, 0.2), transparent 72%);
          filter: blur(13px);
          opacity: 0.2;
          animation: floorShadowBreath 9s ease-in-out 4.6s infinite;
        }

        .hero-front-fog {
          position: absolute;
          pointer-events: none;
          border-radius: 50%;
          filter: blur(26px);
          opacity: 0.34;
          mix-blend-mode: multiply;
        }

        .hero-front-fog-a {
          left: 50%;
          top: 58%;
          width: 54%;
          height: 40%;
          transform: translate(-50%, -50%);
          background:
            radial-gradient(circle at 45% 56%, rgba(212, 80, 122, 0.16), transparent 36%),
            radial-gradient(circle at 58% 46%, rgba(232, 226, 212, 0.16), transparent 38%);
          animation: frontFogA 10s ease-in-out 4.6s infinite;
        }

        .hero-front-fog-b {
          left: 52%;
          top: 62%;
          width: 44%;
          height: 30%;
          transform: translate(-50%, -50%);
          background:
            radial-gradient(circle at 50% 50%, rgba(212, 80, 122, 0.15), transparent 42%);
          animation: frontFogB 12s ease-in-out 4.8s infinite;
        }

        .hero-front-atmosphere {
          position: absolute;
          left: 50%;
          top: 58%;
          width: 36%;
          height: 52%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          z-index: 8;
          pointer-events: none;
          opacity: 0.18;
          background:
            radial-gradient(circle at 52% 52%, rgba(212, 80, 122, 0.22), transparent 52%);
          filter: blur(18px);
          mix-blend-mode: multiply;
          animation: frontAtmosphereDrift 11s ease-in-out 4.4s infinite;
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
              rgba(212, 80, 122, 0.16) 18%,
              rgba(212, 80, 122, 0.16) 20%,
              transparent 20%,
              transparent 48%,
              rgba(232, 226, 212, 0.2) 48%,
              rgba(232, 226, 212, 0.2) 50%,
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
          mix-blend-mode: multiply;
        }

        .hero-obelisk-ghost-a {
          filter: brightness(0) saturate(100%) invert(47%) sepia(38%) saturate(1159%)
            hue-rotate(299deg) brightness(90%) contrast(91%);
          animation: obeliskGhostPink 7.5s steps(1, end) 4.9s infinite;
        }

        .hero-obelisk-ghost-b {
          filter: brightness(0) saturate(100%) invert(93%) sepia(9%) saturate(453%)
            hue-rotate(350deg) brightness(99%) contrast(84%);
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
          height: clamp(190px, 22vw, 300px);
          opacity: 0;
          transform: translateY(36px) scale(0.92);
          line-height: 0;
          pointer-events: none;
          user-select: none;
          filter: drop-shadow(0 0 8px rgba(212, 80, 122, 0.14));
          overflow: visible;
        }

        .rs.iv .donut-wrap {
          animation:
            donutIn 1.7s cubic-bezier(0.22, 1, 0.36, 1) 0.18s forwards,
            donutFloat 8s ease-in-out 2s infinite;
        }

        .donut-wrap::before,
        .donut-wrap::after {
          content: '';
          position: absolute;
          left: -8%;
          right: -8%;
          z-index: 7;
          opacity: 0;
          pointer-events: none;
          mix-blend-mode: multiply;
        }

        .donut-wrap::before {
          top: 22%;
          height: 18%;
          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(212, 80, 122, 0.32),
              rgba(232, 226, 212, 0.4),
              transparent
            );
        }

        .donut-wrap::after {
          top: 58%;
          height: 14%;
          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(232, 226, 212, 0.38),
              rgba(212, 80, 122, 0.26),
              transparent
            );
        }

        .donut-wrap.is-glitch::before {
          animation: donutBlockA 0.5s steps(1, end) forwards;
        }

        .donut-wrap.is-glitch::after {
          animation: donutBlockB 0.5s steps(1, end) forwards;
        }

        .donut-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          opacity: 0;
          transition:
            opacity 0.14s ease,
            transform 0.22s cubic-bezier(0.22, 1, 0.36, 1),
            filter 0.14s ease;
          will-change: opacity, transform, filter;
        }

        .donut-view-top {
          transform: translateY(-12px) scale(0.94) rotate(-1deg);
        }

        .donut-view-straight {
          transform: translateY(0) scaleX(1.08) scaleY(0.86);
          filter: blur(0.5px) contrast(1.05);
        }

        .donut-view-bottom {
          transform: translateY(12px) scale(0.94) rotate(1deg);
        }

        .donut-img.is-visible {
          opacity: 1;
        }

        .donut-view-top.is-visible {
          transform: translateY(-3px) scale(1);
        }

        .donut-view-straight.is-visible {
          transform: translateY(0) scaleX(1.1) scaleY(0.88);
        }

        .donut-view-bottom.is-visible {
          transform: translateY(3px) scale(1);
        }

        .donut-wrap.is-glitch .donut-img.is-visible {
          filter: contrast(1.16) saturate(1.12) blur(0.25px);
          animation: donutImageJitter 0.5s steps(1, end) forwards;
        }

        .donut-ghost {
          opacity: 0;
          z-index: 3;
          mix-blend-mode: multiply;
          pointer-events: none;
        }

        .donut-ghost-top {
          filter: brightness(0) saturate(100%) invert(47%) sepia(38%) saturate(1159%)
            hue-rotate(299deg) brightness(90%) contrast(91%);
        }

        .donut-ghost-bottom {
          filter: brightness(0) saturate(100%) invert(93%) sepia(9%) saturate(453%)
            hue-rotate(350deg) brightness(99%) contrast(84%);
        }

        .donut-ghost.is-active.donut-ghost-top {
          animation: donutGhostTop 0.5s steps(1, end) forwards;
        }

        .donut-ghost.is-active.donut-ghost-bottom {
          animation: donutGhostBottom 0.5s steps(1, end) forwards;
        }

        .donut-glitch-slice {
          position: absolute;
          left: 4%;
          right: 4%;
          height: 10%;
          opacity: 0;
          pointer-events: none;
          mix-blend-mode: multiply;
          z-index: 4;
          background:
            linear-gradient(
              90deg,
              rgba(212, 80, 122, 0.18) 0%,
              rgba(232, 226, 212, 0.36) 46%,
              rgba(122, 120, 112, 0.14) 100%
            );
        }

        .dgs-a {
          top: 24%;
        }

        .dgs-b {
          top: 51%;
        }

        .dgs-c {
          top: 70%;
          height: 7%;
        }

        .donut-wrap.is-glitch .dgs-a {
          animation: donutGlitchSliceA 0.5s steps(1, end) forwards;
        }

        .donut-wrap.is-glitch .dgs-b {
          animation: donutGlitchSliceB 0.5s steps(1, end) forwards;
        }

        .donut-wrap.is-glitch .dgs-c {
          animation: donutGlitchSliceC 0.5s steps(1, end) forwards;
        }

        .donut-signal-line {
          position: absolute;
          left: -4%;
          right: -4%;
          top: 50%;
          height: 1px;
          z-index: 8;
          opacity: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(212, 80, 122, 0.9),
            rgba(232, 226, 212, 0.95),
            rgba(212, 80, 122, 0.9),
            transparent
          );
          transform: translateY(-50%);
          pointer-events: none;
        }

        .donut-wrap.is-glitch .donut-signal-line {
          animation: donutSignalLine 0.5s steps(1, end) forwards;
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

        @keyframes heroFieldContainerIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
            filter: blur(8px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
            filter: blur(0);
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

        @keyframes heroAuraPulse {
          0%,
          100% {
            opacity: 0.74;
            transform: translate(-50%, -50%) scale(0.98);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.04);
          }
        }

        @keyframes rearFogA {
          0%,
          100% {
            opacity: 0.38;
            transform: scale(1) translate3d(-2%, -1%, 0);
          }
          50% {
            opacity: 0.62;
            transform: scale(1.1) translate3d(3%, 2%, 0);
          }
        }

        @keyframes rearFogB {
          0%,
          100% {
            opacity: 0.28;
            transform: scale(1) translate3d(2%, 1%, 0) rotate(0deg);
          }
          50% {
            opacity: 0.46;
            transform: scale(1.12) translate3d(-3%, -2%, 0) rotate(8deg);
          }
        }

        @keyframes baseRingsPulse {
          0%,
          100% {
            opacity: 0.5;
            transform: translate(-50%, -50%) perspective(900px) rotateX(68deg) scale(0.96);
          }
          50% {
            opacity: 0.74;
            transform: translate(-50%, -50%) perspective(900px) rotateX(68deg) scale(1.05);
          }
        }

        @keyframes baseRingsGlitch {
          0%,
          84%,
          100% {
            filter: blur(0.25px) drop-shadow(0 0 6px rgba(212, 80, 122, 0.12));
          }
          85% {
            filter: blur(0.3px) drop-shadow(-5px 0 0 rgba(212, 80, 122, 0.18));
          }
          86.5% {
            filter: blur(0.25px) drop-shadow(5px 0 0 rgba(232, 226, 212, 0.22));
          }
          88% {
            filter: blur(0.25px) drop-shadow(0 0 6px rgba(212, 80, 122, 0.12));
          }
        }

        @keyframes baseCirclePulse {
          0%,
          100% {
            opacity: 0.64;
            transform: translate(-50%, -50%) perspective(900px) rotateX(68deg) scale(0.94);
          }
          50% {
            opacity: 0.95;
            transform: translate(-50%, -50%) perspective(900px) rotateX(68deg) scale(1.08);
          }
        }

        @keyframes baseGlowPulse {
          0%,
          100% {
            opacity: 0.6;
            transform: translate(-50%, -50%) scale(0.94);
          }
          50% {
            opacity: 0.9;
            transform: translate(-50%, -50%) scale(1.08);
          }
        }

        @keyframes floorShadowBreath {
          0%,
          100% {
            opacity: 0.14;
            transform: translate(-50%, -50%) scale(0.94);
          }
          50% {
            opacity: 0.24;
            transform: translate(-50%, -50%) scale(1.04);
          }
        }

        @keyframes frontFogA {
          0%,
          100% {
            opacity: 0.26;
            transform: translate(-50%, -50%) scale(0.98);
          }
          50% {
            opacity: 0.44;
            transform: translate(-49%, -51%) scale(1.08);
          }
        }

        @keyframes frontFogB {
          0%,
          100% {
            opacity: 0.2;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.36;
            transform: translate(-52%, -49%) scale(1.12);
          }
        }

        @keyframes frontAtmosphereDrift {
          0%,
          100% {
            opacity: 0.14;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.24;
            transform: translate(-50%, -49%) scale(1.04);
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
            opacity: 0.58;
            transform: translate3d(-8px, 0, 0);
            clip-path: inset(12% 0 70% 0);
          }
          86.5% {
            opacity: 0.32;
            transform: translate3d(8px, 0, 0);
            clip-path: inset(42% 0 34% 0);
          }
          88.2% {
            opacity: 0.16;
            transform: translate3d(-5px, 0, 0);
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
            opacity: 0.34;
            transform: translate3d(7px, 0, 0);
            clip-path: inset(28% 0 46% 0);
          }
          87.2% {
            opacity: 0.2;
            transform: translate3d(-7px, 0, 0);
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
          }
          85% {
            opacity: 0.2;
            transform: translate3d(-6px, 0, 0);
          }
          86.4% {
            opacity: 0.09;
            transform: translate3d(-3px, 0, 0);
          }
          87.6% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes obeliskGhostCream {
          0%,
          84%,
          100% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
          }
          85.6% {
            opacity: 0.16;
            transform: translate3d(6px, 0, 0);
          }
          86.9% {
            opacity: 0.07;
            transform: translate3d(3px, 0, 0);
          }
          88% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
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

        @keyframes donutImageJitter {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          18% {
            transform: translate3d(-8px, -1px, 0) scale(1.018);
          }
          34% {
            transform: translate3d(7px, 1px, 0) scale(0.992);
          }
          52% {
            transform: translate3d(-5px, 0, 0) scale(1.01);
          }
          70% {
            transform: translate3d(4px, -1px, 0) scale(0.998);
          }
        }

        @keyframes donutGhostTop {
          0%,
          100% {
            opacity: 0;
            transform: translate3d(0, 0, 0) scale(1);
          }
          16% {
            opacity: 0.38;
            transform: translate3d(-12px, -2px, 0) scale(1.03);
          }
          34% {
            opacity: 0.18;
            transform: translate3d(10px, 1px, 0) scale(0.99);
          }
          56% {
            opacity: 0.24;
            transform: translate3d(-7px, 0, 0) scale(1.01);
          }
        }

        @keyframes donutGhostBottom {
          0%,
          100% {
            opacity: 0;
            transform: translate3d(0, 0, 0) scale(1);
          }
          20% {
            opacity: 0.32;
            transform: translate3d(12px, 2px, 0) scale(1.03);
          }
          40% {
            opacity: 0.16;
            transform: translate3d(-9px, -1px, 0) scale(0.99);
          }
          62% {
            opacity: 0.2;
            transform: translate3d(7px, 0, 0) scale(1.01);
          }
        }

        @keyframes donutBlockA {
          0%,
          100% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
            clip-path: inset(0 0 0 0);
          }
          18% {
            opacity: 0.75;
            transform: translate3d(-16px, 0, 0);
            clip-path: inset(0 0 35% 0);
          }
          42% {
            opacity: 0.38;
            transform: translate3d(12px, 0, 0);
            clip-path: inset(20% 0 12% 0);
          }
          66% {
            opacity: 0.22;
            transform: translate3d(-8px, 0, 0);
            clip-path: inset(42% 0 0 0);
          }
        }

        @keyframes donutBlockB {
          0%,
          100% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
            clip-path: inset(0 0 0 0);
          }
          24% {
            opacity: 0.52;
            transform: translate3d(14px, 0, 0);
            clip-path: inset(10% 0 28% 0);
          }
          48% {
            opacity: 0.28;
            transform: translate3d(-12px, 0, 0);
            clip-path: inset(30% 0 20% 0);
          }
          72% {
            opacity: 0.18;
            transform: translate3d(6px, 0, 0);
            clip-path: inset(48% 0 6% 0);
          }
        }

        @keyframes donutGlitchSliceA {
          0% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
          }
          18% {
            opacity: 0.78;
            transform: translate3d(-13px, 0, 0);
          }
          42% {
            opacity: 0.38;
            transform: translate3d(10px, 0, 0);
          }
          70% {
            opacity: 0.22;
            transform: translate3d(-6px, 0, 0);
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
          24% {
            opacity: 0.52;
            transform: translate3d(11px, 0, 0);
          }
          48% {
            opacity: 0.22;
            transform: translate3d(-9px, 0, 0);
          }
          74% {
            opacity: 0.18;
            transform: translate3d(6px, 0, 0);
          }
          100% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes donutGlitchSliceC {
          0% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
          }
          20% {
            opacity: 0.4;
            transform: translate3d(-7px, 0, 0);
          }
          48% {
            opacity: 0.58;
            transform: translate3d(14px, 0, 0);
          }
          78% {
            opacity: 0.18;
            transform: translate3d(-4px, 0, 0);
          }
          100% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes donutSignalLine {
          0%,
          100% {
            opacity: 0;
            transform: translateY(-50%) scaleX(0.15);
          }
          16% {
            opacity: 1;
            transform: translateY(-50%) scaleX(1.12);
          }
          34% {
            opacity: 0.38;
            transform: translateY(-50%) scaleX(0.62);
          }
          54% {
            opacity: 0.85;
            transform: translateY(-50%) scaleX(1.18);
          }
          76% {
            opacity: 0.26;
            transform: translateY(-50%) scaleX(0.8);
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
            width: clamp(470px, 64svh, 700px);
            height: clamp(360px, 48svh, 520px);
          }

          .donut-wrap {
            width: min(54vw, 320px);
            height: clamp(180px, 28vw, 290px);
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
            width: clamp(360px, 52svh, 520px);
            height: clamp(300px, 40svh, 420px);
          }

          .hero-h1 {
            font-size: clamp(50px, 13vw, 86px);
          }

          .donut-wrap {
            width: min(66vw, 280px);
            height: clamp(170px, 34vw, 260px);
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
            height: clamp(250px, 34svh, 340px);
          }

          .hero-h1 {
            font-size: clamp(44px, 12.5vw, 68px);
          }

          .donut-wrap {
            width: min(74vw, 230px);
            height: clamp(150px, 42vw, 220px);
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
          .hero-field,
          .hero-back-aura,
          .hero-rear-fog,
          .hero-base-rings,
          .hero-base-circle,
          .hero-base-glow,
          .hero-shadow-floor,
          .hero-front-fog,
          .hero-front-atmosphere,
          .hero-burst-lines,
          .hero-obelisk-ghost,
          .hero-h1,
          .tt-hero,
          .st,
          .flank-line,
          .donut-wrap,
          .donut-glitch-slice,
          .donut-signal-line,
          .donut-ghost,
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

          .hero-field,
          .hero-back-aura,
          .hero-rear-fog,
          .hero-base-rings,
          .hero-base-circle,
          .hero-base-glow,
          .hero-shadow-floor,
          .hero-front-fog,
          .hero-front-atmosphere {
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

'use client';

import Head from 'next/head';
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import SceneNav from '@components/SceneNav';

const C = { cream:'#E8E2D4', ink:'#1C1C1A', pink:'#D4507A', muted:'#7A7870' } as const;
const MONO = '"Space Mono", "Courier New", monospace';

type AreaId = 'tent' | 'chefs-studio' | 'studio';
type Area = { id: AreaId; title: string; href: string; highlight: string };

const IMG = {
  bg: '/images/concept/concept_bg.jpg',
  funnel: '/images/concept/grid_funel.svg',
  obelisk: '/images/concept/obelisk-dark-grey.svg',
  venue: '/images/concept/the-space-page-venue.png',
};

const AREAS: Area[] = [
  { id:'tent', title:'THE TENT', href:'/thetent-test', highlight:'/images/concept/tent-highlight.png' },
  { id:'chefs-studio', title:"CHEF'S STUDIO", href:'/chefstudio-test', highlight:'/images/concept/chefs-studio-highlight.png' },
  { id:'studio', title:'THE STUDIO', href:'/studio-test', highlight:'/images/concept/studio-highlight.png' },
];

const EXP = [
  { label:'Dining', href:'/food-test', dark:false },
  { label:'After Dark', href:'/theclub-test', dark:true },
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

function InlineSVG({
  src,
  className,
  draw = false,
}: {
  src: string;
  className?: string;
  draw?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [html, setHtml] = useState('');

  useEffect(() => {
    let alive = true;

    fetch(src)
      .then(r => (r.ok ? r.text() : Promise.reject(new Error('fetch failed'))))
      .then(txt => {
        if (alive && txt.includes('<svg')) setHtml(txt);
      })
      .catch(() => {
        if (alive) {
          setHtml(`<img src="${src}" alt="" style="width:100%;height:auto;display:block" />`);
        }
      });

    return () => {
      alive = false;
    };
  }, [src]);

  useEffect(() => {
    if (!draw || !ref.current) return;

    const shapes = ref.current.querySelectorAll<SVGGeometryElement>(
      'path, rect, line, polyline, polygon, circle, ellipse'
    );

    shapes.forEach(s => {
      try {
        const len = s.getTotalLength();
        if (len > 0) {
          s.style.strokeDasharray = String(len);
          s.style.strokeDashoffset = String(len);
          s.style.setProperty('--path-len', String(len));
        }
      } catch {
        // Ignore shapes without geometry.
      }
    });
  }, [html, draw]);

  return (
    <span
      ref={ref}
      className={className}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: html }}
    />
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

  const funnelParRef = useRef<HTMLDivElement>(null);
  const obeliskParRef = useRef<HTMLDivElement>(null);
  const gateParRef = useRef<HTMLDivElement>(null);

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

    const u = () => setTouch(mq.matches || window.innerWidth <= 900);

    u();

    mq.addEventListener('change', u);
    window.addEventListener('resize', u);

    return () => {
      mq.removeEventListener('change', u);
      window.removeEventListener('resize', u);
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

        if (funnelParRef.current) {
          funnelParRef.current.style.transform = `translate(${x * 10}px,${y * 8}px)`;
        }

        if (obeliskParRef.current) {
          obeliskParRef.current.style.transform = `translate(${x * 5}px,${y * 3}px)`;
        }

        if (gateParRef.current) {
          gateParRef.current.style.transform = `translate(${x * -8}px,${y * -6}px)`;
        }
      });
    };

    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [touch]);

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
                <div className="hero-portal" aria-hidden="true">
                  <span className="portal-mist portal-mist-a" />
                  <span className="portal-mist portal-mist-b" />
                  <span className="portal-grid portal-grid-a" />
                  <span className="portal-grid portal-grid-b" />
                  <span className="portal-ring portal-ring-a" />
                  <span className="portal-ring portal-ring-b" />
                  <span className="portal-axis portal-axis-v" />
                  <span className="portal-axis portal-axis-h" />
                  <span className="portal-dust" />
                </div>

                <img
                  src={IMG.obelisk}
                  alt=""
                  className="hero-obelisk-img"
                  draggable={false}
                />
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

        <section className="act a-monolith rs">
          <div className="flank-line flank-a" aria-hidden="true" />

          <div className="monolith-stage monolith-stage--funnel">
            <div ref={funnelParRef} className="par-wrap">
              <InlineSVG src={IMG.funnel} className="monolith-funnel" draw />
            </div>
          </div>

          <div className="flank-line flank-b" aria-hidden="true" />
        </section>

        <section className="act a-space rs" aria-labelledby="space-title">
          <div className="shell">
            <h2 id="space-title" className="st space-h2">The Space</h2>

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

        <section className="act a-gate rs" aria-hidden="true">
          <div className="flank-line flank-a" />

          <div className="gate-stage">
            <div className="wire-gate-wrap">
              <div ref={gateParRef} className="par-wrap">
                <div className="wire-gate">
                  <span className="wire-gate-rings" />
                  <span className="wire-gate-spokes" />
                  <span className="wire-gate-core" />
                  <span className="wire-gate-scan" />
                </div>
              </div>
            </div>
          </div>

          <div className="flank-line flank-b" />
        </section>

        <section className="act a-exp rs" aria-labelledby="exp-title">
          <div className="shell">
            <h2 id="exp-title" className="st exp-h2">The Experience</h2>

            <p className="section-lead">An evening composed with intention.</p>

            <div className="sig">
              <div className="sig-track">
                <div className="sig-line" />
                <div className="sig-fill" />
                <div className="sig-tick" style={{ left:'25%' }} />
                <div className="sig-tick" style={{ left:'50%' }} />
                <div className="sig-tick" style={{ left:'75%' }} />
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
          background: rgba(28,28,26,.1);
        }

        ::-webkit-scrollbar-thumb {
          background: ${C.ink};
          border: 2px solid rgba(232,226,212,.6);
          background-clip: content-box;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${C.pink};
          border: 2px solid rgba(232,226,212,.6);
          background-clip: content-box;
        }

        .scene-nav {
          z-index: 10020 !important;
          transition: background .3s, box-shadow .3s, backdrop-filter .3s !important;
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
          letter-spacing: .16em !important;
        }

        .scene-nav--space a.active,
        .scene-nav-mobile--space a.active,
        .scene-nav--space a[aria-current='page'],
        .scene-nav-mobile--space a[aria-current='page'] {
          color: ${C.pink} !important;
        }

        .scene-nav--space a.disabled,
        .scene-nav-mobile--space a.disabled {
          opacity: .4;
        }

        .scene-nav--space .scene-nav-burger span {
          background: ${C.ink} !important;
        }

        .scene-nav--space .scene-nav-logo img {
          filter: brightness(0) saturate(100%) invert(8%) sepia(5%) saturate(851%) hue-rotate(21deg) brightness(99%) contrast(91%);
        }

        .nav-shell.scrolled .scene-nav.scene-nav--space {
          background: rgba(232,226,212,.52) !important;
          border-bottom: 1px solid rgba(28,28,26,.12);
          box-shadow: 0 8px 24px rgba(28,28,26,.06);
          backdrop-filter: blur(18px) !important;
          -webkit-backdrop-filter: blur(18px) !important;
        }

        .scene-nav-mobile.scene-nav--space,
        .scene-nav-mobile--space {
          background: rgba(232,226,212,.92) !important;
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
            background: rgba(232,226,212,.9) !important;
            backdrop-filter: blur(22px) !important;
            -webkit-backdrop-filter: blur(22px) !important;
          }

          .nav-shell:has(.scene-nav-burger[aria-expanded='true']) .scene-nav-mobile a,
          .nav-shell:has(button[aria-expanded='true']) .scene-nav-mobile a {
            display: block !important;
            color: ${C.ink} !important;
            opacity: 1 !important;
            font-size: clamp(16px,4.7vw,24px) !important;
            letter-spacing: .16em !important;
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
          transition: opacity .8s ease, transform .8s cubic-bezier(.2,.8,.2,1);
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
          opacity: .45;
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
          background: #0B0906;
          pointer-events: none;
          opacity: 1;
          transition: opacity 2.1s cubic-bezier(.4,0,.2,1);
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
            rgba(28,28,26,.013) 3px,
            rgba(28,28,26,.013) 4px
          );
          mix-blend-mode: multiply;
        }

        .par-wrap {
          transition: transform 0.72s cubic-bezier(.25,.46,.45,.94);
          will-change: transform;
        }

        .flank-line {
          width: 1px;
          height: clamp(82px, 10vh, 128px);
          margin: 0 auto;
          transform: scaleY(0);
        }

        .flank-a {
          background: linear-gradient(to bottom, transparent 0%, rgba(28,28,26,.42) 100%);
          transform-origin: bottom;
        }

        .flank-b {
          background: linear-gradient(to bottom, rgba(28,28,26,.42) 0%, transparent 100%);
          transform-origin: top;
        }

        .rs.iv .flank-a {
          animation: flankGrow 1.1s cubic-bezier(.25,.8,.25,1) .3s forwards;
        }

        .rs.iv .flank-b {
          animation: flankGrow 1.1s cubic-bezier(.25,.8,.25,1) .72s forwards;
        }

        .a-hero {
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: clamp(88px,10vw,120px) clamp(20px,5vw,60px) clamp(54px,6vw,78px);
        }

        .hero-obelisk-drop {
          display: flex;
          justify-content: center;
          margin-bottom: clamp(18px,2.8vw,30px);
          opacity: 0;
          transform: translateY(-80px);
          animation: heroObeliskIn 1.65s cubic-bezier(.22,1,.36,1) 2.1s forwards;
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

        .hero-portal {
          position: absolute;
          left: 50%;
          top: 50%;
          width: clamp(520px, 72svh, 820px);
          aspect-ratio: 1;
          z-index: 0;
          pointer-events: none;
          transform: translate(-50%, -50%) scale(.9);
          opacity: 0;
          animation:
            portalIn 1.6s cubic-bezier(.22,1,.36,1) 2.35s forwards,
            portalBreath 9s ease-in-out 4.2s infinite;
        }

        .hero-portal::before {
          content: '';
          position: absolute;
          inset: 7%;
          border-radius: 999px;
          background:
            radial-gradient(circle at 50% 50%,
              rgba(212,80,122,.36) 0%,
              rgba(212,80,122,.20) 22%,
              rgba(232,226,212,.22) 40%,
              rgba(28,28,26,.055) 58%,
              transparent 72%
            );
          filter: blur(24px);
          opacity: .95;
        }

        .hero-portal::after {
          content: '';
          position: absolute;
          inset: 17%;
          border-radius: 999px;
          background:
            conic-gradient(
              from 90deg,
              transparent 0deg,
              rgba(212,80,122,.34) 22deg,
              transparent 44deg,
              transparent 102deg,
              rgba(28,28,26,.18) 126deg,
              transparent 146deg,
              transparent 226deg,
              rgba(212,80,122,.26) 256deg,
              transparent 282deg,
              transparent 360deg
            );
          opacity: .56;
          animation:
            portalRotate 30s linear infinite,
            portalGlitch 10s steps(1,end) 6.2s infinite;
        }

        .portal-mist {
          position: absolute;
          inset: 5%;
          border-radius: 999px;
          filter: blur(24px);
          transform-origin: center;
        }

        .portal-mist-a {
          opacity: .58;
          background:
            radial-gradient(circle at 34% 48%, rgba(212,80,122,.26), transparent 34%),
            radial-gradient(circle at 63% 42%, rgba(232,226,212,.34), transparent 36%),
            radial-gradient(circle at 50% 72%, rgba(28,28,26,.10), transparent 38%);
          animation: mistDriftA 12s ease-in-out infinite;
        }

        .portal-mist-b {
          inset: 11%;
          opacity: .46;
          background:
            radial-gradient(circle at 58% 54%, rgba(212,80,122,.20), transparent 38%),
            radial-gradient(circle at 42% 34%, rgba(122,120,112,.16), transparent 42%);
          animation: mistDriftB 15s ease-in-out infinite;
        }

        .portal-grid {
          position: absolute;
          left: 50%;
          top: 52%;
          width: 82%;
          height: 54%;
          border-radius: 50%;
          transform-origin: center;
          mask-image: radial-gradient(ellipse at center, #000 0%, #000 62%, transparent 76%);
          -webkit-mask-image: radial-gradient(ellipse at center, #000 0%, #000 62%, transparent 76%);
        }

        .portal-grid-a {
          opacity: .52;
          background:
            repeating-radial-gradient(
              ellipse at 50% 50%,
              transparent 0 21px,
              rgba(212,80,122,.48) 22px 23px,
              transparent 24px 42px
            );
          transform: translate(-50%, -50%) perspective(620px) rotateX(68deg);
          animation: portalGridPulse 8s ease-in-out infinite;
        }

        .portal-grid-b {
          opacity: .34;
          background:
            repeating-conic-gradient(
              from -5deg at 50% 50%,
              rgba(28,28,26,.34) 0deg 1deg,
              transparent 1deg 10deg
            );
          transform: translate(-50%, -50%) perspective(620px) rotateX(68deg);
          animation: portalGridShift 18s linear infinite;
        }

        .portal-ring {
          position: absolute;
          inset: 13%;
          border-radius: 999px;
          transform-origin: center;
        }

        .portal-ring-a {
          opacity: .58;
          border: 1px solid rgba(212,80,122,.54);
          box-shadow:
            0 0 22px rgba(212,80,122,.16),
            inset 0 0 30px rgba(212,80,122,.06);
          animation:
            ringPulse 10s ease-in-out 4.4s infinite,
            portalGlitch 10s steps(1,end) 6.2s infinite;
        }

        .portal-ring-b {
          inset: 24%;
          opacity: .42;
          border: 1px dashed rgba(28,28,26,.28);
          transform: rotate(12deg);
          animation:
            ringCounter 24s linear infinite,
            portalGlitch 10s steps(1,end) 6.2s infinite;
        }

        .portal-axis {
          position: absolute;
          left: 50%;
          top: 50%;
          opacity: .36;
          transform: translate(-50%, -50%);
        }

        .portal-axis-v {
          width: 1px;
          height: 82%;
          background: linear-gradient(to bottom, transparent, rgba(212,80,122,.44), transparent);
        }

        .portal-axis-h {
          width: 78%;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(212,80,122,.34), transparent);
        }

        .portal-dust {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          opacity: .42;
          background-image:
            radial-gradient(circle, rgba(212,80,122,.42) 0 1px, transparent 1.5px),
            radial-gradient(circle, rgba(28,28,26,.22) 0 .8px, transparent 1.2px),
            radial-gradient(circle, rgba(232,226,212,.58) 0 1px, transparent 1.5px);
          background-size: 46px 46px, 68px 68px, 92px 92px;
          background-position: 0 0, 18px 28px, 44px 12px;
          mask-image: radial-gradient(circle at center, #000 0%, #000 46%, transparent 74%);
          -webkit-mask-image: radial-gradient(circle at center, #000 0%, #000 46%, transparent 74%);
          animation:
            dustDrift 18s linear infinite,
            dustGlitch 10s steps(1,end) 6.2s infinite;
        }

        .hero-obelisk-img {
          position: relative;
          z-index: 5;
          display: block;
          height: clamp(340px,48svh,540px);
          width: auto;
          pointer-events: none;
          user-select: none;
        }

        .hero-copy {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(12px,1.6vw,20px);
        }

        .hero-h1 {
          font-family: ${MONO};
          font-size: clamp(64px,12.5vw,186px);
          font-weight: 700;
          text-transform: uppercase;
          color: ${C.ink};
          text-shadow: .018em 0 0 currentColor;
          line-height: .88;
          letter-spacing: -.01em;
          margin: 0;
          opacity: 0;
          transform: translateY(-28px) scaleY(.35);
          transform-origin: top center;
          animation:
            titleFromFunnel .9s cubic-bezier(.34,1.56,.64,1) 3.3s forwards,
            stIdle 7.5s steps(2,end) 4.9s infinite;
        }

        .hero-addr {
          font-size: clamp(11px,1.1vw,16px);
          letter-spacing: .26em;
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
          padding-right: .72em;
          margin-right: -.08em;
          clip-path: inset(0 100% 0 0);
          animation: typeIn .56s steps(33,end) 4.5s forwards;
        }

        .a-monolith {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: clamp(14px,2.2vh,26px) clamp(20px,4vw,40px);
        }

        .monolith-stage {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          width: 100%;
          padding: clamp(6px,1.2vh,14px) 0;
          position: relative;
        }

        .monolith-stage::after {
          content: '';
          position: absolute;
          bottom: clamp(10px,1.6vh,18px);
          left: 34%;
          right: 34%;
          height: 2px;
          background: radial-gradient(ellipse, rgba(28,28,26,.14), transparent 70%);
          filter: blur(6px);
          opacity: 0;
          transition: opacity 1.8s ease 2.2s;
        }

        .a-monolith.iv .monolith-stage::after {
          opacity: 1;
        }

        .monolith-stage--funnel::after {
          left: 32%;
          right: 32%;
        }

        .monolith-funnel {
          display: block;
          line-height: 0;
          pointer-events: none;
          user-select: none;
          opacity: 0;
          transform: translateY(42px) scale(.92);
        }

        .a-monolith.iv .monolith-funnel {
          animation: monolithFunnelIn 2.1s cubic-bezier(.22,1,.36,1) .18s forwards;
        }

        .monolith-funnel svg {
          display: block;
          width: min(42vw, 320px);
          height: auto;
          overflow: visible;
        }

        .a-monolith.iv .monolith-funnel svg {
          animation:
            funnelFloat 7.1s ease-in-out 1.7s infinite,
            funnelRetro 11.4s ease-in-out 1.9s infinite;
        }

        .a-monolith.iv .monolith-funnel svg :is(path, rect, line, polyline, polygon, circle, ellipse) {
          animation: svgDraw 2.8s cubic-bezier(.55,.06,.2,1) .42s forwards;
        }

        .a-space {
          padding: clamp(22px,3vw,38px) 0 clamp(40px,4.7vw,62px);
        }

        .st {
          font-family: ${MONO};
          font-weight: 700;
          text-transform: uppercase;
          color: ${C.ink};
          text-shadow: .018em 0 0 currentColor;
          line-height: .9;
          letter-spacing: 0;
          margin: 0;
          text-align: center;
          opacity: 0;
          clip-path: inset(0 100% 0 0);
          transform: translateX(-8px);
        }

        .rs.iv .st {
          animation: scanIn .52s steps(8,end) .24s forwards, stIdle 7.5s steps(2,end) 3.2s infinite;
        }

        .space-h2 {
          font-size: clamp(44px,5.5vw,86px);
          margin-bottom: clamp(6px,1vw,12px) !important;
        }

        .exp-h2 {
          font-size: clamp(38px,4.8vw,76px);
          margin-bottom: clamp(6px,1vw,12px) !important;
        }

        .section-lead {
          font-family: ${MONO};
          font-size: clamp(9px,.88vw,11px);
          letter-spacing: .22em;
          text-transform: uppercase;
          color: rgba(28,28,26,.36);
          text-align: center;
          margin: 0 auto clamp(18px,2.5vw,30px);
          max-width: 520px;
          line-height: 1.8;
          opacity: 0;
          transform: translateY(5px);
        }

        .a-space.iv .section-lead,
        .a-exp.iv .section-lead {
          animation: leadIn .7s ease .72s forwards;
        }

        .venue-stage {
          position: relative;
          width: 100%;
          min-height: clamp(232px,31vw,440px);
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
          background: radial-gradient(ellipse, rgba(28,28,26,.12), transparent 72%);
          filter: blur(10px);
          opacity: 0;
          transform: rotate(-3deg) scaleX(.7);
        }

        .a-space.iv .venue-stage::before {
          animation: shadowIn .7s ease .5s forwards;
        }

        .venue-wrap {
          position: relative;
          width: min(100%,800px);
          aspect-ratio: 2048/1140;
          opacity: 0;
          transform: translateY(18px) scale(.985);
        }

        .a-space.iv .venue-wrap {
          animation:
            venueIn .9s cubic-bezier(.2,.8,.2,1) .35s forwards,
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
            saturate(.78)
            contrast(1.02)
            drop-shadow(0 14px 24px rgba(28,28,26,.1))
            drop-shadow(0 28px 50px rgba(28,28,26,.07));
        }

        .v-hl {
          z-index: 4;
          opacity: 0;
          visibility: hidden;
          transition: opacity .18s, visibility .18s;
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
          filter: drop-shadow(0 0 10px rgba(212,80,122,.28)) hue-rotate(-16deg) saturate(1.2);
          animation: glitchA 8.5s steps(1,end) 2s infinite;
        }

        .a-space.iv .vg-b {
          filter: drop-shadow(0 0 10px rgba(122,120,112,.22)) hue-rotate(0deg) saturate(.98);
          animation: glitchB 8.5s steps(1,end) 2s infinite;
        }

        .zone-nav {
          display: grid;
          grid-template-columns: repeat(3,minmax(0,1fr));
          gap: 12px;
          margin-top: clamp(8px,1vw,16px);
        }

        .a-gate {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: clamp(22px,3.2vh,38px) clamp(20px,4vw,40px);
        }

        .gate-stage {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: clamp(10px,1.8vh,20px) 0;
        }

        .wire-gate-wrap {
          opacity: 0;
          transform: translateY(34px) scale(.88);
        }

        .a-gate.iv .wire-gate-wrap {
          animation: gateReveal 2.2s cubic-bezier(.2,.8,.2,1) .26s forwards;
        }

        .wire-gate {
          position: relative;
          width: min(46vw, 420px);
          height: clamp(170px, 21vw, 260px);
          pointer-events: none;
          user-select: none;
          filter: drop-shadow(0 0 10px rgba(212,80,122,.12));
        }

        .wire-gate-rings,
        .wire-gate-spokes,
        .wire-gate-core,
        .wire-gate-scan {
          position: absolute;
          inset: 0;
          display: block;
        }

        .wire-gate-rings {
          border-radius: 50%;
          opacity: .74;
          background:
            repeating-radial-gradient(
              ellipse at 50% 50%,
              transparent 0 19px,
              rgba(212,80,122,.58) 20px 21px,
              transparent 22px 38px
            );
          transform: perspective(620px) rotateX(66deg) scaleY(.78);
          mask-image: radial-gradient(ellipse at center, #000 0%, #000 62%, transparent 78%);
          -webkit-mask-image: radial-gradient(ellipse at center, #000 0%, #000 62%, transparent 78%);
          animation: wireGatePulse 7.2s ease-in-out infinite;
        }

        .wire-gate-spokes {
          border-radius: 50%;
          opacity: .44;
          background:
            repeating-conic-gradient(
              from -4deg at 50% 50%,
              rgba(28,28,26,.45) 0deg 1deg,
              transparent 1deg 10deg
            );
          transform: perspective(620px) rotateX(66deg) scaleY(.78);
          mask-image: radial-gradient(ellipse at center, #000 0%, #000 64%, transparent 78%);
          -webkit-mask-image: radial-gradient(ellipse at center, #000 0%, #000 64%, transparent 78%);
          animation: wireGateRotate 26s linear infinite;
        }

        .wire-gate-core {
          left: 38%;
          right: 38%;
          top: 38%;
          bottom: 38%;
          border-radius: 999px;
          background:
            radial-gradient(circle, rgba(28,28,26,.20), transparent 58%),
            radial-gradient(circle, rgba(212,80,122,.45), transparent 64%);
          opacity: .75;
          filter: blur(3px);
          animation: wireGateCore 5.8s ease-in-out infinite;
        }

        .wire-gate-scan {
          opacity: 0;
          background:
            linear-gradient(
              to bottom,
              transparent 0%,
              transparent 46%,
              rgba(212,80,122,.28) 46%,
              rgba(212,80,122,.28) 48%,
              transparent 48%,
              transparent 100%
            );
          transform: perspective(620px) rotateX(66deg) scaleY(.78);
          animation: wireGateGlitch 8.8s steps(1,end) 1.6s infinite;
        }

        .a-exp {
          padding: clamp(30px,4.4vw,58px) 0 clamp(80px,10vw,140px);
        }

        .sig {
          --sy: 60px;
          position: relative;
          width: 100%;
          height: clamp(100px,13vw,150px);
          margin-top: clamp(24px,3vw,38px);
          margin-bottom: clamp(14px,1.8vw,24px);
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
          background: rgba(28,28,26,.18);
          transform: scaleX(0);
        }

        .sig-fill {
          background: linear-gradient(90deg, ${C.pink} 0%, rgba(212,80,122,.3) 100%);
          transform: scaleX(0);
          opacity: 0;
        }

        .a-exp.iv .sig-line {
          animation: sigLineIn .8s cubic-bezier(.25,.8,.25,1) .3s forwards;
        }

        .a-exp.iv .sig-fill {
          animation: sigFillLoop 9.6s ease-in-out 1.2s infinite;
        }

        .sig-tick {
          position: absolute;
          top: -5px;
          width: 1px;
          height: 12px;
          background: rgba(28,28,26,.22);
          opacity: 0;
        }

        .a-exp.iv .sig-tick {
          animation: tickIn .4s ease .9s forwards;
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
          animation: nodeIn .48s ease .6s forwards;
        }

        .a-exp.iv .sn-dark {
          animation: nodeIn .48s ease .8s forwards;
        }

        .sig-time {
          display: block;
          font-size: clamp(15px,1.7vw,22px);
          font-weight: 700;
          letter-spacing: .06em;
          line-height: 1;
          color: rgba(28,28,26,.72);
          white-space: nowrap;
          font-variant-numeric: tabular-nums;
          font-feature-settings: "tnum";
          text-shadow: .012em 0 0 currentColor;
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
          background: #8A8680;
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
          border: 1.5px solid rgba(28,28,26,.35);
          transform: scale(1);
          opacity: 0;
        }

        .a-exp.iv .sn-dining .sig-sonar {
          animation: sonarRing 3.2s ease-out 1.0s infinite;
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
          grid-template-columns: repeat(2,minmax(0,1fr));
          gap: 14px;
        }

        .card {
          position: relative;
          min-height: clamp(82px,7.4vw,108px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 6px;
          padding: clamp(16px,1.5vw,22px) clamp(16px,1.8vw,24px);
          border: 1px solid transparent;
          background: rgba(232,226,212,.32);
          color: ${C.ink};
          text-decoration: none;
          box-shadow: 6px 6px 0 rgba(28,28,26,0);
          overflow: hidden;
          opacity: 0;
          transform: translateY(12px);
          transition: transform .22s, background .22s, color .22s, box-shadow .22s;
        }

        .rs.iv .card {
          animation: cardIn .52s ease var(--card-delay,300ms) forwards;
        }

        .card::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg,rgba(212,80,122,.14),transparent 42%),
            repeating-linear-gradient(90deg,rgba(28,28,26,.05) 0 1px,transparent 1px 11px);
          opacity: 0;
          transition: opacity .22s;
        }

        .card::after {
          content: '';
          position: absolute;
          inset: 0;
          border: 1px solid rgba(28,28,26,.44);
          pointer-events: none;
          clip-path: inset(0 100% 100% 0);
        }

        .rs.iv .card::after {
          animation: borderDraw .62s ease calc(var(--card-delay,300ms) + 80ms) forwards;
        }

        .card-title {
          display: block;
          position: relative;
          z-index: 1;
          font-size: clamp(16px,1.6vw,25px);
          font-weight: 700;
          line-height: .95;
          text-transform: uppercase;
          text-shadow: .012em 0 0 currentColor;
        }

        .card-meta {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          position: relative;
          z-index: 1;
          color: rgba(28,28,26,.54);
          font-size: 10px;
          letter-spacing: .18em;
          text-transform: uppercase;
        }

        .card:hover,
        .card:focus-visible,
        .card.is-active {
          background: rgba(212,80,122,.09);
          box-shadow: 10px 10px 0 rgba(212,80,122,.12);
          transform: translate(-3px,-3px);
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
          border-color: rgba(212,80,122,.82);
        }

        .card.is-dark {
          background: ${C.ink};
          color: ${C.cream};
        }

        .card.is-dark .card-meta {
          color: rgba(232,226,212,.6);
        }

        .card.is-dark:hover,
        .card.is-dark:focus-visible {
          background: ${C.pink};
          color: ${C.cream};
        }

        @keyframes flankGrow {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }

        @keyframes leadIn {
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes heroObeliskIn {
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes heroObeliskFloat {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @keyframes portalIn {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(.82);
            filter: blur(12px);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
            filter: blur(0);
          }
        }

        @keyframes portalBreath {
          0%,100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: .88;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.06);
            opacity: 1;
          }
        }

        @keyframes portalRotate {
          to { transform: rotate(360deg); }
        }

        @keyframes portalGlitch {
          0%,4%,14%,100% {
            filter: none;
            opacity: .56;
          }
          5% {
            filter: drop-shadow(5px 0 0 rgba(232,226,212,.55));
            opacity: .82;
          }
          6% {
            filter: drop-shadow(-5px 0 0 rgba(212,80,122,.45));
            opacity: .62;
          }
          8% {
            filter: none;
            opacity: .72;
          }
        }

        @keyframes mistDriftA {
          0%,100% { transform: translate3d(-2%, -1%, 0) scale(1); opacity: .54; }
          50% { transform: translate3d(3%, 2%, 0) scale(1.1); opacity: .72; }
        }

        @keyframes mistDriftB {
          0%,100% { transform: translate3d(2%, 1%, 0) rotate(0deg) scale(1); opacity: .40; }
          50% { transform: translate3d(-3%, -2%, 0) rotate(9deg) scale(1.14); opacity: .58; }
        }

        @keyframes portalGridPulse {
          0%,100% {
            opacity: .40;
            transform: translate(-50%, -50%) perspective(620px) rotateX(68deg) scale(.96);
          }
          50% {
            opacity: .68;
            transform: translate(-50%, -50%) perspective(620px) rotateX(68deg) scale(1.04);
          }
        }

        @keyframes portalGridShift {
          to {
            transform: translate(-50%, -50%) perspective(620px) rotateX(68deg) rotate(360deg);
          }
        }

        @keyframes ringPulse {
          0%,100% {
            opacity: .46;
            transform: scale(.96);
          }
          50% {
            opacity: .72;
            transform: scale(1.04);
          }
        }

        @keyframes ringCounter {
          to { transform: rotate(-348deg); }
        }

        @keyframes dustDrift {
          to {
            background-position: 56px 56px, -54px 100px, 140px -84px;
          }
        }

        @keyframes dustGlitch {
          0%,4%,15%,100% {
            opacity: .42;
            transform: translate3d(0,0,0);
          }
          5% {
            opacity: .72;
            transform: translate3d(-6px,2px,0);
          }
          7% {
            opacity: .24;
            transform: translate3d(5px,-2px,0);
          }
          9% {
            opacity: .52;
            transform: translate3d(0,0,0);
          }
        }

        @keyframes titleFromFunnel {
          0% { opacity: 0; transform: translateY(-28px) scaleY(.35); filter: blur(2px); }
          60% { opacity: 1; transform: translateY(4px) scaleY(1.06); filter: blur(0); }
          80% { transform: translateY(-2px) scaleY(.98); }
          100% { opacity: 1; transform: translateY(0) scaleY(1); filter: blur(0); }
        }

        @keyframes scanIn {
          0% { opacity:0; clip-path:inset(0 100% 0 0); transform:translateX(-8px); filter:blur(1.5px); }
          60% { opacity:1; clip-path:inset(0 0 0 0); transform:translateX(0); filter:blur(0); }
          74% { transform:translateX(4px); }
          86% { transform:translateX(-2px); }
          100% { opacity:1; clip-path:inset(0 0 0 0); transform:translateX(0); filter:blur(0); }
        }

        @keyframes stIdle {
          0%,84%,100% {
            filter:none;
            text-shadow:.018em 0 0 currentColor;
          }
          85% {
            filter:blur(.4px);
            text-shadow:
              -.08em 0 0 rgba(212,80,122,.9),
              .08em 0 0 rgba(232,226,212,.92),
              .018em 0 0 currentColor;
          }
          86.5% {
            filter:none;
            text-shadow:
              .10em 0 0 rgba(212,80,122,.78),
              -.09em 0 0 rgba(232,226,212,.76),
              .018em 0 0 currentColor;
          }
          88% {
            filter:blur(.3px);
            text-shadow:
              -.06em -.02em 0 rgba(212,80,122,.85),
              .07em .02em 0 rgba(232,226,212,.84),
              .018em 0 0 currentColor;
          }
          89.5% {
            filter:none;
            text-shadow:.018em 0 0 currentColor;
          }
          91% {
            filter:none;
            text-shadow:
              .06em 0 0 rgba(212,80,122,.6),
              -.05em 0 0 rgba(122,120,112,.62),
              .018em 0 0 currentColor;
          }
          92.5% {
            filter:none;
            text-shadow:.018em 0 0 currentColor;
          }
        }

        @keyframes typeIn {
          to { clip-path: inset(0 0 0 0); }
        }

        @keyframes funnelFloat {
          0%,100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-14px) rotate(.5deg); }
          66% { transform: translateY(-7px) rotate(-.3deg); }
        }

        @keyframes svgDraw {
          to { stroke-dashoffset: 0; }
        }

        @keyframes funnelRetro {
          0%,100% { filter: drop-shadow(0 0 4px rgba(212,80,122,.22)) saturate(.95) contrast(.97); }
          16% { filter: drop-shadow(0 0 11px rgba(212,80,122,.5)) saturate(1.08) contrast(1); }
          28% { filter: drop-shadow(0 0 4px rgba(212,80,122,.22)) saturate(.95) contrast(.97); }
          60% { filter: drop-shadow(0 0 5px rgba(212,80,122,.25)) hue-rotate(0deg); }
          66% { filter: drop-shadow(0 0 10px rgba(232,226,212,.5)) hue-rotate(0deg) saturate(1.06); }
          70% { filter: drop-shadow(0 0 7px rgba(122,120,112,.34)) hue-rotate(0deg) saturate(1.02); }
          74% { filter: drop-shadow(0 0 4px rgba(212,80,122,.22)) hue-rotate(0deg); }
        }

        @keyframes monolithFunnelIn {
          0% { opacity:0; transform:translateY(42px) scale(.92); }
          66% { opacity:1; transform:translateY(-3px) scale(1.02); }
          100% { opacity:1; transform:translateY(0) scale(1); }
        }

        @keyframes gateReveal {
          0% { opacity:0; transform:translateY(34px) scale(.88); }
          100% { opacity:1; transform:translateY(0) scale(1); }
        }

        @keyframes wireGatePulse {
          0%,100% {
            opacity: .58;
            filter: drop-shadow(0 0 3px rgba(212,80,122,.2));
          }
          50% {
            opacity: .86;
            filter: drop-shadow(0 0 10px rgba(212,80,122,.38));
          }
        }

        @keyframes wireGateRotate {
          to {
            transform: perspective(620px) rotateX(66deg) scaleY(.78) rotate(360deg);
          }
        }

        @keyframes wireGateCore {
          0%,100% {
            opacity: .55;
            transform: scale(.9);
          }
          50% {
            opacity: .9;
            transform: scale(1.14);
          }
        }

        @keyframes wireGateGlitch {
          0%,72%,100% {
            opacity: 0;
            transform: perspective(620px) rotateX(66deg) scaleY(.78) translate3d(0,0,0);
          }
          73% {
            opacity: .8;
            transform: perspective(620px) rotateX(66deg) scaleY(.78) translate3d(-8px,0,0);
          }
          74.5% {
            opacity: .5;
            transform: perspective(620px) rotateX(66deg) scaleY(.78) translate3d(8px,1px,0);
          }
          76% {
            opacity: 0;
            transform: perspective(620px) rotateX(66deg) scaleY(.78) translate3d(0,0,0);
          }
        }

        @keyframes shadowIn {
          to { opacity:.34; transform:rotate(-3deg) scaleX(1); }
        }

        @keyframes venueIn {
          to { opacity:1; transform:translateY(0) scale(1); }
        }

        @keyframes venueFloat {
          0%,100% { transform:translateY(0) rotate(-.15deg); }
          50% { transform:translateY(-9px) rotate(.22deg); }
        }

        @keyframes glitchA {
          0%,72%,100% { opacity:0; transform:translate3d(0,0,0); clip-path:inset(0 0 0 0); }
          73% { opacity:.18; transform:translate3d(-8px,-3px,0); clip-path:inset(0% 0 82% 0); }
          74% { opacity:.20; transform:translate3d(10px,4px,0); clip-path:inset(18% 0 56% 0); }
          76% { opacity:.16; transform:translate3d(8px,5px,0); clip-path:inset(54% 0 14% 0); }
          78% { opacity:0; transform:translate3d(0,0,0); clip-path:inset(0 0 0 0); }
        }

        @keyframes glitchB {
          0%,72%,100% { opacity:0; transform:translate3d(0,0,0); clip-path:inset(0 0 0 0); }
          73.2% { opacity:.12; transform:translate3d(7px,5px,0); clip-path:inset(8% 0 72% 0); }
          74.8% { opacity:.14; transform:translate3d(-8px,-3px,0); clip-path:inset(26% 0 44% 0); }
          76.4% { opacity:.10; transform:translate3d(4px,-5px,0); clip-path:inset(62% 0 8% 0); }
          78% { opacity:0; transform:translate3d(0,0,0); clip-path:inset(0 0 0 0); }
        }

        @keyframes sigLineIn {
          to { transform:scaleX(1); }
        }

        @keyframes sigFillLoop {
          0%,17% { transform:scaleX(0); opacity:0; }
          22% { transform:scaleX(0); opacity:1; }
          56% { transform:scaleX(1); opacity:1; }
          72%,100% { transform:scaleX(1); opacity:0; }
        }

        @keyframes tickIn {
          to { opacity:1; }
        }

        @keyframes nodeIn {
          to { opacity:1; transform:translateY(0); }
        }

        @keyframes sonarRing {
          0% { transform:scale(1); opacity:.55; }
          75% { transform:scale(3.2); opacity:0; }
          100% { transform:scale(1); opacity:0; }
        }

        @keyframes dotDining {
          0%,17% { opacity:0; }
          22%,62% { opacity:1; }
          78%,100% { opacity:0; }
        }

        @keyframes dotDark {
          0%,47% { opacity:0; }
          56%,70% { opacity:1; }
          84%,100% { opacity:0; }
        }

        @keyframes timeDining {
          0%,17% { color:rgba(28,28,26,.72); filter:none; }
          22%,62% { color:${C.pink}; filter:drop-shadow(0 0 4px rgba(212,80,122,.18)); }
          78%,100% { color:rgba(28,28,26,.72); filter:none; }
        }

        @keyframes timeDark {
          0%,47% { color:rgba(28,28,26,.72); filter:none; transform:translateX(0); }
          50% { color:${C.pink}; filter:drop-shadow(0 0 4px rgba(212,80,122,.22)); transform:translateX(-2px); }
          52% { transform:translateX(2px); }
          56%,70% { color:${C.pink}; filter:drop-shadow(0 0 4px rgba(212,80,122,.22)); transform:translateX(0); }
          84%,100% { color:rgba(28,28,26,.72); filter:none; transform:translateX(0); }
        }

        @keyframes cardIn {
          to {
            opacity:1;
            transform:translateY(0);
            box-shadow:6px 6px 0 rgba(28,28,26,.07);
          }
        }

        @keyframes borderDraw {
          0% { clip-path:inset(0 100% 100% 0); }
          45% { clip-path:inset(0 0 100% 0); }
          100% { clip-path:inset(0 0 0 0); }
        }

        @media (max-width:1280px) {
          .shell {
            width:76%;
          }
        }

        @media (max-width:980px) {
          .shell {
            width:86%;
          }

          .zone-nav {
            grid-template-columns:1fr;
          }

          .hero-obelisk-img {
            height:clamp(280px,40svh,420px);
          }

          .hero-portal {
            width: clamp(420px, 60svh, 620px);
          }

          .wire-gate {
            width:min(58vw, 360px);
          }
        }

        @media (max-width:820px) {
          .bg-tex {
            background-size:cover;
            background-repeat:no-repeat;
          }

          .shell {
            width:calc(100% - 40px);
            max-width:none;
          }

          .a-hero {
            padding-top:96px;
          }

          .hero-obelisk-img {
            height:clamp(250px,34svh,350px);
          }

          .hero-portal {
            width: clamp(350px, 52svh, 500px);
          }

          .hero-h1 {
            font-size:clamp(50px,13vw,86px);
          }

          .monolith-funnel svg {
            width:min(62vw,290px);
          }

          .wire-gate {
            width:min(72vw, 320px);
            height:clamp(150px, 28vw, 220px);
          }

          .sig {
            --sy:50px;
            height:clamp(90px,12vw,130px);
          }

          .sig-time {
            font-size:clamp(15px,3.6vw,20px);
          }

          .exp-nav {
            gap:10px;
          }

          .section-lead {
            font-size:clamp(8px,2.2vw,10px);
          }
        }

        @media (max-width:520px) {
          .shell {
            width:calc(100% - 28px);
          }

          .a-hero {
            padding-top:88px;
          }

          .hero-obelisk-img {
            height:clamp(220px,30svh,300px);
          }

          .hero-portal {
            width: clamp(300px, 46svh, 410px);
          }

          .hero-h1 {
            font-size:clamp(44px,12.5vw,68px);
          }

          .monolith-funnel svg {
            width:min(78vw,240px);
          }

          .wire-gate {
            width:min(80vw, 280px);
            height:clamp(132px, 34vw, 190px);
          }

          .exp-nav {
            grid-template-columns:1fr;
            gap:8px;
          }

          .sig {
            --sy:46px;
          }

          .sig-time {
            font-size:clamp(14px,3.4vw,18px);
          }

          .sn-dining .sig-time {
            min-width: 132px;
          }

          .sn-dark .sig-time {
            min-width: 60px;
          }
        }

        @media (max-width:380px) {
          .card-title {
            font-size:16px;
          }

          .sig-time {
            font-size:14px;
          }
        }

        @media (prefers-reduced-motion:reduce) {
          .curtain {
            transition: none !important;
            opacity: 0;
          }

          .hero-obelisk-drop,
          .hero-obelisk-stack,
          .hero-portal,
          .hero-portal::before,
          .hero-portal::after,
          .portal-mist,
          .portal-grid,
          .portal-ring,
          .portal-axis,
          .portal-dust,
          .hero-h1,
          .tt-hero,
          .st,
          .flank-line,
          .monolith-funnel,
          .monolith-funnel svg,
          .wire-gate-wrap,
          .wire-gate-rings,
          .wire-gate-spokes,
          .wire-gate-core,
          .wire-gate-scan,
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
            animation:none !important;
            transition:none !important;
          }

          .par-wrap {
            transition: none !important;
          }

          .flank-line {
            transform:none;
          }

          .hero-obelisk-drop,
          .wire-gate-wrap,
          .monolith-funnel {
            opacity:1;
            transform:none;
          }

          .hero-portal {
            opacity: .8;
            transform: translate(-50%, -50%) scale(1);
          }

          .hero-h1 {
            opacity:1;
            transform:none;
          }

          .st {
            opacity:1;
            clip-path:inset(0 0 0 0);
            transform:none;
          }

          .tt-hero {
            clip-path:inset(0 0 0 0);
          }

          .monolith-funnel svg :is(path,rect,line,polyline,polygon,circle,ellipse) {
            stroke-dashoffset: 0 !important;
            animation: none !important;
          }

          .venue-wrap,
          .sig-node,
          .card {
            opacity:1;
            transform:none;
          }

          .sig-line {
            transform:none;
          }

          .card::after {
            clip-path:inset(0 0 0 0);
          }

          .section-lead {
            opacity:1;
            transform:none;
          }
        }
      `}</style>
    </>
  );
}

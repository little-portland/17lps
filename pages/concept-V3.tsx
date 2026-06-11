'use client';

import Head from 'next/head';
import { useEffect, useState, type CSSProperties, type MouseEvent } from 'react';
import SceneNav from '@components/SceneNav';

const C = { cream:'#E8E2D4', ink:'#1C1C1A', pink:'#D4507A', muted:'#7A7870' } as const;
const MONO = '"Space Mono", "Courier New", monospace';

type AreaId = 'tent' | 'chefs-studio' | 'studio';
type Area   = { id: AreaId; title: string; href: string; highlight: string; chars: number };

const IMG = {
  bg:      '/images/concept/concept_bg.jpg',
  funnel:  '/images/concept/grid_funel.png',
  obelisk: '/images/concept/obelisk-dark-grey.png',
  venue:   '/images/concept/the-space-page-venue.png',
};

const AREAS: Area[] = [
  { id:'tent',         title:'THE TENT',      href:'/thetent-test',    highlight:'/images/concept/tent-highlight.png',        chars:8  },
  { id:'chefs-studio', title:"CHEF'S STUDIO", href:'/chefstudio-test', highlight:'/images/concept/chefs-studio-highlight.png', chars:13 },
  { id:'studio',       title:'THE STUDIO',    href:'/studio-test',     highlight:'/images/concept/studio-highlight.png',       chars:10 },
];

const EXP = [
  { label:'Dining',     href:'/food-test',    dark:false },
  { label:'After Dark', href:'/theclub-test', dark:true  },
];

const typeStyle = (chars: number, delay: string): CSSProperties =>
  ({ '--chars': chars, '--type-delay': delay }) as CSSProperties;

function Card({ href, title, meta = 'Explore', dark = false, active = false,
  onEnter, onFocus, onClick, style }: {
  href: string; title: string; meta?: string; dark?: boolean; active?: boolean;
  onEnter?: () => void; onFocus?: () => void;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void; style?: CSSProperties;
}) {
  return (
    <a href={href} className={`card ${dark ? 'is-dark' : ''} ${active ? 'is-active' : ''}`}
       onMouseEnter={onEnter} onFocus={onFocus} onClick={onClick} style={style}>
      <span className="card-title">{title}</span>
      <span className="card-meta">{meta} <span aria-hidden="true">→</span></span>
    </a>
  );
}

export default function ConceptPage() {
  const [active,   setActive]   = useState<AreaId | null>(null);
  const [touch,    setTouch]    = useState(false);
  const [ready,    setReady]    = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dining,   setDining]   = useState('20:00 / 20:30');
  const [darkTime, setDarkTime] = useState('22:00');

  /* ── time scramble (window.* fixes Node Timeout type error) ── */
  useEffect(() => {
    let tt: number[] = [];
    const run = () => {
      tt.forEach(t => window.clearTimeout(t)); tt = [];
      setDining('20:00 / 20:30'); setDarkTime('22:00');
      tt = [
        window.setTimeout(() => setDining('18:40 / 19:10'),  1800),
        window.setTimeout(() => setDining('21:12 / 21:40'),  1960),
        window.setTimeout(() => setDining('19:55 / 20:14'),  2120),
        window.setTimeout(() => setDining('20:00 / 20:30'),  2320),
        window.setTimeout(() => setDarkTime('23:17'),         4600),
        window.setTimeout(() => setDarkTime('01:40'),         4760),
        window.setTimeout(() => setDarkTime('21:52'),         4920),
        window.setTimeout(() => setDarkTime('22:00'),         5120),
      ];
    };
    run();
    const iv = window.setInterval(run, 9600);
    return () => { window.clearInterval(iv); tt.forEach(t => window.clearTimeout(t)); };
  }, []);

  /* ── nav ready + scroll ── */
  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 1800);
    const onS = () => setScrolled(window.scrollY > 24);
    onS();
    window.addEventListener('scroll', onS, { passive: true });
    return () => { window.clearTimeout(t); window.removeEventListener('scroll', onS); };
  }, []);

  /* ── intersection observer ── */
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.rs');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add('iv');
        obs.unobserve(e.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* ── touch mode ── */
  useEffect(() => {
    const mq = window.matchMedia('(hover: none), (pointer: coarse), (max-width: 900px)');
    const u = () => setTouch(mq.matches || window.innerWidth <= 900);
    u();
    mq.addEventListener('change', u);
    window.addEventListener('resize', u);
    return () => { mq.removeEventListener('change', u); window.removeEventListener('resize', u); };
  }, []);

  const onEnter = (id: AreaId) => () => { if (!touch) setActive(id); };
  const onLeave = () => { if (!touch) setActive(null); };
  const onClick = (id: AreaId) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (touch && active !== id) { e.preventDefault(); setActive(id); }
  };

  return (
    <>
      <Head>
        <title>Concept — 17 Little Portland Street</title>
        <meta name="description" content="Concept, space and experience at 17 Little Portland Street, London." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      <main className="page">
        <div className={`nav-shell ${ready ? 'rdy' : ''} ${scrolled ? 'scrolled' : ''}`}>
          <SceneNav theme="space" />
        </div>
        <div className="bg-tex" aria-hidden="true" />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            ACT I — DAWN
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="act a-dawn rs" aria-labelledby="cpt-title">
          <div className="axis-dawn" aria-hidden="true" />
          <div className="dawn-inner">
            <p className="eyebrow">LPX // Underground</p>
            <h1 id="cpt-title" className="st dawn-h1">CONCEPT.</h1>
            <p className="address">
              <span className="tt" style={typeStyle(33, '720ms')}>
                17 Little Portland Street, London
              </span>
            </p>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            ACT II — THE MONOLITH
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="act a-monolith rs" aria-labelledby="space-title">
          <div className="monolith-stage">
            <img className="obelisk" src={IMG.obelisk} alt="" draggable={false} aria-hidden="true" />
          </div>
          <div className="mono-label">
            <div className="mono-stem" aria-hidden="true" />
            <h2 id="space-title" className="st mono-h2">The Space</h2>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            ACT III — THE SPACE
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="act a-space rs">
          <div className="shell">
            <div className="venue-stage" aria-label="Interactive venue map">
              <div className="venue-wrap" aria-hidden="true">
                <img src={IMG.venue}
                  alt="Venue — The Tent, Chef's Studio, The Studio"
                  className="vi v-base" draggable={false} />
                {AREAS.map(a => (
                  <img key={a.id} src={a.highlight} alt=""
                    className={`vi v-hl ${active === a.id ? 'on' : ''}`}
                    draggable={false} />
                ))}
                <img src={IMG.venue} alt="" className="vi v-glitch vg-a" draggable={false} />
                <img src={IMG.venue} alt="" className="vi v-glitch vg-b" draggable={false} />
              </div>
            </div>
            <nav className="zone-nav" onMouseLeave={onLeave} aria-label="Venue areas">
              {AREAS.map((a, i) => {
                const on = active === a.id;
                return (
                  <Card key={a.id} href={a.href} title={a.title}
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

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            ACT IV — THE GATE
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="act a-gate rs" aria-labelledby="exp-title">
          <div className="gate-stage">
            <img className="funnel" src={IMG.funnel} alt="" draggable={false} aria-hidden="true" />
          </div>
          <div className="gate-label">
            <div className="gate-stem" aria-hidden="true" />
            <h2 id="exp-title" className="st gate-h2">The Experience</h2>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            ACT V — THE EXPERIENCE
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="act a-exp rs">
          <div className="shell">
            <div className="sig" aria-hidden="true">
              <div className="sig-track">
                <div className="sig-line" />
                <div className="sig-fill" />
              </div>
              <div className="sig-node sn-dining">
                <span className="sig-time">{dining}</span>
                <span className="sig-dot"><span className="sig-dot-fill" /></span>
              </div>
              <div className="sig-node sn-dark">
                <span className="sig-time">{darkTime}</span>
                <span className="sig-dot"><span className="sig-dot-fill" /></span>
              </div>
            </div>
            <nav className="exp-nav" aria-label="Explore the experience">
              {EXP.map((b, i) => (
                <Card key={b.href} href={b.href} title={b.label} dark={b.dark}
                  style={{ '--card-delay': `${400 + i * 110}ms` } as CSSProperties}
                />
              ))}
            </nav>
          </div>
        </section>

      </main>

      {/* ── GLOBAL: reset + nav overrides ───────────────────── */}
      <style jsx global>{`
        html, body, #__next {
          margin: 0; min-height: 100%;
          background: ${C.cream}; color: ${C.ink};
          font-family: ${MONO};
          -webkit-font-smoothing: antialiased;
        }
        body { overflow-x: hidden; }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: rgba(28,28,26,.1); }
        ::-webkit-scrollbar-thumb { background: ${C.ink}; border: 2px solid rgba(232,226,212,.6); background-clip: content-box; }
        ::-webkit-scrollbar-thumb:hover { background: ${C.pink}; border: 2px solid rgba(232,226,212,.6); background-clip: content-box; }

        .scene-nav { z-index: 10020 !important; transition: background .3s, box-shadow .3s, backdrop-filter .3s !important; }
        .scene-nav-burger, .scene-nav-logo { z-index: 10030 !important; }
        .scene-nav-mobile { z-index: 10010 !important; }
        .scene-nav--space { background: transparent !important; backdrop-filter: none !important; -webkit-backdrop-filter: none !important; }
        .scene-nav--space, .scene-nav--space a,
        .scene-nav-mobile--space, .scene-nav-mobile--space a {
          color: ${C.ink} !important; font-family: ${MONO} !important; letter-spacing: .16em !important;
        }
        .scene-nav--space a.active, .scene-nav-mobile--space a.active,
        .scene-nav--space a[aria-current='page'], .scene-nav-mobile--space a[aria-current='page'] { color: ${C.pink} !important; }
        .scene-nav--space a.disabled, .scene-nav-mobile--space a.disabled { opacity: .4; }
        .scene-nav--space .scene-nav-burger span { background: ${C.ink} !important; }
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
        .scene-nav-mobile.scene-nav--space, .scene-nav-mobile--space {
          background: rgba(232,226,212,.92) !important;
          backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
        }
        @media (max-width: 900px) {
          .nav-shell { z-index: 50000 !important; }
          .nav-shell .scene-nav { z-index: 50020 !important; }
          .scene-nav-burger, .scene-nav-logo { z-index: 50040 !important; }
          .nav-shell:has(.scene-nav-burger[aria-expanded='true']) .scene-nav-mobile,
          .nav-shell:has(button[aria-expanded='true']) .scene-nav-mobile {
            position: fixed !important; inset: 0 !important; z-index: 50010 !important;
            min-height: 100dvh !important; height: 100dvh !important;
            padding: 104px 28px 38px !important;
            display: flex !important; flex-direction: column !important;
            align-items: center !important; justify-content: flex-start !important;
            gap: 20px !important; overflow-y: auto !important;
            background: rgba(232,226,212,.9) !important;
            backdrop-filter: blur(22px) !important; -webkit-backdrop-filter: blur(22px) !important;
          }
          .nav-shell:has(.scene-nav-burger[aria-expanded='true']) .scene-nav-mobile a,
          .nav-shell:has(button[aria-expanded='true']) .scene-nav-mobile a {
            display: block !important; color: ${C.ink} !important; opacity: 1 !important;
            font-size: clamp(16px,4.7vw,24px) !important; letter-spacing: .16em !important;
            text-align: center !important; padding: 4px 0 !important;
          }
          .nav-shell:has(.scene-nav-burger[aria-expanded='true']) .scene-nav-mobile a.active,
          .nav-shell:has(button[aria-expanded='true']) .scene-nav-mobile a.active { color: ${C.pink} !important; }
        }
      `}</style>

      {/* ── PAGE STYLES ─────────────────────────────────────── */}
      <style jsx global>{`
        .page { position: relative; min-height: 100svh; overflow-x: clip; background: ${C.cream}; }

        .nav-shell {
          position: fixed; top: 0; left: 0; right: 0; z-index: 10000;
          opacity: 0; transform: translateY(-16px); pointer-events: none;
          transition: opacity .8s ease, transform .8s cubic-bezier(.2,.8,.2,1);
        }
        .nav-shell.rdy { opacity: 1; transform: translateY(0); pointer-events: auto; }

        .bg-tex {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image: url('${IMG.bg}');
          background-size: contain; background-repeat: repeat; background-position: center top;
          opacity: .5;
        }

        .act { position: relative; z-index: 2; }
        .shell { width: 68%; max-width: 1140px; margin: 0 auto; }

        /* ── ACT I — DAWN ─────────────────────────────── */
        .a-dawn {
          min-height: 100svh;
          display: flex; align-items: center; justify-content: center; text-align: center;
          padding: clamp(100px,12vw,160px) clamp(20px,6vw,80px) clamp(80px,8vw,120px);
        }
        .axis-dawn {
          position: absolute; top: 0; bottom: 0; left: 50%;
          width: 1px; pointer-events: none; z-index: 1;
          background: linear-gradient(to bottom,
            rgba(28,28,26,0) 0%, rgba(28,28,26,.22) 18%,
            rgba(28,28,26,.28) 50%,
            rgba(28,28,26,.22) 82%, rgba(28,28,26,0) 100%);
          transform: scaleY(0); transform-origin: top;
          animation: drawLine 2.8s cubic-bezier(.25,.8,.25,1) .3s forwards;
        }
        .dawn-inner { position: relative; z-index: 3; }

        /* ── Shared scan titles ───────────────────────── */
        .st {
          font-family: ${MONO}; font-weight: 700; text-transform: uppercase;
          color: ${C.ink}; text-shadow: .018em 0 0 currentColor;
          opacity: 0; clip-path: inset(0 100% 0 0); transform: translateX(-8px);
        }
        .rs.iv .st {
          animation:
            scanIn  .52s steps(8,end)  .28s forwards,
            stIdle  7.5s steps(2,end) 3.2s infinite;
        }
        .dawn-h1 {
          font-size: clamp(72px,13.5vw,196px);
          line-height: .88; letter-spacing: -.01em;
          margin-bottom: clamp(20px,2.8vw,36px);
        }
        .mono-h2, .gate-h2 {
          font-size: clamp(26px,3.6vw,52px);
          line-height: .9; letter-spacing: .08em;
        }
        .eyebrow {
          display: block; margin-bottom: clamp(20px,3vw,40px);
          font-size: 10px; letter-spacing: .32em; text-transform: uppercase; color: ${C.muted};
        }
        .address {
          font-size: clamp(12px,1.18vw,17px); letter-spacing: .26em;
          font-weight: 700; text-transform: uppercase; color: ${C.pink};
        }
        .tt { display: inline-block; overflow: hidden; clip-path: inset(0 100% 0 0); }
        .rs.iv .tt { animation: typeIn .5s steps(var(--chars),end) var(--type-delay) forwards; }

        /* ── ACT II — MONOLITH ────────────────────────── */
        .a-monolith {
          min-height: 100svh;
          display: grid; grid-template-rows: 1fr auto;
        }
        .monolith-stage {
          display: flex; align-items: flex-end; justify-content: center;
          overflow: hidden; position: relative;
        }
        .monolith-stage::after {
          content: ''; position: absolute;
          bottom: clamp(70px,12vh,120px); left: 30%; right: 30%; height: 2px;
          background: radial-gradient(ellipse, rgba(28,28,26,.16), transparent 72%);
          filter: blur(6px); opacity: 0;
          transition: opacity 1.4s ease 2.2s;
        }
        .a-monolith.iv .monolith-stage::after { opacity: 1; }

        .obelisk {
          display: block;
          height: clamp(300px,58svh,560px); width: auto;
          opacity: 0; transform: translateY(160px);
          mix-blend-mode: multiply;
          filter: contrast(.96) saturate(.88);
          pointer-events: none; user-select: none;
        }
        .a-monolith.iv .obelisk {
          animation:
            monolithRise    3.4s cubic-bezier(.22,1,.36,1)  .3s forwards,
            monolithBreathe  14s ease-in-out                4.8s infinite;
        }
        .mono-label {
          text-align: center; z-index: 4;
          padding: clamp(28px,4vh,52px) 0 clamp(36px,5vh,64px);
        }
        .mono-stem {
          width: 1px; height: clamp(28px,4vh,52px);
          background: rgba(28,28,26,.28);
          margin: 0 auto clamp(14px,1.8vh,24px);
          transform: scaleY(0); transform-origin: top;
        }
        .a-monolith.iv .mono-stem { animation: drawLine .9s ease 1.4s forwards; }

        /* ── ACT III — SPACE ──────────────────────────── */
        .a-space { padding: clamp(56px,8vw,100px) 0 clamp(44px,6vw,72px); }

        .venue-stage {
          position: relative; width: 100%;
          min-height: clamp(260px,34vw,480px);
          display: flex; align-items: center; justify-content: center;
        }
        .venue-stage::before {
          content: ''; position: absolute;
          left: 9%; right: 9%; bottom: 12%; height: 14%; border-radius: 50%;
          background: radial-gradient(ellipse, rgba(28,28,26,.14), transparent 72%);
          filter: blur(10px); opacity: 0; transform: rotate(-3deg) scaleX(.7);
        }
        .a-space.iv .venue-stage::before { animation: shadowIn .7s ease .5s forwards; }

        .venue-wrap {
          position: relative; width: min(100%,800px);
          aspect-ratio: 2048/1140;
          opacity: 0; transform: translateY(20px) scale(.98);
        }
        .a-space.iv .venue-wrap {
          animation: venueIn .9s cubic-bezier(.2,.8,.2,1) .4s forwards, venueFloat 5s ease-in-out 1.8s infinite;
        }
        .vi { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; pointer-events: none; user-select: none; }
        .v-base {
          z-index: 2;
          filter: saturate(.78) contrast(1.02)
            drop-shadow(0 16px 26px rgba(28,28,26,.1))
            drop-shadow(0 32px 54px rgba(28,28,26,.08));
        }
        .v-hl { z-index: 4; opacity: 0; visibility: hidden; transition: opacity .18s, visibility .18s; }
        .v-hl.on { opacity: 1; visibility: visible; }
        .v-glitch { z-index: 5; opacity: 0; mix-blend-mode: multiply; pointer-events: none; }
        .a-space.iv .vg-a {
          filter: drop-shadow(0 0 10px rgba(212,80,122,.28)) hue-rotate(-16deg) saturate(1.2);
          animation: glitchA 8.5s steps(1,end) 2s infinite;
        }
        .a-space.iv .vg-b {
          filter: drop-shadow(0 0 10px rgba(80,120,130,.2)) hue-rotate(18deg) saturate(1.1);
          animation: glitchB 8.5s steps(1,end) 2s infinite;
        }
        .zone-nav {
          display: grid; grid-template-columns: repeat(3,minmax(0,1fr));
          gap: 14px; margin-top: clamp(6px,1vw,14px);
        }

        /* ── ACT IV — THE GATE ────────────────────────── */
        .a-gate {
          min-height: 96svh;
          display: grid; grid-template-rows: 1fr auto;
        }
        .gate-stage {
          display: flex; align-items: center; justify-content: center;
          overflow: visible; padding: clamp(60px,8vh,100px) 0 0;
        }
        .funnel {
          display: block; width: min(62vw,580px); height: auto;
          opacity: 0; transform: scale(.82) translateY(40px);
          mix-blend-mode: multiply;
          filter: saturate(.9) contrast(.96);
          pointer-events: none; user-select: none;
        }
        .a-gate.iv .funnel {
          animation:
            gateReveal 2.6s cubic-bezier(.2,.8,.2,1)  .2s forwards,
            gatePulse   11s ease-in-out               3.2s infinite;
        }
        .gate-label {
          text-align: center; z-index: 4;
          padding: clamp(24px,3.5vh,48px) 0 clamp(36px,5vh,64px);
        }
        .gate-stem {
          width: 1px; height: clamp(24px,3.5vh,44px);
          background: rgba(212,80,122,.38);
          margin: 0 auto clamp(12px,1.6vh,22px);
          transform: scaleY(0); transform-origin: top;
        }
        .a-gate.iv .gate-stem { animation: drawLine .9s ease .6s forwards; }

        /* ── ACT V — EXPERIENCE ───────────────────────── */
        .a-exp { padding: clamp(44px,6vw,80px) 0 clamp(80px,10vw,140px); }

        .sig {
          --sy: 38px; position: relative;
          width: 100%; height: clamp(56px,5.6vw,76px);
          margin-bottom: clamp(8px,1.2vw,16px); overflow: visible;
        }
        .sig-track { position: absolute; left: 0; right: 0; top: var(--sy); height: 2px; }
        .sig-line, .sig-fill { position: absolute; inset: 0; height: 2px; transform-origin: left; }
        .sig-line { background: rgba(28,28,26,.26); transform: scaleX(0); }
        .sig-fill  { background: ${C.pink}; transform: scaleX(0); opacity: 0; }
        .a-exp.iv .sig-line { animation: sigLineIn .8s cubic-bezier(.25,.8,.25,1) .4s forwards; }
        .a-exp.iv .sig-fill  { animation: sigFillLoop 9.6s ease-in-out 1.2s infinite; }

        .sig-node { position: absolute; top: 0; min-width: 160px; height: 60px; opacity: 0; transform: translateY(8px); }
        .sn-dining { left: 0; }
        .sn-dark   { right: 0; text-align: right; }
        .a-exp.iv .sn-dining { animation: nodeIn .48s ease .7s  forwards; }
        .a-exp.iv .sn-dark   { animation: nodeIn .48s ease .85s forwards; }

        .sig-dot { position: absolute; top: var(--sy); width: 16px; height: 16px; border-radius: 999px; background: #8f8a80; overflow: hidden; transform: translateY(-50%); z-index: 2; }
        .sn-dining .sig-dot { left: 0; }
        .sn-dark   .sig-dot { right: 0; }
        .sig-dot-fill { position: absolute; inset: 0; border-radius: inherit; background: ${C.pink}; opacity: 0; }
        .a-exp.iv .sn-dining .sig-dot-fill { animation: dotDining  9.6s ease-in-out 1.2s infinite; }
        .a-exp.iv .sn-dark   .sig-dot-fill { animation: dotDark    9.6s ease-in-out 1.2s infinite; }

        .sig-time { position: absolute; top: 0; display: inline-block; font-size: clamp(11px,1.05vw,15px); font-weight: 700; letter-spacing: .18em; color: rgba(28,28,26,.6); text-transform: uppercase; white-space: nowrap; }
        .sn-dining .sig-time { left: 0; }
        .sn-dark   .sig-time { right: 0; }
        .a-exp.iv .sn-dining .sig-time { animation: timeDining 9.6s ease-in-out 1.2s infinite; }
        .a-exp.iv .sn-dark   .sig-time { animation: timeDark   9.6s ease-in-out 1.2s infinite; }

        .exp-nav { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 14px; }

        /* ── Cards ────────────────────────────────────── */
        .card {
          position: relative;
          min-height: clamp(72px,7vw,100px);
          display: flex; flex-direction: column; justify-content: center; gap: 5px;
          padding: clamp(14px,1.4vw,20px) clamp(16px,1.8vw,24px);
          border: 1px solid transparent;
          background: rgba(232,226,212,.32);
          color: ${C.ink}; text-decoration: none;
          box-shadow: 6px 6px 0 rgba(28,28,26,0); overflow: hidden;
          opacity: 0; transform: translateY(12px);
          transition: transform .22s, background .22s, color .22s, box-shadow .22s;
        }
        .rs.iv .card { animation: cardIn .52s ease var(--card-delay,300ms) forwards; }
        .card::before {
          content: ''; position: absolute; inset: 0;
          background:
            linear-gradient(135deg, rgba(212,80,122,.14), transparent 42%),
            repeating-linear-gradient(90deg, rgba(28,28,26,.05) 0 1px, transparent 1px 11px);
          opacity: 0; transition: opacity .22s;
        }
        .card::after {
          content: ''; position: absolute; inset: 0;
          border: 1px solid rgba(28,28,26,.46); pointer-events: none;
          clip-path: inset(0 100% 100% 0);
        }
        .rs.iv .card::after { animation: borderDraw .62s ease calc(var(--card-delay,300ms) + 80ms) forwards; }
        .card-title {
          display: block; position: relative; z-index: 1;
          font-size: clamp(17px,1.65vw,26px); font-weight: 700;
          line-height: .95; letter-spacing: 0; text-transform: uppercase;
          text-shadow: .012em 0 0 currentColor;
        }
        .card-meta {
          display: inline-flex; align-items: center; gap: 4px;
          position: relative; z-index: 1;
          color: rgba(28,28,26,.56); font-size: 10px; letter-spacing: .18em; text-transform: uppercase;
        }
        .card:hover, .card:focus-visible, .card.is-active {
          background: rgba(212,80,122,.09);
          box-shadow: 10px 10px 0 rgba(212,80,122,.12);
          transform: translate(-3px,-3px); outline: none;
        }
        .card:hover::before, .card:focus-visible::before, .card.is-active::before { opacity: 1; }
        .card:hover::after,  .card:focus-visible::after,  .card.is-active::after  { border-color: rgba(212,80,122,.85); }
        .card.is-dark { background: ${C.ink}; color: ${C.cream}; }
        .card.is-dark .card-meta { color: rgba(232,226,212,.6); }
        .card.is-dark:hover, .card.is-dark:focus-visible { background: ${C.pink}; color: ${C.cream}; }

        /* ── Keyframes ────────────────────────────────── */
        @keyframes drawLine { to { transform: scaleY(1); } }

        @keyframes scanIn {
          0%   { opacity: 0; clip-path: inset(0 100% 0 0); transform: translateX(-8px); filter: blur(1.5px); }
          60%  { opacity: 1; clip-path: inset(0 0 0 0);    transform: translateX(0);    filter: blur(0); }
          74%  { transform: translateX(4px); }
          86%  { transform: translateX(-2px); }
          100% { opacity: 1; clip-path: inset(0 0 0 0);    transform: translateX(0);    filter: blur(0); }
        }
        @keyframes stIdle {
          0%,92%,100% { filter: none; text-shadow: .018em 0 0 currentColor; }
          93% { filter: blur(.2px); text-shadow: .018em 0 0 currentColor, .08em 0 0 rgba(212,80,122,.28); }
          94% { filter: none;       text-shadow: .018em 0 0 currentColor, -.06em 0 0 rgba(122,120,112,.24); }
          96% { filter: none;       text-shadow: .018em 0 0 currentColor; }
        }
        @keyframes typeIn { to { clip-path: inset(0 0 0 0); } }

        @keyframes monolithRise {
          0%  { opacity: 0; transform: translateY(160px); }
          10% { opacity: 1; }
          100%{ opacity: 1; transform: translateY(0); }
        }
        @keyframes monolithBreathe {
          0%,100% { transform: translateY(0)    scale(1);     }
          50%     { transform: translateY(-5px) scale(1.002); }
        }
        @keyframes gateReveal {
          0%   { opacity: 0;   transform: scale(.82) translateY(40px); }
          100% { opacity: .88; transform: scale(1)   translateY(0);    }
        }
        @keyframes gatePulse {
          0%,100% { transform: scale(1)    rotate(0deg);   }
          33%     { transform: scale(1.03) rotate(.5deg);  }
          66%     { transform: scale(1.02) rotate(-.3deg); }
        }
        @keyframes shadowIn  { to { opacity: .36; transform: rotate(-3deg) scaleX(1); } }
        @keyframes venueIn   { to { opacity: 1;   transform: translateY(0) scale(1);  } }
        @keyframes venueFloat {
          0%,100% { transform: translateY(0)    rotate(-.15deg); }
          50%     { transform: translateY(-9px) rotate(.22deg);  }
        }
        @keyframes glitchA {
          0%,72%,100% { opacity:0; transform:translate3d(0,0,0); clip-path:inset(0 0 0 0); }
          73% { opacity:.18; transform:translate3d(-8px,-3px,0); clip-path:inset(0%  0 82% 0); }
          74% { opacity:.22; transform:translate3d(10px, 4px,0); clip-path:inset(16% 0 58% 0); }
          75% { opacity:.16; transform:translate3d(-6px,-5px,0); clip-path:inset(34% 0 34% 0); }
          76% { opacity:.20; transform:translate3d( 8px, 6px,0); clip-path:inset(52% 0 16% 0); }
          78% { opacity:0;   transform:translate3d(0,0,0);       clip-path:inset(0 0 0 0);     }
        }
        @keyframes glitchB {
          0%,72%,100% { opacity:0; transform:translate3d(0,0,0); clip-path:inset(0 0 0 0); }
          73.2% { opacity:.12; transform:translate3d( 7px, 5px,0); clip-path:inset( 8% 0 72% 0); }
          74.1% { opacity:.16; transform:translate3d(-9px,-3px,0); clip-path:inset(24% 0 46% 0); }
          75.2% { opacity:.12; transform:translate3d( 5px,-6px,0); clip-path:inset(44% 0 24% 0); }
          78%   { opacity:0;   transform:translate3d(0,0,0);       clip-path:inset(0 0 0 0);     }
        }
        @keyframes sigLineIn  { to { transform: scaleX(1); } }
        @keyframes sigFillLoop {
          0%,17%   { transform: scaleX(0); opacity: 0; }
          22%      { transform: scaleX(0); opacity: 1; }
          56%      { transform: scaleX(1); opacity: 1; }
          72%,100% { transform: scaleX(1); opacity: 0; }
        }
        @keyframes nodeIn     { to { opacity: 1; transform: translateY(0); } }
        @keyframes dotDining  { 0%,17%{opacity:0} 22%,62%{opacity:1} 78%,100%{opacity:0} }
        @keyframes dotDark    { 0%,47%{opacity:0} 56%,70%{opacity:1} 84%,100%{opacity:0} }
        @keyframes timeDining { 0%,17%{color:rgba(28,28,26,.6)} 22%,62%{color:${C.pink}} 78%,100%{color:rgba(28,28,26,.6)} }
        @keyframes timeDark   { 0%,47%{color:rgba(28,28,26,.6)} 56%,70%{color:${C.pink}} 84%,100%{color:rgba(28,28,26,.6)} }
        @keyframes cardIn     { to { opacity:1; transform:translateY(0); box-shadow:6px 6px 0 rgba(28,28,26,.07); } }
        @keyframes borderDraw {
          0%   { clip-path: inset(0 100% 100% 0); }
          45%  { clip-path: inset(0 0 100% 0);    }
          100% { clip-path: inset(0 0 0 0);       }
        }

        /* ── Responsive ───────────────────────────────── */
        @media (max-width: 1280px) { .shell { width: 76%; } }
        @media (max-width: 980px) {
          .shell { width: 86%; }
          .zone-nav { grid-template-columns: 1fr; }
          .funnel { width: min(72vw,480px); }
        }
        @media (max-width: 820px) {
          .bg-tex { background-size: cover; background-repeat: no-repeat; }
          .shell { width: calc(100% - 40px); max-width: none; }
          .a-dawn { padding-top: 100px; }
          .dawn-h1 { font-size: clamp(52px,14vw,88px); }
          .obelisk { height: clamp(240px,52svh,440px); }
          .funnel { width: min(84vw,380px); }
          .sig { --sy: 30px; height: 56px; }
          .sig-node { min-width: auto; height: 56px; }
          .exp-nav { gap: 10px; }
        }
        @media (max-width: 520px) {
          .shell { width: calc(100% - 28px); }
          .a-dawn { padding-top: 90px; }
          .dawn-h1 { font-size: clamp(46px,13vw,72px); }
          .obelisk { height: clamp(210px,48svh,380px); }
          .funnel { width: min(90vw,320px); }
          .exp-nav { grid-template-columns: 1fr; gap: 8px; }
          .sig-time { font-size: 10px; letter-spacing: .06em; }
        }
        @media (max-width: 380px) {
          .card-title { font-size: 17px; }
          .sig-time { font-size: 9px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .axis-dawn, .mono-stem, .gate-stem, .st, .tt,
          .obelisk, .funnel, .venue-wrap, .vg-a, .vg-b, .v-hl.on,
          .sig-line, .sig-fill, .sig-node, .sig-dot-fill, .sig-time,
          .card, .card::after { animation: none !important; transition: none !important; }
          .axis-dawn, .mono-stem, .gate-stem, .sig-line { transform: none; }
          .st, .tt { clip-path: inset(0 0 0 0); }
          .obelisk { opacity: 1; transform: none; }
          .funnel  { opacity: .88; transform: none; }
          .venue-wrap, .sig-node, .card { opacity: 1; transform: none; }
          .card::after { clip-path: inset(0 0 0 0); }
        }
      `}</style>
    </>
  );
}

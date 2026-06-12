'use client';

import Head from 'next/head';
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import SceneNav from '@components/SceneNav';

const C = { cream:'#E8E2D4', ink:'#1C1C1A', pink:'#D4507A', muted:'#7A7870' } as const;
const MONO = '"Space Mono", "Courier New", monospace';

type AreaId = 'tent' | 'chefs-studio' | 'studio';
type Area   = { id: AreaId; title: string; href: string; highlight: string };

const IMG = {
  bg:      '/images/concept/concept_bg.jpg',
  funnel:  '/images/concept/grid_funel.png',
  obelisk: '/images/concept/obelisk-dark-grey.png',
  venue:   '/images/concept/the-space-page-venue.png',
};

const AREAS: Area[] = [
  { id:'tent',         title:'THE TENT',      href:'/thetent-test',    highlight:'/images/concept/tent-highlight.png'        },
  { id:'chefs-studio', title:"CHEF'S STUDIO", href:'/chefstudio-test', highlight:'/images/concept/chefs-studio-highlight.png' },
  { id:'studio',       title:'THE STUDIO',    href:'/studio-test',     highlight:'/images/concept/studio-highlight.png'       },
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
  const [active,       setActive]       = useState<AreaId | null>(null);
  const [touch,        setTouch]        = useState(false);
  const [ready,        setReady]        = useState(false);
  const [scrolled,     setScrolled]     = useState(false);
  const [dining,       setDining]       = useState('20:00 / 20:30');
  const [darkTime,     setDarkTime]     = useState('22:00');
  const [curtainPhase, setCurtainPhase] = useState<'visible' | 'fading' | 'gone'>('visible');

  // refs for zero-rerender parallax + scroll thread
  const funnelParRef  = useRef<HTMLDivElement>(null);
  const obeliskParRef = useRef<HTMLDivElement>(null);
  const gateParRef    = useRef<HTMLDivElement>(null);
  const scrollFillRef = useRef<HTMLDivElement>(null);

  // ── time scramble ──────────────────────────────────────
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

  // ── cinematic curtain + nav ready ──────────────────────
  useEffect(() => {
    const t1 = window.setTimeout(() => setCurtainPhase('fading'), 200);
    const t2 = window.setTimeout(() => setReady(true),            1900);
    const t3 = window.setTimeout(() => setCurtainPhase('gone'),   2500);
    return () => { window.clearTimeout(t1); window.clearTimeout(t2); window.clearTimeout(t3); };
  }, []);

  // ── scroll thread (direct DOM, no re-render) ───────────
  useEffect(() => {
    const onS = () => {
      setScrolled(window.scrollY > 24);
      if (scrollFillRef.current) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        scrollFillRef.current.style.height = max > 0
          ? `${(window.scrollY / max) * 100}%`
          : '0%';
      }
    };
    onS();
    window.addEventListener('scroll', onS, { passive: true });
    return () => window.removeEventListener('scroll', onS);
  }, []);

  // ── intersection observer ──────────────────────────────
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

  // ── touch detection ────────────────────────────────────
  useEffect(() => {
    const mq = window.matchMedia('(hover: none), (pointer: coarse), (max-width: 900px)');
    const u = () => setTouch(mq.matches || window.innerWidth <= 900);
    u(); mq.addEventListener('change', u); window.addEventListener('resize', u);
    return () => { mq.removeEventListener('change', u); window.removeEventListener('resize', u); };
  }, []);

  // ── mouse parallax (direct DOM, no re-render) ──────────
  useEffect(() => {
    if (touch) return;
    let raf = 0;
    const onMove = (e: globalThis.MouseEvent) => {
      if (raf) window.cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth  - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        if (funnelParRef.current)
          funnelParRef.current.style.transform  = `translate(${x * 10}px,${y * 8}px)`;
        if (obeliskParRef.current)
          obeliskParRef.current.style.transform = `translate(${x * 5}px,${y * 3}px)`;
        if (gateParRef.current)
          gateParRef.current.style.transform    = `translate(${x * -8}px,${y * -6}px)`;
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [touch]);

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

      {/* ── 1. Cinematic curtain ─── */}
      {curtainPhase !== 'gone' && (
        <div className={`curtain${curtainPhase === 'fading' ? ' is-up' : ''}`} aria-hidden="true" />
      )}

      {/* ── 5. CRT scanline overlay ─── */}
      <div className="scanlines" aria-hidden="true" />

      {/* ── 2. Scroll progress thread ─── */}
      <div className="scroll-thread" aria-hidden="true">
        <div ref={scrollFillRef} className="scroll-thread-fill" />
      </div>

      <main className="page">
        <div className={`nav-shell ${ready ? 'rdy' : ''} ${scrolled ? 'scrolled' : ''}`}>
          <SceneNav theme="space" />
        </div>
        <div className="bg-tex" aria-hidden="true" />

        {/* ══ ACT I — HERO ═════════════════════════════════════════ */}
        <section className="act a-hero">
          {/* 3. Act marker */}
          <span className="act-num" aria-hidden="true">ACT&nbsp;I</span>

          {/* Funnel drops from above; par-wrap handles mouse parallax */}
          <div className="hero-funnel-drop" aria-hidden="true">
            <div ref={funnelParRef} className="par-wrap">
              <img className="hero-funnel-img" src={IMG.funnel} alt="" draggable={false} />
            </div>
          </div>

          <div className="hero-copy">
            {/* Title pours out of funnel base */}
            <h1 className="hero-h1">CONCEPT.</h1>
            <p className="hero-addr">
              <span className="tt-hero" style={typeStyle(33, '4.6s')}>
                17 Little Portland Street, London
              </span>
            </p>
            {/* 4. Atmospheric copy */}
            <p className="hero-tagline">
              <span className="tt-tag">Three&nbsp;spaces.&nbsp;&nbsp;One&nbsp;evening.</span>
            </p>
          </div>
        </section>

        {/* ══ ACT II — OBELISK ════════════════════════════════════ */}
        <section className="act a-monolith rs">
          <span className="act-num act-num-rs" aria-hidden="true">ACT&nbsp;II</span>
          <div className="flank-line flank-a" aria-hidden="true" />
          <div className="monolith-stage">
            <div ref={obeliskParRef} className="par-wrap">
              <img className="obelisk" src={IMG.obelisk} alt="" draggable={false} aria-hidden="true" />
            </div>
          </div>
          <div className="flank-line flank-b" aria-hidden="true" />
          {/* 4. Coordinates as atmospheric copy */}
          <p className="mono-coords" aria-hidden="true">51°31′N&nbsp;&nbsp;—&nbsp;&nbsp;0°08′W</p>
        </section>

        {/* ══ ACT III — THE SPACE ════════════════════════════════ */}
        <section className="act a-space rs" aria-labelledby="space-title">
          <span className="act-num act-num-rs" aria-hidden="true">ACT&nbsp;III</span>
          <div className="shell">
            <h2 id="space-title" className="st space-h2">The Space</h2>
            {/* 4. Section lead copy */}
            <p className="section-lead">Three distinct environments,&nbsp;&nbsp;one continuous experience.</p>
            <div className="venue-stage" aria-label="Interactive venue map">
              <div className="venue-wrap" aria-hidden="true">
                <img src={IMG.venue} alt="Venue — The Tent, Chef's Studio, The Studio"
                     className="vi v-base" draggable={false} />
                {AREAS.map(a => (
                  <img key={a.id} src={a.highlight} alt=""
                       className={`vi v-hl ${active === a.id ? 'on' : ''}`} draggable={false} />
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
                    active={on} onEnter={onEnter(a.id)} onFocus={() => setActive(a.id)}
                    onClick={onClick(a.id)}
                    style={{ '--card-delay': `${220 + i * 80}ms` } as CSSProperties}
                  />
                );
              })}
            </nav>
          </div>
        </section>

        {/* ══ ACT IV — GATE ══════════════════════════════════════ */}
        <section className="act a-gate rs" aria-hidden="true">
          <span className="act-num act-num-rs" aria-hidden="true">ACT&nbsp;IV</span>
          <div className="flank-line flank-a" />
          <div className="gate-stage">
            <div className="gate-funnel-wrap">
              <div ref={gateParRef} className="par-wrap">
                <img className="gate-funnel-img" src={IMG.funnel} alt="" draggable={false} />
              </div>
            </div>
          </div>
          <div className="flank-line flank-b" />
        </section>

        {/* ══ ACT V — EXPERIENCE ══════════════════════════════════ */}
        <section className="act a-exp rs" aria-labelledby="exp-title">
          <span className="act-num act-num-rs" aria-hidden="true">ACT&nbsp;V</span>
          <div className="shell">
            <h2 id="exp-title" className="st exp-h2">The Experience</h2>
            {/* 4. Section lead copy */}
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
                <Card key={b.href} href={b.href} title={b.label} dark={b.dark}
                  style={{ '--card-delay': `${380 + i * 110}ms` } as CSSProperties}
                />
              ))}
            </nav>
          </div>
        </section>
      </main>

      {/* ══ NAV OVERRIDES ══════════════════════════════════════════ */}
      <style jsx global>{`
        html, body, #__next {
          margin: 0; min-height: 100%;
          background: ${C.cream}; color: ${C.ink};
          font-family: ${MONO}; -webkit-font-smoothing: antialiased;
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
          backdrop-filter: blur(18px) !important; -webkit-backdrop-filter: blur(18px) !important;
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

      {/* ══ PAGE STYLES ════════════════════════════════════════════ */}
      <style jsx global>{`

        /* ─ global ─────────────────────────────────────────────── */
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
          opacity: .45;
        }
        .act  { position: relative; z-index: 2; }
        .shell { width: 68%; max-width: 1140px; margin: 0 auto; }

        /* ─ 1. cinematic curtain ────────────────────────────────── */
        .curtain {
          position: fixed; inset: 0; z-index: 99999;
          background: #0B0906;
          pointer-events: none;
          opacity: 1;
          transition: opacity 2.1s cubic-bezier(.4,0,.2,1);
        }
        .curtain.is-up { opacity: 0; }

        /* ─ 5. CRT scanlines ─────────────────────────────────────── */
        .scanlines {
          position: fixed; inset: 0; z-index: 9997; pointer-events: none;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(28,28,26,.013) 3px,
            rgba(28,28,26,.013) 4px
          );
          mix-blend-mode: multiply;
        }

        /* ─ 2. scroll progress thread ──────────────────────────── */
        .scroll-thread {
          position: fixed;
          left: clamp(16px, 2.5vw, 32px);
          top: 0; bottom: 0;
          width: 1px;
          background: rgba(28,28,26,.1);
          z-index: 9998; pointer-events: none;
        }
        .scroll-thread-fill {
          position: absolute; top: 0; left: 0; width: 100%;
          height: 0%;
          background: rgba(28,28,26,.44);
          transition: height .08s linear;
        }

        /* ─ 3. act markers ───────────────────────────────────────── */
        .act-num {
          position: absolute;
          left: clamp(14px, 2.2vw, 36px);
          top: clamp(88px, 10.5vw, 124px);
          font-family: ${MONO};
          font-size: 8px; letter-spacing: .34em;
          color: rgba(28,28,26,.2);
          text-transform: uppercase; user-select: none; z-index: 4;
          opacity: 0;
        }
        /* hero act num — bottom of section */
        .a-hero .act-num {
          top: auto;
          bottom: clamp(28px, 4vw, 52px);
          animation: actNumIn 1.2s ease 2.6s forwards;
        }
        .rs.iv .act-num-rs { animation: actNumIn .9s ease .24s forwards; }

        /* ─ 6. parallax wrapper ──────────────────────────────────── */
        .par-wrap {
          transition: transform 0.72s cubic-bezier(.25,.46,.45,.94);
          will-change: transform;
        }

        /* ─ flank lines — vertical, gradient fade ───────────────── */
        .flank-line {
          width: 1px;
          height: clamp(120px, 16vh, 200px);
          margin: 0 auto;
          transform: scaleY(0);
        }
        .flank-a {
          background: linear-gradient(to bottom, transparent 0%, rgba(28,28,26,.4) 100%);
          transform-origin: bottom;
        }
        .flank-b {
          background: linear-gradient(to bottom, rgba(28,28,26,.4) 0%, transparent 100%);
          transform-origin: top;
        }
        .rs.iv .flank-a { animation: flankGrow 1.1s cubic-bezier(.25,.8,.25,1) .3s  forwards; }
        .rs.iv .flank-b { animation: flankGrow 1.1s cubic-bezier(.25,.8,.25,1) .8s  forwards; }

        /* ─ ACT I — HERO ─────────────────────────────────────────── */
        .a-hero {
          min-height: 100svh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; text-align: center;
          padding: clamp(88px,10vw,120px) clamp(20px,5vw,60px) clamp(60px,7vw,90px);
        }

        /* funnel drops in after curtain lifts */
        .hero-funnel-drop {
          display: flex; justify-content: center;
          margin-bottom: clamp(24px,3.5vw,40px);
          opacity: 0; transform: translateY(-80px);
          animation: heroDropIn 1.8s cubic-bezier(.22,1,.36,1) 2.2s forwards;
        }
        /* retro CRT chroma shift on funnel (replaces glitch) */
        .hero-funnel-img {
          display: block;
          width: min(44vw, 320px); height: auto;
          mix-blend-mode: multiply;
          filter: saturate(.9) contrast(.96);
          pointer-events: none; user-select: none;
          animation:
            funnelFloat  6.5s ease-in-out 4.2s infinite,
            funnelRetro 11s  linear      4.6s infinite;
        }

        .hero-copy { display: flex; flex-direction: column; align-items: center; gap: clamp(12px,1.6vw,20px); }

        /* title squeezes out of funnel's narrow base */
        .hero-h1 {
          font-family: ${MONO};
          font-size: clamp(64px,12.5vw,186px);
          font-weight: 700; text-transform: uppercase;
          color: ${C.ink}; text-shadow: .018em 0 0 currentColor;
          line-height: .88; letter-spacing: -.01em; margin: 0;
          opacity: 0; transform: translateY(-28px) scaleY(.35);
          transform-origin: top center;
          animation:
            titleFromFunnel .9s cubic-bezier(.34,1.56,.64,1) 3.4s forwards,
            stIdle          7.5s steps(2,end)                 5.0s infinite;
        }
        .hero-addr {
          font-size: clamp(11px,1.1vw,16px); letter-spacing: .26em;
          font-weight: 700; text-transform: uppercase; color: ${C.pink}; margin: 0;
        }
        .tt-hero {
          display: inline-block; overflow: hidden; clip-path: inset(0 100% 0 0);
          animation: typeIn .52s steps(33,end) 4.6s forwards;
        }
        /* 4. hero tagline copy */
        .hero-tagline {
          margin: clamp(2px,.4vw,6px) 0 0;
          font-size: clamp(9px,.9vw,11px); letter-spacing: .26em;
          text-transform: uppercase; color: rgba(28,28,26,.36);
        }
        .tt-tag {
          display: inline-block; overflow: hidden; clip-path: inset(0 100% 0 0);
          animation: typeIn .7s steps(28,end) 6.2s forwards;
        }

        /* ─ ACT II — OBELISK ──────────────────────────────────────── */
        .a-monolith {
          display: flex; flex-direction: column; align-items: center;
          padding: clamp(40px,5vh,60px) clamp(20px,4vw,40px);
        }
        .monolith-stage {
          display: flex; align-items: flex-end; justify-content: center;
          width: 100%; padding: clamp(20px,3vh,36px) 0; position: relative;
        }
        .monolith-stage::after {
          content: ''; position: absolute;
          bottom: clamp(20px,3vh,36px); left: 34%; right: 34%; height: 2px;
          background: radial-gradient(ellipse, rgba(28,28,26,.14), transparent 70%);
          filter: blur(6px); opacity: 0; transition: opacity 1.8s ease 2.6s;
        }
        .a-monolith.iv .monolith-stage::after { opacity: 1; }

        /* retro amber + cold cycles (replaces glitch) */
        .obelisk {
          display: block;
          height: clamp(280px,56svh,540px); width: auto;
          opacity: 0; transform: translateY(160px);
          mix-blend-mode: multiply;
          filter: contrast(.95) saturate(.88);
          pointer-events: none; user-select: none;
        }
        .a-monolith.iv .obelisk {
          animation:
            monolithRise   3.4s cubic-bezier(.22,1,.36,1)  .3s forwards,
            monolithPulse  5.5s ease-in-out                4.4s infinite,
            obeliskRetro  14s  linear                      5.2s infinite;
        }

        /* 4. coordinates copy */
        .mono-coords {
          font-family: ${MONO};
          font-size: 9px; letter-spacing: .28em;
          text-transform: uppercase; color: rgba(28,28,26,.22);
          text-align: center; margin: clamp(8px,1.2vw,14px) 0 0;
          opacity: 0;
        }
        .a-monolith.iv .mono-coords { animation: coordsIn .8s ease 3.9s forwards; }

        /* ─ ACT III — THE SPACE ───────────────────────────────────── */
        .a-space { padding: clamp(52px,7vw,90px) 0 clamp(44px,5vw,68px); }

        .st {
          font-family: ${MONO}; font-weight: 700; text-transform: uppercase;
          color: ${C.ink}; text-shadow: .018em 0 0 currentColor;
          line-height: .9; letter-spacing: 0; margin: 0; text-align: center;
          opacity: 0; clip-path: inset(0 100% 0 0); transform: translateX(-8px);
        }
        .rs.iv .st {
          animation: scanIn .52s steps(8,end) .28s forwards, stIdle 7.5s steps(2,end) 3.2s infinite;
        }
        .space-h2 { font-size: clamp(44px,5.5vw,86px); margin-bottom: clamp(6px,1vw,12px) !important; }
        .exp-h2   { font-size: clamp(38px,4.8vw,76px); margin-bottom: clamp(6px,1vw,12px) !important; }

        /* 4. section lead copy */
        .section-lead {
          font-family: ${MONO};
          font-size: clamp(9px,.88vw,11px); letter-spacing: .22em;
          text-transform: uppercase; color: rgba(28,28,26,.36);
          text-align: center;
          margin: 0 auto clamp(18px,2.5vw,32px);
          max-width: 520px; line-height: 1.8;
          opacity: 0; transform: translateY(5px);
        }
        .a-space.iv .section-lead { animation: leadIn .7s ease .82s forwards; }
        .a-exp.iv   .section-lead { animation: leadIn .7s ease .82s forwards; }

        .venue-stage {
          position: relative; width: 100%;
          min-height: clamp(240px,32vw,460px);
          display: flex; align-items: center; justify-content: center;
        }
        .venue-stage::before {
          content: ''; position: absolute;
          left: 9%; right: 9%; bottom: 10%; height: 14%; border-radius: 50%;
          background: radial-gradient(ellipse, rgba(28,28,26,.12), transparent 72%);
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
          filter: saturate(.78) contrast(1.02) drop-shadow(0 14px 24px rgba(28,28,26,.1)) drop-shadow(0 28px 50px rgba(28,28,26,.07));
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

        /* ─ ACT IV — GATE ─────────────────────────────────────────── */
        .a-gate {
          display: flex; flex-direction: column; align-items: center;
          padding: clamp(40px,5vh,60px) clamp(20px,4vw,40px);
        }
        .gate-stage {
          display: flex; align-items: center; justify-content: center;
          width: 100%; padding: clamp(20px,3vh,40px) 0;
        }
        .gate-funnel-wrap { opacity: 0; transform: translateY(40px) scale(.88); }
        .a-gate.iv .gate-funnel-wrap {
          animation: gateReveal 2.4s cubic-bezier(.2,.8,.2,1) .3s forwards;
        }
        .gate-funnel-img {
          display: block;
          width: min(46vw, 340px); height: auto;
          transform: scaleY(-1);
          mix-blend-mode: multiply;
          filter: saturate(.9) contrast(.96);
          pointer-events: none; user-select: none;
        }
        .a-gate.iv .gate-funnel-img {
          animation:
            funnelFloatInv 7s  ease-in-out  3s   infinite,
            funnelRetro   11s  linear       4.2s infinite;
        }

        /* ─ ACT V — EXPERIENCE ────────────────────────────────────── */
        .a-exp { padding: clamp(44px,6vw,80px) 0 clamp(80px,10vw,140px); }

        /* ─ timeline ──────────────────────────────────────────────── */
        .sig {
          --sy: 60px;
          position: relative; width: 100%;
          height: clamp(100px,13vw,150px);
          margin-top: clamp(24px,3vw,38px);
          margin-bottom: clamp(14px,1.8vw,24px);
          overflow: visible;
        }
        .sig-track { position: absolute; left: 0; right: 0; top: var(--sy); height: 2px; }
        .sig-line, .sig-fill { position: absolute; inset: 0; height: 2px; transform-origin: left; }
        .sig-line { background: rgba(28,28,26,.18); transform: scaleX(0); }
        .sig-fill  {
          background: linear-gradient(90deg, ${C.pink} 0%, rgba(212,80,122,.3) 100%);
          transform: scaleX(0); opacity: 0;
        }
        .a-exp.iv .sig-line { animation: sigLineIn .8s cubic-bezier(.25,.8,.25,1) .3s  forwards; }
        .a-exp.iv .sig-fill  { animation: sigFillLoop 9.6s ease-in-out 1.2s infinite; }

        .sig-tick { position: absolute; top: -5px; width: 1px; height: 12px; background: rgba(28,28,26,.22); opacity: 0; }
        .a-exp.iv .sig-tick { animation: tickIn .4s ease .9s forwards; }

        .sig-node { position: absolute; top: 0; opacity: 0; transform: translateY(10px); }
        .sn-dining { left: 0; }
        .sn-dark   { right: 0; text-align: right; }
        .a-exp.iv .sn-dining { animation: nodeIn .48s ease .6s forwards; }
        .a-exp.iv .sn-dark   { animation: nodeIn .48s ease .8s forwards; }

        .sig-time {
          display: block;
          font-size: clamp(20px,2.4vw,32px); font-weight: 700;
          letter-spacing: .06em; line-height: 1;
          color: rgba(28,28,26,.72); white-space: nowrap;
        }
        .a-exp.iv .sn-dining .sig-time { animation: timeDining 9.6s ease-in-out 1.2s infinite; }
        .a-exp.iv .sn-dark   .sig-time { animation: timeDark   9.6s ease-in-out 1.2s infinite; }

        .sig-dot {
          position: absolute; top: var(--sy);
          width: 22px; height: 22px;
          border-radius: 999px; background: #8A8680;
          transform: translateY(-50%); z-index: 2; overflow: visible;
        }
        .sn-dining .sig-dot { left: -5px; }
        .sn-dark   .sig-dot { right: -5px; }

        .sig-sonar {
          position: absolute; inset: 0; border-radius: 50%;
          border: 1.5px solid rgba(28,28,26,.35);
          transform: scale(1); opacity: 0;
        }
        .a-exp.iv .sn-dining .sig-sonar { animation: sonarRing 3.2s ease-out 1.0s infinite; }
        .a-exp.iv .sn-dark   .sig-sonar { animation: sonarRing 3.2s ease-out 1.7s infinite; }

        .sig-dot-fill { position: absolute; inset: 0; border-radius: inherit; background: ${C.pink}; opacity: 0; }
        .a-exp.iv .sn-dining .sig-dot-fill { animation: dotDining 9.6s ease-in-out 1.2s infinite; }
        .a-exp.iv .sn-dark   .sig-dot-fill { animation: dotDark   9.6s ease-in-out 1.2s infinite; }

        .exp-nav { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 14px; }

        /* ─ cards ─────────────────────────────────────────────────── */
        .card {
          position: relative; min-height: clamp(72px,7vw,100px);
          display: flex; flex-direction: column; justify-content: center; gap: 5px;
          padding: clamp(14px,1.4vw,20px) clamp(16px,1.8vw,24px);
          border: 1px solid transparent; background: rgba(232,226,212,.32);
          color: ${C.ink}; text-decoration: none;
          box-shadow: 6px 6px 0 rgba(28,28,26,0); overflow: hidden;
          opacity: 0; transform: translateY(12px);
          transition: transform .22s, background .22s, color .22s, box-shadow .22s;
        }
        .rs.iv .card { animation: cardIn .52s ease var(--card-delay,300ms) forwards; }
        .card::before {
          content: ''; position: absolute; inset: 0;
          background:
            linear-gradient(135deg,rgba(212,80,122,.14),transparent 42%),
            repeating-linear-gradient(90deg,rgba(28,28,26,.05) 0 1px,transparent 1px 11px);
          opacity: 0; transition: opacity .22s;
        }
        .card::after {
          content: ''; position: absolute; inset: 0;
          border: 1px solid rgba(28,28,26,.44); pointer-events: none;
          clip-path: inset(0 100% 100% 0);
        }
        .rs.iv .card::after { animation: borderDraw .62s ease calc(var(--card-delay,300ms) + 80ms) forwards; }
        .card-title { display: block; position: relative; z-index: 1; font-size: clamp(16px,1.6vw,25px); font-weight: 700; line-height: .95; text-transform: uppercase; text-shadow: .012em 0 0 currentColor; }
        .card-meta  { display: inline-flex; align-items: center; gap: 4px; position: relative; z-index: 1; color: rgba(28,28,26,.54); font-size: 10px; letter-spacing: .18em; text-transform: uppercase; }
        .card:hover,.card:focus-visible,.card.is-active { background: rgba(212,80,122,.09); box-shadow: 10px 10px 0 rgba(212,80,122,.12); transform: translate(-3px,-3px); outline: none; }
        .card:hover::before,.card:focus-visible::before,.card.is-active::before { opacity: 1; }
        .card:hover::after,.card:focus-visible::after,.card.is-active::after { border-color: rgba(212,80,122,.82); }
        .card.is-dark { background: ${C.ink}; color: ${C.cream}; }
        .card.is-dark .card-meta { color: rgba(232,226,212,.6); }
        .card.is-dark:hover,.card.is-dark:focus-visible { background: ${C.pink}; color: ${C.cream}; }

        /* ══════════════════════════════════════════════════════════
           KEYFRAMES
        ══════════════════════════════════════════════════════════ */

        @keyframes flankGrow    { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        @keyframes actNumIn     { to { opacity: 1; } }
        @keyframes coordsIn     { to { opacity: 1; } }
        @keyframes leadIn       { to { opacity: 1; transform: translateY(0); } }

        @keyframes heroDropIn   { to { opacity: 1; transform: translateY(0); } }

        /* title pours / squeezes out of the funnel's narrow base */
        @keyframes titleFromFunnel {
          0%   { opacity: 0; transform: translateY(-28px) scaleY(.35); filter: blur(2px); }
          60%  { opacity: 1; transform: translateY(4px) scaleY(1.06); filter: blur(0); }
          80%  { transform: translateY(-2px) scaleY(.98); }
          100% { opacity: 1; transform: translateY(0) scaleY(1); filter: blur(0); }
        }

        @keyframes scanIn {
          0%   { opacity:0; clip-path:inset(0 100% 0 0); transform:translateX(-8px); filter:blur(1.5px); }
          60%  { opacity:1; clip-path:inset(0 0 0 0);    transform:translateX(0);    filter:blur(0); }
          74%  { transform:translateX(4px); }
          86%  { transform:translateX(-2px); }
          100% { opacity:1; clip-path:inset(0 0 0 0);    transform:translateX(0);    filter:blur(0); }
        }
        @keyframes stIdle {
          0%,92%,100% { filter:none; text-shadow:.018em 0 0 currentColor; }
          93% { filter:blur(.2px); text-shadow:.018em 0 0 currentColor,.08em 0 0 rgba(212,80,122,.26); }
          94% { filter:none; text-shadow:.018em 0 0 currentColor,-.06em 0 0 rgba(122,120,112,.22); }
          96% { filter:none; text-shadow:.018em 0 0 currentColor; }
        }
        @keyframes typeIn { to { clip-path:inset(0 0 0 0); } }

        /* funnel float */
        @keyframes funnelFloat {
          0%,100% { transform: translateY(0) rotate(0deg); }
          33%     { transform: translateY(-14px) rotate(.5deg); }
          66%     { transform: translateY(-7px) rotate(-.3deg); }
        }
        @keyframes funnelFloatInv {
          0%,100% { transform: scaleY(-1) translateY(0); }
          33%     { transform: scaleY(-1) translateY(-14px); }
          66%     { transform: scaleY(-1) translateY(-7px); }
        }

        /* funnel retro: CRT chroma shift then phosphor bloom */
        @keyframes funnelRetro {
          0%      { filter: saturate(.9) contrast(.96); }
          18%     { filter: saturate(.9) contrast(.96); }
          22%     { filter: saturate(1.08) contrast(.98) hue-rotate(-14deg) brightness(1.04); }
          26%     { filter: saturate(1.18) contrast(1.0) hue-rotate(-22deg) brightness(1.07); }
          30%     { filter: saturate(.86) contrast(.94) hue-rotate(10deg); }
          34%     { filter: saturate(.9) contrast(.96); }
          62%     { filter: saturate(.9) contrast(.96); }
          66%     { filter: saturate(.94) contrast(.98) brightness(1.10); }
          70%     { filter: saturate(.82) contrast(.90) brightness(1.20) blur(.5px); }
          74%     { filter: saturate(.9) contrast(.96) blur(0); }
          100%    { filter: saturate(.9) contrast(.96); }
        }

        /* obelisk retro: amber awakening then cold power surge */
        @keyframes monolithRise {
          0%  { opacity:0; transform:translateY(160px); }
          10% { opacity:1; }
          100%{ opacity:1; transform:translateY(0); }
        }
        @keyframes monolithPulse {
          0%,100% { transform:translateY(0) scale(1); }
          50%     { transform:translateY(-8px) scale(1.005); }
        }
        @keyframes obeliskRetro {
          0%      { filter: contrast(.95) saturate(.88); }
          22%     { filter: contrast(.95) saturate(.88); }
          28%     { filter: contrast(1.02) saturate(.6) sepia(.32) brightness(1.06) hue-rotate(-6deg); }
          34%     { filter: contrast(1.08) saturate(.28) sepia(.62) brightness(1.14) hue-rotate(-11deg); }
          40%     { filter: contrast(1.04) saturate(.48) sepia(.28) brightness(1.07) hue-rotate(-4deg); }
          46%     { filter: contrast(.95) saturate(.88); }
          70%     { filter: contrast(.95) saturate(.88); }
          73%     { filter: contrast(1.2) saturate(.1) brightness(1.28); }
          76%     { filter: contrast(1.1) saturate(.3) brightness(1.10); }
          80%     { filter: contrast(.95) saturate(.88); }
          100%    { filter: contrast(.95) saturate(.88); }
        }

        /* gate funnel */
        @keyframes gateReveal {
          0%   { opacity:0; transform:translateY(40px) scale(.88); }
          100% { opacity:1; transform:translateY(0) scale(1); }
        }

        /* venue */
        @keyframes shadowIn  { to { opacity:.34; transform:rotate(-3deg) scaleX(1); } }
        @keyframes venueIn   { to { opacity:1;   transform:translateY(0) scale(1); } }
        @keyframes venueFloat {
          0%,100% { transform:translateY(0) rotate(-.15deg); }
          50%     { transform:translateY(-9px) rotate(.22deg); }
        }
        @keyframes glitchA {
          0%,72%,100%{ opacity:0; transform:translate3d(0,0,0); clip-path:inset(0 0 0 0); }
          73%{ opacity:.18; transform:translate3d(-8px,-3px,0); clip-path:inset(0% 0 82% 0); }
          74%{ opacity:.20; transform:translate3d(10px,4px,0);  clip-path:inset(18% 0 56% 0); }
          76%{ opacity:.16; transform:translate3d(8px,5px,0);   clip-path:inset(54% 0 14% 0); }
          78%{ opacity:0;   transform:translate3d(0,0,0);       clip-path:inset(0 0 0 0); }
        }
        @keyframes glitchB {
          0%,72%,100%{ opacity:0; transform:translate3d(0,0,0); clip-path:inset(0 0 0 0); }
          73.2%{ opacity:.12; transform:translate3d(7px,5px,0);   clip-path:inset(8% 0 72% 0); }
          74.8%{ opacity:.14; transform:translate3d(-8px,-3px,0); clip-path:inset(26% 0 44% 0); }
          76.4%{ opacity:.10; transform:translate3d(4px,-5px,0);  clip-path:inset(62% 0 8% 0); }
          78%  { opacity:0;   transform:translate3d(0,0,0);       clip-path:inset(0 0 0 0); }
        }

        /* timeline */
        @keyframes sigLineIn  { to { transform:scaleX(1); } }
        @keyframes sigFillLoop {
          0%,17%   { transform:scaleX(0); opacity:0; }
          22%      { transform:scaleX(0); opacity:1; }
          56%      { transform:scaleX(1); opacity:1; }
          72%,100% { transform:scaleX(1); opacity:0; }
        }
        @keyframes tickIn   { to { opacity:1; } }
        @keyframes nodeIn   { to { opacity:1; transform:translateY(0); } }
        @keyframes sonarRing {
          0%   { transform:scale(1);   opacity:.55; }
          75%  { transform:scale(3.2); opacity:0; }
          100% { transform:scale(1);   opacity:0; }
        }
        @keyframes dotDining  { 0%,17%{opacity:0} 22%,62%{opacity:1} 78%,100%{opacity:0} }
        @keyframes dotDark    { 0%,47%{opacity:0} 56%,70%{opacity:1} 84%,100%{opacity:0} }
        @keyframes timeDining { 0%,17%{color:rgba(28,28,26,.72)} 22%,62%{color:${C.pink}} 78%,100%{color:rgba(28,28,26,.72)} }
        @keyframes timeDark   { 0%,47%{color:rgba(28,28,26,.72)} 56%,70%{color:${C.pink}} 84%,100%{color:rgba(28,28,26,.72)} }

        /* cards */
        @keyframes cardIn { to { opacity:1; transform:translateY(0); box-shadow:6px 6px 0 rgba(28,28,26,.07); } }
        @keyframes borderDraw {
          0%   { clip-path:inset(0 100% 100% 0); }
          45%  { clip-path:inset(0 0 100% 0); }
          100% { clip-path:inset(0 0 0 0); }
        }

        /* ─ responsive ─────────────────────────────────────────── */
        @media (max-width:1280px) { .shell { width:76%; } }
        @media (max-width:980px) {
          .shell { width:86%; }
          .zone-nav { grid-template-columns:1fr; }
          .hero-funnel-img { width:min(58vw,290px); }
          .gate-funnel-img { width:min(60vw,300px); }
        }
        @media (max-width:820px) {
          .bg-tex { background-size:cover; background-repeat:no-repeat; }
          .shell { width:calc(100% - 40px); max-width:none; }
          .a-hero { padding-top:96px; }
          .hero-funnel-img { width:min(66vw,260px); }
          .hero-h1 { font-size:clamp(50px,13vw,86px); }
          .obelisk { height:clamp(240px,50svh,420px); }
          .gate-funnel-img { width:min(72vw,280px); }
          .sig { --sy:50px; height:clamp(90px,12vw,130px); }
          .sig-time { font-size:clamp(17px,4.5vw,26px); }
          .exp-nav { gap:10px; }
          .section-lead { font-size:clamp(8px,2.2vw,10px); }
        }
        @media (max-width:640px) {
          /* hide scroll thread and act numbers — too tight on mobile */
          .scroll-thread, .act-num { display: none; }
        }
        @media (max-width:520px) {
          .shell { width:calc(100% - 28px); }
          .a-hero { padding-top:88px; }
          .hero-funnel-img { width:min(76vw,230px); }
          .hero-h1 { font-size:clamp(44px,12.5vw,68px); }
          .obelisk { height:clamp(210px,46svh,380px); }
          .gate-funnel-img { width:min(80vw,240px); }
          .exp-nav { grid-template-columns:1fr; gap:8px; }
          .sig { --sy:46px; }
          .sig-time { font-size:clamp(16px,4vw,22px); }
          .hero-tagline { display:none; }
        }
        @media (max-width:380px) {
          .card-title { font-size:16px; }
          .sig-time { font-size:15px; }
        }

        /* ─ reduced motion ─────────────────────────────────────── */
        @media (prefers-reduced-motion:reduce) {
          .curtain { transition: none !important; opacity: 0; }
          .hero-funnel-drop, .hero-h1, .tt-hero, .tt-tag, .st,
          .flank-line, .obelisk, .gate-funnel-wrap, .gate-funnel-img, .hero-funnel-img,
          .venue-wrap, .vg-a, .vg-b, .v-hl.on,
          .sig-line, .sig-fill, .sig-tick, .sig-node, .sig-sonar, .sig-dot-fill, .sig-time,
          .mono-coords, .section-lead, .act-num, .scroll-thread-fill,
          .card, .card::after { animation:none !important; transition:none !important; }
          .par-wrap { transition: none !important; }
          .flank-line { transform:none; }
          .hero-funnel-drop, .hero-funnel-img, .gate-funnel-wrap { opacity:1; transform:none; }
          .gate-funnel-img { transform:scaleY(-1); }
          .hero-h1 { opacity:1; transform:none; }
          .st { opacity:1; clip-path:inset(0 0 0 0); transform:none; }
          .tt-hero, .tt-tag { clip-path:inset(0 0 0 0); }
          .obelisk { opacity:1; transform:none; }
          .venue-wrap, .sig-node, .card { opacity:1; transform:none; }
          .sig-line { transform:none; }
          .card::after { clip-path:inset(0 0 0 0); }
          .mono-coords, .section-lead, .act-num { opacity:1; transform:none; }
        }
      `}</style>
    </>
  );
}

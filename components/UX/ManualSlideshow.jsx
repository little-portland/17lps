'use client';

import { useEffect, useRef, useState } from 'react';

const images = [
  '/images/override/slide01.png',
  '/images/override/slide02.gif',
  '/images/override/slide03.png',
  '/images/override/slide04.png',
  '/images/override/slide05.png',
  '/images/override/slide06.png',
];

export default function CenterPeekCarousel({
  interval = 3500,
  transitionMs = 600,
  sideBorderPx = 5,
  sideBorderColor = '#000',
}) {
  const real = images.length;
  const slides = [images[real - 1], ...images, images[0]];

  // viewport is what the carousel actually uses; slideW = viewportW / 2
  const [viewportW, setViewportW] = useState(0);
  const slideW = Math.max(1, Math.floor(viewportW / 2));

  const viewportRef = useRef(null);
  const trackRef = useRef(null);

  // index in `slides` (1..real) are the "real" slides; 0 and real+1 are clones
  const [idx, setIdx] = useState(1);
  const idxRef = useRef(idx);
  idxRef.current = idx;

  const [paused, setPaused] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);

  const autoplayRef = useRef(null);
  const draggingRef = useRef(false);
  const animatingRef = useRef(false);     // <-- NEW: block input during transitions
  const startXRef = useRef(0);
  const startTxRef = useRef(0);
  const skipTransitionRef = useRef(false);

  // ---------- Preload originals so clones never pop in ----------
  useEffect(() => {
    let cancelled = false;
    const preload = async () => {
      const load = (src) =>
        new Promise((res) => {
          const img = new Image();
          img.onload = img.onerror = res;
          img.decoding = 'async';
          img.src = src;
        });
      await Promise.all(images.map(load));
      if (!cancelled) setAllLoaded(true);
    };
    preload();
    return () => { cancelled = true; };
  }, []);

  // ---------- Measure & keep centered on all screens ----------
  useEffect(() => {
    const measure = () => {
      const vw = Math.max(320, window.innerWidth || 0);
      const desiredCenter =
        vw < 768 ? Math.round(vw * 0.78) : Math.round(Math.max(520, Math.min(640, vw * 0.42)));
      const viewport = Math.min(desiredCenter * 2, vw);
      setViewportW(viewport);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // ---------- Helpers ----------
  const clearAutoplay = () => {
    if (autoplayRef.current) clearTimeout(autoplayRef.current);
    autoplayRef.current = null;
  };

  const setTranslate = (x, withTransition = true) => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transition = withTransition ? `transform ${transitionMs}ms ease` : 'none';
    track.style.transform = `translate3d(${x}px,0,0)`;
  };

  const currentOffset = () => (slideW / 2) - (idx * slideW);

  // apply translate when idx/slideW changes
  useEffect(() => {
    if (!slideW) return;
    setTranslate(currentOffset(), !skipTransitionRef.current);
    if (skipTransitionRef.current) requestAnimationFrame(() => (skipTransitionRef.current = false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, slideW]);

  // seamless loop resets + mark animation done
  useEffect(() => {
    const onEnd = () => {
      animatingRef.current = false; // <-- transition finished
      if (idxRef.current === 0) { skipTransitionRef.current = true; setIdx(real); }
      else if (idxRef.current === real + 1) { skipTransitionRef.current = true; setIdx(1); }
    };
    const t = trackRef.current;
    t?.addEventListener('transitionend', onEnd);
    return () => t?.removeEventListener('transitionend', onEnd);
  }, [real]);

  // autoplay (only after preload)
  useEffect(() => {
    if (!allLoaded || paused || draggingRef.current) return;
    clearAutoplay();
    autoplayRef.current = setTimeout(() => {
      animatingRef.current = true;
      setIdx((p) => p + 1);
    }, interval);
    return () => clearAutoplay();
  }, [idx, paused, interval, allLoaded]);

  // ---------- Pointer drag/swipe -> exactly ONE slide per gesture ----------
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;

    const down = (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      if (animatingRef.current) return;     // don't start a new drag mid-transition
      draggingRef.current = true;
      clearAutoplay();                      // <-- prevent stray timer from firing mid-drag
      vp.setPointerCapture(e.pointerId);
      startXRef.current = e.clientX;
      startTxRef.current = currentOffset();
      setTranslate(startTxRef.current, false); // kill transition for direct follow
      setPaused(true);
      vp.style.cursor = 'grabbing';
    };

    const move = (e) => {
      if (!draggingRef.current) return;
      const dx = e.clientX - startXRef.current;
      setTranslate(startTxRef.current + dx, false);
    };

    const end = (e) => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      vp.releasePointerCapture(e.pointerId);
      vp.style.cursor = 'grab';
      const dx = e.clientX - startXRef.current;

      // Decide exactly ONE step left/right based on threshold
      const threshold = Math.min(120, Math.max(30, slideW * 0.15));
      if (dx < -threshold) { animatingRef.current = true; setIdx((p) => p + 1); }   // next
      else if (dx > threshold) { animatingRef.current = true; setIdx((p) => p - 1); } // prev
      else { setTranslate(currentOffset(), true); } // snap back

      setTimeout(() => setPaused(false), 200);
    };

    const cancel = () => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      setTranslate(currentOffset(), true);
      setTimeout(() => setPaused(false), 200);
    };

    vp.addEventListener('pointerdown', down);
    vp.addEventListener('pointermove', move);
    vp.addEventListener('pointerup', end);
    vp.addEventListener('pointercancel', cancel);
    return () => {
      vp.removeEventListener('pointerdown', down);
      vp.removeEventListener('pointermove', move);
      vp.removeEventListener('pointerup', end);
      vp.removeEventListener('pointercancel', cancel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideW]);

  // hover pause (desktop)
  useEffect(() => {
    const vp = viewportRef.current;
    const onIn = () => setPaused(true);
    const onOut = () => setPaused(false);
    vp?.addEventListener('mouseenter', onIn);
    vp?.addEventListener('mouseleave', onOut);
    return () => {
      vp?.removeEventListener('mouseenter', onIn);
      vp?.removeEventListener('mouseleave', onOut);
    };
  }, []);

  const fadeW = slideW;

  const slideOuter = {
    flex: '0 0 auto',
    width: `${slideW}px`,
    boxSizing: 'border-box',
    borderLeft: `${sideBorderPx}px solid ${sideBorderColor}`,
    borderRight: `${sideBorderPx}px solid ${sideBorderColor}`,
    willChange: 'transform',
  };

  const imgProps = (i) => {
    const isCloneEdge = i === 0 || i === slides.length - 1 || i === 1;
    return {
      loading: 'eager',
      decoding: 'async',
      fetchPriority: isCloneEdge ? 'high' : 'auto',
      draggable: false,
      style: {
        width: '100%',
        height: 'auto',
        display: 'block',
        userSelect: 'none',
        WebkitUserDrag: 'none',
      },
    };
  };

  return (
    <div style={{ width: '100%', margin: '0 auto' }}>
      <div
        ref={viewportRef}
        aria-roledescription="carousel"
        style={{
          position: 'relative',
          width: viewportW ? `${viewportW}px` : '100%',
          maxWidth: '100%',
          margin: '0 auto',            // centered mobile & desktop
          overflow: 'hidden',
          background: '#000',
          touchAction: 'pan-y',        // vertical scroll ok, horizontal handled by us
          cursor: 'grab',
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            transform: `translate3d(${(slideW / 2) - (idx * slideW)}px,0,0)`,
            willChange: 'transform',
          }}
        >
          {slides.map((src, i) => (
            <div key={`${src}-${i}`} style={slideOuter}>
              <img src={src} alt={`slide-${i}`} {...imgProps(i)} />
            </div>
          ))}
        </div>

        {/* Fades over the visible halves */}
        <div
          style={{
            position: 'absolute',
            left: 0, top: 0, bottom: 0,
            width: `${fadeW}px`,
            pointerEvents: 'none',
            background:
              'linear-gradient(90deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.75) 35%, rgba(0,0,0,0.1) 85%, rgba(0,0,0,0) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 0, top: 0, bottom: 0,
            width: `${fadeW}px`,
            pointerEvents: 'none',
            background:
              'linear-gradient(-90deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.75) 35%, rgba(0,0,0,0.1) 85%, rgba(0,0,0,0) 100%)',
          }}
        />
      </div>
    </div>
  );
}

'use client';

import React, { useEffect, useRef, useState } from 'react';

const images = [
  '/images/override/slide01.png',
  '/images/override/slide02.gif',
  '/images/override/slide03.png',
  '/images/override/slide04.png',
  '/images/override/slide05.png',
  '/images/override/slide06.png',
];

export default function InfiniteAutoCarousel({
  interval = 3500,
  transitionMs = 600,
}) {
  // Build slides with clones for seamless looping
  const slides = [images[images.length - 1], ...images, images[0]]; // cloned last + originals + cloned first
  const n = images.length; // real slides count

  const containerRef = useRef(null);
  const trackRef = useRef(null);

  // index refers to position in `slides` array; start at 1 (first real slide)
  const [index, setIndex] = useState(1);
  const indexRef = useRef(index);
  indexRef.current = index;

  // measured container width (used to calculate translate offsets)
  const [containerWidth, setContainerWidth] = useState(0);

  // peek (px) — how much of prev/next to reveal on each side
  const peekRef = useRef(80); // will be adjusted on resize
  const [isPaused, setIsPaused] = useState(false);

  // dragging state
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const lastTranslateRef = useRef(0); // current translateX when dragging begins

  // used to suppress transition during clone-jump fix
  const skipTransitionRef = useRef(false);

  // autoplay timer ref
  const autoplayRef = useRef(null);

  // Helper: set transform on track (px)
  const setTrackTranslate = (xPx, withTransition = true) => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transition = withTransition
      ? `transform ${transitionMs}ms cubic-bezier(.22,.9,.26,1)`
      : 'none';
    track.style.transform = `translateX(${xPx}px)`;
  };

  // Recalculate sizes (containerWidth & peek) on mount & resize
  useEffect(() => {
    const measure = () => {
      const c = containerRef.current;
      if (!c) return;
      const w = c.clientWidth || 0;
      setContainerWidth(w);
      // peek responsive: 6% of width but bounded
      const peek = Math.round(Math.max(28, Math.min(140, w * 0.06)));
      peekRef.current = peek;
      // set immediate translate to current index (no transition) to avoid jump artifacts during resize
      const translate = -indexRef.current * w;
      setTrackTranslate(translate, false);
    };

    measure();
    // ResizeObserver for robust responsive handling
    let ro = null;
    if (window.ResizeObserver) {
      ro = new ResizeObserver(measure);
      if (containerRef.current) ro.observe(containerRef.current);
    } else {
      window.addEventListener('resize', measure);
    }
    return () => {
      if (ro && containerRef.current) ro.unobserve(containerRef.current);
      window.removeEventListener('resize', measure);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When index changes, update track transform (with transition unless suppressed)
  useEffect(() => {
    if (!containerWidth) return;
    const translate = -index * containerWidth;
    const withTransition = !skipTransitionRef.current;
    setTrackTranslate(translate, withTransition);
    // clear skip flag after one render so subsequent moves animate
    if (skipTransitionRef.current) {
      // next paint allow normal transitions
      requestAnimationFrame(() => {
        skipTransitionRef.current = false;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, containerWidth]);

  // Transition end handler to do the clone reset (seamless loop)
  useEffect(() => {
    const onTransitionEnd = () => {
      // If we are on the left cloned slide (index === 0) -> jump to real last (n)
      if (indexRef.current === 0) {
        skipTransitionRef.current = true;
        setIndex(n);
        // direct set translate without transition handled by effect (skipTransitionRef)
      }
      // If on the right cloned slide (index === n + 1) -> jump to real first (1)
      if (indexRef.current === n + 1) {
        skipTransitionRef.current = true;
        setIndex(1);
      }
    };
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener('transitionend', onTransitionEnd);
    return () => track.removeEventListener('transitionend', onTransitionEnd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n]);

  // Autoplay: advance index to the right (images move left)
  useEffect(() => {
    if (isPaused || isDraggingRef.current) return;
    autoplayRef.current = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, interval);
    return () => clearTimeout(autoplayRef.current);
  }, [index, isPaused, interval]);

  // Advance helpers
  const next = () => setIndex((prev) => prev + 1);
  const prev = () => setIndex((prev) => prev - 1);

  // ----- Drag / swipe handlers (pointer-based) -----
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onPointerDown = (e) => {
      // only primary button
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      isDraggingRef.current = true;
      startXRef.current = e.clientX;
      lastTranslateRef.current = -indexRef.current * containerWidth;
      // prevent image dragging
      container.setPointerCapture(e.pointerId);
      // disable transition while dragging
      setTrackTranslate(lastTranslateRef.current, false);
      setIsPaused(true); // pause autoplay while dragging
    };

    const onPointerMove = (e) => {
      if (!isDraggingRef.current) return;
      const delta = e.clientX - startXRef.current;
      // live move
      setTrackTranslate(lastTranslateRef.current + delta, false);
    };

    const onPointerUp = (e) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      container.releasePointerCapture(e.pointerId);
      const delta = e.clientX - startXRef.current;
      const threshold = Math.max(50, containerWidth * 0.12); // require this much move to change slide
      if (delta < -threshold) {
        // swiped left -> next slide
        next();
      } else if (delta > threshold) {
        // swiped right -> prev slide
        prev();
      } else {
        // insufficient movement, snap back to current
        setTrackTranslate(-indexRef.current * containerWidth, true);
      }
      // resume autoplay shortly
      setTimeout(() => setIsPaused(false), 300);
    };

    const onPointerCancel = (e) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      container.releasePointerCapture(e.pointerId);
      setTrackTranslate(-indexRef.current * containerWidth, true);
      setTimeout(() => setIsPaused(false), 300);
    };

    container.addEventListener('pointerdown', onPointerDown);
    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerup', onPointerUp);
    container.addEventListener('pointercancel', onPointerCancel);

    return () => {
      container.removeEventListener('pointerdown', onPointerDown);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('pointercancel', onPointerCancel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerWidth]);

  // mouse hover pause
  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    const onEnter = () => setIsPaused(true);
    const onLeave = () => setIsPaused(false);
    c.addEventListener('mouseenter', onEnter);
    c.addEventListener('mouseleave', onLeave);
    return () => {
      c.removeEventListener('mouseenter', onEnter);
      c.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  // utility: compute CSS for each slide (so each slide outer width == container width)
  // The slide element itself will be width: calc(100% - 2*peek px) and margin-left/right = peek px.
  const peek = peekRef.current;
  const slideInnerWidthStyle = {
    flex: `0 0 calc(100% - ${peek * 2}px)`,
    margin: `0 ${peek}px`,
  };

  // overlay gradients to fade edges like your screenshot (left & right)
  const edgeFadeStyle = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: `${peek + 8}px`,
    pointerEvents: 'none',
    zIndex: 20,
  };

  // Prevent images from being draggable (improves pointer drag UX)
  const imgStyle = { width: '100%', height: 'auto', display: 'block', userSelect: 'none', WebkitUserDrag: 'none' };

  return (
    <div
      ref={containerRef}
      aria-roledescription="carousel"
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        // background if you want the faded edges to blend (match your page background)
        background: '#000',
      }}
    >
      {/* Track: contains clones + slides */}
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          alignItems: 'stretch',
          // initial placement - index starts at 1; set transform after measuring container
          transform: `translateX(${-index * containerWidth}px)`,
        }}
      >
        {slides.map((src, i) => (
          <div key={i} style={slideInnerWidthStyle}>
            <img src={src} alt={`slide-${i}`} style={imgStyle} draggable={false} />
          </div>
        ))}
      </div>

      {/* left fade */}
      <div
        style={{
          ...edgeFadeStyle,
          left: 0,
          background:
            'linear-gradient(90deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.75) 40%, rgba(0,0,0,0) 100%)',
        }}
      />
      {/* right fade */}
      <div
        style={{
          ...edgeFadeStyle,
          right: 0,
          background:
            'linear-gradient(-90deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.75) 40%, rgba(0,0,0,0) 100%)',
        }}
      />

      {/* subtle center highlight (optional) to emphasize the focused slide */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 10,
          // nothing intrusive; helps keep screen like your example
          boxShadow: 'inset 0 0 120px rgba(0,0,0,0.25)',
        }}
      />
    </div>
  );
}

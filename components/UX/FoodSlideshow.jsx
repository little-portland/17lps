'use client';

import { useEffect, useRef, useState } from 'react';

const images = [
  '/images/food/slide01.png',
  '/images/food/slide02.png',
  '/images/food/slide03.png',
  '/images/food/slide04.png',
  '/images/food/slide05.png',
  '/images/food/slide06.png',
];

export default function FullWidthCarousel({
  transitionMs = 600,
}) {
  const real = images.length;
  const slides = [images[real - 1], ...images, images[0]];

  const viewportRef = useRef(null);
  const trackRef = useRef(null);

  const [viewportW, setViewportW] = useState(0);
  const [idx, setIdx] = useState(1);

  const idxRef = useRef(idx);
  idxRef.current = idx;

  const draggingRef = useRef(false);
  const animatingRef = useRef(false);
  const startXRef = useRef(0);
  const startTxRef = useRef(0);
  const skipTransitionRef = useRef(false);

  // ---------- Measure Full Width ----------
  useEffect(() => {
    const measure = () => {
      setViewportW(window.innerWidth);
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const slideW = viewportW;

  // ---------- Helpers ----------
  const setTranslate = (x, withTransition = true) => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transition = withTransition
      ? `transform ${transitionMs}ms ease`
      : 'none';
    track.style.transform = `translate3d(${x}px,0,0)`;
  };

  const offsetForIndex = (i) => -i * slideW;

  const normalizeIfClone = () => {
    let i = idxRef.current;

    if (i === 0) {
      skipTransitionRef.current = true;
      setIdx(real);
      setTranslate(offsetForIndex(real), false);
      i = real;
    } else if (i === real + 1) {
      skipTransitionRef.current = true;
      setIdx(1);
      setTranslate(offsetForIndex(1), false);
      i = 1;
    }

    return i;
  };

  // Apply translate on index change
  useEffect(() => {
    if (!slideW) return;

    setTranslate(offsetForIndex(idx), !skipTransitionRef.current);

    if (skipTransitionRef.current) {
      requestAnimationFrame(() => (skipTransitionRef.current = false));
    }
  }, [idx, slideW]);

  // Seamless looping
  useEffect(() => {
    const onEnd = () => {
      animatingRef.current = false;
      normalizeIfClone();
    };

    const t = trackRef.current;
    t?.addEventListener('transitionend', onEnd);
    return () => t?.removeEventListener('transitionend', onEnd);
  }, [real]);

  // ---------- Swipe ----------
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;

    const down = (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      if (animatingRef.current) return;

      draggingRef.current = true;
      normalizeIfClone();

      vp.setPointerCapture(e.pointerId);
      startXRef.current = e.clientX;
      startTxRef.current = offsetForIndex(idxRef.current);

      setTranslate(startTxRef.current, false);
      e.preventDefault?.();
    };

    const move = (e) => {
      if (!draggingRef.current) return;
      const dx = e.clientX - startXRef.current;
      setTranslate(startTxRef.current + dx, false);
    };

    const up = (e) => {
      if (!draggingRef.current) return;

      draggingRef.current = false;
      vp.releasePointerCapture(e.pointerId);

      const dx = e.clientX - startXRef.current;
      const threshold = slideW * 0.15;

      if (dx < -threshold) {
        animatingRef.current = true;
        setIdx((p) => p + 1);
      } else if (dx > threshold) {
        animatingRef.current = true;
        setIdx((p) => p - 1);
      } else {
        setTranslate(offsetForIndex(idxRef.current), true);
      }
    };

    vp.addEventListener('pointerdown', down);
    vp.addEventListener('pointermove', move);
    vp.addEventListener('pointerup', up);

    return () => {
      vp.removeEventListener('pointerdown', down);
      vp.removeEventListener('pointermove', move);
      vp.removeEventListener('pointerup', up);
    };
  }, [slideW]);

  const slideOuter = {
    flex: '0 0 100%',
    width: '100%',
  };

  const imgStyle = {
    width: '100%',
    height: 'auto',
    display: 'block',
    userSelect: 'none',
    WebkitUserDrag: 'none',
  };

  return (
    <div
      ref={viewportRef}
      style={{
        width: '100%',
        overflow: 'hidden',
        touchAction: 'pan-y',
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          transform: `translate3d(${offsetForIndex(idx)}px,0,0)`,
        }}
      >
        {slides.map((src, i) => (
          <div key={`${src}-${i}`} style={slideOuter}>
            <img src={src} alt={`slide-${i}`} style={imgStyle} />
          </div>
        ))}
      </div>
    </div>
  );
}

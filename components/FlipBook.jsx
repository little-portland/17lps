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

export default function ResponsiveInfiniteCarousel({
  transitionMs = 600,
}) {
  const real = images.length;
  const slides = [images[real - 1], ...images, images[0]];

  const viewportRef = useRef(null);
  const trackRef = useRef(null);

  const [idx, setIdx] = useState(1);
  const idxRef = useRef(idx);
  idxRef.current = idx;

  const [slideW, setSlideW] = useState(0);

  const dragging = useRef(false);
  const startX = useRef(0);
  const startTx = useRef(0);
  const isAnimating = useRef(false);

  // ---------- Responsive width ----------
  useEffect(() => {
    const measure = () => {
      if (!viewportRef.current) return;
      setSlideW(viewportRef.current.offsetWidth);
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // ---------- Translate helpers ----------
  const offset = (i) => -i * slideW;

  const setTranslate = (x, animate = true) => {
    const track = trackRef.current;
    if (!track) return;

    track.style.transition = animate
      ? `transform ${transitionMs}ms ease`
      : 'none';

    track.style.transform = `translate3d(${x}px,0,0)`;
  };

  // Apply movement
  useEffect(() => {
    if (!slideW) return;
    setTranslate(offset(idx));
  }, [idx, slideW]);

  // ---------- Seamless infinite loop ----------
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleEnd = () => {
      isAnimating.current = false;

      if (idxRef.current === 0) {
        track.style.transition = 'none';
        setIdx(real);
        track.style.transform = `translate3d(${offset(real)}px,0,0)`;
      }

      if (idxRef.current === real + 1) {
        track.style.transition = 'none';
        setIdx(1);
        track.style.transform = `translate3d(${offset(1)}px,0,0)`;
      }
    };

    track.addEventListener('transitionend', handleEnd);
    return () => track.removeEventListener('transitionend', handleEnd);
  }, [real, slideW]);

  // ---------- Drag / Swipe ----------
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;

    const down = (e) => {
      if (isAnimating.current) return;

      dragging.current = true;
      vp.setPointerCapture(e.pointerId);

      startX.current = e.clientX;
      startTx.current = offset(idxRef.current);

      setTranslate(startTx.current, false);
    };

    const move = (e) => {
      if (!dragging.current) return;
      const dx = e.clientX - startX.current;
      setTranslate(startTx.current + dx, false);
    };

    const up = (e) => {
      if (!dragging.current) return;
      dragging.current = false;

      const dx = e.clientX - startX.current;
      const threshold = slideW * 0.15;

      if (dx < -threshold) {
        isAnimating.current = true;
        setIdx((p) => p + 1);
      } else if (dx > threshold) {
        isAnimating.current = true;
        setIdx((p) => p - 1);
      } else {
        setTranslate(offset(idxRef.current), true);
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

  return (
    <div
      ref={viewportRef}
      style={{
        width: '100%',
        maxWidth: '50%',
        margin: '0 auto 30px auto',
        overflow: 'hidden',
        touchAction: 'pan-y',
        position: 'relative',
      }}
    >
      {/* Track */}
      <div
        ref={trackRef}
        style={{
          display: 'flex',
        }}
      >
        {slides.map((src, i) => (
          <div
            key={`${src}-${i}`}
            style={{
              flex: '0 0 100%',
            }}
          >
            <img
              src={src}
              alt=""
              style={{
                width: '100%',
                display: 'block',
                userSelect: 'none',
                WebkitUserDrag: 'none',
              }}
            />
          </div>
        ))}
      </div>

      {/* Dots indicator */}
      <div
        style={{
          position: 'absolute',
          right: 12,
          bottom: 12,
          display: 'flex',
          gap: 6,
        }}
      >
        {images.map((_, i) => (
          <div
            key={i}
            style={{
              width: 8,
              height: 8,
              borderRad

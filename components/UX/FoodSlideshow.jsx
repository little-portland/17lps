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

export default function FoodSlideshow() {
  const real = images.length;
  const slides = [images[real - 1], ...images, images[0]];

  const viewportRef = useRef(null);
  const trackRef = useRef(null);

  const [idx, setIdx] = useState(1);
  const idxRef = useRef(1);
  const [slideW, setSlideW] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const dragging = useRef(false);
  const startX = useRef(0);
  const startTx = useRef(0);
  const animating = useRef(false);

  // Sync index ref
  useEffect(() => {
    idxRef.current = idx;
  }, [idx]);

  // Detect mobile + measure width
  useEffect(() => {
    const measure = () => {
      if (!viewportRef.current) return;
      setSlideW(viewportRef.current.offsetWidth);
      setIsMobile(window.innerWidth < 768);
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const offset = (i) => -i * slideW;

  const setTranslate = (x, animate = true) => {
    const track = trackRef.current;
    if (!track) return;

    track.style.transition = animate
      ? 'transform 600ms ease'
      : 'none';

    track.style.transform = `translate3d(${x}px,0,0)`;
  };

  // Apply transform when index changes
  useEffect(() => {
    if (!slideW) return;
    setTranslate(offset(idx));
  }, [idx, slideW]);

  // Infinite loop correction
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleEnd = () => {
      animating.current = false;

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
    return () =>
      track.removeEventListener('transitionend', handleEnd);
  }, [real, slideW]);

  // Drag / swipe
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;

    const down = (e) => {
      if (animating.current) return;

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
        animating.current = true;
        setIdx((p) => p + 1);
      } else if (dx > threshold) {
        animating.current = true;
        setIdx((p) => p - 1);
      } else {
        setTranslate(offset(idxRef.current), true);
      }
    };

    vp.addEventListener('pointerdown', down);
    vp.addEventListener('pointermove', move);
    vp.addEventListener('pointerup', up);
    vp.addEventListener('pointerleave', up);

    return () => {
      vp.removeEventListener('pointerdown', down);
      vp.removeEventListener('pointermove', move);
      vp.removeEventListener('pointerup', up);
      vp.removeEventListener('pointerleave', up);
    };
  }, [slideW]);

  // Responsive wrapper
  const wrapperStyle = {
    width: '100%',
    maxWidth: isMobile ? '90%' : '50%',
    margin: '0 auto 30px auto',
    overflow: 'hidden',
    position: 'relative',
    touchAction: 'pan-y',
  };

  return (
    <div ref={viewportRef} style={wrapperStyle}>
      {/* Track */}
      <div
        ref={trackRef}
        style={{
          display: 'flex',
        }}
      >
        {slides.map((src, i) => (
          <div key={`${src}-${i}`} style={{ flex: '0 0 100%' }}>
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

      {/* Vertical Dots */}
      <div
        style={{
          position: 'absolute',
          right: 12,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        {images.map((_, i) => (
          <div
            key={i}
            style={{
              width: idx === i + 1 ? 12 : 8,
              height: idx === i + 1 ? 12 : 8,
              borderRadius: '50%',
              background:
                idx === i + 1
                  ? '#000'
                  : 'rgba(0,0,0,0.3)',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}

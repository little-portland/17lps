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

  const trackRef = useRef(null);
  const viewportRef = useRef(null);

  const [idx, setIdx] = useState(1);
  const idxRef = useRef(1);
  const [isMobile, setIsMobile] = useState(false);

  const dragging = useRef(false);
  const startX = useRef(0);
  const startTranslate = useRef(0);

  useEffect(() => {
    idxRef.current = idx;
  }, [idx]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const setTranslate = (value, animate = true) => {
    const track = trackRef.current;
    if (!track) return;

    track.style.transition = animate
      ? 'transform 600ms ease'
      : 'none';

    track.style.transform = `translateX(${value}%)`;
  };

  // Apply slide position
  useEffect(() => {
    setTranslate(-idx * 100);
  }, [idx]);

  // Infinite loop correction
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleEnd = () => {
      if (idxRef.current === 0) {
        track.style.transition = 'none';
        setIdx(real);
        track.style.transform = `translateX(${-real * 100}%)`;
      }

      if (idxRef.current === real + 1) {
        track.style.transition = 'none';
        setIdx(1);
        track.style.transform = `translateX(-100%)`;
      }
    };

    track.addEventListener('transitionend', handleEnd);
    return () => track.removeEventListener('transitionend', handleEnd);
  }, [real]);

  // Drag support
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;

    const down = (e) => {
      dragging.current = true;
      vp.style.cursor = 'grabbing';
      startX.current = e.clientX;
      startTranslate.current = -idxRef.current * 100;
      setTranslate(startTranslate.current, false);
    };

    const move = (e) => {
      if (!dragging.current) return;
      const dx = e.clientX - startX.current;
      const percentMove = (dx / vp.offsetWidth) * 100;
      setTranslate(startTranslate.current + percentMove, false);
    };

    const up = (e) => {
      if (!dragging.current) return;
      dragging.current = false;
      vp.style.cursor = 'grab';

      const dx = e.clientX - startX.current;
      const threshold = vp.offsetWidth * 0.15;

      if (dx < -threshold) {
        setIdx((p) => p + 1);
      } else if (dx > threshold) {
        setIdx((p) => p - 1);
      } else {
        setTranslate(-idxRef.current * 100);
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
  }, []);

  return (
    <div
      ref={viewportRef}
      style={{
        width: '100%',
        maxWidth: isMobile ? '90%' : '50%',
        margin: '0 auto 30px auto',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'grab',
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: 'flex',
        }}
      >
        {slides.map((src, i) => (
          <div key={i} style={{ flex: '0 0 100%' }}>
            <img
              src={src}
              alt=""
              style={{
                width: '100%',
                display: 'block',
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

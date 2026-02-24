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

  const containerRef = useRef(null);
  const trackRef = useRef(null);

  const [index, setIndex] = useState(1);
  const indexRef = useRef(1);

  const [isMobile, setIsMobile] = useState(false);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentTranslate = useRef(0);
  const prevTranslate = useRef(0);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  // Detect mobile
  useEffect(() => {
    const handleResize = () =>
      setIsMobile(window.innerWidth < 768);

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getWidth = () =>
    containerRef.current?.offsetWidth || 0;

  const setPosition = (value, animate = true) => {
    const track = trackRef.current;
    if (!track) return;

    track.style.transition = animate
      ? 'transform 400ms ease'
      : 'none';

    track.style.transform = `translateX(${value}px)`;
  };

  const goToSlide = (i, animate = true) => {
    const width = getWidth();
    const value = -i * width;

    prevTranslate.current = value;
    setPosition(value, animate);
  };

  // Normal slide movement
  useEffect(() => {
    if (!isMobile) {
      goToSlide(index);
    }
  }, [index, isMobile]);

  // 🔥 Mobile-only initial positioning fix
  useEffect(() => {
    if (!isMobile) return;

    const width = getWidth();
    if (!width) return;

    const track = trackRef.current;
    if (!track) return;

    track.style.transition = 'none';
    track.style.transform = `translateX(${-width}px)`;
    prevTranslate.current = -width;
  }, [isMobile]);

  // Infinite loop correction
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleEnd = () => {
      if (indexRef.current === 0) {
        setIndex(real);
        goToSlide(real, false);
      }

      if (indexRef.current === real + 1) {
        setIndex(1);
        goToSlide(1, false);
      }
    };

    track.addEventListener('transitionend', handleEnd);
    return () =>
      track.removeEventListener('transitionend', handleEnd);
  }, [real]);

  // Drag snapping
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const pointerDown = (e) => {
      isDragging.current = true;
      container.style.cursor = 'grabbing';
      startX.current = e.clientX;
      container.setPointerCapture(e.pointerId);
    };

    const pointerMove = (e) => {
      if (!isDragging.current) return;

      const dx = e.clientX - startX.current;
      currentTranslate.current =
        prevTranslate.current + dx;

      setPosition(currentTranslate.current, false);
    };

    const pointerUp = () => {
      if (!isDragging.current) return;

      isDragging.current = false;
      container.style.cursor = 'grab';

      const movedBy =
        currentTranslate.current -
        prevTranslate.current;

      const width = getWidth();

      if (movedBy < -width * 0.2) {
        setIndex((prev) => prev + 1);
      } else if (movedBy > width * 0.2) {
        setIndex((prev) => prev - 1);
      } else {
        goToSlide(indexRef.current);
      }
    };

    container.addEventListener('pointerdown', pointerDown);
    container.addEventListener('pointermove', pointerMove);
    container.addEventListener('pointerup', pointerUp);
    container.addEventListener('pointerleave', pointerUp);

    return () => {
      container.removeEventListener(
        'pointerdown',
        pointerDown
      );
      container.removeEventListener(
        'pointermove',
        pointerMove
      );
      container.removeEventListener(
        'pointerup',
        pointerUp
      );
      container.removeEventListener(
        'pointerleave',
        pointerUp
      );
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        maxWidth: isMobile ? '90%' : '50%',
        margin: '0 auto 30px auto',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'grab',
        touchAction: 'pan-y',
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
          <div key={i} style={{ flex: '0 0 100%' }}>
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

      {/* Vertical dots */}
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
              width: index === i + 1 ? 12 : 8,
              height: index === i + 1 ? 12 : 8,
              borderRadius: '50%',
              background:
                index === i + 1
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

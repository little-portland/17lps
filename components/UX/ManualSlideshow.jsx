'use client';

import { useState, useEffect, useRef } from 'react';
import type { MouseEvent, TouchEvent } from 'react';

const images = [
  '/images/override/slide01.png',
  '/images/override/slide02.gif',
  '/images/override/slide03.png',
  '/images/override/slide04.png',
  '/images/override/slide05.png',
  '/images/override/slide06.png',
];

export default function ManualSlideshow() {
  const n = images.length;
  const slideWidth = 50;
  const infiniteImages = [images[n - 1], ...images, images[0]];

  const [slideIndex, setSlideIndex] = useState(1);
  const [paused, setPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const timeoutRef = useRef(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const baseTranslate = -(slideIndex - 0.5) * slideWidth;
  const transform = `translateX(${baseTranslate + dragOffset}%)`;

  const nextSlide = () => setSlideIndex((prev) => prev + 1);
  const prevSlide = () => setSlideIndex((prev) => prev - 1);

  useEffect(() => {
    if (!paused && !isDragging) {
      timeoutRef.current = setTimeout(nextSlide, 4000);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [slideIndex, paused, isDragging]);

  const handleTransitionEnd = () => {
    if (slideIndex === n + 1) {
      setIsTransitioning(false);
      setSlideIndex(1);
    } else if (slideIndex === 0) {
      setIsTransitioning(false);
      setSlideIndex(n);
    }
    setIsTransitioning(true);
  };

  useEffect(() => {
    const inner = innerRef.current;
    if (inner) {
      inner.addEventListener('transitionend', handleTransitionEnd);
    }
    return () => {
      if (inner) {
        inner.removeEventListener('transitionend', handleTransitionEnd);
      }
    };
  }, [slideIndex]);

  const handleStart = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
    setDragOffset(0);
    setIsDragging(true);
    setIsTransitioning(false);
    setPaused(true);
    clearTimeout(timeoutRef.current);
  };

  const handleMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const delta = (clientX - startX) / (containerRef.current?.offsetWidth || 1) * 100;
    setDragOffset(delta);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 10;
    let direction = 0;
    if (dragOffset < -threshold) {
      direction = 1;
    } else if (dragOffset > threshold) {
      direction = -1;
    }
    setSlideIndex((prev) => prev + direction);
    setDragOffset(0);
    setIsTransitioning(true);
    if ('ontouchstart' in window) {
      setPaused(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="slideshow-wrapper"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
      onTouchCancel={handleEnd}
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      {/* Layout placeholder to force height */}
      <img
        src={images[0]}
        alt="Slide layout placeholder"
        style={{
          width: '100%',
          height: 'auto',
          visibility: 'hidden',
        }}
      />

      {/* Slides container */}
      <div
        ref={innerRef}
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: `${(n + 2) * slideWidth}%`,
          transform,
          transition: isTransitioning && !isDragging ? 'transform 1s ease-in-out' : 'none',
        }}
      >
        {infiniteImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index}`}
            style={{
              width: `${slideWidth}%`,
              height: 'auto',
            }}
          />
        ))}
      </div>

      {/* Gradient overlays */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '25%',
          height: '100%',
          background: 'linear-gradient(to right, black, transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '25%',
          height: '100%',
          background: 'linear-gradient(to left, black, transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

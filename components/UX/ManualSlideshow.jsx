'use client';

import { useState, useEffect, useRef } from 'react';

const images = [
  '/images/override/slide01.png',
  '/images/override/slide02.gif',
  '/images/override/slide03.png',
  '/images/override/slide04.png',
  '/images/override/slide05.png',
  '/images/override/slide06.png',
];

export default function AutoSlideshow() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timeoutRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  // Auto advance
  useEffect(() => {
    if (!paused) {
      timeoutRef.current = setTimeout(nextSlide, 4000);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [current, paused]);

  // Handle swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
  };

  // Handle mouse drag (desktop swipe)
  const handleMouseDown = (e) => {
    touchStartX.current = e.clientX;
  };

  const handleMouseUp = (e) => {
    touchEndX.current = e.clientX;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
  };

  return (
    <div
      className="slideshow-wrapper"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      <div
        className="slides"
        style={{
          display: 'flex',
          transition: 'transform 0.6s ease-in-out',
          transform: `translateX(calc(-${current * 100}% + ${current * 20}px))`, // offset for partial visibility
        }}
      >
        {images.map((src, index) => (
          <div
            key={index}
            style={{
              flex: '0 0 calc(100% - 40px)', // show part of prev/next
              margin: '0 20px',
              opacity: current === index ? 1 : 0.6,
              transition: 'opacity 0.6s ease-in-out',
            }}
          >
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

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

export default function ManualSlideshow() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timeoutRef = useRef(null);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    if (!paused) {
      timeoutRef.current = setTimeout(nextSlide, 4000);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [current, paused]);

  return (
    <div
      className="slideshow-wrapper"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      {/* Slides - in flow, not absolute */}
      <div style={{ position: 'relative', width: '100%' }}>
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            style={{
              width: '100%',
              height: 'auto',
              display: index === current ? 'block' : 'none',
              transition: 'opacity 1s ease-in-out',
            }}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        style={{ ...arrowStyle, left: '10px' }}
        aria-label="Previous Slide"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        style={{ ...arrowStyle, right: '10px' }}
        aria-label="Next Slide"
      >
        ›
      </button>
    </div>
  );
}

const arrowStyle = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  fontSize: '1.5rem',
  color: '#fff',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  border: 'none',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  zIndex: 2,
};

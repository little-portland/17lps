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
      timeoutRef.current = setTimeout(nextSlide, 3000);
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
      }}
    >
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Slide ${index + 1}`}
          className="slide-image"
          style={{
            width: '100%',
            height: 'auto',
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: current === index ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
            zIndex: current === index ? 2 : 1,
          }}
        />
      ))}

      {/* Arrows */}
      <button
        onClick={prevSlide}
        style={arrowStyle('left')}
        aria-label="Previous Slide"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        style={arrowStyle('right')}
        aria-label="Next Slide"
      >
        ›
      </button>
    </div>
  );
}

// Inline arrow button styles
const arrowStyle = (side) => ({
  position: 'absolute',
  top: '50%',
  [side]: '20px',
  transform: 'translateY(-50%)',
  fontSize: '2.5rem',
  color: 'white',
  background: 'rgba(0,0,0,0.4)',
  border: 'none',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  cursor: 'pointer',
  zIndex: 3,
  lineHeight: '0.8',
});

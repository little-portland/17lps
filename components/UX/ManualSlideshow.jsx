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
        maxWidth: '100%',
        aspectRatio: '16 / 9',
        overflow: 'hidden',
        margin: '0 auto',
        zIndex: 0,
      }}
    >
      {/* Slides */}
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Slide ${index + 1}`}
          className="slide-image"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: current === index ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
            zIndex: current === index ? 2 : 1,
          }}
        />
      ))}

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        style={{
          ...arrowStyle,
          left: '15px',
        }}
        aria-label="Previous Slide"
      >
        ‹
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        style={{
          ...arrowStyle,
          right: '15px',
        }}
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
  fontSize: '2.8rem',
  color: '#fff',
  backgroundColor: 'rgba(0,0,0,0.5)',
  border: 'none',
  borderRadius: '50%',
  width: '48px',
  height: '48px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  zIndex: 3,
  transition: 'background-color 0.3s ease',
};


'use client';

import { useState, useEffect } from 'react';

const images = [
  '/images/override/slide01.png',
  '/images/override/slide02.png',
  '/images/override/slide03.png',
  '/images/override/slide04.png',
  '/images/override/slide05.png',
  '/images/override/slide06.png',
];

export default function ManualSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000); // 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slideshow-wrapper">
      <img
        src={images[current]}
        alt={`Slide ${current + 1}`}
        className="override-logo"
        style={{ width: '100%', transition: 'opacity 0.5s ease-in-out' }}
      />
    </div>
  );
}

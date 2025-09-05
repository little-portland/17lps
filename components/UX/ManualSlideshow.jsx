'use client';

import { useEffect, useRef, useState } from 'react';

const images = [
  '/images/override/slide01.png',
  '/images/override/slide02.gif',
  '/images/override/slide03.png',
  '/images/override/slide04.png',
  '/images/override/slide05.png',
  '/images/override/slide06.png',
];

export default function CenterPeekCarousel({
  interval = 3500,        // auto-advance delay
  transitionMs = 600,     // slide transition
}) {
  // Clone ends for seamless looping
  const real = images.length;
  const slides = [images[real - 1], ...images, images[0]];

  // Sizing — "old size" for the middle slide (responsive, but never full width)
  const [slideW, setSlideW] = useState(560); // target center slide width
  const viewportRef = useRef(null);

  // position in `slides` (start at first real slide)
  const [idx, setIdx] = useState(1);
  const idxRef = useRef(idx);
  idxRef.current = idx;

  const [paused, setPaused] = useState(false);
  const trackRef = useRef(null);
  const autoplayRef = useRef(null);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startTxRef = useRef(0);
  const skipTransitionRef = useRef(false);

  // ----- measure slide width responsively, but keep center slide "not huge"
  useEffect(() => {
    const measure = () => {
      const vw = Math.max(320, Math.min(1400, window.innerWidth));
      // On mobile make it ~78vw; on desktop clamp to 520–640px range
      const target =
        vw < 768 ? Math.round(vw * 0.78) : Math.round(Math.max(520, Math.min(640, vw * 0.42)));
      setSlideW(target);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Helper: set translate on the track
  const setTranslate = (x, withTransition = true) => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transition = withTransition ? `transform ${transiti

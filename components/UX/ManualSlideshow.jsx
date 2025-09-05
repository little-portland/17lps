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
    track.style.transition = withTransition ? `transform ${transitionMs}ms ease` : 'none';
    track.style.transform = `translateX(${x}px)`;
  };

  // Compute where the current slide should sit:
  // viewport width = 2 * slideW  -> center slide should be centered:
  // offset = centerPadding - idx * slideW, where centerPadding = (viewportW - slideW)/2 = slideW/2
  const currentOffset = () => (slideW / 2) - (idx * slideW);

  // Apply index -> transform
  useEffect(() => {
    if (!slideW) return;
    setTranslate(currentOffset(), !skipTransitionRef.current);
    if (skipTransitionRef.current) {
      requestAnimationFrame(() => (skipTransitionRef.current = false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, slideW]);

  // Handle the clone resets to keep it seamless
  useEffect(() => {
    const onEnd = () => {
      if (idxRef.current === 0) {
        skipTransitionRef.current = true;
        setIdx(real);
      } else if (idxRef.current === real + 1) {
        skipTransitionRef.current = true;
        setIdx(1);
      }
    };
    const t = trackRef.current;
    if (!t) return;
    t.addEventListener('transitionend', onEnd);
    return () => t.removeEventListener('transitionend', onEnd);
  }, [real]);

  // Autoplay (move right -> images flow left)
  useEffect(() => {
    if (paused || draggingRef.current) return;
    autoplayRef.current = setTimeout(() => setIdx((p) => p + 1), interval);
    return () => clearTimeout(autoplayRef.current);
  }, [idx, paused, interval]);

  // Pointer drag (mouse + touch)
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;

    const down = (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      draggingRef.current = true;
      vp.setPointerCapture(e.pointerId);
      startXRef.current = e.clientX;
      startTxRef.current = currentOffset();
      setTranslate(startTxRef.current, false);
      setPaused(true);
    };
    const move = (e) => {
      if (!draggingRef.current) return;
      const dx = e.clientX - startXRef.current;
      setTranslate(startTxRef.current + dx, false);
    };
    const end = (e) => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      vp.releasePointerCapture(e.pointerId);
      const dx = e.clientX - startXRef.current;
      const threshold = Math.max(50, slideW * 0.18);
      if (dx < -threshold) setIdx((p) => p + 1);
      else if (dx > threshold) setIdx((p) => p - 1);
      else setTranslate(currentOffset(), true);
      setTimeout(() => setPaused(false), 200);
    };
    const cancel = () => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      setTranslate(currentOffset(), true);
      setTimeout(() => setPaused(false), 200);
    };

    vp.addEventListener('pointerdown', down);
    vp.addEventListener('pointermove', move);
    vp.addEventListener('pointerup', end);
    vp.addEventListener('pointercancel', cancel);
    return () => {
      vp.removeEventListener('pointerdown', down);
      vp.removeEventListener('pointermove', move);
      vp.removeEventListener('pointerup', end);
      vp.removeEventListener('pointercancel', cancel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideW]);

  // Pause on hover (desktop)
  useEffect(() => {
    const vp = viewportRef.current;
    const onIn = () => setPaused(true);
    const onOut = () => setPaused(false);
    vp?.addEventListener('mouseenter', onIn);
    vp?.addEventListener('mouseleave', onOut);
    return () => {
      vp?.removeEventListener('mouseenter', onIn);
      vp?.removeEventListener('mouseleave', onOut);
    };
  }, []);

  const viewportW = slideW * 2;      // shows half of prev and half of next
  const fadeW = Math.round(slideW * 0.5); // fade spans the side half

  const imgBase = {
    width: `${slideW}px`,
    height: 'auto',
    display: 'block',
    userSelect: 'none',
    WebkitUserDrag: 'none',
  };

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {/* viewport with fixed width = 2*slideW, centered; never full page */}
      <div
        ref={viewportRef}
        aria-roledescription="carousel"
        style={{
          position: 'relative',
          width: `${viewportW}px`,
          maxWidth: '100%',
          overflow: 'hidden',
          background: '#000', // to match the fade to black
          touchAction: 'pan-y', // allow vertical scroll while dragging horizontally
          cursor: 'grab',
        }}
      >
        {/* track */}
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            transform: `translateX(${(slideW / 2) - (idx * slideW)}px)`,
          }}
        >
          {slides.map((src, i) => (
            <div key={i} style={{ flex: '0 0 auto', width: `${slideW}px` }}>
              <img src={src} alt={`slide-${i}`} style={imgBase} draggable={false} />
            </div>
          ))}
        </div>

        {/* Left fade over the visible half of the previous slide */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: `${fadeW}px`,
            pointerEvents: 'none',
            background:
              'linear-gradient(90deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.75) 35%, rgba(0,0,0,0.1) 85%, rgba(0,0,0,0) 100%)',
          }}
        />
        {/* Right fade over the visible half of the next slide */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: `${fadeW}px`,
            pointerEvents: 'none',
            background:
              'linear-gradient(-90deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.75) 35%, rgba(0,0,0,0.1) 85%, rgba(0,0,0,0) 100%)',
          }}
        />
      </div>
    </div>
  );
}

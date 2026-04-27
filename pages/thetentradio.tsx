import Head from 'next/head';
import { useEffect, useMemo, useRef, useState } from 'react';

type Track = {
  id: string;
  title: string;
  artist: string;
  src: string;
  cover: string;
  episodeLabel: string;
  infoLines: string[];
  objectPosition?: string;
};

const IMAGE_BASE = '/images/private-hire';
const STAR_BG = `${IMAGE_BASE}/night-starry-sky-dark.jpg`;
const GRID_BG = `${IMAGE_BASE}/buldge-grid.svg`;
const ORB_OVERLAY = `${IMAGE_BASE}/circle-orb-overlay.png`;
const ACCENT = '#348159';

const TRACKS: Track[] = [
  {
    id: '24',
    episodeLabel: 'THE TENT 24',
    title: 'The Tent (at the End of the Universe) 24 [with Alia Indigo]',
    artist: 'OpenLab',
    src: '/audio/tent-semoa.mp3',
    cover: '/covers/tent-semoa.jpg',
    infoLines: ['With Alia Indigo', 'Balearic / World / Downtempo / Electronica'],
  },
  {
    id: 'sEmoa',
    episodeLabel: 'THE TENT',
    title: 'The Tent (at the End of the Universe) [with sEmoa]',
    artist: 'OpenLab',
    src: '/audio/tent-semoa.mp3',
    cover: '/covers/tent-semoa.jpg',
    infoLines: ['With sEmoa', 'Balearic / World / Downtempo / Electronica'],
  },
  {
    id: '22',
    episodeLabel: 'THE TENT 22',
    title: 'The Tent (at the End of the Universe) 22 [with Bugsy]',
    artist: 'OpenLab',
    src: '/audio/tent-semoa.mp3',
    cover: '/covers/tent-semoa.jpg',
    infoLines: ['With Bugsy', 'Balearic / World / Downtempo / Electronica'],
  },
  {
    id: '21',
    episodeLabel: 'THE TENT 21',
    title: 'The Tent (at the End of the Universe) 21',
    artist: 'OpenLab',
    src: '/audio/tent-semoa.mp3',
    cover: '/covers/tent-semoa.jpg',
    infoLines: ['OpenLab', 'Balearic / World / Downtempo / Electronica'],
  },
  {
    id: '20',
    episodeLabel: 'THE TENT 20',
    title: 'The Tent (at the End of the Universe) 20',
    artist: 'OpenLab',
    src: '/audio/tent-semoa.mp3',
    cover: '/covers/tent-semoa.jpg',
    infoLines: ['OpenLab', 'Balearic / World / Downtempo / Electronica'],
  },
];

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const pretty = (s?: number) => {
  if (!s && s !== 0) return '0:00';
  const m = Math.floor(s / 60);
  const ss = Math.floor(s % 60).toString().padStart(2, '0');
  return `${m}:${ss}`;
};

export default function TentRadioPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const activeTrack = TRACKS[displayIndex];
  const currentTrack = useMemo(() => TRACKS[activeIndex], [activeIndex]);

  useEffect(() => {
    const updateActiveIndex = () => {
      const nextIndex = clamp(
        Math.round(window.scrollY / Math.max(window.innerHeight, 1)),
        0,
        TRACKS.length - 1
      );

      setActiveIndex(nextIndex);
    };

    updateActiveIndex();

    window.addEventListener('scroll', updateActiveIndex, { passive: true });
    window.addEventListener('resize', updateActiveIndex);

    return () => {
      window.removeEventListener('scroll', updateActiveIndex);
      window.removeEventListener('resize', updateActiveIndex);
    };
  }, []);

  useEffect(() => {
    if (activeIndex === displayIndex) return;

    setPreviousIndex(displayIndex);
    setDisplayIndex(activeIndex);

    const timeout = window.setTimeout(() => {
      setPreviousIndex(null);
    }, 360);

    return () => window.clearTimeout(timeout);
  }, [activeIndex, displayIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => setProgress(audio.currentTime || 0);
    const onLoaded = () => setDuration(audio.duration || 0);
    const onEnded = () => {
      const nextIndex = (activeIndex + 1) % TRACKS.length;
      goToSlide(nextIndex);
    };

    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('ended', onEnded);
    };
  }, [activeIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setProgress(0);
    setDuration(0);
    audio.currentTime = 0;

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }
  }, [currentTrack.src, isPlaying]);

  const goToSlide = (index: number) => {
    const nextIndex = clamp(index, 0, TRACKS.length - 1);
    window.scrollTo({ top: nextIndex * window.innerHeight, behavior: 'smooth' });
    setActiveIndex(nextIndex);
  };

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      await audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const seek = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = value;
    setProgress(value);
  };

  return (
    <>
      <Head>
        <title>17 Little Portland Street — The Tent Radio</title>
        <meta
          name="description"
          content="The Tent Radio playlist from 17 Little Portland Street."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="posterPage">
        <div className="posterStage">
          <div className="posterSky" style={{ backgroundImage: `url(${STAR_BG})` }} />
          <img src={GRID_BG} alt="" aria-hidden="true" className="posterGrid" />
          <div className="posterGridSweep" aria-hidden="true" />
          <div className="posterVignette" />
          <div className="posterNoise" />

          <button
            type="button"
            className="posterNav posterNav--prev"
            onClick={() => goToSlide(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Previous track"
          >
            <span className="posterNav__arrow">↑</span>
            <span className="posterNav__text">Prev</span>
          </button>

          <button
            type="button"
            className="posterNav posterNav--next"
            onClick={() => goToSlide(activeIndex + 1)}
            disabled={activeIndex === TRACKS.length - 1}
            aria-label="Next track"
          >
            <span className="posterNav__text">Next</span>
            <span className="posterNav__arrow">↓</span>
          </button>

          <section className="posterFrame" aria-live="polite">
            <div className="posterTitleWrap">
              <h1 className="posterTitle">THE TENT RADIO</h1>
            </div>

            <div className="orbCluster">
              <div className="orbBloomBack" />

              <div className="orbPhotoMask">
                {previousIndex !== null && (
                  <div
                    aria-hidden="true"
                    className="orbPhotoLayer orbPhotoLayer--previous"
                    style={{
                      backgroundImage: `url(${TRACKS[previousIndex].cover})`,
                      backgroundPosition: TRACKS[previousIndex].objectPosition || '50% 50%',
                    }}
                  />
                )}

                <div
                  key={activeTrack.id}
                  role="img"
                  aria-label={activeTrack.title}
                  className={`orbPhotoLayer orbPhotoLayer--current ${
                    previousIndex !== null ? 'is-glitching' : ''
                  }`}
                  style={{
                    backgroundImage: `url(${activeTrack.cover})`,
                    backgroundPosition: activeTrack.objectPosition || '50% 50%',
                  }}
                />

                <div className="orbInnerTint" />
                <div className="orbInnerGlow" />
              </div>

              <img
                src={ORB_OVERLAY}
                alt=""
                aria-hidden="true"
                className="orbOverlay orbOverlay--main"
              />
            </div>

            <div className="posterAreaTitle">
              {TRACKS.map((track, index) => (
                <div
                  key={track.id}
                  className={`posterAreaTitle__item ${index === activeIndex ? 'is-active' : ''}`}
                >
                  {track.episodeLabel}
                </div>
              ))}
            </div>

            <div className="posterInfo">
              {TRACKS.map((track, index) => (
                <div
                  key={track.id}
                  className={`posterInfo__block ${index === activeIndex ? 'is-active' : ''}`}
                >
                  <p className="posterInfo__line">{track.title}</p>
                  {track.infoLines.map((line, lineIndex) => (
                    <p
                      key={`${track.id}-${line}`}
                      className={`posterInfo__line ${
                        lineIndex >= 0 ? 'posterInfo__line--secondary' : ''
                      }`}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            <button type="button" className="posterPlayButton" onClick={togglePlay}>
              {isPlaying ? 'Pause Transmission' : 'Play Transmission'}
            </button>
          </section>

          <div className="radioPlayer">
            <div className="radioPlayer__meta">
              <strong>{currentTrack.episodeLabel}</strong>
              <span>{currentTrack.artist}</span>
            </div>

            <div className="radioPlayer__bar">
              <span>{pretty(progress)}</span>
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={Math.min(progress, duration || 0)}
                onChange={(e) => seek(Number(e.target.value))}
                aria-label="Seek track"
              />
              <span>{pretty(duration)}</span>
            </div>

            <div className="radioPlayer__controls">
              <button
                type="button"
                onClick={() => goToSlide(activeIndex - 1)}
                disabled={activeIndex === 0}
                aria-label="Previous track"
              >
                ◀
              </button>

              <button type="button" onClick={togglePlay} aria-label="Play or pause">
                {isPlaying ? 'Pause' : 'Play'}
              </button>

              <button
                type="button"
                onClick={() => goToSlide(activeIndex + 1)}
                disabled={activeIndex === TRACKS.length - 1}
                aria-label="Next track"
              >
                ▶
              </button>
            </div>
          </div>

          <audio ref={audioRef} src={currentTrack.src} preload="metadata" />
        </div>

        <div className="posterScrollTrack" aria-hidden="true">
          {TRACKS.map((track) => (
            <div key={track.id} className="posterScrollMarker" />
          ))}
        </div>
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;800;900&family=IBM+Plex+Mono:wght@400;500;700&display=swap');

        html {
          scroll-behavior: smooth;
          scroll-snap-type: y mandatory;
          overflow-x: hidden;
        }

        body {
          margin: 0;
          background: #040707 !important;
          color: #f1eee7;
          overflow-x: hidden;
          font-family: 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        }

        * {
          box-sizing: border-box;
        }

        a,
        button {
          color: inherit;
          font: inherit;
        }

        button {
          background: none;
          border: 0;
          padding: 0;
          cursor: pointer;
        }

        img,
        svg {
          display: block;
        }

        #__next {
          min-height: 100vh;
        }

        .posterPage {
          min-height: 100vh;
          background: #040707;
        }

        .posterStage {
          position: fixed;
          inset: 0;
          overflow: clip;
          background: #040707;
          z-index: 2;
        }

        .posterScrollTrack {
          position: relative;
          z-index: 0;
          pointer-events: none;
        }

        .posterScrollMarker {
          height: 100vh;
          scroll-snap-align: start;
          scroll-snap-stop: always;
        }

        .posterSky,
        .posterGrid,
        .posterGridSweep,
        .posterVignette,
        .posterNoise {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .posterSky {
          background-size: cover;
          background-position: center;
          filter: saturate(0.92) brightness(0.54);
          opacity: 0.96;
        }

        .posterGrid {
          width: 100%;
          height: 100%;
          object-fit: cover;
          mix-blend-mode: screen;
          opacity: 0.78;
          filter: drop-shadow(0 0 18px rgba(52, 129, 89, 0.18));
          animation: gridPulse 8s ease-in-out infinite;
        }

        .posterGridSweep {
          opacity: 0;
          background: linear-gradient(
            180deg,
            transparent 0%,
            transparent 34%,
            rgba(145, 242, 189, 0.05) 40%,
            rgba(145, 242, 189, 0.16) 45%,
            rgba(145, 242, 189, 0.32) 50%,
            rgba(145, 242, 189, 0.16) 55%,
            rgba(145, 242, 189, 0.05) 60%,
            transparent 66%,
            transparent 100%
          );
          mix-blend-mode: screen;
          filter: blur(16px);
          transform: translateY(-130%);
          animation: gridSweepVertical 12s linear infinite;
        }

        .posterVignette {
          background:
            radial-gradient(circle at center, transparent 34%, rgba(4, 7, 7, 0.12) 58%, rgba(4, 7, 7, 0.74) 100%),
            linear-gradient(180deg, rgba(4, 7, 7, 0.12), rgba(4, 7, 7, 0.44));
        }

        .posterNoise {
          opacity: 0.08;
          background-image:
            radial-gradient(circle at 8% 16%, rgba(255, 255, 255, 0.8) 0 1px, transparent 1.4px),
            radial-gradient(circle at 76% 22%, rgba(255, 255, 255, 0.66) 0 1px, transparent 1.4px),
            radial-gradient(circle at 86% 72%, rgba(255, 255, 255, 0.5) 0 1px, transparent 1.4px),
            radial-gradient(circle at 28% 80%, rgba(255, 255, 255, 0.42) 0 1px, transparent 1.4px);
          background-size: 320px 320px, 380px 380px, 340px 340px, 400px 400px;
          mix-blend-mode: screen;
        }

        .posterNav {
          position: absolute;
          top: 50%;
          z-index: 14;
          display: inline-flex;
          align-items: center;
          gap: 11px;
          padding: 14px 16px;
          border-radius: 999px;
          border: 1px solid rgba(52, 129, 89, 0.42);
          background: rgba(0, 0, 0, 0.74);
          color: ${ACCENT};
          box-shadow: 0 0 16px rgba(52, 129, 89, 0.14);
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-size: 0.82rem;
          font-weight: 700;
          backdrop-filter: blur(10px);
          transform: translateY(-50%);
          transition: opacity 180ms ease, border-color 180ms ease, background 180ms ease;
          pointer-events: auto;
          text-shadow: 0 0 8px rgba(52, 129, 89, 0.5), 0 0 18px rgba(52, 129, 89, 0.3), 0 0 34px rgba(52, 129, 89, 0.5);
        }

        .posterNav:hover,
        .posterNav:focus-visible {
          border-color: rgba(52, 129, 89, 0.56);
          background: rgba(0, 0, 0, 0.84);
        }

        .posterNav:disabled {
          opacity: 0.22;
          cursor: not-allowed;
        }

        .posterNav--prev {
          left: 20px;
        }

        .posterNav--next {
          right: 20px;
        }

        .posterNav__arrow {
          font-size: 0.96rem;
          line-height: 1;
        }

        .posterFrame {
          --core-size: min(41vw, 520px);
          --orb-shell-size: calc(var(--core-size) + clamp(120px, 12vw, 170px));
          position: absolute;
          inset: 0;
          z-index: 6;
          display: grid;
          place-items: center;
          justify-items: center;
          padding: clamp(88px, 11vh, 118px) 88px clamp(150px, 16vh, 170px);
          pointer-events: none;
        }

        .posterTitleWrap {
          position: absolute;
          left: 50%;
          top: calc(50% - (var(--core-size) / 2) - 128px);
          transform: translateX(-50%);
          z-index: 9;
          width: min(94vw, 1100px);
          display: flex;
          justify-content: center;
        }

        .posterTitle {
          margin: 0;
          color: #f2efe6;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-family: 'Orbitron', 'IBM Plex Mono', monospace;
          font-size: clamp(2.4rem, 5vw, 4.8rem);
          font-weight: 900;
          white-space: nowrap;
          text-shadow:
            0 0 10px rgba(255, 255, 255, 0.18),
            0 0 24px rgba(255, 255, 255, 0.2),
            0 0 40px rgba(255, 255, 255, 0.5);
        }

        .orbCluster {
          position: relative;
          width: min(var(--orb-shell-size), calc(100vw - 24px));
          aspect-ratio: 1 / 1;
          z-index: 7;
          display: grid;
          place-items: center;
          justify-self: center;
          align-self: center;
          margin-inline: auto;
          pointer-events: none;
          transform: translateY(-22px);
        }

        .orbBloomBack {
          position: absolute;
          inset: 5%;
          border-radius: 999px;
          background:
            radial-gradient(circle,
              rgba(95, 212, 156, 0.3) 0%,
              rgba(63, 180, 121, 0.52) 32%,
              rgba(52, 129, 89, 0.42) 50%,
              rgba(52, 129, 89, 0.24) 68%,
              rgba(52, 129, 89, 0) 86%);
          filter: blur(54px);
          transform: scale(1.08);
          opacity: 0.72;
          animation: orbPulse 2.8s ease-in-out infinite;
        }

        .orbPhotoMask {
          position: absolute;
          left: 50%;
          top: 50%;
          width: var(--core-size);
          height: var(--core-size);
          transform: translate3d(-50%, -50%, 0);
          border-radius: 50%;
          overflow: hidden;
          clip-path: circle(50% at 50% 50%);
          -webkit-clip-path: circle(50% at 50% 50%);
          isolation: isolate;
          contain: paint;
          background: rgba(52, 129, 89, 0.28);
          box-shadow:
            inset 0 0 0 1px rgba(255, 255, 255, 0.03),
            inset 0 0 60px rgba(52, 129, 89, 0.26),
            inset 0 0 130px rgba(52, 129, 89, 0.2),
            0 0 22px rgba(52, 129, 89, 0.12);
          animation: orbCorePulse 2.8s ease-in-out infinite;
        }

        .orbPhotoLayer {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-repeat: no-repeat;
          filter: contrast(1.02) brightness(0.96);
          backface-visibility: hidden;
          transform: translateZ(0);
          will-change: opacity, transform;
        }

        .orbPhotoLayer--current {
          opacity: 1;
        }

        .orbPhotoLayer--current.is-glitching {
          animation: photoGlitchIn 360ms ease both;
        }

        .orbPhotoLayer--previous {
          opacity: 1;
          animation: photoGlitchOut 360ms ease forwards;
        }

        .orbInnerTint {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 50% 50%, rgba(52, 129, 89, 0.04), rgba(52, 129, 89, 0.08) 54%, rgba(52, 129, 89, 0.18) 78%, rgba(52, 129, 89, 0.3) 100%),
            linear-gradient(180deg, rgba(125, 225, 180, 0.08), transparent 18%, transparent 68%, rgba(0, 0, 0, 0.18) 100%);
          mix-blend-mode: screen;
          pointer-events: none;
        }

        .orbInnerGlow {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          box-shadow:
            inset 0 0 52px rgba(126, 228, 183, 0.22),
            inset 0 0 140px rgba(52, 129, 89, 0.22),
            inset 0 0 220px rgba(52, 129, 89, 0.12);
          pointer-events: none;
        }

        .orbOverlay {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          pointer-events: none;
        }

        .orbOverlay--main {
          opacity: 0.96;
          mix-blend-mode: screen;
          animation: orbPulseSoft 2.8s ease-in-out infinite;
        }

        .posterAreaTitle {
          position: absolute;
          left: 50%;
          top: calc(50% + (var(--core-size) / 2) + 4px);
          width: min(820px, calc(100vw - 100px));
          min-height: 78px;
          transform: translateX(-50%);
          z-index: 8;
          pointer-events: none;
        }

        .posterAreaTitle__item {
          position: absolute;
          left: 50%;
          top: 0;
          width: max-content;
          max-width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 26px 15px;
          border-radius: 999px;
          border: 1px solid rgba(52, 129, 89, 0.42);
          background: rgba(0, 0, 0, 0.74);
          box-shadow:
            0 0 16px rgba(52, 129, 89, 0.14),
            inset 0 0 18px rgba(52, 129, 89, 0.08);
          opacity: 0;
          transform: translate(-50%, 10px) scale(0.98);
          transition: opacity 320ms ease, transform 320ms ease;
          color: ${ACCENT};
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-family: 'Orbitron', 'IBM Plex Mono', monospace;
          font-size: 2.2rem;
          font-weight: 900;
          text-shadow: 0 0 8px rgba(52, 129, 89, 0.5), 0 0 18px rgba(52, 129, 89, 0.3), 0 0 34px rgba(52, 129, 89, 0.5);
        }

        .posterAreaTitle__item.is-active {
          opacity: 1;
          transform: translate(-50%, 0) scale(1);
        }

        .posterInfo {
          position: absolute;
          left: 50%;
          top: calc(50% + (var(--core-size) / 2) + 74px);
          width: min(820px, calc(100vw - 120px));
          min-height: 120px;
          transform: translateX(-50%);
          pointer-events: none;
        }

        .posterInfo__block {
          position: absolute;
          inset: 0;
          opacity: 0;
          transform: translateY(10px) scale(0.98);
          transition: opacity 320ms ease, transform 320ms ease;
          text-align: center;
        }

        .posterInfo__block.is-active {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .posterInfo__line {
          margin: 0;
          color: #f4f0e8;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          line-height: 1.45;
          font-size: clamp(0.8rem, 1vw, 1.02rem);
          font-weight: 700;
          text-wrap: balance;
          text-shadow:
            0 0 8px rgba(255, 255, 255, 0.5),
            0 0 18px rgba(52, 129, 89, 0.3),
            0 0 34px rgba(52, 129, 89, 0.5);
        }

        .posterInfo__line--secondary {
          margin-top: 4px;
          font-size: 0.82em;
          opacity: 0.96;
        }

        .posterPlayButton {
          position: absolute;
          left: 50%;
          bottom: 94px;
          transform: translateX(-50%);
          z-index: 14;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 13px 22px;
          border-radius: 999px;
          border: 1px solid rgba(52, 129, 89, 0.5);
          background: rgba(0, 0, 0, 0.76);
          color: ${ACCENT};
          text-transform: uppercase;
          letter-spacing: 0.14em;
          font-size: 0.82rem;
          font-weight: 800;
          pointer-events: auto;
          box-shadow: 0 0 20px rgba(52, 129, 89, 0.18);
          text-shadow: 0 0 8px rgba(52, 129, 89, 0.6);
        }

        .radioPlayer {
          position: fixed;
          left: 50%;
          bottom: 18px;
          z-index: 30;
          width: min(920px, calc(100vw - 32px));
          transform: translateX(-50%);
          display: grid;
          grid-template-columns: 1fr 1.5fr auto;
          gap: 18px;
          align-items: center;
          padding: 14px 18px;
          border-radius: 999px;
          border: 1px solid rgba(52, 129, 89, 0.36);
          background: rgba(0, 0, 0, 0.78);
          color: #f4f0e8;
          backdrop-filter: blur(14px);
          box-shadow:
            0 0 18px rgba(52, 129, 89, 0.14),
            inset 0 0 18px rgba(52, 129, 89, 0.06);
          font-family: 'IBM Plex Mono', ui-monospace, monospace;
        }

        .radioPlayer__meta {
          display: flex;
          flex-direction: column;
          min-width: 0;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .radioPlayer__meta strong,
        .radioPlayer__meta span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .radioPlayer__meta strong {
          color: ${ACCENT};
          font-size: 0.82rem;
        }

        .radioPlayer__meta span {
          color: rgba(244, 240, 232, 0.72);
          font-size: 0.72rem;
        }

        .radioPlayer__bar {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 10px;
          align-items: center;
          color: rgba(244, 240, 232, 0.72);
          font-size: 0.72rem;
          font-variant-numeric: tabular-nums;
        }

        .radioPlayer__bar input[type='range'] {
          appearance: none;
          width: 100%;
          height: 5px;
          border-radius: 999px;
          background: rgba(52, 129, 89, 0.44);
          outline: none;
        }

        .radioPlayer__bar input[type='range']::-webkit-slider-thumb {
          appearance: none;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background: #f4f0e8;
          box-shadow: 0 0 16px rgba(52, 129, 89, 0.8);
        }

        .radioPlayer__controls {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .radioPlayer__controls button {
          min-width: 42px;
          height: 36px;
          padding: 0 12px;
          border-radius: 999px;
          border: 1px solid rgba(52, 129, 89, 0.42);
          background: rgba(0, 0, 0, 0.52);
          color: ${ACCENT};
          text-transform: uppercase;
          font-size: 0.72rem;
          font-weight: 800;
          cursor: pointer;
        }

        .radioPlayer__controls button:disabled {
          opacity: 0.28;
          cursor: not-allowed;
        }

        @keyframes gridPulse {
          0%,
          100% {
            opacity: 0.75;
          }
          50% {
            opacity: 0.84;
          }
        }

        @keyframes gridSweepVertical {
          0%,
          62% {
            opacity: 0;
            transform: translateY(-130%);
          }
          66% {
            opacity: 0.14;
          }
          78% {
            opacity: 0.42;
            transform: translateY(18%);
          }
          88% {
            opacity: 0.12;
            transform: translateY(116%);
          }
          100% {
            opacity: 0;
            transform: translateY(116%);
          }
        }

        @keyframes orbPulse {
          0%,
          100% {
            transform: scale(1.06);
            opacity: 0.58;
            filter: blur(46px) brightness(0.96);
          }
          50% {
            transform: scale(1.24);
            opacity: 1;
            filter: blur(66px) brightness(1.12);
          }
        }

        @keyframes orbPulseSoft {
          0%,
          100% {
            transform: scale(0.992);
            opacity: 0.82;
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
          }
        }

        @keyframes orbCorePulse {
          0%,
          100% {
            box-shadow:
              inset 0 0 0 1px rgba(255, 255, 255, 0.03),
              inset 0 0 54px rgba(52, 129, 89, 0.2),
              inset 0 0 110px rgba(52, 129, 89, 0.14),
              0 0 14px rgba(52, 129, 89, 0.08);
          }
          50% {
            box-shadow:
              inset 0 0 0 1px rgba(255, 255, 255, 0.04),
              inset 0 0 78px rgba(52, 129, 89, 0.34),
              inset 0 0 160px rgba(52, 129, 89, 0.24),
              0 0 28px rgba(52, 129, 89, 0.18);
          }
        }

        @keyframes photoGlitchIn {
          0% {
            opacity: 0.28;
            transform: scale(1.02) translateX(8px);
            filter: contrast(1.12) brightness(1.04);
          }
          18% {
            opacity: 0.9;
            transform: scale(1.008) translateX(-6px);
          }
          42% {
            opacity: 0.74;
            transform: scale(1.005) translateX(4px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateX(0);
            filter: contrast(1.02) brightness(0.96);
          }
        }

        @keyframes photoGlitchOut {
          0% {
            opacity: 1;
            transform: scale(1) translateX(0);
          }
          100% {
            opacity: 0;
            transform: scale(0.998) translateX(-6px);
          }
        }

        @media (max-width: 1180px) {
          .posterFrame {
            --core-size: min(50vw, 480px);
            --orb-shell-size: calc(var(--core-size) + 120px);
            padding-left: 72px;
            padding-right: 72px;
          }

          .posterTitle {
            font-size: 3.2rem;
          }

          .posterAreaTitle__item {
            font-size: 1.95rem;
          }
        }

        @media (max-width: 860px) {
          html {
            scroll-snap-type: y proximity;
          }

          .posterFrame {
            --core-size: min(72vw, 410px);
            --orb-shell-size: calc(var(--core-size) + 96px);
            padding: 84px 20px 180px;
          }

          .orbCluster {
            width: min(var(--orb-shell-size), calc(100vw - 20px));
            transform: translateY(-12px);
          }

          .posterTitleWrap {
            top: 74px;
            width: min(94vw, 700px);
          }

          .posterTitle {
            font-size: 2.1rem;
          }

          .posterAreaTitle {
            top: calc(50% + (var(--core-size) / 2) + 18px);
            width: min(94vw, 700px);
          }

          .posterAreaTitle__item {
            padding: 12px 22px 13px;
            font-size: 1.5rem;
          }

          .posterInfo {
            top: calc(50% + (var(--core-size) / 2) + 82px);
            width: min(92vw, 560px);
          }

          .posterInfo__line {
            font-size: 0.78rem;
            line-height: 1.42;
          }

          .posterNav {
            top: auto;
            bottom: 18px;
            transform: none;
            padding: 13px 14px;
          }

          .posterNav--prev {
            left: 16px;
          }

          .posterNav--next {
            right: 16px;
          }

          .posterPlayButton {
            bottom: 140px;
          }

          .radioPlayer {
            grid-template-columns: 1fr;
            border-radius: 24px;
            gap: 10px;
            bottom: 14px;
          }
        }

        @media (max-width: 560px) {
          .posterFrame {
            --core-size: min(72vw, 310px);
            --orb-shell-size: calc(var(--core-size) + 82px);
            padding: 62px 10px 170px;
          }

          .orbCluster {
            width: min(var(--orb-shell-size), calc(100vw - 12px));
          }

          .posterTitleWrap {
            top: 54px;
            width: calc(100vw - 16px);
          }

          .posterTitle {
            font-size: 1.35rem;
            letter-spacing: 0.04em;
          }

          .posterAreaTitle {
            top: calc(50% + (var(--core-size) / 2) + 12px);
            width: calc(100vw - 20px);
            min-height: 48px;
          }

          .posterAreaTitle__item {
            max-width: calc(100vw - 42px);
            padding: 10px 16px 11px;
            font-size: 0.98rem;
            letter-spacing: 0.04em;
          }

          .posterInfo {
            top: calc(50% + (var(--core-size) / 2) + 56px);
            width: calc(100vw - 20px);
          }

          .posterInfo__line {
            font-size: 0.68rem;
            letter-spacing: 0.07em;
          }

          .posterNav {
            bottom: 12px;
            padding: 12px 13px;
            font-size: 0.68rem;
          }

          .posterNav__text {
            display: none;
          }

          .posterPlayButton {
            bottom: 136px;
            font-size: 0.68rem;
            padding: 11px 16px;
          }

          .radioPlayer {
            width: calc(100vw - 20px);
            padding: 12px;
          }

          .radioPlayer__bar {
            grid-template-columns: 38px 1fr 38px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
            scroll-snap-type: none;
          }

          .posterGrid,
          .posterGridSweep,
          .orbBloomBack,
          .orbPhotoMask,
          .orbOverlay--main {
            animation: none;
          }

          .orbPhotoLayer,
          .posterAreaTitle__item,
          .posterInfo__block,
          .posterNav {
            transition: none;
            animation: none;
          }
        }
      `}</style>
    </>
  );
}

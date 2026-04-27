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
    const onEnded = () => setActiveIndex((i) => (i + 1) % TRACKS.length);

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
  }, [currentTrack.src]);

  const goToSlide = (index: number) => {
    const nextIndex = clamp(index, 0, TRACKS.length - 1);
    window.scrollTo({ top: nextIndex * window.innerHeight, behavior: 'smooth' });
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

              <img src={ORB_OVERLAY} alt="" aria-hidden="true" className="orbOverlay orbOverlay--main" />
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
                  {track.infoLines.map((line) => (
                    <p key={line} className="posterInfo__line posterInfo__line--secondary">
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
              />
              <span>{pretty(duration)}</span>
            </div>

            <div className="radioPlayer__controls">
              <button onClick={() => goToSlide(activeIndex - 1)} disabled={activeIndex === 0}>
                ◀
              </button>
              <button onClick={togglePlay}>
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              <button
                onClick={() => goToSlide(activeIndex + 1)}
                disabled={activeIndex === TRACKS.length - 1}
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

      {/* Keep your existing global CSS from the Private Hire page here. */}
      {/* Then add this extra CSS near the bottom: */}

      <style jsx global>{`
        .posterPlayButton {
          position: absolute;
          left: 50%;
          bottom: 82px;
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
          cursor: pointer;
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

        @media (max-width: 860px) {
          .radioPlayer {
            grid-template-columns: 1fr;
            border-radius: 24px;
            gap: 10px;
            bottom: 14px;
          }

          .posterPlayButton {
            bottom: 128px;
          }
        }
      `}</style>
    </>
  );
}

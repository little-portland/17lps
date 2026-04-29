import Head from 'next/head';
import { useEffect, useMemo, useRef, useState } from 'react';
import SceneNav from '@components/SceneNav';

type Track = {
  id: string;
  title: string;
  artist: string;
  src: string;
  cover: string;
  episodeLabel: string;
  guest?: string;
  objectPosition?: string;
};

const IMAGE_BASE = '/images/private-hire';
const STAR_BG = `${IMAGE_BASE}/night-starry-sky-dark.jpg`;
const GRID_BG = `${IMAGE_BASE}/buldge-grid.svg`;

const PINK = '#df79d6';
const PURPLE = '#6a3796';
const GREEN = '#489d9a';

const GENRES = 'Balearic / World / Downtempo / Electronica';

const BASE_TRACKS: Track[] = [
  {
    id: '24',
    episodeLabel: 'THE TENT 24',
    title: 'The Tent (at the End of the Universe) 24 [with Alia Indigo]',
    artist: 'OpenLab',
    guest: 'With Alia Indigo',
    src: '/audio/tent-semoa.mp3',
    cover: '/covers/Openlab_Apr.png',
  },
  {
    id: 'sEmoa',
    episodeLabel: 'THE TENT',
    title: 'The Tent (at the End of the Universe) [with sEmoa]',
    artist: 'OpenLab',
    guest: 'With sEmoa',
    src: '/audio/tent-semoa.mp3',
    cover: '/covers/Openlab_Apr.png',
  },
  {
    id: '22',
    episodeLabel: 'THE TENT 22',
    title: 'The Tent (at the End of the Universe) 22 [with Bugsy]',
    artist: 'OpenLab',
    guest: 'With Bugsy',
    src: '/audio/tent-semoa.mp3',
    cover: '/covers/Openlab_Apr.png',
  },
  {
    id: '21',
    episodeLabel: 'THE TENT 21',
    title: 'The Tent (at the End of the Universe) 21',
    artist: 'OpenLab',
    src: '/audio/tent-semoa.mp3',
    cover: '/covers/Openlab_Apr.png',
  },
  {
    id: '20',
    episodeLabel: 'THE TENT 20',
    title: 'The Tent (at the End of the Universe) 20',
    artist: 'OpenLab',
    src: '/audio/tent-semoa.mp3',
    cover: '/covers/Openlab_Apr.png',
  },
];

const TRACKS: Track[] = Array.from({ length: 40 }, (_, index) => {
  const base = BASE_TRACKS[index % BASE_TRACKS.length];
  const episodeNumber = 40 - index;

  return {
    ...base,
    id: `${base.id}-${index}`,
    episodeLabel: `THE TENT ${episodeNumber}`,
    title: `The Tent (at the End of the Universe) ${episodeNumber}`,
  };
});

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
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [archiveQuery, setArchiveQuery] = useState('');

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const changeLockRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);
  const shouldPlayOnTrackChangeRef = useRef(false);

  const currentTrack = useMemo(() => TRACKS[activeIndex], [activeIndex]);

  const visibleArchiveTracks = useMemo(() => {
    const query = archiveQuery.trim().toLowerCase();

    if (!query) return TRACKS;

    return TRACKS.filter((track) =>
      [track.episodeLabel, track.title, track.artist, track.guest]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(query))
    );
  }, [archiveQuery]);

  const nearbyTracks = useMemo(
    () =>
      TRACKS.map((track, index) => ({ track, index })).filter(
        ({ index }) => Math.abs(index - activeIndex) <= 2
      ),
    [activeIndex]
  );

  const playAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const changeTrack = (index: number) => {
    const nextIndex = clamp(index, 0, TRACKS.length - 1);

    shouldPlayOnTrackChangeRef.current = true;

    if (nextIndex === activeIndex) {
      playAudio();
      return;
    }

    setPreviousIndex(activeIndex);
    setActiveIndex(nextIndex);

    window.setTimeout(() => setPreviousIndex(null), 360);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => setProgress(audio.currentTime || 0);
    const onLoaded = () => setDuration(audio.duration || 0);
    const onEnded = () => changeTrack(activeIndex + 1);

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
    audio.load();

    if (shouldPlayOnTrackChangeRef.current) {
      requestAnimationFrame(() => {
        playAudio();
      });
    }
  }, [currentTrack.src]);

  useEffect(() => {
    const releaseLock = () => {
      window.setTimeout(() => {
        changeLockRef.current = false;
      }, 520);
    };

    const onWheel = (event: WheelEvent) => {
      if (isArchiveOpen) return;

      event.preventDefault();

      if (changeLockRef.current) return;
      if (Math.abs(event.deltaY) < 22) return;

      changeLockRef.current = true;

      if (event.deltaY > 0) {
        changeTrack(activeIndex + 1);
      } else {
        changeTrack(activeIndex - 1);
      }

      releaseLock();
    };

    const onTouchStart = (event: TouchEvent) => {
      if (isArchiveOpen) return;
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (isArchiveOpen) return;
      if (touchStartYRef.current === null || changeLockRef.current) return;

      const endY = event.changedTouches[0]?.clientY ?? touchStartYRef.current;
      const diff = touchStartYRef.current - endY;

      touchStartYRef.current = null;

      if (Math.abs(diff) < 48) return;

      changeLockRef.current = true;

      if (diff > 0) {
        changeTrack(activeIndex + 1);
      } else {
        changeTrack(activeIndex - 1);
      }

      releaseLock();
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [activeIndex, isArchiveOpen]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      await playAudio();
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

      <main className="posterPage posterPage--with-scene-nav">
        <SceneNav theme="tent-radio" />

        <div className="posterStage">
          <div
            className="posterSky"
            style={{ backgroundImage: `url(${STAR_BG})` }}
          />
          <img src={GRID_BG} alt="" aria-hidden="true" className="posterGrid" />
          <div className="posterGridTint" aria-hidden="true" />
          <div className="posterGridGlow" aria-hidden="true" />
          <div className="posterGridSweep" aria-hidden="true" />
          <div className="posterVignette" />
          <div className="posterNoise" />

          <section className="posterFrame" aria-live="polite">
            <header className="radioHeader">
              <h1 className="radioHeader__title">The Tent Radio</h1>
              <p className="radioHeader__tag">
                Transmissions from the end of the universe
              </p>
            </header>

            <div className="orbCluster">
              <div className="orbBloomBack" />

              <div className="orbPhotoStage">
                <div className="orbPhotoMask">
                  {previousIndex !== null && !isPlaying && (
                    <div
                      aria-hidden="true"
                      className="orbPhotoLayer orbPhotoLayer--previous"
                      style={{
                        backgroundImage: `url(${TRACKS[previousIndex].cover})`,
                        backgroundPosition:
                          TRACKS[previousIndex].objectPosition || '50% 50%',
                      }}
                    />
                  )}

                  <div
                    key={currentTrack.id}
                    role="img"
                    aria-label={currentTrack.title}
                    className={`orbPhotoLayer orbPhotoLayer--current ${
                      previousIndex !== null ? 'is-glitching' : ''
                    } ${isPlaying ? 'is-playing' : ''}`}
                    style={{
                      backgroundImage: `url(${currentTrack.cover})`,
                      backgroundPosition:
                        currentTrack.objectPosition || '50% 50%',
                    }}
                  />

                  {isPlaying && (
                    <div className="orbWave" aria-label="Animated music wave">
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  )}

                  <div className="orbInnerTint" />
                  <div className="orbInnerGlow" />
                </div>
              </div>
            </div>

            <div className="trackHero">
              <p className="trackHero__label">{currentTrack.episodeLabel}</p>
              <p className="trackHero__guest">
                {currentTrack.guest || currentTrack.artist}
              </p>
              <p className="trackHero__genres">{GENRES}</p>
            </div>
          </section>

          <nav className="trackIndex" aria-label="Nearby transmissions">
            <p className="trackIndex__label">Now Tuning</p>

            <div className="trackIndex__list">
              {nearbyTracks.map(({ track, index }) => (
                <button
                  key={track.id}
                  type="button"
                  className={`trackIndex__item ${
                    index === activeIndex ? 'is-active' : ''
                  }`}
                  onClick={() => changeTrack(index)}
                >
                  <span className="trackIndex__number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="trackIndex__title">
                    {track.episodeLabel}
                  </span>
                </button>
              ))}
            </div>

            <button
              type="button"
              className="trackIndex__archive"
              onClick={() => setIsArchiveOpen(true)}
            >
              Open Archive
            </button>
          </nav>

          <div className="radioPlayer">
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
                onClick={() => changeTrack(activeIndex - 1)}
                disabled={activeIndex === 0}
                aria-label="Previous track"
              >
                ◀
              </button>

              <button
                type="button"
                className="radioPlayer__transmit"
                onClick={togglePlay}
                aria-label="Play or pause"
              >
                {isPlaying ? 'Pause Transmission' : 'Play Transmission'}
              </button>

              <button
                type="button"
                onClick={() => changeTrack(activeIndex + 1)}
                disabled={activeIndex === TRACKS.length - 1}
                aria-label="Next track"
              >
                ▶
              </button>
            </div>

            <button
              type="button"
              className="radioPlayer__archive"
              onClick={() => setIsArchiveOpen(true)}
            >
              Open Archive
            </button>
          </div>

          <div
            className={`archiveDrawer ${isArchiveOpen ? 'is-open' : ''}`}
            aria-hidden={!isArchiveOpen}
          >
            <button
              type="button"
              className="archiveDrawer__backdrop"
              onClick={() => {
                setIsArchiveOpen(false);
                setArchiveQuery('');
              }}
              aria-label="Close archive"
            />

            <aside
              className="archiveDrawer__panel"
              aria-label="Transmission archive"
            >
              <div className="archiveDrawer__header">
                <div>
                  <p className="archiveDrawer__eyebrow">
                    Transmission Archive
                  </p>
                  <h2>All Episodes</h2>
                </div>

                <button
                  type="button"
                  className="archiveDrawer__close"
                  onClick={() => {
                    setIsArchiveOpen(false);
                    setArchiveQuery('');
                  }}
                >
                  Close
                </button>
              </div>

              <div className="archiveDrawer__searchWrap">
                <input
                  className="archiveDrawer__search"
                  value={archiveQuery}
                  onChange={(event) => setArchiveQuery(event.target.value)}
                  placeholder="Search transmissions..."
                  aria-label="Search transmissions"
                />

                {archiveQuery && (
                  <button
                    type="button"
                    className="archiveDrawer__clear"
                    onClick={() => setArchiveQuery('')}
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>

              <div className="archiveDrawer__list">
                {visibleArchiveTracks.map((track) => {
                  const index = TRACKS.findIndex(
                    (item) => item.id === track.id
                  );

                  return (
                    <button
                      key={track.id}
                      type="button"
                      className={`archiveDrawer__item ${
                        index === activeIndex ? 'is-active' : ''
                      }`}
                      onClick={() => {
                        changeTrack(index);
                        setIsArchiveOpen(false);
                      }}
                    >
                      <span className="archiveDrawer__number">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <span className="archiveDrawer__meta">
                        <strong>{track.episodeLabel}</strong>
                        <small>{track.guest || track.artist}</small>
                      </span>

                      <span className="archiveDrawer__status">
                        {index === activeIndex ? 'Live' : 'Tune'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </aside>
          </div>

          <audio ref={audioRef} src={currentTrack.src} preload="metadata" />
        </div>
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;800;900&family=IBM+Plex+Mono:wght@400;500;700&display=swap');

        html,
        body {
          margin: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: #040707 !important;
          color: #f1eee7;
          font-family: 'IBM Plex Mono', ui-monospace, monospace;
        }

        * {
          box-sizing: border-box;
        }

        * {
          scrollbar-color: ${PINK} rgba(0, 0, 0, 0.35);
          scrollbar-width: thin;
        }

        *::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        *::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.35);
        }

        *::-webkit-scrollbar-thumb {
          background: ${PINK};
          border-radius: 999px;
          box-shadow: 0 0 10px rgba(223, 121, 214, 0.8);
        }

        *::-webkit-scrollbar-thumb:hover {
          background: ${GREEN};
        }

        button {
          color: inherit;
          font: inherit;
          background: none;
          border: 0;
          padding: 0;
          cursor: pointer;
        }

        img {
          display: block;
        }

        #__next {
          height: 100%;
        }

        .posterPage,
        .posterStage {
          position: fixed;
          inset: 0;
          overflow: hidden;
          background: #040707;
        }

        /* =====================================================
           TENT RADIO NAV THEME
        ===================================================== */

        .scene-nav {
          z-index: 10040 !important;
        }

        .scene-nav-burger,
        .scene-nav-logo {
          position: relative;
          z-index: 10050 !important;
        }

        .scene-nav-mobile {
          z-index: 10030 !important;
        }

        .scene-nav--tent-radio {
          background: rgba(5, 3, 12, 0.62) !important;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          z-index: 10040 !important;
        }

        .scene-nav--tent-radio,
        .scene-nav--tent-radio a,
        .scene-nav-mobile--tent-radio,
        .scene-nav-mobile--tent-radio a {
          color: ${GREEN} !important;
          font-family: 'Orbitron', 'IBM Plex Mono', monospace !important;
        }

        .scene-nav--tent-radio a.active,
        .scene-nav-mobile--tent-radio a.active {
          color: ${PINK} !important;
        }

        .scene-nav--tent-radio a.disabled,
        .scene-nav-mobile--tent-radio a.disabled {
          color: ${GREEN} !important;
          opacity: 0.38;
        }

        .scene-nav--tent-radio .scene-nav-burger span {
          background: ${GREEN} !important;
        }

        .scene-nav--tent-radio .scene-nav-logo img {
          filter: brightness(0) saturate(100%) invert(61%) sepia(23%)
            saturate(803%) hue-rotate(130deg) brightness(87%) contrast(86%);
        }

        .scene-nav-mobile.scene-nav--tent-radio,
        .scene-nav-mobile--tent-radio {
          position: fixed !important;
          inset: 0 !important;
          width: 100vw !important;
          height: 100dvh !important;
          min-height: 100dvh !important;
          background:
            radial-gradient(
              circle at 48% 22%,
              rgba(72, 157, 154, 0.2),
              transparent 28%
            ),
            radial-gradient(
              circle at 52% 46%,
              rgba(106, 55, 150, 0.32),
              transparent 38%
            ),
            rgba(5, 3, 12, 0.76) !important;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          z-index: 10030 !important;
        }

        .scene-nav--tent-radio.is-open {
          background: transparent !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
        }

        .scene-nav-mobile--tent-radio .scene-nav-mobile-inner {
          color: ${GREEN} !important;
        }

        .scene-nav-mobile--tent-radio .scene-nav-mobile-inner a {
          color: ${GREEN} !important;
        }

        .scene-nav-mobile--tent-radio .scene-nav-mobile-inner a.active {
          color: ${PINK} !important;
        }

        .scene-nav-mobile--tent-radio .scene-nav-mobile-inner a.disabled {
          color: ${GREEN} !important;
          opacity: 0.34;
        }

        @media (max-width: 900px) {
          .scene-nav-mobile--tent-radio .scene-nav-mobile-inner {
            padding-top: 24px !important;
          }
        }

        .posterSky,
        .posterGrid,
        .posterGridTint,
        .posterGridGlow,
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
          filter: saturate(0.86) brightness(0.48);
          opacity: 0.98;
        }

        .posterGrid {
          width: 100%;
          height: 100%;
          object-fit: cover;
          mix-blend-mode: screen;
          opacity: 0.72;
          filter:
            drop-shadow(0 0 13px rgba(72, 157, 154, 0.42))
            drop-shadow(0 0 24px rgba(106, 55, 150, 0.34))
            hue-rotate(24deg)
            saturate(1.2);
          animation: gridPulse 8s ease-in-out infinite;
        }

        .posterGridTint {
          background:
            linear-gradient(
              105deg,
              rgba(72, 157, 154, 0.2) 0%,
              rgba(72, 157, 154, 0.06) 32%,
              rgba(106, 55, 150, 0.14) 56%,
              rgba(223, 121, 214, 0.16) 100%
            ),
            radial-gradient(
              circle at 50% 46%,
              rgba(106, 55, 150, 0.18),
              transparent 42%
            );
          mix-blend-mode: screen;
          opacity: 0.72;
        }

        .posterGridGlow {
          background:
            radial-gradient(
              ellipse at center,
              rgba(106, 55, 150, 0.22) 0%,
              rgba(72, 157, 154, 0.12) 36%,
              transparent 72%
            ),
            linear-gradient(
              90deg,
              rgba(223, 121, 214, 0.13),
              transparent 24%,
              transparent 76%,
              rgba(72, 157, 154, 0.13)
            );
          mix-blend-mode: screen;
          filter: blur(18px);
          opacity: 0.72;
        }

        .posterGridSweep {
          opacity: 0;
          background: linear-gradient(
            180deg,
            transparent 0%,
            transparent 30%,
            rgba(223, 121, 214, 0.05) 38%,
            rgba(223, 121, 214, 0.28) 46%,
            rgba(72, 157, 154, 0.28) 52%,
            rgba(106, 55, 150, 0.1) 60%,
            transparent 70%,
            transparent 100%
          );
          mix-blend-mode: screen;
          filter: blur(12px);
          transform: translateY(-130%);
          animation: gridSweepVertical 9.5s linear infinite;
        }

        .posterVignette {
          background:
            radial-gradient(
              circle at center,
              transparent 26%,
              rgba(6, 7, 17, 0.2) 58%,
              rgba(3, 3, 8, 0.88) 100%
            ),
            linear-gradient(
              180deg,
              rgba(6, 4, 14, 0.08),
              rgba(6, 4, 14, 0.42)
            );
        }

        .posterNoise {
          opacity: 0.09;
          background-image:
            radial-gradient(
              circle at 8% 16%,
              rgba(255, 255, 255, 0.8) 0 1px,
              transparent 1.4px
            ),
            radial-gradient(
              circle at 76% 22%,
              rgba(255, 255, 255, 0.66) 0 1px,
              transparent 1.4px
            ),
            radial-gradient(
              circle at 86% 72%,
              rgba(255, 255, 255, 0.5) 0 1px,
              transparent 1.4px
            ),
            radial-gradient(
              circle at 28% 80%,
              rgba(255, 255, 255, 0.42) 0 1px,
              transparent 1.4px
            );
          background-size: 320px 320px, 380px 380px, 340px 340px, 400px 400px;
          mix-blend-mode: screen;
        }

        .posterFrame {
          --core-width: min(29vw, 430px);
          --core-height: calc(var(--core-width) * 1.25);
          --image-radius: clamp(28px, 3vw, 50px);

          position: absolute;
          inset: 0;
          z-index: 6;
          display: grid;
          place-items: center;
          pointer-events: none;
        }

        .radioHeader {
          position: absolute;
          left: 50%;
          top: clamp(66px, 7.8vh, 96px);
          z-index: 12;
          width: min(94vw, 1040px);
          transform: translateX(-50%);
          text-align: center;
          text-transform: uppercase;
        }

        .radioHeader__title {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin: 0 0 6px;
          padding: 0 22px;
          color: ${PINK};
          font-family: 'Orbitron', 'IBM Plex Mono', monospace;
          font-size: clamp(2rem, 4vw, 4.15rem);
          font-weight: 900;
          letter-spacing: 0.08em;
          line-height: 0.95;
          text-shadow:
            0 0 10px rgba(223, 121, 214, 0.5),
            0 0 28px rgba(223, 121, 214, 0.34),
            0 0 52px rgba(106, 55, 150, 0.34);
          white-space: nowrap;
        }

        .radioHeader__title::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -8px;
          height: 12px;
          border-radius: 999px;
          background: radial-gradient(
            ellipse at center,
            rgba(223, 121, 214, 0.28),
            transparent 70%
          );
          filter: blur(8px);
        }

        .radioHeader__tag {
          margin: 0;
          color: ${GREEN};
          font-size: clamp(0.62rem, 0.78vw, 0.9rem);
          font-weight: 900;
          letter-spacing: 0.24em;
          text-shadow:
            0 0 8px rgba(72, 157, 154, 0.56),
            0 0 24px rgba(72, 157, 154, 0.3);
        }

        .orbCluster {
          position: relative;
          width: var(--core-width);
          height: var(--core-height);
          z-index: 7;
          display: grid;
          place-items: center;
          pointer-events: none;
          transform: translateY(4px);
        }

        .orbBloomBack {
          position: absolute;
          inset: -12%;
          border-radius: calc(var(--image-radius) + 28px);
          background:
            radial-gradient(
              ellipse at center,
              rgba(223, 121, 214, 0.42) 0%,
              rgba(106, 55, 150, 0.34) 35%,
              rgba(72, 157, 154, 0.16) 58%,
              rgba(72, 157, 154, 0) 78%
            );
          filter: blur(38px);
          opacity: 0.62;
          animation: orbPulse 2.9s ease-in-out infinite;
        }

        .orbPhotoStage {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: var(--image-radius);
          overflow: visible;
          isolation: isolate;
          filter: drop-shadow(0 0 22px rgba(223, 121, 214, 0.26));
        }

        .orbPhotoStage::before {
          content: '';
          position: absolute;
          inset: -10px;
          border-radius: calc(var(--image-radius) + 10px);
          pointer-events: none;
          background:
            radial-gradient(
              ellipse at center,
              rgba(223, 121, 214, 0.18),
              rgba(106, 55, 150, 0.12) 42%,
              rgba(72, 157, 154, 0.05) 64%,
              transparent 78%
            );
          filter: blur(8px);
          opacity: 0.7;
          animation: imageGlowPulse 2.9s ease-in-out infinite;
        }

        .orbPhotoMask {
          position: absolute;
          inset: 0;
          z-index: 2;
          border-radius: var(--image-radius);
          overflow: hidden;
          isolation: isolate;
          contain: paint;
          background:
            radial-gradient(
              circle at 50% 42%,
              rgba(106, 55, 150, 0.2),
              rgba(4, 5, 12, 0.64) 62%,
              rgba(4, 5, 12, 0.86)
            );
          box-shadow:
            inset 0 0 34px rgba(223, 121, 214, 0.12),
            inset 0 0 76px rgba(72, 157, 154, 0.08),
            0 0 0 1px rgba(223, 121, 214, 0.16);
        }

        .orbPhotoLayer {
          position: absolute;
          inset: 0;
          background-size: contain;
          background-repeat: no-repeat;
          filter: contrast(1.06) brightness(0.88) saturate(0.94);
          transform: translateZ(0);
          transition:
            filter 420ms ease,
            opacity 420ms ease,
            transform 420ms ease;
        }

        .orbPhotoLayer--current.is-playing {
          filter: contrast(1.02) brightness(0.58) saturate(0.82) blur(4px);
          opacity: 0.62;
          transform: scale(1.018);
        }

        .orbPhotoLayer--current.is-glitching {
          animation: photoGlitchIn 360ms ease both;
        }

        .orbPhotoLayer--previous {
          animation: photoGlitchOut 360ms ease forwards;
        }

        .orbWave {
          position: absolute;
          inset: 0;
          z-index: 16;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(6px, 0.9vw, 12px);
          background:
            radial-gradient(
              circle,
              rgba(223, 121, 214, 0.16),
              rgba(106, 55, 150, 0.16) 42%,
              rgba(0, 0, 0, 0.18) 72%
            );
          backdrop-filter: blur(1px);
          -webkit-backdrop-filter: blur(1px);
          animation: waveOverlayIn 420ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }

        .orbWave span {
          width: clamp(5px, 0.65vw, 10px);
          height: 22%;
          border-radius: 999px;
          background: linear-gradient(180deg, ${PINK}, ${GREEN});
          box-shadow:
            0 0 12px rgba(223, 121, 214, 0.86),
            0 0 30px rgba(106, 55, 150, 0.54);
          transform-origin: center;
          animation: waveDance 860ms ease-in-out infinite;
        }

        .orbWave span:nth-child(1) {
          animation-delay: 0ms;
          height: 32%;
        }

        .orbWave span:nth-child(2) {
          animation-delay: 70ms;
          height: 24%;
        }

        .orbWave span:nth-child(3) {
          animation-delay: 140ms;
          height: 18%;
        }

        .orbWave span:nth-child(4) {
          animation-delay: 210ms;
          height: 14%;
        }

        .orbWave span:nth-child(5) {
          animation-delay: 280ms;
          height: 20%;
        }

        .orbWave span:nth-child(6) {
          animation-delay: 350ms;
          height: 16%;
        }

        .orbWave span:nth-child(7) {
          animation-delay: 280ms;
          height: 18%;
        }

        .orbWave span:nth-child(8) {
          animation-delay: 210ms;
          height: 24%;
        }

        .orbWave span:nth-child(9) {
          animation-delay: 140ms;
          height: 34%;
        }

        .orbWave span:nth-child(10) {
          animation-delay: 70ms;
          height: 20%;
        }

        .orbWave span:nth-child(11) {
          animation-delay: 0ms;
          height: 30%;
        }

        .orbInnerTint,
        .orbInnerGlow {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .orbInnerTint {
          z-index: 18;
          background:
            linear-gradient(
              180deg,
              rgba(223, 121, 214, 0.08),
              transparent 22%,
              transparent 68%,
              rgba(72, 157, 154, 0.08)
            ),
            repeating-linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0.025) 0px,
              rgba(255, 255, 255, 0.025) 1px,
              transparent 1px,
              transparent 4px
            );
          mix-blend-mode: screen;
          opacity: 0.68;
        }

        .orbInnerGlow {
          z-index: 19;
          border-radius: var(--image-radius);
          box-shadow:
            inset 0 0 34px rgba(223, 121, 214, 0.12),
            inset 0 0 90px rgba(106, 55, 150, 0.14),
            inset 0 0 120px rgba(72, 157, 154, 0.08);
        }

        .trackHero {
          position: absolute;
          left: 50%;
          top: calc(50% + (var(--core-height) / 2) + 28px);
          z-index: 14;
          width: min(780px, calc(100vw - 120px));
          transform: translateX(-50%);
          text-align: center;
          text-transform: uppercase;
          pointer-events: none;
        }

        .trackHero__label {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin: 0 0 10px;
          padding: 11px 26px 12px;
          border-radius: 999px;
          border: 1px solid rgba(72, 157, 154, 0.42);
          background:
            linear-gradient(
              90deg,
              rgba(106, 55, 150, 0.18),
              rgba(72, 157, 154, 0.16)
            ),
            rgba(0, 0, 0, 0.64);
          color: ${PINK};
          font-family: 'Orbitron', 'IBM Plex Mono', monospace;
          font-size: clamp(1.15rem, 2vw, 1.9rem);
          font-weight: 900;
          letter-spacing: 0.06em;
          text-shadow:
            0 0 8px rgba(223, 121, 214, 0.66),
            0 0 26px rgba(223, 121, 214, 0.42);
          box-shadow:
            0 0 16px rgba(72, 157, 154, 0.12),
            inset 0 0 18px rgba(106, 55, 150, 0.1);
        }

        .trackHero__guest,
        .trackHero__genres {
          margin: 0;
          font-weight: 800;
          letter-spacing: 0.14em;
          line-height: 1.35;
        }

        .trackHero__guest {
          color: ${GREEN};
          font-size: clamp(0.7rem, 0.85vw, 0.9rem);
          text-shadow:
            0 0 8px rgba(72, 157, 154, 0.58),
            0 0 18px rgba(72, 157, 154, 0.3);
        }

        .trackHero__genres {
          margin-top: 6px;
          color: ${PINK};
          font-size: clamp(0.58rem, 0.72vw, 0.72rem);
          opacity: 0.92;
          text-shadow:
            0 0 8px rgba(223, 121, 214, 0.52),
            0 0 18px rgba(106, 55, 150, 0.3);
        }

        .radioPlayer {
          position: fixed;
          left: 50%;
          bottom: 22px;
          z-index: 30;
          width: min(1080px, calc(100vw - 32px));
          transform: translateX(-50%);
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 22px;
          align-items: center;
          padding: 16px 18px;
          border-radius: 999px;
          border: 1px solid rgba(72, 157, 154, 0.34);
          background:
            linear-gradient(
              90deg,
              rgba(106, 55, 150, 0.14),
              transparent 24%,
              transparent 76%,
              rgba(72, 157, 154, 0.14)
            ),
            rgba(2, 5, 10, 0.86);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow:
            0 0 22px rgba(106, 55, 150, 0.24),
            inset 0 0 24px rgba(72, 157, 154, 0.06);
        }

        .radioPlayer__bar {
          display: grid;
          grid-template-columns: 58px minmax(280px, 1fr) 58px;
          gap: 14px;
          align-items: center;
          color: ${PINK};
          font-size: 0.78rem;
          font-weight: 800;
          font-variant-numeric: tabular-nums;
          text-shadow: 0 0 10px rgba(223, 121, 214, 0.56);
        }

        .radioPlayer__bar input[type='range'] {
          appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 999px;
          background:
            linear-gradient(
              90deg,
              rgba(72, 157, 154, 0.95),
              rgba(223, 121, 214, 0.9)
            ),
            rgba(106, 55, 150, 0.34);
          outline: none;
        }

        .radioPlayer__bar input[type='range']::-webkit-slider-thumb {
          appearance: none;
          width: 17px;
          height: 17px;
          border-radius: 50%;
          background: ${PINK};
          animation: playerDotPulse 1.25s ease-in-out infinite;
        }

        .radioPlayer__controls {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .radioPlayer__controls button {
          height: 42px;
          border-radius: 999px;
          border: 1px solid rgba(72, 157, 154, 0.38);
          background: rgba(0, 0, 0, 0.58);
          color: ${PINK};
          text-transform: uppercase;
          font-size: 0.76rem;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-shadow: 0 0 10px rgba(223, 121, 214, 0.65);
          box-shadow: inset 0 0 14px rgba(106, 55, 150, 0.1);
        }

        .radioPlayer__controls button:not(.radioPlayer__transmit) {
          width: 42px;
        }

        .radioPlayer__transmit {
          min-width: 210px;
          padding: 0 20px;
        }

        .radioPlayer__controls button:disabled {
          opacity: 0.24;
          cursor: not-allowed;
        }

        .radioPlayer__archive {
          display: none;
        }

        .trackIndex {
          position: fixed;
          right: 24px;
          top: 50%;
          z-index: 24;
          width: 210px;
          transform: translateY(-50%);
          padding: 16px;
          border-radius: 26px;
          border: 1px solid rgba(72, 157, 154, 0.28);
          background:
            linear-gradient(
              180deg,
              rgba(106, 55, 150, 0.1),
              rgba(0, 0, 0, 0.34)
            ),
            rgba(0, 0, 0, 0.46);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow:
            0 0 18px rgba(106, 55, 150, 0.18),
            inset 0 0 18px rgba(72, 157, 154, 0.05);
        }

        .trackIndex__label {
          margin: 0 0 12px;
          color: ${PINK};
          text-transform: uppercase;
          letter-spacing: 0.16em;
          font-size: 0.68rem;
          font-weight: 900;
          text-shadow: 0 0 10px rgba(223, 121, 214, 0.5);
        }

        .trackIndex__list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .trackIndex__item {
          display: grid;
          grid-template-columns: 34px 1fr;
          gap: 8px;
          align-items: center;
          width: 100%;
          padding: 9px 10px;
          border-radius: 999px;
          border: 1px solid transparent;
          background: rgba(0, 0, 0, 0.2);
          color: ${GREEN};
          text-align: left;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-size: 0.68rem;
          font-weight: 800;
        }

        .trackIndex__item.is-active {
          border-color: rgba(223, 121, 214, 0.62);
          background: rgba(106, 55, 150, 0.24);
          color: ${PINK};
          box-shadow: 0 0 16px rgba(223, 121, 214, 0.18);
        }

        .trackIndex__number {
          color: ${GREEN};
        }

        .trackIndex__title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .trackIndex__item.is-active .trackIndex__number {
          color: ${GREEN};
        }

        .trackIndex__archive {
          width: 100%;
          margin-top: 12px;
          padding: 10px 12px;
          border-radius: 999px;
          border: 1px solid rgba(223, 121, 214, 0.46);
          background: rgba(106, 55, 150, 0.14);
          color: ${PINK};
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-size: 0.64rem;
          font-weight: 900;
          text-shadow: 0 0 10px rgba(223, 121, 214, 0.56);
        }

        .archiveDrawer {
          position: fixed;
          inset: 0;
          z-index: 90;
          pointer-events: none;
        }

        .archiveDrawer.is-open {
          pointer-events: auto;
        }

        .archiveDrawer__backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0);
          transition: background 240ms ease;
        }

        .archiveDrawer.is-open .archiveDrawer__backdrop {
          background: rgba(0, 0, 0, 0.58);
        }

        .archiveDrawer__panel {
          position: absolute;
          top: 82px;
          right: 18px;
          bottom: 18px;
          width: min(460px, calc(100vw - 36px));
          display: flex;
          flex-direction: column;
          padding: 20px;
          border-radius: 30px;
          border: 1px solid rgba(72, 157, 154, 0.34);
          background:
            linear-gradient(
              180deg,
              rgba(106, 55, 150, 0.18),
              transparent 34%
            ),
            rgba(4, 3, 12, 0.9);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          box-shadow:
            0 0 32px rgba(106, 55, 150, 0.24),
            inset 0 0 24px rgba(72, 157, 154, 0.08);
          transform: translateX(calc(100% + 32px));
          transition: transform 280ms ease;
        }

        .archiveDrawer.is-open .archiveDrawer__panel {
          transform: translateX(0);
        }

        .archiveDrawer__header {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          align-items: flex-start;
        }

        .archiveDrawer__eyebrow {
          margin: 0 0 6px;
          color: ${GREEN};
          text-transform: uppercase;
          letter-spacing: 0.16em;
          font-size: 0.68rem;
          font-weight: 900;
        }

        .archiveDrawer__header h2 {
          margin: 0;
          color: ${PINK};
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-family: 'Orbitron', 'IBM Plex Mono', monospace;
          font-size: 1.5rem;
          text-shadow: 0 0 14px rgba(223, 121, 214, 0.48);
        }

        .archiveDrawer__close {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 9px 12px;
          border-radius: 999px;
          border: 1px solid rgba(72, 157, 154, 0.42);
          color: ${GREEN};
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.66rem;
          font-weight: 900;
          line-height: 1;
        }

        .archiveDrawer__searchWrap {
          position: relative;
          margin: 18px 0 14px;
        }

        .archiveDrawer__search {
          width: 100%;
          padding: 14px 48px 14px 16px;
          border-radius: 999px;
          border: 1px solid rgba(72, 157, 154, 0.38);
          outline: none;
          background: rgba(0, 0, 0, 0.56);
          color: ${PINK};
          font: inherit;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .archiveDrawer__clear {
          position: absolute;
          right: 12px;
          top: 50%;
          width: 32px;
          height: 32px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transform: translateY(-50%);
          border-radius: 999px;
          border: 1px solid rgba(72, 157, 154, 0.42);
          color: ${GREEN};
          font-size: 1.1rem;
          font-weight: 900;
          line-height: 1;
        }

        .archiveDrawer__search::placeholder {
          color: rgba(223, 121, 214, 0.5);
        }

        .archiveDrawer__list {
          min-height: 0;
          overflow-y: auto;
          padding-right: 4px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .archiveDrawer__item {
          display: grid;
          grid-template-columns: 42px 1fr auto;
          gap: 12px;
          align-items: center;
          width: 100%;
          padding: 12px 13px;
          border-radius: 18px;
          border: 1px solid rgba(72, 157, 154, 0.16);
          background: rgba(0, 0, 0, 0.28);
          color: rgba(244, 240, 232, 0.72);
          text-align: left;
        }

        .archiveDrawer__item.is-active {
          border-color: rgba(223, 121, 214, 0.58);
          background: rgba(106, 55, 150, 0.22);
          color: ${PINK};
        }

        .archiveDrawer__number {
          color: ${GREEN};
          font-weight: 900;
        }

        .archiveDrawer__meta {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .archiveDrawer__meta strong,
        .archiveDrawer__meta small {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .archiveDrawer__meta strong {
          color: ${PINK};
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-size: 0.78rem;
        }

        .archiveDrawer__meta small {
          color: ${GREEN};
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-size: 0.62rem;
        }

        .archiveDrawer__status {
          color: ${PINK};
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.62rem;
          font-weight: 900;
        }

        @keyframes waveOverlayIn {
          0% {
            opacity: 0;
            transform: scale(0.96);
            filter: blur(8px);
          }
          100% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
          }
        }

        @keyframes waveDance {
          0%,
          100% {
            transform: scaleY(0.36) translateY(0);
            opacity: 0.48;
          }
          35% {
            transform: scaleY(1.5) translateY(-5px);
            opacity: 1;
          }
          65% {
            transform: scaleY(0.72) translateY(4px);
            opacity: 0.78;
          }
        }

        @keyframes playerDotPulse {
          0%,
          100% {
            box-shadow:
              0 0 0 0 rgba(223, 121, 214, 0.34),
              0 0 16px rgba(223, 121, 214, 0.78);
          }
          50% {
            box-shadow:
              0 0 0 10px rgba(223, 121, 214, 0),
              0 0 28px rgba(223, 121, 214, 1);
          }
        }

        @keyframes gridPulse {
          0%,
          100% {
            opacity: 0.64;
          }
          50% {
            opacity: 0.82;
          }
        }

        @keyframes gridSweepVertical {
          0%,
          56% {
            opacity: 0;
            transform: translateY(-130%);
          }
          62% {
            opacity: 0.24;
          }
          74% {
            opacity: 0.7;
            transform: translateY(18%);
          }
          86% {
            opacity: 0.2;
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
            transform: scale(1.02);
            opacity: 0.52;
            filter: blur(34px) brightness(0.94);
          }
          50% {
            transform: scale(1.14);
            opacity: 0.78;
            filter: blur(48px) brightness(1.08);
          }
        }

        @keyframes imageGlowPulse {
          0%,
          100% {
            opacity: 0.48;
            transform: scale(0.992);
          }
          50% {
            opacity: 0.74;
            transform: scale(1.018);
          }
        }

        @keyframes photoGlitchIn {
          0% {
            opacity: 0.28;
            transform: scale(1.02) translateX(8px);
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
            --core-width: min(32vw, 390px);
          }

          .radioHeader__title {
            font-size: clamp(1.9rem, 4vw, 3.5rem);
          }

          .trackIndex {
            right: 16px;
            width: 190px;
          }
        }

        @media (max-width: 980px) {
          .posterFrame {
            --core-width: min(38vw, 330px);
          }

          .radioHeader {
            top: 84px;
          }

          .radioHeader__title {
            font-size: clamp(1.7rem, 6vw, 3rem);
            white-space: normal;
            max-width: 92vw;
          }

          .radioHeader__tag {
            display: block;
            font-size: clamp(0.54rem, 1.7vw, 0.72rem);
            letter-spacing: 0.16em;
            max-width: 88vw;
            margin-inline: auto;
          }

          .trackHero {
            width: calc(100vw - 32px);
          }

          .trackIndex {
            left: 50%;
            right: auto;
            top: auto;
            bottom: 158px;
            width: min(620px, calc(100vw - 32px));
            transform: translateX(-50%);
            padding: 10px;
          }

          .trackIndex__label {
            display: none;
          }

          .trackIndex__list {
            flex-direction: row;
            overflow-x: auto;
            gap: 8px;
            scrollbar-width: none;
          }

          .trackIndex__list::-webkit-scrollbar {
            display: none;
          }

          .trackIndex__item {
            min-width: 132px;
          }

          .trackIndex__archive {
            margin-top: 8px;
          }

          .radioPlayer {
            grid-template-columns: 1fr;
            border-radius: 26px;
            bottom: 16px;
            width: calc(100vw - 24px);
          }

          .radioPlayer__controls {
            justify-content: center;
          }
        }

        @media (max-width: 760px) {
          html,
          body {
            overflow: hidden;
          }

          .posterFrame {
            --core-width: min(45vw, 202px);
            --image-radius: clamp(22px, 5vw, 34px);
          }

          .radioHeader {
            top: 106px;
          }

          .radioHeader__title {
            font-size: clamp(1.22rem, 6.5vw, 1.75rem);
            line-height: 0.95;
            margin-bottom: 3px;
            letter-spacing: 0.055em;
            white-space: nowrap;
          }

          .radioHeader__tag {
            font-size: 0.46rem;
            line-height: 1.2;
            letter-spacing: 0.09em;
          }

          .orbCluster {
            transform: translateY(-44px);
          }

          .trackHero {
            top: calc(50% + (var(--core-height) / 2) + 18px);
            transform: translateX(-50%) translateY(-44px);
            width: calc(100vw - 32px);
          }

          .trackHero__label {
            font-size: 0.82rem;
            padding: 7px 14px 8px;
            margin-bottom: 5px;
            letter-spacing: 0.06em;
          }

          .trackHero__guest {
            font-size: 0.58rem;
            letter-spacing: 0.12em;
          }

          .trackHero__genres {
            font-size: 0.44rem;
            letter-spacing: 0.07em;
            margin-top: 4px;
          }

          .trackIndex {
            display: none;
          }

          .radioPlayer {
            bottom: 12px;
            width: calc(100vw - 28px);
            gap: 10px;
            padding: 16px 18px;
            border-radius: 24px;
          }

          .radioPlayer__bar {
            grid-template-columns: 44px 1fr 50px;
            gap: 10px;
            font-size: 0.78rem;
          }

          .radioPlayer__controls {
            gap: 10px;
          }

          .radioPlayer__controls button:not(.radioPlayer__transmit) {
            width: 40px;
            height: 40px;
          }

          .radioPlayer__transmit {
            min-width: 168px;
            height: 40px;
            font-size: 0.64rem;
            padding: 0 14px;
          }

          .radioPlayer__archive {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 42px;
            border-radius: 999px;
            border: 1px solid rgba(72, 157, 154, 0.4);
            background: rgba(106, 55, 150, 0.18);
            color: ${PINK};
            text-transform: uppercase;
            letter-spacing: 0.12em;
            font-size: 0.68rem;
            font-weight: 900;
            text-shadow: 0 0 10px rgba(223, 121, 214, 0.56);
          }

          .archiveDrawer__panel {
            top: auto;
            left: 10px;
            right: 10px;
            bottom: 10px;
            width: auto;
            max-height: 76vh;
            border-radius: 28px;
            transform: translateY(calc(100% + 32px));
          }

          .archiveDrawer.is-open .archiveDrawer__panel {
            transform: translateY(0);
          }

          .archiveDrawer__header h2 {
            font-size: 1.18rem;
          }

          .archiveDrawer__item {
            grid-template-columns: 34px 1fr auto;
          }

          .archiveDrawer__list {
            padding-right: 18px;
          }
        }

        @media (max-width: 430px) {
          .posterFrame {
            --core-width: min(44vw, 190px);
          }

          .radioHeader {
            top: 110px;
          }

          .radioHeader__title {
            font-size: clamp(1.14rem, 6.2vw, 1.58rem);
          }

          .radioHeader__tag {
            font-size: 0.41rem;
          }

          .orbCluster {
            transform: translateY(-48px);
          }

          .trackHero {
            top: calc(50% + (var(--core-height) / 2) + 16px);
            transform: translateX(-50%) translateY(-48px);
          }

          .trackHero__label {
            font-size: 0.78rem;
            padding: 7px 13px 8px;
          }

          .trackHero__guest {
            font-size: 0.54rem;
          }

          .trackHero__genres {
            font-size: 0.4rem;
          }

          .radioPlayer {
            padding: 16px 18px;
            gap: 10px;
          }

          .radioPlayer__bar {
            grid-template-columns: 42px 1fr 48px;
            font-size: 0.76rem;
          }

          .radioPlayer__controls button:not(.radioPlayer__transmit) {
            width: 38px;
            height: 38px;
          }

          .radioPlayer__transmit {
            min-width: 152px;
            height: 38px;
          }

          .radioPlayer__archive {
            height: 40px;
          }

          .archiveDrawer__list {
            padding-right: 20px;
          }
        }
      `}</style>
    </>
  );
}

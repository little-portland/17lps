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
                  ×
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
          background: #f08be8;
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
          background: rgba(2, 2, 12, 0.68) !important;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
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
          text-shadow:
            0 0 8px rgba(223, 121, 214, 0.7),
            0 0 18px rgba(223, 121, 214, 0.28);
        }

        .scene-nav--tent-radio a.disabled,
        .scene-nav-mobile--tent-radio a.disabled {
          color: ${GREEN} !important;
          opacity: 0.32;
        }

        .scene-nav--tent-radio .scene-nav-burger span {
          background: ${GREEN} !important;
        }

        .scene-nav--tent-radio .scene-nav-logo img {
          filter: brightness(0) saturate(100%) invert(58%) sepia(38%)
            saturate(560%) hue-rotate(129deg) brightness(92%) contrast(88%);
        }

        .scene-nav-mobile.scene-nav--tent-radio,
        .scene-nav-mobile--tent-radio {
          background:
            radial-gradient(circle at 46% 20%, rgba(106, 55, 150, 0.46), transparent 34%),
            radial-gradient(circle at 36% 62%, rgba(72, 157, 154, 0.16), transparent 35%),
            rgba(3, 3, 14, 0.82) !important;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          z-index: 10030 !important;
        }

        @media (max-width: 900px) {
          .scene-nav-mobile--tent-radio .scene-nav-mobile-inner {
            padding-top: 24px !important;
          }
        }

        .scene-nav-mobile--tent-radio .scene-nav-mobile-inner a {
          color: ${GREEN} !important;
        }

        .scene-nav-mobile--tent-radio .scene-nav-mobile-inner a.active {
          color: ${PINK} !important;
        }

        .scene-nav-mobile--tent-radio .scene-nav-mobile-inner a.disabled {
          color: ${GREEN} !important;
          opacity: 0.32;
        }
      `}</style>

      <style jsx>{`
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
          filter: saturate(0.9) brightness(0.5);
          opacity: 0.96;
        }

        .posterGrid {
          width: 100%;
          height: 100%;
          object-fit: cover;
          mix-blend-mode: screen;
          opacity: 0.78;
          filter:
            drop-shadow(0 0 14px rgba(72, 157, 154, 0.24))
            drop-shadow(0 0 22px rgba(106, 55, 150, 0.18));
          animation: gridPulse 7.5s ease-in-out infinite;
        }

        .posterGridTint {
          background:
            linear-gradient(
              115deg,
              rgba(72, 157, 154, 0.22) 0%,
              rgba(72, 157, 154, 0.1) 34%,
              rgba(106, 55, 150, 0.12) 58%,
              rgba(223, 121, 214, 0.18) 100%
            );
          mix-blend-mode: screen;
          opacity: 0.62;
          animation: gridTintPulse 8s ease-in-out infinite;
        }

        .posterGridGlow {
          background:
            radial-gradient(circle at 35% 45%, rgba(72, 157, 154, 0.18), transparent 34%),
            radial-gradient(circle at 66% 45%, rgba(223, 121, 214, 0.14), transparent 34%),
            radial-gradient(circle at 50% 52%, rgba(106, 55, 150, 0.2), transparent 44%);
          filter: blur(24px);
          mix-blend-mode: screen;
          opacity: 0.72;
          animation: gridGlowPulse 6.8s ease-in-out infinite;
        }

        .posterGridSweep {
          opacity: 0;
          background: linear-gradient(
            180deg,
            transparent 0%,
            transparent 31%,
            rgba(72, 157, 154, 0.07) 38%,
            rgba(223, 121, 214, 0.2) 47%,
            rgba(106, 55, 150, 0.28) 50%,
            rgba(72, 157, 154, 0.16) 57%,
            transparent 68%,
            transparent 100%
          );
          mix-blend-mode: screen;
          filter: blur(12px);
          transform: translateY(-130%);
          animation: gridSweepVertical 9s linear infinite;
        }

        .posterVignette {
          background:
            radial-gradient(circle at center, transparent 28%, rgba(4, 7, 7, 0.16) 58%, rgba(4, 7, 7, 0.84) 100%),
            linear-gradient(180deg, rgba(4, 7, 7, 0.08), rgba(4, 7, 7, 0.5));
        }

        .posterNoise {
          opacity: 0.1;
          background-image:
            radial-gradient(circle at 8% 16%, rgba(255, 255, 255, 0.8) 0 1px, transparent 1.4px),
            radial-gradient(circle at 76% 22%, rgba(255, 255, 255, 0.66) 0 1px, transparent 1.4px),
            radial-gradient(circle at 86% 72%, rgba(255, 255, 255, 0.5) 0 1px, transparent 1.4px),
            radial-gradient(circle at 28% 80%, rgba(255, 255, 255, 0.42) 0 1px, transparent 1.4px);
          background-size: 320px 320px, 380px 380px, 340px 340px, 400px 400px;
          mix-blend-mode: screen;
        }

        .posterFrame {
          --core-width: clamp(300px, 25vw, 390px);
          --core-height: calc(var(--core-width) * 1.25);
          --image-top: clamp(190px, 23vh, 220px);
          position: absolute;
          inset: 0;
          z-index: 6;
          pointer-events: none;
        }

        .radioHeader {
          position: absolute;
          left: 50%;
          top: 82px;
          z-index: 12;
          width: min(94vw, 1100px);
          transform: translateX(-50%);
          text-align: center;
          text-transform: uppercase;
        }

        .radioHeader__title {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin: 0 0 4px;
          color: ${PINK};
          font-family: 'Orbitron', 'IBM Plex Mono', monospace;
          font-size: clamp(3rem, 5vw, 5rem);
          font-weight: 900;
          letter-spacing: 0.08em;
          line-height: 0.92;
          white-space: nowrap;
          text-shadow:
            0 0 10px rgba(223, 121, 214, 0.5),
            0 0 24px rgba(223, 121, 214, 0.34),
            0 0 44px rgba(106, 55, 150, 0.52);
        }

        .radioHeader__tag {
          margin: 0;
          color: ${GREEN};
          font-size: clamp(0.9rem, 1.05vw, 1.1rem);
          font-weight: 900;
          letter-spacing: 0.28em;
          text-shadow:
            0 0 8px rgba(72, 157, 154, 0.7),
            0 0 20px rgba(72, 157, 154, 0.34);
        }

        .orbCluster {
          position: absolute;
          left: 50%;
          top: var(--image-top);
          width: calc(var(--core-width) + 76px);
          height: calc(var(--core-height) + 76px);
          z-index: 7;
          display: grid;
          place-items: center;
          pointer-events: none;
          transform: translateX(-50%);
        }

        .orbBloomBack {
          position: absolute;
          inset: 4%;
          border-radius: 36px;
          background:
            radial-gradient(circle at 50% 50%,
              rgba(223, 121, 214, 0.28) 0%,
              rgba(106, 55, 150, 0.34) 38%,
              rgba(72, 157, 154, 0.16) 58%,
              rgba(72, 157, 154, 0) 82%);
          filter: blur(38px);
          opacity: 0.64;
          animation: orbPulse 3s ease-in-out infinite;
        }

        .orbPhotoMask {
          position: absolute;
          left: 50%;
          top: 50%;
          width: var(--core-width);
          height: var(--core-height);
          transform: translate3d(-50%, -50%, 0);
          border-radius: 28px;
          overflow: hidden;
          isolation: isolate;
          contain: paint;
          background: rgba(8, 8, 18, 0.58);
          box-shadow:
            inset 0 0 34px rgba(106, 55, 150, 0.24),
            inset 0 0 80px rgba(72, 157, 154, 0.1),
            0 0 18px rgba(223, 121, 214, 0.18),
            0 0 42px rgba(106, 55, 150, 0.32);
          animation: orbCorePulse 3s ease-in-out infinite;
        }

        .orbPhotoLayer {
          position: absolute;
          inset: 0;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          filter: contrast(1.06) brightness(0.88) saturate(0.9);
          transform: translateZ(0);
          transition:
            filter 420ms ease,
            opacity 420ms ease,
            transform 420ms ease;
        }

        .orbPhotoLayer--current.is-glitching {
          animation: photoGlitchIn 360ms ease both;
        }

        .orbPhotoLayer--previous {
          animation: photoGlitchOut 360ms ease forwards;
        }

        .orbPhotoLayer.is-playing {
          filter: blur(7px) contrast(1.08) brightness(0.48) saturate(0.9);
          transform: scale(1.04);
          opacity: 0.66;
        }

        .orbWave {
          position: absolute;
          inset: 0;
          z-index: 16;
          display: grid;
          place-items: center;
          pointer-events: none;
          opacity: 0;
          animation: waveEnter 480ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        .orbWave::before {
          content: '';
          position: absolute;
          width: 70%;
          height: 34%;
          border-radius: 999px;
          background:
            radial-gradient(circle at center, rgba(223, 121, 214, 0.16), transparent 68%),
            linear-gradient(90deg, transparent, rgba(72, 157, 154, 0.12), transparent);
          filter: blur(16px);
        }

        .orbWave span {
          grid-area: 1 / 1;
          width: clamp(5px, 0.52vw, 9px);
          height: 26%;
          border-radius: 999px;
          background: ${PINK};
          box-shadow:
            0 0 12px rgba(223, 121, 214, 0.9),
            0 0 26px rgba(223, 121, 214, 0.55);
          transform-origin: center;
          animation: waveOrbit 1.16s ease-in-out infinite;
        }

        .orbWave span:nth-child(1) {
          transform: translateX(-84px) scaleY(0.4);
          animation-delay: 0ms;
        }

        .orbWave span:nth-child(2) {
          transform: translateX(-66px) scaleY(0.74);
          animation-delay: 70ms;
          background: ${GREEN};
        }

        .orbWave span:nth-child(3) {
          transform: translateX(-48px) scaleY(1.02);
          animation-delay: 140ms;
        }

        .orbWave span:nth-child(4) {
          transform: translateX(-30px) scaleY(0.7);
          animation-delay: 210ms;
          background: ${GREEN};
        }

        .orbWave span:nth-child(5) {
          transform: translateX(-12px) scaleY(1.24);
          animation-delay: 280ms;
        }

        .orbWave span:nth-child(6) {
          transform: translateX(6px) scaleY(0.68);
          animation-delay: 350ms;
          background: ${GREEN};
        }

        .orbWave span:nth-child(7) {
          transform: translateX(24px) scaleY(1.12);
          animation-delay: 420ms;
        }

        .orbWave span:nth-child(8) {
          transform: translateX(42px) scaleY(0.74);
          animation-delay: 490ms;
          background: ${GREEN};
        }

        .orbWave span:nth-child(9) {
          transform: translateX(60px) scaleY(1.36);
          animation-delay: 560ms;
        }

        .orbWave span:nth-child(10) {
          transform: translateX(78px) scaleY(0.86);
          animation-delay: 630ms;
          background: ${GREEN};
        }

        .orbWave span:nth-child(11) {
          transform: translateX(96px) scaleY(1.52);
          animation-delay: 700ms;
        }

        .orbInnerTint,
        .orbInnerGlow {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .orbInnerTint {
          background:
            radial-gradient(circle at 50% 50%, rgba(223, 121, 214, 0.03), rgba(106, 55, 150, 0.08) 62%, rgba(106, 55, 150, 0.16) 100%),
            linear-gradient(180deg, rgba(72, 157, 154, 0.06), transparent 18%, transparent 72%, rgba(0, 0, 0, 0.2) 100%);
          mix-blend-mode: screen;
        }

        .orbInnerGlow {
          border-radius: 28px;
          box-shadow:
            inset 0 0 34px rgba(223, 121, 214, 0.14),
            inset 0 0 92px rgba(106, 55, 150, 0.2);
        }

        .trackHero {
          position: absolute;
          left: 50%;
          top: calc(var(--image-top) + var(--core-height) + 30px);
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
          padding: 10px 32px 11px;
          border-radius: 999px;
          border: 1px solid rgba(72, 157, 154, 0.5);
          background:
            linear-gradient(90deg, rgba(106, 55, 150, 0.18), rgba(72, 157, 154, 0.12)),
            rgba(0, 0, 0, 0.68);
          color: ${PINK};
          font-family: 'Orbitron', 'IBM Plex Mono', monospace;
          font-size: clamp(1.45rem, 2.2vw, 2.25rem);
          font-weight: 900;
          letter-spacing: 0.06em;
          text-shadow:
            0 0 9px rgba(223, 121, 214, 0.72),
            0 0 24px rgba(223, 121, 214, 0.34);
          box-shadow:
            0 0 16px rgba(72, 157, 154, 0.12),
            inset 0 0 18px rgba(106, 55, 150, 0.1);
        }

        .trackHero__guest,
        .trackHero__genres {
          margin: 0;
          font-weight: 900;
          letter-spacing: 0.16em;
          line-height: 1.35;
        }

        .trackHero__guest {
          color: ${GREEN};
          font-size: clamp(0.82rem, 1vw, 1rem);
          text-shadow:
            0 0 8px rgba(72, 157, 154, 0.7),
            0 0 18px rgba(72, 157, 154, 0.3);
        }

        .trackHero__genres {
          margin-top: 6px;
          color: ${PINK};
          font-size: clamp(0.7rem, 0.86vw, 0.86rem);
          text-shadow:
            0 0 8px rgba(223, 121, 214, 0.58),
            0 0 18px rgba(223, 121, 214, 0.28);
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
          border: 1px solid rgba(72, 157, 154, 0.42);
          background:
            linear-gradient(90deg, rgba(106, 55, 150, 0.14), transparent 24%, transparent 76%, rgba(72, 157, 154, 0.12)),
            rgba(0, 0, 0, 0.84);
          backdrop-filter: blur(14px);
          box-shadow:
            0 0 22px rgba(72, 157, 154, 0.16),
            inset 0 0 24px rgba(106, 55, 150, 0.1);
        }

        .radioPlayer__bar {
          display: grid;
          grid-template-columns: 58px minmax(280px, 1fr) 58px;
          gap: 14px;
          align-items: center;
          color: ${PINK};
          font-size: 0.78rem;
          font-weight: 900;
          font-variant-numeric: tabular-nums;
          text-shadow: 0 0 8px rgba(223, 121, 214, 0.52);
        }

        .radioPlayer__bar input[type='range'] {
          appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 999px;
          background:
            linear-gradient(90deg, ${GREEN}, ${PINK}),
            rgba(72, 157, 154, 0.26);
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
          border: 1px solid rgba(72, 157, 154, 0.48);
          background: rgba(0, 0, 0, 0.58);
          color: ${PINK};
          text-transform: uppercase;
          font-size: 0.76rem;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-shadow: 0 0 10px rgba(223, 121, 214, 0.65);
          box-shadow: inset 0 0 14px rgba(106, 55, 150, 0.1);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
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
          border: 1px solid rgba(72, 157, 154, 0.32);
          background:
            linear-gradient(180deg, rgba(106, 55, 150, 0.16), rgba(0, 0, 0, 0.18)),
            rgba(0, 0, 0, 0.46);
          backdrop-filter: blur(12px);
          box-shadow:
            0 0 18px rgba(72, 157, 154, 0.12),
            inset 0 0 18px rgba(106, 55, 150, 0.08);
        }

        .trackIndex__label {
          margin: 0 0 12px;
          color: ${PINK};
          text-transform: uppercase;
          letter-spacing: 0.16em;
          font-size: 0.68rem;
          font-weight: 900;
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
          font-weight: 900;
          opacity: 0.82;
        }

        .trackIndex__item.is-active {
          border-color: rgba(223, 121, 214, 0.62);
          background: rgba(223, 121, 214, 0.12);
          color: ${PINK};
          box-shadow: 0 0 16px rgba(223, 121, 214, 0.18);
          opacity: 1;
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
          border: 1px solid rgba(223, 121, 214, 0.52);
          background: rgba(106, 55, 150, 0.16);
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
          z-index: 80;
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
          background: rgba(0, 0, 0, 0.56);
        }

        .archiveDrawer__panel {
          position: absolute;
          top: 78px;
          right: 18px;
          bottom: 18px;
          width: min(460px, calc(100vw - 36px));
          display: flex;
          flex-direction: column;
          padding: 20px;
          border-radius: 30px;
          border: 1px solid rgba(72, 157, 154, 0.42);
          background:
            linear-gradient(180deg, rgba(106, 55, 150, 0.16), transparent 34%),
            rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(18px);
          box-shadow:
            0 0 32px rgba(223, 121, 214, 0.18),
            inset 0 0 24px rgba(106, 55, 150, 0.12);
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
        }

        .archiveDrawer__close {
          width: 44px;
          height: 44px;
          padding: 0;
          border-radius: 999px;
          border: 1px solid rgba(72, 157, 154, 0.42);
          color: ${GREEN};
          text-transform: uppercase;
          letter-spacing: 0;
          font-size: 1.35rem;
          font-weight: 900;
          display: inline-flex;
          align-items: center;
          justify-content: center;
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
          width: 28px;
          height: 28px;
          transform: translateY(-50%);
          border-radius: 999px;
          border: 1px solid rgba(72, 157, 154, 0.42);
          color: ${GREEN};
          font-size: 1rem;
          font-weight: 900;
          line-height: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .archiveDrawer__search::placeholder {
          color: rgba(223, 121, 214, 0.54);
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
          color: rgba(223, 121, 214, 0.78);
          text-align: left;
        }

        .archiveDrawer__item.is-active {
          border-color: rgba(223, 121, 214, 0.58);
          background: rgba(106, 55, 150, 0.18);
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

        @keyframes gridPulse {
          0%,
          100% {
            opacity: 0.68;
            filter:
              drop-shadow(0 0 11px rgba(72, 157, 154, 0.18))
              drop-shadow(0 0 18px rgba(106, 55, 150, 0.12));
            transform: scale(1);
          }

          50% {
            opacity: 0.9;
            filter:
              drop-shadow(0 0 20px rgba(72, 157, 154, 0.34))
              drop-shadow(0 0 30px rgba(223, 121, 214, 0.22));
            transform: scale(1.008);
          }
        }

        @keyframes gridTintPulse {
          0%,
          100% {
            opacity: 0.5;
          }

          50% {
            opacity: 0.74;
          }
        }

        @keyframes gridGlowPulse {
          0%,
          100% {
            opacity: 0.46;
            transform: scale(0.99);
          }

          50% {
            opacity: 0.82;
            transform: scale(1.04);
          }
        }

        @keyframes gridSweepVertical {
          0%,
          58% {
            opacity: 0;
            transform: translateY(-130%);
          }

          64% {
            opacity: 0.18;
          }

          76% {
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
            transform: scale(1.02);
            opacity: 0.46;
            filter: blur(32px) brightness(0.95);
          }

          50% {
            transform: scale(1.14);
            opacity: 0.82;
            filter: blur(44px) brightness(1.08);
          }
        }

        @keyframes orbCorePulse {
          0%,
          100% {
            box-shadow:
              inset 0 0 34px rgba(106, 55, 150, 0.2),
              inset 0 0 78px rgba(72, 157, 154, 0.08),
              0 0 16px rgba(223, 121, 214, 0.16),
              0 0 38px rgba(106, 55, 150, 0.28);
          }

          50% {
            box-shadow:
              inset 0 0 44px rgba(223, 121, 214, 0.16),
              inset 0 0 100px rgba(106, 55, 150, 0.22),
              0 0 24px rgba(223, 121, 214, 0.25),
              0 0 54px rgba(106, 55, 150, 0.38);
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

        @keyframes waveEnter {
          0% {
            opacity: 0;
            transform: scale(0.88);
            filter: blur(10px);
          }

          100% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
          }
        }

        @keyframes waveOrbit {
          0%,
          100% {
            height: 16%;
            opacity: 0.5;
          }

          40% {
            height: 44%;
            opacity: 1;
          }

          70% {
            height: 24%;
            opacity: 0.74;
          }
        }

        @keyframes playerDotPulse {
          0%,
          100% {
            box-shadow:
              0 0 0 0 rgba(223, 121, 214, 0.32),
              0 0 16px rgba(223, 121, 214, 0.8);
          }

          50% {
            box-shadow:
              0 0 0 10px rgba(223, 121, 214, 0),
              0 0 28px rgba(223, 121, 214, 1);
          }
        }

        @media (max-width: 1180px) {
          .posterFrame {
            --core-width: clamp(290px, 26vw, 370px);
          }

          .trackIndex {
            right: 16px;
            width: 190px;
          }

          .radioHeader__title {
            font-size: clamp(2.75rem, 4.8vw, 4.4rem);
          }
        }

        @media (max-width: 980px) {
          .posterFrame {
            --core-width: clamp(250px, 32vw, 330px);
            --image-top: 195px;
          }

          .radioHeader {
            top: 84px;
          }

          .radioHeader__title {
            font-size: clamp(2.2rem, 6.8vw, 3.7rem);
            white-space: normal;
            max-width: 92vw;
          }

          .radioHeader__tag {
            display: block;
            font-size: clamp(0.72rem, 2vw, 0.95rem);
            letter-spacing: 0.18em;
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
          .posterFrame {
            --core-width: min(50vw, 210px);
            --core-height: calc(var(--core-width) * 1.25);
            --image-top: 270px;
          }

          .radioHeader {
            top: 144px;
          }

          .radioHeader__title {
            font-size: clamp(1.75rem, 8.1vw, 2.45rem);
            line-height: 0.9;
            margin-bottom: 6px;
            white-space: nowrap;
          }

          .radioHeader__tag {
            display: block;
            font-size: clamp(0.66rem, 2.35vw, 0.8rem);
            line-height: 1.25;
            letter-spacing: 0.1em;
            max-width: 92vw;
          }

          .orbCluster {
            width: calc(var(--core-width) + 58px);
            height: calc(var(--core-height) + 58px);
          }

          .orbPhotoMask,
          .orbInnerGlow {
            border-radius: 22px;
          }

          .trackHero {
            top: calc(var(--image-top) + var(--core-height) + 24px);
          }

          .trackHero__label {
            font-size: clamp(1.02rem, 5.2vw, 1.32rem);
            padding: 8px 22px 9px;
            margin-bottom: 9px;
          }

          .trackHero__guest {
            font-size: clamp(0.78rem, 3.15vw, 0.92rem);
            letter-spacing: 0.14em;
          }

          .trackHero__genres {
            margin-top: 7px;
            font-size: clamp(0.62rem, 2.55vw, 0.74rem);
            letter-spacing: 0.08em;
          }

          .trackIndex {
            display: none;
          }

          .radioPlayer {
            bottom: 12px;
            gap: 10px;
            padding: 16px 18px 16px;
            border-radius: 28px;
          }

          .radioPlayer__bar {
            grid-template-columns: 48px 1fr 58px;
            gap: 10px;
            font-size: 1rem;
          }

          .radioPlayer__bar input[type='range'] {
            height: 7px;
          }

          .radioPlayer__bar input[type='range']::-webkit-slider-thumb {
            width: 28px;
            height: 28px;
          }

          .radioPlayer__controls {
            gap: 16px;
          }

          .radioPlayer__controls button:not(.radioPlayer__transmit) {
            width: 56px;
            height: 56px;
          }

          .radioPlayer__transmit {
            min-width: 210px;
            height: 56px;
            padding: 0 20px;
            font-size: 0.86rem;
          }

          .radioPlayer__archive {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 56px;
            margin-top: 4px;
            border-radius: 999px;
            border: 1px solid rgba(72, 157, 154, 0.46);
            background: rgba(106, 55, 150, 0.24);
            color: ${PINK};
            text-transform: uppercase;
            letter-spacing: 0.12em;
            font-size: 0.86rem;
            font-weight: 900;
            text-shadow: 0 0 10px rgba(223, 121, 214, 0.56);
          }

          .archiveDrawer__panel {
            top: auto;
            left: 10px;
            right: 10px;
            bottom: 10px;
            width: auto;
            max-height: 72vh;
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
        }

        @media (max-width: 430px) {
          .posterFrame {
            --core-width: min(54vw, 220px);
            --image-top: 260px;
          }

          .radioHeader {
            top: 142px;
          }

          .radioHeader__title {
            font-size: clamp(1.8rem, 8.2vw, 2.12rem);
          }

          .radioHeader__tag {
            font-size: clamp(0.6rem, 2.2vw, 0.72rem);
          }

          .trackHero {
            top: calc(var(--image-top) + var(--core-height) + 22px);
          }

          .trackHero__label {
            font-size: 1.08rem;
          }

          .trackHero__guest {
            font-size: 0.78rem;
          }

          .trackHero__genres {
            font-size: 0.62rem;
          }

          .radioPlayer {
            padding: 15px 16px 15px;
            gap: 9px;
          }

          .radioPlayer__controls {
            gap: 12px;
          }

          .radioPlayer__controls button:not(.radioPlayer__transmit) {
            width: 52px;
            height: 52px;
          }

          .radioPlayer__transmit {
            min-width: 186px;
            height: 52px;
            font-size: 0.78rem;
          }

          .radioPlayer__archive {
            height: 52px;
            margin-top: 2px;
          }
        }

        @media (max-height: 720px) and (max-width: 760px) {
          .posterFrame {
            --core-width: min(48vw, 195px);
            --image-top: 245px;
          }

          .radioHeader {
            top: 138px;
          }

          .trackHero {
            top: calc(var(--image-top) + var(--core-height) + 20px);
          }

          .radioPlayer {
            padding: 14px 16px;
            gap: 8px;
          }

          .radioPlayer__archive {
            margin-top: 0;
          }
        }
      `}</style>
    </>
  );
}

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
        <div className="posterStage">
          <div className="posterSky" style={{ backgroundImage: `url(${STAR_BG})` }} />
          <img src={GRID_BG} alt="" aria-hidden="true" className="posterGrid" />

          <div className="posterGridTint" aria-hidden="true" />
          <div className="posterGridGlow" aria-hidden="true" />
          <div className="posterGridSweep" aria-hidden="true" />
          <div className="posterVignette" aria-hidden="true" />
          <div className="posterNoise" aria-hidden="true" />

          <section className="posterFrame" aria-live="polite">
            <header className="radioHeader">
              <h1 className="radioHeader__title">The Tent Radio</h1>
              <p className="radioHeader__tag">
                Transmissions from the end of the universe
              </p>
            </header>

            <div className="orbCluster">
              <div className="orbBloomBack" aria-hidden="true" />
              <div className="orbBloomInner" aria-hidden="true" />

              <div className="orbPhotoMask">
                {previousIndex !== null && !isPlaying && (
                  <img
                    aria-hidden="true"
                    src={TRACKS[previousIndex].cover}
                    alt=""
                    className="orbPhotoImage orbPhotoImage--previous"
                    style={{
                      objectPosition:
                        TRACKS[previousIndex].objectPosition || '50% 50%',
                    }}
                  />
                )}

                <img
                  key={currentTrack.id}
                  src={currentTrack.cover}
                  alt={currentTrack.title}
                  className={`orbPhotoImage orbPhotoImage--current ${
                    previousIndex !== null ? 'is-glitching' : ''
                  } ${isPlaying ? 'is-playing' : ''}`}
                  style={{
                    objectPosition: currentTrack.objectPosition || '50% 50%',
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

                <div className="orbInnerTint" aria-hidden="true" />
                <div className="orbInnerGlow" aria-hidden="true" />
                <div className="orbScan" aria-hidden="true" />
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
                  <span className="trackIndex__title">{track.episodeLabel}</span>
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

            <aside className="archiveDrawer__panel" aria-label="Transmission archive">
              <div className="archiveDrawer__header">
                <div>
                  <p className="archiveDrawer__eyebrow">Transmission Archive</p>
                  <h2>All Episodes</h2>
                </div>

                <button
                  type="button"
                  className="archiveDrawer__close"
                  onClick={() => {
                    setIsArchiveOpen(false);
                    setArchiveQuery('');
                  }}
                  aria-label="Close archive"
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
                  const index = TRACKS.findIndex((item) => item.id === track.id);

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

        <SceneNav theme="tent-radio" />
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
          box-shadow: 0 0 10px rgba(223, 121, 214, 0.72);
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
          z-index: 10060 !important;
        }

        .scene-nav-mobile {
          z-index: 10030 !important;
        }

        .scene-nav--tent-radio {
          background:
            linear-gradient(
              90deg,
              rgba(72, 157, 154, 0.1),
              rgba(106, 55, 150, 0.18),
              rgba(223, 121, 214, 0.08)
            ),
            rgba(3, 3, 10, 0.72) !important;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(223, 121, 214, 0.12);
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
            0 0 10px rgba(223, 121, 214, 0.72),
            0 0 24px rgba(223, 121, 214, 0.28);
        }

        .scene-nav--tent-radio a.disabled,
        .scene-nav-mobile--tent-radio a.disabled {
          color: ${GREEN} !important;
          opacity: 0.38;
        }

        .scene-nav--tent-radio .scene-nav-burger span {
          background: ${GREEN} !important;
          box-shadow: 0 0 12px rgba(72, 157, 154, 0.54);
        }

        .scene-nav--tent-radio .scene-nav-logo img {
          filter: brightness(0) saturate(100%) invert(61%) sepia(16%)
            saturate(989%) hue-rotate(128deg) brightness(91%) contrast(88%);
        }

        .scene-nav-mobile.scene-nav--tent-radio,
        .scene-nav-mobile--tent-radio {
          background:
            radial-gradient(circle at 50% 16%, rgba(106, 55, 150, 0.36), transparent 34%),
            linear-gradient(180deg, rgba(7, 6, 18, 0.82), rgba(4, 5, 12, 0.94)) !important;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          z-index: 10030 !important;
        }

        @media (max-width: 900px) {
          .scene-nav--tent-radio {
            background:
              linear-gradient(
                90deg,
                rgba(72, 157, 154, 0.08),
                rgba(106, 55, 150, 0.16),
                rgba(223, 121, 214, 0.08)
              ),
              rgba(3, 3, 10, 0.68) !important;
          }

          .scene-nav-mobile--tent-radio .scene-nav-mobile-inner {
            padding-top: 24px !important;
          }

          .scene-nav-mobile--tent-radio a {
            color: ${GREEN} !important;
          }

          .scene-nav-mobile--tent-radio a.active {
            color: ${PINK} !important;
          }

          .scene-nav-mobile--tent-radio a.disabled {
            color: ${GREEN} !important;
            opacity: 0.34;
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
          filter: saturate(0.9) brightness(0.48);
          opacity: 0.95;
        }

        .posterGrid {
          width: 100%;
          height: 100%;
          object-fit: cover;
          mix-blend-mode: screen;
          opacity: 0.78;
          filter:
            drop-shadow(0 0 14px rgba(72, 157, 154, 0.3))
            drop-shadow(0 0 22px rgba(223, 121, 214, 0.12));
          animation: gridPulse 8s ease-in-out infinite;
        }

        .posterGridTint {
          background:
            radial-gradient(circle at 34% 44%, rgba(106, 55, 150, 0.36), transparent 36%),
            radial-gradient(circle at 72% 56%, rgba(72, 157, 154, 0.2), transparent 36%),
            linear-gradient(
              115deg,
              rgba(72, 157, 154, 0.12) 0%,
              rgba(106, 55, 150, 0.18) 45%,
              rgba(223, 121, 214, 0.1) 100%
            );
          mix-blend-mode: screen;
        }

        .posterGridGlow {
          background:
            radial-gradient(circle at 50% 52%, rgba(223, 121, 214, 0.12), transparent 28%),
            radial-gradient(circle at 50% 48%, rgba(72, 157, 154, 0.09), transparent 42%);
          filter: blur(26px);
          opacity: 0.8;
          animation: backgroundGlowPulse 5s ease-in-out infinite;
        }

        .posterGridSweep {
          opacity: 0;
          background: linear-gradient(
            180deg,
            transparent 0%,
            transparent 32%,
            rgba(223, 121, 214, 0.05) 39%,
            rgba(223, 121, 214, 0.22) 46%,
            rgba(72, 157, 154, 0.24) 50%,
            rgba(223, 121, 214, 0.18) 55%,
            rgba(72, 157, 154, 0.05) 62%,
            transparent 70%,
            transparent 100%
          );
          mix-blend-mode: screen;
          filter: blur(12px);
          transform: translateY(-130%);
          animation: gridSweepVertical 8.5s linear infinite;
        }

        .posterVignette {
          background:
            radial-gradient(circle at center, transparent 24%, rgba(4, 7, 7, 0.2) 56%, rgba(4, 7, 7, 0.86) 100%),
            linear-gradient(180deg, rgba(4, 7, 7, 0.04), rgba(4, 7, 7, 0.42));
        }

        .posterNoise {
          opacity: 0.09;
          background-image:
            radial-gradient(circle at 8% 16%, rgba(255, 255, 255, 0.8) 0 1px, transparent 1.4px),
            radial-gradient(circle at 76% 22%, rgba(255, 255, 255, 0.66) 0 1px, transparent 1.4px),
            radial-gradient(circle at 86% 72%, rgba(255, 255, 255, 0.5) 0 1px, transparent 1.4px),
            radial-gradient(circle at 28% 80%, rgba(255, 255, 255, 0.42) 0 1px, transparent 1.4px);
          background-size: 320px 320px, 380px 380px, 340px 340px, 400px 400px;
          mix-blend-mode: screen;
        }

        .posterFrame {
          --core-width: min(31vw, 470px);
          --core-height: calc(var(--core-width) * 1.25);
          --image-radius: clamp(30px, 3vw, 54px);

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
          top: clamp(72px, 8.4vh, 104px);
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
          margin: 0 0 5px;
          padding: 0 18px;
          color: ${PINK};
          font-family: 'Orbitron', 'IBM Plex Mono', monospace;
          font-size: clamp(2.05rem, 4.2vw, 4.05rem);
          font-weight: 900;
          letter-spacing: 0.08em;
          line-height: 0.92;
          text-shadow:
            0 0 10px rgba(223, 121, 214, 0.68),
            0 0 24px rgba(223, 121, 214, 0.32),
            0 0 44px rgba(106, 55, 150, 0.42);
          white-space: nowrap;
        }

        .radioHeader__tag {
          margin: 0;
          color: ${GREEN};
          font-size: clamp(0.72rem, 0.82vw, 0.92rem);
          font-weight: 900;
          letter-spacing: 0.26em;
          text-shadow:
            0 0 8px rgba(72, 157, 154, 0.58),
            0 0 22px rgba(72, 157, 154, 0.28);
        }

        .orbCluster {
          position: relative;
          width: calc(var(--core-width) + clamp(120px, 9vw, 170px));
          height: calc(var(--core-height) + clamp(120px, 9vw, 170px));
          z-index: 7;
          display: grid;
          place-items: center;
          pointer-events: none;
          transform: translateY(18px);
        }

        .orbBloomBack {
          position: absolute;
          inset: 5%;
          border-radius: var(--image-radius);
          background:
            radial-gradient(
              ellipse at center,
              rgba(223, 121, 214, 0.22) 0%,
              rgba(106, 55, 150, 0.34) 34%,
              rgba(72, 157, 154, 0.12) 56%,
              rgba(72, 157, 154, 0) 82%
            );
          filter: blur(48px);
          transform: scale(1.02);
          opacity: 0.7;
          animation: orbPulse 3s ease-in-out infinite;
        }

        .orbBloomInner {
          position: absolute;
          left: 50%;
          top: 50%;
          width: var(--core-width);
          height: var(--core-height);
          transform: translate(-50%, -50%);
          border-radius: var(--image-radius);
          background:
            radial-gradient(circle at 50% 48%, rgba(223, 121, 214, 0.16), transparent 58%),
            linear-gradient(180deg, rgba(106, 55, 150, 0.18), rgba(72, 157, 154, 0.08));
          filter: blur(18px);
          opacity: 0.58;
          animation: orbInnerPulse 2.8s ease-in-out infinite;
        }

        .orbPhotoMask {
          position: absolute;
          left: 50%;
          top: 50%;
          width: var(--core-width);
          height: var(--core-height);
          transform: translate3d(-50%, -50%, 0);
          border-radius: var(--image-radius);
          overflow: hidden;
          isolation: isolate;
          contain: paint;
          background: rgba(8, 7, 18, 0.88);
          box-shadow:
            0 0 26px rgba(223, 121, 214, 0.28),
            0 0 70px rgba(106, 55, 150, 0.28),
            inset 0 0 34px rgba(223, 121, 214, 0.12);
          animation: orbCorePulse 2.8s ease-in-out infinite;
        }

        .orbPhotoMask::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 12;
          pointer-events: none;
          border-radius: inherit;
          box-shadow:
            inset 0 0 0 1px rgba(223, 121, 214, 0.22),
            inset 0 0 28px rgba(72, 157, 154, 0.08);
        }

        .orbPhotoImage {
          position: absolute;
          inset: 0;
          z-index: 1;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          border-radius: inherit;
          background: rgba(8, 7, 18, 0.88);
          filter: contrast(1.04) brightness(0.9) saturate(0.94);
          transition:
            filter 420ms ease,
            opacity 420ms ease,
            transform 420ms ease;
        }

        .orbPhotoImage--current.is-glitching {
          animation: photoGlitchIn 360ms ease both;
        }

        .orbPhotoImage--previous {
          animation: photoGlitchOut 360ms ease forwards;
        }

        .orbPhotoImage.is-playing {
          filter: blur(8px) brightness(0.48) saturate(0.95);
          transform: scale(1.05);
        }

        .orbWave {
          position: absolute;
          inset: 0;
          z-index: 8;
          display: grid;
          place-items: center;
          border-radius: inherit;
          overflow: hidden;
          background:
            radial-gradient(circle at 50% 50%, rgba(223, 121, 214, 0.14), transparent 36%),
            radial-gradient(circle at 50% 50%, rgba(72, 157, 154, 0.12), transparent 60%),
            rgba(6, 6, 16, 0.42);
          animation: waveEnter 420ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }

        .orbWave::before,
        .orbWave::after {
          content: '';
          position: absolute;
          inset: 18%;
          border-radius: 999px;
          border: 1px solid rgba(223, 121, 214, 0.3);
          animation: waveRing 1.8s ease-out infinite;
        }

        .orbWave::after {
          inset: 26%;
          border-color: rgba(72, 157, 154, 0.28);
          animation-delay: 0.45s;
        }

        .orbWave span {
          grid-area: 1 / 1;
          width: clamp(7px, 0.65vw, 12px);
          height: 28%;
          border-radius: 999px;
          background: linear-gradient(180deg, ${PINK}, ${GREEN});
          box-shadow:
            0 0 12px rgba(223, 121, 214, 0.92),
            0 0 26px rgba(72, 157, 154, 0.62);
          transform-origin: center;
          animation: waveDance 920ms ease-in-out infinite;
        }

        .orbWave span:nth-child(1) { transform: translateX(-92px); animation-delay: 0ms; }
        .orbWave span:nth-child(2) { transform: translateX(-74px); animation-delay: 70ms; }
        .orbWave span:nth-child(3) { transform: translateX(-56px); animation-delay: 140ms; }
        .orbWave span:nth-child(4) { transform: translateX(-38px); animation-delay: 210ms; }
        .orbWave span:nth-child(5) { transform: translateX(-20px); animation-delay: 280ms; }
        .orbWave span:nth-child(6) { transform: translateX(0); animation-delay: 350ms; }
        .orbWave span:nth-child(7) { transform: translateX(20px); animation-delay: 280ms; }
        .orbWave span:nth-child(8) { transform: translateX(38px); animation-delay: 210ms; }
        .orbWave span:nth-child(9) { transform: translateX(56px); animation-delay: 140ms; }
        .orbWave span:nth-child(10) { transform: translateX(74px); animation-delay: 70ms; }
        .orbWave span:nth-child(11) { transform: translateX(92px); animation-delay: 0ms; }

        .orbInnerTint,
        .orbInnerGlow,
        .orbScan {
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: inherit;
        }

        .orbInnerTint {
          z-index: 10;
          background:
            radial-gradient(circle at 50% 50%, rgba(223, 121, 214, 0.02), rgba(106, 55, 150, 0.08) 58%, rgba(72, 157, 154, 0.08) 100%),
            linear-gradient(180deg, rgba(223, 121, 214, 0.06), transparent 18%, transparent 72%, rgba(72, 157, 154, 0.08));
          mix-blend-mode: screen;
        }

        .orbInnerGlow {
          z-index: 11;
          box-shadow:
            inset 0 0 34px rgba(223, 121, 214, 0.16),
            inset 0 0 88px rgba(106, 55, 150, 0.14),
            inset 0 0 140px rgba(72, 157, 154, 0.07);
        }

        .orbScan {
          z-index: 13;
          opacity: 0.18;
          background: repeating-linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.05) 0px,
            rgba(255, 255, 255, 0.05) 1px,
            transparent 1px,
            transparent 4px
          );
          mix-blend-mode: screen;
        }

        .trackHero {
          position: absolute;
          left: 50%;
          top: calc(50% + (var(--core-height) / 2) + 34px);
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
          padding: 11px 30px 12px;
          border-radius: 999px;
          border: 1px solid rgba(72, 157, 154, 0.48);
          background:
            linear-gradient(90deg, rgba(106, 55, 150, 0.28), rgba(72, 157, 154, 0.13)),
            rgba(0, 0, 0, 0.76);
          color: ${PINK};
          font-family: 'Orbitron', 'IBM Plex Mono', monospace;
          font-size: clamp(1.28rem, 2vw, 2rem);
          font-weight: 900;
          letter-spacing: 0.08em;
          text-shadow:
            0 0 8px rgba(223, 121, 214, 0.82),
            0 0 26px rgba(223, 121, 214, 0.34);
          box-shadow:
            0 0 16px rgba(72, 157, 154, 0.16),
            inset 0 0 18px rgba(223, 121, 214, 0.08);
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
          font-size: clamp(0.78rem, 0.9vw, 0.95rem);
          text-shadow:
            0 0 8px rgba(72, 157, 154, 0.56),
            0 0 18px rgba(72, 157, 154, 0.24);
        }

        .trackHero__genres {
          margin-top: 7px;
          color: ${PINK};
          font-size: clamp(0.66rem, 0.72vw, 0.8rem);
          opacity: 0.95;
          text-shadow:
            0 0 8px rgba(223, 121, 214, 0.52),
            0 0 16px rgba(223, 121, 214, 0.22);
        }

        .radioPlayer {
          position: fixed;
          left: 50%;
          bottom: 20px;
          z-index: 30;
          width: min(1080px, calc(100vw - 32px));
          transform: translateX(-50%);
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 22px;
          align-items: center;
          padding: 15px 18px;
          border-radius: 999px;
          border: 1px solid rgba(72, 157, 154, 0.36);
          background:
            linear-gradient(90deg, rgba(106, 55, 150, 0.18), transparent 30%, transparent 70%, rgba(72, 157, 154, 0.14)),
            rgba(4, 5, 12, 0.86);
          backdrop-filter: blur(14px);
          box-shadow:
            0 0 24px rgba(223, 121, 214, 0.14),
            inset 0 0 24px rgba(72, 157, 154, 0.08);
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
            linear-gradient(90deg, ${GREEN}, rgba(223, 121, 214, 0.92)),
            rgba(72, 157, 154, 0.22);
          outline: none;
        }

        .radioPlayer__bar input[type='range']::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: ${PINK};
          box-shadow:
            0 0 12px rgba(223, 121, 214, 0.9),
            0 0 24px rgba(223, 121, 214, 0.48);
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
          border: 1px solid rgba(72, 157, 154, 0.4);
          background: rgba(0, 0, 0, 0.48);
          color: ${PINK};
          text-transform: uppercase;
          font-size: 0.76rem;
          font-weight: 900;
          letter-spacing: 0.1em;
          text-shadow: 0 0 10px rgba(223, 121, 214, 0.62);
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
          width: 220px;
          transform: translateY(-50%);
          padding: 16px;
          border-radius: 26px;
          border: 1px solid rgba(72, 157, 154, 0.3);
          background:
            linear-gradient(180deg, rgba(106, 55, 150, 0.14), transparent 45%),
            rgba(3, 3, 10, 0.62);
          backdrop-filter: blur(12px);
          box-shadow:
            0 0 18px rgba(223, 121, 214, 0.12),
            inset 0 0 18px rgba(72, 157, 154, 0.05);
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
          background: rgba(0, 0, 0, 0.24);
          color: ${GREEN};
          text-align: left;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-size: 0.68rem;
          font-weight: 900;
        }

        .trackIndex__item.is-active {
          border-color: rgba(223, 121, 214, 0.62);
          background: rgba(223, 121, 214, 0.12);
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

        .trackIndex__archive {
          width: 100%;
          margin-top: 12px;
          padding: 10px 12px;
          border-radius: 999px;
          border: 1px solid rgba(223, 121, 214, 0.44);
          background: rgba(106, 55, 150, 0.18);
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
          top: 78px;
          right: 18px;
          bottom: 18px;
          width: min(460px, calc(100vw - 36px));
          display: flex;
          flex-direction: column;
          padding: 20px;
          border-radius: 30px;
          border: 1px solid rgba(72, 157, 154, 0.36);
          background:
            linear-gradient(180deg, rgba(106, 55, 150, 0.18), transparent 34%),
            rgba(5, 4, 14, 0.9);
          backdrop-filter: blur(18px);
          box-shadow:
            0 0 32px rgba(223, 121, 214, 0.18),
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
        }

        .archiveDrawer__close {
          width: 34px;
          height: 34px;
          display: inline-grid;
          place-items: center;
          border-radius: 999px;
          border: 1px solid rgba(72, 157, 154, 0.44);
          color: ${GREEN};
          font-size: 1.4rem;
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
          border: 1px solid rgba(72, 157, 154, 0.34);
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
          width: 30px;
          height: 30px;
          display: grid;
          place-items: center;
          transform: translateY(-50%);
          border-radius: 999px;
          border: 1px solid rgba(72, 157, 154, 0.42);
          color: ${GREEN};
          font-size: 1.2rem;
          font-weight: 900;
          line-height: 1;
        }

        .archiveDrawer__search::placeholder {
          color: rgba(223, 121, 214, 0.48);
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
          background: rgba(223, 121, 214, 0.12);
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

        @keyframes waveDance {
          0%,
          100% {
            height: 16%;
            opacity: 0.55;
          }
          35% {
            height: 42%;
            opacity: 1;
          }
          65% {
            height: 24%;
            opacity: 0.78;
          }
        }

        @keyframes waveRing {
          0% {
            transform: scale(0.64);
            opacity: 0.65;
          }
          100% {
            transform: scale(1.35);
            opacity: 0;
          }
        }

        @keyframes waveEnter {
          from {
            opacity: 0;
            transform: scale(1.08);
            filter: blur(8px);
          }
          to {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
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

        @keyframes gridPulse {
          0%,
          100% {
            opacity: 0.7;
          }
          50% {
            opacity: 0.86;
          }
        }

        @keyframes backgroundGlowPulse {
          0%,
          100% {
            opacity: 0.58;
          }
          50% {
            opacity: 0.92;
          }
        }

        @keyframes gridSweepVertical {
          0%,
          58% {
            opacity: 0;
            transform: translateY(-130%);
          }
          62% {
            opacity: 0.2;
          }
          74% {
            opacity: 0.56;
            transform: translateY(16%);
          }
          84% {
            opacity: 0.18;
            transform: translateY(112%);
          }
          100% {
            opacity: 0;
            transform: translateY(112%);
          }
        }

        @keyframes orbPulse {
          0%,
          100% {
            transform: scale(1.01);
            opacity: 0.55;
            filter: blur(42px) brightness(0.96);
          }
          50% {
            transform: scale(1.08);
            opacity: 0.82;
            filter: blur(54px) brightness(1.08);
          }
        }

        @keyframes orbInnerPulse {
          0%,
          100% {
            opacity: 0.42;
          }
          50% {
            opacity: 0.72;
          }
        }

        @keyframes orbCorePulse {
          0%,
          100% {
            box-shadow:
              0 0 24px rgba(223, 121, 214, 0.24),
              0 0 62px rgba(106, 55, 150, 0.22),
              inset 0 0 30px rgba(223, 121, 214, 0.1);
          }
          50% {
            box-shadow:
              0 0 34px rgba(223, 121, 214, 0.36),
              0 0 82px rgba(106, 55, 150, 0.3),
              inset 0 0 44px rgba(223, 121, 214, 0.16);
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
            --core-width: min(36vw, 430px);
          }

          .trackIndex {
            right: 16px;
            width: 198px;
          }

          .radioHeader__title {
            font-size: clamp(1.9rem, 4vw, 3.5rem);
          }
        }

        @media (max-width: 980px) {
          .posterFrame {
            --core-width: min(44vw, 390px);
          }

          .radioHeader {
            top: 72px;
          }

          .radioHeader__title {
            font-size: clamp(1.7rem, 6vw, 3rem);
            white-space: nowrap;
            max-width: 92vw;
          }

          .radioHeader__tag {
            display: block;
            font-size: clamp(0.58rem, 1.7vw, 0.78rem);
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
            bottom: 154px;
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
            --core-width: min(56vw, 285px);
            --image-radius: clamp(24px, 6vw, 38px);
          }

          .radioHeader {
            top: 112px;
          }

          .radioHeader__title {
            font-size: clamp(1.42rem, 7.2vw, 2.08rem);
            line-height: 0.95;
            margin-bottom: 3px;
            letter-spacing: 0.055em;
          }

          .radioHeader__tag {
            font-size: 0.5rem;
            line-height: 1.2;
            letter-spacing: 0.1em;
          }

          .orbCluster {
            transform: translateY(12px);
          }

          .trackHero {
            top: calc(50% + (var(--core-height) / 2) + 28px);
          }

          .trackHero__label {
            font-size: 1rem;
            padding: 9px 18px 10px;
            margin-bottom: 7px;
            letter-spacing: 0.06em;
          }

          .trackHero__guest {
            font-size: 0.68rem;
            letter-spacing: 0.14em;
          }

          .trackHero__genres {
            font-size: 0.54rem;
            letter-spacing: 0.08em;
            margin-top: 6px;
          }

          .trackIndex {
            display: none;
          }

          .radioPlayer {
            bottom: 12px;
            width: calc(100vw - 28px);
            gap: 12px;
            padding: 18px;
            border-radius: 24px;
          }

          .radioPlayer__bar {
            grid-template-columns: 44px 1fr 50px;
            gap: 10px;
            font-size: 0.82rem;
          }

          .radioPlayer__controls {
            gap: 10px;
          }

          .radioPlayer__controls button:not(.radioPlayer__transmit) {
            width: 42px;
            height: 42px;
          }

          .radioPlayer__transmit {
            min-width: 178px;
            height: 42px;
            font-size: 0.66rem;
            padding: 0 14px;
          }

          .radioPlayer__archive {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 44px;
            border-radius: 999px;
            border: 1px solid rgba(72, 157, 154, 0.4);
            background: rgba(106, 55, 150, 0.18);
            color: ${PINK};
            text-transform: uppercase;
            letter-spacing: 0.12em;
            font-size: 0.7rem;
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
            --core-width: min(54vw, 238px);
          }

          .radioHeader {
            top: 116px;
          }

          .radioHeader__title {
            font-size: clamp(1.35rem, 7.1vw, 1.86rem);
          }

          .radioHeader__tag {
            font-size: 0.46rem;
          }

          .orbCluster {
            transform: translateY(10px);
          }

          .trackHero {
            top: calc(50% + (var(--core-height) / 2) + 24px);
          }

          .trackHero__label {
            font-size: 0.92rem;
            padding: 8px 16px 9px;
          }

          .trackHero__guest {
            font-size: 0.64rem;
          }

          .trackHero__genres {
            font-size: 0.49rem;
          }

          .radioPlayer {
            padding: 18px;
            gap: 12px;
          }

          .radioPlayer__bar {
            grid-template-columns: 42px 1fr 48px;
            font-size: 0.78rem;
          }

          .radioPlayer__controls button:not(.radioPlayer__transmit) {
            width: 40px;
            height: 40px;
          }

          .radioPlayer__transmit {
            min-width: 158px;
            height: 40px;
          }

          .radioPlayer__archive {
            height: 42px;
          }

          .archiveDrawer__list {
            padding-right: 20px;
          }
        }
      `}</style>
    </>
  );
}

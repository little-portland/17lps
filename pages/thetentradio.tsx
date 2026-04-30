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
                className="radioPlayer__iconButton"
                onClick={() => changeTrack(activeIndex - 1)}
                disabled={activeIndex === 0}
                aria-label="Previous track"
              >
                <span>◀</span>
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
                className="radioPlayer__iconButton"
                onClick={() => changeTrack(activeIndex + 1)}
                disabled={activeIndex === TRACKS.length - 1}
                aria-label="Next track"
              >
                <span>▶</span>
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
                    <span>×</span>
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
          background: #ef8ee7;
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
              rgba(4, 6, 14, 0.9),
              rgba(18, 8, 28, 0.78),
              rgba(4, 6, 14, 0.9)
            ) !important;
          border-bottom: 1px solid rgba(223, 121, 214, 0.1);
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
          text-shadow:
            0 0 8px rgba(223, 121, 214, 0.75),
            0 0 18px rgba(106, 55, 150, 0.5);
        }

        .scene-nav--tent-radio a.disabled,
        .scene-nav-mobile--tent-radio a.disabled {
          color: ${GREEN} !important;
          opacity: 0.35;
        }

        .scene-nav--tent-radio .scene-nav-burger span {
          background: ${GREEN} !important;
        }

        .scene-nav--tent-radio .scene-nav-logo img {
          filter: brightness(0) saturate(100%) invert(60%) sepia(21%)
            saturate(828%) hue-rotate(130deg) brightness(88%) contrast(87%);
        }

        .scene-nav-mobile.scene-nav--tent-radio,
        .scene-nav-mobile--tent-radio {
          background:
            radial-gradient(
              circle at 50% 22%,
              rgba(106, 55, 150, 0.36),
              transparent 36%
            ),
            radial-gradient(
              circle at 40% 42%,
              rgba(72, 157, 154, 0.22),
              transparent 38%
            ),
            rgba(3, 5, 14, 0.92) !important;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          z-index: 10030 !important;
        }

        .scene-nav-mobile--tent-radio .scene-nav-mobile-inner {
          width: 100%;
          min-height: 100dvh;
          padding-top: 24px !important;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .scene-nav-mobile--tent-radio .scene-nav-mobile-inner a {
          color: ${GREEN} !important;
          font-size: clamp(28px, 7.2vw, 56px);
          line-height: 1.34;
          text-align: center;
        }

        .scene-nav-mobile--tent-radio .scene-nav-mobile-inner a.active {
          color: ${PINK} !important;
        }

        @media (max-width: 900px) {
          .scene-nav-mobile--tent-radio .scene-nav-mobile-inner {
            padding-top: 24px !important;
          }
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
          filter: saturate(0.98) brightness(0.44) hue-rotate(268deg);
          opacity: 0.96;
        }

        .posterGrid {
          width: 100%;
          height: 100%;
          object-fit: cover;
          mix-blend-mode: screen;
          opacity: 0.82;
          filter:
            drop-shadow(0 0 10px rgba(72, 157, 154, 0.25))
            drop-shadow(0 0 20px rgba(106, 55, 150, 0.18));
          animation: gridPulse 8s ease-in-out infinite;
        }

        .posterGridTint {
          background:
            linear-gradient(
              115deg,
              rgba(72, 157, 154, 0.28) 0%,
              rgba(72, 157, 154, 0.12) 34%,
              rgba(106, 55, 150, 0.16) 52%,
              rgba(223, 121, 214, 0.2) 100%
            ),
            radial-gradient(
              circle at 50% 48%,
              rgba(72, 157, 154, 0.06),
              transparent 36%
            );
          mix-blend-mode: screen;
          opacity: 0.62;
        }

        .posterGridGlow {
          background:
            radial-gradient(
              circle at 34% 48%,
              rgba(72, 157, 154, 0.16),
              transparent 32%
            ),
            radial-gradient(
              circle at 70% 36%,
              rgba(223, 121, 214, 0.12),
              transparent 34%
            ),
            radial-gradient(
              circle at 50% 82%,
              rgba(106, 55, 150, 0.16),
              transparent 38%
            );
          filter: blur(24px);
          mix-blend-mode: screen;
          opacity: 0.72;
        }

        .posterGridSweep {
          opacity: 0;
          background: linear-gradient(
            180deg,
            transparent 0%,
            transparent 30%,
            rgba(72, 157, 154, 0.12) 42%,
            rgba(223, 121, 214, 0.22) 50%,
            rgba(106, 55, 150, 0.16) 58%,
            transparent 72%,
            transparent 100%
          );
          mix-blend-mode: screen;
          filter: blur(14px);
          transform: translateY(-130%);
          animation: gridSweepVertical 10s linear infinite;
        }

        .posterVignette {
          background:
            radial-gradient(
              circle at center,
              transparent 24%,
              rgba(4, 7, 7, 0.18) 58%,
              rgba(3, 4, 12, 0.84) 100%
            ),
            linear-gradient(
              180deg,
              rgba(4, 7, 7, 0.04),
              rgba(4, 7, 7, 0.5)
            );
        }

        .posterNoise {
          opacity: 0.1;
          background-image:
            radial-gradient(
              circle at 8% 16%,
              rgba(255, 255, 255, 0.78) 0 1px,
              transparent 1.4px
            ),
            radial-gradient(
              circle at 76% 22%,
              rgba(255, 255, 255, 0.62) 0 1px,
              transparent 1.4px
            ),
            radial-gradient(
              circle at 86% 72%,
              rgba(255, 255, 255, 0.44) 0 1px,
              transparent 1.4px
            ),
            radial-gradient(
              circle at 28% 80%,
              rgba(255, 255, 255, 0.38) 0 1px,
              transparent 1.4px
            );
          background-size: 320px 320px, 380px 380px, 340px 340px, 400px 400px;
          mix-blend-mode: screen;
        }

        .posterFrame {
          --core-height: min(54vh, 620px);
          --core-width: calc(var(--core-height) * 0.8);
          --orb-radius: 38px;
          position: absolute;
          inset: 0;
          z-index: 6;
          pointer-events: none;
        }

        .radioHeader {
          position: absolute;
          left: 50%;
          top: 84px;
          z-index: 12;
          width: min(94vw, 1120px);
          transform: translateX(-50%);
          text-align: center;
          text-transform: uppercase;
        }

        .radioHeader__title {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin: 0 0 10px;
          padding: 0 18px;
          color: ${PINK};
          font-family: 'Orbitron', 'IBM Plex Mono', monospace;
          font-size: clamp(2.9rem, 5vw, 5rem);
          font-weight: 900;
          letter-spacing: 0.08em;
          line-height: 0.92;
          text-shadow:
            0 0 8px rgba(223, 121, 214, 0.62),
            0 0 24px rgba(223, 121, 214, 0.36),
            0 0 44px rgba(106, 55, 150, 0.36);
          white-space: nowrap;
        }

        .radioHeader__title::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -10px;
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
          font-size: clamp(0.82rem, 1vw, 1.1rem);
          font-weight: 900;
          letter-spacing: 0.26em;
          text-shadow:
            0 0 8px rgba(72, 157, 154, 0.6),
            0 0 20px rgba(72, 157, 154, 0.35);
        }

        .orbCluster {
          position: absolute;
          left: 50%;
          top: 46%;
          width: var(--core-width);
          height: var(--core-height);
          z-index: 7;
          display: grid;
          place-items: center;
          pointer-events: none;
          transform: translate(-50%, -50%);
        }

        .orbBloomBack {
          position: absolute;
          inset: -11%;
          border-radius: calc(var(--orb-radius) + 48px);
          background:
            radial-gradient(
              ellipse at center,
              rgba(223, 121, 214, 0.36) 0%,
              rgba(106, 55, 150, 0.32) 36%,
              rgba(72, 157, 154, 0.14) 60%,
              rgba(72, 157, 154, 0) 84%
            );
          filter: blur(34px);
          opacity: 0.68;
          animation: orbPulse 2.8s ease-in-out infinite;
        }

        .orbPhotoMask {
          position: absolute;
          inset: 0;
          border-radius: var(--orb-radius);
          overflow: hidden;
          isolation: isolate;
          contain: paint;
          background:
            linear-gradient(
              180deg,
              rgba(106, 55, 150, 0.2),
              rgba(4, 6, 14, 0.3)
            ),
            rgba(4, 6, 14, 0.76);
          box-shadow:
            0 0 0 1px rgba(223, 121, 214, 0.18),
            0 0 18px rgba(223, 121, 214, 0.2),
            0 0 52px rgba(106, 55, 150, 0.3),
            0 0 92px rgba(72, 157, 154, 0.13);
          animation: orbCorePulse 2.8s ease-in-out infinite;
        }

        .orbPhotoMask::before {
          content: '';
          position: absolute;
          inset: 12px;
          z-index: 15;
          border-radius: calc(var(--orb-radius) - 12px);
          border: 1px solid rgba(72, 157, 154, 0.12);
          pointer-events: none;
        }

        .orbPhotoLayer {
          position: absolute;
          inset: 14px;
          z-index: 3;
          border-radius: calc(var(--orb-radius) - 14px);
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center center;
          filter:
            contrast(1.03)
            brightness(0.9)
            saturate(0.94);
          transform: translateZ(0);
          transition:
            filter 420ms ease,
            opacity 420ms ease,
            transform 420ms ease;
        }

        .orbPhotoLayer--current.is-playing {
          opacity: 0.42;
          filter:
            blur(5px)
            contrast(1.05)
            brightness(0.62)
            saturate(1.08);
          transform: scale(1.025);
        }

        .orbPhotoLayer--current.is-glitching {
          animation: photoGlitchIn 360ms ease both;
        }

        .orbPhotoLayer--previous {
          animation: photoGlitchOut 360ms ease forwards;
        }

        .orbWave {
          position: absolute;
          inset: 14px;
          z-index: 16;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(7px, 0.8vw, 13px);
          border-radius: calc(var(--orb-radius) - 14px);
          background:
            radial-gradient(
              circle at 50% 50%,
              rgba(223, 121, 214, 0.16),
              rgba(106, 55, 150, 0.18) 44%,
              rgba(0, 0, 0, 0.08) 72%
            );
          animation: waveEnter 420ms ease both;
        }

        .orbWave span {
          width: clamp(7px, 0.75vw, 12px);
          height: 18%;
          border-radius: 999px;
          background: linear-gradient(180deg, ${PINK}, ${GREEN});
          box-shadow:
            0 0 12px rgba(223, 121, 214, 0.8),
            0 0 28px rgba(72, 157, 154, 0.48);
          animation: waveDance 880ms ease-in-out infinite;
        }

        .orbWave span:nth-child(1) {
          height: 34%;
          animation-delay: 0ms;
        }
        .orbWave span:nth-child(2) {
          height: 26%;
          animation-delay: 80ms;
        }
        .orbWave span:nth-child(3) {
          height: 18%;
          animation-delay: 160ms;
        }
        .orbWave span:nth-child(4) {
          height: 14%;
          animation-delay: 240ms;
        }
        .orbWave span:nth-child(5) {
          height: 18%;
          animation-delay: 320ms;
        }
        .orbWave span:nth-child(6) {
          height: 14%;
          animation-delay: 240ms;
        }
        .orbWave span:nth-child(7) {
          height: 18%;
          animation-delay: 160ms;
        }
        .orbWave span:nth-child(8) {
          height: 26%;
          animation-delay: 80ms;
        }
        .orbWave span:nth-child(9) {
          height: 34%;
          animation-delay: 0ms;
        }

        .orbInnerTint,
        .orbInnerGlow {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .orbInnerTint {
          z-index: 18;
          border-radius: inherit;
          background:
            linear-gradient(
              180deg,
              rgba(223, 121, 214, 0.1),
              transparent 22%,
              transparent 72%,
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
          opacity: 0.78;
        }

        .orbInnerGlow {
          z-index: 19;
          border-radius: inherit;
          box-shadow:
            inset 0 0 42px rgba(223, 121, 214, 0.15),
            inset 0 0 120px rgba(106, 55, 150, 0.14),
            inset 0 0 170px rgba(72, 157, 154, 0.08);
        }

        .trackHero {
          position: absolute;
          left: 50%;
          top: calc(46% + (var(--core-height) / 2) + 32px);
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
          margin: 0 0 12px;
          padding: 12px 34px 13px;
          border-radius: 999px;
          border: 1px solid rgba(72, 157, 154, 0.48);
          background:
            linear-gradient(
              90deg,
              rgba(106, 55, 150, 0.2),
              rgba(72, 157, 154, 0.16)
            ),
            rgba(0, 0, 0, 0.72);
          color: ${PINK};
          font-family: 'Orbitron', 'IBM Plex Mono', monospace;
          font-size: clamp(1.45rem, 2.4vw, 2.25rem);
          font-weight: 900;
          letter-spacing: 0.07em;
          text-shadow:
            0 0 8px rgba(223, 121, 214, 0.78),
            0 0 28px rgba(223, 121, 214, 0.34);
          box-shadow:
            0 0 18px rgba(223, 121, 214, 0.16),
            inset 0 0 18px rgba(72, 157, 154, 0.08);
        }

        .trackHero__guest,
        .trackHero__genres {
          margin: 0;
          font-weight: 900;
          letter-spacing: 0.18em;
          line-height: 1.4;
        }

        .trackHero__guest {
          color: ${GREEN};
          font-size: clamp(0.82rem, 1vw, 1.02rem);
          text-shadow:
            0 0 8px rgba(72, 157, 154, 0.66),
            0 0 18px rgba(72, 157, 154, 0.32);
        }

        .trackHero__genres {
          margin-top: 8px;
          color: ${PINK};
          font-size: clamp(0.72rem, 0.86vw, 0.88rem);
          text-shadow:
            0 0 8px rgba(223, 121, 214, 0.52),
            0 0 18px rgba(106, 55, 150, 0.26);
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
          border: 1px solid rgba(72, 157, 154, 0.38);
          background:
            linear-gradient(
              90deg,
              rgba(106, 55, 150, 0.18),
              transparent 24%,
              transparent 76%,
              rgba(72, 157, 154, 0.14)
            ),
            rgba(2, 5, 10, 0.88);
          backdrop-filter: blur(14px);
          box-shadow:
            0 0 22px rgba(223, 121, 214, 0.16),
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
          text-shadow: 0 0 8px rgba(223, 121, 214, 0.6);
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
              rgba(223, 121, 214, 0.84)
            ),
            rgba(106, 55, 150, 0.3);
          outline: none;
        }

        .radioPlayer__bar input[type='range']::-webkit-slider-thumb {
          appearance: none;
          width: 19px;
          height: 19px;
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
          letter-spacing: 0.1em;
          text-shadow: 0 0 10px rgba(223, 121, 214, 0.65);
          box-shadow: inset 0 0 14px rgba(72, 157, 154, 0.08);
        }

        .radioPlayer__iconButton {
          width: 42px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
        }

        .radioPlayer__iconButton span,
        .archiveDrawer__clear span {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 1em;
          height: 1em;
          line-height: 1;
          transform: translateY(-0.02em);
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
          border: 1px solid rgba(72, 157, 154, 0.28);
          background:
            linear-gradient(
              180deg,
              rgba(106, 55, 150, 0.16),
              rgba(0, 0, 0, 0.44)
            ),
            rgba(0, 0, 0, 0.44);
          backdrop-filter: blur(12px);
          box-shadow:
            0 0 18px rgba(223, 121, 214, 0.12),
            inset 0 0 18px rgba(72, 157, 154, 0.05);
        }

        .trackIndex__label {
          margin: 0 0 12px;
          color: ${PINK};
          text-transform: uppercase;
          letter-spacing: 0.18em;
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
        }

        .trackIndex__item.is-active {
          border-color: rgba(223, 121, 214, 0.68);
          background: rgba(223, 121, 214, 0.12);
          color: ${PINK};
          box-shadow: 0 0 16px rgba(223, 121, 214, 0.14);
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
          border: 1px solid rgba(223, 121, 214, 0.46);
          background: rgba(106, 55, 150, 0.22);
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
          z-index: 10020;
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
          top: 82px;
          right: 18px;
          bottom: 18px;
          width: min(460px, calc(100vw - 36px));
          display: flex;
          flex-direction: column;
          padding: 20px;
          border-radius: 30px;
          border: 1px solid rgba(72, 157, 154, 0.38);
          background:
            linear-gradient(
              180deg,
              rgba(106, 55, 150, 0.22),
              transparent 34%
            ),
            rgba(4, 3, 14, 0.9);
          backdrop-filter: blur(18px);
          box-shadow:
            0 0 32px rgba(223, 121, 214, 0.16),
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
          padding: 9px 12px;
          border-radius: 999px;
          border: 1px solid rgba(72, 157, 154, 0.42);
          color: ${GREEN};
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.66rem;
          font-weight: 900;
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
          border: 1px solid rgba(72, 157, 154, 0.14);
          background: rgba(0, 0, 0, 0.28);
          color: rgba(223, 121, 214, 0.74);
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

        @keyframes waveEnter {
          from {
            opacity: 0;
            transform: scale(0.9);
            filter: blur(8px);
          }
          to {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
          }
        }

        @keyframes waveDance {
          0%,
          100% {
            transform: scaleY(0.42);
            opacity: 0.48;
          }
          50% {
            transform: scaleY(1.65);
            opacity: 1;
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
            opacity: 0.78;
          }
          50% {
            opacity: 0.9;
          }
        }

        @keyframes gridSweepVertical {
          0%,
          55% {
            opacity: 0;
            transform: translateY(-130%);
          }
          62% {
            opacity: 0.24;
          }
          76% {
            opacity: 0.5;
            transform: translateY(42%);
          }
          88% {
            opacity: 0.16;
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
            transform: scale(1);
            opacity: 0.5;
            filter: blur(30px) brightness(0.96);
          }
          50% {
            transform: scale(1.08);
            opacity: 0.82;
            filter: blur(42px) brightness(1.08);
          }
        }

        @keyframes orbCorePulse {
          0%,
          100% {
            box-shadow:
              0 0 0 1px rgba(223, 121, 214, 0.18),
              0 0 16px rgba(223, 121, 214, 0.16),
              0 0 48px rgba(106, 55, 150, 0.24),
              0 0 82px rgba(72, 157, 154, 0.1);
          }
          50% {
            box-shadow:
              0 0 0 1px rgba(223, 121, 214, 0.22),
              0 0 22px rgba(223, 121, 214, 0.26),
              0 0 62px rgba(106, 55, 150, 0.3),
              0 0 98px rgba(72, 157, 154, 0.14);
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
            --core-height: min(50vh, 560px);
          }

          .radioHeader__title {
            font-size: clamp(2.6rem, 5vw, 4.4rem);
          }

          .trackIndex {
            right: 16px;
            width: 196px;
          }
        }

        @media (max-width: 980px) {
          .posterFrame {
            --core-height: min(49vh, 510px);
          }

          .radioHeader {
            top: 84px;
          }

          .radioHeader__title {
            font-size: clamp(2.2rem, 6.4vw, 3.6rem);
            max-width: 92vw;
          }

          .trackIndex {
            left: 50%;
            right: auto;
            top: auto;
            bottom: 148px;
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
          .posterStage {
            overflow: hidden;
          }

          .posterFrame {
            --core-height: min(29dvh, 230px);
            --orb-radius: 28px;
          }

          .radioHeader {
            top: calc(var(--scene-nav-space, 60px) + 34px);
            width: calc(100vw - 28px);
          }

          .radioHeader__title {
            font-size: clamp(2.05rem, 8.6vw, 2.9rem);
            letter-spacing: 0.055em;
            line-height: 0.95;
            margin-bottom: 8px;
            white-space: nowrap;
          }

          .radioHeader__tag {
            font-size: clamp(0.64rem, 2.15vw, 0.82rem);
            letter-spacing: 0.14em;
            line-height: 1.25;
          }

          .orbCluster {
            top: auto;
            bottom: 284px;
          }

          .orbPhotoLayer {
            inset: 10px;
            border-radius: calc(var(--orb-radius) - 10px);
          }

          .orbPhotoMask::before {
            inset: 10px;
            border-radius: calc(var(--orb-radius) - 10px);
          }

          .orbWave {
            inset: 10px;
            border-radius: calc(var(--orb-radius) - 10px);
          }

          .trackHero {
            top: auto;
            bottom: 214px;
            width: calc(100vw - 28px);
          }

          .trackHero__label {
            font-size: clamp(1.12rem, 5vw, 1.55rem);
            padding: 8px 22px 9px;
            margin-bottom: 8px;
          }

          .trackHero__guest {
            font-size: clamp(0.7rem, 2.8vw, 0.88rem);
            letter-spacing: 0.14em;
          }

          .trackHero__genres {
            margin-top: 6px;
            font-size: clamp(0.62rem, 2.3vw, 0.76rem);
            letter-spacing: 0.095em;
          }

          .trackIndex {
            display: none;
          }

          .radioPlayer {
            bottom: 10px;
            width: calc(100vw - 22px);
            border-radius: 26px;
            padding: 14px 16px;
            gap: 10px;
            grid-template-columns: 1fr;
          }

          .radioPlayer__bar {
            grid-template-columns: 52px 1fr 58px;
            gap: 10px;
            font-size: 0.98rem;
          }

          .radioPlayer__bar input[type='range'] {
            height: 7px;
          }

          .radioPlayer__bar input[type='range']::-webkit-slider-thumb {
            width: 28px;
            height: 28px;
          }

          .radioPlayer__controls {
            gap: 12px;
            justify-content: center;
          }

          .radioPlayer__controls button {
            height: 48px;
          }

          .radioPlayer__iconButton {
            width: 48px;
          }

          .radioPlayer__transmit {
            min-width: min(280px, calc(100vw - 174px));
            padding: 0 18px;
            font-size: 0.88rem;
            letter-spacing: 0.12em;
          }

          .radioPlayer__archive {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 52px;
            margin-top: 2px;
            border-radius: 999px;
            border: 1px solid rgba(72, 157, 154, 0.46);
            background: rgba(106, 55, 150, 0.18);
            color: ${PINK};
            text-transform: uppercase;
            letter-spacing: 0.12em;
            font-size: 0.88rem;
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

          .archiveDrawer__list {
            padding-right: 18px;
          }
        }

        @media (max-width: 430px) {
          .posterFrame {
            --core-height: min(28dvh, 218px);
          }

          .radioHeader {
            top: calc(var(--scene-nav-space, 60px) + 30px);
          }

          .radioHeader__title {
            font-size: clamp(1.95rem, 8.2vw, 2.45rem);
          }

          .radioHeader__tag {
            font-size: clamp(0.6rem, 2.15vw, 0.72rem);
            letter-spacing: 0.11em;
          }

          .orbCluster {
            bottom: 280px;
          }

          .trackHero {
            bottom: 212px;
          }

          .trackHero__label {
            font-size: clamp(1.08rem, 4.7vw, 1.35rem);
          }

          .radioPlayer {
            padding: 13px 14px;
            gap: 9px;
          }

          .radioPlayer__bar {
            grid-template-columns: 48px 1fr 56px;
            font-size: 0.9rem;
          }

          .radioPlayer__controls {
            gap: 10px;
          }

          .radioPlayer__transmit {
            font-size: 0.76rem;
            min-width: min(244px, calc(100vw - 162px));
          }

          .radioPlayer__archive {
            height: 48px;
            font-size: 0.78rem;
            margin-top: 0;
          }

          .archiveDrawer__list {
            padding-right: 20px;
          }
        }

        @media (max-height: 700px) and (max-width: 760px) {
          .posterFrame {
            --core-height: min(25dvh, 190px);
          }

          .radioHeader {
            top: calc(var(--scene-nav-space, 60px) + 24px);
          }

          .orbCluster {
            bottom: 268px;
          }

          .trackHero {
            bottom: 202px;
          }

          .radioPlayer {
            padding: 12px 14px;
            gap: 8px;
          }

          .radioPlayer__archive {
            height: 44px;
          }
        }
      `}</style>
    </>
  );
}

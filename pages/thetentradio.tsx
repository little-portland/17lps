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
    objectPosition: '50% 50%',
  },
  {
    id: 'sEmoa',
    episodeLabel: 'THE TENT',
    title: 'The Tent (at the End of the Universe) [with sEmoa]',
    artist: 'OpenLab',
    guest: 'With sEmoa',
    src: '/audio/tent-semoa.mp3',
    cover: '/covers/Openlab_Apr.png',
    objectPosition: '50% 50%',
  },
  {
    id: '22',
    episodeLabel: 'THE TENT 22',
    title: 'The Tent (at the End of the Universe) 22 [with Bugsy]',
    artist: 'OpenLab',
    guest: 'With Bugsy',
    src: '/audio/tent-semoa.mp3',
    cover: '/covers/Openlab_Apr.png',
    objectPosition: '50% 50%',
  },
  {
    id: '21',
    episodeLabel: 'THE TENT 21',
    title: 'The Tent (at the End of the Universe) 21',
    artist: 'OpenLab',
    src: '/audio/tent-semoa.mp3',
    cover: '/covers/Openlab_Apr.png',
    objectPosition: '50% 50%',
  },
  {
    id: '20',
    episodeLabel: 'THE TENT 20',
    title: 'The Tent (at the End of the Universe) 20',
    artist: 'OpenLab',
    src: '/audio/tent-semoa.mp3',
    cover: '/covers/Openlab_Apr.png',
    objectPosition: '50% 50%',
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
  const ss = Math.floor(s % 60)
    .toString()
    .padStart(2, '0');

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

            <div className={`orbCluster ${isPlaying ? 'is-playing' : ''}`}>
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
                  }`}
                  style={{
                    backgroundImage: `url(${currentTrack.cover})`,
                    backgroundPosition: currentTrack.objectPosition || '50% 50%',
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
                <div className="screenSweep" />
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
          background: rgba(5, 4, 14, 0.72) !important;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(72, 157, 154, 0.16);
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
          opacity: 0.35;
        }

        .scene-nav--tent-radio .scene-nav-burger span {
          background: ${GREEN} !important;
        }

        .scene-nav--tent-radio .scene-nav-logo img {
          filter: brightness(0) saturate(100%) invert(58%) sepia(19%)
            saturate(852%) hue-rotate(129deg) brightness(91%) contrast(90%);
        }

        .scene-nav-mobile.scene-nav--tent-radio,
        .scene-nav-mobile--tent-radio {
          background:
            radial-gradient(circle at 50% 20%, rgba(106, 55, 150, 0.36), transparent 44%),
            linear-gradient(180deg, rgba(5, 4, 14, 0.86), rgba(5, 4, 14, 0.92)) !important;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          z-index: 10030 !important;
        }

        @media (max-width: 900px) {
          .scene-nav--tent-radio {
            background: rgba(5, 4, 14, 0.78) !important;
          }

          .scene-nav-mobile--tent-radio .scene-nav-mobile-inner {
            padding-top: 24px !important;
          }

          .scene-nav-mobile--tent-radio {
            min-height: 100dvh;
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
          filter: saturate(0.96) brightness(0.46);
          opacity: 0.95;
        }

        .posterGrid {
          width: 100%;
          height: 100%;
          object-fit: cover;
          mix-blend-mode: screen;
          opacity: 0.62;
          filter:
            drop-shadow(0 0 14px rgba(72, 157, 154, 0.25))
            drop-shadow(0 0 26px rgba(106, 55, 150, 0.22));
          animation: gridPulse 8s ease-in-out infinite;
        }

        .posterGridTint {
          background:
            radial-gradient(circle at 26% 46%, rgba(72, 157, 154, 0.18), transparent 32%),
            radial-gradient(circle at 74% 34%, rgba(223, 121, 214, 0.16), transparent 34%),
            linear-gradient(90deg, rgba(72, 157, 154, 0.16), transparent 42%, rgba(223, 121, 214, 0.14));
          mix-blend-mode: screen;
          opacity: 0.92;
        }

        .posterGridGlow {
          background:
            radial-gradient(ellipse at center, rgba(106, 55, 150, 0.26), transparent 48%),
            radial-gradient(ellipse at 50% 62%, rgba(72, 157, 154, 0.16), transparent 48%);
          filter: blur(12px);
          opacity: 0.72;
        }

        .posterGridSweep {
          opacity: 0;
          background: linear-gradient(
            180deg,
            transparent 0%,
            transparent 28%,
            rgba(72, 157, 154, 0.08) 38%,
            rgba(223, 121, 214, 0.3) 48%,
            rgba(72, 157, 154, 0.16) 56%,
            transparent 68%,
            transparent 100%
          );
          mix-blend-mode: screen;
          filter: blur(10px);
          transform: translateY(-130%);
          animation: gridSweepVertical 9s linear infinite;
        }

        .posterVignette {
          background:
            radial-gradient(circle at center, transparent 24%, rgba(4, 7, 7, 0.22) 58%, rgba(4, 7, 7, 0.86) 100%),
            linear-gradient(180deg, rgba(4, 7, 7, 0.05), rgba(4, 7, 7, 0.46));
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
          --core-width: clamp(320px, 27vw, 410px);
          --core-height: calc(var(--core-width) * 1.25);
          --core-radius: clamp(28px, 3vw, 52px);

          position: absolute;
          inset: 0;
          z-index: 6;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding:
            calc(var(--scene-nav-space, 60px) + clamp(24px, 3vh, 38px))
            24px
            132px;
          pointer-events: none;
        }

        .radioHeader {
          position: relative;
          z-index: 12;
          width: min(94vw, 1040px);
          text-align: center;
          text-transform: uppercase;
          margin-bottom: clamp(12px, 1.8vh, 22px);
        }

        .radioHeader__title {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin: 0 0 7px;
          padding: 0 22px;
          color: ${PINK};
          font-family: 'Orbitron', 'IBM Plex Mono', monospace;
          font-size: clamp(2.6rem, 4.8vw, 4.7rem);
          font-weight: 900;
          letter-spacing: 0.08em;
          line-height: 0.92;
          text-shadow:
            0 0 10px rgba(223, 121, 214, 0.54),
            0 0 24px rgba(223, 121, 214, 0.34),
            0 0 44px rgba(106, 55, 150, 0.52);
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
            rgba(223, 121, 214, 0.36),
            transparent 70%
          );
          filter: blur(8px);
        }

        .radioHeader__tag {
          margin: 0;
          color: ${GREEN};
          font-family: 'IBM Plex Mono', ui-monospace, monospace;
          font-size: clamp(0.82rem, 1.04vw, 1.08rem);
          font-weight: 900;
          letter-spacing: 0.26em;
          line-height: 1.25;
          text-shadow:
            0 0 8px rgba(72, 157, 154, 0.62),
            0 0 20px rgba(72, 157, 154, 0.32);
        }

        .orbCluster {
          position: relative;
          width: var(--core-width);
          height: var(--core-height);
          z-index: 7;
          display: grid;
          place-items: center;
          pointer-events: none;
          margin-top: 0;
          flex: 0 0 auto;
        }

        .orbBloomBack {
          position: absolute;
          inset: -18%;
          border-radius: var(--core-radius);
          background:
            radial-gradient(ellipse at center,
              rgba(223, 121, 214, 0.22) 0%,
              rgba(106, 55, 150, 0.28) 40%,
              rgba(72, 157, 154, 0.13) 64%,
              rgba(72, 157, 154, 0) 88%);
          filter: blur(34px);
          opacity: 0.58;
          animation: orbPulse 3.2s ease-in-out infinite;
        }

        .orbPhotoMask {
          position: relative;
          width: var(--core-width);
          height: var(--core-height);
          border-radius: var(--core-radius);
          overflow: hidden;
          isolation: isolate;
          contain: paint;
          background:
            linear-gradient(180deg, rgba(106, 55, 150, 0.18), rgba(4, 7, 7, 0.2)),
            rgba(7, 9, 18, 0.7);
          box-shadow:
            inset 0 0 0 1px rgba(223, 121, 214, 0.12),
            inset 0 0 48px rgba(106, 55, 150, 0.16),
            0 0 18px rgba(223, 121, 214, 0.24),
            0 0 42px rgba(106, 55, 150, 0.34);
          animation: orbCorePulse 3.2s ease-in-out infinite;
        }

        .orbPhotoLayer {
          position: absolute;
          inset: 0;
          border-radius: var(--core-radius);
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center center;
          filter: contrast(1.06) brightness(0.88) saturate(0.92);
          transform: translateZ(0);
          transition:
            opacity 420ms ease,
            filter 420ms ease,
            transform 420ms ease;
        }

        .orbCluster.is-playing .orbPhotoLayer--current {
          opacity: 0.45;
          filter: blur(5px) contrast(1.12) brightness(0.72) saturate(0.9);
          transform: scale(1.03);
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
          gap: clamp(6px, 0.65vw, 11px);
          border-radius: var(--core-radius);
          background:
            radial-gradient(circle at center, rgba(223, 121, 214, 0.2), transparent 34%),
            radial-gradient(circle at center, rgba(72, 157, 154, 0.18), rgba(0, 0, 0, 0.34) 66%);
          opacity: 0;
          animation: waveEnter 440ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        .orbWave span {
          width: clamp(5px, 0.46vw, 8px);
          height: 18%;
          border-radius: 999px;
          background: linear-gradient(180deg, ${PINK}, ${GREEN});
          box-shadow:
            0 0 10px rgba(223, 121, 214, 0.9),
            0 0 26px rgba(72, 157, 154, 0.58);
          animation: waveDance 900ms ease-in-out infinite;
        }

        .orbWave span:nth-child(1) { animation-delay: 0ms; }
        .orbWave span:nth-child(2) { animation-delay: 70ms; }
        .orbWave span:nth-child(3) { animation-delay: 140ms; }
        .orbWave span:nth-child(4) { animation-delay: 210ms; }
        .orbWave span:nth-child(5) { animation-delay: 280ms; }
        .orbWave span:nth-child(6) { animation-delay: 350ms; }
        .orbWave span:nth-child(7) { animation-delay: 280ms; }
        .orbWave span:nth-child(8) { animation-delay: 210ms; }
        .orbWave span:nth-child(9) { animation-delay: 140ms; }
        .orbWave span:nth-child(10) { animation-delay: 70ms; }
        .orbWave span:nth-child(11) { animation-delay: 0ms; }

        .orbInnerTint,
        .orbInnerGlow,
        .screenSweep {
          position: absolute;
          inset: 0;
          border-radius: var(--core-radius);
          pointer-events: none;
        }

        .orbInnerTint {
          z-index: 18;
          background:
            linear-gradient(180deg, rgba(223, 121, 214, 0.09), transparent 20%, transparent 68%, rgba(72, 157, 154, 0.08)),
            radial-gradient(ellipse at center, transparent 36%, rgba(106, 55, 150, 0.18) 78%, rgba(223, 121, 214, 0.18) 100%);
          mix-blend-mode: screen;
        }

        .orbInnerGlow {
          z-index: 19;
          box-shadow:
            inset 0 0 32px rgba(223, 121, 214, 0.16),
            inset 0 0 70px rgba(106, 55, 150, 0.14);
        }

        .screenSweep {
          z-index: 20;
          opacity: 0;
          background: linear-gradient(
            110deg,
            transparent 0%,
            transparent 30%,
            rgba(255, 255, 255, 0.08) 43%,
            rgba(223, 121, 214, 0.22) 50%,
            rgba(72, 157, 154, 0.12) 57%,
            transparent 70%,
            transparent 100%
          );
          mix-blend-mode: screen;
          transform: translateX(-130%);
          animation: screenSweep 5.4s ease-in-out infinite;
        }

        .trackHero {
          position: relative;
          z-index: 14;
          width: min(780px, calc(100vw - 120px));
          text-align: center;
          text-transform: uppercase;
          pointer-events: none;
          margin-top: clamp(10px, 1.4vh, 16px);
          flex: 0 0 auto;
        }

        .trackHero__label {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin: 0 0 8px;
          padding: 10px 26px 11px;
          border-radius: 999px;
          border: 1px solid rgba(72, 157, 154, 0.52);
          background:
            linear-gradient(90deg, rgba(106, 55, 150, 0.2), rgba(72, 157, 154, 0.12)),
            rgba(0, 0, 0, 0.72);
          color: ${PINK};
          font-family: 'Orbitron', 'IBM Plex Mono', monospace;
          font-size: clamp(1.45rem, 2.5vw, 2.3rem);
          font-weight: 900;
          letter-spacing: 0.07em;
          line-height: 1;
          text-shadow:
            0 0 8px rgba(223, 121, 214, 0.7),
            0 0 28px rgba(223, 121, 214, 0.45);
          box-shadow:
            0 0 16px rgba(72, 157, 154, 0.14),
            inset 0 0 18px rgba(72, 157, 154, 0.08);
        }

        .trackHero__guest,
        .trackHero__genres {
          margin: 0;
          font-weight: 900;
          letter-spacing: 0.16em;
          line-height: 1.3;
        }

        .trackHero__guest {
          color: ${GREEN};
          font-size: clamp(0.82rem, 1.02vw, 1.02rem);
          text-shadow: 0 0 12px rgba(72, 157, 154, 0.55);
        }

        .trackHero__genres {
          margin-top: 6px;
          color: ${PINK};
          font-size: clamp(0.7rem, 0.86vw, 0.86rem);
          text-shadow: 0 0 12px rgba(223, 121, 214, 0.48);
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
            linear-gradient(90deg, rgba(106, 55, 150, 0.18), transparent 24%, transparent 76%, rgba(72, 157, 154, 0.12)),
            rgba(3, 5, 9, 0.86);
          backdrop-filter: blur(14px);
          box-shadow:
            0 0 22px rgba(72, 157, 154, 0.18),
            0 0 28px rgba(106, 55, 150, 0.18),
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
          text-shadow: 0 0 10px rgba(223, 121, 214, 0.5);
        }

        .radioPlayer__bar input[type='range'] {
          appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 999px;
          background:
            linear-gradient(90deg, ${GREEN}, rgba(223, 121, 214, 0.86)),
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
          box-shadow: inset 0 0 14px rgba(72, 157, 154, 0.08);
        }

        .radioPlayer__controls button span,
        .archiveDrawer__clear span {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          line-height: 1;
          transform: translateY(-1px);
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
            linear-gradient(180deg, rgba(106, 55, 150, 0.14), transparent),
            rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(12px);
          box-shadow:
            0 0 18px rgba(72, 157, 154, 0.12),
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
          border-color: rgba(223, 121, 214, 0.68);
          background: rgba(106, 55, 150, 0.2);
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
          border: 1px solid rgba(223, 121, 214, 0.5);
          background: rgba(106, 55, 150, 0.12);
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
          background: rgba(0, 0, 0, 0.58);
        }

        .archiveDrawer__panel {
          position: absolute;
          top: calc(var(--scene-nav-space, 60px) + 14px);
          right: 18px;
          bottom: 18px;
          width: min(460px, calc(100vw - 36px));
          max-height: calc(100dvh - var(--scene-nav-space, 60px) - 32px);
          display: flex;
          flex-direction: column;
          padding: 20px;
          border-radius: 30px;
          border: 1px solid rgba(72, 157, 154, 0.34);
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
          padding: 9px 12px;
          border-radius: 999px;
          border: 1px solid rgba(72, 157, 154, 0.42);
          color: ${PINK};
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

        @keyframes waveEnter {
          0% {
            opacity: 0;
            transform: scale(0.92);
            filter: blur(10px);
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
            transform: scaleY(0.28);
            opacity: 0.45;
          }
          50% {
            transform: scaleY(1.72);
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
            opacity: 0.56;
          }
          50% {
            opacity: 0.72;
          }
        }

        @keyframes gridSweepVertical {
          0%,
          58% {
            opacity: 0;
            transform: translateY(-130%);
          }
          64% {
            opacity: 0.24;
          }
          76% {
            opacity: 0.7;
            transform: translateY(22%);
          }
          88% {
            opacity: 0.18;
            transform: translateY(118%);
          }
          100% {
            opacity: 0;
            transform: translateY(118%);
          }
        }

        @keyframes orbPulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.48;
            filter: blur(30px) brightness(0.98);
          }
          50% {
            transform: scale(1.08);
            opacity: 0.72;
            filter: blur(38px) brightness(1.08);
          }
        }

        @keyframes orbCorePulse {
          0%,
          100% {
            box-shadow:
              inset 0 0 0 1px rgba(223, 121, 214, 0.12),
              inset 0 0 40px rgba(106, 55, 150, 0.12),
              0 0 16px rgba(223, 121, 214, 0.2),
              0 0 34px rgba(106, 55, 150, 0.28);
          }
          50% {
            box-shadow:
              inset 0 0 0 1px rgba(223, 121, 214, 0.18),
              inset 0 0 58px rgba(106, 55, 150, 0.18),
              0 0 24px rgba(223, 121, 214, 0.28),
              0 0 56px rgba(106, 55, 150, 0.4);
          }
        }

        @keyframes screenSweep {
          0%,
          54% {
            opacity: 0;
            transform: translateX(-130%);
          }
          62% {
            opacity: 0.68;
          }
          72% {
            opacity: 0.3;
            transform: translateX(130%);
          }
          100% {
            opacity: 0;
            transform: translateX(130%);
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
            --core-width: clamp(300px, 25vw, 380px);
          }

          .radioHeader__title {
            font-size: clamp(2.3rem, 4vw, 3.7rem);
          }

          .trackIndex {
            right: 16px;
            width: 190px;
          }
        }

        @media (max-width: 980px) {
          .posterFrame {
            --core-width: clamp(260px, 44vw, 330px);
            padding-bottom: 148px;
          }

          .radioHeader__title {
            font-size: clamp(1.7rem, 6vw, 3rem);
            white-space: normal;
            max-width: 92vw;
          }

          .radioHeader__tag {
            display: block;
            font-size: clamp(0.72rem, 2vw, 0.9rem);
            letter-spacing: 0.16em;
            max-width: 88vw;
            margin-inline: auto;
          }

          .trackHero {
            width: calc(100vw - 32px);
          }

          .trackIndex {
            display: none;
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
            --core-width: clamp(222px, 54vw, 250px);
            --core-radius: 26px;
            padding:
              calc(var(--scene-nav-space, 60px) + 30px)
              12px
              226px;
          }

          .radioHeader {
            margin-bottom: 8px;
          }

          .radioHeader__title {
            font-size: clamp(1.65rem, 7.8vw, 2.35rem);
            line-height: 0.95;
            letter-spacing: 0.045em;
            white-space: nowrap;
            margin-bottom: 6px;
          }

          .radioHeader__tag {
            font-size: clamp(0.62rem, 2.55vw, 0.78rem);
            line-height: 1.15;
            letter-spacing: 0.08em;
            max-width: 94vw;
          }

          .trackHero {
            margin-top: 8px;
          }

          .trackHero__label {
            font-size: clamp(1.08rem, 4.8vw, 1.42rem);
            padding: 8px 18px 9px;
            margin-bottom: 6px;
          }

          .trackHero__guest {
            font-size: clamp(0.72rem, 3vw, 0.9rem);
            letter-spacing: 0.12em;
          }

          .trackHero__genres {
            margin-top: 5px;
            font-size: clamp(0.58rem, 2.55vw, 0.72rem);
            letter-spacing: 0.06em;
          }

          .radioPlayer {
            bottom: 12px;
            width: calc(100vw - 22px);
            padding: 18px;
            gap: 14px;
            border-radius: 28px;
          }

          .radioPlayer__bar {
            grid-template-columns: 46px 1fr 54px;
            gap: 10px;
            font-size: 0.82rem;
          }

          .radioPlayer__controls {
            gap: 10px;
          }

          .radioPlayer__controls button:not(.radioPlayer__transmit) {
            width: 48px;
            height: 48px;
          }

          .radioPlayer__transmit {
            min-width: min(250px, calc(100vw - 170px));
            height: 48px;
            font-size: 0.72rem;
            padding: 0 16px;
          }

          .radioPlayer__archive {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            min-height: 48px;
            border-radius: 999px;
            border: 1px solid rgba(72, 157, 154, 0.46);
            background: rgba(106, 55, 150, 0.18);
            color: ${PINK};
            text-transform: uppercase;
            letter-spacing: 0.12em;
            font-size: 0.76rem;
            font-weight: 900;
            text-shadow: 0 0 10px rgba(223, 121, 214, 0.56);
          }

          .archiveDrawer__panel {
            top: auto;
            left: 10px;
            right: 10px;
            bottom: 10px;
            width: auto;
            max-height: 74vh;
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
            --core-width: clamp(212px, 53vw, 235px);
            padding:
              calc(var(--scene-nav-space, 60px) + 28px)
              10px
              224px;
          }

          .radioHeader__title {
            font-size: clamp(1.45rem, 7.1vw, 1.9rem);
          }

          .radioHeader__tag {
            font-size: clamp(0.55rem, 2.38vw, 0.66rem);
          }

          .trackHero__label {
            font-size: clamp(1rem, 4.35vw, 1.22rem);
          }

          .trackHero__guest {
            font-size: clamp(0.66rem, 2.7vw, 0.78rem);
          }

          .trackHero__genres {
            font-size: clamp(0.52rem, 2.2vw, 0.62rem);
          }

          .radioPlayer {
            padding: 18px;
            gap: 14px;
          }

          .radioPlayer__controls button:not(.radioPlayer__transmit) {
            width: 44px;
            height: 44px;
          }

          .radioPlayer__transmit {
            min-width: min(230px, calc(100vw - 162px));
            height: 44px;
          }

          .radioPlayer__archive {
            min-height: 46px;
          }
        }
      `}</style>
    </>
  );
}

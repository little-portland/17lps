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
    cover: '/covers/tent-semoa.jpg',
  },
  {
    id: 'sEmoa',
    episodeLabel: 'THE TENT',
    title: 'The Tent (at the End of the Universe) [with sEmoa]',
    artist: 'OpenLab',
    guest: 'With sEmoa',
    src: '/audio/tent-semoa.mp3',
    cover: '/covers/tent-semoa.jpg',
  },
  {
    id: '22',
    episodeLabel: 'THE TENT 22',
    title: 'The Tent (at the End of the Universe) 22 [with Bugsy]',
    artist: 'OpenLab',
    guest: 'With Bugsy',
    src: '/audio/tent-semoa.mp3',
    cover: '/covers/tent-semoa.jpg',
  },
  {
    id: '21',
    episodeLabel: 'THE TENT 21',
    title: 'The Tent (at the End of the Universe) 21',
    artist: 'OpenLab',
    src: '/audio/tent-semoa.mp3',
    cover: '/covers/tent-semoa.jpg',
  },
  {
    id: '20',
    episodeLabel: 'THE TENT 20',
    title: 'The Tent (at the End of the Universe) 20',
    artist: 'OpenLab',
    src: '/audio/tent-semoa.mp3',
    cover: '/covers/tent-semoa.jpg',
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

      const endY =
        event.changedTouches[0]?.clientY ?? touchStartYRef.current;
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
              <div className="portalTunnel" aria-hidden="true" />

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

                <div
                  className={`orbWave ${isPlaying ? 'is-active' : ''}`}
                  aria-hidden={!isPlaying}
                >
                  <div className="orbWave__halo" />
                  <div className="orbWave__core">
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
                    <span />
                    <span />
                  </div>
                </div>

                <div className="portalGridOverlay" aria-hidden="true" />
                <div className="orbInnerTint" aria-hidden="true" />
                <div className="orbInnerGlow" aria-hidden="true" />
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
                className="radioPlayer__iconButton radioPlayer__iconButton--prev"
                onClick={() => changeTrack(activeIndex - 1)}
                disabled={activeIndex === 0}
                aria-label="Previous track"
              >
                <span aria-hidden="true">◀</span>
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
                className="radioPlayer__iconButton radioPlayer__iconButton--next"
                onClick={() => changeTrack(activeIndex + 1)}
                disabled={activeIndex === TRACKS.length - 1}
                aria-label="Next track"
              >
                <span aria-hidden="true">▶</span>
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
                    <span aria-hidden="true">×</span>
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

        :root {
          --tent-pink: ${PINK};
          --tent-purple: ${PURPLE};
          --tent-green: ${GREEN};
          --tent-bg: #07040f;
        }

        html,
        body {
          margin: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: var(--tent-bg) !important;
          color: #f5d8f1;
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
          box-shadow: 0 0 10px rgba(223, 121, 214, 0.7);
        }

        *::-webkit-scrollbar-thumb:hover {
          background: #ef98e8;
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
          background:
            radial-gradient(
              circle at 28% 32%,
              rgba(106, 55, 150, 0.24),
              transparent 30%
            ),
            radial-gradient(
              circle at 72% 62%,
              rgba(72, 157, 154, 0.16),
              transparent 32%
            ),
            linear-gradient(180deg, #05030c 0%, #07040f 100%);
        }

        /* =====================================================
           TENT RADIO NAV THEME
        ===================================================== */

        .posterPage--with-scene-nav .posterStage {
          top: 0 !important;
        }

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
          background: rgba(7, 4, 15, 0.24) !important;
          backdrop-filter: blur(14px) saturate(150%) !important;
          -webkit-backdrop-filter: blur(14px) saturate(150%) !important;
          border-bottom: 1px solid rgba(223, 121, 214, 0.08) !important;
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
          filter: brightness(0) saturate(100%) invert(63%) sepia(22%)
            saturate(712%) hue-rotate(129deg) brightness(89%) contrast(86%);
        }

        .scene-nav--tent-radio.is-open {
          background: transparent !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          border-bottom: 0 !important;
        }

        .scene-nav-mobile.scene-nav--tent-radio,
        .scene-nav-mobile--tent-radio {
          background: rgba(7, 4, 15, 0.58) !important;
          backdrop-filter: blur(18px) saturate(145%) !important;
          -webkit-backdrop-filter: blur(18px) saturate(145%) !important;
          z-index: 10030 !important;
        }

        .scene-nav-mobile--tent-radio .scene-nav-mobile-inner {
          padding-top: 82px;
        }

        @media (max-width: 900px) {
          .scene-nav--tent-radio {
            background: rgba(7, 4, 15, 0.26) !important;
          }

          .scene-nav--tent-radio.is-open {
            background: transparent !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            border-bottom: 0 !important;
          }

          .scene-nav-mobile.scene-nav--tent-radio,
          .scene-nav-mobile--tent-radio {
            top: 0 !important;
            height: 100dvh !important;
            background: rgba(7, 4, 15, 0.58) !important;
          }

          /*
            This moves the mobile menu items up.
            Copy this rule into SceneNav/global CSS too if you want it
            to affect every themed page, not only this page.
          */
          .scene-nav-mobile-inner {
            padding-top: calc(var(--scene-nav-space, 60px) + 14px) !important;
          }

          .scene-nav-mobile--tent-radio .scene-nav-mobile-inner {
            padding-top: calc(var(--scene-nav-space, 60px) + 14px) !important;
          }

          .scene-nav-burger,
          .scene-nav-logo {
            z-index: 10060 !important;
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
          filter: saturate(0.82) brightness(0.4);
          opacity: 0.95;
        }

        .posterGrid {
          width: 100%;
          height: 100%;
          object-fit: cover;
          mix-blend-mode: screen;
          opacity: 0.72;
          filter:
            hue-rotate(14deg)
            saturate(1.35)
            brightness(0.84)
            drop-shadow(0 0 18px rgba(72, 157, 154, 0.22))
            drop-shadow(0 0 26px rgba(106, 55, 150, 0.18));
          animation: gridPulse 6.4s ease-in-out infinite;
        }

        .posterGridTint {
          background:
            linear-gradient(
              125deg,
              rgba(72, 157, 154, 0.22) 0%,
              rgba(72, 157, 154, 0.08) 22%,
              rgba(106, 55, 150, 0.18) 48%,
              rgba(223, 121, 214, 0.12) 70%,
              rgba(72, 157, 154, 0.12) 100%
            );
          mix-blend-mode: screen;
          opacity: 0.9;
        }

        .posterGridGlow {
          background:
            radial-gradient(
              circle at 28% 34%,
              rgba(106, 55, 150, 0.28),
              transparent 32%
            ),
            radial-gradient(
              circle at 66% 58%,
              rgba(72, 157, 154, 0.22),
              transparent 28%
            ),
            radial-gradient(
              circle at 50% 22%,
              rgba(223, 121, 214, 0.16),
              transparent 26%
            );
          filter: blur(50px);
          opacity: 0.76;
          mix-blend-mode: screen;
        }

        .posterGridSweep {
          opacity: 0;
          background: linear-gradient(
            180deg,
            transparent 0%,
            transparent 28%,
            rgba(72, 157, 154, 0.08) 35%,
            rgba(72, 157, 154, 0.24) 42%,
            rgba(223, 121, 214, 0.42) 50%,
            rgba(72, 157, 154, 0.24) 58%,
            rgba(72, 157, 154, 0.08) 65%,
            transparent 72%,
            transparent 100%
          );
          mix-blend-mode: screen;
          filter: blur(12px);
          transform: translateY(-130%);
          animation: gridSweepVertical 9s linear infinite;
        }

        .posterVignette {
          background:
            radial-gradient(
              circle at center,
              transparent 34%,
              rgba(7, 4, 15, 0.2) 60%,
              rgba(7, 4, 15, 0.84) 100%
            ),
            linear-gradient(
              180deg,
              rgba(7, 4, 15, 0.06),
              rgba(7, 4, 15, 0.46)
            );
        }

        .posterNoise {
          opacity: 0.08;
          background-image:
            radial-gradient(
              circle at 8% 16%,
              rgba(255, 255, 255, 0.8) 0 1px,
              transparent 1.4px
            ),
            radial-gradient(
              circle at 76% 22%,
              rgba(255, 255, 255, 0.6) 0 1px,
              transparent 1.4px
            ),
            radial-gradient(
              circle at 86% 72%,
              rgba(255, 255, 255, 0.42) 0 1px,
              transparent 1.4px
            ),
            radial-gradient(
              circle at 28% 80%,
              rgba(255, 255, 255, 0.34) 0 1px,
              transparent 1.4px
            );
          background-size: 320px 320px, 380px 380px, 340px 340px, 400px 400px;
          mix-blend-mode: screen;
        }

        .posterFrame {
          --portal-width: min(24vw, 360px);
          --portal-height: calc(var(--portal-width) * 1.25);
          position: absolute;
          inset: 0;
          z-index: 6;
          pointer-events: none;
        }

        .radioHeader {
          position: absolute;
          left: 50%;
          top: calc(var(--scene-nav-space, 60px) + 40px);
          z-index: 12;
          width: min(92vw, 960px);
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
          padding: 0 16px;
          color: ${PINK};
          font-family: 'Orbitron', 'IBM Plex Mono', monospace;
          font-size: clamp(2rem, 4vw, 4rem);
          font-weight: 900;
          letter-spacing: 0.08em;
          line-height: 0.94;
          text-shadow:
            0 0 10px rgba(223, 121, 214, 0.32),
            0 0 22px rgba(223, 121, 214, 0.18),
            0 0 44px rgba(106, 55, 150, 0.24);
        }

        .radioHeader__tag {
          margin: 0;
          color: ${GREEN};
          font-size: clamp(0.58rem, 0.88vw, 0.92rem);
          font-weight: 800;
          letter-spacing: 0.22em;
          text-shadow:
            0 0 8px rgba(72, 157, 154, 0.3),
            0 0 16px rgba(106, 55, 150, 0.18);
        }

        .orbCluster {
          position: absolute;
          left: 50%;
          top: 48%;
          width: calc(var(--portal-width) + 110px);
          height: calc(var(--portal-height) + 110px);
          transform: translate(-50%, -50%);
          z-index: 7;
          pointer-events: none;
        }

        .portalTunnel {
          position: absolute;
          inset: -18px;
          border-radius: 999px;
          background:
            radial-gradient(
              ellipse at center,
              rgba(223, 121, 214, 0.32) 0%,
              rgba(106, 55, 150, 0.26) 34%,
              rgba(72, 157, 154, 0.16) 56%,
              rgba(72, 157, 154, 0) 78%
            );
          filter: blur(42px);
          opacity: 0.58;
          z-index: 1;
          animation: orbPulse 2.8s ease-in-out infinite;
        }

        .orbBloomBack {
          position: absolute;
          inset: -16%;
          border-radius: 999px;
          background:
            radial-gradient(
              ellipse at center,
              rgba(223, 121, 214, 0.32) 0%,
              rgba(106, 55, 150, 0.26) 30%,
              rgba(72, 157, 154, 0.2) 50%,
              rgba(72, 157, 154, 0.08) 66%,
              rgba(72, 157, 154, 0) 84%
            );
          filter: blur(64px);
          transform: scale(1);
          opacity: 0.62;
          animation: orbPulseWide 2.8s ease-in-out infinite;
          z-index: 0;
        }

        .orbPhotoMask {
          position: absolute;
          left: 50%;
          top: 50%;
          width: calc(var(--portal-width) + 18px);
          height: var(--portal-height);
          transform: translate3d(-50%, -50%, 0);
          overflow: hidden;
          isolation: isolate;
          contain: paint;
          background:
            linear-gradient(
              180deg,
              rgba(106, 55, 150, 0.16),
              rgba(72, 157, 154, 0.06)
            ),
            rgba(7, 4, 15, 0.88);
          border-radius: 30px;
          box-shadow:
            inset 0 0 0 1px rgba(223, 121, 214, 0.1),
            inset 0 0 32px rgba(223, 121, 214, 0.1),
            inset 0 0 70px rgba(106, 55, 150, 0.14),
            0 0 22px rgba(223, 121, 214, 0.16),
            0 0 52px rgba(106, 55, 150, 0.18),
            0 0 72px rgba(72, 157, 154, 0.1);
          z-index: 3;
          animation: portalPulse 2.8s ease-in-out infinite;
        }

        .orbPhotoMask::before {
          content: '';
          position: absolute;
          inset: -12%;
          z-index: 5;
          pointer-events: none;
          background:
            radial-gradient(
              ellipse at center,
              rgba(223, 121, 214, 0.1),
              rgba(106, 55, 150, 0.08) 42%,
              rgba(72, 157, 154, 0.05) 62%,
              transparent 78%
            );
          mix-blend-mode: screen;
          opacity: 0.46;
          animation: innerBreath 2.8s ease-in-out infinite;
        }

        .orbPhotoMask::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 20;
          pointer-events: none;
          background:
            repeating-linear-gradient(
              0deg,
              rgba(255, 255, 255, 0.025) 0 1px,
              transparent 1px 3px
            ),
            radial-gradient(
              circle at 18% 28%,
              rgba(223, 121, 214, 0.14) 0 1px,
              transparent 1.8px
            ),
            radial-gradient(
              circle at 74% 38%,
              rgba(72, 157, 154, 0.14) 0 1px,
              transparent 1.8px
            ),
            radial-gradient(
              circle at 44% 78%,
              rgba(255, 255, 255, 0.08) 0 1px,
              transparent 1.6px
            );
          background-size:
            100% 4px,
            90px 90px,
            120px 120px,
            140px 140px;
          mix-blend-mode: screen;
          opacity: 0.2;
        }

        .orbPhotoLayer {
          position: absolute;
          inset: 12px;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          filter: contrast(1.06) brightness(0.88) saturate(0.9);
          transform: translateZ(0);
          transform-origin: center center;
          transition:
            filter 420ms ease,
            transform 420ms ease,
            opacity 420ms ease;
        }

        .orbPhotoLayer--current.is-playing {
          filter:
            blur(7px)
            contrast(1.04)
            brightness(0.56)
            saturate(1.12);
          transform: scale(1.03);
          opacity: 0.68;
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
          display: grid;
          place-items: center;
          pointer-events: none;
          opacity: 0;
          transform: scale(0.9);
          transition:
            opacity 420ms ease,
            transform 520ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .orbWave.is-active {
          opacity: 1;
          transform: scale(1);
        }

        .orbWave__halo {
          position: absolute;
          width: 68%;
          aspect-ratio: 1 / 1;
          border-radius: 999px;
          background:
            radial-gradient(
              circle,
              rgba(223, 121, 214, 0.22) 0%,
              rgba(106, 55, 150, 0.16) 42%,
              rgba(72, 157, 154, 0.06) 62%,
              transparent 76%
            );
          filter: blur(18px);
          animation: waveHaloPulse 1.8s ease-in-out infinite;
        }

        .orbWave__core {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(5px, 0.55vw, 10px);
          width: 74%;
          height: 42%;
        }

        .orbWave__core span {
          width: clamp(5px, 0.55vw, 9px);
          height: 34%;
          border-radius: 999px;
          background:
            linear-gradient(
              180deg,
              rgba(223, 121, 214, 1),
              rgba(72, 157, 154, 0.82)
            );
          box-shadow:
            0 0 10px rgba(223, 121, 214, 0.82),
            0 0 22px rgba(106, 55, 150, 0.58),
            0 0 32px rgba(72, 157, 154, 0.24);
          animation: waveDance 900ms ease-in-out infinite;
        }

        .orbWave__core span:nth-child(1) {
          height: 18%;
          animation-delay: 0ms;
        }

        .orbWave__core span:nth-child(2) {
          height: 46%;
          animation-delay: 70ms;
        }

        .orbWave__core span:nth-child(3) {
          height: 72%;
          animation-delay: 140ms;
        }

        .orbWave__core span:nth-child(4) {
          height: 54%;
          animation-delay: 210ms;
        }

        .orbWave__core span:nth-child(5) {
          height: 36%;
          animation-delay: 280ms;
        }

        .orbWave__core span:nth-child(6) {
          height: 28%;
          animation-delay: 350ms;
        }

        .orbWave__core span:nth-child(7) {
          height: 42%;
          animation-delay: 420ms;
        }

        .orbWave__core span:nth-child(8) {
          height: 30%;
          animation-delay: 350ms;
        }

        .orbWave__core span:nth-child(9) {
          height: 38%;
          animation-delay: 280ms;
        }

        .orbWave__core span:nth-child(10) {
          height: 58%;
          animation-delay: 210ms;
        }

        .orbWave__core span:nth-child(11) {
          height: 84%;
          animation-delay: 140ms;
        }

        .orbWave__core span:nth-child(12) {
          height: 52%;
          animation-delay: 70ms;
        }

        .orbWave__core span:nth-child(13) {
          height: 20%;
          animation-delay: 0ms;
        }

        .portalGridOverlay,
        .orbInnerTint,
        .orbInnerGlow {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .portalGridOverlay {
          z-index: 8;
          opacity: 0.22;
          mix-blend-mode: screen;
          background:
            radial-gradient(
              ellipse at center,
              transparent 0%,
              transparent 42%,
              rgba(223, 121, 214, 0.12) 62%,
              rgba(72, 157, 154, 0.14) 100%
            ),
            linear-gradient(
              90deg,
              transparent 0%,
              rgba(72, 157, 154, 0.14) 48%,
              rgba(223, 121, 214, 0.12) 52%,
              transparent 100%
            );
        }

        .orbInnerTint {
          background:
            radial-gradient(
              circle at 50% 50%,
              rgba(223, 121, 214, 0.04),
              rgba(106, 55, 150, 0.06) 54%,
              rgba(72, 157, 154, 0.08) 78%,
              rgba(72, 157, 154, 0.12) 100%
            ),
            linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.02),
              transparent 18%,
              transparent 68%,
              rgba(0, 0, 0, 0.14) 100%
            );
          mix-blend-mode: screen;
          z-index: 9;
        }

        .orbInnerGlow {
          border-radius: 28px;
          box-shadow:
            inset 0 0 30px rgba(223, 121, 214, 0.12),
            inset 0 0 76px rgba(106, 55, 150, 0.16),
            inset 0 0 130px rgba(72, 157, 154, 0.08);
          z-index: 10;
        }

        .trackHero {
          position: absolute;
          left: 50%;
          bottom: 128px;
          z-index: 14;
          width: min(760px, calc(100vw - 40px));
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
          border: 1px solid rgba(72, 157, 154, 0.34);
          background:
            linear-gradient(
              90deg,
              rgba(106, 55, 150, 0.18),
              rgba(10, 8, 20, 0.82) 28%,
              rgba(10, 8, 20, 0.82) 72%,
              rgba(72, 157, 154, 0.18)
            );
          color: ${PINK};
          font-family: 'Orbitron', 'IBM Plex Mono', monospace;
          font-size: clamp(1.05rem, 1.8vw, 1.9rem);
          font-weight: 900;
          letter-spacing: 0.08em;
          text-shadow:
            0 0 8px rgba(223, 121, 214, 0.44),
            0 0 18px rgba(106, 55, 150, 0.28);
          box-shadow:
            0 0 16px rgba(106, 55, 150, 0.12),
            inset 0 0 18px rgba(72, 157, 154, 0.06);
        }

        .trackHero__guest,
        .trackHero__genres {
          margin: 0;
          text-transform: uppercase;
          line-height: 1.35;
        }

        .trackHero__guest {
          color: ${GREEN};
          font-weight: 800;
          letter-spacing: 0.18em;
          font-size: clamp(0.68rem, 0.84vw, 0.88rem);
          text-shadow: 0 0 8px rgba(72, 157, 154, 0.28);
        }

        .trackHero__genres {
          margin-top: 8px;
          color: ${PINK};
          font-weight: 700;
          letter-spacing: 0.16em;
          font-size: clamp(0.54rem, 0.72vw, 0.72rem);
          opacity: 0.92;
          text-shadow: 0 0 8px rgba(223, 121, 214, 0.18);
        }

        .radioPlayer {
          position: fixed;
          left: 50%;
          bottom: 18px;
          z-index: 30;
          width: min(1140px, calc(100vw - 34px));
          transform: translateX(-50%);
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 20px;
          align-items: center;
          padding: 14px 18px;
          border-radius: 999px;
          border: 1px solid rgba(72, 157, 154, 0.24);
          background:
            linear-gradient(
              90deg,
              rgba(106, 55, 150, 0.18),
              rgba(10, 8, 20, 0.82) 20%,
              rgba(10, 8, 20, 0.82) 80%,
              rgba(72, 157, 154, 0.18)
            );
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow:
            0 0 24px rgba(106, 55, 150, 0.18),
            inset 0 0 22px rgba(72, 157, 154, 0.05);
        }

        .radioPlayer__bar {
          display: grid;
          grid-template-columns: 54px minmax(220px, 1fr) 54px;
          gap: 14px;
          align-items: center;
          color: ${PINK};
          font-size: 0.82rem;
          font-weight: 800;
          font-variant-numeric: tabular-nums;
        }

        .radioPlayer__bar input[type='range'] {
          appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 999px;
          background:
            linear-gradient(
              90deg,
              rgba(72, 157, 154, 0.92),
              rgba(223, 121, 214, 0.88)
            ),
            rgba(72, 157, 154, 0.26);
          outline: none;
        }

        .radioPlayer__bar input[type='range']::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: ${PINK};
          box-shadow:
            0 0 0 2px rgba(255, 255, 255, 0.08),
            0 0 16px rgba(223, 121, 214, 0.7);
        }

        .radioPlayer__controls {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .radioPlayer__controls button {
          height: 42px;
          border-radius: 999px;
          border: 1px solid rgba(72, 157, 154, 0.26);
          background: rgba(10, 8, 20, 0.58);
          color: ${PINK};
          text-transform: uppercase;
          font-size: 0.76rem;
          font-weight: 900;
          letter-spacing: 0.12em;
          text-shadow: 0 0 10px rgba(223, 121, 214, 0.36);
          box-shadow: inset 0 0 14px rgba(106, 55, 150, 0.06);
        }

        .radioPlayer__controls button:not(.radioPlayer__transmit) {
          width: 42px;
        }

        .radioPlayer__iconButton,
        .archiveDrawer__clear {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          line-height: 1;
        }

        .radioPlayer__iconButton {
          width: 42px;
        }

        .radioPlayer__iconButton > span,
        .archiveDrawer__clear > span {
          display: block;
          line-height: 1;
        }

        .radioPlayer__iconButton--prev > span {
          transform: translate(-1px, -1px);
        }

        .radioPlayer__iconButton--next > span {
          transform: translate(1px, -1px);
        }

        .archiveDrawer__clear > span {
          transform: translateY(-1px);
          font-size: 1rem;
          font-weight: 900;
        }

        .radioPlayer__transmit {
          min-width: 240px;
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
          right: 22px;
          top: 50%;
          z-index: 24;
          width: 212px;
          transform: translateY(-50%);
          padding: 16px;
          border-radius: 26px;
          border: 1px solid rgba(72, 157, 154, 0.18);
          background:
            linear-gradient(
              180deg,
              rgba(106, 55, 150, 0.14),
              rgba(10, 8, 20, 0.88) 36%
            ),
            rgba(10, 8, 20, 0.76);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow:
            0 0 22px rgba(106, 55, 150, 0.14),
            inset 0 0 18px rgba(72, 157, 154, 0.04);
        }

        .trackIndex__label {
          margin: 0 0 14px;
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
          padding: 10px 10px;
          border-radius: 999px;
          border: 1px solid transparent;
          background: rgba(4, 4, 10, 0.42);
          color: ${GREEN};
          text-align: left;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-size: 0.68rem;
          font-weight: 800;
        }

        .trackIndex__item.is-active {
          border-color: rgba(223, 121, 214, 0.54);
          background: rgba(106, 55, 150, 0.18);
          color: ${PINK};
          box-shadow: 0 0 16px rgba(223, 121, 214, 0.1);
        }

        .trackIndex__number {
          color: rgba(72, 157, 154, 0.66);
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
          margin-top: 14px;
          padding: 11px 12px;
          border-radius: 999px;
          border: 1px solid rgba(72, 157, 154, 0.28);
          background: rgba(106, 55, 150, 0.14);
          color: ${PINK};
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-size: 0.64rem;
          font-weight: 900;
          text-shadow: 0 0 10px rgba(223, 121, 214, 0.28);
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
          background: rgba(0, 0, 0, 0.58);
        }

        .archiveDrawer__panel {
          position: absolute;
          top: calc(var(--scene-nav-space, 60px) + 14px);
          right: 18px;
          height: calc(100dvh - var(--scene-nav-space, 60px) - 32px);
          width: min(460px, calc(100vw - 36px));
          display: flex;
          flex-direction: column;
          padding: 20px;
          border-radius: 30px;
          border: 1px solid rgba(72, 157, 154, 0.24);
          background:
            linear-gradient(
              180deg,
              rgba(106, 55, 150, 0.18),
              rgba(10, 8, 20, 0.94) 34%
            ),
            rgba(10, 8, 20, 0.94);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          box-shadow:
            0 0 32px rgba(106, 55, 150, 0.18),
            inset 0 0 24px rgba(72, 157, 154, 0.05);
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
          color: ${PINK};
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
          border: 1px solid rgba(72, 157, 154, 0.26);
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
          border: 1px solid rgba(72, 157, 154, 0.22);
          outline: none;
          background: rgba(7, 4, 15, 0.56);
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
          border: 1px solid rgba(72, 157, 154, 0.26);
          color: ${GREEN};
          font-size: 1rem;
          font-weight: 900;
        }

        .archiveDrawer__search::placeholder {
          color: rgba(223, 121, 214, 0.42);
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
          border: 1px solid rgba(72, 157, 154, 0.1);
          background: rgba(7, 4, 15, 0.42);
          color: rgba(223, 121, 214, 0.74);
          text-align: left;
        }

        .archiveDrawer__item.is-active {
          border-color: rgba(223, 121, 214, 0.52);
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
          color: rgba(72, 157, 154, 0.74);
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
            transform: scale(1);
          }

          50% {
            opacity: 0.84;
            transform: scale(1.01);
          }
        }

        @keyframes gridSweepVertical {
          0%,
          58% {
            opacity: 0;
            transform: translateY(-132%);
          }

          62% {
            opacity: 0.22;
          }

          74% {
            opacity: 0.6;
            transform: translateY(18%);
          }

          84% {
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
            transform: scale(0.97);
            opacity: 0.46;
            filter: blur(38px) brightness(0.94);
          }

          50% {
            transform: scale(1.08);
            opacity: 0.74;
            filter: blur(50px) brightness(1.08);
          }
        }

        @keyframes orbPulseWide {
          0%,
          100% {
            transform: scale(0.97);
            opacity: 0.44;
            filter: blur(60px) brightness(0.94);
          }

          50% {
            transform: scale(1.15);
            opacity: 0.74;
            filter: blur(74px) brightness(1.08);
          }
        }

        @keyframes innerBreath {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(0.97);
          }

          50% {
            opacity: 0.52;
            transform: scale(1.06);
          }
        }

        @keyframes portalPulse {
          0%,
          100% {
            box-shadow:
              inset 0 0 0 1px rgba(223, 121, 214, 0.1),
              inset 0 0 32px rgba(223, 121, 214, 0.1),
              inset 0 0 70px rgba(106, 55, 150, 0.14),
              0 0 22px rgba(223, 121, 214, 0.16),
              0 0 52px rgba(106, 55, 150, 0.18),
              0 0 72px rgba(72, 157, 154, 0.1);
          }

          50% {
            box-shadow:
              inset 0 0 0 1px rgba(223, 121, 214, 0.13),
              inset 0 0 40px rgba(223, 121, 214, 0.13),
              inset 0 0 86px rgba(106, 55, 150, 0.18),
              0 0 28px rgba(223, 121, 214, 0.22),
              0 0 66px rgba(106, 55, 150, 0.22),
              0 0 90px rgba(72, 157, 154, 0.12);
          }
        }

        @keyframes waveDance {
          0%,
          100% {
            transform: scaleY(0.62) translateY(2px);
            opacity: 0.58;
          }

          50% {
            transform: scaleY(1.35) translateY(-2px);
            opacity: 1;
          }
        }

        @keyframes waveHaloPulse {
          0%,
          100% {
            opacity: 0.48;
            transform: scale(0.88);
          }

          50% {
            opacity: 0.94;
            transform: scale(1.1);
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
            --portal-width: min(28vw, 330px);
          }

          .trackIndex {
            right: 16px;
            width: 194px;
          }

          .radioHeader__title {
            font-size: clamp(1.9rem, 4vw, 3.5rem);
          }
        }

        @media (max-width: 980px) {
          .posterFrame {
            --portal-width: min(34vw, 300px);
          }

          .radioHeader {
            top: calc(var(--scene-nav-space, 60px) + 30px);
          }

          .radioHeader__title {
            font-size: clamp(1.8rem, 6vw, 3rem);
            white-space: normal;
            max-width: 92vw;
          }

          .radioHeader__tag {
            display: block;
            font-size: clamp(0.62rem, 1.8vw, 0.82rem);
            letter-spacing: 0.15em;
            max-width: 90vw;
            margin-inline: auto;
          }

          .orbCluster {
            top: 46%;
          }

          .trackHero {
            bottom: 146px;
            width: calc(100vw - 32px);
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
            border-radius: 28px;
            width: calc(100vw - 24px);
            gap: 14px;
          }

          .radioPlayer__controls {
            justify-content: center;
          }
        }

        @media (max-width: 760px) {
          .posterFrame {
            --portal-width: min(50vw, 220px);
          }

          .radioHeader {
            top: calc(var(--scene-nav-space, 60px) + 18px);
            width: 98vw;
          }

          .radioHeader__title {
            white-space: nowrap;
            font-size: clamp(1.28rem, 6.2vw, 1.78rem);
            line-height: 0.92;
            letter-spacing: 0.04em;
            margin-bottom: 6px;
            padding: 0 8px;
          }

          .radioHeader__tag {
            font-size: clamp(0.52rem, 1.9vw, 0.66rem);
            line-height: 1.2;
            letter-spacing: 0.075em;
          }

          .orbCluster {
            top: 37.5%;
            width: calc(var(--portal-width) + 82px);
            height: calc(var(--portal-height) + 82px);
          }

          .orbPhotoMask {
            width: calc(var(--portal-width) + 14px);
          }

          .orbPhotoLayer {
            inset: 10px;
          }

          .trackHero {
            top: auto;
            bottom: 210px;
            width: calc(100vw - 26px);
          }

          .trackHero__label {
            font-size: 0.96rem;
            padding: 10px 18px 11px;
            margin-bottom: 8px;
          }

          .trackHero__guest {
            font-size: 0.72rem;
            letter-spacing: 0.13em;
          }

          .trackHero__genres {
            margin-top: 6px;
            font-size: 0.56rem;
            letter-spacing: 0.09em;
          }

          .trackIndex {
            display: none;
          }

          .radioPlayer {
            bottom: 8px;
            width: calc(100vw - 18px);
            padding: 14px 10px;
            gap: 10px;
            border-radius: 22px;
          }

          .radioPlayer__bar {
            grid-template-columns: 44px 1fr 54px;
            gap: 10px;
            font-size: 0.92rem;
          }

          .radioPlayer__bar input[type='range'] {
            height: 6px;
          }

          .radioPlayer__bar input[type='range']::-webkit-slider-thumb {
            width: 16px;
            height: 16px;
          }

          .radioPlayer__controls {
            gap: 10px;
          }

          .radioPlayer__controls button {
            height: 38px;
            font-size: 0.68rem;
          }

          .radioPlayer__controls button:not(.radioPlayer__transmit),
          .radioPlayer__iconButton {
            width: 38px;
            height: 38px;
          }

          .radioPlayer__transmit {
            min-width: 172px;
            padding: 0 14px;
          }

          .radioPlayer__archive {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 38px;
            border-radius: 999px;
            border: 1px solid rgba(72, 157, 154, 0.28);
            background: rgba(106, 55, 150, 0.16);
            color: ${PINK};
            text-transform: uppercase;
            letter-spacing: 0.12em;
            font-size: 0.66rem;
            font-weight: 900;
          }

          .archiveDrawer__panel {
            top: auto;
            left: 10px;
            right: 10px;
            bottom: 10px;
            width: auto;
            height: auto;
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
            --portal-width: min(48vw, 200px);
          }

          .radioHeader {
            top: calc(var(--scene-nav-space, 60px) + 16px);
          }

          .radioHeader__title {
            font-size: clamp(1.18rem, 6vw, 1.46rem);
            letter-spacing: 0.03em;
          }

          .radioHeader__tag {
            font-size: 0.48rem;
            letter-spacing: 0.06em;
          }

          .orbCluster {
            top: 37%;
          }

          .trackHero {
            top: auto;
            bottom: 202px;
          }

          .trackHero__label {
            font-size: 0.9rem;
            padding: 9px 15px 10px;
          }

          .trackHero__guest {
            font-size: 0.66rem;
          }

          .trackHero__genres {
            font-size: 0.5rem;
          }

          .radioPlayer {
            padding: 14px 9px;
            gap: 10px;
          }

          .radioPlayer__bar {
            grid-template-columns: 42px 1fr 52px;
            font-size: 0.88rem;
          }

          .radioPlayer__controls button {
            height: 36px;
            font-size: 0.64rem;
          }

          .radioPlayer__controls button:not(.radioPlayer__transmit),
          .radioPlayer__iconButton {
            width: 36px;
            height: 36px;
          }

          .radioPlayer__transmit {
            min-width: 158px;
          }

          .radioPlayer__archive {
            height: 36px;
            font-size: 0.64rem;
          }

          .archiveDrawer__list {
            padding-right: 20px;
          }
        }
      `}</style>
    </>
  );
}

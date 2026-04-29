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
              <div className="portalTunnel" aria-hidden="true" />
              <div className="portalEdgeGlow" aria-hidden="true" />

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

                {isPlaying ? (
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
                ) : (
                  <div
                    key={currentTrack.id}
                    role="img"
                    aria-label={currentTrack.title}
                    className={`orbPhotoLayer orbPhotoLayer--current ${
                      previousIndex !== null ? 'is-glitching' : ''
                    }`}
                    style={{
                      backgroundImage: `url(${currentTrack.cover})`,
                      backgroundPosition:
                        currentTrack.objectPosition || '50% 50%',
                    }}
                  />
                )}

                <div className="portalGridOverlay" aria-hidden="true" />
                <div className="orbInnerTint" />
                <div className="orbInnerGlow" />
              </div>

              <div className="portalFrameLines" aria-hidden="true" />
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

            <aside
              className="archiveDrawer__panel"
              aria-label="Transmission archive"
            >
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
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;800;900&family=IBM+Plex+Mono:wght@400;500;700&display=swap');

        :root {
          --tent-pink: ${PINK};
          --tent-purple: ${PURPLE};
          --tent-green: ${GREEN};
          --tent-bg: #07040f;
          --tent-bg-soft: rgba(7, 4, 15, 0.52);
          --tent-panel: rgba(10, 8, 20, 0.72);
          --tent-panel-strong: rgba(10, 8, 20, 0.9);
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
            radial-gradient(circle at 28% 32%, rgba(106, 55, 150, 0.26), transparent 30%),
            radial-gradient(circle at 72% 62%, rgba(72, 157, 154, 0.18), transparent 32%),
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
          background: rgba(7, 4, 15, 0.34) !important;
          backdrop-filter: blur(16px) saturate(145%);
          -webkit-backdrop-filter: blur(16px) saturate(145%);
          border-bottom: 1px solid rgba(223, 121, 214, 0.08);
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

        .scene-nav-mobile.scene-nav--tent-radio,
        .scene-nav-mobile--tent-radio {
          background: rgba(7, 4, 15, 0.42) !important;
          backdrop-filter: blur(18px) saturate(150%);
          -webkit-backdrop-filter: blur(18px) saturate(150%);
          z-index: 10030 !important;
        }

        .scene-nav-mobile--tent-radio .scene-nav-mobile-inner {
          padding-top: 92px;
        }

        @media (max-width: 900px) {
          .scene-nav--tent-radio {
            background: rgba(7, 4, 15, 0.38) !important;
          }

          .scene-nav-mobile.scene-nav--tent-radio,
          .scene-nav-mobile--tent-radio {
            background: rgba(7, 4, 15, 0.46) !important;
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
            drop-shadow(0 0 18px rgba(72, 157, 154, 0.24))
            drop-shadow(0 0 28px rgba(106, 55, 150, 0.22));
          animation: gridPulse 6.4s ease-in-out infinite;
        }

        .posterGridTint {
          background:
            linear-gradient(
              125deg,
              rgba(72, 157, 154, 0.26) 0%,
              rgba(72, 157, 154, 0.08) 22%,
              rgba(106, 55, 150, 0.2) 48%,
              rgba(223, 121, 214, 0.14) 70%,
              rgba(72, 157, 154, 0.14) 100%
            );
          mix-blend-mode: screen;
          opacity: 0.92;
        }

        .posterGridGlow {
          background:
            radial-gradient(circle at 28% 34%, rgba(106, 55, 150, 0.34), transparent 32%),
            radial-gradient(circle at 66% 58%, rgba(72, 157, 154, 0.26), transparent 28%),
            radial-gradient(circle at 50% 22%, rgba(223, 121, 214, 0.18), transparent 26%);
          filter: blur(54px);
          opacity: 0.85;
          mix-blend-mode: screen;
        }

        .posterGridSweep {
          opacity: 0;
          background: linear-gradient(
            180deg,
            transparent 0%,
            transparent 34%,
            rgba(72, 157, 154, 0.04) 40%,
            rgba(72, 157, 154, 0.14) 46%,
            rgba(223, 121, 214, 0.22) 50%,
            rgba(72, 157, 154, 0.14) 54%,
            rgba(72, 157, 154, 0.04) 60%,
            transparent 66%,
            transparent 100%
          );
          mix-blend-mode: screen;
          filter: blur(18px);
          transform: translateY(-130%);
          animation: gridSweepVertical 12s linear infinite;
        }

        .posterVignette {
          background:
            radial-gradient(circle at center, transparent 34%, rgba(7, 4, 15, 0.2) 60%, rgba(7, 4, 15, 0.84) 100%),
            linear-gradient(180deg, rgba(7, 4, 15, 0.06), rgba(7, 4, 15, 0.46));
        }

        .posterNoise {
          opacity: 0.08;
          background-image:
            radial-gradient(circle at 8% 16%, rgba(255, 255, 255, 0.8) 0 1px, transparent 1.4px),
            radial-gradient(circle at 76% 22%, rgba(255, 255, 255, 0.6) 0 1px, transparent 1.4px),
            radial-gradient(circle at 86% 72%, rgba(255, 255, 255, 0.42) 0 1px, transparent 1.4px),
            radial-gradient(circle at 28% 80%, rgba(255, 255, 255, 0.34) 0 1px, transparent 1.4px);
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
          top: calc(var(--scene-nav-space, 60px) + 10px);
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
            0 0 10px rgba(223, 121, 214, 0.36),
            0 0 26px rgba(223, 121, 214, 0.22),
            0 0 54px rgba(106, 55, 150, 0.34);
        }

        .radioHeader__tag {
          margin: 0;
          color: ${GREEN};
          font-size: clamp(0.58rem, 0.88vw, 0.92rem);
          font-weight: 800;
          letter-spacing: 0.22em;
          text-shadow:
            0 0 8px rgba(72, 157, 154, 0.36),
            0 0 18px rgba(106, 55, 150, 0.22);
        }

        .orbCluster {
          position: absolute;
          left: 50%;
          top: 47%;
          width: calc(var(--portal-width) + 110px);
          height: calc(var(--portal-height) + 110px);
          transform: translate(-50%, -50%);
          z-index: 7;
          pointer-events: none;
        }

        .portalTunnel {
          position: absolute;
          inset: 10px;
          border-radius: 28px;
          background:
            linear-gradient(
              135deg,
              rgba(72, 157, 154, 0.06),
              rgba(106, 55, 150, 0.1) 45%,
              rgba(223, 121, 214, 0.08)
            );
          filter: blur(28px);
          opacity: 0.74;
          z-index: 1;
        }

        .orbBloomBack {
          position: absolute;
          inset: 8%;
          border-radius: 30px;
          background:
            radial-gradient(
              ellipse at center,
              rgba(223, 121, 214, 0.24) 0%,
              rgba(106, 55, 150, 0.24) 35%,
              rgba(72, 157, 154, 0.2) 56%,
              rgba(72, 157, 154, 0) 78%
            );
          filter: blur(58px);
          transform: scale(1.02);
          opacity: 0.76;
          animation: orbPulse 2.8s ease-in-out infinite;
          z-index: 1;
        }

        .portalEdgeGlow {
          position: absolute;
          left: 50%;
          top: 50%;
          width: calc(var(--portal-width) + 22px);
          height: calc(var(--portal-height) + 22px);
          transform: translate(-50%, -50%);
          border-radius: 28px;
          background:
            linear-gradient(
              135deg,
              rgba(223, 121, 214, 0.12),
              rgba(106, 55, 150, 0.08),
              rgba(72, 157, 154, 0.1)
            );
          box-shadow:
            0 0 20px rgba(223, 121, 214, 0.24),
            0 0 50px rgba(106, 55, 150, 0.24),
            0 0 70px rgba(72, 157, 154, 0.16);
          opacity: 0.9;
          z-index: 2;
          animation: edgePulse 2.8s ease-in-out infinite;
        }

        .orbPhotoMask {
          position: absolute;
          left: 50%;
          top: 50%;
          width: var(--portal-width);
          height: var(--portal-height);
          transform: translate3d(-50%, -50%, 0);
          border-radius: 24px;
          overflow: hidden;
          isolation: isolate;
          contain: paint;
          background:
            linear-gradient(
              180deg,
              rgba(106, 55, 150, 0.18),
              rgba(72, 157, 154, 0.08)
            ),
            rgba(7, 4, 15, 0.86);
          box-shadow:
            inset 0 0 0 1px rgba(223, 121, 214, 0.14),
            inset 0 0 50px rgba(106, 55, 150, 0.14),
            inset 0 0 120px rgba(72, 157, 154, 0.12),
            0 0 18px rgba(223, 121, 214, 0.18),
            0 0 54px rgba(106, 55, 150, 0.18);
          z-index: 3;
          animation: portalPulse 2.8s ease-in-out infinite;
        }

        .orbPhotoLayer {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-repeat: no-repeat;
          filter: contrast(1.06) brightness(0.88) saturate(0.9);
          transform: translateZ(0);
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
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(8px, 1vw, 14px);
          background:
            linear-gradient(
              180deg,
              rgba(10, 8, 20, 0.92),
              rgba(7, 4, 15, 0.82)
            );
        }

        .orbWave span {
          width: clamp(8px, 0.8vw, 12px);
          height: 22%;
          border-radius: 999px;
          background: ${PINK};
          box-shadow:
            0 0 12px rgba(223, 121, 214, 0.8),
            0 0 28px rgba(106, 55, 150, 0.6);
          animation: waveDance 900ms ease-in-out infinite;
        }

        .orbWave span:nth-child(1),
        .orbWave span:nth-child(9) {
          height: 34%;
        }

        .orbWave span:nth-child(2),
        .orbWave span:nth-child(8) {
          animation-delay: 80ms;
          height: 26%;
        }

        .orbWave span:nth-child(3),
        .orbWave span:nth-child(7) {
          animation-delay: 160ms;
          height: 20%;
        }

        .orbWave span:nth-child(4),
        .orbWave span:nth-child(6) {
          animation-delay: 240ms;
          height: 24%;
        }

        .orbWave span:nth-child(5) {
          animation-delay: 320ms;
          height: 22%;
        }

        .portalGridOverlay,
        .orbInnerTint,
        .orbInnerGlow,
        .portalFrameLines {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .portalGridOverlay {
          background-image:
            linear-gradient(rgba(223, 121, 214, 0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(72, 157, 154, 0.12) 1px, transparent 1px);
          background-size: 30px 30px;
          mix-blend-mode: screen;
          opacity: 0.18;
        }

        .orbInnerTint {
          background:
            radial-gradient(circle at 50% 50%, rgba(223, 121, 214, 0.04), rgba(106, 55, 150, 0.08) 54%, rgba(72, 157, 154, 0.12) 78%, rgba(72, 157, 154, 0.2) 100%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 18%, transparent 68%, rgba(0, 0, 0, 0.16) 100%);
          mix-blend-mode: screen;
        }

        .orbInnerGlow {
          border-radius: 24px;
          box-shadow:
            inset 0 0 40px rgba(223, 121, 214, 0.12),
            inset 0 0 120px rgba(106, 55, 150, 0.12),
            inset 0 0 190px rgba(72, 157, 154, 0.08);
        }

        .portalFrameLines {
          left: 50%;
          top: 50%;
          width: var(--portal-width);
          height: var(--portal-height);
          transform: translate(-50%, -50%);
          border-radius: 24px;
          border: 1px solid rgba(223, 121, 214, 0.22);
          z-index: 4;
        }

        .portalFrameLines::before,
        .portalFrameLines::after {
          content: '';
          position: absolute;
          border-radius: 18px;
          pointer-events: none;
        }

        .portalFrameLines::before {
          inset: 14px;
          border: 1px solid rgba(106, 55, 150, 0.18);
        }

        .portalFrameLines::after {
          inset: 28px;
          border: 1px solid rgba(72, 157, 154, 0.16);
        }

        .trackHero {
          position: absolute;
          left: 50%;
          bottom: 126px;
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
            0 0 8px rgba(223, 121, 214, 0.52),
            0 0 20px rgba(106, 55, 150, 0.38);
          box-shadow:
            0 0 18px rgba(106, 55, 150, 0.14),
            inset 0 0 18px rgba(72, 157, 154, 0.08);
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
          text-shadow: 0 0 8px rgba(72, 157, 154, 0.34);
        }

        .trackHero__genres {
          margin-top: 8px;
          color: ${PINK};
          font-weight: 700;
          letter-spacing: 0.16em;
          font-size: clamp(0.54rem, 0.72vw, 0.72rem);
          opacity: 0.92;
          text-shadow: 0 0 10px rgba(223, 121, 214, 0.22);
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
            0 0 24px rgba(106, 55, 150, 0.2),
            inset 0 0 22px rgba(72, 157, 154, 0.06);
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
            linear-gradient(90deg, rgba(72, 157, 154, 0.92), rgba(223, 121, 214, 0.88)),
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
          text-shadow: 0 0 10px rgba(223, 121, 214, 0.4);
          box-shadow: inset 0 0 14px rgba(106, 55, 150, 0.08);
        }

        .radioPlayer__controls button:not(.radioPlayer__transmit) {
          width: 42px;
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
            linear-gradient(180deg, rgba(106, 55, 150, 0.14), rgba(10, 8, 20, 0.88) 36%),
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
          box-shadow: 0 0 16px rgba(223, 121, 214, 0.12);
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
          text-shadow: 0 0 10px rgba(223, 121, 214, 0.34);
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
          top: 18px;
          right: 18px;
          bottom: 18px;
          width: min(460px, calc(100vw - 36px));
          display: flex;
          flex-direction: column;
          padding: 20px;
          border-radius: 30px;
          border: 1px solid rgba(72, 157, 154, 0.24);
          background:
            linear-gradient(180deg, rgba(106, 55, 150, 0.18), rgba(10, 8, 20, 0.94) 34%),
            rgba(10, 8, 20, 0.94);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          box-shadow:
            0 0 32px rgba(106, 55, 150, 0.2),
            inset 0 0 24px rgba(72, 157, 154, 0.06);
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
          line-height: 1;
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

        @keyframes waveDance {
          0%,
          100% {
            transform: scaleY(0.5);
            opacity: 0.5;
          }
          50% {
            transform: scaleY(1.45);
            opacity: 1;
          }
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
          62% {
            opacity: 0;
            transform: translateY(-130%);
          }
          66% {
            opacity: 0.14;
          }
          78% {
            opacity: 0.34;
            transform: translateY(18%);
          }
          88% {
            opacity: 0.1;
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
            transform: scale(0.96);
            opacity: 0.58;
            filter: blur(48px) brightness(0.94);
          }
          50% {
            transform: scale(1.08);
            opacity: 0.92;
            filter: blur(64px) brightness(1.08);
          }
        }

        @keyframes edgePulse {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.72;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.035);
            opacity: 1;
          }
        }

        @keyframes portalPulse {
          0%,
          100% {
            box-shadow:
              inset 0 0 0 1px rgba(223, 121, 214, 0.14),
              inset 0 0 50px rgba(106, 55, 150, 0.14),
              inset 0 0 120px rgba(72, 157, 154, 0.12),
              0 0 18px rgba(223, 121, 214, 0.18),
              0 0 54px rgba(106, 55, 150, 0.18);
          }
          50% {
            box-shadow:
              inset 0 0 0 1px rgba(223, 121, 214, 0.22),
              inset 0 0 72px rgba(106, 55, 150, 0.22),
              inset 0 0 160px rgba(72, 157, 154, 0.16),
              0 0 28px rgba(223, 121, 214, 0.28),
              0 0 74px rgba(106, 55, 150, 0.24),
              0 0 104px rgba(72, 157, 154, 0.14);
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
            --portal-width: min(34vw, 290px);
          }

          .radioHeader {
            top: calc(var(--scene-nav-space, 60px) + 8px);
          }

          .radioHeader__title {
            font-size: clamp(1.7rem, 6vw, 3rem);
            white-space: normal;
            max-width: 92vw;
          }

          .radioHeader__tag {
            display: block;
            font-size: clamp(0.52rem, 1.8vw, 0.74rem);
            letter-spacing: 0.16em;
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
            --portal-width: min(42vw, 220px);
          }

          .radioHeader {
            top: calc(var(--scene-nav-space, 60px) + 4px);
          }

          .radioHeader__title {
            font-size: clamp(1.5rem, 8.2vw, 2.3rem);
            line-height: 0.92;
            margin-bottom: 4px;
          }

          .radioHeader__tag {
            font-size: 0.48rem;
            line-height: 1.25;
            letter-spacing: 0.1em;
          }

          .orbCluster {
            top: 42%;
            width: calc(var(--portal-width) + 76px);
            height: calc(var(--portal-height) + 76px);
          }

          .trackHero {
            bottom: 168px;
          }

          .trackHero__label {
            font-size: 0.96rem;
            padding: 9px 16px 10px;
            margin-bottom: 8px;
          }

          .trackHero__guest {
            font-size: 0.62rem;
            letter-spacing: 0.16em;
          }

          .trackHero__genres {
            font-size: 0.5rem;
            letter-spacing: 0.1em;
          }

          .trackIndex {
            display: none;
          }

          .radioPlayer {
            padding: 14px 12px 16px;
            bottom: 10px;
          }

          .radioPlayer__bar {
            grid-template-columns: 42px 1fr 42px;
          }

          .radioPlayer__transmit {
            min-width: 176px;
            font-size: 0.66rem;
          }

          .radioPlayer__archive {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 42px;
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
            --portal-width: min(48vw, 185px);
          }

          .radioHeader__title {
            font-size: clamp(1.3rem, 8vw, 1.9rem);
          }

          .radioHeader__tag {
            font-size: 0.44rem;
            letter-spacing: 0.08em;
          }

          .orbCluster {
            top: 40%;
          }

          .trackHero {
            bottom: 172px;
          }

          .trackHero__label {
            font-size: 0.84rem;
          }

          .trackHero__guest {
            font-size: 0.56rem;
          }

          .trackHero__genres {
            font-size: 0.44rem;
          }

          .radioPlayer__controls button:not(.radioPlayer__transmit) {
            width: 40px;
          }

          .radioPlayer__transmit {
            min-width: 156px;
          }

          .archiveDrawer__list {
            padding-right: 20px;
          }
        }
      `}</style>
    </>
  );
}

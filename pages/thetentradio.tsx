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
const ORB_OVERLAY = `${IMAGE_BASE}/circle-orb-overlay.png`;
const ACCENT = '#348159';
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
          <div className="posterSky" style={{ backgroundImage: `url(${STAR_BG})` }} />
          <img src={GRID_BG} alt="" aria-hidden="true" className="posterGrid" />
          <div className="posterGridSweep" aria-hidden="true" />
          <div className="posterVignette" />
          <div className="posterNoise" />

          <section className="posterFrame" aria-live="polite">
            <header className="radioHeader">
              <h1 className="radioHeader__title">The Tent Radio</h1>
              <p className="radioHeader__tag">Transmissions from the end of the universe</p>
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
                      backgroundPosition: TRACKS[previousIndex].objectPosition || '50% 50%',
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
                      backgroundPosition: currentTrack.objectPosition || '50% 50%',
                    }}
                  />
                )}

                <div className="orbInnerTint" />
                <div className="orbInnerGlow" />
              </div>

              <img src={ORB_OVERLAY} alt="" aria-hidden="true" className="orbOverlay orbOverlay--main" />
            </div>

            <div className="trackHero">
              <p className="trackHero__label">{currentTrack.episodeLabel}</p>
              <p className="trackHero__guest">{currentTrack.guest || currentTrack.artist}</p>
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
                  className={`trackIndex__item ${index === activeIndex ? 'is-active' : ''}`}
                  onClick={() => changeTrack(index)}
                >
                  <span className="trackIndex__number">{String(index + 1).padStart(2, '0')}</span>
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

          <div className={`archiveDrawer ${isArchiveOpen ? 'is-open' : ''}`} aria-hidden={!isArchiveOpen}>
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
                      className={`archiveDrawer__item ${index === activeIndex ? 'is-active' : ''}`}
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
          scrollbar-color: #348159 rgba(0, 0, 0, 0.35);
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
          background: #348159;
          border-radius: 999px;
          box-shadow: 0 0 10px rgba(52, 129, 89, 0.8);
        }

        *::-webkit-scrollbar-thumb:hover {
          background: #46a66f;
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
            
            .posterPage--with-scene-nav .posterStage {
              top: 60px !important;
            }
            
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
              background: rgba(0, 0, 0, 0.72) !important;
              z-index: 10040 !important;
            }
            
            .scene-nav--tent-radio,
            .scene-nav--tent-radio a,
            .scene-nav-mobile--tent-radio,
            .scene-nav-mobile--tent-radio a {
              color: #348159 !important;
              font-family: 'Orbitron', 'IBM Plex Mono', monospace !important;
            }
            
            .scene-nav--tent-radio a.active,
            .scene-nav-mobile--tent-radio a.active {
              color: #ffffff !important;
            }
            
            .scene-nav--tent-radio a.disabled,
            .scene-nav-mobile--tent-radio a.disabled {
              color: #348159 !important;
              opacity: 0.45;
            }
            
            .scene-nav--tent-radio .scene-nav-burger span {
              background: #348159 !important;
            }
            
            .scene-nav--tent-radio .scene-nav-logo img {
              filter: brightness(0) saturate(100%) invert(42%) sepia(18%)
                saturate(1082%) hue-rotate(93deg) brightness(89%) contrast(86%);
            }
            
            .scene-nav-mobile.scene-nav--tent-radio,
            .scene-nav-mobile--tent-radio {
              background: rgba(0, 0, 0, 0.74) !important;
              z-index: 10030 !important;
            }
            
            @media (max-width: 900px) {
              .posterPage--with-scene-nav .posterStage {
                top: 60px !important;
              }
            
              .scene-nav--tent-radio {
                background: rgba(0, 0, 0, 0.72) !important;
                z-index: 10040 !important;
              }
            
              .scene-nav-burger,
              .scene-nav-logo {
                z-index: 10050 !important;
              }
            
              .scene-nav-mobile.scene-nav--tent-radio,
              .scene-nav-mobile--tent-radio {
                background: rgba(0, 0, 0, 0.76) !important;
                z-index: 10030 !important;
              }
            
              .scene-nav-mobile--tent-radio .scene-nav-mobile-inner {
                padding-top: 96px;
              }
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
            radial-gradient(circle at center, transparent 30%, rgba(4, 7, 7, 0.18) 58%, rgba(4, 7, 7, 0.82) 100%),
            linear-gradient(180deg, rgba(4, 7, 7, 0.08), rgba(4, 7, 7, 0.5));
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

        .posterFrame {
          --core-size: min(36vw, 470px);
          --orb-shell-size: calc(var(--core-size) + clamp(116px, 11vw, 158px));
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
          top: clamp(0px, 2.4vh, 28px);
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
          margin: 0 0 8px;
          padding: 0 22px;
          color: #f2efe6;
          font-family: 'Orbitron', 'IBM Plex Mono', monospace;
          font-size: clamp(2.25rem, 4.9vw, 4.9rem);
          font-weight: 900;
          letter-spacing: 0.08em;
          line-height: 0.95;
          text-shadow:
            0 0 10px rgba(255, 255, 255, 0.18),
            0 0 24px rgba(255, 255, 255, 0.24),
            0 0 44px rgba(52, 129, 89, 0.52);
        }

        .radioHeader__title::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -8px;
          height: 12px;
          border-radius: 999px;
          background: radial-gradient(ellipse at center, rgba(52, 129, 89, 0.32), transparent 70%);
          filter: blur(8px);
        }

        .radioHeader__tag {
          margin: 0;
          color: #f2efe6;
          font-size: clamp(0.72rem, 0.9vw, 1rem);
          font-weight: 900;
          letter-spacing: 0.24em;
          text-shadow:
            0 0 8px rgba(255, 255, 255, 0.42),
            0 0 20px rgba(255, 255, 255, 0.24),
            0 0 32px rgba(52, 129, 89, 0.52);
        }

        .orbCluster {
          position: relative;
          width: min(var(--orb-shell-size), calc(100vw - 24px));
          aspect-ratio: 1 / 1;
          z-index: 7;
          display: grid;
          place-items: center;
          pointer-events: none;
          transform: translateY(-18px);
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
            radial-gradient(circle, rgba(52, 129, 89, 0.22), rgba(0, 0, 0, 0.4) 62%, rgba(0, 0, 0, 0.72));
        }

        .orbWave span {
          width: clamp(7px, 0.8vw, 12px);
          height: 28%;
          border-radius: 999px;
          background: #f4f0e8;
          box-shadow:
            0 0 12px rgba(255, 255, 255, 0.8),
            0 0 28px rgba(52, 129, 89, 0.8);
          animation: waveDance 900ms ease-in-out infinite;
        }

        .orbWave span:nth-child(2) { animation-delay: 80ms; }
        .orbWave span:nth-child(3) { animation-delay: 160ms; }
        .orbWave span:nth-child(4) { animation-delay: 240ms; }
        .orbWave span:nth-child(5) { animation-delay: 320ms; }
        .orbWave span:nth-child(6) { animation-delay: 240ms; }
        .orbWave span:nth-child(7) { animation-delay: 160ms; }
        .orbWave span:nth-child(8) { animation-delay: 80ms; }

        .orbInnerTint,
        .orbInnerGlow,
        .orbOverlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .orbInnerTint {
          background:
            radial-gradient(circle at 50% 50%, rgba(52, 129, 89, 0.04), rgba(52, 129, 89, 0.08) 54%, rgba(52, 129, 89, 0.18) 78%, rgba(52, 129, 89, 0.3) 100%),
            linear-gradient(180deg, rgba(125, 225, 180, 0.08), transparent 18%, transparent 68%, rgba(0, 0, 0, 0.18) 100%);
          mix-blend-mode: screen;
        }

        .orbInnerGlow {
          border-radius: 999px;
          box-shadow:
            inset 0 0 52px rgba(126, 228, 183, 0.22),
            inset 0 0 140px rgba(52, 129, 89, 0.22),
            inset 0 0 220px rgba(52, 129, 89, 0.12);
        }

        .orbOverlay {
          width: 100%;
          height: 100%;
          object-fit: contain;
          opacity: 0.96;
          mix-blend-mode: screen;
          animation: orbPulseSoft 2.8s ease-in-out infinite;
        }

        .trackHero {
          position: absolute;
          left: 50%;
          top: calc(50% + (var(--core-size) / 2) + 18px);
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
          padding: 12px 26px 13px;
          border-radius: 999px;
          border: 1px solid rgba(52, 129, 89, 0.48);
          background: rgba(0, 0, 0, 0.74);
          color: ${ACCENT};
          font-family: 'Orbitron', 'IBM Plex Mono', monospace;
          font-size: clamp(1.3rem, 2.2vw, 2.1rem);
          font-weight: 900;
          letter-spacing: 0.06em;
          text-shadow: 0 0 8px rgba(52, 129, 89, 0.5), 0 0 28px rgba(52, 129, 89, 0.45);
          box-shadow:
            0 0 16px rgba(52, 129, 89, 0.14),
            inset 0 0 18px rgba(52, 129, 89, 0.08);
        }

        .trackHero__guest,
        .trackHero__genres {
          margin: 0;
          color: #f4f0e8;
          font-weight: 800;
          letter-spacing: 0.14em;
          line-height: 1.35;
          text-shadow:
            0 0 8px rgba(255, 255, 255, 0.5),
            0 0 18px rgba(52, 129, 89, 0.3);
        }

        .trackHero__guest {
          font-size: clamp(0.76rem, 0.95vw, 0.95rem);
        }

        .trackHero__genres {
          margin-top: 6px;
          font-size: clamp(0.64rem, 0.78vw, 0.78rem);
          opacity: 0.88;
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
          border: 1px solid rgba(52, 129, 89, 0.42);
          background:
            linear-gradient(90deg, rgba(52, 129, 89, 0.08), transparent 24%, transparent 76%, rgba(52, 129, 89, 0.08)),
            rgba(0, 0, 0, 0.84);
          backdrop-filter: blur(14px);
          box-shadow:
            0 0 22px rgba(52, 129, 89, 0.18),
            inset 0 0 24px rgba(52, 129, 89, 0.08);
        }

        .radioPlayer__bar {
          display: grid;
          grid-template-columns: 58px minmax(280px, 1fr) 58px;
          gap: 14px;
          align-items: center;
          color: rgba(244, 240, 232, 0.78);
          font-size: 0.78rem;
          font-weight: 700;
          font-variant-numeric: tabular-nums;
        }

        .radioPlayer__bar input[type='range'] {
          appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 999px;
          background:
            linear-gradient(90deg, rgba(52, 129, 89, 0.9), rgba(126, 228, 183, 0.38)),
            rgba(52, 129, 89, 0.26);
          outline: none;
        }

        .radioPlayer__bar input[type='range']::-webkit-slider-thumb {
          appearance: none;
          width: 17px;
          height: 17px;
          border-radius: 50%;
          background: #f4f0e8;
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
          border: 1px solid rgba(52, 129, 89, 0.48);
          background: rgba(0, 0, 0, 0.58);
          color: ${ACCENT};
          text-transform: uppercase;
          font-size: 0.76rem;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-shadow: 0 0 10px rgba(52, 129, 89, 0.65);
          box-shadow: inset 0 0 14px rgba(52, 129, 89, 0.08);
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
          border: 1px solid rgba(52, 129, 89, 0.32);
          background: rgba(0, 0, 0, 0.44);
          backdrop-filter: blur(12px);
          box-shadow:
            0 0 18px rgba(52, 129, 89, 0.12),
            inset 0 0 18px rgba(52, 129, 89, 0.05);
        }

        .trackIndex__label {
          margin: 0 0 12px;
          color: rgba(244, 240, 232, 0.62);
          text-transform: uppercase;
          letter-spacing: 0.16em;
          font-size: 0.68rem;
          font-weight: 800;
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
          color: rgba(244, 240, 232, 0.54);
          text-align: left;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-size: 0.68rem;
          font-weight: 800;
        }

        .trackIndex__item.is-active {
          border-color: rgba(52, 129, 89, 0.54);
          background: rgba(52, 129, 89, 0.14);
          color: ${ACCENT};
          box-shadow: 0 0 16px rgba(52, 129, 89, 0.18);
        }

        .trackIndex__number {
          color: rgba(244, 240, 232, 0.42);
        }

        .trackIndex__title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .trackIndex__item.is-active .trackIndex__number {
          color: #f4f0e8;
        }

        .trackIndex__archive {
          width: 100%;
          margin-top: 12px;
          padding: 10px 12px;
          border-radius: 999px;
          border: 1px solid rgba(52, 129, 89, 0.46);
          background: rgba(52, 129, 89, 0.1);
          color: ${ACCENT};
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-size: 0.64rem;
          font-weight: 900;
          text-shadow: 0 0 10px rgba(52, 129, 89, 0.56);
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
          top: 18px;
          right: 18px;
          bottom: 18px;
          width: min(460px, calc(100vw - 36px));
          display: flex;
          flex-direction: column;
          padding: 20px;
          border-radius: 30px;
          border: 1px solid rgba(52, 129, 89, 0.42);
          background:
            linear-gradient(180deg, rgba(52, 129, 89, 0.12), transparent 34%),
            rgba(0, 0, 0, 0.88);
          backdrop-filter: blur(18px);
          box-shadow:
            0 0 32px rgba(52, 129, 89, 0.22),
            inset 0 0 24px rgba(52, 129, 89, 0.08);
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
          color: ${ACCENT};
          text-transform: uppercase;
          letter-spacing: 0.16em;
          font-size: 0.68rem;
          font-weight: 900;
        }

        .archiveDrawer__header h2 {
          margin: 0;
          color: #f2efe6;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-family: 'Orbitron', 'IBM Plex Mono', monospace;
          font-size: 1.5rem;
        }

        .archiveDrawer__close {
          padding: 9px 12px;
          border-radius: 999px;
          border: 1px solid rgba(52, 129, 89, 0.42);
          color: ${ACCENT};
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
          border: 1px solid rgba(52, 129, 89, 0.38);
          outline: none;
          background: rgba(0, 0, 0, 0.56);
          color: #f2efe6;
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
          border: 1px solid rgba(52, 129, 89, 0.42);
          color: #348159;
          font-size: 1rem;
          font-weight: 900;
          line-height: 1;
        }

        .archiveDrawer__search::placeholder {
          color: rgba(244, 240, 232, 0.42);
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
          border: 1px solid rgba(52, 129, 89, 0.16);
          background: rgba(0, 0, 0, 0.28);
          color: rgba(244, 240, 232, 0.72);
          text-align: left;
        }

        .archiveDrawer__item.is-active {
          border-color: rgba(52, 129, 89, 0.58);
          background: rgba(52, 129, 89, 0.14);
          color: #f2efe6;
        }

        .archiveDrawer__number {
          color: ${ACCENT};
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
          color: rgba(244, 240, 232, 0.54);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-size: 0.62rem;
        }

        .archiveDrawer__status {
          color: ${ACCENT};
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.62rem;
          font-weight: 900;
        }

        @keyframes waveDance {
          0%, 100% {
            transform: scaleY(0.32);
            opacity: 0.45;
          }
          50% {
            transform: scaleY(1.45);
            opacity: 1;
          }
        }

        @keyframes playerDotPulse {
          0%, 100% {
            box-shadow:
              0 0 0 0 rgba(244, 240, 232, 0.32),
              0 0 16px rgba(52, 129, 89, 0.8);
          }
          50% {
            box-shadow:
              0 0 0 10px rgba(244, 240, 232, 0),
              0 0 28px rgba(52, 129, 89, 1);
          }
        }

        @keyframes gridPulse {
          0%, 100% { opacity: 0.75; }
          50% { opacity: 0.84; }
        }

        @keyframes gridSweepVertical {
          0%, 62% {
            opacity: 0;
            transform: translateY(-130%);
          }
          66% { opacity: 0.14; }
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
          0%, 100% {
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
          0%, 100% {
            transform: scale(0.992);
            opacity: 0.82;
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
          }
        }

        @keyframes orbCorePulse {
          0%, 100% {
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
            --core-size: min(48vw, 440px);
          }

          .trackIndex {
            right: 16px;
            width: 190px;
          }
        }

        @media (max-width: 980px) {
          .posterFrame {
            --core-size: min(58vw, 390px);
          }

          .radioHeader {
            top: 22px;
          }

          .radioHeader__title {
            font-size: clamp(2rem, 8vw, 4rem);
            white-space: normal;
            max-width: 92vw;
          }

          .radioHeader__tag {
            display: block;
            font-size: clamp(0.58rem, 2vw, 0.78rem);
            letter-spacing: 0.16em;
            max-width: 88vw;
            margin-inline: auto;
          }

          .trackHero {
            top: calc(50% + (var(--core-size) / 2) + 14px);
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
            --core-size: min(62vw, 320px);
          }

          .orbCluster {
            transform: translateY(-30px);
          }

          .radioHeader {
            top: 18px;
          }

          .radioHeader__title {
            font-size: clamp(2rem, 11vw, 3.4rem);
            line-height: 0.9;
          }

          .radioHeader__tag {
            display: block;
            font-size: 0.58rem;
            line-height: 1.35;
            letter-spacing: 0.12em;
          }

          .trackHero {
            top: calc(50% + (var(--core-size) / 2) - 4px);
          }

          .trackHero__label {
            font-size: 0.95rem;
            padding: 9px 16px;
            margin-bottom: 7px;
          }

          .trackHero__guest {
            font-size: 0.68rem;
          }

          .trackHero__genres {
            font-size: 0.54rem;
            letter-spacing: 0.08em;
          }

          .trackIndex {
            display: none;
          }

          .radioPlayer {
            padding: 12px;
          }

          .radioPlayer__bar {
            grid-template-columns: 40px 1fr 40px;
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
            border: 1px solid rgba(52, 129, 89, 0.46);
            background: rgba(52, 129, 89, 0.1);
            color: ${ACCENT};
            text-transform: uppercase;
            letter-spacing: 0.12em;
            font-size: 0.68rem;
            font-weight: 900;
            text-shadow: 0 0 10px rgba(52, 129, 89, 0.56);
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
            --core-size: min(58vw, 270px);
          }

          .orbCluster {
            transform: translateY(-38px);
          }

          .trackHero {
            top: calc(50% + (var(--core-size) / 2) - 10px);
          }

          .radioPlayer__controls button:not(.radioPlayer__transmit) {
            width: 40px;
          }

          .radioPlayer__transmit {
            min-width: 160px;
          }
        }

        @media (max-width: 760px) {
          .radioPlayer {
            gap: 12px;
          }

          .radioHeader__title {
            white-space: nowrap;
            font-size: clamp(1.45rem, 8.4vw, 2.25rem);
            letter-spacing: 0.05em;
          }

          .radioHeader__tag {
            font-size: 0.5rem;
            letter-spacing: 0.09em;
          }

          .orbCluster {
            transform: translateY(-66px);
          }

          .trackHero {
            top: calc(50% + (var(--core-size) / 2) - 42px);
          }
        }

        @media (max-width: 430px) {
          .radioHeader__title {
            font-size: clamp(1.35rem, 8vw, 1.95rem);
          }

          .orbCluster {
            transform: translateY(-74px);
          }

          .trackHero {
            top: calc(50% + (var(--core-size) / 2) - 54px);
          }
        }

        @media (max-width: 760px) {
          .archiveDrawer__list {
            padding-right: 18px;
          }

          .radioPlayer {
            padding-top: 24px;
            padding-bottom: 24px;
          }

          .orbCluster {
            transform: translateY(-96px);
          }

          .trackHero {
            top: calc(50% + (var(--core-size) / 2) - 72px);
          }
        }

        @media (max-width: 430px) {
          .archiveDrawer__list {
            padding-right: 20px;
          }

          .orbCluster {
            transform: translateY(-104px);
          }

          .trackHero {
            top: calc(50% + (var(--core-size) / 2) - 54px);
          }
        }
      `}</style>
    </>
  );
}

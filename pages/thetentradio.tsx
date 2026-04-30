// pages/thetentradio.tsx

import React, { useEffect, useMemo, useRef, useState } from "react";
import SceneNav from "../components/SceneNav";

type Track = {
  id: string;
  episodeLabel: string;
  title: string;
  artist: string;
  guest?: string;
  src: string;
  cover: string;
  genres?: string[];
};

const DEFAULT_GENRES = ["Balearic", "World", "Downtempo", "Electronica"];

const BASE_TRACKS: Track[] = [
  {
    id: "40",
    episodeLabel: "THE TENT 40",
    title: "The Tent 40",
    artist: "OpenLab",
    guest: "With Alia Indigo",
    src: "/audio/tent-semoa.mp3",
    cover: "/covers/Openlab_Apr.png",
    genres: DEFAULT_GENRES,
  },
  {
    id: "39",
    episodeLabel: "THE TENT 39",
    title: "The Tent 39",
    artist: "OpenLab",
    guest: "With sEmoa",
    src: "/audio/tent-semoa.mp3",
    cover: "/covers/Openlab_Apr.png",
    genres: DEFAULT_GENRES,
  },
  {
    id: "38",
    episodeLabel: "THE TENT 38",
    title: "The Tent 38",
    artist: "OpenLab",
    guest: "With Bugsy",
    src: "/audio/tent-semoa.mp3",
    cover: "/covers/Openlab_Apr.png",
    genres: DEFAULT_GENRES,
  },
  // add the rest of your tracks here
];

const WAVE_BARS = [0.48, 0.72, 0.94, 0.76, 0.56, 0.4, 0.56, 0.76, 0.94, 0.72, 0.48];

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function TentRadioPage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [tracks] = useState<Track[]>(BASE_TRACKS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentTrack = tracks[currentIndex];

  const filteredTracks = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return tracks;
    return tracks.filter((track) =>
      [track.episodeLabel, track.title, track.artist, track.guest]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [tracks, search]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = currentTrack.src;
    audio.load();
    setCurrentTime(0);
    setDuration(0);

    if (isPlaying) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [currentTrack, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoaded = () => setDuration(audio.duration || 0);
    const handleTime = () => setCurrentTime(audio.currentTime || 0);
    const handleEnded = () => {
      setCurrentIndex((prev) => (prev + 1) % tracks.length);
    };

    audio.addEventListener("loadedmetadata", handleLoaded);
    audio.addEventListener("timeupdate", handleTime);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoaded);
      audio.removeEventListener("timeupdate", handleTime);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [tracks.length]);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % tracks.length);
  };

  const handleSeek = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setCurrentTime(value);
  };

  const selectTrack = (trackId: string) => {
    const idx = tracks.findIndex((t) => t.id === trackId);
    if (idx >= 0) {
      setCurrentIndex(idx);
      setArchiveOpen(false);
    }
  };

  return (
    <>
      <SceneNav visible theme="tent-radio" />

      <main className="tentRadioPage">
        <div className="posterStars" aria-hidden="true" />
        <div className="posterGrid" aria-hidden="true" />

        <section className="posterFrame" aria-label="The Tent Radio player">
          <header className="radioHeader">
            <h1 className="radioHeader__title">THE TENT RADIO</h1>
            <p className="radioHeader__tag">TRANSMISSIONS FROM THE END OF THE UNIVERSE</p>
          </header>

          <div className="orbCluster">
            <div className="orbPhotoMask">
              <div
                className="orbPhotoBackdrop"
                style={{ backgroundImage: `url(${currentTrack.cover})` }}
              />
              <img
                className="orbPhoto"
                src={currentTrack.cover}
                alt={currentTrack.title}
                loading="eager"
              />

              {isPlaying && (
                <div className="orbWave" aria-hidden="true">
                  <div className="orbWave__inner">
                    {WAVE_BARS.map((h, i) => (
                      <span
                        key={`${h}-${i}`}
                        className="orbWave__bar"
                        style={
                          {
                            ["--wave-h" as any]: h,
                            ["--wave-delay" as any]: `${i * 0.08}s`,
                          } as React.CSSProperties
                        }
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="trackMeta">
            <div className="trackMeta__pill">{currentTrack.episodeLabel}</div>
            {currentTrack.guest ? <p className="trackMeta__guest">{currentTrack.guest}</p> : null}
            <p className="trackMeta__genres">
              {(currentTrack.genres || DEFAULT_GENRES).join(" / ").toUpperCase()}
            </p>
          </div>
        </section>

        <aside className={`archivePanel ${archiveOpen ? "is-open" : ""}`}>
          <div className="archivePanel__inner">
            <h2>ALL EPISODES</h2>

            <div className="archiveSearch">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="SEARCH TRANSMISSIONS..."
              />
              {search ? (
                <button
                  type="button"
                  className="archiveSearch__clear"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  ×
                </button>
              ) : null}
            </div>

            <div className="archiveList">
              {filteredTracks.map((track, i) => {
                const active = track.id === currentTrack.id;
                return (
                  <button
                    key={track.id}
                    type="button"
                    className={`archiveItem ${active ? "is-active" : ""}`}
                    onClick={() => selectTrack(track.id)}
                  >
                    <span className="archiveItem__num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="archiveItem__meta">
                      <strong>{track.episodeLabel}</strong>
                      <em>{track.guest || track.artist}</em>
                    </span>
                    <span className="archiveItem__cta">{active ? "LIVE" : "TUNE"}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <div className="controlDock">
          <div className="timelineRow">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={Math.max(duration, 1)}
              step={1}
              value={Math.min(currentTime, duration || 0)}
              onChange={(e) => handleSeek(Number(e.target.value))}
              aria-label="Track timeline"
            />
            <span>{formatTime(duration)}</span>
          </div>

          <div className="transportRow">
            <button type="button" className="transportIcon" onClick={goPrev} aria-label="Previous track">
              <span>◀</span>
            </button>

            <button type="button" className="playButton" onClick={togglePlayback}>
              {isPlaying ? "PAUSE TRANSMISSION" : "PLAY TRANSMISSION"}
            </button>

            <button type="button" className="transportIcon" onClick={goNext} aria-label="Next track">
              <span>▶</span>
            </button>
          </div>

          <button type="button" className="archiveButton" onClick={() => setArchiveOpen((v) => !v)}>
            OPEN ARCHIVE
          </button>
        </div>

        <audio ref={audioRef} preload="metadata" />

        <style jsx global>{`
          :root {
            --scene-nav-space: 58px;
            --radio-bg: #04040f;
            --radio-bg-2: #080717;
            --cyan: #62d9d8;
            --pink: #ef80e1;
            --pink-2: #d36ad0;
            --purple-glow: rgba(205, 109, 238, 0.34);
            --grid-cyan: rgba(82, 221, 220, 0.42);
            --grid-pink: rgba(231, 112, 226, 0.32);
            --panel: rgba(6, 5, 21, 0.92);
            --panel-border: rgba(84, 215, 214, 0.24);
            --text-dim: rgba(121, 226, 225, 0.8);
          }

          html,
          body,
          #__next {
            min-height: 100%;
            background: #e8e1e6;
          }

          body {
            margin: 0;
            font-family: Arial, Helvetica, sans-serif;
          }

          .tentRadioPage {
            position: relative;
            min-height: 100vh;
            overflow: hidden;
            background:
              radial-gradient(circle at 50% 42%, rgba(171, 106, 239, 0.16), transparent 34%),
              linear-gradient(180deg, #050613 0%, #07081a 45%, #050714 100%);
            color: white;
          }

          .posterStars,
          .posterGrid {
            position: absolute;
            inset: 0;
            pointer-events: none;
          }

          .posterStars {
            opacity: 0.85;
            background-image:
              radial-gradient(circle at 12% 22%, rgba(255,255,255,0.85) 0 1px, transparent 1.2px),
              radial-gradient(circle at 72% 18%, rgba(255,255,255,0.7) 0 1px, transparent 1.2px),
              radial-gradient(circle at 38% 64%, rgba(255,255,255,0.7) 0 1px, transparent 1.2px),
              radial-gradient(circle at 88% 60%, rgba(255,255,255,0.55) 0 1px, transparent 1.2px),
              radial-gradient(circle at 22% 80%, rgba(255,255,255,0.6) 0 1px, transparent 1.2px),
              radial-gradient(circle at 58% 84%, rgba(255,255,255,0.5) 0 1px, transparent 1.2px);
            background-size: 280px 280px, 320px 320px, 360px 360px, 400px 400px, 420px 420px, 500px 500px;
            mix-blend-mode: screen;
          }

          .posterGrid {
            opacity: 0.95;
          }

          .posterGrid::before,
          .posterGrid::after {
            content: "";
            position: absolute;
            inset: -8%;
            border-radius: 50%;
            transform-origin: 50% 42%;
            animation: gridPulse 8.5s ease-in-out infinite;
            pointer-events: none;
          }

          .posterGrid::before {
            background:
              repeating-radial-gradient(
                ellipse at center,
                transparent 0 112px,
                rgba(95, 229, 227, 0.13) 112px 114px
              ),
              repeating-conic-gradient(
                from 0deg at center,
                rgba(95, 229, 227, 0.14) 0deg 0.6deg,
                transparent 0.6deg 18deg,
                rgba(226, 111, 221, 0.13) 18deg 18.6deg,
                transparent 18.6deg 36deg
              );
            filter: blur(0.15px);
            opacity: 0.62;
          }

          .posterGrid::after {
            background:
              repeating-radial-gradient(
                ellipse at center,
                transparent 0 112px,
                rgba(226, 111, 221, 0.12) 112px 114px
              ),
              repeating-conic-gradient(
                from 9deg at center,
                rgba(95, 229, 227, 0.1) 0deg 0.5deg,
                transparent 0.5deg 18deg,
                rgba(226, 111, 221, 0.1) 18deg 18.5deg,
                transparent 18.5deg 36deg
              );
            opacity: 0.34;
            filter: blur(6px);
          }

          @keyframes gridPulse {
            0%,
            100% {
              transform: scale(1);
              opacity: 0.9;
            }
            50% {
              transform: scale(1.018);
              opacity: 1;
            }
          }

          .posterFrame {
            position: relative;
            z-index: 2;
            max-width: 1320px;
            margin: 0 auto;
            min-height: calc(100vh - var(--scene-nav-space));
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            padding: calc(var(--scene-nav-space) + 22px) 24px 220px;
          }

          .radioHeader {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            margin-bottom: 18px;
            text-align: center;
          }

          .radioHeader__title {
            margin: 0;
            font-size: clamp(3.6rem, 6.1vw, 6.2rem);
            line-height: 0.9;
            letter-spacing: 0.08em;
            color: var(--pink);
            text-shadow:
              0 0 10px rgba(239, 128, 225, 0.95),
              0 0 26px rgba(239, 128, 225, 0.45);
          }

          .radioHeader__tag {
            margin: 0;
            font-size: clamp(0.95rem, 1.4vw, 1.35rem);
            line-height: 1.1;
            letter-spacing: 0.26em;
            color: var(--cyan);
            text-shadow: 0 0 14px rgba(98, 217, 216, 0.15);
          }

          .orbCluster {
            position: relative;
            width: 100%;
            display: flex;
            justify-content: center;
          }

          .orbPhotoMask {
            position: relative;
            width: clamp(420px, 38vw, 520px);
            aspect-ratio: 0.78 / 1;
            border-radius: 34px;
            overflow: hidden;
            transform: translateY(-30px);
            box-shadow:
              0 0 0 1px rgba(224, 124, 228, 0.14),
              0 0 34px rgba(195, 91, 236, 0.22),
              0 0 90px rgba(90, 215, 214, 0.08);
          }

          .orbPhotoBackdrop {
            position: absolute;
            inset: 0;
            background-position: center;
            background-size: cover;
            filter: blur(18px) saturate(0.9) brightness(0.72);
            transform: scale(1.08);
            opacity: 0.9;
          }

          .orbPhotoMask::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: inherit;
            pointer-events: none;
            box-shadow:
              inset 0 0 0 2px rgba(223, 131, 234, 0.12),
              0 0 30px rgba(217, 115, 230, 0.36);
          }

          .orbPhoto {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: contain;
            object-position: center;
            z-index: 2;
          }

          .orbWave {
            position: absolute;
            inset: 0;
            z-index: 3;
            display: grid;
            place-items: center;
            background: rgba(8, 6, 23, 0.18);
            backdrop-filter: blur(12px) saturate(1.1);
          }

          .orbWave__inner {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: clamp(10px, 1vw, 12px);
            width: 52%;
            height: 34%;
          }

          .orbWave__bar {
            width: clamp(10px, 0.8vw, 14px);
            height: calc(100% * var(--wave-h));
            border-radius: 999px;
            background: linear-gradient(180deg, #66e0dd 0%, #ef82e6 100%);
            box-shadow:
              0 0 10px rgba(102, 224, 221, 0.25),
              0 0 18px rgba(239, 130, 230, 0.28);
            transform-origin: center center;
            animation: wavePulse 1.5s ease-in-out infinite;
            animation-delay: var(--wave-delay);
          }

          @keyframes wavePulse {
            0%,
            100% {
              transform: scaleY(0.72);
              opacity: 0.84;
            }
            50% {
              transform: scaleY(1.08);
              opacity: 1;
            }
          }

          .trackMeta {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: -6px;
            gap: 8px;
            text-align: center;
          }

          .trackMeta__pill {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 320px;
            min-height: 78px;
            padding: 0 28px;
            border-radius: 999px;
            color: var(--pink);
            font-size: clamp(2rem, 2.8vw, 3rem);
            line-height: 1;
            letter-spacing: 0.08em;
            font-weight: 700;
            text-shadow:
              0 0 10px rgba(239, 128, 225, 0.9),
              0 0 26px rgba(239, 128, 225, 0.36);
            background: linear-gradient(90deg, rgba(25, 18, 52, 0.78), rgba(9, 11, 25, 0.88));
            box-shadow:
              inset 0 0 0 2px rgba(96, 223, 222, 0.22),
              0 0 24px rgba(86, 220, 219, 0.08);
          }

          .trackMeta__guest {
            margin: 0;
            color: var(--cyan);
            font-size: clamp(1.2rem, 1.7vw, 1.45rem);
            letter-spacing: 0.18em;
            text-transform: uppercase;
          }

          .trackMeta__genres {
            margin: 0;
            color: var(--pink);
            opacity: 0.95;
            font-size: clamp(0.88rem, 1.1vw, 1.05rem);
            letter-spacing: 0.16em;
            text-transform: uppercase;
          }

          .archivePanel {
            position: fixed;
            right: 26px;
            top: 50%;
            transform: translateY(-50%);
            z-index: 6;
            width: 245px;
          }

          .archivePanel__inner {
            border-radius: 28px;
            padding: 18px 16px 16px;
            background: rgba(8, 6, 24, 0.92);
            border: 1px solid rgba(224, 122, 232, 0.16);
            box-shadow:
              inset 0 0 0 1px rgba(88, 221, 220, 0.08),
              0 0 28px rgba(95, 229, 227, 0.07);
          }

          .archivePanel h2 {
            margin: 0 0 14px;
            color: var(--pink);
            font-size: 1rem;
            letter-spacing: 0.22em;
          }

          .archiveSearch {
            position: relative;
            margin-bottom: 14px;
          }

          .archiveSearch input {
            width: 100%;
            height: 48px;
            border-radius: 999px;
            border: 1px solid rgba(88, 221, 220, 0.18);
            background: rgba(5, 5, 18, 0.95);
            color: var(--pink);
            padding: 0 44px 0 16px;
            outline: none;
            font-size: 0.84rem;
            letter-spacing: 0.14em;
          }

          .archiveSearch__clear {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            width: 28px;
            height: 28px;
            border: none;
            border-radius: 999px;
            background: transparent;
            color: var(--cyan);
            font-size: 1.2rem;
            cursor: pointer;
          }

          .archiveList {
            display: flex;
            flex-direction: column;
            gap: 10px;
            max-height: 320px;
            overflow: auto;
            padding-right: 2px;
          }

          .archiveItem {
            display: grid;
            grid-template-columns: 32px 1fr auto;
            align-items: center;
            gap: 10px;
            width: 100%;
            min-height: 46px;
            border-radius: 999px;
            border: 1px solid rgba(255, 255, 255, 0.04);
            background: rgba(3, 4, 16, 0.84);
            color: var(--cyan);
            padding: 0 12px;
            cursor: pointer;
            text-align: left;
          }

          .archiveItem.is-active {
            color: var(--pink);
            border-color: rgba(239, 128, 225, 0.52);
            box-shadow: 0 0 18px rgba(239, 128, 225, 0.12);
          }

          .archiveItem__num {
            font-size: 0.78rem;
            font-weight: 700;
            letter-spacing: 0.18em;
          }

          .archiveItem__meta {
            display: flex;
            flex-direction: column;
            min-width: 0;
          }

          .archiveItem__meta strong {
            font-size: 0.84rem;
            letter-spacing: 0.11em;
            font-weight: 700;
          }

          .archiveItem__meta em {
            font-style: normal;
            opacity: 0.9;
            font-size: 0.67rem;
            letter-spacing: 0.16em;
            text-transform: uppercase;
          }

          .archiveItem__cta {
            font-size: 0.68rem;
            letter-spacing: 0.18em;
            color: var(--pink);
            font-weight: 700;
          }

          .controlDock {
            position: fixed;
            left: 50%;
            bottom: 18px;
            transform: translateX(-50%);
            z-index: 8;
            width: min(1120px, calc(100vw - 36px));
            border-radius: 999px;
            background: rgba(5, 6, 20, 0.95);
            padding: 16px 18px;
            box-shadow:
              inset 0 0 0 1px rgba(90, 217, 216, 0.2),
              0 0 24px rgba(81, 219, 218, 0.08);
            display: grid;
            grid-template-columns: minmax(240px, 1fr) auto auto;
            align-items: center;
            gap: 16px;
          }

          .timelineRow {
            display: grid;
            grid-template-columns: auto 1fr auto;
            align-items: center;
            gap: 16px;
            color: var(--pink);
            font-weight: 700;
            letter-spacing: 0.08em;
            font-size: 0.95rem;
          }

          .timelineRow input[type="range"] {
            width: 100%;
            appearance: none;
            height: 8px;
            border-radius: 999px;
            background: linear-gradient(90deg, #9be3e3 0%, #ef80e1 100%);
            outline: none;
          }

          .timelineRow input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: var(--pink);
            box-shadow: 0 0 16px rgba(239, 128, 225, 0.4);
            cursor: pointer;
          }

          .timelineRow input[type="range"]::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border: none;
            border-radius: 50%;
            background: var(--pink);
            box-shadow: 0 0 16px rgba(239, 128, 225, 0.4);
            cursor: pointer;
          }

          .transportRow {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .transportIcon,
          .playButton,
          .archiveButton {
            border: none;
            color: var(--pink);
            background: transparent;
            cursor: pointer;
            font-family: inherit;
          }

          .transportIcon {
            width: 52px;
            height: 52px;
            border-radius: 999px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: rgba(7, 7, 21, 0.9);
            box-shadow: inset 0 0 0 1px rgba(90, 217, 216, 0.16);
          }

          .transportIcon span {
            font-size: 1rem;
            line-height: 1;
            display: inline-flex;
            transform: translateX(1px);
          }

          .playButton {
            min-width: 222px;
            height: 56px;
            padding: 0 30px;
            border-radius: 999px;
            background: rgba(6, 6, 22, 0.92);
            box-shadow:
              inset 0 0 0 1px rgba(90, 217, 216, 0.3),
              0 0 14px rgba(239, 128, 225, 0.06);
            font-size: 0.98rem;
            letter-spacing: 0.16em;
            font-weight: 700;
          }

          .archiveButton {
            min-width: 220px;
            height: 56px;
            padding: 0 24px;
            border-radius: 999px;
            background: linear-gradient(90deg, rgba(34, 22, 61, 0.98), rgba(20, 26, 55, 0.92));
            box-shadow: inset 0 0 0 1px rgba(90, 217, 216, 0.24);
            font-size: 0.92rem;
            letter-spacing: 0.16em;
            font-weight: 700;
          }

          @media (max-width: 1180px) {
            .archivePanel {
              right: 18px;
            }

            .controlDock {
              grid-template-columns: 1fr auto;
              grid-template-areas:
                "timeline timeline"
                "transport archive";
            }

            .timelineRow {
              grid-area: timeline;
            }

            .transportRow {
              grid-area: transport;
            }

            .archiveButton {
              grid-area: archive;
              min-width: 190px;
            }
          }

          @media (max-width: 900px) {
            .scene-nav-mobile--tent-radio .scene-nav-mobile-inner {
              padding-top: 24px !important;
            }

            .posterFrame {
              padding: calc(var(--scene-nav-space) + 32px) 16px 238px;
            }

            .radioHeader {
              gap: 8px;
              margin-bottom: 12px;
            }

            .radioHeader__title {
              font-size: clamp(2.35rem, 10vw, 3.45rem);
              line-height: 0.95;
            }

            .radioHeader__tag {
              font-size: 0.86rem;
              letter-spacing: 0.14em;
            }

            .orbPhotoMask {
              width: min(69vw, 330px);
              aspect-ratio: 0.72 / 1;
              transform: none;
              border-radius: 28px;
            }

            .trackMeta {
              margin-top: 12px;
              gap: 6px;
            }

            .trackMeta__pill {
              min-width: min(70vw, 308px);
              min-height: 64px;
              padding: 0 20px;
              font-size: 1.28rem;
            }

            .trackMeta__guest {
              font-size: 0.84rem;
              letter-spacing: 0.16em;
            }

            .trackMeta__genres {
              font-size: 0.72rem;
              letter-spacing: 0.11em;
            }

            .archivePanel {
              position: fixed;
              inset: 0;
              width: auto;
              transform: none;
              top: 0;
              right: 0;
              opacity: 0;
              visibility: hidden;
              pointer-events: none;
              transition: opacity 0.25s ease;
              background: rgba(4, 4, 12, 0.72);
              backdrop-filter: blur(10px);
              display: flex;
              align-items: stretch;
              justify-content: stretch;
              padding-top: calc(var(--scene-nav-space) + 2px);
            }

            .archivePanel.is-open {
              opacity: 1;
              visibility: visible;
              pointer-events: auto;
            }

            .archivePanel__inner {
              width: 100%;
              height: 100%;
              border-radius: 0;
              padding: 16px;
              overflow: auto;
            }

            .archivePanel h2 {
              font-size: 2rem;
              margin-bottom: 14px;
            }

            .archiveSearch input {
              height: 56px;
              font-size: 0.9rem;
            }

            .archiveList {
              max-height: none;
              padding-bottom: 40px;
            }

            .archiveItem {
              min-height: 56px;
            }

            .controlDock {
              width: calc(100vw - 28px);
              border-radius: 28px;
              padding: 12px 12px 12px;
              bottom: 14px;
              display: flex;
              flex-direction: column;
              align-items: stretch;
              gap: 10px;
            }

            .timelineRow {
              gap: 10px;
              font-size: 0.78rem;
            }

            .transportRow {
              gap: 10px;
              justify-content: center;
            }

            .transportIcon {
              width: 48px;
              height: 48px;
            }

            .playButton {
              flex: 1;
              min-width: 0;
              height: 50px;
              padding: 0 18px;
              font-size: 0.82rem;
              letter-spacing: 0.14em;
            }

            .archiveButton {
              width: 100%;
              min-width: 0;
              height: 48px;
              font-size: 0.82rem;
              letter-spacing: 0.16em;
            }

            .orbWave__inner {
              gap: 8px;
              width: 58%;
            }

            .orbWave__bar {
              width: 8px;
            }
          }

          @media (max-width: 520px) {
            .posterFrame {
              padding: calc(var(--scene-nav-space) + 26px) 14px 228px;
            }

            .radioHeader__title {
              font-size: 2.15rem;
            }

            .radioHeader__tag {
              font-size: 0.8rem;
              letter-spacing: 0.12em;
            }

            .orbPhotoMask {
              width: min(72vw, 320px);
            }

            .trackMeta__pill {
              min-width: min(72vw, 300px);
              min-height: 58px;
              font-size: 1.1rem;
            }

            .trackMeta__guest {
              font-size: 0.72rem;
            }

            .trackMeta__genres {
              font-size: 0.62rem;
            }

            .timelineRow {
              font-size: 0.72rem;
            }

            .transportIcon {
              width: 44px;
              height: 44px;
            }

            .playButton {
              height: 46px;
              font-size: 0.76rem;
              letter-spacing: 0.12em;
            }

            .archiveButton {
              height: 46px;
              font-size: 0.76rem;
            }
          }
        `}</style>
      </main>
    </>
  );
}

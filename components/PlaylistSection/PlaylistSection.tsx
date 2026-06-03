import React, { useEffect, useMemo, useRef, useState } from "react";

const BAR_COUNT = 120;

const parseDuration = (value) => {
  if (!value || typeof value !== "string") return 0;

  const parts = value.split(":").map(Number);

  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }

  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }

  return 0;
};

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "00:00";

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

const makeBars = (seedSource, count = BAR_COUNT) => {
  let seed = String(seedSource)
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const random = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };

  return Array.from({ length: count }, (_, index) => {
    const slowWave = 0.46 + 0.26 * Math.sin(index * 0.18);
    const longWave = 0.3 + 0.24 * Math.sin(index * 0.055 + 1.8);
    const detail = random() * 0.52;

    return Math.max(0.14, Math.min(0.98, slowWave + longWave + detail));
  });
};

const Waveform = ({
  track,
  active,
  playing,
  progress,
  onSeek,
}) => {
  const bars = useMemo(
    () => makeBars(`${track.id}-${track.title}`),
    [track.id, track.title]
  );

  return (
    <button
      type="button"
      className="waveform"
      onClick={(event) => onSeek(event, track)}
      aria-label={`Seek ${track.title}`}
      style={{ "--progress": `${progress * 100}%` }}
    >
      <span className="waveform-baseline" />

      <span className="waveform-bars">
        {bars.map((height, index) => {
          const barProgress = index / (bars.length - 1);
          const isPlayed = active && barProgress <= progress;

          return (
            <span
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className={`waveform-bar ${isPlayed ? "played" : ""}`}
              style={{
                height: `${18 + height * 72}%`,
                animationDelay: `${index * 0.018}s`,
              }}
            />
          );
        })}
      </span>

      <span
        className={`waveform-playhead ${active ? "visible" : ""} ${
          playing ? "playing" : ""
        }`}
      />
    </button>
  );
};

const PlaylistSection = ({ tracks = [] }) => {
  const audioRef = useRef(null);
  const pendingSeekRef = useRef(null);
  const shouldAutoPlayRef = useRef(false);

  const [activeTrackId, setActiveTrackId] = useState(tracks[0]?.id ?? null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [durationByTrack, setDurationByTrack] = useState({});

  const activeTrack = useMemo(
    () => tracks.find((track) => track.id === activeTrackId) || tracks[0],
    [tracks, activeTrackId]
  );

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !activeTrack) return;

    audio.pause();
    audio.src = activeTrack.audioSrc;
    audio.load();

    setCurrentTime(0);

    if (shouldAutoPlayRef.current) {
      shouldAutoPlayRef.current = false;

      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  }, [activeTrack?.id, activeTrack?.audioSrc]);

  const getTrackDuration = (track) => {
    return durationByTrack[track.id] || parseDuration(track.duration);
  };

  const handleTogglePlay = (track) => {
    const audio = audioRef.current;

    if (!audio) return;

    if (activeTrackId !== track.id) {
      shouldAutoPlayRef.current = true;
      setActiveTrackId(track.id);
      setIsPlaying(true);
      return;
    }

    if (audio.paused) {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (event, track) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.max(
      0,
      Math.min(1, (event.clientX - rect.left) / rect.width)
    );

    const audio = audioRef.current;

    if (!audio) return;

    if (activeTrackId !== track.id) {
      pendingSeekRef.current = ratio;
      shouldAutoPlayRef.current = true;
      setActiveTrackId(track.id);
      setIsPlaying(true);
      return;
    }

    const duration = audio.duration || getTrackDuration(track);

    if (duration && Number.isFinite(duration)) {
      audio.currentTime = ratio * duration;
      setCurrentTime(audio.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;

    if (!audio || !activeTrack) return;

    const duration = audio.duration || parseDuration(activeTrack.duration);

    setDurationByTrack((previous) => ({
      ...previous,
      [activeTrack.id]: duration,
    }));

    if (pendingSeekRef.current !== null && duration) {
      audio.currentTime = pendingSeekRef.current * duration;
      setCurrentTime(audio.currentTime);
      pendingSeekRef.current = null;
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  return (
    <section className="playlist-section">
      <audio
        ref={audioRef}
        preload="metadata"
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      {tracks.map((track) => {
        const isActive = activeTrackId === track.id;
        const duration = getTrackDuration(track);
        const progress =
          isActive && duration ? Math.min(currentTime / duration, 1) : 0;

        return (
          <article
            key={track.id}
            className={`audio-card ${isActive ? "active" : ""} ${
              isActive && isPlaying ? "playing" : ""
            }`}
          >
            <button
              type="button"
              className="thumbnail-button"
              onClick={() => handleTogglePlay(track)}
              aria-label={isActive && isPlaying ? "Pause" : "Play"}
            >
              <img
                className="audio-thumbnail"
                src={track.thumbnail}
                alt=""
                aria-hidden="true"
              />

              <span className="play-button">
                {isActive && isPlaying ? (
                  <span className="pause-icon">
                    <span />
                    <span />
                  </span>
                ) : (
                  <span className="play-icon" />
                )}
              </span>
            </button>

            <div className="audio-content">
              <div className="audio-heading">
                <h3>{track.title}</h3>
              </div>

              <div className="audio-meta">
                <span className="audio-dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                </span>

                <span>{isActive ? formatTime(currentTime) : "00:00"}</span>
                <span>/</span>
                <span>{track.duration}</span>
              </div>

              <Waveform
                track={track}
                active={isActive}
                playing={isActive && isPlaying}
                progress={progress}
                onSeek={handleSeek}
              />
            </div>
          </article>
        );
      })}

      <style jsx>{`
        .playlist-section {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .audio-card {
          width: 100%;
          min-height: 220px;
          display: grid;
          grid-template-columns: 190px minmax(0, 1fr);
          gap: 30px;
          align-items: center;
          padding: 28px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.055);
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.035);
          transition: border-color 0.25s ease, background 0.25s ease,
            transform 0.25s ease;
        }

        .audio-card:hover,
        .audio-card.active {
          border-color: rgba(255, 146, 146, 0.45);
          background: rgba(255, 255, 255, 0.075);
        }

        .audio-card:hover {
          transform: translateY(-2px);
        }

        .thumbnail-button {
          position: relative;
          width: 190px;
          height: 190px;
          padding: 0;
          border: 0;
          border-radius: 18px;
          overflow: hidden;
          cursor: pointer;
          background: transparent;
        }

        .audio-thumbnail {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1);
          transition: transform 0.45s ease, filter 0.45s ease;
        }

        .audio-card:hover .audio-thumbnail,
        .audio-card.playing .audio-thumbnail {
          transform: scale(1.06);
          filter: saturate(1.15);
        }

        .play-button {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 72px;
          height: 72px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: rgba(10, 24, 109, 0.88);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 14px 34px rgba(0, 0, 0, 0.24);
        }

        .play-icon {
          width: 0;
          height: 0;
          border-top: 15px solid transparent;
          border-bottom: 15px solid transparent;
          border-left: 22px solid #ffffff;
          margin-left: 5px;
        }

        .pause-icon {
          display: flex;
          gap: 7px;
        }

        .pause-icon span {
          width: 8px;
          height: 30px;
          border-radius: 999px;
          background: #ffffff;
        }

        .audio-content {
          min-width: 0;
        }

        .audio-heading {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 14px;
        }

        .audio-heading h3 {
          margin: 0;
          color: #ffffff;
          font-family: Helvetica, Arial, sans-serif;
          font-size: clamp(20px, 2vw, 30px);
          font-weight: 800;
          line-height: 1.15;
        }

        .audio-meta {
          display: flex;
          align-items: center;
          gap: 13px;
          margin-bottom: 18px;
          color: rgba(255, 255, 255, 0.82);
          font-family: "Courier New", Courier, monospace;
          font-size: 17px;
          font-weight: 800;
          letter-spacing: 0.04em;
        }

        .audio-dots {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          margin-right: 4px;
        }

        .audio-dots span {
          width: 4px;
          height: 9px;
          border-radius: 999px;
          background: rgba(255, 146, 146, 0.65);
        }

        .waveform {
          position: relative;
          width: 100%;
          height: 92px;
          padding: 0;
          border: 0;
          background: transparent;
          cursor: pointer;
          overflow: hidden;
        }

        .waveform-baseline {
          position: absolute;
          left: 0;
          right: 0;
          top: 50%;
          height: 2px;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.22);
        }

        .waveform-bars {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          gap: 3px;
        }

        .waveform-bar {
          flex: 1;
          min-width: 2px;
          max-width: 7px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.42);
          transform-origin: center;
          transition: background 0.18s ease, opacity 0.18s ease,
            transform 0.18s ease;
        }

        .waveform-bar.played {
          background: #ff9292;
          opacity: 1;
        }

        .audio-card.playing .waveform-bar {
          animation: wavePulse 1.15s ease-in-out infinite;
        }

        .audio-card.playing .waveform-bar.played {
          animation-name: wavePulsePlayed;
        }

        .waveform-playhead {
          position: absolute;
          top: 7px;
          bottom: 7px;
          left: var(--progress);
          width: 2px;
          border-radius: 999px;
          background: #ff9292;
          opacity: 0;
          transform: translateX(-1px);
          box-shadow: 0 0 18px rgba(255, 146, 146, 0.7);
          transition: opacity 0.2s ease;
        }

        .waveform-playhead.visible {
          opacity: 1;
        }

        .waveform-playhead.playing {
          animation: playheadGlow 1.1s ease-in-out infinite;
        }

        @keyframes wavePulse {
          0%,
          100% {
            transform: scaleY(0.9);
            opacity: 0.52;
          }

          50% {
            transform: scaleY(1.12);
            opacity: 0.95;
          }
        }

        @keyframes wavePulsePlayed {
          0%,
          100% {
            transform: scaleY(0.92);
            opacity: 0.78;
          }

          50% {
            transform: scaleY(1.2);
            opacity: 1;
          }
        }

        @keyframes playheadGlow {
          0%,
          100% {
            box-shadow: 0 0 12px rgba(255, 146, 146, 0.45);
          }

          50% {
            box-shadow: 0 0 28px rgba(255, 146, 146, 0.9);
          }
        }

        @media (max-width: 768px) {
          .playlist-section {
            gap: 20px;
          }

          .audio-card {
            grid-template-columns: 104px minmax(0, 1fr);
            gap: 16px;
            min-height: 142px;
            padding: 16px;
            border-radius: 17px;
          }

          .thumbnail-button {
            width: 104px;
            height: 104px;
            border-radius: 14px;
          }

          .play-button {
            width: 48px;
            height: 48px;
          }

          .play-icon {
            border-top-width: 10px;
            border-bottom-width: 10px;
            border-left-width: 15px;
            margin-left: 4px;
          }

          .pause-icon {
            gap: 5px;
          }

          .pause-icon span {
            width: 6px;
            height: 20px;
          }

          .audio-heading {
            margin-bottom: 9px;
          }

          .audio-heading h3 {
            font-size: 14px;
            line-height: 1.2;
          }

          .audio-meta {
            gap: 7px;
            margin-bottom: 10px;
            font-size: 11px;
          }

          .audio-dots {
            gap: 3px;
          }

          .audio-dots span {
            width: 3px;
            height: 6px;
          }

          .waveform {
            height: 42px;
          }

          .waveform-bars {
            gap: 2px;
          }

          .waveform-bar {
            min-width: 1px;
          }
        }

        @media (max-width: 520px) {
          .audio-card {
            grid-template-columns: 86px minmax(0, 1fr);
            gap: 14px;
            padding: 14px;
          }

          .thumbnail-button {
            width: 86px;
            height: 86px;
          }

          .audio-heading h3 {
            font-size: 13px;
          }

          .waveform {
            height: 36px;
          }
        }
      `}</style>
    </section>
  );
};

export default PlaylistSection;

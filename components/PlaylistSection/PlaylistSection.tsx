import React, { useEffect, useMemo, useRef, useState } from 'react';

type Track = {
  id: string | number;
  title: string;
  thumbnail: string;
  audioSrc: string;
  duration?: string;
};

type PlaylistSectionProps = {
  title?: string;
  tracks: Track[];
};

type WaveformProps = {
  track: Track;
  active: boolean;
  playing: boolean;
  progress: number;
  onSeek: (event: React.MouseEvent<HTMLDivElement>, track: Track) => void;
};

const BAR_COUNT = 150;
const WAVEFORM_WIDTH = 1000;
const WAVEFORM_HEIGHT = 160;
const WAVEFORM_CENTER = WAVEFORM_HEIGHT / 2;

const parseDuration = (value?: string) => {
  if (!value || typeof value !== 'string') return 0;

  const parts = value.split(':').map(Number);

  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }

  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }

  return 0;
};

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return '00:00';

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

const makeBars = (seedSource: string | number, count = BAR_COUNT) => {
  let seed = String(seedSource)
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const random = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };

  return Array.from({ length: count }, (_, index) => {
    const slowWave = 0.42 + 0.22 * Math.sin(index * 0.17);
    const longWave = 0.32 + 0.26 * Math.sin(index * 0.055 + 1.9);
    const midWave = 0.16 * Math.sin(index * 0.43 + 0.7);
    const detail = random() * 0.42;

    return Math.max(0.12, Math.min(1, slowWave + longWave + midWave + detail));
  });
};

const Waveform = ({
  track,
  active,
  playing,
  progress,
  onSeek,
}: WaveformProps) => {
  const bars = useMemo(
    () => makeBars(`${track.id}-${track.title}`),
    [track.id, track.title]
  );

  const step = WAVEFORM_WIDTH / bars.length;
  const barWidth = Math.max(3, step * 0.48);

  return (
    <div
      className={`waveform-shell ${active ? 'active' : ''} ${
        playing ? 'playing' : ''
      }`}
      onClick={(event) => onSeek(event, track)}
      role="button"
      tabIndex={0}
      aria-label={`Seek ${track.title}`}
    >
      <div className="waveform-glow" />

      <svg
        className="waveform-svg"
        viewBox={`0 0 ${WAVEFORM_WIDTH} ${WAVEFORM_HEIGHT}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line
          className="waveform-baseline"
          x1="0"
          y1={WAVEFORM_CENTER}
          x2={WAVEFORM_WIDTH}
          y2={WAVEFORM_CENTER}
        />

        {bars.map((height, index) => {
          const barProgress = index / (bars.length - 1);
          const isPlayed = active && barProgress <= progress;
          const visualHeight = 14 + height * 126;
          const x = index * step + (step - barWidth) / 2;
          const y = WAVEFORM_CENTER - visualHeight / 2;

          return (
            <rect
              key={`${track.id}-${index}`}
              className={`waveform-bar ${isPlayed ? 'played' : ''}`}
              x={x}
              y={y}
              width={barWidth}
              height={visualHeight}
              rx={barWidth / 2}
              style={{
                animationDelay: `${index * 0.012}s`,
              }}
            />
          );
        })}
      </svg>

      <span
        className={`waveform-playhead ${active ? 'visible' : ''} ${
          playing ? 'playing' : ''
        }`}
        style={{
          left: `${Math.max(0, Math.min(1, progress)) * 100}%`,
        }}
      />

      <span
        className="waveform-progress-label"
        style={{
          left: `${Math.max(0, Math.min(1, progress)) * 100}%`,
        }}
      >
        {active ? `${Math.round(progress * 100)}%` : ''}
      </span>
    </div>
  );
};

const PlaylistSection = ({ tracks }: PlaylistSectionProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pendingSeekRef = useRef<number | null>(null);
  const shouldAutoPlayRef = useRef(false);

  const [activeTrackId, setActiveTrackId] = useState<string | number | null>(
    tracks[0]?.id ?? null
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [durationByTrack, setDurationByTrack] = useState<
    Record<string | number, number>
  >({});

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

  const getTrackDuration = (track: Track) => {
    return durationByTrack[track.id] || parseDuration(track.duration);
  };

  const handleTogglePlay = (track: Track) => {
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

  const handleSeek = (
    event: React.MouseEvent<HTMLDivElement>,
    track: Track
  ) => {
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
            className={`audio-card ${isActive ? 'active' : ''} ${
              isActive && isPlaying ? 'playing' : ''
            }`}
          >
            <button
              type="button"
              className="thumbnail-button"
              onClick={() => handleTogglePlay(track)}
              aria-label={isActive && isPlaying ? 'Pause' : 'Play'}
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

                <span>{isActive ? formatTime(currentTime) : '00:00'}</span>
                <span>/</span>
                <span>{track.duration || formatTime(duration)}</span>
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
          max-width: 100%;
          display: flex;
          flex-direction: column;
          gap: 30px;
          box-sizing: border-box;
        }

        .audio-card {
          width: 100%;
          max-width: 100%;
          min-height: 220px;
          display: grid;
          grid-template-columns: 190px minmax(0, 1fr);
          gap: 30px;
          align-items: center;
          padding: 28px;
          border: 1px solid rgba(255, 146, 146, 0.38);
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.055);
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.035);
          transition: border-color 0.25s ease, background 0.25s ease,
            transform 0.25s ease;
          box-sizing: border-box;
          overflow: hidden;
        }

        .audio-card:hover,
        .audio-card.active {
          border-color: rgba(255, 146, 146, 0.72);
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
          box-sizing: border-box;
        }

        .audio-thumbnail {
          display: block;
          width: 100%;
          height: 100%;
          margin-top: 0 !important;
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
          width: 100%;
          box-sizing: border-box;
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
          font-family: 'Courier New', Courier, monospace;
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
          background: rgba(255, 146, 146, 0.72);
        }

        .waveform-shell {
          position: relative;
          width: 100%;
          max-width: 100%;
          height: 108px;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          background:
            linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.035),
              rgba(255, 255, 255, 0.015)
            );
          box-sizing: border-box;
        }

        .waveform-shell:focus {
          outline: 1px solid rgba(255, 146, 146, 0.7);
          outline-offset: 3px;
        }

        .waveform-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 0% 50%,
            rgba(255, 146, 146, 0.18),
            transparent 32%
          );
          opacity: 0;
          transition: opacity 0.25s ease;
        }

        .waveform-shell.active .waveform-glow {
          opacity: 1;
        }

        .waveform-svg {
          position: absolute;
          left: 0;
          right: 0;
          top: 8px;
          width: 100%;
          height: 92px;
          display: block;
          overflow: visible;
        }

        .waveform-baseline {
          stroke: rgba(255, 255, 255, 0.24);
          stroke-width: 2;
          vector-effect: non-scaling-stroke;
        }

        .waveform-bar {
          fill: rgba(255, 255, 255, 0.56);
          transform-box: fill-box;
          transform-origin: center;
          transition: fill 0.18s ease, opacity 0.18s ease;
        }

        .waveform-bar.played {
          fill: #ff9292;
        }

        .audio-card.playing .waveform-bar {
          animation: waveformBreathe 1.15s ease-in-out infinite;
        }

        .audio-card.playing .waveform-bar.played {
          animation-name: waveformBreathePlayed;
        }

        .waveform-playhead {
          position: absolute;
          top: 14px;
          bottom: 14px;
          width: 2px;
          border-radius: 999px;
          background: #ff9292;
          opacity: 0;
          transform: translateX(-1px);
          box-shadow: 0 0 20px rgba(255, 146, 146, 0.85);
          transition: opacity 0.2s ease;
          pointer-events: none;
        }

        .waveform-playhead.visible {
          opacity: 1;
        }

        .waveform-playhead.playing {
          animation: playheadGlow 1.1s ease-in-out infinite;
        }

        .waveform-progress-label {
          position: absolute;
          top: 4px;
          transform: translateX(-50%);
          padding: 2px 6px;
          border-radius: 4px;
          background: rgba(10, 24, 109, 0.72);
          color: #ff9292;
          font-family: 'Courier New', Courier, monospace;
          font-size: 10px;
          font-weight: 800;
          line-height: 1.2;
          opacity: 0;
          pointer-events: none;
        }

        .waveform-shell.active .waveform-progress-label {
          opacity: 1;
        }

        @keyframes waveformBreathe {
          0%,
          100% {
            transform: scaleY(0.9);
            opacity: 0.62;
          }

          50% {
            transform: scaleY(1.16);
            opacity: 1;
          }
        }

        @keyframes waveformBreathePlayed {
          0%,
          100% {
            transform: scaleY(0.92);
            opacity: 0.86;
          }

          50% {
            transform: scaleY(1.24);
            opacity: 1;
          }
        }

        @keyframes playheadGlow {
          0%,
          100% {
            box-shadow: 0 0 12px rgba(255, 146, 146, 0.45);
          }

          50% {
            box-shadow: 0 0 30px rgba(255, 146, 146, 0.95);
          }
        }

        @media (max-width: 768px) {
          .playlist-section {
            gap: 20px;
          }

          .audio-card {
            grid-template-columns: 104px minmax(0, 1fr);
            gap: 16px;
            min-height: 152px;
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

          .waveform-shell {
            height: 58px;
            border-radius: 8px;
          }

          .waveform-svg {
            top: 4px;
            height: 50px;
          }

          .waveform-playhead {
            top: 8px;
            bottom: 8px;
          }

          .waveform-progress-label {
            display: none;
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

          .waveform-shell {
            height: 48px;
          }

          .waveform-svg {
            height: 42px;
          }
        }
      `}</style>
    </section>
  );
};

export default PlaylistSection;

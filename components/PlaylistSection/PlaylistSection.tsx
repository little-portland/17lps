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

type AudioWaveformProps = {
  track: Track;
  active: boolean;
  playing: boolean;
  progress: number;
  onSeek: (event: React.MouseEvent<HTMLDivElement>, track: Track) => void;
};

const BAR_COUNT = 120;
const SVG_WIDTH = 1200;
const SVG_HEIGHT = 150;
const SVG_CENTER = SVG_HEIGHT / 2;

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
    const waveA = 0.34 + 0.24 * Math.sin(index * 0.12);
    const waveB = 0.28 + 0.22 * Math.sin(index * 0.31 + 1.5);
    const waveC = 0.16 + 0.18 * Math.sin(index * 0.71 + 0.4);
    const detail = random() * 0.36;

    return Math.max(0.16, Math.min(1, waveA + waveB + waveC + detail));
  });
};

const getBarColor = (index: number, total: number) => {
  const ratio = index / Math.max(total - 1, 1);

  if (ratio < 0.16) return '#ff8a3d';
  if (ratio < 0.32) return '#ffe747';
  if (ratio < 0.48) return '#ff9292';
  if (ratio < 0.64) return '#d94cff';
  if (ratio < 0.82) return '#5990f7';

  return '#c85a9f';
};

const AudioWaveform = ({
  track,
  active,
  playing,
  progress,
  onSeek,
}: AudioWaveformProps) => {
  const bars = useMemo(
    () => makeBars(`${track.id}-${track.title}`),
    [track.id, track.title]
  );

  const step = SVG_WIDTH / bars.length;
  const barWidth = Math.max(4, step * 0.46);

  return (
    <div
      className={`audio-waveform ${active ? 'active' : ''} ${
        playing ? 'playing' : ''
      }`}
      onClick={(event) => onSeek(event, track)}
      role="button"
      tabIndex={0}
      aria-label={`Seek ${track.title}`}
    >
      <svg
        className="audio-waveform-svg"
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line
          className="audio-waveform-centre-line"
          x1="0"
          y1={SVG_CENTER}
          x2={SVG_WIDTH}
          y2={SVG_CENTER}
        />

        {bars.map((height, index) => {
          const barProgress = index / (bars.length - 1);
          const isPlayed = active && barProgress <= progress;
          const visualHeight = 18 + height * 112;
          const x = index * step + (step - barWidth) / 2;
          const y = SVG_CENTER - visualHeight / 2;

          return (
            <rect
              key={`${track.id}-${index}`}
              className={`audio-waveform-bar ${isPlayed ? 'played' : ''}`}
              x={x}
              y={y}
              width={barWidth}
              height={visualHeight}
              rx={barWidth / 2}
              fill={isPlayed ? getBarColor(index, bars.length) : 'rgba(255, 146, 146, 0.34)'}
              style={{
                animationDelay: `${index * 0.014}s`,
              }}
            />
          );
        })}
      </svg>

      <span
        className={`audio-waveform-playhead ${active ? 'visible' : ''} ${
          playing ? 'playing' : ''
        }`}
        style={{
          left: `${Math.max(0, Math.min(1, progress)) * 100}%`,
        }}
      />
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
                <span>{isActive ? formatTime(currentTime) : '00:00'}</span>
                <span>/</span>
                <span>{track.duration || formatTime(duration)}</span>
              </div>

              <AudioWaveform
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
          min-height: 260px;
          display: grid;
          grid-template-columns: 190px minmax(0, 1fr);
          gap: 30px;
          align-items: center;
          padding: 48px 28px 28px 28px;
          border: 1px solid rgba(255, 146, 146, 0.5);
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
          border-color: rgba(255, 146, 146, 0.78);
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
          margin-bottom: 14px;
          color: rgba(255, 255, 255, 0.82);
          font-family: 'Courier New', Courier, monospace;
          font-size: 17px;
          font-weight: 800;
          letter-spacing: 0.04em;
        }

        .audio-waveform {
          position: relative;
          width: 100%;
          max-width: 100%;
          height: 116px;
          cursor: pointer;
          overflow: visible;
          box-sizing: border-box;
        }

        .audio-waveform:focus {
          outline: 1px solid rgba(255, 146, 146, 0.7);
          outline-offset: 3px;
        }

        .audio-waveform-svg {
          display: block;
          width: 100%;
          height: 116px;
          overflow: visible;
        }

        .audio-waveform-centre-line {
          stroke: rgba(255, 255, 255, 0.16);
          stroke-width: 1.5;
          vector-effect: non-scaling-stroke;
        }

        .audio-waveform-bar {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0.8;
        }

        .audio-waveform-bar.played {
          opacity: 1;
          filter: saturate(1.22);
        }

        .audio-card.playing .audio-waveform-bar {
          animation: audioWaveIdle 1.1s ease-in-out infinite;
        }

        .audio-card.playing .audio-waveform-bar.played {
          animation-name: audioWaveActive;
        }

        .audio-waveform-playhead {
          position: absolute;
          top: 2px;
          bottom: 2px;
          width: 2px;
          border-radius: 999px;
          background: #ffffff;
          opacity: 0;
          transform: translateX(-1px);
          box-shadow: 0 0 18px rgba(255, 255, 255, 0.85);
          transition: opacity 0.2s ease;
          pointer-events: none;
        }

        .audio-waveform-playhead.visible {
          opacity: 1;
        }

        .audio-waveform-playhead.playing {
          animation: playheadGlow 1.1s ease-in-out infinite;
        }

        @keyframes audioWaveIdle {
          0%,
          100% {
            transform: scaleY(0.88);
            opacity: 0.68;
          }

          50% {
            transform: scaleY(1.04);
            opacity: 0.86;
          }
        }

        @keyframes audioWaveActive {
          0%,
          100% {
            transform: scaleY(0.92);
            opacity: 0.92;
          }

          50% {
            transform: scaleY(1.18);
            opacity: 1;
          }
        }

        @keyframes playheadGlow {
          0%,
          100% {
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.35);
          }

          50% {
            box-shadow: 0 0 24px rgba(255, 255, 255, 0.9);
          }
        }

        @media (max-width: 768px) {
          .playlist-section {
            gap: 20px;
          }

          .audio-card {
            grid-template-columns: 104px minmax(0, 1fr);
            gap: 16px;
            min-height: 180px;
            padding: 36px 16px 16px 16px;
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
            margin-bottom: 8px;
            font-size: 11px;
          }

          .audio-waveform {
            height: 58px;
          }

          .audio-waveform-svg {
            height: 58px;
          }

          .audio-waveform-playhead {
            top: 2px;
            bottom: 2px;
          }
        }

        @media (max-width: 520px) {
          .audio-card {
            grid-template-columns: 86px minmax(0, 1fr);
            gap: 14px;
            padding: 34px 14px 14px 14px;
          }

          .thumbnail-button {
            width: 86px;
            height: 86px;
          }

          .audio-heading h3 {
            font-size: 13px;
          }

          .audio-waveform {
            height: 48px;
          }

          .audio-waveform-svg {
            height: 48px;
          }
        }
      `}</style>
    </section>
  );
};

export default PlaylistSection;

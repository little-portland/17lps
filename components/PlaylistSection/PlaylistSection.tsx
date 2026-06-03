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

type EqualizerProps = {
  track: Track;
  active: boolean;
  playing: boolean;
  progress: number;
  onSeek: (event: React.MouseEvent<HTMLDivElement>, track: Track) => void;
};

const BAR_COUNT = 96;

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
    const slowWave = 0.44 + 0.22 * Math.sin(index * 0.17);
    const longWave = 0.3 + 0.24 * Math.sin(index * 0.055 + 1.9);
    const midWave = 0.14 * Math.sin(index * 0.43 + 0.7);
    const detail = random() * 0.36;

    return Math.max(0.2, Math.min(1, slowWave + longWave + midWave + detail));
  });
};

const Equalizer = ({
  track,
  active,
  playing,
  progress,
  onSeek,
}: EqualizerProps) => {
  const bars = useMemo(
    () => makeBars(`${track.id}-${track.title}`),
    [track.id, track.title]
  );

  return (
    <div
      className={`equalizer ${active ? 'active' : ''} ${
        playing ? 'playing' : ''
      }`}
      onClick={(event) => onSeek(event, track)}
      role="button"
      tabIndex={0}
      aria-label={`Seek ${track.title}`}
    >
      <div className="equalizer-bars">
        {bars.map((height, index) => {
          const barProgress = index / (bars.length - 1);
          const isPlayed = active && barProgress <= progress;

          return (
            <span
              key={`${track.id}-${index}`}
              className={`equalizer-bar ${isPlayed ? 'played' : ''}`}
              style={{
                height: `${20 + height * 72}%`,
                animationDelay: `${index * 0.018}s`,
              }}
            />
          );
        })}
      </div>

      <span
        className={`equalizer-playhead ${active ? 'visible' : ''} ${
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

              <Equalizer
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
          margin-bottom: 18px;
          color: rgba(255, 255, 255, 0.82);
          font-family: 'Courier New', Courier, monospace;
          font-size: 17px;
          font-weight: 800;
          letter-spacing: 0.04em;
        }

        .equalizer {
          position: relative;
          width: 100%;
          max-width: 100%;
          height: 92px;
          cursor: pointer;
          overflow: hidden;
          box-sizing: border-box;
        }

        .equalizer:focus {
          outline: 1px solid rgba(255, 146, 146, 0.7);
          outline-offset: 3px;
        }

        .equalizer-bars {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .equalizer-bar {
          flex: 1;
          min-width: 2px;
          max-width: 8px;
          border-radius: 999px;
          background: rgba(255, 146, 146, 0.48);
          transform-origin: center;
          transition: background 0.18s ease, opacity 0.18s ease;
        }

        .equalizer-bar.played {
          background: #ffffff;
          opacity: 1;
        }

        .audio-card.playing .equalizer-bar {
          animation: equalizerPulse 0.95s ease-in-out infinite;
        }

        .audio-card.playing .equalizer-bar.played {
          animation-name: equalizerPulsePlayed;
        }

        .equalizer-playhead {
          position: absolute;
          top: 8px;
          bottom: 8px;
          width: 2px;
          border-radius: 999px;
          background: #ff9292;
          opacity: 0;
          transform: translateX(-1px);
          box-shadow: 0 0 20px rgba(255, 146, 146, 0.85);
          transition: opacity 0.2s ease;
          pointer-events: none;
        }

        .equalizer-playhead.visible {
          opacity: 1;
        }

        .equalizer-playhead.playing {
          animation: playheadGlow 1.1s ease-in-out infinite;
        }

        @keyframes equalizerPulse {
          0%,
          100% {
            transform: scaleY(0.72);
            opacity: 0.52;
          }

          50% {
            transform: scaleY(1.12);
            opacity: 0.9;
          }
        }

        @keyframes equalizerPulsePlayed {
          0%,
          100% {
            transform: scaleY(0.82);
            opacity: 0.85;
          }

          50% {
            transform: scaleY(1.22);
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

          .equalizer {
            height: 58px;
          }

          .equalizer-bars {
            gap: 2px;
          }

          .equalizer-playhead {
            top: 6px;
            bottom: 6px;
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

          .equalizer {
            height: 48px;
          }
        }
      `}</style>
    </section>
  );
};

export default PlaylistSection;

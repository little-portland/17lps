import React, { useEffect, useRef, useState } from "react";

type Track = {
  id: string | number;
  title: string;
  thumbnail: string;
  audioSrc: string;
  duration: string;
  downloadHref: string;
};

type PlaylistSectionProps = {
  title?: string;
  tracks: Track[];
};

const PlaylistSection = ({
  title = "Listen",
  tracks,
}: PlaylistSectionProps) => {
  const [activeTrackId, setActiveTrackId] = useState<string | number | null>(null);
  const audioRefs = useRef<Record<string | number, HTMLAudioElement | null>>({});

  const handleToggle = (trackId: string | number) => {
    const currentAudio = audioRefs.current[trackId];
    if (!currentAudio) return;

    const isCurrentTrackActive = activeTrackId === trackId;

    Object.entries(audioRefs.current).forEach(([id, audio]) => {
      if (!audio) return;
      if (String(id) !== String(trackId)) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    if (isCurrentTrackActive) {
      currentAudio.pause();
      setActiveTrackId(null);
    } else {
      currentAudio.play();
      setActiveTrackId(trackId);
    }
  };

  useEffect(() => {
    const refs = audioRefs.current;

    Object.entries(refs).forEach(([id, audio]) => {
      if (!audio) return;

      const onEnded = () => {
        if (String(activeTrackId) === String(id)) {
          setActiveTrackId(null);
        }
      };

      audio.addEventListener("ended", onEnded);

      return () => {
        audio.removeEventListener("ended", onEnded);
      };
    });
  }, [activeTrackId]);

  return (
    <section className="playlist-section">
      <div className="playlist-header">
        <h2>{title}</h2>
      </div>

      <div className="playlist-grid">
        {tracks.map((track) => {
          const isPlaying = activeTrackId === track.id;

          return (
            <article className="playlist-card" key={track.id}>
              <div className="thumb-wrap">
                <img src={track.thumbnail} alt={track.title} className="thumb" />
                <button
                  className={`play-button ${isPlaying ? "playing" : ""}`}
                  onClick={() => handleToggle(track.id)}
                  aria-label={isPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
                  type="button"
                >
                  {isPlaying ? (
                    <span className="pause-icon">
                      <span />
                      <span />
                    </span>
                  ) : (
                    <span className="play-icon" />
                  )}
                </button>
              </div>

              <div className="track-info">
                <div className="track-main">
                  <h3>{track.title}</h3>

                  <div className="meta-row">
                    <div className={`wave ${isPlaying ? "active" : ""}`} aria-hidden="true">
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>

                    <span className="duration">{track.duration}</span>
                  </div>
                </div>

                <a
                  href={track.downloadHref}
                  target="_blank"
                  rel="noreferrer"
                  className="download-link"
                >
                  Download
                </a>
              </div>

              <audio
                ref={(el) => {
                  audioRefs.current[track.id] = el;
                }}
                preload="none"
                src={track.audioSrc}
              />
            </article>
          );
        })}
      </div>

      <style jsx>{`
        .playlist-section {
          width: 100%;
          margin: 48px auto 0;
          color: #ffffff;
        }

        .playlist-header {
          margin-bottom: 20px;
        }

        .playlist-header h2 {
          margin: 0;
          font-family: Helvetica, Arial, sans-serif;
          font-size: 28px;
          font-weight: 700;
          letter-spacing: 0.02em;
        }

        .playlist-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        .playlist-card {
          display: flex;
          gap: 16px;
          align-items: center;
          padding: 14px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(10px);
          border-radius: 18px;
          transition: transform 0.25s ease, border-color 0.25s ease,
            background 0.25s ease;
        }

        .playlist-card:hover {
          transform: translateY(-2px);
          border-color: rgba(255, 255, 255, 0.26);
          background: rgba(255, 255, 255, 0.09);
        }

        .thumb-wrap {
          position: relative;
          flex: 0 0 92px;
          width: 92px;
          height: 92px;
          border-radius: 14px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.08);
        }

        .thumb {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .play-button {
          position: absolute;
          inset: 0;
          margin: auto;
          width: 46px;
          height: 46px;
          border: none;
          border-radius: 999px;
          background: rgba(10, 24, 109, 0.78);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .play-button:hover {
          transform: scale(1.05);
          background: rgba(255, 146, 146, 0.92);
        }

        .play-icon {
          width: 0;
          height: 0;
          border-top: 9px solid transparent;
          border-bottom: 9px solid transparent;
          border-left: 14px solid #ffffff;
          margin-left: 3px;
        }

        .pause-icon {
          display: flex;
          gap: 4px;
        }

        .pause-icon span {
          width: 4px;
          height: 16px;
          border-radius: 10px;
          background: #ffffff;
          display: block;
        }

        .track-info {
          min-width: 0;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .track-main {
          min-width: 0;
          flex: 1;
        }

        .track-main h3 {
          margin: 0 0 8px;
          font-family: Helvetica, Arial, sans-serif;
          font-size: 17px;
          font-weight: 700;
          line-height: 1.3;
          color: #ffffff;
        }

        .meta-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .duration {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.78);
          white-space: nowrap;
        }

        .download-link {
          flex: 0 0 auto;
          color: #ffffff;
          text-decoration: none;
          font-size: 14px;
          font-weight: 700;
          border-bottom: 1px solid rgba(255, 255, 255, 0.4);
          transition: color 0.2s ease, border-color 0.2s ease;
        }

        .download-link:hover {
          color: #ff9292;
          border-color: #ff9292;
        }

        .wave {
          display: flex;
          align-items: flex-end;
          gap: 3px;
          height: 16px;
          width: 28px;
          opacity: 0.45;
        }

        .wave span {
          display: block;
          width: 3px;
          height: 5px;
          border-radius: 999px;
          background: #ff9292;
        }

        .wave.active {
          opacity: 1;
        }

        .wave.active span:nth-child(1) {
          animation: wave 0.9s ease-in-out infinite;
        }

        .wave.active span:nth-child(2) {
          animation: wave 0.9s ease-in-out 0.15s infinite;
        }

        .wave.active span:nth-child(3) {
          animation: wave 0.9s ease-in-out 0.3s infinite;
        }

        .wave.active span:nth-child(4) {
          animation: wave 0.9s ease-in-out 0.45s infinite;
        }

        @keyframes wave {
          0%,
          100% {
            height: 5px;
            opacity: 0.5;
          }
          50% {
            height: 16px;
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .playlist-section {
            margin-top: 32px;
          }

          .playlist-header h2 {
            font-size: 24px;
          }

          .playlist-card {
            align-items: flex-start;
            padding: 12px;
          }

          .thumb-wrap {
            flex-basis: 82px;
            width: 82px;
            height: 82px;
          }

          .track-info {
            flex-direction: column;
            align-items: flex-start;
          }

          .track-main h3 {
            font-size: 15px;
            margin-bottom: 7px;
          }

          .download-link {
            margin-top: 2px;
            font-size: 13px;
          }
        }
      `}</style>
    </section>
  );
};

export default PlaylistSection;

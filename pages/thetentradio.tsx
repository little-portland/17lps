import React, { useEffect, useMemo, useRef, useState } from "react";
import Head from "next/head";
// If you actually use this container, keep it. Otherwise remove.
import CenterContainer from "@components/UX/CenterContainer/CenterContainer";

// ---------- Types & Data (replace with your real files) ----------
type Track = {
  id: string;
  title: string;
  artist: string;
  src: string;   // /public/audio/*.mp3
  cover: string; // /public/covers/*.jpg
  duration?: number;
};

const tracks: Track[] = [
  {
    id: "24",
    title: "The Tent (at the End of the Universe) 24 [with Alia Indigo]",
    artist: "OpenLab",
    src: "/audio/tent-24.mp3",
    cover: "/covers/tent-24.jpg",
  },
  {
    id: "sEmoa",
    title: "The Tent (at the End of the Universe) [with sEmoa]",
    artist: "OpenLab",
    src: "/audio/tent-semoa.mp3",
    cover: "/covers/tent-semoa.jpg",
  },
  {
    id: "22",
    title: "The Tent (at the End of the Universe) 22 [with Bugsy]",
    artist: "OpenLab",
    src: "/audio/tent-22.mp3",
    cover: "/covers/tent-22.jpg",
  },
  {
    id: "21",
    title: "The Tent (at the End of the Universe) 21",
    artist: "OpenLab",
    src: "/audio/tent-21.mp3",
    cover: "/covers/tent-21.jpg",
  },
  {
    id: "20",
    title: "The Tent (at the End of the Universe) 20",
    artist: "OpenLab",
    src: "/audio/tent-20.mp3",
    cover: "/covers/tent-20.jpg",
  },
];

// ---------- Page ----------
export default function Playlist() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = useMemo(() => tracks[currentIndex], [currentIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => setProgress(audio.currentTime || 0);
    const onLoaded = () => setDuration(audio.duration || 0);
    const onEnded = () =>
      setCurrentIndex((i) => (i + 1) % tracks.length); // auto-next

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, [currentIndex]);

  useEffect(() => {
    // When track changes, start playing
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  }, [currentIndex]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      await audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const seek = (val: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = val;
    setProgress(val);
  };

  const pretty = (s?: number) => {
    if (!s && s !== 0) return "0:00";
    const m = Math.floor(s / 60);
    const ss = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${ss}`;
  };

  return (
    <>
      <Head>
        <title>17 Little Portland Street — The Tent Radio</title>
          <style>{`
          html, body {
            margin: 0;
            padding: 0;
            background-color: #000000!important;
            background-image: url('/images/stars-sky.jpg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            min-height: 100%;
          }
        `}</style>
      </Head>

      <CenterContainer>
        <header className="hero">
          <div className="hero__glow" />
          <h1>The Tent Radio</h1>
          <p>BALEARIC, WORLD, DOWNTEMPO, ELECTRONICA</p>
        </header>

        <section className="list" aria-label="Playlist">
          {tracks.map((t, i) => {
            const active = i === currentIndex;
            return (
              <button
                key={t.id}
                className={`row ${active ? "row--active" : ""}`}
                onClick={() => setCurrentIndex(i)}
                aria-pressed={active}
              >
                <div className="thumb">
                  {/* use <img> so this works without next/image config */}
                  <img src={t.cover} alt="" />
                  <div className="thumb__shine" />
                </div>
                <div className="meta">
                  <h3 className="title">{t.title}</h3>
                  <p className="byline">by {t.artist}</p>
                </div>
                <div className="cta">
                  <span className="time">
                    {active ? pretty(progress) : ""}
                  </span>
                  <span className="pill">
                    {active && isPlaying ? "Playing" : active ? "Paused" : "Play"}
                  </span>
                </div>
              </button>
            );
          })}
        </section>
      </CenterContainer>

      {/* Sticky player */}
      <div className="player">
        <div className="player__content">
          <div className="player__art">
            <img src={currentTrack.cover} alt="" />
          </div>

          <div className="player__info">
            <div className="player__titles">
              <strong className="lineClamp">{currentTrack.title}</strong>
              <span className="muted lineClamp">{currentTrack.artist}</span>
            </div>

            <div className="player__bar">
              <span className="muted small">{pretty(progress)}</span>
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={Math.min(progress, duration || 0)}
                onChange={(e) => seek(Number(e.target.value))}
              />
              <span className="muted small">{pretty(duration)}</span>
            </div>
          </div>

          <div className="player__controls">
            <button
              className="icon"
              onClick={() =>
                setCurrentIndex((i) => (i - 1 + tracks.length) % tracks.length)
              }
              aria-label="Previous"
            >
              ◀
            </button>
            <button className="play" onClick={togglePlay} aria-label="Play/Pause">
              {isPlaying ? "Pause" : "Play"}
            </button>
            <button
              className="icon"
              onClick={() => setCurrentIndex((i) => (i + 1) % tracks.length)}
              aria-label="Next"
            >
              ▶
            </button>
          </div>
        </div>

        <audio ref={audioRef} src={currentTrack.src} preload="metadata" />
      </div>

      <style jsx>{`

        :root {
          --card:#0f1117; --ink:#f6f7fb; --muted:#9aa3b2;
          --accent:#7c5cff; --accent2:#00ffd5; --ring:rgba(124,92,255,.35);
        }
        *{box-sizing:border-box}
        .hero{position:relative;padding:64px 20px 20px;text-align:center}
        .hero h1{color:#fff;font-size:44px;margin:0 0 6px}
        .hero p{color:var(--muted);margin:0}
        .hero__glow{position:absolute;inset:0;pointer-events:none;background:
          radial-gradient(60% 40% at 15% 10%, rgba(124,92,255,.28), transparent 60%),
          radial-gradient(40% 40% at 85% 15%, rgba(0,255,213,.22), transparent 60%);
          filter:blur(30px);
        }

        .list{display:flex;flex-direction:column;gap:14px;padding:0 20px 140px}
        .row{
          display:grid;grid-template-columns:132px 1fr auto;gap:18px;align-items:center;
          padding:16px;border-radius:18px;background:linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.015));
          backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,.06);
          box-shadow:0 10px 30px rgba(0,0,0,.25);text-align:left;cursor:pointer;
          transition:transform .18s ease, box-shadow .18s ease, border-color .18s ease;
          color:var(--ink);
        }
        .row:hover{transform:translateY(-2px);box-shadow:0 18px 34px rgba(0,0,0,.35);border-color:var(--ring)}
        .row--active{border-color:var(--accent);box-shadow:0 18px 40px rgba(124,92,255,.25)}
        .thumb{position:relative;width:132px;height:132px;border-radius:16px;overflow:hidden}
        .thumb img{width:100%;height:100%;object-fit:cover;display:block}
        .thumb__shine{position:absolute;inset:-25%;background:radial-gradient(50% 50% at 50% 50%, rgba(124,92,255,.3), transparent 55%);mix-blend:screen}
        .meta{display:flex;flex-direction:column;gap:6px}
        .title{font-size:18px;line-height:1.2;margin:0}
        .byline{margin:0;color:var(--muted)}
        .cta{display:flex;flex-direction:column;align-items:flex-end;gap:10px}
        .pill{display:inline-flex;height:34px;align-items:center;border-radius:999px;padding:0 14px;
          background:linear-gradient(90deg, var(--accent), var(--accent2));color:#0a0a0f;font-weight:800;letter-spacing:.2px}
        .time{color:var(--muted);font-variant-numeric:tabular-nums}

        @media (max-width: 720px){
          .row{grid-template-columns:104px 1fr;gap:14px}
          .thumb{width:104px;height:104px}
          .cta{grid-column:1/-1;flex-direction:row;justify-content:space-between;align-items:center}
        }

        .player{position:fixed;left:0;right:0;bottom:0;background:rgba(15,17,23,.86);
          backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.08);padding:14px 16px}
        .player__content{max-width:1080px;margin:0 auto;display:grid;grid-template-columns:auto 1fr auto;gap:16px;align-items:center}
        .player__art{width:60px;height:60px;border-radius:12px;overflow:hidden}
        .player__art img{width:100%;height:100%;object-fit:cover}
        .player__info{display:flex;flex-direction:column;gap:8px}
        .player__titles{display:flex;gap:10px;align-items:baseline}
        .muted{color:var(--muted)} .small{font-size:12px}
        .player__bar{display:grid;grid-template-columns:auto 1fr auto;gap:10px;align-items:center}
        .player__bar input[type="range"]{appearance:none;width:100%;height:8px;border-radius:999px;background:linear-gradient(90deg, var(--accent), var(--accent2));outline:none}
        .player__bar input[type="range"]::-webkit-slider-thumb{appearance:none;width:18px;height:18px;border-radius:50%;background:white;box-shadow:0 4px 16px rgba(124,92,255,.7)}
        .player__controls{display:flex;gap:12px;align-items:center}
        .icon{background:transparent;border:1px solid rgba(255,255,255,.15);color:#fff;padding:8px 10px;border-radius:12px}
        .play{background:linear-gradient(90deg, var(--accent), var(--accent2));color:#0a0a0f;border:0;padding:10px 18px;border-radius:14px;font-weight:800;letter-spacing:.2px}
        .lineClamp{display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden}
      `}</style>
    </>
  );
}

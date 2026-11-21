import { useCallback, useEffect, useRef, useState } from "react";
import { VIDEOS, VIDEO_CATEGORIES } from "../data/videos.js";

const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

/** Video slider with category tabs. Only the tiny poster image loads first; the video file downloads when a visitor taps play. */
export default function VideoShowcase({ tabs = true }) {
  const track = useRef(null);
  const [cat, setCat] = useState("all");
  const [playing, setPlaying] = useState(null);
  const [progress, setProgress] = useState(0);
  const items = cat === "all" ? VIDEOS : VIDEOS.filter((v) => v.cat === cat);

  useEffect(() => { setPlaying(null); track.current?.scrollTo({ left: 0 }); }, [cat]);
  const page = useCallback((dir) => { const el = track.current; if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" }); }, []);
  const onScroll = useCallback(() => { const el = track.current; if (!el) return; const max = el.scrollWidth - el.clientWidth; setProgress(max > 0 ? el.scrollLeft / max : 0); }, []);

  return (
    <div className="gal vids">
      {tabs && (
        <div className="chips" role="group" aria-label="Video categories">
          {VIDEO_CATEGORIES.map(([id, label]) => <button key={id} className={`chip ${cat === id ? "on" : ""}`} aria-pressed={cat === id} onClick={() => setCat(id)}>{label}</button>)}
        </div>
      )}
      <div className="gal-track" ref={track} onScroll={onScroll} tabIndex={0} role="region" aria-roledescription="carousel" aria-label="Videos from our shop"
           onKeyDown={(e) => { if (e.key === "ArrowRight") { e.preventDefault(); page(1); } if (e.key === "ArrowLeft") { e.preventDefault(); page(-1); } }}>
        {items.map((v) => <VideoCard key={v.id} v={v} active={playing === v.id} onPlay={() => setPlaying(v.id)} onStop={() => setPlaying((p) => (p === v.id ? null : p))} />)}
      </div>
      <button className="gal-arrow gal-prev" onClick={() => page(-1)} aria-label="Previous videos">‹</button>
      <button className="gal-arrow gal-next" onClick={() => page(1)} aria-label="Next videos">›</button>
      <div className="gal-bar" aria-hidden="true"><i style={{ width: `${Math.max(12, progress * 100)}%` }} /></div>
    </div>
  );
}

function VideoCard({ v, active, onPlay, onStop }) {
  const card = useRef(null);
  const video = useRef(null);
  useEffect(() => { // stop when scrolled out of view
    if (!active || !card.current) return;
    const io = new IntersectionObserver(([e]) => { if (e.intersectionRatio < 0.25) onStop(); }, { threshold: [0, 0.25, 0.5] });
    io.observe(card.current); return () => io.disconnect();
  }, [active, onStop]);
  useEffect(() => { video.current?.play?.().catch(() => {}); }, [active]);

  return (
    <article ref={card} className={`vid-card ${v.w > v.h ? "land" : "port"}`} style={{ aspectRatio: `${v.w} / ${v.h}` }}>
      {active ? (
        <video ref={video} src={`/assets/videos/${v.id}.mp4`} poster={`/assets/videos/${v.id}-poster.webp`} controls autoPlay playsInline preload="metadata" width={v.w} height={v.h} onEnded={onStop} aria-label={v.title} />
      ) : (
        <button className="vid-open" onClick={onPlay} aria-label={`Play video: ${v.title}`}>
          <img src={`/assets/videos/${v.id}-poster.webp`} alt="" width={v.w} height={v.h} loading="lazy" decoding="async" draggable="false" />
          <span className="vid-play" aria-hidden="true"><svg viewBox="0 0 24 24" width="30" height="30"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg></span>
          <span className="vid-time">{mmss(v.duration)}</span>
          <span className="vid-meta"><strong>{v.title}</strong><small>{v.desc}</small></span>
        </button>
      )}
    </article>
  );
}

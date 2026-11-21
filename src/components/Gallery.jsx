import { useCallback, useEffect, useRef, useState } from "react";
import { GALLERY, GALLERY_SIZES } from "../data/gallery.js";

const src = (g, w) => `/assets/gallery/${g.id}-${w}.webp`;
const srcSet = (g, widths = GALLERY_SIZES) => widths.map((w) => `${src(g, w)} ${w}w`).join(", ");

/* ---------- Lightbox: full-screen viewer (keyboard + swipe) ---------- */
function Lightbox({ items, index, onClose, onIndex }) {
  const g = items[index];
  const closeRef = useRef(null);
  const touchX = useRef(null);
  const go = useCallback((d) => onIndex((index + d + items.length) % items.length), [index, items.length, onIndex]);

  useEffect(() => {
    const opener = document.activeElement;
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; opener?.focus?.(); };
  }, []);
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [go, onClose]);
  useEffect(() => { // preload the next photo
    const n = items[(index + 1) % items.length]; const i = new Image(); i.src = src(n, 1280);
  }, [index, items]);

  return (
    <div className="lb" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={(e) => e.target === e.currentTarget && onClose()}
         onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
         onTouchEnd={(e) => { if (touchX.current == null) return; const dx = e.changedTouches[0].clientX - touchX.current; touchX.current = null; if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1); }}>
      <button ref={closeRef} className="lb-btn lb-close" onClick={onClose} aria-label="Close photo viewer">×</button>
      <button className="lb-btn lb-prev" onClick={() => go(-1)} aria-label="Previous photo">‹</button>
      <figure className="lb-fig">
        <img key={g.id} src={src(g, 1280)} srcSet={srcSet(g)} sizes="100vw" alt={g.alt} width={g.w} height={g.h} style={{ backgroundImage: `url(${g.lqip})` }} />
        <figcaption><strong>{g.title}</strong><span>{index + 1} / {items.length}</span></figcaption>
      </figure>
      <button className="lb-btn lb-next" onClick={() => go(1)} aria-label="Next photo">›</button>
    </div>
  );
}

function useLightbox(items) {
  const [open, setOpen] = useState(null);
  const node = open === null ? null : <Lightbox items={items} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />;
  return [setOpen, node];
}

/* ---------- Carousel (native scroll-snap: smooth on touch, arrows + autoplay on desktop) ---------- */
export function GalleryCarousel({ items = GALLERY, autoplay = true }) {
  const track = useRef(null);
  const pausedUntil = useRef(0);
  const visible = useRef(false);
  const [progress, setProgress] = useState(0);
  const [openAt, lightbox] = useLightbox(items);
  const lightboxOpen = Boolean(lightbox);

  const page = useCallback((dir) => {
    const el = track.current; if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (dir > 0 && el.scrollLeft >= max - 4) el.scrollTo({ left: 0, behavior: "smooth" });
    else el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  }, []);
  const onScroll = useCallback(() => {
    const el = track.current; if (!el) return;
    const max = el.scrollWidth - el.clientWidth; setProgress(max > 0 ? el.scrollLeft / max : 0);
  }, []);
  const pause = (ms = 9000) => { pausedUntil.current = Date.now() + ms; };

  useEffect(() => {
    const el = track.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { visible.current = e.isIntersecting; }, { threshold: 0.3 });
    io.observe(el); return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!autoplay || lightboxOpen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => { if (visible.current && Date.now() > pausedUntil.current && !document.hidden) page(1); }, 4500);
    return () => clearInterval(id);
  }, [autoplay, lightboxOpen, page]);

  return (
    <div className="gal" onMouseEnter={() => pause(60000)} onMouseLeave={() => pause(1500)} onFocus={() => pause(60000)} onBlur={() => pause(1500)} onTouchStart={() => pause(12000)}>
      <div className="gal-track" ref={track} onScroll={onScroll} tabIndex={0} role="region" aria-roledescription="carousel" aria-label="Photos of our shop and work"
           onKeyDown={(e) => { if (e.key === "ArrowRight") { e.preventDefault(); page(1); } if (e.key === "ArrowLeft") { e.preventDefault(); page(-1); } }}>
        {items.map((g, i) => {
          const r = g.w / g.h;
          return (
            <button key={g.id} className="gal-slide" style={{ aspectRatio: `${g.w} / ${g.h}`, backgroundImage: `url(${g.lqip})` }} onClick={() => openAt(i)} aria-label={`Open photo: ${g.title}`}>
              <img src={src(g, 480)} srcSet={srcSet(g, [480, 800])} sizes={`(max-width: 700px) ${Math.round(300 * r)}px, ${Math.round(400 * r)}px`}
                   alt={g.alt} width={g.w} height={g.h} loading="lazy" decoding="async" draggable="false" />
              <span className="gal-cap">{g.title}</span>
            </button>
          );
        })}
      </div>
      <button className="gal-arrow gal-prev" onClick={() => { pause(); page(-1); }} aria-label="Previous photos">‹</button>
      <button className="gal-arrow gal-next" onClick={() => { pause(); page(1); }} aria-label="Next photos">›</button>
      <div className="gal-bar" aria-hidden="true"><i style={{ width: `${Math.max(12, progress * 100)}%` }} /></div>
      {lightbox}
    </div>
  );
}

/* ---------- Photo wall with category filter (Portfolio page) ---------- */
export function GalleryWall({ categories }) {
  const [cat, setCat] = useState("all");
  const items = cat === "all" ? GALLERY : GALLERY.filter((g) => g.cat === cat);
  const [openAt, lightbox] = useLightbox(items);
  const present = categories.filter(([id]) => id === "all" || GALLERY.some((g) => g.cat === id));
  return (
    <>
      <div className="chips" role="group" aria-label="Filter photos">
        {present.map(([id, label]) => <button key={id} className={`chip ${cat === id ? "on" : ""}`} aria-pressed={cat === id} onClick={() => setCat(id)}>{label}</button>)}
      </div>
      <div className="wall">
        {items.map((g, i) => (
          <button key={g.id} className="wall-item" style={{ aspectRatio: `${g.w} / ${g.h}`, backgroundImage: `url(${g.lqip})` }} onClick={() => openAt(i)} aria-label={`Open photo: ${g.title}`}>
            <img src={src(g, 480)} srcSet={srcSet(g, [480, 800])} sizes="(max-width: 700px) 50vw, 33vw" alt={g.alt} width={g.w} height={g.h} loading="lazy" decoding="async" />
            <span className="gal-cap">{g.title}</span>
          </button>
        ))}
      </div>
      {lightbox}
    </>
  );
}

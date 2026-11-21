import { useEffect, useState } from "react";

// Every service / portfolio image is stored in 3 small WebP sizes: <name>-480.webp, -800.webp, -1200.webp
// (made by `npm run optimize`). The browser downloads only the size it needs. If these do not exist yet, we try the
// plain file (<name>.jpg / .png / .webp). If nothing exists, a coloured tile is shown, so the page never breaks.
const WIDTHS = [480, 800, 1200];
const PLAIN = ["jpg", "jpeg", "png", "webp"];

export default function SmartImage({ base, alt = "", icon = "🖨️", ratio = "4 / 3", sizes = "(max-width: 700px) 50vw, 280px", className = "", eager = false }) {
  const [stage, setStage] = useState(0); // 0 = optimized, 1..4 = plain files, 5 = tile
  useEffect(() => setStage(0), [base]);
  const onError = () => setStage((s) => s + 1);
  const common = { alt, decoding: "async", loading: eager ? "eager" : "lazy", onError, draggable: false };

  let img = null;
  if (stage === 0) img = <img {...common} src={`${base}-800.webp`} srcSet={WIDTHS.map((w) => `${base}-${w}.webp ${w}w`).join(", ")} sizes={sizes} fetchPriority={eager ? "high" : "auto"} />;
  else if (stage <= PLAIN.length) img = <img {...common} src={`${base}.${PLAIN[stage - 1]}`} />;

  return (
    <div className={`smart-img ${className}`} style={{ aspectRatio: ratio }}>
      {img || <div className="tile" role="img" aria-label={alt}><span>{icon}</span></div>}
    </div>
  );
}

export const serviceBase = (slug) => `/assets/services/${slug}`;
export const portfolioBase = (id) => `/assets/portfolio/${id}`;

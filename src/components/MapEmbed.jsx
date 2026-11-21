import { BUSINESS } from "../config.js";
import LazyMount from "./LazyMount.jsx";

export default function MapEmbed({ height = 380 }) {
  return (
    <div className="map" style={{ height }}>
      <LazyMount minHeight={height} rootMargin="300px">
        <iframe title="Map showing Technique Printing LLC in Dragon Mart 1, Dubai" src={BUSINESS.mapEmbedSrc} loading="lazy" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" style={{ height }} />
      </LazyMount>
    </div>
  );
}

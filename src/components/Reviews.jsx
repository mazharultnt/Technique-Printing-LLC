import { BUSINESS } from "../config.js";
import { REVIEWS } from "../data/reviews.js";

/** Shows real reviews from src/data/reviews.js. While that list is empty it shows a "Rate us on Google" card (no invented reviews). */
export default function Reviews() {
  if (REVIEWS.length === 0) {
    return (
      <div className="trust-card">
        <p className="stars" aria-hidden="true">★★★★★</p>
        <h3>Worked with us? Tell others about it</h3>
        <p>Your review on Google helps other businesses in Dubai find a print shop they can trust. It takes one minute.</p>
        <a className="btn btn-primary" href={BUSINESS.mapsUrl} target="_blank" rel="noopener noreferrer">Review us on Google</a>
      </div>
    );
  }
  return (
    <div className="reviews">
      {REVIEWS.map((r, i) => (
        <figure key={i} className="review">
          <p className="stars" aria-label="5 out of 5 stars">★★★★★</p>
          <blockquote>{r.text}</blockquote>
          <figcaption><strong>{r.name}</strong><span>{r.role}</span></figcaption>
        </figure>
      ))}
    </div>
  );
}

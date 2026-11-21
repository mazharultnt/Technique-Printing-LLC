import { BUSINESS, waLink } from "../config.js";

/** Big WhatsApp call-to-action section used at the bottom of pages. */
export default function WhatsAppCta({ title = "Ready to start your order?", text = "Send us your idea, logo or file on WhatsApp. We reply with a clear quote, usually the same day." }) {
  return (
    <section className="wa-cta">
      <div className="container wa-inner">
        <div>
          <p className="pill-dark">WhatsApp quotes · No online payment</p>
          <h2>{title}</h2>
          <p>{text}</p>
          <p className="wa-number"><span aria-hidden="true">💬</span> {BUSINESS.phoneDisplay}</p>
        </div>
        <div className="wa-actions">
          <a className="btn btn-wa btn-big" href={waLink("Hello Technique Printing, I need a quote.")} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a>
          <a className="btn btn-outline btn-big" href={`tel:${BUSINESS.phoneTel}`}>Call {BUSINESS.phoneDisplay}</a>
          <a className="link-light" href={BUSINESS.directionsUrl} target="_blank" rel="noopener noreferrer">📍 Get directions to our shop</a>
        </div>
      </div>
    </section>
  );
}

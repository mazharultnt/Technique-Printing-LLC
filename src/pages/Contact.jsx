import { useState } from "react";
import MapEmbed from "../components/MapEmbed.jsx";
import Seo from "../components/Seo.jsx";
import { BUSINESS, waLink } from "../config.js";
import { SERVICES as ALL } from "../data/services.js";
import { breadcrumb } from "../schema.js";

const SERVICES = [...ALL.map((s) => s.title), "Other"];

export default function Contact() {
  const [form, setForm] = useState({ name: "", service: "", message: "" });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  // No server: the form builds a WhatsApp message and opens WhatsApp.
  function submit(e) {
    e.preventDefault();
    const lines = ["Hello Technique Printing! 👋", `My name is ${form.name.trim()}.`];
    if (form.service) lines.push(`I am interested in: ${form.service}`);
    lines.push("", form.message.trim());
    const url = waLink(lines.join("\n"));
    const w = window.open(url, "_blank");
    if (w) w.opener = null; // new tab opened
    else window.location.href = url; // popup blocked: open WhatsApp in this tab
  }

  return (
    <>
      <Seo
        title="Contact Technique Printing | Dragon Mart 1, Dubai | WhatsApp, Phone, Map"
        description="Contact Technique Printing LLC in Dragon Mart 1, International City, Dubai. Message us on WhatsApp, call us or visit our print shop. Address, opening hours and Google Map."
        path="/contact"
        jsonLd={breadcrumb([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])}
      />
      <header className="page-hero"><div className="container">
        <h1>Contact Technique Printing in Dragon Mart 1</h1>
        <p className="lead">Ask for a quote, check a deadline or visit our shop. Write your message below and it opens in WhatsApp, ready to send.</p>
      </div></header>

      <section className="container section contact-grid">
        <div>
          <h2>Contact details</h2>
          <dl className="kv contact-kv">
            <dt>Address</dt><dd><address>{BUSINESS.addressLine}</address></dd>
            <dt>Phone</dt><dd><a href={`tel:${BUSINESS.phoneTel}`}>{BUSINESS.phoneDisplay}</a></dd>
            {BUSINESS.email && <><dt>Email</dt><dd><a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></dd></>}
            <dt>Opening hours</dt><dd>{BUSINESS.hoursList.map((h) => <div key={h.days}><strong>{h.days}</strong>: {h.time}</div>)}</dd>
          </dl>
          <p className="muted">Sending artwork? Press the WhatsApp button, then attach your file in the chat. We check files for free before printing.</p>
          <div className="card-actions">
            <a className="btn btn-primary" href={BUSINESS.directionsUrl} target="_blank" rel="noopener noreferrer">Get directions</a>
            <a className="btn btn-ghost" href={BUSINESS.mapsUrl} target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
          </div>
        </div>

        <form className="panel" onSubmit={submit}>
          <h2>Send us a message</h2>
          <label>Your name<input required minLength={2} maxLength={100} autoComplete="name" value={form.name} onChange={set("name")} /></label>
          <label>What do you need?
            <select value={form.service} onChange={set("service")}><option value="">Choose a service</option>{SERVICES.map((s) => <option key={s}>{s}</option>)}</select>
          </label>
          <label>Message<textarea required minLength={5} maxLength={1000} rows={5} placeholder="Tell us what you need, the quantity, size and deadline…" value={form.message} onChange={set("message")} /></label>
          <button className="btn btn-wa btn-block">Send on WhatsApp</button>
          <p className="hint center">WhatsApp opens with your message ready. Just press send.</p>
        </form>
      </section>

      <section className="container section"><h2>Find us on the map</h2><MapEmbed height={420} /></section>
    </>
  );
}

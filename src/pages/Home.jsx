import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard.jsx";
import Faq from "../components/Faq.jsx";
import { GalleryCarousel } from "../components/Gallery.jsx";
import LazyMount from "../components/LazyMount.jsx";
import MapEmbed from "../components/MapEmbed.jsx";
import Reviews from "../components/Reviews.jsx";
import Seo from "../components/Seo.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import VideoShowcase from "../components/VideoShowcase.jsx";
import WhatsAppCta from "../components/WhatsAppCta.jsx";
import { BUSINESS, waLink } from "../config.js";
import { HOME_FAQS } from "../data/faqs.js";
import { POSTS } from "../data/posts.js";
import { SERVICE_CATEGORIES, serviceBySlug } from "../data/services.js";
import { faqSchema } from "../schema.js";

const WHY = [
  ["26 services, one shop", "Printing, embroidery, signs, acrylic, engraving and gifts. You do not need to visit many shops."],
  ["Walk in or message us", "Visit our shop WKB-13 / WKB-09 in Dragon Mart 1, or send your idea on WhatsApp from anywhere."],
  ["Clear quote, no online payment", "We send the price on WhatsApp first. You pay only after you agree the price and the artwork."],
  ["We check your artwork", "We check size, colours and spelling before we print, so you avoid expensive mistakes."],
  ["Small and large orders", "One engraved gift or one thousand uniforms. We say yes to both."],
  ["Real shop, real work", "See our real photos and videos below. What you see is what we make in Dubai."],
];
const STEPS = [
  ["Tell us what you need", "Message us on WhatsApp or visit the shop. Share your idea, logo, quantity and deadline."],
  ["Send your artwork", "Send a PDF, AI, PNG or JPG. No file yet? We help you design it."],
  ["Get your quote", "We reply with a clear price and the time needed. No hidden costs."],
  ["Approve and we produce", "You approve the artwork, then our team prints, cuts, engraves or stitches your order."],
  ["Collect or get delivery", "Collect from Dragon Mart 1, or ask us about delivery in Dubai."],
];
const INDUSTRIES = ["Construction and contracting", "Restaurants and cafes", "Offices and corporate companies", "Schools and training centres", "Events and exhibitions", "Retail shops", "Real estate agencies", "Logistics and transport", "Clinics and salons", "Individuals and gifts"];

export default function Home() {
  return (
    <>
      <Seo
        title="Printing in Dragon Mart 1, Dubai | Uniforms, Signage, DTF, UV, Laser Engraving | Technique Printing"
        description="Technique Printing LLC in Dragon Mart 1, Dubai: 26 printing and branding services including uniform embroidery, signage, large format, DTF, UV, laser engraving and corporate gifts. Get a quote on WhatsApp."
        path="/"
        jsonLd={faqSchema(HOME_FAQS)}
      />

      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="pill">Shop WKB-13 / WKB-09 · Dragon Mart 1, Dubai</p>
            <h1>Printing, branding and gifts in Dubai</h1>
            <p className="lead">From staff uniforms and shop signs to stickers, engraved gifts and corporate gift sets. Tell us what you need and we send you a clear quote on WhatsApp.</p>
            <div className="hero-cta">
              <a className="btn btn-wa btn-big" href={waLink("Hello Technique Printing, I need a quote.")} target="_blank" rel="noopener noreferrer">Get a quote on WhatsApp</a>
              <Link className="btn btn-ghost btn-big" to="/services">See all 26 services</Link>
            </div>
            <ul className="hero-points"><li>Walk-in shop</li><li>Small and bulk orders</li><li>Free artwork check</li></ul>
          </div>
          <div className="hero-photo">
            <i className="blob b1" aria-hidden="true" /><i className="blob b2" aria-hidden="true" /><i className="blob b3" aria-hidden="true" />
            <img src="/assets/gallery/wkb-13-shop-front-800.webp" srcSet="/assets/gallery/wkb-13-shop-front-480.webp 480w, /assets/gallery/wkb-13-shop-front-800.webp 800w" sizes="(max-width: 900px) 92vw, 520px"
                 width="800" height="600" alt="Technique Printing shop WKB-13 inside Dragon Mart 1, Dubai" fetchPriority="high" decoding="async" />
            <span className="photo-badge">📍 Dragon Mart 1, International City</span>
          </div>
        </div>
      </section>

      <section className="trust-bar" aria-label="Why customers choose us">
        <div className="container trust-grid">
          <div><strong>26</strong><span>printing and branding services</span></div>
          <div><strong>Walk-in</strong><span>shop in Dragon Mart 1</span></div>
          <div><strong>WhatsApp</strong><span>quotes, no online payment</span></div>
          <div><strong>1 to 1000+</strong><span>pieces, small or bulk orders</span></div>
        </div>
      </section>

      <section className="container section" id="services">
        <div className="section-head"><div><h2>Our 26 printing and branding services</h2><p className="muted">Everything your business needs, in five groups. Open any service for details, or press Get quote.</p></div><Link className="btn btn-ghost" to="/services">Services page</Link></div>
        {SERVICE_CATEGORIES.map((c, ci) => (
          <div key={c.id} className="cat-block">
            <h3 className="cat-title"><span aria-hidden="true">{c.icon}</span> {c.title}</h3>
            <p className="muted">{c.text}</p>
            <div className="grid">{c.slugs.map((s, i) => <ServiceCard key={s} service={serviceBySlug(s)} eager={ci === 0 && i < 2} />)}</div>
          </div>
        ))}
      </section>

      <section className="band"><div className="container section">
        <h2>Why customers choose Technique Printing</h2>
        <div className="features features-3">{WHY.map(([h, t]) => <div key={h} className="feature"><h3>{h}</h3><p>{t}</p></div>)}</div>
      </div></section>

      <section className="container section">
        <h2>How your order works</h2>
        <ol className="steps steps-5">{STEPS.map(([h, t]) => <li key={h}><h3>{h}</h3><p>{t}</p></li>)}</ol>
      </section>

      <section className="showcase" id="work"><div className="container section">
        <div className="section-head">
          <div><h2>See our shop and our work</h2><p className="muted">Real photos and videos from our shop in Dragon Mart 1: engraved gifts, apparel, awards, corporate gift sets and live production.</p></div>
          <Link className="btn btn-ghost" to="/portfolio">Open full portfolio</Link>
        </div>
        <LazyMount minHeight={420}><GalleryCarousel /></LazyMount>
        <h3 className="sub">Watch our workshop and stock</h3>
        <p className="sub-note">Tap a video to play it. Videos load only when you press play, so the page stays fast.</p>
        <LazyMount minHeight={460}><VideoShowcase /></LazyMount>
      </div></section>

      <section className="container section">
        <h2>Who we work with</h2>
        <p className="muted">Companies and people across Dubai, Sharjah and Ajman trust a local print shop for branded materials.</p>
        <ul className="chips-light">{INDUSTRIES.map((i) => <li key={i}>{i}</li>)}</ul>
      </section>

      <section className="band"><div className="container section split">
        <div>
          <h2>Find us in Dragon Mart 1</h2>
          <p>Our shop is inside Dragon Mart 1, International City, Dubai. Come to see material samples, ask questions and collect your finished order.</p>
          <address className="addr">{BUSINESS.addressLine}<br />{BUSINESS.hours}</address>
          <div className="hero-cta">
            <a className="btn btn-primary" href={BUSINESS.directionsUrl} target="_blank" rel="noopener noreferrer">Get directions</a>
            <Link className="btn btn-ghost" to="/contact">Contact details</Link>
          </div>
        </div>
        <MapEmbed height={340} />
      </div></section>

      <section className="container section"><h2>Customer trust</h2><Reviews /></section>

      <section className="container section">
        <div className="section-head"><h2>Printing tips and guides</h2><Link className="btn btn-ghost" to="/blog">Read the blog</Link></div>
        <div className="posts">{POSTS.slice(0, 3).map((p) => <BlogCard key={p.slug} post={p} />)}</div>
      </section>

      <div className="container section narrow-wide"><Faq items={HOME_FAQS} /></div>
      <WhatsAppCta />
    </>
  );
}

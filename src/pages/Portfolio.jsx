import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { GalleryWall } from "../components/Gallery.jsx";
import LazyMount from "../components/LazyMount.jsx";
import Seo from "../components/Seo.jsx";
import SmartImage, { portfolioBase } from "../components/SmartImage.jsx";
import VideoShowcase from "../components/VideoShowcase.jsx";
import WhatsAppCta from "../components/WhatsAppCta.jsx";
import { BUSINESS } from "../config.js";
import { GALLERY, GALLERY_CATEGORIES } from "../data/gallery.js";
import { PORTFOLIO } from "../data/portfolio.js";
import { SERVICES, serviceBySlug } from "../data/services.js";
import { breadcrumb } from "../schema.js";

export default function Portfolio() {
  const [service, setService] = useState("");
  const items = useMemo(() => PORTFOLIO.filter((p) => !service || p.service === service), [service]);
  return (
    <>
      <Seo
        title="Our Work | Photo Gallery & Videos | Technique Printing, Dragon Mart 1, Dubai"
        description="See our real shop and work in Dubai: engraved gifts, phone cases, apparel, bags, awards, corporate gift sets and live production videos from Technique Printing in Dragon Mart 1."
        path="/portfolio"
        jsonLd={[breadcrumb([{ name: "Home", path: "/" }, { name: "Portfolio", path: "/portfolio" }]), { "@context": "https://schema.org", "@type": "ImageGallery", name: "Technique Printing shop and work photos", image: GALLERY.map((g) => ({ "@type": "ImageObject", contentUrl: `${BUSINESS.siteUrl}/assets/gallery/${g.id}-1280.webp`, name: g.title, description: g.alt })) }]}
      />
      <header className="page-hero"><div className="container">
        <h1>Our work: photos and videos</h1>
        <p className="lead">Real photos and videos from our shop in Dragon Mart 1, Dubai. See what we make, how we make it, and the gifts and products we print for companies every day.</p>
        <ul className="chips-light jump"><li><a href="#photos">📷 Photo gallery</a></li><li><a href="#videos">🎬 Video showcase</a></li><li><a href="#by-service">🧩 Work by service</a></li></ul>
      </div></header>

      <section className="container section" id="photos">
        <h2>Photo gallery</h2>
        <p className="muted">Tap any photo to see it full size. Use the filters to find what you need.</p>
        <LazyMount minHeight={500}><GalleryWall categories={GALLERY_CATEGORIES} /></LazyMount>
      </section>

      <section className="showcase" id="videos"><div className="container section">
        <h2>Video showcase</h2>
        <p className="sub-note">Live production in our shop, a walk through our shop, and our corporate gift range. Videos load only when you press play.</p>
        <LazyMount minHeight={460}><VideoShowcase /></LazyMount>
      </div></section>

      <section className="container section" id="by-service">
        <h2>Our work by service</h2>
        <p className="muted">Examples of the kind of jobs we do for each of our 26 services.</p>
        <div className="toolbar">
          <select value={service} onChange={(e) => setService(e.target.value)} aria-label="Filter by service">
            <option value="">All services</option>
            {SERVICES.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
          </select>
          <span className="muted">{items.length} projects</span>
        </div>
        <div className="grid">
          {items.map((p) => {
            const s = serviceBySlug(p.service);
            return (
              <article key={p.id} className="card">
                <div className="card-media"><SmartImage base={portfolioBase(p.id)} alt={p.title} icon={s?.icon} sizes="(max-width: 560px) 50vw, (max-width: 900px) 33vw, 290px" /></div>
                <div className="card-body">
                  <p className="card-cat"><Link to={`/services/${p.service}`}>{s?.title}</Link></p>
                  <h3>{p.title}</h3>
                  <p className="card-desc">{p.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="band"><div className="container section prose-wide">
        <h2>Quality you can see and touch</h2>
        <p>Every job is checked by our team before it leaves the shop. We look at colour, size, cutting and finish. To see real samples, visit us in Dragon Mart 1 and we will show you the materials.</p>
        <p>Have a project in mind? <Link to="/services">Browse our services</Link> or message us on WhatsApp and we will send you a quote.</p>
      </div></section>
      <WhatsAppCta title="Start your project with us" text="Tell us your idea. We help you from artwork to finished product." />
    </>
  );
}

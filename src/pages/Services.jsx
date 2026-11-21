import Faq from "../components/Faq.jsx";
import Seo from "../components/Seo.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import WhatsAppCta from "../components/WhatsAppCta.jsx";
import { SERVICE_CATEGORIES, serviceBySlug } from "../data/services.js";
import { breadcrumb, faqSchema } from "../schema.js";

const FAQS = [
  { q: "How do I get a price for a service?", a: "Open the service and press Get quote. WhatsApp opens with the service name ready. Tell us what you need and we reply with a clear price." },
  { q: "Can I order only a few pieces?", a: "Yes. Many services, such as UV printing, laser engraving and DTF printing, are good for small orders." },
  { q: "Which file should I send for printing?", a: "A PDF or AI file is best. We also accept PSD, PNG and high-quality JPG files. If you only have an idea, we can help with the design." },
  { q: "Do you do bulk and company orders?", a: "Yes. We print for small shops and large companies, from one piece to thousands. Tell us the quantity and the deadline." },
];

export default function Services() {
  return (
    <>
      <Seo
        title="26 Printing & Branding Services in Dubai | Technique Printing, Dragon Mart 1"
        description="All services at Technique Printing in Dragon Mart 1, Dubai: uniform printing and embroidery, large format, acrylic cutting, UV, DTF, laser engraving, signage, stickers, gifts, bags, flex, canvas, vests, trophies, neon signs and more."
        path="/services"
        jsonLd={[breadcrumb([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]), faqSchema(FAQS)]}
      />
      <header className="page-hero"><div className="container">
        <h1>Our 26 printing and branding services</h1>
        <p className="lead">Technique Printing LLC makes everything from staff uniforms and shop signs to engraved gifts and neon signs, all from our shop in Dragon Mart 1, Dubai.</p>
        <ul className="chips-light jump">{SERVICE_CATEGORIES.map((c) => <li key={c.id}><a href={`#${c.id}`}>{c.icon} {c.title}</a></li>)}</ul>
      </div></header>

      <section className="container section">
        {SERVICE_CATEGORIES.map((c) => (
          <div key={c.id} id={c.id} className="cat-block">
            <h2 className="cat-title"><span aria-hidden="true">{c.icon}</span> {c.title}</h2>
            <p className="muted">{c.text}</p>
            <div className="grid">{c.slugs.map((s) => <ServiceCard key={s} service={serviceBySlug(s)} />)}</div>
          </div>
        ))}
      </section>

      <section className="band"><div className="container section prose-wide">
        <h2>One printing partner for your whole business</h2>
        <p>Many companies in Dubai need several kinds of printing: uniforms for staff, signs for the shop, stickers for products, gifts for clients and banners for events. At Technique Printing LLC you can get all of this from one team in Dragon Mart 1. That saves you time, keeps your brand colours the same everywhere and makes it easy to reorder.</p>
        <h2>How to choose the right service</h2>
        <p>Not sure which service is best? Send us a photo or an idea. DTF printing is great for colourful t-shirts in small numbers, while screen printing is better for very large orders. UV printing and laser engraving work well on hard items like wood, glass and metal. Flex printing and outdoor stickers are made for sun and rain. We always tell you the best choice for your budget.</p>
      </div></section>

      <div className="container section narrow-wide"><Faq items={FAQS} /></div>
      <WhatsAppCta title="Tell us what you need to print" />
    </>
  );
}

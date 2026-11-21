import { Link, useParams } from "react-router-dom";
import Faq from "../components/Faq.jsx";
import Seo from "../components/Seo.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import SmartImage, { serviceBase } from "../components/SmartImage.jsx";
import WhatsAppCta from "../components/WhatsAppCta.jsx";
import { BUSINESS, quoteLink } from "../config.js";
import { categoryOfService, SERVICES, serviceBySlug } from "../data/services.js";
import { breadcrumb, faqSchema } from "../schema.js";

const STEPS = ["Message us with your idea, quantity and deadline.", "Send your logo or artwork. We check it for free.", "Get a clear quote on WhatsApp.", "Approve the artwork. We produce your order.", "Collect from Dragon Mart 1, or ask about delivery."];

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = serviceBySlug(slug);
  if (!service) return <div className="container section"><h1>Service not found</h1><Link to="/services">See all services</Link></div>;

  const faqs = service.faqs.map(([q, a]) => ({ q, a }));
  const cat = categoryOfService(slug);
  const related = (cat ? cat.slugs.filter((s) => s !== slug) : []).concat(SERVICES.map((s) => s.slug)).filter((s, i, a) => s !== slug && a.indexOf(s) === i).slice(0, 4).map(serviceBySlug);
  const path = `/services/${slug}`;

  return (
    <>
      <Seo
        title={`${service.title} in Dubai | Technique Printing, Dragon Mart 1`}
        description={`${service.short} ${service.title} at Technique Printing LLC, Dragon Mart 1, Dubai. Get a quote on WhatsApp.`}
        path={path}
        jsonLd={[
          { "@context": "https://schema.org", "@type": "Service", name: service.title, description: service.short, areaServed: "Dubai, UAE", provider: { "@id": `${BUSINESS.siteUrl}/#business` }, url: `${BUSINESS.siteUrl}${path}` },
          breadcrumb([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: service.title, path }]),
          faqSchema(faqs),
        ]}
      />
      <div className="container section">
        <nav className="crumbs" aria-label="Breadcrumb"><Link to="/">Home</Link> / <Link to="/services">Services</Link> / <span aria-current="page">{service.title}</span></nav>
        <div className="detail">
          <SmartImage base={serviceBase(slug)} alt={`${service.title} in Dubai`} icon={service.icon} className="detail-media" sizes="(max-width: 900px) 92vw, 560px" eager />
          <div>
            {cat && <p className="card-cat">{cat.title}</p>}
            <h1>{service.title} in Dubai</h1>
            <p className="lead">{service.short}</p>
            <div className="card-actions">
              <a className="btn btn-wa btn-big" href={quoteLink(service.title)} target="_blank" rel="noopener noreferrer">Get a quote on WhatsApp</a>
              <a className="btn btn-ghost btn-big" href={`tel:${BUSINESS.phoneTel}`}>Call us</a>
            </div>
            <p className="hint">WhatsApp opens with this service name ready. No online payment: we reply with a quote first.</p>
            <ul className="ticks"><li>Made in our shop in Dragon Mart 1, Dubai</li><li>Small and bulk orders</li><li>Free artwork check</li></ul>
          </div>
        </div>

        <div className="detail-body">
          <article className="prose">
            <h2>About {service.title.toLowerCase()}</h2>
            {service.what.map((t, i) => <p key={i}>{t}</p>)}
            <h2>Good for</h2>
            <ul>{service.bestFor.map((b) => <li key={b}>{b}</li>)}</ul>
            <h2>How your order works</h2>
            <ol>{STEPS.map((t) => <li key={t}>{t}</li>)}</ol>
          </article>
          <aside className="panel">
            <h2>Tips before you order</h2>
            <ul className="ticks">{service.tips.map((t) => <li key={t}>{t}</li>)}</ul>
            <p className="hint">Send your logo as PDF, AI, PSD, PNG or high-quality JPG.</p>
          </aside>
        </div>

        <Faq items={faqs} title={`${service.title}: common questions`} />
        <h2>More services you may need</h2>
        <div className="grid">{related.map((s) => <ServiceCard key={s.slug} service={s} />)}</div>
      </div>
      <WhatsAppCta title={`Need ${service.title.toLowerCase()}?`} text="Message us on WhatsApp and we will reply with a clear quote." />
    </>
  );
}

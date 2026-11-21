import { Link } from "react-router-dom";
import WhatsAppCta from "../components/WhatsAppCta.jsx";
import MapEmbed from "../components/MapEmbed.jsx";
import Seo from "../components/Seo.jsx";
import { BUSINESS } from "../config.js";
import { breadcrumb } from "../schema.js";

// TODO: add your founding year, team story and real photos of the shop. They build trust and help the page rank.
const EXPERTISE = [
  ["Uniforms and textiles", "Company labour uniforms, polo shirts, caps, safety vests and bags with embroidery, DTF or screen printing."],
  ["Signs and large format", "Signage, flex banners, large format prints, foam board, office signs and outdoor stickers."],
  ["Acrylic, UV and engraving", "2D and 3D acrylic cutting, UV printing, laser engraving, crystal trophies and canvas with frame."],
  ["Stickers, tags and small items", "Custom die-cut stickers, tags, pad printing and promotional gifts."],
];
const VALUES = [
  ["Simple and honest", "We explain materials and methods in easy words, and we send a clear quote before we start. There is no online payment."],
  ["Checked before printed", "We check size, colours, spelling and artwork quality, so you do not pay for avoidable mistakes."],
  ["Easy to reach", "Message us on WhatsApp, call us, or visit our shop in Dragon Mart 1 and talk to the team that will make your job."],
];

export default function About() {
  return (
    <>
      <Seo
        title="About Technique Printing LLC | Print Shop in Dragon Mart 1, Dubai"
        description="Learn about Technique Printing LLC, a commercial print shop in Dragon Mart 1, International City, Dubai. Our services, how we work and how to find our shop."
        path="/about"
        jsonLd={breadcrumb([{ name: "Home", path: "/" }, { name: "About us", path: "/about" }])}
      />
      <header className="page-hero"><div className="container">
        <h1>About Technique Printing LLC</h1>
        <p className="lead">A commercial print shop in Dragon Mart 1, Dubai, helping businesses and individuals turn ideas into printed, engraved, cut and embroidered products.</p>
      </div></header>

      <section className="container section prose-wide">
        <h2>Who we are</h2>
        <p>{BUSINESS.name} is a commercial printing company located inside Dragon Mart 1 in International City, Dubai. We work with shop owners, construction and facility companies, restaurants, schools, offices, event organisers and individual customers who need reliable work and a team they can reach quickly.</p>
        <p>Printing can be confusing when you do not know which material, finish or method to choose. We explain the options in plain language, recommend what suits your budget, and make sure your artwork is ready before we start. Our guides on the <Link to="/blog">printing blog</Link> share the same advice we give in the shop.</p>

        <h2>What we print</h2>
        <div className="features">{EXPERTISE.map(([h, t]) => <div key={h} className="feature"><h3>{h}</h3><p>{t}</p></div>)}</div>
        <p>See all 26 services on our <Link to="/services">services page</Link>.</p>

        <h2>How we work</h2>
        <div className="features">{VALUES.map(([h, t]) => <div key={h} className="feature"><h3>{h}</h3><p>{t}</p></div>)}</div>

        <h2>Visit our shop in Dragon Mart 1</h2>
        <p>Dragon Mart 1 is one of Dubai's best-known trading hubs, and our shop makes it simple to drop in, see material and finish samples, and collect urgent jobs. Customers come to us from across Dubai, Sharjah and Ajman.</p>
        <address className="addr">{BUSINESS.addressLine}<br />{BUSINESS.hours}<br /><a href={`tel:${BUSINESS.phoneTel}`}>{BUSINESS.phoneDisplay}</a><br /><a href={BUSINESS.directionsUrl} target="_blank" rel="noopener noreferrer">Get directions</a></address>
        <MapEmbed />
      </section>
      <WhatsAppCta title="Let's print something great" text="Tell us about your project and we will recommend the right service and finish." />
    </>
  );
}

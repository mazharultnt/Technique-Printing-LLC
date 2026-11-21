import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { BUSINESS, waLink } from "../config.js";

const icon = (children, fill = "none") => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);
const ICONS = {
  instagram: icon(<><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></>),
  facebook: icon(<path d="M14 8.5h2.5V4.7H14a4 4 0 0 0-4 4V11H7.5v3.8H10V21h3.8v-6.2h2.6l.6-3.8h-3.2V9.2c0-.4.3-.7.7-.7z" fill="currentColor" stroke="none" />),
  youtube: icon(<><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="M10 9.5v5l4.5-2.5z" fill="currentColor" stroke="none" /></>),
  whatsapp: icon(<><path d="M3.5 20.5l1.4-4.3A8.5 8.5 0 1 1 8 19.3l-4.5 1.2z" /><path d="M9 8.8c0 3 2.2 5.4 5.6 6l1.3-1.4-1.9-1-.9.7c-.8-.3-1.6-1.1-2-2l.7-.9-1-1.9z" fill="currentColor" stroke="none" /></>),
};

const NAV = [
  ["/", "Home"],
  ["/services", "Services"],
  ["/portfolio", "Portfolio"],
  ["/about", "About"],
  ["/blog", "Blog"],
  ["/contact", "Contact"],
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="container bar">
          <Link to="/" className="brand" aria-label="Technique Printing LLC home">
            <img src="/logo-sm.png" alt="Technique Printing LLC" width="70" height="51" />
          </Link>
          <button className="burger" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>
            <span className="sr">Menu</span><i /><i /><i />
          </button>
          <nav id="main-nav" className={open ? "open" : ""} aria-label="Main">
            {NAV.map(([to, label]) => <NavLink key={to} to={to} end={to === "/"}>{label}</NavLink>)}
            <a className="btn btn-small" href={waLink("Hello Technique Printing, I need a quote.")} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
          </nav>
        </div>
      </header>

      <main id="main"><Outlet /></main>

      <footer className="site-footer">
        <div className="container foot">
          <div>
            <strong>{BUSINESS.name}</strong>
            <p>Printing, signage, embroidery and customization in Dragon Mart 1, International City, Dubai.</p>
            <address>
              {BUSINESS.addressLine}<br />
              <a href={`tel:${BUSINESS.phoneTel}`}>{BUSINESS.phoneDisplay}</a><br />
              {BUSINESS.email && <><a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a><br /></>}
              {BUSINESS.hours}
            </address>
            <ul className="social-icons" aria-label="Follow and contact us">
              {[["instagram", BUSINESS.instagramUrl, "Instagram"], ["facebook", BUSINESS.facebookUrl, "Facebook"], ["youtube", BUSINESS.youtubeUrl, "YouTube"], ["whatsapp", BUSINESS.whatsappUrl, "WhatsApp"]].map(([k, href, label]) => (
                <li key={k}><a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Technique Printing on ${label}`} title={label}>{ICONS[k]}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <strong>Services</strong>
            <ul>
              <li><Link to="/services/uniform-printing-embroidery">Uniform printing</Link></li>
              <li><Link to="/services/dtf-printing">DTF printing</Link></li>
              <li><Link to="/services/signage-printing">Signage printing</Link></li>
              <li><Link to="/services/laser-engraving">Laser engraving</Link></li>
              <li><Link to="/services/promotional-gift-customization">Corporate gifts</Link></li>
              <li><Link to="/services">All 26 services</Link></li>
            </ul>
          </div>
          <div>
            <strong>Company</strong>
            <ul>
              {NAV.slice(2).map(([to, l]) => <li key={to}><Link to={to}>{l}</Link></li>)}
            </ul>
          </div>
        </div>
        <p className="container copy">© {new Date().getFullYear()} {BUSINESS.name}.</p>
      </footer>

      <div className="mobile-cta" role="region" aria-label="Quick contact">
        <a href={`tel:${BUSINESS.phoneTel}`}>Call</a>
        <a className="wa" href={waLink("Hello Technique Printing, I need a quote.")} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
      </div>
    </>
  );
}

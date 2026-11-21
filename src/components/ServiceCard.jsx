import { Link } from "react-router-dom";
import { quoteLink } from "../config.js";
import SmartImage, { serviceBase } from "./SmartImage.jsx";

export default function ServiceCard({ service, eager = false }) {
  return (
    <article className="card service-card">
      <Link to={`/services/${service.slug}`} className="card-media" tabIndex={-1} aria-hidden="true">
        <SmartImage base={serviceBase(service.slug)} alt="" icon={service.icon} sizes="(max-width: 560px) 50vw, (max-width: 900px) 33vw, 290px" eager={eager} />
      </Link>
      <div className="card-body">
        <h3><Link to={`/services/${service.slug}`}>{service.title}</Link></h3>
        <p className="card-desc">{service.short}</p>
        <div className="card-actions">
          <Link className="btn btn-ghost btn-small" to={`/services/${service.slug}`}>Details</Link>
          <a className="btn btn-wa btn-small" href={quoteLink(service.title, "service")} target="_blank" rel="noopener noreferrer">Get quote</a>
        </div>
      </div>
    </article>
  );
}

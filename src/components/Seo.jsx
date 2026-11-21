import { Helmet } from "react-helmet-async";
import { BUSINESS } from "../config.js";

export default function Seo({ title, description, path = "/", jsonLd, noindex = false, type = "website" }) {
  const url = `${BUSINESS.siteUrl}${path}`;
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${BUSINESS.siteUrl}/og-image.jpg`} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {schemas.map((s, i) => <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>)}
    </Helmet>
  );
}

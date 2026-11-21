import { Link, useParams } from "react-router-dom";
import { fmtDate } from "../components/BlogCard.jsx";
import WhatsAppCta from "../components/WhatsAppCta.jsx";
import Seo from "../components/Seo.jsx";
import { BUSINESS } from "../config.js";
import { POSTS } from "../data/posts.js";
import { breadcrumb } from "../schema.js";

export default function BlogPost() {
  const { slug } = useParams();
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return <div className="container section"><h1>Article not found</h1><Link to="/blog">Back to the blog</Link></div>;
  const more = POSTS.filter((p) => p.slug !== slug).slice(0, 3);
  const path = `/blog/${post.slug}`;

  const article = {
    "@context": "https://schema.org", "@type": "BlogPosting",
    headline: post.title, description: post.description, datePublished: post.date, dateModified: post.date,
    mainEntityOfPage: `${BUSINESS.siteUrl}${path}`,
    author: { "@type": "Organization", name: BUSINESS.name }, publisher: { "@id": `${BUSINESS.siteUrl}/#business` },
  };

  return (
    <>
      <Seo title={`${post.title} | Technique Printing`} description={post.description} path={path} type="article"
           jsonLd={[article, breadcrumb([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: post.title, path }])]} />
      <article className="container section post">
        <nav className="crumbs" aria-label="Breadcrumb"><Link to="/">Home</Link> / <Link to="/blog">Blog</Link> / <span aria-current="page">{post.category}</span></nav>
        <h1>{post.title}</h1>
        <p className="hint">By {BUSINESS.name} · <time dateTime={post.date}>{fmtDate(post.date)}</time> · {post.readMinutes} min read</p>
        <p className="lead">{post.description}</p>
        {post.sections.map((s) => (
          <section key={s.h}><h2>{s.h}</h2>{s.p.map((t, i) => <p key={i}>{t}</p>)}</section>
        ))}
        <p className="callout">Need this service? See <Link to={`/services/${post.service}`}>{post.service.replace(/-/g, " ")}</Link>, see <Link to="/portfolio">our work</Link>, or <Link to="/contact">contact us</Link> for a quote.</p>
      </article>
      <section className="container section"><h2>More printing guides</h2><div className="posts">{more.map((p) => <article key={p.slug} className="post-card"><p className="card-cat">{p.category}</p><h3><Link to={`/blog/${p.slug}`}>{p.title}</Link></h3></article>)}</div></section>
      <WhatsAppCta />
    </>
  );
}

import BlogCard from "../components/BlogCard.jsx";
import WhatsAppCta from "../components/WhatsAppCta.jsx";
import Seo from "../components/Seo.jsx";
import { POSTS } from "../data/posts.js";
import { breadcrumb } from "../schema.js";

export default function Blog() {
  return (
    <>
      <Seo
        title="Printing Guides and Tips for Dubai Businesses | Technique Printing Blog"
        description="Easy printing guides for Dubai businesses: DTF vs screen printing, staff uniforms and embroidery, UV printing, flex banners, acrylic signs and corporate gifts."
        path="/blog"
        jsonLd={breadcrumb([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }])}
      />
      <header className="page-hero"><div className="container">
        <h1>Printing guides and tips for Dubai</h1>
        <p className="lead">Simple, practical advice on materials, methods and artwork, from the print team at Dragon Mart 1.</p>
      </div></header>
      <section className="container section"><div className="posts">{POSTS.map((p) => <BlogCard key={p.slug} post={p} />)}</div></section>
      <WhatsAppCta title="Have a printing question?" text="Ask us on WhatsApp and get an answer from a real printer." />
    </>
  );
}

import { Link } from "react-router-dom";

export const fmtDate = (d) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export default function BlogCard({ post }) {
  return (
    <article className="post-card">
      <p className="card-cat">{post.category} · {post.readMinutes} min read</p>
      <h3><Link to={`/blog/${post.slug}`}>{post.title}</Link></h3>
      <p>{post.description}</p>
      <p className="hint"><time dateTime={post.date}>{fmtDate(post.date)}</time></p>
    </article>
  );
}

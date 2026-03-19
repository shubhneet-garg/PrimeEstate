/**
 * @file src/pages/BlogPage.jsx
 */

import Icon from "../components/Icon";
import { BLOG_POSTS } from "../data";

const FALLBACK_IMG = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80";

const BlogPage = () => (
  <div style={{ paddingTop: 72 }}>
    <div style={{ background: "var(--charcoal)", padding: "64px 0" }}>
      <div className="container">
        <p className="section-eyebrow" style={{ color: "var(--gold-light)" }}>Market Intelligence</p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4vw,3.5rem)", color: "var(--white)", fontWeight: 400 }}>
          Tricity <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Real Estate Insights</em>
        </h1>
      </div>
    </div>

    <section className="section">
      <div className="container">
        <div className="grid-3">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              style={{ background: "var(--white)", borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "var(--shadow-sm)", cursor: "pointer", transition: "var(--transition)" }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "var(--shadow-md)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "var(--shadow-sm)")}
            >
              <div style={{ height: 240, overflow: "hidden" }}>
                <img
                  src={post.image} alt={post.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => { e.target.src = FALLBACK_IMG; }}
                />
              </div>
              <div style={{ padding: 28 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <span className="tag tag-gold">{post.category}</span>
                  <span style={{ fontSize: "0.75rem", color: "var(--ash)" }}>{post.readTime} read</span>
                </div>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", lineHeight: 1.3, marginBottom: 12 }}>{post.title}</h2>
                <p style={{ fontSize: "0.85rem", color: "var(--ash)", lineHeight: 1.8, marginBottom: 20 }}>{post.excerpt}</p>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--silver)", borderTop: "1px solid var(--pearl)", paddingTop: 16 }}>
                  <span style={{ fontWeight: 500, color: "var(--ash)" }}>{post.author}</span>
                  <time>{post.date}</time>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default BlogPage;

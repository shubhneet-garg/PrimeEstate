/**
 * @file src/pages/HomePage.jsx
 * @description Landing page with hero, search, featured listings, stats, and more.
 */

import { useState } from "react";
import Icon from "../components/Icon";
import PropertyCard from "../components/PropertyCard";
import { PROPERTIES, AGENTS, BLOG_POSTS, TESTIMONIALS, CITIES } from "../data";

const FALLBACK_IMG = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80";

const CATEGORY_FILTERS = [
  { id: "all",        label: "All Properties", icon: "grid"      },
  { id: "buy",        label: "For Sale",        icon: "home"      },
  { id: "rent",       label: "For Rent",        icon: "key"       },
  { id: "luxury",     label: "Luxury",          icon: "star"      },
  { id: "commercial", label: "Commercial",      icon: "building"  },
  { id: "land",       label: "Land / Farm",     icon: "landscape" },
];

const WHY_FEATURES = [
  { icon: "star",    title: "RERA Verified Listings",    desc: "Every property is RERA registered and verified by our in-house legal team ensuring complete transparency." },
  { icon: "user",    title: "Tricity Expert Agents",     desc: "Our 120+ agents specialise in Chandigarh, Mohali, Panchkula and New Chandigarh with average 10+ years experience." },
  { icon: "key",     title: "End-to-End Assistance",     desc: "From site visits to loan approvals, documentation and registration — we handle it all for you." },
  { icon: "chart",   title: "NRI Services",              desc: "Dedicated NRI desk with FEMA compliant transactions, remote documentation and trusted property management." },
];

const HomePage = ({ setPage, setSelectedProperty, favorites, toggleFav, setToast, user, setModal }) => {
  const [searchQuery,     setSearchQuery]     = useState("");
  const [searchType,      setSearchType]      = useState("buy");
  const [activeCategory,  setActiveCategory]  = useState("all");

  const filteredFeatured = (activeCategory === "all"
    ? PROPERTIES
    : PROPERTIES.filter((p) => p.category === activeCategory || p.type === activeCategory)
  ).filter((p) => p.featured).slice(0, 3);

  const handlePropertySelect = (prop) => { setSelectedProperty(prop); setPage("property"); };

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section
        aria-label="Hero"
        style={{
          height: "100vh", minHeight: 700, position: "relative",
          background: "var(--charcoal)", display: "flex", alignItems: "center",
          justifyContent: "center", overflow: "hidden",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=80"
          alt="Luxury home in Chandigarh"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.45 }}
          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80"; }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(13,13,13,0.88) 0%, rgba(13,13,13,0.4) 100%)" }} />

        {/* Decorative rings */}
        <div style={{ position: "absolute", top: "15%", right: "8%", width: 300, height: 300, border: "1px solid rgba(201,168,76,0.2)", borderRadius: "50%", animation: "float 6s ease-in-out infinite" }} />
        <div style={{ position: "absolute", top: "20%", right: "11%", width: 200, height: 200, border: "1px solid rgba(201,168,76,0.15)", borderRadius: "50%" }} />

        <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "center", animation: "fadeInUp 0.8s ease" }}>
          {/* Pill badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)", borderRadius: 50, padding: "8px 20px", marginBottom: 28 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: "0.78rem", color: "var(--gold-light)", letterSpacing: "0.12em", fontWeight: 500 }}>
              TRICITY'S FINEST — CHANDIGARH · MOHALI · PANCHKULA
            </span>
          </div>

          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.8rem,7vw,5.5rem)", fontWeight: 300, color: "var(--white)", lineHeight: 1.1, marginBottom: 24, letterSpacing: "-0.01em" }}>
            Discover Premium<br />
            <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Tricity Properties</em>
          </h1>

          <p style={{ fontSize: "clamp(1rem,1.5vw,1.15rem)", color: "rgba(255,255,255,0.7)", maxWidth: 540, margin: "0 auto 48px", fontWeight: 300, lineHeight: 1.7 }}>
            From heritage bungalows in Chandigarh's Sectors to modern villas in Aerocity — curated real estate for those who deserve the finest.
          </p>

          {/* Search type tabs */}
          <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 20 }}>
            {[{ v: "buy", l: "Buy" }, { v: "rent", l: "Rent" }, { v: "commercial", l: "Commercial" }].map((t) => (
              <button
                key={t.v}
                onClick={() => setSearchType(t.v)}
                style={{
                  padding: "10px 28px",
                  background: searchType === t.v ? "var(--gold)" : "rgba(255,255,255,0.1)",
                  color:      searchType === t.v ? "var(--obsidian)" : "var(--white)",
                  border: "none", borderRadius: "4px 4px 0 0",
                  fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.06em",
                  transition: "var(--transition)", textTransform: "uppercase", cursor: "pointer",
                }}
              >
                {t.l}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="search-hero" style={{ maxWidth: 780, margin: "0 auto" }}>
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 12, padding: "0 16px" }}>
              <Icon name="location" size={18} color="var(--gold)" />
              <input
                className="form-input"
                placeholder="Search by sector, city, locality..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && setPage("search")}
                style={{ border: "none", padding: "10px 0", background: "transparent", fontSize: "0.95rem" }}
                aria-label="Search properties"
              />
            </div>
            <select className="form-input" style={{ width: "auto", flex: "0 0 150px", background: "var(--ivory)", border: "none" }} aria-label="Property type">
              <option>Any Type</option>
              <option>Apartment</option>
              <option>Independent House</option>
              <option>Villa</option>
              <option>Penthouse</option>
              <option>Plot</option>
            </select>
            <button className="btn-gold" onClick={() => setPage("search")} style={{ whiteSpace: "nowrap", padding: "14px 28px" }}>
              <Icon name="search" size={16} color="var(--obsidian)" />
              Search
            </button>
          </div>

          {/* Popular areas */}
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
            {["Sector 17 CHD", "Aerocity Mohali", "Sector 9 CHD", "Panchkula Sec 20", "New Chandigarh"].map((c) => (
              <button
                key={c}
                onClick={() => setPage("search")}
                style={{ padding: "6px 16px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 50, color: "rgba(255,255,255,0.75)", fontSize: "0.78rem", transition: "var(--transition)", cursor: "pointer" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(201,168,76,0.2)"; e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.color = "var(--gold-light)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.5)", fontSize: "0.7rem", letterSpacing: "0.1em" }}>
          <span>SCROLL</span>
          <div style={{ width: 24, height: 40, border: "1.5px solid rgba(255,255,255,0.3)", borderRadius: 12, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: 4 }}>
            <div style={{ width: 4, height: 8, background: "var(--gold)", borderRadius: 2, animation: "float 1.5s ease-in-out infinite" }} />
          </div>
        </div>
      </section>

      {/* ── STATS BAR ──────────────────────────────────────────────── */}
      <div style={{ background: "var(--charcoal)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", textAlign: "center" }}>
            {[
              { n: "₹500Cr+", l: "Properties Sold"   },
              { n: "3,200+",  l: "Active Listings"   },
              { n: "8,500+",  l: "Happy Clients"     },
              { n: "120+",    l: "Expert Agents"     },
            ].map((s, i) => (
              <div key={i} style={{ padding: "32px 20px", borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 600, color: "var(--gold)" }}>{s.n}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--ash)", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CATEGORY PILLS ─────────────────────────────────────────── */}
      <section className="section-sm" style={{ background: "var(--ivory)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <p className="section-eyebrow">Browse by Type</p>
            <h2 className="section-title">Find Your Perfect <em>Property</em></h2>
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            {CATEGORY_FILTERS.map((c) => (
              <button key={c.id} className={`category-pill ${activeCategory === c.id ? "active" : ""}`} onClick={() => setActiveCategory(c.id)}>
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROPERTIES ────────────────────────────────────── */}
      <section className="section" style={{ background: "var(--white)" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
            <div>
              <p className="section-eyebrow">Handpicked for You</p>
              <h2 className="section-title">Featured <em>Properties</em></h2>
            </div>
            <button className="btn-outline" onClick={() => setPage("listings")}>
              View All <Icon name="arrow" size={14} />
            </button>
          </div>
          {filteredFeatured.length > 0 ? (
            <div className="grid-3">
              {filteredFeatured.map((p) => (
                <PropertyCard key={p.id} property={p} onSelect={handlePropertySelect} favorites={favorites} toggleFav={toggleFav} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "60px 0", color: "var(--ash)" }}>
              <Icon name="home" size={40} color="var(--pearl)" />
              <p style={{ marginTop: 16 }}>No featured properties in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── WHY CHOOSE US ──────────────────────────────────────────── */}
      <section className="section" style={{ background: "var(--charcoal)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p className="section-eyebrow">Our Difference</p>
            <h2 className="section-title" style={{ color: "var(--white)" }}>Why Choose <em>PrimeEstate India</em></h2>
          </div>
          <div className="grid-4">
            {WHY_FEATURES.map((f, i) => (
              <div
                key={i}
                style={{ padding: "40px 32px", borderRadius: "var(--radius-lg)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", transition: "var(--transition)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
              >
                <div style={{ width: 52, height: 52, borderRadius: "var(--radius)", background: "rgba(201,168,76,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                  <Icon name={f.icon} size={22} color="var(--gold)" />
                </div>
                <h3 style={{ fontSize: "1rem", fontFamily: "var(--font-display)", color: "var(--white)", marginBottom: 12 }}>{f.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--ash)", lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CITY ZONES ─────────────────────────────────────────────── */}
      <section className="section" style={{ background: "var(--ivory)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p className="section-eyebrow">Explore the Tricity</p>
            <h2 className="section-title">Discover Properties Across <em>Every Zone</em></h2>
          </div>
          <div className="grid-4">
            {CITIES.map((c, i) => (
              <div key={i} onClick={() => setPage("listings")} style={{ position: "relative", borderRadius: "var(--radius-lg)", overflow: "hidden", cursor: "pointer", height: 280 }}>
                <img
                  src={c.img} alt={c.city}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  onError={(e) => { e.target.src = FALLBACK_IMG; }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, padding: 24 }}>
                  <div style={{ width: 28, height: 3, background: c.color, borderRadius: 2, marginBottom: 10 }} />
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 500, color: "var(--white)" }}>{c.city}</div>
                  <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.65)", marginBottom: 8 }}>{c.sub}</div>
                  <div style={{ fontSize: "0.75rem", color: c.color, fontWeight: 600, letterSpacing: "0.08em" }}>{c.count} PROPERTIES</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ALL LISTINGS PREVIEW ───────────────────────────────────── */}
      <section className="section" style={{ background: "var(--white)" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
            <div>
              <p className="section-eyebrow">All Properties</p>
              <h2 className="section-title">Latest <em>Listings</em></h2>
            </div>
            <button className="btn-outline" onClick={() => setPage("listings")}>View All <Icon name="arrow" size={14} /></button>
          </div>
          <div className="grid-3">
            {PROPERTIES.slice(0, 6).map((p) => (
              <PropertyCard key={p.id} property={p} onSelect={handlePropertySelect} favorites={favorites} toggleFav={toggleFav} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────────── */}
      <section className="section" style={{ background: "var(--charcoal)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p className="section-eyebrow">Client Stories</p>
            <h2 className="section-title" style={{ color: "var(--white)" }}>Trusted by <em>Thousands</em></h2>
          </div>
          <div className="grid-3">
            {TESTIMONIALS.map((t) => (
              <blockquote key={t.id} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "var(--radius-lg)", padding: 36, margin: 0 }}>
                <div style={{ color: "var(--gold)", fontSize: "1.2rem", marginBottom: 16 }}>{"★".repeat(t.rating)}</div>
                <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.8, marginBottom: 24, fontStyle: "italic" }}>"{t.text}"</p>
                <footer style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <img src={t.avatar} alt={t.name} style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover" }} onError={(e) => { e.target.src = FALLBACK_IMG; }} />
                  <div>
                    <cite style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--white)", fontStyle: "normal" }}>{t.name}</cite>
                    <div style={{ fontSize: "0.78rem", color: "var(--ash)" }}>{t.role}</div>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ── AGENTS PREVIEW ─────────────────────────────────────────── */}
      <section className="section" style={{ background: "var(--ivory)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p className="section-eyebrow">Meet the Team</p>
            <h2 className="section-title">Our <em>Expert Agents</em></h2>
          </div>
          <div className="grid-4">
            {AGENTS.map((a) => (
              <div key={a.id} className="agent-card" onClick={() => setPage("agents")}>
                <img src={a.image} alt={a.name} style={{ width: 72, height: 72, borderRadius: "50%", objectFit: "cover", margin: "0 auto 16px", border: "3px solid var(--gold)" }} onError={(e) => { e.target.src = FALLBACK_IMG; }} />
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", marginBottom: 4 }}>{a.name}</h3>
                <p style={{ fontSize: "0.78rem", color: "var(--ash)", marginBottom: 12 }}>{a.title}</p>
                <div style={{ fontSize: "0.78rem", color: "var(--gold)", fontWeight: 600 }}>★ {a.rating} · {a.properties} listings</div>
                <p style={{ fontSize: "0.8rem", color: "var(--ash)", marginTop: 8 }}>{a.location}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <button className="btn-dark" onClick={() => setPage("agents")}>
              Meet All Agents <Icon name="arrow" size={14} color="white" />
            </button>
          </div>
        </div>
      </section>

      {/* ── BLOG PREVIEW ───────────────────────────────────────────── */}
      <section className="section" style={{ background: "var(--white)" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
            <div>
              <p className="section-eyebrow">Market Intelligence</p>
              <h2 className="section-title">Latest <em>Insights</em></h2>
            </div>
            <button className="btn-outline" onClick={() => setPage("blog")}>View All <Icon name="arrow" size={14} /></button>
          </div>
          <div className="grid-3">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.id}
                style={{ background: "var(--white)", borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "var(--shadow-sm)", cursor: "pointer", transition: "var(--transition)" }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "var(--shadow-md)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "var(--shadow-sm)")}
                onClick={() => setPage("blog")}
              >
                <div style={{ height: 200, overflow: "hidden" }}>
                  <img src={post.image} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }} onError={(e) => { e.target.src = FALLBACK_IMG; }} />
                </div>
                <div style={{ padding: 24 }}>
                  <span className="tag tag-gold" style={{ marginBottom: 12 }}>{post.category}</span>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", marginBottom: 8, lineHeight: 1.3 }}>{post.title}</h3>
                  <p style={{ fontSize: "0.83rem", color: "var(--ash)", lineHeight: 1.7, marginBottom: 16 }}>{post.excerpt.slice(0, 100)}…</p>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "var(--silver)" }}>
                    <span>{post.author}</span>
                    <span>{post.readTime} read</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────────────────── */}
      <section style={{ background: "linear-gradient(135deg, var(--gold-dark), var(--gold), var(--gold-light))", padding: "80px 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4vw,3rem)", color: "var(--obsidian)", marginBottom: 16 }}>
            Ready to Find Your Dream Home in <em style={{ fontStyle: "italic" }}>Tricity?</em>
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(13,13,13,0.75)", maxWidth: 480, margin: "0 auto 36px", lineHeight: 1.7 }}>
            Schedule a free consultation with our experts. We'll guide you through every step — from search to possession.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-dark" onClick={() => setPage("contact")}>
              <Icon name="phone" size={16} color="white" />
              Talk to an Agent
            </button>
            <button
              style={{ background: "rgba(255,255,255,0.2)", border: "2px solid var(--obsidian)", color: "var(--obsidian)", padding: "14px 32px", borderRadius: "var(--radius)", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", transition: "var(--transition)", display: "inline-flex", alignItems: "center", gap: 8 }}
              onClick={() => setPage("listings")}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.35)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
            >
              <Icon name="search" size={16} color="var(--obsidian)" />
              Browse Properties
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

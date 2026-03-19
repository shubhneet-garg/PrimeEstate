/**
 * @file src/pages/AgentsPage.jsx
 */

import Icon from "../components/Icon";
import { AGENTS } from "../data";

const FALLBACK_IMG = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80";

const AgentsPage = () => (
  <div style={{ paddingTop: 72 }}>
    <div style={{ background: "var(--charcoal)", padding: "64px 0" }}>
      <div className="container">
        <p className="section-eyebrow" style={{ color: "var(--gold-light)" }}>The PrimeEstate Team</p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem,4vw,3.5rem)", color: "var(--white)", fontWeight: 400 }}>
          Meet Our <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Expert Agents</em>
        </h1>
        <p style={{ color: "var(--ash)", marginTop: 12, maxWidth: 500 }}>
          Tricity's most trusted real estate professionals — dedicated to finding you the perfect property.
        </p>
      </div>
    </div>

    <section className="section">
      <div className="container">
        <div className="grid-2" style={{ gap: 32 }}>
          {AGENTS.map((a) => (
            <article
              key={a.id}
              style={{ background: "var(--white)", border: "1px solid var(--pearl)", borderRadius: "var(--radius-lg)", padding: 36, display: "flex", gap: 24, boxShadow: "var(--shadow-sm)", transition: "var(--transition)", cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "var(--shadow-md)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "var(--shadow-sm)")}
            >
              <img src={a.image} alt={a.name} style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: "3px solid var(--gold)" }} onError={(e) => { e.target.src = FALLBACK_IMG; }} />
              <div style={{ flex: 1 }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", marginBottom: 4 }}>{a.name}</h2>
                <p style={{ fontSize: "0.82rem", color: "var(--gold)", fontWeight: 600, marginBottom: 6 }}>{a.title}</p>
                <p style={{ fontSize: "0.83rem", color: "var(--ash)", lineHeight: 1.7, marginBottom: 16 }}>{a.bio.slice(0, 140)}…</p>
                <div style={{ display: "flex", gap: 24, marginBottom: 16 }}>
                  {[{ l: "Listings", v: a.properties }, { l: "Sales", v: a.sales }, { l: "Rating", v: `★ ${a.rating}` }].map((s) => (
                    <div key={s.l}>
                      <div style={{ fontWeight: 700, color: "var(--gold)", fontSize: "1rem" }}>{s.v}</div>
                      <div style={{ fontSize: "0.72rem", color: "var(--ash)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.l}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
                  {a.specialties.map((s) => <span key={s} style={{ padding: "4px 12px", border: "1px solid var(--pearl)", borderRadius: 50, fontSize: "0.75rem", color: "var(--ash)" }}>{s}</span>)}
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <a href={`tel:${a.phone}`} className="btn-gold" style={{ padding: "8px 20px", fontSize: "0.78rem", textDecoration: "none" }}>
                    <Icon name="phone" size={13} color="var(--obsidian)" />Call
                  </a>
                  <a href={`mailto:${a.email}`} className="btn-outline" style={{ padding: "7px 20px", fontSize: "0.78rem", textDecoration: "none" }}>
                    <Icon name="mail" size={13} />Email
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default AgentsPage;

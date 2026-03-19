/**
 * @file src/pages/AboutPage.jsx
 */

import Icon from "../components/Icon";

const STATS = [
  { n: "₹500Cr+", l: "In Transactions" },
  { n: "8,500+",  l: "Happy Clients"   },
  { n: "120+",    l: "Expert Agents"   },
  { n: "15+",     l: "Years in Business" },
];

const BADGES = ["RERA Registered", "ISO 9001:2015", "NAR Member", "Award Winning Service"];

const AboutPage = () => (
  <div style={{ paddingTop: 72 }}>
    {/* Hero */}
    <div style={{ background: "var(--charcoal)", padding: "96px 0", position: "relative", overflow: "hidden" }}>
      <img
        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80"
        alt=""
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.15 }}
      />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <p className="section-eyebrow" style={{ color: "var(--gold-light)" }}>Our Story</p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem,5vw,4.5rem)", color: "var(--white)", fontWeight: 300, maxWidth: 700 }}>
          Tricity's Most Trusted{" "}
          <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Real Estate Platform</em>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: 540, marginTop: 20, lineHeight: 1.9 }}>
          Founded in 2010, PrimeEstate India has been the go-to platform for premium real estate
          across Chandigarh, Mohali, Panchkula and New Chandigarh.
        </p>
      </div>
    </div>

    <section className="section">
      <div className="container">
        {/* Stats row */}
        <div className="grid-4" style={{ textAlign: "center", marginBottom: 80 }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ padding: 32 }}>
              <div className="stat-number">{s.n}</div>
              <div className="stat-label">{s.l}</div>
            </div>
          ))}
        </div>

        {/* Two-column about */}
        <div className="grid-2" style={{ alignItems: "center", gap: 64 }}>
          <div>
            <p className="section-eyebrow">Who We Are</p>
            <h2 className="section-title">Built for <em>Tricity</em></h2>
            <div style={{ height: 2, width: 60, background: "var(--gold)", margin: "20px 0" }} />
            <p style={{ color: "var(--ash)", lineHeight: 1.9, marginBottom: 16 }}>
              PrimeEstate India was founded with one simple mission: to bring world-class real estate
              services to the Chandigarh Tricity region. We believe that buying or renting a home
              should be a joyful, transparent, and seamless experience.
            </p>
            <p style={{ color: "var(--ash)", lineHeight: 1.9, marginBottom: 24 }}>
              Every listing on our platform is RERA registered and independently verified by our
              legal team. Our 120+ agents are local specialists with deep knowledge of every sector,
              colony, and upcoming development in the region.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {BADGES.map((b) => (
                <span key={b} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.78rem", fontWeight: 600, color: "var(--ash)", padding: "6px 12px", border: "1px solid var(--pearl)", borderRadius: 50 }}>
                  <Icon name="check" size={12} color="var(--gold)" />{b}
                </span>
              ))}
            </div>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
              alt="PrimeEstate India Office"
              style={{ borderRadius: "var(--radius-lg)", width: "100%", objectFit: "cover", height: 380 }}
              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"; }}
            />
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default AboutPage;

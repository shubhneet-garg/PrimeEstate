/**
 * @file src/components/Footer.jsx
 */

import Icon from "./Icon";

const FOOTER_LINKS = [
  {
    title: "Properties",
    links: [
      { label: "Buy Property",    page: "listings" },
      { label: "Rent Property",   page: "rent"     },
      { label: "Commercial",      page: "listings" },
      { label: "Luxury Estates",  page: "listings" },
      { label: "New Chandigarh",  page: "listings" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us",        page: "about"  },
      { label: "Our Agents",      page: "agents" },
      { label: "Blog & Insights", page: "blog"   },
      { label: "NRI Services",    page: "about"  },
      { label: "Careers",         page: "about"  },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us",     page: "contact" },
      { label: "List Property",  page: "list"    },
      { label: "RERA Info",      page: "about"   },
      { label: "Home Loans",     page: "about"   },
      { label: "Help Center",    page: "about"   },
    ],
  },
];

const Footer = ({ setPage }) => (
  <footer style={{ background: "var(--obsidian)", color: "var(--silver)", paddingTop: 80 }}>
    {/* India tricolour accent */}
    <div className="india-bar" />

    <div className="container" style={{ paddingTop: 40 }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, paddingBottom: 64 }}>

        {/* Brand column */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ width: 32, height: 32, background: "var(--gold)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="building" size={16} color="white" />
            </div>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 600, color: "var(--white)" }}>
              Prime<span style={{ color: "var(--gold)" }}>Estate</span>{" "}
              <span style={{ fontSize: "0.65rem", color: "var(--ash)", letterSpacing: "0.15em" }}>INDIA</span>
            </span>
          </div>
          <p style={{ fontSize: "0.87rem", lineHeight: 1.8, maxWidth: 280, color: "var(--ash)" }}>
            Tricity's most trusted platform for premium real estate. Connecting exceptional properties across Chandigarh, Mohali, Panchkula & New Chandigarh since 2010.
          </p>
          <address style={{ fontStyle: "normal", marginTop: 16 }}>
            <p style={{ fontSize: "0.78rem", color: "var(--ash)" }}>📍 SCO 145-146, Sector 17-C, Chandigarh – 160017</p>
            <p style={{ fontSize: "0.78rem", color: "var(--ash)", marginTop: 4 }}>
              📞 <a href="tel:+919876543210" style={{ color: "inherit" }}>+91 98765 43210</a>
              &nbsp;✉&nbsp;
              <a href="mailto:info@primeestate.in" style={{ color: "inherit" }}>info@primeestate.in</a>
            </p>
          </address>
          <p style={{ fontSize: "0.75rem", color: "var(--smoke)", marginTop: 8 }}>RERA Reg. No: PBRERA-SAS79-CR06145</p>
        </div>

        {/* Link columns */}
        {FOOTER_LINKS.map((col) => (
          <div key={col.title}>
            <h4 style={{ color: "var(--white)", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 20 }}>
              {col.title}
            </h4>
            <nav aria-label={`${col.title} links`} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {col.links.map((lk) => (
                <button
                  key={lk.label}
                  onClick={() => setPage(lk.page)}
                  style={{
                    fontSize: "0.85rem", color: "var(--ash)", cursor: "pointer",
                    transition: "color 0.2s", background: "none", border: "none",
                    padding: 0, textAlign: "left",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ash)")}
                >
                  {lk.label}
                </button>
              ))}
            </nav>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.06)", padding: "24px 0",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16,
      }}>
        <small style={{ fontSize: "0.8rem", color: "var(--ash)" }}>
          © 2026 PrimeEstate India Pvt. Ltd. All rights reserved. | GST: 03AABCP1234Q1ZX
        </small>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", animation: "pulse 2s infinite" }} />
          <span style={{ fontSize: "0.78rem", color: "var(--ash)" }}>All systems operational</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

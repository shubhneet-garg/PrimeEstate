/**
 * @file src/pages/PropertyDetailPage.jsx
 */

import { useState } from "react";
import Icon from "../components/Icon";
import EnquiryForm from "../components/EnquiryForm";
import { AGENTS } from "../data";
import { formatPrice, formatPricePerSqft, getBadgeClass } from "../utils/formatters";
import { copyToClipboard } from "../utils/formatters";

const FALLBACK_IMG = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80";

const PropertyDetailPage = ({ property, setPage, favorites, toggleFav, setToast }) => {
  const [activeImg, setActiveImg] = useState(0);
  const isFav  = favorites.includes(property.id);
  const agent  = AGENTS.find((a) => a.id === property.agentId) || AGENTS[0];
  const images = property.images?.length ? property.images : [property.image];

  const handleShare = async () => {
    try {
      await copyToClipboard(window.location.href);
      setToast("Link copied to clipboard!");
    } catch {
      setToast("Link copied!");
    }
  };

  return (
    <div style={{ paddingTop: 72 }}>

      {/* ── Image gallery ── */}
      <div style={{ background: "var(--charcoal)" }}>
        <div className="container" style={{ paddingTop: 32 }}>
          <button
            onClick={() => setPage("listings")}
            style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--ash)", fontSize: "0.85rem", marginBottom: 20, cursor: "pointer", background: "none", border: "none" }}
          >
            <Icon name="arrowLeft" size={16} color="var(--ash)" /> Back to Listings
          </button>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, borderRadius: "var(--radius-lg)", overflow: "hidden", height: 480 }}>
            <img
              src={images[activeImg] || property.image}
              alt={property.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "zoom-in" }}
              onError={(e) => { e.target.src = FALLBACK_IMG; }}
            />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {images.slice(1, 5).map((img, i) => (
                <div key={i} style={{ position: "relative", cursor: "pointer" }} onClick={() => setActiveImg(i + 1)}>
                  <img src={img} alt={`View ${i + 2}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.target.src = FALLBACK_IMG; }} />
                  {i === 2 && images.length > 5 && (
                    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 600 }}>
                      +{images.length - 5} More
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 48 }}>

          {/* ── Left: Details ── */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
              <div>
                {property.badge && <span className={`tag ${getBadgeClass(property.badge)}`} style={{ marginBottom: 12 }}>{property.badge}</span>}
                <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,3vw,2.5rem)", marginBottom: 8 }}>{property.title}</h1>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--ash)" }}>
                  <Icon name="location" size={16} color="var(--gold)" />
                  {property.location}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 600, color: "var(--gold)" }}>
                  {formatPrice(property.price, property.rent)}
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--silver)" }}>
                  {formatPricePerSqft(property.price, property.sqft)}
                </div>
              </div>
            </div>

            {/* Specs */}
            {property.beds > 0 && (
              <div style={{ display: "flex", gap: 32, padding: "24px 0", borderTop: "1px solid var(--pearl)", borderBottom: "1px solid var(--pearl)", marginBottom: 32 }}>
                {[
                  { icon: "bed",  val: `${property.beds} BHK`,                       lbl: "Bedrooms"    },
                  { icon: "bath", val: `${property.baths} Bath`,                      lbl: "Bathrooms"   },
                  { icon: "area", val: `${property.sqft.toLocaleString()} sq.ft`,     lbl: "Carpet Area" },
                ].map((f) => (
                  <div key={f.icon} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "var(--radius)", background: "rgba(201,168,76,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon name={f.icon} size={18} color="var(--gold)" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>{f.val}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--ash)" }}>{f.lbl}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", marginBottom: 12 }}>About This Property</h2>
            <p style={{ color: "var(--ash)", lineHeight: 1.9, marginBottom: 32 }}>{property.description}</p>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", marginBottom: 20 }}>Property Details</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
              {[
                { l: "Property Type", v: property.category.charAt(0).toUpperCase() + property.category.slice(1) },
                { l: "Year Built",    v: property.year },
                { l: "Parking",       v: `${property.parking} ${property.parking === 1 ? "space" : "spaces"}` },
                { l: "Listed",        v: "March 2026"       },
                { l: "RERA Status",   v: "RERA Registered"  },
                { l: "Possession",    v: "Ready to Move"    },
              ].map((d) => (
                <div key={d.l} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid var(--pearl)" }}>
                  <span style={{ fontSize: "0.85rem", color: "var(--ash)" }}>{d.l}</span>
                  <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>{d.v}</span>
                </div>
              ))}
            </div>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", marginBottom: 20 }}>Amenities</h2>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
              {property.amenities.map((a) => (
                <div key={a} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", background: "var(--ivory)", border: "1px solid var(--pearl)", borderRadius: 50, fontSize: "0.82rem" }}>
                  <Icon name="check" size={12} color="var(--gold)" />{a}
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", marginBottom: 20 }}>Location</h2>
            <div className="map-placeholder" style={{ height: 280 }}>
              <Icon name="map" size={40} color="var(--ash)" />
              <div style={{ textAlign: "center", zIndex: 1 }}>
                <p style={{ fontWeight: 600, color: "var(--charcoal)", marginBottom: 4 }}>View on Map</p>
                <p style={{ fontSize: "0.82rem" }}>{property.location}</p>
              </div>
            </div>
          </div>

          {/* ── Right: Contact card ── */}
          <aside>
            <div style={{ background: "var(--white)", border: "1.5px solid var(--pearl)", borderRadius: "var(--radius-lg)", padding: 32, position: "sticky", top: 92 }}>
              {/* Agent info */}
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24, paddingBottom: 20, borderBottom: "1px solid var(--pearl)" }}>
                <img src={agent.image} alt={agent.name} style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover", border: "2px solid var(--gold)" }} onError={(e) => { e.target.src = FALLBACK_IMG; }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>{agent.name}</div>
                  <div style={{ fontSize: "0.78rem", color: "var(--ash)" }}>{agent.title}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--gold)", marginTop: 2 }}>★ {agent.rating} · {agent.reviews} reviews</div>
                </div>
              </div>

              {/* Contact links */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
                <a href={`tel:${agent.phone}`} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", border: "1.5px solid var(--pearl)", borderRadius: "var(--radius)", fontSize: "0.87rem", fontWeight: 500, color: "var(--charcoal)", transition: "var(--transition)", textDecoration: "none" }}>
                  <Icon name="phone" size={16} color="var(--gold)" />
                  {agent.phone}
                </a>
                <a href={`mailto:${agent.email}`} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", border: "1.5px solid var(--pearl)", borderRadius: "var(--radius)", fontSize: "0.87rem", fontWeight: 500, color: "var(--charcoal)", transition: "var(--transition)", textDecoration: "none" }}>
                  <Icon name="mail" size={16} color="var(--gold)" />
                  {agent.email}
                </a>
              </div>

              <EnquiryForm onSubmit={() => setToast("Enquiry sent! Our agent will contact you within 2 hours.")} />

              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                <button
                  onClick={() => { toggleFav(property.id); setToast(isFav ? "Removed from favourites" : "Saved to favourites!"); }}
                  className={isFav ? "btn-outline" : "btn-dark"}
                  style={{ flex: 1, justifyContent: "center", padding: "11px 16px" }}
                >
                  <Icon name={isFav ? "heartFill" : "heart"} size={14} color={isFav ? "var(--gold)" : "white"} />
                  {isFav ? "Saved" : "Save"}
                </button>
                <button className="btn-outline" style={{ flex: 1, justifyContent: "center", padding: "11px 16px" }} onClick={handleShare}>
                  <Icon name="share" size={14} color="var(--gold)" />
                  Share
                </button>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;

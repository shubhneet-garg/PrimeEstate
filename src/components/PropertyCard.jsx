/**
 * @file src/components/PropertyCard.jsx
 * @description Reusable property listing card with favourite toggle.
 */

import Icon from "./Icon";
import { formatPrice, formatPricePerSqft, getBadgeClass } from "../utils/formatters";

const FALLBACK_IMG = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80";

const PropertyCard = ({ property, onSelect, favorites, toggleFav }) => {
  const isFav = favorites.includes(property.id);

  return (
    <article
      className="property-card"
      onClick={() => onSelect(property)}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${property.title}`}
      onKeyDown={(e) => e.key === "Enter" && onSelect(property)}
    >
      {/* ── Image ── */}
      <div className="card-img-wrap">
        <img
          src={property.image}
          alt={property.title}
          className="card-img"
          loading="lazy"
          onError={(e) => { e.target.src = FALLBACK_IMG; }}
        />

        {/* Badge */}
        {property.badge && (
          <div style={{ position: "absolute", top: 16, left: 16 }}>
            <span className={`tag ${getBadgeClass(property.badge)}`}>{property.badge}</span>
          </div>
        )}

        {/* Favourite button */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleFav(property.id); }}
          style={{
            position: "absolute", top: 14, right: 14,
            width: 36, height: 36, borderRadius: "50%",
            background: "rgba(255,255,255,0.92)", border: "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", transition: "var(--transition)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
          aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
        >
          <Icon name={isFav ? "heartFill" : "heart"} size={16} color={isFav ? "#8B3A52" : "var(--ash)"} />
        </button>

        {/* Gradient overlay */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: 60, background: "linear-gradient(transparent,rgba(0,0,0,0.4))",
        }} />
      </div>

      {/* ── Content ── */}
      <div style={{ padding: "20px 24px 24px" }}>
        <div style={{ marginBottom: 8 }}>
          <span style={{
            fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 500,
            color: "var(--charcoal)", display: "block", marginBottom: 4,
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>
            {property.title}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--ash)", fontSize: "0.82rem" }}>
            <Icon name="location" size={13} color="var(--gold)" />
            {property.location}
          </div>
        </div>

        {/* Specs row */}
        {property.beds > 0 && (
          <div style={{
            display: "flex", gap: 20, padding: "14px 0",
            borderTop: "1px solid var(--pearl)", borderBottom: "1px solid var(--pearl)",
            margin: "14px 0",
          }}>
            {[
              { icon: "bed",  val: `${property.beds} BHK` },
              { icon: "bath", val: `${property.baths} Bath` },
              { icon: "area", val: `${property.sqft.toLocaleString()} sq.ft` },
            ].map((f) => (
              <div key={f.icon} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.8rem", color: "var(--ash)" }}>
                <Icon name={f.icon} size={13} color="var(--silver)" />
                {f.val}
              </div>
            ))}
          </div>
        )}

        {/* Price row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: property.beds === 0 ? 14 : 0 }}>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 600, color: "var(--gold)" }}>
              {formatPrice(property.price, property.rent)}
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--silver)" }}>
              {formatPricePerSqft(property.price, property.sqft)}
            </div>
          </div>
          <button className="btn-dark" style={{ padding: "8px 20px", fontSize: "0.75rem" }}>
            View
          </button>
        </div>
      </div>
    </article>
  );
};

export default PropertyCard;

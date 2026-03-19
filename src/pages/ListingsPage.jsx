/**
 * @file src/pages/ListingsPage.jsx
 * @description Property listings with sidebar filters and grid/list view toggle.
 */

import { useState } from "react";
import Icon from "../components/Icon";
import PropertyCard from "../components/PropertyCard";
import { PROPERTIES } from "../data";
import { formatPrice } from "../utils/formatters";

const CITIES      = ["all", "Chandigarh", "Mohali", "Panchkula", "New Chandigarh", "Zirakpur"];
const TYPES       = ["all", "buy", "rent", "luxury", "commercial", "land"];
const BHK_OPTIONS = ["any", "1", "2", "3", "4", "5"];
const AMENITY_OPTIONS = ["Pool", "Gym", "Parking", "Power Backup", "Garden", "Club House"];

const ListingsPage = ({ setSelectedProperty, setPage, favorites, toggleFav, rentOnly = false }) => {
  const [typeFilter,  setTypeFilter]  = useState(rentOnly ? "rent" : "all");
  const [cityFilter,  setCityFilter]  = useState("all");
  const [bedsFilter,  setBedsFilter]  = useState("any");
  const [priceMax,    setPriceMax]    = useState(100_000_000);
  const [viewMode,    setViewMode]    = useState("grid");
  const [sortBy,      setSortBy]      = useState("featured");

  // ── Filter ──────────────────────────────────────────────────────────
  let properties = PROPERTIES.filter((p) => {
    if (typeFilter !== "all" && p.category !== typeFilter && p.type !== typeFilter) return false;
    if (cityFilter !== "all" && p.city !== cityFilter) return false;
    if (bedsFilter !== "any" && p.beds < parseInt(bedsFilter, 10))                  return false;
    const val = p.price || (p.rent ? p.rent * 12 : 0);
    if (val > priceMax) return false;
    return true;
  });

  // ── Sort ────────────────────────────────────────────────────────────
  if (sortBy === "price-asc")  properties.sort((a, b) => (a.price || a.rent * 12_000) - (b.price || b.rent * 12_000));
  if (sortBy === "price-desc") properties.sort((a, b) => (b.price || b.rent * 12_000) - (a.price || a.rent * 12_000));
  if (sortBy === "featured")   properties.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  const resetFilters = () => { setTypeFilter("all"); setBedsFilter("any"); setCityFilter("all"); setPriceMax(100_000_000); };

  const handleSelect = (prop) => { setSelectedProperty(prop); setPage("property"); };

  return (
    <div style={{ paddingTop: 72 }}>
      {/* ── Page Header ── */}
      <div style={{ background: "var(--charcoal)", padding: "48px 0" }}>
        <div className="container">
          <p className="section-eyebrow" style={{ color: "var(--gold-light)" }}>Property Listings</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 400, color: "var(--white)" }}>
            {rentOnly ? <>Properties for <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Rent</em></> : <>Properties for <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Sale & Rent</em></>}
          </h1>
          <p style={{ color: "var(--ash)", marginTop: 8 }}>{properties.length} properties available across Tricity</p>
        </div>
      </div>

      <div className="container" style={{ padding: "48px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 32 }}>

          {/* ── Sidebar filters ── */}
          <aside aria-label="Property filters">
            <div className="filter-panel" style={{ position: "sticky", top: 92 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>Filters</h2>
                <button style={{ fontSize: "0.78rem", color: "var(--gold)", fontWeight: 500, background: "none", border: "none", cursor: "pointer" }} onClick={resetFilters}>Reset All</button>
              </div>

              {/* City */}
              <div className="filter-group">
                <span className="filter-label">City</span>
                {CITIES.map((c) => (
                  <label key={c} className="checkbox-custom" style={{ cursor: "pointer" }} onClick={() => setCityFilter(c)}>
                    <div className={`checkbox-box ${cityFilter === c ? "checked" : ""}`}>
                      {cityFilter === c && <Icon name="check" size={10} color="white" />}
                    </div>
                    {c === "all" ? "All Cities" : c}
                  </label>
                ))}
              </div>

              {/* Type */}
              <div className="filter-group">
                <span className="filter-label">Listing Type</span>
                {TYPES.map((t) => (
                  <label key={t} className="checkbox-custom" style={{ cursor: "pointer" }} onClick={() => setTypeFilter(t)}>
                    <div className={`checkbox-box ${typeFilter === t ? "checked" : ""}`}>
                      {typeFilter === t && <Icon name="check" size={10} color="white" />}
                    </div>
                    <span style={{ textTransform: "capitalize" }}>{t === "all" ? "All Types" : t}</span>
                  </label>
                ))}
              </div>

              {/* Price range */}
              <div className="filter-group">
                <span className="filter-label">Max Budget</span>
                <input type="range" min={0} max={100_000_000} step={1_000_000} value={priceMax} onChange={(e) => setPriceMax(parseInt(e.target.value, 10))} aria-label="Maximum price" />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: "0.8rem", color: "var(--ash)" }}>
                  <span>₹0</span>
                  <span style={{ color: "var(--gold)", fontWeight: 600 }}>{formatPrice(priceMax, null)}</span>
                </div>
              </div>

              {/* BHK */}
              <div className="filter-group">
                <span className="filter-label">BHK</span>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {BHK_OPTIONS.map((b) => (
                    <button
                      key={b}
                      onClick={() => setBedsFilter(b)}
                      style={{
                        padding: "6px 14px", borderRadius: "var(--radius)", border: "1.5px solid",
                        borderColor: bedsFilter === b ? "var(--gold)" : "var(--pearl)",
                        background:  bedsFilter === b ? "rgba(201,168,76,0.1)" : "transparent",
                        color:       bedsFilter === b ? "var(--gold)" : "var(--ash)",
                        fontSize: "0.82rem", fontWeight: 500, cursor: "pointer", transition: "var(--transition)",
                      }}
                    >
                      {b === "any" ? "Any" : `${b}BHK+`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amenities (UI only — filtering not wired to keep code concise) */}
              <div className="filter-group">
                <span className="filter-label">Amenities</span>
                {AMENITY_OPTIONS.map((f) => (
                  <label key={f} className="checkbox-custom"><div className="checkbox-box" />{f}</label>
                ))}
              </div>
            </div>
          </aside>

          {/* ── Results ── */}
          <main>
            {/* Toolbar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
              <p style={{ color: "var(--ash)", fontSize: "0.87rem" }}>
                <strong style={{ color: "var(--charcoal)" }}>{properties.length}</strong> properties found
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <select className="form-input" style={{ width: "auto", padding: "8px 36px 8px 12px" }} value={sortBy} onChange={(e) => setSortBy(e.target.value)} aria-label="Sort by">
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
                <div style={{ display: "flex", border: "1.5px solid var(--pearl)", borderRadius: "var(--radius)", overflow: "hidden" }}>
                  {[{ m: "grid", i: "grid" }, { m: "list", i: "list" }].map((v) => (
                    <button key={v.m} onClick={() => setViewMode(v.m)} aria-pressed={viewMode === v.m} aria-label={`${v.m} view`}
                      style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", background: viewMode === v.m ? "var(--charcoal)" : "transparent", border: "none", cursor: "pointer", transition: "var(--transition)" }}>
                      <Icon name={v.i} size={14} color={viewMode === v.m ? "white" : "var(--ash)"} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Grid view */}
            {viewMode === "grid" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 28 }}>
                {properties.map((p) => (
                  <PropertyCard key={p.id} property={p} onSelect={handleSelect} favorites={favorites} toggleFav={toggleFav} />
                ))}
              </div>
            )}

            {/* List view */}
            {viewMode === "list" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {properties.map((p) => (
                  <div
                    key={p.id}
                    style={{ display: "flex", background: "var(--white)", border: "1px solid var(--pearl)", borderRadius: "var(--radius-lg)", overflow: "hidden", cursor: "pointer", transition: "var(--transition)", boxShadow: "var(--shadow-sm)" }}
                    onClick={() => handleSelect(p)}
                    onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "var(--shadow-md)")}
                    onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "var(--shadow-sm)")}
                    role="button" tabIndex={0}
                    onKeyDown={(ev) => ev.key === "Enter" && handleSelect(p)}
                  >
                    <img src={p.image} alt={p.title} style={{ width: 220, height: 160, objectFit: "cover", flexShrink: 0 }} loading="lazy" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"; }} />
                    <div style={{ padding: "20px 24px", flex: 1, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                      <div>
                        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", marginBottom: 4 }}>{p.title}</h3>
                        <div style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--ash)", fontSize: "0.82rem", marginBottom: 10 }}>
                          <Icon name="location" size={13} color="var(--gold)" />
                          {p.location}
                        </div>
                        {p.beds > 0 && (
                          <div style={{ display: "flex", gap: 16, fontSize: "0.8rem", color: "var(--ash)" }}>
                            <span>{p.beds} BHK</span>
                            <span>{p.baths} Bath</span>
                            <span>{p.sqft.toLocaleString()} sq.ft</span>
                          </div>
                        )}
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 600, color: "var(--gold)" }}>{formatPrice(p.price, p.rent)}</div>
                        {p.badge && <span className={`tag ${p.badge === "For Rent" ? "tag-teal" : "tag-gold"}`} style={{ marginTop: 6, display: "inline-block" }}>{p.badge}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty state */}
            {properties.length === 0 && (
              <div style={{ textAlign: "center", padding: "80px 0", color: "var(--ash)" }}>
                <Icon name="search" size={48} color="var(--pearl)" />
                <h3 style={{ marginTop: 16, fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>No Properties Found</h3>
                <p style={{ marginTop: 8, fontSize: "0.9rem" }}>Try adjusting your filters to see more results.</p>
                <button className="btn-gold" style={{ marginTop: 24 }} onClick={resetFilters}>Reset Filters</button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ListingsPage;

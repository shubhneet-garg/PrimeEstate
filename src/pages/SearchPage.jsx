/**
 * @file src/pages/SearchPage.jsx
 */

import { useState, useMemo } from "react";
import Icon from "../components/Icon";
import PropertyCard from "../components/PropertyCard";
import { PROPERTIES } from "../data";

const SearchPage = ({ setSelectedProperty, setPage, favorites, toggleFav }) => {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return PROPERTIES;
    return PROPERTIES.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div style={{ paddingTop: 72 }}>
      <div style={{ background: "var(--charcoal)", padding: "64px 0" }}>
        <div className="container">
          <p className="section-eyebrow" style={{ color: "var(--gold-light)" }}>Search</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4vw,3rem)", color: "var(--white)", fontWeight: 400 }}>
            Find Your <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Perfect Property</em>
          </h1>
          <div style={{ maxWidth: 600, marginTop: 24, display: "flex", gap: 8 }}>
            <div style={{ flex: 1, position: "relative" }}>
              <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }}>
                <Icon name="search" size={18} color="var(--silver)" />
              </span>
              <input
                className="form-input"
                placeholder="Search by city, sector, locality, type…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ fontSize: "1rem", paddingLeft: 42 }}
                aria-label="Search properties"
                autoFocus
              />
            </div>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {query && (
            <p style={{ color: "var(--ash)", marginBottom: 32 }}>
              <strong style={{ color: "var(--charcoal)" }}>{results.length}</strong>{" "}
              {results.length === 1 ? "result" : "results"} for "
              <strong>{query}</strong>"
            </p>
          )}

          {results.length > 0 ? (
            <div className="grid-3">
              {results.map((p) => (
                <PropertyCard
                  key={p.id}
                  property={p}
                  onSelect={(prop) => { setSelectedProperty(prop); setPage("property"); }}
                  favorites={favorites}
                  toggleFav={toggleFav}
                />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "80px 0", color: "var(--ash)" }}>
              <Icon name="search" size={48} color="var(--pearl)" />
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", marginTop: 16 }}>No Results Found</h3>
              <p style={{ marginTop: 8 }}>Try searching for a different city, sector, or property type.</p>
              <button className="btn-gold" style={{ marginTop: 24 }} onClick={() => setQuery("")}>Clear Search</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SearchPage;

/**
 * @file src/pages/FavouritesPage.jsx
 */

import Icon from "../components/Icon";
import PropertyCard from "../components/PropertyCard";
import { PROPERTIES } from "../data";

const FavouritesPage = ({ setSelectedProperty, setPage, favorites, toggleFav }) => {
  const favProps = PROPERTIES.filter((p) => favorites.includes(p.id));

  return (
    <div style={{ paddingTop: 72 }}>
      <div style={{ background: "var(--charcoal)", padding: "64px 0" }}>
        <div className="container">
          <p className="section-eyebrow" style={{ color: "var(--gold-light)" }}>Your Shortlist</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4vw,3rem)", color: "var(--white)", fontWeight: 400 }}>
            Saved <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Properties</em>
          </h1>
          <p style={{ color: "var(--ash)", marginTop: 8 }}>
            {favProps.length} {favProps.length === 1 ? "property" : "properties"} saved
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {favProps.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <Icon name="heart" size={56} color="var(--pearl)" />
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", marginTop: 16, marginBottom: 8 }}>No Saved Properties</h2>
              <p style={{ color: "var(--ash)", marginBottom: 32 }}>Start exploring and save the ones you love.</p>
              <button className="btn-gold" onClick={() => setPage("listings")}>Browse Properties</button>
            </div>
          ) : (
            <div className="grid-3">
              {favProps.map((p) => (
                <PropertyCard
                  key={p.id}
                  property={p}
                  onSelect={(prop) => { setSelectedProperty(prop); setPage("property"); }}
                  favorites={favorites}
                  toggleFav={toggleFav}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default FavouritesPage;

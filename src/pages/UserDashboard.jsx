/**
 * @file src/pages/UserDashboard.jsx
 * @description Authenticated user dashboard with sidebar navigation.
 */

import { useState } from "react";
import Icon from "../components/Icon";
import PropertyCard from "../components/PropertyCard";
import { PROPERTIES } from "../data";

const FALLBACK_IMG = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80";

const SIDEBAR_TABS = [
  { id: "overview",  icon: "grid",  label: "Overview"      },
  { id: "enquiries", icon: "mail",  label: "My Enquiries"  },
  { id: "saved",     icon: "heart", label: "Saved"         },
  { id: "listings",  icon: "home",  label: "My Listings"   },
  { id: "profile",   icon: "user",  label: "Edit Profile"  },
];

const UserDashboard = ({ user, setUser, setPage, favorites, toggleFav, setToast }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const favProps   = PROPERTIES.filter((p) => favorites.includes(p.id));
  const enquiries  = user.enquiries || [];
  const listings   = user.listings  || [];

  const handleSignOut = () => { setUser(null); setPage("home"); };

  return (
    <div style={{ paddingTop: 72, display: "flex", minHeight: "100vh" }}>

      {/* ── Sidebar ── */}
      <aside
        style={{ width: 260, background: "var(--charcoal)", padding: "32px 0", flexShrink: 0, position: "sticky", top: 72, height: "calc(100vh - 72px)", overflowY: "auto", display: "flex", flexDirection: "column" }}
        aria-label="Dashboard navigation"
      >
        {/* User info */}
        <div style={{ padding: "0 24px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--gold)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
            <Icon name="user" size={22} color="white" />
          </div>
          <div style={{ fontWeight: 600, color: "var(--white)" }}>{user.name}</div>
          <div style={{ fontSize: "0.78rem", color: "var(--ash)" }}>{user.email}</div>
          {user.phone && <div style={{ fontSize: "0.78rem", color: "var(--ash)", marginTop: 2 }}>{user.phone}</div>}
          <div style={{ fontSize: "0.72rem", color: "var(--smoke)", marginTop: 6 }}>Member since {user.memberSince}</div>
        </div>

        {/* Nav items */}
        <nav style={{ padding: "16px 0", flex: 1 }}>
          {SIDEBAR_TABS.map((t) => {
            const label = t.id === "saved" ? `Saved (${favProps.length})` : t.label;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                aria-current={activeTab === t.id ? "page" : undefined}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 12,
                  padding: "12px 24px", fontSize: "0.87rem",
                  fontWeight: activeTab === t.id ? 600 : 400,
                  color:     activeTab === t.id ? "var(--gold)" : "var(--silver)",
                  background: activeTab === t.id ? "rgba(201,168,76,0.08)" : "transparent",
                  borderLeft: `3px solid ${activeTab === t.id ? "var(--gold)" : "transparent"}`,
                  border: "none", cursor: "pointer", transition: "var(--transition)", textAlign: "left",
                }}
              >
                <Icon name={t.icon} size={16} color={activeTab === t.id ? "var(--gold)" : "var(--ash)"} />
                {label}
              </button>
            );
          })}
        </nav>

        {/* Sign out */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <button
            onClick={handleSignOut}
            style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.85rem", color: "var(--ash)", cursor: "pointer", background: "none", border: "none", transition: "var(--transition)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ash)")}
          >
            <Icon name="logout" size={16} color="inherit" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main style={{ flex: 1, padding: 40, background: "var(--ivory)" }}>

        {/* Overview */}
        {activeTab === "overview" && (
          <div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", marginBottom: 8 }}>
              Welcome back, <em style={{ color: "var(--gold)" }}>{user.name.split(" ")[0]}</em>
            </h1>
            <p style={{ color: "var(--ash)", marginBottom: 32 }}>Here's a summary of your activity.</p>

            <div className="grid-4" style={{ gap: 20, marginBottom: 40 }}>
              {[
                { n: favProps.length,  l: "Saved Properties", icon: "heart"   },
                { n: enquiries.length, l: "Enquiries Sent",   icon: "mail"    },
                { n: listings.length,  l: "My Listings",      icon: "home"    },
                { n: "Active",         l: "Account Status",   icon: "check"   },
              ].map((s, i) => (
                <div key={i} style={{ background: "var(--white)", borderRadius: "var(--radius-lg)", padding: 24, boxShadow: "var(--shadow-sm)", textAlign: "center" }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(201,168,76,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                    <Icon name={s.icon} size={20} color="var(--gold)" />
                  </div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 600, color: "var(--gold)" }}>{s.n}</div>
                  <div style={{ fontSize: "0.78rem", color: "var(--ash)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 }}>{s.l}</div>
                </div>
              ))}
            </div>

            {favProps.length > 0 && (
              <>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", marginBottom: 20 }}>
                  Recently <em style={{ color: "var(--gold)" }}>Saved</em>
                </h2>
                <div className="grid-3">
                  {favProps.slice(0, 3).map((p) => (
                    <PropertyCard
                      key={p.id}
                      property={p}
                      onSelect={() => setPage("property")}
                      favorites={favorites}
                      toggleFav={toggleFav}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Enquiries */}
        {activeTab === "enquiries" && (
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", marginBottom: 24 }}>
              My <em style={{ color: "var(--gold)" }}>Enquiries</em>
            </h2>
            {enquiries.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0", color: "var(--ash)" }}>
                <Icon name="mail" size={48} color="var(--pearl)" />
                <p style={{ marginTop: 16 }}>No enquiries sent yet. Browse properties and connect with agents!</p>
                <button className="btn-gold" style={{ marginTop: 20 }} onClick={() => setPage("listings")}>Browse Properties</button>
              </div>
            ) : (
              enquiries.map((eq, i) => (
                <div key={i} style={{ background: "var(--white)", borderRadius: "var(--radius-lg)", padding: 24, marginBottom: 16, boxShadow: "var(--shadow-sm)" }}>
                  <div style={{ fontWeight: 600 }}>{eq.property}</div>
                  <div style={{ fontSize: "0.82rem", color: "var(--ash)", marginTop: 4 }}>{eq.date} · {eq.status}</div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Saved */}
        {activeTab === "saved" && (
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", marginBottom: 24 }}>
              Saved <em style={{ color: "var(--gold)" }}>Properties</em>
            </h2>
            {favProps.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0", color: "var(--ash)" }}>
                <Icon name="heart" size={48} color="var(--pearl)" />
                <p style={{ marginTop: 16 }}>No saved properties yet.</p>
                <button className="btn-gold" style={{ marginTop: 20 }} onClick={() => setPage("listings")}>Browse Properties</button>
              </div>
            ) : (
              <div className="grid-3">
                {favProps.map((p) => (
                  <PropertyCard key={p.id} property={p} onSelect={() => setPage("property")} favorites={favorites} toggleFav={toggleFav} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Listings */}
        {activeTab === "listings" && (
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", marginBottom: 24 }}>
              My <em style={{ color: "var(--gold)" }}>Listings</em>
            </h2>
            {listings.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0", color: "var(--ash)" }}>
                <Icon name="home" size={48} color="var(--pearl)" />
                <p style={{ marginTop: 16, marginBottom: 20 }}>You haven't listed any property yet.</p>
                <button className="btn-gold" onClick={() => setPage("list")}>List a Property</button>
              </div>
            ) : (
              listings.map((l, i) => (
                <div key={i} style={{ background: "var(--white)", borderRadius: "var(--radius-lg)", padding: 24, marginBottom: 16, boxShadow: "var(--shadow-sm)" }}>
                  <div style={{ fontWeight: 600 }}>{l.title}</div>
                  <div style={{ fontSize: "0.82rem", color: "var(--ash)", marginTop: 4 }}>{l.location} · {l.status}</div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Profile */}
        {activeTab === "profile" && (
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", marginBottom: 32 }}>
              Edit <em style={{ color: "var(--gold)" }}>Profile</em>
            </h2>
            <div style={{ background: "var(--white)", borderRadius: "var(--radius-lg)", padding: 36, boxShadow: "var(--shadow-sm)", maxWidth: 560 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div>
                  <label className="filter-label" htmlFor="dp-name">Full Name</label>
                  <input id="dp-name" className="form-input" defaultValue={user.name} />
                </div>
                <div>
                  <label className="filter-label" htmlFor="dp-email">Email Address</label>
                  <input id="dp-email" className="form-input" type="email" defaultValue={user.email} />
                </div>
                <div>
                  <label className="filter-label" htmlFor="dp-phone">Mobile Number</label>
                  <input id="dp-phone" className="form-input" defaultValue={user.phone || ""} placeholder="+91 98765 43210" />
                </div>
                <div>
                  <label className="filter-label" htmlFor="dp-city">City</label>
                  <select id="dp-city" className="form-input" defaultValue={user.city}>
                    {["Chandigarh","Mohali","Panchkula","New Chandigarh"].map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="filter-label" htmlFor="dp-intent">Looking For</label>
                  <select id="dp-intent" className="form-input" defaultValue={user.lookingFor}>
                    {["Buying a Home","Renting","Investment","Selling Property"].map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div style={{ height: 1, background: "var(--pearl)" }} />
                <button className="btn-gold" style={{ alignSelf: "flex-start" }} onClick={() => setToast("Profile updated successfully!")}>
                  <Icon name="check" size={14} color="var(--obsidian)" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default UserDashboard;

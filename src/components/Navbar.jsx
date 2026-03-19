/**
 * @file src/components/Navbar.jsx
 * @description Sticky navigation bar with transparent-to-solid scroll transition.
 */

import { useState, useEffect } from "react";
import Icon from "./Icon";

const NAV_LINKS = [
  { label: "Buy",     page: "listings", icon: "home"     },
  { label: "Rent",    page: "rent",     icon: "key"      },
  { label: "Agents",  page: "agents",   icon: "user"     },
  { label: "Blog",    page: "blog",     icon: "blog"     },
  { label: "About",   page: "about",    icon: "info"     },
  { label: "Contact", page: "contact",  icon: "phone"    },
];

const Navbar = ({ page, setPage, favCount, user, setUser, setModal }) => {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const isHero = page === "home";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu when navigating
  const navigate = (dest) => { setPage(dest); setMobileOpen(false); };

  const solid    = scrolled || !isHero;
  const navBg    = solid ? "rgba(255,255,255,0.97)" : "transparent";
  const textColor = solid ? "var(--charcoal)"        : "var(--white)";
  const logoColor = solid ? "var(--gold)"            : "var(--white)";

  return (
    <>
      <nav
        aria-label="Main navigation"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 900,
          background: navBg,
          backdropFilter: solid ? "blur(20px)" : "none",
          boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "none",
          borderBottom: solid ? "1px solid rgba(232,228,221,0.6)" : "none",
          transition: "all 0.4s ease",
        }}
      >
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>

          {/* ── Logo ── */}
          <button
            onClick={() => navigate("home")}
            style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10, background: "none", border: "none" }}
            aria-label="PrimeEstate India home"
          >
            <div style={{
              width: 32, height: 32,
              background: "linear-gradient(135deg, var(--gold), var(--gold-dark))",
              borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Icon name="building" size={16} color="white" />
            </div>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 600, color: logoColor, letterSpacing: "0.02em", transition: "color 0.4s" }}>
              Prime<span style={{ color: "var(--gold)" }}>Estate</span>
              <span style={{ fontSize: "0.6rem", fontFamily: "var(--font-body)", fontWeight: 400, color: solid ? "var(--ash)" : "rgba(255,255,255,0.6)", letterSpacing: "0.15em", marginLeft: 4, verticalAlign: "super" }}>INDIA</span>
            </span>
          </button>

          {/* ── Desktop links ── */}
          <div className="desktop-only" style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {NAV_LINKS.map((l) => (
              <button
                key={l.page}
                className={`nav-link ${!solid ? "nav-link-white" : ""} ${page === l.page ? "active" : ""}`}
                style={{ color: textColor, transition: "color 0.4s", cursor: "pointer", background: "none", border: "none" }}
                onClick={() => navigate(l.page)}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* ── Desktop actions ── */}
          <div className="desktop-only" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Favourites */}
            <button
              onClick={() => navigate("favorites")}
              style={{
                position: "relative", width: 40, height: 40, borderRadius: "50%",
                background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "var(--transition)", color: textColor, cursor: "pointer",
              }}
              aria-label={`Favourites${favCount > 0 ? ` (${favCount})` : ""}`}
            >
              <Icon name="heart" size={16} color={textColor} />
              {favCount > 0 && (
                <span className="badge" style={{ position: "absolute", top: -4, right: -4, fontSize: "0.65rem", width: 16, height: 16 }}>
                  {favCount}
                </span>
              )}
            </button>

            {user ? (
              <button
                onClick={() => navigate("dashboard")}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  background: "rgba(201,168,76,0.1)", border: "1px solid var(--gold)",
                  borderRadius: 50, padding: "6px 16px 6px 6px",
                  fontSize: "0.82rem", fontWeight: 500, transition: "var(--transition)",
                  color: "var(--gold)", cursor: "pointer",
                }}
              >
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--gold)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="user" size={14} color="white" />
                </div>
                {user.name.split(" ")[0]}
              </button>
            ) : (
              <>
                <button className="btn-outline" style={{ padding: "9px 20px", fontSize: "0.78rem" }} onClick={() => setModal("login")}>Sign In</button>
                <button className="btn-gold"    style={{ padding: "9px 20px", fontSize: "0.78rem" }} onClick={() => navigate("list")}>List Property</button>
              </>
            )}
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            className="mobile-only"
            onClick={() => setMobileOpen((o) => !o)}
            style={{ color: textColor, background: "none", border: "none", cursor: "pointer", padding: 4 }}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <Icon name={mobileOpen ? "close" : "menu"} size={24} color={textColor} />
          </button>
        </div>

        {/* ── Mobile drawer ── */}
        {mobileOpen && (
          <div style={{ background: "var(--white)", borderTop: "1px solid var(--pearl)", padding: "24px", display: "flex", flexDirection: "column", gap: 4 }}>
            {NAV_LINKS.map((l) => (
              <button
                key={l.page}
                onClick={() => navigate(l.page)}
                style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "12px 8px",
                  borderRadius: "var(--radius)", fontSize: "0.95rem", fontWeight: 500,
                  color: page === l.page ? "var(--gold)" : "var(--charcoal)",
                  background: page === l.page ? "rgba(201,168,76,0.05)" : "transparent",
                  transition: "var(--transition)", width: "100%", textAlign: "left",
                  border: "none", cursor: "pointer",
                }}
              >
                <Icon name={l.icon} size={18} color={page === l.page ? "var(--gold)" : "var(--ash)"} />
                {l.label}
              </button>
            ))}
            <div style={{ height: 1, background: "var(--pearl)", margin: "12px 0" }} />
            {user ? (
              <button onClick={() => navigate("dashboard")} className="btn-gold" style={{ width: "100%", justifyContent: "center" }}>Dashboard</button>
            ) : (
              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn-outline" style={{ flex: 1, justifyContent: "center" }} onClick={() => { setModal("login"); setMobileOpen(false); }}>Sign In</button>
                <button className="btn-gold"    style={{ flex: 1, justifyContent: "center" }} onClick={() => navigate("list")}>List Property</button>
              </div>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;

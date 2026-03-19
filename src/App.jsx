/**
 * @file src/App.jsx
 * @description Application root — global state, routing, and modal management.
 *
 * State lives here so that pages can communicate without prop-drilling
 * deeper than one level. For a larger app, replace with React Context or Zustand.
 */

import { useEffect } from "react";

// ── Global styles ──────────────────────────────────────────────────────────────
import "./styles.css";

// ── Layout ─────────────────────────────────────────────────────────────────────
import Navbar    from "./components/Navbar";
import Footer    from "./components/Footer";
import Toast     from "./components/Toast";
import AuthModal from "./components/AuthModal";

// ── Pages ──────────────────────────────────────────────────────────────────────
import HomePage           from "./pages/HomePage";
import ListingsPage       from "./pages/ListingsPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import SearchPage         from "./pages/SearchPage";
import AgentsPage         from "./pages/AgentsPage";
import AboutPage          from "./pages/AboutPage";
import ContactPage        from "./pages/ContactPage";
import BlogPage           from "./pages/BlogPage";
import FavouritesPage     from "./pages/FavouritesPage";
import ListPropertyPage   from "./pages/ListPropertyPage";
import UserDashboard      from "./pages/UserDashboard";

// ── Custom hooks ───────────────────────────────────────────────────────────────
import { useFavorites } from "./hooks/useFavorites";
import { useToast }     from "./hooks/useToast";
import { useState }     from "react";

/**
 * @typedef {Object} User
 * @property {string}   name
 * @property {string}   email
 * @property {string}   [phone]
 * @property {string}   city
 * @property {string}   lookingFor
 * @property {number}   memberSince
 * @property {Array}    enquiries
 * @property {Array}    listings
 */

export default function App() {
  const [page,             setPage]             = useState("home");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [modal,            setModal]            = useState(null);   // "login" | "register" | null
  const [user,             setUser]             = useState(null);   // User | null

  const { favorites, toggleFav } = useFavorites();
  const { toast, showToast, hideToast } = useToast();

  // Scroll to top on every page change
  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  // ── Shared props ─────────────────────────────────────────────────────────────
  const navProps = {
    page, setPage,
    favCount: favorites.length,
    user, setUser, setModal,
  };

  const propertyBrowseProps = {
    setSelectedProperty,
    setPage,
    favorites,
    toggleFav,
  };

  // ── Page router ──────────────────────────────────────────────────────────────
  const renderPage = () => {
    switch (page) {
      case "home":
        return (
          <HomePage
            {...propertyBrowseProps}
            setToast={showToast}
            user={user}
            setModal={setModal}
          />
        );

      case "listings":
        return <ListingsPage {...propertyBrowseProps} />;

      case "rent":
        return <ListingsPage {...propertyBrowseProps} rentOnly />;

      case "search":
        return <SearchPage {...propertyBrowseProps} />;

      case "property":
        return selectedProperty ? (
          <PropertyDetailPage
            property={selectedProperty}
            setPage={setPage}
            favorites={favorites}
            toggleFav={toggleFav}
            setToast={showToast}
          />
        ) : null;

      case "agents":
        return <AgentsPage />;

      case "about":
        return <AboutPage />;

      case "contact":
        return <ContactPage setToast={showToast} />;

      case "blog":
        return <BlogPage />;

      case "favorites":
        return <FavouritesPage {...propertyBrowseProps} />;

      case "list":
        return <ListPropertyPage setToast={showToast} />;

      case "dashboard":
        return user ? (
          <UserDashboard
            user={user}
            setUser={setUser}
            setPage={setPage}
            favorites={favorites}
            toggleFav={toggleFav}
            setToast={showToast}
          />
        ) : null;

      default:
        return (
          <HomePage
            {...propertyBrowseProps}
            setToast={showToast}
            user={user}
            setModal={setModal}
          />
        );
    }
  };

  return (
    <>
      <Navbar {...navProps} />

      <main id="main-content">{renderPage()}</main>

      {/* Footer hidden on dashboard for a full-screen layout */}
      {page !== "dashboard" && <Footer setPage={setPage} />}

      {/* Auth modal */}
      {modal && (
        <AuthModal
          mode={modal}
          onClose={() => setModal(null)}
          onAuth={(userData) => {
            setUser(userData);
            showToast(`Namaste, ${userData.name.split(" ")[0]}! Welcome to PrimeEstate India 🏡`);
          }}
        />
      )}

      {/* Toast notification */}
      {toast && <Toast message={toast} onClose={hideToast} />}
    </>
  );
}

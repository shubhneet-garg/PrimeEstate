/**
 * @file src/components/AuthModal.jsx
 * @description Login / Register modal with client-side validation.
 *
 * NOTE: This is a UI-only mock. In production, replace handleSubmit
 * with a real API call (e.g. Firebase Auth, Supabase, or your own backend).
 */

import { useState } from "react";
import Icon from "./Icon";

const AuthModal = ({ mode, onClose, onAuth }) => {
  const [isLogin,    setIsLogin]    = useState(mode === "login");
  const [name,       setName]       = useState("");
  const [email,      setEmail]      = useState("");
  const [phone,      setPhone]      = useState("");
  const [password,   setPassword]   = useState("");
  const [confirmPw,  setConfirmPw]  = useState("");
  const [city,       setCity]       = useState("Chandigarh");
  const [lookingFor, setLookingFor] = useState("Buying a Home");
  const [error,      setError]      = useState("");

  const validate = () => {
    if (!email)               return "Email is required.";
    if (!/\S+@\S+\.\S+/.test(email)) return "Please enter a valid email.";
    if (!password)            return "Password is required.";
    if (!isLogin) {
      if (!name)              return "Full name is required.";
      if (password.length < 6) return "Password must be at least 6 characters.";
      if (password !== confirmPw) return "Passwords do not match.";
    }
    return null;
  };

  const handleSubmit = () => {
    const err = validate();
    if (err) { setError(err); return; }
    setError("");

    /** @type {import('../App').User} */
    const userData = {
      name:        isLogin ? (name || email.split("@")[0]) : name,
      email,
      phone,
      city:        isLogin ? "Chandigarh" : city,
      lookingFor:  isLogin ? "Buying a Home" : lookingFor,
      memberSince: new Date().getFullYear(),
      enquiries:   [],
      listings:    [],
    };

    onAuth(userData);
    onClose();
  };

  const switchMode = () => { setIsLogin((v) => !v); setError(""); };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={isLogin ? "Sign in" : "Create account"}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 500 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ width: 48, height: 48, borderRadius: 10, background: "var(--gold)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
            <Icon name="building" size={22} color="white" />
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 400 }}>
            {isLogin ? "Welcome Back" : "Join PrimeEstate India"}
          </h2>
          <p style={{ color: "var(--ash)", fontSize: "0.87rem", marginTop: 6 }}>
            {isLogin ? "Sign in to your account" : "Create your free account in seconds"}
          </p>
        </div>

        {/* Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {!isLogin && (
            <div>
              <label className="filter-label" htmlFor="auth-name">Full Name *</label>
              <input id="auth-name" className="form-input" placeholder="Gurpreet Singh" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          )}

          <div>
            <label className="filter-label" htmlFor="auth-email">Email Address *</label>
            <input id="auth-email" className="form-input" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          {!isLogin && (
            <div>
              <label className="filter-label" htmlFor="auth-phone">Mobile Number</label>
              <input id="auth-phone" className="form-input" placeholder="+91 98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
          )}

          <div>
            <label className="filter-label" htmlFor="auth-password">Password *</label>
            <input
              id="auth-password" className="form-input" type="password" placeholder="••••••••"
              value={password} onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>

          {!isLogin && (
            <>
              <div>
                <label className="filter-label" htmlFor="auth-confirm">Confirm Password *</label>
                <input
                  id="auth-confirm" className="form-input" type="password" placeholder="••••••••"
                  value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                />
              </div>
              <div className="grid-2" style={{ gap: 12 }}>
                <div>
                  <label className="filter-label" htmlFor="auth-city">City</label>
                  <select id="auth-city" className="form-input" value={city} onChange={(e) => setCity(e.target.value)}>
                    {["Chandigarh","Mohali","Panchkula","New Chandigarh","Zirakpur","Other"].map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="filter-label" htmlFor="auth-intent">I'm Looking to…</label>
                  <select id="auth-intent" className="form-input" value={lookingFor} onChange={(e) => setLookingFor(e.target.value)}>
                    {["Buying a Home","Renting","Investment","Selling Property","NRI Investment"].map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
            </>
          )}

          {isLogin && (
            <div style={{ textAlign: "right" }}>
              <button style={{ fontSize: "0.8rem", color: "var(--gold)", fontWeight: 500, background: "none", border: "none", cursor: "pointer" }}>
                Forgot password?
              </button>
            </div>
          )}

          {/* Error */}
          {error && (
            <div role="alert" style={{
              background: "rgba(220,53,69,0.08)", border: "1px solid rgba(220,53,69,0.2)",
              borderRadius: "var(--radius)", padding: "10px 14px", fontSize: "0.83rem", color: "#dc3545",
            }}>
              {error}
            </div>
          )}

          <button className="btn-gold" style={{ width: "100%", justifyContent: "center", marginTop: 4 }} onClick={handleSubmit}>
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </div>

        {/* Switch mode */}
        <p style={{ textAlign: "center", marginTop: 20, fontSize: "0.85rem", color: "var(--ash)" }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={switchMode} style={{ color: "var(--gold)", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>
            {isLogin ? "Sign up free" : "Sign in"}
          </button>
        </p>

        {/* Close */}
        <button
          onClick={onClose}
          style={{ position: "absolute", top: 16, right: 16, width: 32, height: 32, borderRadius: "50%", background: "var(--pearl)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: "none" }}
          aria-label="Close"
        >
          <Icon name="close" size={14} color="var(--ash)" />
        </button>
      </div>
    </div>
  );
};

export default AuthModal;

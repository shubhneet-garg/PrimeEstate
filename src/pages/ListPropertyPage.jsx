/**
 * @file src/pages/ListPropertyPage.jsx
 * @description Three-step wizard for submitting a new property listing.
 */

import { useState } from "react";
import Icon from "../components/Icon";

const STEPS = [
  { n: 1, label: "Property Info"  },
  { n: 2, label: "Details"        },
  { n: 3, label: "Your Info"      },
];

const INITIAL_FORM = {
  type: "sale", propType: "Apartment", city: "Chandigarh",
  sector: "", price: "", beds: "", baths: "", sqft: "",
  title: "", desc: "", name: "", phone: "", email: "",
};

const ListPropertyPage = ({ setToast }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  const ch = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validateStep1 = () => {
    const errs = {};
    if (!form.sector.trim()) errs.sector = "Sector / Locality is required.";
    if (!form.price)         errs.price  = "Price is required.";
    return errs;
  };

  const validateStep2 = () => {
    const errs = {};
    if (!form.beds)          errs.beds  = "Please select bedrooms.";
    if (!form.sqft)          errs.sqft  = "Carpet area is required.";
    if (!form.title.trim())  errs.title = "Property title is required.";
    return errs;
  };

  const validateStep3 = () => {
    const errs = {};
    if (!form.name.trim())  errs.name  = "Full name is required.";
    if (!form.phone.trim()) errs.phone = "Mobile number is required.";
    return errs;
  };

  const goNext = () => {
    const errs = step === 1 ? validateStep1() : step === 2 ? validateStep2() : {};
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStep((s) => s + 1);
  };

  const handleSubmit = () => {
    const errs = validateStep3();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setToast("Listing submitted! Our team will review and publish within 24 hours.");
    setForm(INITIAL_FORM);
    setStep(1);
  };

  const FieldError = ({ name }) =>
    errors[name] ? <p role="alert" style={{ color: "#dc3545", fontSize: "0.78rem", marginTop: 4 }}>{errors[name]}</p> : null;

  return (
    <div style={{ paddingTop: 72 }}>
      <div style={{ background: "var(--charcoal)", padding: "64px 0" }}>
        <div className="container">
          <p className="section-eyebrow" style={{ color: "var(--gold-light)" }}>Property Listing</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4vw,3rem)", color: "var(--white)", fontWeight: 400 }}>
            List Your <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Property</em>
          </h1>
          <p style={{ color: "var(--ash)", marginTop: 8 }}>Reach thousands of genuine buyers & renters across Tricity.</p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 720 }}>

          {/* Step indicator */}
          <div style={{ display: "flex", gap: 0, marginBottom: 48, background: "var(--ivory)", borderRadius: "var(--radius-lg)", padding: 8 }}>
            {STEPS.map((s) => (
              <button
                key={s.n}
                onClick={() => s.n < step && setStep(s.n)}
                style={{
                  flex: 1, textAlign: "center", padding: 12, borderRadius: "var(--radius)",
                  background: step === s.n ? "var(--gold)" : "transparent",
                  color:      step === s.n ? "var(--obsidian)" : "var(--ash)",
                  fontSize: "0.82rem", fontWeight: step === s.n ? 700 : 400,
                  cursor: s.n < step ? "pointer" : "default",
                  border: "none", transition: "var(--transition)",
                }}
                aria-current={step === s.n ? "step" : undefined}
              >
                <span style={{ fontWeight: 700, marginRight: 6 }}>{s.n}.</span>{s.label}
              </button>
            ))}
          </div>

          {/* Step 1 — Property info */}
          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20, animation: "fadeInUp 0.4s ease" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>Tell us about your <em style={{ color: "var(--gold)" }}>property</em></h2>

              <div className="grid-2" style={{ gap: 16 }}>
                <div>
                  <label className="filter-label" htmlFor="lp-type">Listing Type</label>
                  <select id="lp-type" className="form-input" value={form.type} onChange={ch("type")}>
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                  </select>
                </div>
                <div>
                  <label className="filter-label" htmlFor="lp-proptype">Property Type</label>
                  <select id="lp-proptype" className="form-input" value={form.propType} onChange={ch("propType")}>
                    {["Apartment","Independent House","Villa","Penthouse","Plot","Commercial"].map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid-2" style={{ gap: 16 }}>
                <div>
                  <label className="filter-label" htmlFor="lp-city">City</label>
                  <select id="lp-city" className="form-input" value={form.city} onChange={ch("city")}>
                    {["Chandigarh","Mohali","Panchkula","New Chandigarh","Zirakpur"].map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="filter-label" htmlFor="lp-sector">Sector / Locality *</label>
                  <input id="lp-sector" className="form-input" placeholder="e.g. Sector 17, Aerocity Phase 2" value={form.sector} onChange={ch("sector")} />
                  <FieldError name="sector" />
                </div>
              </div>

              <div>
                <label className="filter-label" htmlFor="lp-price">{form.type === "rent" ? "Monthly Rent (₹) *" : "Price (₹) *"}</label>
                <input id="lp-price" className="form-input" type="number" min={0} placeholder={form.type === "rent" ? "e.g. 35000" : "e.g. 12500000"} value={form.price} onChange={ch("price")} />
                <FieldError name="price" />
              </div>

              <button className="btn-gold" style={{ alignSelf: "flex-start" }} onClick={goNext}>
                Next: Property Details <Icon name="arrow" size={14} color="var(--obsidian)" />
              </button>
            </div>
          )}

          {/* Step 2 — Property details */}
          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20, animation: "fadeInUp 0.4s ease" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>Property <em style={{ color: "var(--gold)" }}>Details</em></h2>

              <div className="grid-2" style={{ gap: 16 }}>
                <div>
                  <label className="filter-label" htmlFor="lp-beds">Bedrooms (BHK) *</label>
                  <select id="lp-beds" className="form-input" value={form.beds} onChange={ch("beds")}>
                    <option value="">Select</option>
                    {["1","2","3","4","5","6+"].map((b) => <option key={b}>{b}</option>)}
                  </select>
                  <FieldError name="beds" />
                </div>
                <div>
                  <label className="filter-label" htmlFor="lp-baths">Bathrooms</label>
                  <select id="lp-baths" className="form-input" value={form.baths} onChange={ch("baths")}>
                    <option value="">Select</option>
                    {["1","2","3","4","5+"].map((b) => <option key={b}>{b}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="filter-label" htmlFor="lp-sqft">Carpet Area (sq.ft) *</label>
                <input id="lp-sqft" className="form-input" type="number" min={0} placeholder="e.g. 1450" value={form.sqft} onChange={ch("sqft")} />
                <FieldError name="sqft" />
              </div>

              <div>
                <label className="filter-label" htmlFor="lp-title">Property Title *</label>
                <input id="lp-title" className="form-input" placeholder="e.g. 3BHK Luxury Apartment in Sector 17" value={form.title} onChange={ch("title")} />
                <FieldError name="title" />
              </div>

              <div>
                <label className="filter-label" htmlFor="lp-desc">Description</label>
                <textarea id="lp-desc" className="form-input" rows={5} placeholder="Describe key features, nearby landmarks, amenities…" value={form.desc} onChange={ch("desc")} style={{ resize: "vertical" }} />
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn-outline" onClick={() => { setErrors({}); setStep(1); }}>Back</button>
                <button className="btn-gold" onClick={goNext}>
                  Next: Your Info <Icon name="arrow" size={14} color="var(--obsidian)" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3 — Contact info */}
          {step === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20, animation: "fadeInUp 0.4s ease" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>Your <em style={{ color: "var(--gold)" }}>Contact Info</em></h2>

              <div>
                <label className="filter-label" htmlFor="lp-name">Full Name *</label>
                <input id="lp-name" className="form-input" placeholder="Your Name" value={form.name} onChange={ch("name")} />
                <FieldError name="name" />
              </div>

              <div className="grid-2" style={{ gap: 16 }}>
                <div>
                  <label className="filter-label" htmlFor="lp-phone">Mobile Number *</label>
                  <input id="lp-phone" className="form-input" placeholder="+91 98765 43210" value={form.phone} onChange={ch("phone")} />
                  <FieldError name="phone" />
                </div>
                <div>
                  <label className="filter-label" htmlFor="lp-email">Email Address</label>
                  <input id="lp-email" className="form-input" type="email" placeholder="you@example.com" value={form.email} onChange={ch("email")} />
                </div>
              </div>

              <div style={{ background: "var(--ivory)", borderRadius: "var(--radius)", padding: 20, fontSize: "0.83rem", color: "var(--ash)", display: "flex", gap: 10, alignItems: "flex-start" }}>
                <Icon name="info" size={16} color="var(--gold)" />
                <span>By submitting, you agree to our Terms of Service. Our RERA-registered team will review and publish your listing within 24 business hours.</span>
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn-outline" onClick={() => { setErrors({}); setStep(2); }}>Back</button>
                <button className="btn-gold" onClick={handleSubmit}>
                  <Icon name="upload" size={14} color="var(--obsidian)" />
                  Submit Listing
                </button>
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
};

export default ListPropertyPage;

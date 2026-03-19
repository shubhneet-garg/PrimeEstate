/**
 * @file src/pages/ContactPage.jsx
 */

import { useState } from "react";
import Icon from "../components/Icon";

const CONTACT_DETAILS = [
  { icon: "location", title: "Registered Office",   value: "SCO 145-146, Sector 17-C, Chandigarh — 160017"    },
  { icon: "phone",    title: "Phone / WhatsApp",    value: "+91 98765 43210 | +91 90000 12345"                 },
  { icon: "mail",     title: "Email",               value: "info@primeestate.in | support@primeestate.in"      },
  { icon: "building", title: "RERA No.",            value: "PBRERA-SAS79-CR06145"                              },
];

const OFFICE_HOURS = [
  { day: "Mon – Fri",  time: "9:00 AM – 7:00 PM"    },
  { day: "Saturday",   time: "10:00 AM – 5:00 PM"   },
  { day: "Sunday",     time: "By Appointment Only"  },
];

const INITIAL_FORM = { name: "", email: "", phone: "", message: "" };

const ContactPage = ({ setToast }) => {
  const [form,   setForm]   = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  const handleChange = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.name.trim())                      errs.name  = "Name is required.";
    if (!form.email.trim())                     errs.email = "Email is required.";
    if (!/\S+@\S+\.\S+/.test(form.email))       errs.email = "Please enter a valid email.";
    if (!form.message.trim())                   errs.message = "Please describe your requirement.";
    return errs;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setToast("Message sent! We'll respond within 2 business hours.");
    setForm(INITIAL_FORM);
  };

  return (
    <div style={{ paddingTop: 72 }}>
      {/* Header */}
      <div style={{ background: "var(--charcoal)", padding: "64px 0" }}>
        <div className="container">
          <p className="section-eyebrow" style={{ color: "var(--gold-light)" }}>Get In Touch</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4vw,3.5rem)", color: "var(--white)", fontWeight: 400 }}>
            We're Here to <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Help You</em>
          </h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: 64, alignItems: "start" }}>

            {/* ── Contact form ── */}
            <div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", marginBottom: 8 }}>
                Send Us a <em style={{ color: "var(--gold)" }}>Message</em>
              </h2>
              <p style={{ color: "var(--ash)", marginBottom: 32 }}>Our team responds within 2 business hours on weekdays.</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div className="grid-2" style={{ gap: 16 }}>
                  <div>
                    <label className="filter-label" htmlFor="contact-name">Your Name *</label>
                    <input id="contact-name" className="form-input" placeholder="Gurpreet Singh" value={form.name} onChange={handleChange("name")} />
                    {errors.name && <p role="alert" style={{ color: "#dc3545", fontSize: "0.78rem", marginTop: 4 }}>{errors.name}</p>}
                  </div>
                  <div>
                    <label className="filter-label" htmlFor="contact-email">Email Address *</label>
                    <input id="contact-email" className="form-input" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange("email")} />
                    {errors.email && <p role="alert" style={{ color: "#dc3545", fontSize: "0.78rem", marginTop: 4 }}>{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="filter-label" htmlFor="contact-phone">Mobile Number</label>
                  <input id="contact-phone" className="form-input" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange("phone")} />
                </div>

                <div>
                  <label className="filter-label" htmlFor="contact-intent">What Are You Looking For?</label>
                  <select id="contact-intent" className="form-input">
                    <option>Buying a Property</option>
                    <option>Renting a Property</option>
                    <option>Selling / Listing My Property</option>
                    <option>NRI Investment Advice</option>
                    <option>Home Loan Assistance</option>
                    <option>General Query</option>
                  </select>
                </div>

                <div>
                  <label className="filter-label" htmlFor="contact-message">Message *</label>
                  <textarea id="contact-message" className="form-input" rows={5} placeholder="Tell us more about your requirement…" value={form.message} onChange={handleChange("message")} style={{ resize: "vertical" }} />
                  {errors.message && <p role="alert" style={{ color: "#dc3545", fontSize: "0.78rem", marginTop: 4 }}>{errors.message}</p>}
                </div>

                <button className="btn-gold" style={{ alignSelf: "flex-start" }} onClick={handleSubmit}>
                  <Icon name="mail" size={16} color="var(--obsidian)" />
                  Send Message
                </button>
              </div>
            </div>

            {/* ── Contact details ── */}
            <div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", marginBottom: 28 }}>
                Contact <em style={{ color: "var(--gold)" }}>Details</em>
              </h2>

              {CONTACT_DETAILS.map((c) => (
                <div key={c.title} style={{ display: "flex", gap: 16, marginBottom: 24 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "var(--radius)", background: "rgba(201,168,76,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name={c.icon} size={18} color="var(--gold)" />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ash)", marginBottom: 4 }}>{c.title}</div>
                    <div style={{ fontSize: "0.9rem", color: "var(--charcoal)" }}>{c.value}</div>
                  </div>
                </div>
              ))}

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/919876543210?text=Hi, I'm interested in a property on PrimeEstate India."
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "12px 24px", background: "#25D366", color: "white", borderRadius: "var(--radius)", fontWeight: 600, fontSize: "0.87rem", textDecoration: "none", transition: "var(--transition)", marginBottom: 32 }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#1ebe5d")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#25D366")}
              >
                <svg width={18} height={18} viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                Chat on WhatsApp
              </a>

              {/* Office hours */}
              <div style={{ background: "var(--ivory)", borderRadius: "var(--radius-lg)", padding: 24 }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", marginBottom: 8 }}>Office Hours</h3>
                {OFFICE_HOURS.map((h) => (
                  <div key={h.day} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--pearl)", fontSize: "0.85rem" }}>
                    <span style={{ color: "var(--ash)" }}>{h.day}</span>
                    <span style={{ fontWeight: 500 }}>{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;

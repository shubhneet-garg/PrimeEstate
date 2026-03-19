/**
 * @file src/components/EnquiryForm.jsx
 * @description Contact form used on property detail pages.
 */

import { useState } from "react";
import Icon from "./Icon";

const EnquiryForm = ({ onSubmit }) => {
  const [name,  setName]  = useState("");
  const [phone, setPhone] = useState("");
  const [msg,   setMsg]   = useState("");
  const [error, setError] = useState("");

  const handleSend = () => {
    if (!name.trim())  { setError("Please enter your name.");         return; }
    if (!phone.trim()) { setError("Please enter your mobile number."); return; }
    setError("");
    onSubmit();
    setName(""); setPhone(""); setMsg("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <input
        className="form-input" placeholder="Your Name *"
        value={name} onChange={(e) => setName(e.target.value)}
        style={{ padding: "10px 14px", fontSize: "0.85rem" }}
        aria-label="Your name"
      />
      <input
        className="form-input" placeholder="Mobile Number *"
        value={phone} onChange={(e) => setPhone(e.target.value)}
        style={{ padding: "10px 14px", fontSize: "0.85rem" }}
        aria-label="Mobile number"
      />
      <textarea
        className="form-input" placeholder="Message (optional)" rows={3}
        value={msg} onChange={(e) => setMsg(e.target.value)}
        style={{ resize: "vertical", padding: "10px 14px", fontSize: "0.85rem" }}
        aria-label="Optional message"
      />

      {error && (
        <p role="alert" style={{ fontSize: "0.8rem", color: "#dc3545", margin: 0 }}>{error}</p>
      )}

      <button className="btn-gold" style={{ width: "100%", justifyContent: "center" }} onClick={handleSend}>
        <Icon name="mail" size={14} color="var(--obsidian)" />
        Send Enquiry
      </button>
    </div>
  );
};

export default EnquiryForm;

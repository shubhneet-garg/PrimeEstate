/**
 * @file src/utils/formatters.js
 * @description Formatting utilities for prices, dates, and other display values.
 */

/**
 * Formats a price or rent value in Indian currency notation.
 * @param {number|null} price - Sale price in rupees
 * @param {number|null} rent  - Monthly rent in rupees
 * @returns {string} Formatted price string, e.g. "₹32 Cr" or "₹35K/mo"
 */
export const formatPrice = (price, rent) => {
  if (rent) return `₹${(rent / 1000).toFixed(0)}K/mo`;
  if (!price) return "Price on Request";
  if (price >= 10_000_000)
    return `₹${(price / 10_000_000).toFixed(price % 10_000_000 === 0 ? 0 : 1)} Cr`;
  if (price >= 100_000)
    return `₹${(price / 100_000).toFixed(price % 100_000 === 0 ? 0 : 1)} L`;
  return `₹${price.toLocaleString("en-IN")}`;
};

/**
 * Returns price-per-sqft string, or empty string if data unavailable.
 */
export const formatPricePerSqft = (price, sqft) => {
  if (!price || !sqft) return "";
  return `₹${Math.round(price / sqft).toLocaleString("en-IN")}/sq.ft`;
};

/**
 * Determines the CSS tag class for a property badge.
 */
export const getBadgeClass = (badge) => {
  if (!badge) return "tag-gold";
  if (badge === "For Rent") return "tag-teal";
  if (badge === "Commercial") return "tag-dark";
  return "tag-gold";
};

/**
 * Copies text to clipboard and returns a promise.
 */
export const copyToClipboard = (text) => {
  if (navigator.clipboard) return navigator.clipboard.writeText(text);
  // Fallback for older browsers
  const el = document.createElement("textarea");
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  return Promise.resolve();
};

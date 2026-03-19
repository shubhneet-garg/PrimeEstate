/**
 * @file src/main.jsx
 * @description React application entry point.
 */

import { StrictMode } from "react";
import { createRoot }  from "react-dom/client";
import App             from "./App.jsx";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find #root element. Check your index.html.");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);

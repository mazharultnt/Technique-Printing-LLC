import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import { reloadOnce } from "./components/ErrorBoundary.jsx";
import "./index.css";

// A new deploy can remove old page files that a visitor's browser still wants: reload once to get the new ones.
window.addEventListener("vite:preloadError", (e) => { e.preventDefault(); reloadOnce(); });

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

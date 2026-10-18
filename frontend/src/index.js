import React from "react";

import ReactDOM from "react-dom/client";

import "./index.css";

import App from "./App";

import reportWebVitals from "./reportWebVitals";

import { BrowserRouter } from "react-router-dom";

import "./i18n";

/* ================= ROOT ================= */

const root =
  ReactDOM.createRoot(
    document.getElementById(
      "root"
    )
  );

/* ================= RENDER ================= */

root.render(

  <BrowserRouter>

    <App />

  </BrowserRouter>

);

/* ================= WEB VITALS ================= */

reportWebVitals();
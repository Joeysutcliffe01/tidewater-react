import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SiteProvider } from "./context/SiteContext";
import App from "./App.jsx";
import "./styles/global.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SiteProvider>
      <App />
    </SiteProvider>
  </StrictMode>,
);

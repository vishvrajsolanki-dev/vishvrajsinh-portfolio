import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

console.log(
  "%cVS · Clarity Engine",
  "font-family:monospace;font-weight:700;color:#2f6fed;font-size:12px;",
);
console.log(
  "%cSystems over slides. If you're reading this, you already know how to look under the hood.",
  "font-family:monospace;color:#5c6b7a;font-size:11px;",
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "98.css"
import Desktop from "./Desktop";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Desktop />
  </StrictMode>,
);

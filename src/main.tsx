import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/globals.css";

/**
 * /kitchen-sink is a dev-only design-system review page (docs/PROJECT_PLAN.md
 * Phase 2). No router is used for the real single-page site (CLAUDE.md §3),
 * so this is a plain pathname check, gated to dev builds so it never ships.
 */
const RootComponent =
  import.meta.env.DEV && window.location.pathname === "/kitchen-sink"
    ? (await import("./dev/KitchenSink")).KitchenSink
    : App;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootComponent />
  </StrictMode>,
);

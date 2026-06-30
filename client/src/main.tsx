import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initClickTracking } from "./lib/tracking";

createRoot(document.getElementById("root")!).render(<App />);

// Initialize GTM-compatible click tracking via data attributes
initClickTracking();

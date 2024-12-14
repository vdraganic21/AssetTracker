import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "@synergy-design-system/tokens/themes/light.css";
import "@synergy-design-system/components/index.css";
import "@synergy-design-system/styles/index.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/400-italic.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/600-italic.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/open-sans/700-italic.css";
import { MockDataInitializer } from "./data-access/mock-repositories/MockDataInitializer.ts";

MockDataInitializer.initializeData(); //Initializes mock data repositories, use for testing and dev purposes

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

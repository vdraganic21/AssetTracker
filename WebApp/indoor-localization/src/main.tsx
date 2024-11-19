import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter } from "react-router-dom";
import "@synergy-design-system/tokens/themes/light.css";
import "@synergy-design-system/components/index.css";
import "@synergy-design-system/styles/index.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/400-italic.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/600-italic.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/open-sans/700-italic.css";
import Dashboard from "./components/Dashboard.tsx";
import AssetsManager from "./components/AssetsManager.tsx";
import FacilitiesManager from "./components/FacilitiesManager.tsx";
import Reports from "./components/Reports.tsx";
import NotFoundPage from "./components/NotFoundPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/assets",
    element: <AssetsManager />,
  },
  {
    path: "/facilities",
    element: <FacilitiesManager />,
  },
  {
    path: "/reports",
    element: <Reports />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App router={router}></App>
  </StrictMode>
);

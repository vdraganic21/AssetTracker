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
import { registerIconLibrary } from "@synergy-design-system/components";
import ReportModulesService from "./services/ReportModulesService.ts";
import AssetIdleTimeReportModule from "./modules/report-modules/asset-idle-time-report/AssetIdleTimeReportModule.ts";
import ZoneRetentionTimeReportModule from "./modules/report-modules/zone-retention-time-report/ZoneRetentionTimeReportModule.ts";
import SpaghettiMapReportModule from "./modules/report-modules/spaghetti-map-report/SpaghettiMapReportModule.ts";
import HeatMapReportModule from "./modules/report-modules/heatmap-report/HeatmapReportModule.ts";

registerIconLibrary("fa", {
	resolver: (name) => {
		const filename = name.replace(/^fa[rbs]-/, "");
		let folder = "regular";
		if (name.substring(0, 4) === "fas-") folder = "solid";
		if (name.substring(0, 4) === "fab-") folder = "brands";
		return `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.7.0/svgs/${folder}/${filename}.svg`;
	},
	mutator: (svg) => svg.setAttribute("fill", "currentColor"),
});

ReportModulesService.SetModules([
	new AssetIdleTimeReportModule(),
	new ZoneRetentionTimeReportModule(),
	new SpaghettiMapReportModule(),
	new HeatMapReportModule(),
]);

MockDataInitializer.initializeData(); //Initializes mock data repositories, use for testing and dev purposes

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</StrictMode>
);

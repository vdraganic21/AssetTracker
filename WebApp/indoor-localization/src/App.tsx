import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Dashboard from "./components/dashboard/Dashboard";
import FacilitiesManager from "./components/facilities-manager/FacilitiesManager";
import ReportsPage from "./components/reports-page/ReportsPage";
import AssetsManager from "./components/assets-manager/AssetsManager";
import AddFacilityForm from "./components/facilities-manager/AddFacilityForm";
import EditAssetForm from "./components/assets-manager/EditAssetForm";
import AddAssetForm from "./components/assets-manager/AddAssetForm";
import EditFacilityForm from "./components/facilities-manager/EditFacilityForm";
import NotFoundPage from "./components/NotFoundPage";
import ReportModulesService from "./services/ReportModulesService";

function App() {
	const reportModules = ReportModulesService.GetAllModules();

	return (
		<div className="application">
			<Header />
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="/assets" element={<AssetsManager />} />
				<Route path="/facilities" element={<FacilitiesManager />} />
				<Route path="/reports" element={<ReportsPage />} />
				<Route path="/facilities/add" element={<AddFacilityForm />} />
				<Route path="/assets/edit/:id" element={<EditAssetForm />} />
				<Route path="/assets/add" element={<AddAssetForm />} />
				<Route path="/facilities/edit/:id" element={<EditFacilityForm />} />
				{reportModules.map((module, index) => (
					<Route
						key={index}
						path={module.GetUrl()}
						element={module.GetComponent()}
					/>
				))}
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</div>
	);
}

export default App;

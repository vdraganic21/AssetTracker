import CookieService from "../../services/CookieService";
import { FacilityService } from "../../services/FacilityService";
import "./Dashboard.css";
import DashboardSidePanel from "./DashboardSidePanel";
import FloorMapDisplay from "./FloorMapDisplay";

function Dashboard() {
	function getSelectedFaciltiyDefault() {
		let selectedFacility = FacilityService.GetAll()[0];
		if (!selectedFacility) {
			CookieService.delete("selectedFacility");
			return null;
		}

		CookieService.set("selectedFacility", selectedFacility.id.toString());
		return selectedFacility;
	}

	function getSelectedFacility() {
		let selectedFacilityId = CookieService.get("selectedFacility");
		let selectedFacility;

		if (!selectedFacilityId) {
			return getSelectedFaciltiyDefault();
		}

		selectedFacility = FacilityService.Get(parseInt(selectedFacilityId));
		if (!selectedFacility) {
			return getSelectedFaciltiyDefault();
		}

		return selectedFacility;
	}

	const selectedFacility = getSelectedFacility();

	if (!selectedFacility) {
		return <div className="content">No facility found.</div>;
	}

	return (
		<div className="content">
			<DashboardSidePanel></DashboardSidePanel>
			<FloorMapDisplay facility={selectedFacility}></FloorMapDisplay>
		</div>
	);
}

export default Dashboard;

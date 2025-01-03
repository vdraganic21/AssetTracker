import SelectedFacilityService from "../../services/SelectedFacilityService";
import "./Dashboard.css";
import DashboardSidePanel from "./DashboardSidePanel";
import FloorMapDisplay from "./FloorMapDisplay";

function Dashboard() {
	const selectedFacility = SelectedFacilityService.getSelectedFacility();

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

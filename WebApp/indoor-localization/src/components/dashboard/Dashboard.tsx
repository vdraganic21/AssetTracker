import { Facility } from "../../entities/Facility";
import "./Dashboard.css";
import DashboardSidePanel from "./DashboardSidePanel";
import FloorMapDisplay from "./FloorMapDisplay";

function Dashboard() {
	function getSelectedFacility() {
		return new Facility(1, "Warehouse", "/floorMapDemo.png");
	}

	return (
		<div className="content">
			<DashboardSidePanel></DashboardSidePanel>
			<FloorMapDisplay facility={getSelectedFacility()}></FloorMapDisplay>
		</div>
	);
}

export default Dashboard;

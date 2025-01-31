import { useNavigate } from "react-router-dom";
import SelectedFacilityService from "../../services/SelectedFacilityService";
import DashboardSidePanel from "./DashboardSidePanel";
import FloorMapDisplay from "./FloorMapDisplay";
import FullPageNotification from "../common/FullPageNotification";
import HighlightedAssetService from "../../services/HighlightedAssetService";

function Dashboard() {
	const selectedFacility = SelectedFacilityService.getSelectedFacility();
	const navigate = useNavigate();
	HighlightedAssetService.removeHighlightedAssetId();

	if (!selectedFacility) {
		return (
			<FullPageNotification
				title=""
				message="No facilities could be found."
				buttonLabel="Go to Facilties Manager"
				onButtonClick={() => {
					navigate("/facilities");
				}}
			/>
		);
	}

	return (
		<div className="content">
			<DashboardSidePanel></DashboardSidePanel>
			<FloorMapDisplay facility={selectedFacility}></FloorMapDisplay>
		</div>
	);
}

export default Dashboard;

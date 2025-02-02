import { useNavigate } from "react-router-dom";
import SelectedFacilityService from "../../services/SelectedFacilityService";
import DashboardSidePanel from "./DashboardSidePanel";
import FloorMapDisplay from "./FloorMapDisplay";
import FullPageNotification from "../common/FullPageNotification";
import { useEffect, useState } from "react";
import { Facility } from "../../entities/Facility";
import Spinner from "../common/Spinner";
import HighlightedAssetService from "../../services/HighlightedAssetService";
import HiddenAssetsService from "../../services/HiddenAssetsService";
import HiddenZoneService from "../../services/HiddenZoneService";

function Dashboard() {
	const [selectedFacility, setSelectedFacility] = useState<Facility | null>(
		null
	);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();
	HighlightedAssetService.removeHighlightedAssetId();

	HiddenAssetsService.Refresh();
	HiddenZoneService.Refresh();

	const fetchSelectedFacility = async () => {
		const facility = await SelectedFacilityService.getSelectedFacility();
		setSelectedFacility(facility);
	};

	const initialFacilityFetch = async () => {
		setIsLoading(true);
		await fetchSelectedFacility();
		setIsLoading(false);
	};

	useEffect(() => {
		initialFacilityFetch();

		const intervalId = setInterval(() => {
			fetchSelectedFacility();
		}, 500);

		return () => clearInterval(intervalId);
	}, []);

	if (isLoading) {
		return <Spinner text="Loading facility." />;
	}

	if (!selectedFacility) {
		return (
			<FullPageNotification
				title=""
				message="No facilities could be found."
				buttonLabel="Go to Facilities Manager"
				onButtonClick={() => {
					navigate("/facilities");
				}}
			/>
		);
	}

	return (
		<div className="content">
			<DashboardSidePanel />
			<FloorMapDisplay facility={selectedFacility} />
		</div>
	);
}

export default Dashboard;

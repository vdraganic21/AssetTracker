import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SelectedFacilityService from "../../services/SelectedFacilityService";
import DashboardSidePanel from "./DashboardSidePanel";
import FloorMapDisplay from "./FloorMapDisplay";
import FullPageNotification from "../common/FullPageNotification";
import Spinner from "../common/Spinner";
import HighlightedAssetService from "../../services/HighlightedAssetService";
import HiddenAssetsService from "../../services/HiddenAssetsService";
import HiddenZoneService from "../../services/HiddenZoneService";
import { Facility } from "../../entities/Facility";

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
		if (!selectedFacility) initialFacilityFetch();

		let intervalId: NodeJS.Timeout;
		let checkIdIntervalId: NodeJS.Timeout;

		const checkFacilityChange = async () => {
			const currentFacilityId = selectedFacility?.id;
			const newFacilityId =
				await SelectedFacilityService.getSelectedFacilityId();
			if (
				currentFacilityId &&
				newFacilityId &&
				currentFacilityId !== newFacilityId
			) {
				await fetchSelectedFacility();
			}
		};

		const startIntervals = () => {
			checkIdIntervalId = setInterval(checkFacilityChange, 200);
			intervalId = setInterval(fetchSelectedFacility, 30000);
		};

		startIntervals();

		return () => {
			clearInterval(intervalId);
			clearInterval(checkIdIntervalId);
		};
	}, [selectedFacility]);

	if (isLoading) {
		return <Spinner text="Loading facility." />;
	}

	if (!selectedFacility) {
		return (
			<FullPageNotification
				title=""
				message="No facilities could be found."
				buttonLabel="Go to Facilities Manager"
				onButtonClick={() => navigate("/facilities")}
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

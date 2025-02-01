import { useNavigate } from "react-router-dom";
import SelectedFacilityService from "../../services/SelectedFacilityService";
import DashboardSidePanel from "./DashboardSidePanel";
import FloorMapDisplay from "./FloorMapDisplay";
import FullPageNotification from "../common/FullPageNotification";
import { useEffect, useState } from "react";
import { Facility } from "../../entities/Facility";

function Dashboard() {
	const [selectedFacility, setSelectedFacility] = useState<Facility | null>(
		null
	);
	const navigate = useNavigate();

	const fetchSelectedFacility = async () => {
		const facility = await SelectedFacilityService.getSelectedFacility();
		setSelectedFacility(facility);
	};

	useEffect(() => {
		fetchSelectedFacility();

		const intervalId = setInterval(() => {
			fetchSelectedFacility();
		}, 500);

		return () => clearInterval(intervalId);
	}, []);

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

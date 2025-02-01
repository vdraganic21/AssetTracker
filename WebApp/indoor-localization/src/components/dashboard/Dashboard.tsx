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

	useEffect(() => {
		const fetchSelectedFacility = async () => {
			const facility = await SelectedFacilityService.getSelectedFacility();
			setSelectedFacility(facility);
		};

		fetchSelectedFacility();
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
			<DashboardSidePanel></DashboardSidePanel>
			<FloorMapDisplay facility={selectedFacility}></FloorMapDisplay>
		</div>
	);
}

export default Dashboard;

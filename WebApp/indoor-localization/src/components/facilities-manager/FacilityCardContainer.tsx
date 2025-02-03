import { Facility } from "../../entities/Facility";
import FacilityCard from "./FacilityCard";
import "./FacilityCardContainer.css";

function FacilityCardContainer({ facilities }: { facilities: Facility[] }) {
	if (facilities.length === 0) {
		return (
			<div>
				<p className="no-assets-message">No facilities found.</p>
			</div>
		);
	}

	return (
		<div className="facility-card-container">
			{facilities.map((facility, index) => (
				<FacilityCard facility={facility} key={index} />
			))}
		</div>
	);
}

export default FacilityCardContainer;

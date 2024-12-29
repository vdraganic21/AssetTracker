import { Facility } from "../../entities/Facility";
import FacilityCard from "./FacilityCard";
import "./FacilityCardContainer.css";

function FacilityCardContainer({ facilities }: { facilities: Facility[] }) {
	return (
		<div className="facility-card-container">
			{facilities.map((facility) => (
				<FacilityCard facility={facility} />
			))}
		</div>
	);
}

export default FacilityCardContainer;

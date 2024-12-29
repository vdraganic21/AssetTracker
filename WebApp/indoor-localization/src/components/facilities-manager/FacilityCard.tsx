import "./FacilityCard.css";
import { Facility } from "../../entities/Facility";

function FacilityCard({ facility }: { facility: Facility }) {
	return (
		<div className="facility-card">
			<div className="facility-card-image">
				<img src={facility.imageBase64} alt={facility.name + "floor map"} />
			</div>
			<div className="facility-card-title">{facility.name}</div>
		</div>
	);
}

export default FacilityCard;

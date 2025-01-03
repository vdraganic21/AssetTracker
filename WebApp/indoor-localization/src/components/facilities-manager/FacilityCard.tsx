import "./FacilityCard.css";
import { Facility } from "../../entities/Facility";
import { useNavigate } from "react-router-dom";
import { SynIcon } from "@synergy-design-system/react";
import SelectedFacilityService from "../../services/SelectedFacilityService";

function FacilityCard({ facility }: { facility: Facility }) {
	const navigate = useNavigate();
	const handleClick = () => {
		SelectedFacilityService.setSelectedFacilityId(facility.id);
		navigate("/");
	};

	return (
		<div className="facility-card">
			<div className="facility-card-image unselectable" onClick={handleClick}>
				<img src={facility.imageBase64} alt={facility.name + "floor map"} />
			</div>
			<div className="facility-card-title unselectable" onClick={handleClick}>
				{facility.name}
			</div>
			<SynIcon
				library="fa"
				name="far-pen-to-square"
				className="facility-edit-icon"
				onClick={() => {
					navigate(`/facilities/edit/${facility.id}`);
				}}
			/>
		</div>
	);
}

export default FacilityCard;

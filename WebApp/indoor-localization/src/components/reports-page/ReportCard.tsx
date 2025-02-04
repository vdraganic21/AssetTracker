import "../common/Manager.css";
import { useNavigate } from "react-router-dom";
import "./ReportCard.css";

interface ReportProp {
	name: string;
	imageSrc: string;
	imageAlt: string;
	route: string;
}

function ReportCard({ name, imageSrc, imageAlt, route }: ReportProp) {
	const navigate = useNavigate();

	return (
		<div
			className="report-card "
			onClick={() => {
				navigate(route);
			}}
		>
			<div className="report-image unselectable">
				<img src={imageSrc} alt={imageAlt} />
			</div>
			<div className="report-name unselectable">{name}</div>
		</div>
	);
}

export default ReportCard;

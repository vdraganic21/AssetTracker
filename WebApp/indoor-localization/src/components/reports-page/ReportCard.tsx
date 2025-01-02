import "../Manager.css";
import "./ReportCard.css";

interface ReportProp {
	id: number;
	name: string;
	imageSrc: string;
	imageAlt: string;
}

function ReportCard({ id, name, imageSrc, imageAlt }: ReportProp) {
	return (
		<div key={id} className="report-card ">
			<div className="report-image unselectable">
				<img src={imageSrc} alt={imageAlt} />
			</div>
			<div className="report-name unselectable">{name}</div>
		</div>
	);
}

export default ReportCard;

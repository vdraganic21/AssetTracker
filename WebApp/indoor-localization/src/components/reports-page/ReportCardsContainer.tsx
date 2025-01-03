import "../common/Manager.css";
import "./ReportCardsContainer.css";
import ReportCard from "./ReportCard";

interface ReportProp {
	id: number;
	name: string;
	imageSrc: string;
	imageAlt: string;
}

interface ReportsContainerProp {
	reports: ReportProp[];
}

function ReportCardsContainer({ reports }: ReportsContainerProp) {
	return (
		<div className="reports-container">
			{reports.map((report) => (
				<ReportCard
					id={report.id}
					name={report.name}
					imageSrc={report.imageSrc}
					imageAlt={report.imageAlt}
				/>
			))}
		</div>
	);
}

export default ReportCardsContainer;

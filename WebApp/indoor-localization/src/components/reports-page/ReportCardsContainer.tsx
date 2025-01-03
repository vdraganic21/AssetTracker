import "../common/Manager.css";
import "./ReportCardsContainer.css";
import ReportCard from "./ReportCard";
import { ReportModule } from "../../interfaces/ReportModule";

function ReportCardsContainer({ reports }: { reports: ReportModule[] }) {
	return (
		<div className="reports-container">
			{reports.map((report, index) => (
				<ReportCard
					key={index}
					name={report.GetName()}
					imageSrc={report.GetIcon()}
					imageAlt={report.GetName()}
					route={report.GetUrl()}
				/>
			))}
		</div>
	);
}

export default ReportCardsContainer;

import ReportModulesService from "../../services/ReportModulesService";
import Footer from "../common/Footer";
import "../common/Manager.css";
import ReportCardsContainer from "./ReportCardsContainer";

function ReportsPage() {
	const reportModules = ReportModulesService.GetAllModules();

	return (
		<>
			<div className="content content-border">
				<span className="syn-heading--3x-large">Reports</span>
				<ReportCardsContainer reports={reportModules} />
			</div>
			<Footer />
		</>
	);
}

export default ReportsPage;

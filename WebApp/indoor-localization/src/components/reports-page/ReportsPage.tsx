import ReportModulesService from "../../services/ReportModulesService";
import Footer from "../Footer";
import "../Manager.css";
import ReportCardsContainer from "./ReportCardsContainer";

function ReportsPage() {
	const reportModules = ReportModulesService.GetAllModules();

	return (
		<>
			<div className="content content-border">
				<span className="syn-heading--3x-large">Reports</span>
				<ReportCardsContainer reports={reportModules} />
			</div>
			<Footer></Footer>
		</>
	);
}

export default ReportsPage;

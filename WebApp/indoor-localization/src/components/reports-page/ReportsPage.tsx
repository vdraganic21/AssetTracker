import { SynDivider } from "@synergy-design-system/react";
import ReportModulesService from "../../services/ReportModulesService";
import Footer from "../common/Footer";
import "../common/Manager.css";
import ReportCardsContainer from "./ReportCardsContainer";

function ReportsPage() {
	const reportModules = ReportModulesService.GetAllModules();

	return (
		<>
			<div className="content content-width content-border content-margin">
				<span className="syn-heading--3x-large">Reports</span>
				<SynDivider className="content-divider" />
				<ReportCardsContainer reports={reportModules} />
			</div>
			<Footer />
		</>
	);
}

export default ReportsPage;

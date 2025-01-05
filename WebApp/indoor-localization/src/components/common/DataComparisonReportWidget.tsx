import { SynDivider } from "@synergy-design-system/react";
import "./DataComparisonReportWidget.css";

function DataComparisonReportWidget() {
	return (
		<div className="content-border widget">
			<p className="main-data">35min</p>
			<p className="description-text">Viljuškar idle time last 24h</p>
			<SynDivider className="divider" />
			<div className="bottom-data-container">
				<div>
					<p className="secondary-data">17 min</p>
					<p className="description-text">Last week</p>
				</div>
				<div>
					<p className="secondary-data">16 min</p>
					<p className="description-text">Last month</p>
				</div>
			</div>
		</div>
	);
}

export default DataComparisonReportWidget;

import { SynDivider } from "@synergy-design-system/react";
import "./DataComparisonReportWidget.css";

interface DataComparisonReportWidgetProps {
	mainData: string;
	mainDescription: string;
	secondaryDataLeft: string;
	secondaryDataRight: string;
	secondaryDescriptionLeft: string;
	secondaryDescriptionRight: string;
}

function DataComparisonReportWidget({
	mainData,
	mainDescription,
	secondaryDataLeft,
	secondaryDataRight,
	secondaryDescriptionLeft,
	secondaryDescriptionRight,
}: DataComparisonReportWidgetProps) {
	return (
		<div className="content-border widget">
			<p className="main-data">{mainData}</p>
			<p className="description-text">{mainDescription}</p>
			<SynDivider className="divider" />
			<div className="bottom-data-container">
				<div>
					<p className="secondary-data">{secondaryDataLeft}</p>
					<p className="description-text">{secondaryDescriptionLeft}</p>
				</div>
				<div>
					<p className="secondary-data">{secondaryDataRight}</p>
					<p className="description-text">{secondaryDescriptionRight}</p>
				</div>
			</div>
		</div>
	);
}

export default DataComparisonReportWidget;

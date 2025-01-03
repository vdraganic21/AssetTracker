import Footer from "../common/Footer";
import "../common/Manager.css";
import ReportCardsContainer from "./ReportCardsContainer";

const tabularReports = [
	{
		id: 1,
		name: "Asset movement",
		imageSrc: "/logo192.png",
		imageAlt: "Report alt",
	},
	{
		id: 2,
		name: "Zone traffic",
		imageSrc: "/logo192.png",
		imageAlt: "Report alt",
	},
	{
		id: 3,
		name: "Facility report",
		imageSrc: "/logo192.png",
		imageAlt: "Report alt",
	},
	{
		id: 4,
		name: "Incident report",
		imageSrc: "/logo192.png",
		imageAlt: "Report alt",
	},
	{
		id: 100,
		name: "Example report",
		imageSrc: "/logo192.png",
		imageAlt: "Report alt",
	},
	{
		id: 100,
		name: "Example report",
		imageSrc: "/logo192.png",
		imageAlt: "Report alt",
	},
	{
		id: 100,
		name: "Example report",
		imageSrc: "/logo192.png",
		imageAlt: "Report alt",
	},
];
const graphicalReports = [
	{
		id: 5,
		name: "Heat map",
		imageSrc: "/logo192.png",
		imageAlt: "Report alt",
	},
	{
		id: 6,
		name: "Spaghetti map",
		imageSrc: "/logo192.png",
		imageAlt: "Report alt",
	},
];

function ReportsPage() {
	return (
		<>
			<div className="content content-border">
				<span className="syn-heading--3x-large">Tabular Reports</span>
				<ReportCardsContainer reports={tabularReports} />
				<span className="syn-heading--3x-large">Graphical Reports</span>
				<ReportCardsContainer reports={graphicalReports} />
			</div>
			<Footer></Footer>
		</>
	);
}

export default ReportsPage;

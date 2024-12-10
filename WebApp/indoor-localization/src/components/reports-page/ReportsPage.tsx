import Footer from "../Footer";
import "../Manager.css";
import ReportCardsContainer from "./ReportCardsContainer";

const reports = [
  {
    id: 1,
    name: "Asset movement",
  },
  {
    id: 2,
    name: "Zone traffic",
  },
  {
    id: 3,
    name: "Facility report",
  },
  {
    id: 4,
    name: "Incident report",
  },
  {
    id: 5,
    name: "Heat map",
  },
  {
    id: 6,
    name: "Spaghetti map",
  },
];

const tabularReports = reports.slice(0, 4);
const graphicalReports = reports.slice(4);

function ReportsPage() {
  return (
    <>
      <div className="content content-border">
        <span className="syn-heading--3x-large">Tabular Reports</span>
        <ReportCardsContainer reports={tabularReports} />
        <div>
          <span className="syn-heading--3x-large">Graphical Reports</span>
          <ReportCardsContainer reports={graphicalReports} />
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default ReportsPage;

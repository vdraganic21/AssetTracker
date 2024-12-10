import Footer from "../Footer";
import "../Manager.css";
import "./ReportCard.css";
import ReportCard from "./ReportCard";

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
        <div className="reports-container">
          {tabularReports.map((report) => (
            <ReportCard id={report.id} name={report.name} />
          ))}
        </div>
        <div>
          <span className="syn-heading--3x-large">Graphical Reports</span>
          <div className="reports-container">
            {graphicalReports.map((report) => (
              <ReportCard id={report.id} name={report.name} />
            ))}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default ReportsPage;

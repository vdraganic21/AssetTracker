import Footer from "../Footer";
import "../Manager.css";
import "./ReportCard.css";

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

function ReportsPage() {
  return (
    <>
      <div className="content content-border">
        <span className="syn-heading--3x-large">Tabular Reports</span>
        <div className="reports-container">
          {reports.slice(0, 4).map((report) => (
            <div key={report.id} className="report-card">
              <div className="report-image">
                <img src="../public/logo192.png" alt="Report image" />
              </div>
              <div className="report-name">{report.name}</div>
            </div>
          ))}
        </div>
        <div>
          <span className="syn-heading--3x-large">Graphical Reports</span>
          <div className="reports-container">
            {reports.slice(4, 6).map((report) => (
              <div key={report.id} className="report-card">
                <div className="report-image">
                  <img src="../public/logo192.png" alt="Report image" />
                </div>
                <div className="report-name">{report.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default ReportsPage;

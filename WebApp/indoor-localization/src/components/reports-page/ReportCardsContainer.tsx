import "../Manager.css";
import "./ReportCardsContainer.css";
import ReportCard from "./ReportCard";

interface ReportProp {
  id: number;
  name: string;
}

interface ReportsContainerProp {
  reports: ReportProp[];
}

function ReportCardsContainer({ reports }: ReportsContainerProp) {
  return (
    <div className="reports-container">
      {reports.map((report) => (
        <ReportCard id={report.id} name={report.name} />
      ))}
    </div>
  );
}

export default ReportCardsContainer;

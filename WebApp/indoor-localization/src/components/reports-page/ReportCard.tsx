import "../Manager.css";
import "./ReportCard.css";

interface ReportProp {
  id: number;
  name: string;
}

function ReportCard({ id, name }: ReportProp) {
  return (
    <div key={id} className="report-card">
      <div className="report-image">
        <img src="../public/logo192.png" alt="Report image" />
      </div>
      <div className="report-name">{name}</div>
    </div>
  );
}

export default ReportCard;

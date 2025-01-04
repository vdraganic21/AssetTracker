import { SynButton } from "@synergy-design-system/react";
import "./ReportExportButtonGroup.css";

function ReportExportButtonGroup({ className = "" }: { className?: string }) {
  return (
    <div className={"asset-report-button-group " + className}>
      <SynButton>Export as PDF</SynButton>
      <SynButton>Export as PNG</SynButton>
      <SynButton>Print</SynButton>
    </div>
  );
}

export default ReportExportButtonGroup;

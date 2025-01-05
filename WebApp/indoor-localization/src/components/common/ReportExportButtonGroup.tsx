import { SynButton, SynOption, SynSelect } from "@synergy-design-system/react";
import "./ReportExportButtonGroup.css";

function ReportExportButtonGroup({ className = "" }: { className?: string }) {
  return (
    <div className={"asset-report-button-group " + className}>
      <span className="export-input-label">Export as</span>
      <SynSelect value={"PDF"} className="sort-select">
        <SynOption value={"PDF"}>{"PDF"}</SynOption>
        <SynOption value={"PNG"}>{"PNG"}</SynOption>
      </SynSelect>
      <SynButton>Export</SynButton>
      <SynButton>Print</SynButton>
    </div>
  );
}

export default ReportExportButtonGroup;

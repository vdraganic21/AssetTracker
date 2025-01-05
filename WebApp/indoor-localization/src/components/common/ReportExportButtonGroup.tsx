import { SynButton, SynOption, SynSelect } from "@synergy-design-system/react";
import "./ReportExportButtonGroup.css";

function ReportExportButtonGroup({ className = "" }: { className?: string }) {
  return (
    <div className={"asset-report-button-group " + className}>
      <span className="export-input-label">Export as</span>
      <SynSelect value={"Export as"} className="sort-select">
        <SynOption value={"PNG"}>{"PNG"}</SynOption>
        <SynOption value={"PDF"}>{"PDF"}</SynOption>
      </SynSelect>
      <SynButton>Export</SynButton>
      <SynButton>Print</SynButton>
    </div>
  );
}

export default ReportExportButtonGroup;

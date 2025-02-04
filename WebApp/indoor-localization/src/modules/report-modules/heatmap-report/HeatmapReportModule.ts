import { ReportModule } from "../../../interfaces/ReportModule";
import HeatMapReport from "./HeatmapReport";

class HeatMapReportModule implements ReportModule {
  GetIcon(): string {
    return "/logo512.png";
  }

  GetName(): string {
    return "Heatmap report";
  }

  GetUrl(): string {
    return "/reports/heatmapReport";
  }

  GetComponent(): React.ReactNode {
    return HeatMapReport();
  }
}

export default HeatMapReportModule;

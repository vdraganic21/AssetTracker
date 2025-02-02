import { ReportModule } from "../../../interfaces/ReportModule";
import SpaghettiMapReport from "./SpaghettiMapReport";

class SpaghettiMapReportModule implements ReportModule {
  GetIcon(): string {
    return "/logo512.png";
  }

  GetName(): string {
    return "Spaghetti Map";
  }

  GetUrl(): string {
    return "/reports/spaghettiMap";
  }

  GetComponent(): React.ReactNode {
    return SpaghettiMapReport();
  }
}

export default SpaghettiMapReportModule;

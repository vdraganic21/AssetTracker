import { ReportModule } from "../../../interfaces/ReportModule";
import ZoneRetentionTimeReport from "./ZoneRetentionTimeReport";

class ZoneRetentionTimeReportModule implements ReportModule {
  GetIcon(): string {
    return "/logo512.png";
  }

  GetName(): string {
    return "Zone Retention Time";
  }

  GetUrl(): string {
    return "/reports/zoneRetentionTime";
  }

  GetComponent(): React.ReactNode {
    return ZoneRetentionTimeReport();
  }
}

export default ZoneRetentionTimeReportModule;

import { ReportModule } from "../../../interfaces/ReportModule";
import ZoneRetentionTimeReport from "./ZoneRetentionTimeReport";
import icon from "./zoneRetention_icon.png";

class ZoneRetentionTimeReportModule implements ReportModule {
  GetIcon(): string {
    return icon;
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

import { ReportModule } from "../../../interfaces/ReportModule";
import AssetIdleTimeReport from "./AssetIdleTimeReport";

class AssetIdleTimeReportModule implements ReportModule {
  GetIcon(): string {
    return "/logo512.png";
  }

  GetName(): string {
    return "Asset Idle Time";
  }

  GetUrl(): string {
    return "/reports/assetIdleTime";
  }

  GetComponent(): React.ReactNode {
    return AssetIdleTimeReport();
  }
}

export default AssetIdleTimeReportModule;

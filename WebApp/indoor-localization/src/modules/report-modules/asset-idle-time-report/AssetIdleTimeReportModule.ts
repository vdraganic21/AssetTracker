import { ReportModule } from "../../../interfaces/ReportModule";
import AssetIdleTimeReport from "./AssetIdleTimeReport";
import icon from "./assetIdle_icon.png";

class AssetIdleTimeReportModule implements ReportModule {
  GetIcon(): string {
    return icon;
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

export class AssetZoneHistoryLogFilter {
  zoneId: number | null;
  assetId: number | null;
  enterStartDate: Date | null;
  enterEndDate: Date | null;
  exitStartDate: Date | null;
  exitEndDate: Date | null;
  minRetentionTime: number | null;
  maxRetentionTime: number | null;

  constructor(
    zoneId: number | null,
    assetId: number | null,
    enterStartDate: Date | null,
    enterEndDate: Date | null,
    exitStartDate: Date | null,
    exitEndDate: Date | null,
    minRetentionTime: number | null,
    maxRetentionTime: number | null
  ) {
    this.zoneId = zoneId;
    this.assetId = assetId;
    this.enterStartDate = enterStartDate;
    this.enterEndDate = enterEndDate;
    this.exitStartDate = exitStartDate;
    this.exitEndDate = exitEndDate;
    this.minRetentionTime = minRetentionTime;
    this.maxRetentionTime = maxRetentionTime;
  }
}

export class AssetZoneHistoryLogFilter {
    zoneId: number;
    assetId: number;
    enterStartDate: Date;
    enterEndDate: Date;
    exitStartDate: Date;
    exitEndDate: Date;
    minRetentionTime: number;
    maxRetentionTime: number;
  
    constructor(
      zoneId: number,
      assetId: number,
      enterStartDate: Date,
      enterEndDate: Date,
      exitStartDate: Date,
      exitEndDate: Date,
      minRetentionTime: number,
      maxRetentionTime: number
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
  